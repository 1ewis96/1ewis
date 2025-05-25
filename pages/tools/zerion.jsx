import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function ZerionPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Universal Wallet",
      description: "Manage all your tokens, NFTs, and DeFi positions across multiple chains in one interface.",
      icon: Wallet
    },
    {
      title: "Portfolio Analytics",
      description: "Track your performance with detailed analytics, historical charts, and profit/loss calculations.",
      icon: BarChart
    },
    {
      title: "DeFi Integration",
      description: "Interact with DeFi protocols directly from the app, with built-in swaps and yield opportunities.",
      icon: Zap
    },
    {
      title: "Security First",
      description: "Non-custodial design ensures you always maintain control of your assets and private keys.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-pink-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-pink-400">
            Zerion
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The all-in-one interface to DeFi — invest, track, and manage your entire Web3 portfolio.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="pink-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Active Users", value: "500K+", unit: "Worldwide" },
            { label: "Supported Chains", value: "20+", unit: "Networks" },
            { label: "DeFi Protocols", value: "180+", unit: "Integrated" },
            { label: "Assets Tracked", value: "$25B+", unit: "Total Value" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-pink-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Zerion?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-pink-400">All-in-One DeFi Interface</h3>
            <p className="text-gray-300 mb-4">
              Zerion combines portfolio tracking, trading, and DeFi interactions in a single intuitive interface. Unlike many other platforms that focus solely on tracking or trading, Zerion provides a comprehensive solution that lets you manage your entire Web3 experience from one app. This integrated approach eliminates the need to switch between multiple tools, saving you time and reducing the risk of errors.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-pink-400 mt-6">Superior User Experience</h3>
              <p className="text-gray-300 mb-4">
                Zerion is renowned for its exceptional user interface and experience. The platform simplifies complex DeFi concepts and presents information in a clean, intuitive way that both beginners and experienced users can appreciate. This focus on UX has earned Zerion recognition as one of the most user-friendly applications in the Web3 space.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-pink-400 mt-6">Non-Custodial Security</h3>
              <p className="text-gray-300 mb-4">
                Security is at the core of Zerion's design philosophy. As a non-custodial platform, Zerion never takes control of your private keys or assets. All transactions are executed directly from your connected wallet, ensuring that you maintain full ownership and control of your funds at all times. This approach aligns with the fundamental principles of decentralization and self-sovereignty in the crypto space.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-pink-400 hover:text-pink-300 transition-colors mt-2 mx-auto"
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
                title: "Multi-Chain Portfolio",
                description: "Track assets across Ethereum, Polygon, BSC, Arbitrum, Optimism, and many other networks in a unified dashboard."
              },
              {
                title: "NFT Gallery",
                description: "View, manage, and track the value of your entire NFT collection across multiple blockchains."
              },
              {
                title: "DeFi Aggregator",
                description: "Access the best rates for token swaps by aggregating liquidity from multiple DEXs and protocols."
              },
              {
                title: "History Timeline",
                description: "View your complete transaction history with detailed information and categorization for easy tracking."
              },
              {
                title: "Zerion DNA",
                description: "Generate a unique visual representation of your portfolio that evolves based on your holdings and activity."
              },
              {
                title: "Cross-Platform Access",
                description: "Access your portfolio from anywhere with web, iOS, and Android apps that sync seamlessly."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-pink-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Getting Started with Zerion</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Create an Account",
                description: "Sign up for a free Zerion account using your email or connect directly with your Web3 wallet."
              },
              {
                step: "2",
                title: "Connect Your Wallets",
                description: "Add your wallet addresses to track all your assets across multiple blockchains."
              },
              {
                step: "3",
                title: "Explore DeFi",
                description: "Start exploring DeFi opportunities, trading tokens, and managing your portfolio."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-pink-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Simplify Your DeFi Experience?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Start using Zerion today to manage your entire Web3 portfolio in one intuitive interface.
          </p>
          <ButtonLink 
            href="https://zerion.io/?ref=YOUR_REF_CODE" 
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Try Zerion Now <ArrowRight className="ml-2 w-5 h-5" />
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
