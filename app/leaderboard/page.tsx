import { Metadata } from 'next'
import FarcasterEmbed from '@/components/FarcasterEmbed'

export const metadata: Metadata = {
  title: 'NFL Pick ems - Leaderboard',
  description: 'See who\'s winning in the NFL Pick ems competition. Check the leaderboard and compete for prizes!',
  openGraph: {
    title: 'NFL Pick ems - Leaderboard',
    description: 'See who\'s winning in the NFL Pick ems competition. Check the leaderboard and compete for prizes!',
    images: ['https://nfl-pick-em.netlify.app/og-image.png'],
  },
  other: {
    'fc:miniapp': 'https://nfl-pick-em.netlify.app/leaderboard',
    'fc:miniapp:version': '1',
    'fc:miniapp:image': 'https://nfl-pick-em.netlify.app/og-image.png',
    'fc:miniapp:button': '🏆 View Leaderboard',
    'fc:miniapp:action': 'post',
    'fc:miniapp:input:text': 'Check out the NFL Pick ems leaderboard!',
  },
}

export default function LeaderboardPage() {
  return (
    <>
      <FarcasterEmbed 
        week={1}
        picksCount={0}
        totalGames={10}
        isConnected={false}
      />
      <div className="min-h-screen bg-gradient-to-br from-nfl-red via-nfl-blue to-nfl-gold p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">
            🏆 NFL Pick ems Leaderboard
          </h1>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Weekly Leaderboard */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">This Week</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥇</span>
                      <div>
                        <div className="text-white font-semibold">Player 1</div>
                        <div className="text-white/70 text-sm">9/10 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$50</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <div className="text-white font-semibold">Player 2</div>
                        <div className="text-white/70 text-sm">8/10 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$30</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥉</span>
                      <div>
                        <div className="text-white font-semibold">Player 3</div>
                        <div className="text-white/70 text-sm">8/10 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$20</div>
                  </div>
                </div>
              </div>
              
              {/* Season Leaderboard */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Season</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <div className="text-white font-semibold">Season Champ</div>
                        <div className="text-white/70 text-sm">145/180 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$500</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <div className="text-white font-semibold">Runner Up</div>
                        <div className="text-white/70 text-sm">142/180 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$300</div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🥉</span>
                      <div>
                        <div className="text-white font-semibold">Third Place</div>
                        <div className="text-white/70 text-sm">140/180 picks correct</div>
                      </div>
                    </div>
                    <div className="text-nfl-gold font-bold">$200</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="/"
                className="inline-flex items-center px-6 py-3 bg-nfl-gold text-nfl-red font-bold rounded-full hover:bg-yellow-400 transition-colors"
              >
                🏈 Make Your Picks
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
