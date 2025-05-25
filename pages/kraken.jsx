import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown, DollarSign, Shield, Zap, BarChart } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import AnimatedFeatures from '../components/AnimatedFeatures';
import BonusCalculator from '../components/BonusCalculator';
import { useState } from 'react';

export default function KrakenPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Bank-Level Security",
      description: "Industry-leading security practices with 95% of assets stored in air-gapped cold storage.",
      icon: Shield
    },
    {
      title: "Regulated Exchange",
      description: "Fully compliant with regulations in multiple jurisdictions, providing peace of mind for traders.",
      icon: BarChart
    },
    {
      title: "Advanced Trading",
      description: "Powerful tools for both beginners and professional traders with margin trading up to 5x.",
      icon: Zap
    },
    {
      title: "Low Trading Fees",
      description: "Competitive fee structure with volume-based discounts for active traders.",
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-purple-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-400">
            Kraken
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            One of the most trusted and secure cryptocurrency exchanges in the world.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="purple-400" />

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Trading Volume", value: "$18B+", unit: "Daily" },
            { label: "Active Users", value: "9M+", unit: "Worldwide" },
            { label: "Cryptocurrencies", value: "185+", unit: "Listed" },
            { label: "Years in Operation", value: "11+", unit: "Since 2011" }
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="bg-purple-900/20 border border-purple-900/30 rounded-xl p-4 text-center"
              variants={itemVariants}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-purple-400">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.unit}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bonus Calculator */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-purple-400">Calculate Your Kraken Bonus</h2>
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
          <h2 className="text-2xl font-bold mb-6 text-center text-purple-400">Why Choose Kraken?</h2>
          
          <div className="bg-zinc-900/80 rounded-xl p-6 border border-purple-900/30">
            <p className="text-gray-300 mb-4">
              Kraken is one of the oldest and most respected cryptocurrency exchanges, known for its strong security practices, regulatory compliance, and excellent customer service.
            </p>
            
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-300 mb-4">
                  Founded in 2011, Kraken has established itself as a leader in the cryptocurrency exchange industry. The platform has never been hacked, thanks to its comprehensive security measures including 24/7 surveillance, encrypted cold storage, and regular security audits.
                </p>
                <p className="text-gray-300 mb-4">
                  Kraken offers a wide range of trading options including spot trading, margin trading, futures, and staking services. The platform supports over 185 cryptocurrencies and is available in more than 190 countries worldwide.
                </p>
                <p className="text-gray-300">
                  By signing up through our affiliate link, you'll receive exclusive benefits including reduced trading fees and access to special promotions only available to referred users.
                </p>
              </motion.div>
            )}
            
            <button 
              onClick={() => setShowMore(!showMore)}
              className="flex items-center justify-center w-full mt-2 text-purple-400 hover:text-purple-300 transition-colors"
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
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Ready to Start Trading?</h2>
          <p className="text-lg text-gray-300 mb-6">
            Join Kraken today and receive a sign-up bonus using my referral link.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ButtonLink 
              href="https://www.kraken.com/sign-up?ref=YOUR_REF_CODE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg px-8 py-6 bg-purple-600 text-white hover:bg-purple-500 font-semibold"
            >
              <span className="flex items-center justify-center">
                Join Kraken Now <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </ButtonLink>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-purple-400 transition-colors">
              ← Back to Home
            </Link>
            <span className="mx-4">|</span>
            <Link href="/portfolio" className="text-gray-400 hover:text-purple-400 transition-colors">
              Compare All Exchanges
            </Link>
          </div>
          <p>Affiliate link provided by 1ewis.com - thank you for your support!</p>
        </footer>
      </div>
    </div>
  );
}
