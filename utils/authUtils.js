/**
 * Authentication utilities for admin panel
 * Handles API key management, validation, and storage
 */

// API endpoint for admin login
const API_LOGIN_ENDPOINT = 'https://api.1ewis.com/admin/login';

/**
 * Attempts to login with email and password
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<{success: boolean, apiKey?: string, expiresAt?: number, error?: string}>}
 */
export async function loginAdmin(email, password) {
  try {
    const response = await fetch(API_LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        success: false, 
        error: errorData.message || `Login failed with status: ${response.status}` 
      };
    }

    const data = await response.json();
    
    // Store the API key in localStorage
    storeApiKey(data.apiKey, data.expiresAt);
    
    return { 
      success: true, 
      apiKey: data.apiKey, 
      expiresAt: data.expiresAt 
    };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: 'Network error occurred during login' 
    };
  }
}

/**
 * Stores API key and expiration in localStorage
 * @param {string} apiKey - The API key to store
 * @param {number} expiresAt - Expiration timestamp
 */
export function storeApiKey(apiKey, expiresAt) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('adminApiKey', apiKey);
    localStorage.setItem('adminApiKeyExpires', expiresAt.toString());
  }
}

/**
 * Retrieves the stored API key
 * @returns {{apiKey: string|null, expiresAt: number|null}}
 */
export function getStoredApiKey() {
  if (typeof window === 'undefined') {
    return { apiKey: null, expiresAt: null };
  }
  
  const apiKey = localStorage.getItem('adminApiKey');
  const expiresAtStr = localStorage.getItem('adminApiKeyExpires');
  const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : null;
  
  return { apiKey, expiresAt };
}

/**
 * Checks if the stored API key is valid (exists and not expired)
 * @returns {boolean}
 */
export function isApiKeyValid() {
  const { apiKey, expiresAt } = getStoredApiKey();
  
  if (!apiKey || !expiresAt) {
    return false;
  }
  
  // Check if the API key has expired
  const now = Math.floor(Date.now() / 1000); // Current time in seconds
  return expiresAt > now;
}

/**
 * Removes the stored API key
 */
export function clearApiKey() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminApiKey');
    localStorage.removeItem('adminApiKeyExpires');
  }
}

/**
 * Helper to add API key to fetch requests
 * @param {Object} options - Fetch options
 * @returns {Object} - Modified fetch options with API key header
 */
export function withApiKey(options = {}) {
  const { apiKey } = getStoredApiKey();
  
  if (!apiKey) {
    return options;
  }
  
  return {
    ...options,
    headers: {
      ...options.headers,
      'X-API-Key': apiKey,
    },
  };
}

/**
 * Logout function to clear auth state
 */
export function logoutAdmin() {
  clearApiKey();
}
