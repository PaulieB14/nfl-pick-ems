const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('🔍 Checking Week 1 Games');
  
  const NFL_PICK_EMS_ADDRESS = "0xdaCa068241baF6b7DC2F246304703c9E51B14C42";
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = NFLPickEms.attach(NFL_PICK_EMS_ADDRESS);
  
  console.log('\n📊 Week 1 Games:');
  
  for (let gameIndex = 0; gameIndex < 16; gameIndex++) {
    try {
      const gameInfo = await nflPickEms.getGameInfo(1, gameIndex);
      if (gameInfo[0] > 0) { // If startTime > 0, game exists
        console.log(`Game ${gameIndex}:`, {
          startTime: new Date(Number(gameInfo[0]) * 1000).toLocaleString(),
          started: gameInfo[1],
          availableForPicks: gameInfo[2],
          finished: gameInfo[3],
          homeScore: gameInfo[4],
          awayScore: gameInfo[5]
        });
      }
    } catch (error) {
      // Game doesn't exist
    }
  }
  
  console.log('\n🎯 Week 1 Summary:');
  const weekInfo = await nflPickEms.getWeekInfo(1);
  console.log({
    gameCount: weekInfo[0].toString(),
    lockTime: new Date(Number(weekInfo[1]) * 1000).toLocaleString(),
    resultsSet: weekInfo[2],
    finalized: weekInfo[3],
    pot: ethers.formatEther(weekInfo[4]),
    totalEntrants: weekInfo[5].toString()
  });
  
  console.log('\n✅ Week 1 is ready for picks!');
  console.log('💡 Users can now enter picks for the 16 games before the lock time.');
}

main().catch((error) => {
  console.error('❌ Error:', error);
  process.exitCode = 1;
});
