import React from 'react';
import { motion } from 'framer-motion';

export default function CategorySelector({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex space-x-2 min-w-max">
        <CategoryButton 
          isActive={activeCategory === 'all'} 
          onClick={() => setActiveCategory('all')}
        >
          All Videos
        </CategoryButton>
        
        {categories.map((category) => (
          <CategoryButton 
            key={category.id}
            isActive={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
    </div>
  );
}

function CategoryButton({ children, isActive, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors relative ${
        isActive 
          ? 'text-white' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isActive && (
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-purple-600/50 to-blue-600/50 rounded-full -z-10"
          layoutId="activeCategoryBackground"
          transition={{ type: 'spring', duration: 0.6 }}
        />
      )}
      {children}
    </motion.button>
  );
}
