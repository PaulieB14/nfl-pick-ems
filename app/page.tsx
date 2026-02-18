'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Trophy,
  Users,
  Clock,
  DollarSign,
  ChevronRight,
  ExternalLink,
  Zap,
  X
} from 'lucide-react'
import GamePicker from '@/components/GamePicker'
import WeekSelector from '@/components/WeekSelector'
import Leaderboard from '@/components/Leaderboard'
import SocialShare from '@/components/SocialShare'
import ScheduleNote from '@/components/ScheduleNote'
import MyPicksModal from '@/components/MyPicksModal'
import ClaimWinningsModal from '@/components/ClaimWinningsModal'
import ShareResultsModal from '@/components/ShareResultsModal'
import { getCurrentWeek, getWeekStatus, loadWeekSchedule } from '@/lib/nflSchedule'
import type { NFLGame } from '@/lib/nflSchedule'
import { useGameStats } from '@/hooks/useGameStats'
import { getNFLPickEmsContract } from '@/lib/contracts'
import { useAccount, useWalletClient } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import FarcasterEmbed from '@/components/FarcasterEmbed'

interface GamePick {
  gameId: string
  selectedTeam: 'home' | 'away'
}

export default function HomePage() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek())
  const [selectedPicks, setSelectedPicks] = useState<GamePick[]>([])
  const [weekGames, setWeekGames] = useState<NFLGame[]>([])
  const [showMyPicks, setShowMyPicks] = useState(false)
  const [showClaimWinnings, setShowClaimWinnings] = useState(false)
  const [showShareResults, setShowShareResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const { data: walletClient } = useWalletClient()
  const { isConnected } = useAccount()
  const isWalletConnected = Boolean(isConnected)

  useEffect(() => {
    loadWeekSchedule(currentWeek).then(setWeekGames)
  }, [currentWeek])

  const weekStatus = getWeekStatus(currentWeek)
  const gameStats = useGameStats(currentWeek)
  const isScheduleComplete = currentWeek <= 18
  const canSubmit = selectedPicks.length === 10 && isWalletConnected && weekStatus !== 'completed' && isScheduleComplete && Boolean(walletClient)

  const handlePickSelection = (gameId: string, team: 'home' | 'away') => {
    setSelectedPicks(prev => {
      const filtered = prev.filter(pick => pick.gameId !== gameId)
      return [...filtered, { gameId, selectedTeam: team }]
    })
  }

  const handlePickRemoval = (gameId: string) => {
    setSelectedPicks(prev => prev.filter(pick => pick.gameId !== gameId))
  }

  const handleSubmitPicks = async () => {
    if (selectedPicks.length !== 10 || !isWalletConnected || !walletClient) return

    setIsSubmitting(true)
    setTransactionHash(null)

    try {
      const picksForContract = selectedPicks.map(pick => pick.selectedTeam)
      const contract = getNFLPickEmsContract(walletClient)
      const result = await contract.submitPicks(currentWeek, picksForContract)

      if (result.success) {
        setTransactionHash(result.hash)
        setSelectedPicks([])
      }
    } catch (error) {
      console.error('Error submitting picks:', error)
      alert(`Failed to submit picks: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResetPicks = () => setSelectedPicks([])

  return (
    <>
      <FarcasterEmbed
        week={currentWeek}
        picksCount={selectedPicks.length}
        totalGames={10}
        isConnected={isWalletConnected}
      />
      <div className="min-h-screen bg-nfl-dark bg-mesh grid-bg">
        {/* Header */}
        <header className="sticky top-0 z-50 glass border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nfl-gold to-amber-600 flex items-center justify-center shadow-lg shadow-nfl-gold/20">
                  <span className="text-lg font-black text-nfl-dark">P</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white leading-tight">NFL Pick Ems</h1>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">On-Chain Predictions</p>
                </div>
              </div>
              <ConnectButton />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight"
            >
              Pick 10 Teams
              <span className="block text-nfl-gold text-glow">Win the Pot</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-white/50 mb-8 max-w-2xl mx-auto"
            >
              Pick 10 NFL winners each week. Most correct picks split the pot.
              $2 USDC entry on Base chain.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
            >
              {[
                { icon: DollarSign, value: '$2', label: 'Entry', sublabel: 'USDC' },
                { icon: Users, value: gameStats.totalPlayers, label: 'Players', sublabel: 'this week' },
                { icon: Trophy, value: `$${gameStats.currentPot}`, label: 'Prize Pot', sublabel: 'USDC' },
                { icon: Clock, value: gameStats.timeLeft, label: 'Until Lock', sublabel: '' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-4 text-center group hover:bg-white/[0.08] transition-all duration-300"
                >
                  <stat.icon className="w-5 h-5 text-nfl-gold mx-auto mb-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="text-xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.section>

          {!isScheduleComplete && <ScheduleNote />}

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Game Picker */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Week {currentWeek}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        weekStatus === 'active' ? 'bg-green-500/20 text-green-400' :
                        weekStatus === 'completed' ? 'bg-white/10 text-white/40' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {weekStatus.toUpperCase()}
                      </span>
                      <span className="text-xs text-white/30">{weekGames.length} games</span>
                    </div>
                  </div>
                  <a
                    href="https://operations.nfl.com/gameday/nfl-schedule/2026-nfl-schedule/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white/30 hover:text-white/60 flex items-center gap-1 transition-colors"
                  >
                    NFL Schedule <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <GamePicker
                  games={weekGames}
                  selectedPicks={selectedPicks}
                  onPickSelection={handlePickSelection}
                  onPickRemoval={handlePickRemoval}
                  onSubmitPicks={handleSubmitPicks}
                  isConnected={isWalletConnected}
                  canSubmit={canSubmit}
                  isSubmitting={isSubmitting}
                  transactionHash={transactionHash}
                />

                {selectedPicks.length > 0 && (
                  <div className="mt-6 flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleResetPicks}
                      className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Reset
                    </motion.button>

                    {isScheduleComplete && (
                      <SocialShare
                        picks={selectedPicks.map(p => p.gameId)}
                        games={weekGames}
                        week={currentWeek}
                        onShare={() => {}}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <WeekSelector currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
              <Leaderboard />

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-5"
              >
                <h4 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-nfl-gold" />
                  Actions
                </h4>
                <div className="space-y-2">
                  {[
                    { label: 'View My Picks', action: () => setShowMyPicks(true) },
                    { label: 'Claim Winnings', action: () => setShowClaimWinnings(true) },
                    { label: 'Share Results', action: () => setShowShareResults(true) },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/[0.05] transition-all group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <MyPicksModal
          isOpen={showMyPicks}
          onClose={() => setShowMyPicks(false)}
          picks={selectedPicks.map(p => p.gameId)}
          games={weekGames}
          week={currentWeek}
        />
        <ClaimWinningsModal
          isOpen={showClaimWinnings}
          onClose={() => setShowClaimWinnings(false)}
        />
        <ShareResultsModal
          isOpen={showShareResults}
          onClose={() => setShowShareResults(false)}
          week={currentWeek}
        />
      </div>
    </>
  )
}
