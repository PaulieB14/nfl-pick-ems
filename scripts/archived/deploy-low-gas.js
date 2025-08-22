const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);
  
  // Get current balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', ethers.formatEther(balance), 'ETH');

  // Deploy MockUSDC first with lower gas price
  console.log('Deploying MockUSDC...');
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy({
    gasPrice: ethers.parseUnits('0.1', 'gwei') // Very low gas price
  });
  await mockUSDC.waitForDeployment();
  console.log('MockUSDC deployed to:', await mockUSDC.getAddress());

  // Deploy NFLPickEms with lower gas price
  console.log('Deploying NFLPickEms...');
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = await NFLPickEms.deploy(await mockUSDC.getAddress(), {
    gasPrice: ethers.parseUnits('0.1', 'gwei') // Very low gas price
  });
  await nflPickEms.waitForDeployment();
  console.log('NFLPickEms deployed to:', await nflPickEms.getAddress());

  // Set oracle (deployer becomes oracle)
  console.log('Setting oracle...');
  await nflPickEms.setOracle(deployer.address, {
    gasPrice: ethers.parseUnits('0.1', 'gwei')
  });
  console.log('Oracle set to:', deployer.address);

  console.log('Deployment complete!');
  console.log('MockUSDC:', await mockUSDC.getAddress());
  console.log('NFLPickEms:', await nflPickEms.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
