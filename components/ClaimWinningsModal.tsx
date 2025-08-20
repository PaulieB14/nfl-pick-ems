'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign, Trophy, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface ClaimWinningsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface WinningsEntry {
  week: number
  amount: number
  status: 'available' | 'claimed' | 'pending'
  gameCount: number
  correctPicks: number
}

export default function ClaimWinningsModal({ isOpen, onClose }: ClaimWinningsModalProps) {
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimedWeeks, setClaimedWeeks] = useState<number[]>([])

  // TODO: Get real data from smart contract
  const winnings: WinningsEntry[] = [
    {
      week: 1,
      amount: 0,
      status: 'pending',
      gameCount: 10,
      correctPicks: 0
    }
  ]

  const handleClaim = async (week: number) => {
    setIsClaiming(true)
    try {
      // TODO: Call smart contract claim function
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate transaction
      setClaimedWeeks(prev => [...prev, week])
    } catch (error) {
      console.error('Claim failed:', error)
    } finally {
      setIsClaiming(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'claimed': return <Trophy className="w-5 h-5 text-nfl-gold" />
      case 'pending': return <AlertCircle className="w-5 h-5 text-yellow-400" />
      default: return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400'
      case 'claimed': return 'text-nfl-gold'
      case 'pending': return 'text-yellow-400'
      default: return 'text-white/70'
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-6 h-6 text-nfl-gold" />
              <span>Claim Winnings</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {winnings.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-2">No winnings available</p>
                <p className="text-white/50 text-sm">Win some games to claim rewards!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {winnings.map((entry) => (
                  <motion.div
                    key={entry.week}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">Week {entry.week}</span>
                        {getStatusIcon(entry.status)}
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(entry.status)}`}>
                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-white/70 text-sm">Correct Picks</div>
                        <div className="text-white font-bold">{entry.correctPicks}/{entry.gameCount}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white/70 text-sm">Winnings</div>
                        <div className="text-nfl-gold font-bold">${entry.amount.toFixed(2)}</div>
                      </div>
                    </div>

                    {entry.status === 'available' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleClaim(entry.week)}
                        disabled={isClaiming}
                        className="w-full bg-nfl-gold text-nfl-red py-2 px-4 rounded-lg font-semibold hover:bg-nfl-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isClaiming ? 'Claiming...' : 'Claim Winnings'}
                      </motion.button>
                    )}

                    {entry.status === 'claimed' && (
                      <div className="text-center text-green-400 font-medium">
                        ✓ Winnings claimed successfully!
                      </div>
                    )}

                    {entry.status === 'pending' && (
                      <div className="text-center text-yellow-400 text-sm">
                        Results not yet finalized
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
