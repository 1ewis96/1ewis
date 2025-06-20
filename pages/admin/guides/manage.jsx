import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminNavigation from '../../../components/AdminNavigation';
import { motion } from 'framer-motion';
import { Edit, Trash2, Eye, Plus, ArrowLeft, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import withAdminAuth from '../../../components/withAdminAuth';

function ManageGuidesPage() {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10
  });
  
  // Fetch guides from the API
  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://api.1ewis.com/guides/list');
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setGuides(data.guides);
        setPagination(data.pagination);
      } catch (err) {
        console.error('Error fetching guides:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuides();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Handle guide deletion
  const handleDeleteGuide = async (guide) => {
    if (!confirm(`Are you sure you want to delete "${guide.title}"?`)) {
      return;
    }
    
    try {
      setDeleteLoading(guide.id);
      
      // Get API key from local storage or environment
      const apiKey = localStorage.getItem('adminApiKey') || process.env.NEXT_PUBLIC_ADMIN_API_KEY;
      
      if (!apiKey) {
        throw new Error('Admin API key not found');
      }
      
      const response = await fetch('https://api.1ewis.com/admin/delete/guide', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ id: guide.id })
      });
      
      if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
      }
      
      // Remove the deleted guide from the state
      setGuides(guides.filter(g => g.id !== guide.id));
      
      // Update pagination if needed
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1
      }));
      
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete guide: ${error.message}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Manage Guides | 1ewis.com Admin</title>
        <meta name="description" content="Manage guides for 1ewis.com" />
      </Head>
      
      <AdminNavigation />
      
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-16 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
        <motion.div 
          className="bg-gray-900/60 rounded-xl p-8 border border-gray-800 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
              Manage Guides
            </h1>
            
            <motion.a 
              href="/admin/guides/create"
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create New Guide
            </motion.a>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-8"></div>
          
          {/* Guide listing table */}
          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-400">Loading guides...</p>
            </div>
          ) : error ? (
            <div className="p-8 border border-dashed border-red-700 rounded-lg text-center text-red-400">
              <p>Error loading guides: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-900/30 hover:bg-red-900/50 text-red-400 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Title</th>
                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Category</th>
                    <th className="py-3 px-4 text-left text-gray-400 font-medium">Date</th>
                    <th className="py-3 px-4 text-center text-gray-400 font-medium">Read Time</th>
                    <th className="py-3 px-4 text-right text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {guides.map((guide) => (
                    <motion.tr 
                      key={guide.id} 
                      className="border-b border-gray-800/50 hover:bg-gray-800/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ backgroundColor: 'rgba(31, 41, 55, 0.4)' }}
                    >
                      <td className="py-4 px-4 text-white">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded overflow-hidden mr-3 bg-gray-800 flex-shrink-0">
                            <img 
                              src={guide.image} 
                              alt={guide.title} 
                              className="h-full w-full object-cover"
                              onError={(e) => e.target.src = 'https://s3.1ewis.com/placeholder.webp'}
                            />
                          </div>
                          <span className="line-clamp-1">{guide.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                          {guide.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{formatDate(guide.publishedDate)}</td>
                      <td className="py-4 px-4 text-center text-gray-300">{guide.readTime} min</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end space-x-2">
                          <motion.a
                            href={`/news/guides/${guide.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-full bg-gray-800 text-blue-400 hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="View Guide"
                          >
                            <Eye size={16} />
                          </motion.a>
                          <motion.a
                            href={`/admin/guides/create?edit=${guide.id}`}
                            className="p-1.5 rounded-full bg-gray-800 text-amber-400 hover:bg-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Edit Guide"
                          >
                            <Edit size={16} />
                          </motion.a>
                          <motion.button
                            onClick={() => handleDeleteGuide(guide)}
                            className={`p-1.5 rounded-full ${deleteLoading === guide.id ? 'bg-red-900/50' : 'bg-gray-800'} text-red-400 hover:bg-gray-700 transition-colors`}
                            whileHover={{ scale: deleteLoading === guide.id ? 1.0 : 1.1 }}
                            whileTap={{ scale: deleteLoading === guide.id ? 1.0 : 0.9 }}
                            title="Delete Guide"
                            disabled={deleteLoading === guide.id}
                          >
                            {deleteLoading === guide.id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-red-400 border-r-transparent"></div>
                            ) : (
                              <Trash2 size={16} />
                            )}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {!loading && !error && guides.length === 0 && (
            <div className="p-8 border border-dashed border-gray-700 rounded-lg text-center text-gray-400">
              No guides found. Create your first guide to get started.
            </div>
          )}
          
          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <button 
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </button>
                <span className="px-3 py-1 rounded-md bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                  {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button 
                  className="px-3 py-1 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </main>
  </>
  );
}

export default withAdminAuth(ManageGuidesPage);
