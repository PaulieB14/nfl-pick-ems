// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFLPickEms is Ownable, ReentrancyGuard {
    IERC20 public immutable token;
    uint256 public constant ENTRY_FEE = 2_000_000; // 2 USDC (6 decimals)
    address public oracle;

    struct Week {
        uint8 gameCount;
        uint64 lockTime;
        bool resultsSet;
        uint256 winnersMask;
        bool finalized;
        uint256 pot;
        uint256 sharePerWinner;
        uint256 winnerCount;
    }

    mapping(uint256 => Week) public weekData;
    mapping(uint256 => mapping(address => uint256)) public picksMask;
    mapping(uint256 => address[]) public entrants;
    mapping(uint256 => mapping(address => bool)) public isWinner;
    mapping(uint256 => mapping(address => bool)) public claimed;

    event OracleSet(address indexed oracle);
    event WeekCreated(uint256 indexed weekId, uint8 gameCount, uint64 lockTime);
    event Entered(uint256 indexed weekId, address indexed player, uint256 picksMask);
    event ResultsPosted(uint256 indexed weekId, uint256 winnersMask);
    event Finalized(uint256 indexed weekId, uint256 winnerCount, uint256 sharePerWinner);
    event Claimed(uint256 indexed weekId, address indexed winner, uint256 amount);

    constructor(address usdc) Ownable(msg.sender) {
        require(usdc != address(0), "token=0");
        token = IERC20(usdc);
        oracle = msg.sender;
    }

    modifier onlyOracle() {
        require(msg.sender == oracle, "not oracle");
        _;
    }

    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0), "oracle=0");
        oracle = _oracle;
        emit OracleSet(_oracle);
    }

    function createWeek(uint256 weekId, uint8 gameCount, uint64 lockTime) external onlyOracle {
        require(gameCount > 0 && gameCount <= 64, "invalid gameCount");
        Week storage w = weekData[weekId];
        require(w.lockTime == 0, "week exists");
        w.gameCount = gameCount;
        w.lockTime = lockTime;
        emit WeekCreated(weekId, gameCount, lockTime);
    }

    function enter(uint256 weekId, uint256 mask) external nonReentrant {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "no such week");
        require(block.timestamp < w.lockTime, "entries closed");
        require(picksMask[weekId][msg.sender] == 0, "already entered");
        require(mask < (w.gameCount == 256 ? type(uint256).max : (uint256(1) << w.gameCount)), "mask exceeds games");
        require(_bitCount(mask) == 10, "must pick exactly 10");

        require(token.transferFrom(msg.sender, address(this), ENTRY_FEE), "transferFrom failed");
        w.pot += ENTRY_FEE;

        picksMask[weekId][msg.sender] = mask;
        entrants[weekId].push(msg.sender);

        emit Entered(weekId, msg.sender, mask);
    }

    function postResults(uint256 weekId, uint256 winnersMask) external onlyOracle {
        Week storage w = weekData[weekId];
        require(w.lockTime != 0, "no such week");
        require(block.timestamp >= w.lockTime, "not yet");
        require(!w.resultsSet, "already set");
        require(winnersMask < (w.gameCount == 256 ? type(uint256).max : (uint256(1) << w.gameCount)), "mask exceeds games");

        w.winnersMask = winnersMask;
        w.resultsSet = true;

        emit ResultsPosted(weekId, winnersMask);
    }

    function finalizeWinners(uint256 weekId, address[] calldata winners) external onlyOracle {
        Week storage w = weekData[weekId];
        require(w.resultsSet, "results first");
        require(!w.finalized, "already finalized");
        require(winners.length > 0, "no winners");

        for (uint256 i = 0; i < winners.length; i++) {
            address p = winners[i];
            require(picksMask[weekId][p] != 0, "winner not an entrant");
            isWinner[weekId][p] = true;
        }

        w.winnerCount = winners.length;
        w.sharePerWinner = w.pot / winners.length;
        w.finalized = true;

        emit Finalized(weekId, winners.length, w.sharePerWinner);
    }

    function claim(uint256 weekId) external nonReentrant {
        Week storage w = weekData[weekId];
        require(w.finalized, "not finalized");
        require(isWinner[weekId][msg.sender], "not winner");
        require(!claimed[weekId][msg.sender], "claimed");

        claimed[weekId][msg.sender] = true;
        require(token.transfer(msg.sender, w.sharePerWinner), "transfer failed");
        emit Claimed(weekId, msg.sender, w.sharePerWinner);
    }

    function sweepRemainder(uint256 weekId, address to) external onlyOracle {
        Week storage w = weekData[weekId];
        require(w.finalized, "not finalized");
        uint256 paidTotal = w.sharePerWinner * w.winnerCount;
        uint256 leftover = w.pot - paidTotal;
        require(leftover > 0, "no leftover");
        w.pot = paidTotal;
        require(token.transfer(to, leftover), "transfer failed");
    }

    function _bitCount(uint256 x) internal pure returns (uint256 c) {
        while (x != 0) {
            x &= (x - 1);
            c++;
        }
    }
}
