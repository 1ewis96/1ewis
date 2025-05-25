import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check if user has a theme preference stored
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setIsDarkMode(storedTheme === 'dark');
    } else {
      // Check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.setProperty('--bg-gradient-from', '#030712'); // gray-950
      document.documentElement.style.setProperty('--bg-gradient-via', '#111827'); // gray-900
      document.documentElement.style.setProperty('--bg-gradient-to', '#000000'); // black
      document.documentElement.style.setProperty('--text-primary', '#ffffff'); // white
      document.documentElement.style.setProperty('--card-bg', 'rgba(17, 24, 39, 0.8)'); // gray-900/80
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.style.setProperty('--bg-gradient-from', '#f8fafc'); // slate-50
      document.documentElement.style.setProperty('--bg-gradient-via', '#f1f5f9'); // slate-100
      document.documentElement.style.setProperty('--bg-gradient-to', '#e2e8f0'); // slate-200
      document.documentElement.style.setProperty('--text-primary', '#1e293b'); // slate-800
      document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.8)'); // white/80
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.button
      className={`relative w-14 h-7 rounded-full flex items-center p-1 shadow-lg ${
        isDarkMode ? 'bg-blue-900 border border-blue-700' : 'bg-blue-400 border border-blue-300'
      }`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        className={`w-5 h-5 rounded-full flex items-center justify-center absolute ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
        animate={{ x: isDarkMode ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDarkMode ? (
          <Moon className="w-3 h-3 text-blue-300" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
