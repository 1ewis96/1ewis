import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, LineChart, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function TradingViewPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Advanced Charting",
      description: "Access professional-grade charting tools with over 100 technical indicators and drawing tools.",
      icon: () => <LineChart size={24} />
    },
    {
      title: "Real-Time Data",
      description: "Get real-time market data across global markets including stocks, forex, crypto, and commodities.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Customizable Screeners",
      description: "Find trading opportunities with powerful stock, forex, and crypto screeners based on your criteria.",
      icon: () => <BarChart size={24} />
    },
    {
      title: "Community Insights",
      description: "Access ideas and analysis from millions of traders in the world's largest social network for investors.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-indigo-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-indigo-400">
            TradingView
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The ultimate platform for market analysis with powerful charting tools and a global community.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="indigo-400" />

        {/* Plans Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Subscription Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Basic",
                price: "Free",
                color: "bg-gray-800",
                features: ["1 Chart Per Layout", "1 Indicator Per Chart", "Basic Indicators", "Community Access"]
              },
              {
                name: "Pro",
                price: "$14.95/month",
                color: "bg-indigo-800",
                features: ["8 Charts Per Layout", "5 Indicators Per Chart", "Custom Indicators", "No Ads", "Extended Trading Hours"]
              },
              {
                name: "Pro+",
                price: "$29.95/month",
                color: "bg-indigo-700",
                features: ["Unlimited Charts", "25 Indicators Per Chart", "Second-Based Intervals", "4x Server-Side Alerts", "Multiple Devices"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${plan.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{plan.price}</p>
                  <span className="text-xs text-gray-300">billed annually</span>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-gray-300 mb-2 block">Key Features</span>
                  <ul className="text-sm">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-1 flex items-start">
                        <span className="mr-2 text-green-400">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose TradingView?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-indigo-400">All-In-One Trading Platform</h3>
            <p className="text-gray-300 mb-4">
              TradingView combines powerful charting tools, real-time data, and a vibrant community of traders in one comprehensive platform. Whether you're a beginner or a professional trader, TradingView provides everything you need to analyze markets and make informed trading decisions.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-indigo-400 mt-6">Cross-Platform Accessibility</h3>
              <p className="text-gray-300 mb-4">
                Access TradingView from anywhere - desktop, web browser, or mobile app. Your charts, indicators, and settings sync across all your devices, allowing you to stay connected to the markets no matter where you are.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-indigo-400 mt-6">Vibrant Trading Community</h3>
              <p className="text-gray-300 mb-4">
                With millions of active traders sharing ideas and analysis, TradingView hosts the world's largest social network for investors. Learn from experienced traders, share your own insights, and improve your trading strategies through community collaboration.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mt-2 mx-auto"
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Perfect For All Traders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Crypto Traders",
                description: "Access real-time data for hundreds of cryptocurrencies across major exchanges, with specialized indicators for crypto markets."
              },
              {
                title: "Stock Investors",
                description: "Analyze global stock markets with fundamental data, earnings reports, and powerful stock screeners to find opportunities."
              },
              {
                title: "Technical Analysts",
                description: "Utilize over 100 built-in indicators and drawing tools, or create your own custom indicators with Pine Script."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-indigo-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Elevate Your Trading?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for TradingView today and access professional-grade charting tools and a global community of traders. Use my referral link to get up to $30 off your first paid plan.
          </p>
          <ButtonLink 
            href="https://www.tradingview.com/pricing/?share_your_love=LewisT" 
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join TradingView <ArrowRight className="ml-2 w-5 h-5" />
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
