import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from '../../../components/Footer';
import { Book, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch guides from API
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.1ewis.com/guides/list');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch guides: ${response.status}`);
        }
        
        const data = await response.json();
        setGuides(data.guides || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>Crypto Guides | 1ewis.com</title>
        <meta name="description" content="Comprehensive guides on cryptocurrency, blockchain, and Web3 technologies." />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <div 
                  key={guide.id} 
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg"
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-cyan-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {guide.category}
                      </span>
                    </div>
                    <img 
                      src={guide.image || "https://s3.1ewis.com/placeholder.webp"} 
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{guide.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{guide.description}</p>
                    <Link 
                      href={`/news/guides/${guide.slug}`}
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Read Guide <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
