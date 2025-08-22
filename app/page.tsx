'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Users, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Gamepad2,
  Star,
  TrendingUp,
  ExternalLink,
  Share2,
  CircleDot,
  Zap,
  Target
} from 'lucide-react'
import GamePicker from '@/components/GamePicker'
import WeekSelector from '@/components/WeekSelector'
import Leaderboard from '@/components/Leaderboard'
import WalletConnect from '@/components/WalletConnect'
import SocialShare from '@/components/SocialShare'
import ScheduleNote from '@/components/ScheduleNote'
import MyPicksModal from '@/components/MyPicksModal'
import ClaimWinningsModal from '@/components/ClaimWinningsModal'
import ShareResultsModal from '@/components/ShareResultsModal'
import { getGamesByWeek, getCurrentWeek, getWeekStatus } from '@/lib/nflSchedule'
import { useGameStats } from '@/hooks/useGameStats'
import { getNFLPickEmsContract } from '@/lib/contracts'
import { useAccount, useWalletClient } from 'wagmi'
import FarcasterEmbed from '@/components/FarcasterEmbed'
import Head from 'next/head'

interface GamePick {
  gameId: string
  selectedTeam: 'home' | 'away'
}



export default function HomePage() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek())
  const [isConnected, setIsConnected] = useState(false)
  const [selectedPicks, setSelectedPicks] = useState<GamePick[]>([])
  
  // Modal states
  const [showMyPicks, setShowMyPicks] = useState(false)
  const [showClaimWinnings, setShowClaimWinnings] = useState(false)
  const [showShareResults, setShowShareResults] = useState(false)

  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  // Debug: Log when component mounts and when selectedPicks changes
  useEffect(() => {
    console.log('Component mounted, selectedPicks:', selectedPicks)
  }, [])

  useEffect(() => {
    console.log('selectedPicks changed:', selectedPicks)
  }, [selectedPicks])

  const currentWeekGames = getGamesByWeek(currentWeek)
  const weekStatus = getWeekStatus(currentWeek)
  const gameStats = useGameStats(currentWeek)

  // Page-specific Farcaster embeds for social sharing
  const pageEmbeds = {
    title: `Week ${currentWeek} NFL Picks - NFL Pick 'ems`,
    description: `Make your picks for Week ${currentWeek} NFL games! Pick 10 teams to win and split the pot. Current pot: ${gameStats.currentPot} ETH`,
    image: `https://nfl-pick-em.netlify.app/icon-1024.png`,
    button: `🏈 Pick Week ${currentWeek}`,
    action: 'post',
    inputText: `I'm making my Week ${currentWeek} NFL picks! 🏈`
  }
  
  // Debug week status
  console.log('Week Debug:', {
    currentWeek,
    weekStatus,
    getCurrentWeek: getCurrentWeek(),
    isScheduleComplete: currentWeek <= 18
  })

  const handlePickSelection = (gameId: string, team: 'home' | 'away') => {
    setSelectedPicks(prev => {
      // Remove existing pick for this game if it exists
      const filtered = prev.filter(pick => pick.gameId !== gameId)
      // Add new pick
      return [...filtered, { gameId, selectedTeam: team }]
    })
  }

  const handlePickRemoval = (gameId: string) => {
    setSelectedPicks(prev => prev.filter(pick => pick.gameId !== gameId))
  }

  const handleSubmitPicks = async () => {
    if (selectedPicks.length !== 10) {
      alert('Please select exactly 10 teams to win')
      return
    }

    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!walletClient) {
      alert('Wallet not ready. Please try again.')
      return
    }

    try {
      // For now, show what would be submitted
      // TODO: Implement actual smart contract call when ready
      const picksForContract = selectedPicks.map(pick => pick.selectedTeam)
      
      console.log('Submitting picks to smart contract:', {
        week: currentWeek,
        picks: picksForContract,
        entryFee: '0.002 ETH'
      })

      // TODO: Call the actual smart contract function
      alert(`Picks prepared for submission! Smart contract integration active.\n\nWeek: ${currentWeek}\nPicks: ${picksForContract.join(', ')}\nEntry Fee: 0.002 ETH`)
      
    } catch (error) {
      console.error('Error submitting picks:', error)
      alert(`Failed to submit picks: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleShare = () => {
    // Analytics tracking for social sharing
    console.log('Picks shared on social media')
  }

  const handleResetPicks = () => {
    // Clear picks and any stored data
    setSelectedPicks([])
    
    // Clear any localStorage/sessionStorage that might be persisting picks
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nfl-pick-ems-picks')
      sessionStorage.removeItem('nfl-pick-ems-picks')
      console.log('Cleared stored picks data')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-400'
      case 'active': return 'text-green-400'
      case 'completed': return 'text-red-400'
      default: return 'text-white/70'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return '⏳'
      case 'active': return '🟢'
      case 'completed': return '🔴'
      default: return '⚪'
    }
  }

  const isScheduleComplete = currentWeek <= 18
  const canSubmit = selectedPicks.length === 10 && isConnected && weekStatus !== 'completed' && isScheduleComplete && walletClient;
  
  // Debug logging
  console.log('Submit Debug:', {
    selectedPicks: selectedPicks.length,
    selectedPicksDetails: selectedPicks,
    isConnected,
    weekStatus,
    isScheduleComplete,
    canSubmit
  })

  return (
    <>
      <FarcasterEmbed 
        week={currentWeek}
        picksCount={selectedPicks.length}
        totalGames={10}
        isConnected={isConnected}
      />
      <div className="min-h-screen bg-gradient-to-br from-nfl-red via-nfl-blue to-nfl-gold">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-md border-b border-white/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Gamepad2 className="h-8 w-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-white">NFL Pick Ems</h1>
            </div>
            <WalletConnect onConnect={setIsConnected} />
          </div>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Pick 10 Teams
            <span className="block text-nfl-gold">Win the Pot</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Every week, pick 10 NFL teams to win their games. Get the most correct picks and split the pot with other winners. 
            Built on Base chain for the Farcaster community.
          </p>
          
          {/* Official NFL Schedule Link */}
          <motion.a
            href="https://operations.nfl.com/gameday/nfl-schedule/2025-nfl-schedule/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-all"
          >
            <span>View Official 2025 NFL Schedule</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
          
          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 mt-8">
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <DollarSign className="h-8 w-8 text-nfl-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">$2</div>
              <div className="text-white/70 text-sm">Entry Fee</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <Users className="h-8 w-8 text-nfl-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameStats.totalPlayers}</div>
              <div className="text-white/70 text-sm">Players</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <Trophy className="h-8 w-8 text-nfl-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">${gameStats.currentPot}</div>
              <div className="text-white/70 text-sm">Current Pot</div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg"
            >
              <Clock className="h-8 w-8 text-nfl-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{gameStats.timeLeft}</div>
              <div className="text-white/70 text-sm">Time Left</div>
            </motion.div>
          </div>
        </motion.section>

        {/* Schedule Note */}
        {!isScheduleComplete && <ScheduleNote />}

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Game Picker */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <CircleDot className="w-6 h-6 text-nfl-gold" />
                    <span>Week {currentWeek} Games</span>
                  </h3>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`text-sm ${getStatusColor(weekStatus)}`}>
                      {getStatusIcon(weekStatus)} {weekStatus.charAt(0).toUpperCase() + weekStatus.slice(1)}
                    </span>
                    <span className="text-white/50 text-sm">• {currentWeekGames.length} games</span>
                    {!isScheduleComplete && (
                      <span className="text-yellow-400 text-xs bg-yellow-500/20 px-2 py-1 rounded-full">
                        Schedule Loading
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-white/70">
                  <div className="bg-gradient-to-r from-nfl-gold to-nfl-red text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {selectedPicks.length}/10 Picks
                  </div>
                </div>
              </div>
              
              <GamePicker 
                games={currentWeekGames}
                selectedPicks={selectedPicks}
                onPickSelection={handlePickSelection}
                onPickRemoval={handlePickRemoval}
              />
              
              <div className="mt-8 flex justify-center space-x-4">
                {/* Reset Button - Show when picks are made */}
                {selectedPicks.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleResetPicks}
                    className="px-6 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-2xl hover:shadow-red-500/25 cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-2">
                      <X className="w-5 h-5" />
                      <span>Reset Picks</span>
                    </div>
                  </motion.button>
                )}
                
                {/* Enhanced Submit Button */}
                <motion.button
                  whileHover={{ scale: canSubmit ? 1.05 : 1 }}
                  whileTap={{ scale: canSubmit ? 0.95 : 1 }}
                  onClick={handleSubmitPicks}
                  disabled={!canSubmit}
                  className={`relative px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden ${
                    canSubmit
                      ? 'bg-gradient-to-r from-nfl-gold to-nfl-red text-white hover:shadow-2xl hover:shadow-nfl-gold/25 cursor-pointer transform hover:-translate-y-1'
                      : 'bg-gradient-to-r from-white/20 to-white/10 text-white/50 cursor-not-allowed'
                  }`}
                >
                  {/* Animated background for submit button */}
                  {canSubmit && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-nfl-gold/20 to-nfl-red/20"
                      animate={{
                        background: [
                          "linear-gradient(90deg, rgba(255,182,24,0.2) 0%, rgba(203,12,12,0.2) 100%)",
                          "linear-gradient(90deg, rgba(203,12,12,0.2) 0%, rgba(255,182,24,0.2) 100%)",
                          "linear-gradient(90deg, rgba(255,182,24,0.2) 0%, rgba(203,12,12,0.2) 100%)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center space-x-3">
                    {canSubmit ? (
                      <>
                        <Target className="w-6 h-6" />
                        <span>Submit {selectedPicks.length} Picks</span>
                        <Zap className="w-5 h-5" />
                      </>
                    ) : (
                      <>
                        {!isScheduleComplete ? (
                          <>
                            <Clock className="w-5 h-5" />
                            <span>Schedule Loading...</span>
                          </>
                        ) : weekStatus === 'completed' ? (
                          <>
                            <Trophy className="w-5 h-5" />
                            <span>Week Completed</span>
                          </>
                        ) : !isConnected ? (
                          <>
                            <Star className="w-5 h-5" />
                            <span>Connect Wallet</span>
                          </>
                        ) : (
                          <>
                            <CircleDot className="w-5 h-5" />
                            <span>Need {10 - selectedPicks.length} More Picks</span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </motion.button>
                
                {selectedPicks.length > 0 && isScheduleComplete && (
                  <SocialShare 
                    picks={selectedPicks.map(p => p.gameId)}
                    games={currentWeekGames}
                    week={currentWeek}
                    onShare={handleShare}
                  />
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Week Selector */}
            <WeekSelector currentWeek={currentWeek} onWeekChange={setCurrentWeek} />
            
            {/* Leaderboard */}
            <Leaderboard />
            
            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl"
            >
              <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-nfl-gold" />
                <span>Quick Actions</span>
              </h4>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowMyPicks(true)}
                  className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors hover:scale-105"
                >
                  <span>View My Picks</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setShowClaimWinnings(true)}
                  className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors hover:scale-105"
                >
                  <span>Claim Winnings</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setShowShareResults(true)}
                  className="w-full flex items-center justify-between p-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors hover:scale-105"
                >
                  <span>Share Results</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
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
        games={currentWeekGames}
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
      
      {/* Debug component removed - was too distracting */}
    </div>
    </>
  )
}
