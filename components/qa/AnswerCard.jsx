import React from 'react';
import { User, Calendar, ThumbsUp } from 'lucide-react';

export default function AnswerCard({ answer, enhanceContent }) {
  return (
    <div className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-lg transition-all hover:border-purple-700/50">
      <div className="px-6 py-5">
        <p 
          className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: enhanceContent(answer.answer) }}
        />
        
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1.5 text-purple-400" />
              <span>{answer.username}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 text-purple-400" />
              {answer.timestamp ? (
                <span>
                  {new Date(answer.timestamp).toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              ) : (
                <span>Date unavailable</span>
              )}
            </div>
          </div>
          <div className="flex items-center mt-2 sm:mt-0 cursor-pointer hover:text-purple-400 transition-colors">
            <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
            <span>Helpful</span>
          </div>
        </div>
      </div>
    </div>
  );
}
