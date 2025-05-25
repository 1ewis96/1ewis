import React from 'react';
import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 text-center text-sm text-gray-500 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            © 2025 1ewis.com — All Rights Reserved
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-gray-300 transition-colors duration-200">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors duration-200">
              Privacy
            </Link>
            <a 
              href="https://github.com/1ewis96/1ewis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-300 transition-colors duration-200"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
            <a 
              href="https://x.com/1ewis_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-gray-300 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4 mr-1" />
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
