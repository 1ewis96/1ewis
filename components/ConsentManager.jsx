import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Info, CheckCircle, AlertTriangle } from 'lucide-react';

/**
 * GDPR Consent Manager Component
 * Handles user consent for cookies and personalized ads in compliance with GDPR
 * and Google's consent management requirements for EEA, UK, and Switzerland
 */
const ConsentManager = () => {
  // Consent states
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consentGiven, setConsentGiven] = useState({
    necessary: true, // Always required
    functional: false,
    analytics: false,
    advertising: false,
    personalization: false
  });

  // Check if consent was previously given
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem('gdprConsent');
      
      // If no consent stored, show the modal
      if (!storedConsent) {
        // Small delay for better UX
        const timer = setTimeout(() => {
          setShowConsentModal(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      } else {
        // Parse stored consent
        try {
          const parsedConsent = JSON.parse(storedConsent);
          setConsentGiven(parsedConsent);
          
          // Initialize Google's TCF API if advertising consent was given
          if (parsedConsent.advertising) {
            initializeGoogleConsentAPI(parsedConsent);
          }
        } catch (e) {
          console.error('Error parsing stored consent:', e);
          setShowConsentModal(true);
        }
      }
    }
  }, []);

  // Initialize Google's Transparency & Consent Framework API
  const initializeGoogleConsentAPI = (consent) => {
    // Create the TCF stub if it doesn't exist
    window.__tcfapi = window.__tcfapi || function() {
      (window.__tcfapi.a = window.__tcfapi.a || []).push(arguments);
    };
    
    // Signal to Google that consent has been given
    if (window.googletag && window.googletag.cmd) {
      window.googletag.cmd.push(function() {
        if (consent.advertising) {
          window.googletag.pubads().setPrivacySettings({
            restrictDataProcessing: false
          });
        } else {
          window.googletag.pubads().setPrivacySettings({
            restrictDataProcessing: true
          });
        }
      });
    }
  };

  // Save consent to localStorage and initialize Google's API
  const saveConsent = (consent) => {
    localStorage.setItem('gdprConsent', JSON.stringify(consent));
    setConsentGiven(consent);
    setShowConsentModal(false);
    setShowPreferences(false);
    
    // Initialize Google's consent API
    initializeGoogleConsentAPI(consent);
  };

  // Accept all cookies
  const acceptAll = () => {
    const fullConsent = {
      necessary: true,
      functional: true,
      analytics: true,
      advertising: true,
      personalization: true
    };
    saveConsent(fullConsent);
  };

  // Accept only necessary cookies
  const acceptNecessary = () => {
    const minimalConsent = {
      necessary: true,
      functional: false,
      analytics: false,
      advertising: false,
      personalization: false
    };
    saveConsent(minimalConsent);
  };

  // Save custom preferences
  const savePreferences = () => {
    saveConsent(consentGiven);
  };

  // Handle individual consent toggles
  const handleConsentChange = (category) => {
    setConsentGiven(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Open consent preferences
  const openConsentPreferences = () => {
    setShowPreferences(true);
  };

  // Show the consent manager again (for footer link)
  const showConsentManager = () => {
    setShowConsentModal(true);
  };

  return (
    <>
      <AnimatePresence>
        {showConsentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-900 to-gray-950 border border-gray-800/80 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-auto relative overflow-hidden"
            >
              {/* Background gradient elements */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/20 rounded-full blur-[120px]"></div>
                <div className="absolute top-1/3 right-1/3 w-1/4 h-1/4 bg-green-500/15 rounded-full blur-[100px]"></div>
              </div>
              
              {!showPreferences ? (
                // Main consent dialog
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-2 mr-3 shadow-lg shadow-green-500/20">
                        <Shield className="text-white h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">Privacy Preferences</h2>
                    </div>
                    {/* Only show close button if consent was previously given */}
                    {localStorage.getItem('gdprConsent') && (
                      <button 
                        onClick={() => setShowConsentModal(false)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-8">
                    <div className="p-5 rounded-lg bg-gray-800/50 border border-gray-700/50 mb-5">
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking "Accept All", you consent to the use of cookies for analytics, personalization, and advertising purposes.
                      </p>
                      <p className="text-gray-300">
                        To learn more about how we use cookies and your data, please see our <a href="/privacy-policy" className="text-green-400 hover:text-green-300 underline transition-colors duration-200">Privacy Policy</a>.
                      </p>
                    </div>
                    <div className="flex items-center p-3 bg-blue-900/20 border border-blue-800/30 rounded-lg">
                      <Info className="text-blue-400 mr-3 h-5 w-5 flex-shrink-0" />
                      <p className="text-sm text-blue-300">
                        This site complies with GDPR and Google's consent requirements for the EEA, UK, and Switzerland.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      onClick={openConsentPreferences}
                      className="px-5 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-700/50"
                    >
                      Manage Preferences
                    </button>
                    <button
                      onClick={acceptNecessary}
                      className="px-5 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-700/50"
                    >
                      Reject All
                    </button>
                    <button
                      onClick={acceptAll}
                      className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 text-white font-medium hover:shadow-lg hover:shadow-green-900/30 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              ) : (
                // Detailed preferences dialog
                <div className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-2 mr-3 shadow-lg shadow-green-500/20">
                        <Shield className="text-white h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">Cookie Preferences</h2>
                    </div>
                    <button 
                      onClick={() => setShowPreferences(false)}
                      className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-gray-800/50 rounded-full"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Cookie categories */}
                  <div className="space-y-6 mb-6">
                    {/* Necessary cookies */}
                    <div className="p-5 border border-gray-800/80 rounded-lg bg-gradient-to-r from-green-900/20 to-emerald-900/20 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                          <h3 className="font-medium">Necessary Cookies</h3>
                        </div>
                        <div className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded">
                          Required
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">
                        These cookies are essential for the website to function properly. They cannot be disabled.
                      </p>
                    </div>
                    
                    {/* Functional cookies */}
                    <div className="p-5 border border-gray-800/80 rounded-lg hover:border-blue-900/30 transition-colors duration-300 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Info className="text-blue-500 mr-2 h-5 w-5" />
                          <h3 className="font-medium">Functional Cookies</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={consentGiven.functional}
                            onChange={() => handleConsentChange('functional')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-400">
                        These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                      </p>
                    </div>
                    
                    {/* Analytics cookies */}
                    <div className="p-5 border border-gray-800/80 rounded-lg hover:border-purple-900/30 transition-colors duration-300 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Info className="text-purple-500 mr-2 h-5 w-5" />
                          <h3 className="font-medium">Analytics Cookies</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={consentGiven.analytics}
                            onChange={() => handleConsentChange('analytics')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-400">
                        These cookies help us understand how visitors interact with our website, allowing us to improve user experience.
                      </p>
                    </div>
                    
                    {/* Advertising cookies */}
                    <div className="p-5 border border-gray-800/80 rounded-lg hover:border-yellow-900/30 transition-colors duration-300 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <AlertTriangle className="text-yellow-500 mr-2 h-5 w-5" />
                          <h3 className="font-medium">Advertising Cookies</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={consentGiven.advertising}
                            onChange={() => handleConsentChange('advertising')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-400">
                        These cookies are used to serve personalized ads based on your browsing history. They help make advertising more relevant to you.
                      </p>
                      {consentGiven.advertising && (
                        <div className="mt-3 p-3 bg-yellow-900/20 border border-yellow-900/30 rounded text-xs text-yellow-200">
                          By enabling advertising cookies, you consent to Google and its partners using cookies to personalize ads and process your personal data. You can change your preferences at any time.
                        </div>
                      )}
                    </div>
                    
                    {/* Personalization cookies */}
                    <div className="p-5 border border-gray-800/80 rounded-lg hover:border-pink-900/30 transition-colors duration-300 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Info className="text-pink-500 mr-2 h-5 w-5" />
                          <h3 className="font-medium">Personalization Cookies</h3>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={consentGiven.personalization}
                            onChange={() => handleConsentChange('personalization')}
                          />
                          <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-green-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </div>
                      <p className="text-sm text-gray-400">
                        These cookies allow us to provide personalized content and recommendations based on your preferences and behavior.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      onClick={() => setShowPreferences(false)}
                      className="px-5 py-3 border border-gray-700 hover:border-gray-600 rounded-lg transition-all duration-300 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-900/30 focus:outline-none focus:ring-2 focus:ring-gray-700/50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={savePreferences}
                      className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-lg transition-all duration-300 text-white font-medium hover:shadow-lg hover:shadow-green-900/30 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating button to reopen consent manager */}
      {!showConsentModal && (
        <button
          onClick={showConsentManager}
          className="fixed bottom-6 left-6 z-40 p-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 rounded-full shadow-xl hover:shadow-green-900/30 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500/50"
          aria-label="Privacy Settings"
        >
          <Shield className="h-5 w-5 text-white" />
        </button>
      )}
    </>
  );
};

export default ConsentManager;
