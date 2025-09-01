// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract NFLPickEms is Ownable, ReentrancyGuard, Pausable {
    IERC20 public immutable token;
    uint256 public constant ENTRY_FEE = 2_000_000; // 2 USDC (6 decimals)
    address public oracle;
    uint256 public constant MINIMUM_LOCK_BUFFER = 3600; // 1 hour minimum buffer

    struct Game {
        uint64 startTime;
        bool started;
        bool availableForPicks;
        bool finished;
        uint8 homeScore;
        uint8 awayScore;
    }

    struct Week {
        uint8 gameCount;
        uint64 lockTime;  // Final deadline for all picks
        mapping(uint8 => Game) games;     // Individual game tracking
        bool resultsSet;
        uint256 winnersMask;
        bool finalized;
        uint256 pot;
        uint256 sharePerWinner;
        uint256 winnerCount;
        uint256 totalEntrants;
        uint64 lastOracleUpdate;
    }

    mapping(uint256 => Week) public weekData;
    mapping(uint256 => mapping(address => uint256)) public picksMask;
    mapping(uint256 => address[]) public entrants;
    mapping(uint256 => mapping(address => bool)) public isWinner;
    mapping(uint256 => mapping(address => bool)) public claimed;
    mapping(uint256 => mapping(address => uint256)) public correctPicks; // Track correct picks per player

    event OracleSet(address indexed oracle);
    event WeekCreated(uint256 indexed weekId, uint8 gameCount, uint64 lockTime);
    event GameAdded(uint256 indexed weekId, uint8 gameIndex, uint64 startTime);
    event GameStarted(uint256 indexed weekId, uint8 gameIndex);
    event GameFinished(uint256 indexed weekId, uint8 gameIndex, uint8 homeScore, uint8 awayScore);
    event Entered(uint256 indexed weekId, address indexed player, uint256 picksMask);
    event ResultsPosted(uint256 indexed weekId, uint256 winnersMask, uint64 timestamp);
    event WinnersFinalized(uint256 indexed weekId, uint256 winnerCount, uint256 sharePerWinner, uint256 totalPot);
    event Claimed(uint256 indexed weekId, address indexed winner, uint256 amount, uint256 correctPicks);
    event WeekPaused(uint256 indexed weekId);
    event WeekUnpaused(uint256 indexed weekId);

    constructor(address usdc) Ownable(msg.sender) {
        require(usdc != address(0), "token=0");
        token = IERC20(usdc);
        oracle = msg.sender;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "not oracle");
        _;
    }

    modifier whenWeekNotPaused(uint256 weekId) {
        require(!weekData[weekId].finalized || !weekData[weekId].resultsSet, "week paused");
        _;
    }

    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "oracle=0");
        oracle = _oracle;
        emit OracleSet(_oracle);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function createWeek(uint256 weekId, uint8 gameCount, uint64 lockTime) external onlyOracle whenNotPaused {
        require(gameCount > 0 && gameCount <= 64, "invalid gameCount");
        require(lockTime > block.timestamp + MINIMUM_LOCK_BUFFER, "lock time too soon");
        
        Week storage w = weekData[weekId];
        require(w.lockTime == 0, "week exists");
        
        w.gameCount = gameCount;
        w.lockTime = lockTime;
        
        emit WeekCreated(weekId, gameCount, lockTime);
    }

    function addGame(uint256 weekId, uint8 gameIndex, uint64 startTime) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "week doesn't exist");
        require(gameIndex < w.gameCount, "invalid game index");
        require(startTime > block.timestamp, "start time in past");
        
        Game storage game = w.games[gameIndex];
        require(game.startTime == 0, "game already added");
        
        game.startTime = startTime;
        game.availableForPicks = true;
        
        emit GameAdded(weekId, gameIndex, startTime);
    }

    function enter(uint256 weekId, uint256 mask) external nonReentrant whenNotPaused whenWeekNotPaused(weekId) {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "no such week");
        require(block.timestamp < w.lockTime, "entries closed");
        require(picksMask[weekId][msg.sender] == 0, "already entered");
        
        // Validate mask fits within game count
        require(mask < (uint256(1) << w.gameCount), "mask exceeds games");
        
        // Must pick exactly 10 games
        require(_bitCount(mask) == 10, "must pick exactly 10");
        
        // Check that all picked games are still available
        for (uint8 i = 0; i < w.gameCount; i++) {
            if ((mask & (uint256(1) << i)) != 0) {
                require(w.games[i].availableForPicks, "game already started");
            }
        }

        require(token.transferFrom(msg.sender, address(this), ENTRY_FEE), "transferFrom failed");

        w.pot += ENTRY_FEE;
        w.totalEntrants++;

        picksMask[weekId][msg.sender] = mask;
        entrants[weekId].push(msg.sender);

        emit Entered(weekId, msg.sender, mask);
    }

    function markGameStarted(uint256 weekId, uint8 gameIndex) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "week doesn't exist");
        require(gameIndex < w.gameCount, "invalid game index");
        require(w.games[gameIndex].startTime != 0, "game not added");
        require(block.timestamp >= w.games[gameIndex].startTime, "game hasn't started yet");
        
        w.games[gameIndex].started = true;
        w.games[gameIndex].availableForPicks = false;
        
        emit GameStarted(weekId, gameIndex);
    }

    function updateGameScore(uint256 weekId, uint8 gameIndex, uint8 homeScore, uint8 awayScore, bool finished) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "week doesn't exist");
        require(gameIndex < w.gameCount, "invalid game index");
        require(w.games[gameIndex].started, "game not started");
        
        Game storage game = w.games[gameIndex];
        game.homeScore = homeScore;
        game.awayScore = awayScore;
        game.finished = finished;
        
        if (finished) {
            emit GameFinished(weekId, gameIndex, homeScore, awayScore);
        }
    }

    function postResults(uint256 weekId, uint256 winnersMask) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "no such week");
        require(block.timestamp >= w.lockTime, "not yet");
        require(!w.resultsSet, "already set");
        require(winnersMask < (uint256(1) << w.gameCount), "mask exceeds games");

        w.winnersMask = winnersMask;
        w.resultsSet = true;
        w.lastOracleUpdate = uint64(block.timestamp);

        emit ResultsPosted(weekId, winnersMask, w.lastOracleUpdate);
    }

    function finalizeWinners(uint256 weekId) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.resultsSet, "results first");
        require(!w.finalized, "already finalized");
        
        // Calculate winners based on correct picks
        address[] memory winners = new address[](w.totalEntrants);
        uint256 winnerCount = 0;
        uint256 maxCorrectPicks = 0;
        
        // First pass: find the maximum number of correct picks
        for (uint256 i = 0; i < w.totalEntrants; i++) {
            address player = entrants[weekId][i];
            uint256 playerMask = picksMask[weekId][player];
            uint256 correctPicksCount = _bitCount(playerMask & w.winnersMask);
            correctPicks[weekId][player] = correctPicksCount;
            
            if (correctPicksCount > maxCorrectPicks) {
                maxCorrectPicks = correctPicksCount;
            }
        }
        
        // Second pass: identify winners (those with max correct picks)
        for (uint256 i = 0; i < w.totalEntrants; i++) {
            address player = entrants[weekId][i];
            if (correctPicks[weekId][player] == maxCorrectPicks && maxCorrectPicks > 0) {
                winners[winnerCount] = player;
                isWinner[weekId][player] = true;
                winnerCount++;
            }
        }
        
        require(winnerCount > 0, "no winners");
        
        w.winnerCount = winnerCount;
        w.sharePerWinner = w.pot / winnerCount;
        w.finalized = true;

        emit WinnersFinalized(weekId, winnerCount, w.sharePerWinner, w.pot);
    }

    function claim(uint256 weekId) external nonReentrant whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.finalized, "not finalized");
        require(isWinner[weekId][msg.sender], "not winner");
        require(!claimed[weekId][msg.sender], "claimed");

        claimed[weekId][msg.sender] = true;
        require(token.transfer(msg.sender, w.sharePerWinner), "transfer failed");
        
        emit Claimed(weekId, msg.sender, w.sharePerWinner, correctPicks[weekId][msg.sender]);
    }

    function sweepRemainder(uint256 weekId, address to) external onlyOracle whenNotPaused {
        Week storage w = weekData[weekId];
        require(w.finalized, "not finalized");
        uint256 paidTotal = w.sharePerWinner * w.winnerCount;
        uint256 leftover = w.pot - paidTotal;
        require(leftover > 0, "no leftover");
        
        // Update pot to reflect what was actually paid
        w.pot = paidTotal;
        require(token.transfer(to, leftover), "transfer failed");
    }

    function emergencyPauseWeek(uint256 weekId) external onlyOwner {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "week doesn't exist");
        require(!w.finalized, "week already finalized");
        
        w.lockTime = uint64(block.timestamp); // Close entries immediately
        emit WeekPaused(weekId);
    }

    function emergencyUnpauseWeek(uint256 weekId, uint64 newLockTime) external onlyOwner {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "week doesn't exist");
        require(!w.finalized, "week already finalized");
        require(newLockTime > block.timestamp + MINIMUM_LOCK_BUFFER, "new lock time too soon");
        
        w.lockTime = newLockTime;
        emit WeekUnpaused(weekId);
    }

    // View functions for transparency
    function getWeekInfo(uint256 weekId) external view returns (
        uint8 gameCount,
        uint64 lockTime,
        bool resultsSet,
        bool finalized,
        uint256 pot,
        uint256 totalEntrants,
        uint64 lastOracleUpdate
    ) {
        Week storage w = weekData[weekId];
        return (w.gameCount, w.lockTime, w.resultsSet, w.finalized, w.pot, w.totalEntrants, w.lastOracleUpdate);
    }

    function getGameInfo(uint256 weekId, uint8 gameIndex) external view returns (
        uint64 startTime,
        bool started,
        bool availableForPicks,
        bool finished,
        uint8 homeScore,
        uint8 awayScore
    ) {
        Week storage w = weekData[weekId];
        require(gameIndex < w.gameCount, "invalid game index");
        Game storage game = w.games[gameIndex];
        return (game.startTime, game.started, game.availableForPicks, game.finished, game.homeScore, game.awayScore);
    }

    function getPlayerPicks(uint256 weekId, address player) external view returns (
        uint256 playerPicksMask,
        uint256 playerCorrectPicks,
        bool playerIsWinner,
        bool playerClaimed
    ) {
        return (
            picksMask[weekId][player],
            correctPicks[weekId][player],
            isWinner[weekId][player],
            claimed[weekId][player]
        );
    }

    // Optimized bit counting for gameCount <= 64
    function _bitCount(uint256 x) internal pure returns (uint256 c) {
        // Use Brian Kernighan's algorithm - more efficient for small numbers
        while (x != 0) {
            x &= (x - 1);
            c++;
        }
    }
}
