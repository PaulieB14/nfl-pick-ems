// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../contracts/NFLPickEms.sol";
import "../contracts/MockUSDC.sol";

contract NFLPickEmsTest is Test {
    NFLPickEms public nflPickEms;
    MockUSDC public mockUSDC;
    
    address public owner;
    address public oracle;
    address public player1;
    address public player2;
    address public player3;
    
    uint256 public constant ENTRY_FEE = 2_000_000; // 2 USDC with 6 decimals
    uint256 public constant WEEK_1 = 1;
    uint256 public constant WEEK_2 = 2;
    uint8 public constant GAME_COUNT = 16; // NFL typically has 16 games per week
    
    // Valid bitmask for 10 picks out of 16 games
    uint256 public constant VALID_PICKS_MASK = 0x3FF; // Binary: 1111111111 (10 picks)
    
    event WeekCreated(uint256 indexed weekId, uint8 gameCount, uint64 lockTime);
    event Entered(uint256 indexed weekId, address indexed player, uint256 picksMask);
    event WinnersFinalized(uint256 indexed weekId, uint256 winnerCount, uint256 sharePerWinner, uint256 totalPot);
    event Claimed(uint256 indexed weekId, address indexed winner, uint256 amount, uint256 correctPicks);
    
    function setUp() public {
        owner = address(this);
        oracle = makeAddr("oracle");
        player1 = makeAddr("player1");
        player2 = makeAddr("player2");
        player3 = makeAddr("player3");
        
        // Deploy MockUSDC
        mockUSDC = new MockUSDC();
        
        // Deploy NFLPickEms contract
        nflPickEms = new NFLPickEms(address(mockUSDC));
        
        // Set oracle after deployment
        nflPickEms.setOracle(oracle);
        
        // Mint USDC to players for testing
        mockUSDC.mint(player1, 100_000_000); // 100 USDC
        mockUSDC.mint(player2, 100_000_000); // 100 USDC
        mockUSDC.mint(player3, 100_000_000); // 100 USDC
        
        // Pre-approve USDC spending for all players
        vm.prank(player1);
        mockUSDC.approve(address(nflPickEms), type(uint256).max);
        
        vm.prank(player2);
        mockUSDC.approve(address(nflPickEms), type(uint256).max);
        
        vm.prank(player3);
        mockUSDC.approve(address(nflPickEms), type(uint256).max);
    }
    
    function testInitialState() public {
        assertEq(address(nflPickEms.token()), address(mockUSDC));
        assertEq(nflPickEms.oracle(), oracle);
        assertEq(nflPickEms.ENTRY_FEE(), ENTRY_FEE);
        assertEq(nflPickEms.owner(), owner);
        assertFalse(nflPickEms.paused());
    }
    
    function testCreateWeek() public {
        uint64 lockTime = uint64(block.timestamp + 7200); // 2 hours from now
        
        vm.expectEmit(true, false, false, true);
        emit WeekCreated(WEEK_1, GAME_COUNT, lockTime);
        
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        (uint8 gameCount, uint64 storedLockTime, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants,) = nflPickEms.getWeekInfo(WEEK_1);
        assertEq(gameCount, GAME_COUNT);
        assertEq(storedLockTime, lockTime);
        assertFalse(resultsSet);
        assertFalse(finalized);
        assertEq(pot, 0);
        assertEq(totalEntrants, 0);
    }
    
    function testCreateWeekOnlyOracle() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(player1);
        vm.expectRevert("not oracle");
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
    }
    
    function testCannotCreateWeekWithInvalidGameCount() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(oracle);
        vm.expectRevert("invalid gameCount");
        nflPickEms.createWeek(WEEK_1, 0, lockTime);
        
        vm.prank(oracle);
        vm.expectRevert("invalid gameCount");
        nflPickEms.createWeek(WEEK_1, 65, lockTime);
    }
    
    function testCannotCreateWeekWithPastLockTime() public {
        uint64 lockTime = uint64(block.timestamp + 1800); // 30 minutes (less than minimum 1 hour buffer)
        
        vm.prank(oracle);
        vm.expectRevert("lock time too soon");
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
    }
    
    function testPlayerEntry() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games to make them available for picks
        uint64[10] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841),
            uint64(3901), uint64(3961), uint64(4021), uint64(4081), uint64(4141)
        ];
        for (uint8 i = 0; i < 10; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        uint256 playerPicks = VALID_PICKS_MASK;
        
        vm.expectEmit(true, true, false, true);
        emit Entered(WEEK_1, player1, playerPicks);
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, playerPicks);
        
        // Check week info
        (,, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants,) = nflPickEms.getWeekInfo(WEEK_1);
        assertFalse(resultsSet);
        assertFalse(finalized);
        assertEq(pot, ENTRY_FEE);
        assertEq(totalEntrants, 1);
        
        // Check player picks
        (uint256 storedPicks,,,) = nflPickEms.getPlayerPicks(WEEK_1, player1);
        assertEq(storedPicks, playerPicks);
        
        // Check USDC was transferred
        assertEq(mockUSDC.balanceOf(address(nflPickEms)), ENTRY_FEE);
        assertEq(mockUSDC.balanceOf(player1), 100_000_000 - ENTRY_FEE);
    }
    
    function testCannotEnterNonExistentWeek() public {
        vm.prank(player1);
        vm.expectRevert("no such week");
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
    }
    
    function testCannotEnterAfterLockTime() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Move time past lock time
        vm.warp(lockTime + 1);
        
        vm.prank(player1);
        vm.expectRevert("entries closed");
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
    }
    
    function testCannotEnterTwice() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[10] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841),
            uint64(3901), uint64(3961), uint64(4021), uint64(4081), uint64(4141)
        ];
        for (uint8 i = 0; i < 10; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
        
        vm.prank(player1);
        vm.expectRevert("already entered");
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
    }
    
    function testInvalidPicksValidation() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        // Test with 0 picks
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(WEEK_1, 0);
        
        // Test with more than 10 picks (11 bits set)
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(WEEK_1, 0x7FF); // 11 bits set
        
        // Test with fewer than 10 picks (9 bits set)
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(WEEK_1, 0x1FF); // 9 bits set
    }
    
    function testMultiplePlayersEntry() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        uint256 picks1 = VALID_PICKS_MASK; // Teams 0-9
        uint256 picks2 = 0x3E0 | 0x1F; // Teams 5-9 and 0-4 = 10 teams total
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, picks1);
        
        vm.prank(player2);
        nflPickEms.enter(WEEK_1, picks2);
        
        (,, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants,) = nflPickEms.getWeekInfo(WEEK_1);
        assertEq(pot, ENTRY_FEE * 2);
        assertEq(totalEntrants, 2);
    }
    
    function testPostResults() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games and enter
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
        
        // Move past lock time
        vm.warp(lockTime + 1);
        
        uint256 winnerMask = 0x155; // Some winning pattern
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_1, winnerMask);
        
        (,, bool resultsSet,,,, uint64 lastOracleUpdate) = nflPickEms.getWeekInfo(WEEK_1);
        assertTrue(resultsSet);
        assertEq(lastOracleUpdate, block.timestamp);
    }
    
    function testCannotPostResultsBeforeLockTime() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        vm.prank(oracle);
        vm.expectRevert("not yet");
        nflPickEms.postResults(WEEK_1, 0x155);
    }
    
    function testFinalizeWinners() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        uint256 picks1 = VALID_PICKS_MASK; // 0x3FF
        uint256 picks2 = 0x2AA | 0x155; // Different 10-pick pattern
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, picks1);
        
        vm.prank(player2);
        nflPickEms.enter(WEEK_1, picks2);
        
        // Move past lock time and post results
        vm.warp(lockTime + 1);
        uint256 winnerMask = 0x155; // Pattern that gives player2 more correct picks
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_1, winnerMask);
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_1);
        
        (,, bool resultsSet, bool finalized,,,) = nflPickEms.getWeekInfo(WEEK_1);
        assertTrue(resultsSet);
        assertTrue(finalized);
        
        // Check if player2 is winner (has more matching bits with winnerMask)
        (, uint256 correctPicks2, bool isWinner2,) = nflPickEms.getPlayerPicks(WEEK_1, player2);
        assertTrue(isWinner2);
        assertGt(correctPicks2, 0);
    }
    
    function testClaimWinnings() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        uint256 winningPicks = VALID_PICKS_MASK;
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, winningPicks);
        
        // Move past lock time, post results, and finalize
        vm.warp(lockTime + 1);
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_1, winningPicks); // Player1's picks are the winners
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_1);
        
        uint256 initialBalance = mockUSDC.balanceOf(player1);
        
        vm.prank(player1);
        nflPickEms.claim(WEEK_1);
        
        assertEq(mockUSDC.balanceOf(player1), initialBalance + ENTRY_FEE);
        assertEq(mockUSDC.balanceOf(address(nflPickEms)), 0);
        
        // Check claim status
        (,,, bool claimed) = nflPickEms.getPlayerPicks(WEEK_1, player1);
        assertTrue(claimed);
    }
    
    function testCannotClaimIfNotWinner() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        // Player1 picks games 0-9 (VALID_PICKS_MASK = 0x3FF)
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
        
        // Player2 picks games 10-15 and 4-7 (total 10 picks)
        uint256 player2Picks = 0xFC00 | 0xF0; // Games 10-15 (6 bits) + games 4-7 (4 bits) = 10 total
        vm.prank(player2);
        nflPickEms.enter(WEEK_1, player2Picks);
        
        // Move past lock time, post results that favor player2
        vm.warp(lockTime + 1);
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_1, 0xFC00); // Games 10-15 win (favors player2)
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_1);
        
        vm.prank(player1);
        vm.expectRevert("not winner");
        nflPickEms.claim(WEEK_1);
    }
    
    function testCannotClaimTwice() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Add games
        uint64[16] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
        }
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
        
        // Complete the flow
        vm.warp(lockTime + 1);
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_1, VALID_PICKS_MASK);
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_1);
        
        vm.prank(player1);
        nflPickEms.claim(WEEK_1);
        
        vm.prank(player1);
        vm.expectRevert("claimed");
        nflPickEms.claim(WEEK_1);
    }
    
    function testPauseUnpause() public {
        nflPickEms.pause();
        assertTrue(nflPickEms.paused());
        
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        vm.expectRevert();
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        nflPickEms.unpause();
        assertFalse(nflPickEms.paused());
        
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime); // Should work now
    }
    
    function testSetOracle() public {
        address newOracle = makeAddr("newOracle");
        
        nflPickEms.setOracle(newOracle);
        assertEq(nflPickEms.oracle(), newOracle);
    }
    
    function testMultipleWeeks() public {
        uint64 lockTime1 = uint64(block.timestamp + 7200);
        uint64 lockTime2 = uint64(block.timestamp + 14400);
        
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime1);
        
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_2, GAME_COUNT, lockTime2);
        
        // Add games to both weeks
        uint64[16] memory startTimes1 = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841), uint64(3901), uint64(3961), uint64(4021),
            uint64(4081), uint64(4141), uint64(4201), uint64(4261), uint64(4321), uint64(4381), uint64(4441), uint64(4501)
        ];
        uint64[16] memory startTimes2 = [
            uint64(10801), uint64(10861), uint64(10921), uint64(10981), uint64(11041), uint64(11101), uint64(11161), uint64(11221),
            uint64(11281), uint64(11341), uint64(11401), uint64(11461), uint64(11521), uint64(11581), uint64(11641), uint64(11701)
        ];
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes1[i]);
            
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_2, i, startTimes2[i]);
        }
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_1, VALID_PICKS_MASK);
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_2, VALID_PICKS_MASK);
        
        // Check separate tracking
        (,, bool resultsSet1, bool finalized1, uint256 pot1, uint256 totalEntrants1,) = nflPickEms.getWeekInfo(WEEK_1);
        (,, bool resultsSet2, bool finalized2, uint256 pot2, uint256 totalEntrants2,) = nflPickEms.getWeekInfo(WEEK_2);
        
        assertEq(totalEntrants1, 1);
        assertEq(totalEntrants2, 1);
        assertEq(pot1, ENTRY_FEE);
        assertEq(pot2, ENTRY_FEE);
        assertFalse(resultsSet1);
        assertFalse(resultsSet2);
        assertFalse(finalized1);
        assertFalse(finalized2);
    }
}
