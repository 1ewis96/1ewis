import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function SingleTokenPrice({ tokenId = 'bitcoin', currency = 'usd' }) {
  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Mock data for demonstration
  const mockData = {
    bitcoin: {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 42569.23,
      price_change_percentage_24h: 2.45,
      last_updated: new Date().toISOString()
    },
    ethereum: {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2345.67,
      price_change_percentage_24h: -1.23,
      last_updated: new Date().toISOString()
    },
    solana: {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 134.56,
      price_change_percentage_24h: 5.67,
      last_updated: new Date().toISOString()
    },
    cardano: {
      id: 'cardano',
      symbol: 'ada',
      name: 'Cardano',
      image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      current_price: 0.45,
      price_change_percentage_24h: -0.78,
      last_updated: new Date().toISOString()
    },
    ripple: {
      id: 'ripple',
      symbol: 'xrp',
      name: 'XRP',
      image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
      current_price: 0.56,
      price_change_percentage_24h: 1.23,
      last_updated: new Date().toISOString()
    }
  };

  // Fetch token data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real implementation, you would fetch from an API like:
        // const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${tokenId}`);
        // const data = await response.json();
        
        // Using mock data for now
        setTimeout(() => {
          if (mockData[tokenId]) {
            setTokenData(mockData[tokenId]);
            setLastUpdated(new Date());
          } else {
            setError('Token not found');
          }
          setLoading(false);
        }, 800);
      } catch (error) {
        setError('Failed to fetch token data');
        setLoading(false);
      }
    };

    fetchData();
  }, [tokenId, currency]);

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 1000) {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: currency.toUpperCase(),
        maximumFractionDigits: 2
      });
    } else {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });
    }
  };

  // Format percentage
  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate price change
      if (tokenData) {
        const randomChange = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
        const newPrice = tokenData.current_price * (1 + randomChange / 100);
        
        setTokenData({
          ...tokenData,
          current_price: newPrice,
          price_change_percentage_24h: tokenData.price_change_percentage_24h + randomChange,
          last_updated: new Date().toISOString()
        });
        
        setLastUpdated(new Date());
      }
      setLoading(false);
    }, 800);
  };

  // Get time since last update
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return '';
    
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Live Token Price</h3>
        <button 
          onClick={handleRefresh}
          disabled={loading}
          className={`p-2 rounded-full ${loading ? 'bg-gray-800 text-gray-600' : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="p-4">
        {error ? (
          <div className="text-center py-6 text-red-400">
            <p>{error}</p>
          </div>
        ) : loading && !tokenData ? (
          <div className="animate-pulse space-y-4 py-2">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-gray-800 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-800 rounded w-1/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
              </div>
              <div className="h-10 bg-gray-800 rounded w-1/4"></div>
            </div>
          </div>
        ) : tokenData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
          >
            <div className="flex items-center flex-1">
              {/* Token icon */}
              <div className="mr-3 flex-shrink-0">
                <img 
                  src={tokenData.image} 
                  alt={tokenData.name} 
                  className="w-12 h-12 rounded-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/48?text=' + tokenData.symbol.toUpperCase();
                  }}
                />
              </div>
              
              {/* Token info */}
              <div className="flex-1">
                <h4 className="font-medium text-white text-lg">{tokenData.name}</h4>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 uppercase mr-2">{tokenData.symbol}</span>
                  <span className="text-xs text-gray-500">{getTimeSinceUpdate()}</span>
                </div>
              </div>
            </div>
            
            {/* Price info */}
            <div className="text-right">
              <div className="text-xl font-bold text-white">
                {formatCurrency(tokenData.current_price)}
              </div>
              <div className={`flex items-center justify-end text-sm ${
                tokenData.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {tokenData.price_change_percentage_24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {formatPercentage(tokenData.price_change_percentage_24h)}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
