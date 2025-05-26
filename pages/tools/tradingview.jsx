import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, LineChart, Github, Twitter, ExternalLink, DollarSign, Check } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function TradingViewPage() {
  const [showMore, setShowMore] = useState(false);
  
  const benefits = [
    '16% savings on your first paid plan',
    'Access to professional-grade charting tools',
    'Real-time data across global markets',
    'Powerful stock, forex, and crypto screeners',
    'Access to the world\'s largest trading community',
    'Cross-platform access on desktop, web, and mobile'
  ];
  
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
      
      {/* Hero Section */}
      <div className="px-6 pt-36 pb-20 md:px-16 bg-gradient-to-b from-indigo-900/30 to-black">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 text-indigo-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              TradingView
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The ultimate platform for market analysis with powerful charting tools and a global community.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a 
                href="https://www.tradingview.com/pricing/?share_your_love=LewisT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Start Trading Now
                <ArrowRight className="inline ml-2" size={20} />
              </a>
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md"
            >
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="bg-gradient-to-r from-indigo-900/20 to-indigo-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-indigo-800/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-4">Exclusive Offer for New Users</h2>
              <p className="text-gray-300 mb-6">
                Sign up using our referral link and receive:
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-indigo-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full md:w-auto">
              <a 
                href="https://www.tradingview.com/pricing/?share_your_love=LewisT"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full md:w-auto bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Sign Up with TradingView
                <ArrowRight className="inline ml-2" size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-indigo-400">Why Choose TradingView?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              TradingView offers a secure and user-friendly platform for market analysis with powerful charting tools and a global community of traders.
            </p>
          </div>

          <AnimatedFeatures features={features} color="indigo" />
        </section>

        {/* Plans Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-400">Subscription Plans</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-8">
            Choose the plan that best fits your trading needs, from basic charting to advanced professional tools
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Basic",
                description: "Perfect for beginners",
                color: "bg-gray-800",
                features: ["1 Chart Per Layout", "1 Indicator Per Chart", "Basic Indicators", "Community Access", "Mobile App Access"]
              },
              {
                name: "Pro",
                description: "For active traders",
                color: "bg-indigo-800",
                features: ["Multiple Charts Per Layout", "Multiple Indicators Per Chart", "Custom Indicators", "Ad-Free Experience", "Extended Trading Hours", "Intraday Alerts"]
              },
              {
                name: "Pro+",
                description: "For professional traders",
                color: "bg-indigo-700",
                features: ["Unlimited Charts", "Advanced Indicators", "Second-Based Intervals", "Multiple Server-Side Alerts", "Multiple Devices", "Volume Profile Indicators", "Priority Support"]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${plan.color} rounded-xl border border-gray-700 flex flex-col h-full overflow-hidden`}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Header Section - Fixed Height */}
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-indigo-300 text-sm h-6 flex items-center">{plan.description}</p>
                </div>
                
                {/* Badge Section - Fixed Position */}
                <div className="px-6 pt-6 pb-2">
                  <div className="inline-block bg-indigo-900/30 px-3 py-1 rounded-full text-xs text-indigo-300">
                    Exclusive benefits with referral
                  </div>
                </div>
                
                {/* Features Section */}
                <div className="px-6 py-4 flex-grow">
                  <ul className="text-sm space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Button Section - Fixed Position */}
                <div className="p-6 pt-4 mt-auto">
                  <a 
                    href="https://www.tradingview.com/pricing/?share_your_love=LewisT"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    Get {plan.name}
                  </a>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-400">Why Choose TradingView?</h2>
          
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
              
              <h3 className="text-xl font-semibold mb-4 text-indigo-400 mt-6">Advanced Charting Tools</h3>
              <p className="text-gray-300 mb-4">
                TradingView offers over 100 built-in indicators and drawing tools, plus the ability to create custom indicators with Pine Script. The platform supports multiple timeframes, from seconds to months, giving you complete flexibility in your analysis.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-indigo-400 mt-6">Seamless Integration</h3>
              <p className="text-gray-300 mb-4">
                Connect TradingView with supported brokers for direct trading from the charts. The platform also offers API access for developers and integration with various trading systems.
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-indigo-400">Perfect For All Traders</h2>
          
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
          <div className="bg-gradient-to-r from-indigo-900/30 to-indigo-600/30 rounded-2xl p-8 border border-indigo-800/50">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-indigo-400">Ready to Elevate Your Trading?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Sign up for TradingView today and access professional-grade charting tools and a global community of traders. Use my referral link to get <span className="text-green-400 font-bold">16% savings</span> on your first paid plan!
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg py-3 px-4 inline-block">
                <p className="text-sm text-gray-300 flex items-center justify-center">
                  <span className="bg-indigo-900/30 text-indigo-400 text-xs px-2 py-1 rounded mr-2">BENEFIT</span>
                  Access to professional-grade charting tools
                </p>
              </div>
              
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg py-3 px-4 inline-block">
                <p className="text-sm text-gray-300 flex items-center justify-center">
                  <span className="bg-indigo-900/30 text-indigo-400 text-xs px-2 py-1 rounded mr-2">BENEFIT</span>
                  Global community of traders
                </p>
              </div>
            </div>
            
            <ButtonLink 
              href="https://www.tradingview.com/pricing/?share_your_love=LewisT" 
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 text-lg rounded-lg"
              target="_blank"
            >
              <span className="flex items-center justify-center">
                Join TradingView <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </ButtonLink>
          </div>
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
      
      {/* Fixed Referral Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href="https://www.tradingview.com/pricing/?share_your_love=LewisT"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-indigo-500 hover:bg-indigo-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="mr-2 text-xs bg-green-500 text-white px-2 py-1 rounded">16% OFF</span>
          Sign Up Now
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
      

    </div>
  );
}
