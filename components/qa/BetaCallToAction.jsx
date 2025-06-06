import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function BetaCallToAction({ onJoinClick }) {
  return (
    <section className="bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden shadow-xl" aria-labelledby="answer-form-heading">
      <div className="px-6 py-8 text-center">
        <h3 id="answer-form-heading" className="text-lg font-medium text-white mb-5 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
          Your Answer
        </h3>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-900/50 mb-4">
          <MessageCircle className="h-8 w-8 text-purple-400" />
        </div>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          This feature is currently available to beta testers only. Join our beta program to start answering questions and helping the community.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center"
            onClick={onJoinClick}
          >
            Join Beta Program
          </button>
          <button
            className="px-5 py-2.5 bg-transparent border border-gray-600 hover:border-purple-500 text-gray-300 hover:text-purple-400 rounded-md transition-colors flex items-center justify-center"
            onClick={() => window.open('https://1ewis.com/faq', '_blank')}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
