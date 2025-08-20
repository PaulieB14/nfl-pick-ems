import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFL Pick Ems - Weekly Football Predictions',
  description: 'Pick 10 NFL games each week and compete for the pot on Base chain. Built for Farcaster.',
  keywords: ['NFL', 'football', 'predictions', 'Base', 'Farcaster', 'pick ems'],
  authors: [{ name: 'NFL Pick Ems Team' }],
  openGraph: {
    title: 'NFL Pick Ems - Weekly Football Predictions',
    description: 'Pick 10 NFL games each week and compete for the pot on Base chain.',
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NFL Pick Ems - Weekly Football Predictions',
    description: 'Pick 10 NFL games each week and compete for the pot on Base chain.',
    images: ['/og-image.png'],
  },
  other: {
    'farcaster:app': 'nfl-pick-ems',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="farcaster:app" content="nfl-pick-ems" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-nfl-red via-nfl-blue to-nfl-gold">
          {children}
        </div>
      </body>
    </html>
  )
}
