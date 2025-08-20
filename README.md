# 🏈 NFL Pick Ems - Smart Contract

A decentralized NFL pick'em game built on Base chain using USDC for payments.

## �� Overview

NFL Pick Ems is a smart contract that allows players to participate in weekly NFL pick'em contests. Players pay 2 USDC to enter each week and pick exactly 10 games. Winners split the pot based on their performance.

## 🚀 Features

- **USDC Integration**: Uses USDC on Base chain (6 decimals)
- **Weekly Contests**: Oracle creates weekly contests with configurable game counts
- **Bit Mask Picks**: Players submit picks using efficient bit masks
- **Automated Payouts**: Winners automatically receive their share of the pot
- **Oracle System**: Trusted oracle posts results and finalizes winners
- **Security**: ReentrancyGuard, Ownable, and proper access controls

## 🏗️ Architecture

### Smart Contracts

- **NFLPickEms.sol**: Main game contract
- **MockUSDC.sol**: Mock USDC for testing (6 decimals)

### Key Components

- **Week Management**: Oracle creates weeks with game counts and lock times
- **Entry System**: Players pay 2 USDC and submit 10-game picks
- **Results Processing**: Oracle posts game results and finalizes winners
- **Claiming**: Winners claim their share of the pot
- **Remainder Handling**: Oracle can sweep leftover amounts

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Hardhat 2.x

### Installation

```bash
npm install
```

### Compilation

```bash
npx hardhat compile
```

### Testing

```bash
npx hardhat test
```

### Local Deployment

```bash
npx hardhat run scripts/deploy.js
```

## 🌐 Deployment

### Base Sepolia Testnet

```bash
npx hardhat run scripts/deploy.js --network base-sepolia
```

### Base Mainnet

```bash
npx hardhat run scripts/deploy.js --network base-mainnet
```

## 📋 Configuration

### Environment Variables

Create a `.env` file:

```bash
WALLET_KEY="your_private_key"
BASESCAN_API_KEY="your_basescan_api_key"
```

### Networks

- **Base Sepolia**: Chain ID 84532
- **Base Mainnet**: Chain ID 8453
- **Local**: Chain ID 31337

## 🔒 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Restricted access to admin functions
- **Oracle System**: Trusted oracle for game management
- **Input Validation**: Comprehensive parameter validation
- **Safe Math**: Built-in overflow protection

## 📊 Game Mechanics

1. **Week Creation**: Oracle creates a week with game count and lock time
2. **Entry Period**: Players pay 2 USDC and submit 10-game picks
3. **Lock Time**: Entries close at specified lock time
4. **Results**: Oracle posts game results
5. **Finalization**: Oracle finalizes winners
6. **Claiming**: Winners claim their share of the pot

## 🧪 Testing

The project includes comprehensive tests covering:

- Contract deployment
- Week management
- Player entry
- Results posting
- Winner finalization
- Prize claiming

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ on Base Chain**
