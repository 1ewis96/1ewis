import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, CreditCard, Smartphone, Globe, DollarSign } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getReferralLink } from '../../utils/referralLinks';

export default function RevolutPage() {
  const [showMore, setShowMore] = useState(false);
  const referralLink = getReferralLink('cards', 'revolut');
  
  const features = [
    {
      title: "Crypto Trading",
      description: "Buy, sell, and hold 80+ cryptocurrencies directly in the app with competitive fees.",
      icon: DollarSign
    },
    {
      title: "Metal Cards",
      description: "Premium metal cards with exclusive perks, cashback, and airport lounge access.",
      icon: CreditCard
    },
    {
      title: "Global Spending",
      description: "Spend in 150+ currencies at the interbank exchange rate with no hidden fees.",
      icon: Globe
    },
    {
      title: "All-in-One App",
      description: "Banking, investing, crypto, and payments all in one secure mobile application.",
      icon: Smartphone
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
            Revolut
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The all-in-one financial super app with crypto trading and premium metal cards.
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
            { label: "Users", value: "25M+", unit: "Worldwide" },
            { label: "Countries", value: "35+", unit: "Available" },
            { label: "Currencies", value: "150+", unit: "Supported" },
            { label: "Cryptos", value: "80+", unit: "For Trading" }
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
                name: "Standard",
                price: "Free",
                color: "bg-gray-800",
                features: ["Free UK Account", "Free Euro IBAN Account", "Spend in 150+ Currencies", "Basic Crypto Trading", "Savings Vaults"]
              },
              {
                name: "Premium",
                price: "$9.99/month",
                color: "bg-blue-800",
                features: ["All Standard Features", "Global Express Delivery", "Overseas Medical Insurance", "Priority Customer Support", "Exclusive Card Designs"]
              },
              {
                name: "Metal",
                price: "$16.99/month",
                color: "bg-blue-700",
                features: ["All Premium Features", "Exclusive Metal Card", "Up to 1% Cashback", "Airport Lounge Access", "Dedicated Concierge Service"]
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
                  {plan.price !== "Free" && <span className="text-xs text-gray-300">billed annually</span>}
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Revolut?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">All-in-One Financial Solution</h3>
            <p className="text-gray-300 mb-4">
              Revolut combines traditional banking services with modern financial tools, including cryptocurrency trading, stock investing, and global money transfers. This all-in-one approach eliminates the need for multiple apps and accounts, streamlining your financial life in one secure platform.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Seamless Crypto Integration</h3>
              <p className="text-gray-300 mb-4">
                With Revolut, you can buy, sell, and hold over 80 cryptocurrencies directly within the same app you use for everyday banking. The platform offers competitive fees and real-time price alerts, making it easy to manage your crypto portfolio alongside your traditional finances. You can even round up your spare change from everyday purchases and automatically invest it in the cryptocurrency of your choice.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Premium Metal Experience</h3>
              <p className="text-gray-300 mb-4">
                Revolut's Metal plan offers a premium 18g metal card with exclusive perks, including up to 1% cashback on all payments, airport lounge access, and dedicated concierge service. Metal subscribers also enjoy higher ATM withdrawal limits, priority customer support, and exclusive rates on currency exchange and crypto trading, making it the ultimate choice for frequent travelers and crypto enthusiasts.
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
                title: "Crypto Enthusiasts",
                description: "Access 80+ cryptocurrencies with competitive fees and seamless integration with your everyday banking."
              },
              {
                title: "Global Travelers",
                description: "Spend abroad with no hidden fees, access airport lounges, and enjoy comprehensive travel insurance."
              },
              {
                title: "Digital Nomads",
                description: "Manage multiple currencies, receive payments globally, and access your money anywhere in the world."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Revolutionize Your Finances?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for Revolut today and get a free month of Revolut Premium when you use my referral link. Experience the all-in-one financial super app with crypto trading and premium features.
          </p>
          <ButtonLink 
            href={referralLink}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join Revolut <ArrowRight className="ml-2 w-5 h-5" />
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
                <Shield className="w-5 h-5 mr-2" />
                GitHub
              </a>
              <a 
                href="https://x.com/1ewis_" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:text-gray-300 transition-colors duration-200"
              >
                <Zap className="w-5 h-5 mr-2" />
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
