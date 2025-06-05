import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, ThumbsUp, MessageCircle, TrendingUp, Clock, Award, Tag, Users, HelpCircle, BookOpen } from 'lucide-react';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

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
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ questions: [], answers: [] });
  const router = useRouter();
  const searchInputRef = React.useRef(null);

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

  // Filter questions and answers based on search query
  React.useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults({ questions: [], answers: [] });
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    // Filter questions
    const matchedQuestions = sampleQuestions
      .filter(question => 
        question.title.toLowerCase().includes(query) ||
        question.content.toLowerCase().includes(query) ||
        question.tags.some(tag => tag.includes(query))
      )
      .slice(0, 3); // Limit to 3 results for the modal
    
    // Filter answers
    const matchedAnswers = sampleAnswers
      .filter(answer => 
        answer.content.toLowerCase().includes(query)
      )
      .slice(0, 3); // Limit to 3 results for the modal
    
    setSearchResults({
      questions: matchedQuestions,
      answers: matchedAnswers
    });
  }, [searchQuery]);
  
  // Filter all questions for the main list
  const filteredQuestions = sampleQuestions.filter(question => 
    question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    question.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
  );

  // Navigate to question detail page
  const handleQuestionClick = (questionId) => {
    router.push(`/qa/${questionId}`);
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
                  {searchQuery.trim() === '' ? (
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
                  ) : searchResults.questions.length === 0 && searchResults.answers.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-gray-400">No results found for "{searchQuery}"</p>
                    </div>
                  ) : (
                    <>
                      {/* Questions Section */}
                      {searchResults.questions.length > 0 && (
                        <div className="border-b border-gray-800">
                          <div className="px-4 py-3 bg-gray-800/30">
                            <div className="flex items-center">
                              <HelpCircle className="h-4 w-4 text-purple-400 mr-2" />
                              <h3 className="text-sm font-medium text-gray-300">Questions</h3>
                            </div>
                          </div>
                          <div>
                            {searchResults.questions.map(question => (
                              <div 
                                key={question.id} 
                                className="px-4 py-3 hover:bg-purple-900/20 cursor-pointer transition-colors border-b border-gray-800/50 last:border-0"
                                onClick={() => {
                                  setIsSearchModalOpen(false);
                                  router.push(`/qa/${question.id}`);
                                }}
                              >
                                <h4 className="font-medium text-white mb-1">{question.title}</h4>
                                <div className="flex items-center text-xs text-gray-400 space-x-3">
                                  <span className="flex items-center">
                                    <MessageCircle className="h-3 w-3 mr-1" />
                                    {question.answers} answers
                                  </span>
                                  <span className="flex items-center">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {question.votes} votes
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {new Date(question.date).toLocaleDateString()}
                                  </span>
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {question.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-900/30 text-purple-300">
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Answers Section */}
                      {searchResults.answers.length > 0 && (
                        <div>
                          <div className="px-4 py-3 bg-gray-800/30">
                            <div className="flex items-center">
                              <MessageCircle className="h-4 w-4 text-green-400 mr-2" />
                              <h3 className="text-sm font-medium text-gray-300">Answers</h3>
                            </div>
                          </div>
                          <div>
                            {searchResults.answers.map(answer => {
                              // Find the related question
                              const relatedQuestion = sampleQuestions.find(q => q.id === answer.questionId);
                              return (
                                <div 
                                  key={answer.id} 
                                  className="px-4 py-3 hover:bg-green-900/20 cursor-pointer transition-colors border-b border-gray-800/50 last:border-0"
                                  onClick={() => {
                                    setIsSearchModalOpen(false);
                                    router.push(`/qa/${answer.questionId}`);
                                  }}
                                >
                                  <h4 className="font-medium text-gray-300 mb-1 text-sm">
                                    <span className="text-green-400">Answer to:</span> {relatedQuestion?.title}
                                  </h4>
                                  <p className="text-white text-sm line-clamp-2">
                                    {answer.content}
                                  </p>
                                  <div className="flex items-center text-xs text-gray-400 mt-1 space-x-3">
                                    <span className="flex items-center">
                                      <ThumbsUp className="h-3 w-3 mr-1" />
                                      {answer.votes} votes
                                    </span>
                                    <span className="flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {new Date(answer.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* View All Results Button */}
                      <div className="p-3 bg-gray-800/50 text-center">
                        <button 
                          className="w-full py-2 px-4 bg-purple-600/70 hover:bg-purple-600 rounded-lg text-white font-medium transition-colors"
                          onClick={() => {
                            setIsSearchModalOpen(false);
                            // This would typically go to a search results page
                            // For now we'll just close the modal
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
              <Link href="#" className="text-purple-400 hover:text-purple-300 text-sm">
                Ask a Question
              </Link>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">No questions found matching your search.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-700">
                {filteredQuestions.map((question) => (
                  <li key={question.id} className="hover:bg-gray-800/50 transition-colors">
                    <div className="w-full text-left px-6 py-5 cursor-pointer" onClick={() => handleQuestionClick(question.id)}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 flex flex-col items-center mr-4">
                          <ThumbsUp className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-300 font-medium mt-1">{question.votes}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-white mb-2">{question.title}</h3>
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{question.content}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {question.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span>Posted by {question.author}</span>
                            <span className="mx-2">•</span>
                            <span>{question.date}</span>
                            <span className="mx-2">•</span>
                            <span>{question.answers} answers</span>
                            <span className="mx-2">•</span>
                            <span>{question.views} views</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 ml-4 flex items-center">
                          <div className="bg-gray-800 px-2 py-1 rounded-md flex items-center">
                            <MessageCircle className="h-4 w-4 text-purple-400 mr-1" />
                            <span className="text-sm text-gray-300">{question.answers}</span>
                          </div>
                        </div>
                      </div>
                    </div>


                  </li>
                ))}
              </ul>
            )}
          </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Ask Question Button */}
            <div className="mb-6">
              <Link href="#" className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-medium rounded-lg text-center transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/20">
                <HelpCircle className="inline-block h-5 w-5 mr-2 -mt-1" />
                Ask a Question
              </Link>
            </div>
            
            {/* Latest Questions Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <Clock className="h-4 w-4 text-blue-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Latest Questions</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {sampleQuestions.slice(0, 3).map((question) => (
                    <li key={`latest-${question.id}`} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                      <Link href={`/qa/${question.id}`} className="text-sm text-gray-300 hover:text-purple-400 line-clamp-2">
                        {question.title}
                      </Link>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <span>{question.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="#" className="text-xs text-purple-400 hover:text-purple-300 mt-3 inline-block">
                  View all latest questions →
                </Link>
              </div>
            </div>
            
            {/* Most Answered Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <MessageCircle className="h-4 w-4 text-green-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Most Answered</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {[...sampleQuestions].sort((a, b) => b.answers - a.answers).slice(0, 3).map((question) => (
                    <li key={`answered-${question.id}`} className="border-b border-gray-700/50 pb-3 last:border-0 last:pb-0">
                      <Link href={`/qa/${question.id}`} className="text-sm text-gray-300 hover:text-purple-400 line-clamp-2">
                        {question.title}
                      </Link>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <MessageCircle className="h-3 w-3 text-purple-400 mr-1" />
                        <span>{question.answers} answers</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link href="#" className="text-xs text-purple-400 hover:text-purple-300 mt-3 inline-block">
                  View all most answered questions →
                </Link>
              </div>
            </div>
            
            {/* Hot Topics Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <TrendingUp className="h-4 w-4 text-red-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Hot Topics</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(sampleQuestions.flatMap(q => q.tags))).slice(0, 8).map((tag) => (
                    <Link 
                      href={`/qa/tag/${tag}`} 
                      key={`hot-${tag}`}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 hover:bg-purple-800/50 transition-colors"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Top Contributors Panel */}
            <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-gray-700 flex items-center">
                <Award className="h-4 w-4 text-yellow-400 mr-2" />
                <h3 className="text-sm font-semibold text-white">Top Contributors</h3>
              </div>
              <div className="p-4">
                <ul className="space-y-3">
                  {Array.from(new Set([...sampleQuestions.map(q => q.author), ...sampleAnswers.map(a => a.author)])).slice(0, 5).map((author) => (
                    <li key={`contributor-${author}`} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-2 flex items-center justify-center text-xs font-bold">
                          {author.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-gray-300">{author}</span>
                      </div>
                      <div className="bg-purple-900/30 px-1.5 py-0.5 rounded text-xs text-purple-300">
                        {Math.floor(Math.random() * 500) + 100} pts
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
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
    </div>
  );
}
