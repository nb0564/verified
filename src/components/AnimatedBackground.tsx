
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Static digital chain pattern */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern 
              id="digital-chains" 
              width="30" 
              height="100" 
              patternUnits="userSpaceOnUse"
            >
              <line 
                x1="15" y1="0" 
                x2="15" y2="100" 
                stroke="#00A550" 
                strokeOpacity="0.1" 
                strokeWidth="2" 
                strokeDasharray="1,3,2,3,1,8"
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
