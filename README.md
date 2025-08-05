# Graph Network Analytics Dashboard

A comprehensive real-time dashboard for analyzing The Graph Network's query fees vs indexer rewards with enhanced data from the Graph Network subgraph.

## 🚀 Recent Improvements

### Enhanced Data Sources
- **Upgraded to Comprehensive Graph Network Subgraph**: Replaced generic subgraph queries with the official Graph Network mainnet subgraph (`graphprotocol/graph-network-mainnet`)
- **Rich Network Metrics**: Now includes detailed metrics like:
  - Total indexer query fees collected and rebates
  - Delegator query fee rebates
  - Curator query fees
  - Protocol taxes and unclaimed rebates
  - Indexer vs delegator indexing rewards breakdown
  - Active vs total counts for all network participants
  - Total tokens staked, allocated, delegated, and signalled

### Enhanced Indexer Analysis
- **Comprehensive Indexer Data**: Each indexer now shows:
  - Allocated and delegated tokens
  - Available stake and token capacity
  - Own stake ratio vs delegated stake ratio
  - Indexing reward cut and query fee cut percentages
  - Allocation count and forced closures
  - Query fee rebates and delegator query fees

### Enhanced Subgraph Analysis
- **Detailed Subgraph Metrics**: Each subgraph now displays:
  - Staked and signalled tokens
  - Signal amount and price per share
  - Reserve ratio and curation bonding curve data
  - Query fee rebates and curator fee rewards
  - Subgraph count and active subgraph count

### Network Health Indicators
- **Active Participants**: Shows active vs total counts for indexers, delegators, curators, and subgraphs
- **Staking Metrics**: Total staked, allocated, and delegated tokens
- **Network Status**: Mature vs growing network indicators based on query fee percentage

## 🛠️ Technical Implementation

### Data Fetching
The dashboard uses the comprehensive Graph Network subgraph with enhanced GraphQL queries:

```typescript
// Network metrics with 20+ additional fields
export const NETWORK_METRICS_QUERY = `
  query {
    graphNetworks(first: 1) {
      totalIndexingRewards
      totalQueryFees
      totalIndexerQueryFeesCollected
      totalIndexerQueryFeeRebates
      totalDelegatorQueryFeeRebates
      totalCuratorQueryFees
      totalTaxedQueryFees
      totalUnclaimedQueryFeeRebates
      totalIndexingDelegatorRewards
      totalIndexingIndexerRewards
      indexerCount
      stakedIndexersCount
      delegatorCount
      activeDelegatorCount
      curatorCount
      activeCuratorCount
      subgraphCount
      activeSubgraphCount
      subgraphDeploymentCount
      totalTokensStaked
      totalTokensAllocated
      totalDelegatedTokens
      totalTokensSignalled
    }
  }
`;
```

### Environment Configuration
```bash
# Graph Network Subgraph Endpoint
NEXT_PUBLIC_GRAPH_ENDPOINT=https://api.thegraph.com/subgraphs/name/graphprotocol/graph-network-mainnet
```

## 📊 Dashboard Features

### Key Metrics Cards
- **Total Indexing Rewards**: Network-wide inflation rewards
- **Total Query Fees**: Organic revenue from queries
- **Rewards:Fees Ratio**: Network subsidy level indicator
- **Network Status**: Mature vs growing network classification
- **Active Indexers**: Currently staked indexers
- **Active Delegators**: Currently delegating participants
- **Active Subgraphs**: Currently active subgraphs
- **Total Staked**: Total GRT staked in the network

### Visualizations
- **Network Distribution Pie Chart**: Indexing rewards vs query fees breakdown
- **Historical Trends Area Chart**: Rewards/fees ratio over time
- **Top Indexers by Efficiency**: Revenue efficiency ranking with profile images
- **Top Subgraphs Bar Chart**: Query fees vs indexing rewards with images

### Enhanced Data Display
- **ENS Resolution**: Human-readable names for addresses
- **Profile Images**: Indexer and subgraph profile pictures
- **Comprehensive Metrics**: Detailed breakdowns for all network participants
- **Real-time Updates**: Live data from The Graph Network

## 🔧 Setup and Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd graph-network-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.local .env.local
   # Edit .env.local with your preferred Graph Network subgraph endpoint
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📈 Data Sources

### Primary Subgraph
- **Graph Network Mainnet**: `graphprotocol/graph-network-mainnet`
- **Features**: Comprehensive network data, participant metrics, historical trends

### Alternative Subgraphs
- **Graph Network Analytics**: `graphprotocol/graph-network-analytics`
- **Graph Network Activity**: `graphprotocol/graph-network-activity-eth`
- **Graph Network Arbitrum**: `graphprotocol/graph-network-arbitrum`

## 🎯 Use Cases

### For Indexers
- Monitor revenue efficiency and performance
- Compare with other indexers
- Track allocation strategies and delegation pools

### For Delegators
- Analyze indexer performance and cuts
- Monitor delegation returns
- Track network health and growth

### For Curators
- Monitor subgraph performance
- Track curation rewards and bonding curves
- Analyze network activity trends

### For Developers
- Monitor subgraph usage and revenue
- Track network adoption and growth
- Analyze query fee trends

## 🔍 Network Health Indicators

### Mature Network Criteria
- Query fees > 5% of total network value
- High active participant ratios
- Balanced rewards/fees ratio

### Growing Network Indicators
- High indexing rewards percentage
- Increasing active participants
- Growing total staked amounts

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- The Graph Protocol team for the comprehensive subgraph
- ENS for address resolution
- The Graph Network community for data and feedback 