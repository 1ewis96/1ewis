import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PartnerLogoSlider() {
  // Define partner logos with their names and paths
  const partnerLogos = [
    { name: 'Bitrue', path: '/logos/bittrue.webp', color: 'blue', link: '/bitrue' },
    { name: 'Ledger', path: '/logos/ledger.webp', color: 'black', link: '/wallets/ledger' },
    { name: 'YouHodler', path: '/logos/youhodler.webp', color: 'teal', link: '/wallets/youhodler' },
    { name: 'Revolut', path: '/logos/revolut.webp', color: 'blue', link: '/cards/revolut' },
    { name: 'TradingView', path: '/logos/tradingview.webp', color: 'indigo', link: '/tools/tradingview' },
    { name: 'CoinTracking', path: '/logos/cointracking.webp', color: 'violet', link: '/tools/cointracking' },
    { name: 'NordVPN', path: '/logos/nordvpn.webp', color: 'blue', link: '/tools/nordvpn' },
    { name: 'Trezor', path: '/logos/trezor.webp', color: 'slate', link: '/wallets/trezor' },
    { name: 'Wirex', path: '/logos/wirex.webp', color: 'sky', link: '/cards/wirex' },
  ];

  // Fallback colors for logos in case the image fails to load
  const getLogoFallback = (name, color) => {
    return (
      <div className={`w-24 h-12 flex items-center justify-center rounded-md bg-${color}-900/30 border border-${color}-700/50`}>
        <span className={`text-${color}-400 font-semibold text-sm`}>{name}</span>
      </div>
    );
  };

  // Create a duplicate array with multiple copies for continuous scrolling effect
  const duplicatedLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

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
          className="flex space-x-8 mb-6"
          animate={{ 
            x: [0, -2400]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 120,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`logo-1-${index}`} className="flex-shrink-0">
              <div className="w-24 h-12 flex items-center justify-center">
                {imagesLoaded ? (
                  <Link href={logo.link}>
                    <Image 
                      src={logo.path}
                      alt={logo.name}
                      width={96}
                      height={48}
                      className="max-h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  </Link>
                ) : null}
                <div className="hidden">{getLogoFallback(logo.name, logo.color)}</div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Second row of logos - moves right (opposite direction) */}
        <motion.div 
          className="flex space-x-8"
          animate={{ 
            x: [-2400, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 120,
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {duplicatedLogos.reverse().map((logo, index) => (
            <div key={`logo-2-${index}`} className="flex-shrink-0">
              <div className="w-24 h-12 flex items-center justify-center">
                {imagesLoaded ? (
                  <Link href={logo.link}>
                    <Image 
                      src={logo.path}
                      alt={logo.name}
                      width={96}
                      height={48}
                      className="max-h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  </Link>
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
