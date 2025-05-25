/**
 * Utility functions for handling color classes in Tailwind CSS
 */

/**
 * Get the appropriate Tailwind CSS classes for a color
 * @param {string} colorName - The color name (e.g., 'blue', 'teal', 'violet')
 * @param {string} type - The type of class (bg, text, border)
 * @param {string} shade - The shade of the color (e.g., '400', '500')
 * @param {string} opacity - Optional opacity modifier (e.g., '/20', '/50')
 * @returns {string} The appropriate Tailwind CSS class
 */
export function getColorClass(colorName, type, shade, opacity = '') {
  return `${type}-${colorName}${shade ? `-${shade}` : ''}${opacity}`;
}

/**
 * Get background color class
 * @param {string} colorName - The color name
 * @param {string} shade - The shade of the color
 * @param {string} opacity - Optional opacity modifier
 * @returns {string} The background color class
 */
export function getBgColor(colorName, shade = '500', opacity = '') {
  return getColorClass(colorName, 'bg', shade, opacity);
}

/**
 * Get text color class
 * @param {string} colorName - The color name
 * @param {string} shade - The shade of the color
 * @returns {string} The text color class
 */
export function getTextColor(colorName, shade = '500') {
  return getColorClass(colorName, 'text', shade);
}

/**
 * Get border color class
 * @param {string} colorName - The color name
 * @param {string} shade - The shade of the color
 * @returns {string} The border color class
 */
export function getBorderColor(colorName, shade = '500') {
  return getColorClass(colorName, 'border', shade);
}
