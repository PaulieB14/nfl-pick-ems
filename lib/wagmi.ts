import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    miniAppConnector({
      // Better Farcaster Mini App integration
      chains: [base, baseSepolia],
      // Enable automatic chain switching
      switchChainMode: 'mounted',
      // Add timeout for better reliability
      timeout: 10000,
    })
  ],
  // Better error handling and Farcaster compatibility
  ssr: false,
  // Add polling for better connection stability
  pollingInterval: 4000,
})
