# 🎯 Publishing NFL Pick 'ems to Farcaster

## ✅ Your App is Ready!

Your NFL Pick 'ems app is already live at: **https://nfl-pick-em.netlify.app/**

## 🚀 Steps to Publish on Farcaster

### 1. Enable Farcaster Developer Mode
1. Go to [https://farcaster.xyz/~/settings/developer-tools](https://farcaster.xyz/~/settings/developer-tools)
2. Toggle on "Developer Mode"
3. You'll see a developer section appear on the left

### 2. Create Mini App Manifest
1. In the developer tools, click "Create Mini App"
2. Use this configuration:

```json
{
  "name": "NFL Pick 'ems",
  "description": "Weekly NFL prediction game on Base chain. Pick 10 games, win prizes!",
  "icon": "https://nfl-pick-em.netlify.app/icons/icon-192.png",
  "screenshots": [
    "https://nfl-pick-em.netlify.app/screenshots/gameplay.png",
    "https://nfl-pick-em.netlify.app/screenshots/leaderboard.png"
  ],
  "categories": ["sports", "gaming", "defi"],
  "url": "https://nfl-pick-em.netlify.app"
}
```

### 3. Convert Icons to PNG (Required)
Your app needs PNG icons. Convert the SVGs we created:

**Option A: Online Converter**
1. Go to [svgtopng.com](https://svgtopng.com)
2. Upload `public/icons/icon.svg`
3. Download as PNG
4. Resize to required sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

**Option B: ImageMagick (if installed)**
```bash
# Convert main icon to all sizes
for size in 72 96 128 144 152 192 384 512; do
  convert public/icons/icon.svg -resize ${size}x${size} public/icons/icon-${size}.png
done
```

### 4. Upload Icons to Netlify
1. Add the PNG icons to your `public/icons/` folder
2. Commit and push to GitHub
3. Netlify will auto-deploy the new icons

### 5. Submit for Review
1. In Farcaster developer tools, click "Submit for Review"
2. Wait for approval (usually 24-48 hours)
3. Once approved, your app will be discoverable on Farcaster!

## 🎉 Share Your App

Once approved, share this on Farcaster:

```
🏈 NFL Pick 'ems is now live on Farcaster!

Weekly NFL prediction game on Base chain
• Pick 10 games each week
• $2 USDC entry fee
• Winners split the pot
• Built on Base mainnet

Contract: 0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06

Try it out: https://nfl-pick-em.netlify.app
```

## 📋 Checklist

- ✅ App deployed on Netlify
- ✅ Farcaster SDK integrated
- ✅ Contract addresses configured
- ❌ Convert SVG icons to PNG
- ❌ Upload PNG icons to Netlify
- ❌ Submit manifest to Farcaster
- ❌ Wait for approval
- ❌ Share on Farcaster

## 🎯 Your App Features

Your NFL Pick 'ems app includes:
- **🏈 Week 1 Games**: All 16 NFL games loaded
- **💰 $2 Entry Fee**: Clear pricing
- **🎯 Pick System**: 0/10 picks interface
- **📊 Leaderboard**: Results tracking
- **🔗 Wallet Integration**: Connect wallet ready
- **🎨 Professional UI**: Clean, modern design

**You're almost there! Just need to convert those icons and submit to Farcaster! 🚀**
