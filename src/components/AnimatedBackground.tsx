
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-dark">
        {/* 90s-style grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Bold grid pattern */}
            <pattern 
              id="grid-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="transparent" />
              <path 
                d="M0,0 L40,0 L40,40 L0,40 Z" 
                stroke="#00A550" 
                strokeWidth="1"
                strokeLinecap="square"
                fill="none"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            
            {/* Pixelated dots */}
            <pattern 
              id="dot-pattern" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="20" height="20" fill="transparent" />
              <rect x="9" y="9" width="2" height="2" fill="#FFCF00" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            
            {/* 90s geometric shapes */}
            <rect x="10%" y="10%" width="100" height="100" fill="#00A550" fillOpacity="0.2" transform="rotate(15)" />
            <rect x="80%" y="70%" width="150" height="150" fill="#00A550" fillOpacity="0.2" transform="rotate(45)" />
            <rect x="70%" y="20%" width="70" height="70" fill="#FFCF00" fillOpacity="0.2" transform="rotate(30)" />
            <rect x="20%" y="80%" width="120" height="120" fill="#FFCF00" fillOpacity="0.2" transform="rotate(60)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
