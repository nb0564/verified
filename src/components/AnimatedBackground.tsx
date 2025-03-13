
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Simple static pattern without animations */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern 
              id="simple-grid" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="transparent" />
              <path 
                d="M0,20 L40,20 M20,0 L20,40" 
                stroke="#00A550" 
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#simple-grid)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
