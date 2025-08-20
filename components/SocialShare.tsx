'use client'

import { motion } from 'framer-motion'
import { Share2, Twitter, MessageCircle, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { NFLGame } from '@/lib/nflSchedule'

interface SocialShareProps {
  picks: string[]
  games: NFLGame[]
  week: number
  onShare?: () => void
}

export default function SocialShare({ picks, games, week, onShare }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  const generateShareText = () => {
    const picksText = picks.map(gameId => {
      const game = games.find(g => g.id === gameId)
      return game ? `${game.away} @ ${game.home}` : ''
    }).filter(Boolean).join('\n')
    
    return `🏈 My NFL Week ${week} Picks:\n\n${picksText}\n\n#NFLPickEms #Farcaster #Base`
  }

  const handleCopy = async () => {
    const text = generateShareText()
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onShare?.()
  }

  const handleFarcasterShare = () => {
    const text = generateShareText()
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    onShare?.()
  }

  const handleTwitterShare = () => {
    const text = generateShareText()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
    onShare?.()
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `NFL Week ${week} Picks`,
          text: generateShareText(),
          url: window.location.href
        })
        onShare?.()
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      setShowOptions(true)
    }
  }

  if (picks.length === 0) return null

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className="bg-nfl-gold text-nfl-red px-6 py-3 rounded-full font-semibold hover:bg-nfl-gold/90 transition-colors flex items-center space-x-2"
      >
        <Share2 className="w-4 h-4" />
        <span>Share Picks</span>
      </motion.button>

      {showOptions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-full right-0 mb-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 min-w-[200px]"
        >
          <div className="space-y-2">
            <button
              onClick={handleFarcasterShare}
              className="w-full flex items-center space-x-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on Farcaster</span>
            </button>
            
            <button
              onClick={handleTwitterShare}
              className="w-full flex items-center space-x-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span>Share on Twitter</span>
            </button>
            
            <button
              onClick={handleCopy}
              className="w-full flex items-center space-x-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>
          </div>
          
          <button
            onClick={() => setShowOptions(false)}
            className="w-full mt-3 p-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  )
}
