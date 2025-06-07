import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { BrainCircuit, AlertTriangle, CheckCircle, Loader2, Search, Tag, BarChart3 } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

function GenerateQuestionsPage() {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [keywordsLoading, setKeywordsLoading] = useState(false);
  const [requestQueue, setRequestQueue] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);
  
  // Fetch queue data from API
  const fetchQueueData = async () => {
    try {
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      const response = await fetch('https://api.1ewis.com/admin/ai/queue?function=generate_questions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.queue || !Array.isArray(data.queue)) {
        throw new Error('Invalid response format');
      }
      
      // Process queue items
      const processing = [];
      const completed = [];
      
      data.queue.forEach(item => {
        // Transform API response to match our component's data structure
        const queueItem = {
          id: item.id,
          status: item.status,
          keywords: item.tags || [],
          count: item.count,
          timestamp: item.createdAt,
          questions: item.questions || [],
          json: item.json || {} // Include the json field from the API response
        };
        
        // Sort into processing or completed based on status
        if (item.status === 'pending' || item.status === 'started') {
          processing.push(queueItem);
        } else if (item.status === 'completed' || item.status === 'failed') {
          completed.push(queueItem);
        }
      });
      
      // Sort by timestamp (newest first)
      processing.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      completed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      setRequestQueue(processing);
      setCompletedRequests(completed);
      
    } catch (error) {
      console.error('Error fetching queue data:', error);
      // If there's an error, use empty arrays rather than showing stale data
      setRequestQueue([]);
      setCompletedRequests([]);
    }
  };
  
  // Fetch queue data on component mount
  useEffect(() => {
    fetchQueueData();
    
    // Set up polling interval (every 30 seconds)
    const intervalId = setInterval(fetchQueueData, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  // Fetch approved keywords from the API
  useEffect(() => {
    const fetchKeywords = async () => {
      setKeywordsLoading(true);
      try {
        const { apiKey } = getStoredApiKey();
        
        if (!apiKey) {
          throw new Error('No API key available');
        }
        
        const response = await fetch('https://api.1ewis.com/admin/seo/approved/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform the API response to match our expected format
        const formattedKeywords = data.keywords.map((item, index) => ({
          id: index + 1,
          name: item.keyword,
          category: item.competition || 'Unknown',
          searchVolume: item.searchVolume || 0,
          createdAt: item.createdAt,
          lastUsed: item.lastUsed || null
        }));
        
        setKeywords(formattedKeywords);
        setKeywordsLoading(false);
      } catch (err) {
        console.error('Error fetching keywords:', err);
        setKeywordsLoading(false);
      }
    };
    
    fetchKeywords();
  }, []);
  
  const toggleKeywordSelection = (keywordId) => {
    setSelectedKeywords(prev => {
      if (prev.includes(keywordId)) {
        return prev.filter(id => id !== keywordId);
      } else {
        return [...prev, keywordId];
      }
    });
  };
  
  const filteredKeywords = keywords.filter(keyword => 
    keyword.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    (keyword.category && keyword.category.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedKeywords.length === 0) {
      setError('Please select at least one keyword');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Get the selected keyword names for the API request
      const selectedKeywordNames = selectedKeywords.map(id => {
        const keyword = keywords.find(k => k.id === id);
        return keyword ? keyword.name : null;
      }).filter(Boolean);
      
      // Create a unique request ID
      const requestId = Date.now().toString();
      
      // Send request to the queue API endpoint
      const response = await fetch('https://api.1ewis.com/admin/ai/queue', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          function: "generate_questions",
          tags: selectedKeywordNames,
          count: parseInt(count)
        })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setSuccess(true);
      
      // Clear selections after successful submission
      setSelectedKeywords([]);
      
      // Fetch the updated queue data to reflect the new request
      await fetchQueueData();
      
    } catch (err) {
      setError(err.message || 'Failed to generate questions');
      
      // Fetch the latest queue data to reflect any error status
      await fetchQueueData();
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generate Questions | Admin | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          {success && (
            <motion.div 
              className="bg-green-900/30 border border-green-500/50 rounded-md p-4 mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-green-400 font-medium">Success</h3>
                  <p className="text-green-300/80 text-sm">Your request has been added to the queue.</p>
                </div>
              </div>
            </motion.div>
          )}
          <div className="mb-8 flex items-center">
            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 mr-4">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Generate Questions
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Use AI to generate relevant Q&A questions for your platform
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Question Generator Form */}
            <motion.div 
              className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Question Generator</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="count" className="block text-sm font-medium text-gray-300 mb-2">
                    Number of Questions
                  </label>
                  <select
                    id="count"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="3">3 questions</option>
                    <option value="5">5 questions</option>
                    <option value="10">10 questions</option>
                    <option value="15">15 questions</option>
                    <option value="20">20 questions</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-md font-medium flex items-center ${
                      loading 
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } transition-colors duration-300`}
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {loading ? 'Generating...' : 'Generate Questions'}
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Keywords Selection Table */}
            <motion.div
              className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Tag className="w-5 h-5 mr-2 text-blue-400" />
                Keywords Selection
              </h2>
              
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search keywords..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="overflow-y-auto max-h-[300px] custom-scrollbar pr-1">
                {keywordsLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                    <span className="ml-2 text-gray-400">Loading keywords...</span>
                  </div>
                ) : filteredKeywords.length === 0 ? (
                  <div className="text-center py-6 border border-dashed border-gray-800 rounded-lg">
                    <p className="text-gray-400">No keywords found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {filteredKeywords.map((keyword) => (
                      <div 
                        key={keyword.id}
                        onClick={() => toggleKeywordSelection(keyword.id)}
                        className={`flex items-center justify-between py-2 px-3 cursor-pointer hover:bg-gray-900/50 rounded-md transition-colors ${selectedKeywords.includes(keyword.id) ? 'bg-blue-900/20' : ''}`}
                      >
                        <div className="flex items-center">
                          <div 
                            className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${selectedKeywords.includes(keyword.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`}
                          >
                            {selectedKeywords.includes(keyword.id) && (
                              <CheckCircle className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="text-white">{keyword.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {keyword.lastUsed && (
                            <span className="text-xs px-2 py-1 bg-gray-800 text-gray-300 rounded flex items-center">
                              {new Date(keyword.lastUsed).toLocaleDateString()}
                            </span>
                          )}
                          {keyword.searchVolume > 0 && (
                            <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-300 rounded flex items-center">
                              <BarChart3 className="w-3 h-3 mr-1" />
                              {keyword.searchVolume}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded ${keyword.category === 'Low' ? 'bg-green-900/30 text-green-300' : keyword.category === 'Medium' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-red-900/30 text-red-300'}`}>
                            {keyword.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {selectedKeywords.length} keyword{selectedKeywords.length !== 1 ? 's' : ''} selected
                </span>
                {selectedKeywords.length > 0 && (
                  <button
                    onClick={() => setSelectedKeywords([])}
                    className="text-xs px-2 py-1 text-gray-400 hover:text-white transition-colors"
                  >
                    Clear selection
                  </button>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Queue and Completed Requests */}
          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Loader2 className="w-5 h-5 mr-2 text-blue-400" />
              Request Queue
            </h2>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-300 mb-3 flex items-center">
                <Loader2 className="w-4 h-4 mr-2 text-yellow-400 animate-spin" />
                Processing
              </h3>
              
              {requestQueue.length === 0 ? (
                <div className="text-center py-4 border border-dashed border-gray-800 rounded-lg">
                  <p className="text-gray-400">No active requests</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requestQueue.map((request) => (
                    <div 
                      key={request.id} 
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        {request.status === 'pending' ? (
                          <Loader2 className="w-4 h-4 mr-3 text-gray-400" />
                        ) : (
                          <Loader2 className="w-4 h-4 mr-3 text-blue-400 animate-spin" />
                        )}
                        <div>
                          <p className="text-white font-medium">
                            Generating {request.count} questions
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Keywords: {request.keywords.join(', ')}
                          </p>
                        </div>
                      </div>
                      {request.status === 'pending' ? (
                        <span className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full">
                          Pending
                        </span>
                      ) : (
                        <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">
                          Processing
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-300 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Completed
              </h3>
              
              {completedRequests.length === 0 ? (
                <div className="text-center py-4 border border-dashed border-gray-800 rounded-lg">
                  <p className="text-gray-400">No completed requests</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                  {completedRequests.map((request) => (
                    <div 
                      key={request.id} 
                      className="bg-gray-900/50 border border-gray-800 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          {request.status === 'failed' ? (
                            <AlertTriangle className="w-4 h-4 mr-3 text-red-400" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                          )}
                          <p className="text-white font-medium">
                            {request.status === 'failed' ? 
                              `Failed to generate ${request.count} questions` : 
                              `${request.count} questions generated`
                            }
                          </p>
                        </div>
                        {request.status === 'failed' ? (
                          <span className="text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
                            Failed
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">
                        Keywords: {request.keywords.join(', ')}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedJson(request);
                            setShowJsonModal(true);
                          }}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                        >
                          <code className="mr-1">{'{}'}</code> View Raw JSON
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {error && (
            <motion.div 
              className="bg-red-900/30 border border-red-500/50 rounded-md p-4 mb-8 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-red-400 font-medium">Error</h3>
                <p className="text-red-300/80 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {success && (
            <motion.div 
              className="bg-green-900/30 border border-green-500/50 rounded-md p-4 mb-8 flex items-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-green-400 font-medium">Success</h3>
                <p className="text-green-300/80 text-sm">Your request has been added to the queue.</p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* JSON Modal */}
      {showJsonModal && selectedJson && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between border-b border-gray-800 p-4">
              <h3 className="text-lg font-medium text-white flex items-center">
                <code className="bg-gray-800 px-2 py-1 rounded mr-2">{'{}'}</code>
                Raw JSON Response
              </h3>
              <button 
                onClick={() => setShowJsonModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
              <pre className="bg-gray-950 p-4 rounded-lg overflow-x-auto text-sm text-green-400 custom-scrollbar">
                {JSON.stringify(selectedJson.json || {}, null, 2)}
              </pre>
            </div>
            <div className="border-t border-gray-800 p-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedJson.json || {}, null, 2));
                  // You could add a toast notification here
                }}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center text-sm transition-colors mr-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                Copy JSON
              </button>
              <button
                onClick={() => setShowJsonModal(false)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default withAdminAuth(GenerateQuestionsPage);
