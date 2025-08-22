'use client'

import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface WeekSelectorProps {
  currentWeek: number
  onWeekChange: (week: number) => void
}

export default function WeekSelector({ currentWeek, onWeekChange }: WeekSelectorProps) {
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1) // NFL regular season
  
  // Debug log
  console.log('WeekSelector: Available weeks:', weeks)

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-nfl-gold" />
        <h4 className="text-xl font-bold text-white">Select Week</h4>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onWeekChange(Math.max(1, currentWeek - 1))}
          disabled={currentWeek === 1}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <span className="text-white font-semibold">Week {currentWeek}</span>
        
        <button
          onClick={() => onWeekChange(Math.min(18, currentWeek + 1))}
          disabled={currentWeek === 18}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-6 gap-3 mb-4">
        {weeks.slice(0, 12).map((week) => (
          <motion.button
            key={week}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWeekChange(week)}
            className={`p-3 rounded-lg text-sm font-bold transition-all ${
              week === currentWeek
                ? 'bg-nfl-gold text-nfl-red shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title={`Week ${week}`}
          >
            {week}
          </motion.button>
        ))}
      </div>
      
      <div className="grid grid-cols-6 gap-3">
        {weeks.slice(12).map((week) => (
          <motion.button
            key={week}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWeekChange(week)}
            className={`p-3 rounded-lg text-sm font-bold transition-all ${
              week === currentWeek
                ? 'bg-nfl-gold text-nfl-red shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title={`Week ${week}`}
          >
            {week}
          </motion.button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <div className="text-white/70 text-sm mb-1">Week {currentWeek} Status</div>
        <div className="text-white font-medium">
          {currentWeek <= 5 ? '🟢 Open' : currentWeek <= 10 ? '🟡 In Progress' : '🔴 Closed'}
        </div>
      </div>
    </motion.div>
  )
}
