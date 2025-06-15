import React from 'react';
import { useFloatingVideo } from '../../context/FloatingVideoContext';
import FloatingVideoPlayer from './FloatingVideoPlayer';

// This wrapper component accesses the floating video context 
// and passes it to the FloatingVideoPlayer component
export default function FloatingVideoPlayerWrapper() {
  const { floatingVideo, closeFloatingPlayer } = useFloatingVideo();
  
  if (!floatingVideo) return null;
  
  return (
    <FloatingVideoPlayer 
      video={floatingVideo} 
      onClose={closeFloatingPlayer} 
    />
  );
}
