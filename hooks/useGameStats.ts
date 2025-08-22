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
    // For now, return real data (zeros until connected to smart contract)
    setStats({
      totalPlayers: 0,
      currentPot: 0,
      timeLeft: '--'
    })
  }, [week])

  return stats
}
