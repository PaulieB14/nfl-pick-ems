'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Game {
  id: string
  homeTeam?: string
  awayTeam?: string
  homeAbbrev?: string
  awayAbbrev?: string
}

interface MyPicksModalProps {
  isOpen: boolean
  onClose: () => void
  picks: string[]
  games: Game[]
  week: number
}

export default function MyPicksModal({ isOpen, onClose, picks, games, week }: MyPicksModalProps) {
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">My Week {week} Picks</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="space-y-3">
            {picks.length === 0 ? (
              <p className="text-white/60 text-center py-8">No picks submitted yet</p>
            ) : (
              picks.map((pick, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-3">
                  <div className="text-white font-medium">
                    Pick {index + 1}: {pick}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-nfl-gold text-white rounded-lg hover:bg-nfl-gold/80 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
