import { Card, CardContent } from "../components/ui/card";
import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, Github, Twitter, Sparkles, Zap, TrendingUp, Star, Award, HelpCircle, ChevronDown } from "lucide-react";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import CryptoStats from '../components/CryptoStats';
import BonusCalculator from '../components/BonusCalculator';
import ComparisonTable from '../components/ComparisonTable';
import FaqSection from '../components/FaqSection';
import CryptoNewsFeed from '../components/CryptoNewsFeed';
import ExchangeBenefitsCards from '../components/ExchangeBenefitsCards';
import BeginnersGuide from '../components/BeginnersGuide';
import CookieConsent from '../components/CookieConsent';
import ParticleBackground from '../components/ParticleBackground';
import PartnerLogoSlider from '../components/PartnerLogoSlider';
import Footer from '../components/Footer';
import { useMemo } from 'react';

export default function HomePage() {
  const exchanges = [
    // Only Bitrue
    {
      name: "Bitrue",
      tagline: "Exchange focused on XRP and crypto yield products",
      link: "/bitrue",
      color: "blue"
    },
  ];
  
  const tools = [
    {
      name: "NordVPN",
      tagline: "Secure your crypto activities with the world's leading VPN",
      link: "/tools/nordvpn",
      color: "blue"
    },
    {
      name: "TradingView",
      tagline: "Professional-grade charting tools for market analysis",
      link: "/tools/tradingview",
      color: "indigo"
    },
    {
      name: "MetaMask",
      tagline: "The leading self-custody wallet for Web3 access",
      link: "/wallets/metamask",
      color: "orange"
    },
    {
      name: "CoinTracking",
      tagline: "Track your portfolio and optimize your taxes",
      link: "/tools/cointracking",
      color: "violet"
    },
    {
      name: "NordVPN",
      tagline: "Secure your crypto activities with the world's leading VPN",
      link: "/tools/nordvpn",
      color: "blue"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      
      {/* Price Ticker */}
      <PriceTicker />
      
      <main className="flex-1">
        {/* Hero Section with animated background */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Enhanced particle background */}
          <ParticleBackground 
            count={80} 
            colors={['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']} 
            minSize={2} 
            maxSize={8} 
            minSpeed={20} 
            maxSpeed={60} 
            minOpacity={0.1} 
            maxOpacity={0.4} 
            blur={3} 
          />
          
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center mb-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 px-4 py-2 rounded-full">
                <Sparkles className="text-yellow-400 w-5 h-5 mr-2" />
                <span className="text-blue-300 font-medium">Exclusive Crypto Deals & Bonuses</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Find Your Perfect Crypto Exchange
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Compare the best cryptocurrency exchanges, wallets, and tools with exclusive sign-up bonuses.
              </motion.p>
              
              {/* Partner Logo Slider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <PartnerLogoSlider />
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonLink href="/portfolio" variant="default" size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-blue-500/20">
                    <span>View Comparison Portfolio</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ButtonLink>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonLink href="/bitrue" variant="outline" size="lg" className="border-2 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 shadow-lg hover:shadow-blue-500/20">
                    <span>Explore Top Exchange</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ButtonLink>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Exchanges Grid with animated cards */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <motion.div
                className="mr-3 text-yellow-400"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Award className="w-7 h-7" />
              </motion.div>
              <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Popular Exchanges
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exchanges.map((exchange, index) => (
                <motion.div
                  key={exchange.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={exchange.link} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <Card className={`bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-${exchange.color}-500/50 transition-all duration-300 h-full overflow-hidden relative group`}>
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br from-${exchange.color}-900/0 to-${exchange.color}-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <CardContent className="p-6 relative z-10">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-white flex items-center">
                            <motion.span
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                              className={`inline-block w-2 h-2 rounded-full bg-${exchange.color}-500 mr-2`}
                            />
                            {exchange.name}
                          </h3>
                          <p className="text-gray-400 mb-4">{exchange.tagline}</p>
                          <div className="flex items-center text-sm text-gray-500 group-hover:text-white transition-colors">
                            <span>Learn more</span>
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Comparison Table Section */}
        <section id="comparison-table" className="py-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1/4 h-1/4 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Compare Top Crypto Exchanges
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Find the perfect exchange for your needs with our detailed comparison table. Sort by fees, features, and more.
                </p>
              </motion.div>
            </div>
            
            <ComparisonTable />
          </div>
        </section>
        
        {/* Exchange Pros & Cons Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-green-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-yellow-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                  Key Benefits of Each Exchange
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Make an informed decision with our overview of the key features and benefits of each platform.
                </p>
              </motion.div>
            </div>
            
            <ExchangeBenefitsCards />
          </div>
        </section>

        {/* Essential Tools Section with animated cards */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1/4 h-1/4 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center mb-12">
              <motion.div
                className="mr-3 text-blue-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-7 h-7" />
              </motion.div>
              <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Essential Tools
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link href={tool.link} className="group block h-full">
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      <Card className={`bg-gray-900/80 backdrop-blur-sm border-gray-800 hover:border-${tool.color}-500/50 transition-all duration-300 h-full overflow-hidden relative group`}>
                        <motion.div 
                          className={`absolute inset-0 bg-gradient-to-br from-${tool.color}-900/0 to-${tool.color}-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                        />
                        <CardContent className="p-6 relative z-10">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-white flex items-center">
                            <motion.span
                              animate={{ scale: [1, 1.03, 1] }}
                              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                              className={`inline-block w-2 h-2 rounded-full bg-${tool.color}-500 mr-2`}
                            />
                            {tool.name}
                          </h3>
                          <p className="text-gray-400 mb-4">{tool.tagline}</p>
                          <div className="flex items-center text-sm text-gray-500 group-hover:text-white transition-colors">
                            <span>Learn more</span>
                            <motion.div
                              className="ml-2"
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beginner's Guide Section */}
        <section id="beginners-guide" className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-green-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1/4 h-1/4 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center mb-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 px-4 py-2 rounded-full">
                  <HelpCircle className="text-green-400 w-5 h-5 mr-2" />
                  <span className="text-green-300 font-medium">New to Crypto?</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
                  Start Here: Beginner's Guide
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Follow our simple step-by-step guide to get started with cryptocurrency exchanges safely and efficiently.
                </p>
              </motion.div>
            </div>
            
            <BeginnersGuide />
          </div>
        </section>

        {/* Crypto News Feed Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1/4 h-1/4 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">

            
            <CryptoNewsFeed />
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-1/4 h-1/4 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Find answers to the most common questions about crypto exchanges and trading.
                </p>
              </motion.div>
            </div>
            
            <FaqSection />
          </div>
        </section>
        
        {/* Crypto Stats Section */}
        <div className="px-6 md:px-16 py-16 bg-gradient-to-b from-black to-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Live Crypto Market Stats
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Track the performance of major cryptocurrencies in real-time.
                </p>
              </motion.div>
            </div>
            <CryptoStats />
          </div>
        </div>
        


        {/* Call to Action */}
        <div className="px-6 md:px-16 py-16 text-center bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Crypto Journey?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Compare all exchanges side by side and find the perfect platform for your trading style.
            </p>
            <ButtonLink 
              href="/portfolio" 
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
            >
              View Full Comparison
            </ButtonLink>
          </motion.div>
        </div>
        
        {/* Footer */}
        <Footer />
      </main>
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
