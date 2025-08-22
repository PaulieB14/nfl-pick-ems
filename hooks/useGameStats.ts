import { useState, useEffect } from 'react'
import { useAccount, useSigner } from 'wagmi'
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

  const { data: signer } = useSigner()
  const { isConnected } = useAccount()

  useEffect(() => {
    const fetchStats = async () => {
      if (!isConnected || !signer) {
        setStats({
          totalPlayers: 0,
          currentPot: 0,
          timeLeft: '--'
        })
        return
      }

      try {
        const contract = getNFLPickEmsContract(signer.provider!, signer)
        
        // Fetch real data from smart contract
        const [totalPlayers, currentPot] = await Promise.all([
          contract.getTotalPlayers(week),
          contract.getCurrentPot(week)
        ])

        setStats({
          totalPlayers: Number(totalPlayers),
          currentPot: parseFloat(currentPot),
          timeLeft: '--' // Could implement countdown logic here
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
  }, [week, isConnected, signer])

  return stats
}
