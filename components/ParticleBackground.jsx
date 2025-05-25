import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

export default function ParticleBackground({ 
  count = 50, 
  colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'],
  minSize = 2,
  maxSize = 6,
  minSpeed = 40,
  maxSpeed = 100,
  minOpacity = 0.1,
  maxOpacity = 0.5,
  blur = 3
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState([]);
  
  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);
  
  // Generate particles when dimensions change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: `particle-${i}`,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size,
        speed,
        opacity,
        color,
        direction: Math.random() * 360,
        drift: Math.random() * 2 - 1, // Random drift for more natural movement
        delay: Math.random() * 10, // Random delay for staggered animation
        duration: 20 + Math.random() * 40 // Random duration for varied speeds
      };
    });
    
    setParticles(newParticles);
  }, [dimensions, count, colors, minSize, maxSize, minSpeed, maxSpeed, minOpacity, maxOpacity]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      style={{ filter: `blur(${blur}px)` }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0
            }}
            animate={{ 
              x: [
                particle.x,
                particle.x + Math.cos(particle.direction * Math.PI / 180) * particle.speed + (particle.drift * 50),
                particle.x + Math.cos(particle.direction * Math.PI / 180) * particle.speed * 2 + (particle.drift * 100)
              ],
              y: [
                particle.y,
                particle.y + Math.sin(particle.direction * Math.PI / 180) * particle.speed + (particle.drift * 50),
                particle.y + Math.sin(particle.direction * Math.PI / 180) * particle.speed * 2 + (particle.drift * 100)
              ],
              opacity: [0, particle.opacity, 0]
            }}
            transition={{ 
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
            style={{ 
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
