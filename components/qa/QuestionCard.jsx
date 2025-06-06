import React from 'react';
import QuestionTags from './QuestionTags';
import QuestionMeta from './QuestionMeta';

export default function QuestionCard({ questionData, enhanceContent }) {
  return (
    <article className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl mb-8">
      <div className="px-6 py-5">
        <h1 
          className="text-2xl font-bold text-white mb-6 leading-tight" 
          id="question-title" 
          dangerouslySetInnerHTML={{ __html: enhanceContent(questionData.question) }}
        />
        
        <QuestionTags tags={questionData.tags} />
        <QuestionMeta 
          username={questionData.username}
          timestamp={questionData.timestamp}
        />
      </div>
    </article>
  );
}
