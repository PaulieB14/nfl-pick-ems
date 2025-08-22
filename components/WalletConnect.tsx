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

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleConnect}
        disabled={isPending}
        className="bg-nfl-gold text-nfl-red px-6 py-2 rounded-full font-semibold hover:bg-nfl-gold/90 transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        <Wallet className="w-5 h-5" />
        <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
      </motion.button>
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
