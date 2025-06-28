import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Check, Info, TrendingUp, Shield, Zap } from 'lucide-react';
import { ButtonLink } from '../../components/ui/button';
import TokenPriceChart from '../../components/TokenPriceChart';
import tokenData from '../../data/tokenData.json';
import { getExchangeReferral } from '../../utils/referralLinks';

export default function TokenPage() {
  const router = useRouter();
  const { symbol } = router.query;
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (symbol) {
      // Convert to uppercase to match our data format
      const upperSymbol = symbol.toUpperCase();
      const foundToken = tokenData.tokens[upperSymbol];
      
      if (foundToken) {
        console.log('Found token data:', foundToken); // Debug log
        setToken(foundToken);
      } else {
        console.log('Token not found:', upperSymbol); // Debug log
        // Token not found, redirect to home
        router.push('/');
      }
      
      setLoading(false);
    }
  }, [symbol, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading token information...</div>
      </div>
    );
  }

  if (!token) {
    return null; // Will redirect via the useEffect
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Get color class based on token color
  const getColorClass = (color) => {
    const colorMap = {
      blue: 'from-blue-600/20 to-blue-900/10 border-blue-700/30 text-blue-400',
      green: 'from-green-600/20 to-green-900/10 border-green-700/30 text-green-400',
      red: 'from-red-600/20 to-red-900/10 border-red-700/30 text-red-400',
      yellow: 'from-yellow-600/20 to-yellow-900/10 border-yellow-700/30 text-yellow-400',
      purple: 'from-purple-600/20 to-purple-900/10 border-purple-700/30 text-purple-400',
      pink: 'from-pink-600/20 to-pink-900/10 border-pink-700/30 text-pink-400',
      orange: 'from-orange-600/20 to-orange-900/10 border-orange-700/30 text-orange-400',
      teal: 'from-teal-600/20 to-teal-900/10 border-teal-700/30 text-teal-400'
    };
    
    return colorMap[color] || 'from-gray-600/20 to-gray-900/10 border-gray-700/30 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="px-6 py-20 md:px-16">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={`inline-block px-4 py-1 rounded-full mb-4 bg-gradient-to-r ${getColorClass(token.color)}`}>
            {token.symbol}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {token.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            {token.description}
          </p>
        </motion.div>
        
        {/* Price Chart Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TokenPriceChart symbol={token.symbol} color={token.color} />
        </motion.div>

        {/* Best Exchanges Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Best Exchanges for {token.symbol}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {token.bestExchanges && token.bestExchanges.length > 0 ? (
              token.bestExchanges.map((exchange, index) => {
                const exchangeData = getExchangeReferral(exchange.id);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                        <span className="text-lg font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold">{exchangeData?.name || exchange.id}</h3>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{exchange.reason}</p>
                    
                    {exchangeData?.referralLink ? (
                      <div className="mt-auto">
                        <div className="bg-gray-900/50 rounded-lg py-2 px-3 mb-4 text-xs text-gray-400">
                          <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-2">BONUS</span>
                          {exchangeData.bonusDetails}
                        </div>
                        <ButtonLink 
                          href={exchangeData.referralLink}
                          className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Trade {token.symbol} on {exchangeData.name} <ExternalLink className="ml-2 w-4 h-4" />
                        </ButtonLink>
                      </div>
                    ) : (
                      <ButtonLink 
                        href={`/${exchange.id}`}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mt-auto"
                      >
                        Learn More <ArrowRight className="ml-2 w-4 h-4" />
                      </ButtonLink>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-8 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700">
                <p className="text-gray-400">No exchange data available for {token.symbol}</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Key Features Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features of {token.name}</h2>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <ul className="space-y-4">
              {token.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className={`mr-3 w-5 h-5 flex-shrink-0 ${getColorClass(token.color).split(' ')[3]}`} />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Trade {token.symbol}?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Compare the top exchanges for {token.name} trading and take advantage of exclusive bonuses through our referral links.
          </p>
          <ButtonLink 
            href="/compare"
            className={`bg-gradient-to-r ${getColorClass(token.color).split(' ').slice(0, 2).join(' ')} text-white px-8 py-3 text-lg rounded-lg`}
          >
            <span className="flex items-center justify-center">
              Compare All Exchanges <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          </ButtonLink>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 text-center text-sm text-gray-500 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              © 2025 1ewis.com — All Rights Reserved
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
