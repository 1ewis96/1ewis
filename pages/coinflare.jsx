import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap, DollarSign, BarChart3, Globe, Smartphone, LockKeyhole, Award } from 'lucide-react';
import { getExchangeReferral } from '../utils/referralLinks';
import AnimatedFeatures from '../components/AnimatedFeatures';
import Footer from '../components/Footer';

export default function Coinflare() {
  const referralData = getExchangeReferral('coinflare') || { referralLink: '#' };
  
  const features = [
    {
      icon: () => <Shield size={24} />,
      title: 'Advanced Security',
      description: 'Coinflare implements state-of-the-art security measures to protect your digital assets'
    },
    {
      icon: () => <Zap size={24} />,
      title: 'Fast Transactions',
      description: 'Experience lightning-fast deposits and withdrawals with optimized processing'
    },
    {
      icon: () => <DollarSign size={24} />,
      title: 'Competitive Fees',
      description: 'Enjoy some of the lowest trading fees in the industry with volume-based discounts'
    },
    {
      icon: () => <BarChart3 size={24} />,
      title: 'Advanced Trading Tools',
      description: 'Access comprehensive charting, technical analysis, and trading features'
    },
    {
      icon: () => <Globe size={24} />,
      title: 'Global Access',
      description: 'Available in multiple countries with localized support and services'
    },
    {
      icon: () => <Smartphone size={24} />,
      title: 'Mobile Trading',
      description: 'Trade anytime, anywhere with the powerful Coinflare mobile application'
    }
  ];

  const benefits = [
    'Exclusive trading fee discounts',
    'Access to new token listings',
    'Staking rewards program',
    'Intuitive trading interface',
    'Regular promotions and events',
    '24/7 customer support'
  ];
  
  const securityFeatures = [
    {
      icon: () => <LockKeyhole size={24} />,
      title: 'Multi-Factor Authentication',
      description: 'Secure your account with multiple layers of protection including email, SMS, and authenticator apps'
    },
    {
      icon: () => <Shield size={24} />,
      title: 'Cold Storage',
      description: 'Majority of user funds are stored in cold wallets completely isolated from the internet'
    },
    {
      icon: () => <Award size={24} />,
      title: 'Insurance Protection',
      description: 'Assets protected by comprehensive insurance coverage against potential security incidents'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Coinflare Exchange | Trade Crypto with Low Fees & Advanced Security</title>
        <meta name="description" content="Coinflare crypto exchange offers low trading fees, advanced security features, and a powerful trading platform for both beginners and experienced traders." />
        <meta name="keywords" content="coinflare exchange, crypto trading platform, low fee crypto exchange, secure cryptocurrency exchange, coinflare review" />
        <link rel="canonical" href="https://1ewis.com/coinflare" />
        <meta property="og:title" content="Coinflare Exchange | Trade Crypto with Low Fees" />
        <meta property="og:description" content="Coinflare offers competitive trading fees, advanced security features, and a powerful trading platform for all types of crypto traders." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/coinflare" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Coinflare Exchange | Advanced Crypto Trading" />
        <meta name="twitter:description" content="Coinflare offers competitive trading fees, advanced security features, and a powerful trading platform." />
      </Head>

      <main className="container mx-auto px-4 pt-32 pb-16">
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-orange-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Coinflare Exchange
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Advanced trading platform with competitive fees and robust security
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a 
                  href={referralData.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                >
                  Start Trading Now
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
                <div className="bg-gradient-to-r from-orange-500 to-orange-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="bg-gradient-to-r from-orange-900/20 to-orange-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-orange-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Exclusive Benefits for New Users</h2>
                <p className="text-gray-300 mb-6">
                  Sign up using our referral link and receive:
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-orange-400 mr-2 mt-1 flex-shrink-0" size={18} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-auto">
                <a 
                  href={referralData.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-auto bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Sign Up with Coinflare
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Coinflare?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the advantages of trading on one of the fastest growing cryptocurrency exchanges
            </p>
          </div>
          
          <AnimatedFeatures features={features} />
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Leading Security</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your assets are protected by multiple layers of security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-orange-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon()}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Join thousands of traders on Coinflare and access a world of cryptocurrency opportunities with competitive fees and advanced tools.
              </p>
            </div>
            
            <div className="flex justify-center">
              <a 
                href={referralData.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
              >
                Create Your Account Today
                <ArrowRight className="inline ml-2" size={20} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
