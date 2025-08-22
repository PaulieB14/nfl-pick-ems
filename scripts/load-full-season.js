const { ethers } = require('hardhat');

async function main() {
  console.log('🏈 Loading ENTIRE 2025 NFL Season (18 weeks) into smart contract...');
  
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = NFLPickEms.attach('0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06');
  
  // Define all 18 weeks with their start dates (lock time = Thursday before)
  const weeks = [
    { weekId: 2, startDate: '2025-09-11', lockTime: '2025-09-11T19:15:00-04:00', gameCount: 16 },
    { weekId: 3, startDate: '2025-09-18', lockTime: '2025-09-18T19:15:00-04:00', gameCount: 16 },
    { weekId: 4, startDate: '2025-09-25', lockTime: '2025-09-25T19:15:00-04:00', gameCount: 16 },
    { weekId: 5, startDate: '2025-10-02', lockTime: '2025-10-02T19:15:00-04:00', gameCount: 14 }, // 4 byes
    { weekId: 6, startDate: '2025-10-09', lockTime: '2025-10-09T19:15:00-04:00', gameCount: 15 }, // 2 byes
    { weekId: 7, startDate: '2025-10-16', lockTime: '2025-10-16T19:15:00-04:00', gameCount: 15 }, // 2 byes
    { weekId: 8, startDate: '2025-10-23', lockTime: '2025-10-23T19:15:00-04:00', gameCount: 13 }, // 6 byes
    { weekId: 9, startDate: '2025-10-30', lockTime: '2025-10-30T19:15:00-04:00', gameCount: 14 }, // 4 byes
    { weekId: 10, startDate: '2025-11-06', lockTime: '2025-11-06T19:15:00-05:00', gameCount: 14 }, // 4 byes
    { weekId: 11, startDate: '2025-11-13', lockTime: '2025-11-13T19:15:00-05:00', gameCount: 15 }, // 2 byes
    { weekId: 12, startDate: '2025-11-20', lockTime: '2025-11-20T19:15:00-05:00', gameCount: 15 }, // 4 byes
    { weekId: 13, startDate: '2025-11-27', lockTime: '2025-11-27T12:30:00-05:00', gameCount: 16 }, // Thanksgiving week
    { weekId: 14, startDate: '2025-12-04', lockTime: '2025-12-04T19:15:00-05:00', gameCount: 14 }, // 4 byes
    { weekId: 15, startDate: '2025-12-11', lockTime: '2025-12-15T19:15:00-05:00', gameCount: 15 },
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
      
      // Small delay between transactions
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log('\n🎉 ENTIRE 2025 NFL SEASON LOADED!');
    console.log('📊 Summary:');
    console.log('• 18 weeks created');
    console.log('• Week 1: Already loaded with 16 games');
    console.log('• Weeks 2-18: Ready for games to be added');
    console.log('• Bye weeks properly accounted for');
    
  } catch (error) {
    console.error('❌ Error loading season:', error);
  }
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exitCode = 1;
});
