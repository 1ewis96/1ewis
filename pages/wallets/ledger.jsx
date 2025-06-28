import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, ExternalLink, Lock, Smartphone, Sparkles, Layers, RefreshCw, Check } from "lucide-react";
import Footer from '../../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import { getWalletReferral } from '../../utils/referralLinks';
import Head from 'next/head';

export default function LedgerPage() {
  const [showMore, setShowMore] = useState(false);
  const [activeProduct, setActiveProduct] = useState('nano-s-plus');
  const ledgerReferral = getWalletReferral('ledger');
  
  const features = [
    {
      title: "Certified Security",
      description: "Store your private keys offline in a secure chip, protected from online threats and hackers.",
      icon: () => <Shield size={24} className="text-blue-400" />
    },
    {
      title: "Multi-Currency Support",
      description: "Manage 5,500+ cryptocurrencies and tokens from a single device with dedicated apps.",
      icon: () => <Wallet size={24} className="text-green-400" />
    },
    {
      title: "DApp Integration",
      description: "Connect securely to decentralized applications while keeping your keys protected.",
      icon: () => <Zap size={24} className="text-yellow-400" />
    },
    {
      title: "Recovery Options",
      description: "Restore your wallet on a new device with your 24-word recovery phrase if your device is lost.",
      icon: () => <RefreshCw size={24} className="text-purple-400" />
    }
  ];
  
  const products = {
    'nano-s-plus': {
      name: "Ledger Nano S Plus",
      tagline: "The essential hardware wallet for securing your crypto assets",
      image: "/assets/nano-s-plus.webp",
      features: [
        "Large screen for better readability",
        "Store up to 100+ apps simultaneously",
        "Full NFT support with clear visualization",
        "USB-C connectivity for modern devices",
        "Compact and portable design",
        "Compatible with 5,500+ coins and tokens"
      ],
      highlights: [
        { title: "Storage Capacity", value: "100+ apps" },
        { title: "Connection", value: "USB-C" },
        { title: "Display", value: "128×64 px" },
        { title: "Dimensions", value: "62.39×17.4×8.24 mm" }
      ]
    },
    'nano-x': {
      name: "Ledger Nano X",
      tagline: "The Bluetooth-enabled hardware wallet for managing crypto on the go",
      image: "/assets/ledger-nano-x.webp",
      features: [
        "Bluetooth connectivity for mobile management",
        "Built-in rechargeable battery",
        "Larger screen for improved visibility",
        "Store up to 100+ apps simultaneously",
        "Manage assets on the go with Ledger Live mobile",
        "Military-grade security chip (CC EAL5+)"
      ],
      highlights: [
        { title: "Storage Capacity", value: "100+ apps" },
        { title: "Connection", value: "USB-C & Bluetooth" },
        { title: "Battery", value: "8 hours (active)" },
        { title: "Dimensions", value: "72×18.6×11.75 mm" }
      ]
    },
    'stax': {
      name: "Ledger Stax",
      tagline: "The next-generation hardware wallet with an E-ink touchscreen display",
      image: "/assets/ledger-stax.webp",
      features: [
        "Curved E-ink touchscreen display",
        "Wireless Qi charging capability",
        "Customizable display when not in use",
        "Clear signing with larger display",
        "Magnetic attachment for stacking multiple devices",
        "Advanced security architecture"
      ],
      highlights: [
        { title: "Display", value: "E-ink touchscreen" },
        { title: "Connection", value: "USB-C & Bluetooth" },
        { title: "Charging", value: "Wireless Qi & USB" },
        { title: "Dimensions", value: "85×54×6 mm" }
      ]
    }
  };
  
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
        <title>Ledger Hardware Wallets Review 2025 | Secure Your Crypto Assets</title>
        <meta name="description" content="Ledger hardware wallets review (2025): Compare Nano S Plus, Nano X, and Stax models. Military-grade security for 5,500+ cryptocurrencies with exclusive deals." />
        <meta name="keywords" content="ledger hardware wallet, ledger nano x review, ledger stax review, crypto hardware wallet, secure cryptocurrency storage, ledger nano s plus, best crypto wallet 2025" />
        <link rel="canonical" href="https://1ewis.com/wallets/ledger" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Ledger Hardware Wallets Review 2025 | Secure Your Crypto Assets" />
        <meta property="og:description" content="Compare Ledger's hardware wallet lineup: Nano S Plus, Nano X, and Stax models. Military-grade security for 5,500+ cryptocurrencies with offline storage and exclusive deals." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/wallets/ledger" />
        <meta property="og:image" content="https://1ewis.com/images/ledger-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-03-10T10:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-21T09:00:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Wallets" />
        <meta property="article:tag" content="Ledger" />
        <meta property="article:tag" content="Hardware Wallet" />
        <meta property="article:tag" content="Crypto Security" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="Ledger Hardware Wallets Review 2025" />
        <meta name="twitter:description" content="Compare Ledger's hardware wallet lineup: Nano S Plus, Nano X, and Stax. Military-grade security for 5,500+ cryptocurrencies with offline storage." />
        <meta name="twitter:image" content="https://1ewis.com/images/ledger-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Ledger Hardware Wallets Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.8",
              "bestRating": "5"
            },
            "reviewBody": "Ledger hardware wallets provide industry-leading security for cryptocurrency storage with their certified secure chips and air-gapped protection. The lineup includes the affordable Nano S Plus, the Bluetooth-enabled Nano X for mobile management, and the premium Stax with its E-ink touchscreen. All devices support 5,500+ cryptocurrencies through the intuitive Ledger Live app, making them the gold standard for crypto security.",
            "datePublished": "2025-03-10",
            "dateModified": "2025-06-21",
            "author": {
              "@type": "Organization",
              "name": "1ewis.com",
              "url": "https://1ewis.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "1ewis Crypto Reviews",
              "logo": {
                "@type": "ImageObject",
                "url": "https://1ewis.com/images/logo.png"
              }
            },
            "itemReviewed": {
              "@type": "Product",
              "name": "Ledger Hardware Wallets",
              "description": "Secure cryptocurrency hardware wallets with offline storage and military-grade encryption",
              "image": "https://1ewis.com/images/ledger-wallets.png",
              "brand": {
                "@type": "Brand",
                "name": "Ledger"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1"
              },
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "79",
                "highPrice": "279",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://1ewis.com/wallets/ledger"
              }
            }
          })}
        </script>
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a Ledger hardware wallet?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Ledger hardware wallet is a physical device that securely stores the private keys to your cryptocurrency offline, protecting them from online threats like hackers and malware. Ledger devices use certified secure chips to isolate your keys and require physical confirmation for all transactions."
                }
              },
              {
                "@type": "Question",
                "name": "Which Ledger model is best for beginners?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Ledger Nano S Plus is ideal for beginners due to its affordable price point and user-friendly design. It supports 5,500+ cryptocurrencies, has a large screen for transaction verification, and can store up to 100+ apps simultaneously, making it perfect for those new to hardware wallets."
                }
              },
              {
                "@type": "Question",
                "name": "Are Ledger hardware wallets secure?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Ledger hardware wallets are extremely secure. They use certified secure chips (CC EAL5+) that have never been remotely hacked, run on Ledger's proprietary BOLOS operating system, and keep your private keys completely offline. Every transaction must be physically verified on the device, protecting against remote attacks even if your computer is compromised."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if I lose my Ledger device?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "If you lose your Ledger device, your crypto assets remain safe as long as you have your 24-word recovery phrase. This backup phrase allows you to restore all your accounts on a new Ledger device or compatible wallet. This is why it's crucial to write down your recovery phrase and store it in a secure location when setting up your device."
                }
              }
            ]
          })}
        </script>
        
        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://1ewis.com/"
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
                "name": "Wallets",
                "item": "https://1ewis.com/wallets"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Ledger Review",
                "item": "https://1ewis.com/wallets/ledger"
              }
            ]
          })}
        </script>
      </Head>
      
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
          <Link href="/wallets" className="hover:text-blue-400 transition-colors">
            Wallets
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Ledger Review</span>
        </nav>
        
        {/* Last Updated Information */}
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <span>Last updated: June 21, 2025</span>
          <span className="mx-2">•</span>
          <span>7 min read</span>
        </div>
      
        {/* Hero Section */}
      <section className="relative overflow-hidden mt-4">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/3 right-1/3 w-1/4 h-1/4 bg-green-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="px-6 py-8 md:py-16 md:px-16 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
              <Lock className="text-blue-400 w-5 h-5 mr-2" />
              <span className="text-blue-300 font-medium">Secure Your Crypto Assets</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300">
              Ledger Hardware Wallets
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8">
              The industry standard in cryptocurrency security, protecting your digital assets with military-grade encryption and offline storage.
            </p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <ButtonLink 
                href={ledgerReferral.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-lg"
              >
                <span className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Secure Your Crypto Now
                  <ExternalLink className="ml-2 h-5 w-5" />
                </span>
              </ButtonLink>
              
              <ButtonLink 
                href="#product-comparison"
                variant="outline"
                className="border-2 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <span className="flex items-center">
                  Compare Models
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </ButtonLink>
            </motion.div>
            
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/80 to-gray-800/80">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0"></div>
                <iframe
                  width="100%"
                  height="400"
                  src="https://www.youtube.com/embed/pcPA400hEiU"
                  title="Ledger Hardware Wallet Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="relative z-10"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <AnimatedFeatures features={features} color="gray-400" />
          
          {/* Product Showcase */}
          <div id="product-comparison" className="mt-24">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Choose Your Perfect Ledger
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Compare Ledger's hardware wallet lineup to find the perfect match for your security needs.
              </p>
            </motion.div>
            
            {/* Product Selection Tabs */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-2">
              <div className="flex space-x-2 p-1 bg-gray-800/50 backdrop-blur-sm rounded-lg">
                {Object.keys(products).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveProduct(key)}
                    className={`px-4 py-2 rounded-md transition-all duration-300 ${activeProduct === key ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700/50'}`}
                  >
                    {products[key].name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Display */}
            <div className="mb-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProduct}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                >
                  {/* Product Image */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50 flex items-center justify-center">
                    <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl overflow-hidden flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image 
                          src={products[activeProduct].image} 
                          alt={products[activeProduct].name} 
                          fill 
                          className="object-contain p-4" 
                          priority
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">{products[activeProduct].name}</h3>
                    <p className="text-lg text-gray-300 mb-6">{products[activeProduct].tagline}</p>
                    
                    {/* Technical Highlights */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {products[activeProduct].highlights.map((highlight, index) => (
                        <div key={index} className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 border border-gray-700/30">
                          <p className="text-xs text-gray-400 mb-1">{highlight.title}</p>
                          <p className="text-lg font-semibold text-white">{highlight.value}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Features List */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold mb-4 text-blue-400">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {products[activeProduct].features.map((feature, index) => (
                          <div key={index} className="flex items-start">
                            <div className="mt-1 mr-3 text-green-400">
                              <Check size={16} />
                            </div>
                            <p className="text-gray-300">{feature}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <div className="mt-auto">
                      <ButtonLink 
                        href={ledgerReferral.referralLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-center"
                      >
                        <span className="flex items-center justify-center">
                          Shop {products[activeProduct].name}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </span>
                      </ButtonLink>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Referral Code: {ledgerReferral.referralCode}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      
      {/* Why Choose Section */}
      <section className="px-6 py-24 md:px-16 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-blue-500/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1/4 h-1/4 bg-purple-500/5 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Why Choose Ledger?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover why millions of users trust Ledger to secure their digital assets.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Certified Security</h3>
                <p className="text-gray-300">
                  Ledger's security is independently certified by ANSSI, the French cybersecurity agency, with secure chips that meet the highest standards.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Proprietary OS</h3>
                <p className="text-gray-300">
                  BOLOS, Ledger's custom operating system, provides an additional layer of security that ensures your private keys never leave the secure chip.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Ledger Live App</h3>
                <p className="text-gray-300">
                  Manage 5,500+ coins and tokens directly from your desktop or mobile app while keeping your keys protected on your hardware device.
                </p>
              </motion.div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-xl">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-400">Industry-Leading Security</h3>
                  <p className="text-gray-300 mb-4">
                    Ledger hardware wallets use a secure element chip - the same technology used in passports and credit cards - to keep your private keys completely isolated from online threats. This air-gapped security approach means your crypto assets remain protected even if your computer is compromised.
                  </p>
                  
                  <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
                    <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Air-Gapped Protection</h3>
                    <p className="text-gray-300 mb-4">
                      Ledger devices are designed to be air-gapped, meaning your private keys never leave the secure chip. Every transaction must be physically confirmed on the device, preventing remote attacks.
                    </p>
                    
                    <h3 className="text-xl font-semibold mb-4 text-blue-400 mt-6">Recovery Options</h3>
                    <p className="text-gray-300 mb-4">
                      Your 24-word recovery phrase allows you to restore your wallet on a new device if yours is lost or damaged. This backup system ensures you never lose access to your assets.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4"
                  >
                    {showMore ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
                  </button>
                </div>
                
                <div className="w-full md:w-1/3 bg-gray-800/50 rounded-xl p-6 border border-gray-700/30">
                  <h4 className="text-lg font-semibold mb-4 text-white flex items-center">
                    <Sparkles className="w-5 h-5 text-yellow-400 mr-2" />
                    Did You Know?
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-green-400"><Check size={16} /></div>
                      <p className="text-gray-300 text-sm">Ledger has sold over 5 million devices worldwide</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-green-400"><Check size={16} /></div>
                      <p className="text-gray-300 text-sm">Ledger supports over 5,500 cryptocurrencies</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-green-400"><Check size={16} /></div>
                      <p className="text-gray-300 text-sm">Ledger devices have never been remotely hacked</p>
                    </li>
                    <li className="flex items-start">
                      <div className="mt-1 mr-2 text-green-400"><Check size={16} /></div>
                      <p className="text-gray-300 text-sm">Ledger Live has over 1.5 million monthly active users</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 py-24 md:px-16 bg-gradient-to-b from-gray-950 to-black text-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 rounded-full blur-[150px]"></div>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Ready to Secure Your Crypto Assets?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Get your Ledger hardware wallet today and enjoy peace of mind knowing your assets are protected with military-grade security.
            </p>
            
            {/* Referral Badge */}
            <div className="bg-gray-800/70 rounded-lg py-3 px-4 mb-6 mx-auto max-w-md">
              <p className="text-sm text-gray-300 flex items-center justify-center">
                <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded mr-2">AFFILIATE LINK</span>
                Special discount available through this referral
              </p>
            </div>
            
            <ButtonLink 
              href={ledgerReferral.referralLink} 
              className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-3 text-lg rounded-lg transition-colors duration-300 shadow-lg hover:shadow-gray-700/30 mt-4"
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
          href={ledgerReferral.referralLink}
          target="_blank"
          rel="noopener noreferrer" 
          className="flex items-center bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-3 px-5 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
          <div className="mr-3 relative">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-300" />
            </div>
            <motion.span 
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-600"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-200">SECURE YOUR CRYPTO</div>
            <div className="flex items-center">
              <span>Shop Ledger</span>
              <ExternalLink className="ml-1 w-3 h-3" />
            </div>
          </div>
        </a>
      </motion.div>
      </main>
    </div>
  );
}
