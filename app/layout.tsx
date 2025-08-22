import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import FarcasterIntegration from '../components/FarcasterIntegration'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NFL Pick Ems',
  description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
  openGraph: {
    title: 'NFL Pick Ems',
    description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
    images: ['https://nfl-pick-em.netlify.app/og-image.png'],
  },
  other: {
    'fc:miniapp': 'https://nfl-pick-em.netlify.app/',
    'fc:miniapp:version': '1',
    'fc:miniapp:image': 'https://nfl-pick-em.netlify.app/og-image.png',
    'fc:miniapp:button': '🏈 Make Picks',
    'fc:miniapp:action': 'post',
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
        <FarcasterIntegration />
        {children}
      </body>
    </html>
  )
}
