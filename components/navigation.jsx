import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, Sparkles, Zap, ArrowRight, Book, Newspaper, Video, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [exchangesOpen, setExchangesOpen] = useState(false);
  const [walletsOpen, setWalletsOpen] = useState(false);
  const [cardsOpen, setCardsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);
  const [newsCategories, setNewsCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesSubmenuOpen, setCategoriesSubmenuOpen] = useState(false);
  const [tokensSubmenuOpen, setTokensSubmenuOpen] = useState(false);
  const [topTokens, setTopTokens] = useState([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [tokensError, setTokensError] = useState(null);
  const [qaOpen, setQaOpen] = useState(false);
  const router = useRouter();

  // Function to toggle a dropdown and close others
  const toggleDropdown = (dropdown) => {
    // Close all dropdowns first
    if (dropdown !== 'portfolio') {
      setPortfolioOpen(false);
      setTokensSubmenuOpen(false);
    }
    if (dropdown !== 'exchanges') setExchangesOpen(false);
    if (dropdown !== 'wallets') setWalletsOpen(false);
    if (dropdown !== 'cards') setCardsOpen(false);
    if (dropdown !== 'tools') setToolsOpen(false);
    if (dropdown !== 'guides') {
      setGuidesOpen(false);
      setCategoriesSubmenuOpen(false);
    }
    if (dropdown !== 'qa') setQaOpen(false);

    // Toggle the selected dropdown
    switch(dropdown) {
      case 'portfolio':
        setPortfolioOpen(prev => !prev);
        break;
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
      case 'guides':
        setGuidesOpen(prev => !prev);
        if (!guidesOpen) setCategoriesSubmenuOpen(false);
        break;
      case 'qa':
        setQaOpen(prev => !prev);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch('https://api.1ewis.com/news/categories');

        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`);
        }

        const data = await response.json();
        setNewsCategories(data.categories || []);
        setCategoriesError(null);
      } catch (err) {
        console.error('Error loading categories:', err);
        setCategoriesError('Failed to load categories');
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchTopTokens = async () => {
      try {
        setTokensLoading(true);
        // Fetch the top 4 tokens from the API
        const response = await fetch('https://api.1ewis.com/tokens/market-cap?limit=4');
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Transform API data to match our component's expected format
        // Ensure we only take exactly 4 tokens
        const transformedTokens = data.items.slice(0, 4).map(item => ({
          symbol: item.coin.toUpperCase(),
          name: item.coinFullName,
          price: `$${item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          change: `${item.priceChange24h >= 0 ? '+' : ''}${item.priceChange24h.toFixed(2)}%`,
          color: getTokenColor(item.coin.toLowerCase()),
          image: item.tokenImage || `https://s3.1ewis.com/tokens/${item.coin.toLowerCase()}.png`
        }));
        
        setTopTokens(transformedTokens);
        setTokensError(null);
      } catch (err) {
        console.error('Error loading top tokens:', err);
        setTokensError('Failed to load tokens');
      } finally {
        setTokensLoading(false);
      }
    };
    
    // Helper function to assign colors to tokens
    const getTokenColor = (symbol) => {
      const colorMap = {
        btc: 'orange',
        eth: 'blue',
        sol: 'purple',
        bnb: 'yellow',
        xrp: 'teal',
        ada: 'blue',
        doge: 'yellow',
        dot: 'pink'
      };
      
      return colorMap[symbol] || 'gray';
    };

    fetchTopTokens();
  }, []);

  const mainNavItems = [
    { name: 'Home', path: '/' }
  ];

  const portfolioItems = [
    { name: 'Compare Exchanges', path: '/portfolio', color: 'blue' },
    { name: 'Tokens', isSubmenu: true, color: 'purple' }
  ];

  const exchangeItems = [
    // These appear under "Main Exchanges"
    { name: 'Bitrue', path: '/bitrue', color: 'blue' },
    { name: 'Coinflare', path: '/coinflare', color: 'orange' },
    // Items after this appear under "More Exchanges"
    { name: 'CoinJar', path: '/coinjar', color: 'green' },
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

  const guidesItems = [
    { name: 'All Guides', href: '/news/guides', color: 'green' },
    { name: 'Crypto News', href: '/news', color: 'blue' },
    { name: 'News Categories', isSubmenu: true, color: 'teal' },
    { name: 'Schedule', href: '/news/schedule', color: 'purple' }
  ];

  const qaItems = [
    { name: 'Q&A Home', path: '/qa', color: 'blue' },
    { name: 'Most Answered', path: '/questions/most-answered', color: 'indigo' },
    { name: 'Latest Questions', path: '/qa/latest', color: 'violet' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <motion.nav 
      className={`fixed w-full py-3 px-6 nav:px-16 ${scrolled ? 'top-0' : 'top-0'} left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md shadow-xl border-b border-white/10' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ top: '0' }} // Fixed position at top
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
        <div className="hidden nav:flex items-center space-x-1">
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
          
          {/* Portfolio Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('portfolio')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Portfolio</span>
              <motion.div
                animate={{ rotate: portfolioOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {portfolioOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-blue-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {portfolioItems.map((item, index) => 
                      item.isSubmenu ? (
                        <div key={index} className="relative">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center justify-between"
                            onClick={(e) => {
                              e.stopPropagation();
                              setTokensSubmenuOpen(prev => !prev);
                            }}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`ml-1 h-4 w-4 transition-transform ${tokensSubmenuOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {tokensSubmenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-800/50 border-l-2 border-purple-500/50"
                              >
                                {tokensLoading ? (
                                  <div className="px-4 py-2 text-xs text-gray-400 flex items-center">
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-purple-500 mr-2"></div>
                                    Loading...
                                  </div>
                                ) : tokensError ? (
                                  <div className="px-4 py-2 text-xs text-red-400">
                                    Failed to load
                                  </div>
                                ) : topTokens.length === 0 ? (
                                  <div className="px-4 py-2 text-xs text-gray-400">
                                    No tokens
                                  </div>
                                ) : (
                                  <>
                                    {topTokens.map((token) => (
                                      <Link
                                        key={token.symbol}
                                        href={`/token/${token.symbol.toLowerCase()}`}
                                        className="block pl-6 pr-4 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-between"
                                        onClick={() => {
                                          setPortfolioOpen(false);
                                          setTokensSubmenuOpen(false);
                                        }}
                                      >
                                        <div className="flex items-center">
                                          <img 
                                            src={token.image} 
                                            alt={token.symbol} 
                                            className="w-4 h-4 rounded-full mr-2" 
                                          />
                                          <span>{token.symbol}</span>
                                        </div>
                                        <div className="text-xs opacity-75">{token.price}</div>
                                      </Link>
                                    ))}
                                    <Link
                                      href="/tokens"
                                      className="block pl-6 pr-4 py-2 text-xs text-purple-400 hover:bg-gray-700 hover:text-purple-300 transition-colors border-t border-gray-700/50"
                                      onClick={() => {
                                        setPortfolioOpen(false);
                                        setTokensSubmenuOpen(false);
                                      }}
                                    >
                                      View All
                                    </Link>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link 
                          key={item.path} 
                          href={item.path}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setPortfolioOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Guides Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('guides')}
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
              <span>Guides</span>
              <motion.div
                animate={{ rotate: guidesOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {guidesOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-green-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {guidesItems.map((item, index) => 
                      item.isSubmenu ? (
                        <div key={index} className="relative">
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors flex items-center justify-between"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCategoriesSubmenuOpen(prev => !prev);
                            }}
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`ml-1 h-4 w-4 transition-transform ${categoriesSubmenuOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {categoriesSubmenuOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="bg-gray-800/50 border-l-2 border-teal-500/50"
                              >
                                {categoriesLoading ? (
                                  <div className="px-4 py-2 text-xs text-gray-400 flex items-center">
                                    <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-green-500 mr-2"></div>
                                    Loading...
                                  </div>
                                ) : categoriesError ? (
                                  <div className="px-4 py-2 text-xs text-red-400">
                                    Failed to load
                                  </div>
                                ) : newsCategories.length === 0 ? (
                                  <div className="px-4 py-2 text-xs text-gray-400">
                                    No categories
                                  </div>
                                ) : (
                                  <>
                                    {newsCategories.map((category) => (
                                      <Link
                                        key={category.categoryName}
                                        href={`/news/${encodeURIComponent(category.categoryName.toLowerCase().replace(/\s+/g, '-'))}`}
                                        className="block pl-6 pr-4 py-2 text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center"
                                        onClick={() => {
                                          setGuidesOpen(false);
                                          setCategoriesSubmenuOpen(false);
                                        }}
                                      >
                                        <span 
                                          className="inline-block w-2 h-2 rounded-full mr-2" 
                                          style={{ backgroundColor: category.colorHex }}
                                        ></span>
                                        {category.categoryName}
                                      </Link>
                                    ))}
                                    <Link
                                      href="/news"
                                      className="block pl-6 pr-4 py-2 text-xs text-green-400 hover:bg-gray-700 hover:text-green-300 transition-colors border-t border-gray-700/50"
                                      onClick={() => {
                                        setGuidesOpen(false);
                                        setCategoriesSubmenuOpen(false);
                                      }}
                                    >
                                      View All
                                    </Link>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => {
                            setGuidesOpen(false);
                            setCategoriesSubmenuOpen(false);
                          }}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>
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
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-yellow-500/20 max-h-96 overflow-y-auto"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-xs text-gray-500 uppercase">Main Exchanges</div>
                    {exchangeItems.slice(0, 2).map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setExchangesOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="px-4 py-2 text-xs text-gray-500 uppercase mt-1">More Exchanges</div>
                    {exchangeItems.slice(2).map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setExchangesOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
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
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-blue-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {walletItems.map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setWalletsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
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
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-pink-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {cardItems.map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setCardsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
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
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-purple-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {toolItems.map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setToolsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          

          
          {/* Q&A Dropdown */}
          <div className="relative">
            <motion.button 
              onClick={() => toggleDropdown('qa')}
              className="flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-md transition-all duration-300 relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span>Q&A</span>
              <motion.div
                animate={{ rotate: qaOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="ml-1 w-4 h-4" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {qaOpen && (
                <motion.div 
                  className="absolute left-0 mt-2 w-56 rounded-md shadow-xl bg-gray-900/95 backdrop-blur-sm ring-1 ring-white/10 overflow-hidden z-50 border border-blue-500/20"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="py-1">
                    {qaItems.map((item) => (
                      <Link 
                        key={item.path} 
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                        onClick={() => setQaOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Videos Link */}
          <Link 
            href="/videos" 
            className={`relative px-4 py-2 rounded-md transition-all duration-300 group ${
              isActive('/videos') 
                ? 'text-white font-medium bg-white/5' 
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <motion.span
              className="absolute inset-0 rounded-md bg-gradient-to-r from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
            {isActive('/videos') && (
              <motion.span 
                className="absolute inset-0 bg-white/10 rounded-md z-0" 
                layoutId="navbar-active-item"
                transition={{ type: 'spring', duration: 0.6 }}
              />
            )}
            <span className="relative z-10">Videos</span>
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
        <div className="nav:hidden">
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
            className="nav:hidden fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/95 backdrop-blur-md overflow-y-auto"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ height: '100vh' }}
          >
            {/* Close button in top-right corner */}
            <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-md py-4 px-6 flex justify-between items-center border-b border-gray-800/50">
              <div className="flex items-center">
                <Sparkles className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="font-bold text-xl">1ewis.com</span>
              </div>
              <motion.button
                className="p-2 rounded-full bg-gray-800/70 text-white"
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            <div className="flex flex-col space-y-1 p-6 pb-24 mt-4">
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
              
              {/* Mobile Videos Button */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                <Link 
                  href="/videos"
                  className={`block py-3 px-4 text-lg rounded-md transition-colors mb-2 ${
                    isActive('/videos') 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <Video className="w-5 h-5 mr-2" />
                    Videos
                  </span>
                </Link>
              </motion.div>
              
              {/* Mobile Q&A Button */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.175 }}
              >
                <Link 
                  href="/qa"
                  className={`block py-3 px-4 text-lg rounded-md transition-colors mb-2 ${
                    isActive('/qa') 
                      ? 'bg-white/10 text-white font-medium' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex items-center">
                    <HelpCircle className="w-5 h-5 mr-2" />
                    Q&A
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
                    eBooks
                  </span>
                </Link>
              </motion.div>
              
              {/* Portfolio Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="px-4 text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Portfolio</h3>
                <div className="space-y-1">
                  {portfolioItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.05) }}
                    >
                      {item.isSubmenu ? (
                        <div className={`block py-2 px-4 text-base transition-colors border-l-2 border-${item.color}-500 text-gray-300`}>
                          {item.name}
                        </div>
                      ) : (
                        <Link 
                          href={item.path}
                          className={`block py-2 px-4 text-base transition-colors border-l-2 ${isActive(item.path) ? `border-${item.color}-500 bg-white/5 text-white` : `border-transparent text-gray-300 hover:border-${item.color}-500 hover:bg-white/5 hover:text-white`}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Exchanges Section */}
              <motion.div 
                className="mt-4 pt-4 border-t border-gray-800"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
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
                  {/* News items links */}
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Link 
                      href="/news"
                      className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive('/news') ? 'border-blue-500 bg-white/5 text-white font-medium' : 'border-transparent text-gray-300 hover:border-blue-500 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Latest News
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                  >
                    <Link 
                      href="/news/guides"
                      className={`block py-3 px-4 text-lg rounded-md transition-colors border-l-2 ${isActive('/news/guides') ? 'border-green-500 bg-white/5 text-white font-medium' : 'border-transparent text-gray-300 hover:border-green-500 hover:bg-white/5 hover:text-white'}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Guides
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
