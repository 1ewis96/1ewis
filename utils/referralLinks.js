import referralData from '../data/referralLinks.json';

/**
 * Get all referral links
 * @returns {Object} The complete referral data object
 */
export function getAllReferralLinks() {
  return referralData;
}

/**
 * Get referral link for a specific exchange
 * @param {string} exchangeId - The ID of the exchange (e.g., 'binance', 'bybit')
 * @returns {Object} Exchange referral data or null if not found
 */
export function getExchangeReferral(exchangeId) {
  return referralData.exchanges[exchangeId.toLowerCase()] || null;
}

/**
 * Get referral link for a specific wallet
 * @param {string} walletId - The ID of the wallet (e.g., 'ledger', 'metamask')
 * @returns {Object} Wallet referral data or null if not found
 */
export function getWalletReferral(walletId) {
  return referralData.wallets[walletId.toLowerCase()] || null;
}

/**
 * Get referral link for a specific tool
 * @param {string} toolId - The ID of the tool (e.g., 'tradingview', 'cointracking')
 * @returns {Object} Tool referral data or null if not found
 */
export function getToolReferral(toolId) {
  return referralData.tools[toolId.toLowerCase()] || null;
}

/**
 * Get all exchange referral links
 * @returns {Object} All exchange referral data
 */
export function getAllExchangeReferrals() {
  return referralData.exchanges;
}

/**
 * Get all wallet referral links
 * @returns {Object} All wallet referral data
 */
export function getAllWalletReferrals() {
  return referralData.wallets;
}

/**
 * Get all tool referral links
 * @returns {Object} All tool referral data
 */
export function getAllToolReferrals() {
  return referralData.tools;
}

/**
 * Format a referral link for display
 * @param {string} link - The full referral link
 * @returns {string} A shortened version of the link for display
 */
export function formatReferralLink(link) {
  if (!link) return '';
  
  try {
    const url = new URL(link);
    return `${url.hostname}${url.pathname.length > 1 ? '...' : ''}`;
  } catch (e) {
    return link;
  }
}

/**
 * Check if a referral link exists
 * @param {Object} referral - The referral object
 * @returns {boolean} True if the referral link exists
 */
export function hasReferralLink(referral) {
  return referral && referral.referralLink && referral.referralLink.trim() !== '';
}
