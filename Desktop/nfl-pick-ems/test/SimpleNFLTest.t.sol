// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../contracts/NFLPickEms.sol";
import "../contracts/MockUSDC.sol";

contract SimpleNFLTest is Test {
    NFLPickEms public nflPickEms;
    MockUSDC public mockUSDC;
    
    address public owner;
    address public oracle;
    address public player1;
    
    function setUp() public {
        owner = address(this);
        oracle = makeAddr("oracle");
        player1 = makeAddr("player1");
        
        // Deploy MockUSDC
        mockUSDC = new MockUSDC();
        
        // Deploy NFLPickEms contract
        nflPickEms = new NFLPickEms(address(mockUSDC));
        
        // Set oracle after deployment
        nflPickEms.setOracle(oracle);
    }
    
    function testSimpleCreateWeek() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(oracle);
        nflPickEms.createWeek(1, 16, lockTime);
        
        (uint8 gameCount, uint64 storedLockTime, bool resultsSet, bool finalized, uint256 pot, uint256 totalEntrants,) = nflPickEms.getWeekInfo(1);
        assertEq(gameCount, 16);
        assertEq(storedLockTime, lockTime);
        assertFalse(resultsSet);
        assertFalse(finalized);
        assertEq(pot, 0);
        assertEq(totalEntrants, 0);
    }
    
    function testAddSingleGame() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(oracle);
        nflPickEms.createWeek(1, 16, lockTime);
        
        vm.prank(oracle);
        nflPickEms.addGame(1, 0, uint64(block.timestamp + 3600));
        
        (uint64 startTime, bool started, bool availableForPicks, bool finished, uint8 homeScore, uint8 awayScore) = nflPickEms.getGameInfo(1, 0);
        assertEq(startTime, block.timestamp + 3600);
        assertFalse(started);
        assertTrue(availableForPicks);
        assertFalse(finished);
        assertEq(homeScore, 0);
        assertEq(awayScore, 0);
    }
    
    function testAddMultipleGames() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(oracle);
        nflPickEms.createWeek(1, 16, lockTime);
        
        // Add games one by one to see where it fails
        for (uint8 i = 0; i < 10; i++) {
            console.log("Adding game", i);
            vm.prank(oracle);
            nflPickEms.addGame(1, i, uint64(block.timestamp + 3600 + uint256(i) * 60));
        }
    }
}
