import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, RefreshCw } from 'lucide-react';

export default function CryptoCalculator() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BTC');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock exchange rates for demonstration
  const exchangeRates = {
    'USD': {
      'BTC': 0.0000207,
      'ETH': 0.000351,
      'SOL': 0.00778,
      'ADA': 1.724,
      'XRP': 1.613
    },
    'BTC': {
      'USD': 48235.72,
      'ETH': 16.95,
      'SOL': 375.02,
      'ADA': 83142.62,
      'XRP': 77799.55
    },
    'ETH': {
      'USD': 2845.19,
      'BTC': 0.059,
      'SOL': 22.12,
      'ADA': 4904.81,
      'XRP': 4588.24
    }
  };

  const cryptoOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'SOL', label: 'Solana (SOL)' },
    { value: 'ADA', label: 'Cardano (ADA)' },
    { value: 'XRP', label: 'XRP (XRP)' }
  ];

  const calculateConversion = () => {
    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      try {
        let convertedAmount;
        
        // Direct conversion if rate exists
        if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
          convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];
        } 
        // USD as intermediary if direct conversion not available
        else if (fromCurrency !== 'USD' && toCurrency !== 'USD') {
          const toUSD = exchangeRates[fromCurrency]['USD'];
          const fromUSD = 1 / exchangeRates['USD'][toCurrency];
          convertedAmount = amount * toUSD * fromUSD;
        }
        // Inverse of existing rate
        else {
          convertedAmount = amount / exchangeRates[toCurrency][fromCurrency];
        }
        
        setResult({
          fromAmount: amount,
          fromCurrency,
          toAmount: convertedAmount,
          toCurrency
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Calculation error:", error);
        setLoading(false);
      }
    }, 600);
  };

  // Calculate on mount and when inputs change
  useEffect(() => {
    calculateConversion();
  }, [amount, fromCurrency, toCurrency]);

  // Handle currency swap
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Format number based on currency
  const formatNumber = (value, currency) => {
    if (currency === 'BTC') {
      return value.toFixed(8);
    } else if (currency === 'USD') {
      return value.toLocaleString('en-US', { 
        style: 'currency', 
        currency: 'USD',
        maximumFractionDigits: 2
      });
    } else {
      return value.toFixed(6);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-purple-400" />
          Crypto Converter
        </h3>
        <p className="text-sm text-gray-400">Convert between cryptocurrencies and fiat</p>
      </div>
      
      <div className="p-6">
        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter amount"
            min="0"
          />
        </div>
        
        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cryptoOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end justify-center">
            <motion.button
              onClick={swapCurrencies}
              className="bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50 rounded-full p-2 text-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-1">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {cryptoOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Result Display */}
        <motion.div 
          className="mt-6 p-4 bg-gray-800/30 border border-gray-700 rounded-lg text-center"
          animate={{ opacity: loading ? 0.7 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mr-2"></div>
              <span className="text-gray-400">Calculating...</span>
            </div>
          ) : result ? (
            <>
              <div className="text-2xl font-bold text-white mb-1">
                {formatNumber(result.toAmount, result.toCurrency)}
              </div>
              <div className="text-sm text-gray-400">
                {result.fromAmount} {result.fromCurrency} = {formatNumber(result.toAmount, result.toCurrency)} {result.toCurrency}
              </div>
            </>
          ) : (
            <span className="text-gray-400">Enter an amount to convert</span>
          )}
        </motion.div>
      </div>
      
      <div className="p-3 bg-gray-900/30 border-t border-gray-800">
        <p className="text-xs text-gray-500 text-center">
          Rates are for demonstration purposes only. Actual market rates may vary.
        </p>
      </div>
    </div>
  );
}
