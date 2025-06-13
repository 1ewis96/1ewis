import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function FloatingCTA({ onClose }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50 max-w-md"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5, type: "spring" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="flex items-center justify-between bg-black/90 backdrop-blur-md rounded-xl overflow-hidden border border-gray-800/50 shadow-lg shadow-black/30 pr-3"
        animate={{
          boxShadow: isHovered ? '0 10px 25px -5px rgba(0, 0, 0, 0.4)' : '0 4px 15px -3px rgba(0, 0, 0, 0.3)',
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Decorative elements */}
        <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 rounded-full blur-lg transform -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="flex-1 px-5 py-4">
          <h3 className="text-white font-medium text-lg flex items-center">
            <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            FEATURED EXCHANGE
          </h3>
          <p className="text-gray-400 text-sm mt-1">Join Bitrue for the best crypto trading experience</p>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.a 
            href="/bitrue" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 shadow-md shadow-blue-900/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Now
          </motion.a>
          
          {onClose && (
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
