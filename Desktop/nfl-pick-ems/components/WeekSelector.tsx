'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface WeekSelectorProps {
  currentWeek: number
  onWeekChange: (week: number) => void
}

export default function WeekSelector({ currentWeek, onWeekChange }: WeekSelectorProps) {
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1)
  
  const isFirstWeek = currentWeek === 1
  const isLastWeek = currentWeek === 18

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-nfl-gold" />
        <span>Select Week</span>
      </h4>
      
      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={!isFirstWeek ? { scale: 1.1 } : {}}
          whileTap={!isFirstWeek ? { scale: 0.9 } : {}}
          onClick={() => !isFirstWeek && onWeekChange(currentWeek - 1)}
          disabled={isFirstWeek}
          className={`p-2 rounded-lg ${
            isFirstWeek
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:bg-white/10 cursor-pointer'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-nfl-gold">Week {currentWeek}</div>
          <div className="text-sm text-white/70">2025 NFL Season</div>
        </div>
        
        <motion.button
          whileHover={!isLastWeek ? { scale: 1.1 } : {}}
          whileTap={!isLastWeek ? { scale: 0.9 } : {}}
          onClick={() => !isLastWeek && onWeekChange(currentWeek + 1)}
          disabled={isLastWeek}
          className={`p-2 rounded-lg ${
            isLastWeek
              ? 'text-white/30 cursor-not-allowed'
              : 'text-white hover:bg-white/10 cursor-pointer'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-6 gap-2">
        {weeks.map((week) => (
          <motion.button
            key={week}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onWeekChange(week)}
            className={`p-2 rounded-lg text-sm font-semibold transition-all ${
              currentWeek === week
                ? 'bg-nfl-gold text-white shadow-lg'
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            {week}
          </motion.button>
        ))}
      </div>

      {/* Week Status */}
      <div className="mt-4 text-center">
        <div className="text-xs text-white/60">
          Regular Season: Weeks 1-18
        </div>
      </div>
    </motion.div>
  )
}
