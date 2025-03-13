
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Digital chains background like in the reference */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern 
              id="digital-chains" 
              width="30" 
              height="100" 
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(90)"
            >
              <line 
                x1="0" y1="0" 
                x2="0" y2="100" 
                stroke="#00A550" 
                strokeOpacity="0.15" 
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
