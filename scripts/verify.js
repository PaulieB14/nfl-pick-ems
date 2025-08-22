const { ethers } = require('hardhat');

async function main() {
  console.log('🔍 Verifying contracts on Basescan...');
  
  // Contract addresses (replace with your deployed addresses)
  const MOCK_USDC_ADDRESS = process.env.MOCK_USDC_ADDRESS;
  const NFL_PICK_EMS_ADDRESS = process.env.NFL_PICK_EMS_ADDRESS;
  
  if (!MOCK_USDC_ADDRESS || !NFL_PICK_EMS_ADDRESS) {
    console.error('❌ Please set MOCK_USDC_ADDRESS and NFL_PICK_EMS_ADDRESS in your .env file');
    process.exit(1);
  }

  console.log('📦 Verifying MockUSDC...');
  try {
    await hre.run('verify:verify', {
      address: MOCK_USDC_ADDRESS,
      constructorArguments: [],
    });
    console.log('✅ MockUSDC verified successfully!');
  } catch (error) {
    console.log('⚠️ MockUSDC verification failed (might already be verified):', error.message);
  }

  console.log('\n🏈 Verifying NFLPickEms...');
  try {
    await hre.run('verify:verify', {
      address: NFL_PICK_EMS_ADDRESS,
      constructorArguments: [MOCK_USDC_ADDRESS],
    });
    console.log('✅ NFLPickEms verified successfully!');
  } catch (error) {
    console.log('⚠️ NFLPickEms verification failed (might already be verified):', error.message);
  }

  console.log('\n🎉 Verification process complete!');
  console.log('🔗 View on Basescan:');
  console.log(`MockUSDC: https://sepolia.basescan.org/address/${MOCK_USDC_ADDRESS}`);
  console.log(`NFLPickEms: https://sepolia.basescan.org/address/${NFL_PICK_EMS_ADDRESS}`);
}

main().catch((error) => {
  console.error('❌ Verification failed:', error);
  process.exitCode = 1;
});

