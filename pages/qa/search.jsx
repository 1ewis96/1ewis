import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Search, MessageCircle, Clock, HelpCircle, ArrowLeft, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import ClientOnly from '../../components/ClientOnly';

export default function SearchPage() {
  const router = useRouter();
  const { query: urlQuery } = router;
  
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const resultsPerPage = 10;
  
  // Initialize search query from URL parameter
  useEffect(() => {
    if (urlQuery.q) {
      setSearchQuery(urlQuery.q);
    }
    
    if (urlQuery.page && !isNaN(parseInt(urlQuery.page))) {
      setCurrentPage(parseInt(urlQuery.page));
    }
  }, [urlQuery.q, urlQuery.page]);
  
  // Search API function
  const searchQuestionsAPI = async (query, page = 1, limit = resultsPerPage) => {
    if (!query || query.trim() === '') return null;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`https://api.1ewis.com/questions/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        results: data.results || [],
        total: data.total || 0,
        totalPages: data.totalPages || Math.ceil((data.total || 0) / limit)
      };
    } catch (err) {
      console.error('Search API error:', err);
      setError('Failed to search questions. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Fetch search results when query or page changes
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setTotalResults(0);
        setTotalPages(0);
        return;
      }
      
      const apiResults = await searchQuestionsAPI(searchQuery, currentPage);
      
      if (apiResults) {
        // Transform API results to match our format
        const formattedResults = apiResults.results.map(item => ({
          id: item.PK,
          PK: item.PK,
          title: item.question || 'Untitled Question',
          content: item.content || '',
          author: item.username || 'Anonymous',
          date: item.timestamp || new Date().toISOString(),
          answers: item.approvedAnswerCount || 0,
          viewCount: item.viewCount || item.views || 0,
          tags: item.tags || [],
          status: item.status || '',
          answered: item.answered || 0
        }));
        
        setSearchResults(formattedResults);
        setTotalResults(apiResults.total);
        setTotalPages(apiResults.totalPages);
      }
    };
    
    // Only search if we have a query
    if (searchQuery) {
      performSearch();
      
      // Update URL with search parameters
      router.push({
        pathname: '/qa/search',
        query: { q: searchQuery, page: currentPage }
      }, undefined, { shallow: true });
    }
  }, [searchQuery, currentPage]);
  
  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };
  
  // Generate pagination items
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    
    // Always show first page
    items.push(
      <button
        key="first"
        onClick={() => handlePageChange(1)}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        disabled={currentPage === 1}
      >
        1
      </button>
    );
    
    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPagesToShow - 2);
    
    if (endPage - startPage < maxPagesToShow - 2) {
      startPage = Math.max(2, endPage - (maxPagesToShow - 2));
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(<span key="ellipsis1" className="px-2 text-gray-500">...</span>);
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${currentPage === i ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push(<span key="ellipsis2" className="px-2 text-gray-500">...</span>);
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
        >
          {totalPages}
        </button>
      );
    }
    
    return items;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>{searchQuery ? `Search results for "${searchQuery}" | 1ewis.com` : 'Search Q&A | 1ewis.com'}</title>
        <meta name="description" content={`Search results for cryptocurrency questions and answers on 1ewis.com`} />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href={`https://1ewis.com/qa/search${searchQuery ? `?q=${searchQuery}&page=${currentPage}` : ''}`} />
      </Head>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/qa" className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Q&A
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">
            {searchQuery ? `Search results for "${searchQuery}"` : 'Search Q&A'}
          </h1>
          {totalResults > 0 && (
            <p className="text-gray-400">Found {totalResults} result{totalResults !== 1 ? 's' : ''}</p>
          )}
        </div>
        
        {/* Search Form */}
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              className="block w-full pl-10 pr-3 py-4 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              placeholder="Search questions by keyword, topic, or tag..."
              defaultValue={searchQuery}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Results */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Searching...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <HelpCircle className="h-12 w-12 mx-auto text-red-400 mb-3" />
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => {
                  const currentQuery = searchQuery;
                  setSearchQuery('');
                  setTimeout(() => setSearchQuery(currentQuery), 100);
                }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                Retry
              </button>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-12 text-center">
              {searchQuery ? (
                <>
                  <HelpCircle className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  <p className="text-gray-500 mt-2">Try different keywords or check your spelling</p>
                </>
              ) : (
                <>
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-400">Enter a search term to find questions</p>
                </>
              )}
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-700">
                {searchResults.map((question) => (
                  <li key={question.id} className="hover:bg-gray-800/50 transition-colors">
                    <Link href={`/qa/${question.PK || question.id}`} className="block w-full text-left px-6 py-5">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white mb-2">{question.title}</h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{question.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags && question.tags.map((tag) => (
                              <Link 
                                key={tag}
                                href={`/qa/tag/${encodeURIComponent(tag)}`}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/70 transition-colors"
                                onClick={(e) => e.stopPropagation()} // Prevent triggering the parent link
                              >
                                {tag}
                              </Link>
                            ))}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>Posted by {question.author}</span>
                            <span className="mx-2">•</span>
                            <ClientOnly>
                              <span>{new Date(question.date).toLocaleDateString()}</span>
                            </ClientOnly>
                            <span className="mx-2">•</span>
                            <ClientOnly>
                              <span>{question.answers} answers</span>
                            </ClientOnly>
                            <span className="mx-2">•</span>
                            <ClientOnly>
                              <span className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                {question.viewCount} views
                              </span>
                            </ClientOnly>
                            <span className="mx-2">•</span>
                            <ClientOnly>
                              <span className="flex items-center">
                                {question.status === "answered" || question.answered === 1 ? (
                                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-xs">
                                    Answered
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded text-xs">
                                    Open
                                  </span>
                                )}
                              </span>
                            </ClientOnly>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-center">
                          <div className="bg-gray-800 px-2 py-1 rounded-md flex items-center">
                            <MessageCircle className="h-4 w-4 text-purple-400 mr-1" />
                            <ClientOnly>
                              <span className="text-sm text-gray-300">{question.answers}</span>
                            </ClientOnly>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center px-3 py-1 rounded ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Previous
                    </button>
                    
                    <div className="hidden md:flex space-x-1">
                      {getPaginationItems()}
                    </div>
                    
                    <div className="md:hidden">
                      <span className="text-gray-400">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-3 py-1 rounded ${currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
