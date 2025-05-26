import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, Globe, Lock, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';

export default function NordVPNPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Enhanced Privacy",
      description: "Protect your online activities with military-grade encryption and a strict no-logs policy.",
      icon: () => <Shield size={24} />
    },
    {
      title: "Lightning-Fast Speeds",
      description: "Experience minimal speed loss with NordLynx protocol, perfect for streaming and downloading.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Global Server Network",
      description: "Connect to 5,500+ servers in 60+ countries to access content from anywhere in the world.",
      icon: () => <Globe size={24} />
    },
    {
      title: "Threat Protection",
      description: "Block malware, trackers, and intrusive ads with advanced security features.",
      icon: () => <Lock size={24} />
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
            NordVPN
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Secure your crypto activities with the world's leading VPN service.
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
            { label: "Servers", value: "5,500+", unit: "Worldwide" },
            { label: "Countries", value: "60+", unit: "Coverage" },
            { label: "Users", value: "14M+", unit: "Protected" },
            { label: "Devices", value: "6", unit: "Per Account" }
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Crypto Users Need NordVPN</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-blue-400">Enhanced Security for Your Crypto Activities</h3>
            <p className="text-gray-300 mb-4">
              When trading crypto or accessing your wallet, security is paramount. NordVPN's military-grade encryption shields your sensitive data from hackers and surveillance, ensuring your transactions and wallet information remain private. This is especially crucial when using public Wi-Fi networks, which are notorious hotspots for cyber attacks.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Bypass Geo-Restrictions</h3>
              <p className="text-gray-300 mb-4">
                Many cryptocurrency exchanges and services are restricted in certain countries. With NordVPN's global server network, you can access these platforms regardless of your location. This ensures you never miss trading opportunities or important updates due to geographic restrictions.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Protection Against Crypto-Targeting Malware</h3>
              <p className="text-gray-300 mb-4">
                NordVPN's Threat Protection feature blocks malicious websites and prevents malware from infiltrating your device. This is crucial for crypto users, as specialized malware can monitor clipboard activity and replace wallet addresses during transactions, redirecting your funds to hackers.
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
                name: "1-Month Plan",
                price: "$11.99/mo",
                color: "bg-gray-800",
                features: ["All Security Features", "6 Devices", "24/7 Support", "30-Day Money-Back"]
              },
              {
                name: "1-Year Plan",
                price: "$4.99/mo",
                color: "bg-blue-800",
                features: ["58% Discount", "All Security Features", "6 Devices", "24/7 Support", "30-Day Money-Back"]
              },
              {
                name: "2-Year Plan",
                price: "$3.69/mo",
                color: "bg-blue-700",
                features: ["69% Discount", "All Security Features", "6 Devices", "24/7 Support", "30-Day Money-Back", "3 Free Months"]
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
                  <span className="text-xs text-gray-300">billed upfront</span>
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

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Secure Your Crypto Activities Today</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Get NordVPN now and enjoy a 69% discount plus 3 months free with the 2-year plan. Use my referral link to support this site.
          </p>
          <ButtonLink 
            href="https://nordvpn.com/refer/YOUR_REF_CODE" 
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-lg"
            target="_blank"
          >
            <span className="flex items-center justify-center">
              Get NordVPN <ArrowRight className="ml-2 w-5 h-5" />
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
