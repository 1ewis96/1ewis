import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Edit, Eye, Trash2, Search, Filter, ChevronDown, ChevronUp, AlertCircle, Loader } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
// Import API key utilities but don't use as HOC
import { getStoredApiKey } from '../../utils/authUtils';

function EditArticles() {
  const router = useRouter();
  
  // Articles state
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // API state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [limit, setLimit] = useState(10);

  // Categories state
  const [categories, setCategories] = useState(['All Categories']);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Fetch categories from API
  const fetchCategories = async () => {
    setCategoriesLoading(true);
    
    try {
      const response = await fetch('https://api.1ewis.com/news/categories');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Check if categories exist and is an array
      if (data.categories && Array.isArray(data.categories)) {
        // Add 'All Categories' as the first option
        const categoryNames = data.categories.map(cat => cat.categoryName || cat);
        setCategories(['All Categories', ...categoryNames]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setCategoriesLoading(false);
    }
  };
  
  // Fetch articles from API
  const fetchArticles = async (resetList = true) => {
    setLoading(true);
    setError(null);
    
    try {
      // Get API key using the utility function
      const { apiKey } = getStoredApiKey();
      if (!apiKey) {
        throw new Error('API key not found. Please log in again.');
      }
      
      // Determine the API URL with parameters
      let apiUrl = `https://api.1ewis.com/admin/list/articles?order=${sortDirection}&limit=${limit}`;
      
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
      const formattedArticles = data.articles.map(article => ({
        id: article.SK.replace('ARTICLE#', ''),
        title: article.title,
        category: article.category,
        date: new Date(article.date).toISOString().split('T')[0],  // Format date as YYYY-MM-DD
        status: article.status,
        views: article.views || 0,
        comments: article.comments || 0,
        PK: article.PK,  // Keep the original PK for API operations
        SK: article.SK   // Keep the original SK for API operations
      }));
      
      // Update the articles state
      if (resetList) {
        setArticles(formattedArticles);
      } else {
        setArticles(prev => [...prev, ...formattedArticles]);
      }
      
      // Store the next token for pagination
      setNextToken(data.nextToken || null);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load real articles and categories when component mounts
    fetchArticles();
    fetchCategories();
  }, []);
  
  // Refetch articles when sort direction changes
  useEffect(() => {
    fetchArticles();
  }, [sortDirection, limit]);
  
  // Load more articles
  const loadMoreArticles = () => {
    if (nextToken && !loading) {
      fetchArticles(false);
    }
  };

  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article => 
      (searchTerm === '' || 
        article.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === '' || categoryFilter === 'All Categories' || 
        article.category === categoryFilter)
    )
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'comments':
          comparison = a.comments - b.comments;
          break;
        case 'date':
        default:
          comparison = new Date(a.date) - new Date(b.date);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  // Handle article deletion
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      // In a real implementation, you would call an API endpoint to delete the article
      // For now, we'll just filter it from the local state
      setArticles(articles.filter(article => article.id !== id));
      
      // TODO: Implement actual API call when delete endpoint is available
      // const deleteArticle = async (id) => {
      //   const apiKey = localStorage.getItem('apiKey');
      //   const article = articles.find(a => a.id === id);
      //   
      //   await fetch('https://api.1ewis.com/admin/delete/article', {
      //     method: 'DELETE',
      //     headers: {
      //       'Authorization': `Bearer ${apiKey}`,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ PK: article.PK, SK: article.SK })
      //   });
      // }
    }
  };

  // Handle edit article
  const handleEdit = (article) => {
    // Extract the date from PK and the ID from SK
    // PK format: NEWS#YYYY-MM-DD#XXXX
    // SK format: ARTICLE#XXXX
    console.log('Article PK:', article.PK, 'SK:', article.SK); // Debug log
    
    // Extract date from PK
    const pkParts = article.PK.split('#');
    const dateStr = pkParts.length > 1 ? pkParts[1] : '';
    
    // Extract ID from SK
    const skParts = article.SK.split('#');
    const idStr = skParts.length > 1 ? skParts[1] : '';
    
    // Format as YYYY-MM-DD-XXXX for the API
    const apiId = `${dateStr}-${idStr}`;
    console.log('Formatted API ID:', apiId);
    
    // Navigate to the edit page with the formatted ID
    router.push(`/admin/edit-article/${apiId}`);
  };

  // Handle view article
  const handleView = (id) => {
    // In a real app, this would navigate to the public article page
    alert(`View article with ID: ${id}`);
    // router.push(`/news/article/${id}`);
  };



  return (
    <>
      <Head>
        <title>Edit Articles | Admin Dashboard | 1ewis.com</title>
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
              Edit Articles
            </motion.h1>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Manage and edit your published and draft articles
            </motion.p>
          </div>

          <motion.div
            className="mb-8 flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-black/60 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                className="appearance-none w-full md:w-48 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white pr-8"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                disabled={categoriesLoading}
              >
                {categoriesLoading ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))
                )}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                {categoriesLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full"></div>
                ) : (
                  <Filter size={16} />
                )}
              </div>
            </div>

            {/* Add New Button */}
            <button
              onClick={() => router.push('/admin/new-article')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
            >
              Add New Article
            </button>
          </motion.div>

          <motion.div
            className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('title')}
                    >
                      <div className="flex items-center">
                        Title
                        {sortField === 'title' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center">
                        Category
                        {sortField === 'category' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('views')}
                    >
                      <div className="flex items-center">
                        Views
                        {sortField === 'views' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('comments')}
                    >
                      <div className="flex items-center">
                        Comments
                        {sortField === 'comments' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {loading && filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin h-5 w-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                          <span>Loading articles...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {article.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {article.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {article.views.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {article.comments.toLocaleString()}
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
                              onClick={() => handleView(article.id)}
                              className="p-1.5 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="p-1.5 rounded-md bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No articles found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Error message */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300">
                <p className="flex items-center">
                  <AlertCircle size={18} className="mr-2" />
                  {error}
                </p>
              </div>
            )}
            
            {/* Load more button */}
            {nextToken && (
              <div className="mt-6 flex justify-center pb-4">
                <button 
                  onClick={loadMoreArticles}
                  disabled={loading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Loading more...</span>
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
export default withAdminAuth(EditArticles);
