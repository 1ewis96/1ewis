import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, CreditCard, Smartphone, DollarSign, Percent } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getReferralLink } from '../../utils/referralLinks';

export default function YouHodlerPage() {
  const [showMore, setShowMore] = useState(false);
  const referralLink = getReferralLink('wallets', 'youhodler');
  
  const features = [
    {
      title: "Crypto Savings",
      description: "Earn up to 13% APY on your crypto with flexible terms and weekly payouts.",
      icon: Percent
    },
    {
      title: "Crypto Loans",
      description: "Get instant cash loans using your crypto as collateral with up to 90% LTV.",
      icon: DollarSign
    },
    {
      title: "Multi HODL",
      description: "Multiply your crypto holdings with leverage trading up to 30x.",
      icon: Zap
    },
    {
      title: "Crypto Credit Card",
      description: "Spend your crypto assets anywhere with the YouHodler Visa card.",
      icon: CreditCard
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
            YouHodler
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The all-in-one crypto platform for earning, borrowing, and multiplying your digital assets.
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
            { label: "Supported Coins", value: "50+", unit: "Cryptocurrencies" },
            { label: "Max APY", value: "13%", unit: "Annual Yield" },
            { label: "Min Deposit", value: "$100", unit: "To Start" },
            { label: "Max LTV", value: "90%", unit: "Loan-to-Value" }
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

        {/* Yield Rates Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Top Earning Opportunities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "USDT/USDC",
                rate: "13% APY",
                color: "bg-teal-800",
                features: ["Stablecoins", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              },
              {
                name: "Bitcoin (BTC)",
                rate: "8% APY",
                color: "bg-teal-700",
                features: ["Most Popular Crypto", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              },
              {
                name: "Ethereum (ETH)",
                rate: "7% APY",
                color: "bg-teal-800",
                features: ["Leading Altcoin", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              }
            ].map((coin, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${coin.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{coin.name}</h3>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{coin.rate}</p>
                  <span className="text-xs text-gray-300">earn passively</span>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-gray-300 mb-2 block">Key Features</span>
                  <ul className="text-sm">
                    {coin.features.map((feature, i) => (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose YouHodler?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-teal-400">Industry-Leading Yield Rates</h3>
            <p className="text-gray-300 mb-4">
              YouHodler offers some of the highest interest rates in the crypto lending industry, with up to 13% APY on stablecoins and competitive rates on major cryptocurrencies like Bitcoin and Ethereum. Unlike many competitors, YouHodler provides weekly payouts with no mandatory lock-up periods, giving you both high yields and flexibility with your crypto assets.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Innovative Crypto Tools</h3>
              <p className="text-gray-300 mb-4">
                Beyond simple savings accounts, YouHodler offers a suite of innovative tools to maximize your crypto potential. Their Multi HODL feature allows you to multiply your crypto holdings with leverage up to 30x, while Turbocharge enables you to stack loans to build positions in rising markets. These tools provide unique opportunities to grow your portfolio that aren't available on most other platforms.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Secure and Regulated</h3>
              <p className="text-gray-300 mb-4">
                YouHodler prioritizes security with institutional-grade custody solutions, regular security audits, and up to $150 million in pooled crime insurance. The platform is compliant with Swiss financial regulations and implements strict AML/KYC procedures, providing a level of security and legitimacy that's essential for a crypto financial services provider.
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
                title: "Passive Income Seekers",
                description: "Earn weekly interest payments on your crypto holdings without locking up your assets."
              },
              {
                title: "Crypto Holders Needing Cash",
                description: "Get instant cash loans using your crypto as collateral without selling your assets."
              },
              {
                title: "Active Crypto Traders",
                description: "Use Multi HODL to leverage your positions and capitalize on market movements."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">{item.title}</h3>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Earning on Your Crypto?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for YouHodler today and start earning up to 13% APY on your crypto assets. Use my referral link to get exclusive bonuses when you join.
          </p>
          <ButtonLink 
            href={referralLink}
            className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Join YouHodler <ArrowRight className="ml-2 w-5 h-5" />
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
