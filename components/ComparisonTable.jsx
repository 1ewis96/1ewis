import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ChevronDown, ChevronUp, Info } from 'lucide-react';

const ComparisonTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showAllExchanges, setShowAllExchanges] = useState(false);
  
  // Exchange data with comparison metrics
  const exchanges = [
    {
      name: 'Bitrue',
      logo: '/images/bitrue-logo.png', // You'll need to add this logo image
      spotFees: '0.09%',
      futuresFees: '0.03%',
      cryptoCount: '400+',
      countries: '170+',
      features: ['XRP focus', 'Yield products', 'Power Piggy staking'],
      bonus: '30% commission on trading fees',
      link: '/bitrue',
      color: 'blue'
    },
    {
      name: 'Coinflare',
      logo: '/images/coinflare-logo.png', // You'll need to add this logo image
      spotFees: '0.07%',
      futuresFees: '0.02%',
      cryptoCount: '350+',
      countries: '160+',
      features: ['Advanced trading tools', 'Low fees', '24/7 customer support'],
      bonus: 'Exclusive trading fee discounts',
      link: '/coinflare',
      color: 'orange'
    }
  ];

  // Sorting logic
  const sortedExchanges = React.useMemo(() => {
    let sortableExchanges = [...exchanges];
    if (sortConfig.key) {
      sortableExchanges.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableExchanges;
  }, [exchanges, sortConfig]);

  // Display only top 4 exchanges unless showAllExchanges is true
  const displayedExchanges = showAllExchanges ? sortedExchanges : sortedExchanges.slice(0, 4);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-lg">
      {/* Desktop View - Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-gray-900 border-collapse">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="px-4 py-3 text-left">Exchange</th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('spotFees')}
              >
                <div className="flex items-center">
                  <span>Spot Fees</span>
                  {getSortIndicator('spotFees')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('futuresFees')}
              >
                <div className="flex items-center">
                  <span>Futures Fees</span>
                  {getSortIndicator('futuresFees')}
                </div>
              </th>
              <th 
                className="px-4 py-3 text-left cursor-pointer hover:bg-gray-700"
                onClick={() => requestSort('cryptoCount')}
              >
                <div className="flex items-center">
                  <span>Cryptocurrencies</span>
                  {getSortIndicator('cryptoCount')}
                </div>
              </th>
              <th className="px-4 py-3 text-left">Key Features</th>
              <th className="px-4 py-3 text-left">Sign-up Bonus</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {displayedExchanges.map((exchange, index) => (
              <motion.tr 
                key={exchange.name}
                className="hover:bg-gray-800/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full mr-3 bg-${exchange.color}-500/20 flex items-center justify-center`}>
                      <span className={`font-bold text-${exchange.color}-400`}>{exchange.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{exchange.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4">{exchange.spotFees}</td>
                <td className="px-4 py-4">{exchange.futuresFees}</td>
                <td className="px-4 py-4">{exchange.cryptoCount}</td>
                <td className="px-4 py-4">
                  <ul className="list-disc list-inside text-sm">
                    {exchange.features.map((feature, i) => (
                      <li key={i} className="text-gray-400">{feature}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4">
                  <div className={`text-${exchange.color}-400 font-medium`}>{exchange.bonus}</div>
                </td>
                <td className="px-4 py-4">
                  <a 
                    href={exchange.link} 
                    className={`px-4 py-2 rounded-md bg-${exchange.color}-500/20 text-${exchange.color}-400 hover:bg-${exchange.color}-500/30 transition-colors`}
                  >
                    View Deal
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile View - Cards */}
      <div className="lg:hidden">
        <div className="grid grid-cols-1 gap-6">
          {displayedExchanges.map((exchange, index) => (
            <motion.div
              key={exchange.name}
              className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-${exchange.color}-500/50 transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-${exchange.color}-900/20`}>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full mr-3 bg-${exchange.color}-500/20 flex items-center justify-center`}>
                    <span className={`font-bold text-${exchange.color}-400`}>{exchange.name.charAt(0)}</span>
                  </div>
                  <h3 className={`text-xl font-bold text-${exchange.color}-400`}>{exchange.name}</h3>
                </div>
              </div>
              
              <div className="px-6 py-4 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Spot Fees</p>
                  <p className="font-medium">{exchange.spotFees}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Futures Fees</p>
                  <p className="font-medium">{exchange.futuresFees}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Cryptocurrencies</p>
                  <p className="font-medium">{exchange.cryptoCount}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Key Features</p>
                  <ul className="list-disc list-inside text-sm">
                    {exchange.features.map((feature, i) => (
                      <li key={i} className="text-gray-400">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sign-up Bonus</p>
                  <p className={`text-${exchange.color}-400 font-medium`}>{exchange.bonus}</p>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t border-gray-800">
                <a 
                  href={exchange.link} 
                  className={`block w-full text-center px-4 py-2 rounded-md bg-${exchange.color}-500/20 text-${exchange.color}-400 hover:bg-${exchange.color}-500/30 transition-colors`}
                >
                  View Deal
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {exchanges.length > 4 && (
        <div className="flex justify-center py-4 bg-gray-900">
          <button 
            onClick={() => setShowAllExchanges(!showAllExchanges)}
            className="flex items-center px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
          >
            <span>{showAllExchanges ? 'Show Less' : 'Show All Exchanges'}</span>
            {showAllExchanges ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
          </button>
        </div>
      )}
      
      <div className="p-4 bg-gray-900 text-gray-400 text-sm">
        <div className="flex items-center">
          <Info className="w-4 h-4 mr-2" />
          <span>Fees and features are subject to change. Always verify current rates on the exchange's official website.</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
