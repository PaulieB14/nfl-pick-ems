'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Zap } from 'lucide-react'

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
  const getPickForGame = (gameId: string) =>
    selectedPicks.find(pick => pick.gameId === gameId)

  const formatGameTime = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)

  // Allow picking on upcoming and completed (for testing with historical data).
  // The smart contract enforces the real lock time on-chain.
  const isGamePickable = (game: Game) => game.status !== 'active'

  const pickCount = selectedPicks.length
  const circumference = 2 * Math.PI * 18
  const progress = (pickCount / 10) * circumference

  return (
    <div className="space-y-5">
      {/* Floating Pick Counter */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="relative w-14 h-14">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
            <circle
              cx="20" cy="20" r="18" fill="none"
              stroke={pickCount === 10 ? '#22c55e' : '#FFB612'}
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-lg font-black ${pickCount === 10 ? 'text-green-400' : 'text-nfl-gold'}`}>
              {pickCount}
            </span>
          </div>
        </div>
        <div>
          <div className="text-white font-bold text-lg">{pickCount}/10 Picks</div>
          <div className="text-white/50 text-sm">
            {pickCount === 10 ? 'Ready to submit!' : `${10 - pickCount} more needed`}
          </div>
        </div>
      </div>

      {/* Matchup Cards */}
      <div className="space-y-3">
        {games.map((game, index) => {
          const pick = getPickForGame(game.id)
          const pickable = isGamePickable(game)

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04, duration: 0.3 }}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                pick
                  ? 'ring-2 ring-nfl-gold/60 shadow-lg shadow-nfl-gold/10'
                  : 'ring-1 ring-white/[0.08]'
              } ${!pickable ? 'opacity-50' : ''}`}
            >
              {/* Game time bar */}
              <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03]">
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                  Game {index + 1}
                </span>
                <span className={`text-xs font-semibold ${
                  game.status === 'active' ? 'text-green-400' :
                  game.status === 'completed' ? 'text-white/40' :
                  'text-white/50'
                }`}>
                  {game.status === 'active' ? 'LIVE' :
                   game.status === 'completed' ? 'FINAL' :
                   formatGameTime(game.startTime)}
                </span>
              </div>

              {/* VS Matchup Row */}
              <div className="flex items-stretch">
                {/* Away Team */}
                <button
                  onClick={() => {
                    if (!pickable) return
                    if (pick?.selectedTeam === 'away') onPickRemoval(game.id)
                    else onPickSelection(game.id, 'away')
                  }}
                  disabled={!pickable}
                  className={`flex-1 flex items-center gap-3 px-4 py-4 transition-all duration-200 group ${
                    pick?.selectedTeam === 'away'
                      ? 'team-selected bg-nfl-gold/15'
                      : 'hover:bg-white/[0.05]'
                  } ${pickable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm transition-all ${
                    pick?.selectedTeam === 'away'
                      ? 'bg-nfl-gold text-nfl-dark shadow-md shadow-nfl-gold/30'
                      : 'bg-white/[0.08] text-white/70 group-hover:bg-white/[0.12] group-hover:text-white'
                  }`}>
                    {pick?.selectedTeam === 'away' ? <Check className="w-5 h-5" /> : game.awayAbbrev}
                  </div>
                  <div className="flex-1 text-left">
                    <div className={`font-bold text-sm ${pick?.selectedTeam === 'away' ? 'text-nfl-gold' : 'text-white'}`}>
                      {game.awayAbbrev}
                    </div>
                    <div className="text-xs text-white/40 truncate">{game.awayTeam}</div>
                  </div>
                  {game.status === 'completed' && game.awayScore !== undefined && (
                    <div className="text-xl font-black text-white/60">{game.awayScore}</div>
                  )}
                </button>

                {/* VS Divider */}
                <div className="flex items-center px-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${
                    pick ? 'bg-nfl-gold/20 text-nfl-gold vs-glow' : 'bg-white/[0.05] text-white/30'
                  }`}>
                    VS
                  </div>
                </div>

                {/* Home Team */}
                <button
                  onClick={() => {
                    if (!pickable) return
                    if (pick?.selectedTeam === 'home') onPickRemoval(game.id)
                    else onPickSelection(game.id, 'home')
                  }}
                  disabled={!pickable}
                  className={`flex-1 flex items-center gap-3 px-4 py-4 transition-all duration-200 group flex-row-reverse ${
                    pick?.selectedTeam === 'home'
                      ? 'team-selected bg-nfl-gold/15'
                      : 'hover:bg-white/[0.05]'
                  } ${pickable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm transition-all ${
                    pick?.selectedTeam === 'home'
                      ? 'bg-nfl-gold text-nfl-dark shadow-md shadow-nfl-gold/30'
                      : 'bg-white/[0.08] text-white/70 group-hover:bg-white/[0.12] group-hover:text-white'
                  }`}>
                    {pick?.selectedTeam === 'home' ? <Check className="w-5 h-5" /> : game.homeAbbrev}
                  </div>
                  <div className="flex-1 text-right">
                    <div className={`font-bold text-sm ${pick?.selectedTeam === 'home' ? 'text-nfl-gold' : 'text-white'}`}>
                      {game.homeAbbrev}
                    </div>
                    <div className="text-xs text-white/40 truncate">{game.homeTeam}</div>
                  </div>
                  {game.status === 'completed' && game.homeScore !== undefined && (
                    <div className="text-xl font-black text-white/60">{game.homeScore}</div>
                  )}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Empty State */}
      {games.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏈</div>
          <h3 className="text-xl font-bold text-white mb-2">No Games Yet</h3>
          <p className="text-white/50">Schedule data will appear when the oracle sets up this week.</p>
        </div>
      )}

      {/* Status + Submit */}
      <div className="space-y-4 pt-2">
        <AnimatePresence>
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center p-4 glass rounded-xl"
            >
              <p className="text-amber-300 text-sm font-medium">Connect your wallet to submit picks</p>
            </motion.div>
          )}

          {transactionHash && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
            >
              <p className="text-green-400 font-semibold mb-1">Picks submitted!</p>
              <a
                href={`https://basescan.org/tx/${transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-300/70 hover:text-green-300 underline text-sm"
              >
                View on BaseScan
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            whileHover={canSubmit ? { scale: 1.03 } : {}}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            onClick={onSubmitPicks}
            disabled={!canSubmit || isSubmitting}
            className={`w-full max-w-md px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
              canSubmit
                ? 'bg-gradient-to-r from-nfl-gold via-amber-500 to-nfl-gold text-nfl-dark shadow-xl shadow-nfl-gold/20 animate-glow-pulse cursor-pointer'
                : 'bg-white/[0.06] text-white/30 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-nfl-dark/30 border-t-nfl-dark rounded-full animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                <span>Submit Picks &middot; $2 USDC</span>
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
