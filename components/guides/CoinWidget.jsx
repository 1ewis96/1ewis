import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/router';

const CoinWidget = ({ coinId }) => {
  const router = useRouter();
  const [coinData, setCoinData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [shouldShow, setShouldShow] = useState(true);
  
  // Navigate to token page
  const navigateToTokenPage = (e) => {
    // Don't navigate if clicking on the refresh button
    if (e.target.closest('button')) {
      return;
    }
    
    router.push(`/token/${coinId}`);
  };

  const fetchCoinData = async () => {
    if (!coinId) {
      setShouldShow(false);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      // Use the actual API endpoint
      const response = await fetch(`https://api.1ewis.com/token/${coinId}`);
      const data = await response.json();
      
      if (data.message === 'error' || !data.data) {
        console.error('API returned error:', data.error || 'Unknown error');
        setShouldShow(false);
        setLoading(false);
        return;
      }
      
      // Transform API response to match our component's expected format
      const tokenData = data.data;
      const transformedData = {
        id: tokenData.coin,
        name: tokenData.coinFullName,
        symbol: tokenData.coin.toUpperCase(),
        current_price: tokenData.price,
        price_change_percentage_24h: tokenData.priceChange24h,
        market_cap: tokenData.marketCap,
        total_volume: tokenData.totalVolume,
        image: tokenData.tokenImage,
        last_updated: tokenData.priceUpdatedAt
      };
      
      setCoinData(transformedData);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      console.error('Error fetching coin data:', err);
      setError('Failed to load coin data');
      setShouldShow(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchCoinData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [coinId]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000000000) {
      return '$' + (num / 1000000000000).toFixed(2) + 'T';
    } else if (num >= 1000000000) {
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

  // Format time since last update
  const getTimeSinceUpdate = () => {
    if (!lastUpdated) return '';
    
    const seconds = Math.floor((new Date() - lastUpdated) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  // If we shouldn't show the widget, return null
  if (!shouldShow) {
    return null;
  }

  return (
    <div 
      onClick={navigateToTokenPage}
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/80 shadow-lg overflow-hidden cursor-pointer hover:border-yellow-700/50 transition-all duration-300 group relative"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            {coinData?.name || 'Crypto'} Price
          </h3>
          <ExternalLink className="h-3.5 w-3.5 ml-1.5 text-yellow-500/70 group-hover:text-yellow-400 transition-colors" />
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Prevent widget click event
            fetchCoinData();
          }} 
          className="text-gray-400 hover:text-gray-300 transition-colors z-10"
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      <div className="h-px w-full bg-gradient-to-r from-yellow-800/50 to-transparent mb-3"></div>
      
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="animate-pulse text-gray-400">Loading...</div>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-400 text-sm">{error}</p>
          <button 
            onClick={fetchCoinData}
            className="mt-2 text-xs text-blue-400 hover:text-blue-300"
          >
            Try again
          </button>
        </div>
      ) : coinData && (
        <>
          <div className="flex items-center mb-4">
            <img 
              src={coinData.image || `https://s3.1ewis.com/tokens/${coinData.id}.png`} 
              alt={coinData.name} 
              className="w-10 h-10 mr-3 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://s3.1ewis.com/tokens/default-token.png';
              }}
            />
            <div>
              <h4 className="font-bold text-white">{coinData.name}</h4>
              <span className="text-xs text-gray-400">{coinData.symbol}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-end mb-4">
            <div className="text-2xl font-bold text-white">
              {formatPrice(coinData.current_price)}
            </div>
            <div className={`flex items-center text-sm ${coinData.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {coinData.price_change_percentage_24h >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(coinData.price_change_percentage_24h).toFixed(2)}%
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-400">Market Cap</div>
              <div className="text-gray-300">{formatNumber(coinData.market_cap)}</div>
            </div>
            <div>
              <div className="text-gray-400">Volume (24h)</div>
              <div className="text-gray-300">{formatNumber(coinData.total_volume)}</div>
            </div>
          </div>
          
          <div className="mt-3 text-right">
            <span className="text-xs text-gray-500">Updated {getTimeSinceUpdate()}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CoinWidget;
