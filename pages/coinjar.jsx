import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap, DollarSign, BarChart3, Globe, Smartphone, LockKeyhole, Award } from 'lucide-react';
import { getExchangeReferral } from '../utils/referralLinks';
import AnimatedFeatures from '../components/AnimatedFeatures';
import Footer from '../components/Footer';

export default function CoinJar() {
  const referralData = getExchangeReferral('coinjar');
  
  const tradingPairs = [
    { name: 'BTC/AUD', volume: '$18.2M', change: '+1.8%' },
    { name: 'ETH/AUD', volume: '$12.5M', change: '+2.3%' },
    { name: 'XRP/AUD', volume: '$6.7M', change: '+0.9%' },
    { name: 'DOGE/AUD', volume: '$4.3M', change: '+3.7%' },
    { name: 'SOL/AUD', volume: '$5.8M', change: '+4.2%' }
  ];
  
  const securityFeatures = [
    {
      icon: () => <LockKeyhole size={24} />,
      title: 'Two-Factor Authentication',
      description: 'Secure your account with multiple layers of protection including email and authenticator apps'
    },
    {
      icon: () => <Shield size={24} />,
      title: 'Cold Storage',
      description: 'Majority of user funds are stored in cold wallets completely isolated from the internet'
    },
    {
      icon: () => <Award size={24} />,
      title: 'Regulatory Compliance',
      description: 'Registered with AUSTRAC and compliant with Australian financial regulations'
    }
  ];
  
  const features = [
    {
      icon: () => <Shield size={24} />,
      title: 'Secure Platform',
      description: 'CoinJar implements strong security measures to protect your assets'
    },
    {
      icon: () => <Zap size={24} />,
      title: 'Fast Verification',
      description: 'Quick and efficient verification process to get you trading faster'
    },
    {
      icon: () => <DollarSign size={24} />,
      title: 'Competitive Fees',
      description: 'Enjoy reasonable trading fees and transparent pricing structure'
    },
    {
      icon: () => <BarChart3 size={24} />,
      title: 'User-Friendly Interface',
      description: 'Intuitive platform design suitable for beginners and experienced traders'
    },
    {
      icon: () => <Globe size={24} />,
      title: 'Australian Based',
      description: 'Regulated Australian exchange with strong local presence'
    },
    {
      icon: () => <Smartphone size={24} />,
      title: 'Mobile Trading',
      description: 'Powerful mobile app for trading on the go with full platform functionality'
    }
  ];

  const benefits = [
    'User-friendly platform for beginners',
    'Fast verification process',
    'Excellent mobile app experience',
    'Competitive trading fees',
    'Strong security measures',
    'Australian regulated exchange'
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>CoinJar Review 2025 | User-Friendly Australian Crypto Exchange</title>
        <meta name="description" content="Honest CoinJar review (2025): Compare fees, trading features, and security. Sign up with our referral link for exclusive bonuses." />
        <meta name="keywords" content="coinjar review, coinjar exchange, australian crypto exchange, user-friendly crypto exchange 2025, coinjar referral code" />
        <link rel="canonical" href="https://1ewis.com/coinjar" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="CoinJar Review 2025 | User-Friendly Australian Crypto Exchange" />
        <meta property="og:description" content="Honest CoinJar review: Compare fees, trading features, and security. Sign up with our referral link for exclusive bonuses." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/coinjar" />
        <meta property="og:image" content="https://1ewis.com/images/coinjar-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-06-27T09:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-27T09:00:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Exchanges" />
        <meta property="article:tag" content="CoinJar" />
        <meta property="article:tag" content="Crypto Exchange" />
        <meta property="article:tag" content="Australian Exchange" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="CoinJar Review 2025 | User-Friendly Australian Exchange" />
        <meta name="twitter:description" content="Honest CoinJar review: Compare fees, trading features, and security. Sign up with our referral link for exclusive bonuses." />
        <meta name="twitter:image" content="https://1ewis.com/images/coinjar-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "CoinJar Exchange Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.3",
              "bestRating": "5"
            },
            "reviewBody": "CoinJar is an excellent Australian-based crypto exchange with a user-friendly interface and excellent mobile app. The platform offers competitive fees, strong security measures, and is perfect for beginners and intermediate traders.",
            "datePublished": "2025-06-27",
            "dateModified": "2025-06-27",
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
              "name": "CoinJar Exchange",
              "description": "Australian-based cryptocurrency exchange with a user-friendly interface",
              "image": "https://1ewis.com/images/coinjar-logo.png",
              "brand": {
                "@type": "Brand",
                "name": "CoinJar"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.3",
                "reviewCount": "1"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://1ewis.com/coinjar"
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
                "name": "What is CoinJar Exchange?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CoinJar is an Australian-based cryptocurrency exchange with a user-friendly interface and excellent mobile app. It offers competitive trading fees, strong security measures, and is perfect for beginners and intermediate traders."
                }
              },
              {
                "@type": "Question",
                "name": "Is CoinJar safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, CoinJar employs strong security measures including two-factor authentication, cold storage for the majority of user funds, and is registered with AUSTRAC and compliant with Australian financial regulations."
                }
              },
              {
                "@type": "Question",
                "name": "What are CoinJar's trading fees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CoinJar offers competitive trading fees with 0.10% for makers and 0.20% for takers. Instant Buy/Sell has a fee of 1.00%, while bank transfers for deposits and withdrawals are free."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use CoinJar on mobile?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, CoinJar offers a powerful mobile app for trading on the go with full platform functionality, making it easy to manage your crypto portfolio from anywhere."
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
                "item": "https://1ewis.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Exchanges",
                "item": "https://1ewis.com/exchanges"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "CoinJar Review",
                "item": "https://1ewis.com/coinjar"
              }
            ]
          })}
        </script>
      </Head>
      
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav className="flex mb-8 text-sm text-gray-400">
            <a href="/" className="hover:text-green-400 transition-colors">Home</a>
            <span className="mx-2">/</span>
            <a href="/exchanges" className="hover:text-green-400 transition-colors">Exchanges</a>
            <span className="mx-2">/</span>
            <span className="text-green-400">CoinJar</span>
          </nav>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                  CoinJar Exchange Review
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Australian-based cryptocurrency exchange with a user-friendly interface and excellent mobile app, perfect for beginners and intermediate traders.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a 
                  href={referralData.referralLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors"
                >
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                
                <a 
                  href="#features" 
                  className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-gray-800 text-white font-medium rounded-lg border border-gray-700 transition-colors"
                >
                  Learn More
                </a>
              </motion.div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-gradient-to-br from-green-400/20 to-teal-500/20 rounded-2xl p-1">
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-green-400">CoinJar Highlights</h3>
                    <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">Recommended</span>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Referral Bonus:</span>
                      <span className="font-medium text-green-400">{referralData.bonusDetails}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose CoinJar?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              CoinJar offers a seamless trading experience with these key features
            </p>
          </div>
          
          <AnimatedFeatures features={features} />
        </div>
      </section>
      
      {/* Trading Information Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trading Information</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              CoinJar offers competitive fees and a wide range of trading pairs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-400">Fee Structure</h3>
              <div className="bg-gray-900 rounded-xl p-6 mb-6">
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="font-medium">Instant Buy/Sell</span>
                  <span>1.00%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="font-medium">Maker Fee</span>
                  <span>0.10%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="font-medium">Taker Fee</span>
                  <span>0.20%</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="font-medium">Deposit (Bank Transfer)</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="font-medium">Withdrawal (Bank Transfer)</span>
                  <span>Free</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-green-400">Popular Trading Pairs</h3>
              <div className="bg-gray-900 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="py-4 px-6 text-left">Pair</th>
                      <th className="py-4 px-6 text-left">24h Volume</th>
                      <th className="py-4 px-6 text-left">24h Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradingPairs.map((pair, index) => (
                      <tr key={index} className="border-t border-gray-800">
                        <td className="py-4 px-6 font-medium">{pair.name}</td>
                        <td className="py-4 px-6">{pair.volume}</td>
                        <td className="py-4 px-6 text-green-400">{pair.change}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Security Measures</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your security is CoinJar's top priority
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-green-500/10 p-3 rounded-lg inline-block mb-4">
                  {feature.icon()}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-b from-gray-800 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Trading with CoinJar?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Sign up today using our referral link and get exclusive bonuses.
          </p>
          <a 
            href={referralData.referralLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-medium rounded-lg transition-colors text-lg"
          >
            Create Your Account <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
