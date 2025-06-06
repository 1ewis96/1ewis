import React from 'react';
import { ArrowLeft } from 'lucide-react';
import BackButton from './BackButton';

export default function LoadingState({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pt-32 px-4">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={onBack} />
        <div className="bg-gray-800/30 rounded-lg border border-gray-700 p-8 text-center">
          <p className="text-gray-400">Loading question...</p>
        </div>
      </div>
    </div>
  );
}
