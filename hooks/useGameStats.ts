'use client'

import { useState, useEffect } from 'react'
import { getNFLPickEmsContract } from '@/lib/contracts'
import { useWalletClient } from 'wagmi'

interface GameStats {
  currentPot: string
  totalPlayers: number
  timeLeft: string
  entryFee: string
}

export function useGameStats(week: number): GameStats {
  const [stats, setStats] = useState<GameStats>({
    currentPot: '0.00',
    totalPlayers: 0,
    timeLeft: 'Loading...',
    entryFee: '2.00'
  })

  const { data: walletClient } = useWalletClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const contract = getNFLPickEmsContract(walletClient)
        
        // Fetch current pot
        const potWei = await contract.getCurrentPot(week)
        const potUSDC = Number(potWei) / 1e6 // Convert from wei to USDC (6 decimals)
        
        // Fetch total players
        const totalPlayersWei = await contract.getTotalPlayers(week)
        const totalPlayers = Number(totalPlayersWei)
        
        // Fetch entry fee
        const entryFeeWei = await contract.getEntryFee()
        const entryFee = Number(entryFeeWei) / 1e6 // Convert from wei to USDC (6 decimals)
        
        // Calculate time left (mock for now)
        const timeLeft = calculateTimeLeft(week)
        
        setStats({
          currentPot: potUSDC.toFixed(2),
          totalPlayers,
          timeLeft,
          entryFee: entryFee.toFixed(2)
        })
      } catch (error) {
        console.error('Error fetching game stats:', error)
        // Use fallback values
        setStats({
          currentPot: '0.00',
          totalPlayers: 0,
          timeLeft: 'Week not started',
          entryFee: '2.00'
        })
      }
    }

    fetchStats()

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [week, walletClient])

  return stats
}

function calculateTimeLeft(week: number): string {
  // Mock time calculation - in a real app, this would calculate based on actual game times
  const now = new Date()
  const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.
  
  // Calculate next Sunday (most NFL games)
  let daysUntilSunday = (7 - currentDay) % 7
  if (daysUntilSunday === 0 && now.getHours() >= 18) {
    // If it's Sunday after 6 PM, games are likely over
    daysUntilSunday = 7
  }
  
  if (daysUntilSunday === 0) {
    return 'Games Today!'
  } else if (daysUntilSunday === 1) {
    return '1 day left'
  } else {
    return `${daysUntilSunday} days left`
  }
}
