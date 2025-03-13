
import React from 'react';
import { Check } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'scale-50',
    md: 'scale-75',
    lg: 'scale-100',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className} ${sizeClasses[size]}`}>
      {/* Circle with checkmark */}
      <div className="bg-verified-green rounded-full w-16 h-16 flex items-center justify-center shadow-lg shadow-verified-green/30 mb-3">
        <Check className="text-verified-yellow w-10 h-10" strokeWidth={4} />
      </div>
      
      {/* Large blocky VERIFIED text */}
      <div className="text-verified-green text-5xl font-black tracking-wide uppercase mb-2 retro-text">
        VERIFIED
      </div>
      
      {/* Horizontal line */}
      <div className="w-24 h-1 bg-verified-green mb-3"></div>
      
      {size === 'lg' && (
        <div className="text-verified-green text-lg font-bold tracking-wide uppercase">
          CERTIFIED AUTHENTIC
        </div>
      )}
    </div>
  );
};

export default VerifiedBadge;
