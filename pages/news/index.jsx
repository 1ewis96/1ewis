import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { fetchArticles, formatPublishedDate, extractArticleId } from '../../utils/newsApi';

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  // Fetch articles on component mount
  useEffect(() => {
    async function loadInitialArticles() {
      try {
        setLoading(true);
        const data = await fetchArticles({ limit: 6 });
        setArticles(data.articles || []);
        setNextToken(data.nextToken);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadInitialArticles();
  }, []);

  // Fetch categories from API
  useEffect(() => {
    async function fetchCategories() {
      try {
        setCategoriesLoading(true);
        const response = await fetch('https://api.1ewis.com/news/categories');
        
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`);
        }
        
        const data = await response.json();
        setCategories(data.categories || []);
        setCategoriesError(null);
      } catch (err) {
        console.error('Error loading categories:', err);
        setCategoriesError('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Load more articles when requested
  const loadMoreArticles = async () => {
    if (!nextToken || loadingMore) return;
    
    try {
      setLoadingMore(true);
      const data = await fetchArticles({ limit: 6, nextToken });
      setArticles(prev => [...prev, ...(data.articles || [])]);
      setNextToken(data.nextToken);
    } catch (err) {
      console.error('Error loading more articles:', err);
      setError('Failed to load more articles. Please try again.');
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Crypto News & Market Updates | 1ewis.com</title>
        <meta name="description" content="Stay updated with the latest cryptocurrency news, market trends, and industry developments. Get timely insights on Bitcoin, Ethereum, and the broader crypto ecosystem." />
        <meta name="keywords" content="crypto news, bitcoin news, ethereum news, cryptocurrency market updates, blockchain news" />
        <link rel="canonical" href="https://1ewis.com/news" />
      </Head>
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400">
              Crypto News & Updates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay informed with the latest developments in the cryptocurrency world. 
              From market trends to regulatory updates, we've got you covered.
            </p>
          </motion.div>
        </section>
        
        {/* News Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">Latest News</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => {
                  const articleId = extractArticleId(article.id);
                  const primaryTag = article.tags && article.tags.length > 0 ? article.tags[0] : 'News';
                  const formattedDate = formatPublishedDate(article.publishedAt);
                  
                  return (
                    <motion.div
                      key={article.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-green-500/30 transition-all duration-300"
                    >
                      <div className="h-48 bg-gray-800 relative">
                        {article.thumbnailUrl ? (
                          <img 
                            src={article.thumbnailUrl} 
                            alt={article.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                            [Image Placeholder]
                          </div>
                        )}
                        {article.isFeatured && (
                          <div className="absolute top-2 right-2 bg-yellow-600/80 text-white text-xs font-bold px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-900/30 text-green-400">
                            {primaryTag}
                          </span>
                          <span className="text-xs text-gray-400">{formattedDate}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                        <p className="text-gray-400 mb-4">{article.summary}</p>
                        <div className="flex justify-between items-center">
                          <Link href={`/news/article/${articleId}`}>
                            <span className="text-green-400 font-medium hover:text-green-300 transition-colors cursor-pointer">
                              Read more →
                            </span>
                          </Link>
                          <span className="text-xs text-gray-500">{article.readTime}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {nextToken && (
                <div className="mt-10 text-center">
                  <button
                    onClick={loadMoreArticles}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingMore ? (
                      <span className="flex items-center">
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                        Loading...
                      </span>
                    ) : (
                      'Load More Articles'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-green-900/20 to-teal-900/20 rounded-xl p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to receive the latest crypto news directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium rounded-lg transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
        
        {/* Categories Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">News Categories</h2>
          
          {categoriesLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : categoriesError ? (
            <div className="text-center py-8">
              <p className="text-red-400 mb-2">{categoriesError}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category, index) => (
                <motion.div
                  key={category.categoryName}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-opacity-70 hover:bg-gray-800/30 transition-all duration-300 cursor-pointer"
                  style={{
                    borderColor: category.colorHex,
                    borderLeftWidth: '4px'
                  }}
                >
                  <Link href={`/news?category=${encodeURIComponent(category.categoryName)}`}>
                    <h3 className="text-lg font-medium flex items-center">
                      <span 
                        className="inline-block w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: category.colorHex }}
                      ></span>
                      {category.categoryName}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
