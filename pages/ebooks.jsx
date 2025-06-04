import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, ButtonLink } from "../components/ui/button";
import { Book, ArrowRight, Download, Star, Sparkles, CheckCircle, BookOpen, ShoppingCart } from "lucide-react";
import Footer from '../components/Footer';
import Head from 'next/head';
import Link from 'next/link';
import ebooksData from '../data/ebooks.json';

export default function EbooksPage() {
  const [activeCategory, setActiveCategory] = useState('beginner');
  const [ebookCategories, setEbookCategories] = useState([]);
  const [ebooks, setEbooks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load data from the JSON file
    setEbookCategories(ebooksData.categories);
    setEbooks(ebooksData.ebooks);
    setIsLoading(false);
  }, []);
  
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
        <title>Crypto eBooks 2025 | Beginner to Advanced Trading Guides | 1ewis.com</title>
        <meta name="description" content="Cryptocurrency eBooks (2025) covering beginner basics, investing strategies, DeFi, NFTs, and advanced trading techniques. Start your crypto journey today." />
        <meta name="keywords" content="crypto for beginners, crypto educational resources, crypto ebooks, crypto investing guide, defi explained, how to start investing in crypto" />
        <link rel="canonical" href="https://1ewis.com/ebooks" />
        <meta property="og:title" content="Crypto eBooks 2025 | Beginner to Advanced Trading Guides" />
        <meta property="og:description" content="Cryptocurrency eBooks covering beginner basics, investing strategies, DeFi, NFTs, and advanced trading techniques." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/ebooks" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto eBooks 2025 | Learning Resources" />
        <meta name="twitter:description" content="Cryptocurrency eBooks covering beginner basics to advanced trading strategies." />
        
        {/* Schema.org structured data for educational content */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Free Cryptocurrency eBooks Collection",
            "description": "Comprehensive guides to help you navigate the cryptocurrency ecosystem, from beginner concepts to advanced strategies.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "educationalUse": "Self-learning resource",
            "audience": {
              "@type": "Audience",
              "audienceType": "Cryptocurrency enthusiasts and investors"
            }
          })}
        </script>
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
                <span className="text-blue-300 font-medium">Educational Resources</span>
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
            {isLoading ? (
              <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <span className="ml-3 text-lg text-gray-300">Loading ebooks...</span>
              </div>
            ) : ebookCategories.map((category) => (
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
                              e.target.style.display = 'none';
                              const parent = e.target.parentNode;
                              if (parent && !parent.querySelector('.fallback-cover')) {
                                const fallback = document.createElement('div');
                                fallback.className = `w-full h-full flex items-center justify-center bg-${ebook.color}-900/50 fallback-cover`;
                                fallback.innerHTML = `
                                  <div class="text-center p-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 mx-auto mb-2 text-${ebook.color}-400">
                                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                    </svg>
                                    <div class="text-${ebook.color}-300 font-medium text-sm">Cover Coming Soon</div>
                                  </div>
                                `;
                                parent.appendChild(fallback);
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
                        
                        {ebook.amazonUrl ? (
                          <ButtonLink
                            href={ebook.amazonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`bg-${ebook.color}-600 hover:bg-${ebook.color}-700 text-white w-full justify-center`}
                          >
                            <ShoppingCart className="mr-2 h-5 w-5" />
                            Buy on Amazon {ebook.price && `(${ebook.price})`}
                          </ButtonLink>
                        ) : ebook.downloadUrl ? (
                          <ButtonLink
                            href={ebook.downloadUrl}
                            className={`bg-${ebook.color}-600 hover:bg-${ebook.color}-700 text-white w-full justify-center`}
                          >
                            <Download className="mr-2 h-5 w-5" />
                            Download eBook
                          </ButtonLink>
                        ) : (
                          <ButtonLink
                            href="#"
                            className={`bg-${ebook.color}-600/50 hover:bg-${ebook.color}-700/50 text-white w-full justify-center cursor-not-allowed`}
                            disabled
                          >
                            <Sparkles className="mr-2 h-5 w-5" />
                            Coming Soon
                          </ButtonLink>
                        )}
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