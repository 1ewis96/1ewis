import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AutoplayVideoPlayer({ onClose }) {
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Default video for autoplay
  const defaultVideo = {
    videoId: 'jxeeKKfjb5o', // Bitcoin explained video
    title: 'What is Bitcoin? Crypto Explained'
  };
  
  // Mark component as mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Load saved preferences when component mounts (client-side only)
  useEffect(() => {
    if (isMounted) {
      try {
        const savedMinimized = localStorage.getItem('autoplayPlayer_minimized');
        const savedMuted = localStorage.getItem('autoplayPlayer_muted');
        
        if (savedMinimized) setIsMinimized(savedMinimized === 'true');
        if (savedMuted) setIsMuted(savedMuted === 'true');
      } catch (err) {
        console.log('Error loading player preferences', err);
      }
    }
  }, [isMounted]);
  
  // Save preferences when they change (client-side only)
  useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('autoplayPlayer_minimized', isMinimized);
        localStorage.setItem('autoplayPlayer_muted', isMuted);
      } catch (err) {
        console.log('Error saving player preferences', err);
      }
    }
  }, [isMinimized, isMuted, isMounted]);
  
  // Auto-close after 5 minutes if user doesn't interact
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 5 * 60 * 1000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <motion.div
      className={`fixed bottom-4 right-4 z-50 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden ${
        isMinimized ? 'w-72' : 'w-80 sm:w-96'
      }`}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-900/80 to-purple-900/80 px-3 py-2">
        <h3 className="text-sm font-medium text-white truncate">{defaultVideo.title}</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-300 hover:text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          {isMinimized ? (
            <button 
              onClick={() => setIsMinimized(false)}
              className="text-gray-300 hover:text-white"
              aria-label="Maximize"
            >
              <Maximize2 size={16} />
            </button>
          ) : (
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-gray-300 hover:text-white"
              aria-label="Minimize"
            >
              <Minimize2 size={16} />
            </button>
          )}
          
          <button 
            onClick={onClose}
            className="text-gray-300 hover:text-red-500"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Video */}
      <div className={`relative ${isMinimized ? 'h-40' : 'h-52 sm:h-56'}`}>
        <iframe
          src={`https://www.youtube.com/embed/${defaultVideo.videoId}?autoplay=1&rel=0&mute=${isMuted ? 1 : 0}`}
          title={defaultVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800 px-3 py-2 text-xs text-gray-400 flex items-center justify-between">
        <span>Recommended for you</span>
        <a 
          href={`https://www.youtube.com/watch?v=${defaultVideo.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-300"
        >
          Watch on YouTube
        </a>
      </div>
    </motion.div>
  );
}
