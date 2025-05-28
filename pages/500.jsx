import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Server Error | 1ewis.com</title>
        <meta name="description" content="We're experiencing some technical difficulties. Please try again in a few moments." />
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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
                500
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Server Error
              </h2>
              
              <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
                We're experiencing some technical difficulties. Our team has been notified and is working to fix the issue.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
                <Link href="/" passHref>
                  <Button variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Home className="mr-2 h-5 w-5" />
                    <span>Back to Home</span>
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  <span>Try Again</span>
                </Button>
              </div>
              
              <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-4">While You Wait</h3>
                <p className="text-gray-300 mb-4">
                  You can try refreshing the page, clearing your browser cache, or coming back later.
                </p>
                <p className="text-gray-400 text-sm">
                  If the problem persists, please contact us at support@1ewis.com
                </p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
