const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function main() {
  console.log('🚀 Deploying NFL Pick \'ems to Farcaster...');
  
  // Check if we're in the right directory
  if (!fs.existsSync('package.json')) {
    console.error('❌ No package.json found. Make sure you\'re in the project root.');
    return;
  }
  
  // Build the project first
  console.log('\n📦 Building the project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed successfully');
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    return;
  }
  
  // Check if out directory exists
  if (!fs.existsSync('out')) {
    console.error('❌ No out directory found. Make sure Next.js is configured for static export.');
    return;
  }
  
  // Create Farcaster deployment configuration
  console.log('\n⚙️ Creating Farcaster deployment config...');
  
  const farcasterConfig = {
    name: "nfl-pick-ems",
    description: "NFL Pick 'ems - Weekly football prediction game on Base chain",
    website: "https://nfl-pick-ems.vercel.app", // Update with your actual domain
    image: "https://nfl-pick-ems.vercel.app/og-image.png", // Create an OG image
    external_url: "https://nfl-pick-ems.vercel.app",
    attributes: [
      {
        trait_type: "Category",
        value: "Sports"
      },
      {
        trait_type: "Blockchain",
        value: "Base"
      },
      {
        trait_type: "Game Type",
        value: "Prediction"
      }
    ]
  };
  
  // Write Farcaster config
  fs.writeFileSync('farcaster.json', JSON.stringify(farcasterConfig, null, 2));
  console.log('✅ Farcaster config created');
  
  // Create deployment script
  const deployScript = `#!/bin/bash
echo "🚀 Deploying to Farcaster..."

# Install Farcaster CLI if not installed
if ! command -v farcaster &> /dev/null; then
    echo "Installing Farcaster CLI..."
    npm install -g @farcaster/hub-node
fi

# Deploy to Farcaster
echo "Deploying app to Farcaster..."
farcaster deploy --config farcaster.json --out-dir out

echo "✅ Deployment complete!"
echo "🌐 Your app should now be available on Farcaster!"
`;
  
  fs.writeFileSync('deploy-farcaster.sh', deployScript);
  execSync('chmod +x deploy-farcaster.sh');
  console.log('✅ Farcaster deployment script created');
  
  console.log('\n📋 Farcaster Deployment Instructions:');
  console.log('1. Make sure you have the Farcaster CLI installed:');
  console.log('   npm install -g @farcaster/hub-node');
  console.log('');
  console.log('2. Run the deployment script:');
  console.log('   ./deploy-farcaster.sh');
  console.log('');
  console.log('3. Or deploy manually:');
  console.log('   farcaster deploy --config farcaster.json --out-dir out');
  console.log('');
  console.log('4. Share your app on Farcaster:');
  console.log('   - Post about your NFL Pick \'ems app');
  console.log('   - Include the contract addresses');
  console.log('   - Encourage users to try it out!');
  
  console.log('\n🎯 Your app is ready for Farcaster deployment!');
}

main().catch((error) => {
  console.error('❌ Farcaster deployment setup failed:', error);
  process.exitCode = 1;
});
