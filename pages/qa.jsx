import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, ThumbsUp, MessageCircle } from 'lucide-react';
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
  const router = useRouter();

  // Filter questions based on search query
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
        <div className="max-w-3xl mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-700 rounded-lg bg-gray-800/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Search questions by keyword, topic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Question List */}
        <div className="max-w-4xl mx-auto">
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
      </main>

      <Footer />
    </div>
  );
}
