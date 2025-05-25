import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, CreditCard, DollarSign, Globe, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function RampPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Low Fees",
      description: "Save on transaction costs with some of the lowest fees in the industry for crypto on-ramps.",
      icon: DollarSign
    },
    {
      title: "Fast Processing",
      description: "Get your crypto quickly with rapid transaction processing and minimal waiting times.",
      icon: Zap
    },
    {
      title: "Global Coverage",
      description: "Available in 150+ countries with support for multiple local payment methods.",
      icon: Globe
    },
    {
      title: "Regulatory Compliance",
      description: "Fully compliant with local regulations and KYC/AML requirements in all supported regions.",
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
            Ramp
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The fastest and most cost-effective way to buy crypto with fiat.
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
            { label: "Countries", value: "150+", unit: "Supported" },
            { label: "Cryptocurrencies", value: "40+", unit: "Available" },
            { label: "Payment Methods", value: "15+", unit: "Options" },
            { label: "Average Fee", value: "0.99%", unit: "Industry-Low" }
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

        {/* Why Choose Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Ramp?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Industry-Leading Low Fees</h3>
            <p className="text-gray-300 mb-4">
              Ramp offers some of the lowest fees in the industry, with rates starting at just 0.99%. By optimizing their processes and maintaining direct banking relationships, they're able to pass these savings on to users, ensuring you get more crypto for your money compared to other on-ramp services.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Streamlined User Experience</h3>
              <p className="text-gray-300 mb-4">
                Ramp has reimagined the crypto purchasing process to be as simple and intuitive as possible. Their streamlined interface requires minimal steps to complete a transaction, and their advanced KYC process can be completed in minutes rather than days. This focus on user experience has made Ramp a preferred choice for both crypto newcomers and experienced users.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Seamless Integration</h3>
              <p className="text-gray-300 mb-4">
                For developers and businesses, Ramp offers easy-to-implement SDKs and APIs that can be integrated into any platform. Their widget can be customized to match your brand's look and feel, providing a consistent experience for your users while handling all the complexity of fiat-to-crypto transactions behind the scenes.
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

        {/* Payment Methods Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Supported Payment Methods</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Bank Transfers",
                description: "Connect your bank account for the lowest fees and highest limits, perfect for larger purchases."
              },
              {
                title: "Credit/Debit Cards",
                description: "Use Visa or Mastercard for instant purchases with competitive fees and quick processing."
              },
              {
                title: "Local Payment Methods",
                description: "Access region-specific payment options like iDEAL, SEPA, Faster Payments, and more."
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

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">How Ramp Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Select Amount",
                description: "Choose how much crypto you want to buy in your local currency."
              },
              {
                step: "2",
                title: "Verify Identity",
                description: "Complete the quick KYC process (only needed once for new users)."
              },
              {
                step: "3",
                title: "Choose Payment",
                description: "Select your preferred payment method from the available options."
              },
              {
                step: "4",
                title: "Receive Crypto",
                description: "Get your crypto delivered directly to your wallet within minutes."
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Buy Crypto with Lower Fees?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Use Ramp to purchase cryptocurrencies with the lowest fees in the industry. Support this site by using our referral link.
          </p>
          <ButtonLink 
            href="https://ramp.network/buy/?partner=YOUR_PARTNER_ID" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Buy Crypto with Ramp <ArrowRight className="ml-2 w-5 h-5" />
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
