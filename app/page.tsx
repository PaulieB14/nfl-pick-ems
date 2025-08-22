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
  Target,
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
import { getGamesByWeek, getCurrentWeek, getWeekStatus } from '@/lib/nflSchedule'
import { useGameStats } from '@/hooks/useGameStats'
import { getNFLPickEmsContract, testContractConnectivity } from '@/lib/contracts'
import { useAccount, useWalletClient } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import FarcasterEmbed from '@/components/FarcasterEmbed'
import Head from 'next/head'

interface GamePick {
  gameId: string
  selectedTeam: 'home' | 'away'
}



export default function HomePage() {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek())
  const [selectedPicks, setSelectedPicks] = useState<GamePick[]>([])
  
  // Modal states
  const [showMyPicks, setShowMyPicks] = useState(false)
  const [showClaimWinnings, setShowClaimWinnings] = useState(false)
  const [showShareResults, setShowShareResults] = useState(false)

  const { data: walletClient } = useWalletClient()
  const { address, isConnected } = useAccount()
  
  // Ensure isConnected is always a boolean
  const isWalletConnected = Boolean(isConnected)

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
    description: `Make your picks for Week ${currentWeek} NFL games! Pick 10 teams to win and split the pot. Current pot: $${gameStats.currentPot} USDC`,
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

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const handleSubmitPicks = async () => {
    if (selectedPicks.length !== 10) {
      alert('Please select exactly 10 teams to win')
      return
    }

    if (!isWalletConnected) {
      alert('Please connect your wallet first')
      return
    }

    if (!walletClient) {
      alert('Wallet not ready. Please try again.')
      return
    }

    setIsSubmitting(true)
    setTransactionHash(null)

    try {
      const picksForContract = selectedPicks.map(pick => pick.selectedTeam)
      
                    console.log('Submitting picks to smart contract:', {
                week: currentWeek,
                picks: picksForContract,
                entryFee: '$2 USDC'
              })

      // Get the real contract instance
      const contract = getNFLPickEmsContract(walletClient)
      
                    // Submit picks to the smart contract
              const result = await contract.submitPicks(currentWeek, picksForContract)
      
      if (result.success) {
        setTransactionHash(result.hash)
        alert(`🎉 Picks submitted successfully!\n\nTransaction Hash: ${result.hash}\n\nEntry Fee: $2 USDC\nYour picks are now locked in for Week ${currentWeek}!`)
        
        // Clear picks after successful submission
        setSelectedPicks([])
      } else {
        throw new Error('Contract call failed')
      }
      
    } catch (error) {
      console.error('Error submitting picks:', error)
      alert(`❌ Failed to submit picks: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease check your wallet and try again.`)
    } finally {
      setIsSubmitting(false)
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
  const canSubmit = selectedPicks.length === 10 && isWalletConnected && weekStatus !== 'completed' && isScheduleComplete && Boolean(walletClient);
  
  // Debug logging
  console.log('Submit Debug:', {
    selectedPicks: selectedPicks.length,
    selectedPicksDetails: selectedPicks,
    isConnected: isWalletConnected,
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
        isConnected={isWalletConnected}
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
            <ConnectButton />
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
          
                            {/* Environment Notice */}
                  {typeof window !== 'undefined' && !window.location.hostname.includes('farcaster') && (
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                      <div className="flex items-center space-x-2 text-blue-300 mb-2">
                        <span className="text-lg">ℹ️</span>
                        <span className="font-semibold">Running Outside Farcaster</span>
                      </div>
                      <p className="text-blue-200 text-sm">
                        This app works best in Farcaster! For regular browser use, please install MetaMask or another wallet extension to connect your wallet.
                      </p>
                    </div>
                  )}
                  
                  {/* Debug Contract Connectivity Button */}
                  {isWalletConnected && (
                    <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-yellow-300 mb-2">
                          <span className="text-lg">🔧</span>
                          <span className="font-semibold">Debug Contract Connectivity</span>
                        </div>
                        
                        {/* Wallet Status Display */}
                        <div className="text-xs text-yellow-200 bg-yellow-500/20 px-2 py-1 rounded">
                          <div>Wallet: {walletClient ? '✅ Connected' : '❌ Not Available'}</div>
                          <div>Account: {walletClient?.account?.address ? `${walletClient.account.address.slice(0, 6)}...${walletClient.account.address.slice(-4)}` : 'None'}</div>
                          <div>Chain: {walletClient?.chain?.name || 'Unknown'}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => testContractConnectivity()}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                          >
                            Test Contracts
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                console.log('🚀 Testing ETH submission directly...')
                                console.log('🔍 Wallet Client Status:', {
                                  walletClient: !!walletClient,
                                  walletClientType: walletClient ? typeof walletClient : 'undefined',
                                  account: walletClient?.account,
                                  chain: walletClient?.chain
                                })
                                
                                if (!walletClient) {
                                  alert('❌ No wallet client available. Please connect your wallet first.')
                                  return
                                }
                                
                                const contract = getNFLPickEmsContract(walletClient)
                                const result = await contract.submitPicks(1, ['home', 'away', 'home', 'away', 'home', 'away', 'home', 'away', 'home', 'away'])
                                console.log('✅ ETH submission result:', result)
                                alert('ETH submission successful! Check console for details.')
                              } catch (error) {
                                console.error('❌ ETH submission failed:', error)
                                alert(`ETH submission failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
                              }
                            }}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Test ETH Submission
                          </button>
                        </div>
                      </div>
                      <p className="text-yellow-200 text-sm">
                        Click "Test Contracts" to verify connection to USDC and NFL Pick Ems contracts. Check the console for results.
                      </p>
                      <div className="mt-3 p-3 bg-yellow-500/10 rounded-lg">
                        <p className="text-yellow-200 text-xs">
                          <strong>Current Issue:</strong> MockUSDC contract not found at address 0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B
                        </p>
                        <p className="text-yellow-200 text-xs mt-1">
                          <strong>Solution:</strong> Switch to Base network (chain ID: 8453) in your wallet
                        </p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => {
                              if (typeof window !== 'undefined' && window.ethereum) {
                                window.ethereum.request({
                                  method: 'wallet_switchEthereumChain',
                                  params: [{ chainId: '0x2105' }], // 8453 in hex
                                }).catch(console.error)
                              }
                            }}
                            className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                          >
                            Switch to Base
                          </button>
                          <button
                            onClick={() => {
                              if (typeof window !== 'undefined' && window.ethereum) {
                                window.ethereum.request({
                                  method: 'wallet_addEthereumChain',
                                  params: [{
                                    chainId: '0x2105',
                                    chainName: 'Base',
                                    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                                    rpcUrls: ['https://mainnet.base.org'],
                                    blockExplorerUrls: ['https://basescan.org']
                                  }]
                                }).catch(console.error)
                              }
                            }}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                          >
                            Add Base Network
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
          
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
                                    <div className="text-2xl font-bold text-white">$2 USDC</div>
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
              <div className="text-2xl font-bold text-white">${gameStats.currentPot} USDC</div>
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
              onSubmitPicks={handleSubmitPicks}
              isConnected={isWalletConnected}
              canSubmit={canSubmit}
              isSubmitting={isSubmitting}
              transactionHash={transactionHash}
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
