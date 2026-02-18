'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export default function ScheduleNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mb-8"
    >
      <div className="glass rounded-xl p-5 border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold text-amber-300 mb-1">
              2026 Schedule Pending
            </h3>
            <p className="text-xs text-white/40">
              The official 2026 NFL schedule is still being finalized. Games will appear once the oracle sets up each week.
              Connect your wallet and explore the interface in the meantime.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
