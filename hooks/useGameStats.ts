import { useState, useEffect } from 'react'

export interface GameStats {
  totalPlayers: number
  currentPot: number
  timeLeft: string
  weekStatus: 'upcoming' | 'active' | 'completed'
  lockTime: Date | null
}

export function useGameStats(week: number) {
  const [stats, setStats] = useState<GameStats>({
    totalPlayers: 0,
    currentPot: 0,
    timeLeft: '--',
    weekStatus: 'upcoming',
    lockTime: null
  })

  useEffect(() => {
    // TODO: Connect to smart contract to get real stats
    // For now, simulate real-time updates
    const updateStats = () => {
      const now = new Date()
      const weekStart = new Date('2025-09-04') // Week 1 starts
      const weekOffset = (week - 1) * 7 * 24 * 60 * 60 * 1000
      const lockTime = new Date(weekStart.getTime() + weekOffset + (6 * 24 * 60 * 60 * 1000)) // Saturday before games
      
      let weekStatus: 'upcoming' | 'active' | 'completed' = 'upcoming'
      if (now > lockTime) {
        weekStatus = 'completed'
      } else if (now > new Date(lockTime.getTime() - (24 * 60 * 60 * 1000))) {
        weekStatus = 'active'
      }

      const timeLeft = lockTime > now 
        ? Math.ceil((lockTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        : 0

      setStats({
        totalPlayers: 0, // Will come from smart contract
        currentPot: 0,   // Will come from smart contract
        timeLeft: timeLeft > 0 ? `${timeLeft}d` : 'Closed',
        weekStatus,
        lockTime
      })
    }

    updateStats()
    const interval = setInterval(updateStats, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [week])

  return stats
}
