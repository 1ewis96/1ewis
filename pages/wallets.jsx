import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import referralData from '../data/referralLinks.json';

export default function WalletsPage() {
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

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Head>
        <title>Best Crypto Wallets | 1ewis Recommended Wallets</title>
        <meta name="description" content="Discover our selection of top cryptocurrency wallets for secure storage, DeFi access, and earning passive income on your digital assets." />
        <meta name="keywords" content="crypto wallets, cryptocurrency wallets, hardware wallets, software wallets, defi wallets, bitcoin wallets" />
        <link rel="canonical" href="https://1ewis.com/wallets" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Best Crypto Wallets | 1ewis Recommended Wallets" />
        <meta property="og:description" content="Discover our selection of top cryptocurrency wallets for secure storage, DeFi access, and earning passive income on your digital assets." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/wallets" />
        <meta property="og:image" content="https://1ewis.com/images/wallets-og.jpg" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Crypto Wallets | 1ewis Recommended Wallets" />
        <meta name="twitter:description" content="Discover our selection of top cryptocurrency wallets for secure storage, DeFi access, and earning passive income on your digital assets." />
        <meta name="twitter:image" content="https://1ewis.com/images/wallets-og.jpg" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              ...wallets.map((wallet, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "Product",
                  "name": wallet.name,
                  "description": wallet.description,
                  "url": `https://1ewis.com${wallet.link}`
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
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
            Portfolio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-blue-400">Wallets</span>
        </nav>
        
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Crypto Wallets
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our selection of the best cryptocurrency wallets for secure storage, DeFi access, and earning passive income on your digital assets.
          </motion.p>
        </div>
      </div>
      
      {/* Wallets Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Recommended Crypto Wallets</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallets.map((wallet, index) => (
              <motion.div 
                key={wallet.name}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-${wallet.color} h-2`}></div>
                <div className="p-6 flex-grow">
                  <h3 className={`text-2xl font-bold mb-2 text-${wallet.color}`}>{wallet.name}</h3>
                  <p className="text-gray-300 mb-4">{wallet.description}</p>
                  
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Key Features:</h4>
                  <ul className="mb-6">
                    {wallet.pros.map((pro, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <span className={`text-${wallet.color} mr-2`}>•</span>
                        <span className="text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Best for:</strong> {wallet.bestFor}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <ButtonLink 
                        href={wallet.link}
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        Read Review
                      </ButtonLink>
                      <ButtonLink 
                        href={wallet.refLink}
                        className={`bg-${wallet.color} hover:bg-opacity-80 text-white`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center">
                          Get {wallet.name} <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </ButtonLink>
                    </div>
                    
                    {wallet.bonusDetails && (
                      <p className="mt-3 text-xs text-green-400">
                        <span className="bg-green-400 bg-opacity-20 rounded-full px-2 py-1">
                          BONUS: {wallet.bonusDetails}
                        </span>
                      </p>
                    )}
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
          <h2 className="text-3xl font-bold mb-8 text-center">Wallet Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-left">Wallet</th>
                  <th className="py-3 px-4 text-left">Type</th>
                  <th className="py-3 px-4 text-left">Security Level</th>
                  <th className="py-3 px-4 text-left">Supported Coins</th>
                  <th className="py-3 px-4 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-400">Ledger</td>
                  <td className="py-3 px-4">Hardware</td>
                  <td className="py-3 px-4">Very High</td>
                  <td className="py-3 px-4">5,500+</td>
                  <td className="py-3 px-4">Long-term storage</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-orange-400">MetaMask</td>
                  <td className="py-3 px-4">Browser Extension</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">ETH & ERC tokens</td>
                  <td className="py-3 px-4">DeFi & NFTs</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-medium text-teal-400">YouHodler</td>
                  <td className="py-3 px-4">Custodial</td>
                  <td className="py-3 px-4">Medium</td>
                  <td className="py-3 px-4">30+</td>
                  <td className="py-3 px-4">Earning yield</td>
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
            Check out our complete portfolio of recommended crypto exchanges, cards, and tools.
          </p>
          <ButtonLink 
            href="/portfolio"
            className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 text-lg"
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
              <a href="https://github.com/1ewis" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com/1ewis_" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
