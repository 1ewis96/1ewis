import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, Sparkles, Zap, ArrowRight, Mail, Book, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastPriceTicker, setPastPriceTicker] = useState(false);
  const [exchangesOpen, setExchangesOpen] = useState(false);
  const [walletsOpen, setWalletsOpen] = useState(false);
  const [cardsOpen, setCardsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const router = useRouter();
  
  // Function to toggle a dropdown and close others
  const toggleDropdown = (dropdown) => {
    // Close all dropdowns first
    if (dropdown !== 'exchanges') setExchangesOpen(false);
    if (dropdown !== 'wallets') setWalletsOpen(false);
    if (dropdown !== 'cards') setCardsOpen(false);
    if (dropdown !== 'tools') setToolsOpen(false);
    if (dropdown !== 'news') setNewsOpen(false);
    
    // Toggle the selected dropdown
    switch(dropdown) {
      case 'exchanges':
        setExchangesOpen(prev => !prev);
        break;
      case 'wallets':
        setWalletsOpen(prev => !prev);
        break;
      case 'cards':
        setCardsOpen(prev => !prev);
        break;
      case 'tools':
        setToolsOpen(prev => !prev);
        break;
      case 'news':
        setNewsOpen(prev => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      // Check if we've scrolled past the price ticker (approximately 36px height)
      if (offset > 36) {
        setPastPriceTicker(true);
      } else {
        setPastPriceTicker(false);
      }
      
      // General scrolled state for visual effects
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mainNavItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' }
  ];
  
  const exchangeItems = [
    // Only Bitrue
    { name: 'Bitrue', path: '/bitrue', color: 'blue' },
  ];
  
  const walletItems = [
    { name: 'YouHodler', path: '/wallets/youhodler', color: 'teal' },
    { name: 'Ledger', path: '/wallets/ledger', color: 'gray' },
    { name: 'MetaMask', path: '/wallets/metamask', color: 'orange' },
  ];
  
  const cardItems = [
    { name: 'Revolut', path: '/cards/revolut', color: 'blue' },
  ];
  
  const toolItems = [
    { name: 'TradingView', path: '/tools/tradingview', color: 'indigo' },
    { name: 'NordVPN', path: '/tools/nordvpn', color: 'blue' },
    { name: 'CoinTracking', path: '/tools/cointracking', color: 'violet' },
  ];
  
  const newsItems = [
    { name: 'Latest News', path: '/news', color: 'green' },
    { name: 'Market Updates', path: '/news/market', color: 'emerald' },
    { name: 'Trending Topics', path: '/news/trending', color: 'teal' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <motion.nav 
      className={`fixed w-full py-3 px-6 md:px-16 ${scrolled ? 'top-0' : 'top-0'} left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-xl border-b border-white/10' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ top: pastPriceTicker ? '0' : '36px' }} // Dynamic position based on scroll position
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="relative group flex items-center">
          <motion.div
            className="mr-1 text-yellow-400"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={18} />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              1ewis.com
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5 text-center">
              Your home for exclusive crypto deals
            </span>
          </div>
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: isMenuOpen ? "100%" : 0 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative px-4 py-2 rounded-md transition-all duration-300 group ${
                isActive(item.path) 
                  ? 'text-white font-medium bg-white/5' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              {isActive(item.path) && (
                <motion.span 
                  className="absolute inset-0 bg-white/10 rounded-md z-0" 
                  layoutId="navbar-active-item"
                  transition={{ type: 'spring', duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
         
          {/* Categories Dropdowns */}
          
          {/* News Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('news')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>News</span>
              <motion.div
                animate={{ rotate: newsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {newsOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-green-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {newsItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                      onClick={() => setNewsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Exchanges Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('exchanges')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-yellow-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Exchanges</span>
              <motion.div
                animate={{ rotate: exchangesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {exchangesOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg overflow-hidden border border-gray-800 shadow-xl max-h-96 overflow-y-auto"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase">Main Exchanges</div>
                  {exchangeItems.slice(0, 4).map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-gray-800/50 text-white` : `border-transparent hover:border-${item.color}-500 text-gray-300 hover:bg-gray-800/30 hover:text-white`}`}
                      onClick={() => setExchangesOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="px-4 py-2 text-xs text-gray-500 uppercase">More Exchanges</div>
                  {exchangeItems.slice(4).map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-gray-800/50 text-white` : `border-transparent hover:border-${item.color}-500 text-gray-300 hover:bg-gray-800/30 hover:text-white`}`}
                      onClick={() => setExchangesOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Wallets Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('wallets')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Wallets</span>
              <motion.div
                animate={{ rotate: walletsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {walletsOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-blue-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {walletItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                      onClick={() => setWalletsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Cards Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('cards')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Cards</span>
              <motion.div
                animate={{ rotate: cardsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {cardsOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-yellow-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {cardItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                      onClick={() => setCardsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Tools Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('tools')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Tools</span>
              <motion.div
                animate={{ rotate: toolsOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {toolsOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-48 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-purple-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {toolItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                      onClick={() => setToolsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          

          
          {/* Q&A Button */}
          <Link 
            href="/qa" 
            className={`relative px-4 py-2 rounded-md transition-all duration-300 group ${
              isActive('/qa') 
                ? 'text-white font-medium bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <motion.span
              className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            {isActive('/qa') && (
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-md z-0" 
                layoutId="navbar-active-item"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Q&A</span>
          </Link>
          
          {/* Mailing List Button (at the end of navbar) */}
          <Link href="/mailing-list" passHref legacyBehavior>
            <motion.a 
              className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-pink-600/80 to-purple-600/80 hover:from-pink-600 hover:to-purple-600 rounded-md transition-all duration-300 relative group ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="mr-2 h-4 w-4" />
              <span>Newsletter</span>
            </motion.a>
          </Link>

                    
          {/* eBooks Call to Action */}
          <Link href="/ebooks" passHref legacyBehavior>
            <motion.a 
              className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 rounded-md transition-all duration-300 relative group ml-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Book className="mr-2 h-4 w-4" />
              <span>eBooks</span>
            </motion.a>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white rounded-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-20 overflow-y-auto max-h-screen"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Close button in top-right corner */}
            <motion.button
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-800/70 text-white z-50"
              onClick={() => setIsMenuOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
            <div className="flex flex-col space-y-1 p-6 pb-24">
              {mainNavItems.map((item) => (
                <motion.div
                  key={item.path}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link 
                    href={item.path}
                    className={`block py-3 px-4 text-lg rounded-md transition-colors ${isActive(item.path) ? 'bg-white/10 text-white font-medium' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Mailing List Button */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Link 
                  href="/mailing-list"
                  className={`block py-3 px-4 text-lg rounded-md transition-colors mb-2 ${
                    isActive('/mailing-list') 
                      ? 'bg-gradient-to-r from-pink-600/80 to-purple-600/80 text-white font-medium' 
                      : 'bg-gradient-to-r from-pink-600/60 to-purple-600/60 text-white hover:from-pink-600/80 hover:to-purple-600/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    Newsletter
                  </span>
                </Link>
              </motion.div>
              
              {/* Mobile eBooks Button */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link 
                  href="/ebooks"
                  className={`block py-3 px-4 text-lg rounded-md transition-colors mb-2 ${
                    isActive('/ebooks') 
                      ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-medium' 
                      : 'bg-gradient-to-r from-blue-600/60 to-purple-600/60 text-white hover:from-blue-600/80 hover:to-purple-600/80'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Book className="w-5 h-5 mr-2" />
                    Free eBooks
                  </span>
                </Link>
              </motion.div>
              
              {/* Exchanges Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Exchanges</h3>
                <div className="space-y-1">
                  {exchangeItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.05) }}
                    >
                      <Link 
                        href={item.path}
                        className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Wallets Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Wallets</h3>
                <div className="space-y-1">
                  {walletItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                    >
                      <Link 
                        href={item.path}
                        className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Cards Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Cards & On-Ramps</h3>
                <div className="space-y-1">
                  {cardItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + (index * 0.05) }}
                    >
                      <Link 
                        href={item.path}
                        className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Tools Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Tools & Analytics</h3>
                <div className="space-y-1">
                  {toolItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + (index * 0.05) }}
                    >
                      <Link 
                        href={item.path}
                        className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* News Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Crypto News</h3>
                <div className="space-y-1">
                  {newsItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + (index * 0.05) }}
                    >
                      <Link 
                        href={item.path}
                        className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white font-medium` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
