import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function MetaMaskPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Self-Custody Wallet",
      description: "Maintain full control of your private keys and digital assets with this non-custodial wallet solution.",
      icon: () => <Wallet size={24} />
    },
    {
      title: "DApp Browser",
      description: "Access thousands of decentralized applications directly from your wallet interface.",
      icon: () => <BarChart size={24} />
    },
    {
      title: "Multi-Chain Support",
      description: "Connect to Ethereum, Binance Smart Chain, Polygon, Avalanche, and many other EVM-compatible networks.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Enhanced Security",
      description: "Protect your assets with industry-standard encryption and optional hardware wallet integration.",
      icon: () => <Shield size={24} />
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-orange-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-orange-400">
            MetaMask
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The leading self-custody wallet and gateway to blockchain applications.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="orange-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Active Users", value: "30M+", unit: "Worldwide" },
            { label: "Supported Chains", value: "15+", unit: "Networks" },
            { label: "DApps Access", value: "10,000+", unit: "Applications" },
            { label: "Languages", value: "20+", unit: "Supported" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-orange-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose MetaMask?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-orange-400">Industry Standard for Web3</h3>
            <p className="text-gray-300 mb-4">
              MetaMask has established itself as the industry standard for accessing Web3 applications. With over 30 million active users, it's the most widely used and trusted Ethereum wallet in the ecosystem, making it compatible with virtually every DApp you might want to use.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-orange-400 mt-6">Complete Control of Your Assets</h3>
              <p className="text-gray-300 mb-4">
                As a self-custody wallet, MetaMask gives you complete control over your private keys and digital assets. Unlike exchange wallets, your crypto is truly yours - no third party can freeze your funds or restrict your access. This aligns perfectly with the core principles of decentralization and financial sovereignty.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-orange-400 mt-6">Seamless Multi-Chain Experience</h3>
              <p className="text-gray-300 mb-4">
                While MetaMask started as an Ethereum wallet, it now supports multiple blockchain networks including Binance Smart Chain, Polygon, Avalanche, and many other EVM-compatible chains. This multi-chain functionality allows you to easily manage assets across different networks from a single interface.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-orange-400 hover:text-orange-300 transition-colors mt-2 mx-auto"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Getting Started with MetaMask</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Download & Install",
                description: "Install the MetaMask extension from your browser's web store or download the mobile app from the App Store or Google Play."
              },
              {
                step: "2",
                title: "Create or Import Wallet",
                description: "Set up a new wallet by creating a password and securely storing your recovery phrase, or import an existing wallet."
              },
              {
                step: "3",
                title: "Connect to Networks",
                description: "Add your preferred blockchain networks and start exploring the world of decentralized applications."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-orange-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Enter the World of Web3?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Download MetaMask today and start exploring thousands of decentralized applications.
          </p>
          <ButtonLink 
            href="https://metamask.io/download/" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Download MetaMask <ArrowRight className="ml-2 w-5 h-5" />
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
