import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function OKXPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "High Liquidity",
      description: "Trade with confidence on one of the most liquid exchanges in the market with minimal slippage.",
      icon: BarChart
    },
    {
      title: "Advanced Trading",
      description: "Access futures, options, and margin trading with up to 100x leverage for maximum flexibility.",
      icon: Zap
    },
    {
      title: "Web3 Wallet",
      description: "Explore DeFi, NFTs, and more with the integrated OKX Web3 wallet for seamless blockchain interaction.",
      icon: Shield
    },
    {
      title: "Competitive Fees",
      description: "Enjoy some of the most competitive fees in the industry with maker fees as low as 0.08%.",
      icon: DollarSign
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-green-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-400">
            OKX
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            A comprehensive crypto exchange with advanced trading features and high liquidity.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="green-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$38B+", unit: "Daily" },
            { label: "Active Users", value: "20M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "300+", unit: "Listed" },
            { label: "Trading Pairs", value: "600+", unit: "Available" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-green-900/20 border border-green-900/30 rounded-xl p-4 text-center"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-green-400">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.unit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bonus Calculator */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-green-400">Calculate Your OKX Bonus</h2>
          <BonusCalculator />
        </div>

        {/* Additional Info Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-400">Why Choose OKX?</h2>
          
          <div className="bg-zinc-900/80 rounded-xl p-6 border border-green-900/30">
            <p className="text-gray-300 mb-4">
              OKX is a leading global cryptocurrency exchange and Web3 ecosystem, offering a comprehensive suite of products for traders of all levels, from beginners to institutional clients.
            </p>
            
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-300 mb-4">
                  Founded in 2017, OKX has grown to become one of the largest cryptocurrency exchanges by trading volume. The platform serves over 20 million users across more than 100 countries, offering spot trading, margin trading, futures, options, and more.
                </p>
                <p className="text-gray-300 mb-4">
                  OKX stands out with its innovative Web3 ecosystem, which includes a self-custodial wallet, NFT marketplace, and DeFi hub. This allows users to seamlessly interact with decentralized applications and manage their digital assets all in one place.
                </p>
                <p className="text-gray-300">
                  By signing up through our affiliate link, you'll receive exclusive benefits including up to $10,000 in bonuses and access to special promotions only available to referred users.
                </p>
              </motion.div>
            )}
            
            <button 
              onClick={() => setShowMore(!showMore)}
              className="flex items-center justify-center w-full mt-2 text-green-400 hover:text-green-300 transition-colors"
            >
              {showMore ? "Show Less" : "Show More"}
              <ChevronDown className={`ml-1 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`} />
            </button>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-400">Ready to Start Trading?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Join OKX today and get up to $10,000 in bonuses using my referral link.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonLink 
              href="https://www.okx.com/join/YOUR_REF_CODE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg px-8 py-6 bg-green-500 text-white hover:bg-green-400 font-semibold"
            >
              <span className="flex items-center justify-center">
                Join OKX Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
              ← Back to Home
            </Link>
            <span className="mx-4">|</span>
            <Link href="/portfolio" className="text-gray-400 hover:text-green-400 transition-colors">
              Compare All Exchanges
            </Link>
          </div>
          <p>Affiliate link provided by 1ewis.com - thank you for your support!</p>
        </footer>
      </div>
    </div>
  );
}
