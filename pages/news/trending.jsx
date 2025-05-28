import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, ExternalLink } from 'lucide-react';

export default function TrendingNewsPage() {
  // Mock data for trending topics - will be replaced with API data later
  const trendingTopics = [
    {
      id: 1,
      title: "The Rise of Layer 2 Solutions",
      summary: "How Layer 2 scaling solutions are transforming blockchain transaction speeds and costs.",
      popularity: 98,
      category: "Technology",
      imageUrl: "/images/news/placeholder-layer2.jpg"
    },
    {
      id: 2,
      title: "Central Bank Digital Currencies (CBDCs)",
      summary: "Exploring the global race for CBDCs and their potential impact on the cryptocurrency ecosystem.",
      popularity: 95,
      category: "Regulation",
      imageUrl: "/images/news/placeholder-cbdc.jpg"
    },
    {
      id: 3,
      title: "AI and Blockchain Integration",
      summary: "The convergence of artificial intelligence and blockchain technology is creating new opportunities.",
      popularity: 92,
      category: "Innovation",
      imageUrl: "/images/news/placeholder-ai.jpg"
    },
    {
      id: 4,
      title: "Institutional Adoption Accelerates",
      summary: "Major financial institutions continue to increase their exposure to cryptocurrency assets.",
      popularity: 90,
      category: "Adoption",
      imageUrl: "/images/news/placeholder-institutional.jpg"
    },
    {
      id: 5,
      title: "The Metaverse Economy",
      summary: "Virtual worlds are creating new economic opportunities and digital asset markets.",
      popularity: 87,
      category: "Metaverse",
      imageUrl: "/images/news/placeholder-metaverse.jpg"
    },
    {
      id: 6,
      title: "Sustainable Mining Initiatives",
      summary: "The industry push toward environmentally friendly cryptocurrency mining practices.",
      popularity: 85,
      category: "Environment",
      imageUrl: "/images/news/placeholder-mining.jpg"
    }
  ];

  // Mock social media trends data
  const socialTrends = [
    { term: "#Bitcoin", count: "1.2M tweets" },
    { term: "#Ethereum", count: "820K tweets" },
    { term: "#Crypto", count: "750K tweets" },
    { term: "#NFT", count: "520K tweets" },
    { term: "#DeFi", count: "310K tweets" },
    { term: "#Web3", count: "280K tweets" },
    { term: "#Metaverse", count: "260K tweets" },
    { term: "#Blockchain", count: "240K tweets" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Trending Crypto Topics & Discussions | 1ewis.com</title>
        <meta name="description" content="Discover what's trending in the crypto world. Stay updated with the hottest blockchain topics, viral discussions, and emerging trends in cryptocurrency." />
        <meta name="keywords" content="trending crypto topics, viral crypto news, popular blockchain discussions, crypto trends, hot crypto topics" />
        <link rel="canonical" href="https://1ewis.com/news/trending" />
      </Head>
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Back to News Link */}
        <Link href="/news" className="inline-flex items-center text-teal-400 hover:text-teal-300 mb-8 transition-colors">
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
            <div className="flex items-center mb-4">
              <TrendingUp className="text-teal-400 w-8 h-8 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400">
                Trending Topics
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl">
              Stay ahead of the curve with the most discussed and fastest-growing topics in the cryptocurrency ecosystem.
            </p>
          </motion.div>
        </section>
        
        {/* Trending Topics Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">Hot Topics This Week</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingTopics.map((topic) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: topic.id * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="h-48 bg-gray-800 relative">
                  {/* This would be an actual image in production */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                    [Image Placeholder]
                  </div>
                  <div className="absolute top-3 right-3 bg-teal-900/80 text-teal-300 rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {topic.popularity}% Trending
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-900/30 text-teal-400">
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-gray-400 mb-4">{topic.summary}</p>
                  <Link href={`/news/article/${topic.id}`}>
                    <span className="text-teal-400 font-medium hover:text-teal-300 transition-colors cursor-pointer">
                      Explore topic →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Social Media Trends */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-teal-900/20 to-blue-900/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Social Media Trends</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socialTrends.map((trend, index) => (
                <motion.div
                  key={trend.term}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 text-center"
                >
                  <h3 className="text-lg font-bold text-teal-400 mb-1">{trend.term}</h3>
                  <p className="text-sm text-gray-400">{trend.count}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* External Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Trending Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                Research Reports
                <ExternalLink className="ml-2 w-4 h-4 text-teal-400" />
              </h3>
              <p className="text-gray-400 mb-4">
                Access the latest research reports and analysis from leading crypto research firms.
              </p>
              <button className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
                View reports →
              </button>
            </div>
            
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-teal-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                Community Discussions
                <ExternalLink className="ml-2 w-4 h-4 text-teal-400" />
              </h3>
              <p className="text-gray-400 mb-4">
                Join vibrant discussions about trending topics in our community forums.
              </p>
              <button className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
                Join discussion →
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
