export interface NFLGame {
  id: string
  home: string
  away: string
  date: string
  time: string
  network: string
  isInternational: boolean
  location?: string
}

export interface WeekSchedule {
  weekId: number
  games: NFLGame[]
  status: 'upcoming' | 'active' | 'completed'
  lockTime: string
}

export const nflSchedule: WeekSchedule[] = [
  {
    weekId: 1,
    status: 'upcoming',
    lockTime: 'September 4, 2025 19:00:00 ET',
    games: [
      {
        id: '1',
        away: 'Dallas Cowboys',
        home: 'Philadelphia Eagles',
        date: 'Thursday, Sept. 4',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '2',
        away: 'Kansas City Chiefs',
        home: 'Los Angeles Chargers',
        date: 'Friday, Sept. 5',
        time: '8:00p ET',
        network: 'YouTube',
        isInternational: true,
        location: 'Sao Paulo'
      },
      {
        id: '3',
        away: 'Tampa Bay Buccaneers',
        home: 'Atlanta Falcons',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '4',
        away: 'Cincinnati Bengals',
        home: 'Cleveland Browns',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '5',
        away: 'Miami Dolphins',
        home: 'Indianapolis Colts',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '6',
        away: 'Carolina Panthers',
        home: 'Jacksonville Jaguars',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '7',
        away: 'Las Vegas Raiders',
        home: 'New England Patriots',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '8',
        away: 'Arizona Cardinals',
        home: 'New Orleans Saints',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '9',
        away: 'Pittsburgh Steelers',
        home: 'New York Jets',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '10',
        away: 'New York Giants',
        home: 'Washington Commanders',
        date: 'Sunday, Sept. 7',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '11',
        away: 'Tennessee Titans',
        home: 'Denver Broncos',
        date: 'Sunday, Sept. 7',
        time: '4:05p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '12',
        away: 'San Francisco 49ers',
        home: 'Seattle Seahawks',
        date: 'Sunday, Sept. 7',
        time: '4:05p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '13',
        away: 'Detroit Lions',
        home: 'Green Bay Packers',
        date: 'Sunday, Sept. 7',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '14',
        away: 'Houston Texans',
        home: 'Los Angeles Rams',
        date: 'Sunday, Sept. 7',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '15',
        away: 'Baltimore Ravens',
        home: 'Buffalo Bills',
        date: 'Sunday, Sept. 7',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '16',
        away: 'Minnesota Vikings',
        home: 'Chicago Bears',
        date: 'Monday, Sept. 8',
        time: '8:15p ET',
        network: 'ABC/ESPN',
        isInternational: false
      }
    ]
  },
  {
    weekId: 2,
    status: 'upcoming',
    lockTime: 'September 11, 2025 19:00:00 ET',
    games: [
      {
        id: '17',
        away: 'Washington Commanders',
        home: 'Green Bay Packers',
        date: 'Thursday, Sept. 11',
        time: '8:15p ET',
        network: 'Prime Video',
        isInternational: false
      },
      {
        id: '18',
        away: 'Cleveland Browns',
        home: 'Baltimore Ravens',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '19',
        away: 'Jacksonville Jaguars',
        home: 'Cincinnati Bengals',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '20',
        away: 'New York Giants',
        home: 'Dallas Cowboys',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '21',
        away: 'Chicago Bears',
        home: 'Detroit Lions',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '22',
        away: 'New England Patriots',
        home: 'Miami Dolphins',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '23',
        away: 'San Francisco 49ers',
        home: 'New Orleans Saints',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '24',
        away: 'Buffalo Bills',
        home: 'New York Jets',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '25',
        away: 'Seattle Seahawks',
        home: 'Pittsburgh Steelers',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '26',
        away: 'Los Angeles Rams',
        home: 'Tennessee Titans',
        date: 'Sunday, Sept. 14',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '27',
        away: 'Carolina Panthers',
        home: 'Arizona Cardinals',
        date: 'Sunday, Sept. 14',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '28',
        away: 'Denver Broncos',
        home: 'Indianapolis Colts',
        date: 'Sunday, Sept. 14',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '29',
        away: 'Philadelphia Eagles',
        home: 'Kansas City Chiefs',
        date: 'Sunday, Sept. 14',
        time: '4:25p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '30',
        away: 'Atlanta Falcons',
        home: 'Minnesota Vikings',
        date: 'Sunday, Sept. 14',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '31',
        away: 'Tampa Bay Buccaneers',
        home: 'Houston Texans',
        date: 'Monday, Sept. 15',
        time: '7:00p ET',
        network: 'ABC',
        isInternational: false
      },
      {
        id: '32',
        away: 'Los Angeles Chargers',
        home: 'Las Vegas Raiders',
        date: 'Monday, Sept. 15',
        time: '10:00p ET',
        network: 'ESPN',
        isInternational: false
      }
    ]
  },
  {
    weekId: 3,
    status: 'upcoming',
    lockTime: 'September 18, 2025 19:00:00 ET',
    games: [
      {
        id: '33',
        away: 'Miami Dolphins',
        home: 'Buffalo Bills',
        date: 'Thursday, Sept. 18',
        time: '8:15p ET',
        network: 'Prime Video',
        isInternational: false
      },
      {
        id: '34',
        away: 'Atlanta Falcons',
        home: 'Carolina Panthers',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '35',
        away: 'Green Bay Packers',
        home: 'Cleveland Browns',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '36',
        away: 'Houston Texans',
        home: 'Jacksonville Jaguars',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '37',
        away: 'Cincinnati Bengals',
        home: 'Minnesota Vikings',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '38',
        away: 'Pittsburgh Steelers',
        home: 'New England Patriots',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '39',
        away: 'Los Angeles Rams',
        home: 'Philadelphia Eagles',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '40',
        away: 'New York Jets',
        home: 'Tampa Bay Buccaneers',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '41',
        away: 'Indianapolis Colts',
        home: 'Tennessee Titans',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '42',
        away: 'Las Vegas Raiders',
        home: 'Washington Commanders',
        date: 'Sunday, Sept. 21',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '43',
        away: 'Denver Broncos',
        home: 'Los Angeles Chargers',
        date: 'Sunday, Sept. 21',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '44',
        away: 'New Orleans Saints',
        home: 'Seattle Seahawks',
        date: 'Sunday, Sept. 21',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '45',
        away: 'Dallas Cowboys',
        home: 'Chicago Bears',
        date: 'Sunday, Sept. 21',
        time: '4:25p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '46',
        away: 'Arizona Cardinals',
        home: 'San Francisco 49ers',
        date: 'Sunday, Sept. 21',
        time: '4:25p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '47',
        away: 'Kansas City Chiefs',
        home: 'New York Giants',
        date: 'Sunday, Sept. 21',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '48',
        away: 'Detroit Lions',
        home: 'Baltimore Ravens',
        date: 'Monday, Sept. 22',
        time: '8:15p ET',
        network: 'ESPN/ABC',
        isInternational: false
      }
    ]
  },
  {
    weekId: 4,
    status: 'upcoming',
    lockTime: 'September 25, 2025 19:00:00 ET',
    games: [
      {
        id: '49',
        away: 'Seattle Seahawks',
        home: 'Arizona Cardinals',
        date: 'Thursday, Sept. 25',
        time: '8:15p ET',
        network: 'Prime Video',
        isInternational: false
      },
      {
        id: '50',
        away: 'Minnesota Vikings',
        home: 'Pittsburgh Steelers',
        date: 'Sunday, Sept. 28',
        time: '9:30a ET',
        network: 'NFLN',
        isInternational: true,
        location: 'Dublin'
      },
      {
        id: '51',
        away: 'Washington Commanders',
        home: 'Atlanta Falcons',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '52',
        away: 'New Orleans Saints',
        home: 'Buffalo Bills',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '53',
        away: 'Cleveland Browns',
        home: 'Detroit Lions',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '54',
        away: 'Tennessee Titans',
        home: 'Houston Texans',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '55',
        away: 'Carolina Panthers',
        home: 'New England Patriots',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '56',
        away: 'Los Angeles Chargers',
        home: 'New York Giants',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '57',
        away: 'Philadelphia Eagles',
        home: 'Tampa Bay Buccaneers',
        date: 'Sunday, Sept. 28',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '58',
        away: 'Indianapolis Colts',
        home: 'Los Angeles Rams',
        date: 'Sunday, Sept. 28',
        time: '4:05p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '59',
        away: 'Jacksonville Jaguars',
        home: 'San Francisco 49ers',
        date: 'Sunday, Sept. 28',
        time: '4:05p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '60',
        away: 'Baltimore Ravens',
        home: 'Kansas City Chiefs',
        date: 'Sunday, Sept. 28',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '61',
        away: 'Chicago Bears',
        home: 'Las Vegas Raiders',
        date: 'Sunday, Sept. 28',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '62',
        away: 'Green Bay Packers',
        home: 'Dallas Cowboys',
        date: 'Sunday, Sept. 28',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '63',
        away: 'New York Jets',
        home: 'Miami Dolphins',
        date: 'Monday, Sept. 29',
        time: '7:15p ET',
        network: 'ESPN',
        isInternational: false
      },
      {
        id: '64',
        away: 'Cincinnati Bengals',
        home: 'Denver Broncos',
        date: 'Monday, Sept. 29',
        time: '8:15p ET',
        network: 'ABC',
        isInternational: false
      }
    ]
  },
  {
    weekId: 5,
    status: 'upcoming',
    lockTime: 'October 2, 2025 19:00:00 ET',
    games: [
      {
        id: '65',
        away: 'San Francisco 49ers',
        home: 'Los Angeles Rams',
        date: 'Thursday, Oct. 2',
        time: '8:15p ET',
        network: 'Prime Video',
        isInternational: false
      },
      {
        id: '66',
        away: 'Minnesota Vikings',
        home: 'Cleveland Browns',
        date: 'Sunday, Oct. 5',
        time: '9:30a ET',
        network: 'NFLN',
        isInternational: true,
        location: 'Tottenham'
      },
      {
        id: '67',
        away: 'Houston Texans',
        home: 'Baltimore Ravens',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '68',
        away: 'Miami Dolphins',
        home: 'Carolina Panthers',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '69',
        away: 'Las Vegas Raiders',
        home: 'Indianapolis Colts',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '70',
        away: 'New York Giants',
        home: 'New Orleans Saints',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '71',
        away: 'Dallas Cowboys',
        home: 'New York Jets',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '72',
        away: 'Denver Broncos',
        home: 'Philadelphia Eagles',
        date: 'Sunday, Oct. 5',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '73',
        away: 'Tennessee Titans',
        home: 'Arizona Cardinals',
        date: 'Sunday, Oct. 5',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '74',
        away: 'Tampa Bay Buccaneers',
        home: 'Seattle Seahawks',
        date: 'Sunday, Oct. 5',
        time: '4:05p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '75',
        away: 'Detroit Lions',
        home: 'Cincinnati Bengals',
        date: 'Sunday, Oct. 5',
        time: '4:25p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '76',
        away: 'Washington Commanders',
        home: 'Los Angeles Chargers',
        date: 'Sunday, Oct. 5',
        time: '4:25p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '77',
        away: 'New England Patriots',
        home: 'Buffalo Bills',
        date: 'Sunday, Oct. 5',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '78',
        away: 'Kansas City Chiefs',
        home: 'Jacksonville Jaguars',
        date: 'Monday, Oct. 6',
        time: '8:15p ET',
        network: 'ESPN/ABC',
        isInternational: false
      }
    ]
  },
  {
    weekId: 6,
    status: 'upcoming',
    lockTime: 'October 9, 2025 19:00:00 ET',
    games: [
      {
        id: '79',
        away: 'Philadelphia Eagles',
        home: 'New York Giants',
        date: 'Thursday, Oct. 9',
        time: '8:15p ET',
        network: 'Prime Video',
        isInternational: false
      },
      {
        id: '80',
        away: 'Denver Broncos',
        home: 'New York Jets',
        date: 'Sunday, Oct. 12',
        time: '9:30a ET',
        network: 'NFLN',
        isInternational: true,
        location: 'Tottenham'
      },
      {
        id: '81',
        away: 'Los Angeles Rams',
        home: 'Baltimore Ravens',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '82',
        away: 'Dallas Cowboys',
        home: 'Carolina Panthers',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '83',
        away: 'Arizona Cardinals',
        home: 'Indianapolis Colts',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '84',
        away: 'Seattle Seahawks',
        home: 'Jacksonville Jaguars',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '83',
        away: 'Los Angeles Chargers',
        home: 'Miami Dolphins',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '86',
        away: 'Cleveland Browns',
        home: 'Pittsburgh Steelers',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '87',
        away: 'San Francisco 49ers',
        home: 'Tampa Bay Buccaneers',
        date: 'Sunday, Oct. 12',
        time: '1:00p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '88',
        away: 'Tennessee Titans',
        home: 'Las Vegas Raiders',
        date: 'Sunday, Oct. 12',
        time: '4:05p ET',
        network: 'FOX',
        isInternational: false
      },
      {
        id: '89',
        away: 'Cincinnati Bengals',
        home: 'Green Bay Packers',
        date: 'Sunday, Oct. 12',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '90',
        away: 'New England Patriots',
        home: 'New Orleans Saints',
        date: 'Sunday, Oct. 12',
        time: '4:25p ET',
        network: 'CBS',
        isInternational: false
      },
      {
        id: '91',
        away: 'Detroit Lions',
        home: 'Kansas City Chiefs',
        date: 'Sunday, Oct. 12',
        time: '8:20p ET',
        network: 'NBC',
        isInternational: false
      },
      {
        id: '92',
        away: 'Buffalo Bills',
        home: 'Atlanta Falcons',
        date: 'Monday, Oct. 13',
        time: '7:15p ET',
        network: 'ESPN',
        isInternational: false
      },
      {
        id: '93',
        away: 'Chicago Bears',
        home: 'Washington Commanders',
        date: 'Monday, Oct. 13',
        time: '8:15p ET',
        network: 'ABC',
        isInternational: false
      }
    ]
  }
]

// Helper functions
export const getGamesByWeek = (weekId: number): NFLGame[] => {
  const week = nflSchedule.find(w => w.weekId === weekId)
  return week ? week.games : []
}

export const getCurrentWeek = (): number => {
  // For now, return week 1. In production, this would calculate based on current date
  return 1
}

export const getWeekStatus = (weekId: number): string => {
  const week = nflSchedule.find(w => w.weekId === weekId)
  return week ? week.status : 'unknown'
}
