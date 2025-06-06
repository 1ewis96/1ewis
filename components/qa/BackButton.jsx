import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center text-purple-400 hover:text-purple-300 mb-6"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Questions
    </button>
  );
}
