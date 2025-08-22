const fs = require('fs');
const path = require('path');

// Create the public directory structure
const publicDir = path.join(__dirname, '../public');
const wellKnownDir = path.join(publicDir, '.well-known');

if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}

// Create 1024x1024 icon (PNG, no alpha)
const icon1024 = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d5a87;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <circle cx="512" cy="512" r="400" fill="none" stroke="#ffffff" stroke-width="8"/>
  <circle cx="512" cy="512" r="350" fill="none" stroke="#ffffff" stroke-width="4"/>
  <circle cx="512" cy="512" r="300" fill="none" stroke="#ffffff" stroke-width="2"/>
  <text x="512" y="480" font-family="Arial, sans-serif" font-size="120" font-weight="bold" text-anchor="middle" fill="#ffffff">NFL</text>
  <text x="512" y="580" font-family="Arial, sans-serif" font-size="80" font-weight="bold" text-anchor="middle" fill="#ffffff">PICKS</text>
  <circle cx="512" cy="650" r="60" fill="#ffffff"/>
  <text x="512" y="665" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="#1a365d">🏈</text>
</svg>`;

// Create 200x200 splash image
const splash200 = `<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d5a87;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="200" height="200" fill="url(#bg2)"/>
  <circle cx="100" cy="100" r="80" fill="none" stroke="#ffffff" stroke-width="2"/>
  <text x="100" y="95" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">NFL</text>
  <text x="100" y="115" font-family="Arial, sans-serif" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">PICKS</text>
  <circle cx="100" cy="130" r="15" fill="#ffffff"/>
  <text x="100" y="137" font-family="Arial, sans-serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a365d">🏈</text>
</svg>`;

// Create 1200x630 OG image
const ogImage = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d5a87;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg3)"/>
  <circle cx="300" cy="315" r="200" fill="none" stroke="#ffffff" stroke-width="6"/>
  <circle cx="300" cy="315" r="150" fill="none" stroke="#ffffff" stroke-width="3"/>
  <text x="300" y="295" font-family="Arial, sans-serif" font-size="60" font-weight="bold" text-anchor="middle" fill="#ffffff">NFL</text>
  <text x="300" y="365" font-family="Arial, sans-serif" font-size="40" font-weight="bold" text-anchor="middle" fill="#ffffff">PICKS</text>
  <circle cx="300" cy="420" r="40" fill="#ffffff"/>
  <text x="300" y="430" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#1a365d">🏈</text>
  <text x="600" y="250" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#ffffff">NFL Pick 'ems</text>
  <text x="600" y="300" font-family="Arial, sans-serif" font-size="24" fill="#ffffff">Make your picks for every NFL game</text>
  <text x="600" y="330" font-family="Arial, sans-serif" font-size="24" fill="#ffffff">and compete for prizes on Base network</text>
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="18" fill="#e2e8f0">Complete 2025 season schedule • Real team matchups</text>
  <text x="600" y="410" font-family="Arial, sans-serif" font-size="18" fill="#e2e8f0">Thanksgiving & Christmas games • International matchups</text>
</svg>`;

// Create screenshot placeholders (1284x2778 portrait)
const createScreenshot = (number) => `<svg width="1284" height="2778" viewBox="0 0 1284 2778" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg${number}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d5a87;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="1284" height="2778" fill="url(#bg${number})"/>
  <rect x="50" y="100" width="1184" height="200" rx="20" fill="#ffffff" opacity="0.1"/>
  <text x="642" y="180" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="#ffffff">NFL Pick 'ems</text>
  <text x="642" y="220" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="#e2e8f0">Screenshot ${number}</text>
  <rect x="50" y="350" width="1184" height="400" rx="20" fill="#ffffff" opacity="0.1"/>
  <text x="642" y="450" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">Week Selector</text>
  <text x="642" y="490" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Choose from 18 weeks</text>
  <text x="642" y="520" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Complete 2025 season</text>
  <rect x="50" y="800" width="1184" height="600" rx="20" fill="#ffffff" opacity="0.1"/>
  <text x="642" y="900" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">Game Picks</text>
  <text x="642" y="940" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Real NFL matchups</text>
  <text x="642" y="970" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Pick winners for prizes</text>
  <rect x="50" y="1450" width="1184" height="300" rx="20" fill="#ffffff" opacity="0.1"/>
  <text x="642" y="1550" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">Wallet Connection</text>
  <text x="642" y="1590" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Connect to Base network</text>
  <text x="642" y="1620" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Submit picks on-chain</text>
  <rect x="50" y="1800" width="1184" height="200" rx="20" fill="#ffffff" opacity="0.1"/>
  <text x="642" y="1900" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">Leaderboard</text>
  <text x="642" y="1940" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Compete for prizes</text>
  <text x="642" y="1970" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#e2e8f0">Weekly and season winners</text>
</svg>`;

// Write the files
fs.writeFileSync(path.join(publicDir, 'icon-1024.png'), Buffer.from(icon1024));
fs.writeFileSync(path.join(publicDir, 'icon-200.png'), Buffer.from(splash200));
fs.writeFileSync(path.join(publicDir, 'og-image.png'), Buffer.from(ogImage));
fs.writeFileSync(path.join(publicDir, 'screenshot1.png'), Buffer.from(createScreenshot(1)));
fs.writeFileSync(path.join(publicDir, 'screenshot2.png'), Buffer.from(createScreenshot(2)));
fs.writeFileSync(path.join(publicDir, 'screenshot3.png'), Buffer.from(createScreenshot(3)));

console.log('✅ Created Farcaster Mini App assets:');
console.log('  - icon-1024.png (1024x1024)');
console.log('  - icon-200.png (200x200)');
console.log('  - og-image.png (1200x630)');
console.log('  - screenshot1.png (1284x2778)');
console.log('  - screenshot2.png (1284x2778)');
console.log('  - screenshot3.png (1284x2778)');
console.log('  - .well-known/farcaster.json (manifest)');
