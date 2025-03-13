
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Enhanced static pattern with more visual interest */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern 
              id="dot-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="transparent" />
              <circle cx="20" cy="20" r="2" fill="#00A550" />
              <circle cx="0" cy="0" r="1" fill="#00A550" />
              <circle cx="0" cy="40" r="1" fill="#00A550" />
              <circle cx="40" cy="0" r="1" fill="#00A550" />
              <circle cx="40" cy="40" r="1" fill="#00A550" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            
            <pattern 
              id="diagonal-lines" 
              width="80" 
              height="80" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(30)"
            >
              <rect width="80" height="80" fill="transparent" />
              <path 
                d="M0,40 L80,40" 
                stroke="#00A550" 
                strokeWidth="0.5"
                strokeDasharray="4 8"
                strokeLinecap="round"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
