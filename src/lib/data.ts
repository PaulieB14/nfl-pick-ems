export interface NetworkMetrics {
  totalIndexingRewards: string;
  totalQueryFees: string;
  rewardsToFeesRatio: number;
  indexingRewardsPercentage: number;
  queryFeesPercentage: number;
  // Additional metrics from the comprehensive subgraph
  totalIndexerQueryFeesCollected: string;
  totalIndexerQueryFeeRebates: string;
  totalDelegatorQueryFeeRebates: string;
  totalCuratorQueryFees: string;
  totalTaxedQueryFees: string;
  totalUnclaimedQueryFeeRebates: string;
  totalIndexingDelegatorRewards: string;
  totalIndexingIndexerRewards: string;
  indexerCount: number;
  stakedIndexersCount: number;
  delegatorCount: number;
  activeDelegatorCount: number;
  curatorCount: number;
  activeCuratorCount: number;
  subgraphCount: number;
  activeSubgraphCount: number;
  subgraphDeploymentCount: number;
  totalTokensStaked: string;
  totalTokensAllocated: string;
  totalDelegatedTokens: string;
  totalTokensSignalled: string;
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
  // Additional fields from comprehensive subgraph
  allocatedTokens: string;
  delegatedTokens: string;
  availableStake: string;
  tokenCapacity: string;
  delegatedCapacity: string;
  ownStakeRatio: number;
  delegatedStakeRatio: number;
  indexingRewardCut: number;
  queryFeeCut: number;
  indexerIndexingRewards: string;
  delegatorIndexingRewards: string;
  queryFeeRebates: string;
  delegatorQueryFees: string;
  allocationCount: number;
  totalAllocationCount: number;
  forcedClosures: number;
  account?: {
    metadata?: {
      image?: string;
    };
  };
}

export interface Subgraph {
  id: string;
  displayName: string;
  queryFeesAmount: string;
  indexingRewardAmount: string;
  rewardsFeesRatio: number;
  // Additional fields from comprehensive subgraph
  stakedTokens: string;
  signalledTokens: string;
  signalAmount: string;
  pricePerShare: number;
  reserveRatio: number;
  queryFeeRebates: string;
  curatorFeeRewards: string;
  indexingIndexerRewardAmount: string;
  indexingDelegatorRewardAmount: string;
  subgraphCount: number;
  activeSubgraphCount: number;
  metadata?: {
    image?: string;
    nftImage?: string;
  };
}

export interface EpochData {
  id: string;
  totalRewards: string;
  totalQueryFees: string;
  ratio: number;
  // Additional fields from comprehensive subgraph
  startBlock: number;
  endBlock: number;
  signalledTokens: string;
  stakeDeposited: string;
  taxedQueryFees: string;
  queryFeesCollected: string;
  curatorQueryFees: string;
  queryFeeRebates: string;
  totalIndexerRewards: string;
  totalDelegatorRewards: string;
}

// Improved GraphQL Queries using the comprehensive Graph Network subgraph
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

export const TOP_INDEXERS_QUERY = `
  query {
    indexers(first: 20, orderBy: queryFeesCollected, orderDirection: desc) {
      id
      defaultDisplayName
      stakedTokens
      allocatedTokens
      delegatedTokens
      availableStake
      tokenCapacity
      delegatedCapacity
      ownStakeRatio
      delegatedStakeRatio
      indexingRewardCut
      queryFeeCut
      queryFeesCollected
      queryFeeRebates
      delegatorQueryFees
      rewardsEarned
      indexerIndexingRewards
      delegatorIndexingRewards
      allocationCount
      totalAllocationCount
      forcedClosures
      account {
        metadata {
          image
        }
      }
    }
  }
`;

export const TOP_SUBGRAPHS_QUERY = `
  query {
    subgraphDeployments(first: 20, orderBy: queryFeesAmount, orderDirection: desc) {
      id
      ipfsHash
      stakedTokens
      signalledTokens
      signalAmount
      pricePerShare
      reserveRatio
      queryFeesAmount
      queryFeeRebates
      curatorFeeRewards
      indexingRewardAmount
      indexingIndexerRewardAmount
      indexingDelegatorRewardAmount
      subgraphCount
      activeSubgraphCount
      versions(orderBy: version, orderDirection: desc, first: 1) {
        version
        metadata {
          label
        }
        subgraph {
          metadata {
            displayName
            image
            nftImage
          }
        }
      }
    }
  }
`;

export const EPOCH_DATA_QUERY = `
  query {
    epochs(first: 30, orderBy: id, orderDirection: desc) {
      id
      startBlock
      endBlock
      signalledTokens
      stakeDeposited
      totalQueryFees
      taxedQueryFees
      queryFeesCollected
      curatorQueryFees
      queryFeeRebates
      totalRewards
      totalIndexerRewards
      totalDelegatorRewards
    }
  }
`;

