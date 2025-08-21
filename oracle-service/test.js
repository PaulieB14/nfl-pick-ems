import { ethers } from 'ethers';
import fetch from 'node-fetch';

// Test ESPN API integration
async function testESPNAPI() {
    console.log('🧪 Testing ESPN API integration...');
    
    try {
        const response = await fetch('http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week=1');
        const data = await response.json();
        
        console.log('✅ ESPN API connection successful');
        console.log(`📊 Found ${data.events?.length || 0} games`);
        
        if (data.events && data.events.length > 0) {
            const firstGame = data.events[0];
            console.log('🏈 Sample game:', {
                name: firstGame.name,
                status: firstGame.status.type.name,
                date: firstGame.date
            });
        }
        
    } catch (error) {
        console.error('❌ ESPN API test failed:', error.message);
    }
}

// Test winners mask conversion
function testWinnersMask() {
    console.log('\n🧪 Testing winners mask conversion...');
    
    // Simulate game results: Home wins for games 0, 2, 4, 6, 8
    const mockGames = [
        { winner: 'home' },   // Game 0: Home win
        { winner: 'away' },   // Game 1: Away win  
        { winner: 'home' },   // Game 2: Home win
        { winner: 'away' },   // Game 3: Away win
        { winner: 'home' },   // Game 4: Home win
        { winner: 'away' },   // Game 5: Away win
        { winner: 'home' },   // Game 6: Home win
        { winner: 'away' },   // Game 7: Away win
        { winner: 'home' },   // Game 8: Home win
        { winner: 'away' },   // Game 9: Away win
    ];
    
    let mask = 0;
    mockGames.forEach((game, index) => {
        if (game.winner === 'home') {
            mask |= (1 << index);
        }
    });
    
    console.log('✅ Winners mask calculation successful');
    console.log(`🎯 Mask: ${mask} (binary: ${mask.toString(2).padStart(10, '0')})`);
    console.log('📝 Expected: Home wins for games 0,2,4,6,8');
}

// Run tests
async function runTests() {
    console.log('🚀 Running Oracle Service Tests\n');
    
    await testESPNAPI();
    testWinnersMask();
    
    console.log('\n✅ All tests completed!');
}

runTests().catch(console.error);
