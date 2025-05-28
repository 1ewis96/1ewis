/**
 * Consent Manager Utility Functions
 * Handles GDPR compliance and Google's consent requirements for EEA, UK, and Switzerland
 */

/**
 * Initialize the Google Consent Mode with default settings
 * This should be called as early as possible in the page load
 */
export const initializeGoogleConsentMode = () => {
  if (typeof window === 'undefined') return;

  // Set default consent values - all false by default as per GDPR requirements
  window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };
  
  // Initialize Google's consent mode with default settings
  window.gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted', // Always granted as it's essential
    'wait_for_update': 500 // Wait for user consent decision
  });
};

/**
 * Update Google Consent Mode settings based on user consent choices
 * @param {Object} consentChoices - User's consent choices
 */
export const updateGoogleConsent = (consentChoices) => {
  if (typeof window === 'undefined') return;
  
  window.gtag = window.gtag || function() { (window.dataLayer = window.dataLayer || []).push(arguments); };
  
  // Update consent based on user choices
  window.gtag('consent', 'update', {
    'ad_storage': consentChoices.advertising ? 'granted' : 'denied',
    'analytics_storage': consentChoices.analytics ? 'granted' : 'denied',
    'functionality_storage': consentChoices.functional ? 'granted' : 'denied',
    'personalization_storage': consentChoices.personalization ? 'granted' : 'denied',
    'security_storage': 'granted' // Always granted
  });
};

/**
 * Check if the user is in a region requiring explicit consent (EEA, UK, Switzerland)
 * This is a simple implementation - for production, consider using a geolocation service
 * @returns {boolean} - True if user is likely in a region requiring consent
 */
export const isInConsentRequiredRegion = () => {
  if (typeof window === 'undefined') return true; // Default to true for SSR
  
  // Check for common European languages
  const europeanLanguages = ['de', 'fr', 'it', 'es', 'pt', 'nl', 'da', 'sv', 'no', 'fi', 'el', 'cs', 'hu', 'pl', 'ro', 'sk', 'sl'];
  const browserLanguage = navigator.language.split('-')[0].toLowerCase();
  
  // Check timezone for European timezones
  const timezoneCheck = () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timezone.includes('Europe') || timezone.includes('Zurich');
    } catch (e) {
      return false;
    }
  };
  
  // Return true if any checks indicate European location
  return europeanLanguages.includes(browserLanguage) || timezoneCheck();
};

/**
 * Get stored consent choices from localStorage
 * @returns {Object|null} - User's consent choices or null if not set
 */
export const getStoredConsent = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const storedConsent = localStorage.getItem('gdprConsent');
    return storedConsent ? JSON.parse(storedConsent) : null;
  } catch (e) {
    console.error('Error retrieving stored consent:', e);
    return null;
  }
};

/**
 * Store user consent choices in localStorage
 * @param {Object} consentChoices - User's consent choices
 */
export const storeConsent = (consentChoices) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('gdprConsent', JSON.stringify(consentChoices));
    // Update Google's consent settings
    updateGoogleConsent(consentChoices);
  } catch (e) {
    console.error('Error storing consent:', e);
  }
};

/**
 * Clear stored consent
 */
export const clearConsent = () => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('gdprConsent');
  } catch (e) {
    console.error('Error clearing consent:', e);
  }
};

/**
 * Initialize the IAB Transparency & Consent Framework API
 * Required for Google's consent management in the EEA, UK, and Switzerland
 */
export const initializeTCF = () => {
  if (typeof window === 'undefined') return;
  
  // Create TCF API stub if it doesn't exist
  window.__tcfapi = window.__tcfapi || function() {
    (window.__tcfapi.a = window.__tcfapi.a || []).push(arguments);
  };
  
  // Add TCF stub frame for cross-origin communication
  if (!window.__tcfapi.tcfapiFrame) {
    const frame = document.createElement('iframe');
    frame.style.display = 'none';
    frame.setAttribute('name', 'tcfapiFrame');
    document.body.appendChild(frame);
    
    window.__tcfapi.tcfapiFrame = true;
  }
};
