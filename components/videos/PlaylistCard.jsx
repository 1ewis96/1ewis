import React from 'react';
import { ListVideo, ExternalLink, Film } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlaylistCard({ playlist }) {
  const { title, thumbnail, playlistId, channelName, videoCount, description } = playlist;
  
  return (
    <motion.div 
      className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300 h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 30px -15px rgba(59, 130, 246, 0.5)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden bg-gray-800">
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/50">
          <a 
            href={`https://www.youtube.com/playlist?list=${playlistId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full transition-transform duration-300 transform hover:scale-110"
          >
            <ListVideo className="h-6 w-6" />
          </a>
        </div>
        
        {videoCount && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
            <Film className="h-3 w-3 mr-1" />
            {videoCount} videos
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="inline-flex items-center mb-2 bg-blue-900/30 px-2 py-1 rounded-md text-xs text-blue-300 font-medium">
          <ListVideo className="h-3 w-3 mr-1" />
          Playlist
        </div>
        
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
        
        {channelName && (
          <div className="text-sm text-gray-400 mb-3">
            <span className="font-medium">{channelName}</span>
          </div>
        )}
        
        {description && (
          <p className="text-gray-400 text-sm line-clamp-3 mb-4">{description}</p>
        )}
        
        <div className="mt-auto">
          <a 
            href={`https://www.youtube.com/playlist?list=${playlistId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center transition-colors"
          >
            View Playlist <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
