import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import referralData from '../data/referralLinks.json';

export default function ToolsPage() {
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

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      ...tools.map((tool, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.name,
          "description": tool.description,
          "url": `https://1ewis.com${tool.link}`,
          "applicationCategory": "FinanceApplication"
        }
      }))
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Head>
        <title>Essential Crypto Tools & Software | 1ewis Recommended Tools</title>
        <meta name="description" content="Discover our selection of essential crypto trading tools, portfolio trackers, and security software with exclusive bonuses through our affiliate links." />
        <meta name="keywords" content="crypto tools, trading software, crypto portfolio tracker, cryptocurrency tax software, crypto security tools" />
        <meta property="og:title" content="Essential Crypto Tools & Software | 1ewis Recommended Tools" />
        <meta property="og:description" content="Discover our selection of essential crypto trading tools, portfolio trackers, and security software with exclusive bonuses through our affiliate links." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/tools" />
        <meta property="og:image" content="https://1ewis.com/images/tools-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Essential Crypto Tools & Software | 1ewis Recommended Tools" />
        <meta name="twitter:description" content="Discover our selection of essential crypto trading tools, portfolio trackers, and security software with exclusive bonuses through our affiliate links." />
        <meta name="twitter:image" content="https://1ewis.com/images/tools-og.jpg" />
        <link rel="canonical" href="https://1ewis.com/tools" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
          <span className="text-blue-400">Tools</span>
        </nav>
        
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Essential Crypto Tools
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our curated selection of essential tools for crypto traders and investors. From professional charting platforms to tax reporting software and security solutions.
          </motion.p>
        </div>
      </div>
      
      {/* Tools Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Recommended Crypto Tools</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.name}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-${tool.color} h-2`}></div>
                <div className="p-6 flex-grow">
                  <h3 className={`text-2xl font-bold mb-2 text-${tool.color}`}>{tool.name}</h3>
                  <p className="text-gray-300 mb-4">{tool.description}</p>
                  
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Best Features:</h4>
                  <ul className="mb-6">
                    {tool.pros.map((pro, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <span className={`text-${tool.color} mr-2`}>•</span>
                        <span className="text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Best for:</strong> {tool.bestFor}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <ButtonLink 
                        href={tool.link}
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        Read Review
                      </ButtonLink>
                      <ButtonLink 
                        href={tool.refLink}
                        className={`bg-${tool.color} hover:bg-opacity-80 text-white`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center">
                          Get {tool.name} <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </ButtonLink>
                    </div>
                    
                    {tool.bonusDetails && (
                      <p className="mt-3 text-xs text-green-400">
                        <span className="bg-green-400 bg-opacity-20 rounded-full px-2 py-1">
                          BONUS: {tool.bonusDetails}
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
      
      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Looking for More Crypto Resources?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Check out our complete portfolio of recommended crypto exchanges, wallets, and tools.
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
      
      <Footer />
    </div>
  );
}
