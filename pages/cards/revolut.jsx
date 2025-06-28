import { Button, ButtonLink } from "../../components/ui/button";
import { 
  ArrowRight, 
  Check, 
  DollarSign, 
  Gift, 
  CreditCard, 
  ExternalLink, 
  RefreshCw, 
  Wallet, 
  Shield, 
  Lock, 
  Smartphone, 
  ChevronDown, 
  Sparkles, 
  Star, 
  Plane, 
  Coffee, 
  Headphones, 
  Percent, 
  Globe, 
  Zap 
} from "lucide-react";
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState, useEffect } from 'react';
import { getReferralLink } from '../../utils/referralLinks';
import Head from 'next/head';

export default function RevolutPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [animateCard, setAnimateCard] = useState(false);
  const referralLink = getReferralLink('cards', 'revolut');
  
  useEffect(() => {
    // Trigger card animation after a delay
    const timer = setTimeout(() => {
      setAnimateCard(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    {
      title: "Crypto Trading",
      description: "Buy, sell, and hold 80+ cryptocurrencies directly in the app with competitive fees.",
      icon: () => <DollarSign size={24} className="text-blue-400" />
    },
    {
      title: "Metal Cards",
      description: "Premium metal cards with exclusive perks, cashback, and airport lounge access.",
      icon: () => <CreditCard size={24} className="text-purple-400" />
    },
    {
      title: "Global Spending",
      description: "Spend in 150+ currencies at the interbank exchange rate with no hidden fees.",
      icon: () => <Globe size={24} className="text-teal-400" />
    },
    {
      title: "All-in-One App",
      description: "Banking, investing, crypto, and payments all in one secure mobile application.",
      icon: () => <Smartphone size={24} className="text-green-400" />
    }
  ];

  const benefits = [
    {
      icon: <Wallet className="w-6 h-6 text-blue-400" />,
      title: "No Monthly Fees",
      description: "Free standard account with no monthly maintenance fees or minimum balance requirements"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-purple-400" />,
      title: "Instant Transfers",
      description: "Send and receive money instantly to other Revolut users worldwide at no cost"
    },
    {
      icon: <Percent className="w-6 h-6 text-teal-400" />,
      title: "Competitive Rates",
      description: "Exchange currencies at the real exchange rate with only a small weekend fee"
    },
    {
      icon: <Plane className="w-6 h-6 text-green-400" />,
      title: "Travel Perks",
      description: "Premium plans include travel insurance, lounge access, and exclusive concierge services"
    },
    {
      icon: <Coffee className="w-6 h-6 text-yellow-400" />,
      title: "Lifestyle Benefits",
      description: "Discounts at popular retailers, restaurants, and entertainment venues worldwide"
    },
    {
      icon: <Headphones className="w-6 h-6 text-red-400" />,
      title: "24/7 Support",
      description: "Premium and Metal plans include priority customer support whenever you need it"
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
        <title>Revolut | All-in-One Financial Super App | 1ewis.com</title>
        <meta name="description" content="Explore Revolut - the all-in-one financial super app with crypto trading, global transfers, and premium metal cards for the modern digital lifestyle. Join 25M+ users in 2025." />
        <meta name="keywords" content="Revolut, crypto trading app, metal cards, global transfers, digital banking, financial super app, mobile banking" />
        <link rel="canonical" href="https://1ewis.com/cards/revolut" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Revolut | All-in-One Financial Super App | 1ewis.com" />
        <meta property="og:description" content="Explore Revolut - the all-in-one financial super app with crypto trading, global transfers, and premium metal cards for the modern digital lifestyle. Join 25M+ users in 2025." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/cards/revolut" />
        <meta property="og:image" content="https://1ewis.com/images/cards/revolut-card.jpg" />
        <meta property="og:site_name" content="1ewis.com" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewis_" />
        <meta name="twitter:title" content="Revolut | All-in-One Financial Super App | 1ewis.com" />
        <meta name="twitter:description" content="Explore Revolut - the all-in-one financial super app with crypto trading, global transfers, and premium metal cards for the modern digital lifestyle." />
        <meta name="twitter:image" content="https://1ewis.com/images/cards/revolut-card.jpg" />
        
        {/* Schema.org structured data for Review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Revolut Review",
            "reviewBody": "Revolut offers an impressive all-in-one financial solution with crypto trading, global transfers, and premium metal cards. The app is user-friendly and packed with features like budgeting tools, savings vaults, and cashback rewards.",
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
              "@type": "FinancialProduct",
              "name": "Revolut",
              "brand": {
                "@type": "Brand",
                "name": "Revolut"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "24567",
              "bestRating": "5"
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
                "name": "What is Revolut and how does it work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Revolut is an all-in-one financial super app that offers banking services, cryptocurrency trading, global money transfers, and premium metal cards. It works through a mobile app that lets you manage all your finances in one place, with features like instant notifications, spending analytics, and savings vaults."
                }
              },
              {
                "@type": "Question",
                "name": "Is Revolut safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Revolut employs bank-level encryption and security measures to protect your data and money. It offers features like device management, biometric authentication, and the ability to freeze/unfreeze your card instantly. Revolut is also regulated by financial authorities in multiple jurisdictions."
                }
              },
              {
                "@type": "Question",
                "name": "What cryptocurrencies can I trade on Revolut?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Revolut supports trading of 80+ cryptocurrencies including Bitcoin, Ethereum, Solana, Cardano, Polkadot, and many more. Premium and Metal plan users enjoy lower fees on crypto transactions compared to standard users."
                }
              },
              {
                "@type": "Question",
                "name": "What are the different Revolut plans available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Revolut offers several plans: Standard (free), Plus, Premium, and Metal. Higher-tier plans include benefits like overseas medical insurance, delayed baggage insurance, exclusive metal cards, higher ATM withdrawal limits, and priority customer support."
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
                "name": "Cards",
                "item": "https://1ewis.com/cards"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Revolut Review",
                "item": "https://1ewis.com/cards/revolut"
              }
            ]
          })}
        </script>
      </Head>

      {/* Breadcrumb Navigation Container */}
      <main className="container mx-auto px-4 pt-32 pb-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-4 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
            Portfolio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/cards" className="hover:text-blue-400 transition-colors">
            Cards
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Revolut Review</span>
        </nav>
        
        {/* Last Updated Information */}
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <span>Last updated: June 21, 2025</span>
          <span className="mx-2">•</span>
          <span>8 min read</span>
        </div>
      </main>

      {/* Hero Section */}
      <section className="relative overflow-hidden mt-4">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/3 right-1/3 w-1/4 h-1/4 bg-teal-500/10 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="px-6 py-8 md:py-16 md:px-16 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
                  <Sparkles className="text-blue-400 w-5 h-5 mr-2" />
                  <span className="text-blue-300 font-medium">Next-Gen Banking</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400">
                  Revolut
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  The all-in-one financial super app with crypto trading, global transfers, and premium metal cards for the modern digital lifestyle.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <ButtonLink 
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-lg"
                  >
                    <span className="flex items-center">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </ButtonLink>
                  
                  <ButtonLink 
                    href="#plans"
                    variant="outline"
                    className="border-2 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                  >
                    <span className="flex items-center">
                      Compare Plans
                      <ChevronDown className="ml-2 h-5 w-5" />
                    </span>
                  </ButtonLink>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full max-w-[500px] mx-auto">
                  {/* Background elements */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-500/20 blur-[50px] z-0"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-purple-500/20 blur-[30px] z-0"></div>
                  
                  <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0"></div>
                    <iframe
                      width="100%"
                      height="300"
                      src="https://www.youtube.com/embed/pcPA400hEiU"
                      title="Revolut App Tutorial"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="relative z-10"
                    ></iframe>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features and Stats Section */}
      <section className="px-6 py-20 md:px-16 bg-gradient-to-b from-blue-900/30 to-black relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
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
          
          {/* Interactive Tabs */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <motion.h2 
                className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Explore Revolut
              </motion.h2>
            </div>
            
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <div className="flex space-x-2 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                {[
                  { id: 'features', label: 'Key Features' },
                  { id: 'benefits', label: 'Benefits' },
                  { id: 'crypto', label: 'Crypto Trading' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md transition-all duration-300 ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700/50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {benefits.slice(0, 6).map((benefit, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                          {benefit.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'benefits' && (
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-semibold mb-4 text-blue-400">Premium Benefits</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Overseas Medical Insurance</p>
                              <p className="text-sm text-gray-300">Comprehensive medical coverage while traveling abroad</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Delayed Baggage & Flight Insurance</p>
                              <p className="text-sm text-gray-300">Compensation for travel disruptions</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">SmartDelay Airport Lounge Access</p>
                              <p className="text-sm text-gray-300">Free lounge access when your flight is delayed</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Metal Exclusives</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Up to 1% Cashback</p>
                              <p className="text-sm text-gray-300">On all eligible card payments in any currency</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Exclusive Metal Card</p>
                              <p className="text-sm text-gray-300">Premium 18g metal card with a unique design</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400"><Check size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Dedicated Concierge</p>
                              <p className="text-sm text-gray-300">Personal assistant for bookings and arrangements</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'crypto' && (
                  <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-2xl font-semibold mb-4 text-blue-400">Crypto Trading Features</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-blue-400"><DollarSign size={18} /></div>
                            <div>
                              <p className="font-medium text-white">80+ Cryptocurrencies</p>
                              <p className="text-sm text-gray-300">Trade Bitcoin, Ethereum, and dozens more digital assets</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-blue-400"><RefreshCw size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Auto-Exchange</p>
                              <p className="text-sm text-gray-300">Set target prices to automatically buy or sell when reached</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-blue-400"><Wallet size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Recurring Buys</p>
                              <p className="text-sm text-gray-300">Schedule regular purchases to dollar-cost average your investments</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold mb-4 text-purple-400">Crypto Security</h3>
                        <ul className="space-y-4">
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-purple-400"><Shield size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Cold Storage Protection</p>
                              <p className="text-sm text-gray-300">Most crypto assets are held in cold storage for maximum security</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-purple-400"><Lock size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Biometric Authentication</p>
                              <p className="text-sm text-gray-300">Additional security for all crypto transactions</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="mt-1 mr-3 text-purple-400"><Smartphone size={18} /></div>
                            <div>
                              <p className="font-medium text-white">Device Management</p>
                              <p className="text-sm text-gray-300">Control which devices can access your crypto assets</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        {/* Plans Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400" id="plans">Subscription Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Standard",
                price: "",
                color: "bg-gray-800",
                features: ["Free UK Account", "Free Euro IBAN Account", "Spend in 150+ Currencies", "Basic Crypto Trading", "Savings Vaults"]
              },
              {
                name: "Premium",
                price: "",
                color: "bg-blue-800",
                features: ["All Standard Features", "Global Express Delivery", "Overseas Medical Insurance", "Priority Customer Support", "Exclusive Card Designs"]
              },
              {
                name: "Metal",
                price: "",
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
                  <p className="text-sm text-blue-300">Contact for pricing</p>
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
            
            <button 
              onClick={() => setShowMore(!showMore)}
              className="text-blue-400 hover:text-blue-300 flex items-center mt-2 mb-4 text-sm font-medium transition-colors duration-200"
            >
              {showMore ? 'Show less' : 'Read more'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
            
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
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12 border border-blue-800/30 shadow-xl">
            <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 px-4 py-2 rounded-full">
              <Gift className="text-blue-400 w-5 h-5 mr-2" />
              <span className="text-blue-300 font-medium">Special Offer</span>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Ready to Revolutionize Your Finances?
            </h2>
            
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Sign up for Revolut today and get a <span className="text-blue-400 font-semibold">free month of Revolut Premium</span> when you use my referral link. Experience the all-in-one financial super app with crypto trading and premium features.
            </p>
            
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg py-3 px-4 mb-8 inline-block">
              <p className="text-sm text-gray-300 flex items-center justify-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-2">REFERRAL BONUS</span>
                Free month of Revolut Premium
              </p>
            </div>
            
            <div className="mt-6">
              <ButtonLink 
                href={referralLink}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="flex items-center justify-center">
                  Join Revolut Now <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
      </section>

      <Footer />
      
      {/* Floating Call-to-Action Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a 
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-5 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          <div className="mr-3 relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-300" />
            </div>
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-200">FREE PREMIUM</div>
            <div className="flex items-center">
              <span>Join Revolut</span>
              <ExternalLink className="ml-1 w-3 h-3" />
            </div>
          </div>
        </a>
      </motion.div>
    </div>
  );
}
