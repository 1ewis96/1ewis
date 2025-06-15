import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';

const GuideSidebar = ({ guide }) => {
  return (
    <div className="w-full lg:w-80 space-y-8">
      {/* Quick Navigation */}
      {guide.sections && guide.sections.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/80 shadow-lg sticky top-4">
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">In This Guide</h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-4"></div>
          <nav className="space-y-2">
            {guide.sections.map((section, index) => (
              <motion.a 
                key={index}
                href={`#section-${index}`}
                className="flex items-center py-2.5 px-4 rounded-lg hover:bg-gray-800/70 text-gray-300 hover:text-cyan-300 transition-all border border-transparent hover:border-cyan-800/30 group"
                whileHover={{ x: 4 }}
                onClick={(e) => {
                  // Prevent default behavior
                  e.preventDefault();
                  
                  // Get the target element
                  const targetId = `section-${index}`;
                  const targetElement = document.getElementById(targetId);
                  
                  if (targetElement) {
                    // Calculate position with offset for navbar
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                    
                    // Smooth scroll to the element
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    });
                    
                    // Update URL without triggering navigation
                    window.history.pushState(null, '', `#${targetId}`);
                  }
                }}
              >
                {section.title}
              </motion.a>
            ))}
          </nav>
        </div>
      )}
      
      {/* Popular Tags */}
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/80 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Popular Tags</h3>
        <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-4"></div>
        <div className="flex flex-wrap gap-2">
          {['Bitcoin', 'Ethereum', 'DeFi', 'NFTs', 'Blockchain', 'Trading', 'Security', 'Wallets'].map((tag, index) => (
            <motion.a 
              key={index}
              href={`/news/tags/${tag.toLowerCase()}`}
              className="px-3 py-1.5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-cyan-300 text-xs font-medium rounded-full hover:from-cyan-900/30 hover:to-blue-900/30 transition-all border border-gray-700/30 hover:border-cyan-700/50 hover:text-white hover:shadow-md hover:shadow-cyan-900/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.a>
          ))}
        </div>
      </div>
      
      {/* Vertical Ad Panel */}
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
      
      {/* Second Vertical Ad Panel */}
      <motion.div 
        className="relative bg-gradient-to-br from-amber-900/70 to-orange-800/70 rounded-xl overflow-hidden shadow-lg border border-amber-700/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        whileHover={{ y: -3, boxShadow: '0 20px 25px -5px rgba(194, 65, 12, 0.2), 0 10px 10px -5px rgba(194, 65, 12, 0.1)' }}
      >
        {/* Ad Image */}
        <div className="h-48 relative overflow-hidden">
          <img 
            src="https://via.placeholder.com/400x300/f59e0b/ffffff?text=Crypto+Wallet" 
            alt="Crypto Wallet Ad" 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-900 to-transparent opacity-80"></div>
          <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md border border-white/10">AD</div>
        </div>
        
        {/* Ad Content */}
        <div className="p-5 relative z-10">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-200">Secure your crypto assets</h3>
          <p className="text-gray-200 text-sm mb-4">The most secure hardware wallet for your Bitcoin and other cryptocurrencies.</p>
          
          <motion.a 
            href="https://example.com/hardware-wallet" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white font-medium px-4 py-2 rounded-lg hover:from-amber-400 hover:to-orange-400 transition-all shadow-md shadow-amber-900/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Now
          </motion.a>
          
          <p className="text-xs text-gray-300 mt-3 text-center">Free shipping on orders over $100</p>
        </div>
      </motion.div>
      
      {/* Newsletter Signup */}
      <motion.div 
        className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border border-cyan-800/30 shadow-lg relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ boxShadow: '0 20px 25px -5px rgba(8, 145, 178, 0.2), 0 10px 10px -5px rgba(8, 145, 178, 0.1)' }}
      >
        {/* Background Elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Stay Updated</h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-4"></div>
          <p className="text-gray-300 text-sm mb-4">Get the latest crypto guides and news delivered to your inbox.</p>
          
          <div className="space-y-3">
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-gray-800/80 border border-cyan-800/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 pr-10"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                </svg>
              </div>
            </div>
            <motion.button
              className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium rounded-lg transition-all shadow-md shadow-cyan-900/30"
              whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(8, 145, 178, 0.3), 0 4px 6px -4px rgba(8, 145, 178, 0.2)' }}
              whileTap={{ scale: 0.98 }}
            >
              Subscribe
            </motion.button>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </motion.div>
      
      {/* Related Guides */}
      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <motion.div 
          className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/80 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">Related Guides</h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-4"></div>
          <div className="space-y-5">
            {guide.relatedGuides.map((relatedGuide, index) => (
              <motion.div 
                key={index} 
                className="group relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                <Link 
                  href={`/news/guides/${relatedGuide.slug}`}
                  className="block"
                >
                    {relatedGuide.image && (
                      <div className="mb-2 rounded-lg overflow-hidden shadow-md border border-gray-800/50">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                          <img
                            src={relatedGuide.image}
                            alt={relatedGuide.title}
                            className="w-full h-32 object-cover transform group-hover:scale-105 transition-transform duration-700"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    )}
                    <h4 className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 group-hover:from-cyan-200 group-hover:to-blue-200 transition-all">
                      {relatedGuide.title}
                    </h4>
                    {relatedGuide.excerpt && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2 group-hover:text-gray-300 transition-colors">{relatedGuide.excerpt}</p>
                    )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GuideSidebar;
