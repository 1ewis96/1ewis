import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, AlertCircle } from 'lucide-react';

export default function BetaSignupModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const recaptchaRef = useRef(null);
  
  // Load reCAPTCHA script
  useEffect(() => {
    // Only run this in the browser
    if (typeof window === 'undefined') return;
    
    // Cleanup function to remove any existing scripts
    const cleanup = () => {
      if (window.grecaptchaCallback) {
        delete window.grecaptchaCallback;
      }
      const existingScripts = document.querySelectorAll('script[src^="https://www.google.com/recaptcha/api.js"]');
      existingScripts.forEach(script => {
        if (script && script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
    
    // Clean up any existing reCAPTCHA scripts
    cleanup();
    
    // Define the callback function for when reCAPTCHA script loads
    window.grecaptchaCallback = () => {
      try {
        if (document.getElementById('recaptcha-container-modal')) {
          // Store the widget ID so we can get the response later
          recaptchaRef.current = window.grecaptcha.render('recaptcha-container-modal', {
            'sitekey': '6LemJEkrAAAAANVTNR5-X4y9ywJz8VmOMobnirh3',
            'theme': 'dark'
          });
          console.log('reCAPTCHA widget ID:', recaptchaRef.current);
        }
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error);
      }
    };
    
    // Create and append the script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&render=explicit`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubmitError('Please enter a valid email address');
      setSubmitting(false);
      return;
    }
    
    // Get reCAPTCHA token
    let recaptchaToken = '';
    try {
      if (window.grecaptcha) {
        // Try to get the response using the stored widget ID
        recaptchaToken = window.grecaptcha.getResponse(recaptchaRef.current);
        console.log('Retrieved reCAPTCHA token:', recaptchaToken ? 'Token present' : 'No token');
        
        // If no token, try getting it without the widget ID
        if (!recaptchaToken && typeof window.grecaptcha.getResponse === 'function') {
          recaptchaToken = window.grecaptcha.getResponse();
          console.log('Retrieved reCAPTCHA token (fallback):', recaptchaToken ? 'Token present' : 'No token');
        }
        
        if (!recaptchaToken) {
          setSubmitError('Please complete the reCAPTCHA verification');
          setSubmitting(false);
          return;
        }
      } else {
        console.warn('reCAPTCHA not loaded');
        setSubmitError('reCAPTCHA verification failed to load. Please refresh the page and try again.');
        setSubmitting(false);
        return;
      }
    } catch (error) {
      console.error('Error getting reCAPTCHA response:', error);
      setSubmitError('Error with reCAPTCHA verification. Please try again.');
      setSubmitting(false);
      return;
    }

    try {
      // Prepare the payload according to the API requirements
      const payload = {
        fullName: name || 'Q&A Beta User', // Use provided name or default
        email: email.trim(),
        recaptchaToken, // Add the reCAPTCHA token
        source: 'qa_beta' // Add source to track where the signup came from
      };

      // Make the API call to the endpoint
      const response = await fetch('https://api.1ewis.com/mailing-list/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      // Success response
      setSubmitSuccess(true);
      setEmail('');
      setName('');
      
      // Reset reCAPTCHA
      if (window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaRef.current);
        } catch (error) {
          console.warn('Error resetting reCAPTCHA:', error);
        }
      }
    } catch (error) {
      // Error handling
      console.error('Subscription error:', error);
      setSubmitError(error.message || 'Something went wrong. Please try again later.');
      
      // Reset reCAPTCHA on error too
      if (window.grecaptcha) {
        try {
          window.grecaptcha.reset(recaptchaRef.current);
        } catch (error) {
          console.warn('Error resetting reCAPTCHA:', error);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="beta-signup-heading">
      <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 id="beta-signup-heading" className="text-xl font-semibold text-white flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-purple-400" />
              Join Beta Program
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {submitSuccess ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-2">Thank You!</h4>
              <p className="text-gray-300 mb-6">Your request to join the beta program has been submitted. We'll be in touch soon!</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-300 mb-6">
                Enter your email address to join our beta testing program and get early access to new features.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2.5 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                
                {/* reCAPTCHA container */}
                <div className="mb-4 flex justify-center">
                  <div id="recaptcha-container-modal" className="g-recaptcha"></div>
                </div>
                
                {submitError && (
                  <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-300 text-sm">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors flex items-center justify-center"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : 'Submit'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
