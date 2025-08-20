#!/bin/bash

echo "🚀 Deploying NFL Pick Ems to production..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the right directory?"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Deploy the .next directory to your hosting provider"
    echo "2. Update your Farcaster Mini App manifest"
    echo "3. Deploy the smart contract to Base mainnet"
    echo "4. Update environment variables with contract addresses"
    echo ""
    echo "🌐 Your app is ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
