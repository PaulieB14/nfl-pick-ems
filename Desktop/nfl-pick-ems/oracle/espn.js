// ESPN API client — fetches NFL schedule and scores

const BASE_URL = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard'

/**
 * Fetch all games for a given NFL week from ESPN.
 * Games are sorted by start time, then ESPN event ID for stable ordering.
 */
export async function fetchWeekSchedule(season, week) {
  const url = `${BASE_URL}?dates=${season}&seasontype=2&week=${week}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`ESPN API error: ${response.status} ${response.statusText}`)
  }
  const data = await response.json()
  return parseEvents(data.events || [])
}

/**
 * Fetch current NFL week info from ESPN (no-params call returns current week).
 */
export async function fetchCurrentWeek() {
  const response = await fetch(BASE_URL)
  if (!response.ok) {
    throw new Error(`ESPN API error: ${response.status}`)
  }
  const data = await response.json()
  const league = data.leagues?.[0]
  return {
    season: league?.season?.year,
    week: data.week?.number,
    seasonType: league?.season?.type?.type,
  }
}

function parseEvents(events) {
  return events
    .map(event => {
      const comp = event.competitions?.[0]
      if (!comp) return null

      const home = comp.competitors?.find(c => c.homeAway === 'home')
      const away = comp.competitors?.find(c => c.homeAway === 'away')
      if (!home || !away) return null

      return {
        espnEventId: event.id,
        startTime: event.date,
        status: {
          state: comp.status?.type?.state ?? 'pre',
          completed: comp.status?.type?.completed ?? false,
          description: comp.status?.type?.description ?? 'Scheduled',
        },
        homeTeam: {
          name: home.team.shortDisplayName || home.team.name,
          abbreviation: home.team.abbreviation,
          displayName: home.team.displayName,
          score: parseInt(home.score ?? '0', 10),
          winner: home.winner ?? false,
        },
        awayTeam: {
          name: away.team.shortDisplayName || away.team.name,
          abbreviation: away.team.abbreviation,
          displayName: away.team.displayName,
          score: parseInt(away.score ?? '0', 10),
          winner: away.winner ?? false,
        },
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      // Sort by start time, then by ESPN event ID for stable ordering
      const timeDiff = new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      if (timeDiff !== 0) return timeDiff
      return a.espnEventId.localeCompare(b.espnEventId)
    })
}

/**
 * Compute the on-chain winnersMask from ESPN game results.
 * Bit i = 1 means home team won game at index i.
 * Games must be in the same order as stored in the schedule JSON.
 */
export function computeWinnersMask(games) {
  let mask = BigInt(0)
  for (let i = 0; i < games.length; i++) {
    if (games[i].homeTeam.winner) {
      mask |= BigInt(1) << BigInt(i)
    }
  }
  return mask
}
