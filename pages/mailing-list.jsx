import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import Head from 'next/head';

export default function MailingListPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');
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
        if (document.getElementById('recaptcha-container')) {
          // Store the widget ID so we can get the response later
          recaptchaRef.current = window.grecaptcha.render('recaptcha-container', {
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
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubmitStatus('error');
      setErrorMessage('Please enter a valid email address');
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
          setSubmitStatus('error');
          setErrorMessage('Please complete the reCAPTCHA verification');
          setSubmitting(false);
          return;
        }
      } else {
        console.warn('reCAPTCHA not loaded');
        setSubmitStatus('error');
        setErrorMessage('reCAPTCHA verification failed to load. Please refresh the page and try again.');
        setSubmitting(false);
        return;
      }
    } catch (error) {
      console.error('Error getting reCAPTCHA response:', error);
      setSubmitStatus('error');
      setErrorMessage('Error with reCAPTCHA verification. Please try again.');
      setSubmitting(false);
      return;
    }

    try {
      // Prepare the payload according to the API requirements
      const payload = {
        fullName: name || 'Anonymous Subscriber', // Use provided name or default
        email: email.trim(),
        recaptchaToken // Add the reCAPTCHA token
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
      setSubmitStatus('success');
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
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again later.');
      
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
    <>
      <Head>
        <title>Crypto Newsletter | Exclusive Deals & Market Insights | 1ewis.com</title>
        <meta name="description" content="Subscribe to our free crypto newsletter for exclusive deals, trading tips, and market insights. Get early access to exchange promotions and referral bonuses." />
        <meta name="keywords" content="crypto newsletter, crypto trading tips, crypto market insights, crypto referral bonuses, crypto exchange deals, crypto passive income" />
        <link rel="canonical" href="https://1ewis.com/mailing-list" />
        <meta property="og:title" content="Crypto Newsletter | Exclusive Deals & Market Insights" />
        <meta property="og:description" content="Subscribe to our free crypto newsletter for exclusive deals, trading tips, and market insights." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/mailing-list" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto Newsletter | 1ewis.com" />
        <meta name="twitter:description" content="Subscribe for exclusive crypto deals and insights." />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <main className="pt-0">
          {/* Hero Section with animated background */}
          <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
            {/* Enhanced particle background */}
            <ParticleBackground 
              count={80} 
              colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']} 
              minSize={2} 
              maxSize={8} 
              minSpeed={20} 
              maxSpeed={60} 
              minOpacity={0.1} 
              maxOpacity={0.4} 
              blur={3} 
            />
            
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center mb-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
                  <Mail className="text-blue-400 w-5 h-5 mr-2" />
                  <span className="text-blue-300 font-medium">Exclusive Updates & Offers</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Join Our Mailing List
                </h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-300 -mb-2 max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Stay updated with the latest crypto deals, market insights, and early access to new features.
                </motion.p>
              </motion.div>
            </div>
          </section>
          
          {/* Subscription Form Section */}
          <section className="py-8 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">{/* Reduced vertical padding */}
            {/* Background glow effects */}
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
            
            <div className="max-w-3xl mx-auto">
              <motion.div
                className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl" /* Reduced padding */
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {submitStatus === 'success' ? (
                  <div className="text-center py-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4">Thank You for Subscribing!</h3>
                    <p className="text-gray-300 mb-6">
                      You've been added to our mailing list. Get ready for exclusive crypto deals and insights.
                    </p>
                    <Button 
                      onClick={() => {
                        setSubmitStatus(null);
                        // Reset reCAPTCHA when going back to the form
                        if (window.grecaptcha) {
                          try {
                            window.grecaptcha.reset(recaptchaRef.current);
                          } catch (error) {
                            console.warn('Error resetting reCAPTCHA:', error);
                          }
                        }
                      }} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg"
                    >
                      Subscribe Another Email
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold mb-4 text-center">Subscribe to Our Newsletter</h3>{/* Reduced font size and margin */}
                    
                    {submitStatus === 'error' && (
                      <motion.div 
                        className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                        <p className="text-red-200 text-sm">{errorMessage}</p>
                      </motion.div>
                    )}
                    
                    <div className="mb-4">{/* Reduced margin */}
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div className="mb-5">{/* Reduced margin */}
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    
                    {/* reCAPTCHA container */}
                    <div className="mb-4 flex justify-center">{/* Reduced margin */}
                      <div id="recaptcha-container" className="g-recaptcha"></div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all duration-300 text-lg"
                      >
                        {submitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            Subscribe Now
                            <Mail className="ml-2 h-5 w-5" />
                          </span>
                        )}
                      </Button>
                    </div>
                    
                    <p className="text-gray-400 text-sm text-center mt-6">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                )}
              </motion.div>
              
              {/* Benefits Section */}
              <div className="mt-16 grid md:grid-cols-3 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Early Access</h3>
                  <p className="text-gray-400">Be the first to know about new features and exclusive crypto deals.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Market Insights</h3>
                  <p className="text-gray-400">Receive curated market analysis and trading opportunities.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6"
                >
                  <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Exclusive Bonuses</h3>
                  <p className="text-gray-400">Get special promotional codes and bonus offers from our partners.</p>
                </motion.div>
              </div>
            </div>
          </section>
          
          {/* Social Media Section */}
          <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/80 backdrop-blur-md border border-gray-800 rounded-2xl p-8 shadow-xl"
              >
                <div className="inline-flex items-center mb-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-white w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  <span className="text-blue-300 font-medium">Follow Us on X</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Stay Connected on X
                </h2>
                
                <p className="text-lg text-gray-300 mb-8">
                  Follow <span className="text-blue-400 font-semibold">@1ewis_com</span> on X for real-time updates, crypto insights, and exclusive announcements.
                </p>
                
                <a 
                  href="https://x.com/1ewis_com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center bg-black hover:bg-black text-white font-medium py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                  Follow @1ewis_com
                </a>
              </motion.div>
            </div>
          </section>
          
          {/* Footer */}
          <Footer />
        </main>
      </div>
    </>
  );
}
