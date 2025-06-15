import React, { useState, useEffect, useRef } from 'react';
import ClientOnlyTime from './common/ClientOnlyTime';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, BarChart2, Activity, Clock, Calendar, AlertCircle, RefreshCw } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Map CoinGecko IDs to our token symbols
const symbolToIdMap = {
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'SOL': 'solana',
  'USDT': 'tether',
  'BNB': 'binancecoin',
  'XRP': 'ripple',
  'ADA': 'cardano',
  'DOGE': 'dogecoin',
  'DOT': 'polkadot',
  'SHIB': 'shiba-inu'
};

export default function TokenPriceChart({ symbol, color }) {
  const [chartData, setChartData] = useState(null);
  const [marketData, setMarketData] = useState(null);
  const [timeframe, setTimeframe] = useState('30'); // Default to 30 days
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marketDataError, setMarketDataError] = useState(null);
  const [chartDataError, setChartDataError] = useState(null);

  // Format large numbers with commas and abbreviations
  const formatNumber = (num) => {
    if (num === null || num === undefined) return 'N/A';
    
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

  // Format percentage change
  const formatPercentage = (num) => {
    if (num === null || num === undefined) return 'N/A';
    return (num >= 0 ? '+' : '') + num.toFixed(2) + '%';
  };

  // Function to fetch market data with retry capability
  const fetchMarketData = async () => {
    if (!symbol) return;
    
    setMarketDataError(null);
    
    try {
      // Get the CoinGecko ID for this symbol
      const coinId = symbolToIdMap[symbol.toUpperCase()] || symbol.toLowerCase();
      
      // Add a delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Fetch current market data
      const marketResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`,
        { 
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          timeout: 8000
        }
      );
      
      if (!marketResponse.ok) {
        throw new Error(`Failed to fetch market data: ${marketResponse.status}`);
      }
      
      const marketJson = await marketResponse.json();
      
      if (!marketJson.market_data) {
        throw new Error('Market data not available in response');
      }
      
      // Set market data
      setMarketData({
        currentPrice: marketJson.market_data.current_price.usd,
        marketCap: marketJson.market_data.market_cap.usd,
        volume24h: marketJson.market_data.total_volume.usd,
        high24h: marketJson.market_data.high_24h.usd,
        low24h: marketJson.market_data.low_24h.usd,
        priceChange24h: marketJson.market_data.price_change_percentage_24h,
        priceChange7d: marketJson.market_data.price_change_percentage_7d,
        priceChange30d: marketJson.market_data.price_change_percentage_30d,
        marketCapRank: marketJson.market_cap_rank
      });
    } catch (err) {
      console.error('Error fetching market data:', err);
      setMarketDataError(err.message || 'Failed to load market data');
    }
  };
  
  // Fetch market data only when the symbol changes, not when timeframe changes
  useEffect(() => {
    fetchMarketData();
  }, [symbol]); // Only depends on symbol, not timeframe
  
  // Function to fetch chart data with retry capability
  const fetchChartData = async () => {
    if (!symbol) return;
    
    setLoading(true);
    setChartDataError(null);
    
    try {
      // Get the CoinGecko ID for this symbol
      const coinId = symbolToIdMap[symbol.toUpperCase()] || symbol.toLowerCase();
      
      // Add a delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Fetch market chart data
      const chartResponse = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${timeframe}`,
        { 
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          },
          timeout: 8000
        }
      );
      
      if (!chartResponse.ok) {
        throw new Error(`Failed to fetch chart data: ${chartResponse.status}`);
      }
      
      const chartJson = await chartResponse.json();
      
      if (!chartJson.prices || chartJson.prices.length === 0) {
        throw new Error('No price data available in response');
      }
      
      // Process chart data
      const prices = chartJson.prices.map(price => ({
        timestamp: price[0],
        value: price[1]
      }));
      
      // Format data for Chart.js
      const labels = prices.map(price => {
        const date = new Date(price.timestamp);
        return timeframe === '1' 
          ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      });
      
      const dataPoints = prices.map(price => price.value);
      
      // Set chart data
      setChartData({
        labels,
        datasets: [
          {
            label: `${symbol} Price (USD)`,
            data: dataPoints,
            borderColor: getChartColor(color, false),
            backgroundColor: getChartColor(color, true),
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: getChartColor(color, false),
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
            tension: 0.4,
            fill: true
          }
        ]
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching chart data:', err);
      setChartDataError(err.message || 'Failed to load chart data');
      setLoading(false);
    }
  };
  
  // Fetch chart data when symbol or timeframe changes
  useEffect(() => {
    fetchChartData();
  }, [symbol, timeframe]);
  
  // Get chart color based on token color
  const getChartColor = (tokenColor, isBackground) => {
    const colorMap = {
      blue: isBackground ? 'rgba(59, 130, 246, 0.2)' : 'rgb(59, 130, 246)',
      green: isBackground ? 'rgba(16, 185, 129, 0.2)' : 'rgb(16, 185, 129)',
      red: isBackground ? 'rgba(239, 68, 68, 0.2)' : 'rgb(239, 68, 68)',
      yellow: isBackground ? 'rgba(245, 158, 11, 0.2)' : 'rgb(245, 158, 11)',
      purple: isBackground ? 'rgba(139, 92, 246, 0.2)' : 'rgb(139, 92, 246)',
      pink: isBackground ? 'rgba(236, 72, 153, 0.2)' : 'rgb(236, 72, 153)',
      orange: isBackground ? 'rgba(249, 115, 22, 0.2)' : 'rgb(249, 115, 22)',
      teal: isBackground ? 'rgba(20, 184, 166, 0.2)' : 'rgb(20, 184, 166)'
    };
    
    return colorMap[tokenColor] || (isBackground ? 'rgba(107, 114, 128, 0.2)' : 'rgb(107, 114, 128)');
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(75, 85, 99, 0.3)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
          maxRotation: 0,
          font: {
            size: 10
          },
          maxTicksLimit: 8
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
          padding: 10,
          font: {
            size: 11
          },
          callback: function(value) {
            return '$' + value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
          }
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    },
    elements: {
      point: {
        radius: 0
      }
    }
  };
  
  // Loading indicator
  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-800/30 rounded-xl flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-gray-400 flex items-center"
        >
          <Activity className="w-5 h-5 mr-2" />
          <span>Loading chart data...</span>
        </motion.div>
      </div>
    );
  }
  
  // Error message for chart data
  if (chartDataError && !chartData) {
    return (
      <div className="w-full h-96 bg-gray-800/30 rounded-xl flex flex-col items-center justify-center">
        <div className="text-red-400 text-center p-6">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p className="mb-4">{chartDataError}</p>
          <button 
            onClick={fetchChartData} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry Loading Chart
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {/* Market Data Error State */}
      {marketDataError && (
        <div className="bg-red-900/20 border border-red-800 rounded-xl p-4 mb-4">
          <div className="flex items-center text-red-400 mb-2">
            <AlertCircle className="w-5 h-5 mr-2" />
            <h3 className="font-medium">Market Data Error</h3>
          </div>
          <p className="text-sm text-red-300 mb-3">{marketDataError}</p>
          <button 
            onClick={fetchMarketData} 
            className="px-3 py-1.5 bg-red-700 hover:bg-red-600 text-white rounded-md flex items-center justify-center transition-colors text-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Retry Loading Market Data
          </button>
        </div>
      )}
      
      {/* Market Stats */}
      {marketData && !marketDataError && (
        <>
          {/* Main Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-1">
                <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">Current Price</span>
              </div>
              <div className="text-xl font-bold">
                ${marketData.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </div>
              <div className={`text-xs flex items-center mt-1 ${marketData.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {marketData.priceChange24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {formatPercentage(marketData.priceChange24h)} (24h)
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center mb-1">
                <BarChart2 className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">Market Cap</span>
              </div>
              <div className="text-xl font-bold">
                {formatNumber(marketData.marketCap)}
              </div>
              <div className="flex items-center text-xs text-gray-300 mt-1 bg-gray-700/50 rounded px-2 py-0.5 w-fit">
                <span className="font-semibold text-yellow-400 mr-1">#{marketData.marketCapRank || 'N/A'}</span> Rank
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center mb-1">
                <Activity className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">24h Trading Volume</span>
              </div>
              <div className="text-xl font-bold">
                {formatNumber(marketData.volume24h)}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low: <span className="text-red-400">${marketData.low24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}</span></span>
                <span>High: <span className="text-green-400">${marketData.high24h?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || 'N/A'}</span></span>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <div className="flex items-center mb-1">
                <TrendingUp className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-xs text-gray-400">Price Change</span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <div className="bg-gray-700/50 rounded p-1">
                  <div className="text-xs text-gray-400">7d</div>
                  <div className={`text-sm font-bold ${marketData.priceChange7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercentage(marketData.priceChange7d)}
                  </div>
                </div>
                <div className="bg-gray-700/50 rounded p-1">
                  <div className="text-xs text-gray-400">30d</div>
                  <div className={`text-sm font-bold ${marketData.priceChange30d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatPercentage(marketData.priceChange30d)}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Price Alert Banner - Conditional based on price movement */}
          {Math.abs(marketData.priceChange24h) > 5 && (
            <motion.div 
              className={`mb-4 p-3 rounded-lg border ${marketData.priceChange24h >= 5 ? 'bg-green-900/20 border-green-700' : 'bg-red-900/20 border-red-700'} flex items-center justify-between`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center">
                {marketData.priceChange24h >= 5 ? (
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-2 text-red-400" />
                )}
                <span className="text-sm">
                  <span className="font-bold">{symbol}</span> is {marketData.priceChange24h >= 5 ? 'up' : 'down'} <span className="font-bold">{Math.abs(marketData.priceChange24h).toFixed(1)}%</span> in the last 24 hours
                </span>
              </div>
              <div className="text-xs px-2 py-1 rounded bg-gray-800/50">
                Updated <ClientOnlyTime format="time" />
              </div>
            </motion.div>
          )}
        </>
      )}
      
      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-4">
        {['1', '7', '30', '90', '365', 'max'].map((days) => (
          <button
            key={days}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              timeframe === days 
                ? 'bg-gray-700 text-white' 
                : 'bg-gray-800/30 text-gray-400 hover:bg-gray-700/50 hover:text-gray-300'
            }`}
            onClick={() => setTimeframe(days)}
          >
            {days === '1' ? '1D' : 
             days === '7' ? '1W' : 
             days === '30' ? '1M' : 
             days === '90' ? '3M' : 
             days === '365' ? '1Y' : 'All'}
          </button>
        ))}
      </div>
      
      {/* Chart */}
      <div className="w-full h-96 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
        {chartData && (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
    </div>
  );
}
