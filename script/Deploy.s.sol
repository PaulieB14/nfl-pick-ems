// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import {NFLPickEms} from "../contracts/NFLPickEms.sol";
import {MockUSDC} from "../contracts/MockUSDC.sol";

contract DeployScript is Script {
    function run() external {
        // Get deployer private key from environment (using WALLET_KEY from .env)
        uint256 deployerPrivateKey = vm.envUint("WALLET_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy MockUSDC first
        MockUSDC mockUsdc = new MockUSDC();
        console2.log("MockUSDC deployed at:", address(mockUsdc));
        
        // Deploy NFLPickEms with the USDC address
        NFLPickEms nflPickEms = new NFLPickEms(address(mockUsdc));
        console2.log("NFLPickEms deployed at:", address(nflPickEms));
        
        // Set oracle (deployer becomes oracle initially)
        address deployer = vm.addr(deployerPrivateKey);
        nflPickEms.setOracle(deployer);
        console2.log("Oracle set to:", deployer);
        
        // Mint some test USDC to deployer for testing
        mockUsdc.mint(deployer, 100_000_000); // 100 USDC
        console2.log("Minted 100 USDC to deployer");
        
        vm.stopBroadcast();
        
        console2.log("=== DEPLOYMENT COMPLETE ===");
        console2.log("MockUSDC:", address(mockUsdc));
        console2.log("NFLPickEms:", address(nflPickEms));
        console2.log("Oracle:", deployer);
        console2.log("Deployer:", deployer);
        console2.log("Network: Base Sepolia");
    }
}
