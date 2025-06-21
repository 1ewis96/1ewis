import { Button, ButtonLink } from "../../components/ui/button";
import { ArrowRight, ChevronDown, Shield, Zap, CreditCard, Smartphone, DollarSign, Percent, Check, Award, Lock } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedFeatures from '../../components/AnimatedFeatures';
import { useState } from 'react';
import Head from 'next/head';
import { getReferralLink } from '../../utils/referralLinks';
import Footer from '../../components/Footer';

export default function YouHodlerPage() {
  const [showMore, setShowMore] = useState(false);
  const referralLink = getReferralLink('wallets', 'youhodler');
  
  const features = [
    {
      title: "Crypto Savings",
      description: "Earn up to 13% APY on your crypto with flexible terms and weekly payouts.",
      icon: () => <Percent size={24} />
    },
    {
      title: "Crypto Loans",
      description: "Get instant cash loans using your crypto as collateral with up to 90% LTV.",
      icon: () => <DollarSign size={24} />
    },
    {
      title: "Multi HODL",
      description: "Multiply your crypto holdings with leverage trading up to 30x.",
      icon: () => <Zap size={24} />
    },
    {
      title: "Crypto Credit Card",
      description: "Spend your crypto assets anywhere with the YouHodler Visa card.",
      icon: () => <CreditCard size={24} />
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

  const benefits = [
    'Up to 13% APY on crypto savings',
    'Instant crypto-backed loans with up to 90% LTV',
    'Multi HODL to multiply your crypto up to 30x',
    'Weekly interest payouts with no lock-up periods',
    'Visa card to spend your crypto anywhere',
    'Secure platform with insurance protection'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>YouHodler Review 2025 | Earn Up to 13% APY on Crypto Assets</title>
        <meta name="description" content="YouHodler review (2025): Earn up to 13% APY on crypto, get instant loans with 90% LTV, and multiply your assets with up to 30x leverage. Regulated in Switzerland and EU." />
        <meta name="keywords" content="youhodler review, crypto savings account, crypto interest rates, crypto loans, crypto yield platform, regulated crypto platform, multi hodl, crypto visa card" />
        <link rel="canonical" href="https://1ewis.com/wallets/youhodler" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="YouHodler Review 2025 | Earn Up to 13% APY on Crypto Assets" />
        <meta property="og:description" content="YouHodler offers up to 13% APY on crypto savings, instant loans with 90% LTV, and tools to multiply your assets with up to 30x leverage. Fully regulated in Switzerland and EU." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://1ewis.com/wallets/youhodler" />
        <meta property="og:image" content="https://1ewis.com/images/youhodler-review.jpg" />
        <meta property="og:site_name" content="1ewis Crypto Reviews" />
        <meta property="article:published_time" content="2025-02-15T10:00:00+01:00" />
        <meta property="article:modified_time" content="2025-06-21T09:00:00+01:00" />
        <meta property="article:author" content="https://1ewis.com/about" />
        <meta property="article:section" content="Cryptocurrency Platforms" />
        <meta property="article:tag" content="YouHodler" />
        <meta property="article:tag" content="Crypto Savings" />
        <meta property="article:tag" content="Crypto Loans" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@1ewiscom" />
        <meta name="twitter:title" content="YouHodler Review 2025 | Earn Up to 13% APY on Crypto" />
        <meta name="twitter:description" content="YouHodler offers up to 13% APY on crypto savings, instant loans with 90% LTV, and tools to multiply your assets. Regulated in Switzerland and EU." />
        <meta name="twitter:image" content="https://1ewis.com/images/youhodler-review.jpg" />
        
        {/* Schema.org structured data for review */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "name": "YouHodler Platform Review",
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "4.6",
              "bestRating": "5"
            },
            "reviewBody": "YouHodler is an excellent crypto platform offering high interest rates up to 13% APY on stablecoins and competitive rates on major cryptocurrencies. Their crypto-backed loans provide up to 90% LTV with instant approval, and their Multi HODL feature allows users to multiply their crypto holdings with leverage up to 30x. The platform is fully regulated in Switzerland and the EU, providing a secure environment for crypto financial services.",
            "datePublished": "2025-02-15",
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
              "name": "YouHodler",
              "description": "All-in-one crypto platform for earning, borrowing, and multiplying digital assets",
              "image": "https://1ewis.com/images/youhodler-logo.png",
              "brand": {
                "@type": "Brand",
                "name": "YouHodler"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.6",
                "reviewCount": "1"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "url": "https://1ewis.com/wallets/youhodler"
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
                "name": "What is YouHodler?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "YouHodler is an all-in-one crypto platform that offers crypto savings accounts with up to 13% APY, crypto-backed loans with up to 90% LTV, and tools like Multi HODL that allow users to multiply their crypto holdings with leverage up to 30x. The platform is fully regulated in Switzerland and the EU."
                }
              },
              {
                "@type": "Question",
                "name": "What interest rates does YouHodler offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "YouHodler offers some of the highest interest rates in the crypto industry, with up to 13% APY on stablecoins like USDT and USDC, 8% APY on Bitcoin (BTC), and 7% APY on Ethereum (ETH). Interest is paid weekly with no mandatory lock-up periods."
                }
              },
              {
                "@type": "Question",
                "name": "Is YouHodler safe and regulated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, YouHodler operates as a fully regulated financial entity across multiple jurisdictions including Switzerland, the European Union, Argentina, Italy, and Spain. The platform implements institutional-grade security measures and has up to $150 million in pooled crime insurance."
                }
              },
              {
                "@type": "Question",
                "name": "What is Multi HODL on YouHodler?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multi HODL is YouHodler's leveraged trading feature that allows users to multiply their crypto holdings by up to 30x. It enables users to take advantage of both rising and falling markets without having to move their assets to a traditional exchange."
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
                "name": "YouHodler Review",
                "item": "https://1ewis.com/wallets/youhodler"
              }
            ]
          })}
        </script>
      </Head>
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-teal-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-teal-400 transition-colors">
            Portfolio
          </Link>
          <span className="mx-2">/</span>
          <Link href="/wallets" className="hover:text-teal-400 transition-colors">
            Wallets
          </Link>
          <span className="mx-2">/</span>
          <span className="text-teal-400">YouHodler Review</span>
        </nav>
        
        {/* Last Updated Information */}
        <div className="flex items-center text-xs text-gray-400 mb-8">
          <span>Last updated: June 21, 2025</span>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>
        
        <section className="mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-4 text-teal-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                YouHodler
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                The all-in-one crypto platform for earning, borrowing, and multiplying your digital assets.
              </motion.p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a 
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-teal-500 hover:bg-teal-400 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 text-lg"
                >
                  Start Earning Now
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
                <div className="bg-gradient-to-r from-teal-500 to-teal-300 rounded-full w-64 h-64 absolute -top-10 -right-10 blur-3xl opacity-20 z-0"></div>
                
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border border-teal-500/30">
                  <iframe
                    width="100%"
                    height="350"
                    src="https://www.youtube.com/embed/pcPA400hEiU"
                    title="YouHodler Platform Tutorial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="z-10"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-teal-900/20 to-teal-600/20 rounded-2xl p-6 md:p-8 mb-12 border border-teal-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl font-bold mb-4">Exclusive Benefits for New Users</h2>
                <p className="text-gray-300 mb-6">
                  Sign up using our referral link and enjoy:
                </p>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-teal-400 mr-2 mt-1 flex-shrink-0" size={18} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-full md:w-auto">
                <a 
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full md:w-auto bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Sign Up with YouHodler
                  <ArrowRight className="inline ml-2" size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          <section className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 text-teal-400">Why Choose YouHodler?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                YouHodler offers a secure and user-friendly platform for earning, borrowing, and multiplying your crypto assets with industry-leading rates and innovative tools.
              </p>
            </div>
            
            {/* Regulatory Information */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-teal-800/30 mb-10">
              <h3 className="text-xl font-semibold mb-4 text-teal-400">Regulated & Compliant Platform</h3>
              <p className="text-gray-300 mb-4">
                YouHodler operates as a fully regulated financial entity across multiple jurisdictions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🇨🇭</span>
                    <span className="text-xl mr-2">🇪🇺</span>
                    <h4 className="font-medium text-teal-300">Switzerland & EU</h4>
                  </div>
                  <p className="text-sm text-gray-400">YouHodler S.A. operates as a Regulated Financial Intermediary in Switzerland and the European Union.</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🇦🇷</span>
                    <h4 className="font-medium text-teal-300">Argentina</h4>
                  </div>
                  <p className="text-sm text-gray-400">Registered as a Virtual Asset Service Provider in Argentina, ensuring compliance with local regulations.</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🇮🇹</span>
                    <h4 className="font-medium text-teal-300">Italy</h4>
                  </div>
                  <p className="text-sm text-gray-400">YouHodler Italy S.R.L. maintains OAM Registration, meeting all Italian regulatory requirements.</p>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">🇪🇸</span>
                    <h4 className="font-medium text-teal-300">Spain</h4>
                  </div>
                  <p className="text-sm text-gray-400">VASP Registration with the Bank of Spain, ensuring full compliance with Spanish financial regulations.</p>
                </div>
              </div>
            </div>

            <AnimatedFeatures features={features} color="teal" />
          </section>

          {/* Stats Section */}
          <section className="mb-16">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
          {[
            { label: "Supported Coins", value: "50+", unit: "Cryptocurrencies" },
            { label: "Max APY", value: "13%", unit: "Annual Yield" },
            { label: "Min Deposit", value: "$100", unit: "To Start" },
            { label: "Max LTV", value: "90%", unit: "Loan-to-Value" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-teal-400">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
              <span className="text-xs text-gray-500">{stat.unit}</span>
            </motion.div>
          ))}
        </motion.div>

          </section>
          
          {/* Yield Rates Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Top Earning Opportunities</h2>
          <div className="text-center mb-6">
            <p className="text-amber-400 text-sm bg-amber-900/20 inline-block px-4 py-2 rounded-lg border border-amber-800/30">
              <strong>Disclaimer:</strong> Rates shown are subject to change based on market conditions. Please check the YouHodler website for current rates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "USDT/USDC",
                rate: "13% APY",
                color: "bg-teal-800",
                features: ["Stablecoins", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              },
              {
                name: "Bitcoin (BTC)",
                rate: "8% APY",
                color: "bg-teal-700",
                features: ["Most Popular Crypto", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              },
              {
                name: "Ethereum (ETH)",
                rate: "7% APY",
                color: "bg-teal-800",
                features: ["Leading Altcoin", "Weekly Payouts", "No Lock-up Period", "Compound Interest", "Instant Withdrawals"]
              }
            ].map((coin, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`${coin.color} rounded-xl p-6 border border-gray-700 flex flex-col`}
              >
                <h3 className="text-xl font-bold mb-2">{coin.name}</h3>
                <div className="mb-4">
                  <p className="text-2xl font-semibold">{coin.rate}</p>
                  <span className="text-xs text-gray-300">earn passively</span>
                </div>
                <div className="mt-auto">
                  <span className="text-xs text-gray-300 mb-2 block">Key Features</span>
                  <ul className="text-sm">
                    {coin.features.map((feature, i) => (
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

          </section>
          
          {/* Why Choose Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Why Choose YouHodler?</h2>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-teal-400">Industry-Leading Yield Rates</h3>
            <p className="text-gray-300 mb-4">
              YouHodler offers some of the highest interest rates in the crypto lending industry, with up to 13% APY on stablecoins and competitive rates on major cryptocurrencies like Bitcoin and Ethereum. Unlike many competitors, YouHodler provides weekly payouts with no mandatory lock-up periods, giving you both high yields and flexibility with your crypto assets.
            </p>
            
            <div className={`overflow-hidden transition-all duration-500 ${showMore ? 'max-h-[1000px]' : 'max-h-0'}`}>
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Innovative Crypto Tools</h3>
              <p className="text-gray-300 mb-4">
                Beyond simple savings accounts, YouHodler offers a suite of innovative tools to maximize your crypto potential. Their Multi HODL feature allows you to multiply your crypto holdings with leverage up to 30x, while Turbocharge enables you to stack loans to build positions in rising markets. These tools provide unique opportunities to grow your portfolio that aren't available on most other platforms.
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-teal-400 mt-6">Secure and Regulated</h3>
              <p className="text-gray-300 mb-4">
                YouHodler prioritizes security with institutional-grade custody solutions, regular security audits, and up to $150 million in pooled crime insurance. The platform is compliant with Swiss financial regulations and implements strict AML/KYC procedures, providing a level of security and legitimacy that's essential for a crypto financial services provider.
              </p>
            </div>
            
            <button
              onClick={() => setShowMore(!showMore)}
              className="flex items-center text-teal-400 hover:text-teal-300 transition-colors mt-2 mx-auto"
            >
              {showMore ? 'Show Less' : 'Show More'}
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </motion.div>

          </section>
          
          {/* Use Cases Section */}
          <section className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Perfect For</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Passive Income Seekers",
                description: "Earn weekly interest payments on your crypto holdings without locking up your assets."
              },
              {
                title: "Crypto Holders Needing Cash",
                description: "Get instant cash loans using your crypto as collateral without selling your assets."
              },
              {
                title: "Active Crypto Traders",
                description: "Use Multi HODL to leverage your positions and capitalize on market movements."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

          </section>
          
          {/* CTA Section */}
          <section className="mb-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Earning on Your Crypto?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up for YouHodler today and start earning up to 13% APY on your crypto assets. Use my referral link to get exclusive bonuses when you join.
          </p>
              <ButtonLink 
                href={referralLink}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg rounded-lg"
                target="_blank"
              >
                <span className="flex items-center justify-center">
                  Join YouHodler <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </ButtonLink>
            </motion.div>
          </section>
        </section>
      </main>

      <Footer />
      
      {/* Fixed Referral Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={referralLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-teal-500 hover:bg-teal-400 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <span className="mr-2 text-xs bg-green-500 text-white px-2 py-1 rounded">High APY</span>
          Sign Up Now
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
    </div>
  );
}
