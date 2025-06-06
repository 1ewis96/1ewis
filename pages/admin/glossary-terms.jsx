import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AdminNavigation from '../../components/AdminNavigation';
import { Search, Plus, Check, Trash2, Edit, HelpCircle } from 'lucide-react';
import withAdminAuth from '../../components/withAdminAuth';
import { getStoredApiKey } from '../../utils/authUtils';

function GlossaryTerms() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [glossaryTerms, setGlossaryTerms] = useState([]);
  const [error, setError] = useState(null);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState(null);
  
  // Handle checkbox selection for a single term
  const handleSelectTerm = (keyword) => {
    setSelectedTerms(prev => {
      if (prev.includes(keyword)) {
        return prev.filter(term => term !== keyword);
      } else {
        return [...prev, keyword];
      }
    });
  };
  
  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTerms([]);
    } else {
      setSelectedTerms(filteredTerms.map(term => term.keyword));
    }
    setSelectAll(!selectAll);
  };
  
  // Handle delete selected terms
  const handleDeleteSelected = async () => {
    if (selectedTerms.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedTerms.length} selected terms?`)) {
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
        keywords: selectedTerms
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/glossary/delete', {
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
      setSelectedTerms([]);
      setSelectAll(false);
      setError(null);
      
      // Refresh the glossary terms list
      fetchGlossaryTerms();
    } catch (err) {
      console.error('Error deleting terms:', err);
      setError(`Failed to delete terms: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch glossary terms from the API
  const fetchGlossaryTerms = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://api.1ewis.com/keywords/glossary');
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API Response:', data);
      setGlossaryTerms(data.glossaryTerms || []);
    } catch (err) {
      console.error('Error fetching glossary terms:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch glossary terms on component mount
  useEffect(() => {
    fetchGlossaryTerms();
  }, []);
  
  // Handle adding a new term
  const handleAddTerm = async (e) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newDescription.trim()) {
      setModalError('Keyword and description are required');
      return;
    }
    
    setIsSubmitting(true);
    setModalError(null);
    
    try {
      // Get API key from utility function
      const { apiKey } = getStoredApiKey();
      
      if (!apiKey) {
        throw new Error('No API key available');
      }
      
      // Prepare the request body
      const requestBody = {
        keyword: newKeyword.trim(),
        description: newDescription.trim(),
        caseSensitive: isCaseSensitive
      };
      
      const response = await fetch('https://api.1ewis.com/admin/seo/glossary/create', {
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
      setNewDescription('');
      setIsCaseSensitive(false);
      setIsModalOpen(false);
      
      // Refresh the glossary terms list
      fetchGlossaryTerms();
    } catch (err) {
      console.error('Error adding term:', err);
      setModalError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Filter terms based on search input
  useEffect(() => {
    if (glossaryTerms.length > 0) {
      if (searchTerm.trim() === '') {
        setFilteredTerms(glossaryTerms);
      } else {
        const lowercasedSearch = searchTerm.toLowerCase();
        const filtered = glossaryTerms.filter(term => 
          term.keyword?.toLowerCase().includes(lowercasedSearch) || 
          term.description?.toLowerCase().includes(lowercasedSearch)
        );
        setFilteredTerms(filtered);
      }
    } else {
      setFilteredTerms([]);
    }
  }, [searchTerm, glossaryTerms]);
  
  return (
    <>
      <Head>
        <title>Glossary Terms | Admin Dashboard | 1ewis.com</title>
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
                Glossary Terms
              </motion.h1>
              <motion.p 
                className="text-gray-400 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Manage cryptocurrency glossary definitions
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Term
              </button>
              {selectedTerms.length > 0 && (
                <button 
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md flex items-center justify-center transition-colors"
                  onClick={handleDeleteSelected}
                  disabled={isLoading}
                >
                  {isLoading && selectedTerms.length > 0 ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5 mr-2" />
                      Delete Selected ({selectedTerms.length})
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-900 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                placeholder="Search glossary terms..."
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
                          className={`w-5 h-5 rounded border ${selectAll ? 'bg-blue-600 border-blue-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                        >
                          {selectAll && <Check className="w-3 h-3 text-white" />}
                        </div>
                        Term
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Definition
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
                          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                          <span className="text-gray-400">Loading glossary terms...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-red-400">
                        Error loading glossary terms: {error}
                      </td>
                    </tr>
                  ) : filteredTerms.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No glossary terms match your search.' : 'No glossary terms found. Add your first term to get started.'}
                      </td>
                    </tr>
                  ) : (
                    filteredTerms.map((term, index) => (
                      <tr key={term.keyword || index} className="hover:bg-black/30">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div 
                              onClick={() => handleSelectTerm(term.keyword)}
                              className={`w-5 h-5 rounded border ${selectedTerms.includes(term.keyword) ? 'bg-blue-600 border-blue-600' : 'border-gray-600'} flex items-center justify-center cursor-pointer mr-3`}
                            >
                              {selectedTerms.includes(term.keyword) && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <div className="text-sm font-medium text-white">{term.keyword || 'Untitled Term'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-300 line-clamp-2">{term.description || 'No definition provided'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {term.caseSensitive ? (
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
              Glossary terms help users understand cryptocurrency terminology and improve SEO by providing definitions for technical terms.
            </p>
          </motion.div>
        </div>
      </main>

      {/* Add Term Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div 
            className="bg-gray-900 rounded-xl border border-gray-800 w-full max-w-md overflow-hidden shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Add New Glossary Term</h3>
              
              <form onSubmit={handleAddTerm}>
                {modalError && (
                  <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md text-red-300 text-sm">
                    {modalError}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="keyword" className="block text-sm font-medium text-gray-300 mb-1">Keyword</label>
                  <input
                    type="text"
                    id="keyword"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter keyword"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    id="description"
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="caseSensitive"
                      className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                      checked={isCaseSensitive}
                      onChange={(e) => setIsCaseSensitive(e.target.checked)}
                    />
                    <label htmlFor="caseSensitive" className="ml-2 text-sm font-medium text-gray-300">
                      Case Sensitive
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">Enable if the term should be matched with exact case sensitivity</p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                    onClick={() => {
                      setIsModalOpen(false);
                      setModalError(null);
                      setNewKeyword('');
                      setNewDescription('');
                      setIsCaseSensitive(false);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Add Term'
                    )}
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
export default withAdminAuth(GlossaryTerms);
