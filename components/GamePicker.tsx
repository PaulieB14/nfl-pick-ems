'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Globe, CircleDot, Star, Zap } from 'lucide-react'
import { NFLGame } from '@/lib/nflSchedule'

interface GamePick {
  gameId: string
  selectedTeam: 'home' | 'away'
}

interface GamePickerProps {
  games: NFLGame[]
  selectedPicks: GamePick[]
  onPickSelection: (gameId: string, team: 'home' | 'away') => void
  onPickRemoval: (gameId: string) => void
  onSubmitPicks: () => void
  isConnected: boolean
  canSubmit: boolean
}

export default function GamePicker({ games, selectedPicks, onPickSelection, onPickRemoval, onSubmitPicks, isConnected, canSubmit }: GamePickerProps) {
  const isGameSelected = (gameId: string) => selectedPicks.some(pick => pick.gameId === gameId)
  const getSelectedTeam = (gameId: string) => selectedPicks.find(pick => pick.gameId === gameId)?.selectedTeam
  const canSelect = () => selectedPicks.length < 10

  const handleTeamSelection = (gameId: string, team: 'home' | 'away') => {
    if (isGameSelected(gameId)) {
      // If already selected, remove the pick
      onPickRemoval(gameId)
    } else if (canSelect()) {
      // If not selected and under limit, add the pick
      onPickSelection(gameId, team)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {games.map((game, index) => {
          const isSelected = isGameSelected(game.id)
          const selectedTeam = getSelectedTeam(game.id)
          const isDisabled = !isSelected && !canSelect()

          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: isDisabled ? 1 : 1.02 }}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? 'border-nfl-gold bg-gradient-to-r from-nfl-gold/20 to-nfl-gold/10 shadow-2xl shadow-nfl-gold/25'
                  : 'border-white/20 bg-gradient-to-r from-white/5 to-white/10 hover:border-white/40 hover:shadow-lg'
              } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-nfl-gold to-nfl-red rounded-full flex items-center justify-center shadow-lg"
                >
                  <CircleDot className="w-6 h-6 text-white" />
                </motion.div>
              )}

              {/* International game indicator */}
              {game.isInternational && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Globe className="w-5 h-5 text-white" />
                </motion.div>
              )}

              {/* Game info header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-nfl-gold to-nfl-red animate-pulse"></div>
                <span className="text-white/80 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full">
                  {game.time}
                </span>
                {game.isInternational && (
                  <span className="text-blue-300 text-xs bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                    {game.location}
                  </span>
                )}
              </div>

              {/* Team selection */}
              <div className="space-y-4">
                {/* Away Team */}
                <motion.button
                  whileHover={{ scale: isDisabled ? 1 : 1.03 }}
                  whileTap={{ scale: isDisabled ? 1 : 0.97 }}
                  onClick={() => handleTeamSelection(game.id, 'away')}
                  disabled={isDisabled}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                    isSelected && selectedTeam === 'away'
                      ? 'border-nfl-gold bg-gradient-to-r from-nfl-gold/30 to-nfl-gold/20 text-nfl-gold shadow-lg'
                      : 'border-white/20 bg-gradient-to-r from-white/10 to-white/5 text-white hover:border-white/40 hover:shadow-md'
                  } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* Background pattern for selected team */}
                  {isSelected && selectedTeam === 'away' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-nfl-gold/10 to-transparent opacity-50"></div>
                  )}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="text-left">
                      <div className="font-bold text-lg">{game.away}</div>
                      <div className="text-sm opacity-80 flex items-center space-x-2">
                        <span>Away Team</span>
                        {isSelected && selectedTeam === 'away' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-1 text-nfl-gold"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-semibold">SELECTED</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {isSelected && selectedTeam === 'away' && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-10 h-10 bg-gradient-to-r from-nfl-gold to-nfl-red rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CircleDot className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* VS indicator with cool styling */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-gradient-to-r from-nfl-red via-nfl-blue to-nfl-gold text-white text-sm font-bold px-4 py-2 rounded-full border-2 border-white/20 shadow-lg">
                      VS
                    </span>
                  </div>
                </div>

                {/* Home Team */}
                <motion.button
                  whileHover={{ scale: isDisabled ? 1 : 1.03 }}
                  whileTap={{ scale: isDisabled ? 1 : 0.97 }}
                  onClick={() => handleTeamSelection(game.id, 'home')}
                  disabled={isDisabled}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden ${
                    isSelected && selectedTeam === 'home'
                      ? 'border-nfl-gold bg-gradient-to-r from-nfl-gold/30 to-nfl-gold/20 text-nfl-gold shadow-lg'
                      : 'border-white/20 bg-gradient-to-r from-white/10 to-white/5 text-white hover:border-white/40 hover:shadow-md'
                  } ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {/* Background pattern for selected team */}
                  {isSelected && selectedTeam === 'home' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-nfl-gold/10 to-transparent opacity-50"></div>
                  )}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="text-left">
                      <div className="font-bold text-lg">{game.home}</div>
                      <div className="text-sm opacity-80 flex items-center space-x-2">
                        <span>Home Team</span>
                        {isSelected && selectedTeam === 'home' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-1 text-nfl-gold"
                          >
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-semibold">SELECTED</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {isSelected && selectedTeam === 'home' && (
                      <motion.div
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-10 h-10 bg-gradient-to-r from-nfl-gold to-nfl-red rounded-full flex items-center justify-center shadow-lg"
                      >
                        <CircleDot className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Game details footer */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-white/60 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md">{game.date}</span>
                    <span className="bg-white/10 px-2 py-1 rounded-md">{game.network}</span>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center space-x-1 text-nfl-gold"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-xs font-semibold">LOCKED IN</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Enhanced Selection Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 p-6 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border border-white/20 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between text-white mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-nfl-gold to-nfl-red rounded-full flex items-center justify-center">
              <CircleDot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">Your Picks</span>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-nfl-gold">{selectedPicks.length}/10</span>
            <div className="text-white/70 text-sm">Teams Selected</div>
          </div>
        </div>
        
        {selectedPicks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {selectedPicks.map((pick, index) => {
              const game = games.find(g => g.id === pick.gameId)
              if (!game) return null

              const teamName = pick.selectedTeam === 'home' ? game.home : game.away
              const opponent = pick.selectedTeam === 'home' ? game.away : game.home

              return (
                <motion.div
                  key={pick.gameId}
                  initial={{ scale: 0, x: -20 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between bg-gradient-to-r from-nfl-gold/20 to-nfl-gold/10 text-nfl-gold px-4 py-3 rounded-xl border border-nfl-gold/30 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-nfl-gold to-nfl-red rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <span className="font-semibold">{teamName}</span>
                      <span className="text-nfl-gold/70 ml-2">over {opponent}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onPickRemoval(pick.gameId)}
                    className="hover:bg-nfl-gold/30 rounded-full p-2 transition-colors group"
                  >
                    <X className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </button>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {selectedPicks.length === 0 && (
          <div className="text-center py-8">
            <CircleDot className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 mb-2">No teams selected yet</p>
            <p className="text-white/50 text-sm">Click on teams above to make your picks!</p>
          </div>
        )}

        {/* Submit Picks Button */}
        {selectedPicks.length === 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <button
              onClick={onSubmitPicks}
              disabled={!canSubmit}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                canSubmit
                  ? 'bg-gradient-to-r from-nfl-gold to-nfl-red hover:from-nfl-gold/90 hover:to-nfl-red/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-600 text-gray-300 cursor-not-allowed'
              }`}
            >
              {!isConnected ? (
                <span className="flex items-center justify-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Connect Wallet to Submit</span>
                </span>
              ) : canSubmit ? (
                <span className="flex items-center justify-center space-x-2">
                  <Zap className="w-5 h-5" />
                  <span>Submit Picks - $2 Entry Fee</span>
                </span>
              ) : (
                <span className="flex items-center justify-center space-x-2">
                  <CircleDot className="w-5 h-5" />
                  <span>Need {10 - selectedPicks.length} More Picks</span>
                </span>
              )}
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
