const fs = require('fs');
const path = require('path');

// Final weeks 16-18 from official NFL schedule
const weeks16to18 = [
  // WEEK 16
  {
    id: "week16-thu",
    week: 16,
    date: "Dec 18, 2025",
    time: "8:15 PM ET",
    home: "Seattle Seahawks",
    away: "Los Angeles Rams",
    network: "Prime Video"
  },
  {
    id: "week16-sat1",
    week: 16,
    date: "Dec 20, 2025",
    time: "TBD",
    home: "Chicago Bears",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week16-sat2",
    week: 16,
    date: "Dec 20, 2025",
    time: "TBD",
    home: "Washington Commanders",
    away: "Philadelphia Eagles",
    network: "FOX"
  },
  {
    id: "week16-sun1",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week16-sun2",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week16-sun3",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Buffalo Bills",
    network: "CBS"
  },
  {
    id: "week16-sun4",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "Dallas Cowboys",
    away: "Los Angeles Chargers",
    network: "FOX"
  },
  {
    id: "week16-sun5",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "New Orleans Saints",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week16-sun6",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "New York Giants",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week16-sun7",
    week: 16,
    date: "Dec 21, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "Kansas City Chiefs",
    network: "CBS"
  },
  {
    id: "week16-sun8",
    week: 16,
    date: "Dec 21, 2025",
    time: "4:05 PM ET",
    home: "Arizona Cardinals",
    away: "Atlanta Falcons",
    network: "FOX"
  },
  {
    id: "week16-sun9",
    week: 16,
    date: "Dec 21, 2025",
    time: "4:05 PM ET",
    home: "Denver Broncos",
    away: "Jacksonville Jaguars",
    network: "FOX"
  },
  {
    id: "week16-sun10",
    week: 16,
    date: "Dec 21, 2025",
    time: "4:25 PM ET",
    home: "Detroit Lions",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week16-sun11",
    week: 16,
    date: "Dec 21, 2025",
    time: "4:25 PM ET",
    home: "Houston Texans",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week16-sun12",
    week: 16,
    date: "Dec 21, 2025",
    time: "8:20 PM ET",
    home: "Miami Dolphins",
    away: "Cincinnati Bengals",
    network: "NBC"
  },
  {
    id: "week16-mon",
    week: 16,
    date: "Dec 22, 2025",
    time: "8:15 PM ET",
    home: "Indianapolis Colts",
    away: "San Francisco 49ers",
    network: "ESPN"
  },

  // WEEK 17 (Christmas Week)
  {
    id: "week17-thu1",
    week: 17,
    date: "Dec 25, 2025",
    time: "1:00 PM ET",
    home: "Washington Commanders",
    away: "Dallas Cowboys",
    network: "NETFLIX",
    isSpecial: "Christmas"
  },
  {
    id: "week17-thu2",
    week: 17,
    date: "Dec 25, 2025",
    time: "4:30 PM ET",
    home: "Minnesota Vikings",
    away: "Detroit Lions",
    network: "NETFLIX",
    isSpecial: "Christmas"
  },
  {
    id: "week17-thu3",
    week: 17,
    date: "Dec 25, 2025",
    time: "8:15 PM ET",
    home: "Kansas City Chiefs",
    away: "Denver Broncos",
    network: "Prime Video",
    isSpecial: "Christmas"
  },
  {
    id: "week17-sat1",
    week: 17,
    date: "Dec 27, 2025",
    time: "TBD",
    home: "Carolina Panthers",
    away: "Seattle Seahawks",
    network: "TBD"
  },
  {
    id: "week17-sat2",
    week: 17,
    date: "Dec 27, 2025",
    time: "TBD",
    home: "Cincinnati Bengals",
    away: "Arizona Cardinals",
    network: "TBD"
  },
  {
    id: "week17-sat3",
    week: 17,
    date: "Dec 27, 2025",
    time: "TBD",
    home: "Green Bay Packers",
    away: "Baltimore Ravens",
    network: "TBD"
  },
  {
    id: "week17-sat4",
    week: 17,
    date: "Dec 27, 2025",
    time: "TBD",
    home: "Los Angeles Chargers",
    away: "Houston Texans",
    network: "TBD"
  },
  {
    id: "week17-sat5",
    week: 17,
    date: "Dec 27, 2025",
    time: "TBD",
    home: "Las Vegas Raiders",
    away: "New York Giants",
    network: "TBD"
  },
  {
    id: "week17-sun1",
    week: 17,
    date: "Dec 28, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week17-sun2",
    week: 17,
    date: "Dec 28, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Jacksonville Jaguars",
    network: "FOX"
  },
  {
    id: "week17-sun3",
    week: 17,
    date: "Dec 28, 2025",
    time: "1:00 PM ET",
    home: "Miami Dolphins",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week17-sun4",
    week: 17,
    date: "Dec 28, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week17-sun5",
    week: 17,
    date: "Dec 28, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "New Orleans Saints",
    network: "CBS"
  },
  {
    id: "week17-sun6",
    week: 17,
    date: "Dec 28, 2025",
    time: "4:25 PM ET",
    home: "Buffalo Bills",
    away: "Philadelphia Eagles",
    network: "FOX"
  },
  {
    id: "week17-sun7",
    week: 17,
    date: "Dec 28, 2025",
    time: "8:20 PM ET",
    home: "San Francisco 49ers",
    away: "Chicago Bears",
    network: "NBC"
  },
  {
    id: "week17-mon",
    week: 17,
    date: "Dec 29, 2025",
    time: "8:15 PM ET",
    home: "Atlanta Falcons",
    away: "Los Angeles Rams",
    network: "ESPN"
  },

  // WEEK 18 (Final Week)
  {
    id: "week18-sat1",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Atlanta Falcons",
    away: "New Orleans Saints",
    network: "TBD"
  },
  {
    id: "week18-sat2",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Buffalo Bills",
    away: "New York Jets",
    network: "TBD"
  },
  {
    id: "week18-sat3",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Chicago Bears",
    away: "Detroit Lions",
    network: "TBD"
  },
  {
    id: "week18-sat4",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Cincinnati Bengals",
    away: "Cleveland Browns",
    network: "TBD"
  },
  {
    id: "week18-sat5",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Denver Broncos",
    away: "Los Angeles Chargers",
    network: "TBD"
  },
  {
    id: "week18-sat6",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Houston Texans",
    away: "Indianapolis Colts",
    network: "TBD"
  },
  {
    id: "week18-sat7",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Jacksonville Jaguars",
    away: "Tennessee Titans",
    network: "TBD"
  },
  {
    id: "week18-sat8",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Los Angeles Rams",
    away: "Arizona Cardinals",
    network: "TBD"
  },
  {
    id: "week18-sat9",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Las Vegas Raiders",
    away: "Kansas City Chiefs",
    network: "TBD"
  },
  {
    id: "week18-sat10",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Minnesota Vikings",
    away: "Green Bay Packers",
    network: "TBD"
  },
  {
    id: "week18-sat11",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "New England Patriots",
    away: "Miami Dolphins",
    network: "TBD"
  },
  {
    id: "week18-sat12",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "New York Giants",
    away: "Dallas Cowboys",
    network: "TBD"
  },
  {
    id: "week18-sat13",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Philadelphia Eagles",
    away: "Washington Commanders",
    network: "TBD"
  },
  {
    id: "week18-sat14",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Pittsburgh Steelers",
    away: "Baltimore Ravens",
    network: "TBD"
  },
  {
    id: "week18-sat15",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "San Francisco 49ers",
    away: "Seattle Seahawks",
    network: "TBD"
  },
  {
    id: "week18-sat16",
    week: 18,
    date: "Jan 3-4, 2026",
    time: "TBD",
    home: "Tampa Bay Buccaneers",
    away: "Carolina Panthers",
    network: "TBD"
  }
];

