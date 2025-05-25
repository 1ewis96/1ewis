import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, CreditCard, Percent, Globe, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function CryptoComCardPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Up to 8% Cashback",
      description: "Earn generous cashback rewards on all your purchases, with rates varying based on your card tier.",
      icon: Percent
    },
    {
      title: "Zero Annual Fees",
      description: "Enjoy all the benefits of your crypto card without paying any annual maintenance fees.",
      icon: CreditCard
    },
    {
      title: "Global Acceptance",
      description: "Use your card anywhere Visa is accepted, with perfect interbank exchange rates worldwide.",
      icon: Globe
    },
    {
      title: "Enhanced Security",
      description: "Protect your funds with industry-standard security features including freeze card functionality.",
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
            Crypto.com Visa Card
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The metal Visa card that lets you spend crypto with cashback rewards on every purchase.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="blue-400" />

        {/* Card Tiers Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Card Tiers & Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Midnight Blue",
                stake: "No Stake",
                cashback: "1%",
                color: "bg-blue-900",
                benefits: ["No Annual Fee", "Spotify Rebate (up to $13.99)"]
              },
              {
                name: "Ruby Steel",
                stake: "$400",
                cashback: "2%",
                color: "bg-red-600",
                benefits: ["No Annual Fee", "Spotify Rebate (up to $13.99)", "Airport Lounge Access"]
              },
              {
                name: "Royal Indigo/Jade Green",
                stake: "$4,000",
                cashback: "3%",
                color: "bg-indigo-600",
                benefits: ["No Annual Fee", "Spotify & Netflix Rebates", "Airport Lounge Access", "10% Staking Rewards"]
              },
              {
                name: "Frosted Rose Gold/Icy White",
                stake: "$40,000",
                cashback: "5%",
                color: "bg-pink-600",
                benefits: ["No Annual Fee", "Spotify, Netflix & Amazon Prime Rebates", "Airport Lounge Access +1 Guest", "12% Staking Rewards"]
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${card.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{card.name}</h3>
                <div className="mb-4">
                  <span className="text-xs text-gray-300">CRO Stake Requirement</span>
                  <p className="text-lg font-semibold">{card.stake}</p>
                </div>
                <div className="mb-4">
                  <span className="text-xs text-gray-300">Cashback Rate</span>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Crypto.com Visa Card?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Generous Cashback Rewards</h3>
            <p className="text-gray-300 mb-4">
              The Crypto.com Visa Card offers some of the most competitive cashback rates in the industry, with up to 8% back on all purchases depending on your card tier. Unlike traditional credit cards, there's no need to worry about categories or spending limits - you'll earn cashback on virtually everything you buy.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Subscription Rebates</h3>
              <p className="text-gray-300 mb-4">
                Depending on your card tier, you can receive 100% rebates on popular subscriptions like Spotify, Netflix, and Amazon Prime. These rebates are paid in CRO tokens, which you can hold for potential appreciation or convert to other currencies.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Global Accessibility</h3>
              <p className="text-gray-300 mb-4">
                As a Visa card, the Crypto.com card is accepted by over 80 million merchants worldwide. You'll enjoy perfect interbank exchange rates when spending abroad, making it an ideal companion for international travelers looking to avoid excessive foreign transaction fees.
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

        {/* Getting Started Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How to Get Your Card</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Sign Up for Crypto.com",
                description: "Create an account on the Crypto.com app and complete the KYC verification process."
              },
              {
                step: "2",
                title: "Stake CRO Tokens",
                description: "Purchase and stake the required amount of CRO tokens for your desired card tier."
              },
              {
                step: "3",
                title: "Request Your Card",
                description: "Apply for your physical card in the app and start using the virtual card immediately."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-4 text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Your Metal Crypto Card?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for Crypto.com today and apply for your Visa Card with generous cashback rewards. Use my referral link to get a bonus.
          </p>
          <ButtonLink 
            href="https://crypto.com/app/YOUR_REF_CODE" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Get Your Crypto.com Card <ArrowRight className="ml-2 w-5 h-5" />
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
