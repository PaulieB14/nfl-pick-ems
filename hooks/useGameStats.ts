import { useState, useEffect } from 'react'

interface GameStats {
  totalPlayers: number
  currentPot: number
  timeLeft: string
}

export const useGameStats = (week: number) => {
  const [stats, setStats] = useState<GameStats>({
    totalPlayers: 0,
    currentPot: 0,
    timeLeft: '--'
  })

  useEffect(() => {
    // TODO: Fetch real stats from smart contract
    // For now, return placeholder data
    setStats({
      totalPlayers: Math.floor(Math.random() * 50),
      currentPot: Math.floor(Math.random() * 1000),
      timeLeft: '2 days'
    })
  }, [week])

  return stats
}
