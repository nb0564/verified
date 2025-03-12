
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-verified-yellow">
        {/* Chain pattern SVG background */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div 
              key={`chain-row-${rowIndex}`} 
              className="flex justify-between animate-float-chains"
              style={{ 
                animationDelay: `${rowIndex * 0.2}s`,
                position: 'absolute',
                top: `${rowIndex * 10}%`,
                left: 0,
                right: 0
              }}
            >
              {Array.from({ length: 8 }).map((_, colIndex) => (
                <svg 
                  key={`chain-${rowIndex}-${colIndex}`} 
                  width="30" 
                  height="100" 
                  viewBox="0 0 30 100" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.7, transform: `rotate(${Math.random() * 5}deg)` }}
                >
                  <circle cx="15" cy="15" r="10" stroke="#00A550" strokeWidth="2" />
                  <line x1="15" y1="25" x2="15" y2="40" stroke="#00A550" strokeWidth="2" />
                  <circle cx="15" cy="50" r="10" stroke="#00A550" strokeWidth="2" />
                  <line x1="15" y1="60" x2="15" y2="75" stroke="#00A550" strokeWidth="2" />
                  <circle cx="15" cy="85" r="10" stroke="#00A550" strokeWidth="2" />
                </svg>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBackground;
