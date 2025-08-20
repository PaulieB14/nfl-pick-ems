const { ethers } = require('hardhat');

async function main() {
  // Deploy MockUSDC first
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy();
  await mockUSDC.waitForDeployment();
  console.log('MockUSDC deployed to:', await mockUSDC.getAddress());

  // Deploy NFLPickEms
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = await NFLPickEms.deploy(await mockUSDC.getAddress());
  await nflPickEms.waitForDeployment();
  console.log('NFLPickEms deployed to:', await nflPickEms.getAddress());

  // Set oracle (deployer becomes oracle)
  const [deployer] = await ethers.getSigners();
  await nflPickEms.setOracle(deployer.address);
  console.log('Oracle set to:', deployer.address);

  console.log('Deployment complete!');
  console.log('MockUSDC:', await mockUSDC.getAddress());
  console.log('NFLPickEms:', await nflPickEms.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
