'use client';

import { useEffect, useState } from 'react';

export default function FarcasterIntegration() {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're running in a Farcaster client
        const isInFarcaster = typeof window !== 'undefined' && 
          window.location.hostname.includes('farcaster') || 
          window.location.hostname.includes('warpcast');
        
        setIsFarcaster(isInFarcaster);
        console.log('Farcaster detection:', isInFarcaster ? 'Running in Farcaster' : 'Running in regular browser');
      } catch (error) {
        console.error('Farcaster initialization error:', error);
      }
    };

    initializeFarcaster();
  }, []);

  const handleShare = async () => {
    // Fallback for regular browsers
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'NFL Pick \'ems',
          text: '🏈 Weekly NFL prediction game on Base chain!',
          url: 'https://nfl-pick-em.netlify.app'
        });
      } catch (error) {
        console.error('Share error:', error);
      }
    }
  };

  const handleNotification = async () => {
    // Placeholder for future Farcaster SDK integration
    console.log('Notification feature coming soon!');
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
