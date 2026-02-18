'use client'

import { motion } from 'framer-motion'
import { Share2 } from 'lucide-react'

interface Game {
  id: string
  homeTeam?: string
  awayTeam?: string
}

interface SocialShareProps {
  picks: string[]
  games: Game[]
  week: number
  onShare: () => void
}

export default function SocialShare({ picks, games, week, onShare }: SocialShareProps) {
  const handleShare = () => {
    const text = `Just submitted my Week ${week} NFL picks! 🏈 #NFLPickEms`
    
    if (navigator.share) {
      navigator.share({
        title: 'NFL Pick Ems',
        text,
        url: window.location.href
      })
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${text} ${window.location.href}`)
      alert('Link copied to clipboard!')
    }
    
    onShare()
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleShare}
      className="px-6 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-2xl hover:shadow-blue-500/25 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center space-x-2">
        <Share2 className="w-5 h-5" />
        <span>Share Picks</span>
      </div>
    </motion.button>
  )
}
