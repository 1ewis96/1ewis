import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// List of cryptocurrencies to fetch from CoinGecko
const cryptoIds = [
  { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
  { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB' },
  { id: 'solana', name: 'Solana', symbol: 'SOL' },
  { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
  { id: 'ripple', name: 'XRP', symbol: 'XRP' },
  { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
  { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
];

// Mock data for when API fails or during development
const mockPriceData = {
  bitcoin: { usd: 64253.12, usd_24h_change: 2.4 },
  ethereum: { usd: 3478.65, usd_24h_change: 1.8 },
  binancecoin: { usd: 567.23, usd_24h_change: -0.7 },
  solana: { usd: 142.87, usd_24h_change: 5.2 },
  cardano: { usd: 0.58, usd_24h_change: -1.3 },
  ripple: { usd: 0.62, usd_24h_change: 0.9 },
  polkadot: { usd: 7.84, usd_24h_change: 3.1 },
  dogecoin: { usd: 0.12, usd_24h_change: 4.5 },
};

export default function PriceTicker() {
  const router = useRouter();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCrypto, setHoveredCrypto] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ symbol: '', x: 0 });
  
  // Fetch data from CoinGecko API or use mock data
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        // Create the comma-separated list of crypto IDs
        const ids = cryptoIds.map(crypto => crypto.id).join(',');
        
        // Try to fetch from CoinGecko API
        let priceData;
        try {
          const priceResponse = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24h_change=true`
          );
          
          if (!priceResponse.ok) {
            throw new Error('Failed to fetch price data');
          }
          
          priceData = await priceResponse.json();
        } catch (apiError) {
          console.warn('Using mock data due to API error:', apiError);
          // Use mock data if API fails
          priceData = mockPriceData;
        }
        
        // Transform the data to our format
        const updatedPrices = cryptoIds.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price: priceData[crypto.id]?.usd || 0,
          change: priceData[crypto.id]?.usd_24h_change || 0
        }));
        
        setPrices(updatedPrices);
        setLoading(false);
      } catch (err) {
        console.error('Error processing crypto data:', err);
        setError(err.message);
        setLoading(false);
        
        // Fallback to mock data
        const mockUpdatedPrices = cryptoIds.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          price: mockPriceData[crypto.id]?.usd || Math.random() * 1000,
          change: mockPriceData[crypto.id]?.usd_24h_change || (Math.random() * 10 - 5)
        }));
        
        setPrices(mockUpdatedPrices);
      }
    };
    
    // Initial fetch
    fetchCryptoPrices();
    
    // Set up interval for refreshing data (every 60 seconds)
    const interval = setInterval(fetchCryptoPrices, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Get a color for each crypto based on its symbol
  const getCryptoColor = (symbol) => {
    const colorMap = {
      'BTC': 'from-yellow-500 to-orange-500',
      'ETH': 'from-indigo-500 to-purple-500',
      'BNB': 'from-yellow-400 to-yellow-600',
      'SOL': 'from-purple-500 to-pink-500',
      'ADA': 'from-blue-500 to-cyan-500',
      'XRP': 'from-blue-400 to-blue-600',
      'DOT': 'from-pink-500 to-rose-500',
      'DOGE': 'from-yellow-500 to-yellow-600',
    };
    return colorMap[symbol] || 'from-blue-500 to-purple-500';
  };

  // Get a background pulse animation class based on price change
  const getPulseClass = (change) => {
    if (change > 5) return 'animate-pulse-green-fast';
    if (change > 0) return 'animate-pulse-green-slow';
    if (change < -5) return 'animate-pulse-red-fast';
    if (change < 0) return 'animate-pulse-red-slow';
    return '';
  };

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800 overflow-hidden py-3">
      <div className="flex justify-center items-center">
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
          className="mr-2"
        >
          <Zap className="w-5 h-5 text-yellow-400" />
        </motion.div>
        <motion.span 
          className="text-gray-300 text-sm font-medium"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading live crypto prices...
        </motion.span>
      </div>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="w-full bg-gradient-to-r from-red-900/30 via-gray-800 to-red-900/30 border-b border-gray-800 overflow-hidden py-3">
      <div className="flex justify-center">
        <motion.span 
          className="text-red-400 text-sm font-medium"
          animate={{
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
        >
          Unable to load crypto prices - Using simulated data
        </motion.span>
      </div>
    </div>
  );

  // Main component render
  return (
    <>
      {loading && prices.length === 0 && <LoadingIndicator />}
      {error && prices.length === 0 && <ErrorMessage />}
      
      {prices.length > 0 && (
        <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 overflow-hidden py-2 shadow-lg relative">
          {/* Sparkle overlay effect */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ 
                  x: Math.random() * 100 + '%', 
                  y: Math.random() * 100 + '%', 
                  opacity: 0 
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          {/* Main ticker content */}
          <motion.div 
            className="flex space-x-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 30,
              ease: "linear"
            }}
          >
            {/* Duplicate the array for continuous scrolling effect */}
            {[...prices, ...prices].map((crypto, index) => (
              <Link 
                href={`/token/${crypto.symbol.toLowerCase()}`} 
                key={index}
                passHref
              >
                <motion.div 
                  className={`flex items-center space-x-1.5 whitespace-nowrap px-2 py-1 rounded-full text-sm
                            bg-gradient-to-r ${getCryptoColor(crypto.symbol)} 
                            ${getPulseClass(crypto.change)} cursor-pointer`}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)' 
                  }}
                  onHoverStart={() => {
                    setHoveredCrypto(crypto.symbol);
                    setTooltipContent({ symbol: crypto.symbol, x: index % prices.length });
                    setShowTooltip(true);
                  }}
                  onHoverEnd={() => {
                    setHoveredCrypto(null);
                    setShowTooltip(false);
                  }}
                  onClick={(e) => {
                    // Let the Link handle navigation
                  }}
                >
                  <motion.span 
                    className="font-bold text-white text-xs"
                    animate={{ scale: hoveredCrypto === crypto.symbol ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {crypto.symbol}
                  </motion.span>
                  
                  <span className="font-medium text-white text-xs">
                    ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  
                  <motion.div 
                    className={`flex items-center text-xs px-1 py-0.5 rounded ${crypto.change >= 0 ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {crypto.change >= 0 ? 
                      <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> : 
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5" />
                    }
                    <span className="font-medium text-xs">
                      {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(1)}%
                    </span>
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Add a subtle glow at the edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
          
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div 
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-3 rounded shadow-lg z-50 border border-gray-700"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                style={{
                  left: `${Math.min(Math.max(10 + (tooltipContent.x * 100), 10), 90)}%`
                }}
              >
                <div className="flex items-center">
                  <span>Click to view best exchanges for {tooltipContent.symbol}</span>
                  <ExternalLink className="ml-1 w-3 h-3" />
                </div>
                <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -top-1 left-1/2 -translate-x-1/2 border-t border-l border-gray-700"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}
