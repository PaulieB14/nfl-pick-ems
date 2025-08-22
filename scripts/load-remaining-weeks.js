const { ethers } = require('hardhat');

async function main() {
  console.log('🏈 Loading remaining weeks (16-18) into smart contract...');
  
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = NFLPickEms.attach('0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06');
  
  // Remaining weeks to load
  const weeks = [
    { weekId: 16, startDate: '2025-12-18', lockTime: '2025-12-18T19:15:00-05:00', gameCount: 16 },
    { weekId: 17, startDate: '2025-12-25', lockTime: '2025-12-25T12:00:00-05:00', gameCount: 16 }, // Christmas week
    { weekId: 18, startDate: '2026-01-03', lockTime: '2026-01-03T12:00:00-05:00', gameCount: 16 }  // Final week
  ];

  try {
    for (const week of weeks) {
      console.log(`\n📅 Creating Week ${week.weekId}...`);
      
      const lockTimeUnix = Math.floor(new Date(week.lockTime).getTime() / 1000);
      
      const createWeekTx = await nflPickEms.createWeek(
        week.weekId, 
        week.gameCount, 
        lockTimeUnix
      );
      await createWeekTx.wait();
      
      console.log(`✅ Week ${week.weekId} created: ${week.gameCount} games, locks ${week.lockTime}`);
      
      // Delay between transactions
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log('\n🎉 ENTIRE 2025 NFL SEASON COMPLETE!');
    console.log('📊 Final Summary:');
    console.log('• All 18 weeks loaded in smart contract');
    console.log('• Week 1: 16 games loaded and ready');
    console.log('• Weeks 2-18: Ready for individual games');
    console.log('• Your app is ready for the full NFL season!');
    
  } catch (error) {
    console.error('❌ Error loading remaining weeks:', error);
  }
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exitCode = 1;
});
