
import React from 'react';

const GrainOverlay: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-20">
      <div className="absolute inset-0 animate-grain">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"></rect>
        </svg>
      </div>
    </div>
  );
};

export default GrainOverlay;
