# 🏈 NFL Pick Ems Oracle Service

Automated oracle service that fetches NFL scores from ESPN API and posts results to the NFL Pick Ems smart contract.

## 🚀 Features

- **ESPN API Integration** - Real-time NFL score fetching
- **Automated Results** - No manual score entry needed
- **Smart Contract Integration** - Direct blockchain interaction
- **Scheduled Monitoring** - Checks for updates every 5 minutes
- **Error Handling** - Robust error recovery and logging

## 📋 Prerequisites

- Node.js 18+
- Deployed NFL Pick Ems smart contract
- Base Sepolia testnet ETH for gas fees
- ESPN API access (free tier)

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd oracle-service
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Test the setup:**
   ```bash
   npm test
   ```

## ⚙️ Configuration

### Environment Variables

```bash
# Required
PRIVATE_KEY=your_private_key_here
CONTRACT_ADDRESS=your_deployed_contract_address
RPC_URL=https://sepolia.base.org

# Optional
ESPN_API_BASE=http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard
LOG_LEVEL=info
```

### Smart Contract Setup

1. **Deploy the contract** to Base Sepolia
2. **Set the oracle** to your oracle wallet address
3. **Create a week** with game count and lock time
4. **Add games** with start times

## 🚀 Usage

### Start the Oracle Service

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

### Test ESPN API

```bash
npm test
```

## 📊 How It Works

### 1. **Score Fetching**
- Fetches NFL scores from ESPN API every 5 minutes
- Parses game results and determines winners
- Handles different game statuses (scheduled, live, final)

### 2. **Smart Contract Interaction**
- Marks games as started when they begin
- Posts final results when all games are finished
- Finalizes winners and calculates payouts

### 3. **Data Flow**
```
ESPN API → Oracle Service → Smart Contract → Winners → Payouts
```

## 🔧 API Integration

### ESPN API Endpoints

- **Scoreboard:** `http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?week={week}`
- **Game Details:** `http://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event={gameId}`

### Data Parsing

The oracle parses ESPN data to extract:
- Game start times
- Final scores
- Winners (home/away)
- Game status (scheduled/live/final)

## 🛡️ Security Features

- **Oracle-only functions** - Only authorized oracle can post results
- **Timestamp validation** - Prevents posting results too early
- **Error handling** - Graceful failure recovery
- **Logging** - Comprehensive audit trail

## 📈 Monitoring

### Logs to Watch

- ✅ **Successful API calls**
- ✅ **Results posted to blockchain**
- ✅ **Winners finalized**
- ⚠️ **API errors or timeouts**
- ⚠️ **Gas fee issues**
- ❌ **Contract interaction failures**

### Health Checks

The oracle provides these status indicators:
- ESPN API connectivity
- Smart contract interaction
- Gas fee monitoring
- Error rate tracking

## 🔄 Deployment

### Local Development

```bash
npm run dev
```

### Production Deployment

1. **Set up environment variables**
2. **Deploy to server/cloud**
3. **Set up process manager (PM2)**
4. **Configure monitoring**

### PM2 Configuration

```bash
npm install -g pm2
pm2 start index.js --name "nfl-oracle"
pm2 save
pm2 startup
```

## 🐛 Troubleshooting

### Common Issues

1. **ESPN API Errors**
   - Check network connectivity
   - Verify API endpoint
   - Check rate limits

2. **Smart Contract Errors**
   - Verify contract address
   - Check gas fees
   - Ensure oracle permissions

3. **Timing Issues**
   - Verify game start times
   - Check timezone settings
   - Monitor lock time validation

### Debug Mode

```bash
LOG_LEVEL=debug npm start
```

## 📝 API Reference

### Oracle Functions

- `processWeek(weekId)` - Process a specific week
- `fetchNFLScores(weekId)` - Fetch scores from ESPN
- `postResults(weekId, winnersMask)` - Post to smart contract
- `finalizeWinners(weekId)` - Calculate and finalize winners

### Smart Contract Functions

- `markGameStarted(weekId, gameIndex)` - Mark game as started
- `updateGameScore(weekId, gameIndex, homeScore, awayScore, finished)` - Update scores
- `postResults(weekId, winnersMask)` - Post final results
- `finalizeWinners(weekId)` - Finalize winners

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for the NFL and Web3 community**
