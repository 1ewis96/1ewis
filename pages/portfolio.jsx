import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import referralData from '../data/referralLinks.json';

export default function PortfolioPage() {
  // Prepare data from referralLinks.json
  // Exchange data
  const exchanges = [
    {
      name: referralData.exchanges.bittrue.name,
      color: "yellow-400", // Override to match Bitrue's branding
      description: "An exchange focused on XRP and crypto yield products, offering competitive trading fees and excellent staking options.",
      pros: ["Competitive trading fees", "XRP ecosystem focus", "High-yield staking products", "User-friendly mobile app", "Excellent security features"],
      bestFor: "XRP enthusiasts and yield-focused traders looking for competitive rates",
      link: "/bitrue",
      refLink: referralData.exchanges.bittrue.referralLink,
      bonusDetails: referralData.exchanges.bittrue.bonusDetails
    }
  ];

  // Wallet data
  const wallets = [
    {
      name: referralData.wallets.ledger.name,
      color: "gray-400",
      description: "Premium hardware wallet offering best-in-class security for storing your cryptocurrencies offline.",
      pros: ["Cold storage security", "Support for 5,500+ coins", "Certified secure element", "Easy backup and recovery", "Ledger Live app integration"],
      bestFor: "Security-focused investors with significant crypto holdings",
      link: "/wallets/ledger",
      refLink: referralData.wallets.ledger.referralLink,
      bonusDetails: referralData.wallets.ledger.bonusDetails
    },
    {
      name: "Trezor",
      color: "gray-400",
      description: "Pioneer in hardware wallet technology with open-source security and intuitive interface.",
      pros: ["Open-source firmware", "Air-gapped security", "Password manager", "Simple recovery process", "Excellent customer support"],
      bestFor: "Privacy-focused users who prefer open-source solutions",
      link: "/wallets/trezor",
      refLink: "https://shop.trezor.io",
      bonusDetails: "Special discount for new customers"
    },
    {
      name: referralData.wallets.metamask.name,
      color: "orange-400",
      description: "Popular browser extension wallet for Ethereum and ERC-20 tokens with DApp integration.",
      pros: ["Easy DApp access", "Built-in token swap", "Multiple network support", "Hardware wallet compatibility", "Active development"],
      bestFor: "DeFi users and NFT collectors on Ethereum and compatible networks",
      link: "/wallets/metamask",
      refLink: referralData.wallets.metamask.referralLink || "https://metamask.io",
      bonusDetails: referralData.wallets.metamask.bonusDetails || "Free and open-source"
    },
    {
      name: referralData.wallets.youhodler.name,
      color: "teal-400",
      description: "Multi-asset wallet with built-in earning features and crypto-backed loans.",
      pros: ["Up to 13% APY on crypto", "Instant crypto loans", "Multi-HODL trading tool", "Turbocharge yield feature", "No lock-up periods"],
      bestFor: "Investors looking to earn passive income on their crypto holdings",
      link: "/wallets/youhodler",
      refLink: referralData.wallets.youhodler.referralLink,
      bonusDetails: referralData.wallets.youhodler.bonusDetails
    }
  ];

  // Tools data
  const tools = [
    {
      name: referralData.tools.tradingview.name,
      color: "indigo-400",
      description: "Professional-grade charting and analysis platform for traders of all levels.",
      pros: ["Advanced charting tools", "Custom indicators", "Social trading features", "Multi-timeframe analysis", "Real-time data"],
      bestFor: "Active traders who need powerful technical analysis tools",
      link: "/tools/tradingview",
      refLink: referralData.tools.tradingview.referralLink,
      bonusDetails: referralData.tools.tradingview.bonusDetails
    },
    {
      name: referralData.tools.cointracking.name,
      color: "violet-400",
      description: "Comprehensive portfolio tracking and tax reporting solution for crypto investors.",
      pros: ["Automatic exchange imports", "Tax reporting features", "Performance analytics", "Supports 13,000+ coins", "Historical data tracking"],
      bestFor: "Investors who need detailed portfolio tracking and tax compliance",
      link: "/tools/cointracking",
      refLink: referralData.tools.cointracking.referralLink,
      bonusDetails: referralData.tools.cointracking.bonusDetails
    },
    {
      name: referralData.tools.nordvpn.name,
      color: "blue-400",
      description: "Premium VPN service with enhanced security features for crypto traders and investors.",
      pros: ["Military-grade encryption", "No-logs policy", "Protection on public WiFi", "Fast connection speeds", "Multi-device support"],
      bestFor: "Security-conscious crypto users who want to protect their online activity",
      link: "/tools/nordvpn",
      refLink: referralData.tools.nordvpn.referralLink || "https://nordvpn.com",
      bonusDetails: referralData.tools.nordvpn.bonusDetails || "Special discount for new users"
    }
  ];

  // Particle effect component
  const ParticleBackground = () => {
    useEffect(() => {
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.id = 'particle-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '0';
      
      // Add canvas to the background container
      const container = document.getElementById('particle-container');
      if (container) {
        container.appendChild(canvas);
        
        // Set canvas dimensions
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        // Initialize particles
        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 0.3)`,
            speedX: Math.random() * 0.5 - 0.25,
            speedY: Math.random() * 0.5 - 0.25
          });
        }
        
        // Animation function
        function animate() {
          requestAnimationFrame(animate);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Update and draw particles
          particles.forEach(particle => {
            // Move particles
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
        }
        
        // Start animation
        animate();
        
        // Handle window resize
        const handleResize = () => {
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetHeight;
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          if (container.contains(canvas)) {
            container.removeChild(canvas);
          }
        };
      }
    }, []);
    
    return null;
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Hero Section with Particle Background */}
      <div id="particle-container" className="relative px-6 pt-32 pb-20 md:px-16 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-blue-400 to-teal-400">
            Crypto Affiliate Portfolio
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Discover our carefully selected exchanges, wallets, and tools that offer the best features and affiliate programs.
          </p>
        </motion.div>

        {/* All Sections Container */}
        <div className="flex flex-col space-y-16">
          {/* Exchanges Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="hidden lg:block text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Exchanges We Recommend</h2>
            
            {/* Exchanges Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left">Exchange</th>
                  <th className="py-4 px-6 text-left">Best For</th>
                  <th className="py-4 px-6 text-left">Key Benefits</th>
                  <th className="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {exchanges.map((exchange) => (
                  <tr key={exchange.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`font-semibold text-${exchange.color}`}>{exchange.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{exchange.bestFor}</td>
                    <td className="py-4 px-6">
                      <ul className="list-disc pl-5 text-gray-300">
                        {exchange.pros.slice(0, 3).map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <ButtonLink 
                          href={exchange.link} 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Details
                        </ButtonLink>
                        <ButtonLink 
                          href={exchange.refLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                          title={exchange.bonusDetails}
                        >
                          Join
                        </ButtonLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
          {/* Wallets Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
<h2 className="hidden lg:block text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Wallets We Recommend</h2>
         
          {/* Wallets Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left">Wallet</th>
                  <th className="py-4 px-6 text-left">Best For</th>
                  <th className="py-4 px-6 text-left">Key Benefits</th>
                  <th className="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <tr key={wallet.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`font-semibold text-${wallet.color}`}>{wallet.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{wallet.bestFor}</td>
                    <td className="py-4 px-6">
                      <ul className="list-disc pl-5 text-gray-300">
                        {wallet.pros.slice(0, 3).map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <ButtonLink 
                          href={wallet.link} 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Details
                        </ButtonLink>
                        <ButtonLink 
                          href={wallet.refLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                          title={wallet.bonusDetails}
                        >
                          Get
                        </ButtonLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
          {/* Tools Section */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
          <h2 className="hidden lg:block text-2xl md:text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">Tools We Recommend</h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="py-4 px-6 text-left">Tool</th>
                  <th className="py-4 px-6 text-left">Best For</th>
                  <th className="py-4 px-6 text-left">Key Benefits</th>
                  <th className="py-4 px-6 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {tools.map((tool) => (
                  <tr key={tool.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className={`font-semibold text-${tool.color}`}>{tool.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-300">{tool.bestFor}</td>
                    <td className="py-4 px-6">
                      <ul className="list-disc pl-5 text-gray-300">
                        {tool.pros.slice(0, 3).map((pro, index) => (
                          <li key={index}>{pro}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        <ButtonLink 
                          href={tool.link} 
                          size="sm" 
                          variant="outline" 
                          className="border-gray-700 text-gray-300 hover:bg-gray-800"
                        >
                          Details
                        </ButtonLink>
                        <ButtonLink 
                          href={tool.refLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          size="sm" 
                          className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                          title={tool.bonusDetails}
                        >
                          Get
                        </ButtonLink>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        </div>
        
        {/* Mobile View Sections - Only visible on small and medium screens */}
        <div className="lg:hidden mb-16 flex flex-col space-y-12">
          {/* Mobile Sections Container */}
          {/* Exchanges - Mobile */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">Exchanges We Recommend</h2>
            <div className="grid gap-6">
              {exchanges.map((exchange, index) => (
                <motion.div 
                  key={exchange.name} 
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-xl font-semibold text-${exchange.color} mb-3`}>{exchange.name}</h2>
                  <p className="text-gray-300 mb-4">{exchange.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Best For:</h3>
                    <p className="text-gray-300">{exchange.bestFor}</p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Key Benefits:</h3>
                    <ul className="list-disc pl-5 text-gray-300">
                      {exchange.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3">
                    <ButtonLink 
                      href={exchange.link} 
                      className="flex-1" 
                      variant="outline"
                    >
                      View Details
                    </ButtonLink>
                    <ButtonLink 
                      href={exchange.refLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                      title={exchange.bonusDetails}
                    >
                      Join Now
                    </ButtonLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            {/* Wallets - Mobile */}
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Wallets We Recommend</h2>
            <div className="grid gap-6">
              {wallets.map((wallet, index) => (
                <motion.div 
                  key={wallet.name} 
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-xl font-semibold text-${wallet.color} mb-3`}>{wallet.name}</h2>
                  <p className="text-gray-300 mb-4">{wallet.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Best For:</h3>
                    <p className="text-gray-300">{wallet.bestFor}</p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Key Benefits:</h3>
                    <ul className="list-disc pl-5 text-gray-300">
                      {wallet.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3">
                    <ButtonLink 
                      href={wallet.link} 
                      className="flex-1" 
                      variant="outline"
                    >
                      View Details
                    </ButtonLink>
                    <ButtonLink 
                      href={wallet.refLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                      title={wallet.bonusDetails}
                    >
                      Get
                    </ButtonLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div>
            {/* Tools - Mobile */}
            <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">Tools We Recommend</h2>
            <div className="grid gap-6">
              {tools.map((tool, index) => (
                <motion.div 
                  key={tool.name} 
                  className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h2 className={`text-xl font-semibold text-${tool.color} mb-3`}>{tool.name}</h2>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Best For:</h3>
                    <p className="text-gray-300">{tool.bestFor}</p>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Key Benefits:</h3>
                    <ul className="list-disc pl-5 text-gray-300">
                      {tool.pros.map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-3">
                    <ButtonLink 
                      href={tool.link} 
                      className="flex-1" 
                      variant="outline"
                    >
                      View Details
                    </ButtonLink>
                    <ButtonLink 
                      href={tool.refLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
                      title={tool.bonusDetails}
                    >
                      Get
                    </ButtonLink>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">How do affiliate links work?</h3>
              <p className="text-gray-300">When you sign up using my affiliate links, I receive a small commission at no extra cost to you. In fact, you often get exclusive bonuses when using these links!</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Which exchange is best for beginners?</h3>
              <p className="text-gray-300">Binance offers the most comprehensive educational resources, but Bybit has a more intuitive interface. Both are excellent choices for newcomers.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Are these exchanges safe?</h3>
              <p className="text-gray-300">All exchanges featured here implement strong security measures. Kraken stands out for regulatory compliance, while Binance and OKX offer the most comprehensive insurance funds.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Which has the lowest fees?</h3>
              <p className="text-gray-300">Binance generally offers the lowest trading fees at 0.1%, with further reductions possible when using BNB. Bybit is a close second with competitive fee structures.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-blue-400">
              ← Back to Home
            </Link>
          </div>
          © 2025 1ewis.com — All affiliate links on this site help support the content at no extra cost to you.
        </footer>
      </div>
    </div>
  );
}
