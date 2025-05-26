import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ExchangeProsConsCards = () => {
  const exchanges = [
    {
      name: 'Bitrue',
      link: '/bitrue',
      color: 'blue',
      pros: [
        'Specialized in XRP trading pairs',
        'Power Piggy yield-generating products',
        'Competitive trading fees (0.09% spot)',
        'User-friendly interface',
        'Regular promotions and airdrops'
      ],
      cons: [
        'Smaller exchange compared to market leaders',
        'Limited advanced trading features',
        'Fewer payment methods than some competitors',
        'Not available in all countries'
      ]
    }
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
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {exchanges.map((exchange, index) => (
        <motion.div
          key={exchange.name}
          variants={itemVariants}
          className={`bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-${exchange.color}-500/50 transition-all duration-300`}
          whileHover={{ y: -5, boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 10px 0 rgba(${exchange.color === 'yellow' ? '255, 215, 0' : exchange.color === 'blue' ? '0, 122, 255' : exchange.color === 'purple' ? '175, 82, 222' : '34, 197, 94'}, 0.1)` }}
        >
          <div className={`px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-${exchange.color}-900/20`}>
            <h3 className={`text-xl font-bold text-${exchange.color}-400`}>{exchange.name}</h3>
          </div>
          
          <div className="px-6 py-4">
            <div className="mb-6">
              <h4 className="text-green-400 font-medium flex items-center mb-3">
                <Check className="w-5 h-5 mr-2" />
                Pros
              </h4>
              <ul className="space-y-2">
                {exchange.pros.map((pro, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">•</span>
                    <span className="text-gray-300 text-sm">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-red-400 font-medium flex items-center mb-3">
                <X className="w-5 h-5 mr-2" />
                Cons
              </h4>
              <ul className="space-y-2">
                {exchange.cons.map((con, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-2 mt-1">•</span>
                    <span className="text-gray-300 text-sm">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-800">
            <Link href={exchange.link} className="flex items-center justify-center w-full">
              <span className={`text-${exchange.color}-400 font-medium`}>View Details</span>
              <ArrowRight className={`ml-2 w-4 h-4 text-${exchange.color}-400`} />
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExchangeProsConsCards;
