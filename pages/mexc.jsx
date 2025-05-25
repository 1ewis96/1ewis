import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function MEXCPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Early Coin Listings",
      description: "Access new cryptocurrencies before they hit major exchanges. MEXC is known for listing promising projects early.",
      icon: Zap
    },
    {
      title: "Competitive Trading Fees",
      description: "Enjoy low trading fees starting at just 0.2%, with further discounts available for MX token holders.",
      icon: DollarSign
    },
    {
      title: "Wide Range of Altcoins",
      description: "Trade from a selection of over 1,500 cryptocurrencies, including many that aren't available on other exchanges.",
      icon: BarChart
    },
    {
      title: "Secure Trading Environment",
      description: "MEXC employs industry-standard security protocols to keep your assets safe while trading.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-red-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-red-400">
            MEXC
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Early access to promising cryptocurrencies with up to 50% commission sharing through the affiliate program.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="red-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$5B+", unit: "Daily" },
            { label: "Active Users", value: "7M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "1,500+", unit: "Listed" },
            { label: "Affiliate Commission", value: "50%", unit: "Up to" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-red-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose MEXC?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-red-400">Perfect for Altcoin Traders</h3>
            <p className="text-gray-300 mb-4">
              MEXC is known for listing promising cryptocurrencies early, giving you access to potential gems before they hit major exchanges. With over 1,500 trading pairs and a user-friendly interface, MEXC is ideal for traders looking to diversify their portfolio with emerging projects.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-red-400 mt-6">Generous Affiliate Program</h3>
              <p className="text-gray-300 mb-4">
                MEXC offers one of the most competitive affiliate programs in the industry, with up to 50% commission sharing on trading fees. This makes it an excellent choice for content creators, communities, and influencers looking to monetize their audience.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-red-400 mt-6">Advanced Trading Features</h3>
              <p className="text-gray-300 mb-4">
                From spot trading to futures and margin trading, MEXC provides a comprehensive suite of trading options. The platform also offers staking, savings products, and an NFT marketplace, making it a one-stop shop for crypto enthusiasts.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-red-400 hover:text-red-300 transition-colors mt-2 mx-auto"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading on MEXC?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up today and get access to early coin listings and competitive trading fees. Use my referral link to support this site.
          </p>
          <ButtonLink 
            href="https://www.mexc.com/register?inviteCode=YOUR_REF_CODE" 
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join MEXC Now <ArrowRight className="ml-2 w-5 h-5" />
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
