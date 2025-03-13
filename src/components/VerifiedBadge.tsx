
import React from 'react';
import { CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  size = 'md', 
  className = '',
  animated = false
}) => {
  const sizeClasses = {
    sm: 'scale-50',
    md: 'scale-70',
    lg: 'scale-100',
  };

  const BaseComponent = () => (
    <div className={cn(
      "flex flex-col items-center justify-center relative", 
      sizeClasses[size], 
      className
    )}>
      {/* Enhanced circle with checkmark - more fuzzy 90s look */}
      <div className="nineties-glow rounded-full p-2 flex items-center justify-center shadow-lg mb-1 border-2 border-white">
        <CheckCircle2 
          className="text-white" 
          size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} 
          strokeWidth={3}
        />
      </div>
      
      {/* 90s style VERIFIED text */}
      <div className="relative">
        <div className="text-verified-green text-xl font-black tracking-widest uppercase mb-1 retro-text nineties-text-shadow">
          VERIFIED
        </div>
      </div>
      
      {/* Horizontal line with enhanced 90s styling */}
      <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-verified-green/80 to-transparent mb-1"></div>
      
      {size === 'lg' && (
        <div className="text-verified-green text-xs font-bold tracking-wider uppercase bg-verified-green/10 px-2 py-0.5 rounded-full">
          CERTIFIED AUTHENTIC
        </div>
      )}
      
      {/* 90s sparkle effects */}
      <div className="absolute -right-2 -top-2">
        <Sparkles size={12} className="text-white/90 animate-pulse" />
      </div>
      <div className="absolute -left-2 -bottom-2">
        <Sparkles size={12} className="text-white/90 animate-pulse" />
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ 
          opacity: [0.8, 1, 0.8],
          scale: [0.9, 1.05, 0.9],
          rotate: [-2, 2, -2],
          y: [-2, 2, -2]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "mirror" 
        }}
        className="origin-center"
      >
        <BaseComponent />
      </motion.div>
    );
  }

  return <BaseComponent />;
};

export default VerifiedBadge;
