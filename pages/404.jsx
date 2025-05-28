import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';

export default function Custom404() {
  // Popular pages for suggestions
  const popularPages = [
    { name: 'Bitrue Exchange', path: '/bitrue', icon: <ArrowRight className="w-4 h-4" /> },
    { name: 'Crypto Portfolio', path: '/portfolio', icon: <ArrowRight className="w-4 h-4" /> },
    { name: 'Free eBooks', path: '/ebooks', icon: <ArrowRight className="w-4 h-4" /> },
  ];

  return (
    <>
      <Head>
        <title>Page Not Found | 1ewis.com</title>
        <meta name="description" content="Sorry, we couldn't find the page you're looking for. Explore our crypto exchange reviews, wallet guides, and exclusive deals." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white flex flex-col">
        <main className="flex-grow flex items-center justify-center px-4 py-20">
          <div className="max-w-3xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                404
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Page Not Found
              </h2>
              
              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/" passHref>
                  <Button variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Home className="mr-2 h-5 w-5" />
                    <span>Back to Home</span>
                  </Button>
                </Link>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">Popular Pages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {popularPages.map((page, index) => (
                    <Link key={index} href={page.path} passHref>
                      <motion.div
                        className="bg-gray-800/50 hover:bg-gray-800/80 rounded-lg p-4 cursor-pointer transition-all duration-300 flex items-center justify-between"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span>{page.name}</span>
                        {page.icon}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
