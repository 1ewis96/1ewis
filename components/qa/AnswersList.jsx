import React from 'react';
import { MessageCircle } from 'lucide-react';
import AnswerCard from './AnswerCard';

export default function AnswersList({ answers = [], enhanceContent }) {
  return (
    <section className="mb-8" aria-labelledby="answers-heading">
      <h2 id="answers-heading" className="text-xl font-semibold text-white mb-6 flex items-center border-b border-gray-700/50 pb-3">
        <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
        {answers.length} Answers
      </h2>
      
      <div className="space-y-6">
        {answers && answers.map((answer) => (
          <AnswerCard 
            key={answer.SK} 
            answer={answer} 
            enhanceContent={enhanceContent} 
          />
        ))}
      </div>
    </section>
  );
}
