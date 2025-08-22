const fs = require('fs');
const path = require('path');

// Complete NFL Schedule for weeks 8-18 from official NFL data
const completeSchedule = [
  // WEEK 8
  {
    id: "week8-thu",
    week: 8,
    date: "Oct 23, 2025",
    time: "8:15 PM ET",
    home: "Los Angeles Chargers",
    away: "Minnesota Vikings",
    network: "Prime Video"
  },
  {
    id: "week8-sun1",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week8-sun2",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Chicago Bears",
    network: "CBS"
  },
  {
    id: "week8-sun3",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "Buffalo Bills",
    network: "FOX"
  },
  {
    id: "week8-sun4",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week8-sun5",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week8-sun6",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "New England Patriots",
    away: "Cleveland Browns",
    network: "FOX"
  },
  {
    id: "week8-sun7",
    week: 8,
    date: "Oct 26, 2025",
    time: "1:00 PM ET",
    home: "Philadelphia Eagles",
    away: "New York Giants",
    network: "FOX"
  },
  {
    id: "week8-sun8",
    week: 8,
    date: "Oct 26, 2025",
    time: "4:05 PM ET",
    home: "New Orleans Saints",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week8-sun9",
    week: 8,
    date: "Oct 26, 2025",
    time: "4:25 PM ET",
    home: "Denver Broncos",
    away: "Dallas Cowboys",
    network: "CBS"
  },
  {
    id: "week8-sun10",
    week: 8,
    date: "Oct 26, 2025",
    time: "4:25 PM ET",
    home: "Indianapolis Colts",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week8-sun11",
    week: 8,
    date: "Oct 26, 2025",
    time: "8:20 PM ET",
    home: "Pittsburgh Steelers",
    away: "Green Bay Packers",
    network: "NBC"
  },
  {
    id: "week8-mon",
    week: 8,
    date: "Oct 27, 2025",
    time: "8:15 PM ET",
    home: "Kansas City Chiefs",
    away: "Washington Commanders",
    network: "ESPN/ABC"
  },

  // WEEK 9
  {
    id: "week9-thu",
    week: 9,
    date: "Oct 30, 2025",
    time: "8:15 PM ET",
    home: "Miami Dolphins",
    away: "Baltimore Ravens",
    network: "Prime Video"
  },
  {
    id: "week9-sun1",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Cincinnati Bengals",
    network: "CBS"
  },
  {
    id: "week9-sun2",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week9-sun3",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "Green Bay Packers",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week9-sun4",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Denver Broncos",
    network: "FOX"
  },
  {
    id: "week9-sun5",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "New England Patriots",
    away: "Atlanta Falcons",
    network: "CBS"
  },
  {
    id: "week9-sun6",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "New York Giants",
    away: "San Francisco 49ers",
    network: "CBS"
  },
  {
    id: "week9-sun7",
    week: 9,
    date: "Nov 2, 2025",
    time: "1:00 PM ET",
    home: "Pittsburgh Steelers",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week9-sun8",
    week: 9,
    date: "Nov 2, 2025",
    time: "4:05 PM ET",
    home: "Los Angeles Chargers",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week9-sun9",
    week: 9,
    date: "Nov 2, 2025",
    time: "4:05 PM ET",
    home: "Los Angeles Rams",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week9-sun10",
    week: 9,
    date: "Nov 2, 2025",
    time: "4:25 PM ET",
    home: "Las Vegas Raiders",
    away: "Jacksonville Jaguars",
    network: "FOX"
  },
  {
    id: "week9-sun11",
    week: 9,
    date: "Nov 2, 2025",
    time: "4:25 PM ET",
    home: "Buffalo Bills",
    away: "Kansas City Chiefs",
    network: "CBS"
  },
  {
    id: "week9-sun12",
    week: 9,
    date: "Nov 2, 2025",
    time: "8:20 PM ET",
    home: "Washington Commanders",
    away: "Seattle Seahawks",
    network: "NBC"
  },
  {
    id: "week9-mon",
    week: 9,
    date: "Nov 3, 2025",
    time: "8:15 PM ET",
    home: "Dallas Cowboys",
    away: "Arizona Cardinals",
    network: "ESPN/ABC"
  },

  // WEEK 10
  {
    id: "week10-thu",
    week: 10,
    date: "Nov 6, 2025",
    time: "8:15 PM ET",
    home: "Denver Broncos",
    away: "Las Vegas Raiders",
    network: "Prime Video"
  },
  {
    id: "week10-sun1",
    week: 10,
    date: "Nov 9, 2025",
    time: "9:30 AM ET",
    home: "Indianapolis Colts",
    away: "Atlanta Falcons",
    network: "NFLN",
    isInternational: true,
    location: "Berlin"
  },
  {
    id: "week10-sun2",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week10-sun3",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "New York Giants",
    network: "FOX"
  },
  {
    id: "week10-sun4",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week10-sun5",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Miami Dolphins",
    away: "Buffalo Bills",
    network: "CBS"
  },
  {
    id: "week10-sun6",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Minnesota Vikings",
    away: "Baltimore Ravens",
    network: "FOX"
  },
  {
    id: "week10-sun7",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "Cleveland Browns",
    network: "CBS"
  },
  {
    id: "week10-sun8",
    week: 10,
    date: "Nov 9, 2025",
    time: "1:00 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week10-sun9",
    week: 10,
    date: "Nov 9, 2025",
    time: "4:05 PM ET",
    home: "Arizona Cardinals",
    away: "Seattle Seahawks",
    network: "CBS"
  },
  {
    id: "week10-sun10",
    week: 10,
    date: "Nov 9, 2025",
    time: "4:25 PM ET",
    home: "San Francisco 49ers",
    away: "Los Angeles Rams",
    network: "FOX"
  },
  {
    id: "week10-sun11",
    week: 10,
    date: "Nov 9, 2025",
    time: "4:25 PM ET",
    home: "Washington Commanders",
    away: "Detroit Lions",
    network: "FOX"
  },
  {
    id: "week10-sun12",
    week: 10,
    date: "Nov 9, 2025",
    time: "8:20 PM ET",
    home: "Los Angeles Chargers",
    away: "Pittsburgh Steelers",
    network: "NBC"
  },
  {
    id: "week10-mon",
    week: 10,
    date: "Nov 10, 2025",
    time: "8:15 PM ET",
    home: "Green Bay Packers",
    away: "Philadelphia Eagles",
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
  const gamesString = completeSchedule.map(game => {
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
    'if (week <= 7) {',
    'if (week <= 10) {'
  );
  scheduleContent = scheduleContent.replace(
    '// For weeks 8-18, return placeholder games',
    '// For weeks 11-18, return placeholder games'
  );
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('✅ Added real schedule data for weeks 8-10!');
  console.log('📊 Total weeks with real data: 1-10');
  console.log('🔄 Next: Add weeks 11-18...');
} else {
  console.log('❌ Could not find insertion point');
}
