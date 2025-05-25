import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, CreditCard, DollarSign, Globe, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function TransakPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Fiat-to-Crypto Gateway",
      description: "Buy crypto directly with credit/debit cards, bank transfers, and other local payment methods.",
      icon: DollarSign
    },
    {
      title: "Global Coverage",
      description: "Available in 125+ countries with support for 100+ cryptocurrencies across 70+ blockchains.",
      icon: Globe
    },
    {
      title: "Seamless Integration",
      description: "Easily integrate Transak into your website or app with customizable widgets and APIs.",
      icon: Zap
    },
    {
      title: "Regulatory Compliance",
      description: "Fully compliant with local regulations and KYC/AML requirements in all supported regions.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-cyan-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-cyan-400">
            Transak
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The global fiat-to-crypto payment gateway for Web3 applications.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="cyan-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Countries", value: "125+", unit: "Supported" },
            { label: "Cryptocurrencies", value: "100+", unit: "Available" },
            { label: "Blockchains", value: "70+", unit: "Integrated" },
            { label: "Payment Methods", value: "20+", unit: "Options" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-cyan-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Transak?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Simplified Crypto Purchasing</h3>
            <p className="text-gray-300 mb-4">
              Transak removes the complexity from buying cryptocurrencies by providing a seamless fiat-to-crypto on-ramp. Users can purchase crypto directly with their credit/debit cards, bank transfers, or local payment methods without having to navigate complex exchange interfaces or manage multiple accounts.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 mt-6">Global Accessibility</h3>
              <p className="text-gray-300 mb-4">
                With support for over 125 countries and 60+ fiat currencies, Transak ensures that users from around the world can access cryptocurrencies using their local payment methods. This global approach helps bridge the gap between traditional finance and the crypto ecosystem, making digital assets more accessible to everyone.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-cyan-400 mt-6">Developer-Friendly Integration</h3>
              <p className="text-gray-300 mb-4">
                For developers and businesses, Transak offers customizable widgets and robust APIs that can be easily integrated into websites, mobile apps, and DApps. This allows platforms to offer fiat on-ramp capabilities without having to build the infrastructure themselves or deal with the regulatory complexities of handling fiat transactions.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Perfect For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Crypto Wallets",
                description: "Enable users to purchase crypto directly within your wallet application, improving user experience and retention."
              },
              {
                title: "DeFi Platforms",
                description: "Allow users to fund their DeFi activities with fiat currency, removing barriers to entry for new users."
              },
              {
                title: "NFT Marketplaces",
                description: "Let collectors buy NFTs with credit cards or bank transfers, expanding your potential customer base."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How Transak Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Select Crypto",
                description: "Choose which cryptocurrency you want to purchase from the wide selection available."
              },
              {
                step: "2",
                title: "Enter Amount",
                description: "Specify how much you want to buy in your local currency or in crypto amount."
              },
              {
                step: "3",
                title: "Complete KYC",
                description: "Verify your identity with a quick and secure KYC process (only needed once)."
              },
              {
                step: "4",
                title: "Complete Payment",
                description: "Pay using your preferred payment method and receive crypto directly in your wallet."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Buy Crypto with Ease?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Use Transak to purchase cryptocurrencies directly with your credit card, bank transfer, or local payment methods. Support this site by using our referral link.
          </p>
          <ButtonLink 
            href="https://global.transak.com/?apiKey=YOUR_API_KEY" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Buy Crypto with Transak <ArrowRight className="ml-2 w-5 h-5" />
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
