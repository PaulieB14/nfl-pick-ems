'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Clock, Zap } from 'lucide-react'

interface Game {
  id: string
  homeTeam: string
  awayTeam: string
  homeAbbrev: string
  awayAbbrev: string
  startTime: Date
  week: number
  status: 'upcoming' | 'active' | 'completed'
  homeScore?: number
  awayScore?: number
}

interface GamePick {
  gameId: string
  selectedTeam: 'home' | 'away'
}

interface GamePickerProps {
  games: Game[]
  selectedPicks: GamePick[]
  onPickSelection: (gameId: string, team: 'home' | 'away') => void
  onPickRemoval: (gameId: string) => void
  onSubmitPicks: () => void
  isConnected: boolean
  canSubmit: boolean
  isSubmitting: boolean
  transactionHash: string | null
}

export default function GamePicker({
  games,
  selectedPicks,
  onPickSelection,
  onPickRemoval,
  onSubmitPicks,
  isConnected,
  canSubmit,
  isSubmitting,
  transactionHash
}: GamePickerProps) {
  const [hoveredGame, setHoveredGame] = useState<string | null>(null)

  const getPickForGame = (gameId: string) => {
    return selectedPicks.find(pick => pick.gameId === gameId)
  }

  const formatGameTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(date)
  }

  const getGameStatus = (game: Game) => {
    const now = new Date()
    const gameTime = new Date(game.startTime)
    
    if (game.status === 'completed') return 'Final'
    if (game.status === 'active') return 'Live'
    if (gameTime > now) return formatGameTime(gameTime)
    
    return 'Starting Soon'
  }

  const getStatusColor = (game: Game) => {
    switch (game.status) {
      case 'completed': return 'text-red-400'
      case 'active': return 'text-green-400'
      case 'upcoming': return 'text-blue-400'
      default: return 'text-white/70'
    }
  }

  const isGamePickable = (game: Game) => {
    return game.status === 'upcoming'
  }

  return (
    <div className="space-y-6">
      {/* Games Grid */}
      <div className="grid gap-4">
        {games.map((game, index) => {
          const pick = getPickForGame(game.id)
          const isPickable = isGamePickable(game)
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-xl border ${
                pick ? 'border-nfl-gold shadow-lg shadow-nfl-gold/20' : 'border-white/20'
              } overflow-hidden ${!isPickable ? 'opacity-60' : ''}`}
              onMouseEnter={() => setHoveredGame(game.id)}
              onMouseLeave={() => setHoveredGame(null)}
            >
              {/* Game Header */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-white/70">Game {index + 1}</span>
                    {pick && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center space-x-1 bg-nfl-gold/20 text-nfl-gold px-2 py-1 rounded-full text-xs"
                      >
                        <Check className="w-3 h-3" />
                        <span>Picked</span>
                      </motion.div>
                    )}
                  </div>
                  <div className={`text-sm ${getStatusColor(game)}`}>
                    {getGameStatus(game)}
                  </div>
                </div>
              </div>

              {/* Teams Selection */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Away Team */}
                  <motion.button
                    whileHover={isPickable ? { scale: 1.02 } : {}}
                    whileTap={isPickable ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (!isPickable) return
                      if (pick?.selectedTeam === 'away') {
                        onPickRemoval(game.id)
                      } else {
                        onPickSelection(game.id, 'away')
                      }
                    }}
                    disabled={!isPickable}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      pick?.selectedTeam === 'away'
                        ? 'border-nfl-gold bg-nfl-gold/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/10'
                    } ${!isPickable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-2xl font-bold">{game.awayAbbrev}</div>
                      <div className="text-sm font-medium">{game.awayTeam}</div>
                      <div className="text-xs opacity-70">@ {game.homeAbbrev}</div>
                      {game.status === 'completed' && game.awayScore !== undefined && (
                        <div className="text-lg font-bold">{game.awayScore}</div>
                      )}
                    </div>
                    {pick?.selectedTeam === 'away' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-nfl-gold rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>

                  {/* Home Team */}
                  <motion.button
                    whileHover={isPickable ? { scale: 1.02 } : {}}
                    whileTap={isPickable ? { scale: 0.98 } : {}}
                    onClick={() => {
                      if (!isPickable) return
                      if (pick?.selectedTeam === 'home') {
                        onPickRemoval(game.id)
                      } else {
                        onPickSelection(game.id, 'home')
                      }
                    }}
                    disabled={!isPickable}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      pick?.selectedTeam === 'home'
                        ? 'border-nfl-gold bg-nfl-gold/20 text-white'
                        : 'border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/10'
                    } ${!isPickable ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="text-2xl font-bold">{game.homeAbbrev}</div>
                      <div className="text-sm font-medium">{game.homeTeam}</div>
                      <div className="text-xs opacity-70">vs {game.awayAbbrev}</div>
                      {game.status === 'completed' && game.homeScore !== undefined && (
                        <div className="text-lg font-bold">{game.homeScore}</div>
                      )}
                    </div>
                    {pick?.selectedTeam === 'home' && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-6 h-6 bg-nfl-gold rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    )}
                  </motion.button>
                </div>

                {/* Pick Removal Button */}
                {pick && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => onPickRemoval(game.id)}
                    className="mt-3 w-full flex items-center justify-center space-x-2 py-2 px-4 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Remove Pick</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Submit Section */}
      <div className="space-y-4">
        {/* Pick Count Display */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-md rounded-xl px-6 py-4 border border-white/20">
            <div className="text-white">
              <span className="text-2xl font-bold text-nfl-gold">{selectedPicks.length}</span>
              <span className="text-white/70"> / 10 picks selected</span>
            </div>
            {selectedPicks.length === 10 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-green-400"
              >
                <Check className="w-6 h-6" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Status Messages */}
        <AnimatePresence>
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg"
            >
              <p className="text-yellow-300">Please connect your wallet to submit picks</p>
            </motion.div>
          )}

          {selectedPicks.length !== 10 && isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg"
            >
              <p className="text-blue-300">
                Select {10 - selectedPicks.length} more {10 - selectedPicks.length === 1 ? 'team' : 'teams'} to complete your picks
              </p>
            </motion.div>
          )}

          {transactionHash && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-4 bg-green-500/20 border border-green-400/30 rounded-lg"
            >
              <p className="text-green-300 mb-2">✅ Picks submitted successfully!</p>
              <a
                href={`https://basescan.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-blue-200 underline text-sm"
              >
                View transaction on BaseScan
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={canSubmit ? { scale: 1.05 } : {}}
            whileTap={canSubmit ? { scale: 0.95 } : {}}
            onClick={onSubmitPicks}
            disabled={!canSubmit || isSubmitting}
            className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
              canSubmit
                ? 'bg-gradient-to-r from-nfl-gold to-nfl-red text-white hover:shadow-2xl hover:shadow-nfl-gold/25 cursor-pointer transform hover:-translate-y-1'
                : 'bg-gray-500/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Submitting Picks...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Submit 10 Picks ($2 USDC)</span>
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
