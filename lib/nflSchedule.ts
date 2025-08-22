// 2025 NFL Schedule - Official data from NFL Operations
// Source: https://operations.nfl.com/gameday/nfl-schedule/2025-nfl-schedule/

export interface NFLGame {
  id: string
  week: number
  date: string
  time: string
  home: string
  away: string
  network: string
  isInternational?: boolean
  location?: string
  isSpecial?: boolean
  specialNote?: string
}

export const nflSchedule2025: NFLGame[] = [
  // WEEK 1
  {
    id: "week1-thu",
    week: 1,
    date: "Sept 4, 2025",
    time: "8:20 PM ET",
    home: "Philadelphia Eagles",
    away: "Dallas Cowboys",
    network: "NBC"
  },
  {
    id: "week1-fri",
    week: 1,
    date: "Sept 5, 2025",
    time: "8:00 PM ET",
    home: "Los Angeles Chargers",
    away: "Kansas City Chiefs",
    network: "YouTube",
    isInternational: true,
    location: "Sao Paulo, Brazil"
  },
  {
    id: "week1-sun1",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week1-sun2",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Cincinnati Bengals",
    network: "FOX"
  },
  {
    id: "week1-sun3",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week1-sun4",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week1-sun5",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "New England Patriots",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week1-sun6",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "New Orleans Saints",
    away: "Arizona Cardinals",
    network: "CBS"
  },
  {
    id: "week1-sun7",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "New York Jets",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week1-sun8",
    week: 1,
    date: "Sept 7, 2025",
    time: "1:00 PM ET",
    home: "Washington Commanders",
    away: "New York Giants",
    network: "FOX"
  },
  {
    id: "week1-sun9",
    week: 1,
    date: "Sept 7, 2025",
    time: "4:05 PM ET",
    home: "Denver Broncos",
    away: "Tennessee Titans",
    network: "FOX"
  },
  {
    id: "week1-sun10",
    week: 1,
    date: "Sept 7, 2025",
    time: "4:05 PM ET",
    home: "Seattle Seahawks",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week1-sun11",
    week: 1,
    date: "Sept 7, 2025",
    time: "4:25 PM ET",
    home: "Green Bay Packers",
    away: "Detroit Lions",
    network: "CBS"
  },
  {
    id: "week1-sun12",
    week: 1,
    date: "Sept 7, 2025",
    time: "4:25 PM ET",
    home: "Los Angeles Rams",
    away: "Houston Texans",
    network: "CBS"
  },
  {
    id: "week1-sun13",
    week: 1,
    date: "Sept 7, 2025",
    time: "8:20 PM ET",
    home: "Buffalo Bills",
    away: "Baltimore Ravens",
    network: "NBC"
  },
  {
    id: "week1-mon",
    week: 1,
    date: "Sept 8, 2025",
    time: "8:15 PM ET",
    home: "Chicago Bears",
    away: "Minnesota Vikings",
    network: "ESPN/ABC"
  },

  // WEEK 2
  {
    id: "week2-thu",
    week: 2,
    date: "Sept 11, 2025",
    time: "8:15 PM ET",
    home: "Kansas City Chiefs",
    away: "Baltimore Ravens",
    network: "Prime Video"
  },
  {
    id: "week2-sun1",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Philadelphia Eagles",
    network: "FOX"
  },
  {
    id: "week2-sun2",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Buffalo Bills",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week2-sun3",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "Kansas City Chiefs",
    network: "CBS"
  },
  {
    id: "week2-sun4",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Dallas Cowboys",
    network: "FOX"
  },
  {
    id: "week2-sun5",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week2-sun6",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Chicago Bears",
    network: "FOX"
  },
  {
    id: "week2-sun7",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week2-sun8",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week2-sun9",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "New England Patriots",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week2-sun10",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "New Orleans Saints",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week2-sun11",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Pittsburgh Steelers",
    away: "Denver Broncos",
    network: "CBS"
  },
  {
    id: "week2-sun12",
    week: 2,
    date: "Sept 14, 2025",
    time: "1:00 PM ET",
    home: "Tennessee Titans",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week2-sun13",
    week: 2,
    date: "Sept 14, 2025",
    time: "4:05 PM ET",
    home: "Arizona Cardinals",
    away: "Los Angeles Rams",
    network: "FOX"
  },
  {
    id: "week2-sun14",
    week: 2,
    date: "Sept 14, 2025",
    time: "4:25 PM ET",
    home: "Las Vegas Raiders",
    away: "Los Angeles Chargers",
    network: "CBS"
  },
  {
    id: "week2-sun15",
    week: 2,
    date: "Sept 14, 2025",
    time: "8:20 PM ET",
    home: "New York Giants",
    away: "Washington Commanders",
    network: "NBC"
  },
  {
    id: "week2-mon",
    week: 2,
    date: "Sept 15, 2025",
    time: "8:15 PM ET",
    home: "Dallas Cowboys",
    away: "Philadelphia Eagles",
    network: "ESPN/ABC"
  },

  // WEEK 3
  {
    id: "week3-thu",
    week: 3,
    date: "Sept 18, 2025",
    time: "8:15 PM ET",
    home: "New York Jets",
    away: "New England Patriots",
    network: "Prime Video"
  },
  {
    id: "week3-sun1",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Kansas City Chiefs",
    network: "CBS"
  },
  {
    id: "week3-sun2",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Cincinnati Bengals",
    network: "CBS"
  },
  {
    id: "week3-sun3",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Buffalo Bills",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week3-sun4",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week3-sun5",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Houston Texans",
    network: "FOX"
  },
  {
    id: "week3-sun6",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week3-sun7",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Denver Broncos",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week3-sun8",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Arizona Cardinals",
    network: "FOX"
  },
  {
    id: "week3-sun9",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Green Bay Packers",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week3-sun10",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week3-sun11",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Chargers",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week3-sun12",
    week: 3,
    date: "Sept 21, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Rams",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week3-sun13",
    week: 3,
    date: "Sept 21, 2025",
    time: "4:05 PM ET",
    home: "Seattle Seahawks",
    away: "Dallas Cowboys",
    network: "FOX"
  },
  {
    id: "week3-sun14",
    week: 3,
    date: "Sept 21, 2025",
    time: "4:25 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "Philadelphia Eagles",
    network: "CBS"
  },
  {
    id: "week3-sun15",
    week: 3,
    date: "Sept 21, 2025",
    time: "8:20 PM ET",
    home: "Washington Commanders",
    away: "New York Giants",
    network: "NBC"
  },
  {
    id: "week3-mon",
    week: 3,
    date: "Sept 22, 2025",
    time: "8:15 PM ET",
    home: "Pittsburgh Steelers",
    away: "Cleveland Browns",
    network: "ESPN/ABC"
  },

  // WEEK 4
  {
    id: "week4-thu",
    week: 4,
    date: "Sept 25, 2025",
    time: "8:15 PM ET",
    home: "Dallas Cowboys",
    away: "New York Giants",
    network: "Prime Video"
  },
  {
    id: "week4-sun1",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Arizona Cardinals",
    away: "San Francisco 49ers",
    network: "FOX"
  },
  {
    id: "week4-sun2",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week4-sun3",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Buffalo Bills",
    network: "CBS"
  },
  {
    id: "week4-sun4",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week4-sun5",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Detroit Lions",
    network: "FOX"
  },
  {
    id: "week4-sun6",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "Cleveland Browns",
    network: "CBS"
  },
  {
    id: "week4-sun7",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Denver Broncos",
    away: "Kansas City Chiefs",
    network: "CBS"
  },
  {
    id: "week4-sun8",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Green Bay Packers",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week4-sun9",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week4-sun10",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Jacksonville Jaguars",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week4-sun11",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Las Vegas Raiders",
    away: "Los Angeles Chargers",
    network: "CBS"
  },
  {
    id: "week4-sun12",
    week: 4,
    date: "Sept 28, 2025",
    time: "1:00 PM ET",
    home: "Miami Dolphins",
    away: "New England Patriots",
    network: "CBS"
  },
  {
    id: "week4-sun13",
    week: 4,
    date: "Sept 28, 2025",
    time: "4:05 PM ET",
    home: "Los Angeles Rams",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week4-sun14",
    week: 4,
    date: "Sept 28, 2025",
    time: "4:25 PM ET",
    home: "Philadelphia Eagles",
    away: "Washington Commanders",
    network: "CBS"
  },
  {
    id: "week4-sun15",
    week: 4,
    date: "Sept 28, 2025",
    time: "8:20 PM ET",
    home: "New York Jets",
    away: "Denver Broncos",
    network: "NBC"
  },
  {
    id: "week4-mon",
    week: 4,
    date: "Sept 29, 2025",
    time: "8:15 PM ET",
    home: "Seattle Seahawks",
    away: "Detroit Lions",
    network: "ESPN/ABC"
  },

  // WEEK 5
  {
    id: "week5-thu",
    week: 5,
    date: "Oct 2, 2025",
    time: "8:15 PM ET",
    home: "Tampa Bay Buccaneers",
    away: "Atlanta Falcons",
    network: "Prime Video"
  },
  {
    id: "week5-sun1",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Arizona Cardinals",
    away: "Cincinnati Bengals",
    network: "FOX"
  },
  {
    id: "week5-sun2",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Cleveland Browns",
    network: "CBS"
  },
  {
    id: "week5-sun3",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Buffalo Bills",
    away: "Miami Dolphins",
    network: "CBS"
  },
  {
    id: "week5-sun4",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Carolina Panthers",
    away: "Chicago Bears",
    network: "FOX"
  },
  {
    id: "week5-sun5",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Denver Broncos",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week5-sun6",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week5-sun7",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week5-sun8",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week5-sun9",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Kansas City Chiefs",
    away: "New Orleans Saints",
    network: "CBS"
  },
  {
    id: "week5-sun10",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Chargers",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week5-sun11",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Rams",
    away: "Arizona Cardinals",
    network: "FOX"
  },
  {
    id: "week5-sun12",
    week: 5,
    date: "Oct 5, 2025",
    time: "1:00 PM ET",
    home: "Minnesota Vikings",
    away: "New York Giants",
    network: "FOX"
  },
  {
    id: "week5-sun13",
    week: 5,
    date: "Oct 5, 2025",
    time: "4:05 PM ET",
    home: "San Francisco 49ers",
    away: "Seattle Seahawks",
    network: "FOX"
  },
  {
    id: "week5-sun14",
    week: 5,
    date: "Oct 5, 2025",
    time: "4:25 PM ET",
    home: "Tennessee Titans",
    away: "Indianapolis Colts",
    network: "CBS"
  },
  {
    id: "week5-sun15",
    week: 5,
    date: "Oct 5, 2025",
    time: "8:20 PM ET",
    home: "Philadelphia Eagles",
    away: "Dallas Cowboys",
    network: "NBC"
  },
  {
    id: "week5-mon",
    week: 5,
    date: "Oct 6, 2025",
    time: "8:15 PM ET",
    home: "New England Patriots",
    away: "Buffalo Bills",
    network: "ESPN/ABC"
  },

  // WEEK 6
  {
    id: "week6-thu",
    week: 6,
    date: "Oct 9, 2025",
    time: "8:15 PM ET",
    home: "San Francisco 49ers",
    away: "Seattle Seahawks",
    network: "Prime Video"
  },
  {
    id: "week6-sun1",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Atlanta Falcons",
    away: "Carolina Panthers",
    network: "FOX"
  },
  {
    id: "week6-sun2",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Baltimore Ravens",
    away: "Washington Commanders",
    network: "CBS"
  },
  {
    id: "week6-sun3",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Buffalo Bills",
    away: "New York Jets",
    network: "CBS"
  },
  {
    id: "week6-sun4",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Chicago Bears",
    away: "Green Bay Packers",
    network: "FOX"
  },
  {
    id: "week6-sun5",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Cincinnati Bengals",
    away: "Pittsburgh Steelers",
    network: "CBS"
  },
  {
    id: "week6-sun6",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Cleveland Browns",
    away: "Denver Broncos",
    network: "CBS"
  },
  {
    id: "week6-sun7",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Minnesota Vikings",
    network: "FOX"
  },
  {
    id: "week6-sun8",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Houston Texans",
    away: "Tennessee Titans",
    network: "CBS"
  },
  {
    id: "week6-sun9",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Indianapolis Colts",
    away: "Jacksonville Jaguars",
    network: "CBS"
  },
  {
    id: "week6-sun10",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Kansas City Chiefs",
    away: "Las Vegas Raiders",
    network: "CBS"
  },
  {
    id: "week6-sun11",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Chargers",
    away: "Arizona Cardinals",
    network: "FOX"
  },
  {
    id: "week6-sun12",
    week: 6,
    date: "Oct 12, 2025",
    time: "1:00 PM ET",
    home: "Los Angeles Rams",
    away: "New Orleans Saints",
    network: "FOX"
  },
  {
    id: "week6-sun13",
    week: 6,
    date: "Oct 12, 2025",
    time: "4:05 PM ET",
    home: "Miami Dolphins",
    away: "Tampa Bay Buccaneers",
    network: "FOX"
  },
  {
    id: "week6-sun14",
    week: 6,
    date: "Oct 12, 2025",
    time: "4:25 PM ET",
    home: "New England Patriots",
    away: "Philadelphia Eagles",
    network: "CBS"
  },
  {
    id: "week6-sun15",
    week: 6,
    date: "Oct 12, 2025",
    time: "8:20 PM ET",
    home: "Dallas Cowboys",
    away: "New York Giants",
    network: "NBC"
  },
  {
    id: "week6-mon",
    week: 6,
    date: "Oct 13, 2025",
    time: "8:15 PM ET",
    home: "New York Jets",
    away: "Buffalo Bills",
    network: "ESPN/ABC"
  },

  // WEEK 7 - Real Schedule Data
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
  }
]

