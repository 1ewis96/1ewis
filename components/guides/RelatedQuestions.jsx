import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, TrendingUp, Clock, ArrowRight } from 'lucide-react';

const RelatedQuestions = ({ guide }) => {
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedQuestions = async () => {
      try {
        setLoading(true);
        
        // Get the first tag from the guide if available
        let searchQuery = '';
        if (guide && guide.tags && guide.tags.length > 0) {
          searchQuery = guide.tags[0];
        } else if (guide && guide.category) {
          // Fallback to category if no tags
          searchQuery = guide.category;
        } else {
          // Default fallback
          searchQuery = 'cryptocurrency';
        }
        
        const response = await fetch(`https://api.1ewis.com/questions/search?query=${encodeURIComponent(searchQuery)}&page=1&limit=8`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch related questions: ${response.status}`);
        }
        
        const data = await response.json();
        setRelatedQuestions(data.results || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching related questions:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchRelatedQuestions();
  }, [guide]);

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
            <h3 className="text-base font-semibold text-white">Related Questions</h3>
          </div>
          <span className="bg-cyan-500/20 text-cyan-300 text-xs px-1.5 py-0.5 rounded-full">
            Q&A
          </span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-700/50">
        {loading ? (
          // Loading state
          <div className="p-4 text-center">
            <div className="inline-block w-5 h-5 border-2 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-400">Loading questions...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="p-4 text-center">
            <p className="text-sm text-red-400">Failed to load questions</p>
          </div>
        ) : relatedQuestions.length === 0 ? (
          // Empty state
          <div className="p-4 text-center">
            <p className="text-sm text-gray-400">No related questions found</p>
          </div>
        ) : (
          // Questions list
          relatedQuestions.map((question) => (
            <motion.div 
              key={question.PK || question.SK}
              className="p-2.5 hover:bg-gray-800/30 transition-colors"
              whileHover={{ x: 3 }}
            >
              <Link href={`/qa/${question.PK}`} className="block">
                <h4 className="text-gray-100 font-medium mb-1 text-sm line-clamp-2 hover:text-cyan-300 transition-colors">
                  {question.question}
                </h4>
                <div className="flex items-center text-xs text-gray-400 space-x-3">
                  <div className="flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>{question.answerCount || 0} answers</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{formatTimestamp(question.timestamp)}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
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

// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}w ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months}m ago`;
  }
};

export default RelatedQuestions;
