# 🚀 NFL Pick 'ems Deployment Guide

## 📋 Overview

This guide covers deploying your NFL Pick 'ems app to:
- ✅ **GitHub** (Source code)
- ✅ **Base Mainnet** (Smart contracts)
- 🎯 **Farcaster** (Mini App)
- 🌐 **Vercel/Netlify** (Frontend)

## 🏗️ Current Status

### ✅ Completed
- **Smart Contracts**: Deployed to Base mainnet
  - NFLPickEms: `0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06`
  - MockUSDC: `0x47A45bdd951E76Ac1A695272e4A7Db5b33c2f468`
- **GitHub Repository**: [https://github.com/PaulieB14/nfl-pick-ems](https://github.com/PaulieB14/nfl-pick-ems)
- **Farcaster Integration**: SDK installed and configured
- **Visual Assets**: Icons and screenshots created

## 🎨 Visual Assets

### Required Icons
- **App Icons**: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
- **Screenshots**: 1280x720 (gameplay, leaderboard)
- **OG Image**: 1200x630 (social sharing)

### Generated Assets
- ✅ SVG icons created in `public/icons/`
- ✅ OG image created in `public/images/`
- ✅ Screenshots created in `public/screenshots/`

### Next Steps for Icons
1. **Convert SVGs to PNGs**:
   ```bash
   # Using ImageMagick (if installed)
   convert public/icons/icon.svg -resize 192x192 public/icons/icon-192.png
   convert public/icons/icon.svg -resize 512x512 public/icons/icon-512.png
   ```

2. **Or use online tools**:
   - [svgtopng.com](https://svgtopng.com)
   - [convertio.co](https://convertio.co/svg-png/)

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect to GitHub**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select the `nfl-pick-ems` repo

2. **Configure Environment Variables**:
   ```env
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06
   NEXT_PUBLIC_MOCK_USDC_ADDRESS=0x47A45bdd951E76Ac1A695272e4A7Db5b33c2f468
   NEXT_PUBLIC_BASE_CHAIN_ID=8453
   NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
   ```

3. **Deploy**:
   - Vercel will auto-deploy from your GitHub repo
   - Your app will be available at: `https://nfl-pick-ems.vercel.app`

### Option 2: Netlify

1. **Connect to GitHub**:
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Environment Variables**: Same as Vercel

## 🎯 Farcaster Mini App Deployment

### 1. Enable Developer Mode
1. Go to [https://farcaster.xyz/~/settings/developer-tools](https://farcaster.xyz/~/settings/developer-tools)
2. Toggle on "Developer Mode"

### 2. Create Mini App Manifest
Your app is already configured with:
- ✅ Farcaster SDK integration
- ✅ Frame API endpoints
- ✅ Visual assets
- ✅ Share functionality

### 3. Publish to Farcaster
1. **Deploy your frontend** (Vercel/Netlify)
2. **Create manifest** in Farcaster developer tools:
   ```json
   {
     "name": "NFL Pick 'ems",
     "description": "Weekly NFL prediction game on Base chain",
     "icon": "https://your-domain.com/icons/icon-192.png",
     "screenshots": [
       "https://your-domain.com/screenshots/gameplay.png",
       "https://your-domain.com/screenshots/leaderboard.png"
     ],
     "categories": ["sports", "gaming", "defi"],
     "url": "https://your-domain.com"
   }
   ```

3. **Submit for review** in Farcaster developer tools

### 4. Share on Farcaster
Once approved, share your app:
```
🏈 NFL Pick 'ems is now live on Farcaster!

Weekly NFL prediction game on Base chain
• Pick 10 games each week
• 2 USDC entry fee
• Winners split the pot
• Built on Base mainnet

Contract: 0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06

Try it out: [Your App URL]
```

## 🔧 Production Checklist

### Smart Contracts
- ✅ Deployed to Base mainnet
- ✅ Tested and verified
- ✅ Oracle set up
- ❌ Replace MockUSDC with real USDC

### Frontend
- ✅ Contract addresses configured
- ✅ Farcaster integration
- ✅ Visual assets created
- ❌ Deploy to Vercel/Netlify
- ❌ Update domain in configs

### Farcaster
- ✅ SDK integrated
- ✅ Frame endpoints created
- ✅ Visual assets ready
- ❌ Convert SVGs to PNGs
- ❌ Deploy frontend
- ❌ Submit manifest

## 🚀 Quick Deploy Commands

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Convert Icons (if ImageMagick installed)
```bash
# Convert main icon to all sizes
for size in 72 96 128 144 152 192 384 512; do
  convert public/icons/icon.svg -resize ${size}x${size} public/icons/icon-${size}.png
done

# Convert OG image
convert public/images/og-image.svg -resize 1200x630 public/images/og-image.png

# Convert screenshots
convert public/screenshots/gameplay.svg -resize 1280x720 public/screenshots/gameplay.png
convert public/screenshots/leaderboard.svg -resize 1280x720 public/screenshots/leaderboard.png
```

## 📞 Support

- **GitHub Issues**: [https://github.com/PaulieB14/nfl-pick-ems/issues](https://github.com/PaulieB14/nfl-pick-ems/issues)
- **Farcaster Docs**: [https://miniapps.farcaster.xyz/docs](https://miniapps.farcaster.xyz/docs)
- **Base Docs**: [https://docs.base.org](https://docs.base.org)

---

**Your NFL Pick 'ems app is ready for the world! 🏈**
