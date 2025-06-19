import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, Clock, ArrowRight } from 'lucide-react';

const RelatedQuestions = () => {
  // Example data - this would be replaced with API data in the future
  const relatedQuestions = [
    {
      id: 'q1',
      title: 'What is the difference between Bitcoin and Ethereum?',
      answers: 24,
      timestamp: '2d ago'
    },
    {
      id: 'q2',
      title: 'How do I set up a hardware wallet for my crypto?',
      answers: 18,
      timestamp: '3d ago'
    },
    {
      id: 'q3',
      title: 'What are the tax implications of trading cryptocurrency?',
      answers: 15,
      timestamp: '1w ago'
    },
    {
      id: 'q4',
      title: 'How do smart contracts work on blockchain?',
      answers: 12,
      timestamp: '5d ago'
    }
  ];

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/50 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-2.5 border-b border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 text-cyan-400 mr-2" />
            <h3 className="text-base font-semibold text-white">Popular Questions</h3>
          </div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs px-1.5 py-0.5 rounded-full">
            Q&A
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-700/50">
        {relatedQuestions.map((question) => (
          <motion.div 
            key={question.id}
            className="p-2.5 hover:bg-gray-800/30 transition-colors"
            whileHover={{ x: 3 }}
          >
            <Link href="/qa" className="block">
              <h4 className="text-gray-100 font-medium mb-1 text-sm line-clamp-2 hover:text-cyan-300 transition-colors">
                {question.title}
              </h4>
              <div className="flex items-center text-xs text-gray-400 space-x-3">
                <div className="flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>{question.answers} answers</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{question.timestamp}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="p-2.5 bg-gray-800/30 border-t border-gray-700/50">
        <Link 
          href="/qa" 
          className="flex items-center justify-center text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
        >
          View All Questions
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default RelatedQuestions;
