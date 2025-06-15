import React, { createContext, useState, useContext } from 'react';

// Create context
const FloatingVideoContext = createContext();

// Provider component
export const FloatingVideoProvider = ({ children }) => {
  const [floatingVideo, setFloatingVideo] = useState(null);

  // Function to set the floating video
  const playInFloatingPlayer = (video) => {
    setFloatingVideo(video);
  };

  // Function to close the floating video
  const closeFloatingPlayer = () => {
    setFloatingVideo(null);
  };

  // Context value
  const value = {
    floatingVideo,
    playInFloatingPlayer,
    closeFloatingPlayer
  };

  return (
    <FloatingVideoContext.Provider value={value}>
      {children}
    </FloatingVideoContext.Provider>
  );
};

// Custom hook to use the floating video context
export const useFloatingVideo = () => {
  const context = useContext(FloatingVideoContext);
  if (context === undefined) {
    throw new Error('useFloatingVideo must be used within a FloatingVideoProvider');
  }
  return context;
};
