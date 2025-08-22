'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function FarcasterIntegration() {
  const [isFarcaster, setIsFarcaster] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Check if we're running in a Farcaster client
        const isInFarcaster = await sdk.isInFarcaster();
        setIsFarcaster(isInFarcaster);

        if (isInFarcaster) {
          console.log('Running in Farcaster Mini App');
          
          // Initialize the SDK
          await sdk.init();
          
          // Hide the splash screen and show your app
          await sdk.actions.ready();
          setIsReady(true);
          
          // Listen for events
          sdk.events.on('userAuthenticated', (user) => {
            console.log('User authenticated:', user);
          });
          
          sdk.events.on('walletConnected', (wallet) => {
            console.log('Wallet connected:', wallet);
          });
          
        } else {
          console.log('Running in regular browser');
          setIsReady(true);
        }
      } catch (error) {
        console.error('Farcaster initialization error:', error);
        setIsReady(true); // Fallback to regular mode
      }
    };

    initializeFarcaster();
  }, []);

  const handleShare = async () => {
    if (isFarcaster) {
      try {
        await sdk.actions.share({
          text: '🏈 Check out NFL Pick \'ems - Weekly NFL prediction game on Base chain!',
          url: 'https://nfl-pick-ems.vercel.app'
        });
      } catch (error) {
        console.error('Share error:', error);
      }
    } else {
      // Fallback for regular browsers
      if (navigator.share) {
        await navigator.share({
          title: 'NFL Pick \'ems',
          text: '🏈 Weekly NFL prediction game on Base chain!',
          url: 'https://nfl-pick-ems.vercel.app'
        });
      }
    }
  };

  const handleNotification = async () => {
    if (isFarcaster) {
      try {
        await sdk.actions.sendNotification({
          title: 'NFL Pick \'ems',
          body: 'New week is live! Make your picks now.',
          url: 'https://nfl-pick-ems.vercel.app'
        });
      } catch (error) {
        console.error('Notification error:', error);
      }
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
