'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

interface WeekSelectorProps {
  currentWeek: number
  onWeekChange: (week: number) => void
}

export default function WeekSelector({ currentWeek, onWeekChange }: WeekSelectorProps) {
  const weeks = Array.from({ length: 18 }, (_, i) => i + 1)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-nfl-gold" />
        Season
      </h4>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => currentWeek > 1 && onWeekChange(currentWeek - 1)}
          disabled={currentWeek === 1}
          className={`p-2 rounded-lg transition-all ${
            currentWeek === 1
              ? 'text-white/20 cursor-not-allowed'
              : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-2xl font-black text-white">Week {currentWeek}</div>
          <div className="text-xs text-white/30">2026 NFL Season</div>
        </div>

        <button
          onClick={() => currentWeek < 18 && onWeekChange(currentWeek + 1)}
          disabled={currentWeek === 18}
          className={`p-2 rounded-lg transition-all ${
            currentWeek === 18
              ? 'text-white/20 cursor-not-allowed'
              : 'text-white/60 hover:text-white hover:bg-white/[0.05]'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-6 gap-1.5">
        {weeks.map((week) => (
          <button
            key={week}
            onClick={() => onWeekChange(week)}
            className={`p-2 rounded-lg text-xs font-bold transition-all ${
              currentWeek === week
                ? 'bg-nfl-gold text-nfl-dark shadow-md shadow-nfl-gold/20'
                : 'text-white/40 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {week}
          </button>
        ))}
      </div>

      <div className="mt-3 text-center text-[10px] text-white/20 uppercase tracking-widest">
        Regular Season
      </div>
    </motion.div>
  )
}