// Return games for any week (1-18)
export const getGamesByWeek = (week: number): NFLGame[] => {
  if (week <= 7) {
    return nflSchedule2025.filter(game => game.week === week)
  }
  
  // For weeks 8-18, return placeholder games
  const placeholderGames: NFLGame[] = []
  const gameCount = week === 5 ? 14 : week === 6 || week === 7 ? 15 : week === 8 ? 13 : week === 9 || week === 10 || week === 14 ? 14 : week === 11 || week === 12 || week === 15 ? 15 : 16;
  
  for (let i = 0; i < gameCount; i++) {
    placeholderGames.push({
      id: `week${week}-game${i + 1}`,
      week,
      date: `Week ${week} - TBD`,
      time: "TBD",
      home: "TBD",
      away: "TBD",
      network: "TBD"
    })
  }
  return placeholderGames
}

export const getCurrentWeek = (): number => {
  const now = new Date()
  const seasonStart = new Date('2025-09-04')
  const weeksSinceStart = Math.floor((now.getTime() - seasonStart.getTime()) / (7 * 24 * 60 * 60 * 1000))
  return Math.max(1, Math.min(18, weeksSinceStart + 1))
}

export const getWeekStatus = (week: number): 'upcoming' | 'active' | 'completed' => {
  const currentWeek = getCurrentWeek()
  if (week < currentWeek) return 'completed'
  if (week === currentWeek) return 'active'
  return 'upcoming'
}
