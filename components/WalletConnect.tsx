'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wallet, User, LogOut, ChevronDown } from 'lucide-react'

interface WalletConnectProps {
  onConnect: (connected: boolean) => void
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Simulate wallet connection for demo
  useEffect(() => {
    // Check if wallet is already connected
    const checkConnection = () => {
      const connected = localStorage.getItem('walletConnected') === 'true'
      const savedAddress = localStorage.getItem('walletAddress')
      
      if (connected && savedAddress) {
        setIsConnected(true)
        setAddress(savedAddress)
        onConnect(true)
      }
    }

    checkConnection()
  }, [onConnect])

  const connectWallet = async () => {
    try {
      // Simulate wallet connection
      const mockAddress = '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')
      
      setIsConnected(true)
      setAddress(mockAddress)
      onConnect(true)
      
      // Save to localStorage for demo
      localStorage.setItem('walletConnected', 'true')
      localStorage.setItem('walletAddress', mockAddress)
    } catch (error) {
      console.error('Failed to connect wallet:', error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress('')
    onConnect(false)
    setIsDropdownOpen(false)
    
    // Clear localStorage
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={connectWallet}
        className="bg-nfl-gold text-nfl-red px-6 py-2 rounded-full font-semibold hover:bg-nfl-gold/90 transition-colors flex items-center space-x-2"
      >
        <Wallet className="w-5 h-5" />
        <span>Connect Wallet</span>
      </motion.button>
    )
  }

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition-colors flex items-center space-x-2"
      >
        <User className="w-5 h-5" />
        <span className="font-medium">{formatAddress(address)}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl"
        >
          <div className="p-2">
            <div className="px-3 py-2 text-white/70 text-sm">
              Connected to Base
            </div>
            <button
              onClick={disconnectWallet}
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
