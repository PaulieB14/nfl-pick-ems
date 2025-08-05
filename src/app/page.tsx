'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Activity,
  BarChart3,
  PieChart,
  Network,
  Zap,
  Target,
  Calendar,
  Clock,
  User,
  Hash,
  Image as ImageIcon
} from 'lucide-react';
import { 
  NetworkMetrics, 
  Indexer, 
  Subgraph, 
  EpochData,
  getNetworkMetrics,
  getTopIndexers,
  getTopSubgraphs,
  getEpochData,
  formatWeiToGRT,
  formatNumber,
  formatPercentage,
  getStatusColor
} from '@/lib/data';
import { resolveENS, resolveMultipleENS } from '@/lib/ens';
import { ThemeToggle } from '@/components/theme-toggle';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';

export default function Dashboard() {
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics | null>(null);
  const [indexers, setIndexers] = useState<Indexer[]>([]);
  const [subgraphs, setSubgraphs] = useState<Subgraph[]>([]);
  const [epochData, setEpochData] = useState<EpochData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ensNames, setEnsNames] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [metrics, indexersData, subgraphsData, epochDataData] = await Promise.all([
          getNetworkMetrics(),
          getTopIndexers(),
          getTopSubgraphs(),
          getEpochData()
        ]);
        
        setNetworkMetrics(metrics);
        setIndexers(indexersData);
        setSubgraphs(subgraphsData);
        setEpochData(epochDataData);

        // Resolve ENS names for all addresses
        const allAddresses = [
          ...indexersData.map(i => i.id),
          ...subgraphsData.map(s => s.id)
        ];
        
        const resolvedNames = await resolveMultipleENS(allAddresses);
        setEnsNames(resolvedNames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helper function to get display name
  const getDisplayName = (address: string, fallbackName?: string) => {
    const ensName = ensNames.get(address);
    if (ensName && !ensName.includes('...')) {
      return ensName; // Full ENS name
    }
    if (fallbackName) {
      return fallbackName;
    }
    return ensName || `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Helper function to get indexer image - use better fallback
  const getIndexerImage = (indexer: Indexer) => {
    if (indexer.account?.metadata?.image) {
      return indexer.account.metadata.image;
    }
    // Use a simple colored background instead of weird generated avatars
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(indexer.defaultDisplayName || indexer.id.slice(0, 8))}&background=3b82f6&color=fff&size=128&bold=true`;
  };

  // Helper function to get subgraph image - use actual metadata images
  const getSubgraphImage = (subgraph: Subgraph) => {
    // Prioritize actual subgraph images from metadata
    if (subgraph.metadata?.nftImage) {
      return subgraph.metadata.nftImage;
    }
    if (subgraph.metadata?.image) {
      return subgraph.metadata.image;
    }
    // Use a simple colored background as fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(subgraph.displayName.slice(0, 2))}&background=10b981&color=fff&size=128&bold=true`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <p className="text-lg text-gray-600 dark:text-gray-300">Loading Graph Network data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Resolving ENS names and analyzing metrics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900 dark:to-pink-900">
        <div className="text-center">
          <p className="text-red-500 dark:text-red-400 mb-4 text-lg">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!networkMetrics) return null;

  // Simplified epoch display - just show epoch numbers
  const epochToDisplay = (epochNumber: string) => {
    return `Epoch ${epochNumber}`;
  };

  // Prepare chart data with epoch numbers - limit to last 20 epochs for better readability
  const chartData = epochData.slice(-20).map(epoch => ({
    epoch: epoch.id,
    date: epochToDisplay(epoch.id),
    ratio: epoch.ratio,
    rewards: parseFloat(epoch.totalRewards) / 1e18,
    fees: parseFloat(epoch.totalQueryFees) / 1e18,
  }));

  const pieData = [
    { name: 'Indexing Rewards', value: networkMetrics.indexingRewardsPercentage, color: '#3b82f6' },
    { name: 'Query Fees', value: networkMetrics.queryFeesPercentage, color: '#10b981' },
  ];

  // Enhanced indexer data with better context and ENS names - SORTED BY EFFICIENCY
  const indexerAnalysisData = indexers
    .slice(0, 15)
    .map(indexer => {
      const displayName = getDisplayName(indexer.id, indexer.defaultDisplayName);
      const revenueEfficiency = parseFloat(indexer.stakedTokens) > 0 ? 
        (parseFloat(indexer.queryFeesCollected) / parseFloat(indexer.stakedTokens)) * 100 : 0;
      
      return {
        name: displayName,
        originalName: indexer.defaultDisplayName,
        id: indexer.id,
        rewards: parseFloat(indexer.rewardsEarned) / 1e18,
        fees: parseFloat(indexer.queryFeesCollected) / 1e18,
        stake: parseFloat(indexer.stakedTokens) / 1e18,
        ratio: indexer.rewardsFeesRatio,
        efficiency: indexer.efficiency,
        status: indexer.status,
        revenueEfficiency,
        image: getIndexerImage(indexer),
        // Additional comprehensive data
        allocatedTokens: parseFloat(indexer.allocatedTokens) / 1e18,
        delegatedTokens: parseFloat(indexer.delegatedTokens) / 1e18,
        availableStake: parseFloat(indexer.availableStake) / 1e18,
        tokenCapacity: parseFloat(indexer.tokenCapacity) / 1e18,
        ownStakeRatio: indexer.ownStakeRatio,
        delegatedStakeRatio: indexer.delegatedStakeRatio,
        indexingRewardCut: indexer.indexingRewardCut,
        queryFeeCut: indexer.queryFeeCut,
        allocationCount: indexer.allocationCount,
        forcedClosures: indexer.forcedClosures,
      };
    })
    .sort((a, b) => b.revenueEfficiency - a.revenueEfficiency); // Sort by efficiency descending

  // Show full subgraph names and filter out "Unknown" - FIXED NAME DISPLAY
  const subgraphBarData = subgraphs
    .filter(subgraph => subgraph.displayName !== "Unknown")
    .slice(0, 8)
    .map(subgraph => {
      const queryFees = parseFloat(subgraph.queryFeesAmount) / 1e18;
      const indexingRewards = parseFloat(subgraph.indexingRewardAmount) / 1e18;
      
      return {
        name: subgraph.displayName.length > 20 ? subgraph.displayName.slice(0, 20) + "..." : subgraph.displayName,
        fullName: subgraph.displayName, // Keep full name for tooltip
        id: subgraph.id,
        queryFees,
        indexingRewards,
        ratio: subgraph.rewardsFeesRatio,
        image: getSubgraphImage(subgraph),
        displayFees: queryFees,
        // Additional comprehensive data
        stakedTokens: parseFloat(subgraph.stakedTokens) / 1e18,
        signalledTokens: parseFloat(subgraph.signalledTokens) / 1e18,
        signalAmount: parseFloat(subgraph.signalAmount) / 1e18,
        pricePerShare: subgraph.pricePerShare,
        reserveRatio: subgraph.reserveRatio,
        queryFeeRebates: parseFloat(subgraph.queryFeeRebates) / 1e18,
        curatorFeeRewards: parseFloat(subgraph.curatorFeeRewards) / 1e18,
        subgraphCount: subgraph.subgraphCount,
        activeSubgraphCount: subgraph.activeSubgraphCount,
      };
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="mb-8 text-center relative">
          <div className="absolute top-0 right-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Graph Network Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Real-time analysis of Query Fees vs Indexer Rewards with ENS resolution and profile images
          </p>
          <div className="mt-4 flex justify-center space-x-4">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1">
              <Zap className="h-4 w-4 mr-1" />
              Live Data
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1">
              <Target className="h-4 w-4 mr-1" />
              Network Health
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1">
              <Calendar className="h-4 w-4 mr-1" />
              Historical Trends
            </Badge>
            <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1">
              <ImageIcon className="h-4 w-4 mr-1" />
              Profile Images
            </Badge>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Indexing Rewards</CardTitle>
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatWeiToGRT(networkMetrics.totalIndexingRewards)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatPercentage(networkMetrics.indexingRewardsPercentage)}% of total value
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Query Fees</CardTitle>
              <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatWeiToGRT(networkMetrics.totalQueryFees)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatPercentage(networkMetrics.queryFeesPercentage)}% of total value
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Rewards:Fees Ratio</CardTitle>
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{networkMetrics.rewardsToFeesRatio.toFixed(1)}:1</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {networkMetrics.rewardsToFeesRatio > 100 ? 'Heavily subsidized' : 'Balanced'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Network Status</CardTitle>
              <Network className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {networkMetrics.queryFeesPercentage > 5 ? 'Mature' : 'Growing'}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {networkMetrics.queryFeesPercentage > 5 ? 'Organic revenue dominant' : 'Inflation subsidized'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Network Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Indexers</CardTitle>
              <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{networkMetrics.stakedIndexersCount}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                of {networkMetrics.indexerCount} total indexers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Delegators</CardTitle>
              <User className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{networkMetrics.activeDelegatorCount}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                of {networkMetrics.delegatorCount} total delegators
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Active Subgraphs</CardTitle>
              <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{networkMetrics.activeSubgraphCount}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                of {networkMetrics.subgraphCount} total subgraphs
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Staked</CardTitle>
              <Activity className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{formatWeiToGRT(networkMetrics.totalTokensStaked)}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatWeiToGRT(networkMetrics.totalTokensAllocated)} allocated
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Network Distribution Pie Chart - FIXED LAYOUT */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <PieChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Network Value Distribution
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Breakdown of total network value between indexing rewards and query fees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 pb-12">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="35%"
                      outerRadius={70}
                      innerRadius={40}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${formatPercentage(value)}%`}
                      labelLine={{ stroke: '#6b7280', strokeWidth: 1 }}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => `${formatPercentage(value)}%`}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        color: '#000'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Historical Trends with Epoch Numbers */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600 dark:text-green-400" />
                Rewards:Fees Ratio Over Time
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Historical trend of the rewards to fees ratio across recent epochs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                    <XAxis 
                      dataKey="date" 
                      stroke="#6b7280"
                      className="dark:text-gray-300"
                      interval="preserveStartEnd"
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis stroke="#6b7280" className="dark:text-gray-300" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        color: '#000'
                      }}
                      labelFormatter={(label) => `Epoch: ${label}`}
                      formatter={(value, name) => [
                        `${value.toFixed(1)}:1`,
                        'Rewards:Fees Ratio'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ratio" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Improved Indexer Performance Analysis with Images - SORTED BY EFFICIENCY */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <Target className="h-5 w-5 mr-2 text-purple-600 dark:text-purple-400" />
              Top Indexers by Revenue Efficiency
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Indexers ranked by their ability to generate query fees relative to their stake (most efficient first)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {indexerAnalysisData.slice(0, 10).map((indexer, index) => (
                <div key={indexer.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200' :
                      index === 1 ? 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-200' :
                      index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200' :
                      'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img 
                          src={indexer.image} 
                          alt={indexer.name}
                          className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-gray-600 object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(indexer.originalName || indexer.id.slice(0, 8))}&background=3b82f6&color=fff&size=128&bold=true`;
                          }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {indexer.originalName ? (
                            <span>
                              {indexer.name} 
                              <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                                ({indexer.originalName})
                              </span>
                            </span>
                          ) : (
                            <span>
                              {indexer.name}
                              <Hash className="h-3 w-3 inline ml-1 text-gray-400" />
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{indexer.id}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {formatNumber(indexer.fees)} GRT fees
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatPercentage(indexer.revenueEfficiency)}% efficiency
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {formatNumber(indexer.stake)} GRT staked
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {indexer.allocationCount} allocations
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Subgraphs Bar Chart with Images - SHOW FULL NAMES */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900 dark:text-white">
              <BarChart3 className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Top Subgraphs by Query Fees
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Subgraphs generating the most organic revenue with their rewards/fees ratios and profile images
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subgraphBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-600" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    className="dark:text-gray-300"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis stroke="#6b7280" className="dark:text-gray-300" tickFormatter={(value) => formatNumber(value)} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      color: '#000'
                    }}
                    formatter={(value, name) => [
                      `${formatNumber(value)} GRT`,
                      name === 'queryFees' ? 'Query Fees' : 'Indexing Rewards'
                    ]}
                    labelFormatter={(label) => {
                      const data = subgraphBarData.find(d => d.name === label);
                      return data?.fullName || label;
                    }}
                  />
                  <Bar dataKey="queryFees" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="indexingRewards" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Subgraph Images Grid - SHOW FULL NAMES */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {subgraphBarData.slice(0, 8).map((subgraph, index) => (
                <div key={subgraph.id} className="flex flex-col items-center space-y-2">
                  <div className="relative">
                    <img 
                      src={subgraph.image} 
                      alt={subgraph.fullName}
                      className="w-16 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(subgraph.fullName.slice(0, 2))}&background=10b981&color=fff&size=128&bold=true`;
                      }}
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-24">
                      {subgraph.fullName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(subgraph.displayFees)} GRT
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
