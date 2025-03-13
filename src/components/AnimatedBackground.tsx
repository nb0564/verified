
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Static digital chain pattern - NO animations */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern 
              id="digital-chains" 
              width="50" 
              height="50" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="50" height="50" fill="transparent" />
              <path 
                d="M12.5,0 L12.5,50 M25,0 L25,50 M37.5,0 L37.5,50 M0,12.5 L50,12.5 M0,25 L50,25 M0,37.5 L50,37.5" 
                stroke="#00A550" 
                strokeOpacity="0.08" 
                strokeWidth="1.5" 
                strokeDasharray="2,6" 
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#digital-chains)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
