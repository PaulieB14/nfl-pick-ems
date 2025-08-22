'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface FarcasterEmbedProps {
  week?: number
  picksCount?: number
  totalGames?: number
  isConnected?: boolean
}

export default function FarcasterEmbed({ 
  week = 1, 
  picksCount = 0, 
  totalGames = 10, 
  isConnected = false 
}: FarcasterEmbedProps) {
  const router = useRouter()

  useEffect(() => {
    // Update meta tags dynamically based on current state
    const updateMetaTags = () => {
      const title = `NFL Pick 'ems - Week ${week}`
      const description = isConnected 
        ? `Made ${picksCount}/${totalGames} picks for Week ${week}. Join the competition!`
        : `Make your picks for Week ${week} NFL games and compete for prizes on Base network!`
      
      const buttonText = isConnected ? '🏈 View Picks' : '🏈 Make Picks'
      
      // Update title
      const titleMeta = document.querySelector('title')
      if (titleMeta) titleMeta.textContent = title
      
      // Update description
      const descMeta = document.querySelector('meta[name="description"]')
      if (descMeta) descMeta.setAttribute('content', description)
      
      // Update OpenGraph
      const ogTitle = document.querySelector('meta[property="og:title"]')
      if (ogTitle) ogTitle.setAttribute('content', title)
      
      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) ogDesc.setAttribute('content', description)
      
      // Update Farcaster Mini App meta tags
      const fcButton = document.querySelector('meta[name="fc:miniapp:button"]')
      if (fcButton) fcButton.setAttribute('content', buttonText)
      
      // Update OpenGraph image based on week
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) {
        ogImage.setAttribute('content', `https://nfl-pick-em.netlify.app/og-image.png?week=${week}&picks=${picksCount}`)
      }
    }

    updateMetaTags()
  }, [week, picksCount, totalGames, isConnected])

  return null // This component doesn't render anything visible
}
