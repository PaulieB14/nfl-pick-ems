import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'

// Simple RainbowKit configuration
export const config = getDefaultConfig({
  appName: 'NFL Pick Ems',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID', // Optional for now
  chains: [base, baseSepolia],
  ssr: false,
})
