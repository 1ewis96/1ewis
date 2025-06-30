import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Play, Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';
import shortsData from '../data/shorts.json';

const ShortsVideoSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const sliderRef = useRef(null);
  const [shorts, setShorts] = useState([]);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // Load shorts from JSON file
  useEffect(() => {
    setShorts(shortsData.shorts.map(short => ({
      ...short,
      // Extract video ID from YouTube URL for embedding
      videoId: short.id,
      // Generate thumbnail URL from YouTube video ID
      thumbnailUrl: `https://i.ytimg.com/vi/${short.id}/maxresdefault.jpg`,
      // Set a placeholder duration
      duration: "0:60"
    })));
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % shorts.length);
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + shorts.length) % shorts.length);
  };

  const openFullscreen = (short) => {
    // Only open fullscreen for real shorts, not placeholders
    if (short.id.startsWith('placeholder')) {
      return;
    }
    
    const index = shorts.findIndex(s => s.id === short.id);
    setFullscreenIndex(index);
    setFullscreenVideo(short);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
    document.body.style.overflow = 'auto';
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const nextFullscreenVideo = () => {
    const nextIndex = (fullscreenIndex + 1) % shorts.length;
    setFullscreenIndex(nextIndex);
    setFullscreenVideo(shorts[nextIndex]);
  };
  
  const prevFullscreenVideo = () => {
    const prevIndex = (fullscreenIndex - 1 + shorts.length) % shorts.length;
    setFullscreenIndex(prevIndex);
    setFullscreenVideo(shorts[prevIndex]);
  };

  return (
    <div className="relative w-full">
      {/* Slider navigation */}
      <div className="relative">
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm"
          aria-label="Previous short"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <div ref={sliderRef} className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {shorts.map((short) => (
              <div 
                key={short.id} 
                className="min-w-full md:min-w-[33.333%] lg:min-w-[25%] px-2"
              >
                <div 
                  className="bg-gray-900 rounded-lg overflow-hidden relative cursor-pointer group"
                  onClick={() => openFullscreen(short)}
                >
                  {/* YouTube thumbnail or placeholder */}
                  <div className="aspect-[9/16] relative">
                    {short.id.startsWith('placeholder') ? (
                      // Placeholder thumbnail
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm mx-auto mb-2">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-white text-sm font-medium">{short.title}</p>
                          <p className="text-gray-400 text-xs mt-1">Coming Soon</p>
                        </div>
                      </div>
                    ) : (
                      // Real YouTube thumbnail
                      <>
                        <img 
                          src={short.thumbnailUrl} 
                          alt={short.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        
                        {/* YouTube icon badge */}
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs p-1 rounded">
                          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                          </svg>
                        </div>
                        
                        {/* Duration badge */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          {short.duration}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Short title */}
                  <div className="p-3">
                    <h4 className="text-sm font-medium text-white truncate">{short.title}</h4>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm"
          aria-label="Next short"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      
      {/* Fullscreen short modal */}
      <AnimatePresence>
        {fullscreenVideo && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" />
            </button>
            
            <button 
              onClick={toggleMute}
              className="absolute top-4 left-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
            
            <div className="w-full h-full max-w-md mx-auto relative">
              {/* YouTube Shorts Embed */}
              <div className="aspect-[9/16] w-full h-full relative">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${fullscreenVideo.id}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title={fullscreenVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Video title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-lg font-bold text-white">{fullscreenVideo.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{fullscreenVideo.description}</p>
                </div>
              </div>
              
              {/* Vertical navigation controls */}
              <button
                onClick={prevFullscreenVideo}
                className="absolute top-1/4 left-1/2 -translate-x-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                aria-label="Previous short"
              >
                <ChevronUp className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextFullscreenVideo}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm"
                aria-label="Next short"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShortsVideoSlider;
