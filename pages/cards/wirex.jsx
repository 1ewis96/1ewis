import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, CreditCard, Percent, Globe, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function WirexPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Crypto Cashback",
      description: "Earn up to 8% crypto rewards on all in-store and online purchases with Wirex Cryptoback™.",
      icon: Percent
    },
    {
      title: "Multi-Currency Card",
      description: "Spend 150+ traditional and cryptocurrencies at over 80 million merchants worldwide.",
      icon: CreditCard
    },
    {
      title: "Real-Time Conversion",
      description: "Convert between crypto and fiat currencies instantly with competitive exchange rates.",
      icon: Zap
    },
    {
      title: "Global Acceptance",
      description: "Use your card anywhere Visa or Mastercard is accepted, with no foreign transaction fees.",
      icon: Globe
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-sky-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-sky-400">
            Wirex Card
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The world's first crypto-enabled payment card with rewards on every purchase.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="sky-400" />

        {/* Card Tiers Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Card Plans & Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Standard",
                stake: "No Stake",
                cashback: "0.5%",
                color: "bg-gray-800",
                benefits: ["Free Virtual Card", "Interbank Exchange Rates", "No Monthly Fee"]
              },
              {
                name: "Premium",
                stake: "30,000 WXT",
                cashback: "1%",
                color: "bg-sky-800",
                benefits: ["Free Plastic Card", "ATM Withdrawals: $400/month", "24/7 Customer Support"]
              },
              {
                name: "Elite",
                stake: "100,000 WXT",
                cashback: "2%",
                color: "bg-sky-700",
                benefits: ["Free Premium Card", "ATM Withdrawals: $800/month", "Dedicated Account Manager"]
              },
              {
                name: "X-Tras",
                stake: "1,000,000 WXT",
                cashback: "8%",
                color: "bg-sky-600",
                benefits: ["Free Metal Card", "Unlimited ATM Withdrawals", "Airport Lounge Access", "Premium Concierge"]
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${card.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                <div className="mb-4">
                  <span className="text-xs text-gray-300">WXT Stake Requirement</span>
                  <p className="text-lg font-semibold">{card.stake}</p>
                </div>
                <div className="mb-4">
                  <span className="text-xs text-gray-300">Cryptoback™ Rate</span>
                  <p className="text-3xl font-bold">{card.cashback}</p>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-gray-300 mb-2 block">Key Benefits</span>
                  <ul className="text-sm">
                    {card.benefits.map((benefit, i) => (
                      <li key={i} className="mb-1 flex items-start">
                        <span className="mr-2 text-green-400">✓</span> {benefit}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Wirex?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-sky-400">Pioneering Crypto Payments</h3>
            <p className="text-gray-300 mb-4">
              Wirex was the first company to develop a crypto-enabled payment card, allowing users to seamlessly spend both traditional and cryptocurrencies in everyday life. Their innovative Cryptoback™ rewards program gives you up to 8% back in WXT tokens on all purchases, providing a simple way to accumulate crypto assets as you spend.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-sky-400 mt-6">Multi-Currency Functionality</h3>
              <p className="text-gray-300 mb-4">
                With Wirex, you can hold, exchange, and spend over 150 traditional and cryptocurrencies from a single account. The platform offers competitive exchange rates and real-time conversion, making it easy to switch between currencies based on market conditions or your spending needs.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-sky-400 mt-6">Global Accessibility</h3>
              <p className="text-gray-300 mb-4">
                Wirex cards are accepted at over 80 million merchants worldwide that accept Visa or Mastercard. You can make purchases online or in-store, withdraw cash from ATMs, and enjoy zero foreign exchange fees when traveling internationally. This global accessibility makes Wirex an ideal solution for digital nomads and frequent travelers.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-sky-400 hover:text-sky-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How to Get Your Wirex Card</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Sign Up for Wirex",
                description: "Create an account on the Wirex app or website and complete the verification process."
              },
              {
                step: "2",
                title: "Choose Your Plan",
                description: "Select the card plan that best suits your needs and stake WXT tokens if required."
              },
              {
                step: "3",
                title: "Order Your Card",
                description: "Request your physical card and start using the virtual card immediately for online purchases."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-sky-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Spend Crypto in Everyday Life?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for Wirex today and get your crypto-enabled payment card with rewards on every purchase. Use my referral link to get a bonus.
          </p>
          <ButtonLink 
            href="https://wirexapp.com/r/YOUR_REF_CODE" 
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Get Your Wirex Card <ArrowRight className="ml-2 w-5 h-5" />
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
