const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🎨 Creating visual assets for NFL Pick \'ems...');
  
  // Create directories
  const dirs = [
    'public/icons',
    'public/screenshots',
    'public/images'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
  
  // Create a simple SVG icon (you can replace this with a proper design)
  const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="80" fill="url(#grad1)"/>
    <circle cx="256" cy="200" r="60" fill="white" opacity="0.9"/>
    <circle cx="256" cy="200" r="45" fill="#1e40af"/>
    <text x="256" y="210" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">🏈</text>
    <text x="256" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18" font-weight="bold">NFL</text>
    <text x="256" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14">Pick 'ems</text>
  </svg>`;
  
  fs.writeFileSync('public/icons/icon.svg', svgIcon);
  console.log('✅ Created SVG icon');
  
  // Create OG image for social sharing
  const ogImage = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#ogGrad)"/>
    <circle cx="300" cy="315" r="120" fill="white" opacity="0.9"/>
    <circle cx="300" cy="315" r="90" fill="#1e40af"/>
    <text x="300" y="330" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">🏈</text>
    <text x="600" y="250" fill="white" font-family="Arial, sans-serif" font-size="64" font-weight="bold">NFL Pick 'ems</text>
    <text x="600" y="320" fill="white" font-family="Arial, sans-serif" font-size="32">Weekly NFL prediction game on Base chain</text>
    <text x="600" y="380" fill="white" font-family="Arial, sans-serif" font-size="24">Pick 10 games • Win prizes • Built on Base</text>
    <text x="600" y="550" fill="white" font-family="Arial, sans-serif" font-size="18" opacity="0.8">Contract: 0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06</text>
  </svg>`;
  
  fs.writeFileSync('public/images/og-image.svg', ogImage);
  console.log('✅ Created OG image');
  
  // Create placeholder screenshots
  const gameplayScreenshot = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="720" fill="#1e293b"/>
    <text x="640" y="100" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">NFL Pick 'ems - Gameplay</text>
    <rect x="100" y="150" width="1080" height="400" fill="#334155" rx="10"/>
    <text x="640" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24">Week 1 Games</text>
    <text x="640" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18">Select your 10 picks to enter the contest</text>
    <text x="640" y="500" text-anchor="middle" fill="#60a5fa" font-family="Arial, sans-serif" font-size="16">Entry Fee: 2 USDC • Prize Pool: TBD</text>
  </svg>`;
  
  const leaderboardScreenshot = `<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="720" fill="#1e293b"/>
    <text x="640" y="100" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">NFL Pick 'ems - Leaderboard</text>
    <rect x="100" y="150" width="1080" height="400" fill="#334155" rx="10"/>
    <text x="640" y="200" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24">Week 1 Leaderboard</text>
    <text x="640" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="18">See who's leading the pack</text>
    <text x="640" y="500" text-anchor="middle" fill="#60a5fa" font-family="Arial, sans-serif" font-size="16">Winners will be announced after all games complete</text>
  </svg>`;
  
  fs.writeFileSync('public/screenshots/gameplay.svg', gameplayScreenshot);
  fs.writeFileSync('public/screenshots/leaderboard.svg', leaderboardScreenshot);
  console.log('✅ Created placeholder screenshots');
  
  console.log('\n📋 Next Steps:');
  console.log('1. Convert SVG files to PNG using a tool like:');
  console.log('   - Online converters (svgtopng.com)');
  console.log('   - Image editing software (Photoshop, GIMP)');
  console.log('   - Command line tools (ImageMagick, Inkscape)');
  console.log('');
  console.log('2. Required PNG sizes:');
  console.log('   - Icons: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512');
  console.log('   - Screenshots: 1280x720');
  console.log('   - OG Image: 1200x630');
  console.log('');
  console.log('3. Replace placeholder SVGs with your actual designs');
  console.log('');
  console.log('4. Update the manifest.json with your actual icon paths');
  
  console.log('\n🎨 Visual assets setup complete!');
}

main().catch((error) => {
  console.error('❌ Asset creation failed:', error);
  process.exitCode = 1;
});
