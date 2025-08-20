'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2, Trophy, TrendingUp, Users, MessageCircle, Twitter, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ShareResultsModalProps {
  isOpen: boolean
  onClose: () => void
  week: number
}

interface GameResult {
  id: string
  home: string
  away: string
  homeScore: number
  awayScore: number
  winner: 'home' | 'away'
  isCorrect: boolean
}

export default function ShareResultsModal({ isOpen, onClose, week }: ShareResultsModalProps) {
  const [copied, setCopied] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  // TODO: Get real results from smart contract
  const results: GameResult[] = []
  const userScore = 0
  const totalPlayers = 0
  const userRank = 0

  const generateShareText = () => {
    if (results.length === 0) {
      return `🏈 NFL Week ${week} Results:\n\nNo results available yet.\n\n#NFLPickEms #Farcaster #Base`
    }

    const resultsText = results.map(result => {
      const icon = result.isCorrect ? '✅' : '❌'
      return `${icon} ${result.away} ${result.awayScore} - ${result.homeScore} ${result.home}`
    }).join('\n')

    return `🏈 NFL Week ${week} Results:\n\n${resultsText}\n\nMy Score: ${userScore}/10\nRank: #${userRank} of ${totalPlayers}\n\n#NFLPickEms #Farcaster #Base`
  }

  const handleCopy = async () => {
    const text = generateShareText()
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFarcasterShare = () => {
    const text = generateShareText()
    const url = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleTwitterShare = () => {
    const text = generateShareText()
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `NFL Week ${week} Results`,
          text: generateShareText(),
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      setShowOptions(true)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 w-full max-w-2xl max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Share2 className="w-6 h-6 text-nfl-gold" />
              <span>Share Results</span>
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {results.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-2">No results available yet</p>
                <p className="text-white/50 text-sm">Results will be posted after games are finalized</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Score Summary */}
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-white/70 text-sm">Your Score</div>
                      <div className="text-2xl font-bold text-nfl-gold">{userScore}/10</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-sm">Rank</div>
                      <div className="text-2xl font-bold text-white">#{userRank}</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-sm">Total Players</div>
                      <div className="text-2xl font-bold text-white">{totalPlayers}</div>
                    </div>
                  </div>
                </div>

                {/* Game Results */}
                <div className="space-y-2">
                  <h3 className="text-white font-semibold mb-3">Game Results:</h3>
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-white font-medium">
                            {result.away} {result.awayScore} - {result.homeScore} {result.home}
                          </div>
                          <div className="text-white/70 text-sm">
                            Winner: {result.winner === 'home' ? result.home : result.away}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {result.isCorrect ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-6 flex justify-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNativeShare}
                className="bg-nfl-gold text-nfl-red px-6 py-3 rounded-full font-semibold hover:bg-nfl-gold/90 transition-colors flex items-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>

              {!navigator.share && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowOptions(true)}
                  className="bg-white/10 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-colors"
                >
                  More Options
                </motion.button>
              )}
            </div>

            {/* Share Options */}
            {showOptions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleFarcasterShare}
                    className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Farcaster</span>
                  </button>
                  
                  <button
                    onClick={handleTwitterShare}
                    className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </button>
                  
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors col-span-2"
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
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
