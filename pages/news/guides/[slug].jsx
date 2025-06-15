import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Footer from '../../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, Tag, Clock, Share2, ArrowRight } from 'lucide-react';
import CryptoPriceTracker from '../../../components/guides/CryptoPriceTracker';
import CryptoCalculator from '../../../components/guides/CryptoCalculator';
import InteractiveQuiz from '../../../components/guides/InteractiveQuiz';
import SingleTokenPrice from '../../../components/guides/SingleTokenPrice';
import AutoplayVideoPlayer from '../../../components/guides/AutoplayVideoPlayer';

export default function GuidePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [activeSection, setActiveSection] = useState(0);
  const [showAutoplayVideo, setShowAutoplayVideo] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  
  // Detect client-side rendering
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Show autoplay video after 10 seconds of reading the guide (client-side only)
  useEffect(() => {
    if (slug && isBrowser) {
      const timer = setTimeout(() => {
        setShowAutoplayVideo(true);
      }, 10000); // 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [slug, isBrowser]);

  // Sample quiz data for the interactive quiz component
  const quizData = {
    title: 'Test Your Crypto Knowledge',
    description: 'See how much you know about cryptocurrency basics',
    questions: [
      {
        question: 'Who created Bitcoin?',
        answers: ['Vitalik Buterin', 'Satoshi Nakamoto', 'Charlie Lee', 'Nick Szabo'],
        correctAnswer: 1
      },
      {
        question: 'What consensus mechanism does Bitcoin use?',
        answers: ['Proof of Stake', 'Delegated Proof of Stake', 'Proof of Work', 'Proof of Authority'],
        correctAnswer: 2
      },
      {
        question: 'What is a blockchain?',
        answers: ['A centralized database', 'A distributed ledger', 'A programming language', 'A type of cryptocurrency'],
        correctAnswer: 1
      },
      {
        question: 'What is a smart contract?',
        answers: ['A legal document', 'Self-executing code on a blockchain', 'A type of wallet', 'A trading algorithm'],
        correctAnswer: 1
      },
      {
        question: 'Which of these is NOT a cryptocurrency?',
        answers: ['Ethereum', 'Litecoin', 'Blockchain', 'Dogecoin'],
        correctAnswer: 2
      }
    ]
  };
  
  // This would normally come from an API based on the slug
  // For now we'll use a placeholder guide
  const guide = {
    title: 'Getting Started with Cryptocurrency',
    description: 'Learn the basics of cryptocurrency, blockchain technology, and how to make your first purchase.',
    category: 'Beginner',
    image: '/images/guides/crypto-basics.jpg',
    publishedDate: '2025-05-15',
    readTime: '8 min read',
    author: {
      name: 'Lewis',
      image: '/images/author.jpg'
    },
    content: [
      {
        type: 'paragraph',
        text: 'Cryptocurrency has revolutionized the way we think about money and financial transactions. As a digital or virtual form of currency, it uses cryptography for security, making it difficult to counterfeit. Unlike traditional currencies issued by governments (fiat currencies), most cryptocurrencies operate on decentralized networks based on blockchain technology—a distributed ledger enforced by a disparate network of computers.'
      },
      {
        type: 'video',
        youtubeId: 'SSo_EIwHSd4',
        title: 'What is Cryptocurrency? A Simple Explanation'
      },
      {
        type: 'heading',
        text: 'What is Cryptocurrency?'
      },
      {
        type: 'paragraph',
        text: 'Cryptocurrency is a digital or virtual currency that uses cryptography for security, making it difficult to counterfeit. It operates on technology called blockchain, which is a distributed ledger enforced by a network of computers.'
      },
      {
        type: 'singleToken',
        tokenId: 'bitcoin',
        title: 'Bitcoin (BTC) Live Price'
      },
      {
        type: 'paragraph',
        text: 'Blockchain technology creates a record that can\'t be changed without the consensus of the entire network.'
      },
      {
        type: 'paragraph',
        text: 'This decentralized nature is what makes blockchain so revolutionary. There is no central authority controlling the ledger, making it transparent and resistant to modification of the data.'
      },
      {
        type: 'heading',
        text: 'Popular Cryptocurrencies'
      },
      {
        type: 'paragraph',
        text: 'While Bitcoin was the first and remains the most well-known cryptocurrency, there are now thousands of alternative cryptocurrencies with various functions and specifications. Some of these are clones or forks of Bitcoin, while others are new currencies built from scratch.'
      },
      {
        type: 'priceTracker',
        title: 'Live Cryptocurrency Prices',
        description: 'Track the latest prices of major cryptocurrencies'
      },
      {
        type: 'list',
        items: [
          'Choose a reputable cryptocurrency exchange or broker.',
          'Create and verify your account.',
          'Deposit cash to your account.',
          'Place a cryptocurrency order.',
          'Store your cryptocurrency in a secure wallet.'
        ]
      },
      {
        type: 'list',
        items: [
          'Bitcoin (BTC): The original cryptocurrency, created in 2009.',
          'Ethereum (ETH): A platform for decentralized applications and smart contracts.',
          'Ripple (XRP): Designed for cross-border payments and remittances.',
          'Cardano (ADA): A proof-of-stake blockchain platform.',
          'Solana (SOL): Known for high throughput and fast transaction speeds.'
        ]
      },
      {
        type: 'heading',
        text: 'How to Buy Cryptocurrency'
      },
      {
        type: 'paragraph',
        text: 'Getting started with cryptocurrency is easier than you might think. Here\'s a simple process to follow:'
      },
      {
        type: 'calculator',
        title: 'Cryptocurrency Converter',
        description: 'Convert between different cryptocurrencies and fiat currencies'
      },
      {
        type: 'heading',
        text: 'Test Your Knowledge'
      },
      {
        type: 'paragraph',
        text: 'Now that you\'ve learned the basics of cryptocurrency, test your knowledge with this quick quiz!'
      },
      {
        type: 'quiz',
        quizId: 'crypto-basics',
        title: 'Cryptocurrency Quiz',
        description: 'Test your understanding of crypto concepts'
      }
    ]
  };
  
  // For a real app, this would come from an API
  const relatedGuides = [
    {
      id: 2,
      title: 'How to Set Up a Secure Crypto Wallet',
      description: 'A step-by-step guide to setting up and securing your cryptocurrency wallet.',
      category: 'Security',
      image: '/images/guides/secure-wallet.jpg',
      slug: 'how-to-set-up-secure-crypto-wallet',
    },
    {
      id: 3,
      title: 'Understanding DeFi Platforms',
      description: 'Explore decentralized finance platforms and how they\'re revolutionizing traditional financial services.',
      category: 'DeFi',
      image: '/images/guides/defi-platforms.jpg',
      slug: 'understanding-defi-platforms',
    },
  ];
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Head>
        <title>{guide.title} | 1ewis.com</title>
        <meta name="description" content={guide.description} />
      </Head>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="pt-36 pb-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background animation elements */}
          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -z-10"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-6">
                <motion.button 
                  onClick={() => router.push('/news/guides')}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Guides
                </motion.button>
              </div>
              
              <div className="inline-flex items-center mb-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 px-4 py-2 rounded-full">
                <span className="text-cyan-300 font-medium">{guide.category}</span>
              </div>
              
              <motion.h1 
                className="text-3xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {guide.title}
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-300 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {guide.description}
              </motion.p>
              
              <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mt-8">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(guide.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{guide.readTime}</span>
                </div>
                
                <div className="flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  <span>{guide.category}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="mb-12 rounded-xl overflow-hidden shadow-xl">
              <img 
                src={guide.image || "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide"} 
                alt={guide.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  if (e.target.src !== "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide") {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/1200x600/1e293b/e2e8f0?text=1ewis+Guide";
                  } else {
                    // If even the placeholder fails, remove the error handler to prevent loops
                    e.target.onerror = null;
                  }
                }}
              />
            </div>
            
            {/* Guide Content */}
            <motion.div 
              className="prose prose-lg prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {guide.content.map((block, index) => {
                switch(block.type) {
                  case 'heading':
                    return (
                      <motion.h2 
                        key={index} 
                        className="text-2xl font-bold mt-8 mb-4 text-cyan-300"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        {block.text}
                      </motion.h2>
                    );
                  case 'paragraph':
                    return (
                      <motion.p 
                        key={index} 
                        className="mb-6 text-gray-300 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        {block.text}
                      </motion.p>
                    );
                  case 'list':
                    return (
                      <motion.ul 
                        key={index} 
                        className="mb-6 pl-6 space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                      >
                        {block.items.map((item, itemIndex) => (
                          <motion.li 
                            key={itemIndex} 
                            className="text-gray-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index + 0.05 * itemIndex, duration: 0.3 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </motion.ul>
                    );
                  case 'video':
                    return (
                      <motion.div
                        key={index}
                        className="mb-10 mt-6 rounded-xl overflow-hidden shadow-lg bg-gray-900 border border-gray-800"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <div className="aspect-w-16 aspect-h-9">
                          <iframe
                            src={`https://www.youtube.com/embed/${block.youtubeId}`}
                            title={block.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-white">{block.title}</h3>
                        </div>
                      </motion.div>
                    );
                  case 'priceTracker':
                    return (
                      <motion.div
                        key={index}
                        className="mb-10 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <CryptoPriceTracker />
                      </motion.div>
                    );
                  case 'singleToken':
                    return (
                      <motion.div
                        key={index}
                        className="mb-10 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <SingleTokenPrice tokenId={block.tokenId || 'bitcoin'} />
                      </motion.div>
                    );
                  case 'calculator':
                    return (
                      <motion.div
                        key={index}
                        className="mb-10 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <CryptoCalculator />
                      </motion.div>
                    );
                  case 'quiz':
                    return (
                      <motion.div
                        key={index}
                        className="mb-10 mt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.6 }}
                      >
                        <InteractiveQuiz quizId={block.quizId} />
                      </motion.div>
                    );
                  default:
                    return null;
                }
              })}
            </motion.div>
          </div>
        </section>
        
        {/* Related Guides */}
        <section className="py-12 px-4 bg-gray-950">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-white">Related Guides</h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {relatedGuides.map((relatedGuide) => (
                <motion.div
                  key={relatedGuide.id}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-cyan-900/20 transition-all"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-cyan-600/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                        {relatedGuide.category}
                      </span>
                    </div>
                    <img 
                      src={relatedGuide.image || "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide"} 
                      alt={relatedGuide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (e.target.src !== "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide") {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x200/1e293b/e2e8f0?text=1ewis+Guide";
                        } else {
                          // If even the placeholder fails, remove the error handler to prevent loops
                          e.target.onerror = null;
                        }
                      }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{relatedGuide.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{relatedGuide.description}</p>
                    <a 
                      href={`/news/guides/${relatedGuide.slug}`} 
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Read Guide <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
              
              {/* View All Guides Link */}
              <motion.div
                className="flex items-center justify-center bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl overflow-hidden border border-dashed border-gray-700 h-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <a 
                  href="/news/guides" 
                  className="flex flex-col items-center justify-center p-6 h-full w-full"
                >
                  <span className="text-xl font-bold text-cyan-400 mb-2">View All Guides</span>
                  <span className="text-gray-400">Explore our complete collection</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Autoplay Video Player - only rendered client-side */}
      {isBrowser && (
        <AnimatePresence>
          {showAutoplayVideo && (
            <AutoplayVideoPlayer onClose={() => setShowAutoplayVideo(false)} />
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
