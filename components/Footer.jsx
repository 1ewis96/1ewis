import React from 'react';
import Link from 'next/link';
import { Github, Twitter, Rss, Mail, Map, DollarSign } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-8 text-center text-sm text-gray-500 bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            © 2025 1ewis.com — All Rights Reserved
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6 mt-4 md:mt-0">
            <Link href="/terms" className="px-2 py-1 hover:text-gray-300 transition-colors duration-200">
              Terms
            </Link>
            <Link href="/privacy" className="px-2 py-1 hover:text-gray-300 transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/advertise" className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200">
              <DollarSign className="w-4 h-4 mr-1" />
              Advertise
            </Link>
            <Link href="/mailing-list" className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200">
              <Mail className="w-4 h-4 mr-1" />
              Newsletter
            </Link>
            <a 
              href="https://github.com/1ewis96/1ewis" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </a>
            <a 
              href="https://x.com/1ewis_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200"
            >
              <Twitter className="w-4 h-4 mr-1" />
              Twitter
            </a>
            <a 
              href="/news/feed.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200"
            >
              <Rss className="w-4 h-4 mr-1" />
              RSS Feed
            </a>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center px-2 py-1 hover:text-gray-300 transition-colors duration-200"
            >
              <Map className="w-4 h-4 mr-1" />
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
