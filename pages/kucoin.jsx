import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function KuCoinPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Huge Altcoin Selection",
      description: "Access over 700+ cryptocurrencies and trading pairs, including many low-cap gems and promising projects.",
      icon: BarChart
    },
    {
      title: "Copy Trading Features",
      description: "Follow and automatically copy the trades of successful traders with KuCoin's innovative social trading platform.",
      icon: Zap
    },
    {
      title: "40% Lifetime Commissions",
      description: "Earn generous lifetime commissions on trading fees from users you refer to the platform.",
      icon: DollarSign
    },
    {
      title: "Advanced Security",
      description: "Your funds are protected by industry-leading security measures including cold storage and multi-factor authentication.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-teal-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-teal-400">
            KuCoin
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The People's Exchange with a vast selection of altcoins and innovative copy trading features.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="teal-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$2B+", unit: "Daily" },
            { label: "Active Users", value: "20M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "700+", unit: "Listed" },
            { label: "Affiliate Rate", value: "40%", unit: "Lifetime" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-teal-400">{stat.value}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose KuCoin?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-teal-400">Massive Altcoin Selection</h3>
            <p className="text-gray-300 mb-4">
              KuCoin is known as "The People's Exchange" because it offers one of the largest selections of alternative cryptocurrencies in the industry. If you're looking for low-cap gems or promising new projects, KuCoin often lists them before other major exchanges.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Innovative Copy Trading</h3>
              <p className="text-gray-300 mb-4">
                KuCoin's copy trading feature allows beginners to automatically mirror the trades of successful traders. This is perfect for those who want to learn from experts or don't have time to actively manage their trades.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Generous Affiliate Program</h3>
              <p className="text-gray-300 mb-4">
                With KuCoin's affiliate program, you can earn up to 40% of the trading fees generated by users you refer - for life! This makes it one of the most lucrative affiliate programs in the crypto space, perfect for content creators and community builders.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-teal-400 hover:text-teal-300 transition-colors mt-2 mx-auto"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Trading on KuCoin?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up today and access over 700+ cryptocurrencies with innovative trading features. Use my referral link to support this site.
          </p>
          <ButtonLink 
            href="https://www.kucoin.com/r/YOUR_REF_CODE" 
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join KuCoin Now <ArrowRight className="ml-2 w-5 h-5" />
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
