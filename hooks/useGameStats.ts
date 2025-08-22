import { useState, useEffect } from 'react'
import { useAccount, useWalletClient } from 'wagmi'
import { getNFLPickEmsContract } from '@/lib/contracts'

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

  const { data: walletClient } = useWalletClient()
  const { isConnected } = useAccount()

  useEffect(() => {
    const fetchStats = async () => {
      if (!isConnected || !walletClient) {
        setStats({
          totalPlayers: 0,
          currentPot: 0,
          timeLeft: '--'
        })
        return
      }

      try {
        // TODO: Implement actual smart contract calls when ready
        // For now, return placeholder data
        setStats({
          totalPlayers: 0,
          currentPot: 0,
          timeLeft: '--'
        })
      } catch (error) {
        console.error('Error fetching game stats:', error)
        // Fallback to zeros on error
        setStats({
          totalPlayers: 0,
          currentPot: 0,
          timeLeft: '--'
        })
      }
    }

    fetchStats()
  }, [week, isConnected, walletClient])

  return stats
}
