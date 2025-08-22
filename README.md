# 🏈 NFL Pick Ems - Full-Stack dApp

A decentralized NFL pick'em game built on Base chain with a modern Next.js frontend and smart contract backend.

## 🎯 Overview

NFL Pick Ems is a complete dApp that allows players to participate in weekly NFL pick'em contests. Players pay 2 USDC to enter each week and pick exactly 10 games. Winners split the pot based on their performance.

##  Features

### Smart Contract
- **USDC Integration**: Uses USDC on Base chain (6 decimals)
- **Weekly Contests**: Oracle creates weekly contests with configurable game counts
- **Bit Mask Picks**: Players submit picks using efficient bit masks
- **Automated Payouts**: Winners automatically receive their share of the pot
- **Oracle System**: Trusted oracle posts results and finalizes winners
- **Security**: ReentrancyGuard, Ownable, and proper access controls

### Oracle Service
- **ESPN API Integration**: Automated NFL score fetching from ESPN API
- **Real-time Updates**: Monitors games every 5 minutes
- **Smart Contract Integration**: Direct blockchain interaction for results
- **Automated Results**: No manual score entry needed
- **Error Handling**: Robust error recovery and logging

### Frontend Application
- **Modern UI**: Built with Next.js 14 and Tailwind CSS
- **Wallet Integration**: Connect with MetaMask and other Web3 wallets
- **Game Interface**: Intuitive pick selection and submission
- **Real-time Updates**: Live leaderboard and game status
- **Mobile Responsive**: Works seamlessly on all devices
- **Social Features**: Share results and achievements

## 🏗️ Architecture

### Smart Contracts
- **NFLPickEms.sol**: Main game contract
- **MockUSDC.sol**: Mock USDC for testing (6 decimals)

### Frontend
- **Next.js 14**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Web3 Integration**: Ethers.js for blockchain interaction

## 📁 Project Structure

```
nfl-pick-ems/
├── contracts/          # Smart contracts
│   ├── NFLPickEms.sol # Main game contract
│   └── MockUSDC.sol   # Mock USDC for testing
├── scripts/            # Deployment scripts
│   └── deploy.js      # Contract deployment
├── test/               # Smart contract tests
│   └── NFLPickEms.test.ts
├── oracle-service/     # Oracle service
│   ├── index.js       # Main oracle script
│   ├── test.js        # Oracle tests
│   ├── package.json   # Oracle dependencies
│   └── README.md      # Oracle documentation
├── app/                # Next.js app directory
│   ├── page.tsx       # Main page
│   └── layout.tsx     # Root layout
├── components/         # React components
│   ├── GamePicker.tsx # Game selection UI
│   ├── WalletConnect.tsx # Wallet connection
│   └── Leaderboard.tsx   # Score display
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
├── public/             # Static assets
└── hardhat.config.js   # Hardhat configuration
```

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or other Web3 wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PaulieB14/nfl-pick-ems.git
   cd nfl-pick-ems
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Compile smart contracts**
   ```bash
   npx hardhat compile
   ```

5. **Run tests**
   ```bash
   npx hardhat test
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Set up Oracle Service (Optional)**
   ```bash
   cd oracle-service
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm test  # Test ESPN API integration
   npm start # Start the oracle service
   ```

## 🧪 Testing

### Smart Contract Tests
```bash
npx hardhat test
```

### Frontend Tests
```bash
npm run test
```

##  Deployment

### Local Development
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Base Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

### Base Mainnet
```bash
npx hardhat run scripts/deploy.js --network base-mainnet
```

## 🔧 Configuration

### Hardhat Networks
- **base-mainnet**: Base mainnet
- **base-sepolia**: Base testnet
- **base-local**: Local development

### Environment Variables
- `WALLET_KEY`: Private key for deployment
- `BASESCAN_API_KEY`: API key for contract verification

## 📚 Documentation

- **Smart Contracts**: See `contracts/` directory
- **Frontend Components**: See `components/` directory
- **Oracle Service**: See `oracle-service/` directory
- **Testing**: See `test/` directory
- **Deployment**: See `scripts/` directory

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## �� License

This project is licensed under the MIT License.

## 🆘 Support

If you have questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the smart contract code

---

**Built with ❤️ for the NFL and Web3 community**

## 🚀 Live Demo

**Frontend Application:** [NFL Pick Ems dApp](https://your-netlify-app.netlify.app)

**Smart Contract:** [Base Sepolia Contract](https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS)

> **Note:** The live demo connects to Base Sepolia testnet. Make sure you have testnet ETH and USDC!

## 🌐 Deployment

### Frontend (Netlify)
The Next.js frontend is automatically deployed to Netlify:

- **Live URL:** [https://your-app.netlify.app](https://your-app.netlify.app)
- **Branch:** `main` (auto-deploys on push)
- **Framework:** Next.js 14
- **Build Command:** `npm run build`
- **Publish Directory:** `.next`

### Smart Contract (Base Chain)
The Solidity smart contracts are deployed on Base:

- **Network:** Base Sepolia (testnet)
- **Contract:** [View on Basescan](https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS)
- **Deployment Script:** `scripts/deploy.js`

### Environment Variables
Set these in your Netlify dashboard:
```bash
NEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
NEXT_PUBLIC_BASE_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://sepolia.base.org
```

## 🔗 Project Links

| Type | Link | Description |
|------|------|-------------|
| 🏠 **Repository** | [GitHub](https://github.com/PaulieB14/nfl-pick-ems) | Source code and documentation |
| 🌐 **Live Demo** | [Netlify](https://your-app.netlify.app) | Frontend application |
| 📜 **Smart Contract** | [Basescan](https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS) | Verified contract on Base Sepolia |
| 📖 **Documentation** | [README](https://github.com/PaulieB14/nfl-pick-ems#readme) | Project setup and usage |
| 🐛 **Issues** | [GitHub Issues](https://github.com/PaulieB14/nfl-pick-ems/issues) | Report bugs or request features |

## 🚀 Quick Start

1. **Try the Live Demo:** [https://your-app.netlify.app](https://your-app.netlify.app)
2. **View Smart Contract:** [Basescan](https://sepolia.basescan.org/address/YOUR_CONTRACT_ADDRESS)
3. **Clone & Run Locally:** `git clone https://github.com/PaulieB14/nfl-pick-ems.git`
