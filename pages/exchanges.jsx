import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import referralData from '../data/referralLinks.json';

export default function ExchangesPage() {
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
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) {
              particle.speedX = -particle.speedX;
            }
            
            if (particle.y < 0 || particle.y > canvas.height) {
              particle.speedY = -particle.speedY;
            }
            
            // Draw particles
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
        }
        
        // Start animation
        animate();
        
        // Resize handler
        function handleResize() {
          canvas.width = container.offsetWidth;
          canvas.height = container.offsetHeight;
        }
        
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

  // Exchange data
  const exchanges = [
    {
      name: referralData.exchanges.bittrue.name,
      color: "yellow-400", // Match Bitrue's branding
      description: "An exchange focused on XRP and crypto yield products, offering competitive trading fees and excellent staking options.",
      pros: ["Competitive trading fees", "XRP ecosystem focus", "High-yield staking products", "User-friendly mobile app", "Excellent security features"],
      bestFor: "XRP enthusiasts and yield-focused traders looking for competitive rates",
      link: "/bitrue",
      refLink: referralData.exchanges.bittrue.referralLink,
      bonusDetails: referralData.exchanges.bittrue.bonusDetails
    },
    {
      name: "Coinflare",
      color: "orange-400",
      description: "Advanced trading platform with competitive fees and robust security features for all types of traders.",
      pros: ["Low trading fees", "Advanced security measures", "Intuitive trading interface", "Fast transaction processing", "24/7 customer support"],
      bestFor: "Active traders looking for a powerful platform with competitive fees",
      link: "/coinflare",
      refLink: referralData.exchanges.coinflare?.referralLink || "#",
      bonusDetails: referralData.exchanges.coinflare?.bonusDetails || "Exclusive trading fee discounts"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Head>
        <title>Best Crypto Exchanges | 1ewis Recommended Exchanges</title>
        <meta name="description" content="Discover our selection of top cryptocurrency exchanges for trading, staking, and earning rewards on your digital assets." />
        <meta name="keywords" content="crypto exchanges, cryptocurrency exchanges, bitcoin exchanges, trading platforms, crypto trading" />
        <link rel="canonical" href="https://1ewis.com/exchanges" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Best Crypto Exchanges | 1ewis Recommended Exchanges" />
        <meta property="og:description" content="Discover our selection of top cryptocurrency exchanges for trading, staking, and earning rewards on your digital assets." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/exchanges" />
        <meta property="og:image" content="https://1ewis.com/images/exchanges-og.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Crypto Exchanges | 1ewis Recommended Exchanges" />
        <meta name="twitter:description" content="Discover our selection of top cryptocurrency exchanges for trading, staking, and earning rewards on your digital assets." />
        <meta name="twitter:image" content="https://1ewis.com/images/exchanges-og.jpg" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ...exchanges.map((exchange, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": exchange.name,
                  "description": exchange.description,
                  "url": `https://1ewis.com${exchange.link}`
                }
              }))
            ]
          })}
        </script>
      </Head>
      
      {/* Hero Section with Particle Background */}
      <div id="particle-container" className="relative px-6 pt-32 pb-20 md:px-16 bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <ParticleBackground />
        
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-4 text-sm text-gray-400 z-10 relative">
          <Link href="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-yellow-400 transition-colors">
            Portfolio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-yellow-400">Exchanges</span>
        </nav>
        
        {/* Hero Content */}
        <div className="max-w-4xl relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              Best Crypto Exchanges
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our handpicked selection of cryptocurrency exchanges offering competitive fees, robust security, and excellent trading features.
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ButtonLink 
              href="#exchanges"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3"
            >
              <span className="flex items-center">
                View Exchanges <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </ButtonLink>
            
            <ButtonLink 
              href="/portfolio"
              className="bg-transparent hover:bg-gray-800 text-white border border-gray-700 px-6 py-3"
            >
              Full Portfolio
            </ButtonLink>
          </motion.div>
        </div>
      </div>
      
      {/* Exchanges Section */}
      <section id="exchanges" className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Recommended Exchanges</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {exchanges.map((exchange, index) => (
              <motion.div
                key={exchange.name}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-${exchange.color} h-2`}></div>
                <div className="p-6 flex-grow">
                  <h3 className={`text-2xl font-bold mb-2 text-${exchange.color}`}>{exchange.name}</h3>
                  <p className="text-gray-300 mb-4">{exchange.description}</p>
                  
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Key Features:</h4>
                  <ul className="mb-6">
                    {exchange.pros.map((pro, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <span className={`text-${exchange.color} mr-2`}>•</span>
                        <span className="text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Best for:</strong> {exchange.bestFor}
                    </p>
                    
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Bonus:</strong> {exchange.bonusDetails}
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    {exchange.name === "Coinflare" ? (
                      <ButtonLink 
                        href={exchange.refLink}
                        className="bg-orange-400 hover:bg-orange-300 text-black"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                      </ButtonLink>
                    ) : (
                      <ButtonLink 
                        href={exchange.refLink}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started
                      </ButtonLink>
                    )}
                    
                    <ButtonLink 
                      href={exchange.link}
                      className="bg-gray-700 hover:bg-gray-600 text-white"
                    >
                      Read Review
                    </ButtonLink>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Comparison Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Exchange Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Exchange</th>
                  <th className="py-3 px-4 text-left">Trading Fees</th>
                  <th className="py-3 px-4 text-left">Supported Coins</th>
                  <th className="py-3 px-4 text-left">Special Features</th>
                  <th className="py-3 px-4 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-yellow-400">Bitrue</td>
                  <td className="py-3 px-4">0.098% - 0.2%</td>
                  <td className="py-3 px-4">400+</td>
                  <td className="py-3 px-4">XRP ecosystem, Power Piggy staking</td>
                  <td className="py-3 px-4">XRP traders, yield seekers</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-orange-400">Coinflare</td>
                  <td className="py-3 px-4">0.1% - 0.25%</td>
                  <td className="py-3 px-4">250+</td>
                  <td className="py-3 px-4">Advanced trading tools, fast execution</td>
                  <td className="py-3 px-4">Active traders</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Looking for More Crypto Products?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Check out our complete portfolio of recommended crypto exchanges, wallets, cards, and tools.
          </p>
          <ButtonLink 
            href="/portfolio"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 text-lg"
          >
            <span className="flex items-center">
              View Full Portfolio <ArrowRight className="ml-2 w-5 h-5" />
            </span>
          </ButtonLink>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 md:px-16 py-8 text-center text-sm text-gray-500 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              © 2025 1ewis.com — All Rights Reserved
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/1ewis" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com/1ewis_" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
