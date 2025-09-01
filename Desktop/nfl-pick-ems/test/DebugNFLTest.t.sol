// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../contracts/NFLPickEms.sol";
import "../contracts/MockUSDC.sol";

contract DebugNFLTest is Test {
    NFLPickEms public nflPickEms;
    MockUSDC public mockUSDC;
    
    address public owner;
    address public oracle;
    address public player1;
    
    uint256 public constant ENTRY_FEE = 2_000_000; // 2 USDC with 6 decimals
    uint256 public constant VALID_PICKS_MASK = 0x3FF; // Binary: 1111111111 (10 picks)
    
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
        
        // Mint USDC to player for testing
        mockUSDC.mint(player1, 100_000_000); // 100 USDC
        
        // Pre-approve USDC spending
        vm.prank(player1);
        mockUSDC.approve(address(nflPickEms), type(uint256).max);
    }
    
    function testBasicEntry() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        
        vm.prank(oracle);
        nflPickEms.createWeek(1, 16, lockTime);
        
        // Add only the first 10 games needed for 10 picks
        for (uint8 i = 0; i < 10; i++) {
            vm.prank(oracle);
            nflPickEms.addGame(1, i, uint64(block.timestamp + 3600 + uint256(i) * 60));
        }
        
        // Now try the entry
        console.log("About to enter picks");
        vm.prank(player1);
        nflPickEms.enter(1, VALID_PICKS_MASK);
        
        console.log("Entry successful");
        
        // Check the results
        (uint256 storedPicks,,,) = nflPickEms.getPlayerPicks(1, player1);
        assertEq(storedPicks, VALID_PICKS_MASK);
        
        // Check USDC was transferred
        assertEq(mockUSDC.balanceOf(address(nflPickEms)), ENTRY_FEE);
        assertEq(mockUSDC.balanceOf(player1), 100_000_000 - ENTRY_FEE);
    }
    
    function testStepByStep() public {
        console.log("Starting step by step test");
        
        uint64 lockTime = uint64(block.timestamp + 7200);
        console.log("Block timestamp:", block.timestamp);
        console.log("Lock time:", lockTime);
        
        vm.prank(oracle);
        nflPickEms.createWeek(1, 16, lockTime);
        console.log("Week created successfully");
        
        // Add games one by one
        for (uint8 i = 0; i < 10; i++) {
            uint64 gameStartTime = uint64(block.timestamp + 3600 + uint256(i) * 60);
            console.log("Adding game", i, "with start time", gameStartTime);
            vm.prank(oracle);
            nflPickEms.addGame(1, i, gameStartTime);
        }
        console.log("All games added successfully");
        
        // Try to enter
        console.log("Player1 balance before:", mockUSDC.balanceOf(player1));
        console.log("Contract balance before:", mockUSDC.balanceOf(address(nflPickEms)));
        console.log("Picks mask:", VALID_PICKS_MASK);
        
        vm.prank(player1);
        nflPickEms.enter(1, VALID_PICKS_MASK);
        
        console.log("Entry completed successfully");
        console.log("Player1 balance after:", mockUSDC.balanceOf(player1));
        console.log("Contract balance after:", mockUSDC.balanceOf(address(nflPickEms)));
    }
}
