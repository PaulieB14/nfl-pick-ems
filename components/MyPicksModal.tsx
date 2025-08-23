'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Calendar, CheckCircle, Clock } from 'lucide-react'
import { useState } from 'react'
import { NFLGame } from '@/lib/nflSchedule'

interface MyPicksModalProps {
  isOpen: boolean
  onClose: () => void
  picks: string[]
  games: NFLGame[]
  week: number
}

export default function MyPicksModal({ isOpen, onClose, picks, games, week }: MyPicksModalProps) {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current')

  const currentWeekPicks = picks.length > 0 ? picks : []
  const historicalPicks = [] // TODO: Get from smart contract

  const getGameById = (gameId: string) => games.find(g => g.id === gameId)

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
              <Trophy className="w-6 h-6 text-nfl-gold" />
              <span>My Picks</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('current')}
              className={`flex-1 p-4 text-center transition-colors ${
                activeTab === 'current'
                  ? 'text-nfl-gold border-b-2 border-nfl-gold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Current Week
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 p-4 text-center transition-colors ${
                activeTab === 'history'
                  ? 'text-nfl-gold border-b-2 border-nfl-gold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              History
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {activeTab === 'current' ? (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-nfl-gold" />
                  <span className="text-white font-semibold">Week {week}</span>
                </div>

                {currentWeekPicks.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/70 mb-2">No picks submitted yet</p>
                    <p className="text-white/50 text-sm">Go back and select your 16 picks!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentWeekPicks.map((gameId, index) => {
                      const game = getGameById(gameId)
                      if (!game) return null

                      return (
                        <motion.div
                          key={gameId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="text-white font-semibold">
                                {game.away} @ {game.home}
                              </div>
                              <div className="text-white/70 text-sm">
                                {game.date} • {game.time} • {game.network}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-nfl-gold font-bold">#{index + 1}</span>
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="text-center py-8">
                  <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70 mb-2">No previous picks</p>
                  <p className="text-white/50 text-sm">Start playing to see your history!</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
