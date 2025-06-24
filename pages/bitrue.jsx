import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Shield, Zap, DollarSign, BarChart3, Globe, Smartphone, LockKeyhole, Award } from 'lucide-react';
import { getExchangeReferral } from '../utils/referralLinks';
import AnimatedFeatures from '../components/AnimatedFeatures';
import Footer from '../components/Footer';

export default function Bitrue() {
  const referralData = getExchangeReferral('bittrue');
  
  const features = [
    {
      icon: () => <Shield size={24} />,
      title: 'Secure Platform',
      description: 'Bitrue implements industry-leading security measures to protect your assets'
    },
    {
      icon: () => <Zap size={24} />,
      title: 'XRP Focus',
      description: 'Specialized in XRP trading pairs and the broader XRP ecosystem'
    },
    {
      icon: () => <DollarSign size={24} />,
      title: 'Yield Products',
      description: 'Earn passive income with Bitrue\'s Power Piggy and other yield-generating products'
    },
    {
      icon: () => <BarChart3 size={24} />,
      title: 'Advanced Trading',
      description: 'Access to advanced trading features including margin trading and futures'
    },
    {
      icon: () => <Globe size={24} />,
      title: 'Global Accessibility',
      description: 'Available in over 100 countries with multi-language support'
    },
    {
      icon: () => <Smartphone size={24} />,
      title: 'Mobile Trading',
      description: 'Powerful mobile app for trading on the go with full platform functionality'
    }
  ];

  const benefits = [
    '30% commission on trading fees with referral',
    'Specialized XRP trading pairs',
    'High-yield staking options',
    'User-friendly mobile app',
    'Regular promotions and airdrops',
    'Fast deposit and withdrawal processing'
  ];
  
  const tradingPairs = [
    { name: 'BTC/USDT', volume: '$24.5M', change: '+2.3%' },
    { name: 'ETH/USDT', volume: '$18.7M', change: '+1.8%' },
    { name: 'XRP/USDT', volume: '$12.3M', change: '+4.5%' },
    { name: 'BTT/USDT', volume: '$8.9M', change: '+3.2%' },
    { name: 'DOGE/USDT', volume: '$7.6M', change: '+5.1%' }
  ];
  
  const securityFeatures = [
    {
      icon: () => <LockKeyhole size={24} />,
      title: 'Multi-Factor Authentication',
      description: 'Secure your account with multiple layers of protection including email, SMS, and Google Authenticator'
    },
    {
      icon: () => <Shield size={24} />,
      title: 'Cold Storage',
      description: 'Majority of user funds are stored in cold wallets completely isolated from the internet'
    },
    {
      icon: () => <Award size={24} />,
      title: 'Insurance Fund',
      description: 'Protection against potential losses with a dedicated insurance fund'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Bitrue Review 2025 | XRP Trading, Fees & 30% Commission Bonus</title>
        <meta name="description" content="Honest Bitrue review (2025): Compare fees, trading features, and security. Sign up with our referral link for exclusive 30% commission on trading fees and yield products up to 15% APR." />
        <meta name="keywords" content="bitrue review, bitrue vs binance, best crypto exchange for XRP, low fee crypto exchange 2025, bitrue referral code, bitrue power piggy, crypto yield products, XRP trading platform" />
        <link rel="canonical" href="https://1ewis.com/bitrue" />
        <meta property="og:title" content="Bitrue Review 2025 | XRP Trading & 30% Commission Bonus" />
        <meta property="og:description" content="Honest Bitrue review: Compare fees, trading features, and security. Get 30% commission on trading fees with our referral link and earn up to 15% APR on crypto." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/bitrue" />
        <meta property="og:image" content="https://1ewis.com/images/bitrue-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-01-15T08:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-01T10:30:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Exchanges" />
        <meta property="article:tag" content="Bitrue" />
        <meta property="article:tag" content="XRP" />
        <meta property="article:tag" content="Crypto Exchange" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="Bitrue Review 2025 | XRP Trading & Bonuses" />
        <meta name="twitter:description" content="Honest Bitrue review: Compare fees, trading features, and security. Get 30% commission on trading fees and earn up to 15% APR on crypto." />
        <meta name="twitter:image" content="https://1ewis.com/images/bitrue-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "Bitrue Exchange Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.5",
              "bestRating": "5"
            },
            "reviewBody": "Bitrue is an excellent crypto exchange with a focus on XRP trading pairs and innovative yield products. The platform offers competitive fees, strong security measures, and a user-friendly interface for both beginners and advanced traders. Their Power Piggy program provides up to 15% APR on crypto holdings.",
            "datePublished": "2025-01-15",
            "dateModified": "2025-06-01",
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
              "name": "Bitrue Exchange",
              "description": "XRP-focused exchange with innovative crypto yield products up to 15% APR",
              "image": "https://1ewis.com/images/bitrue-logo.png",
              "brand": {
                "@type": "Brand",
                "name": "Bitrue"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.5",
                "reviewCount": "1"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://1ewis.com/bitrue"
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
                "name": "What is Bitrue Exchange?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bitrue is a cryptocurrency exchange with a special focus on XRP and yield-generating products. It offers competitive trading fees, strong security measures, and innovative earning options like Power Piggy that provides up to 15% APR on crypto holdings."
                }
              },
              {
                "@type": "Question",
                "name": "Is Bitrue safe to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Bitrue employs industry-leading security measures including multi-factor authentication, cold storage for the majority of user funds, and a dedicated insurance fund to protect against potential losses."
                }
              },
              {
                "@type": "Question",
                "name": "What are Bitrue's trading fees?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bitrue offers competitive trading fees starting at 0.098% for makers and 0.098% for takers. Users can get additional discounts by using BTR tokens or through the referral program which offers 30% commission on trading fees."
                }
              },
              {
                "@type": "Question",
                "name": "What is Bitrue Power Piggy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Bitrue Power Piggy is a yield-generating program that allows users to earn interest on their crypto holdings with rates up to 15% APR. It supports multiple cryptocurrencies including BTC, ETH, XRP, and stablecoins, with flexible terms and daily interest payments."
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
                "name": "Bitrue Review",
                "item": "https://1ewis.com/bitrue"
              }
            ]
          })}
        </script>
      </Head>

      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="text-sm mb-8" aria-label="Breadcrumb">
          <div className="flex flex-wrap items-center">
            <a href="/" className="text-gray-400 hover:text-yellow-400 transition-colors">Home</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href="/portfolio" className="text-gray-400 hover:text-yellow-400 transition-colors">Portfolio</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href="/exchanges" className="text-gray-400 hover:text-yellow-400 transition-colors">Exchanges</a>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-yellow-400" aria-current="page">Bitrue Review</span>
          </div>
        </nav>
        
        {/* Last Updated Info */}
        <div className="mb-8 text-sm text-gray-400">
          <span>Last updated: June 1, 2025</span> • <span>Reading time: 8 min</span>
        </div>
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Bitrue Exchange
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                XRP-focused exchange with innovative crypto yield products
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
                  className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
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
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
                
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-yellow-500/30">
                  <iframe
                    width="100%"
                    height="350"
                    src="https://www.youtube.com/embed/VakE5FEPV-4"
                    title="Bitrue Exchange Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="z-10"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="bg-gradient-to-r from-yellow-900/20 to-yellow-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-yellow-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Exclusive Offer for New Users</h2>
                <p className="text-gray-300 mb-6">
                  Sign up using our referral link and receive:
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={18} />
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
                  className="block w-full md:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Sign Up with Bitrue
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400 mb-1">Referral Code:</p>
                  <div className="bg-gray-800 rounded-lg px-4 py-2 font-mono text-yellow-400">
                    {referralData.referralCode}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Why Choose Bitrue?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bitrue offers a secure and user-friendly platform for trading cryptocurrencies with a special focus on XRP and yield-generating products.
            </p>
          </div>

          <AnimatedFeatures features={features} color="yellow" />
        </section>

        <section className="mb-16">
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-yellow-800/30">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">How to Get Started with Bitrue</h2>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Create Your Account</h3>
                  <p className="text-gray-300">
                    Sign up using our referral link to receive exclusive benefits. The process takes less than 5 minutes.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Verify Your Identity</h3>
                  <p className="text-gray-300">
                    Complete the KYC process to unlock full trading capabilities and higher withdrawal limits.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Deposit Funds</h3>
                  <p className="text-gray-300">
                    Deposit cryptocurrency or fiat currency through the available payment methods.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Start Trading or Earning</h3>
                  <p className="text-gray-300">
                    Begin trading on the exchange or deposit your assets into yield-generating products like Power Piggy.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href={referralData.referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
              >
                Create Bitrue Account
                <ArrowRight className="inline ml-2" size={18} />
              </a>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Popular Trading Pairs</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bitrue offers a wide range of trading pairs with competitive fees and deep liquidity
            </p>
          </div>
          
          <div className="bg-gray-800/50 rounded-2xl p-8 border border-yellow-800/30">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-yellow-400 font-bold">Trading Pair</th>
                    <th className="px-4 py-3 text-left text-yellow-400 font-bold">24h Volume</th>
                    <th className="px-4 py-3 text-left text-yellow-400 font-bold">24h Change</th>
                    <th className="px-4 py-3 text-left text-yellow-400 font-bold">Trade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {tradingPairs.map((pair, index) => (
                    <tr key={index} className="hover:bg-gray-700/50 transition-colors">
                      <td className="px-4 py-4 font-medium">{pair.name}</td>
                      <td className="px-4 py-4 text-gray-300">{pair.volume}</td>
                      <td className="px-4 py-4 text-green-500">{pair.change}</td>
                      <td className="px-4 py-4">
                        <a 
                          href={referralData.referralLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-1 px-4 rounded-lg transition-all duration-300 text-sm"
                        >
                          Trade
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-yellow-400">Security You Can Trust</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bitrue employs industry-leading security measures to ensure your assets are protected
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-800/50 rounded-2xl p-6 border border-yellow-800/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-yellow-400">{feature.icon()}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section className="mb-16">
          <div className="bg-gradient-to-r from-yellow-900/20 to-yellow-600/20 rounded-2xl p-8 border border-yellow-800/50">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">Power Piggy - Earn Passive Income</h2>
                <p className="text-gray-300 mb-6">
                  Bitrue's Power Piggy program allows you to earn interest on your crypto holdings with rates up to 15% APR. Start earning passive income with just a few clicks.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <Check className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Flexible terms with daily interest payments</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>Support for multiple cryptocurrencies including BTC, ETH, XRP, and more</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-yellow-400 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>No lock-up period - withdraw your funds at any time</span>
                  </li>
                </ul>
                <a 
                  href={referralData.referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Start Earning Now
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
              </div>
              <div className="md:w-1/3">
                <div className="bg-gray-800 rounded-2xl p-6 border border-yellow-800/30 text-center">
                  <h3 className="text-xl font-bold mb-4">Current Interest Rates</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                      <span>BTC</span>
                      <span className="text-yellow-400 font-bold">5.3% APR</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                      <span>ETH</span>
                      <span className="text-yellow-400 font-bold">6.8% APR</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                      <span>XRP</span>
                      <span className="text-yellow-400 font-bold">7.2% APR</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                      <span>USDT</span>
                      <span className="text-yellow-400 font-bold">12.5% APR</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded">
                      <span>BTT</span>
                      <span className="text-yellow-400 font-bold">15.0% APR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Fixed Referral Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={referralData.referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Sign Up Now
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
    </div>
  );
}
