import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MarketNewsPage() {
  // Mock data for market news articles - will be replaced with API data later
  const mockMarketNews = [
    {
      id: 1,
      title: "Bitcoin Price Analysis: BTC Consolidates Above $100K",
      summary: "Bitcoin continues to hold strong above the psychological $100,000 level as institutional inflows remain steady.",
      date: "May 28, 2025",
      readTime: "5 min read",
      imageUrl: "/images/news/placeholder-btc.jpg"
    },
    {
      id: 2,
      title: "Ethereum Surges Following Successful Protocol Upgrade",
      summary: "ETH price jumps 15% after the latest network upgrade improves scalability and reduces transaction fees.",
      date: "May 27, 2025",
      readTime: "4 min read",
      imageUrl: "/images/news/placeholder-eth.jpg"
    },
    {
      id: 3,
      title: "DeFi Market Cap Reaches New Heights",
      summary: "The total value locked in decentralized finance protocols has reached an all-time high of $500 billion.",
      date: "May 26, 2025",
      readTime: "6 min read",
      imageUrl: "/images/news/placeholder-defi.jpg"
    },
    {
      id: 4,
      title: "Altcoin Season: Top Performers This Week",
      summary: "Several altcoins have outperformed Bitcoin this week. Here's our analysis of the top gainers.",
      date: "May 25, 2025",
      readTime: "7 min read",
      imageUrl: "/images/news/placeholder-alts.jpg"
    },
    {
      id: 5,
      title: "Market Sentiment Analysis: Fear & Greed Index Update",
      summary: "Our weekly review of market sentiment indicators and what they suggest for crypto price action.",
      date: "May 24, 2025",
      readTime: "5 min read",
      imageUrl: "/images/news/placeholder-sentiment.jpg"
    },
    {
      id: 6,
      title: "Trading Volume Analysis: Exchange Data Insights",
      summary: "Breaking down the latest trading volume data across major exchanges and what it means for the market.",
      date: "May 23, 2025",
      readTime: "8 min read",
      imageUrl: "/images/news/placeholder-volume.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Crypto Market Updates & Price Analysis | 1ewis.com</title>
        <meta name="description" content="Get the latest cryptocurrency market updates, price analysis, and trading insights. Stay informed about Bitcoin, Ethereum, and altcoin market movements." />
        <meta name="keywords" content="crypto market updates, bitcoin price analysis, ethereum price, altcoin market, crypto trading insights" />
        <link rel="canonical" href="https://1ewis.com/news/market" />
      </Head>
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Back to News Link */}
        <Link href="/news" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Back to All News</span>
        </Link>
        
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400">
              Market Updates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Stay on top of cryptocurrency market trends with our in-depth analysis, price predictions, and trading insights.
            </p>
          </motion.div>
        </section>
        
        {/* Market News Articles */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">Latest Market Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockMarketNews.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: article.id * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="h-48 bg-gray-800 relative">
                  {/* This would be an actual image in production */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    [Image Placeholder]
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-gray-400">{article.date}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-900/30 text-emerald-400">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-gray-400 mb-4">{article.summary}</p>
                  <Link href={`/news/article/${article.id}`}>
                    <span className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors cursor-pointer">
                      Read analysis →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Market Data Section */}
        <section className="mb-16 bg-gradient-to-r from-emerald-900/20 to-green-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Bitcoin Dominance</h3>
              <p className="text-3xl font-bold text-emerald-400">52.4%</p>
              <p className="text-sm text-gray-400 mt-1">+0.8% (24h)</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Total Market Cap</h3>
              <p className="text-3xl font-bold text-emerald-400">$5.2T</p>
              <p className="text-sm text-gray-400 mt-1">+1.2% (24h)</p>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">24h Trading Volume</h3>
              <p className="text-3xl font-bold text-emerald-400">$142B</p>
              <p className="text-sm text-gray-400 mt-1">-3.5% (24h)</p>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              * Data shown is for demonstration purposes only. Will be replaced with real-time API data.
            </p>
          </div>
        </section>
        
        {/* Subscribe to Market Updates */}
        <section>
          <div className="bg-gray-900/70 border border-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Get Market Updates in Your Inbox</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our premium market analysis newsletter and receive daily insights, trading signals, and expert commentary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-gray-800/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-white flex-grow"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-lg transition-all duration-300 whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
