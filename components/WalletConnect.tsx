'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Wallet, User, LogOut, ChevronDown } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

interface WalletConnectProps {
  onConnect: (connected: boolean) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showWalletSelector, setShowWalletSelector] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { isConnected, address } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  // Update parent component when connection status changes
  useEffect(() => {
    onConnect(isConnected)
  }, [isConnected, onConnect])

  // Debug: Log connector status when component mounts
  useEffect(() => {
    console.log('WalletConnect mounted, connectors:', connectors)
    console.log('Connector readiness:', connectors.map(c => ({ name: c.name, ready: c.ready })))
  }, [connectors])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowWalletSelector(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleConnect = async () => {
    try {
      console.log('Available connectors:', connectors)
      console.log('Connector details:', connectors.map(c => ({ name: c.name, ready: c.ready, id: c.id })))
      
      if (connectors.length === 0) {
        console.error('No connectors available')
        alert('No wallet connectors available. Please install MetaMask or another wallet extension.')
        return
      }
      
      // Debug: Log each connector's status
      connectors.forEach((connector, index) => {
        console.log(`Connector ${index}:`, {
          name: connector.name,
          ready: connector.ready,
          id: connector.id,
          type: connector.type
        })
      })
      
      // Try to find a ready connector, prioritizing Farcaster Mini App
      let availableConnector = connectors.find(c => c.ready && c.name === 'Farcaster Mini App')
      
      // If no Farcaster connector, try MetaMask
      if (!availableConnector) {
        availableConnector = connectors.find(c => c.ready && c.name === 'MetaMask')
      }
      
      // If still no connector, try any ready connector
      if (!availableConnector) {
        availableConnector = connectors.find(c => c.ready)
      }
      
      if (!availableConnector) {
        console.error('No ready connectors available')
        
        // Provide helpful guidance based on environment
        if (typeof window !== 'undefined' && window.location.hostname.includes('farcaster')) {
          alert('Farcaster wallet connector not ready. Please wait a moment and try again.')
        } else {
          alert('No wallet connectors ready. Please install MetaMask or refresh the page.')
        }
        return
      }
      
      console.log('Attempting to connect with connector:', availableConnector)
      await connect({ connector: availableConnector })
      console.log('Wallet connection successful')
      
    } catch (error) {
      console.error('Wallet connection error:', error)
      alert(`Failed to connect wallet: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setIsDropdownOpen(false)
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowWalletSelector(true)}
          disabled={isPending}
          className="bg-nfl-gold text-nfl-red px-6 py-2 rounded-full font-semibold hover:bg-nfl-gold/90 transition-colors flex items-center space-x-2 disabled:opacity-50"
        >
          <Wallet className="w-5 h-5" />
          <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
        </motion.button>

        {/* Wallet Selector Modal */}
        {showWalletSelector && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
            onClick={() => setShowWalletSelector(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-2xl max-w-md w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Choose Your Wallet</h3>
                <button
                  onClick={() => setShowWalletSelector(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                {/* Debug info */}
                <div className="text-xs text-gray-400 mb-2 p-2 bg-gray-800/50 rounded">
                  Debug: {connectors.length} connectors available
                  <br />
                  {connectors.map((c, i) => `${c.name}: ${c.ready ? '✅' : '❌'}`).join(' | ')}
                </div>
                
                {connectors.map((connector, index) => {
                  const isReady = Boolean(connector.ready)
                  const isFarcaster = connector.name === 'Farcaster Mini App'
                  const isGeneric = connector.name === 'Injected'
                  
                  // Get helpful status message
                  const getStatusMessage = () => {
                    if (isReady) return 'Ready to connect'
                    if (isFarcaster) return 'Only available in Farcaster'
                    if (isGeneric) return 'Install any wallet extension'
                    return 'Install wallet extension'
                  }
                  
                  // Get helpful action message
                  const getActionMessage = () => {
                    if (isReady) return 'Click to connect'
                    if (isFarcaster) return 'Open in Farcaster app'
                    if (isGeneric) return 'Install MetaMask, Coinbase, etc.'
                    return 'Install wallet extension first'
                  }
                  
                  return (
                    <motion.button
                      key={`${connector.id}-${index}`}
                      whileHover={{ scale: isReady ? 1.02 : 1 }}
                      whileTap={{ scale: isReady ? 0.98 : 1 }}
                      onClick={() => {
                        console.log('Wallet clicked:', connector.name, 'Ready:', isReady)
                        
                        if (isReady) {
                          console.log('Connecting to wallet:', connector.name)
                          connect({ connector })
                          setShowWalletSelector(false)
                        } else if (isFarcaster) {
                          console.log('Farcaster wallet clicked outside Farcaster')
                          alert('Please open this app in Farcaster for the best experience!')
                        } else {
                          console.log('Opening wallet installation guide for:', connector.name)
                          // Open wallet installation guide
                          window.open('https://ethereum.org/en/wallets/find-wallet/', '_blank')
                        }
                      }}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-3 cursor-pointer ${
                        isReady
                          ? isFarcaster
                            ? 'border-blue-500 bg-gradient-to-r from-blue-500/30 to-blue-600/30 text-blue-200 hover:bg-blue-500/40 shadow-lg'
                            : 'border-nfl-gold bg-gradient-to-r from-nfl-gold/30 to-nfl-red/30 text-white hover:bg-nfl-gold/40 shadow-lg'
                          : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:bg-gray-600/60'
                      }`}
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        {isFarcaster ? '📱' : '🔗'}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{connector.name}</div>
                        <div className="text-sm opacity-70">
                          {getStatusMessage()}
                        </div>
                        <div className="text-xs opacity-50 mt-1">
                          {getActionMessage()}
                        </div>
                      </div>
                      {isReady ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      ) : (
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              <div className="mt-6 text-center">
                {/* Test button to verify clicks work */}
                <button
                  onClick={() => {
                    console.log('Test button clicked!')
                    alert('Test button works! Modal is functional.')
                  }}
                  className="mb-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm"
                >
                  🧪 Test Click (Debug)
                </button>
                
                <p className="text-white/60 text-sm mb-3">
                  {typeof window !== 'undefined' && window.location.hostname.includes('farcaster') 
                    ? 'Farcaster Mini App recommended for best experience'
                    : 'Install MetaMask or another wallet extension for browser use'
                  }
                </p>
                
                {typeof window !== 'undefined' && !window.location.hostname.includes('farcaster') && (
                  <div className="space-y-2">
                    <button
                      onClick={() => window.open('https://metamask.io/download/', '_blank')}
                      className="text-nfl-gold hover:text-nfl-gold/80 text-sm underline"
                    >
                      Download MetaMask
                    </button>
                    <div className="text-white/40 text-xs">
                      • Most popular wallet • Easy to use • Free
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
      >
        <User className="w-5 h-5" />
        <span className="font-medium">{formatAddress(address || '')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-50"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-white/70 text-sm">
              Connected to Base
            </div>
            <button
              onClick={handleDisconnect}
              className="w-full flex items-center space-x-2 px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
