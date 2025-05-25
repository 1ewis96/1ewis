import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Settings, Check } from 'lucide-react';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true and can't be toggled
    functional: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already set cookie preferences
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    if (!consentGiven) {
      // Show the consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    setCookiePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    setCookiePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    savePreferences({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
  };

  const savePreferences = (preferences) => {
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setShowConsent(false);
    setShowSettings(false);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Can't toggle necessary cookies
    setCookiePreferences({
      ...cookiePreferences,
      [key]: !cookiePreferences[key],
    });
  };

  const bannerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 20 } },
    exit: { y: 100, opacity: 0, transition: { duration: 0.3 } }
  };

  const settingsVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  };

  return (
    <>
      <AnimatePresence>
        {showConsent && !showSettings && (
          <motion.div 
            className="fixed bottom-0 left-0 right-0 p-4 z-50"
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="max-w-6xl mx-auto bg-gray-900 border border-gray-800 rounded-lg shadow-2xl p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cookie Consent</h3>
                    <p className="text-gray-300 text-sm max-w-2xl">
                      We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Visit our Privacy Policy to learn more.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                  <button 
                    onClick={() => setShowSettings(true)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    Cookie Settings
                  </button>
                  <button 
                    onClick={acceptNecessary}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    Necessary Only
                  </button>
                  <button 
                    onClick={acceptAll}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition-colors"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/70 z-50"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowSettings(false)}
            />
            <motion.div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-4 z-50"
              variants={settingsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl">
                <div className="flex items-center justify-between p-4 border-b border-gray-800">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-blue-400 mr-2" />
                    <h3 className="text-lg font-semibold">Cookie Settings</h3>
                  </div>
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-300 text-sm mb-4">
                    Customize your cookie preferences. Necessary cookies help make a website usable by enabling basic functions.
                  </p>
                  
                  <div className="space-y-4">
                    {Object.entries(cookiePreferences).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium capitalize">{key} Cookies</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {key === 'necessary' && 'Required for the website to function properly'}
                            {key === 'functional' && 'Enable personalized features and preferences'}
                            {key === 'analytics' && 'Help us improve our website by collecting anonymous data'}
                            {key === 'marketing' && 'Used to track visitors across websites for advertising'}
                          </div>
                        </div>
                        <div 
                          className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-700'
                          } ${key === 'necessary' ? 'opacity-50 cursor-not-allowed' : ''}`}
                          onClick={() => togglePreference(key)}
                        >
                          <motion.div 
                            className="w-4 h-4 bg-white rounded-full"
                            animate={{ x: value ? 24 : 0 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 border-t border-gray-800 flex justify-end space-x-2">
                  <button 
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => savePreferences(cookiePreferences)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
