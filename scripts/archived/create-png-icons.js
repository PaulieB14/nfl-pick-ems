const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🎨 Creating professional PNG icons for Farcaster...');
  
  // Create directories if they don't exist
  const dirs = ['public/icons', 'public/images'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Create a simple but professional icon using Canvas-like approach
  // Since we can't use Canvas directly, we'll create a simple SVG that can be converted
  
  const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  // Create a professional NFL-themed icon
  const professionalIcon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="ballGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="512" height="512" rx="80" fill="url(#bgGrad)"/>
    
    <!-- Football -->
    <ellipse cx="256" cy="200" rx="80" ry="45" fill="url(#ballGrad)" stroke="#92400e" stroke-width="3"/>
    <ellipse cx="256" cy="200" rx="70" ry="35" fill="none" stroke="#92400e" stroke-width="2"/>
    <ellipse cx="256" cy="200" rx="60" ry="25" fill="none" stroke="#92400e" stroke-width="1"/>
    
    <!-- Laces -->
    <path d="M 246 185 L 246 215 M 256 185 L 256 215 M 266 185 L 266 215" stroke="#92400e" stroke-width="2" stroke-linecap="round"/>
    
    <!-- Text -->
    <text x="256" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="32" font-weight="bold">NFL</text>
    <text x="256" y="350" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20">Pick 'ems</text>
    
    <!-- Decorative elements -->
    <circle cx="100" cy="100" r="20" fill="white" opacity="0.1"/>
    <circle cx="412" cy="412" r="30" fill="white" opacity="0.1"/>
    <circle cx="412" cy="100" r="15" fill="white" opacity="0.1"/>
    <circle cx="100" cy="412" r="25" fill="white" opacity="0.1"/>
  </svg>`;
  
  // Create OG image
  const ogImage = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ogBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
        <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="ogBallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="630" fill="url(#ogBgGrad)"/>
    
    <!-- Football -->
    <ellipse cx="200" cy="315" rx="120" ry="70" fill="url(#ogBallGrad)" stroke="#92400e" stroke-width="4"/>
    <ellipse cx="200" cy="315" rx="100" ry="55" fill="none" stroke="#92400e" stroke-width="3"/>
    <ellipse cx="200" cy="315" rx="80" ry="40" fill="none" stroke="#92400e" stroke-width="2"/>
    
    <!-- Laces -->
    <path d="M 180 275 L 180 355 M 200 275 L 200 355 M 220 275 L 220 355" stroke="#92400e" stroke-width="3" stroke-linecap="round"/>
    
    <!-- Main Text -->
    <text x="600" y="200" fill="white" font-family="Arial, sans-serif" font-size="80" font-weight="bold">NFL Pick 'ems</text>
    <text x="600" y="280" fill="white" font-family="Arial, sans-serif" font-size="36">Weekly NFL prediction game on Base chain</text>
    <text x="600" y="340" fill="white" font-family="Arial, sans-serif" font-size="28">Pick 10 games • Win prizes • Built on Base</text>
    
    <!-- Features -->
    <text x="600" y="420" fill="#fbbf24" font-family="Arial, sans-serif" font-size="24" font-weight="bold">🏈 $2 Entry Fee • 🏆 Prize Pool • ⚡ Instant Results</text>
    
    <!-- Contract info -->
    <text x="600" y="550" fill="white" font-family="Arial, sans-serif" font-size="18" opacity="0.8">Contract: 0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06</text>
    
    <!-- Decorative elements -->
    <circle cx="50" cy="50" r="40" fill="white" opacity="0.1"/>
    <circle cx="1150" cy="580" r="60" fill="white" opacity="0.1"/>
    <circle cx="1150" cy="50" r="30" fill="white" opacity="0.1"/>
    <circle cx="50" cy="580" r="50" fill="white" opacity="0.1"/>
  </svg>`;
  
  // Save the main icon
  fs.writeFileSync('public/icons/icon.svg', professionalIcon);
  console.log('✅ Created professional icon SVG');
  
  // Save the OG image
  fs.writeFileSync('public/images/og-image.svg', ogImage);
  console.log('✅ Created OG image SVG');
  
  console.log('\n📋 Next Steps:');
  console.log('1. Convert SVG to PNG using:');
  console.log('   - Online: https://svgtopng.com');
  console.log('   - Upload public/icons/icon.svg');
  console.log('   - Download and resize to: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512');
  console.log('');
  console.log('2. Convert OG image:');
  console.log('   - Upload public/images/og-image.svg');
  console.log('   - Download as 1200x630 PNG');
  console.log('');
  console.log('3. Alternative: Use your existing app screenshots as icons!');
  console.log('   - Take screenshots of your live app at https://nfl-pick-em.netlify.app/');
  console.log('   - Crop to square for icons');
  console.log('   - Use full screenshots for OG images');
  
  console.log('\n🎨 Professional icons ready for conversion!');
}

main().catch((error) => {
  console.error('❌ Icon creation failed:', error);
  process.exitCode = 1;
});
