
import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-base',
    lg: 'w-24 h-24 text-xl',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Badge with 90s aesthetic */}
      <div className={`flex flex-col items-center justify-center ${sizeClasses[size]}`}>
        <div className="bg-verified-green text-white font-black tracking-wider uppercase px-3 py-1 rounded-md border-2 border-white shadow-md">
          <span className="retro-text">VERIFIED</span>
        </div>
        
        {size !== 'sm' && (
          <div className="mt-1 flex items-center justify-center">
            <BadgeCheck className="w-5 h-5 text-verified-green" strokeWidth={3} />
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifiedBadge;
