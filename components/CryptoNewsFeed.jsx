import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, Filter, AlertTriangle } from 'lucide-react';
import Image from 'next/image';

// Categories for filtering
const categories = [
  { id: 'all', label: 'All News' },
  { id: 'bitcoin', label: 'Bitcoin' },
  { id: 'ethereum', label: 'Ethereum' },
  { id: 'exchange', label: 'Exchanges' },
  { id: 'defi', label: 'DeFi' },
  { id: 'nft', label: 'NFTs' }
];

// Category to CryptoPanic currency mapping
const categoryToCurrency = {
  'bitcoin': 'BTC',
  'ethereum': 'ETH',
  'exchange': '',
  'defi': '',
  'nft': ''
};

export default function CryptoNewsFeed() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expanded, setExpanded] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch news from CryptoPanic API
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Construct the API URL based on the active category
        let apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=f022578b04fe8c9b65daa34a323e0370e5332a60&public=true&kind=news';
        
        // Add currency filter if category is not 'all'
        if (activeCategory !== 'all' && categoryToCurrency[activeCategory]) {
          apiUrl += `&currencies=${categoryToCurrency[activeCategory]}`;
        }
        
        // Add filter based on category
        if (activeCategory === 'defi') {
          apiUrl += '&filter=defi';
        } else if (activeCategory === 'nft') {
          apiUrl += '&filter=nft';
        } else if (activeCategory === 'exchange') {
          apiUrl += '&filter=exchange';
        }
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();
        setNews(data.results || []);
      } catch (err) {
        console.error('Error fetching crypto news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [activeCategory]);
  
  // Format the relative time (e.g., "2 hours ago")
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now - past;
    
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };
  
  // Get display news items based on expanded state
  const displayedNews = expanded ? news : news.slice(0, 4);
  
  // Animation variants
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
  
  // Get category label for a news item
  const getCategoryLabel = (newsItem) => {
    // Extract domain from source URL
    const domain = new URL(newsItem.url).hostname.replace('www.', '');
    
    // Check if currencies array exists and has items
    if (newsItem.currencies && newsItem.currencies.length > 0) {
      return newsItem.currencies[0].code;
    }
    
    // Check for specific keywords in title
    const title = newsItem.title.toLowerCase();
    if (title.includes('bitcoin') || title.includes('btc')) return 'Bitcoin';
    if (title.includes('ethereum') || title.includes('eth')) return 'Ethereum';
    if (title.includes('exchange') || title.includes('trading')) return 'Exchanges';
    if (title.includes('defi') || title.includes('yield') || title.includes('lending')) return 'DeFi';
    if (title.includes('nft') || title.includes('collectible')) return 'NFTs';
    
    return domain;
  };
  
  // Get placeholder image for news without images
  const getPlaceholderImage = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('bitcoin')) {
      return 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    } else if (categoryLower.includes('ethereum')) {
      return 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    } else if (categoryLower.includes('exchange')) {
      return 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    } else if (categoryLower.includes('defi')) {
      return 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    } else if (categoryLower.includes('nft')) {
      return 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
    }
    return 'https://images.unsplash.com/photo-1621504450181-5fdb1eaeb4c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';
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
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <AlertTriangle size={48} className="mx-auto text-yellow-500 mb-4" />
          <p className="text-gray-300">{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-300">No news available for this category. Try another one.</p>
        </div>
      ) : (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          key={activeCategory} // Re-render animation when category changes
        >
          {displayedNews.map((newsItem, index) => {
            const category = getCategoryLabel(newsItem);
            const imageUrl = newsItem.metadata?.image?.url || getPlaceholderImage(category);
            
            return (
              <motion.a
                key={newsItem.id}
                href={newsItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                variants={itemVariants}
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={imageUrl}
                    alt={newsItem.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = getPlaceholderImage(category);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {newsItem.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{new URL(newsItem.url).hostname.replace('www.', '')}</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{formatTimeAgo(newsItem.published_at)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 pb-4 flex items-center text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="mr-1">Read more</span>
                  <ExternalLink size={14} />
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      )}
      
      {!loading && !error && news.length > 4 && (
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
