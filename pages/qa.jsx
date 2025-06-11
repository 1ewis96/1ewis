import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { Search, ThumbsUp, MessageCircle, TrendingUp, Clock, Award, Tag, Users, HelpCircle, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';
// Router is imported at the top

// Sample data for questions and answers
const sampleQuestions = [
  {
    id: 1,
    title: "What is the best crypto wallet for beginners?",
    content: "I'm new to cryptocurrency and looking for a wallet that's easy to use but also secure. Any recommendations?",
    author: "cryptonewbie",
    date: "2025-05-28",
    votes: 24,
    answers: 8,
    views: 156,
    tags: ["wallets", "beginners"]
  },
  {
    id: 2,
    title: "How to calculate crypto taxes in the UK?",
    content: "I've been trading crypto for about a year now and need to understand how taxes work in the UK. Any resources or tips?",
    author: "uktrader",
    date: "2025-05-30",
    votes: 18,
    answers: 5,
    views: 102,
    tags: ["taxes", "uk", "trading"]
  },
  {
    id: 3,
    title: "Difference between hot and cold wallets?",
    content: "Can someone explain the key differences between hot and cold wallets, and when I should use each type?",
    author: "securityminded",
    date: "2025-06-01",
    votes: 31,
    answers: 12,
    views: 203,
    tags: ["wallets", "security"]
  },
  {
    id: 4,
    title: "Best exchange for low trading fees?",
    content: "I'm looking for an exchange with the lowest trading fees for regular transactions. Any recommendations?",
    author: "frugaltrader",
    date: "2025-06-02",
    votes: 15,
    answers: 7,
    views: 89,
    tags: ["exchanges", "fees"]
  },
  {
    id: 5,
    title: "How to spot crypto scams?",
    content: "There are so many projects out there. What are the red flags I should look for to avoid scams?",
    author: "cautiousinvestor",
    date: "2025-06-03",
    votes: 42,
    answers: 14,
    views: 278,
    tags: ["security", "scams", "investing"]
  }
];

// Sample answers for the first question
const sampleAnswers = [
  {
    id: 101,
    questionId: 1,
    content: "For beginners, I'd recommend Exodus wallet. It has a user-friendly interface, supports multiple cryptocurrencies, and has good security features. It's available on desktop and mobile.",
    author: "walletexpert",
    date: "2025-05-28",
    votes: 18
  },
  {
    id: 102,
    questionId: 1,
    content: "I think MetaMask is great for beginners, especially if you're interested in using DeFi applications. It's a browser extension that's easy to set up and use.",
    author: "defilover",
    date: "2025-05-29",
    votes: 12
  },
  {
    id: 103,
    questionId: 1,
    content: "If security is your top priority, consider getting a hardware wallet like Ledger Nano S or Trezor. They're a bit more expensive but offer the best protection for your crypto.",
    author: "securityfirst",
    date: "2025-05-30",
    votes: 24
  }
];

export default function QAPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mainListFilter, setMainListFilter] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ questions: [], answers: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [searchPage, setSearchPage] = useState(1);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [latestQuestions, setLatestQuestions] = useState([]);
  const [mostAnsweredQuestions, setMostAnsweredQuestions] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMostAnswered, setIsLoadingMostAnswered] = useState(true);
  const [isLoadingTags, setIsLoadingTags] = useState(true);
  const [error, setError] = useState(null);
  const [mostAnsweredError, setMostAnsweredError] = useState(null);
  const [tagsError, setTagsError] = useState(null);
  
  // State for popular questions with pagination
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [popularQuestionsPage, setPopularQuestionsPage] = useState(1);
  const [popularQuestionsTotal, setPopularQuestionsTotal] = useState(0);
  const [popularQuestionsTotalPages, setPopularQuestionsTotalPages] = useState(0);
  const [isLoadingPopular, setIsLoadingPopular] = useState(true);
  const [popularError, setPopularError] = useState(null);
  const questionsPerPage = 10;
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);
  const router = useRouter();
  const searchInputRef = React.useRef(null);
  
  // Get current date as numeric timestamp for seed
  const getCurrentDateSeed = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  };
  
  // Fetch popular questions from API with pagination
  useEffect(() => {
    async function fetchPopularQuestions() {
      try {
        setIsLoadingPopular(true);
        const dateSeed = getCurrentDateSeed();
        const response = await fetch(`https://api.1ewis.com/questions/home?page=${popularQuestionsPage}&limit=${questionsPerPage}&seed=${dateSeed}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setPopularQuestions(data.questions || []);
        setPopularQuestionsTotal(data.total || 0);
        setPopularQuestionsTotalPages(data.totalPages || 0);
        setPopularError(null);
      } catch (err) {
        console.error('Failed to fetch popular questions:', err);
        setPopularError('Failed to load popular questions. Please try again later.');
      } finally {
        setIsLoadingPopular(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      fetchPopularQuestions();
    }
  }, [popularQuestionsPage]);
  
  // Fetch latest questions from API - only run on client side to avoid hydration issues
  useEffect(() => {
    async function fetchLatestQuestions() {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.1ewis.com/questions/latest');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setLatestQuestions(data.items || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch latest questions:', err);
        setError('Failed to load latest questions. Please try again later.');
        // Don't use sample data as fallback to avoid hydration issues
      } finally {
        setIsLoading(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      fetchLatestQuestions();
    }
  }, []);
  
  // Fetch most answered questions from API
  useEffect(() => {
    async function fetchMostAnsweredQuestions() {
      try {
        setIsLoadingMostAnswered(true);
        const response = await fetch('https://api.1ewis.com/questions/most-answered');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setMostAnsweredQuestions(data.items || []);
        setMostAnsweredError(null);
      } catch (err) {
        console.error('Failed to fetch most answered questions:', err);
        setMostAnsweredError('Failed to load most answered questions. Please try again later.');
      } finally {
        setIsLoadingMostAnswered(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      fetchMostAnsweredQuestions();
    }
  }, []);
  
  // Fetch popular tags from API
  useEffect(() => {
    async function fetchPopularTags() {
      try {
        setIsLoadingTags(true);
        const response = await fetch('https://api.1ewis.com/questions/popular-tags');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setPopularTags(data.topTags || []);
        setTagsError(null);
      } catch (err) {
        console.error('Failed to fetch popular tags:', err);
        setTagsError('Failed to load popular tags. Please try again later.');
      } finally {
        setIsLoadingTags(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      fetchPopularTags();
    }
  }, []);

  // Handle click outside to close modal
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchModalOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Search API function
  const searchQuestionsAPI = async (query, page = 1, limit = 10) => {
    if (!query || query.trim() === '') return null;
    
    try {
      setIsSearching(true);
      setSearchError(null);
      
      const response = await fetch(`https://api.1ewis.com/questions/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        results: data.results || [],
        total: data.total || 0,
        totalPages: data.totalPages || 0
      };
    } catch (err) {
      console.error('Search API error:', err);
      setSearchError('Failed to search questions. Please try again.');
      return null;
    } finally {
      setIsSearching(false);
    }
  };
  
  // Search questions using API only
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ questions: [], answers: [] });
      setTotalSearchResults(0);
      return;
    }
    
    // Set initial empty state and loading
    setIsSearching(true);
    setSearchError(null);
    
    // Debounce API search
    const debounceTimeout = setTimeout(async () => {
      const apiResults = await searchQuestionsAPI(searchQuery);
      
      if (apiResults && apiResults.results && apiResults.results.length > 0) {
        // Transform API results to match our format
        const apiQuestions = apiResults.results.map(item => ({
          id: item.PK,
          PK: item.PK,
          title: item.question || 'Untitled Question',
          content: item.content || '',
          author: item.username || 'Anonymous',
          date: item.timestamp || new Date().toISOString(),
          votes: item.votes || 0,
          answers: item.approvedAnswerCount || 0,
          views: item.views || 0,
          tags: item.tags || []
        }));
        
        // Update results with API data only
        setSearchResults({
          questions: apiQuestions,
          answers: [] // No answers from API for now
        });
        
        setTotalSearchResults(apiResults.total || apiQuestions.length);
      } else {
        // No results
        setSearchResults({ questions: [], answers: [] });
        setTotalSearchResults(0);
      }
      
      setIsSearching(false);
    }, 300);
    
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);
  
  // Filter questions for the main list
  const filteredQuestions = popularQuestions.filter(question => 
    mainListFilter === '' || 
    (question.question && question.question.toLowerCase().includes(mainListFilter.toLowerCase())) ||
    (question.tags && question.tags.some(tag => tag.toLowerCase().includes(mainListFilter.toLowerCase())))
  );

  // Navigate to question detail page
  const handleQuestionClick = (questionPK) => {
    router.push(`/qa/${questionPK}`);
  };

  // Handle ask question click
  const handleAskQuestionClick = (e) => {
    e.preventDefault();
    setIsBetaModalOpen(true);
  };
  
  // Close beta modal
  const closeBetaModal = () => {
    setIsBetaModalOpen(false);
  };

  // Handle pagination for popular questions
  const handlePopularPageChange = (pageNumber) => {
    // Make sure page number is within valid range
    if (pageNumber >= 1 && pageNumber <= popularQuestionsTotalPages) {
      setPopularQuestionsPage(pageNumber);
      // Scroll to top of questions list for better UX
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>Crypto Q&A | Ask and Answer Cryptocurrency Questions | 1ewis.com</title>
        <meta name="description" content="Ask questions, get answers, and share your knowledge about cryptocurrency, blockchain, trading, and investing." />
        <meta name="keywords" content="crypto questions, cryptocurrency answers, bitcoin help, crypto community, blockchain questions" />
        <link rel="canonical" href="https://1ewis.com/qa" />
      </Head>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Crypto Q&A Community
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ask questions, get answers, and share your knowledge about cryptocurrency, blockchain, trading, and investing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-5xl mx-auto mb-10">
          <div className="relative" ref={searchInputRef}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              placeholder="Search questions by keyword, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchModalOpen(true)}
            />
            
            {/* Search Modal */}
            {isSearchModalOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 ease-in-out transform">
                <div className="max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                  {isSearching ? (
                    <div className="p-6 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto mb-3"></div>
                      <p className="text-gray-400">Searching...</p>
                    </div>
                  ) : searchError ? (
                    <div className="p-6 text-center">
                      <p className="text-red-400">{searchError}</p>
                      <button 
                        onClick={() => {
                          // Retry the search
                          const query = searchQuery;
                          setSearchQuery('');
                          setTimeout(() => setSearchQuery(query), 100);
                        }}
                        className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                      >
                        Retry
                      </button>
                    </div>
                  ) : searchQuery.trim() === '' ? (
                    <div className="p-6 text-center">
                      <HelpCircle className="h-12 w-12 mx-auto text-purple-400 mb-3 opacity-70" />
                      <p className="text-gray-400">Type to search questions and answers</p>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {['bitcoin', 'wallet', 'defi', 'nft', 'taxes', 'security'].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-3 py-2 bg-gray-800/70 hover:bg-purple-900/30 rounded-lg text-sm text-gray-300 transition-colors"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : searchResults.questions.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-gray-400">No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      {/* Questions Section */}
                      {searchResults.questions.length > 0 && (
                        <div className="border-b border-gray-800">
                          <div className="px-4 py-3 bg-gray-800/30">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <HelpCircle className="h-4 w-4 text-purple-400 mr-2" />
                                <h3 className="text-sm font-medium text-gray-300">Questions</h3>
                              </div>
                              {totalSearchResults > 0 && (
                                <span className="text-xs text-gray-400">{totalSearchResults} results</span>
                              )}
                            </div>
                          </div>
                          <div>
                            {searchResults.questions.map(question => (
                              <div 
                                key={question.id} 
                                className="px-4 py-3 hover:bg-purple-900/20 cursor-pointer transition-colors border-b border-gray-800/50 last:border-0"
                                onClick={() => {
                                  setIsSearchModalOpen(false);
                                  router.push(`/qa/${question.PK || question.id}`);
                                }}
                              >
                                <h4 className="font-medium text-white mb-1">{question.title}</h4>
                                <div className="flex items-center text-xs text-gray-400 space-x-3">
                                  <span className="flex items-center">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    <ClientOnly>{question.answers} answers</ClientOnly>
                                  </span>
                                  <span className="flex items-center">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    <ClientOnly>{question.votes} votes</ClientOnly>
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <ClientOnly>{new Date(question.date).toLocaleDateString()}</ClientOnly>
                                  </span>
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {question.tags.map(tag => (
                                    <Link 
                                      key={tag} 
                                      href={`/qa/tag/${encodeURIComponent(tag)}`}
                                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900/30 text-purple-300 hover:bg-purple-800/50 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent triggering the parent question click
                                        setIsSearchModalOpen(false); // Close the search modal
                                      }}
                                    >
                                      #{tag}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* View All Results Button */}
                      <div className="p-3 bg-gray-800/50 text-center">
                        <button 
                          className="w-full py-2 px-4 bg-purple-600/70 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors"
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            router.push({
                              pathname: '/qa/search',
                              query: { q: searchQuery, page: 1 }
                            });
                          }}
                        >
                          View all results for "{searchQuery}"
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content with Sidebar Layout */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Question List */}
          <div className="lg:flex-1">
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Popular Questions</h2>
                <a href="#" onClick={handleAskQuestionClick} className="text-purple-400 hover:text-purple-300 text-sm">
                  Ask a Question
                </a>
              </div>

              {isLoadingPopular ? (
                <div className="p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading popular questions...</p>
                </div>
              ) : popularError ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 mb-4">{popularError}</p>
                  <button 
                    onClick={() => setPopularQuestionsPage(1)} 
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
                  >
                    Retry
                  </button>
                </div>
              ) : filteredQuestions.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-400">No questions found matching your search.</p>
                </div>
              ) : (
                <div className="px-6 py-4">
                  <ul className="divide-y divide-gray-700">
                    {filteredQuestions.map((question) => (
                      <li key={question.PK || question.SK} className="hover:bg-gray-800/50 transition-colors">
                        <div className="w-full text-left px-0 py-5 cursor-pointer" onClick={() => handleQuestionClick(question.PK)}>
                          <div className="flex items-start">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-white mb-2">{question.question}</h3>
                              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{question.content || ''}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {question.tags && question.tags.map((tag) => (
                                  <Link 
                                    key={tag}
                                    href={`/qa/tag/${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/70 transition-colors"
                                    onClick={(e) => e.stopPropagation()} // Prevent triggering the parent question click
                                  >
                                    {tag}
                                  </Link>
                                ))}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>Posted by {question.username || 'Anonymous'}</span>
                                <span className="mx-2">•</span>
                                <ClientOnly>
                                  <span>{question.timestamp || question.date}</span>
                                </ClientOnly>
                                <span className="mx-2">•</span>
                                <ClientOnly>
                                  <span>{question.answerCount || question.approvedAnswerCount || question.answers || 0} answers</span>
                                </ClientOnly>
                                <span className="mx-2">•</span>
                                <ClientOnly>
                                  <span>{question.viewCount || question.views || 0} views</span>
                                </ClientOnly>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Pagination Controls */}
                  {popularQuestionsTotalPages > 1 && (
                    <div className="flex justify-center items-center p-4 border-t border-gray-700">
                      <button 
                        onClick={() => handlePopularPageChange(popularQuestionsPage - 1)}
                        disabled={popularQuestionsPage === 1}
                        className="px-3 py-1 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed mr-2"
                      >
                        Previous
                      </button>
                      
                      <div className="flex space-x-1">
                        {(() => {
                          // Show limited page numbers with ellipsis for better UX
                          const totalPages = popularQuestionsTotalPages;
                          const currentPage = popularQuestionsPage;
                          const pageNumbers = [];
                          
                          // Always show first page
                          pageNumbers.push(1);
                          
                          // Calculate range of pages to show around current page
                          const delta = 1; // Number of pages to show before and after current page
                          let rangeStart = Math.max(2, currentPage - delta);
                          let rangeEnd = Math.min(totalPages - 1, currentPage + delta);
                          
                          // Adjust range to show at least 3 pages if possible
                          if (rangeEnd - rangeStart < 2) {
                            if (currentPage < totalPages / 2) {
                              // Near the start, expand end
                              rangeEnd = Math.min(totalPages - 1, rangeStart + 2);
                            } else {
                              // Near the end, expand start
                              rangeStart = Math.max(2, rangeEnd - 2);
                            }
                          }
                          
                          // Add ellipsis and range start
                          if (rangeStart > 2) {
                            pageNumbers.push('...');
                          } else if (rangeStart === 2) {
                            pageNumbers.push(2);
                          }
                          
                          // Add pages in the middle range
                          for (let i = rangeStart + 1; i < rangeEnd; i++) {
                            pageNumbers.push(i);
                          }
                          
                          // Add range end and ellipsis
                          if (rangeEnd < totalPages - 1) {
                            pageNumbers.push(rangeEnd);
                            pageNumbers.push('...');
                          } else if (rangeEnd === totalPages - 1) {
                            pageNumbers.push(rangeEnd);
                          }
                          
                          // Always show last page if more than 1 page
                          if (totalPages > 1) {
                            pageNumbers.push(totalPages);
                          }
                          
                          // Remove duplicates
                          const uniquePageNumbers = [...new Set(pageNumbers)];
                          
                          return uniquePageNumbers.map((pageNum, index) => {
                            if (pageNum === '...') {
                              return (
                                <span 
                                  key={`ellipsis-${index}`} 
                                  className="w-8 h-8 flex items-center justify-center text-gray-400"
                                >
                                  ...
                                </span>
                              );
                            }
                            return (
                              <button
                                key={`page-${pageNum}`}
                                onClick={() => handlePopularPageChange(pageNum)}
                                className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === pageNum ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                              >
                                {pageNum}
                              </button>
                            );
                          });
                        })()} 
                      </div>
                      
                      <button 
                        onClick={() => handlePopularPageChange(popularQuestionsPage + 1)}
                        disabled={popularQuestionsPage === popularQuestionsTotalPages}
                        className="px-3 py-1 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed ml-2"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Ask Question Button */}
            <div className="mb-6">
              <a href="#" onClick={handleAskQuestionClick} className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg text-center transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20">
                <HelpCircle className="inline-block h-5 w-5 mr-2 -mt-1" />
                Ask a Question
              </a>
            </div>
            
            {/* Latest Questions Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <Clock className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Latest Questions</h3>
              </div>
              <div className="p-4">
                <ClientOnly fallback={
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                        <div className="h-4 bg-gray-700/50 rounded w-full mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                }>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                          <div className="h-4 bg-gray-700/50 rounded w-full mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <p className="text-sm text-gray-400">Unable to load latest questions</p>
                  ) : latestQuestions.length > 0 ? (
                    <>
                      <ul className="space-y-3">
                        {latestQuestions.slice(0, 3).map((question) => (
                          <li key={`latest-${question.PK}`} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                            <Link href={`/qa/${question.PK}`} className="text-sm text-gray-300 hover:text-purple-400 line-clamp-2">
                              {question.question}
                            </Link>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <span>{question.answerCount || 0} answers</span>
                              <span className="mx-1">•</span>
                              <span>{new Date(question.timestamp).toLocaleDateString()}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Link href="/questions/latest" className="text-xs text-purple-400 hover:text-purple-300 mt-3 inline-block">
                        View all latest questions →
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">No questions available</p>
                  )
                }</ClientOnly>  
              </div>
            </div>
            
            {/* Most Answered Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <MessageCircle className="h-4 w-4 text-green-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Most Answered</h3>
              </div>
              <div className="p-4">
                <ClientOnly fallback={
                  <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                        <div className="h-4 bg-gray-700/50 rounded w-full mb-2 animate-pulse"></div>
                        <div className="h-3 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                }>
                  {isLoadingMostAnswered ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                          <div className="h-4 bg-gray-700/50 rounded w-full mb-2 animate-pulse"></div>
                          <div className="h-3 bg-gray-700/50 rounded w-2/3 animate-pulse"></div>
                        </div>
                      ))}
                    </div>
                  ) : mostAnsweredError ? (
                    <p className="text-sm text-gray-400">Unable to load most answered questions</p>
                  ) : mostAnsweredQuestions.length > 0 ? (
                    <>
                      <ul className="space-y-3">
                        {mostAnsweredQuestions.slice(0, 3).map((question) => (
                          <li key={`answered-${question.PK}`} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                            <Link href={`/qa/${question.PK}`} className="text-sm text-gray-300 hover:text-purple-400 line-clamp-2">
                              {question.question}
                            </Link>
                            <div className="flex items-center mt-1 text-xs text-gray-500">
                              <MessageCircle className="h-3 w-3 text-purple-400 mr-1" />
                              <span>{question.answerCount || 0} answers</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <Link href="/questions/most-answered" className="text-xs text-purple-400 hover:text-purple-300 mt-3 inline-block">
                        View all most answered questions →
                      </Link>
                    </>
                  ) : (
                    <p className="text-sm text-gray-400">No questions available</p>
                  )
                }</ClientOnly>
              </div>
            </div>
            
            {/* Hot Topics Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <TrendingUp className="h-4 w-4 text-red-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Hot Topics</h3>
              </div>
              <div className="p-4">
                <ClientOnly fallback={
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="h-7 w-20 bg-gray-700/50 rounded-full animate-pulse"></div>
                    ))}
                  </div>
                }>
                  {isLoadingTags ? (
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-7 w-20 bg-gray-700/50 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  ) : tagsError ? (
                    <p className="text-sm text-gray-400">Unable to load popular tags</p>
                  ) : popularTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {popularTags.slice(0, 12).map((tagItem) => (
                        <Link 
                          href={`/qa/tag/${encodeURIComponent(tagItem.tag)}`} 
                          key={`hot-${tagItem.tag}`}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tagItem.tag}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No popular tags available</p>
                  )
                }</ClientOnly>
              </div>
            </div>
            
            {/* Additional panels can be added here */}
            
            {/* Resources Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <BookOpen className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Resources</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-purple-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-2"></div>
                      Crypto Glossary
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-purple-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-2"></div>
                      Beginner's Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-purple-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-2"></div>
                      Security Best Practices
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-purple-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-2"></div>
                      Trading Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-300 hover:text-purple-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-2"></div>
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Beta Tester Modal */}
      {isBetaModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 transition-opacity bg-black bg-opacity-75 backdrop-blur-sm"
              onClick={closeBetaModal}
              aria-hidden="true"
            ></div>
            
            {/* Modal panel */}
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-gray-900 border border-gray-700 rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-gray-900 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-purple-900/50 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                    <Users className="w-6 h-6 text-purple-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-white">Exclusive Beta Access</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        The ability to ask questions is currently available only to invited beta testers. Join our waitlist to get early access to this feature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-800/50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    closeBetaModal();
                    // Here you could add logic to join waitlist
                  }}
                >
                  Join Waitlist
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-300 bg-gray-800 border border-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeBetaModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
