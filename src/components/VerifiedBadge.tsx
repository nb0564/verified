
import React from 'react';
import { Check } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Badge circle */}
      <div className={`flex items-center justify-center rounded-full bg-verified-green text-white animate-pulse-glow ${sizeClasses[size]}`}>
        <Check className="w-1/2 h-1/2 stroke-[3]" />
      </div>
      
      {/* Glow effect */}
      <div className={`absolute top-0 left-0 rounded-full bg-verified-green opacity-20 blur-md ${sizeClasses[size]}`}></div>
      
      {/* Text below badge (only for md and lg sizes) */}
      {size !== 'sm' && (
        <div className="mt-1 text-center font-bold text-verified-green uppercase tracking-wide">
          Verified
        </div>
      )}
    </div>
  );
};

export default VerifiedBadge;
