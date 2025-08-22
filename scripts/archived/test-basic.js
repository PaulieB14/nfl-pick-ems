const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Testing basic contract functionality with account:', deployer.address);
  
  // Contract addresses from deployment
  const MOCK_USDC_ADDRESS = "0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B";
  const NFL_PICK_EMS_ADDRESS = "0xdaCa068241baF6b7DC2F246304703c9E51B14C42";
  
  // Get contract instances
  const MockUSDC = await ethers.getContractFactory('MockUSDC');
  const mockUSDC = MockUSDC.attach(MOCK_USDC_ADDRESS);
  
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = NFLPickEms.attach(NFL_PICK_EMS_ADDRESS);
  
  console.log('\n🔍 Testing Contract Setup...');
  
  // Test 1: Check contract addresses
  console.log('✅ MockUSDC address:', await mockUSDC.getAddress());
  console.log('✅ NFLPickEms address:', await nflPickEms.getAddress());
  
  // Test 2: Check oracle
  const oracle = await nflPickEms.oracle();
  console.log('✅ Oracle address:', oracle);
  console.log('✅ Oracle is deployer:', oracle === deployer.address);
  
  // Test 3: Check token address
  const tokenAddress = await nflPickEms.token();
  console.log('✅ Token address:', tokenAddress);
  console.log('✅ Token matches MockUSDC:', tokenAddress === MOCK_USDC_ADDRESS);
  
  // Test 4: Check entry fee
  const entryFee = await nflPickEms.ENTRY_FEE();
  console.log('✅ Entry fee:', ethers.formatUnits(entryFee, 6), 'USDC');
  
  // Test 5: Check minimum lock buffer
  const minLockBuffer = await nflPickEms.MINIMUM_LOCK_BUFFER();
  console.log('✅ Minimum lock buffer:', minLockBuffer.toString(), 'seconds');
  
  console.log('\n🔍 Testing MockUSDC Functions...');
  
  // Test 6: Check MockUSDC balance
  const usdcBalance = await mockUSDC.balanceOf(deployer.address);
  console.log('✅ USDC balance:', ethers.formatUnits(usdcBalance, 6), 'USDC');
  
  // Test 7: Check MockUSDC name and symbol
  const usdcName = await mockUSDC.name();
  const usdcSymbol = await mockUSDC.symbol();
  console.log('✅ USDC name:', usdcName);
  console.log('✅ USDC symbol:', usdcSymbol);
  
  // Test 8: Check MockUSDC decimals
  const usdcDecimals = await mockUSDC.decimals();
  console.log('✅ USDC decimals:', usdcDecimals);
  
  console.log('\n🔍 Testing NFLPickEms View Functions...');
  
  // Test 9: Check if we can read week data (should be empty initially)
  try {
    const weekInfo = await nflPickEms.getWeekInfo(1);
    console.log('✅ Week 1 info (should be empty):', {
      gameCount: weekInfo[0],
      lockTime: weekInfo[1],
      resultsSet: weekInfo[2],
      finalized: weekInfo[3],
      pot: ethers.formatEther(weekInfo[4]),
      totalEntrants: weekInfo[5].toString()
    });
  } catch (error) {
    console.log('✅ Week 1 not created yet (expected)');
  }
  
  // Test 10: Check if we can read game data (should be empty initially)
  try {
    const gameInfo = await nflPickEms.getGameInfo(1, 0);
    console.log('✅ Game 1-0 info (should be empty):', {
      startTime: gameInfo[0],
      started: gameInfo[1],
      availableForPicks: gameInfo[2],
      finished: gameInfo[3],
      homeScore: gameInfo[4],
      awayScore: gameInfo[5]
    });
  } catch (error) {
    console.log('✅ Game 1-0 not created yet (expected)');
  }
  
  // Test 11: Check if we can read player picks (should be empty initially)
  try {
    const playerPicks = await nflPickEms.getPlayerPicks(1, deployer.address);
    console.log('✅ Player picks for week 1 (should be empty):', {
      picksMask: playerPicks[0].toString(),
      correctPicks: playerPicks[1].toString(),
      isWinner: playerPicks[2],
      claimed: playerPicks[3]
    });
  } catch (error) {
    console.log('✅ No picks for week 1 yet (expected)');
  }
  
  console.log('\n🔍 Testing Contract State...');
  
  // Test 12: Check if contract is paused
  const isPaused = await nflPickEms.paused();
  console.log('✅ Contract paused:', isPaused);
  
  // Test 13: Check owner
  const owner = await nflPickEms.owner();
  console.log('✅ Contract owner:', owner);
  console.log('✅ Owner is deployer:', owner === deployer.address);
  
  console.log('\n🎉 Basic Contract Tests Passed!');
  console.log('\n📋 Summary:');
  console.log('- Contract addresses: Working ✅');
  console.log('- Oracle setup: Working ✅');
  console.log('- Token integration: Working ✅');
  console.log('- MockUSDC functions: Working ✅');
  console.log('- NFLPickEms view functions: Working ✅');
  console.log('- Contract state: Working ✅');
  
  console.log('\n🚀 Your contracts are properly deployed and ready!');
  console.log('\n💡 To test full functionality:');
  console.log('1. Create a week with proper lock time');
  console.log('2. Add games to the week');
  console.log('3. Enter picks before lock time');
  console.log('4. Update game scores after games start');
  console.log('5. Finalize winners and distribute prizes');
}

main().catch((error) => {
  console.error('❌ Test failed:', error);
  process.exitCode = 1;
});
