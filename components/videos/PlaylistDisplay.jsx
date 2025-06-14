import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Play, Clock } from 'lucide-react';

export default function PlaylistDisplay({ playlist }) {
  const [expanded, setExpanded] = useState(false);
  const { title, description, thumbnail, videos, id } = playlist;

  return (
    <motion.div 
      className="bg-black/60 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 relative">
          <img 
            src={thumbnail || (videos && videos.length > 0 ? `https://img.youtube.com/vi/${videos[0].videoId}/maxresdefault.jpg` : '')} 
            alt={title} 
            className="w-full h-full object-cover aspect-video md:aspect-auto"
          />
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {videos ? videos.length : 0} videos
          </div>
        </div>
        
        <div className="p-6 md:w-2/3 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide videos
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-1" />
                  Show videos
                </>
              )}
            </button>
            
            <a 
              href={`https://www.youtube.com/playlist?list=${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              View Playlist
            </a>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && videos && videos.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-4 py-2">
              <p className="text-sm font-medium text-gray-300 mb-2">Videos in this playlist:</p>
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {videos.map((video, index) => (
                  <a 
                    key={video.videoId} 
                    href={`https://www.youtube.com/watch?v=${video.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-2 hover:bg-white/5 rounded-lg group"
                  >
                    <div className="w-24 h-16 relative flex-shrink-0 mr-3">
                      <img 
                        src={video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover rounded"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-6 h-6 text-white" fill="white" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">{video.title}</p>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        {video.duration && (
                          <div className="flex items-center mr-3">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{video.duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