// New query to get subgraph metadata by IPFS hashes
export const SUBGRAPH_METADATA_QUERY = `
  query($ids: [String!]) {
    subgraphDeployments(where: { ipfsHash_in: $ids }) {
      id
      ipfsHash
      versions(orderBy: version, orderDirection: desc, first: 1) {
        version
        metadata {
          label
        }
        subgraph {
          metadata {
            displayName
            image
            nftImage
          }
        }
      }
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
    const network = data.graphNetworks[0];
    
    const totalRewards = parseFloat(network.totalIndexingRewards) / 1e18;
    const totalFees = parseFloat(network.totalQueryFees) / 1e18;
    const totalValue = totalRewards + totalFees;
    
    return {
      totalIndexingRewards: network.totalIndexingRewards,
      totalQueryFees: network.totalQueryFees,
      rewardsToFeesRatio: totalRewards / totalFees,
      indexingRewardsPercentage: (totalRewards / totalValue) * 100,
      queryFeesPercentage: (totalFees / totalValue) * 100,
      // Additional metrics from the comprehensive subgraph
      totalIndexerQueryFeesCollected: network.totalIndexerQueryFeesCollected || "0",
      totalIndexerQueryFeeRebates: network.totalIndexerQueryFeeRebates || "0",
      totalDelegatorQueryFeeRebates: network.totalDelegatorQueryFeeRebates || "0",
      totalCuratorQueryFees: network.totalCuratorQueryFees || "0",
      totalTaxedQueryFees: network.totalTaxedQueryFees || "0",
      totalUnclaimedQueryFeeRebates: network.totalUnclaimedQueryFeeRebates || "0",
      totalIndexingDelegatorRewards: network.totalIndexingDelegatorRewards || "0",
      totalIndexingIndexerRewards: network.totalIndexingIndexerRewards || "0",
      indexerCount: network.indexerCount || 0,
      stakedIndexersCount: network.stakedIndexersCount || 0,
      delegatorCount: network.delegatorCount || 0,
      activeDelegatorCount: network.activeDelegatorCount || 0,
      curatorCount: network.curatorCount || 0,
      activeCuratorCount: network.activeCuratorCount || 0,
      subgraphCount: network.subgraphCount || 0,
      activeSubgraphCount: network.activeSubgraphCount || 0,
      subgraphDeploymentCount: network.subgraphDeploymentCount || 0,
      totalTokensStaked: network.totalTokensStaked || "0",
      totalTokensAllocated: network.totalTokensAllocated || "0",
      totalDelegatedTokens: network.totalDelegatedTokens || "0",
      totalTokensSignalled: network.totalTokensSignalled || "0",
    };
  } catch (error) {
    console.error('Error fetching network metrics:', error);
    throw error;
  }
}

export async function getTopIndexers(): Promise<Indexer[]> {
  try {
    const data = await fetchGraphData(TOP_INDEXERS_QUERY);
    return data.indexers.map((indexer: any) => {
      const fees = parseFloat(indexer.queryFeesCollected) / 1e18;
      const rewards = parseFloat(indexer.rewardsEarned) / 1e18;
      const ratio = rewards / fees;
      const efficiency = parseFloat(indexer.stakedTokens) > 0 ? 
        (fees / (parseFloat(indexer.stakedTokens) / 1e18)) * 100 : 0;
      
      return {
        id: indexer.id,
        defaultDisplayName: indexer.defaultDisplayName || indexer.id.slice(0, 8),
        stakedTokens: indexer.stakedTokens,
        queryFeesCollected: indexer.queryFeesCollected,
        rewardsEarned: indexer.rewardsEarned,
        rewardsFeesRatio: ratio,
        efficiency,
        status: ratio > 100 ? 'Heavily Subsidized' : 'Balanced',
        account: indexer.account,
        // Additional fields from comprehensive subgraph
        allocatedTokens: indexer.allocatedTokens || "0",
        delegatedTokens: indexer.delegatedTokens || "0",
        availableStake: indexer.availableStake || "0",
        tokenCapacity: indexer.tokenCapacity || "0",
        delegatedCapacity: indexer.delegatedCapacity || "0",
        ownStakeRatio: parseFloat(indexer.ownStakeRatio) || 0,
        delegatedStakeRatio: parseFloat(indexer.delegatedStakeRatio) || 0,
        indexingRewardCut: indexer.indexingRewardCut || 0,
        queryFeeCut: indexer.queryFeeCut || 0,
        indexerIndexingRewards: indexer.indexerIndexingRewards || "0",
        delegatorIndexingRewards: indexer.delegatorIndexingRewards || "0",
        queryFeeRebates: indexer.queryFeeRebates || "0",
        delegatorQueryFees: indexer.delegatorQueryFees || "0",
        allocationCount: indexer.allocationCount || 0,
        totalAllocationCount: indexer.totalAllocationCount || 0,
        forcedClosures: indexer.forcedClosures || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching indexers:', error);
    throw error;
  }
}

export async function getTopSubgraphs(): Promise<Subgraph[]> {
  try {
    const data = await fetchGraphData(TOP_SUBGRAPHS_QUERY);
    const deployments = data.subgraphDeployments;
    
    // Extract IPFS hashes for metadata lookup
    const ipfsHashes = deployments.map((d: any) => d.ipfsHash);
    
    // Get detailed metadata for these subgraphs
    let metadataMap = new Map();
    try {
      const metadataData = await fetchGraphData(SUBGRAPH_METADATA_QUERY, { ids: ipfsHashes });
      metadataData.subgraphDeployments.forEach((deployment: any) => {
        const version = deployment.versions[0];
        const subgraph = version?.subgraph;
        const metadata = subgraph?.metadata;
        metadataMap.set(deployment.ipfsHash, {
          displayName: metadata?.displayName || version?.metadata?.label || deployment.ipfsHash,
          image: metadata?.image,
          nftImage: metadata?.nftImage,
        });
      });
    } catch (metadataError) {
      console.warn('Failed to fetch subgraph metadata:', metadataError);
    }
    
    return deployments.map((deployment: any) => {
      const metadata = metadataMap.get(deployment.ipfsHash);
      
      // Use metadata if available, otherwise fallback
      let displayName = "Unknown";
      if (metadata?.displayName) {
        displayName = metadata.displayName;
      } else {
        const version = deployment.versions[0];
        const subgraph = version?.subgraph;
        const subgraphMetadata = subgraph?.metadata;
        
        if (subgraphMetadata?.displayName) {
          displayName = subgraphMetadata.displayName;
        } else if (version?.metadata?.label) {
          displayName = version.metadata.label;
        } else {
          displayName = deployment.ipfsHash;
        }
      }

      const fees = parseFloat(deployment.queryFeesAmount) / 1e18;
      const rewards = parseFloat(deployment.indexingRewardAmount) / 1e18;
      const ratio = rewards / fees;

      return {
        id: deployment.id,
        displayName,
        queryFeesAmount: deployment.queryFeesAmount,
        indexingRewardAmount: deployment.indexingRewardAmount,
        rewardsFeesRatio: ratio,
        // Additional fields from comprehensive subgraph
        stakedTokens: deployment.stakedTokens || "0",
        signalledTokens: deployment.signalledTokens || "0",
        signalAmount: deployment.signalAmount || "0",
        pricePerShare: parseFloat(deployment.pricePerShare) || 0,
        reserveRatio: deployment.reserveRatio || 0,
        queryFeeRebates: deployment.queryFeeRebates || "0",
        curatorFeeRewards: deployment.curatorFeeRewards || "0",
        indexingIndexerRewardAmount: deployment.indexingIndexerRewardAmount || "0",
        indexingDelegatorRewardAmount: deployment.indexingDelegatorRewardAmount || "0",
        subgraphCount: deployment.subgraphCount || 0,
        activeSubgraphCount: deployment.activeSubgraphCount || 0,
        metadata: metadata ? {
          image: metadata.image,
          nftImage: metadata.nftImage,
        } : undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching subgraphs:', error);
    throw error;
  }
}

export async function getEpochData(): Promise<EpochData[]> {
  try {
    const data = await fetchGraphData(EPOCH_DATA_QUERY);
    return data.epochs.map((epoch: any) => {
      const rewards = parseFloat(epoch.totalRewards) / 1e18;
      const fees = parseFloat(epoch.totalQueryFees) / 1e18;
      const ratio = rewards / fees;
      
      return {
        id: epoch.id,
        totalRewards: epoch.totalRewards,
        totalQueryFees: epoch.totalQueryFees,
        ratio,
        // Additional fields from comprehensive subgraph
        startBlock: epoch.startBlock || 0,
        endBlock: epoch.endBlock || 0,
        signalledTokens: epoch.signalledTokens || "0",
        stakeDeposited: epoch.stakeDeposited || "0",
        taxedQueryFees: epoch.taxedQueryFees || "0",
        queryFeesCollected: epoch.queryFeesCollected || "0",
        curatorQueryFees: epoch.curatorQueryFees || "0",
        queryFeeRebates: epoch.queryFeeRebates || "0",
        totalIndexerRewards: epoch.totalIndexerRewards || "0",
        totalDelegatorRewards: epoch.totalDelegatorRewards || "0",
      };
    });
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
    case 'Heavily Subsidized':
      return 'text-orange-600';
    case 'Balanced':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}
