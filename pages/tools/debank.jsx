import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function DeBankPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Multi-Chain Portfolio",
      description: "Track all your assets across 50+ chains including Ethereum, BSC, Polygon, Arbitrum, and more.",
      icon: Wallet
    },
    {
      title: "DeFi Dashboard",
      description: "Monitor your DeFi positions, yields, and liquidity pools in one comprehensive interface.",
      icon: BarChart
    },
    {
      title: "Real-Time Notifications",
      description: "Receive alerts for important events like large price movements or security threats.",
      icon: Zap
    },
    {
      title: "Security Analysis",
      description: "Identify potential risks in your portfolio with token approval scanning and security checks.",
      icon: Shield
    }
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
    <div className="min-h-screen bg-black text-white">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Hero Section */}
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-rose-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-rose-400">
            DeBank
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The all-in-one DeFi portfolio tracker for managing your crypto assets across all chains.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="rose-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Blockchains", value: "50+", unit: "Supported" },
            { label: "DeFi Protocols", value: "1,500+", unit: "Tracked" },
            { label: "Active Users", value: "5M+", unit: "Worldwide" },
            { label: "Assets Tracked", value: "$40B+", unit: "Total Value" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-rose-400">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
              <span className="text-xs text-gray-500">{stat.unit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose DeBank?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-rose-400">Comprehensive Multi-Chain Visibility</h3>
            <p className="text-gray-300 mb-4">
              DeBank provides unparalleled visibility into your crypto assets across more than 50 different blockchains. Unlike many portfolio trackers that focus primarily on Ethereum, DeBank gives equal attention to emerging chains like Arbitrum, Optimism, Avalanche, and many others. This comprehensive approach ensures you can track all your assets in one place, regardless of which blockchains they reside on.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-rose-400 mt-6">DeFi-Focused Analytics</h3>
              <p className="text-gray-300 mb-4">
                DeBank specializes in tracking DeFi positions, providing detailed analytics on your liquidity pools, yield farming, staking, and lending activities. The platform calculates your real-time APY/APR, shows impermanent loss for liquidity positions, and helps you identify your most profitable DeFi investments. This level of detail is invaluable for active DeFi users who need to optimize their strategies across multiple protocols.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-rose-400 mt-6">Enhanced Security Features</h3>
              <p className="text-gray-300 mb-4">
                Security is a top priority in the crypto space, and DeBank helps protect your assets with features like token approval scanning and security alerts. The platform can identify potentially risky smart contract approvals that might give malicious actors access to your funds, allowing you to revoke these permissions before they can be exploited. DeBank also provides real-time notifications about security threats and suspicious activities related to your addresses.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-rose-400 hover:text-rose-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Portfolio Dashboard",
                description: "Get a complete overview of all your assets, including tokens, NFTs, and DeFi positions, with real-time value updates and historical performance charts."
              },
              {
                title: "Protocol Explorer",
                description: "Discover new DeFi protocols and analyze their TVL, user activity, and security status before investing your funds."
              },
              {
                title: "Token Approvals",
                description: "View and manage all your token approvals across different protocols, identifying and revoking potentially risky permissions."
              },
              {
                title: "Transaction History",
                description: "Access a comprehensive history of all your on-chain transactions with detailed information and categorization."
              },
              {
                title: "Mobile App",
                description: "Monitor your portfolio on the go with the DeBank mobile app, available for both iOS and Android devices."
              },
              {
                title: "Social Features",
                description: "Follow successful DeFi users, share investment strategies, and discover new opportunities through the DeBank community."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-rose-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Getting Started with DeBank</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Create an Account",
                description: "Sign up for a free DeBank account using your email or connect directly with your wallet."
              },
              {
                step: "2",
                title: "Connect Your Wallets",
                description: "Add your wallet addresses to track all your assets across multiple blockchains."
              },
              {
                step: "3",
                title: "Explore Your Portfolio",
                description: "View your complete portfolio and start using DeBank's powerful analytics tools."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-rose-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your DeFi Portfolio?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Start using DeBank today to track all your crypto assets across multiple blockchains and optimize your DeFi strategy.
          </p>
          <ButtonLink 
            href="https://debank.com/r/YOUR_REF_CODE" 
            className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Try DeBank Now <ArrowRight className="ml-2 w-5 h-5" />
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
