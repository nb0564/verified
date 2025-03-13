
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-verified-yellow via-yellow-400 to-verified-yellow">
        {/* Instagram-inspired pattern with more visual interest */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Soft diagonal grid pattern */}
            <pattern 
              id="diagonal-pattern" 
              width="60" 
              height="60" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect width="60" height="60" fill="transparent" />
              <path 
                d="M0,30 L60,30" 
                stroke="#00A550" 
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
              <path 
                d="M30,0 L30,60" 
                stroke="#00A550" 
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeOpacity="0.6"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#diagonal-pattern)" />
            
            {/* Scattered dots */}
            <pattern 
              id="dot-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="40" height="40" fill="transparent" />
              <circle cx="20" cy="20" r="1.5" fill="#00A550" fillOpacity="0.7" />
              <circle cx="0" cy="0" r="1" fill="#00A550" fillOpacity="0.5" />
              <circle cx="40" cy="0" r="1" fill="#00A550" fillOpacity="0.5" />
              <circle cx="0" cy="40" r="1" fill="#00A550" fillOpacity="0.5" />
              <circle cx="40" cy="40" r="1" fill="#00A550" fillOpacity="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            
            {/* Instagram-inspired colored circles */}
            <circle cx="5%" cy="10%" r="50" fill="#00A550" fillOpacity="0.1" />
            <circle cx="90%" cy="85%" r="100" fill="#00A550" fillOpacity="0.1" />
            <circle cx="80%" cy="20%" r="70" fill="#00A550" fillOpacity="0.1" />
            <circle cx="20%" cy="90%" r="80" fill="#00A550" fillOpacity="0.1" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
