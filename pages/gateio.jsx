import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function GateioPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Low Trading Fees",
      description: "Enjoy competitive trading fees starting at just 0.2% with additional discounts for GT token holders.",
      icon: DollarSign
    },
    {
      title: "Extensive Coin Selection",
      description: "Access over 1,400+ cryptocurrencies and trading pairs, including many exclusive listings.",
      icon: BarChart
    },
    {
      title: "Advanced Trading Tools",
      description: "Utilize professional-grade tools including grid trading, futures, options, and leveraged tokens.",
      icon: Zap
    },
    {
      title: "Robust Security",
      description: "Your assets are protected by multi-signature cold wallets and advanced risk control systems.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-blue-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">
            Gate.io
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            A comprehensive crypto exchange with advanced trading tools and extensive coin selection.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="blue-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$1B+", unit: "Daily" },
            { label: "Active Users", value: "12M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "1,400+", unit: "Listed" },
            { label: "Affiliate Rate", value: "40%", unit: "Up to" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-blue-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Gate.io?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Comprehensive Trading Platform</h3>
            <p className="text-gray-300 mb-4">
              Gate.io offers one of the most comprehensive trading platforms in the industry, with support for spot trading, margin trading, futures, options, and even leveraged tokens. This makes it suitable for both beginners and advanced traders looking for sophisticated tools.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Wide Range of Cryptocurrencies</h3>
              <p className="text-gray-300 mb-4">
                With over 1,400 cryptocurrencies available, Gate.io is perfect for traders looking to diversify their portfolio beyond mainstream coins. The exchange regularly lists promising new projects, giving you early access to potential high-growth tokens.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Attractive Affiliate Program</h3>
              <p className="text-gray-300 mb-4">
                Gate.io's affiliate program offers up to 40% commission on trading fees generated by your referrals. This tiered structure rewards you more as you bring in more active traders, making it an excellent choice for influencers and community builders.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Bonus Calculator */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Calculate Your Potential Bonuses</h2>
          <BonusCalculator />
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading on Gate.io?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up today and access over 1,400+ cryptocurrencies with advanced trading tools. Use my referral link to support this site.
          </p>
          <ButtonLink 
            href="https://www.gate.io/signup/YOUR_REF_CODE" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join Gate.io Now <ArrowRight className="ml-2 w-5 h-5" />
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
