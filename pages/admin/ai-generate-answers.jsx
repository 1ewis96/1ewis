import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { Sparkles, AlertTriangle, CheckCircle, Loader2, Search, RefreshCw, Clock, Code, X } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

// Helper function to format time ago
const formatTimeAgo = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
};

function GenerateAnswersPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [additionalContext, setAdditionalContext] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingQuestions, setFetchingQuestions] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
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
      
      const response = await fetch('https://api.1ewis.com/admin/ai/queue?function=generate_answer', {
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
          timestamp: item.createdAt,
          questionCount: item.count || 0,
          json: item.json || {},
          questions: Array.isArray(item.questions) ? item.questions : [],
          answer: typeof item.json === 'string' ? item.json : ''
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
  
  useEffect(() => {
    // Fetch queue data on component mount
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

  useEffect(() => {
    // Fetch approved questions from the API
    const fetchApprovedQuestions = async () => {
      setFetchingQuestions(true);
      try {
        const { apiKey } = getStoredApiKey();
        
        if (!apiKey) {
          throw new Error('No API key available');
        }
        
        const response = await fetch('https://api.1ewis.com/admin/list/approved/questions', {
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
        
        // Check if we have items in the response
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid response format');
        }
        
        // Transform the API response to match our expected format
        const formattedQuestions = data.items.map(item => ({
          id: item.PK || item.SK || `question-${Date.now()}`,
          title: item.question,
          category: item.tags && item.tags.length > 0 ? item.tags[0] : 'Uncategorized',
          tags: item.tags || [],
          timestamp: item.timestamp,
          username: item.username,
          status: item.status,
          source: item.source,
          // Store original SK for API requests
          originalSK: item.SK
        }));
        
        setQuestions(formattedQuestions);
        setFilteredQuestions(formattedQuestions);
      } catch (error) {
        console.error('Error fetching approved questions:', error);
        setError('Failed to fetch approved questions');
      } finally {
        setFetchingQuestions(false);
      }
    };
    
    fetchApprovedQuestions();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredQuestions(questions);
    } else {
      const filtered = questions.filter(question => 
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuestions(filtered);
    }
  }, [searchQuery, questions]);

  // Function to refresh the questions list from the API
  const fetchUnansweredQuestions = async () => {
    setFetchingQuestions(true);
    setError(null);
    
    try {
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      const response = await fetch('https://api.1ewis.com/admin/list/approved/questions', {
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
      
      // Check if we have items in the response
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid response format');
      }
      
      // Transform the API response to match our expected format
      const formattedQuestions = data.items.map(item => ({
        id: item.PK || item.SK || `question-${Date.now()}`,
        title: item.question,
        category: item.tags && item.tags.length > 0 ? item.tags[0] : 'Uncategorized',
        tags: item.tags || [],
        timestamp: item.timestamp,
        username: item.username,
        status: item.status,
        source: item.source,
        // Store original SK for API requests
        originalSK: item.SK
      }));
      
      setQuestions(formattedQuestions);
      setFilteredQuestions(formattedQuestions);
    } catch (error) {
      console.error('Error fetching approved questions:', error);
      setError('Failed to fetch approved questions');
    } finally {
      setFetchingQuestions(false);
    }
  };

  const toggleQuestionSelection = (question) => {
    setSelectedQuestions(prevSelected => {
      const isSelected = prevSelected.some(q => q.id === question.id);
      
      if (isSelected) {
        return prevSelected.filter(q => q.id !== question.id);
      } else {
        return [...prevSelected, question];
      }
    });
  };
  
  const clearQuestionSelection = () => {
    setSelectedQuestions([]);
  };



  const generateAnswer = async () => {
    if (selectedQuestions.length === 0) {
      setError('Please select at least one question');
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
      
      // Format the questions for the API payload
      const questionsPayload = selectedQuestions.map(q => ({
        question: q.title,
        PK: q.id,
        SK: q.originalSK || q.id // Use the original SK if available, otherwise fallback to id
      }));
      
      // Prepare the API payload
      const payload = {
        function: 'generate_answer',
        additionalContext: additionalContext || '',
        questions: questionsPayload
      };
      
      // Make the API request
      const response = await fetch('https://api.1ewis.com/admin/ai/queue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // The API returns success even with the message "Task enqueued and event emitted"
      // So we should treat this as a successful response
      
      // Request was successful, refresh the queue data
      fetchQueueData();
      setSuccess(true);
      
      // Clear the form
      setSelectedQuestions([]);
      setAdditionalContext('');
    } catch (error) {
      console.error('Error generating answer:', error);
      setError(`Failed to generate answer: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  const viewJsonResponse = (request) => {
    // Format the JSON for display
    let jsonToDisplay = request.json;
    
    // Handle different formats of json data from API
    try {
      if (typeof jsonToDisplay === 'string') {
        // If it's a string, try to parse it
        jsonToDisplay = JSON.parse(jsonToDisplay);
      }
      
      // Set the formatted JSON for display
      setSelectedJson(JSON.stringify(jsonToDisplay, null, 2));
      setShowJsonModal(true);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      // If parsing fails, display as is
      setSelectedJson(String(jsonToDisplay));
      setShowJsonModal(true);
    }
  };

  const handleSubmitAnswer = (completedRequest) => {
    if (!completedRequest || !completedRequest.answer.trim()) {
      setError('No answer available to submit');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Remove the answered questions from the list
      const answeredIds = new Set(completedRequest.questions.map(q => q.id));
      setQuestions(questions.filter(q => !answeredIds.has(q.id)));
      setFilteredQuestions(filteredQuestions.filter(q => !answeredIds.has(q.id)));
      
      // Mark the request as submitted in the completed requests list
      setCompletedRequests(prev => prev.map(req => 
        req.id === completedRequest.id ? { ...req, submitted: true } : req
      ));
      
      setSuccess(true);
      
      // Show success message briefly
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
      setLoading(false);
    }, 1000); // Simulate API delay of 1 second
  };

  return (
    <>
      <Head>
        <title>Generate Answers | Admin | 1ewis.com</title>
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
            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 mr-4">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold text-white"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Generate Answers
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Use AI to generate answers for existing questions
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Generate Form Panel - Left Column */}
            <motion.div 
              className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white mb-4">Generate Answers</h2>
              
              {error && (
                <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-red-400 font-medium">Error</h3>
                      <p className="text-red-300/80 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Success message moved to the top of the page */}
              
              <div className="mb-6">
                <label htmlFor="additional-context" className="block text-sm font-medium text-gray-300 mb-2">
                  Additional Context (Optional)
                </label>
                <textarea
                  id="additional-context"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={6}
                  placeholder="Add any additional context to help generate better answers..."
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  {selectedQuestions.length} question{selectedQuestions.length !== 1 ? 's' : ''} selected
                </div>
                <div className="space-x-3">
                  <button
                    onClick={generateAnswer}
                    disabled={selectedQuestions.length === 0 || loading}
                    className={`px-6 py-2 rounded-md font-medium flex items-center ${
                      selectedQuestions.length === 0 || loading
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    } transition-colors duration-300`}
                  >
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Generate Answer
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Questions Selection Panel - Right Column (spans 2 columns) */}
            <motion.div 
              className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 lg:col-span-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Select Questions</h2>
                <div className="flex items-center space-x-2">
                  {selectedQuestions.length > 0 && (
                    <button
                      onClick={clearQuestionSelection}
                      className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors flex items-center"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Clear selection
                    </button>
                  )}
                  <button 
                    onClick={fetchUnansweredQuestions}
                    disabled={fetchingQuestions}
                    className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors flex items-center"
                  >
                    <RefreshCw className={`w-4 h-4 ${fetchingQuestions ? 'animate-spin' : ''}`} />
                    <span className="ml-1 text-sm">Refresh</span>
                  </button>
                </div>
              </div>
              
              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              {fetchingQuestions ? (
                <div className="flex justify-center items-center h-64">
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
                    <p className="text-gray-400 mt-2">Loading questions...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="bg-red-900/30 border border-red-500/50 rounded-md p-4 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-400 mr-3 mt-0.5" />
                    <div>
                      <h3 className="text-red-400 font-medium">Error</h3>
                      <p className="text-red-300/80 text-sm">{error}</p>
                    </div>
                  </div>
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-gray-800 rounded-lg">
                  <p className="text-gray-400">No unanswered questions found</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {filteredQuestions.map((question) => (
                    <div
                      key={question.id}
                      onClick={() => toggleQuestionSelection(question)}
                      className={`w-full text-left p-3 rounded-md transition-colors cursor-pointer ${
                        selectedQuestions.some(q => q.id === question.id)
                          ? 'bg-purple-900/30 border border-purple-500/50'
                          : 'bg-gray-900/50 border border-gray-800 hover:border-purple-500/30'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded border mr-3 flex-shrink-0 ${selectedQuestions.some(q => q.id === question.id) ? 'bg-purple-500 border-purple-500' : 'border-gray-500'}`}>
                          {selectedQuestions.some(q => q.id === question.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full text-white p-0.5">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-white font-medium line-clamp-2">{question.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {question.tags && question.tags.map((tag, index) => (
                              <span key={index} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-300 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Queue and Completed Requests */}
          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 mb-8 mt-12"
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
                    <div key={request.id} className="bg-gray-900/50 border border-gray-800 rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {request.status === 'pending' ? (
                            <>
                              <Loader2 className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-gray-400 font-medium">Pending</span>
                            </>
                          ) : (
                            <>
                              <Loader2 className="w-4 h-4 text-blue-400 animate-spin mr-2" />
                              <span className="text-blue-400 font-medium">Processing</span>
                            </>
                          )}
                        </div>
                        <span className="text-xs text-gray-400">{formatTimeAgo(new Date(request.timestamp))}</span>
                      </div>
                      <div className="text-sm text-gray-300">
                        <p>Processing {request.questionCount} question{request.questionCount !== 1 ? 's' : ''}</p>
                      </div>
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
                            <XCircle className="w-4 h-4 mr-3 text-red-400" />
                          ) : (
                            <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                          )}
                          <p className="text-white font-medium">
                            {request.status === 'failed' ? 'Failed to generate' : 'Answers generated'}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          request.status === 'failed' 
                            ? 'bg-red-500/20 text-red-300' 
                            : 'bg-green-500/20 text-green-300'
                        }`}>
                          {request.status === 'failed' ? 'Failed' : 'Completed'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500">
                          {formatTimeAgo(new Date(request.timestamp))}
                        </p>
                        <button 
                          onClick={() => viewJsonResponse(request)}
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
                {selectedJson}
              </pre>
            </div>
            <div className="border-t border-gray-800 p-4 flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedJson);
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

export default withAdminAuth(GenerateAnswersPage);
