# 🧪 Smart Contract Testing Guide

## 🎯 **Why Test First?**

Before deploying to mainnet with real money, you MUST test:
- ✅ **Local Testing:** Fast feedback, no gas costs
- ✅ **Testnet Testing:** Real blockchain environment, free tokens
- ✅ **Mainnet Deployment:** Only after thorough testing

## 🚀 **Testing Setup**

### **1. Install Dependencies**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts
```

### **2. Configure Networks**
- **Local:** Hardhat network (31337)
- **Testnet:** Base Sepolia (84532)
- **Mainnet:** Base (8453)

## 🧪 **Testing Commands**

### **Run All Tests**
```bash
npx hardhat test
```

### **Test Complete Game Flow**
```bash
npx hardhat run scripts/testGame.js
```

### **Deploy to Local Network**
```bash
npx hardhat run scripts/deploy.js
```

### **Deploy to Base Sepolia Testnet**
```bash
npx hardhat run scripts/deploy.js --network baseSepolia
```

## 📋 **What Tests Cover**

### **Contract Deployment**
- ✅ USDC address setting
- ✅ Oracle initialization
- ✅ Entry fee configuration

### **Week Management**
- ✅ Oracle can create weeks
- ✅ Non-oracles cannot create weeks
- ✅ Duplicate week prevention

### **Player Entry**
- ✅ Exactly 10 picks required
- ✅ USDC fee collection
- ✅ No duplicate entries
- ✅ Lock time enforcement

### **Results & Finalization**
- ✅ Oracle posts results
- ✅ Winners finalized
- ✅ Pot distribution calculation

### **Claiming Winnings**
- ✅ Winners can claim
- ✅ Non-winners cannot claim
- ✅ No double claiming

### **Edge Cases**
- ✅ Bitmask validation
- ✅ Zero winners handling
- ✅ Invalid game counts

## 🎮 **Test Game Flow**

The `testGame.js` script simulates a complete week:

1. **Setup:** Deploy contracts, set oracle
2. **Entry:** 3 players enter picks
3. **Results:** Oracle posts winners
4. **Finalization:** Winners determined
5. **Claims:** Winners claim their share

## 🔧 **Environment Variables**

Create `.env` file for testnet deployment:

```bash
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here
```

## 🚨 **Common Issues**

### **Node.js Version**
- **Required:** Node.js 20+ (LTS recommended)
- **Current:** You have v18.20.8 (needs upgrade)

### **Gas Estimation**
- Base Sepolia: Free test tokens
- Base mainnet: Real ETH for gas

### **Contract Verification**
- Base Sepolia: Automatic via Hardhat
- Base mainnet: Manual on Basescan

## 📊 **Test Results Expected**

### **Successful Test Run**
```
🎮 Testing complete NFL Pick Ems game flow...
👥 Players:
   Oracle: 0x...
   Player 1: 0x...
   Player 2: 0x...
   Player 3: 0x...

📦 Deploying contracts...
✅ MockUSDC deployed to: 0x...
✅ NFLPickEms deployed to: 0x...

💰 Funding players...
✅ Players funded with 100 USDC each

📅 Creating Week 1...
✅ Week 1 created with lock time: [date]

🎯 Players entering picks...
✅ Player 1 entered picks
✅ Player 2 entered picks
✅ Player 3 entered picks

💰 Current pot: 6.0 USDC

⏰ Fast forwarding past lock time...
✅ Time advanced

📊 Oracle posting results...
✅ Results posted

🏆 Finalizing winners...
✅ Winners finalized

🎯 Final results:
   Total pot: 6.0 USDC
   Winners: 2
   Share per winner: 3.0 USDC

💸 Winners claiming winnings...
✅ Player 1 claimed: 3.0 USDC
✅ Player 3 claimed: 3.0 USDC

💳 Final player balances:
   Player 1: 103.0 USDC
   Player 2: 98.0 USDC
   Player 3: 103.0 USDC

🎉 Game flow test completed successfully!
```

## 🎯 **Next Steps After Testing**

1. **✅ Local Tests Pass:** All functionality works
2. **✅ Game Flow Test:** Complete simulation successful
3. **🚀 Deploy to Base Sepolia:** Test on testnet
4. **🧪 Testnet Testing:** Real blockchain environment
5. **🎯 Deploy to Base Mainnet:** Production deployment

## 🔒 **Security Notes**

- **Never share private keys**
- **Test thoroughly before mainnet**
- **Verify contract code on Basescan**
- **Start with small amounts**

## 📞 **Need Help?**

If tests fail:
1. Check Node.js version (20+ required)
2. Verify all dependencies installed
3. Check contract compilation
4. Review error messages carefully
