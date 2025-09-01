'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function Leaderboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <TrendingUp className="w-5 h-5 text-nfl-gold" />
        <span>Leaderboard</span>
      </h4>
      
      <div className="text-center py-8">
        <p className="text-white/60">Leaderboard coming soon!</p>
        <p className="text-xs text-white/40 mt-1">Submit your picks to compete</p>
      </div>
    </motion.div>
  )
}
