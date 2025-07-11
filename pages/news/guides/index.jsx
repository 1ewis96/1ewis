import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { Book, ArrowRight, Search, Filter, X } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for pagination
  const [nextPageToken, setNextPageToken] = useState(null);
  const [currentPageToken, setCurrentPageToken] = useState(null);
  const [pageHistory, setPageHistory] = useState([]);
  const [hasMorePages, setHasMorePages] = useState(false);
  const [limit, setLimit] = useState(10);
  
  // Fetch guides from API with pagination
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        
        // Use the regular listing endpoint
        let apiUrl = 'https://api.1ewis.com/guides/list?';
        const params = new URLSearchParams();
        
        // Add pagination token if available
        if (currentPageToken) {
          params.append('startKey', currentPageToken);
        }
        
        // Add limit
        params.append('limit', limit.toString());
        
        // Append params to URL
        apiUrl += params.toString();
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch guides: ${response.status}`);
        }
        
        const data = await response.json();
        setGuides(data.guides || []);
        
        // Handle pagination
        setNextPageToken(data.nextPageToken || null);
        setHasMorePages(!!data.nextPageToken);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, [currentPageToken, limit]);
  
  // Function to handle next page
  const goToNextPage = () => {
    if (nextPageToken) {
      // Add current token to history for back navigation
      setPageHistory([...pageHistory, currentPageToken]);
      setCurrentPageToken(nextPageToken);
    }
  };
  
  // Function to handle previous page
  const goToPreviousPage = () => {
    if (pageHistory.length > 0) {
      // Get the last token from history
      const newHistory = [...pageHistory];
      const previousToken = newHistory.pop();
      
      setPageHistory(newHistory);
      setCurrentPageToken(previousToken);
    } else {
      // If no history, go to first page
      setCurrentPageToken(null);
    }
  };
  
  // No category filters anymore

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>Crypto & Blockchain Guides | 1ewis</title>
        <meta name="description" content="Comprehensive guides on cryptocurrency, blockchain technology, and Web3 concepts." />
        <style jsx global>{`
          .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;  /* Chrome, Safari and Opera */
          }
        `}</style>
      </Head>

      <main className="flex-1 relative">
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
              >
                <Book className="text-cyan-500 w-5 h-5 mr-2" />
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

        {/* Search Section - Non-functional */}
        <section className="bg-gradient-to-r from-gray-900 to-gray-950 border-y border-gray-800/70 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="guides">
            <motion.div 
              className="mb-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Find Your Guide</h2>
              <p className="text-gray-400">Search our collection of expert-written guides on crypto and blockchain</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col md:flex-row md:items-center gap-4 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Search Bar - Non-functional */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent shadow-sm transition-all duration-300"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : guides.length > 0 ? (
            <>
              
              {/* Guides grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide) => (
                <Link href={`/news/guides/${guide.slug}`} key={guide.id}>
                  <motion.div 
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg group hover:shadow-cyan-900/20 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="h-52 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
                      <div className="absolute top-4 left-4 z-20">
                        <span 
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-gray-300 border border-gray-700/50"
                        >
                          {guide.category ? guide.category.charAt(0).toUpperCase() + guide.category.slice(1) : 'Guide'}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4 z-20">
                        <span className="bg-black/50 backdrop-blur-sm text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-700/50">
                          {guide.readTime ? `${guide.readTime} mins` : '5 min read'}
                        </span>
                      </div>
                      <img 
                        src={guide.image || "https://s3.1ewis.com/placeholder.webp"} 
                        alt={guide.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                    </div>
                    
                    <div className="p-6 relative">
                      {/* Decorative element */}
                      <div className="absolute -top-3 right-6 w-6 h-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-sm"></div>
                      
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-100 transition-colors duration-300">{guide.title}</h3>
                      <p className="text-gray-300 mb-5 line-clamp-2">{guide.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium group-hover:translate-x-1 transition-transform duration-300">
                          Read Guide <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                        
                        <div className="text-xs text-gray-500">
                          {guide.date || 'June 2025'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
              </div>
              
              {/* Pagination Controls */}
              <div className="mt-12 flex justify-center items-center space-x-4">
                <button
                  onClick={goToPreviousPage}
                  disabled={pageHistory.length === 0 && !currentPageToken}
                  className={`px-4 py-2 rounded-lg flex items-center ${pageHistory.length === 0 && !currentPageToken ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Previous
                </button>
                
                <div className="text-gray-400">
                  {currentPageToken ? 'Page ' + (pageHistory.length + 1) : 'Page 1'}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={!hasMorePages}
                  className={`px-4 py-2 rounded-lg flex items-center ${!hasMorePages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors`}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Results per page selector */}
              <div className="mt-4 flex justify-center items-center">
                <label htmlFor="limit-select" className="text-gray-400 mr-2">Results per page:</label>
                <select
                  id="limit-select"
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setCurrentPageToken(null);
                    setPageHistory([]);
                  }}
                  className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No guides found.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
