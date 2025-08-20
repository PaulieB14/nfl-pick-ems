'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Info } from 'lucide-react'

export default function ScheduleNote() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4 mb-6"
    >
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-blue-200 font-semibold mb-1">Schedule Update in Progress</h4>
          <p className="text-blue-300/80 text-sm mb-3">
            We're currently populating the complete 18-week NFL schedule. Weeks 1-5 are fully loaded with real games, 
            times, and networks. The remaining weeks will be added soon.
          </p>
          <a
            href="https://operations.nfl.com/gameday/nfl-schedule/2025-nfl-schedule/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-blue-200 hover:text-blue-100 text-sm font-medium transition-colors"
          >
            <span>View Complete Official Schedule</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
