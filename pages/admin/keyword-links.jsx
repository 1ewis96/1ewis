import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Search, Plus, Check, Trash2, Tag, Link } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

function KeywordLinks() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [keywordLinks, setKeywordLinks] = useState([]);
  const [error, setError] = useState(null);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);
  
  // Fetch keyword links from the API
  const fetchKeywordLinks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://api.1ewis.com/keywords/list');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      setKeywordLinks(data.linkTerms || []);
    } catch (err) {
      console.error('Error fetching keyword links:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch keyword links on component mount
  useEffect(() => {
    fetchKeywordLinks();
  }, []);
  
  // Handle checkbox selection for a single link
  const handleSelectLink = (keyword) => {
    setSelectedLinks(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(link => link !== keyword);
      } else {
        return [...prev, keyword];
      }
    });
  };
  
  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLinks([]);
    } else {
      setSelectedLinks(filteredLinks.map(link => link.keyword));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle delete selected links
  const handleDeleteSelected = async () => {
    if (selectedLinks.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedLinks.length} selected links?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Prepare the request body with the selected keywords
      const requestBody = {
        keywords: selectedLinks
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/keylink/delete', {
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
      setSelectedLinks([]);
      setSelectAll(false);
      setError(null);
      
      // Refresh the keyword links list
      fetchKeywordLinks();
    } catch (err) {
      console.error('Error deleting links:', err);
      setError(`Failed to delete links: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle adding a new keyword link
  const handleAddLink = async (e) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newUrl.trim()) return;
    
    setIsSubmitting(true);
    setModalError(null);
    
    try {
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Validate URL format
      if (!newUrl.match(/^https?:\/\/.+/)) {
        throw new Error('URL must start with http:// or https://');
      }
      
      // Prepare the request body
      const requestBody = {
        keyword: newKeyword.trim(),
        url: newUrl.trim(),
        caseSensitive: isCaseSensitive
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/keylink/create', {
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
      setNewUrl('');
      setIsCaseSensitive(false);
      setIsModalOpen(false);
      
      // Refresh the keyword links list
      fetchKeywordLinks();
    } catch (err) {
      console.error('Error adding keyword link:', err);
      setModalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Filter links based on search input
  useEffect(() => {
    if (keywordLinks.length > 0) {
      if (searchTerm.trim() === '') {
        setFilteredLinks(keywordLinks);
      } else {
        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = keywordLinks.filter(link => 
          link.keyword?.toLowerCase().includes(lowercasedSearch) || 
          link.url?.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredLinks(filtered);
      }
    } else {
      setFilteredLinks([]);
    }
  }, [searchTerm, keywordLinks]);
  
  return (
    <>
      <Head>
        <title>Keyword Links | Admin Dashboard | 1ewis.com</title>
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
                Keyword Links
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Manage keyword to content mappings for SEO
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Mapping
              </button>
              {selectedLinks.length > 0 && (
                <button 
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center transition-colors"
                  onClick={handleDeleteSelected}
                  disabled={isLoading}
                >
                  {isLoading && selectedLinks.length > 0 ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5 mr-2" />
                      Delete Selected ({selectedLinks.length})
                    </>
                  )}
                </button>
              )}
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
                placeholder="Search keyword links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>
          
          {/* Table container */}
          
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
                          className={`w-5 h-5 rounded border ${selectAll ? 'bg-blue-600 border-blue-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                        >
                          {selectAll && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Keyword
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      URL
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Case Sensitive
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {isLoading ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center">
                        <div className="flex justify-center items-center space-x-2">
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
                          <span className="text-gray-400">Loading keyword links...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-red-400">
                        Error loading keyword links: {error}
                      </td>
                    </tr>
                  ) : filteredLinks.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No keyword links match your search.' : 'No keyword links found. Create your first mapping to get started.'}
                      </td>
                    </tr>
                  ) : (
                    filteredLinks.map((link, index) => (
                      <tr key={`${link.keyword}-${index}`} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              onClick={() => handleSelectLink(link.keyword)}
                              className={`w-5 h-5 rounded border ${selectedLinks.includes(link.keyword) ? 'bg-blue-600 border-blue-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                            >
                              {selectedLinks.includes(link.keyword) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="flex-shrink-0 h-8 w-8 bg-purple-600/20 rounded-full flex items-center justify-center">
                              <Tag className="h-4 w-4 text-purple-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">{link.keyword}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 truncate max-w-xs">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-400 transition-colors">
                              <Link className="h-4 w-4 mr-1 flex-shrink-0" />
                              <span className="truncate">{link.url}</span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {link.caseSensitive ? (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300">Yes</span>
                            ) : (
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700/50 text-gray-400">No</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
          
          <motion.div
            className="mt-8 text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p>
              Keyword links help map important keywords to relevant content on your site, improving internal linking and SEO.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Add Mapping Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <motion.div 
            className="bg-gray-900 rounded-xl border border-gray-800 shadow-xl w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-1">Add Keyword Link</h3>
              <p className="text-gray-400 text-sm mb-6">Create a new keyword to URL mapping</p>
              
              <form onSubmit={handleAddLink}>
                {modalError && (
                  <div className="mb-4 p-3 bg-red-900/50 border border-red-800 rounded-md text-red-200 text-sm">
                    {modalError}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-300 mb-1">Keyword</label>
                  <input
                    type="text"
                    id="keyword"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Enter keyword"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">URL</label>
                  <input
                    type="text"
                    id="url"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://1ewis.com/path/to/page"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="caseSensitive"
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-700 rounded bg-gray-800"
                      checked={isCaseSensitive}
                      onChange={(e) => setIsCaseSensitive(e.target.checked)}
                      disabled={isSubmitting}
                    />
                    <label htmlFor="caseSensitive" className="ml-2 block text-sm text-gray-300">
                      Case Sensitive
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-6">If enabled, the keyword match will be case-sensitive</p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
                    onClick={() => {
                      setIsModalOpen(false);
                      setModalError(null);
                      setNewKeyword('');
                      setNewUrl('');
                      setIsCaseSensitive(false);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center min-w-[100px]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : 'Add Link'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

// Wrap the component with the authentication HOC
export default withAdminAuth(KeywordLinks);
