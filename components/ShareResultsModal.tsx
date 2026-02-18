'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2 } from 'lucide-react'

interface ShareResultsModalProps {
  isOpen: boolean
  onClose: () => void
  week: number
}

export default function ShareResultsModal({ isOpen, onClose, week }: ShareResultsModalProps) {
  if (!isOpen) return null

  const handleShare = () => {
    const text = `Check out my Week ${week} NFL picks results! 🏈 #NFLPickEms`
    
    if (navigator.share) {
      navigator.share({
        title: 'NFL Pick Ems Results',
        text,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('Link copied to clipboard!')
    }
    
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
              <Share2 className="w-5 h-5 text-nfl-gold" />
              <span>Share Results</span>
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="text-center py-8">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-white/60 mb-4">Share your Week {week} results with friends!</p>
            <p className="text-sm text-white/40 mb-6">
              Let others see how well you predicted this week's games.
            </p>

            <button
              onClick={handleShare}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Results</span>
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-white/60 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
