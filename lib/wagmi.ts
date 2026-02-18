import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base } from 'wagmi/chains'

// Use a placeholder during build/SSR when the env var isn't available.
// The real projectId is set via NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in Vercel.
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'BUILD_PLACEHOLDER'

export const config = getDefaultConfig({
  appName: 'NFL Pick Ems',
  projectId,
  chains: [base],
  ssr: true,
})
