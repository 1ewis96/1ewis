import React, { useState, useEffect } from 'react';
import { X, Minimize2, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingVideoPlayer({ video, onClose }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  // Load saved preferences when component mounts
  useEffect(() => {
    try {
      const savedMinimized = localStorage.getItem('floatingPlayer_minimized');
      const savedMuted = localStorage.getItem('floatingPlayer_muted');
      const savedPosition = localStorage.getItem('floatingPlayer_position');
      
      if (savedMinimized) setIsMinimized(savedMinimized === 'true');
      if (savedMuted) setIsMuted(savedMuted === 'true');
      if (savedPosition) setPosition(JSON.parse(savedPosition));
    } catch (err) {
      console.log('Error loading player preferences', err);
    }
  }, []);
  
  // Save preferences when they change
  useEffect(() => {
    try {
      localStorage.setItem('floatingPlayer_minimized', isMinimized);
      localStorage.setItem('floatingPlayer_muted', isMuted);
    } catch (err) {
      console.log('Error saving player preferences', err);
    }
  }, [isMinimized, isMuted]);
  
  // We'll simplify and not save position for now to ensure visibility
  const handleDragEnd = () => {
    // Position saving disabled to fix visibility issues
  };
  
  if (!video) return null;
  
  return (
    <motion.div
      className={`fixed bottom-4 right-4 z-50 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden ${
        isMinimized ? 'w-72' : 'w-80 sm:w-96'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', damping: 20 }}
      drag
      dragConstraints={{
        top: -500,
        left: -1000,
        right: 20,
        bottom: 20
      }}
      dragElastic={0.2}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 px-3 py-2 cursor-move handle">
        <h3 className="text-sm font-medium text-white truncate">{video.title}</h3>
        <div className="flex items-center space-x-2">
          {isMinimized ? (
            <button 
              onClick={() => setIsMinimized(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Maximize"
            >
              <Maximize2 size={16} />
            </button>
          ) : (
            <button 
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-white"
              aria-label="Minimize"
            >
              <Minimize2 size={16} />
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      {/* Video */}
      <div className={`relative ${isMinimized ? 'h-40' : 'h-52 sm:h-56'}`}>
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&mute=${isMuted ? 1 : 0}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
        
        {/* Controls overlay */}
        <div className="absolute bottom-2 right-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-black/70 text-white p-1 rounded-full hover:bg-black"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
