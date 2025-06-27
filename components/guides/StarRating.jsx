import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StarRating = ({ 
  defaultRating = 4.5, 
  totalVotes = 127, 
  onRatingChange 
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // Handle star click with half-star precision
  const handleStarClick = (selectedRating, isHalfStar) => {
    // If clicking on half star, subtract 0.5
    const finalRating = isHalfStar ? selectedRating - 0.5 : selectedRating;
    setRating(finalRating);
    setHasRated(true);
    
    if (onRatingChange) {
      onRatingChange(finalRating);
    }
    
    // Show alert with the selected rating
    alert(`You rated this guide ${finalRating} stars!`);
  };

  // Handle mouse enter on star with half-star precision
  const handleStarHover = (event, starValue) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const mousePosition = event.clientX - boundingRect.left;
    const isHalfStar = mousePosition < boundingRect.width / 2;
    
    // If mouse is on the left half of the star, it's a half star
    setHoverRating(isHalfStar ? starValue - 0.5 : starValue);
  };

  // Handle mouse leave from rating component
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Generate stars array
  const stars = [1, 2, 3, 4, 5];
  
  // Get the active rating (either hover rating or default rating)
  const activeRating = hoverRating || (hasRated ? rating : defaultRating);

  return (
    <div className="flex flex-col items-center">
      {/* Display overall rating and votes */}
      <div className="flex items-center justify-center mb-2">
        <span className="text-2xl font-bold text-yellow-400 mr-2">{defaultRating.toFixed(1)}</span>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFullStar = defaultRating >= star;
            const isHalfStar = !isFullStar && defaultRating + 0.5 >= star;
            
            return (
              <svg 
                key={star}
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-gray-600'}`}
                viewBox="0 0 24 24"
                fill={isFullStar ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {isHalfStar && (
                  <defs>
                    <linearGradient id={`halfStar${star}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                      <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                )}
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill={isHalfStar ? `url(#halfStar${star})` : isFullStar ? "currentColor" : "none"}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                />
              </svg>
            );
          })}
        </div>
        <span className="text-xs text-gray-400 ml-2">({totalVotes} votes)</span>
      </div>
      
      {/* Interactive rating stars */}
      <div 
        className="flex items-center space-x-1 mt-2" 
        onMouseLeave={handleMouseLeave}
      >
        {stars.map((star) => {
          const isFullStar = activeRating >= star;
          const isHalfStar = !isFullStar && activeRating + 0.5 >= star;
          
          return (
            <div 
              key={star}
              className="relative cursor-pointer w-8 h-8"
              onClick={(e) => {
                const boundingRect = e.currentTarget.getBoundingClientRect();
                const mousePosition = e.clientX - boundingRect.left;
                const isHalf = mousePosition < boundingRect.width / 2;
                handleStarClick(star, isHalf);
              }}
              onMouseMove={(e) => handleStarHover(e, star)}
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-8 w-8 ${isFullStar || isHalfStar ? 'text-yellow-400' : 'text-gray-600'}`}
                  viewBox="0 0 24 24"
                  fill={isFullStar ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {isHalfStar && (
                    <defs>
                      <linearGradient id={`halfStarInteractive${star}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  )}
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    fill={isHalfStar ? `url(#halfStarInteractive${star})` : isFullStar ? "currentColor" : "none"}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                  />
                </svg>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      {/* Show the current rating value or prompt */}
      <div className="mt-2 text-sm text-gray-300">
        {hasRated ? (
          <span>You rated this guide {rating} stars</span>
        ) : (
          <span>Click to rate this guide</span>
        )}
      </div>
    </div>
  );
};

export default StarRating;
