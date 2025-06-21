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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <Head>
        <title>Coinflare Exchange Review 2025 | Low Fees & Advanced Security Features</title>
        <meta name="description" content="Coinflare crypto exchange review (2025): Discover low trading fees starting at 0.1%, advanced security features with cold storage, and powerful trading tools for both beginners and experienced traders." />
        <meta name="keywords" content="coinflare exchange review 2025, crypto trading platform, low fee crypto exchange, secure cryptocurrency exchange, coinflare referral bonus, advanced crypto trading tools, multi-factor authentication crypto" />
        <link rel="canonical" href="https://1ewis.com/coinflare" />
        <meta property="og:title" content="Coinflare Exchange Review 2025 | Low Fees & Advanced Security" />
        <meta property="og:description" content="Coinflare offers competitive trading fees starting at 0.1%, advanced security features with cold storage, and a powerful trading platform for all types of crypto traders." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/coinflare" />
        <meta property="og:image" content="https://1ewis.com/images/coinflare-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-01-20T09:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-21T09:00:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Exchanges" />
        <meta property="article:tag" content="Coinflare" />
        <meta property="article:tag" content="Crypto Exchange" />
        <meta property="article:tag" content="Trading Platform" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="Coinflare Exchange Review 2025 | Advanced Crypto Trading" />
        <meta name="twitter:description" content="Coinflare offers competitive trading fees starting at 0.1%, advanced security features, and a powerful trading platform for all types of crypto traders." />
        <meta name="twitter:image" content="https://1ewis.com/images/coinflare-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Coinflare Exchange Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.4",
              "bestRating": "5"
            },
            "reviewBody": "Coinflare is a reliable cryptocurrency exchange with competitive trading fees and excellent security features. The platform offers advanced trading tools, multi-factor authentication, and cold storage for asset protection. Their mobile app provides a seamless trading experience for users on the go.",
            "datePublished": "2025-01-20",
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
              "name": "Coinflare Exchange",
              "description": "Advanced cryptocurrency trading platform with competitive fees and robust security features",
              "image": "https://1ewis.com/images/coinflare-logo.png",
              "brand": {
                "@type": "Brand",
                "name": "Coinflare"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.4",
                "reviewCount": "1"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://1ewis.com/coinflare"
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
                "name": "What is Coinflare Exchange?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Coinflare is a cryptocurrency exchange that offers advanced trading tools, competitive fees, and robust security features. It provides a platform for both beginners and experienced traders to buy, sell, and trade various cryptocurrencies."
                }
              },
              {
                "@type": "Question",
                "name": "What are Coinflare's security features?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Coinflare implements multiple security measures including multi-factor authentication, cold storage for the majority of user funds, and comprehensive insurance protection against potential security incidents."
                }
              },
              {
                "@type": "Question",
                "name": "What trading fees does Coinflare charge?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Coinflare offers competitive trading fees starting at 0.1% with volume-based discounts available for high-volume traders. Users can also receive exclusive fee discounts through referral programs."
                }
              },
              {
                "@type": "Question",
                "name": "Does Coinflare have a mobile app?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Coinflare provides a powerful mobile application that allows users to trade anytime and anywhere. The app includes all the essential features of the desktop platform with an intuitive interface optimized for mobile devices."
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
                "name": "Exchanges",
                "item": "https://1ewis.com/exchanges"
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": "Coinflare Review",
                "item": "https://1ewis.com/coinflare"
              }
            ]
          })}
        </script>
      </Head>

      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-8" aria-label="Breadcrumb">
          <div className="flex flex-wrap items-center">
            <a href="/" className="text-gray-400 hover:text-orange-400 transition-colors">Home</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href="/portfolio" className="text-gray-400 hover:text-orange-400 transition-colors">Portfolio</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href="/exchanges" className="text-gray-400 hover:text-orange-400 transition-colors">Exchanges</a>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-orange-400" aria-current="page">Coinflare Review</span>
          </div>
        </nav>
        
        {/* Last Updated Info */}
        <div className="mb-8 text-sm text-gray-400">
          <span>Last updated: June 21, 2025</span> • <span>Reading time: 6 min</span>
        </div>
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
                  className="inline-block bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-md"
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
                className="relative w-full max-w-xl"
              >
                <div className="bg-gradient-to-r from-orange-500 to-orange-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-30 z-0"></div>
                
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-orange-500/30">
                  <iframe
                    width="100%"
                    height="350"
                    src="https://www.youtube.com/embed/pcPA400hEiU"
                    title="Coinflare Exchange Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="z-10"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="bg-gradient-to-br from-orange-900/40 to-orange-600/30 rounded-2xl p-6 md:p-8 mb-12 border border-orange-500/50 shadow-lg shadow-orange-900/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Exclusive Benefits for New Users</h2>
                <p className="text-gray-300 mb-6 bg-orange-900/20 p-3 rounded-lg border border-orange-800/30">
                  Sign up using our referral link and receive:
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-orange-300 mr-2 mt-1 flex-shrink-0" size={18} />
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
                  className="block w-full md:w-auto bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center shadow-md"
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
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent rounded-3xl blur-3xl -z-10 opacity-30"></div>
            <AnimatedFeatures features={features} color="orange-400" />
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industry-Leading Security</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Your assets are protected by multiple layers of security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent rounded-3xl blur-3xl -z-10 opacity-30"></div>
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-900/70 to-orange-900/20 border border-orange-800/30 rounded-xl p-6 shadow-lg shadow-orange-900/10"
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
          <div className="bg-gradient-to-r from-gray-900/80 to-orange-900/20 rounded-2xl p-8 border border-orange-800/30 shadow-lg shadow-orange-900/10 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl"></div>
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
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg shadow-md"
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
