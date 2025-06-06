import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Search, Plus, Trash2, Edit, TrendingUp, Check, CheckCircle, ToggleLeft, ToggleRight, X } from 'lucide-react';
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
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [resultsLimit, setResultsLimit] = useState(10); // Default to 10 results
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newVolume, setNewVolume] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    fetchKeywords();
  }, []);
  
  // Handle checkbox selection
  const handleSelectKeyword = (keywordId) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keywordId)) {
        return prev.filter(id => id !== keywordId);
      } else {
        return [...prev, keywordId];
      }
    });
  };
  
  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedKeywords([]);
    } else {
      const allIds = filteredKeywords.map(keyword => keyword.PK || keyword.keyword);
      setSelectedKeywords(allIds);
    }
    setSelectAll(!selectAll);
  };
  
  // Handle limit change
  const handleLimitChange = (newLimit) => {
    setResultsLimit(newLimit);
    // Refetch keywords with new limit setting
    setKeywords([]);
    fetchKeywords(null, false, newLimit);
  };
  
  // Handle approve selected keywords
  const handleApproveSelected = async () => {
    if (selectedKeywords.length === 0) return;
    
    try {
      setIsLoading(true);
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Prepare the request body with the selected keyword PKs
      const requestBody = {
        keys: selectedKeywords
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/approve', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Reset selection and refresh the list
      setSelectedKeywords([]);
      setSelectAll(false);
      setError(null);
      
      // Refresh the keyword list
      fetchKeywords();
    } catch (err) {
      console.error('Error approving keywords:', err);
      setError(`Failed to approve keywords: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete selected keywords
  const handleDeleteSelected = async () => {
    if (selectedKeywords.length === 0) return;
    
    try {
      setIsLoading(true);
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Prepare the request body with the selected keyword PKs
      const requestBody = {
        keys: selectedKeywords
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/delete', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Reset selection and refresh the list
      setSelectedKeywords([]);
      setSelectAll(false);
      setError(null);
      
      // Refresh the keyword list
      fetchKeywords();
    } catch (err) {
      console.error('Error deleting keywords:', err);
      setError(`Failed to delete keywords: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle adding a new keyword
  const handleAddKeyword = async (e) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    
    setIsSubmitting(true);
    try {
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Prepare the request body for the new API endpoint
      const requestBody = {
        keyword: newKeyword.trim(),
        searchVolume: newVolume ? parseInt(newVolume) : 0,
        competition: newDifficulty || 'Medium',
        approved: 0 // Default to not approved
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Reset form and close modal
      setNewKeyword('');
      setNewVolume('');
      setNewDifficulty('');
      setIsModalOpen(false);
      
      // Refresh the keyword list
      fetchKeywords();
    } catch (err) {
      console.error('Error adding keyword:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const fetchKeywords = async (pageKey = null, loadAll = false, limit = null) => {
    try {
      setIsLoading(true);
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }

      let url = 'https://api.1ewis.com/admin/seo';
      let params = [];
      
      if (pageKey) {
        params.push(`lastKey=${encodeURIComponent(pageKey)}`);
      }
      
      // Use the provided limit, or the state limit, or default to 10
      const requestLimit = limit || resultsLimit || 10;
      params.push(`limit=${requestLimit}`);
      
      if (params.length > 0) {
        url += '?' + params.join('&');
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
      
      // If we're loading a large number of results and there are more pages, fetch them automatically
      if (requestLimit >= 500 && data.nextPageKey) {
        fetchKeywords(data.nextPageKey, true, requestLimit);
        return; // Don't update loading state yet
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
      
      {/* Add Keyword Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-gray-900 border border-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center border-b border-gray-800 p-4">
                <h3 className="text-xl font-semibold text-white">Add New Keyword</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleAddKeyword} className="p-4 space-y-4">
                <div>
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-400 mb-1">Keyword</label>
                  <input
                    type="text"
                    id="keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter keyword..."
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="volume" className="block text-sm font-medium text-gray-400 mb-1">Search Volume (optional)</label>
                  <input
                    type="number"
                    id="volume"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Monthly search volume"
                  />
                </div>
                
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-400 mb-1">Difficulty (optional)</label>
                  <select
                    id="difficulty"
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select difficulty...</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !newKeyword.trim()}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 text-white rounded-md flex items-center justify-center transition-colors"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Add Keyword'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Keyword
              </button>
              {selectedKeywords.length > 0 && (
                <>
                  <button 
                    onClick={handleApproveSelected}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center justify-center transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Approve Selected ({selectedKeywords.length})
                  </button>
                  <button 
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Delete Selected ({selectedKeywords.length})
                  </button>
                </>
              )}
              <div className="relative">
                <label htmlFor="resultsLimit" className="sr-only">Results per page</label>
                <select
                  id="resultsLimit"
                  value={resultsLimit}
                  onChange={(e) => handleLimitChange(Number(e.target.value))}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-colors cursor-pointer"
                >
                  <option value="10">10 Results</option>
                  <option value="25">25 Results</option>
                  <option value="50">50 Results</option>
                  <option value="100">100 Results</option>
                  <option value="250">250 Results</option>
                  <option value="500">500 Results</option>
                  <option value="1000">1000 Results</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path>
                  </svg>
                </div>
              </div>
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
                      <div className="flex items-center">
                        <div 
                          onClick={handleSelectAll}
                          className={`w-5 h-5 rounded border ${selectAll ? 'bg-purple-600 border-purple-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                        >
                          {selectAll && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Keyword
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Volume
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {isLoading && keywords.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                          <span className="text-gray-400">Loading keywords...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-red-400">
                        Error loading keywords: {error}
                      </td>
                    </tr>
                  ) : filteredKeywords.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No keywords match your search.' : 'No keywords found. Add your first keyword to start tracking.'}
                      </td>
                    </tr>
                  ) : (
                    filteredKeywords.map((keyword, index) => (
                      <tr key={keyword.PK || index} className="hover:bg-black/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              onClick={() => handleSelectKeyword(keyword.PK || keyword.keyword)}
                              className={`w-5 h-5 rounded border ${selectedKeywords.includes(keyword.PK || keyword.keyword) ? 'bg-purple-600 border-purple-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                            >
                              {selectedKeywords.includes(keyword.PK || keyword.keyword) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="text-sm font-medium text-white">{keyword.keyword || 'Unknown Keyword'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{keyword.searchVolume && keyword.searchVolume > 0 ? keyword.searchVolume.toLocaleString() : 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{keyword.competition || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {keyword.approved === 1 ? (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-900/30 text-green-400">Approved</span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-900/30 text-yellow-400">Pending</span>
                          )}
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
