const { ethers } = require('hardhat');

async function main() {
  console.log('🚀 Starting NFL Pick Ems deployment to Base Sepolia...');
  
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log('👤 Deploying with account:', deployer.address);
  console.log('💰 Account balance:', ethers.formatEther(await deployer.provider.getBalance(deployer.address)), 'ETH');

  // Deploy MockUSDC first
  console.log('\n📦 Deploying MockUSDC...');
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  const mockUSDCAddress = await mockUSDC.getAddress();
  console.log('✅ MockUSDC deployed to:', mockUSDCAddress);

  // Deploy NFLPickEms
  console.log('\n🏈 Deploying NFLPickEms...');
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = await NFLPickEms.deploy(mockUSDCAddress);
  await nflPickEms.waitForDeployment();
  const nflPickEmsAddress = await nflPickEms.getAddress();
  console.log('✅ NFLPickEms deployed to:', nflPickEmsAddress);

  // Set oracle (deployer becomes oracle)
  console.log('\n🔧 Setting oracle...');
  await nflPickEms.setOracle(deployer.address);
  console.log('✅ Oracle set to:', deployer.address);

  // Verify deployment
  console.log('\n🔍 Verifying deployment...');
  const oracle = await nflPickEms.oracle();
  const token = await nflPickEms.token();
  
  console.log('✅ Oracle verification:', oracle === deployer.address);
  console.log('✅ Token verification:', token === mockUSDCAddress);

  console.log('\n🎉 Deployment complete!');
  console.log('='.repeat(50));
  console.log('📋 Contract Addresses:');
  console.log('MockUSDC:', mockUSDCAddress);
  console.log('NFLPickEms:', nflPickEmsAddress);
  console.log('Oracle:', deployer.address);
  console.log('='.repeat(50));
  
  console.log('\n🔗 View on Basescan:');
  console.log(`MockUSDC: https://sepolia.basescan.org/address/${mockUSDCAddress}`);
  console.log(`NFLPickEms: https://sepolia.basescan.org/address/${nflPickEmsAddress}`);
  
  console.log('\n📝 Next steps:');
  console.log('1. Verify contracts on Basescan');
  console.log('2. Update .env with contract addresses');
  console.log('3. Set up oracle service');
  console.log('4. Test the contracts');
}

main().catch((error) => {
  console.error('❌ Deployment failed:', error);
  process.exitCode = 1;
});

