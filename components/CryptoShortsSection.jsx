import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';
import ShortsVideoSlider from './ShortsVideoSlider';

/**
 * A standalone component that displays the Crypto Shorts section
 * Can be embedded anywhere in the application
 * 
 * @param {Object} props
 * @param {string} [props.className] - Additional CSS classes to apply to the section
 * @param {string} [props.bgClassName] - CSS classes for the background gradient (defaults to "bg-gradient-to-b from-black to-gray-900")
 * @param {string} [props.title] - Section title (defaults to "Crypto Shorts")
 * @param {string} [props.description] - Section description
 * @param {boolean} [props.showBackground] - Whether to show the background glow effects
 * @returns {JSX.Element}
 */
const CryptoShortsSection = ({
  className = "",
  bgClassName = "bg-gradient-to-b from-black to-gray-900",
  title = "Crypto Shorts",
  description = "Quick crypto insights and tips in bite-sized videos. Click any short to view in fullscreen.",
  showBackground = true
}) => {
  return (
    <section className={`py-16 px-4 ${bgClassName} relative overflow-hidden ${className}`}>
      {/* Background glow effects */}
      {showBackground && (
        <>
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-red-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1/4 h-1/4 bg-orange-500/10 rounded-full blur-[100px] -z-10"></div>
        </>
      )}
      
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <motion.div
            className="mr-3 text-red-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Youtube className="w-7 h-7" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">
            {title}
          </h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-4"
        >
          {description && (
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-8">
              {description}
            </p>
          )}
          
          <ShortsVideoSlider />
        </motion.div>
      </div>
    </section>
  );
};

export default CryptoShortsSection;
