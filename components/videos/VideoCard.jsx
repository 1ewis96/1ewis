import React from 'react';
import { Play, Clock, Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VideoCard({ video }) {
  const { title, thumbnail, videoId, channelName, publishedAt, duration, description } = video;
  
  return (
    <motion.div 
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(124, 58, 237, 0.5)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-gray-800">
          <img 
            src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-transform duration-300 transform hover:scale-110"
          >
            <Play className="h-6 w-6" />
          </a>
        </div>
        
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {duration}
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-gray-400 mb-3">
          <span className="font-medium">{channelName}</span>
          {publishedAt && (
            <>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {new Date(publishedAt).toLocaleDateString()}
              </div>
            </>
          )}
        </div>
        
        {description && (
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">{description}</p>
        )}
        
        <div className="mt-auto">
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center transition-colors"
          >
            Watch on YouTube <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
