// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "forge-std/Test.sol";
import "../contracts/NFLPickEms.sol";
import "../contracts/MockUSDC.sol";

contract ArithmeticDebugTest is Test {
    NFLPickEms public nflPickEms;
    MockUSDC public mockUSDC;
    
    address public oracle;
    uint256 public constant WEEK_1 = 1;
    uint8 public constant GAME_COUNT = 16;
    
    function setUp() public {
        oracle = makeAddr("oracle");
        
        // Deploy MockUSDC
        mockUSDC = new MockUSDC();
        
        // Deploy NFLPickEms contract
        nflPickEms = new NFLPickEms(address(mockUSDC));
        
        // Set oracle after deployment
        nflPickEms.setOracle(oracle);
    }
    
    function testArithmeticInLoop() public {
        // Test basic arithmetic operations that mirror the failing tests
        uint256 baseTime = block.timestamp;
        console.log("block.timestamp:", baseTime);
        
        for (uint8 i = 0; i < 10; i++) {
            uint256 calculation = baseTime + 3600 + i * 60;
            uint64 startTime = uint64(calculation);
            console.log("i:", i);
            console.log("calculation:", calculation);
            console.log("startTime:", startTime);
            
            // Check if the calculation or cast could overflow
            assertLe(calculation, type(uint64).max, "Calculation exceeds uint64 max");
        }
    }
    
    function testAddGamesStepByStep() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        console.log("Starting to add games...");
        
        // Add games one by one to identify exactly where it fails
        for (uint8 i = 0; i < 10; i++) {
            console.log("Adding game:", i);
            uint256 baseCalc = block.timestamp + 3600;
            uint256 offsetCalc = i * 60;
            uint256 fullCalc = baseCalc + offsetCalc;
            uint64 startTime = uint64(fullCalc);
            
            console.log("baseCalc:", baseCalc);
            console.log("offsetCalc:", offsetCalc);
            console.log("fullCalc:", fullCalc);
            console.log("startTime:", startTime);
            
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTime);
            
            console.log("Successfully added game:", i);
        }
    }
    
    function testAddGamesWithDirectValues() public {
        uint64 lockTime = uint64(block.timestamp + 7200);
        vm.prank(oracle);
        nflPickEms.createWeek(WEEK_1, GAME_COUNT, lockTime);
        
        // Test adding games with hardcoded values to avoid any arithmetic in the test
        uint64[10] memory startTimes = [
            uint64(3601), uint64(3661), uint64(3721), uint64(3781), uint64(3841),
            uint64(3901), uint64(3961), uint64(4021), uint64(4081), uint64(4141)
        ];
        
        for (uint8 i = 0; i < 10; i++) {
            console.log("Adding game:", i);
            console.log("with startTime:", startTimes[i]);
            vm.prank(oracle);
            nflPickEms.addGame(WEEK_1, i, startTimes[i]);
            console.log("Successfully added game:", i);
        }
    }
}
