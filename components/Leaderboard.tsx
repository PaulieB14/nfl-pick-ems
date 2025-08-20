'use client'

import { motion } from 'framer-motion'
import { Trophy, TrendingUp, Users, Star } from 'lucide-react'
import { useState, useEffect } from 'react'

interface LeaderboardEntry {
  address: string
  score: number
  picks: string[]
  week: number
  timestamp: number
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // TODO: Connect to smart contract to get real leaderboard data
    // This will fetch from the contract's events and state
    const fetchLeaderboard = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Empty for now - will be populated from smart contract
        setLeaderboard([])
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-nfl-gold" />
          <span>Leaderboard</span>
        </h3>
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-2 border-nfl-gold border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white/70">Loading leaderboard...</p>
        </div>
      </motion.div>
    )
  }

  if (leaderboard.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-nfl-gold" />
          <span>Leaderboard</span>
        </h3>
        
        <div className="text-center py-8">
          <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <p className="text-white/70 mb-2">No games played yet</p>
          <p className="text-white/50 text-sm">Make your first picks to get on the board!</p>
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <div className="text-white/70 text-sm mb-1">Your Stats</div>
          <div className="text-white font-medium">0 games played</div>
          <div className="text-white/50 text-sm">0 correct picks</div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <Trophy className="w-5 h-5 text-nfl-gold" />
        <span>Leaderboard</span>
      </h3>
      
      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.address}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-3 rounded-xl border border-white/10 bg-white/5 transition-all hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8">
                  {index === 0 && <Trophy className="w-6 h-6 text-nfl-gold" fill="currentColor" />}
                  {index === 1 && <Star className="w-6 h-6 text-nfl-silver" fill="currentColor" />}
                  {index === 2 && <TrendingUp className="w-6 h-6 text-nfl-blue" fill="currentColor" />}
                  {index > 2 && <span className="text-white font-bold">{index + 1}</span>}
                </div>
                <div>
                  <div className="text-white font-semibold">
                    {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                  </div>
                  <div className="text-white/70 text-sm">
                    {entry.score}/10 correct • Week {entry.week}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-nfl-gold font-bold">#{index + 1}</div>
                <div className="text-white/50 text-sm">Rank</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <div className="text-white/70 text-sm mb-1">Your Stats</div>
        <div className="text-white font-medium">0 games played</div>
        <div className="text-white/50 text-sm">0 correct picks</div>
      </div>
    </motion.div>
  )
}
