export interface NetworkMetrics {
  totalIndexingRewards: string;
  totalQueryFees: string;
  rewardsToFeesRatio: number;
  indexingRewardsPercentage: number;
  queryFeesPercentage: number;
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
}

// GraphQL Queries
export const NETWORK_METRICS_QUERY = `
  query {
    graphNetworks(first: 1) {
      totalIndexingRewards
      totalQueryFees
    }
  }
`;

export const TOP_INDEXERS_QUERY = `
  query {
    indexers(first: 20, orderBy: queryFeesCollected, orderDirection: desc) {
      id
      defaultDisplayName
      stakedTokens
      queryFeesCollected
      rewardsEarned
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
      queryFeesAmount
      indexingRewardAmount
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

// New query to get subgraph metadata by IPFS hashes
export const SUBGRAPH_METADATA_QUERY = `
  query($ids: [String!]) {
    subgraphDeployments(where: { ipfsHash_in: $ids }) {
      id
      ipfsHash
      versions(orderBy: version, orderDirection: desc) {
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
    epochs(first: 20, orderBy: id, orderDirection: desc) {
      id
      totalRewards
      totalQueryFees
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
    };
  } catch (error) {
    console.error('Error fetching network metrics:', error);
    // Fallback data
    return {
      totalIndexingRewards: "1000000000000000000000000",
      totalQueryFees: "50000000000000000000000",
      rewardsToFeesRatio: 20,
      indexingRewardsPercentage: 95.2,
      queryFeesPercentage: 4.8,
    };
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
      };
    });
  } catch (error) {
    console.error('Error fetching indexers:', error);
    // Fallback data
    return [
      {
        id: "0x1234567890123456789012345678901234567890",
        defaultDisplayName: "streamingfastindexer.eth",
        stakedTokens: "1000000000000000000000000",
        queryFeesCollected: "50000000000000000000000",
        rewardsEarned: "1000000000000000000000000",
        rewardsFeesRatio: 20,
        efficiency: 5,
        status: "Heavily Subsidized",
        account: {
          metadata: {
            image: "https://picsum.photos/200/200?random=1"
          }
        }
      },
      {
        id: "0x2345678901234567890123456789012345678901",
        defaultDisplayName: "figment.eth",
        stakedTokens: "800000000000000000000000",
        queryFeesCollected: "40000000000000000000000",
        rewardsEarned: "800000000000000000000000",
        rewardsFeesRatio: 20,
        efficiency: 5,
        status: "Heavily Subsidized",
        account: {
          metadata: {
            image: "https://picsum.photos/200/200?random=2"
          }
        }
      }
    ];
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
        metadata: metadata ? {
          image: metadata.image,
          nftImage: metadata.nftImage,
        } : undefined,
      };
    });
  } catch (error) {
    console.error('Error fetching subgraphs:', error);
    // Fallback data with better names
    return [
      {
        id: "0x1234567890123456789012345678901234567890",
        displayName: "Uniswap V3",
        queryFeesAmount: "10000000000000000000000",
        indexingRewardAmount: "200000000000000000000000",
        rewardsFeesRatio: 20,
        metadata: {
          image: "https://picsum.photos/200/200?random=3",
          nftImage: "https://picsum.photos/200/200?random=4"
        }
      },
      {
        id: "0x2345678901234567890123456789012345678901",
        displayName: "ENS",
        queryFeesAmount: "8000000000000000000000",
        indexingRewardAmount: "160000000000000000000000",
        rewardsFeesRatio: 20,
        metadata: {
          image: "https://picsum.photos/200/200?random=5",
          nftImage: "https://picsum.photos/200/200?random=6"
        }
      }
    ];
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
      };
    });
  } catch (error) {
    console.error('Error fetching epoch data:', error);
    // Fallback data
    return Array.from({ length: 20 }, (_, i) => ({
      id: (1000 - i).toString(),
      totalRewards: "100000000000000000000000",
      totalQueryFees: "5000000000000000000000",
      ratio: 20 + Math.random() * 5,
    }));
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
