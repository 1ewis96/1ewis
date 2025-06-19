import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const SidebarAd = () => {
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.1ewis.com/analytics/sidebar/ads');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ad: ${response.status}`);
        }
        
        const data = await response.json();
        setAd(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sidebar ad:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchAd();
  }, []);

  if (loading) {
    return (
      <motion.div 
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl overflow-hidden shadow-lg border border-gray-700/30 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
          <div className="h-6 bg-gray-700/50 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700/50 rounded w-full"></div>
          <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          <div className="h-10 bg-gray-700/50 rounded w-1/2"></div>
        </div>
      </motion.div>
    );
  }

  if (error || !ad) {
    return null; // Don't show anything if there's an error
  }

  // Determine the gradient colors based on the ad content
  // This creates a unique look for different ads
  const getGradientColors = () => {
    const colors = [
      { from: 'from-purple-900/80', to: 'to-indigo-900/80', border: 'border-purple-700/30' },
      { from: 'from-amber-900/70', to: 'to-orange-800/70', border: 'border-amber-700/30' },
      { from: 'from-cyan-900/70', to: 'to-blue-800/70', border: 'border-cyan-700/30' },
      { from: 'from-emerald-900/70', to: 'to-green-800/70', border: 'border-emerald-700/30' },
      { from: 'from-rose-900/70', to: 'to-pink-800/70', border: 'border-rose-700/30' }
    ];
    
    // Use the ad ID to consistently select the same colors for the same ad
    const adId = parseInt(ad.PK) || 0;
    const colorIndex = adId % colors.length;
    return colors[colorIndex];
  };

  const gradientColors = getGradientColors();
  const buttonGradient = gradientColors.from.replace('/80', '/90').replace('from-', 'from-') + ' ' + 
                         gradientColors.to.replace('/70', '/90').replace('to-', 'to-');
  const buttonHoverGradient = gradientColors.from.replace('/80', '').replace('from-', 'from-') + ' ' + 
                              gradientColors.to.replace('/70', '').replace('to-', 'to-');

  return (
    <motion.div 
      className={`relative bg-gradient-to-br ${gradientColors.from} ${gradientColors.to} rounded-xl overflow-hidden shadow-lg ${gradientColors.border}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -3, boxShadow: '0 20px 25px -5px rgba(76, 29, 149, 0.2), 0 10px 10px -5px rgba(76, 29, 149, 0.1)' }}
    >
      {/* Ad Image */}
      {ad.image && (
        <div className="h-48 relative overflow-hidden">
          <img 
            src={ad.image} 
            alt={ad.altText || "Sponsored content"} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientColors.from.replace('/80', '')} to-transparent opacity-80`}></div>
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md border border-white/10">AD</div>
        </div>
      )}
      
      {/* Ad Content */}
      <div className={`${ad.image ? 'p-5' : 'p-6'} relative z-10`}>
        {!ad.image && (
          <div className="bg-white/10 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md inline-block mb-3 border border-white/10">AD</div>
        )}
        <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">{ad.title}</h3>
        <p className="text-gray-200 text-sm mb-4">{ad.body}</p>
        
        <motion.a 
          href={ad.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`flex items-center justify-center bg-gradient-to-r ${buttonGradient} text-white font-medium px-4 py-2 rounded-lg hover:${buttonHoverGradient} transition-all shadow-md`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {ad.buttonText || "Learn More"}
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </motion.a>
        
        {ad.altText && (
          <p className="text-xs text-gray-300 mt-3 text-center">{ad.altText}</p>
        )}
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
    </motion.div>
  );
};

export default SidebarAd;
