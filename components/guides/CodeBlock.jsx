import React, { useState } from 'react';
import { Check } from 'lucide-react';

/**
 * CodeBlock component for displaying formatted code with syntax highlighting
 */
export default function CodeBlock({ language = 'javascript', code = '', showCopy = true }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
      {(language || showCopy) && (
        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          {language && <span className="text-sm font-mono text-gray-400">{language}</span>}
          
          {showCopy && (
            <button 
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1" 
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="text-xs">Copied!</span>
                </>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          )}
        </div>
      )}
      
      <pre className="p-4 overflow-x-auto">
        <code className="font-mono text-sm text-gray-300 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}
