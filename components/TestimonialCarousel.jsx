import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Alex Thompson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    exchange: "Binance",
    rating: 5,
    text: "Using the affiliate link saved me 10% on trading fees. The sign-up bonus was credited instantly, and I've already earned back my initial investment through staking rewards.",
    date: "2 weeks ago"
  },
  {
    name: "Sarah Wilson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    exchange: "Bybit",
    rating: 5,
    text: "The welcome bonus from Bybit was incredible! I received over $200 in bonuses from my initial deposit, and their futures trading platform is by far the best I've used.",
    date: "1 month ago"
  },
  {
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    exchange: "Kraken",
    rating: 4,
    text: "As someone concerned with security, Kraken was the perfect choice. Their regulatory compliance gives me peace of mind, and the affiliate bonus was a nice added benefit.",
    date: "3 weeks ago"
  },
  {
    name: "Emily Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    exchange: "OKX",
    rating: 5,
    text: "The Web3 wallet integration on OKX is game-changing. I can manage all my DeFi investments in one place, and the trading bots have significantly improved my returns.",
    date: "5 days ago"
  },
  {
    name: "David Park",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    exchange: "Binance",
    rating: 4,
    text: "I've tried several exchanges, but Binance offers the best combination of low fees and deep liquidity. The staking options are also excellent for passive income.",
    date: "2 months ago"
  }
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const next = () => {
    setAutoplay(false);
    setCurrent(prev => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setAutoplay(false);
    setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    next();
  };

  const handlePrev = () => {
    setDirection(-1);
    prev();
  };

  return (
    <motion.div 
      className="py-16 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Real experiences from traders who signed up using our affiliate links
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
          <button 
            onClick={handlePrev}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
        </div>
        
        <div className="overflow-hidden rounded-xl">
          <div className="relative h-[280px] md:h-[220px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 w-full">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img 
                          src={testimonials[current].avatar} 
                          alt={testimonials[current].name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-700"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full p-1">
                          <Quote size={16} className="text-blue-400" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex space-x-1 mr-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < testimonials[current].rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-400">{testimonials[current].date}</span>
                      </div>
                      
                      <p className="text-gray-300 italic mb-3">"{testimonials[current].text}"</p>
                      
                      <div className="flex items-center">
                        <div>
                          <p className="font-medium">{testimonials[current].name}</p>
                          <p className="text-sm text-gray-400">
                            <span className="text-blue-400">via</span> {testimonials[current].exchange}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
          <button 
            onClick={handleNext}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
                setAutoplay(false);
              }}
              className={`w-2 h-2 rounded-full ${
                index === current ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
