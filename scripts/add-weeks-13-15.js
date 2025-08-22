const fs = require('fs');
const path = require('path');

// Weeks 13-15 from official NFL schedule
const weeks13to15 = [
  // WEEK 13 (Thanksgiving Week)
  {
    id: "week13-thu1",
    week: 13,
    date: "Nov 27, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Green Bay Packers",
    network: "FOX",
    isSpecial: "Thanksgiving"
  },
  {
    id: "week13-thu2",
    week: 13,
    date: "Nov 27, 2025",
    time: "4:30 PM ET",
    home: "Dallas Cowboys",
    away: "Kansas City Chiefs",
    network: "CBS",
    isSpecial: "Thanksgiving"
  },
  {
    id: "week13-thu3",
    week: 13,
    date: "Nov 27, 2025",
    time: "8:20 PM ET",
    home: "Baltimore Ravens",
    away: "Cincinnati Bengals",
    network: "NBC",
    isSpecial: "Thanksgiving"
  },
  {
    id: "week13-fri",
    week: 13,
    date: "Nov 28, 2025",
    time: "3:00 PM ET",
    home: "Philadelphia Eagles",
    away: "Chicago Bears",
    network: "Prime Video"
  },
  {
    id: "week13-sun1",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "Los Angeles Rams",
    network: "FOX"
  },
  {
    id: "week13-sun2",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "San Francisco 49ers",
    network: "CBS"
  },
  {
    id: "week13-sun3",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Houston Texans",
    network: "CBS"
  },
  {
    id: "week13-sun4",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Miami Dolphins",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week13-sun5",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "Atlanta Falcons",
    network: "FOX"
  },
  {
    id: "week13-sun6",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "Arizona Cardinals",
    network: "FOX"
  },
  {
    id: "week13-sun7",
    week: 13,
    date: "Nov 30, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week13-sun8",
    week: 13,
    date: "Nov 30, 2025",
    time: "4:05 PM ET",
    home: "Seattle Seahawks",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week13-sun9",
    week: 13,
    date: "Nov 30, 2025",
    time: "4:25 PM ET",
    home: "Los Angeles Chargers",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week13-sun10",
    week: 13,
    date: "Nov 30, 2025",
    time: "4:25 PM ET",
    home: "Pittsburgh Steelers",
    away: "Buffalo Bills",
    network: "CBS"
  },
  {
    id: "week13-sun11",
    week: 13,
    date: "Nov 30, 2025",
    time: "8:20 PM ET",
    home: "Washington Commanders",
    away: "Denver Broncos",
    network: "NBC"
  },
  {
    id: "week13-mon",
    week: 13,
    date: "Dec 1, 2025",
    time: "8:15 PM ET",
    home: "New England Patriots",
    away: "New York Giants",
    network: "ESPN"
  },

  // WEEK 14
  {
    id: "week14-thu",
    week: 14,
    date: "Dec 4, 2025",
    time: "8:15 PM ET",
    home: "Detroit Lions",
    away: "Dallas Cowboys",
    network: "Prime Video"
  },
  {
    id: "week14-sun1",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week14-sun2",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week14-sun3",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week14-sun4",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Green Bay Packers",
    away: "Chicago Bears",
    network: "FOX"
  },
  {
    id: "week14-sun5",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week14-sun6",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Minnesota Vikings",
    away: "Washington Commanders",
    network: "FOX"
  },
  {
    id: "week14-sun7",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week14-sun8",
    week: 14,
    date: "Dec 7, 2025",
    time: "1:00 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "New Orleans Saints",
    network: "CBS"
  },
  {
    id: "week14-sun9",
    week: 14,
    date: "Dec 7, 2025",
    time: "4:05 PM ET",
    home: "Las Vegas Raiders",
    away: "Denver Broncos",
    network: "CBS"
  },
  {
    id: "week14-sun10",
    week: 14,
    date: "Dec 7, 2025",
    time: "4:25 PM ET",
    home: "Arizona Cardinals",
    away: "Los Angeles Rams",
    network: "FOX"
  },
  {
    id: "week14-sun11",
    week: 14,
    date: "Dec 7, 2025",
    time: "4:25 PM ET",
    home: "Buffalo Bills",
    away: "Cincinnati Bengals",
    network: "FOX"
  },
  {
    id: "week14-sun12",
    week: 14,
    date: "Dec 7, 2025",
    time: "8:20 PM ET",
    home: "Kansas City Chiefs",
    away: "Houston Texans",
    network: "NBC"
  },
  {
    id: "week14-mon",
    week: 14,
    date: "Dec 8, 2025",
    time: "8:15 PM ET",
    home: "Los Angeles Chargers",
    away: "Philadelphia Eagles",
    network: "ESPN/ABC"
  },

  // WEEK 15
  {
    id: "week15-thu",
    week: 15,
    date: "Dec 11, 2025",
    time: "8:15 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "Atlanta Falcons",
    network: "Prime Video"
  },
  {
    id: "week15-sun1",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Cleveland Browns",
    network: "FOX"
  },
  {
    id: "week15-sun2",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "Baltimore Ravens",
    network: "CBS"
  },
  {
    id: "week15-sun3",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Arizona Cardinals",
    network: "FOX"
  },
  {
    id: "week15-sun4",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week15-sun5",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Kansas City Chiefs",
    away: "Los Angeles Chargers",
    network: "CBS"
  },
  {
    id: "week15-sun6",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "New England Patriots",
    away: "Buffalo Bills",
    network: "CBS"
  },
  {
    id: "week15-sun7",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "New York Giants",
    away: "Washington Commanders",
    network: "FOX"
  },
  {
    id: "week15-sun8",
    week: 15,
    date: "Dec 14, 2025",
    time: "1:00 PM ET",
    home: "Philadelphia Eagles",
    away: "Las Vegas Raiders",
    network: "FOX"
  },
  {
    id: "week15-sun9",
    week: 15,
    date: "Dec 14, 2025",
    time: "4:25 PM ET",
    home: "Denver Broncos",
    away: "Green Bay Packers",
    network: "CBS"
  },
  {
    id: "week15-sun10",
    week: 15,
    date: "Dec 14, 2025",
    time: "4:25 PM ET",
    home: "Los Angeles Rams",
    away: "Detroit Lions",
    network: "FOX"
  },
  {
    id: "week15-sun11",
    week: 15,
    date: "Dec 14, 2025",
    time: "4:25 PM ET",
    home: "New Orleans Saints",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week15-sun12",
    week: 15,
    date: "Dec 14, 2025",
    time: "4:25 PM ET",
    home: "Seattle Seahawks",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week15-sun13",
    week: 15,
    date: "Dec 14, 2025",
    time: "4:25 PM ET",
    home: "San Francisco 49ers",
    away: "Tennessee Titans",
    network: "FOX"
  },
  {
    id: "week15-sun14",
    week: 15,
    date: "Dec 14, 2025",
    time: "8:20 PM ET",
    home: "Dallas Cowboys",
    away: "Minnesota Vikings",
    network: "NBC"
  },
  {
    id: "week15-mon",
    week: 15,
    date: "Dec 15, 2025",
    time: "8:15 PM ET",
    home: "Pittsburgh Steelers",
    away: "Miami Dolphins",
    network: "ESPN/ABC"
  }
];

// Read current schedule
const schedulePath = path.join(__dirname, '../lib/nflSchedule.ts');
let scheduleContent = fs.readFileSync(schedulePath, 'utf8');

// Find where to insert the new games (before the closing bracket)
const insertIndex = scheduleContent.lastIndexOf(']');
if (insertIndex !== -1) {
  // Convert games to string format
  const gamesString = weeks13to15.map(game => {
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
  
  // Update the function to include more weeks
  scheduleContent = scheduleContent.replace(
    'if (week <= 12) {',
    'if (week <= 15) {'
  );
  scheduleContent = scheduleContent.replace(
    '// For weeks 13-18, return placeholder games',
    '// For weeks 16-18, return placeholder games'
  );
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('✅ Added real schedule data for weeks 13-15!');
  console.log('📊 Total weeks with real data: 1-15');
  console.log('🔄 Next: Add weeks 16-18...');
} else {
  console.log('❌ Could not find insertion point');
}
