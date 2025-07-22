'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Moon, Sun, TrendingUp, DollarSign, Users, Database } from 'lucide-react';
import { useTheme } from 'next-themes';
import { 
  NetworkMetrics, 
  Indexer, 
  Subgraph, 
  EpochData,
  getNetworkMetrics, 
  getTopIndexers, 
  getTopSubgraphs, 
  getEpochData,
  formatNumber,
  formatGRT,
  formatPercentage
} from '@/lib/data';

export default function Dashboard() {
  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics | null>(null);
  const [indexers, setIndexers] = useState<Indexer[]>([]);
  const [subgraphs, setSubgraphs] = useState<Subgraph[]>([]);
  const [epochData, setEpochData] = useState<EpochData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function fetchData() {
      try {
        const [metrics, indexersData, subgraphsData, epochDataResult] = await Promise.all([
          getNetworkMetrics(),
          getTopIndexers(),
          getTopSubgraphs(),
          getEpochData(),
        ]);

        setNetworkMetrics(metrics);
        setIndexers(indexersData);
        setSubgraphs(subgraphsData);
        setEpochData(epochDataResult);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const getDisplayName = (id: string) => {
    return id.length > 10 ? `${id.slice(0, 6)}...${id.slice(-4)}` : id;
  };

  const getIndexerImage = (id: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(id)}&background=random&size=64`;
  };

  const getSubgraphImage = (id: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(id)}&background=random&size=64`;
  };

  const epochToDisplay = (epoch: number) => `Epoch ${epoch}`;

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Graph Network Analytics</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Query Fees vs Indexer Rewards Analysis</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="self-end sm:self-auto"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Network Overview */}
        {networkMetrics && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Query Fees</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{formatGRT(networkMetrics.totalQueryFees)} GRT</div>
                <p className="text-xs text-muted-foreground">Network-wide query fees</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Total Indexing Rewards</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{formatGRT(networkMetrics.totalIndexingRewards)} GRT</div>
                <p className="text-xs text-muted-foreground">Network-wide indexing rewards</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Rewards:Fees Ratio</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{formatPercentage(networkMetrics.rewardsToFeesRatio)}</div>
                <p className="text-xs text-muted-foreground">Efficiency metric</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs sm:text-sm font-medium">Active Indexers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{networkMetrics.totalIndexers || 150}</div>
                <p className="text-xs text-muted-foreground">Network participants</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Historical Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Historical Trends</CardTitle>
              <CardDescription className="text-sm">Query fees vs indexing rewards over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <AreaChart data={epochData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="epoch" 
                    tickFormatter={epochToDisplay}
                    fontSize={10}
                    className="text-xs"
                  />
                  <YAxis fontSize={10} className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [formatNumber(value), 'GRT']}
                    labelFormatter={epochToDisplay}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="queryFees" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    name="Query Fees"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="indexingRewards" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    name="Indexing Rewards"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Subgraphs by Query Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Top Subgraphs by Query Fees</CardTitle>
              <CardDescription className="text-sm">Most queried subgraphs in the network</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <BarChart data={subgraphs.slice(0, 6)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="displayName" 
                    fontSize={8}
                    className="text-xs"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis fontSize={10} className="text-xs" />
                  <Tooltip 
                    formatter={(value: string) => [formatGRT(value), 'GRT']}
                    labelFormatter={(label) => `Subgraph: ${label}`}
                    contentStyle={{ fontSize: '12px' }}
                  />
                  <Bar dataKey="queryFeesAmount" fill="#8884d8" name="Query Fees" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Indexer Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Indexer Revenue Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Indexer Revenue Efficiency</CardTitle>
              <CardDescription className="text-sm">Top indexers by rewards to fees ratio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {indexers
                  .sort((a, b) => b.rewardsFeesRatio - a.rewardsFeesRatio)
                  .slice(0, 8)
                  .map((indexer, index) => (
                    <div key={indexer.id} className="flex items-center space-x-3 sm:space-x-4">
                      <img
                        src={getIndexerImage(indexer.id)}
                        alt={getDisplayName(indexer.id)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm sm:text-base truncate">{getDisplayName(indexer.id)}</span>
                          <Badge variant="outline" className="text-xs sm:text-sm ml-2 flex-shrink-0">
                            {formatPercentage(indexer.rewardsFeesRatio)}
                          </Badge>
                        </div>
                        <Progress 
                          value={indexer.rewardsFeesRatio * 100} 
                          className="mt-1 sm:mt-2"
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Network Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Network Distribution</CardTitle>
              <CardDescription className="text-sm">Query fees vs indexing rewards breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Query Fees', value: parseFloat(networkMetrics?.totalQueryFees || '0') / 1e18 },
                      { name: 'Indexing Rewards', value: parseFloat(networkMetrics?.totalIndexingRewards || '0') / 1e18 }
                    ]}
                    cx="50%"
                    cy="40%"
                    outerRadius={60}
                    className="sm:outerRadius={80}"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatNumber(value), 'GRT']}
                    contentStyle={{ fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
