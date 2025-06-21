import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import referralData from '../data/referralLinks.json';

export default function CardsPage() {
  // Cards data
  const cards = [
    {
      name: referralData.cards.revolut.name,
      color: "blue-400",
      description: "Multi-currency card with crypto trading features and competitive exchange rates.",
      pros: ["No foreign transaction fees", "In-app crypto trading", "Metal card option", "Instant notifications", "Virtual cards for online shopping"],
      bestFor: "Frequent travelers and crypto enthusiasts who need a versatile spending card",
      link: "/cards/revolut",
      refLink: referralData.cards.revolut.referralLink,
      bonusDetails: referralData.cards.revolut.bonusDetails
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
      ...cards.map((card, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": card.name,
          "description": card.description,
          "url": `https://1ewis.com${card.link}`
        }
      }))
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Head>
        <title>Best Crypto Cards | 1ewis Recommended Payment Cards</title>
        <meta name="description" content="Discover our selection of top crypto-friendly payment cards with cashback rewards, multi-currency support, and exclusive sign-up bonuses." />
        <meta name="keywords" content="crypto cards, cryptocurrency debit cards, bitcoin cards, crypto payment cards, crypto cashback cards" />
        <meta property="og:title" content="Best Crypto Cards | 1ewis Recommended Payment Cards" />
        <meta property="og:description" content="Discover our selection of top crypto-friendly payment cards with cashback rewards, multi-currency support, and exclusive sign-up bonuses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/cards" />
        <meta property="og:image" content="https://1ewis.com/images/cards-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Crypto Cards | 1ewis Recommended Payment Cards" />
        <meta name="twitter:description" content="Discover our selection of top crypto-friendly payment cards with cashback rewards, multi-currency support, and exclusive sign-up bonuses." />
        <meta name="twitter:image" content="https://1ewis.com/images/cards-og.jpg" />
        <link rel="canonical" href="https://1ewis.com/cards" />
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
          <span className="text-blue-400">Cards</span>
        </nav>
        
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Crypto Payment Cards
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our selection of the best crypto-friendly payment cards that bridge the gap between digital assets and everyday spending. Enjoy cashback rewards, multi-currency support, and exclusive bonuses.
          </motion.p>
        </div>
      </div>
      
      {/* Cards Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Recommended Crypto Cards</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {cards.map((card, index) => (
              <motion.div 
                key={card.name}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`bg-${card.color} h-2`}></div>
                <div className="p-6 flex-grow">
                  <h3 className={`text-2xl font-bold mb-2 text-${card.color}`}>{card.name}</h3>
                  <p className="text-gray-300 mb-4">{card.description}</p>
                  
                  <h4 className="text-sm uppercase text-gray-400 mb-2">Key Benefits:</h4>
                  <ul className="mb-6">
                    {card.pros.map((pro, i) => (
                      <li key={i} className="flex items-start mb-1">
                        <span className={`text-${card.color} mr-2`}>•</span>
                        <span className="text-gray-300">{pro}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="mt-auto">
                    <p className="text-sm text-gray-400 mb-4">
                      <strong>Best for:</strong> {card.bestFor}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <ButtonLink 
                        href={card.link}
                        className="bg-gray-700 hover:bg-gray-600 text-white"
                      >
                        Read Review
                      </ButtonLink>
                      <ButtonLink 
                        href={card.refLink}
                        className={`bg-${card.color} hover:bg-opacity-80 text-white`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="flex items-center">
                          Get {card.name} <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      </ButtonLink>
                    </div>
                    
                    {card.bonusDetails && (
                      <p className="mt-3 text-xs text-green-400">
                        <span className="bg-green-400 bg-opacity-20 rounded-full px-2 py-1">
                          BONUS: {card.bonusDetails}
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
      
      {/* Features Section */}
      <section className="px-6 py-16 md:px-16 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Revolut Card Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Multi-Currency Support</h3>
              <p className="text-gray-300">Hold, exchange, and spend in 150+ currencies with competitive exchange rates and no hidden fees.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Crypto Trading</h3>
              <p className="text-gray-300">Buy, sell and exchange 30+ cryptocurrencies directly within the app with competitive fees.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Premium Metal Card</h3>
              <p className="text-gray-300">Upgrade to a premium metal card with exclusive perks including cashback on purchases and airport lounge access.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Advanced Security</h3>
              <p className="text-gray-300">Freeze/unfreeze your card instantly, set spending limits, and create virtual cards for safer online shopping.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Real-Time Notifications</h3>
              <p className="text-gray-300">Receive instant notifications for all transactions to keep track of your spending in real-time.</p>
            </div>
            
            <div className="bg-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Global ATM Withdrawals</h3>
              <p className="text-gray-300">Withdraw cash worldwide with free ATM withdrawals up to a monthly limit based on your plan.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="px-6 py-16 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Looking for More Crypto Products?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Check out our complete portfolio of recommended crypto wallets, exchanges, and tools.
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
