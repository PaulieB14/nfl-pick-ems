import { ethers } from 'ethers';
import fetch from 'node-fetch';
import cron from 'cron';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL || 'https://sepolia.base.org';
const ESPN_API_BASE = 'http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard';

// Contract ABI (minimal for oracle functions)
const CONTRACT_ABI = [
    "function postResults(uint256 weekId, uint256 winnersMask) external",
    "function markGameStarted(uint256 weekId, uint8 gameIndex) external",
    "function finalizeWinners(uint256 weekId) external",
    "function getWeekInfo(uint256 weekId) external view returns (uint8, uint64, bool, bool, uint256, uint256)",
    "function getGameInfo(uint256 weekId, uint8 gameIndex) external view returns (uint64, bool, bool)"
];

class NFLPickEmsOracle {
    constructor() {
        this.provider = new ethers.JsonRpcProvider(RPC_URL);
        this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
        this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.wallet);
        
        console.log('🚀 NFL Pick Ems Oracle Started');
        console.log('📡 Connected to:', RPC_URL);
        console.log('🏈 Contract:', CONTRACT_ADDRESS);
        console.log('👤 Oracle Address:', this.wallet.address);
    }

    // Fetch NFL scores from ESPN API
    async fetchNFLScores(weekId) {
        try {
            console.log(`📊 Fetching NFL scores for week ${weekId}...`);
            
            const response = await fetch(`${ESPN_API_BASE}?week=${weekId}`);
            if (!response.ok) {
                throw new Error(`ESPN API error: ${response.status}`);
            }
            
            const data = await response.json();
            return this.parseESPNData(data);
        } catch (error) {
            console.error('❌ Error fetching NFL scores:', error.message);
            return null;
        }
    }

    // Parse ESPN API response
    parseESPNData(data) {
        const games = [];
        
        if (!data.events) {
            console.log('⚠️ No games found in ESPN data');
            return games;
        }

        data.events.forEach((event, index) => {
            const game = {
                index: index,
                id: event.id,
                name: event.name,
                status: event.status.type.name,
                startTime: new Date(event.date).getTime() / 1000,
                homeTeam: event.competitions[0].competitors.find(c => c.homeAway === 'home'),
                awayTeam: event.competitions[0].competitors.find(c => c.homeAway === 'away'),
                winner: null
            };

            // Determine winner if game is finished
            if (game.status === 'STATUS_FINAL') {
                const homeScore = parseInt(game.homeTeam.score);
                const awayScore = parseInt(game.awayTeam.score);
                
                if (homeScore > awayScore) {
                    game.winner = 'home';
                } else if (awayScore > homeScore) {
                    game.winner = 'away';
                } else {
                    game.winner = 'tie';
                }
            }

            games.push(game);
        });

        console.log(`📈 Parsed ${games.length} games from ESPN API`);
        return games;
    }

    // Convert game results to winners mask
    gamesToWinnersMask(games) {
        let mask = 0;
        let validGames = 0;

        games.forEach((game, index) => {
            if (game.winner && game.winner !== 'tie') {
                // Home team win = 1, Away team win = 0
                if (game.winner === 'home') {
                    mask |= (1 << index);
                }
                validGames++;
            }
        });

        console.log(`🎯 Winners mask: ${mask.toString(2)} (${validGames} valid games)`);
        return mask;
    }

    // Mark games as started on the blockchain
    async markGamesStarted(weekId, games) {
        console.log(`⏰ Marking games as started for week ${weekId}...`);
        
        for (const game of games) {
            const now = Math.floor(Date.now() / 1000);
            
            if (game.startTime <= now && game.status !== 'STATUS_SCHEDULED') {
                try {
                    const tx = await this.contract.markGameStarted(weekId, game.index);
                    await tx.wait();
                    console.log(`✅ Marked game ${game.index} as started`);
                } catch (error) {
                    console.error(`❌ Error marking game ${game.index}:`, error.message);
                }
            }
        }
    }

    // Post results to smart contract
    async postResults(weekId, winnersMask) {
        try {
            console.log(`📝 Posting results for week ${weekId}...`);
            
            const tx = await this.contract.postResults(weekId, winnersMask);
            await tx.wait();
            
            console.log(`✅ Results posted successfully!`);
            console.log(`🔗 Transaction: ${tx.hash}`);
            
            return true;
        } catch (error) {
            console.error('❌ Error posting results:', error.message);
            return false;
        }
    }

    // Finalize winners
    async finalizeWinners(weekId) {
        try {
            console.log(`🏆 Finalizing winners for week ${weekId}...`);
            
            const tx = await this.contract.finalizeWinners(weekId);
            await tx.wait();
            
            console.log(`✅ Winners finalized successfully!`);
            console.log(`🔗 Transaction: ${tx.hash}`);
            
            return true;
        } catch (error) {
            console.error('❌ Error finalizing winners:', error.message);
            return false;
        }
    }

    // Check if all games are finished
    areAllGamesFinished(games) {
        return games.every(game => game.status === 'STATUS_FINAL');
    }

    // Main oracle function
    async processWeek(weekId) {
        console.log(`\n🔄 Processing week ${weekId}...`);
        
        try {
            // Fetch current week info
            const weekInfo = await this.contract.getWeekInfo(weekId);
            const [gameCount, lockTime, resultsSet, finalized] = weekInfo;
            
            if (finalized) {
                console.log(`✅ Week ${weekId} already finalized`);
                return;
            }
            
            if (resultsSet) {
                console.log(`📊 Week ${weekId} results already posted`);
                return;
            }
            
            // Fetch NFL scores
            const games = await this.fetchNFLScores(weekId);
            if (!games || games.length === 0) {
                console.log(`⚠️ No games found for week ${weekId}`);
                return;
            }
            
            // Mark games as started
            await this.markGamesStarted(weekId, games);
            
            // Check if all games are finished
            if (this.areAllGamesFinished(games)) {
                console.log(`🏁 All games finished for week ${weekId}`);
                
                // Convert to winners mask
                const winnersMask = this.gamesToWinnersMask(games);
                
                // Post results
                const resultsPosted = await this.postResults(weekId, winnersMask);
                
                if (resultsPosted) {
                    // Wait a bit then finalize winners
                    setTimeout(async () => {
                        await this.finalizeWinners(weekId);
                    }, 5000);
                }
            } else {
                console.log(`⏳ Not all games finished yet for week ${weekId}`);
            }
            
        } catch (error) {
            console.error(`❌ Error processing week ${weekId}:`, error.message);
        }
    }

    // Start the oracle service
    start() {
        console.log('🕐 Starting scheduled oracle tasks...');
        
        // Check for new results every 5 minutes
        const checkResults = new cron.CronJob('*/5 * * * *', async () => {
            console.log('\n⏰ Scheduled check triggered...');
            
            // Process current week (you can modify this logic)
            const currentWeek = this.getCurrentNFLWeek();
            await this.processWeek(currentWeek);
        });
        
        checkResults.start();
        
        // Also run immediately
        this.runInitialCheck();
    }

    // Get current NFL week (simplified)
    getCurrentNFLWeek() {
        // This is a simplified calculation - you might want to make this more sophisticated
        const now = new Date();
        const seasonStart = new Date('2024-09-05'); // NFL 2024 season start
        const weekDiff = Math.floor((now - seasonStart) / (7 * 24 * 60 * 60 * 1000));
        return Math.max(1, Math.min(18, weekDiff + 1)); // NFL has 18 weeks
    }

    // Run initial check
    async runInitialCheck() {
        console.log('🚀 Running initial check...');
        const currentWeek = this.getCurrentNFLWeek();
        await this.processWeek(currentWeek);
    }
}

// Start the oracle
const oracle = new NFLPickEmsOracle();
oracle.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down oracle...');
    process.exit(0);
});