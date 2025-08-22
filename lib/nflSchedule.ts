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
  },

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
    home: "Denver Broncos",
    away: "Kansas City Chiefs",
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
  },

  // WEEK 13
  {
    id: "week13-thu1",
    week: 13,
    date: "Nov 27, 2025",
    time: "1:00 PM ET",
    home: "Detroit Lions",
    away: "Green Bay Packers",
    network: "FOX",
    isSpecial: true,
    specialNote: "Thanksgiving"
  },
  {
    id: "week13-thu2",
    week: 13,
    date: "Nov 27, 2025",
    time: "4:30 PM ET",
    home: "Dallas Cowboys",
    away: "Kansas City Chiefs",
    network: "CBS",
    isSpecial: true,
    specialNote: "Thanksgiving"
  },
  {
    id: "week13-thu3",
    week: 13,
    date: "Nov 27, 2025",
    time: "8:20 PM ET",
    home: "Baltimore Ravens",
    away: "Cincinnati Bengals",
    network: "NBC",
    isSpecial: true,
    specialNote: "Thanksgiving"
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
    network: "FOX"
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
  },

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

  // WEEK 17
  {
    id: "week17-thu1",
    week: 17,
    date: "Dec 25, 2025",
    time: "1:00 PM ET",
    home: "Washington Commanders",
    away: "Dallas Cowboys",
    network: "NETFLIX",
    isSpecial: true,
    specialNote: "Christmas"
  },
  {
    id: "week17-thu2",
    week: 17,
    date: "Dec 25, 2025",
    time: "4:30 PM ET",
    home: "Minnesota Vikings",
    away: "Detroit Lions",
    network: "NETFLIX",
    isSpecial: true,
    specialNote: "Christmas"
  },
  {
    id: "week17-thu3",
    week: 17,
    date: "Dec 25, 2025",
    time: "8:15 PM ET",
    home: "Kansas City Chiefs",
    away: "Denver Broncos",
    network: "Prime Video",
    isSpecial: true,
    specialNote: "Christmas"
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

  // WEEK 18
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
]

// Return games for any week (1-18)
export const getGamesByWeek = (week: number): NFLGame[] => {
  return nflSchedule2025.filter(game => game.week === week)
}

export const getCurrentWeek = (): number => {
  const now = new Date()
  const seasonStart = new Date('2025-09-04')
  const weeksSinceStart = Math.floor((now.getTime() - seasonStart.getTime()) / (7 * 24 * 60 * 60 * 1000))
  return Math.max(1, Math.min(18, weeksSinceStart + 1))
}

export const getWeekStatus = (week: number): 'upcoming' | 'active' | 'completed' => {
  const currentWeek = getCurrentWeek()
  const now = new Date()
  const seasonStart = new Date('2025-09-04')
  
  // If we're before the season starts, all weeks are upcoming
  if (now < seasonStart) {
    return 'upcoming'
  }
  
  if (week < currentWeek) return 'completed'
  if (week === currentWeek) return 'active'
  return 'upcoming'
}
