import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Facebook, Linkedin, Copy, Check, Eye, ShoppingCart, ArrowRight, ArrowUp, ArrowDown, Twitter, X } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../../components/Footer';
import referralLinks from '../../data/referralLinks.json';
import { Line } from 'react-chartjs-2';
import ParticleBackground from '../../components/ParticleBackground';
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

// Custom Price Chart Component with real data
const CustomPriceChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({ labels: [], prices: [], volumes: [], marketCaps: [] });
  const [timeframe, setTimeframe] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showVolume, setShowVolume] = useState(false);
  const [showMarketCap, setShowMarketCap] = useState(false);
  
  useEffect(() => {
    const fetchChartData = async () => {
      if (!symbol) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://api.1ewis.com/token/data/${symbol.toLowerCase()}?timeframe=${timeframe}`);
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.message && data.message === "No historical data found for this coin") {
          setError("No historical data available for this token");
          setChartData({ labels: [], prices: [], volumes: [] });
        } else {
          // Process the historical data
          const labels = data.map(item => {
            const date = new Date(item.timestamp);
            return timeframe === 'all' || timeframe === '1y' 
              ? date.toLocaleDateString() 
              : `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
          });
          
          const prices = data.map(item => item.price);
          const volumes = data.map(item => item.totalVolume);
          const marketCaps = data.map(item => item.marketCap);
          
          setChartData({ labels, prices, volumes, marketCaps });
        }
      } catch (err) {
        console.error('Failed to fetch chart data:', err);
        setError("Failed to load chart data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchChartData();
  }, [symbol, timeframe]);
  
  // Add a plugin to draw the watermark
  const watermarkPlugin = {
    id: 'watermark',
    afterDraw: (chart) => {
      const { ctx, width, height } = chart;
      
      // Save the current state
      ctx.save();
      
      // Position in top right with padding
      const fontSize = 16;
      ctx.font = `bold ${fontSize}px Arial`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      
      // Create gradient for the text
      const gradient = ctx.createLinearGradient(width - 150, 20, width - 10, 20);
      gradient.addColorStop(0, 'rgba(96, 165, 250, 0.6)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.6)');
      gradient.addColorStop(1, 'rgba(236, 72, 153, 0.6)');
      
      ctx.fillStyle = gradient;
      ctx.fillText('1ewis.com', width - 15, 15);
      
      // Restore the state
      ctx.restore();
    }
  };
  
  // Register the plugin
  ChartJS.register(watermarkPlugin);
  
  // Chart options and data
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          borderColor: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 10
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          borderColor: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 10
          },
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        },
        title: {
          display: true,
          text: 'Price ($)',
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 10
          }
        }
      },
      y1: {
        type: 'linear',
        display: showVolume || showMarketCap,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 10
          },
          callback: function(value) {
            if (value >= 1000000000) {
              return '$' + (value / 1000000000).toFixed(1) + 'B';
            } else if (value >= 1000000) {
              return '$' + (value / 1000000).toFixed(1) + 'M';
            } else if (value >= 1000) {
              return '$' + (value / 1000).toFixed(1) + 'K';
            } else {
              return '$' + value;
            }
          }
        },
        title: {
          display: true,
          text: showMarketCap && showVolume ? 'Volume / Market Cap' : 
                showMarketCap ? 'Market Cap' : 'Volume',
          color: 'rgba(156, 163, 175, 0.8)',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#e5e7eb',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `$${parseFloat(context.raw).toLocaleString()}`;
          },
          title: function(context) {
            return `${symbol} - ${context[0].label}`;
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4
      }
    }
  };
  
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${symbol} Price`,
        data: chartData.prices,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 2,
        yAxisID: 'y'
      },
      ...(showVolume && chartData.volumes.length > 0 ? [{
        label: `${symbol} Volume`,
        data: chartData.volumes,
        borderColor: 'rgba(139, 92, 246, 0.8)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        yAxisID: 'y1',
        order: 1
      }] : []),
      ...(showMarketCap && chartData.marketCaps.length > 0 ? [{
        label: `${symbol} Market Cap`,
        data: chartData.marketCaps,
        borderColor: 'rgba(16, 185, 129, 0.8)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 1.5,
        pointRadius: 0,
        fill: false,
        yAxisID: 'y1',
        order: 2
      }] : [])
    ]
  };
  
  // Handle timeframe button click
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">Price Chart</h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex space-x-1">
            <button 
              onClick={() => handleTimeframeChange('7d')} 
              className={`px-3 py-1 text-xs rounded-md ${timeframe === '7d' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              7D
            </button>
            <button 
              onClick={() => handleTimeframeChange('30d')} 
              className={`px-3 py-1 text-xs rounded-md ${timeframe === '30d' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              30D
            </button>
            <button 
              onClick={() => handleTimeframeChange('1y')} 
              className={`px-3 py-1 text-xs rounded-md ${timeframe === '1y' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              1Y
            </button>
            <button 
              onClick={() => handleTimeframeChange('all')} 
              className={`px-3 py-1 text-xs rounded-md ${timeframe === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              ALL
            </button>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => setShowVolume(!showVolume)} 
              className={`px-3 py-1 text-xs rounded-md ${showVolume ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {showVolume ? '✓ Volume' : 'Volume'}
            </button>
            <button 
              onClick={() => setShowMarketCap(!showMarketCap)} 
              className={`px-3 py-1 text-xs rounded-md ${showMarketCap ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {showMarketCap ? '✓ Market Cap' : 'Market Cap'}
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow bg-gray-900/70 rounded-lg overflow-hidden relative p-4">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading chart data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <p className="text-gray-400 text-sm">Try another timeframe or check back later</p>
            </div>
          </div>
        ) : (
          <Line options={options} data={data} />
        )}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        {!isLoading && !error && chartData.volumes.length > 0 && (
          <div>Volume: ${chartData.volumes[chartData.volumes.length - 1].toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
        )}
        <div>Updated: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>
  );
};

export default function TokenPage() {
  const router = useRouter();
  const { symbol } = router.query;
  const [loading, setLoading] = useState(true);
  const [tokenData, setTokenData] = useState(null);
  const [error, setError] = useState(null);
  const [redirectCountdown, setRedirectCountdown] = useState(null);
  const [copied, setCopied] = useState(false);
  const [relatedTokens, setRelatedTokens] = useState([]);
  const [relatedGuides, setRelatedGuides] = useState([]);

  useEffect(() => {
    const fetchTokenData = async () => {
      if (!symbol) return;
      
      try {
        setLoading(true);
        const response = await fetch(`https://api.1ewis.com/token/${symbol.toLowerCase()}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError(`Token ${symbol.toUpperCase()} not found. Redirecting to tokens list...`);
            let count = 3;
            setRedirectCountdown(count);
            
            const countdownInterval = setInterval(() => {
              count -= 1;
              setRedirectCountdown(count);
              
              if (count <= 0) {
                clearInterval(countdownInterval);
                router.push('/tokens');
              }
            }, 1000);
            
            return;
          }
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const responseData = await response.json();
        setTokenData(responseData.data);
        
        // Fetch tokens for discovery section - random selection each time
        try {
          const relatedResponse = await fetch('https://api.1ewis.com/tokens/market-cap?limit=20');
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            // Filter out the current token
            const filteredTokens = relatedData.items
              .filter(item => item.coin.toLowerCase() !== symbol.toLowerCase());
            
            // Randomly select 4 tokens
            const randomTokens = [];
            const tokensCopy = [...filteredTokens];
            
            // Get 4 random tokens or all available if less than 4
            const count = Math.min(4, tokensCopy.length);
            for (let i = 0; i < count; i++) {
              const randomIndex = Math.floor(Math.random() * tokensCopy.length);
              const randomToken = tokensCopy.splice(randomIndex, 1)[0];
              randomTokens.push({
                id: randomToken.coin,
                name: randomToken.coinFullName,
                symbol: randomToken.coin.toUpperCase(),
                price: randomToken.price,
                image: randomToken.tokenImage || `https://s3.1ewis.com/tokens/${randomToken.coin.toLowerCase()}.png`
              });
            }
            
            setRelatedTokens(randomTokens);
          }
        } catch (error) {
          console.error('Failed to fetch related tokens:', error);
        }
        
        // Fetch related guides for the token
        try {
          const guidesResponse = await fetch(`https://api.1ewis.com/guides/search?q=${symbol.toLowerCase()}`);
          if (guidesResponse.ok) {
            const guidesData = await guidesResponse.json();
            // Take up to 4 guides
            const guides = guidesData.results.slice(0, 4);
            setRelatedGuides(guides);
          }
        } catch (error) {
          console.error('Failed to fetch related guides:', error);
        }
      } catch (err) {
        setError(`Failed to load token data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTokenData();
  }, [symbol, router]);
  
  // Redirect to tokens page after 3 seconds if there's an error
  useEffect(() => {
    if (error) {
      const redirectTimer = setTimeout(() => {
        router.push('/tokens');
      }, 3000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [error, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
        <ParticleBackground 
          count={70} 
          colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981']} 
          minOpacity={0.1} 
          maxOpacity={0.3} 
          blur={2}
        />
        <div className="container mx-auto px-4 pt-24 pb-4">
          {/* Back Button */}
          <div className="flex items-center mb-8">
            <div className="flex items-center text-gray-400">
              <ArrowLeft className="mr-2 w-4 h-4" /> 
              <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Hero Section - Skeleton */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Left Column - Token Info */}
              <div className="flex items-center mb-6 md:mb-0">
                <div className="mr-4">
                  <div className="w-16 h-16 rounded-full bg-gray-700/50 animate-pulse"></div>
                </div>
                <div>
                  <div className="h-8 w-48 bg-gray-700/50 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Right Column - Price Info */}
              <div className="flex flex-col items-end">
                <div className="h-8 w-32 bg-gray-700/50 rounded mb-2 animate-pulse"></div>
                <div className="h-6 w-24 bg-gray-700/50 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons - Skeleton */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-28 bg-gray-700/50 rounded-lg animate-pulse"></div>
            ))}
          </div>
          
          {/* Chart Section - Skeleton */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 w-32 bg-gray-700/50 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-16 bg-gray-700/50 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="h-64 w-full bg-gray-700/30 rounded-lg animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Chart Loading...</div>
            </div>
          </div>
          
          {/* Token Stats - Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4 animate-pulse">
                <div className="h-4 w-24 bg-gray-700/50 rounded mb-2"></div>
                <div className="h-6 w-32 bg-gray-700/50 rounded"></div>
              </div>
            ))}
          </div>
          
          {/* About Section - Skeleton */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-6 mb-8">
            <div className="h-6 w-32 bg-gray-700/50 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-700/50 rounded"></div>
              <div className="h-4 w-full bg-gray-700/50 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-700/50 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-700/50 rounded"></div>
              <div className="h-4 w-full bg-gray-700/50 rounded"></div>
            </div>
          </div>
          
          {/* Related Tokens - Skeleton */}
          <div className="mb-8">
            <div className="h-6 w-48 bg-gray-700/50 rounded mb-4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4 animate-pulse">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 bg-gray-700/50 rounded-full mr-3"></div>
                    <div>
                      <div className="h-5 w-20 bg-gray-700/50 rounded mb-1"></div>
                      <div className="h-4 w-12 bg-gray-700/50 rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 w-24 bg-gray-700/50 rounded mb-3"></div>
                  <div className="h-8 w-full bg-gray-700/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Related Guides - Skeleton */}
          <div className="mb-8">
            <div className="h-6 w-48 bg-gray-700/50 rounded mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4 animate-pulse">
                  <div className="h-6 w-3/4 bg-gray-700/50 rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-gray-700/50 rounded mb-3"></div>
                  <div className="h-4 w-24 bg-gray-700/50 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
        <ParticleBackground 
          count={70} 
          colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981']} 
          minOpacity={0.1} 
          maxOpacity={0.3} 
          blur={2}
        />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-xl text-red-400 mb-4">{error}</div>
          <p className="text-gray-400 mb-6">Redirecting to tokens page in 3 seconds...</p>
          <button 
            onClick={() => router.push('/tokens')}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Tokens
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white relative overflow-hidden">
      <ParticleBackground 
        count={70} 
        colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981']} 
        minOpacity={0.1} 
        maxOpacity={0.3} 
        blur={2}
      />
      <Head>
        <title>{symbol?.toUpperCase() || 'Token'} | 1ewis</title>
        <meta name="description" content={`${symbol?.toUpperCase() || 'Token'} price, charts, and trading information on 1ewis`} />
      </Head>
      
      <div className="container mx-auto px-4 pt-24 pb-4">
        {/* Back Button */}
        <div className="flex items-center mb-8">
          <Link href="/tokens" className="flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Tokens
          </Link>
        </div>
        
        {/* Hero Section */}
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            {/* Left Column - Token Info */}
            <div className="flex items-center mb-6 md:mb-0">
              {tokenData?.tokenImage && (
                <div className="mr-4">
                  <img 
                    src={tokenData.tokenImage} 
                    alt={tokenData?.coinFullName || symbol?.toUpperCase()} 
                    className="w-16 h-16 rounded-full"
                  />
                </div>
              )}
              <div>
                <div className="inline-block px-3 py-1 rounded-full mb-2 bg-gradient-to-r from-blue-600/20 to-blue-900/10 border border-blue-700/30 text-blue-400 text-sm">
                  {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}
                </div>
                <h1 className="text-2xl md:text-4xl font-bold">
                  {tokenData?.coinFullName || `${symbol?.toUpperCase()} Token`}
                </h1>
              </div>
            </div>
            
            {/* Right Column - Buy & Stake Buttons */}
            <div className="flex space-x-3">
              <a 
                href={referralLinks.exchanges.bittrue.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Buy {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
              
              <a 
                href={referralLinks.wallets.youhodler.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors border border-blue-500/30"
              >
                Stake {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}
                <ExternalLink className="ml-2 w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Price Stats Panel */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Token Statistics</h2>
            <div className="flex items-center mt-2 md:mt-0">
              <div className="bg-gray-900/50 rounded-full px-4 py-1 border border-green-500/30 flex items-center">
                <div className="mr-2">
                  <div className="text-xs text-gray-400">Trust Score</div>
                  <div className="font-bold text-green-400">90/100</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center text-xs font-bold">90</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-1">Current Price</h3>
              <div className="text-2xl font-bold">
                ${tokenData?.price ? Number(tokenData.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 }) : 'N/A'}
              </div>
              {tokenData?.priceChange24h && (
                <div className={`text-sm mt-1 ${parseFloat(tokenData.priceChange24h) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {parseFloat(tokenData.priceChange24h) >= 0 ? '+' : ''}{parseFloat(tokenData.priceChange24h).toFixed(2)}% (24h)
                </div>
              )}
              {tokenData?.priceUpdatedAt && (
                <div className="text-xs text-gray-500 mt-2">
                  Updated: {new Date(tokenData.priceUpdatedAt).toLocaleString()}
                </div>
              )}
            </div>
            
            {/* Market Cap */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-1">Market Cap</h3>
              <div className="text-2xl font-bold">
                ${tokenData?.marketCap ? Number(tokenData.marketCap).toLocaleString() : 'N/A'}
              </div>
            </div>
            
            {/* Volume */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-1">24h Volume</h3>
              <div className="text-2xl font-bold">
                ${tokenData?.totalVolume ? Number(tokenData.totalVolume).toLocaleString() : 'N/A'}
              </div>
            </div>
            
            {/* Source */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <h3 className="text-sm text-gray-400 mb-1">Data Source</h3>
              <div className="text-2xl font-bold capitalize">
                {tokenData?.source || 'N/A'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Chart and Additional Info Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Left Column - Chart and Ad */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 flex flex-col" style={{ height: '550px' }}>
              {tokenData ? (
                <CustomPriceChart symbol={tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-400">Loading chart data...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Advertisement Panel */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 border border-yellow-500/50 rounded-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-black font-bold px-2 py-0.5 rounded-bl">YOUR AD HERE</div>
              <div className="flex flex-col md:flex-row items-center p-6">
                {/* Ad info section */}
                <div className="flex items-center flex-1 mb-4 md:mb-0">
                  <div className="flex-shrink-0 h-16 w-16 mr-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-0.5 flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">AD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap">
                      <h3 className="text-xl font-bold text-white">Advertise Your Token Here</h3>
                      <span className="ml-2 text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-full">PREMIUM SPOT</span>
                    </div>
                    <p className="text-sm text-yellow-300 mt-1 max-w-md">Reach thousands of potential investors daily. Premium placement on token detail pages.</p>
                    <div className="flex flex-wrap items-center mt-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Visibility:</span>
                        <span className="ml-1 text-white font-medium">100% of visitors</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Position:</span>
                        <span className="ml-1 text-white font-medium">Featured section</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Audience:</span>
                        <span className="ml-1 text-white font-medium">Targeted investors</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTA section */}
                <div className="flex md:flex-col items-center space-x-3 md:space-x-0 md:space-y-2 md:ml-4">
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
            
            {/* Social Sharing Section */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mt-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold mb-2">Share this token</h3>
                  <p className="text-gray-400 text-sm">Share {tokenData?.coinFullName || symbol?.toUpperCase()} with your network</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=Check out ${tokenData?.coinFullName || symbol?.toUpperCase()} on 1ewis&url=${encodeURIComponent(window.location.href)}`, '_blank');
                    }}
                    className="p-3 bg-gray-900/50 rounded-full hover:bg-blue-600/20 transition-colors"
                    aria-label="Share on X (Twitter)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                    }}
                    className="p-3 bg-gray-900/50 rounded-full hover:bg-blue-600/20 transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
                    }}
                    className="p-3 bg-gray-900/50 rounded-full hover:bg-blue-600/20 transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="p-3 bg-gray-900/50 rounded-full hover:bg-blue-600/20 transition-colors"
                    aria-label="Copy link"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Sentiment and Related Tokens - Right Column */}
          <div className="lg:col-span-1 bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Market Insights</h2>
            <div className="space-y-6">
              {/* Market Sentiment Section */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Market Sentiment</h3>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Buy/Sell Ratio</span>
                    <span className="text-sm font-medium">78% Buy / 22% Sell</span>
                  </div>
                  <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-green-400" 
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-sm text-gray-400 mb-1">Short-term Sentiment</h4>
                    <div className="text-lg font-bold text-green-400">Bullish</div>
                    <div className="text-xs text-gray-500 mt-1">Based on 24h data</div>
                  </div>
                  
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-sm text-gray-400 mb-1">Mid-term Outlook</h4>
                    <div className="text-lg font-bold text-green-400">Positive</div>
                    <div className="text-xs text-gray-500 mt-1">Based on 7d trends</div>
                  </div>
                  
                  <div className="p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                    <h4 className="text-sm text-gray-400 mb-1">Technical Analysis</h4>
                    <div className="text-lg font-bold text-yellow-400">Neutral</div>
                    <div className="text-xs text-gray-500 mt-1">Based on indicators</div>
                  </div>
                </div>
              </div>
              
              {/* Discover Other Tokens Section */}
              {relatedTokens.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Discover</h3>
                  <div className="space-y-2">
                    {relatedTokens.map((token) => (
                      <Link 
                        href={`/token/${token.id}`} 
                        key={token.id}
                        className="bg-gray-900/50 rounded-lg p-3 border border-gray-700 hover:border-blue-500/50 transition-colors flex items-center block"
                      >
                        <img 
                          src={token.image} 
                          alt={token.name} 
                          className="w-8 h-8 rounded-full mr-3"
                          onError={(e) => { e.target.src = 'https://s3.1ewis.com/tokens/default.png' }}
                        />
                        <div>
                          <div className="font-medium">{token.symbol}</div>
                          <div className="text-sm text-gray-400">${Number(token.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Disclaimer for sentiment data */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="text-sm text-gray-400">
            <p>* Sentiment data is for informational purposes only and should not be considered as financial advice.</p>
          </div>
        </div>
      </div>
      
      {/* Related Guides Panel */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Related Guides</h3>
          {relatedGuides.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedGuides.map((guide, index) => (
                <Link 
                  key={index} 
                  href={`/news/guides/${guide.slug}`} 
                  className="block bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden hover:border-blue-500/50 transition-colors"
                >
                  <div className="h-40 bg-gray-800 relative">
                    <img 
                      src={guide.image} 
                      alt={guide.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://s3.1ewis.com/guides/default-guide.jpg' }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{guide.title}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2">{guide.description}</p>
                    <div className="flex items-center mt-3 text-xs text-gray-500">
                      <span>{guide.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900/50 p-6 rounded-lg text-center">
              <p className="text-gray-400">No guides available for {symbol?.toUpperCase()} yet.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* News Panel */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Latest {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} News</h3>
          <div className="space-y-4">
            {/* News Item 1 */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-grow">
                  <h4 className="font-medium mb-1">{tokenData?.coinFullName || symbol?.toUpperCase()} Partners with Major Payment Provider to Expand Global Reach</h4>
                  <p className="text-sm text-gray-400 mb-2">The partnership aims to integrate {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} into mainstream payment systems, potentially reaching millions of new users worldwide.</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>CryptoNews</span>
                    <span className="mx-2">•</span>
                    <span>2 hours ago</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-16 h-16 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* News Item 2 */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-grow">
                  <h4 className="font-medium mb-1">{tokenData?.coinFullName || symbol?.toUpperCase()} Announces Major Protocol Upgrade for Q3</h4>
                  <p className="text-sm text-gray-400 mb-2">The upcoming upgrade promises improved transaction speeds and lower fees, addressing key concerns from the community.</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>BlockchainDaily</span>
                    <span className="mx-2">•</span>
                    <span>1 day ago</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-16 h-16 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* News Item 3 */}
            <div className="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div className="flex items-start">
                <div className="flex-grow">
                  <h4 className="font-medium mb-1">Institutional Investors Show Growing Interest in {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}</h4>
                  <p className="text-sm text-gray-400 mb-2">Several major hedge funds have reportedly added {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} to their portfolios, signaling growing institutional confidence.</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>CryptoInsider</span>
                    <span className="mx-2">•</span>
                    <span>3 days ago</span>
                  </div>
                </div>
                <div className="ml-4">
                  <div className="w-16 h-16 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO Questions Section */}
      <div className="container mx-auto px-4 mb-8">
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Where to buy {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}?</h3>
            <p className="text-gray-300">
              You can buy {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} on several major cryptocurrency exchanges. The most popular options include Binance, Coinbase, Kraken, and Bitrue. For the best rates and lowest fees, we recommend comparing prices across multiple platforms before making your purchase. You can also buy {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} directly through our partner exchange by clicking the "Buy" button at the top of this page.
            </p>
          </div>
          
          {/* Question 2 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Is {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} a good investment in {new Date().getFullYear()}?</h3>
            <p className="text-gray-300">
              While we cannot provide financial advice, {tokenData?.coinFullName || `${symbol?.toUpperCase()} Token`} has shown {parseFloat(tokenData?.priceChange24h || 0) >= 0 ? 'positive' : 'varying'} price movement recently. Before investing, consider factors such as the project's fundamentals, development activity, market conditions, and your own risk tolerance. Always do your own research (DYOR) and consider consulting with a financial advisor before making investment decisions.
            </p>
          </div>
          
          {/* Question 3 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">How to store {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} safely?</h3>
            <p className="text-gray-300">
              {tokenData?.coinFullName || `${symbol?.toUpperCase()} Token`} can be stored in various cryptocurrency wallets. For maximum security, hardware wallets like Ledger or Trezor are recommended for long-term storage. Software wallets such as MetaMask, Trust Wallet, or the official {tokenData?.coinFullName || symbol?.toUpperCase()} wallet are convenient for regular use. Always ensure you're using the correct network when transferring {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}{tokenData?.chains && tokenData.chains.length > 0 ? ` (${tokenData.chains.join(', ')})` : ''}.
            </p>
          </div>
          
          {/* Question 4 */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">What is the price prediction for {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}?</h3>
            <p className="text-gray-300">
              Price predictions for {tokenData?.coinFullName || `${symbol?.toUpperCase()} Token`} vary widely among analysts. Some experts suggest it could {parseFloat(tokenData?.priceChange24h || 0) >= 0 ? 'continue its upward trend' : 'recover from recent dips'} based on market adoption and technological developments. However, cryptocurrency prices are highly volatile and can be influenced by regulatory news, market sentiment, and broader economic factors. Always approach price predictions with caution and conduct thorough research before investing.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related Questions Panel */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">People Also Ask</h3>
          <div className="space-y-3">
            <Link href="#" className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <h4 className="font-medium">What is the maximum supply of {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}?</h4>
            </Link>
            <Link href="#" className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <h4 className="font-medium">How does {tokenData?.coinFullName || symbol?.toUpperCase()} technology work?</h4>
            </Link>
            <Link href="#" className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <h4 className="font-medium">What are the main use cases for {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()}?</h4>
            </Link>
            <Link href="#" className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <h4 className="font-medium">How to transfer {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} between exchanges?</h4>
            </Link>
            <Link href="#" className="block p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
              <h4 className="font-medium">Is {tokenData?.coin?.toUpperCase() || symbol?.toUpperCase()} mining profitable in {new Date().getFullYear()}?</h4>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
