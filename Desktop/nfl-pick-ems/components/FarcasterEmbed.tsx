'use client'

import { useEffect } from 'react'

interface FarcasterEmbedProps {
  week: number
  picksCount: number
  totalGames: number
  isConnected: boolean
}

export default function FarcasterEmbed({ week, picksCount, totalGames, isConnected }: FarcasterEmbedProps) {
  useEffect(() => {
    // Update Farcaster frame metadata based on current state
    const updateFarcasterMeta = () => {
      // Only update if we're in a Farcaster context
      if (typeof window !== 'undefined' && window.location.hostname.includes('farcaster')) {
        // Update meta tags for Farcaster frame
        const metaTags = [
          { property: 'fc:frame', content: 'vNext' },
          { property: 'fc:frame:image', content: `${window.location.origin}/api/frame/image?week=${week}&picks=${picksCount}` },
          { property: 'fc:frame:button:1', content: `Pick Week ${week} (${picksCount}/${totalGames})` },
          { property: 'fc:frame:post_url', content: `${window.location.origin}/api/frame` }
        ]

        metaTags.forEach(({ property, content }) => {
          let meta = document.querySelector(`meta[property="${property}"]`)
          if (!meta) {
            meta = document.createElement('meta')
            meta.setAttribute('property', property)
            document.head.appendChild(meta)
          }
          meta.setAttribute('content', content)
        })
      }
    }

    updateFarcasterMeta()
  }, [week, picksCount, totalGames, isConnected])

  // This component doesn't render anything visible
  return null
}
