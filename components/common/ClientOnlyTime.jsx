import React, { useState, useEffect } from 'react';

export default function ClientOnlyTime({ format = 'time' }) {
  const [time, setTime] = useState('--:--');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Set initial time
    updateTime();
    
    // Optional: Update time every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const updateTime = () => {
    const now = new Date();
    if (format === 'time') {
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else if (format === 'full') {
      setTime(now.toLocaleTimeString());
    }
  };
  
  // Only show actual time on client-side
  return <>{mounted ? time : '--:--'}</>;
}
