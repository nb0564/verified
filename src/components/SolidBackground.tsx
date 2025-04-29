import React from 'react';

interface SolidBackgroundProps {
  opacity?: number;
}

const SolidBackground: React.FC<SolidBackgroundProps> = ({ opacity = 1 }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="w-full h-full bg-gradient-to-b from-verified-dark to-[#1A1A1A]"
        style={{ opacity: opacity }}
      ></div>
    </div>
  );
};

export default SolidBackground;