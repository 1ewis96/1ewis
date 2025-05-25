import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function RabbyPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Multi-Chain Support",
      description: "Seamlessly manage assets across Ethereum, BSC, Polygon, Arbitrum, Optimism, and more networks.",
      icon: Wallet
    },
    {
      title: "Enhanced Security",
      description: "Benefit from security features like phishing detection and transaction simulation.",
      icon: Shield
    },
    {
      title: "DApp Integration",
      description: "Connect to thousands of decentralized applications with a streamlined approval process.",
      icon: Zap
    },
    {
      title: "Portfolio Tracking",
      description: "Monitor your entire crypto portfolio with detailed analytics and performance metrics.",
      icon: BarChart
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-zinc-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-zinc-400">
            Rabby Wallet
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The comprehensive browser extension wallet built for DeFi users.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="zinc-400" />

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
            { label: "Supported Chains", value: "15+", unit: "Networks" },
            { label: "DApps Access", value: "5,000+", unit: "Applications" },
            { label: "Security Score", value: "9.8/10", unit: "Industry Rating" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-zinc-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Rabby Wallet?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-zinc-400">Built for DeFi Power Users</h3>
            <p className="text-gray-300 mb-4">
              Rabby Wallet was designed specifically with DeFi users in mind. It offers advanced features like transaction simulation, which allows you to preview the outcome of complex DeFi interactions before confirming them. This helps prevent unexpected token approvals and potential security risks.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-zinc-400 mt-6">Enhanced Security Features</h3>
              <p className="text-gray-300 mb-4">
                Rabby includes built-in phishing detection that warns you about suspicious websites and contract interactions. It also provides detailed information about smart contracts you're interacting with, including risk assessments and verification status, helping you make informed decisions.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-zinc-400 mt-6">Seamless Multi-Chain Experience</h3>
              <p className="text-gray-300 mb-4">
                Unlike many wallets that treat alternative chains as an afterthought, Rabby was built from the ground up to support multiple networks. It provides a consistent user experience across Ethereum, BSC, Polygon, Arbitrum, Optimism, and many other EVM-compatible chains, making it perfect for users who regularly bridge assets or use multiple blockchains.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-zinc-400 hover:text-zinc-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Getting Started with Rabby</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Download & Install",
                description: "Install the Rabby extension from the Chrome Web Store or download directly from the official website."
              },
              {
                step: "2",
                title: "Create or Import Wallet",
                description: "Set up a new wallet or import your existing wallet using seed phrase, private key, or hardware wallet."
              },
              {
                step: "3",
                title: "Connect to DApps",
                description: "Start exploring the world of DeFi by connecting to your favorite decentralized applications."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-zinc-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Upgrade Your Wallet Experience?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Download Rabby Wallet today and experience the next generation of crypto wallet technology.
          </p>
          <ButtonLink 
            href="https://rabby.io/" 
            className="bg-zinc-600 hover:bg-zinc-700 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Download Rabby Wallet <ArrowRight className="ml-2 w-5 h-5" />
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
