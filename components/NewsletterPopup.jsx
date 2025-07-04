import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(null);
  
  // Check if the popup has been dismissed recently
  const checkPopupStatus = () => {
    const lastDismissed = localStorage.getItem('newsletterPopupDismissed');
    const lastSubmitted = localStorage.getItem('newsletterSubmitted');
    
    // Don't show popup if it was dismissed in the last 7 days or if user has submitted email
    if (lastSubmitted) return false;
    if (lastDismissed) {
      const dismissedDate = new Date(parseInt(lastDismissed));
      const now = new Date();
      const daysSinceDismissed = (now - dismissedDate) / (1000 * 60 * 60 * 24);
      
      if (daysSinceDismissed < 7) return false;
    }
    
    return true;
  };
  
  // Reset inactivity timer
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
    
    // Only set a new timer if the popup should be shown
    if (checkPopupStatus()) {
      const newTimer = setTimeout(() => {
        setIsVisible(true);
      }, 60000); // 60 seconds of inactivity
      
      setTimer(newTimer);
    }
  };
  
  // Handle user activity
  useEffect(() => {
    // Events to track user activity
    const activityEvents = [
      'mousedown', 'mousemove', 'keypress', 
      'scroll', 'touchstart', 'click'
    ];
    
    // Set initial timer
    resetTimer();
    
    // Add event listeners for user activity
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimer);
    });
    
    // Cleanup event listeners
    return () => {
      if (timer) clearTimeout(timer);
      
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, []);
  
  // Handle popup dismissal
  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('newsletterPopupDismissed', Date.now().toString());
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send the email to your newsletter service
    // For now, we'll just simulate a successful submission
    setSubmitted(true);
    localStorage.setItem('newsletterSubmitted', 'true');
    
    // Hide popup after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full mx-4 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>
            
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-teal-400 to-emerald-400">
                    Stay Updated
                  </h3>
                  <p className="text-gray-300">
                    Subscribe to our newsletter to receive the latest crypto news and exclusive offers directly in your inbox.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white"
                      required
                    />
                    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white font-medium rounded-lg transition-all duration-300"
                  >
                    Subscribe
                  </button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-300">
                  You've successfully subscribed to our newsletter.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
