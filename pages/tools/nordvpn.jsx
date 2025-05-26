import { Button, ButtonLink } from "../../components/ui/button";
import { 
  ArrowRight, 
  ChevronDown, 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Github, 
  Twitter, 
  Check, 
  Key, 
  Fingerprint, 
  Laptop, 
  Smartphone, 
  Wifi, 
  ExternalLink,
  CreditCard,
  RefreshCw
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import PriceTicker from '../../components/PriceTicker';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getToolReferral } from '../../utils/referralLinks';

export default function NordVPNPage() {
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('vpn');
  
  // Get referral links from the JSON file
  const nordVPNData = getToolReferral('nordvpn');
  const nordPassData = getToolReferral('nordpass');
  
  const nordVPNReferralLink = nordVPNData?.referralLink || 'https://go.nordvpn.net/aff_c?offer_id=15&aff_id=124233&url_id=902';
  const nordPassReferralLink = nordPassData?.referralLink || 'https://go.nordpass.io/aff_c?offer_id=488&aff_id=124233&url_id=9356';
  
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
  
  // VPN Features
  const vpnFeatures = [
    {
      title: "Military-Grade Encryption",
      description: "Protect your data with AES-256 encryption, the same standard used by governments and military.",
      icon: () => <Shield size={24} />
    },
    {
      title: "No-Logs Policy",
      description: "Your online activities remain private with a strict no-logs policy, independently audited.",
      icon: () => <Lock size={24} />
    },
    {
      title: "Double VPN",
      description: "Route your traffic through two servers for an extra layer of security.",
      icon: () => <RefreshCw size={24} />
    },
    {
      title: "Kill Switch",
      description: "Automatically disconnect from the internet if your VPN connection drops.",
      icon: () => <Wifi size={24} />
    },
    {
      title: "Threat Protection",
      description: "Block malware, trackers, and intrusive ads with advanced security features.",
      icon: () => <Shield size={24} />
    },
    {
      title: "Multi-Device Support",
      description: "Protect up to 6 devices simultaneously with a single subscription.",
      icon: () => <Smartphone size={24} />
    }
  ];
  
  // NordPass Features
  const passFeatures = [
    {
      title: "Password Manager",
      description: "Store and autofill your passwords securely across all your devices.",
      icon: () => <Key size={24} />
    },
    {
      title: "Data Breach Scanner",
      description: "Get alerts if your personal data appears in a data breach.",
      icon: () => <Shield size={24} />
    },
    {
      title: "Password Health",
      description: "Identify weak, reused, or old passwords to improve your security.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Secure Notes",
      description: "Store sensitive information like recovery phrases in encrypted notes.",
      icon: () => <Lock size={24} />
    },
    {
      title: "Cross-Platform Sync",
      description: "Access your passwords on all your devices with seamless synchronization.",
      icon: () => <RefreshCw size={24} />
    },
    {
      title: "Biometric Authentication",
      description: "Unlock your password vault with fingerprint or face recognition.",
      icon: () => <Fingerprint size={24} />
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
      <Head>
        <title>Nord Security | Protect Your Crypto Activities with NordVPN & NordPass</title>
        <meta name="description" content="Secure your crypto activities with NordVPN and NordPass. Get 72% off NordVPN and 50% savings on NordPass Premium with our exclusive referral links." />
      </Head>
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-16">
      <div className="bg-gradient-to-b from-gray-900 to-black relative overflow-hidden rounded-2xl p-8 mb-16 border border-blue-900/20">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 bg-blue-900/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-blue-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Nord Security
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Protect your crypto activities and sensitive data with industry-leading security solutions
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a 
                  href={nordVPNReferralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                >
                  Get Nord Security
                  <ArrowRight className="inline ml-2" size={20} />
                </a>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
              >
                <div className="bg-gradient-to-r from-blue-500 to-blue-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
              </motion.div>
            </div>
          </div>
          
          {/* Exclusive Offer Section */}
          <motion.div 
            className="bg-gradient-to-r from-blue-900/20 to-blue-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-blue-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Exclusive Offers for Crypto Users</h2>
                <p className="text-gray-300 mb-6">
                  Protect your digital assets with our special offers:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>72% off NordVPN with 30-day money-back guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>50% savings on NordPass Premium</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Military-grade encryption for your connections</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Secure password storage for exchange credentials</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-blue-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Protection on up to 6 devices simultaneously</span>
                  </li>
                </ul>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col space-y-4">
                  <a 
                    href={nordVPNReferralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full md:w-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                  >
                    Get NordVPN
                    <ArrowRight className="inline ml-2" size={18} />
                  </a>
                  
                  <a 
                    href={nordPassReferralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full md:w-auto bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                  >
                    Get NordPass
                    <ArrowRight className="inline ml-2" size={18} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Product Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex space-x-2 p-1 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-800">
              <button
                onClick={() => setActiveTab('vpn')}
                className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center ${activeTab === 'vpn' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Shield className="w-5 h-5 mr-2" />
                NordVPN
              </button>
              <button
                onClick={() => setActiveTab('pass')}
                className={`px-6 py-3 rounded-md transition-all duration-300 flex items-center ${activeTab === 'pass' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                <Key className="w-5 h-5 mr-2" />
                NordPass
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-16"
          >
            {activeTab === 'vpn' && (
              <div>
                {/* NordVPN Features */}
                <AnimatedFeatures features={features} color="blue-400" />

                {/* NordVPN Stats */}
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
                      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
                    >
                      <h3 className="text-3xl md:text-4xl font-bold text-white">{stat.value}</h3>
                      <p className="text-gray-400">{stat.label}</p>
                      <span className="text-xs text-gray-500">{stat.unit}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* NordVPN Benefits */}
                <div className="mb-16">
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Why Crypto Users Need NordVPN</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Protect your digital assets and trading activities with industry-leading security
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        title: "Secure Trading",
                        description: "Encrypt your connection when accessing exchanges and wallets, protecting your transactions from hackers and surveillance.",
                        icon: <CreditCard className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Bypass Geo-Restrictions",
                        description: "Access crypto exchanges and services that may be restricted in your country or region.",
                        icon: <Globe className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Protection on Public Wi-Fi",
                        description: "Safely manage your portfolio even on unsecured networks at cafes, airports, or hotels.",
                        icon: <Wifi className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Malware Protection",
                        description: "Block malicious websites and prevent crypto-stealing malware with Threat Protection feature.",
                        icon: <Shield className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Multi-Device Security",
                        description: "Protect up to 6 devices simultaneously, including your desktop, phone, and tablet.",
                        icon: <Smartphone className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "No-Logs Policy",
                        description: "Your crypto activities remain private with a strict no-logs policy, independently audited for compliance.",
                        icon: <Lock className="w-6 h-6 text-blue-400" />
                      }
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-800/50 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* How to Get Started */}
                <section className="mb-16">
                  <div className="bg-gray-800/50 rounded-2xl p-8 border border-blue-800/30">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">How to Get Started with NordVPN</h2>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">1</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Sign Up for NordVPN</h3>
                          <p className="text-gray-300">
                            Click our referral link to get 72% off and create your account. The process takes less than 5 minutes.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">2</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Download the App</h3>
                          <p className="text-gray-300">
                            Install NordVPN on your devices. Apps are available for Windows, Mac, iOS, Android, and more.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">3</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Connect to a Server</h3>
                          <p className="text-gray-300">
                            Choose from over 5,500 servers in 60+ countries and connect with a single click.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">4</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Browse Securely</h3>
                          <p className="text-gray-300">
                            Enjoy encrypted browsing, protection from hackers, and secure access to your crypto accounts.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <a 
                        href={nordVPNReferralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        Get 72% Off NordVPN
                        <ArrowRight className="inline ml-2" size={18} />
                      </a>
                    </div>
                  </div>
                </section>

                {/* NordVPN Offer */}
                <motion.div
                  className="bg-gradient-to-br from-blue-900/20 to-gray-900 rounded-xl p-8 border border-blue-900/30 shadow-xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                      <div className="inline-flex items-center mb-4 bg-blue-900/30 px-4 py-2 rounded-full">
                        <Zap className="text-blue-400 w-5 h-5 mr-2" />
                        <span className="text-blue-300 font-medium">Special Offer</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">72% Off NordVPN</h3>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">30-day money-back guarantee</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Protect up to 6 devices simultaneously</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">24/7 customer support</span>
                        </li>
                      </ul>
                      <ButtonLink 
                        href={nordVPNReferralLink}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get NordVPN <ArrowRight className="ml-2 w-5 h-5" />
                      </ButtonLink>
                    </div>
                    <div className="relative w-full md:w-1/3 aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-black/80">
                        <Shield className="w-20 h-20 text-blue-400 opacity-20" />
                      </div>
                      <div className="relative z-10 text-center p-4">
                        <div className="text-5xl font-bold text-white mb-2">72%</div>
                        <div className="text-blue-400 font-medium">DISCOUNT</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {activeTab === 'pass' && (
              <div>
                {/* NordPass Features */}
                <motion.div 
                  className="mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {[
                      {
                        title: "Password Manager",
                        description: "Store and autofill your passwords securely across all your devices.",
                        icon: <Key className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Data Breach Scanner",
                        description: "Get alerts if your personal data appears in a data breach.",
                        icon: <Shield className="w-6 h-6 text-blue-400" />
                      },
                      {
                        title: "Password Health",
                        description: "Identify weak, reused, or old passwords to improve your security.",
                        icon: <Zap className="w-6 h-6 text-blue-400" />
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-800/50 transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                        <p className="text-gray-300">{feature.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* NordPass Benefits */}
                <div className="mb-16">
                  <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold mb-4 text-blue-400">Why Crypto Users Need NordPass</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                      Secure your crypto accounts with strong, unique passwords and enhanced security features
                    </p>
                  </motion.div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-white">Secure Your Crypto Accounts</h3>
                      <p className="text-gray-300 mb-4">
                        Cryptocurrency theft often begins with compromised exchange accounts. NordPass helps you create and store strong, unique passwords for each of your crypto platforms, significantly reducing the risk of unauthorized access.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Generate complex passwords that are impossible to guess</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Store exchange API keys securely</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Autofill credentials on trusted devices only</span>
                        </li>
                      </ul>
                    </motion.div>
                    
                    <motion.div
                      className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-semibold mb-4 text-white">Protect Sensitive Recovery Phrases</h3>
                      <p className="text-gray-300 mb-4">
                        Wallet recovery phrases are the keys to your crypto kingdom. NordPass provides a secure, encrypted vault for storing these critical backup phrases, ensuring they're available when needed but protected from unauthorized access.
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Store seed phrases in encrypted secure notes</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Access your recovery information across all devices</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Protect access with biometric authentication</span>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
                
                {/* How to Get Started with NordPass */}
                <section className="mb-16">
                  <div className="bg-gray-800/50 rounded-2xl p-8 border border-blue-800/30">
                    <h2 className="text-2xl font-bold mb-6 text-blue-400">How to Get Started with NordPass</h2>
                    
                    <div className="space-y-6">
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">1</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Sign Up for NordPass</h3>
                          <p className="text-gray-300">
                            Click our referral link to get 50% off NordPass Premium and create your account.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">2</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Download NordPass</h3>
                          <p className="text-gray-300">
                            Install NordPass on your devices and browser extensions for seamless password management.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">3</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Import Your Passwords</h3>
                          <p className="text-gray-300">
                            Easily import your existing passwords from browsers or other password managers.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                          <span className="font-bold">4</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2">Secure Your Crypto Accounts</h3>
                          <p className="text-gray-300">
                            Create strong, unique passwords for all your crypto exchanges and wallets.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 text-center">
                      <a 
                        href={nordPassReferralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                      >
                        Get 50% Off NordPass
                        <ArrowRight className="inline ml-2" size={18} />
                      </a>
                    </div>
                  </div>
                </section>

                {/* NordPass Offer */}
                <motion.div
                  className="bg-gradient-to-br from-blue-900/20 to-gray-900 rounded-xl p-8 border border-blue-900/30 shadow-xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-left">
                      <div className="inline-flex items-center mb-4 bg-blue-900/30 px-4 py-2 rounded-full">
                        <Zap className="text-blue-400 w-5 h-5 mr-2" />
                        <span className="text-blue-300 font-medium">Special Offer</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">50% Off NordPass Premium</h3>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Store unlimited passwords securely</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Sync across all your devices</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                          <span className="text-gray-300">Identify vulnerable passwords</span>
                        </li>
                      </ul>
                      <ButtonLink 
                        href={nordPassReferralLink}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center transition-all duration-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get NordPass <ArrowRight className="ml-2 w-5 h-5" />
                      </ButtonLink>
                    </div>
                    <div className="relative w-full md:w-1/3 aspect-video bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-black/80">
                        <Key className="w-20 h-20 text-blue-400 opacity-20" />
                      </div>
                      <div className="relative z-10 text-center p-4">
                        <div className="text-5xl font-bold text-white mb-2">50%</div>
                        <div className="text-blue-400 font-medium">SAVINGS</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Combined Security Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-blue-400">Complete Security for Crypto Users</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Protect your digital assets with our comprehensive security solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-800/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">NordVPN + NordPass Bundle</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Maximize your online security with both NordVPN and NordPass. Protect your connections with military-grade encryption while managing your crypto exchange credentials and wallet recovery phrases with a secure password manager.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Encrypt your trading activity</span>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Secure password storage for exchanges</span>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Protect wallet recovery phrases</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-800/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                  <Globe className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Global Access to Crypto Services</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Many cryptocurrency exchanges and services are restricted in certain regions. Nord security products ensure you can access your favorite platforms from anywhere while keeping your credentials secure.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Access geo-restricted exchanges</span>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Trade securely from any location</span>
                </div>
                <div className="flex items-start">
                  <Check className="mt-1 mr-2 text-blue-400 w-5 h-5" />
                  <span className="text-gray-300">Protect your identity while trading</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Benefits Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white">Nord Security Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Basic Protection",
                description: "Essential security for your crypto activities",
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                features: [
                  "Secure connection on public Wi-Fi",
                  "Access geo-restricted exchanges",
                  "Protect your trading data",
                  "Block malicious crypto sites",
                  "30-day money-back guarantee"
                ]
              },
              {
                name: "Advanced Security",
                description: "Enhanced protection with NordVPN special offer",
                icon: <Lock className="w-8 h-8 text-blue-400" />,
                features: [
                  "72% discount on NordVPN",
                  "Military-grade encryption",
                  "Protection on up to 6 devices",
                  "Threat Protection feature",
                  "No-logs policy (audited)",
                  "24/7 customer support"
                ],
                highlight: true
              },
              {
                name: "Complete Protection",
                description: "Full security suite with NordVPN & NordPass",
                icon: <Key className="w-8 h-8 text-blue-400" />,
                features: [
                  "All NordVPN features",
                  "50% off NordPass Premium",
                  "Secure password storage",
                  "Encrypted notes for recovery phrases",
                  "Data breach scanner",
                  "Cross-device synchronization"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border ${plan.highlight ? 'border-blue-600' : 'border-gray-800'} hover:border-blue-800/50 transition-all duration-300 flex flex-col h-full ${plan.highlight ? 'ring-2 ring-blue-500/50' : ''}`}
                whileHover={{ y: -5 }}
              >
                <div className="mb-6 flex items-center">
                  <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mr-4">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-gray-400">{plan.description}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 mt-1 text-blue-400 w-4 h-4" />
                        <span className="text-gray-300 text-sm">{feature}</span>
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
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-900/20 to-gray-900 rounded-xl p-8 md:p-12 border border-blue-900/30 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Secure Your Crypto Activities Today</h2>
            <p className="text-gray-300 max-w-3xl mx-auto mb-8 text-lg">
              Protect your digital assets with industry-leading security solutions from Nord. Get exclusive offers when you use my referral links.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg py-3 px-4 inline-block">
                <p className="text-sm text-gray-300 flex items-center justify-center">
                  <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded mr-2">NORDVPN</span>
                  72% off with 30-day money-back guarantee
                </p>
              </div>
              
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg py-3 px-4 inline-block">
                <p className="text-sm text-gray-300 flex items-center justify-center">
                  <span className="bg-blue-900/30 text-blue-400 text-xs px-2 py-1 rounded mr-2">NORDPASS</span>
                  50% savings on Premium
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <ButtonLink 
                href={nordVPNReferralLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Shield className="mr-2 w-5 h-5" />
                Get NordVPN
              </ButtonLink>
              
              <ButtonLink 
                href={nordPassReferralLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-flex items-center justify-center transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Key className="mr-2 w-5 h-5" />
                Get NordPass
              </ButtonLink>
            </div>
          </div>
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
      </main>
      
      {/* Floating Call-to-Action Buttons */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
      >
        <motion.a 
          href={nordVPNReferralLink}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center bg-blue-600/90 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="mr-3 relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-300" />
            </div>
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-200">72% OFF</div>
            <div className="flex items-center">
              <span>Get NordVPN</span>
              <ExternalLink className="ml-1 w-3 h-3" />
            </div>
          </div>
        </motion.a>
        
        <motion.a 
          href={nordPassReferralLink}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center bg-blue-600/90 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="mr-3 relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-blue-300" />
            </div>
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-200">50% SAVINGS</div>
            <div className="flex items-center">
              <span>Get NordPass</span>
              <ExternalLink className="ml-1 w-3 h-3" />
            </div>
          </div>
        </motion.a>
      </motion.div>
    </div>
  );
}
