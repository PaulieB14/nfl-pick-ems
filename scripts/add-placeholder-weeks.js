const fs = require('fs');
const path = require('path');

// Add placeholder weeks 9-18
const placeholderWeeks = [];

for (let week = 9; week <= 18; week++) {
  const gameCount = week === 5 ? 14 : week === 6 || week === 7 ? 15 : week === 8 ? 13 : week === 9 || week === 10 || week === 14 ? 14 : week === 11 || week === 12 || week === 15 ? 15 : 16;
  
  for (let game = 1; game <= gameCount; game++) {
    placeholderWeeks.push({
      id: `week${week}-game${game}`,
      week: week,
      date: `Week ${week} - TBD`,
      time: "TBD",
      home: "TBD",
      away: "TBD",
      network: "TBD"
    });
  }
}

// Read current schedule
const schedulePath = path.join(__dirname, '../lib/nflSchedule.ts');
let scheduleContent = fs.readFileSync(schedulePath, 'utf8');

// Find where to insert the new games (before the closing bracket)
const insertIndex = scheduleContent.lastIndexOf(']');
if (insertIndex !== -1) {
  // Convert games to string format
  const gamesString = placeholderWeeks.map(game => {
    return `  {
    id: "${game.id}",
    week: ${game.week},
    date: "${game.date}",
    time: "${game.time}",
    home: "${game.home}",
    away: "${game.away}",
    network: "${game.network}"
  }`;
  }).join(',\n');

  // Insert the new games
  scheduleContent = scheduleContent.slice(0, insertIndex) + ',\n' + gamesString + '\n' + scheduleContent.slice(insertIndex);
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('✅ Added placeholder weeks 9-18 to schedule!');
  console.log('📊 Total weeks now available: 1-18');
} else {
  console.log('❌ Could not find insertion point');
}
