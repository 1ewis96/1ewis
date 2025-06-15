import React, { useState, useEffect } from 'react';
import ClientOnlyTime from '../common/ClientOnlyTime';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Loader } from 'lucide-react';

export default function CryptoPriceTracker({ coins = ['bitcoin', 'ethereum', 'solana', 'cardano', 'ripple'] }) {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real app, this would fetch from a real API like CoinGecko
    // For demo purposes, we'll simulate the API response
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 'bitcoin',
            name: 'Bitcoin',
            symbol: 'BTC',
            current_price: 48235.72,
            price_change_percentage_24h: 2.45,
            image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
          },
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'ETH',
            current_price: 2845.19,
            price_change_percentage_24h: 1.87,
            image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
          },
          {
            id: 'solana',
            name: 'Solana',
            symbol: 'SOL',
            current_price: 128.63,
            price_change_percentage_24h: -0.92,
            image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
          },
          {
            id: 'cardano',
            name: 'Cardano',
            symbol: 'ADA',
            current_price: 0.58,
            price_change_percentage_24h: 0.34,
            image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
          },
          {
            id: 'ripple',
            name: 'XRP',
            symbol: 'XRP',
            current_price: 0.62,
            price_change_percentage_24h: -1.24,
            image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
          }
        ];
        
        // Filter only requested coins
        const filteredData = mockData.filter(coin => coins.includes(coin.id));
        setCryptoData(filteredData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        setLoading(false);
      }
    };

    fetchCryptoData();
    
    // In a real app, you might want to refresh the data periodically
    const interval = setInterval(() => {
      fetchCryptoData();
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [coins]);

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-red-300">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">Live Crypto Prices</h3>
        <p className="text-sm text-gray-400">Track the latest cryptocurrency prices</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Coin</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">24h Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {loading ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center">
                  <div className="flex items-center justify-center">
                    <Loader className="w-6 h-6 text-cyan-400 animate-spin mr-2" />
                    <span className="text-gray-400">Loading prices...</span>
                  </div>
                </td>
              </tr>
            ) : (
              cryptoData.map((coin) => (
                <motion.tr 
                  key={coin.id}
                  className="hover:bg-gray-800/30 transition-colors"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={coin.image} 
                        alt={coin.name} 
                        className="w-6 h-6 mr-2 rounded-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/24/1e293b/e2e8f0?text=?";
                        }}
                      />
                      <div>
                        <div className="font-medium text-white">{coin.name}</div>
                        <div className="text-xs text-gray-400">{coin.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className="text-white font-medium">${coin.current_price.toLocaleString()}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <div className={`flex items-center justify-end ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 bg-gray-900/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Data refreshes every minute. Last updated: <ClientOnlyTime format="full" />
        </p>
      </div>
    </div>
  );
}
