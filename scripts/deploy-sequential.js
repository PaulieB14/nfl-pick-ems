const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  
  // Get current balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // Deploy MockUSDC first
  console.log('Deploying MockUSDC...');
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy();
  console.log('MockUSDC deployment transaction sent...');
  await mockUSDC.waitForDeployment();
  const mockUSDCAddress = await mockUSDC.getAddress();
  console.log('MockUSDC deployed to:', mockUSDCAddress);

  // Wait a moment for the transaction to be processed
  console.log('Waiting for transaction to be processed...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Deploy NFLPickEms
  console.log('Deploying NFLPickEms...');
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = await NFLPickEms.deploy(mockUSDCAddress);
  console.log('NFLPickEms deployment transaction sent...');
  await nflPickEms.waitForDeployment();
  const nflPickEmsAddress = await nflPickEms.getAddress();
  console.log('NFLPickEms deployed to:', nflPickEmsAddress);

  // Wait a moment for the transaction to be processed
  console.log('Waiting for transaction to be processed...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Set oracle (deployer becomes oracle)
  console.log('Setting oracle...');
  const setOracleTx = await nflPickEms.setOracle(deployer.address);
  console.log('Oracle setting transaction sent...');
  await setOracleTx.wait();
  console.log('Oracle set to:', deployer.address);

  console.log('\n🎉 Deployment complete!');
  console.log('MockUSDC:', mockUSDCAddress);
  console.log('NFLPickEms:', nflPickEmsAddress);
  console.log('Oracle:', deployer.address);
  
  console.log('\n📋 Next steps:');
  console.log('1. Verify contracts on BaseScan');
  console.log('2. Update your frontend with these addresses');
  console.log('3. Test the contracts on Base Sepolia');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
