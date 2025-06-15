import React, { useState } from 'react';
import { Play, Clock, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedVideo({ video }) {
  const { title, thumbnail, videoId, channelName, publishedAt, duration, description } = video;
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Truncate description to 150 characters and add ellipsis
  const truncatedDescription = description && description.length > 150 
    ? description.substring(0, 150) + '...' 
    : description;
    
  // Convert URLs in description to clickable links
  const formatDescription = (text) => {
    if (!text) return '';
    
    // Regular expression to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split by URLs and map to React elements
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={index} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 inline-flex items-center"
          >
            {part.substring(0, 30)}... <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        );
      }
      return part;
    });
  };
  
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video overflow-hidden">
          {!isPlaying ? (
            <>
              <img 
                src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 flex items-center space-x-2 text-sm">
                {duration && (
                  <div className="bg-black/70 text-white px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {duration}
                  </div>
                )}
                
                {publishedAt && (
                  <div className="bg-black/70 text-white px-2 py-1 rounded flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(publishedAt).toLocaleDateString()}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label="Play video"
              >
                <motion.div
                  className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-8 w-8" />
                </motion.div>
              </button>
            </>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          )}
        </div>
        
        <div className="p-6 flex flex-col justify-center">
          <div className="inline-flex items-center mb-4 bg-red-900/30 px-3 py-1 rounded-full">
            <span className="text-red-400 text-sm font-medium">Featured Video</span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          
          {channelName && (
            <div className="text-gray-300 mb-4">
              By <span className="font-medium">{channelName}</span>
            </div>
          )}
          
          {/* Description removed as requested */}
          
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="inline-flex items-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:from-red-500 hover:to-orange-500 transition-colors"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Now
          </a>
        </div>
      </div>
    </motion.div>
  );
}
