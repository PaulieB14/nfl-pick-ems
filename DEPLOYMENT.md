# 🚀 NFL Pick Ems - Base Sepolia Deployment Guide

This guide will help you deploy your NFL Pick Ems smart contracts to Base Sepolia testnet.

## 📋 Prerequisites

### 1. **Get Base Sepolia ETH**
You need testnet ETH for gas fees (~0.01 ETH should be enough):

- **Base Bridge:** https://bridge.base.org/
- **Coinbase Faucet:** https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- **Base Faucet:** https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

### 2. **Set up Environment Variables**
Create a `.env` file in your project root:

```bash
# Base Sepolia Deployment
WALLET_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key_here

# Contract addresses (will be filled after deployment)
MOCK_USDC_ADDRESS=your_deployed_mock_usdc_address
NFL_PICK_EMS_ADDRESS=your_deployed_nfl_pick_ems_address

# Oracle Service (for later)
CONTRACT_ADDRESS=your_deployed_contract_address
PRIVATE_KEY=your_oracle_private_key
RPC_URL=https://sepolia.base.org

# Frontend Environment Variables
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_BASE_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
```

## 🚀 Deployment Steps

### Step 1: Compile Contracts
```bash
npx hardhat compile
```

### Step 2: Deploy to Base Sepolia
```bash
npx hardhat run scripts/deploy-base-sepolia.js --network base-sepolia
```

### Step 3: Verify Contracts
After deployment, update your `.env` file with the contract addresses, then:

```bash
npx hardhat run scripts/verify.js --network base-sepolia
```

### Step 4: Test the Deployment
```bash
npx hardhat test --network base-sepolia
```

## 📊 Expected Output

After successful deployment, you should see:

```
🚀 Starting NFL Pick Ems deployment to Base Sepolia...
👤 Deploying with account: 0x...
💰 Account balance: 0.05 ETH

📦 Deploying MockUSDC...
✅ MockUSDC deployed to: 0x...

🏈 Deploying NFLPickEms...
✅ NFLPickEms deployed to: 0x...

🔧 Setting oracle...
✅ Oracle set to: 0x...

🔍 Verifying deployment...
✅ Oracle verification: true
✅ Token verification: true

🎉 Deployment complete!
==================================================
📋 Contract Addresses:
MockUSDC: 0x...
NFLPickEms: 0x...
Oracle: 0x...
==================================================

🔗 View on Basescan:
MockUSDC: https://sepolia.basescan.org/address/0x...
NFLPickEms: https://sepolia.basescan.org/address/0x...
```

## 🔧 Post-Deployment Setup

### 1. **Update Frontend Environment**
Update your frontend environment variables with the deployed contract addresses.

### 2. **Set up Oracle Service**
```bash
cd oracle-service
npm install
# Edit .env with your contract address
npm test  # Test ESPN API
npm start # Start oracle service
```

### 3. **Test the Full Flow**
1. Create a week using the oracle
2. Add games with start times
3. Test player entry
4. Test oracle posting results
5. Test winner finalization

## 🐛 Troubleshooting

### Common Issues:

1. **Insufficient ETH**
   - Get more testnet ETH from the faucet

2. **Gas Price Issues**
   - The script uses 1 Gwei gas price, which should work on Base Sepolia

3. **Contract Verification Fails**
   - Make sure you have a Basescan API key
   - Check that contract addresses are correct

4. **Oracle Service Issues**
   - Verify contract address in oracle service .env
   - Check RPC URL connectivity

## 🔗 Useful Links

- **Base Sepolia Explorer:** https://sepolia.basescan.org/
- **Base Bridge:** https://bridge.base.org/
- **Base Documentation:** https://docs.base.org/
- **Hardhat Documentation:** https://hardhat.org/docs

## 📝 Next Steps

After successful deployment:

1. **Test thoroughly** on Base Sepolia
2. **Gather feedback** from users
3. **Optimize gas costs** if needed
4. **Deploy to Base Mainnet** when ready
5. **Integrate with Farcaster** for social features

---

**Good luck with your deployment! 🏈**

