import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getBgColor, getTextColor, getBorderColor } from '../utils/colorUtils';

export default function AnimatedFeatures({ features, color }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="grid gap-8 md:grid-cols-3 mb-16"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {features.map((feature, index) => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1
        });

        return (
          <motion.div
            key={index}
            ref={ref}
            variants={itemVariants}
            className={`backdrop-blur-sm rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group ${color ? `${getBgColor(color.split('-')[0], '900', '/40')} ${getBorderColor(color.split('-')[0], '800')}` : 'bg-blue-900/40 border-blue-800'}`}
          >
            {feature.icon && (
              <motion.div 
                className={`${color ? getTextColor(color) : 'text-blue-400'} mb-3`}
                initial={{ scale: 1 }}
                animate={inView ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {typeof feature.icon === 'function' ? feature.icon() : feature.icon}
              </motion.div>
            )}
            <motion.h3 
              className={`text-xl font-semibold text-${color} mb-2 group-hover:translate-x-1 transition-transform duration-300`}
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              className="text-gray-400"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {feature.description}
            </motion.p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
