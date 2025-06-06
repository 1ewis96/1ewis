import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Search, Plus, Download, Upload, Trash2, Edit, TrendingUp } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

function ManageKeywords() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [keywords, setKeywords] = useState([]);
  const [error, setError] = useState(null);
  const [nextPageKey, setNextPageKey] = useState(null);
  const [filteredKeywords, setFilteredKeywords] = useState([]);
  
  useEffect(() => {
    fetchKeywords();
  }, []);

  useEffect(() => {
    if (keywords.length > 0) {
      setFilteredKeywords(
        keywords.filter(keyword =>
          keyword && keyword.keyword && 
          typeof keyword.keyword === 'string' &&
          keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, keywords]);

  const fetchKeywords = async (pageKey = null) => {
    try {
      setIsLoading(true);
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }

      let url = 'https://api.1ewis.com/admin/seo';
      if (pageKey) {
        url += `?lastKey=${encodeURIComponent(pageKey)}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (pageKey) {
        setKeywords(prevKeywords => [...prevKeywords, ...data.keywords]);
      } else {
        setKeywords(data.keywords);
      }
      
      setNextPageKey(data.nextPageKey || null);
      setError(null);
    } catch (err) {
      console.error('Error fetching keywords:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreKeywords = () => {
    if (nextPageKey) {
      fetchKeywords(nextPageKey);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <>
      <Head>
        <title>Keyword Planner | Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Keyword Planner
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Track and optimize keywords for SEO
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                Add Keyword
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors">
                <Upload className="w-5 h-5 mr-2" />
                Import
              </button>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
            </motion.div>
          </div>
          
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
                placeholder="Search keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
          
          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Keyword
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Volume
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Current Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Trend
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {isLoading && keywords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                          <span className="text-gray-400">Loading keywords...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-red-400">
                        Error loading keywords: {error}
                      </td>
                    </tr>
                  ) : filteredKeywords.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No keywords match your search.' : 'No keywords found. Add your first keyword to start tracking.'}
                      </td>
                    </tr>
                  ) : (
                    filteredKeywords.map((keyword, index) => (
                      <tr key={keyword.PK || index} className="hover:bg-black/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{keyword.keyword || 'Unknown Keyword'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{keyword.searchVolume && keyword.searchVolume > 0 ? keyword.searchVolume.toLocaleString() : 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{keyword.competition || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">Not ranked</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-gray-400" />
                            <span className="ml-1 text-sm text-gray-400">-</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          {nextPageKey && (
            <motion.div
              className="mt-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={loadMoreKeywords}
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 text-white rounded-md flex items-center justify-center transition-colors"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  'Load More Keywords'
                )}
              </button>
            </motion.div>
          )}
          
          <motion.div
            className="mt-8 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>
              Use this tool to track important keywords for your website's SEO performance.
              Add keywords manually or import them from a CSV file.
            </p>
            <p className="mt-2">
              Total keywords: {keywords.length}
              {nextPageKey && ' (more available)'}
            </p>
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(ManageKeywords);
