import { Card, CardContent } from "../components/ui/card";
import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import CryptoStats from '../components/CryptoStats';
import BonusCalculator from '../components/BonusCalculator';

export default function HomePage() {
  const exchanges = [
    // Main Exchanges
    {
      name: "Binance",
      tagline: "Top global exchange with low fees",
      link: "/binance",
      color: "yellow"
    },
    {
      name: "Bybit",
      tagline: "Best for futures trading & bonuses",
      link: "/bybit",
      color: "blue"
    },
    {
      name: "Kraken",
      tagline: "Trusted, US-compliant crypto platform",
      link: "/kraken",
      color: "purple"
    },
    {
      name: "OKX",
      tagline: "Advanced tools and Web3 wallet integration",
      link: "/okx",
      color: "green"
    },
    // Additional Exchanges
    {
      name: "MEXC",
      tagline: "Early access to promising cryptocurrencies",
      link: "/mexc",
      color: "red"
    },
    {
      name: "KuCoin",
      tagline: "The People's Exchange with vast altcoin selection",
      link: "/kucoin",
      color: "teal"
    },
    {
      name: "Gate.io",
      tagline: "Comprehensive exchange with advanced tools",
      link: "/gateio",
      color: "blue"
    },
    {
      name: "Bitget",
      tagline: "Leading copy trading platform with low fees",
      link: "/bitget",
      color: "purple"
    },
    {
      name: "CoinEx",
      tagline: "Zero-fee trading with fast transactions",
      link: "/coinex",
      color: "green"
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Hero Section */}
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Welcome to 1ewis.com
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your gateway to the top crypto platforms. Compare the best, claim bonuses, and start trading smarter.
          </p>
        </motion.div>

        {/* Exchanges Grid */}
        <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Exchanges</h2>
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {exchanges.map((exchange) => (
            <motion.div key={exchange.name} variants={itemVariants}>
              <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden group`}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className={`text-xl font-semibold text-${exchange.color}-400`}>{exchange.name}</h2>
                  </div>
                  <p className="text-gray-300 mb-4">{exchange.tagline}</p>
                  <ButtonLink 
                    href={exchange.link} 
                    className={`w-full bg-transparent border border-${exchange.color}-400 hover:bg-${exchange.color}-400/10 text-${exchange.color}-400 hover:text-${exchange.color}-300 transition-all duration-300`}
                  >
                    <span className="flex items-center justify-center">
                      Explore {exchange.name} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </ButtonLink>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Tools Section */}
        <h2 className="text-2xl font-bold mt-16 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Essential Tools</h2>
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              name: "NordVPN",
              tagline: "Secure your crypto activities with the world's leading VPN",
              link: "/tools/nordvpn",
              color: "blue"
            },
            {
              name: "TradingView",
              tagline: "Professional-grade charting tools for market analysis",
              link: "/tools/tradingview",
              color: "indigo"
            },
            {
              name: "MetaMask",
              tagline: "The leading self-custody wallet for Web3 access",
              link: "/wallets/metamask",
              color: "orange"
            }
          ].map((tool) => (
            <motion.div key={tool.name} variants={itemVariants}>
              <Card className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden group`}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h2 className={`text-xl font-semibold text-${tool.color}-400`}>{tool.name}</h2>
                  </div>
                  <p className="text-gray-300 mb-4">{tool.tagline}</p>
                  <ButtonLink 
                    href={tool.link} 
                    className={`w-full bg-transparent border border-${tool.color}-400 hover:bg-${tool.color}-400/10 text-${tool.color}-400 hover:text-${tool.color}-300 transition-all duration-300`}
                  >
                    <span className="flex items-center justify-center">
                      Explore {tool.name} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </ButtonLink>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Crypto Stats Section */}
      <div className="px-6 md:px-16 bg-gray-900">
        <CryptoStats />
      </div>
      
      {/* Bonus Calculator Section */}
      <div className="px-6 md:px-16 py-12 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl font-bold text-center mb-8">Calculate Your Potential Bonuses</h2>
        <BonusCalculator />
      </div>



      {/* Call to Action */}
      <div className="px-6 md:px-16 py-16 text-center bg-black">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Compare all exchanges side by side and find the perfect platform for your trading style.
          </p>
          <ButtonLink 
            href="/portfolio" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
          >
            View Full Comparison
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
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a 
                href="https://github.com/1ewis96/1ewis" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-300 transition-colors duration-200"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
              <a 
                href="https://x.com/1ewis_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-300 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
