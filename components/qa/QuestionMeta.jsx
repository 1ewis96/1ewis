import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';

export default function QuestionMeta({ username, timestamp }) {
  return (
    <div className="flex flex-wrap items-center justify-between text-sm text-gray-400 border-t border-gray-700/50 pt-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-1.5 text-purple-400" />
          <span>{username}</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1.5 text-purple-400" />
          {timestamp ? (
            <span>
              {new Date(timestamp).toLocaleDateString(undefined, { 
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
      <div className="flex items-center mt-2 sm:mt-0">
        <Clock className="h-4 w-4 mr-1 text-gray-500" />
        {timestamp && (
          <span>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        )}
      </div>
    </div>
  );
}
