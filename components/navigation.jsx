import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [exchangesOpen, setExchangesOpen] = useState(false);
  const [walletsOpen, setWalletsOpen] = useState(false);
  const [cardsOpen, setCardsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
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
    // Main Exchanges
    { name: 'Binance', path: '/binance', color: 'yellow' },
    { name: 'Bybit', path: '/bybit', color: 'blue' },
    { name: 'Kraken', path: '/kraken', color: 'purple' },
    { name: 'OKX', path: '/okx', color: 'green' },
    // Additional Exchanges
    { name: 'MEXC', path: '/mexc', color: 'red' },
    { name: 'KuCoin', path: '/kucoin', color: 'teal' },
    { name: 'Gate.io', path: '/gateio', color: 'indigo' },
    { name: 'Bitget', path: '/bitget', color: 'amber' },
    { name: 'CoinEx', path: '/coinex', color: 'emerald' },
  ];
  
  const walletItems = [
    { name: 'MetaMask', path: '/wallets/metamask', color: 'orange' },
    { name: 'Ledger', path: '/wallets/ledger', color: 'gray' },
    { name: 'Trezor', path: '/wallets/trezor', color: 'slate' },
    { name: 'Rabby', path: '/wallets/rabby', color: 'zinc' },
  ];
  
  const cardItems = [
    { name: 'Crypto.com', path: '/cards/crypto-com', color: 'blue' },
    { name: 'Wirex', path: '/cards/wirex', color: 'sky' },
    { name: 'Transak', path: '/cards/transak', color: 'cyan' },
    { name: 'Ramp', path: '/cards/ramp', color: 'blue' },
  ];
  
  const toolItems = [
    { name: 'TradingView', path: '/tools/tradingview', color: 'indigo' },
    { name: 'NordVPN', path: '/tools/nordvpn', color: 'blue' },
    { name: 'CoinTracking', path: '/tools/cointracking', color: 'violet' },
    { name: 'DeBank', path: '/tools/debank', color: 'rose' },
    { name: 'Zerion', path: '/tools/zerion', color: 'pink' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <motion.nav 
      className={`fixed w-full py-3 px-6 md:px-16 ${scrolled ? 'top-0' : 'top-8'} left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="relative group">
          <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            1ewis.com
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {mainNavItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`relative px-4 py-2 rounded-md transition-all duration-300 ${
                isActive(item.path) 
                  ? 'text-white font-medium' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
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
          
          {/* Exchanges Dropdown */}
          <div className="relative">
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${exchangesOpen || exchangeItems.some(item => isActive(item.path)) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              onClick={() => setExchangesOpen(!exchangesOpen)}
            >
              <span>Exchanges</span>
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${exchangesOpen ? 'rotate-180' : ''}`} />
            </button>
            
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
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${walletItems.some(item => isActive(item.path)) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              onClick={() => setWalletsOpen(!walletsOpen)}
            >
              <span>Wallets</span>
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${walletsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {walletsOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg overflow-hidden border border-gray-800 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {walletItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-gray-800/50 text-white` : `border-transparent hover:border-${item.color}-500 text-gray-300 hover:bg-gray-800/30 hover:text-white`}`}
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
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${cardItems.some(item => isActive(item.path)) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              onClick={() => setCardsOpen(!cardsOpen)}
            >
              <span>Cards</span>
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${cardsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {cardsOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg overflow-hidden border border-gray-800 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {cardItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-gray-800/50 text-white` : `border-transparent hover:border-${item.color}-500 text-gray-300 hover:bg-gray-800/30 hover:text-white`}`}
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
            <button 
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${toolItems.some(item => isActive(item.path)) ? 'text-white bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              onClick={() => setToolsOpen(!toolsOpen)}
            >
              <span>Tools</span>
              <ChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {toolsOpen && (
                <motion.div 
                  className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg overflow-hidden border border-gray-800 shadow-xl"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {toolItems.map((item) => (
                    <Link 
                      key={item.path} 
                      href={item.path}
                      className={`block px-4 py-3 transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-gray-800/50 text-white` : `border-transparent hover:border-${item.color}-500 text-gray-300 hover:bg-gray-800/30 hover:text-white`}`}
                      onClick={() => setToolsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-gray-300 hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Menu</span>
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-20"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex flex-col space-y-1 p-6">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
