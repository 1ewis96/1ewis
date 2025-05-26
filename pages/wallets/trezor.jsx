import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, Github, Twitter } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import Footer from '../../components/Footer';

export default function TrezorPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Hardware Security",
      description: "Store your private keys offline in a secure chip, protected from online threats and hackers.",
      icon: () => <Shield size={24} />
    },
    {
      title: "Open Source",
      description: "Fully transparent, auditable code that has been reviewed by security experts worldwide.",
      icon: () => <Github size={24} />
    },
    {
      title: "Multi-Currency Support",
      description: "Manage 1,000+ cryptocurrencies and tokens from a single device with dedicated apps.",
      icon: () => <Wallet size={24} />
    },
    {
      title: "Password Manager",
      description: "Securely store and manage your passwords with the same level of security as your crypto assets.",
      icon: () => <BarChart size={24} />
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
    <div className="min-h-screen bg-gray-900 text-white">
      <PriceTicker />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-16">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Trezor Hardware Wallet
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              The original hardware wallet with enhanced security features
            </motion.p>
          </div>

          <motion.div 
            className="bg-gradient-to-r from-slate-900/30 to-slate-600/30 rounded-2xl p-6 md:p-8 mb-12 border border-slate-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Secure Your Crypto Assets</h2>
                <p className="text-gray-300 mb-6">
                  Trezor hardware wallets offer:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Shield className="text-slate-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Complete isolation from online threats</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-slate-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>PIN protection and optional passphrase</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-slate-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Recovery seed backup for wallet restoration</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-slate-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Support for 1,000+ cryptocurrencies</span>
                  </li>
                </ul>
              </div>
              
              <div className="w-full md:w-auto">
                <a 
                  href="https://shop.trezor.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-auto bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Shop Trezor Devices
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Why Choose Trezor?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trezor offers a secure and user-friendly platform for storing your cryptocurrencies offline, away from potential online threats.
            </p>
          </div>

          <AnimatedFeatures features={features} color="slate" />
        </section>

        <section className="mb-16">
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">How to Get Started with Trezor</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-4">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Choose Your Device</h3>
                  <p className="text-gray-300">
                    Select between the Trezor Model One or Trezor Model T based on your needs and budget.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-4">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Set Up Your Device</h3>
                  <p className="text-gray-300">
                    Follow the simple setup process to initialize your device and create a secure backup.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-4">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Install Trezor Suite</h3>
                  <p className="text-gray-300">
                    Download and install the Trezor Suite application to manage your cryptocurrencies.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center mr-4">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Transfer Your Assets</h3>
                  <p className="text-gray-300">
                    Begin transferring your crypto assets to your new secure hardware wallet.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="https://shop.trezor.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Get Your Trezor Now
                <ArrowRight className="inline ml-2" size={18} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
