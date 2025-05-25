import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Filter } from 'lucide-react';

const newsItems = [
  {
    title: "Bitcoin Surges Past $65,000 as Institutional Adoption Grows",
    source: "CryptoNews",
    url: "#",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "bitcoin",
    timeAgo: "2 hours ago"
  },
  {
    title: "Binance Launches $100M Innovation Fund for Web3 Startups",
    source: "CoinDesk",
    url: "#",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "exchange",
    timeAgo: "5 hours ago"
  },
  {
    title: "Ethereum Completes Major Network Upgrade, Gas Fees Drop 30%",
    source: "Decrypt",
    url: "#",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "ethereum",
    timeAgo: "1 day ago"
  },
  {
    title: "Bybit Expands Futures Trading Options with 25 New Pairs",
    source: "CryptoBriefing",
    url: "#",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "exchange",
    timeAgo: "8 hours ago"
  },
  {
    title: "Kraken Secures Regulatory Approval in European Markets",
    source: "The Block",
    url: "#",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "exchange",
    timeAgo: "12 hours ago"
  },
  {
    title: "OKX Introduces Zero-Fee Trading for New Users",
    source: "CoinTelegraph",
    url: "#",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "exchange",
    timeAgo: "1 day ago"
  },
  {
    title: "Solana DeFi Ecosystem Surpasses $10B in Total Value Locked",
    source: "DeFi Pulse",
    url: "#",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "defi",
    timeAgo: "3 days ago"
  },
  {
    title: "NFT Market Shows Signs of Recovery with Trading Volume Up 40%",
    source: "NFT Now",
    url: "#",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    category: "nft",
    timeAgo: "2 days ago"
  }
];

const categories = [
  { id: 'all', label: 'All News' },
  { id: 'bitcoin', label: 'Bitcoin' },
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'exchange', label: 'Exchanges' },
  { id: 'defi', label: 'DeFi' },
  { id: 'nft', label: 'NFTs' }
];

export default function CryptoNewsFeed() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  
  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);
  
  const displayedNews = expanded ? filteredNews : filteredNews.slice(0, 4);
  
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Latest Crypto News</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stay updated with the latest developments in the crypto world
        </p>
      </div>
      
      <div className="flex items-center justify-center mb-8 overflow-x-auto pb-2">
        <div className="flex space-x-2">
          {categories.map(category => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </div>
      </div>
      
      <motion.div 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        key={activeCategory} // Re-render animation when category changes
      >
        {displayedNews.map((news, index) => (
          <motion.a
            key={index}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            variants={itemVariants}
          >
            <div className="relative h-40 overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
              <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                {categories.find(c => c.id === news.category)?.label || news.category}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                {news.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{news.source}</span>
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{news.timeAgo}</span>
                </div>
              </div>
            </div>
            
            <div className="px-4 pb-4 flex items-center text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="mr-1">Read more</span>
              <ExternalLink size={14} />
            </div>
          </motion.a>
        ))}
      </motion.div>
      
      {filteredNews.length > 4 && (
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpanded(!expanded)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-full inline-flex items-center"
          >
            {expanded ? 'Show Less' : 'Show More'}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
