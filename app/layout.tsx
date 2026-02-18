import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import Providers from '@/components/Providers'

// Force dynamic rendering — RainbowKit/WalletConnect need runtime env vars
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFL Pick Ems',
  description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
  metadataBase: new URL('https://nfl-pick-ems.vercel.app'),
  openGraph: {
    title: 'NFL Pick Ems',
    description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
    url: 'https://nfl-pick-ems.vercel.app',
    siteName: 'NFL Pick Ems',
    images: [
      {
        url: 'https://nfl-pick-ems.vercel.app/icon-1024.png',
        width: 1024,
        height: 1024,
        alt: 'NFL Pick Ems - Make your picks for every NFL game',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NFL Pick Ems',
    description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
    images: ['https://nfl-pick-ems.vercel.app/icon-1024.png'],
  },
  other: {
    'fc:miniapp': 'https://nfl-pick-ems.vercel.app/',
    'fc:miniapp:version': '1',
    'fc:miniapp:image': 'https://nfl-pick-ems.vercel.app/icon-1024.png',
    'fc:miniapp:button': '🏈 Make Picks',
    'fc:miniapp:action': 'post',
    'fc:miniapp:input:text': 'Share your NFL picks!',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
