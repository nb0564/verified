
import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';
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
      {/* Enhanced circle with checkmark - more professional and clean look */}
      <div className="gradient-green rounded-full p-3 flex items-center justify-center shadow-lg mb-2 border-2 border-white">
        <CheckCircle2 
          className="text-white" 
          size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} 
          strokeWidth={3}
        />
      </div>
      
      {/* Enhanced VERIFIED text with decorative elements */}
      <div className="relative">
        <div className="text-verified-green text-2xl font-black tracking-widest uppercase mb-1 retro-text">
          VERIFIED
        </div>
        
        {/* Subtle decorative elements */}
        <div className="absolute -left-3 -top-1">
          <Shield size={12} className="text-verified-green/40" />
        </div>
        <div className="absolute -right-3 -top-1">
          <Shield size={12} className="text-verified-green/40" />
        </div>
      </div>
      
      {/* Horizontal line with enhanced styling */}
      <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-verified-green/80 to-transparent mb-2"></div>
      
      {size === 'lg' && (
        <div className="text-verified-green text-xs font-bold tracking-wider uppercase bg-verified-green/10 px-2 py-0.5 rounded-full">
          CERTIFIED AUTHENTIC
        </div>
      )}
    </div>
  );
};

export default VerifiedBadge;
