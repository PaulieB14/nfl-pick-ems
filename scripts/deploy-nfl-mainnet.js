const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Starting NFL Pick 'ems deployment to Base mainnet...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.001")) {
    throw new Error("❌ Insufficient ETH balance for deployment");
  }
  
  // Base mainnet USDC address (verified)
  const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  console.log("🪙 Using USDC address:", USDC_ADDRESS);
  
  // Deploy NFLPickEms contract
  console.log("📦 Deploying NFLPickEms contract...");
  const NFLPickEms = await ethers.getContractFactory("NFLPickEms");
  
  // Deploy with USDC address as constructor parameter
  const nflPickEms = await NFLPickEms.deploy(USDC_ADDRESS);
  
  // Wait for deployment to complete
  await nflPickEms.waitForDeployment();
  const nflAddress = await nflPickEms.getAddress();
  
  console.log("✅ NFLPickEms deployed to:", nflAddress);
  console.log("🔗 View on BaseScan:", `https://basescan.org/address/${nflAddress}`);
  
  // Verify deployment
  console.log("🔍 Verifying deployment...");
  try {
    const entryFee = await nflPickEms.ENTRY_FEE();
    console.log("✅ Entry fee:", ethers.formatUnits(entryFee, 6), "USDC");

    const usdcToken = await nflPickEms.token();
    console.log("✅ USDC token address:", usdcToken);
    
    const owner = await nflPickEms.owner();
    console.log("✅ Contract owner:", owner);
    
  } catch (error) {
    console.log("⚠️ Verification warning:", error.message);
  }
  
  console.log("\n🎯 Deployment Summary:");
  console.log("- NFLPickEms:", nflAddress);
  console.log("- USDC Token:", USDC_ADDRESS);
  console.log("- Network: Base Mainnet (Chain ID: 8453)");
  console.log("- Deployer:", deployer.address);
  
  console.log("\n📝 Next steps:");
  console.log("1. Update frontend with new contract address");
  console.log("2. Verify contract on BaseScan");
  console.log("3. Test contract functions");
  
  return {
    nflPickEms: nflAddress,
    usdc: USDC_ADDRESS,
    deployer: deployer.address
  };
}

main()
  .then((result) => {
    console.log("\n🎉 Deployment completed successfully!");
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
