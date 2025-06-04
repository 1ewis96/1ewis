import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { BarChart2, FileText, Edit, Plus, Eye, Clock, TrendingUp, AlertTriangle, Tag, MessageSquare } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

function AdminHome() {
  const router = useRouter();
  const [stats, setStats] = useState({
    articleViews: 0,
    comments: 0,
    articles: 0,
    categories: 0,
    lastPublished: '-'
  });
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);
  
  // Recent articles state
  const [recentArticles, setRecentArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);
  const [articlesError, setArticlesError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setStatsLoading(true);
        const { apiKey } = getStoredApiKey();
        
        if (!apiKey) {
          throw new Error('No API key available');
        }

        const response = await fetch('https://api.1ewis.com/admin/stats/', {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching stats: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
        setStatsError(null);
      } catch (err) {
        console.error('Failed to fetch admin stats:', err);
        setStatsError(err.message);
      } finally {
        setStatsLoading(false);
      }
    }
    
    async function fetchRecentArticles() {
      try {
        setArticlesLoading(true);
        const { apiKey } = getStoredApiKey();
        
        if (!apiKey) {
          throw new Error('No API key available');
        }
        
        // Using the same API endpoint as the edit-articles page with a small limit
        const apiUrl = 'https://api.1ewis.com/admin/list/articles?order=desc&limit=5';
        
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
        const formattedArticles = data.articles.map(article => ({
          id: article.SK.replace('ARTICLE#', ''),
          title: article.title,
          category: article.category,
          date: new Date(article.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }),
          status: article.status,
          views: article.views || 0,
          comments: article.comments || 0,
          PK: article.PK,
          SK: article.SK
        }));
        
        setRecentArticles(formattedArticles);
        setArticlesError(null);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setArticlesError(err.message);
      } finally {
        setArticlesLoading(false);
      }
    }

    fetchStats();
    fetchRecentArticles();
  }, []);

  return (
    <>
      <Head>
        <title>Admin Dashboard | 1ewis.com</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminNavigation />

      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-white"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              News Management Dashboard
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage your news articles and content
            </motion.p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Dashboard Cards */}
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Article Views</h3>
                  {statsLoading ? (
                    <div className="h-9 mt-2 w-24 bg-gray-800/50 animate-pulse rounded"></div>
                  ) : statsError ? (
                    <p className="text-3xl font-bold mt-2 text-red-400">Error</p>
                  ) : (
                    <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                      {stats.articleViews?.toLocaleString() || '0'}
                    </p>
                  )}
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Updated in real-time
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300">
                  <BarChart2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Comments</h3>
                  {statsLoading ? (
                    <div className="h-9 mt-2 w-16 bg-gray-800/50 animate-pulse rounded"></div>
                  ) : statsError ? (
                    <p className="text-3xl font-bold mt-2 text-red-400">Error</p>
                  ) : (
                    <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                      {stats.comments?.toLocaleString() || '0'}
                    </p>
                  )}
                  <p className="text-green-500 text-sm mt-1 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Updated in real-time
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Articles</h3>
                  {statsLoading ? (
                    <div className="h-9 mt-2 w-16 bg-gray-800/50 animate-pulse rounded"></div>
                  ) : statsError ? (
                    <p className="text-3xl font-bold mt-2 text-red-400">Error</p>
                  ) : (
                    <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-500">
                      {stats.articles?.toLocaleString() || '0'}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-1">
                    Last published: {statsLoading ? '...' : statsError ? 'Unknown' : stats.lastPublished || 'N/A'}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-all duration-300">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-purple-500/50 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">Categories</h3>
                  {statsLoading ? (
                    <div className="h-9 mt-2 w-10 bg-gray-800/50 animate-pulse rounded"></div>
                  ) : statsError ? (
                    <p className="text-3xl font-bold mt-2 text-red-400">Error</p>
                  ) : (
                    <p className="text-3xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500">
                      {stats.categories?.toLocaleString() || '0'}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-1">
                    Active article categories
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/20 transition-all duration-300">
                  <Tag className="w-6 h-6" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity Section */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Articles</h2>
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
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
                        Published Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {articlesLoading ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center">
                          <div className="flex justify-center items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                            <span className="text-gray-400">Loading articles...</span>
                          </div>
                        </td>
                      </tr>
                    ) : articlesError ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center">
                          <div className="flex justify-center items-center space-x-2 text-red-400">
                            <AlertTriangle className="w-5 h-5" />
                            <span>Error loading articles: {articlesError}</span>
                          </div>
                        </td>
                      </tr>
                    ) : recentArticles.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                          No articles found
                        </td>
                      </tr>
                    ) : (
                      recentArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-black/30">  
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{article.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{article.category}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{article.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {article.status === 'published' && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Published
                              </span>
                            )}
                            {article.status === 'draft' && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Draft
                              </span>
                            )}
                            {article.status === 'scheduled' && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                Scheduled
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => {
                                  // Extract date from PK and ID from SK
                                  const pkParts = article.PK.split('#');
                                  const dateStr = pkParts.length > 1 ? pkParts[1] : '';
                                  const skParts = article.SK.split('#');
                                  const idStr = skParts.length > 1 ? skParts[1] : '';
                                  // Format as YYYY-MM-DD-XXXX for the API
                                  const apiId = `${dateStr}-${idStr}`;
                                  router.push(`/admin/edit-article/${apiId}`);
                                }}
                                className="p-1.5 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions Section */}
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Article Management</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button 
                onClick={() => router.push('/admin/new-article')}
                className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300 text-left"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400 w-fit mb-4">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">New Article</h3>
                <p className="text-gray-400 text-sm mt-1">Create a new article for the news section</p>
              </button>
              
              <button 
                onClick={() => router.push('/admin/edit-articles')}
                className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-pink-500/50 transition-all duration-300 text-left"
              >
                <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 w-fit mb-4">
                  <Edit className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Edit Articles</h3>
                <p className="text-gray-400 text-sm mt-1">Manage existing articles</p>
              </button>
              
              <button 
                onClick={() => router.push('/admin/categories')}
                className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 p-6 hover:border-amber-500/50 transition-all duration-300 text-left"
              >
                <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400 w-fit mb-4">
                  <Tag className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Categories</h3>
                <p className="text-gray-400 text-sm mt-1">Manage article categories</p>
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(AdminHome);
