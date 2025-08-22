const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  
  console.log('Wallet address:', deployer.address);
  console.log('Balance on Base Sepolia:', ethers.formatEther(balance), 'ETH');
  
  if (balance < ethers.parseEther('0.01')) {
    console.log('⚠️  Warning: Low balance! You need at least 0.01 ETH for deployment.');
    console.log('💡 Get testnet ETH from: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet');
  } else {
    console.log('✅ Sufficient balance for deployment!');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
