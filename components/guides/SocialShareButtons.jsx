import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Linkedin, Link2, Share2, Mail } from 'lucide-react';

const SocialShareButtons = ({ title, url }) => {
  // Default values if props are not provided
  const shareTitle = title || 'Check out this guide on 1ewis.com';
  const shareUrl = url || window.location.href;
  
  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);
  
  // Share URLs for different platforms
  const xUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`;
  
  // Function to copy the current URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        // You could add a toast notification here
        console.log('URL copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy URL: ', err);
      });
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-800/80 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Share2 className="w-4 h-4 text-cyan-400 mr-2" />
          <h3 className="text-base font-semibold text-white">Share</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2">
        <motion.a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share on X"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.a>
        
        <motion.a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-600/20 text-gray-300 hover:text-blue-400 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share on Facebook"
        >
          <Facebook size={18} />
        </motion.a>
        
        <motion.a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-blue-700/20 text-gray-300 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={18} />
        </motion.a>
        
        <motion.a
          href={emailUrl}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-green-700/20 text-gray-300 hover:text-green-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Share via Email"
        >
          <Mail size={18} />
        </motion.a>
        
        <motion.button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-cyan-900/20 text-gray-300 hover:text-cyan-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Copy link"
        >
          <Link2 size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SocialShareButtons;
