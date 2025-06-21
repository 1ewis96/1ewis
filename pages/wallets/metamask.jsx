import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, BarChart, Wallet, CheckCircle, ExternalLink } from "lucide-react";
import Footer from '../../components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import Head from 'next/head';

export default function MetaMaskPage() {
  const [showMore, setShowMore] = useState(false);
  
  const features = [
    {
      title: "Self-Custody Wallet",
      description: "Maintain full control of your private keys and digital assets with this non-custodial wallet solution.",
      icon: () => <Wallet size={24} />
    },
    {
      title: "DApp Browser",
      description: "Access thousands of decentralized applications directly from your wallet interface.",
      icon: () => <BarChart size={24} />
    },
    {
      title: "Multi-Chain Support",
      description: "Connect to Ethereum, Binance Smart Chain, Polygon, Avalanche, and many other EVM-compatible networks.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Enhanced Security",
      description: "Protect your assets with industry-standard encryption and optional hardware wallet integration.",
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
        <title>MetaMask Wallet Review 2025 | Best Self-Custody Web3 Gateway</title>
        <meta name="description" content="MetaMask review (2025): The leading self-custody crypto wallet with 30M+ users. Access 10,000+ DApps across 15+ networks including Ethereum, BSC, and Polygon." />
        <meta name="keywords" content="metamask wallet review, metamask extension, web3 wallet, self custody crypto wallet, ethereum wallet, dapp browser, multi chain wallet" />
        <link rel="canonical" href="https://1ewis.com/wallets/metamask" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="MetaMask Wallet Review 2025 | Best Self-Custody Web3 Gateway" />
        <meta property="og:description" content="MetaMask is the leading self-custody wallet with 30M+ users worldwide. Access 10,000+ DApps across 15+ networks including Ethereum, BSC, and Polygon." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/wallets/metamask" />
        <meta property="og:image" content="https://1ewis.com/images/metamask-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-01-15T10:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-21T09:00:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Wallets" />
        <meta property="article:tag" content="MetaMask" />
        <meta property="article:tag" content="Web3" />
        <meta property="article:tag" content="Self-Custody Wallet" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="MetaMask Wallet Review 2025" />
        <meta name="twitter:description" content="The leading self-custody wallet with 30M+ users. Access 10,000+ DApps across 15+ networks including Ethereum, BSC, and Polygon." />
        <meta name="twitter:image" content="https://1ewis.com/images/metamask-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "MetaMask Wallet Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.7",
              "bestRating": "5"
            },
            "reviewBody": "MetaMask is the industry standard for Web3 access, offering a seamless self-custody wallet experience across multiple blockchain networks. With over 30 million active users worldwide, it provides access to 10,000+ decentralized applications while giving users complete control over their private keys and digital assets. The wallet supports 15+ networks including Ethereum, Binance Smart Chain, Polygon, and Avalanche, making it the perfect gateway to the decentralized web.",
            "datePublished": "2025-01-15",
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
              "@type": "SoftwareApplication",
              "name": "MetaMask",
              "description": "Self-custody cryptocurrency wallet and gateway to blockchain applications",
              "image": "https://1ewis.com/images/metamask-logo.png",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Android, iOS, Windows, macOS, Linux",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "1"
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
                "name": "What is MetaMask?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MetaMask is a self-custody cryptocurrency wallet that serves as a gateway to blockchain applications and Web3. Available as a browser extension and mobile app, it allows users to store and manage digital assets, connect to decentralized applications (DApps), and interact with multiple blockchain networks while maintaining full control of their private keys."
                }
              },
              {
                "@type": "Question",
                "name": "Is MetaMask safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, MetaMask is generally considered safe as it's a self-custody wallet where only you control your private keys. It uses industry-standard encryption to protect your wallet and never stores your seed phrase on their servers. However, users must securely store their recovery phrase and be vigilant about phishing attempts, as MetaMask is a common target due to its popularity."
                }
              },
              {
                "@type": "Question",
                "name": "Which blockchain networks does MetaMask support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "MetaMask supports over 15 blockchain networks. While it was originally built for Ethereum, it now supports many EVM-compatible networks including Binance Smart Chain, Polygon, Avalanche, Arbitrum, Optimism, Fantom, and many others. Users can easily switch between networks or add custom networks through the interface."
                }
              },
              {
                "@type": "Question",
                "name": "How do I get started with MetaMask?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To get started with MetaMask: 1) Download the browser extension from your browser's web store or the mobile app from the App Store or Google Play. 2) Create a new wallet by setting up a password and securely storing your 12-word recovery phrase, or import an existing wallet. 3) Add your preferred blockchain networks and start exploring decentralized applications."
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
                "name": "MetaMask Review",
                "item": "https://1ewis.com/wallets/metamask"
              }
            ]
          })}
        </script>
      </Head>
      
      <main>
        {/* Breadcrumb and Last Updated Container */}
        <div className="container mx-auto px-4 pt-32">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-6 text-sm text-gray-400">
            <Link href="/" className="hover:text-orange-400 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/portfolio" className="hover:text-orange-400 transition-colors">
              Portfolio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/wallets" className="hover:text-orange-400 transition-colors">
              Wallets
            </Link>
            <span className="mx-2">/</span>
            <span className="text-orange-400">MetaMask Review</span>
          </nav>
          
          {/* Last Updated Information */}
          <div className="flex items-center text-xs text-gray-400 mb-8">
            <span>Last updated: June 21, 2025</span>
            <span className="mx-2">•</span>
            <span>6 min read</span>
          </div>
        </div>
        
        {/* Hero Section - Full Width */}
        <div className="relative pt-8 pb-20 overflow-hidden w-full">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-900/20 via-black to-black z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-[500px] overflow-hidden">
          <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-orange-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-yellow-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
          <div className="inline-flex items-center mb-6 bg-gradient-to-r from-orange-900/40 to-yellow-900/40 px-5 py-2.5 rounded-full shadow-lg shadow-orange-900/20">
            <Wallet className="text-orange-400 w-5 h-5 mr-2" />
            <span className="text-orange-300 font-medium">Self-Custody Wallet</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 drop-shadow-lg">
            MetaMask
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300 leading-relaxed mb-10">
            The leading self-custody wallet and gateway to blockchain applications and Web3.
          </p>
          
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 z-0"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-xl blur-sm z-0"></div>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/pcPA400hEiU"
                title="MetaMask Wallet Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="relative z-10"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <div className="mb-20">
          <AnimatedFeatures features={features} color="orange-400" />
        </div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { label: "Active Users", value: "30M+", unit: "Worldwide" },
            { label: "Supported Chains", value: "15+", unit: "Networks" },
            { label: "DApps Access", value: "10,000+", unit: "Applications" },
            { label: "Languages", value: "20+", unit: "Supported" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-xl p-6 text-center border border-orange-900/20 shadow-lg hover:shadow-orange-900/10 hover:translate-y-[-5px] transition-all duration-500"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-2">{stat.value}</h3>
              <p className="text-gray-300 font-medium">{stat.label}</p>
              <span className="text-sm text-gray-500">{stat.unit}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Section */}
        <motion.div
          className="mb-24 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">Why Choose MetaMask?</h2>
          
          <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-xl p-8 border border-orange-900/20 shadow-xl">
            <div className="flex items-start mb-6">
              <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                <CheckCircle className="text-orange-400 w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-orange-400">Industry Standard for Web3</h3>
                <p className="text-gray-300 leading-relaxed">
                  MetaMask has established itself as the industry standard for accessing Web3 applications. With over 30 million active users, it's the most widely used and trusted Ethereum wallet in the ecosystem, making it compatible with virtually every DApp you might want to use.
                </p>
              </div>
            </div>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <div className="flex items-start mb-6">
                <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                  <CheckCircle className="text-orange-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Complete Control of Your Assets</h3>
                  <p className="text-gray-300 leading-relaxed">
                    As a self-custody wallet, MetaMask gives you complete control over your private keys and digital assets. Unlike exchange wallets, your crypto is truly yours - no third party can freeze your funds or restrict your access. This aligns perfectly with the core principles of decentralization and financial sovereignty.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                  <CheckCircle className="text-orange-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-orange-400">Seamless Multi-Chain Experience</h3>
                  <p className="text-gray-300 leading-relaxed">
                    While MetaMask started as an Ethereum wallet, it now supports multiple blockchain networks including Binance Smart Chain, Polygon, Avalanche, and many other EVM-compatible chains. This multi-chain functionality allows you to easily manage assets across different networks from a single interface.
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-orange-400 hover:text-orange-300 transition-colors mt-6 mx-auto bg-orange-900/20 px-5 py-2 rounded-full font-medium"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-2 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

        {/* Getting Started Section */}
        <motion.div
          className="mb-24 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">Getting Started with MetaMask</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Download & Install",
                description: "Install the MetaMask extension from your browser's web store or download the mobile app from the App Store or Google Play."
              },
              {
                step: "2",
                title: "Create or Import Wallet",
                description: "Set up a new wallet by creating a password and securely storing your recovery phrase, or import an existing wallet."
              },
              {
                step: "3",
                title: "Connect to Networks",
                description: "Add your preferred blockchain networks and start exploring the world of decentralized applications."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-xl p-8 border border-orange-900/20 shadow-lg hover:shadow-orange-900/10 hover:translate-y-[-5px] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center mb-6 text-white font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-orange-400">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-br from-orange-900/20 to-yellow-900/20 backdrop-blur-md rounded-2xl p-10 border border-orange-500/20 shadow-2xl max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-500">Ready to Enter the World of Web3?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Download MetaMask today and start exploring thousands of decentralized applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ButtonLink 
              href="https://metamask.io/download/" 
              className="bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg w-full sm:w-auto"
              target="_blank"
            >
              <span className="flex items-center justify-center">
                Download MetaMask <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </ButtonLink>
            
            <ButtonLink 
              href="https://metamask.io/"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 text-lg rounded-lg border border-orange-500/30 w-full sm:w-auto"
              target="_blank"
            >
              <span className="flex items-center justify-center">
                Learn More <ExternalLink className="ml-2 w-5 h-5" />
              </span>
            </ButtonLink>
          </div>
          </motion.div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
