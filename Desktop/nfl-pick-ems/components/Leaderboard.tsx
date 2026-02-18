'use client'

import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'

export default function Leaderboard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-5"
    >
      <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-nfl-gold" />
        Leaderboard
      </h4>

      <div className="text-center py-6">
        <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto mb-3">
          <TrendingUp className="w-5 h-5 text-white/20" />
        </div>
        <p className="text-sm text-white/40">Coming soon</p>
        <p className="text-xs text-white/20 mt-1">Submit picks to compete</p>
      </div>
    </motion.div>
  )
}
