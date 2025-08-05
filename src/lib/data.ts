export interface NetworkMetrics {
  totalIndexingRewards: string;
  totalQueryFees: string;
  rewardsToFeesRatio: number;
  indexingRewardsPercentage: number;
  queryFeesPercentage: number;
  // Derived from events data
  totalAllocations: number;
  totalStakeDeposited: string;
  totalStakeDelegated: string;
  totalRebatesClaimed: string;
  activeIndexers: number;
  activeDelegators: number;
}

export interface Indexer {
  id: string;
  defaultDisplayName: string;
  stakedTokens: string;
  queryFeesCollected: string;
  rewardsEarned: string;
  rewardsFeesRatio: number;
  efficiency: number;
  status: string;
  // Derived from events
  totalAllocations: number;
  totalStakeDeposited: string;
  totalStakeDelegated: string;
  totalRebatesClaimed: string;
  lastActivity: string;
}

export interface Subgraph {
  id: string;
  displayName: string;
  queryFeesAmount: string;
  indexingRewardAmount: string;
  rewardsFeesRatio: number;
  // Derived from allocation events
  totalAllocations: number;
  totalTokensAllocated: string;
  lastAllocation: string;
}

export interface EpochData {
  id: string;
  totalRewards: string;
  totalQueryFees: string;
  ratio: number;
  // Derived from events
  totalAllocations: number;
  totalStakeDeposited: string;
  totalRebatesClaimed: string;
}

// GraphQL Queries for events-based subgraph
export const NETWORK_METRICS_QUERY = `
  query {
    allocationCreateds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      blockTimestamp
    }
    allocationCollecteds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      curationFees
      rebateFees
      blockTimestamp
    }
    stakeDepositeds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      tokens
      blockTimestamp
    }
    stakeDelegateds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      delegator
      tokens
      shares
      blockTimestamp
    }
    rebateClaimeds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      blockTimestamp
    }
  }
`;

export const TOP_INDEXERS_QUERY = `
  query {
    allocationCollecteds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      curationFees
      rebateFees
      blockTimestamp
    }
    stakeDepositeds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      tokens
      blockTimestamp
    }
    stakeDelegateds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      delegator
      tokens
      shares
      blockTimestamp
    }
  }
`;

export const TOP_SUBGRAPHS_QUERY = `
  query {
    allocationCreateds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      blockTimestamp
    }
    allocationCollecteds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      curationFees
      rebateFees
      blockTimestamp
    }
  }
`;

export const EPOCH_DATA_QUERY = `
  query {
    allocationCreateds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      blockTimestamp
    }
    allocationCollecteds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      subgraphDeploymentID
      tokens
      curationFees
      rebateFees
      blockTimestamp
    }
    stakeDepositeds(first: 1000, orderBy: blockTimestamp, orderDirection: desc) {
      id
      indexer
      tokens
      blockTimestamp
    }
  }
`;

