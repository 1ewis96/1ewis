import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Binance', path: '/binance' },
    { name: 'Bybit', path: '/bybit' },
    { name: 'Kraken', path: '/kraken' },
    { name: 'OKX', path: '/okx' },
  ];

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="w-full py-4 px-6 md:px-16 absolute top-0 left-0 z-50">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          1ewis.com
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`transition-colors ${
                isActive(item.path) 
                  ? 'text-blue-400 font-medium' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 absolute left-4 right-4 border border-gray-800 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`transition-colors py-2 px-3 rounded-md ${
                  isActive(item.path) 
                    ? 'bg-gray-800 text-blue-400 font-medium' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
