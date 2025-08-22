const { ethers } = require('hardhat');

async function main() {
  console.log('🏈 Loading Week 1 NFL games into smart contract...');
  
  // Get the deployed contract
  const NFLPickEms = await ethers.getContractFactory('NFLPickEms');
  const nflPickEms = NFLPickEms.attach('0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06');
  
  // Week 1 games data (2025 NFL Season) - Official NFL Schedule
  const week1Games = [
    {
      awayTeam: "Dallas Cowboys",
      homeTeam: "Philadelphia Eagles",
      startTime: Math.floor(new Date('2025-09-04T20:20:00-04:00').getTime() / 1000),
      network: "NBC"
    },
    {
      awayTeam: "Kansas City Chiefs",
      homeTeam: "Los Angeles Chargers",
      startTime: Math.floor(new Date('2025-09-05T20:00:00-04:00').getTime() / 1000),
      network: "YouTube"
    },
    {
      awayTeam: "Tampa Bay Buccaneers",
      homeTeam: "Atlanta Falcons",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "Cincinnati Bengals",
      homeTeam: "Cleveland Browns",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "Miami Dolphins",
      homeTeam: "Indianapolis Colts",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "Carolina Panthers",
      homeTeam: "Jacksonville Jaguars",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "Las Vegas Raiders",
      homeTeam: "New England Patriots",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "Arizona Cardinals",
      homeTeam: "New Orleans Saints",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "Pittsburgh Steelers",
      homeTeam: "New York Jets",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "New York Giants",
      homeTeam: "Washington Commanders",
      startTime: Math.floor(new Date('2025-09-07T13:00:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "Tennessee Titans",
      homeTeam: "Denver Broncos",
      startTime: Math.floor(new Date('2025-09-07T16:05:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "San Francisco 49ers",
      homeTeam: "Seattle Seahawks",
      startTime: Math.floor(new Date('2025-09-07T16:25:00-04:00').getTime() / 1000),
      network: "FOX"
    },
    {
      awayTeam: "Detroit Lions",
      homeTeam: "Green Bay Packers",
      startTime: Math.floor(new Date('2025-09-07T16:25:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "Houston Texans",
      homeTeam: "Los Angeles Rams",
      startTime: Math.floor(new Date('2025-09-07T20:20:00-04:00').getTime() / 1000),
      network: "CBS"
    },
    {
      awayTeam: "Baltimore Ravens",
      homeTeam: "Buffalo Bills",
      startTime: Math.floor(new Date('2025-09-07T20:20:00-04:00').getTime() / 1000),
      network: "NBC"
    },
    {
      awayTeam: "Minnesota Vikings",
      homeTeam: "Chicago Bears",
      startTime: Math.floor(new Date('2025-09-08T20:15:00-04:00').getTime() / 1000),
      network: "ABC/ESPN"
    }
  ];
  
  // Set lock time to 2 hours from now (minimum 1 hour buffer)
  const lockTime = Math.floor(Date.now() / 1000) + (2 * 60 * 60); // 2 hours from now
  
  try {
    // Create Week 1
    console.log('Creating Week 1...');
    const createWeekTx = await nflPickEms.createWeek(1, 16, lockTime); // weekId, gameCount, lockTime
    await createWeekTx.wait();
    console.log('✅ Week 1 created successfully');
    
    // Add all games
    console.log('Adding games...');
    for (let i = 0; i < week1Games.length; i++) {
      const game = week1Games[i];
      console.log(`Adding game ${i + 1}: ${game.awayTeam} @ ${game.homeTeam}`);
      
      const addGameTx = await nflPickEms.addGame(
        1, // weekId
        i, // gameIndex (0-15)
        game.startTime
      );
      await addGameTx.wait();
      
      // Small delay between transactions
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log('✅ All Week 1 games loaded successfully!');
    console.log(`📅 Lock time: ${new Date(lockTime * 1000).toLocaleString()}`);
    console.log(`🎯 Total games: ${week1Games.length}`);
    
  } catch (error) {
    console.error('❌ Error loading games:', error);
  }
}

main().catch((error) => {
  console.error('❌ Script failed:', error);
  process.exitCode = 1;
});
