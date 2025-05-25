import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function BinancePage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Ultra Low Fees",
      description: "Trade with some of the lowest fees in the market - as low as 0.1%. Save even more with BNB holdings.",
      icon: DollarSign
    },
    {
      title: "Staking & Earn",
      description: "Grow your crypto through staking, savings, and liquidity farming with APYs up to 120%.",
      icon: Zap
    },
    {
      title: "Powerful Trading Tools",
      description: "Advanced charts, futures, and leveraged tokens all in one place for professional traders.",
      icon: BarChart
    },
    {
      title: "Bank-Level Security",
      description: "Your funds are protected by industry-leading security measures and the SAFU insurance fund.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-yellow-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400">
            Binance
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Join the world's largest crypto exchange. Low fees, deep liquidity, and powerful trading tools.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="yellow-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$76B+", unit: "Daily" },
            { label: "Active Users", value: "90M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "350+", unit: "Listed" },
            { label: "Countries", value: "180+", unit: "Supported" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-yellow-900/20 border border-yellow-900/30 rounded-xl p-4 text-center"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.unit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bonus Calculator */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-yellow-400">Calculate Your Binance Bonus</h2>
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
          <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">Why Choose Binance?</h2>
          
          <div className="bg-zinc-900/80 rounded-xl p-6 border border-yellow-900/30">
            <p className="text-gray-300 mb-4">
              Binance is the world's leading cryptocurrency exchange by trading volume, serving millions of users worldwide. With a robust security system and a wide range of products and services, Binance offers a comprehensive ecosystem for all your crypto needs.
            </p>
            
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-300 mb-4">
                  Founded in 2017, Binance has quickly risen to become the most trusted cryptocurrency exchange platform. The exchange offers a wide range of features including spot trading, margin trading, futures, options, savings, staking, and more.
                </p>
                <p className="text-gray-300 mb-4">
                  With the lowest trading fees in the industry and deep liquidity across hundreds of trading pairs, Binance provides an optimal trading environment for both beginners and professional traders alike.
                </p>
                <p className="text-gray-300">
                  By signing up through our affiliate link, you'll receive exclusive benefits including a 10% discount on trading fees for 180 days and access to special promotions only available to referred users.
                </p>
              </motion.div>
            )}
            
            <button 
              onClick={() => setShowMore(!showMore)}
              className="flex items-center justify-center w-full mt-2 text-yellow-400 hover:text-yellow-300 transition-colors"
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
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Ready to Start Trading?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Sign up today and get 10% off your trading fees using my referral link.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonLink 
              href="https://www.binance.com/en/activity/referral-entry?ref=YOUR_REF_CODE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg px-8 py-6 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
            >
              <span className="flex items-center justify-center">
                Join Binance Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
              ← Back to Home
            </Link>
            <span className="mx-4">|</span>
            <Link href="/portfolio" className="text-gray-400 hover:text-yellow-400 transition-colors">
              Compare All Exchanges
            </Link>
          </div>
          <p>Affiliate link provided by 1ewis.com - thank you for your support!</p>
        </footer>
      </div>
    </div>
  );
}
