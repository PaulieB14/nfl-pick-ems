'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, DollarSign } from 'lucide-react'

interface ClaimWinningsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ClaimWinningsModal({ isOpen, onClose }: ClaimWinningsModalProps) {
  if (!isOpen) return null

  const handleClaim = () => {
    // TODO: Implement claim winnings functionality
    alert('Claim winnings functionality coming soon!')
    onClose()
  }

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
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-nfl-gold" />
              <span>Claim Winnings</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">🏆</div>
            <p className="text-white/60 mb-4">No winnings available to claim at this time.</p>
            <p className="text-sm text-white/40">
              Complete more picks and win weekly contests to earn USDC rewards!
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleClaim}
              disabled
              className="flex-1 px-4 py-2 bg-gray-500/50 text-gray-400 rounded-lg cursor-not-allowed"
            >
              Claim ($0.00)
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
