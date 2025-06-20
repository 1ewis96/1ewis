import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight } from 'lucide-react';
import SidebarAd from './SidebarAd';
import SponsoredPanel from './SponsoredPanel';
import RelatedQuestions from './RelatedQuestions';
import SocialShareButtons from './SocialShareButtons';

const GuideSidebar = ({ guide }) => {
  return (
    <div className="w-full lg:w-80 space-y-8">
      {/* Quick Navigation */}
      {guide.sections && guide.sections.length > 0 && (
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/80 shadow-lg sticky top-4">
          <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">In This Guide</h3>
          <div className="h-px w-full bg-gradient-to-r from-cyan-800/50 to-transparent mb-2"></div>
          <nav className="space-y-0.5">
            {guide.sections.map((section, index) => (
              <motion.a 
                key={index}
                href={`#section-${index}`}
                className="flex items-center py-1.5 px-3 rounded-lg hover:bg-gray-800/70 text-gray-300 hover:text-cyan-300 transition-all border border-transparent hover:border-cyan-800/30 group text-sm"
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
      
      {/* Popular Tags section removed */}
      
      {/* Dynamic Sidebar Ad from API */}
      <SidebarAd />
      
      {/* Related Questions */}
      <RelatedQuestions guide={guide} />
      
      {/* Dynamic Sponsored Panel */}
      <SponsoredPanel />
      
      {/* Social Share Buttons */}
      <SocialShareButtons title={guide.title} url={`https://1ewis.com/news/guides/${guide.slug}`} />
      
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
