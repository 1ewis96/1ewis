import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { Book, ChevronRight, ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample guides data - in a real app, this would come from an API
  const guides = [
    {
      id: 1,
      title: 'Getting Started with Cryptocurrency',
      description: 'Learn the basics of cryptocurrency, blockchain technology, and how to make your first purchase.',
      category: 'Beginner',
      image: '/images/guides/crypto-basics.jpg',
      slug: 'getting-started-with-cryptocurrency',
    },
    {
      id: 2,
      title: 'How to Set Up a Secure Crypto Wallet',
      description: 'A step-by-step guide to setting up and securing your cryptocurrency wallet.',
      category: 'Security',
      image: '/images/guides/secure-wallet.jpg',
      slug: 'how-to-set-up-secure-crypto-wallet',
    },
    {
      id: 3,
      title: 'Understanding DeFi Platforms',
      description: 'Explore decentralized finance platforms and how they\'re revolutionizing traditional financial services.',
      category: 'DeFi',
      image: '/images/guides/defi-platforms.jpg',
      slug: 'understanding-defi-platforms',
    },
    {
      id: 4,
      title: 'NFT Collecting for Beginners',
      description: 'Everything you need to know about collecting, creating, and trading NFTs.',
      category: 'NFTs',
      image: '/images/guides/nft-collecting.jpg',
      slug: 'nft-collecting-for-beginners',
    },
    {
      id: 5,
      title: 'Crypto Tax Reporting Guide',
      description: 'Learn how to properly report your cryptocurrency transactions for tax purposes.',
      category: 'Taxes',
      image: '/images/guides/crypto-taxes.jpg',
      slug: 'crypto-tax-reporting-guide',
    },
    {
      id: 6,
      title: 'Web3 Development Fundamentals',
      description: 'An introduction to Web3 development concepts and tools for building decentralized applications.',
      category: 'Development',
      image: '/images/guides/web3-development.jpg',
      slug: 'web3-development-fundamentals',
    },
  ];

  // Filter guides based on search query
  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Categories for filtering
  const categories = [
    'All', 'Beginner', 'Security', 'DeFi', 'NFTs', 'Taxes', 'Development'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>Crypto Guides | 1ewis.com</title>
        <meta name="description" content="Comprehensive guides on cryptocurrency, blockchain, and Web3 technologies." />
      </Head>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background animation elements */}
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-flex items-center mb-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-4 py-2 rounded-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Book className="text-cyan-500 w-5 h-5 mr-2" />
                </motion.div>
                <span className="text-cyan-300 font-medium">Educational Resources</span>
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Crypto & Blockchain Guides
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Comprehensive resources to help you navigate the world of cryptocurrency, blockchain, and Web3 technologies.
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="relative max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSearchQuery(category === 'All' ? '' : category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    (category === 'All' && searchQuery === '') || 
                    (category !== 'All' && searchQuery.toLowerCase() === category.toLowerCase())
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Guides Grid */}
          {filteredGuides.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {filteredGuides.map((guide) => (
                <motion.div
                  key={guide.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-cyan-900/20 transition-all"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-cyan-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {guide.category}
                      </span>
                    </div>
                    <img 
                      src={guide.image} 
                      alt={guide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide";
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{guide.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{guide.description}</p>
                    <a 
                      href={`/news/guides/${guide.slug}`} 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Read Guide <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 text-lg">No guides found matching your search.</p>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
