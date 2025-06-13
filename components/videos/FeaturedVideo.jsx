import React from 'react';
import { Play, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FeaturedVideo({ video }) {
  const { title, thumbnail, videoId, channelName, publishedAt, duration, description } = video;
  
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-video overflow-hidden">
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
          
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer" 
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.div
              className="bg-red-600 hover:bg-red-700 text-white p-5 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="h-8 w-8" />
            </motion.div>
          </a>
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
          
          {description && (
            <p className="text-gray-400 mb-6">{description}</p>
          )}
          
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
