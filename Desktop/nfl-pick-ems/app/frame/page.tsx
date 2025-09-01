import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NFL Pick \'ems - Farcaster Frame',
  description: 'Weekly NFL prediction game on Base chain',
  openGraph: {
    title: 'NFL Pick \'ems',
    description: 'Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!',
    images: ['https://nfl-pick-ems.vercel.app/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://nfl-pick-ems.vercel.app/og-image.png',
    'fc:frame:button:1': 'Play Now',
    'fc:frame:button:2': 'View Leaderboard',
    'fc:frame:button:3': 'Connect Wallet',
    'fc:frame:post_url': 'https://nfl-pick-ems.vercel.app/api/frame',
  },
};

export default function FramePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">🏈 NFL Pick \'ems</h1>
        <p className="text-xl mb-8">Weekly NFL prediction game on Base chain</p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <ul className="text-left space-y-2">
            <li>• Pick 10 NFL games each week</li>
            <li>• Pay 2 USDC entry fee</li>
            <li>• Winners split the pot</li>
            <li>• Built on Base chain</li>
          </ul>
          
          <div className="mt-6 space-y-3">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Play Now
            </button>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              View Leaderboard
            </button>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Connect Wallet
            </button>
          </div>
        </div>
        
        <div className="mt-8 text-sm opacity-75">
          <p>Contract: 0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06</p>
          <p>Network: Base Mainnet</p>
        </div>
      </div>
    </div>
  );
}
