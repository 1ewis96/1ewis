import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter, ExternalLink } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getWalletReferral } from '../../utils/referralLinks';

export default function LedgerPage() {
  const [showMore, setShowMore] = useState(false);
  const ledgerReferral = getWalletReferral('ledger');
  
  const features = [
    {
      title: "Hardware Security",
      description: "Store your private keys offline in a secure chip, protected from online threats and hackers.",
      icon: Shield
    },
    {
      title: "Multi-Currency Support",
      description: "Manage 5,500+ cryptocurrencies and tokens from a single device with dedicated apps.",
      icon: Wallet
    },
    {
      title: "DApp Integration",
      description: "Connect securely to decentralized applications while keeping your keys protected.",
      icon: Zap
    },
    {
      title: "Recovery Options",
      description: "Restore your wallet on a new device with your 24-word recovery phrase if your device is lost.",
      icon: BarChart
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
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-gray-900/30 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-400">
            Ledger
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            The industry standard in hardware wallet security for crypto assets.
          </p>
        </motion.div>

        {/* Features Section */}
        <AnimatedFeatures features={features} color="gray-400" />

        {/* Products Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Ledger Hardware Wallets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ledger Nano S Plus",
                price: "$79",
                color: "bg-gray-800",
                features: ["Large screen", "100+ apps", "NFT support", "USB-C connection"]
              },
              {
                name: "Ledger Nano X",
                price: "$149",
                color: "bg-gray-700",
                features: ["Bluetooth connectivity", "Mobile compatible", "100+ apps", "Built-in battery"]
              },
              {
                name: "Ledger Stax",
                price: "$279",
                color: "bg-gray-600",
                features: ["E-ink touchscreen", "Wireless charging", "Customizable display", "Advanced features"]
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${product.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{product.price}</p>
                  <span className="text-xs text-gray-300">one-time purchase</span>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-gray-300 mb-2 block">Key Features</span>
                  <ul className="text-sm">
                    {product.features.map((feature, i) => (
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
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose Ledger?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-400">Industry-Leading Security</h3>
            <p className="text-gray-300 mb-4">
              Ledger hardware wallets use a secure element chip - the same technology used in passports and credit cards - to keep your private keys completely isolated from online threats. This air-gapped security approach means your crypto assets remain protected even if your computer is compromised.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-gray-400 mt-6">Certified Technology</h3>
              <p className="text-gray-300 mb-4">
                Ledger's security is independently certified by ANSSI, the French cybersecurity agency. Their proprietary operating system, BOLOS, provides an additional layer of protection that ensures your private keys never leave the secure chip.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-gray-400 mt-6">Comprehensive Ecosystem</h3>
              <p className="text-gray-300 mb-4">
                With Ledger Live, you can manage over 5,500 coins and tokens directly from your desktop or mobile app. The platform allows you to buy, sell, swap, and stake your crypto assets while keeping them secure on your hardware device.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-gray-400 hover:text-gray-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Secure Your Crypto?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Get your Ledger hardware wallet today and enjoy peace of mind knowing your assets are protected. Use my referral link to support this site.
          </p>
          
          {/* Referral Badge */}
          <div className="bg-gray-800/70 rounded-lg py-3 px-4 mb-6 inline-block">
            <p className="text-sm text-gray-300 flex items-center">
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-2">AFFILIATE LINK</span>
              Special discount available through this referral
            </p>
          </div>
          
          <ButtonLink 
            href={ledgerReferral.referralLink} 
            className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 text-lg rounded-lg transition-colors duration-300 shadow-lg hover:shadow-gray-700/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="flex items-center justify-center">
              Shop Ledger Wallets <ExternalLink className="ml-2 w-4 h-4" />
            </span>
          </ButtonLink>
          
          <p className="text-xs text-gray-500 mt-4">
            Referral Code: {ledgerReferral.referralCode}
          </p>
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
