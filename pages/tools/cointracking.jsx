import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, LineChart, Check, DollarSign, FileText, Server, Database, Users, Clock, Award } from "lucide-react";
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getToolReferral } from '../../utils/referralLinks';

export default function CoinTrackingPage() {
  const [showMore, setShowMore] = useState(false);
  const referralData = getToolReferral('cointracking');
  
  const features = [
    {
      title: "Portfolio Tracking",
      description: "Monitor your entire crypto portfolio across all exchanges and wallets in one dashboard.",
      icon: () => <LineChart size={24} />
    },
    {
      title: "Tax Reporting",
      description: "Generate tax reports for 25+ countries with support for various accounting methods.",
      icon: () => <BarChart size={24} />
    },
    {
      title: "Exchange Integration",
      description: "Connect to 110+ exchanges and 15+ blockchains with automatic data import.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Security & Privacy",
      description: "Keep your financial data secure with industry-leading security measures and privacy controls.",
      icon: () => <Shield size={24} />
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
        <title>CoinTracking | Crypto Portfolio Tracking & Tax Reporting</title>
        <meta name="description" content="CoinTracking offers a comprehensive crypto portfolio management and tax reporting solution. Track your assets, generate tax reports, and analyze your performance across 110+ exchanges and 15+ blockchains." />
        <meta name="keywords" content="CoinTracking, crypto portfolio tracker, cryptocurrency tax software, crypto tax reporting, portfolio management, crypto accounting, blockchain analytics" />
        <link rel="canonical" href="https://1ewis.com/tools/cointracking" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="CoinTracking | Crypto Portfolio Tracking & Tax Reporting" />
        <meta property="og:description" content="CoinTracking offers a comprehensive crypto portfolio management and tax reporting solution. Track your assets, generate tax reports, and analyze your performance across 110+ exchanges." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/tools/cointracking" />
        <meta property="og:image" content="https://1ewis.com/images/tools/cointracking-preview.jpg" />
        <meta property="og:site_name" content="1ewis.com" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewis_" />
        <meta name="twitter:title" content="CoinTracking | Crypto Portfolio Tracking & Tax Reporting" />
        <meta name="twitter:description" content="CoinTracking offers a comprehensive crypto portfolio management and tax reporting solution. Track your assets, generate tax reports, and analyze your performance." />
        <meta name="twitter:image" content="https://1ewis.com/images/tools/cointracking-preview.jpg" />
        
        {/* Schema.org structured data for Review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "CoinTracking Review",
            "reviewBody": "CoinTracking is a powerful crypto portfolio management and tax reporting solution that supports over 110 exchanges and 15 blockchains. It offers comprehensive tax reports for 25+ countries, real-time portfolio tracking, and advanced analytics for crypto investors of all levels.",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.7",
              "bestRating": "5"
            },
            "author": {
              "@type": "Person",
              "name": "Lewis"
            },
            "publisher": {
              "@type": "Organization",
              "name": "1ewis.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://1ewis.com/logo.png"
              }
            },
            "datePublished": "2025-06-21",
            "itemReviewed": {
              "@type": "SoftwareApplication",
              "name": "CoinTracking",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web, iOS, Android",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "599.99",
                "priceCurrency": "EUR",
                "offerCount": "4"
              }
            }
          })}
        </script>
        
        {/* Schema.org structured data for FAQ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is CoinTracking?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CoinTracking is a comprehensive cryptocurrency portfolio management and tax reporting platform that allows users to track their holdings across 110+ exchanges and 15+ blockchains. It provides real-time portfolio valuation, profit/loss calculations, and generates tax reports for over 25 countries."
                }
              },
              {
                "@type": "Question",
                "name": "How does CoinTracking help with crypto taxes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CoinTracking automatically calculates your taxable gains and losses using various accounting methods (FIFO, LIFO, HIFO, etc.) and generates tax reports compliant with regulations in over 25 countries. It tracks all your transactions including trades, mining, staking, airdrops, and DeFi activities to ensure accurate tax reporting."
                }
              },
              {
                "@type": "Question",
                "name": "Can CoinTracking connect to my exchanges and wallets?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, CoinTracking offers automatic data import from over 110 cryptocurrency exchanges via API connections and CSV file imports. It also supports blockchain analysis for 15+ blockchains to track wallet transactions. This allows for seamless tracking of your entire crypto portfolio in one place."
                }
              },
              {
                "@type": "Question",
                "name": "Is there a free version of CoinTracking?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, CoinTracking offers a free plan that allows you to track up to 200 transactions. For more active traders, they offer Pro, Expert, and Unlimited plans with additional features such as unlimited transactions, advanced tax reports, and priority support."
                }
              }
            ]
          })}
        </script>
        
        {/* Schema.org structured data for BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://1ewis.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Portfolio",
                "item": "https://1ewis.com/portfolio"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Tools",
                "item": "https://1ewis.com/tools"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "CoinTracking Review",
                "item": "https://1ewis.com/tools/cointracking"
              }
            ]
          })}
        </script>
      </Head>
      
      {/* Breadcrumb Navigation Container */}
      <main className="container mx-auto px-4 pt-32 pb-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-violet-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-violet-400 transition-colors">
            Portfolio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-violet-400 transition-colors">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-violet-400">CoinTracking Review</span>
        </nav>
        
        {/* Last Updated Information */}
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <span>Last updated: June 21, 2025</span>
          <span className="mx-2">•</span>
          <span>8 min read</span>
        </div>
      </main>

      {/* Hero Section */}
      <section className="container mx-auto px-4 mt-4 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-violet-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                CoinTracking
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The comprehensive crypto portfolio management and tax reporting solution
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
                  className="inline-block bg-violet-500 hover:bg-violet-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                >
                  Try For Free
                  <ArrowRight className="inline ml-2" size={20} />
                </a>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-xl"
              >
                <div className="bg-gradient-to-r from-violet-500 to-violet-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
                
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-violet-500/30">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-purple-400/10 z-0"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/30 to-purple-300/30 rounded-xl blur-sm z-0"></div>
                  <iframe
                    width="100%"
                    height="300"
                    src="https://www.youtube.com/embed/pcPA400hEiU"
                    title="CoinTracking Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="relative z-10"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Benefits Section */}
          <motion.div 
            className="bg-gradient-to-r from-violet-900/20 to-violet-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-violet-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Benefits for CoinTracking Users</h2>
                <p className="text-gray-300 mb-6">
                  Sign up using our link and enjoy these advantages:
                </p>
                <ul className="space-y-3">
                  {[
                    'Track your entire crypto portfolio in one place',
                    'Generate tax reports for 25+ countries',
                    'Connect to 110+ exchanges and 15+ blockchains',
                    'Get detailed performance analytics',
                    'Access historical data and charts',
                    'Secure your financial data with industry-leading security'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-violet-400 mr-2 mt-1 flex-shrink-0" size={18} />
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
                  className="block w-full md:w-auto bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Try CoinTracking Free
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400 mb-1">Referral Code:</p>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 font-mono text-violet-400">
                    {referralData.referralCode}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-violet-400">Why Choose CoinTracking?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              CoinTracking offers a secure and user-friendly platform for tracking your crypto portfolio and generating tax reports.
            </p>
          </div>
          <AnimatedFeatures features={features} color="violet-400" />
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { label: "Founded", value: "2012", unit: "" },
              { label: "Users", value: "1,988,000", unit: "individual users" },
              { label: "Clients", value: "25,000", unit: "corporate clients" },
              { label: "Portfolio Value", value: "$41.5B", unit: "total tracked" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-violet-400">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
                <span className="text-xs text-gray-500">{stat.unit}</span>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Plans Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Subscription Plans</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Free Plan */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex flex-col relative overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-1">CoinTracking Free</h3>
                <p className="text-lg font-semibold mb-4">Free</p>
                <div className="mb-6 text-center">
                  <a 
                    href={referralData.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">Up to 200 transactions</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Exchange imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Wallet Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Portfolio Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Reports & Trade Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Tax Report</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Pro Plan */}
              <motion.div
                variants={itemVariants}
                className="bg-violet-900/40 rounded-xl p-6 border border-violet-700/50 flex flex-col relative overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-1">CoinTracking Pro</h3>
                <p className="text-lg font-semibold mb-4">Pro</p>
                <div className="mb-6 text-center">
                  <a 
                    href={referralData.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">Up to 3,500 transactions</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Exchange Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Wallet Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Portfolio Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Reports & Trade Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Tax Report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Automated Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Backups (≤ 2)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>API Access</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Expert Plan */}
              <motion.div
                variants={itemVariants}
                className="bg-violet-800/50 rounded-xl p-6 border border-violet-600/50 flex flex-col relative overflow-hidden"
              >
                <div className="absolute -right-8 top-4 bg-violet-500 text-white text-xs py-1 px-10 transform rotate-45 font-semibold">
                  Popular
                </div>
                <h3 className="text-xl font-bold mb-1">CoinTracking Expert</h3>
                <p className="text-lg font-semibold mb-4">Expert</p>
                <div className="mb-6 text-center">
                  <a 
                    href={referralData.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">Up to 100,000 transactions</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Exchange Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Wallet Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Portfolio Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Reports & Trade Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Tax Report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Automated Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Backups (≤ 10)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>API Access</span>
                  </li>
                </ul>
              </motion.div>
              
              {/* Unlimited Plan */}
              <motion.div
                variants={itemVariants}
                className="bg-violet-700/50 rounded-xl p-6 border border-violet-500/50 flex flex-col relative overflow-hidden"
              >
                <h3 className="text-xl font-bold mb-1">CoinTracking Unlimited</h3>
                <p className="text-lg font-semibold mb-4">Unlimited</p>
                <div className="mb-6 text-center">
                  <a 
                    href={referralData.referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-violet-600 hover:bg-violet-500 text-white font-medium py-2 px-4 rounded transition-colors duration-300"
                  >
                    Get Started
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">Unlimited transactions</p>
                <ul className="text-sm space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Exchange Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Wallet Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Portfolio Tracking</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Reports & Trade Analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Tax Report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Automated Imports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Backups (≤ 20)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-400 mr-2 mt-0.5 flex-shrink-0" size={16} />
                    <span>Premium Support</span>
                  </li>
                </ul>
              </motion.div>
            </div>
            
            <div className="text-center mt-6 text-sm text-gray-400">
              <p>*Plans are billed annually or every 2 years for the best monthly rate.</p>
              <p>*Lifetime plans are available with special discounts!</p>
            </div>
          </motion.div>
        </section>

        {/* Why Choose Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose CoinTracking?</h2>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-violet-400">Comprehensive Portfolio Management</h3>
              <p className="text-gray-300 mb-4">
                CoinTracking offers one of the most comprehensive portfolio tracking solutions in the crypto space. It allows you to monitor all your assets across multiple exchanges and wallets in one place, providing real-time updates on your portfolio value, gains/losses, and asset allocation. The platform supports over 13,000 cryptocurrencies, ensuring that even your most obscure altcoins are tracked accurately.
              </p>
              
              <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <h3 className="text-xl font-semibold mb-4 text-violet-400 mt-6">Tax Compliance Made Easy</h3>
                <p className="text-gray-300 mb-4">
                  Crypto tax reporting can be incredibly complex, but CoinTracking simplifies the process with automated tax reports for over 25 countries. The platform supports various accounting methods (FIFO, LIFO, HIFO, etc.) and can generate all the necessary documents for tax filing, including capital gains reports, realized and unrealized gains, income reports, and more. This comprehensive approach to tax reporting has made CoinTracking the preferred choice for both individual investors and tax professionals.
                </p>
                
                <h3 className="text-xl font-semibold mb-4 text-violet-400 mt-6">Seamless Data Integration</h3>
                <p className="text-gray-300 mb-4">
                  With support for over 110 exchanges and 15 blockchains, CoinTracking makes it easy to import your transaction data automatically. The platform offers API connections, CSV imports, and blockchain analysis to ensure that all your transactions are captured accurately. This eliminates the need for manual data entry and reduces the risk of errors in your portfolio tracking and tax reporting.
                </p>
              </div>
              
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center text-violet-400 hover:text-violet-300 transition-colors mt-2 mx-auto"
              >
                {showMore ? 'Show Less' : 'Show More'}
                <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Use Cases Section */}
        <section className="container mx-auto px-4 mb-16">
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
                  title: "Active Traders",
                  description: "Track profits and losses across multiple exchanges with real-time portfolio updates and performance analytics."
                },
                {
                  title: "Long-term Investors",
                  description: "Monitor your investment growth over time with detailed charts and historical performance data."
                },
                {
                  title: "Tax Professionals",
                  description: "Generate accurate tax reports for clients with support for various accounting methods and jurisdictions."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                >
                  <h3 className="text-xl font-semibold mb-2 text-violet-400">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Simplify Your Crypto Tracking?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Sign up for CoinTracking today and take control of your crypto portfolio and tax reporting. Use our referral link to get a 10% discount on all plans.
            </p>
            <ButtonLink 
              href={referralData.referralLink}
              className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-3 text-lg rounded-lg"
              target="_blank"
            >
              <span className="flex items-center justify-center">
                Try CoinTracking Free <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </ButtonLink>
          </motion.div>
        </section>

      <Footer />
      
      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={referralData.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-violet-500 hover:bg-violet-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="mr-2 text-xs bg-green-500 text-white px-2 py-1 rounded">10% OFF</span>
          Try For Free
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
    </div>
  );
}
