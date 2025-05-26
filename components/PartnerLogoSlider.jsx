import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PartnerLogoSlider() {
  // Define partner logos with their names and paths
  const partnerLogos = [
    { name: 'Bitrue', path: '/logos/bittrue.webp', color: 'blue' },
    { name: 'Ledger', path: '/logos/ledger.webp', color: 'black' },
    { name: 'YouHodler', path: '/logos/youhodler.webp', color: 'teal' },
    { name: 'Revolut', path: '/logos/revolut.webp', color: 'blue' },
    { name: 'TradingView', path: '/logos/tradingview.webp', color: 'indigo' },
    { name: 'CoinTracking', path: '/logos/cointracking.webp', color: 'violet' },
    { name: 'NordVPN', path: '/logos/nordvpn.webp', color: 'blue' },
  ];

  // Fallback colors for logos in case the image fails to load
  const getLogoFallback = (name, color) => {
    return (
      <div className={`w-24 h-12 flex items-center justify-center rounded-md bg-${color}-900/30 border border-${color}-700/50`}>
        <span className={`text-${color}-400 font-semibold text-sm`}>{name}</span>
      </div>
    );
  };

  // Create a duplicate array for continuous scrolling effect
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  // State to track if images are loaded
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Set images as loaded after component mounts
  useEffect(() => {
    setImagesLoaded(true);
  }, []);

  return (
    <div className="w-full py-8 overflow-hidden bg-black/30 backdrop-blur-sm rounded-xl mb-10">
      <h3 className="text-center text-gray-400 text-sm uppercase tracking-wider mb-4">Our Trusted Partners</h3>
      
      <div className="relative">
        {/* First row of logos - moves left */}
        <motion.div 
          className="flex space-x-12 mb-6"
          animate={{ 
            x: [0, -1920]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 40,
            ease: "linear"
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="flex-shrink-0">
              <div className="w-24 h-12 flex items-center justify-center">
                {imagesLoaded ? (
                  <Image 
                    src={logo.path}
                    alt={logo.name}
                    width={96}
                    height={48}
                    className="max-h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="hidden">{getLogoFallback(logo.name, logo.color)}</div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Second row of logos - moves right (opposite direction) */}
        <motion.div 
          className="flex space-x-12"
          animate={{ 
            x: [-1920, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 40,
            ease: "linear"
          }}
        >
          {duplicatedLogos.reverse().map((logo, index) => (
            <div key={`logo-2-${index}`} className="flex-shrink-0">
              <div className="w-24 h-12 flex items-center justify-center">
                {imagesLoaded ? (
                  <Image 
                    src={logo.path}
                    alt={logo.name}
                    width={96}
                    height={48}
                    className="max-h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="hidden">{getLogoFallback(logo.name, logo.color)}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
