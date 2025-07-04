import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Search, Eye, ShoppingCart, Filter, TrendingUp, Wallet, BarChart3, RefreshCw, Info, AlertCircle } from 'lucide-react';
import Footer from '../../components/Footer';
import ParticleBackground from '../../components/ParticleBackground';

// Market Statistics Component
const MarketStatistics = ({ stats, lastUpdated, isLoading }) => {
  // Format the last updated time
  const formatLastUpdated = (timestamp) => {
    if (!timestamp) return 'Not available';
    
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Market Statistics</h2>
          <div className="text-xs text-gray-400 flex items-center">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            Loading data...
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="bg-gray-800/80 p-3 rounded-lg border border-gray-700/50">
              <div className="flex items-center mb-2">
                <div className="p-2 rounded-full bg-gray-700/50 mr-2 animate-pulse">
                  <div className="w-4 h-4"></div>
                </div>
                <div className="h-4 bg-gray-700/50 rounded w-20 animate-pulse"></div>
              </div>
              <div className="h-6 bg-gray-700/50 rounded w-24 animate-pulse mb-2"></div>
              <div className="h-4 bg-gray-700/50 rounded w-16 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 mb-6 border border-gray-700/50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Market Statistics</h2>
        {lastUpdated && (
          <div className="text-xs text-gray-400 flex items-center">
            <RefreshCw className="w-3 h-3 mr-1" />
            Last updated: {formatLastUpdated(lastUpdated)}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800/80 p-3 rounded-lg border border-gray-700/50">
            <div className="flex items-center mb-2">
              <div className={`p-2 rounded-full ${stat.bgColor} mr-2`}>
                {stat.icon}
              </div>
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <div className="text-white font-medium">{stat.value}</div>
            {stat.change && (
              <div className={`text-xs flex items-center mt-1 ${stat.change.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
                {stat.change.startsWith('-') ? <ArrowDown className="w-3 h-3 mr-1" /> : <ArrowUp className="w-3 h-3 mr-1" />}
                {stat.change} (24h)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Filter Component - Now only shows All Tokens
const TokenFilters = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="px-3 py-1.5 text-sm rounded-full bg-blue-600 text-white">
        All Tokens
      </div>
    </div>
  );
};

export default function TokensPage() {
  // Promoted coin data
  const promotedCoin = {
    id: '1ewis-coin',
    rank: '1ewis',
    name: '1ewis Coin',
    symbol: '1EWIS',
    price: 9.99,
    priceChange24h: 15.7,
    marketCap: 99000000,
    volume24h: 7500000,
    image: 'https://s3.1ewis.com/tokens/1ewis.png'
  };
  
  // State for sorting and pagination
  const [sortBy, setSortBy] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [tokens, setTokens] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: '$0',
    totalVolume: '$0',
    btcDominance: '0%',
    ethGas: '0 Gwei',
    lastUpdatedAt: null
  });
  const [marketStatsLoading, setMarketStatsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const tokensPerPage = 50;
  
  // Market statistics data
  const marketStatsList = [
    {
      label: 'Total Market Cap',
      value: marketStats.totalMarketCap,
      icon: <BarChart3 className="w-4 h-4 text-blue-400" />,
      bgColor: 'bg-blue-500/20'
    },
    {
      label: '24h Volume',
      value: marketStats.totalVolume,
      icon: <TrendingUp className="w-4 h-4 text-green-400" />,
      bgColor: 'bg-green-500/20'
    },
    {
      label: 'BTC Dominance',
      value: marketStats.btcDominance,
      icon: <Wallet className="w-4 h-4 text-yellow-400" />,
      bgColor: 'bg-yellow-500/20'
    },
    {
      label: 'ETH Gas',
      value: marketStats.ethGas,
      icon: <BarChart3 className="w-4 h-4 text-purple-400" />,
      bgColor: 'bg-purple-500/20'
    }
  ];
  
  // Format large numbers with abbreviations
  const formatLargeNumber = (num) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  // Fetch market overview data
  const fetchMarketOverview = async () => {
    try {
      setMarketStatsLoading(true);
      const response = await fetch('https://api.1ewis.com/tokens/overview');
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Format the data for display
      setMarketStats({
        totalMarketCap: formatLargeNumber(data.totalMarketCap),
        totalVolume: formatLargeNumber(data.totalVolume24h),
        btcDominance: `${data.btcDominance.toFixed(2)}%`,
        ethGas: `${data.ethGas.toFixed(2)} Gwei`,
        lastUpdatedAt: new Date(data.lastUpdatedAt)
      });
    } catch (err) {
      console.error('Error fetching market overview:', err);
    } finally {
      setMarketStatsLoading(false);
    }
  };

  // Fetch initial token data
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.1ewis.com/tokens/market-cap');
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to match our component's expected format
        const transformedTokens = data.items.map((item, index) => ({
          id: item.coin,
          rank: index + 1,
          name: item.coinFullName,
          symbol: item.coin.toUpperCase(),
          price: item.price,
          priceChange24h: item.priceChange24h,
          marketCap: item.marketCap,
          volume24h: item.totalVolume,
          image: item.tokenImage || `https://s3.1ewis.com/tokens/${item.coin.toLowerCase()}.png`
        }));
        
        setTokens(transformedTokens);
        setNextToken(data.nextToken || null);

        // Also fetch market overview data
        fetchMarketOverview();
      } catch (err) {
        console.error('Error fetching token data:', err);
        setError('Failed to load token data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTokens();
  }, []);

  // Load more tokens using nextToken
  const loadMore = async () => {
    if (!nextToken || loading) return;
    
    try {
      setLoading(true);
      const response = await fetch(`https://api.1ewis.com/tokens/market-cap?nextToken=${encodeURIComponent(nextToken)}`);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform and append new tokens
      const currentLength = tokens.length;
      const transformedTokens = data.items.map((item, index) => ({
        id: item.coin,
        rank: currentLength + index + 1,
        name: item.coinFullName,
        symbol: item.coin.toUpperCase(),
        price: item.price,
        priceChange24h: item.priceChange24h,
        marketCap: item.marketCap,
        volume24h: item.totalVolume,
        image: item.tokenImage || `https://s3.1ewis.com/tokens/${item.coin.toLowerCase()}.png`
      }));
      
      setTokens(prevTokens => [...prevTokens, ...transformedTokens]);
      setNextToken(data.nextToken || null);
    } catch (err) {
      console.error('Error loading more tokens:', err);
      // We don't set the error state here to avoid clearing existing tokens
    } finally {
      setLoading(false);
    }
  };

  // Format large numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return '$' + (num / 1000000000).toFixed(2) + 'B';
    } else if (num >= 1000000) {
      return '$' + (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return '$' + (num / 1000).toFixed(2) + 'K';
    } else {
      return '$' + num.toFixed(2);
    }
  };

  // Format price with appropriate precision
  const formatPrice = (price) => {
    if (price < 0.01) return '$' + price.toFixed(6);
    if (price < 1) return '$' + price.toFixed(4);
    if (price < 10) return '$' + price.toFixed(3);
    if (price < 1000) return '$' + price.toFixed(2);
    return '$' + price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };
  
  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new column and default to ascending
      setSortBy(column);
      setSortDirection('asc');
    }
  };
  
  // Function to refresh market data
  const refreshMarketData = async () => {
    setIsRefreshing(true);
    try {
      // Fetch updated market overview data
      await fetchMarketOverview();
      
      // Also refresh token data
      const response = await fetch('https://api.1ewis.com/tokens/market-cap');
      if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      
      const transformedTokens = data.items.map((item, index) => ({
        id: item.coin,
        rank: index + 1,
        name: item.coinFullName,
        symbol: item.coin.toUpperCase(),
        price: item.price,
        priceChange24h: item.priceChange24h,
        marketCap: item.marketCap,
        volume24h: item.totalVolume,
        image: item.tokenImage || `https://s3.1ewis.com/tokens/${item.coin.toLowerCase()}.png`
      }));
      
      setTokens(transformedTokens);
      setNextToken(data.nextToken || null);
    } catch (err) {
      console.error('Error refreshing data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Filter tokens based on search query
  const filteredTokens = tokens.filter(token => {
    // Apply search filter
    const searchLower = searchQuery.toLowerCase();
    return !searchQuery || (
      token.name.toLowerCase().includes(searchLower) ||
      token.symbol.toLowerCase().includes(searchLower)
    );
  });
  
  // Sort filtered tokens
  const sortedTokens = [...filteredTokens].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'rank':
        comparison = a.rank - b.rank;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'priceChange24h':
        comparison = a.priceChange24h - b.priceChange24h;
        break;
      case 'marketCap':
        comparison = a.marketCap - b.marketCap;
        break;
      case 'volume24h':
        comparison = a.volume24h - b.volume24h;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  // Pagination logic
  const indexOfLastToken = currentPage * tokensPerPage;
  const indexOfFirstToken = indexOfLastToken - tokensPerPage;
  const currentTokens = sortedTokens.slice(indexOfFirstToken, indexOfLastToken);
  const totalPages = Math.ceil(sortedTokens.length / tokensPerPage);
  
  // Auto-load more tokens when approaching the end
  useEffect(() => {
    // If we're within 2 pages of the end and there are more tokens to load
    if (nextToken && !loading && currentPage >= totalPages - 2) {
      loadMore();
    }
  }, [currentPage, totalPages, nextToken, loading]);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <ParticleBackground 
        count={70} 
        colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981']} 
        minOpacity={0.1} 
        maxOpacity={0.3} 
        blur={2}
      />
      <Head>
        <title>Cryptocurrency Tokens | 1ewis</title>
        <meta name="description" content="Browse and search for cryptocurrency tokens, view market data, prices, and trading information." />
      </Head>
      
      <main className="container mx-auto px-4 pt-24 pb-8 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Tokens</h1>
          <button 
            onClick={refreshMarketData}
            className="flex items-center mt-2 md:mt-0 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Market Statistics */}
        <MarketStatistics stats={marketStatsList} lastUpdated={marketStats.lastUpdatedAt} isLoading={marketStatsLoading} />

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <TokenFilters />
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search tokens..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tokens table */}
        {loading && tokens.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            {/* Desktop view - skeleton loading */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="bg-gray-800/50">
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">#</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h %</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Market Cap</th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Volume (24h)</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/20 divide-y divide-gray-700">
                  {/* Skeleton rows */}
                  {[...Array(10)].map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="h-4 w-6 bg-gray-700/50 rounded"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-6 w-6 bg-gray-700/50 rounded-full mr-2"></div>
                          <div>
                            <div className="h-4 w-24 bg-gray-700/50 rounded mb-1"></div>
                            <div className="h-3 w-12 bg-gray-700/50 rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="h-4 w-16 bg-gray-700/50 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="h-4 w-14 bg-gray-700/50 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="h-4 w-20 bg-gray-700/50 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className="h-4 w-20 bg-gray-700/50 rounded ml-auto"></div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center space-x-2">
                          <div className="h-6 w-14 bg-gray-700/50 rounded"></div>
                          <div className="h-6 w-14 bg-gray-700/50 rounded"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Mobile view - skeleton loading */}
            <div className="md:hidden">
              {/* Skeleton cards */}
              {[...Array(5)].map((_, index) => (
                <div key={index} className="border-b border-gray-700 p-4 animate-pulse">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gray-700/50 rounded-full mr-2"></div>
                      <div>
                        <div className="h-4 w-24 bg-gray-700/50 rounded mb-1"></div>
                        <div className="h-3 w-12 bg-gray-700/50 rounded"></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="h-4 w-16 bg-gray-700/50 rounded mb-1 ml-auto"></div>
                      <div className="h-3 w-14 bg-gray-700/50 rounded ml-auto"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="h-3 w-16 bg-gray-700/50 rounded mb-1"></div>
                      <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                    </div>
                    <div>
                      <div className="h-3 w-16 bg-gray-700/50 rounded mb-1"></div>
                      <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-3">
                    <div className="h-3 w-6 bg-gray-700/50 rounded"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                      <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : error && tokens.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden p-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : sortedTokens.length === 0 ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden p-8">
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-400">No tokens found matching your search.</p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            {/* Desktop view - table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr className="bg-gray-800/50">
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('rank')}
                  >
                    # {sortBy === 'rank' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('name')}
                  >
                    Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('price')}
                  >
                    Price {sortBy === 'price' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('priceChange24h')}
                  >
                    24h % {sortBy === 'priceChange24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('marketCap')}
                  >
                    Market Cap {sortBy === 'marketCap' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:text-white"
                    onClick={() => handleSort('volume24h')}
                  >
                    Volume (24h) {sortBy === 'volume24h' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    scope="col" 
                    className="px-4 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/20 divide-y divide-gray-700">
                {/* Advertisement slot - promoting the ad space itself */}
                <tr className="relative">
                  <td colSpan="7" className="p-0">
                    <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-yellow-500/50 rounded-lg m-2 overflow-hidden relative">
                      <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-black font-bold px-2 py-0.5 rounded-bl">YOUR AD HERE</div>
                      <div className="flex items-center p-4">
                        {/* Ad info section */}
                        <div className="flex items-center flex-1">
                          <div className="flex-shrink-0 h-12 w-12 mr-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-0.5 flex items-center justify-center">
                            <span className="text-black font-bold text-xl">AD</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="text-lg font-bold text-white">Advertise Your Token Here</h3>
                              <span className="ml-2 text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-full">PREMIUM SPOT</span>
                            </div>
                            <p className="text-sm text-yellow-300 mt-1 max-w-md">Reach thousands of potential investors daily. Premium placement at the top of our token listings.</p>
                            <div className="flex items-center mt-2 space-x-6 text-sm">
                              <div>
                                <span className="text-gray-400">Visibility:</span>
                                <span className="ml-1 text-white font-medium">100% of visitors</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Position:</span>
                                <span className="ml-1 text-white font-medium">Top of page</span>
                              </div>
                              <div>
                                <span className="text-gray-400">Audience:</span>
                                <span className="ml-1 text-white font-medium">Crypto investors</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* CTA section */}
                        <div className="flex flex-col items-center space-y-2 ml-4">
                          <Link 
                            href="/advertise"
                            className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500 text-sm font-bold text-black hover:bg-yellow-400 transition-colors duration-200 shadow-lg shadow-yellow-500/20"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Rates
                          </Link>
                          <Link 
                            href="/advertise/purchase"
                            className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500 text-sm font-bold text-black hover:bg-yellow-400 transition-colors duration-200 shadow-lg shadow-yellow-500/20 animate-pulse"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                {currentTokens.map((token) => (
                  <tr key={token.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-300">{token.rank}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link href={`/token/${token.symbol.toLowerCase()}`} className="flex items-center">
                        <img src={token.image} alt={token.name} className="w-6 h-6 mr-2 rounded-full" />
                        <div>
                          <div className="font-medium text-white">{token.name}</div>
                          <div className="text-xs text-gray-400">{token.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-white">
                      {formatPrice(token.price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.priceChange24h >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(token.priceChange24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                      {formatNumber(token.marketCap)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right text-gray-300">
                      {formatNumber(token.volume24h)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                      <div className="flex justify-center space-x-2">
                        <Link 
                          href={`/token/${token.symbol.toLowerCase()}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-blue-500 text-xs font-medium rounded text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white transition-colors duration-200"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Link>
                        <Link 
                          href={`/buy/${token.symbol.toLowerCase()}`}
                          className="inline-flex items-center px-2.5 py-1.5 border border-green-500 text-xs font-medium rounded text-green-500 bg-transparent hover:bg-green-500 hover:text-white transition-colors duration-200"
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Buy
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            
            {/* Mobile view - cards */}
            <div className="md:hidden">
              {/* Advertisement slot for mobile */}
              <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-yellow-500/50 rounded-lg m-2 overflow-hidden relative p-4">
                <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-black font-bold px-2 py-0.5 rounded-bl">YOUR AD HERE</div>
                <div className="flex-shrink-0 h-12 w-12 mb-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-0.5 flex items-center justify-center">
                  <span className="text-black font-bold text-xl">AD</span>
                </div>
                <h3 className="text-lg font-bold text-white flex items-center">
                  Advertise Your Token Here
                  <span className="ml-2 text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-full">PREMIUM</span>
                </h3>
                <p className="text-sm text-yellow-300 mt-1">Reach thousands of potential investors daily.</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Link 
                    href="/advertise"
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full bg-yellow-500 text-sm font-bold text-black hover:bg-yellow-400 transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Rates
                  </Link>
                  <Link 
                    href="/advertise/purchase"
                    className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-full bg-yellow-500 text-sm font-bold text-black hover:bg-yellow-400 transition-colors duration-200 animate-pulse"
                  >
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Book Now
                  </Link>
                </div>
              </div>
              
              {/* Token cards */}
              {currentTokens.map((token) => (
                <div key={token.id} className="border-b border-gray-700 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/token/${token.symbol.toLowerCase()}`} className="flex items-center">
                      <img src={token.image} alt={token.name} className="w-8 h-8 mr-2 rounded-full" />
                      <div>
                        <div className="font-medium text-white">{token.name}</div>
                        <div className="text-xs text-gray-400">{token.symbol}</div>
                      </div>
                    </Link>
                    <div className="text-right">
                      <div className="font-medium text-white">{formatPrice(token.price)}</div>
                      <div className={`text-xs flex items-center justify-end ${token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {token.priceChange24h >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                        {Math.abs(token.priceChange24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-400">Market Cap</div>
                      <div className="text-gray-300">{formatNumber(token.marketCap)}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Volume (24h)</div>
                      <div className="text-gray-300">{formatNumber(token.volume24h)}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-3">
                    <div className="text-xs text-gray-400">#{token.rank}</div>
                    <div className="flex space-x-2">
                      <Link 
                        href={`/token/${token.symbol.toLowerCase()}`}
                        className="inline-flex items-center px-2 py-1 text-xs rounded bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 transition-colors"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Details
                      </Link>
                      <Link 
                        href={`/trade/${token.symbol.toLowerCase()}`}
                        className="inline-flex items-center px-2 py-1 text-xs rounded bg-green-600/30 text-green-400 hover:bg-green-600/50 transition-colors"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Trade
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 py-4 bg-gray-800/30 border-t border-gray-700">
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                Prev
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 rounded ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
              >
                Next
              </button>
            </div>
          )}
          
          {/* Loading indicator for automatic pagination */}
          {loading && tokens.length > 0 && nextToken && (
            <div className="bg-gray-800/30 border-t border-gray-700">
              {/* Desktop view - skeleton loading for pagination */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full">
                  <tbody className="bg-gray-800/20">
                    {/* Skeleton rows */}
                    {[...Array(3)].map((_, index) => (
                      <tr key={index} className="animate-pulse border-b border-gray-700/50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="h-4 w-6 bg-gray-700/50 rounded"></div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-6 w-6 bg-gray-700/50 rounded-full mr-2"></div>
                            <div>
                              <div className="h-4 w-24 bg-gray-700/50 rounded mb-1"></div>
                              <div className="h-3 w-12 bg-gray-700/50 rounded"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="h-4 w-16 bg-gray-700/50 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="h-4 w-14 bg-gray-700/50 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="h-4 w-20 bg-gray-700/50 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-right">
                          <div className="h-4 w-20 bg-gray-700/50 rounded ml-auto"></div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center space-x-2">
                            <div className="h-6 w-14 bg-gray-700/50 rounded"></div>
                            <div className="h-6 w-14 bg-gray-700/50 rounded"></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile view - skeleton loading for pagination */}
              <div className="md:hidden">
                {/* Skeleton cards */}
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="border-b border-gray-700 p-4 animate-pulse">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="h-8 w-8 bg-gray-700/50 rounded-full mr-2"></div>
                        <div>
                          <div className="h-4 w-24 bg-gray-700/50 rounded mb-1"></div>
                          <div className="h-3 w-12 bg-gray-700/50 rounded"></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 w-16 bg-gray-700/50 rounded mb-1 ml-auto"></div>
                        <div className="h-3 w-14 bg-gray-700/50 rounded ml-auto"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="h-3 w-16 bg-gray-700/50 rounded mb-1"></div>
                        <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                      </div>
                      <div>
                        <div className="h-3 w-16 bg-gray-700/50 rounded mb-1"></div>
                        <div className="h-4 w-20 bg-gray-700/50 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-3">
                      <div className="h-3 w-6 bg-gray-700/50 rounded"></div>
                      <div className="flex space-x-2">
                        <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                        <div className="h-6 w-16 bg-gray-700/50 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
