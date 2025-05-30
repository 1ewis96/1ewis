import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import AdminNavigation from '../../components/AdminNavigation';
import { Edit, Eye, Trash2, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';

function EditArticles() {
  
  // Articles state
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock categories
  const categories = [
    'All Categories',
    'Market Updates',
    'Guides',
    'Trending Topics',
    'Exchanges',
    'Wallets',
    'NFTs',
    'DeFi',
    'Regulation'
  ];

  // Mock articles data
  const mockArticles = [
    {
      id: '1',
      title: 'Bitcoin Surges to New All-Time High',
      category: 'Market Updates',
      date: '2025-05-28',
      status: 'published',
      views: 12453,
      comments: 87
    },
    {
      id: '2',
      title: 'Top 5 Crypto Wallets for Beginners',
      category: 'Guides',
      date: '2025-05-27',
      status: 'published',
      views: 8721,
      comments: 42
    },
    {
      id: '3',
      title: 'NFT Market Shows Signs of Recovery',
      category: 'Trending Topics',
      date: '2025-05-26',
      status: 'published',
      views: 6543,
      comments: 31
    },
    {
      id: '4',
      title: 'Ethereum 2.0: What You Need to Know',
      category: 'Guides',
      date: '2025-05-25',
      status: 'published',
      views: 9876,
      comments: 64
    },
    {
      id: '5',
      title: 'DeFi Protocols Reach $50B in Total Value Locked',
      category: 'DeFi',
      date: '2025-05-24',
      status: 'published',
      views: 5432,
      comments: 28
    },
    {
      id: '6',
      title: 'Regulatory Developments in Crypto: May 2025',
      category: 'Regulation',
      date: '2025-05-23',
      status: 'published',
      views: 7654,
      comments: 53
    },
    {
      id: '7',
      title: 'Comparing Top Crypto Exchanges in 2025',
      category: 'Exchanges',
      date: '2025-05-22',
      status: 'published',
      views: 11234,
      comments: 76
    },
    {
      id: '8',
      title: 'Hardware vs Software Wallets: Pros and Cons',
      category: 'Wallets',
      date: '2025-05-21',
      status: 'published',
      views: 8765,
      comments: 47
    },
    {
      id: '9',
      title: 'The Future of NFTs in Gaming',
      category: 'NFTs',
      date: '2025-05-20',
      status: 'draft',
      views: 0,
      comments: 0
    },
    {
      id: '10',
      title: 'Upcoming Crypto Events in June 2025',
      category: 'Trending Topics',
      date: '2025-05-19',
      status: 'scheduled',
      scheduledDate: '2025-06-01',
      views: 0,
      comments: 0
    }
  ];

  useEffect(() => {
    // Load mock articles
    setArticles(mockArticles);
  }, []);

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
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  // Handle edit article
  const handleEdit = (id) => {
    // In a real app, this would navigate to an edit page with the article ID
    alert(`Edit article with ID: ${id}`);
    // router.push(`/admin/edit-article/${id}`);
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
            <div className="w-full md:w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-500" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-black/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
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
                  {filteredArticles.length > 0 ? (
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
                              onClick={() => handleEdit(article.id)}
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
          </motion.div>
        </div>
      </main>
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(EditArticles);
