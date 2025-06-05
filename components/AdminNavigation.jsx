import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, ChevronDown, Settings, FileText, Edit, Tag, Clock, Plus, LogOut, MessageSquare, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logoutAdmin } from '../utils/authUtils';

export default function AdminNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApprovalsOpen, setIsApprovalsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Clear API key and redirect to login
    logoutAdmin();
    router.push('/admin/login');
  };

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: <FileText className="w-5 h-5 mr-2" /> },
    { name: 'New Article', path: '/admin/new-article', icon: <Plus className="w-5 h-5 mr-2" /> },
    { name: 'Edit Articles', path: '/admin/edit-articles', icon: <Edit className="w-5 h-5 mr-2" /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tag className="w-5 h-5 mr-2" /> },
    { name: 'Scheduled', path: '/admin/scheduled', icon: <Clock className="w-5 h-5 mr-2" /> },
    { 
      name: 'Approvals', 
      icon: <ChevronDown className="w-5 h-5 mr-2" />,
      dropdown: true,
      items: [
        { name: 'Questions', path: '/admin/approvals/questions', icon: <MessageSquare className="w-5 h-5 mr-2" /> },
        { name: 'Answers', path: '/admin/approvals/answers', icon: <MessageCircle className="w-5 h-5 mr-2" /> }
      ]
    },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="w-5 h-5 mr-2" /> },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <motion.nav 
      className="fixed w-full py-3 px-6 md:px-16 top-0 left-0 z-50 bg-black/90 backdrop-blur-md shadow-xl border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/admin" className="relative group flex items-center">
          <div className="flex flex-col">
            <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
              1ewis.com <span className="text-white text-sm font-normal">News Admin</span>
            </span>
            <span className="text-xs text-gray-400 font-medium mt-0.5">
              News & Article Management
            </span>
          </div>
          <motion.span 
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {adminNavItems.map((item, index) => (
            item.dropdown ? (
              <div key={`dropdown-${index}`} className="relative">
                <button 
                  onClick={() => setIsApprovalsOpen(!isApprovalsOpen)}
                  className={`relative px-4 py-2 rounded-md transition-all duration-300 group flex items-center ${
                    router.pathname.includes('/admin/approvals') 
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
                  <span className="relative z-10 flex items-center">
                    {item.icon}
                    {item.name}
                  </span>
                </button>
                
                {/* Dropdown menu */}
                <AnimatePresence>
                  {isApprovalsOpen && (
                    <motion.div 
                      className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="py-1">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={`block px-4 py-2 text-sm ${router.pathname === subItem.path 
                              ? 'bg-white/10 text-white' 
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                          >
                            <span className="flex items-center">
                              {subItem.icon}
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link 
                key={item.path} 
                href={item.path}
                className={`relative px-4 py-2 rounded-md transition-all duration-300 group flex items-center ${
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
                    layoutId="admin-navbar-active-item"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center">
                  {item.icon}
                  {item.name}
                </span>
              </Link>
            )
          ))}
          
          <button 
            onClick={handleLogout}
            className="ml-4 flex items-center px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-all duration-300 relative group"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-lg z-40 flex flex-col"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-6 space-y-4 mt-4">
              {adminNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center px-4 py-3 rounded-md ${
                    isActive(item.path)
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
              
              <button 
                onClick={handleLogout}
                className="flex items-center px-4 py-3 text-red-400 hover:text-red-300 rounded-md mt-4 border-t border-white/10 pt-6"
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
