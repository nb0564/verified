
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'scale-60',
    md: 'scale-80',
    lg: 'scale-100',
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center", 
      sizeClasses[size], 
      className
    )}>
      {/* Circle with checkmark - more professional and clean look */}
      <div className="bg-verified-green rounded-full p-3 flex items-center justify-center shadow-lg mb-2">
        <CheckCircle2 
          className="text-white" 
          size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} 
          strokeWidth={3}
        />
      </div>
      
      {/* Refined VERIFIED text */}
      <div className="text-verified-green text-2xl font-black tracking-widest uppercase mb-1 retro-text">
        VERIFIED
      </div>
      
      {/* Horizontal line */}
      <div className="w-20 h-0.5 bg-verified-green/80 mb-2"></div>
      
      {size === 'lg' && (
        <div className="text-verified-green text-xs font-bold tracking-wider uppercase">
          CERTIFIED AUTHENTIC
        </div>
      )}
    </div>
  );
};

export default VerifiedBadge;
