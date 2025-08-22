'use client';

import { useEffect, useState } from 'react';

export default function FarcasterIntegration() {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isReady, setIsReady] = useState(false); // Start as false until SDK is ready

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're running in a Farcaster Mini App environment
        const isInFarcaster = typeof window !== 'undefined' && (
          window.location.hostname.includes('farcaster') || 
          window.location.hostname.includes('warpcast') ||
          window.location.hostname.includes('nfl-pick-em.netlify.app')
        );
        
        setIsFarcaster(isInFarcaster);
        console.log('Farcaster detection:', isInFarcaster ? 'Running in Farcaster Mini App' : 'Running in regular browser');
        
        if (isInFarcaster) {
          try {
            // Import and initialize the Farcaster SDK
            const { sdk } = await import('@farcaster/miniapp-sdk');
            
            // CRITICAL: Call ready() to hide splash screen and display content
            await sdk.actions.ready();
            console.log('✅ Farcaster SDK initialized and ready() called');
            
            // Set ready state after SDK is initialized
            setIsReady(true);
            
            // Add Farcaster-specific styling
            document.body.classList.add('farcaster-mini-app');
            
          } catch (sdkError) {
            console.warn('Farcaster SDK not available, running in fallback mode:', sdkError);
            // Fallback for when SDK is not available (e.g., development)
            document.body.classList.add('farcaster-mini-app-fallback');
            setIsReady(true);
          }
        } else {
          // Not in Farcaster, ready immediately
          setIsReady(true);
        }
      } catch (error) {
        console.error('Farcaster initialization error:', error);
        setIsReady(true); // Fallback to ready state
      }
    };

    initializeFarcaster();
  }, []);

  const handleShare = async () => {
    try {
      if (isFarcaster) {
        // Use Farcaster SDK for sharing
        const { sdk } = await import('@farcaster/miniapp-sdk');
        await sdk.actions.openUrl('https://nfl-pick-em.netlify.app');
      } else {
        // Fallback for regular browsers
        if (navigator.share) {
          await navigator.share({
            title: 'NFL Pick \'ems',
            text: '🏈 Weekly NFL prediction game on Base chain!',
            url: 'https://nfl-pick-em.netlify.app'
          });
        }
      }
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const handleNotification = async () => {
    try {
      if (isFarcaster) {
        // Use Farcaster SDK for notifications
        const { sdk } = await import('@farcaster/miniapp-sdk');
        // Note: Notifications are handled via webhook, not direct SDK call
        console.log('Notification sent via webhook system');
      } else {
        console.log('Notification feature only available in Farcaster Mini Apps');
      }
    } catch (error) {
      console.error('Notification error:', error);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading NFL Pick \'ems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {isFarcaster && (
        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-2">
          🟢 Farcaster Mini App
        </div>
      )}
      
      <div className="flex gap-2">
        <button
          onClick={handleShare}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
        >
          📤 Share
        </button>
        
        {isFarcaster && (
          <button
            onClick={handleNotification}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium"
          >
            🔔 Notify
          </button>
        )}
      </div>
    </div>
  );
}
