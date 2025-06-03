import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Calendar, Clock, Edit, Eye, Trash2, AlertTriangle, Loader } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
// Import API key utilities
import { getStoredApiKey } from '../../utils/authUtils';

function ScheduledArticles() {
  const router = useRouter();
  
  // Scheduled articles state
  const [scheduledArticles, setScheduledArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [limit, setLimit] = useState(10);

  // Fetch scheduled articles from API
  const fetchScheduledArticles = async (resetList = true) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get API key using the utility function
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Determine the API URL with parameters
      let apiUrl = `https://api.1ewis.com/admin/list/scheduled?limit=${limit}`;
      
      // Add the pagination token if we have one and are loading more
      if (nextToken && !resetList) {
        apiUrl += `&nextToken=${encodeURIComponent(nextToken)}`;
      }
      
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Process the articles data
      const formattedArticles = data.articles.map(article => {
        // Extract ID parts from the id field (format: NEWS#YYYY-MM-DD#XXXX)
        const idParts = article.id.split('#');
        const dateStr = idParts[1] || '';
        const idStr = idParts[2] || '';
        
        return {
          id: idStr,
          title: article.title,
          category: article.category || 'Uncategorized',
          scheduledDate: article.publishedAt || new Date().toISOString(),
          author: article.author || 'Admin',
          status: 'scheduled',
          summary: article.summary,
          readTime: article.readTime,
          thumbnailUrl: article.thumbnailUrl,
          PK: article.id,  // Use id as PK since that's what we have
          SK: `ARTICLE#${idStr}`  // Construct SK for consistency
        };
      });
      
      // Update the articles state
      if (resetList) {
        setScheduledArticles(formattedArticles);
      } else {
        setScheduledArticles(prev => [...prev, ...formattedArticles]);
      }
      
      // Store the next token for pagination
      setNextToken(data.nextToken || null);
    } catch (err) {
      console.error('Error fetching scheduled articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load real scheduled articles when component mounts
    fetchScheduledArticles();
  }, []);
  
  // Load more articles
  const loadMoreArticles = () => {
    if (nextToken && !loading) {
      fetchScheduledArticles(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate time remaining
  const getTimeRemaining = (dateString) => {
    const now = new Date();
    const scheduledDate = new Date(dateString);
    const diffTime = scheduledDate - now;
    
    if (diffTime <= 0) {
      return 'Publishing soon';
    }
    
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ${diffHours} hr${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ${diffMinutes} min${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  };

  // Handle edit scheduled article
  const handleEdit = (article) => {
    // Extract the date part from PK (format: NEWS#YYYY-MM-DD#XXXX)
    const pkParts = article.PK.split('#');
    const dateStr = pkParts[1] || '';
    const idStr = article.id;
    
    // Construct the article ID in the format YYYY-MM-DD-XXXX
    const articleId = `${dateStr}-${idStr}`;
    
    // Navigate to the edit page
    router.push(`/admin/edit-article/${articleId}`);
  };

  // Handle preview article
  const handlePreview = (article) => {
    // Extract the date part from PK (format: NEWS#YYYY-MM-DD#XXXX)
    const pkParts = article.PK.split('#');
    const dateStr = pkParts[1] || '';
    const idStr = article.id;
    
    // Construct the article ID in the format YYYY-MM-DD-XXXX
    const articleId = `${dateStr}-${idStr}`;
    
    // Open the article in a new tab
    window.open(`/news/article/${articleId}`, '_blank');
  };

  // Handle delete scheduled article
  const handleDelete = async (article) => {
    if (confirm(`Are you sure you want to delete the scheduled article "${article.title}"?`)) {
      try {
        setLoading(true);
        setError(null);
        
        const { apiKey } = getStoredApiKey();
        if (!apiKey) throw new Error('API key not found. Please log in again.');
        
        const response = await fetch('https://api.1ewis.com/admin/delete/article', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: article.PK, publishType: 'schedule' })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Error: ${response.status} ${response.statusText}`);
        }
        
        setScheduledArticles(scheduledArticles.filter(a => a.id !== article.id));
        alert('Scheduled article deleted successfully');
      } catch (err) {
        setError(err.message);
        alert(`Error deleting article: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  // Sort articles by scheduled date
  const sortedArticles = [...scheduledArticles].sort((a, b) => 
    new Date(a.scheduledDate) - new Date(b.scheduledDate)
  );

  return (
    <>
      <Head>
        <title>Scheduled Articles | Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Scheduled Publications
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage articles scheduled for future publication
            </motion.p>
          </div>

          <motion.div
            className="mb-6 p-4 bg-blue-900/20 border border-blue-800/30 rounded-lg flex items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-2 bg-blue-500/20 text-blue-400 rounded-full mr-3">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-gray-300 text-sm">
              <span className="font-medium text-blue-400">Note:</span> Scheduled articles will be automatically published at the specified date and time. Make sure all content is finalized before the scheduled publication time.
            </div>
          </motion.div>

          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {loading && scheduledArticles.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex justify-center items-center space-x-2">
                  <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                  <span className="text-gray-400">Loading scheduled articles...</span>
                </div>
              </div>
            ) : error && scheduledArticles.length === 0 ? (
              <div className="p-8 text-center">
                <div className="flex justify-center items-center space-x-2 text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Error: {error}</span>
                </div>
              </div>
            ) : sortedArticles.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-900/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Title
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Publication Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Time Remaining
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {sortedArticles.map((article) => (
                      <tr key={`${article.PK}-${article.SK}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {article.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {article.category || 'Uncategorized'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                            {formatDate(article.scheduledDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-purple-400" />
                            {formatTime(article.scheduledDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {getTimeRemaining(article.scheduledDate)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleEdit(article)}
                              className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handlePreview(article)}
                              className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(article)}
                              className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-gray-800/50 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">No Scheduled Articles</h3>
                <p className="mt-2 text-gray-400 max-w-md mx-auto">
                  You don't have any articles scheduled for publication. Create a new article and choose the "Schedule" option to set a future publication date.
                </p>
                <button
                  onClick={() => router.push('/admin/new-article')}
                  className="mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Create New Article
                </button>
              </div>
            )}
            
            {/* Pagination / Load More */}
            {nextToken && sortedArticles.length > 0 && (
              <div className="mt-6 p-4 flex justify-center">
                <button
                  onClick={loadMoreArticles}
                  disabled={loading}
                  className="px-4 py-2 bg-purple-600/30 hover:bg-purple-600/40 text-purple-300 rounded-md flex items-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin mr-2" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <span>Load More Articles</span>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(ScheduledArticles);
