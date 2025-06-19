import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SponsoredPanel = () => {
  const [sponsored, setSponsored] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSponsored = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.1ewis.com/analytics/sidebar/sponsored');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch sponsored content: ${response.status}`);
        }
        
        const data = await response.json();
        setSponsored(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sponsored content:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchSponsored();
  }, []);

  if (loading) {
    return (
      <motion.div 
        className="relative bg-gradient-to-br from-purple-900/80 to-indigo-900/80 rounded-xl overflow-hidden shadow-lg border border-purple-700/30 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-purple-700/50 rounded w-1/4"></div>
          <div className="h-6 bg-purple-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-purple-700/50 rounded w-full"></div>
          <div className="h-4 bg-purple-700/50 rounded w-5/6"></div>
          <div className="h-10 bg-purple-700/50 rounded w-1/2"></div>
        </div>
      </motion.div>
    );
  }

  if (error || !sponsored) {
    // Fallback to default content if there's an error
    return (
      <motion.div 
        className="relative bg-gradient-to-br from-purple-900/80 to-indigo-900/80 rounded-xl overflow-hidden shadow-lg border border-purple-700/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ y: -3, boxShadow: '0 20px 25px -5px rgba(76, 29, 149, 0.2), 0 10px 10px -5px rgba(76, 29, 149, 0.1)' }}
      >
        {/* Ad Content */}
        <div className="p-6 relative z-10">
          <div className="bg-white/10 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md inline-block mb-3 border border-white/10">SPONSORED</div>
          <h3 className="text-xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">Trade Bitcoin with zero fees</h3>
          <p className="text-gray-200 text-sm mb-4">Join over 10 million users trading cryptocurrencies with the lowest fees in the industry.</p>
          
          <motion.a 
            href="https://example.com/crypto-exchange" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-gradient-to-r from-purple-600/80 to-indigo-600/80 text-white font-medium px-4 py-2 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all group shadow-md shadow-purple-900/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Trading</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <p className="text-xs text-gray-300 mt-3">*Terms and conditions apply</p>
        </div>
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        
        {/* Crypto Icon Pattern */}
        <div className="absolute inset-0 opacity-5 bg-repeat" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3Cpath d=\'M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3Cpath d=\'M12 17H12.01\' stroke=\'white\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")' }}></div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative bg-gradient-to-br from-violet-900/90 to-indigo-900/90 rounded-xl overflow-hidden shadow-xl border border-violet-500/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -3, boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 10px -5px rgba(139, 92, 246, 0.2)' }}
    >
      {/* Animated Glow Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '7s' }}></div>
        <div className="absolute -bottom-32 -left-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      {/* Diagonal Accent Line */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-violet-400 to-fuchsia-400 transform rotate-12 translate-y-4 translate-x-8 opacity-70"></div>
      
      {/* Sponsored Badge */}
      <div className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full border border-white/20 shadow-sm flex items-center">
        <span className="w-1.5 h-1.5 bg-violet-400 rounded-full mr-1.5 animate-pulse"></span>
        <span className="text-white/90 tracking-wide">SPONSORED</span>
      </div>
      
      {/* Ad Content */}
      <div className="p-7 relative z-10">
        <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-100 to-indigo-200">
          {sponsored.title}
        </h3>
        <p className="text-gray-200 text-sm leading-relaxed mb-5">{sponsored.body}</p>
        
        <motion.a 
          href={sponsored.link}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:from-violet-500 hover:to-indigo-500 transition-all group shadow-lg shadow-violet-900/40"
          whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(139, 92, 246, 0.3), 0 4px 6px -4px rgba(139, 92, 246, 0.2)' }}
          whileTap={{ scale: 0.98 }}
        >
          <span>{sponsored.buttonText}</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
        </motion.a>
        
        <p className="text-xs text-gray-300/80 mt-4 text-center italic">{sponsored.altText}</p>
      </div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-3 mix-blend-soft-light">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>
      
      {/* Crypto Icon Accent */}
      <div className="absolute bottom-3 right-3 opacity-20">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 17H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
};

export default SponsoredPanel;
