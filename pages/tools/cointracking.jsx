import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, LineChart, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function CoinTrackingPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Portfolio Tracking",
      description: "Monitor your entire crypto portfolio across all exchanges and wallets in one dashboard.",
      icon: () => <LineChart size={24} />
    },
    {
      title: "Tax Reporting",
      description: "Generate tax reports for 25+ countries with support for various accounting methods.",
      icon: () => <BarChart size={24} />
    },
    {
      title: "Exchange Integration",
      description: "Connect to 110+ exchanges and 15+ blockchains with automatic data import.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Security & Privacy",
      description: "Keep your financial data secure with industry-leading security measures and privacy controls.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-violet-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-violet-400">
            CoinTracking
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The comprehensive crypto portfolio management and tax reporting solution.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="violet-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Users", value: "1.2M+", unit: "Worldwide" },
            { label: "Exchanges", value: "110+", unit: "Supported" },
            { label: "Transactions", value: "25B+", unit: "Tracked" },
            { label: "Countries", value: "25+", unit: "Tax Reports" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-violet-400">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
              <span className="text-xs text-gray-500">{stat.unit}</span>
            </motion.div>
          ))}
        </motion.div>

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
                name: "Free",
                price: "$0",
                color: "bg-gray-800",
                features: ["200 Transactions", "Basic Portfolio Tracking", "Limited Reporting", "Manual Imports"]
              },
              {
                name: "Pro",
                price: "$10.99/month",
                color: "bg-violet-800",
                features: ["3,500 Transactions", "Advanced Portfolio Analysis", "Tax Reports for 1 Year", "API Imports", "Priority Support"]
              },
              {
                name: "Unlimited",
                price: "$16.99/month",
                color: "bg-violet-700",
                features: ["Unlimited Transactions", "All Pro Features", "Tax Reports for All Years", "Customized Reports", "Premium Support"]
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose CoinTracking?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-violet-400">Comprehensive Portfolio Management</h3>
            <p className="text-gray-300 mb-4">
              CoinTracking offers one of the most comprehensive portfolio tracking solutions in the crypto space. It allows you to monitor all your assets across multiple exchanges and wallets in one place, providing real-time updates on your portfolio value, gains/losses, and asset allocation. The platform supports over 13,000 cryptocurrencies, ensuring that even your most obscure altcoins are tracked accurately.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-violet-400 mt-6">Tax Compliance Made Easy</h3>
              <p className="text-gray-300 mb-4">
                Crypto tax reporting can be incredibly complex, but CoinTracking simplifies the process with automated tax reports for over 25 countries. The platform supports various accounting methods (FIFO, LIFO, HIFO, etc.) and can generate all the necessary documents for tax filing, including capital gains reports, realized and unrealized gains, income reports, and more. This comprehensive approach to tax reporting has made CoinTracking the preferred choice for both individual investors and tax professionals.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-violet-400 mt-6">Seamless Data Integration</h3>
              <p className="text-gray-300 mb-4">
                With support for over 110 exchanges and 15 blockchains, CoinTracking makes it easy to import your transaction data automatically. The platform offers API connections, CSV imports, and blockchain analysis to ensure that all your transactions are captured accurately. This eliminates the need for manual data entry and reduces the risk of errors in your portfolio tracking and tax reporting.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-violet-400 hover:text-violet-300 transition-colors mt-2 mx-auto"
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
                title: "Active Traders",
                description: "Track profits and losses across multiple exchanges with real-time portfolio updates and performance analytics."
              },
              {
                title: "Long-term Investors",
                description: "Monitor your investment growth over time with detailed charts and historical performance data."
              },
              {
                title: "Tax Professionals",
                description: "Generate accurate tax reports for clients with support for various accounting methods and jurisdictions."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-violet-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Simplify Your Crypto Tracking?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for CoinTracking today and take control of your crypto portfolio and tax reporting. Use my referral link to get a 10% discount on all plans.
          </p>
          <ButtonLink 
            href="https://cointracking.info?ref=0319654" 
            className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Try CoinTracking Free <ArrowRight className="ml-2 w-5 h-5" />
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
