const fs = require('fs');
const path = require('path');

// Add remaining weeks to the schedule
const remainingWeeks = [
  // WEEK 7
  {
    id: "week7-thu",
    week: 7,
    date: "Oct 16, 2025",
    time: "8:15 PM ET",
    home: "Cincinnati Bengals",
    away: "Pittsburgh Steelers",
    network: "Prime Video"
  },
  {
    id: "week7-sun1",
    week: 7,
    date: "Oct 19, 2025",
    time: "9:30 AM ET",
    home: "Jacksonville Jaguars",
    away: "Los Angeles Rams",
    network: "NFLN",
    isInternational: true,
    location: "London"
  },
  {
    id: "week7-sun2",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week7-sun3",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week7-sun4",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "Kansas City Chiefs",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week7-sun5",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "Minnesota Vikings",
    away: "Philadelphia Eagles",
    network: "FOX"
  },
  {
    id: "week7-sun6",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week7-sun7",
    week: 7,
    date: "Oct 19, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week7-sun8",
    week: 7,
    date: "Oct 19, 2025",
    time: "4:05 PM ET",
    home: "Denver Broncos",
    away: "New York Giants",
    network: "CBS"
  },
  {
    id: "week7-sun9",
    week: 7,
    date: "Oct 19, 2025",
    time: "4:05 PM ET",
    home: "Los Angeles Chargers",
    away: "Arizona Cardinals",
    network: "CBS"
  },
  {
    id: "week7-sun10",
    week: 7,
    date: "Oct 19, 2025",
    time: "4:25 PM ET",
    home: "Dallas Cowboys",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week7-sun11",
    week: 7,
    date: "Oct 19, 2025",
    time: "4:25 PM ET",
    home: "San Francisco 49ers",
    away: "Washington Commanders",
    network: "FOX"
  },
  {
    id: "week7-sun12",
    week: 7,
    date: "Oct 19, 2025",
    time: "8:20 PM ET",
    home: "Atlanta Falcons",
    away: "Seattle Seahawks",
    network: "NBC"
  },
  {
    id: "week7-mon1",
    week: 7,
    date: "Oct 20, 2025",
    time: "7:00 PM ET",
    home: "Detroit Lions",
    away: "Tampa Bay Buccaneers",
    network: "ESPN/ABC"
  },
  {
    id: "week7-mon2",
    week: 7,
    date: "Oct 20, 2025",
    time: "10:00 PM ET",
    home: "Seattle Seahawks",
    away: "Houston Texans",
    network: "ESPN+"
  },

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
  }
];

// Read current schedule
const schedulePath = path.join(__dirname, '../lib/nflSchedule.ts');
let scheduleContent = fs.readFileSync(schedulePath, 'utf8');

// Find where to insert the new games (before the closing bracket)
const insertIndex = scheduleContent.lastIndexOf(']');
if (insertIndex !== -1) {
  // Convert games to string format
  const gamesString = remainingWeeks.map(game => {
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
  
  // Write back to file
  fs.writeFileSync(schedulePath, scheduleContent);
  console.log('✅ Added weeks 7-8 to schedule!');
} else {
  console.log('❌ Could not find insertion point');
}
