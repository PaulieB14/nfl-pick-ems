const { ethers } = require('hardhat');

async function main() {
  // Connect to Ethereum Sepolia
  const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
  const wallet = new ethers.Wallet(process.env.WALLET_KEY, provider);
  
  const balance = await provider.getBalance(wallet.address);
  
  console.log('Wallet address:', wallet.address);
  console.log('Balance on Ethereum Sepolia:', ethers.formatEther(balance), 'ETH');
  
  if (balance > ethers.parseEther('0.01')) {
    console.log('✅ You have Sepolia ETH! You can bridge it to Base Sepolia.');
    console.log('🌉 Bridge URL: https://bridge.base.org/');
    console.log('💡 Select Sepolia testnet on both sides');
  } else {
    console.log('❌ No Sepolia ETH found. Get some from:');
    console.log('   https://sepoliafaucet.com/');
    console.log('   https://faucet.sepolia.dev/');
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
