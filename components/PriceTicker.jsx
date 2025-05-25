import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

export default function PriceTicker() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data from CoinGecko API
  useEffect(() => {
    const fetchCryptoPrices = async () => {
      try {
        // Create the comma-separated list of crypto IDs
        const ids = cryptoIds.map(crypto => crypto.id).join(',');
        
        // Fetch current prices
        const priceResponse = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );
        
        if (!priceResponse.ok) {
          throw new Error('Failed to fetch price data');
        }
        
        const priceData = await priceResponse.json();
        
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
        console.error('Error fetching crypto data:', err);
        setError(err.message);
        setLoading(false);
        
        // Fallback to default data if API fails
        if (prices.length === 0) {
          setPrices(cryptoIds.map(crypto => ({
            name: crypto.name,
            symbol: crypto.symbol,
            price: 0,
            change: 0
          })));
        }
      }
    };
    
    // Initial fetch
    fetchCryptoPrices();
    
    // Set up interval for refreshing data (every 60 seconds)
    const interval = setInterval(fetchCryptoPrices, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Show loading indicator if data is still loading
  if (loading && prices.length === 0) {
    return (
      <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden py-2">
        <div className="flex justify-center">
          <span className="text-gray-400 text-sm">Loading crypto prices...</span>
        </div>
      </div>
    );
  }

  // Show error message if there's an error and no fallback data
  if (error && prices.length === 0) {
    return (
      <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden py-2">
        <div className="flex justify-center">
          <span className="text-red-400 text-sm">Unable to load crypto prices</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 border-b border-gray-800 overflow-hidden py-2">
      <motion.div 
        className="flex space-x-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 30,
          ease: "linear"
        }}
      >
        {/* Duplicate the array for continuous scrolling effect */}
        {[...prices, ...prices].map((crypto, index) => (
          <div key={index} className="flex items-center space-x-2 whitespace-nowrap">
            <span className="font-medium">{crypto.symbol}</span>
            <span>${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className={`text-xs ${crypto.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crypto.change >= 0 ? '+' : ''}{crypto.change.toFixed(2)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
