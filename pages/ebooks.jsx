import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonLink } from "../components/ui/button";
import { Book, ArrowRight, Download, Star, Sparkles, CheckCircle, BookOpen } from "lucide-react";
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';

export default function EbooksPage() {
  const [activeCategory, setActiveCategory] = useState('beginner');
  
  const ebookCategories = [
    {
      id: 'beginner',
      name: 'Beginner Series',
      subtitle: 'Foundations',
      color: 'blue',
      description: 'Perfect for newcomers to cryptocurrency and blockchain technology. Start your journey here.'
    },
    {
      id: 'intermediate',
      name: 'Intermediate Series',
      subtitle: 'Practical Use & Investing',
      color: 'purple',
      description: 'Take your knowledge to the next level with practical applications and investment strategies.'
    },
    {
      id: 'advanced',
      name: 'Advanced Series',
      subtitle: 'Deep Dives & Trends',
      color: 'pink',
      description: 'Explore complex topics and emerging trends in the cryptocurrency ecosystem.'
    }
  ];
  
  const ebooks = {
    beginner: [
      {
        title: "Crypto 101: The Beginner's Guide to Bitcoin and Blockchain",
        description: "A comprehensive introduction to cryptocurrency fundamentals, blockchain technology, and how Bitcoin works.",
        image: "/images/ebooks/crypto101.jpg",
        color: "blue"
      },
      {
        title: "How Cryptocurrency Works: Decoding the Digital Dollar",
        description: "Understand the mechanics behind digital currencies and the technology that powers them.",
        image: "/images/ebooks/crypto-works.jpg",
        color: "blue"
      },
      {
        title: "Crypto Wallets & Exchanges: Safely Buying, Storing, and Trading",
        description: "Learn how to securely store your digital assets and navigate cryptocurrency exchanges.",
        image: "/images/ebooks/wallets-exchanges.jpg",
        color: "blue"
      },
      {
        title: "Avoiding Scams: Staying Safe in the Crypto Jungle",
        description: "Essential security practices and common scams to watch out for in the cryptocurrency space.",
        image: "/images/ebooks/avoiding-scams.jpg",
        color: "blue"
      },
      {
        title: "From Fiat to Freedom: Why Crypto Matters",
        description: "Explore the philosophical and economic implications of cryptocurrency adoption.",
        image: "/images/ebooks/fiat-freedom.jpg",
        color: "blue"
      }
    ],
    intermediate: [
      {
        title: "Crypto Investing: Strategies for Building Long-Term Wealth",
        description: "Proven investment approaches for cryptocurrency markets and portfolio management techniques.",
        image: "/images/ebooks/crypto-investing.jpg",
        color: "purple"
      },
      {
        title: "Understanding Altcoins: Beyond Bitcoin",
        description: "Explore the diverse ecosystem of alternative cryptocurrencies and their unique value propositions.",
        image: "/images/ebooks/altcoins.jpg",
        color: "purple"
      },
      {
        title: "DeFi Demystified: Earning Interest Without Banks",
        description: "Navigate the world of decentralized finance and discover new ways to generate passive income.",
        image: "/images/ebooks/defi.jpg",
        color: "purple"
      },
      {
        title: "NFTs Explained: Art, Ownership, and the Digital Gold Rush",
        description: "Understand non-fungible tokens and their impact on digital ownership and creative industries.",
        image: "/images/ebooks/nfts.jpg",
        color: "purple"
      },
      {
        title: "Taxes, Laws & Crypto: What You Need to Know",
        description: "Essential legal and tax considerations for cryptocurrency users and investors.",
        image: "/images/ebooks/crypto-taxes.jpg",
        color: "purple"
      }
    ],
    advanced: [
      {
        title: "Technical Analysis for Crypto Traders",
        description: "Advanced chart reading techniques and trading strategies specific to cryptocurrency markets.",
        image: "/images/ebooks/technical-analysis.jpg",
        color: "pink"
      },
      {
        title: "Smart Contracts & Ethereum: The Future of Automation",
        description: "Deep dive into Ethereum's smart contract capabilities and their revolutionary potential.",
        image: "/images/ebooks/smart-contracts.jpg",
        color: "pink"
      },
      {
        title: "DAOs, Governance & The Future of Organizations",
        description: "Explore decentralized autonomous organizations and new models of collective decision-making.",
        image: "/images/ebooks/daos.jpg",
        color: "pink"
      },
      {
        title: "Crypto in the Real World: Adoption, Payments, and Case Studies",
        description: "Examine real-world applications and adoption cases of cryptocurrency technology.",
        image: "/images/ebooks/crypto-real-world.jpg",
        color: "pink"
      },
      {
        title: "The Next Crypto Wave: Trends to Watch in Web3 and Beyond",
        description: "Anticipate emerging trends and future developments in the cryptocurrency and blockchain space.",
        image: "/images/ebooks/next-wave.jpg",
        color: "pink"
      }
    ]
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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>Crypto eBooks | Free Educational Resources | 1ewis.com</title>
        <meta name="description" content="Download free cryptocurrency eBooks covering everything from beginner basics to advanced trading strategies and emerging trends." />
      </Head>
      
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 right-1/3 w-1/4 h-1/4 bg-pink-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/40 to-purple-900/40 px-5 py-2.5 rounded-full shadow-lg shadow-blue-900/20">
                <Book className="text-blue-400 w-5 h-5 mr-2" />
                <span className="text-blue-300 font-medium">Free Educational Resources</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg">
                Crypto eBooks Collection
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Comprehensive guides to help you navigate the cryptocurrency ecosystem, from beginner concepts to advanced strategies.
              </motion.p>
              
              <div className="flex flex-wrap justify-center gap-5 mb-16">
                {ebookCategories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-7 py-3.5 rounded-lg transition-all duration-300 font-medium shadow-md ${
                      activeCategory === category.id 
                        ? `bg-${category.color}-600 text-white` 
                        : `bg-gray-800 text-gray-300 hover:bg-gray-700`
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* eBooks Section */}
        <section className="py-24 px-4 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl max-h-6xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-[80px] opacity-70"></div>
          <div className="max-w-6xl mx-auto">
            {ebookCategories.map((category) => (
              <div key={category.id} className={activeCategory === category.id ? 'block' : 'hidden'}>
                <div className="text-center mb-16 relative z-10">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-4 text-${category.color}-400 drop-shadow-sm`}>{category.name}</h2>
                  <p className="text-xl md:text-2xl text-gray-400 font-medium">{category.subtitle}</p>
                  <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-8 rounded-full shadow-sm"></div>
                  <p className="mt-8 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">{category.description}</p>
                </div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
                >
                  {ebooks[category.id].map((ebook, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-xl hover:shadow-${ebook.color}-500/30 hover:translate-y-[-5px] transition-all duration-500 flex flex-col`}
                    >
                      <div className={`h-56 bg-${ebook.color}-900/40 relative overflow-hidden`}>
                        {ebook.image ? (
                          <img
                            src={ebook.image}
                            alt={ebook.title}
                            className="w-full h-full object-cover object-top"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `/images/ebooks/placeholder-${ebook.color}.jpg`;
                              if (e.target.src.includes('placeholder') && e.target.naturalHeight === 0) {
                                e.target.style.display = 'none';
                              }
                            }}
                          />
                        ) : (
                          <div className={`w-full h-full flex items-center justify-center bg-${ebook.color}-900/50`}>
                            <div className="text-center p-4">
                              <Book className={`h-12 w-12 mx-auto mb-2 text-${ebook.color}-400`} />
                              <div className={`text-${ebook.color}-300 font-medium text-sm`}>Cover Coming Soon</div>
                            </div>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-1/3"></div>
                      </div>
                      
                      <div className="p-7 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold mb-4 leading-tight">{ebook.title}</h3>
                        <p className="text-gray-400 mb-7 flex-1 text-sm md:text-base leading-relaxed">{ebook.description}</p>
                        
                        <ButtonLink
                          href="#"
                          className={`bg-${ebook.color}-600 hover:bg-${ebook.color}-700 text-white w-full justify-center`}
                          disabled
                        >
                          <Sparkles className="mr-2 h-5 w-5" />
                          Coming Soon
                        </ButtonLink>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]">
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
                <Sparkles className="text-blue-400 w-5 h-5 mr-2" />
                <span className="text-blue-300 font-medium">Stay Updated</span>
             喧
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Get Notified About New eBooks
              </h2>
              
              <p className="text-lg text-gray-300 mb-8">
                Join our mailing list to receive notifications when we release new eBooks and educational resources.
              </p>
              
              <ButtonLink 
                href="/mailing-list"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg rounded-lg shadow-lg transition-all duration-300"
              >
                <span className="flex items-center justify-center">
                  Join Our Mailing List <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </ButtonLink>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}