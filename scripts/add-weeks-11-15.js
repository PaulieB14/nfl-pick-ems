const fs = require('fs');
const path = require('path');

// Weeks 11-15 from official NFL schedule
const weeks11to15 = [
  // WEEK 11
  {
    id: "week11-thu",
    week: 11,
    date: "Nov 13, 2025",
    time: "8:15 PM ET",
    home: "New England Patriots",
    away: "New York Jets",
    network: "Prime Video"
  },
  {
    id: "week11-sun1",
    week: 11,
    date: "Nov 16, 2025",
    time: "9:30 AM ET",
    home: "Miami Dolphins",
    away: "Washington Commanders",
    network: "NFLN",
    isInternational: true,
    location: "Madrid"
  },
  {
    id: "week11-sun2",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week11-sun3",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Buffalo Bills",
    away: "Tampa Bay Buccaneers",
    network: "CBS"
  },
  {
    id: "week11-sun4",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "Los Angeles Chargers",
    network: "CBS"
  },
  {
    id: "week11-sun5",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Minnesota Vikings",
    away: "Chicago Bears",
    network: "FOX"
  },
  {
    id: "week11-sun6",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "New York Giants",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week11-sun7",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Pittsburgh Steelers",
    away: "Cincinnati Bengals",
    network: "CBS"
  },
  {
    id: "week11-sun8",
    week: 11,
    date: "Nov 16, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "Houston Texans",
    network: "FOX"
  },
  {
    id: "week11-sun9",
    week: 11,
    date: "Nov 16, 2025",
    time: "4:05 PM ET",
    home: "Arizona Cardinals",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week11-sun10",
    week: 11,
    date: "Nov 16, 2025",
    time: "4:05 PM ET",
    home: "Los Angeles Rams",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week11-sun11",
    week: 11,
    date: "Nov 16, 2025",
    time: "4:25 PM ET",
    home: "Cleveland Browns",
    away: "Baltimore Ravens",
    network: "CBS"
  },
  {
    id: "week11-sun12",
    week: 11,
    date: "Nov 16, 2025",
    time: "4:25 PM ET",
    home: "Kansas City Chiefs",
    away: "Denver Broncos",
    network: "CBS"
  },
  {
    id: "week11-sun13",
    week: 11,
    date: "Nov 16, 2025",
    time: "8:20 PM ET",
    home: "Philadelphia Eagles",
    away: "Detroit Lions",
    network: "NBC"
  },
  {
    id: "week11-mon",
    week: 11,
    date: "Nov 17, 2025",
    time: "8:15 PM ET",
    home: "Las Vegas Raiders",
    away: "Dallas Cowboys",
    network: "ESPN/ABC"
  },

  // WEEK 12
  {
    id: "week12-thu",
    week: 12,
    date: "Nov 20, 2025",
    time: "8:15 PM ET",
    home: "Houston Texans",
    away: "Buffalo Bills",
    network: "Prime Video"
  },
  {
    id: "week12-sun1",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week12-sun2",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week12-sun3",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week12-sun4",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "New York Giants",
    network: "FOX"
  },
  {
    id: "week12-sun5",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Green Bay Packers",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week12-sun6",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Kansas City Chiefs",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week12-sun7",
    week: 12,
    date: "Nov 23, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week12-sun8",
    week: 12,
    date: "Nov 23, 2025",
    time: "4:05 PM ET",
    home: "Arizona Cardinals",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week12-sun9",
    week: 12,
    date: "Nov 23, 2025",
    time: "4:05 PM ET",
    home: "Las Vegas Raiders",
    away: "Cleveland Browns",
    network: "CBS"
  },
  {
    id: "week12-sun10",
    week: 12,
    date: "Nov 23, 2025",
    time: "4:25 PM ET",
    home: "Dallas Cowboys",
    away: "Philadelphia Eagles",
    network: "FOX"
  },
  {
    id: "week12-sun11",
    week: 12,
    date: "Nov 23, 2025",
    time: "4:25 PM ET",
    home: "New Orleans Saints",
    away: "Atlanta Falcons",
    network: "FOX"
  },
  {
    id: "week12-sun12",
    week: 12,
    date: "Nov 23, 2025",
    time: "8:20 PM ET",
    home: "Los Angeles Rams",
    away: "Tampa Bay Buccaneers",
    network: "NBC"
  },
  {
    id: "week12-mon",
    week: 12,
    date: "Nov 24, 2025",
    time: "8:15 PM ET",
    home: "San Francisco 49ers",
    away: "Carolina Panthers",
    network: "ESPN"
  }
];

// Read current schedule
const schedulePath = path.join(__dirname, '../lib/nflSchedule.ts');
let scheduleContent = fs.readFileSync(schedulePath, 'utf8');

// Find where to insert the new games (before the closing bracket)
const insertIndex = scheduleContent.lastIndexOf(']');
if (insertIndex !== -1) {
  // Convert games to string format
  const gamesString = weeks11to15.map(game => {
    return `  {
    id: "${game.id}",
    week: ${game.week},
    date: "${game.date}",
    time: "${game.time}",
    home: "${game.home}",
    away: "${game.away}",
    network: "${game.network}"${game.isInternational ? `,
    isInternational: true,
    location: "${game.location}"` : ''}
  }`;
  }).join(',\n');

  // Insert the new games
  scheduleContent = scheduleContent.slice(0, insertIndex) + ',\n' + gamesString + '\n' + scheduleContent.slice(insertIndex);
  
  // Update the function to include more weeks
  scheduleContent = scheduleContent.replace(
    'if (week <= 10) {',
    'if (week <= 12) {'
  );
  scheduleContent = scheduleContent.replace(
    '// For weeks 11-18, return placeholder games',
    '// For weeks 13-18, return placeholder games'
  );
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('✅ Added real schedule data for weeks 11-12!');
  console.log('📊 Total weeks with real data: 1-12');
  console.log('🔄 Next: Add weeks 13-18...');
} else {
  console.log('❌ Could not find insertion point');
}
