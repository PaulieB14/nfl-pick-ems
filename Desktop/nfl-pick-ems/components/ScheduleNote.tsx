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
      <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-300 mb-2">
              2025 NFL Schedule Loading
            </h3>
            <p className="text-yellow-200 mb-3">
              The official 2025 NFL schedule is still being finalized. Game times and dates may change.
              We'll update the schedule as soon as official information is available.
            </p>
            <div className="text-sm text-yellow-300">
              <strong>What you can do now:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1 text-yellow-200">
                <li>Connect your wallet and explore the interface</li>
                <li>Review how the pick system works</li>
                <li>Check back for updates as we get closer to the season</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
