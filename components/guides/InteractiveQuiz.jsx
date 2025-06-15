import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Award, ArrowRight, RefreshCw, Loader } from 'lucide-react';

// Default quiz data in case none is provided
const defaultQuizData = {
  title: 'Cryptocurrency Quiz',
  description: 'Test your knowledge about cryptocurrencies',
  questions: [
    {
      question: 'Who created Bitcoin?',
      answers: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charlie Lee', 'Nick Szabo'],
      correctAnswer: 1
    },
    {
      question: 'What consensus mechanism does Bitcoin use?',
      answers: ['Proof of Stake', 'Delegated Proof of Stake', 'Proof of Work', 'Proof of Authority'],
      correctAnswer: 2
    },
    {
      question: 'What is a blockchain?',
      answers: ['A centralized database', 'A distributed ledger', 'A programming language', 'A type of cryptocurrency'],
      correctAnswer: 1
    }
  ]
};

export default function InteractiveQuiz({ quizId, quizData: propQuizData }) {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Mock quiz data store - in a real app, this would be fetched from an API
  const mockQuizStore = {
    'crypto-basics': {
      title: 'Cryptocurrency Basics',
      description: 'Test your knowledge of cryptocurrency fundamentals',
      questions: [
        {
          question: 'What year was Bitcoin created?',
          answers: ['2007', '2008', '2009', '2010'],
          correctAnswer: 2
        },
        {
          question: 'Which of these is NOT a cryptocurrency?',
          answers: ['Ethereum', 'Litecoin', 'Blockchain', 'Dogecoin'],
          correctAnswer: 2
        },
        {
          question: 'What is the maximum supply of Bitcoin?',
          answers: ['1 million', '10 million', '21 million', 'Unlimited'],
          correctAnswer: 2
        },
        {
          question: 'What does DeFi stand for?',
          answers: ['Decentralized Finance', 'Digital Finance', 'Distributed Funding', 'Direct Financial Investment'],
          correctAnswer: 0
        },
        {
          question: 'Which of these is a privacy-focused cryptocurrency?',
          answers: ['Bitcoin', 'Ethereum', 'Monero', 'Cardano'],
          correctAnswer: 2
        }
      ]
    },
    'blockchain-tech': {
      title: 'Blockchain Technology',
      description: 'Test your understanding of blockchain technology',
      questions: [
        {
          question: 'What is a block in a blockchain?',
          answers: ['A type of cryptocurrency', 'A collection of transactions', 'A mining computer', 'A digital wallet'],
          correctAnswer: 1
        },
        {
          question: 'What is a smart contract?',
          answers: ['A legal document', 'Self-executing code on a blockchain', 'A type of wallet', 'A trading algorithm'],
          correctAnswer: 1
        },
        {
          question: 'Which blockchain was the first to implement smart contracts?',
          answers: ['Bitcoin', 'Ethereum', 'Litecoin', 'Ripple'],
          correctAnswer: 1
        }
      ]
    }
  };

  // Load quiz data based on quizId or use provided data
  useEffect(() => {
    // Only run this effect on the client side
    if (!isMounted) return;

    if (propQuizData) {
      setQuizData(propQuizData);
      setLoading(false);
      return;
    }

    if (quizId) {
      // Simulate API fetch with timeout
      setTimeout(() => {
        const quiz = mockQuizStore[quizId];
        if (quiz) {
          setQuizData(quiz);
          setLoading(false);
        } else {
          setError(`Quiz with ID "${quizId}" not found`);
          setQuizData(defaultQuizData); // Fallback to default quiz
          setLoading(false);
        }
      }, 800);
    } else {
      setQuizData(defaultQuizData);
      setLoading(false);
    }
  }, [quizId, propQuizData, isMounted]);

  const handleAnswerClick = (answerIndex) => {
    if (answered || !quizData?.questions) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    // Check if answer is correct
    if (answerIndex === quizData.questions[currentQuestion]?.correctAnswer) {
      setScore(score + 1);
    }
    
    // Auto-advance to next question after a delay
    if (quizData?.questions && currentQuestion < quizData.questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      }, 1500);
    } else if (quizData?.questions) {
      // Show results after the last question
      setTimeout(() => {
        setShowResults(true);
      }, 1500);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswered(false);
  };
  
  // Calculate percentage score
  const percentage = quizData?.questions?.length ? Math.round((score / quizData.questions.length) * 100) : 0;
  
  // Get feedback based on score
  const getFeedback = () => {
    if (!quizData?.questions?.length) {
      return {
        message: 'Quiz data is loading...',
        icon: '⏳',
        color: 'text-blue-400'
      };
    }
    
    if (percentage >= 80) {
      return {
        message: 'Excellent! You really know your crypto!',
        icon: '🏆',
        color: 'text-green-400'
      };
    } else if (percentage >= 60) {
      return {
        message: 'Good job! You have solid knowledge.',
        icon: '👍',
        color: 'text-blue-400'
      };
    } else if (percentage >= 40) {
      return {
        message: 'Not bad, but there\'s room for improvement.',
        icon: '📚',
        color: 'text-yellow-400'
      };
    } else {
      return {
        message: 'Keep learning! Crypto can be complex.',
        icon: '🔍',
        color: 'text-red-400'
      };
    }
  };
  
  // If no quiz data is available yet, return null or loading state
  if (!quizData && !loading && !error) {
    return null;
  }
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      <div className="p-4 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">
          {loading ? 'Loading Quiz...' : quizData?.title || 'Quiz'}
        </h3>
        <p className="text-sm text-gray-400">
          {loading ? 'Please wait' : quizData?.description || 'Test your knowledge'}
        </p>
      </div>
      
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Loading quiz questions...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-2">{error}</p>
            <p className="text-gray-400">Using default quiz instead.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {showResults && quizData?.questions ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
                    <span className="text-3xl">{getFeedback().icon}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Quiz Complete!</h3>
                <p className={`text-lg font-medium mb-1 ${getFeedback().color}`}>
                  You scored {score} out of {quizData.questions.length} ({percentage}%)
                </p>
                <p className="text-gray-400">{getFeedback().message}</p>
              </div>
              
              <motion.button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="inline mr-2 h-4 w-4" />
                Restart Quiz
              </motion.button>
            </motion.div>
          ) : quizData?.questions && currentQuestion < quizData.questions.length ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{currentQuestion + 1} of {quizData.questions.length}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Question */}
              <h3 className="text-xl font-medium mb-6 text-white">
                {quizData.questions[currentQuestion]?.question}
              </h3>
              
              {/* Answer options */}
              <div className="space-y-3">
                {quizData.questions[currentQuestion]?.answers?.map((answer, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedAnswer === null
                        ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600'
                        : selectedAnswer === index
                          ? index === quizData.questions[currentQuestion]?.correctAnswer
                            ? 'bg-green-900/30 border-green-700'
                            : 'bg-red-900/30 border-red-700'
                          : index === quizData.questions[currentQuestion]?.correctAnswer && answered
                            ? 'bg-green-900/30 border-green-700'
                            : 'bg-gray-800/50 border-gray-700 opacity-50'
                    }`}
                    whileHover={!answered ? { scale: 1.01 } : {}}
                    whileTap={!answered ? { scale: 0.99 } : {}}
                    disabled={answered}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{answer}</span>
                      {answered && (
                        index === quizData.questions[currentQuestion]?.correctAnswer ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : selectedAnswer === index ? (
                          <X className="w-5 h-5 text-red-400" />
                        ) : null
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
              
              {/* Navigation */}
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-400">
                  {answered ? (
                    currentQuestion < quizData.questions.length - 1 ? (
                      <span>Next question in a moment...</span>
                    ) : (
                      <span>Loading results...</span>
                    )
                  ) : (
                    <span>Select an answer</span>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader className="w-8 h-8 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-400">Loading quiz data...</p>
            </div>
          )}
        </AnimatePresence>
        )}  {/* This closes the loading/error/quiz content conditional */}
      </div>
    </div>
  );
}
