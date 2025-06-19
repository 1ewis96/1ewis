import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled to prevent hydration issues
const InteractiveQuiz = dynamic(
  () => import('./InteractiveQuiz'),
  { ssr: false }
);

const AutoplayVideoPlayer = dynamic(
  () => import('./AutoplayVideoPlayer'),
  { ssr: false }
);

const CodeBlock = dynamic(
  () => import('./CodeBlock'),
  { ssr: false }
);

/**
 * Renders interactive elements for a section based on their type
 */
export default function SectionInteractiveElements({ interactiveElements = [], isHydrated }) {
  if (!interactiveElements || interactiveElements.length === 0 || !isHydrated) {
    return null;
  }

  return (
    <>
      {interactiveElements.map((element, index) => (
        <motion.div
          key={element.id || `interactive-element-${index}`}
          className="my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index, duration: 0.6 }}
        >
          {element.type === 'quiz' && (
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-lg">
              <InteractiveQuiz quizData={element} />
            </div>
          )}

          {element.type === 'videoPlayer' && (
            <div className="rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={`https://www.youtube.com/embed/${element.videoId}${element.autoplay ? '?autoplay=1' : ''}`}
                  title={element.title || "Video"}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              {element.title && (
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white">{element.title}</h3>
                  {element.description && (
                    <p className="text-gray-400 mt-2">{element.description}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {element.type === 'callToAction' && (
            <div 
              className="p-6 rounded-xl shadow-lg text-center my-8"
              style={{ 
                backgroundColor: element.backgroundColor || '#3d14b4',
                color: element.textColor || '#ffffff'
              }}
            >
              <h3 className="text-xl font-bold mb-4">{element.text}</h3>
              <a 
                href={element.url} 
                className="inline-block px-6 py-3 rounded-full bg-white text-blue-900 font-medium hover:bg-gray-100 transition-colors shadow-md"
              >
                {element.buttonText || "Learn More"}
              </a>
            </div>
          )}

          {element.type === 'codeBlock' && (
            <div className="rounded-lg overflow-hidden bg-gray-900 border border-gray-700">
              <div className="px-4 py-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
                <span className="text-sm font-mono text-gray-400">{element.language || "code"}</span>
                <button 
                  className="text-gray-400 hover:text-white transition-colors" 
                  onClick={() => navigator.clipboard.writeText(element.code)}
                  aria-label="Copy code"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="font-mono text-sm text-gray-300 whitespace-pre">{element.code}</code>
              </pre>
            </div>
          )}
        </motion.div>
      ))}
    </>
  );
}