// API Functions
export async function fetchGraphData(query: string, variables?: any) {
  const endpoint = process.env.NEXT_PUBLIC_GRAPH_ENDPOINT;
  if (!endpoint) {
    throw new Error('Graph endpoint not configured');
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      throw new Error(data.errors[0]?.message || 'GraphQL query failed');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getNetworkMetrics(): Promise<NetworkMetrics> {
  try {
    const data = await fetchGraphData(NETWORK_METRICS_QUERY);
    
    // Calculate metrics from events data
    const totalAllocations = data.allocationCreateds.length;
    const totalStakeDeposited = data.stakeDepositeds.reduce((sum: number, event: any) => 
      sum + parseFloat(event.tokens), 0).toString();
    const totalStakeDelegated = data.stakeDelegateds.reduce((sum: number, event: any) => 
      sum + parseFloat(event.tokens), 0).toString();
    const totalRebatesClaimed = data.rebateClaimeds.reduce((sum: number, event: any) => 
      sum + parseFloat(event.tokens), 0).toString();
    
    // Calculate query fees from allocation collections
    const totalQueryFees = data.allocationCollecteds.reduce((sum: number, event: any) => 
      sum + parseFloat(event.curationFees) + parseFloat(event.rebateFees), 0).toString();
    
    // Estimate indexing rewards (this would need to be calculated differently)
    const totalIndexingRewards = "0"; // Would need different data source
    
    const totalRewards = parseFloat(totalIndexingRewards) / 1e18;
    const totalFees = parseFloat(totalQueryFees) / 1e18;
    const totalValue = totalRewards + totalFees;
    
    // Get unique indexers and delegators
    const uniqueIndexers = new Set([
      ...data.allocationCreateds.map((e: any) => e.indexer),
      ...data.stakeDepositeds.map((e: any) => e.indexer)
    ]);
    
    const uniqueDelegators = new Set(
      data.stakeDelegateds.map((e: any) => e.delegator)
    );
    
    return {
      totalIndexingRewards,
      totalQueryFees,
      rewardsToFeesRatio: totalRewards / totalFees || 0,
      indexingRewardsPercentage: totalValue > 0 ? (totalRewards / totalValue) * 100 : 0,
      queryFeesPercentage: totalValue > 0 ? (totalFees / totalValue) * 100 : 0,
      totalAllocations,
      totalStakeDeposited,
      totalStakeDelegated,
      totalRebatesClaimed,
      activeIndexers: uniqueIndexers.size,
      activeDelegators: uniqueDelegators.size,
    };
  } catch (error) {
    console.error('Error fetching network metrics:', error);
    throw error;
  }
}

export async function getTopIndexers(): Promise<Indexer[]> {
  try {
    const data = await fetchGraphData(TOP_INDEXERS_QUERY);
    
    // Group events by indexer
    const indexerData = new Map();
    
    // Process allocation collections
    data.allocationCollecteds.forEach((event: any) => {
      const indexer = event.indexer;
      if (!indexerData.has(indexer)) {
        indexerData.set(indexer, {
          id: indexer,
          queryFeesCollected: "0",
          totalAllocations: 0,
          totalStakeDeposited: "0",
          totalStakeDelegated: "0",
          totalRebatesClaimed: "0",
          lastActivity: "0"
        });
      }
      
      const indexerInfo = indexerData.get(indexer);
      indexerInfo.queryFeesCollected = (parseFloat(indexerInfo.queryFeesCollected) + 
        parseFloat(event.curationFees) + parseFloat(event.rebateFees)).toString();
      indexerInfo.lastActivity = Math.max(indexerInfo.lastActivity, parseInt(event.blockTimestamp));
    });
    
    // Process stake deposits
    data.stakeDepositeds.forEach((event: any) => {
      const indexer = event.indexer;
      if (!indexerData.has(indexer)) {
        indexerData.set(indexer, {
          id: indexer,
          queryFeesCollected: "0",
          totalAllocations: 0,
          totalStakeDeposited: "0",
          totalStakeDelegated: "0",
          totalRebatesClaimed: "0",
          lastActivity: "0"
        });
      }
      
      const indexerInfo = indexerData.get(indexer);
      indexerInfo.totalStakeDeposited = (parseFloat(indexerInfo.totalStakeDeposited) + 
        parseFloat(event.tokens)).toString();
      indexerInfo.lastActivity = Math.max(indexerInfo.lastActivity, parseInt(event.blockTimestamp));
    });
    
    // Process delegations
    data.stakeDelegateds.forEach((event: any) => {
      const indexer = event.indexer;
      if (!indexerData.has(indexer)) {
        indexerData.set(indexer, {
          id: indexer,
          queryFeesCollected: "0",
          totalAllocations: 0,
          totalStakeDeposited: "0",
          totalStakeDelegated: "0",
          totalRebatesClaimed: "0",
          lastActivity: "0"
        });
      }
      
      const indexerInfo = indexerData.get(indexer);
      indexerInfo.totalStakeDelegated = (parseFloat(indexerInfo.totalStakeDelegated) + 
        parseFloat(event.tokens)).toString();
      indexerInfo.lastActivity = Math.max(indexerInfo.lastActivity, parseInt(event.blockTimestamp));
    });
    
    // Convert to array and calculate derived metrics
    return Array.from(indexerData.values())
      .map((indexer: any) => {
        const fees = parseFloat(indexer.queryFeesCollected) / 1e18;
        const staked = parseFloat(indexer.totalStakeDeposited) / 1e18;
        const efficiency = staked > 0 ? (fees / staked) * 100 : 0;
        
        return {
          id: indexer.id,
          defaultDisplayName: indexer.id.slice(0, 8),
          stakedTokens: indexer.totalStakeDeposited,
          queryFeesCollected: indexer.queryFeesCollected,
          rewardsEarned: "0", // Would need different data source
          rewardsFeesRatio: 0, // Would need different data source
          efficiency,
          status: efficiency > 0 ? 'Active' : 'Inactive',
          totalAllocations: indexer.totalAllocations,
          totalStakeDeposited: indexer.totalStakeDeposited,
          totalStakeDelegated: indexer.totalStakeDelegated,
          totalRebatesClaimed: indexer.totalRebatesClaimed,
          lastActivity: new Date(parseInt(indexer.lastActivity) * 1000).toISOString(),
        };
      })
      .sort((a, b) => parseFloat(b.queryFeesCollected) - parseFloat(a.queryFeesCollected))
      .slice(0, 20);
  } catch (error) {
    console.error('Error fetching indexers:', error);
    throw error;
  }
}

export async function getTopSubgraphs(): Promise<Subgraph[]> {
  try {
    const data = await fetchGraphData(TOP_SUBGRAPHS_QUERY);
    
    // Group events by subgraph deployment
    const subgraphData = new Map();
    
    // Process allocation creations
    data.allocationCreateds.forEach((event: any) => {
      const subgraphId = event.subgraphDeploymentID;
      if (!subgraphData.has(subgraphId)) {
        subgraphData.set(subgraphId, {
          id: subgraphId,
          totalAllocations: 0,
          totalTokensAllocated: "0",
          lastAllocation: "0"
        });
      }
      
      const subgraphInfo = subgraphData.get(subgraphId);
      subgraphInfo.totalAllocations += 1;
      subgraphInfo.totalTokensAllocated = (parseFloat(subgraphInfo.totalTokensAllocated) + 
        parseFloat(event.tokens)).toString();
      subgraphInfo.lastAllocation = Math.max(subgraphInfo.lastAllocation, parseInt(event.blockTimestamp));
    });
    
    // Process allocation collections for query fees
    data.allocationCollecteds.forEach((event: any) => {
      const subgraphId = event.subgraphDeploymentID;
      if (!subgraphData.has(subgraphId)) {
        subgraphData.set(subgraphId, {
          id: subgraphId,
          totalAllocations: 0,
          totalTokensAllocated: "0",
          lastAllocation: "0"
        });
      }
      
      const subgraphInfo = subgraphData.get(subgraphId);
      subgraphInfo.lastAllocation = Math.max(subgraphInfo.lastAllocation, parseInt(event.blockTimestamp));
    });
    
    return Array.from(subgraphData.values())
      .map((subgraph: any) => {
        const fees = parseFloat(subgraph.totalTokensAllocated) / 1e18;
        
        return {
          id: subgraph.id,
          displayName: subgraph.id.slice(0, 8),
          queryFeesAmount: subgraph.totalTokensAllocated,
          indexingRewardAmount: "0", // Would need different data source
          rewardsFeesRatio: 0, // Would need different data source
          totalAllocations: subgraph.totalAllocations,
          totalTokensAllocated: subgraph.totalTokensAllocated,
          lastAllocation: new Date(parseInt(subgraph.lastAllocation) * 1000).toISOString(),
        };
      })
      .sort((a, b) => parseFloat(b.queryFeesAmount) - parseFloat(a.queryFeesAmount))
      .slice(0, 20);
  } catch (error) {
    console.error('Error fetching subgraphs:', error);
    throw error;
  }
}

export async function getEpochData(): Promise<EpochData[]> {
  try {
    const data = await fetchGraphData(EPOCH_DATA_QUERY);
    
    // Group events by time periods (simplified epoch calculation)
    const epochData = new Map();
    
    data.allocationCreateds.forEach((event: any) => {
      const timestamp = parseInt(event.blockTimestamp);
      const epoch = Math.floor(timestamp / (7 * 24 * 60 * 60)); // Weekly epochs
      
      if (!epochData.has(epoch)) {
        epochData.set(epoch, {
          id: epoch.toString(),
          totalAllocations: 0,
          totalStakeDeposited: "0",
          totalQueryFees: "0"
        });
      }
      
      const epochInfo = epochData.get(epoch);
      epochInfo.totalAllocations += 1;
    });
    
    data.stakeDepositeds.forEach((event: any) => {
      const timestamp = parseInt(event.blockTimestamp);
      const epoch = Math.floor(timestamp / (7 * 24 * 60 * 60));
      
      if (!epochData.has(epoch)) {
        epochData.set(epoch, {
          id: epoch.toString(),
          totalAllocations: 0,
          totalStakeDeposited: "0",
          totalQueryFees: "0"
        });
      }
      
      const epochInfo = epochData.get(epoch);
      epochInfo.totalStakeDeposited = (parseFloat(epochInfo.totalStakeDeposited) + 
        parseFloat(event.tokens)).toString();
    });
    
    return Array.from(epochData.values())
      .map((epoch: any) => {
        const fees = parseFloat(epoch.totalQueryFees) / 1e18;
        const rewards = 0; // Would need different data source
        
        return {
          id: epoch.id,
          totalRewards: "0",
          totalQueryFees: epoch.totalQueryFees,
          ratio: fees > 0 ? rewards / fees : 0,
          totalAllocations: epoch.totalAllocations,
          totalStakeDeposited: epoch.totalStakeDeposited,
          totalRebatesClaimed: "0",
        };
      })
      .sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .slice(0, 30);
  } catch (error) {
    console.error('Error fetching epoch data:', error);
    throw error;
  }
}

// Helper functions
export function formatNumber(num: string | number): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (n >= 1e6) return `${Math.round(n / 1e6)}M`;
  if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
  return Math.round(n).toString();
}

export function formatGRT(num: string | number): string {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  return `${Math.round(n).toLocaleString()} GRT`;
}

export function formatWeiToGRT(wei: string): string {
  const grt = parseFloat(wei) / 1e18;
  return formatGRT(grt);
}

export function formatPercentage(num: number): string {
  return num.toFixed(2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'text-green-600';
    case 'Inactive':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
}
