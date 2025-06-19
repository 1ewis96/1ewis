/**
 * Utility functions for the guide creation and editing process
 */

/**
 * Convert a file to base64 format
 * @param {File} file - The file to convert
 * @returns {Promise<string>} - A promise that resolves to the base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Upload an image to the API
 * @param {File} file - The image file to upload
 * @param {string} apiKey - The admin API key
 * @param {Function} setUploading - Function to set uploading state
 * @param {Function} setUploadProgress - Function to update upload progress
 * @returns {Promise<string>} - A promise that resolves to the uploaded image URL
 */
export const uploadImage = async (file, apiKey, setUploading, setUploadProgress) => {
  if (!file) return null;
  
  setUploading(true);
  setUploadProgress(0);
  
  try {
    // Convert file to base64
    const base64Image = await fileToBase64(file);
    
    // Create a simulated progress indicator
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 90 ? 90 : newProgress;
      });
    }, 500);
    
    if (!apiKey) {
      throw new Error('Admin API key not found');
    }
    
    // Upload to API endpoint
    const response = await fetch('https://api.1ewis.com/admin/upload/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        image: base64Image.split(',')[1], // Remove the data:image/xxx;base64, part
        fileType: file.type
      })
    });
    
    clearInterval(progressInterval);
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }
    
    const data = await response.json();
    setUploadProgress(100);
    
    // Return the image URL from the response
    return data.url;
  } catch (error) {
    console.error('Image upload error:', error);
    throw error;
  } finally {
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
    }, 1000);
  }
};

/**
 * Generate a URL-friendly slug from a title
 * @param {string} title - The title to convert to a slug
 * @returns {string} - The generated slug
 */
export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim(); // Trim leading/trailing spaces
};

/**
 * Generate a complete guide JSON object from the form data
 * @param {Object} guideData - The guide data object
 * @param {Array} sections - The sections array
 * @param {Object} interactiveElements - The interactive elements object
 * @returns {Object} - The complete guide JSON
 */
export const generateGuideJson = (guideData, sections, interactiveElements) => {
  // Create a deep copy of the guide data
  const guide = JSON.parse(JSON.stringify(guideData));
  
  // Add sections with their interactive elements
  guide.sections = sections.map(section => {
    const sectionCopy = { ...section };
    
    // Handle hideContent property - if content should be hidden, set content to empty string
    if (sectionCopy.hideContent) {
      sectionCopy.content = '';
    }
    
    // Remove the hideContent property as it's only used in the editor
    delete sectionCopy.hideContent;
    
    // Add any interactive elements that belong to this section
    sectionCopy.interactiveElements = [];
    
    // Check each interactive element type
    Object.keys(interactiveElements).forEach(type => {
      const elements = Array.isArray(interactiveElements[type]) 
        ? interactiveElements[type] 
        : [interactiveElements[type]];
      
      elements.forEach(element => {
        if (element && element.sectionId === section.id) {
          sectionCopy.interactiveElements.push({
            type,
            ...element
          });
        }
      });
    });
    
    return sectionCopy;
  });
  
  // Add global interactive elements (not associated with any section)
  guide.interactiveElements = {};
  
  // Add the autoplay video player if it exists and is not associated with a section
  if (interactiveElements.videoPlayer && !interactiveElements.videoPlayer.sectionId) {
    guide.interactiveElements.videoPlayer = {
      ...interactiveElements.videoPlayer
    };
  }
  
  return guide;
};
