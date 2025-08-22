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
    miniAppConnector()
  ],
  // Better error handling and Farcaster compatibility
  ssr: false,
  // Add polling for better connection stability
  pollingInterval: 4000,
})
