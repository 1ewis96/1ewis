import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ThumbsUp, MessageCircle } from 'lucide-react';
import Footer from '../../components/Footer';

// Sample question data (will be replaced with API)
const questionData = {
  1: {
    title: "What is the best crypto wallet for beginners?",
    content: "I'm new to cryptocurrency and looking for a wallet that's easy to use but also secure. Any recommendations?",
    author: "cryptonewbie",
    date: "2025-05-28",
    votes: 24,
    views: 156,
    tags: ["wallets", "beginners"],
    answers: [
      {
        id: 101,
        content: "For beginners, I'd recommend Exodus wallet. It has a user-friendly interface, supports multiple cryptocurrencies, and has good security features.",
        author: "walletexpert",
        date: "2025-05-28",
        votes: 18
      },
      {
        id: 102,
        content: "I think MetaMask is great for beginners, especially if you're interested in using DeFi applications. It's a browser extension that's easy to set up and use.",
        author: "defilover",
        date: "2025-05-29",
        votes: 12
      }
    ]
  },
  2: {
    title: "How to calculate crypto taxes in the UK?",
    content: "I've been trading crypto for about a year now and need to understand how taxes work in the UK. Any resources or tips?",
    author: "uktrader",
    date: "2025-05-30",
    votes: 18,
    views: 102,
    tags: ["taxes", "uk", "trading"],
    answers: [
      {
        id: 201,
        content: "In the UK, crypto is subject to capital gains tax when you sell or exchange it. You need to keep track of each transaction and calculate your gain or loss.",
        author: "taxadviser",
        date: "2025-05-30",
        votes: 15
      }
    ]
  },
  3: {
    title: "Difference between hot and cold wallets?",
    content: "Can someone explain the key differences between hot and cold wallets, and when I should use each type?",
    author: "securityminded",
    date: "2025-06-01",
    votes: 31,
    views: 203,
    tags: ["wallets", "security"],
    answers: [
      {
        id: 301,
        content: "Hot wallets are connected to the internet making them convenient but less secure. Cold wallets are offline hardware devices that provide maximum security but less convenience.",
        author: "cryptosecurity",
        date: "2025-06-01",
        votes: 28
      }
    ]
  }
};

export default function QuestionDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  // Get question data
  const question = id ? questionData[id] : null;
  
  // Handle back button
  const handleBack = () => {
    router.push('/qa');
  };
  
  // Loading state
  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-32 px-4">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={handleBack}
            className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Questions
          </button>
          <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-8 text-center">
            <p className="text-gray-400">Loading question...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>{question.title} | Crypto Q&A | 1ewis.com</title>
        <meta name="description" content={question.content.substring(0, 160)} />
      </Head>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 max-w-4xl mx-auto">
        <button 
          onClick={handleBack}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Questions
        </button>
        
        {/* Question */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl mb-8">
          <div className="px-6 py-5">
            <h1 className="text-2xl font-bold text-white mb-4">{question.title}</h1>
            <p className="text-gray-300 mb-6">{question.content}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div>
                <span>Posted by {question.author}</span>
                <span className="mx-2">•</span>
                <span>{question.date}</span>
              </div>
              <div className="flex items-center">
                <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                <span className="mr-4">{question.votes}</span>
                <span>{question.views} views</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Answers */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
            {question.answers.length} Answers
          </h2>
          
          <div className="space-y-6">
            {question.answers.map((answer) => (
              <div key={answer.id} className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg">
                <div className="px-6 py-5">
                  <p className="text-gray-300 mb-4">{answer.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div>
                      <span>Answered by {answer.author}</span>
                      <span className="mx-2">•</span>
                      <span>{answer.date}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{answer.votes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Answer Form Placeholder */}
        <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl">
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium text-white mb-4">Your Answer</h3>
            <div className="w-full bg-gray-900 border border-gray-700 rounded-lg p-4 text-gray-500">
              Answer form will be implemented with API integration
            </div>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
                disabled
              >
                Post Your Answer
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
