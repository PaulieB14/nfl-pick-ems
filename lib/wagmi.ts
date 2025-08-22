import { http, createConfig } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { farcasterMiniApp as miniAppConnector } from '@farcaster/miniapp-wagmi-connector'
import { injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  connectors: [
    miniAppConnector(),
    injected({ target: 'metaMask' }),
    injected({ target: 'coinbaseWallet' }),
    injected({ target: 'braveWallet' }),
    injected({ target: 'imToken' }),
    walletConnect({ 
      showQrModal: true 
    })
  ],
  // Better error handling and Farcaster compatibility
  ssr: false,
  // Add polling for better connection stability
  pollingInterval: 4000,
})
