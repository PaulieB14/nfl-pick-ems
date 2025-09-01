# NFL Pick'ems Smart Contract

A blockchain-based NFL prediction game where users pick 10 teams per week, pay a $2 USDC entry fee, and split winnings based on correct predictions.

## 🏈 Overview

NFL Pick'ems is a decentralized prediction game built on Base blockchain that allows users to:
- Enter weekly predictions by picking 10 NFL teams
- Pay a $2 USDC entry fee per entry
- Win prizes based on having the most correct picks
- Claim winnings automatically through smart contracts

## 🚀 Smart Contract Features

- **Secure Entry System**: Players pay $2 USDC and submit 10 team picks via bitmask
- **Oracle-Controlled Results**: Trusted oracle posts game results and determines winners
- **Fair Winner Selection**: Winners are determined by most correct picks among all entrants
- **Automatic Payouts**: Winners can claim their share of the pot directly from the contract
- **Emergency Controls**: Owner can pause/unpause contract for security
- **Multi-Week Support**: Handle multiple NFL weeks simultaneously

## 📋 Smart Contract Details

- **Network**: Base Blockchain
- **Contract Address**: `0x0b07572EcDcb7709b48Ef1DB11a07d9c263C2e06`
- **USDC Token**: `0xab83D7Da5C2752Bf7AcB5804bF81ac22C7A9034B` (Mock USDC for testing)
- **Entry Fee**: 2 USDC (2,000,000 wei with 6 decimals)
- **Pick Requirement**: Exactly 10 teams per entry

## 🧪 Testing

Comprehensive Foundry test suite with 25+ tests covering:
- Contract initialization and configuration
- Week creation and game management
- Player entry with USDC transfers and pick validation
- Oracle results posting and winner determination
- Claim processing and payout distribution
- Access control and emergency functions
- Multi-week support and edge case handling

### Run Tests
```bash
# Install dependencies
forge install

# Run all tests
forge test

# Run with verbosity
forge test -vv

# Run specific test
forge test --match-contract NFLPickEmsTest
```

## 🛠 Development

Built with:
- **Solidity 0.8.23**: Smart contract development
- **Foundry**: Testing and deployment framework
- **OpenZeppelin**: Security and standard contract libraries
- **Next.js**: Frontend web application
- **Base**: L2 blockchain for low-cost transactions

### Local Development
```bash
# Clone repository
git clone https://github.com/PaulieB14/nfl-pick-ems.git
cd nfl-pick-ems

# Install dependencies
npm install
forge install

# Run tests
forge test

# Start development server
npm run dev
```

## 🔐 Security

- Uses OpenZeppelin battle-tested contracts for security
- Implements ReentrancyGuard to prevent reentrancy attacks
- Oracle-controlled results prevent manipulation
- Owner controls limited to emergency pause/unpause functions
- Comprehensive test coverage validates all functionality

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

For questions or support, please open an issue on GitHub.
