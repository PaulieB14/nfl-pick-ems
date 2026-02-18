export interface NFLGame {
  id: string
  homeTeam: string
  awayTeam: string
  homeAbbrev: string
  awayAbbrev: string
  startTime: Date
  week: number
  status: 'upcoming' | 'active' | 'completed'
  homeScore?: number
  awayScore?: number
}

interface ScheduleGame {
  gameIndex: number
  espnEventId: string
  homeTeam: { name: string; abbreviation: string; displayName: string }
  awayTeam: { name: string; abbreviation: string; displayName: string }
  startTime: string
}

interface WeekSchedule {
  weekId: number
  season: number
  gameCount: number
  lockTime: string
  games: ScheduleGame[]
}

// In-memory cache populated by async fetch
const scheduleCache: Map<number, NFLGame[]> = new Map()

function mapScheduleToGames(schedule: WeekSchedule): NFLGame[] {
  const now = new Date()
  return schedule.games.map(g => {
    const startTime = new Date(g.startTime)
    let status: 'upcoming' | 'active' | 'completed' = 'upcoming'
    if (now > new Date(startTime.getTime() + 4 * 60 * 60 * 1000)) {
      status = 'completed' // ~4 hours after start
    } else if (now >= startTime) {
      status = 'active'
    }
    return {
      id: `week${schedule.weekId}-game${g.gameIndex}`,
      homeTeam: g.homeTeam.displayName,
      awayTeam: g.awayTeam.displayName,
      homeAbbrev: g.homeTeam.abbreviation,
      awayAbbrev: g.awayTeam.abbreviation,
      startTime,
      week: schedule.weekId,
      status,
    }
  })
}

export function getGamesByWeek(week: number): NFLGame[] {
  return scheduleCache.get(week) ?? []
}

export async function loadWeekSchedule(week: number): Promise<NFLGame[]> {
  if (scheduleCache.has(week)) return scheduleCache.get(week)!
  try {
    const response = await fetch(`/schedules/week-${week}.json`)
    if (!response.ok) return []
    const schedule: WeekSchedule = await response.json()
    const games = mapScheduleToGames(schedule)
    scheduleCache.set(week, games)
    return games
  } catch {
    return []
  }
}

export function getCurrentWeek(): number {
  // NFL 2026 season: Week 1 starts approx Sept 10, 2026
  const seasonStart = new Date('2026-09-10T00:00:00Z')
  const now = new Date()
  if (now < seasonStart) return 1
  const diffMs = now.getTime() - seasonStart.getTime()
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
  return Math.min(Math.max(diffWeeks + 1, 1), 18)
}

export function getWeekStatus(week: number): 'upcoming' | 'active' | 'completed' {
  const seasonStart = new Date('2026-09-10T00:00:00Z')
  const weekStart = new Date(seasonStart.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000)
  const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000)
  const now = new Date()
  if (now < weekStart) return 'upcoming'
  if (now > weekEnd) return 'completed'
  return 'active'
}
