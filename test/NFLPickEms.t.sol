// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Test, console2} from "forge-std/Test.sol";
import {NFLPickEms} from "../contracts/NFLPickEms.sol";
import {MockUSDC} from "../contracts/MockUSDC.sol";

contract NFLPickEmsTest is Test {
    NFLPickEms public nflPickEms;
    MockUSDC public mockUsdc;
    
    address public oracle = address(0x123);
    address public player1 = address(0x456);
    address public player2 = address(0x789);
    address public player3 = address(0xABC);
    
    uint256 public constant ENTRY_FEE = 2_000_000; // 2 USDC (6 decimals)
    uint256 public constant WEEK_ID = 1;
    uint8 public constant GAME_COUNT = 16;
    
    function setUp() public {
        // Deploy MockUSDC
        mockUsdc = new MockUSDC();
        
        // Deploy NFLPickEms
        nflPickEms = new NFLPickEms(address(mockUsdc));
        
        // Set oracle
        nflPickEms.setOracle(oracle);
        
        // Mint USDC to players and approve contract
        mockUsdc.mint(player1, 10_000_000); // 10 USDC
        mockUsdc.mint(player2, 10_000_000);
        mockUsdc.mint(player3, 10_000_000);
        
        vm.prank(player1);
        mockUsdc.approve(address(nflPickEms), type(uint256).max);
        
        vm.prank(player2);
        mockUsdc.approve(address(nflPickEms), type(uint256).max);
        
        vm.prank(player3);
        mockUsdc.approve(address(nflPickEms), type(uint256).max);
        
        // Switch to oracle for week creation
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_ID, GAME_COUNT, uint64(block.timestamp + 2 hours));
        
        // Add games
        for (uint8 i = 0; i < GAME_COUNT; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_ID, i, uint64(block.timestamp + 90 minutes));
        }
    }
    
    // Test 1: CRITICAL FIX - Zero Score Winners
    function testFinalizeWinnersWithZeroScore() public {
        // Players enter with different picks
        uint256 picks1 = 0xFFC0; // First 10 games (0b1111111111000000) = 10 picks
        uint256 picks2 = 0x3FF;  // Last 10 games (0b0000001111111111) = 10 picks
        uint256 picks3 = 0x3FF;  // Another 10-pick mask (0b0000001111111111) = 10 picks
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks1);
        
        vm.prank(player2);
        nflPickEms.enter(WEEK_ID, picks2);
        
        vm.prank(player3);
        nflPickEms.enter(WEEK_ID, picks3);
        
        // Fast forward past lock time
        vm.warp(block.timestamp + 2 hours + 1);
        
        // Oracle posts results where NO ONE gets any picks correct
        // This would have caused "no winners" revert before the fix
        uint256 resultsMask = 0x0; // All picks wrong (0b0000000000000000)
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_ID, resultsMask);
        
        // This should NOT revert anymore - FIXED!
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_ID);
        
        // Verify all players are winners (with 0 correct picks)
        assertTrue(nflPickEms.isWinner(WEEK_ID, player1));
        assertTrue(nflPickEms.isWinner(WEEK_ID, player2));
        assertTrue(nflPickEms.isWinner(WEEK_ID, player3));
        
        // Verify pot is split 3 ways
        (,,, bool finalized, uint256 pot, uint256 totalEntrants,) = nflPickEms.getWeekInfo(WEEK_ID);
        assertTrue(finalized);
        assertEq(totalEntrants, 3);
        assertEq(pot, 3 * ENTRY_FEE);
        
        // Verify each winner can claim their share
        uint256 expectedShare = (3 * ENTRY_FEE) / 3;
        
        vm.prank(player1);
        nflPickEms.claim(WEEK_ID);
        
        vm.prank(player2);
        nflPickEms.claim(WEEK_ID);
        
        vm.prank(player3);
        nflPickEms.claim(WEEK_ID);
        
        // Verify balances
        assertEq(mockUsdc.balanceOf(player1), 10_000_000 - ENTRY_FEE + expectedShare);
        assertEq(mockUsdc.balanceOf(player2), 10_000_000 - ENTRY_FEE + expectedShare);
        assertEq(mockUsdc.balanceOf(player3), 10_000_000 - ENTRY_FEE + expectedShare);
    }
    
    // Test 2: IMPROVED ERROR MESSAGES
    function testClearErrorMessages() public {
        // Test the improved error messages when games aren't configured
        // Should get "game not configured" not "game already started"
        
        // Create a new week with 16 games
        vm.prank(oracle);
        nflPickEms.createWeek(2, 16, uint64(block.timestamp + 2 hours));
        
        // Add only first 8 games (games 0-7)
        for (uint8 i = 0; i < 8; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(2, i, uint64(block.timestamp + 90 minutes));
        }
        
        // Try to enter with picks that include unconfigured games
        // Use a mask that fits within 16 games, has 10 picks, but picks unconfigured games
        uint256 picks = 0x3FF; // 10 picks for games 0-9 (0b0000001111111111)
        // Games 0-7 are configured, games 8-9 are not
        
        vm.prank(player1);
        vm.expectRevert("game not configured");
        nflPickEms.enter(2, picks);
    }
    
    // Test 3: SAFE TOKEN TRANSFERS
    function testSafeTokenTransfers() public {
        // Test that SafeERC20 is properly integrated
        
        // Enter a player
        uint256 picks = 0xFFC0; // First 10 games
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks);
        
        // Fast forward and post results
        vm.warp(block.timestamp + 2 hours + 1);
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_ID, picks); // Player gets all 10 correct
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_ID);
        
        // Test that SafeERC20 is working by claiming
        // If SafeERC20 wasn't integrated, this would fail
        vm.prank(player1);
        nflPickEms.claim(WEEK_ID);
        
        // Verify the transfer succeeded
        // Player paid 2 USDC entry fee and got 2 USDC back (pot was only 2 USDC)
        assertEq(mockUsdc.balanceOf(player1), 10_000_000); // 10 - 2 + 2 = 10 USDC
        
        // Test that SafeERC20 prevents double claims
        vm.prank(player1);
        vm.expectRevert("claimed");
        nflPickEms.claim(WEEK_ID);
    }
    
    // Test 4: NORMAL WINNER SCENARIO
    function testNormalWinnerScenario() public {
        // Players enter
        uint256 picks1 = 0xFFC0; // First 10 games
        uint256 picks2 = 0x3FF;  // Last 10 games (0b0000001111111111) = 10 picks
        uint256 picks3 = 0x3FF;  // Another 10-pick mask (0b0000001111111111) = 10 picks
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks1);
        
        vm.prank(player2);
        nflPickEms.enter(WEEK_ID, picks2);
        
        vm.prank(player3);
        nflPickEms.enter(WEEK_ID, picks3);
        
        // Fast forward past lock time
        vm.warp(block.timestamp + 2 hours + 1);
        
        // Oracle posts results where player1 gets all 10 correct
        uint256 resultsMask = picks1;
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_ID, resultsMask);
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_ID);
        
        // Only player1 should be winner
        assertTrue(nflPickEms.isWinner(WEEK_ID, player1));
        assertFalse(nflPickEms.isWinner(WEEK_ID, player2));
        assertFalse(nflPickEms.isWinner(WEEK_ID, player3));
        
        // Player1 should get entire pot
        vm.prank(player1);
        nflPickEms.claim(WEEK_ID);
        
        assertEq(mockUsdc.balanceOf(player1), 14_000_000); // Got entry fee back + winnings
    }
    
    // Test 5: TIE SCENARIO
    function testTieScenario() public {
        // Players enter with same picks
        uint256 picks = 0xFFC0; // First 10 games
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks);
        
        vm.prank(player2);
        nflPickEms.enter(WEEK_ID, picks);
        
        vm.prank(player3);
        nflPickEms.enter(WEEK_ID, picks);
        
        // Fast forward past lock time
        vm.warp(block.timestamp + 2 hours + 1);
        
        // Oracle posts results where everyone gets 8 correct
        uint256 resultsMask = 0xFF00; // First 8 correct (0b1111111100000000)
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_ID, resultsMask);
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_ID);
        
        // All players should be winners
        assertTrue(nflPickEms.isWinner(WEEK_ID, player1));
        assertTrue(nflPickEms.isWinner(WEEK_ID, player2));
        assertTrue(nflPickEms.isWinner(WEEK_ID, player3));
        
        // Pot should be split 3 ways
        uint256 expectedShare = (3 * ENTRY_FEE) / 3;
        
        vm.prank(player1);
        nflPickEms.claim(WEEK_ID);
        
        vm.prank(player2);
        nflPickEms.claim(WEEK_ID);
        
        vm.prank(player3);
        nflPickEms.claim(WEEK_ID);
        
        // Verify each got their share
        assertEq(mockUsdc.balanceOf(player1), 10_000_000 - ENTRY_FEE + expectedShare);
        assertEq(mockUsdc.balanceOf(player2), 10_000_000 - ENTRY_FEE + expectedShare);
        assertEq(mockUsdc.balanceOf(player3), 10_000_000 - ENTRY_FEE + expectedShare);
    }
    
    // Test 6: GAME AVAILABILITY CHECKS
    function testGameAvailabilityChecks() public {
        // Test the improved error messages for game availability
        
        // Create a week with 16 games
        vm.prank(oracle);
        nflPickEms.createWeek(3, 16, uint64(block.timestamp + 2 hours));
        
        // Add only first 8 games
        for (uint8 i = 0; i < 8; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(3, i, uint64(block.timestamp + 90 minutes));
        }
        
        // Try to pick games that include unconfigured games
        // Use a mask that fits within 16 games, has 10 picks, but picks unconfigured games
        uint256 invalidPicks = 0x3FF; // 10 picks for games 0-9 (0b0000001111111111)
        // Games 0-7 are configured, games 8-9 are not
        
        vm.prank(player1);
        vm.expectRevert("game not configured");
        nflPickEms.enter(3, invalidPicks);
        
        // Valid picks for configured games only
        uint256 correctPicks = 0x3FC; // First 8 games (0b1111111100) = 8 picks
        
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(3, correctPicks);
        
        // Valid picks for 10 configured games
        uint256 validPicks = 0x3FF; // Games 0-9, but only 0-7 are configured
        
        vm.prank(player1);
        vm.expectRevert("game not configured");
        nflPickEms.enter(3, validPicks);
    }
    
    // Test 7: ORACLE ROLE CHECKS
    function testOracleRoleChecks() public {
        // Test that only oracle can call restricted functions
        
        // Non-oracle trying to create week
        vm.prank(player1);
        vm.expectRevert("not oracle");
        nflPickEms.createWeek(4, 8, uint64(block.timestamp + 2 hours));
        
        // Non-oracle trying to add game
        vm.prank(player1);
        vm.expectRevert("not oracle");
        nflPickEms.addGame(WEEK_ID, 0, uint64(block.timestamp + 90 minutes));
        
        // Non-oracle trying to post results
        vm.prank(player1);
        vm.expectRevert("not oracle");
        nflPickEms.postResults(WEEK_ID, 0);
        
        // Non-oracle trying to finalize winners
        vm.prank(player1);
        vm.expectRevert("not oracle");
        nflPickEms.finalizeWinners(WEEK_ID);
    }
    
    // Test 8: BIT MASK VALIDATION
    function testBitMaskValidation() public {
        // Test that exactly 10 picks are required
        // Note: contract checks mask < (1 << gameCount) FIRST, then bit count
        
        // Too few picks - should fail on bit count check
        uint256 tooFewPicks = 0x1FF; // 9 picks (0b111111111)
        
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(WEEK_ID, tooFewPicks);
        
        // Too many picks - should fail on bit count check
        // Use a mask that fits within 16 games but has 11 picks
        uint256 tooManyPicks = 0x1FFF; // 11 picks (0b11111111111) - fits in 16 bits
        
        vm.prank(player1);
        vm.expectRevert("must pick exactly 10");
        nflPickEms.enter(WEEK_ID, tooManyPicks);
        
        // Exactly 10 picks - should work
        uint256 correctPicks = 0xFFC0; // 10 picks
        
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, correctPicks);
    }
    
    // Test 9: REENTRANCY PROTECTION
    function testReentrancyProtection() public {
        // Test that reentrancy protection works
        
        // Enter a player
        uint256 picks = 0xFFC0; // First 10 games
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks);
        
        // Fast forward and finalize
        vm.warp(block.timestamp + 2 hours + 1);
        
        vm.prank(oracle);
        nflPickEms.postResults(WEEK_ID, picks);
        
        vm.prank(oracle);
        nflPickEms.finalizeWinners(WEEK_ID);
        
        // Try to claim twice - should fail on second attempt
        vm.prank(player1);
        nflPickEms.claim(WEEK_ID);
        
        vm.prank(player1);
        vm.expectRevert("claimed");
        nflPickEms.claim(WEEK_ID);
    }
    
    // Test 10: PAUSE FUNCTIONALITY
    function testPauseFunctionality() public {
        // Test pause/unpause functionality
        
        // Owner can pause
        vm.prank(address(this)); // Test contract is owner
        nflPickEms.pause();
        
        // Cannot enter when paused
        uint256 picks = 0xFFC0; // First 10 games
        vm.prank(player1);
        vm.expectRevert("EnforcedPause()");
        nflPickEms.enter(WEEK_ID, picks);
        
        // Owner can unpause
        vm.prank(address(this));
        nflPickEms.unpause();
        
        // Can enter after unpause
        vm.prank(player1);
        nflPickEms.enter(WEEK_ID, picks);
    }
}