// Read current schedule
const schedulePath = path.join(__dirname, '../lib/nflSchedule.ts');
let scheduleContent = fs.readFileSync(schedulePath, 'utf8');

// Find where to insert the new games (before the closing bracket)
const insertIndex = scheduleContent.lastIndexOf(']');
if (insertIndex !== -1) {
  // Convert games to string format
  const gamesString = weeks16to18.map(game => {
    return `  {
    id: "${game.id}",
    week: ${game.week},
    date: "${game.date}",
    time: "${game.time}",
    home: "${game.home}",
    away: "${game.away}",
    network: "${game.network}"${game.isSpecial ? `,
    isSpecial: "${game.isSpecial}"` : ''}
  }`;
  }).join(',\n');

  // Insert the new games
  scheduleContent = scheduleContent.slice(0, insertIndex) + ',\n' + gamesString + '\n' + scheduleContent.slice(insertIndex);
  
  // Update the function to include ALL weeks
  scheduleContent = scheduleContent.replace(
    'if (week <= 15) {',
    'if (week <= 18) {'
  );
  scheduleContent = scheduleContent.replace(
    '// For weeks 16-18, return placeholder games',
    '// All weeks now have real data!'
  );
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('🎉 COMPLETE! Added real schedule data for ALL 18 weeks!');
  console.log('🏈 Total weeks with real data: 1-18 (100% complete)');
  console.log('✅ Your NFL Pick \'ems app now has the complete 2025 NFL schedule!');
} else {
  console.log('❌ Could not find insertion point');
}
