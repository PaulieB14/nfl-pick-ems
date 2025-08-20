# 🏈 NFL Pick Ems - Full-Stack dApp

A decentralized NFL pick'em game built on Base chain with a modern Next.js frontend and smart contract backend.

## 🎯 Overview

NFL Pick Ems is a complete dApp that allows players to participate in weekly NFL pick'em contests. Players pay 2 USDC to enter each week and pick exactly 10 games. Winners split the pot based on their performance.

## 🚀 Features

### Smart Contract
- **USDC Integration**: Uses USDC on Base chain (6 decimals)
- **Weekly Contests**: Oracle creates weekly contests with configurable game counts
- **Bit Mask Picks**: Players submit picks using efficient bit masks
- **Automated Payouts**: Winners automatically receive their share of the pot
- **Oracle System**: Trusted oracle posts results and finalizes winners
- **Security**: ReentrancyGuard, Ownable, and proper access controls

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

## 🚀 Getting Started

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

## 🧪 Testing

### Smart Contract Tests
```bash
npx hardhat test
```

### Frontend Tests
```bash
npm run test
```

## 🚀 Deployment

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
