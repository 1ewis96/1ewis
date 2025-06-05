import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Search, ThumbsUp, MessageCircle, Clock, Users, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import Footer from '../../components/Footer';

export default function MostAnsweredQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageHistory, setPageHistory] = useState([]);
  const router = useRouter();
  const questionsPerPage = 10;

  // Fetch questions from API with pagination
  useEffect(() => {
    async function fetchQuestions() {
      try {
        setIsLoading(true);
        
        // Get token from query params if available
        const token = router.query.token || null;
        const limit = questionsPerPage;
        
        let url = `https://api.1ewis.com/questions/most-answered?limit=${limit}`;
        if (token) {
          url += `&token=${token}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        setQuestions(data.items || []);
        setNextPageToken(data.nextPageKey);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    
    // Only run on the client side to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      fetchQuestions();
    }
  }, [router.query.token]);

  // Navigate to next page
  const handleNextPage = () => {
    if (nextPageToken) {
      // Save current token for back navigation
      setPageHistory([...pageHistory, router.query.token || null]);
      setCurrentPage(currentPage + 1);
      router.push({
        pathname: '/questions/most-answered',
        query: { token: nextPageToken }
      });
    }
  };

  // Navigate to previous page
  const handlePrevPage = () => {
    if (pageHistory.length > 0) {
      const prevToken = pageHistory[pageHistory.length - 1];
      setPageHistory(pageHistory.slice(0, -1));
      setCurrentPage(currentPage - 1);
      
      if (prevToken) {
        router.push({
          pathname: '/questions/most-answered',
          query: { token: prevToken }
        });
      } else {
        router.push('/questions/most-answered');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>Most Answered Crypto Questions | 1ewis.com</title>
        <meta name="description" content="Browse the most answered cryptocurrency questions from the 1ewis.com community." />
        <meta name="keywords" content="crypto questions, cryptocurrency answers, most answered, bitcoin help, crypto community" />
        <link rel="canonical" href="https://1ewis.com/questions/most-answered" />
      </Head>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Most Answered Questions
            </h1>
            <Link href="/qa" className="text-purple-400 hover:text-purple-300 flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Q&A
            </Link>
          </div>
          <p className="text-gray-300 mt-2">
            Browse the questions with the most answers from the crypto community
          </p>
        </div>

        {/* Questions List */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
          {isLoading ? (
            <div className="p-12 flex justify-center">
              <div className="flex flex-col items-center">
                <Loader className="h-10 w-10 text-purple-400 animate-spin mb-4" />
                <p className="text-gray-400">Loading questions...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button 
                onClick={() => router.reload()}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-400">No questions found</p>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-700">
                {questions.map((question) => (
                  <li key={question.PK} className="hover:bg-gray-800/50 transition-colors">
                    <Link href={`/qa/${question.PK}`} className="block">
                      <div className="w-full text-left px-6 py-5">
                        <div className="flex items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-white mb-2">{question.question}</h3>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {(question.tags || []).map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Users className="h-3 w-3 mr-1 text-blue-400" />
                                {question.username}
                              </span>
                              <span className="flex items-center">
                                <MessageCircle className="h-3 w-3 mr-1 text-green-400" />
                                <strong className="text-green-400 mr-1">{question.answerCount || 0}</strong> answers
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1 text-amber-400" />
                                {typeof window !== 'undefined' 
                                  ? new Date(question.timestamp).toLocaleDateString() 
                                  : ''}
                              </span>
                              <span className="flex items-center">
                                {question.status === "answered" ? (
                                  <span className="px-2 py-0.5 bg-green-900/30 text-green-400 rounded text-xs">
                                    Answered
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 rounded text-xs">
                                    Open
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Pagination */}
              <div className="px-6 py-4 bg-gray-800/50 border-t border-gray-700 flex items-center justify-between">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-purple-400 hover:bg-purple-900/30'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </button>
                <span className="text-sm text-gray-400">Page {currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={!nextPageToken}
                  className={`flex items-center px-3 py-1 rounded-md ${
                    !nextPageToken
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-purple-400 hover:bg-purple-900/30'
                  }`}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
