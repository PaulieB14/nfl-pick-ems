// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Script, console2} from "forge-std/Script.sol";
import {NFLPickEms} from "../contracts/NFLPickEms.sol";

contract DeployCorrectScript is Script {
    function run() external {
        // Get deployer private key from environment
        uint256 deployerPrivateKey = vm.envUint("WALLET_KEY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy NFLPickEms with the USDC address your frontend expects
        address correctUsdc = 0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B;
        NFLPickEms nflPickEms = new NFLPickEms(correctUsdc);
        console2.log("NFLPickEms deployed at:", address(nflPickEms));
        
        // Set oracle (deployer becomes oracle initially)
        address deployer = vm.addr(deployerPrivateKey);
        nflPickEms.setOracle(deployer);
        console2.log("Oracle set to:", deployer);
        
        vm.stopBroadcast();
        
        console2.log("=== DEPLOYMENT COMPLETE ===");
        console2.log("NFLPickEms:", address(nflPickEms));
        console2.log("USDC:", correctUsdc);
        console2.log("Oracle:", deployer);
        console2.log("Network: Base Sepolia");
    }
}
