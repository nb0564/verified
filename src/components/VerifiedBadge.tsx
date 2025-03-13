
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
      {/* Enhanced 90s style checkmark with pixelated border and bright blue accent */}
      <div className="nineties-glow rounded-full p-2 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] mb-1 border-2 border-[#0EA5E9]" style={{ imageRendering: 'pixelated' }}>
        <CheckCircle2 
          className="text-verified-yellow drop-shadow-[0_0_3px_rgba(255,207,0,0.7)]" 
          size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} 
          strokeWidth={3}
        />
      </div>
      
      {/* 90s blocky text style with enhanced shadowing */}
      <div className="relative">
        <div className="text-verified-yellow text-xl font-black tracking-widest uppercase mb-1 retro-text nineties-text-shadow" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.8), 5px 5px 0 rgba(0,165,80,0.6), 7px 7px 0 rgba(14,165,233,0.4)' }}>
          VERIFIED
        </div>
      </div>
      
      {/* Pixelated line with enhanced 90s styling */}
      <div className="w-16 h-1 bg-[#0EA5E9] mb-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]" style={{ imageRendering: 'pixelated' }}></div>
      
      {size === 'lg' && (
        <div className="text-verified-yellow text-xs font-bold tracking-wider uppercase bg-verified-green/80 px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
          CERTIFIED AUTHENTIC
        </div>
      )}
      
      {/* 90s pixelated sparkle effects */}
      <div className="absolute -right-2 -top-2">
        <Sparkles size={12} className="text-[#0EA5E9]/90 animate-pulse" />
      </div>
      <div className="absolute -left-2 -bottom-2">
        <Sparkles size={12} className="text-[#0EA5E9]/90 animate-pulse" />
      </div>
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0.8, scale: 0.9 }}
        animate={{ 
          opacity: [0.4, 1, 0.2, 0.8, 0.3],
          scale: [0.9, 1.05, 0.8, 1.1, 0.9],
          x: [-15, 5, -10, 20, -5, 10, -15],
          y: [-10, 15, -5, -20, 10, -8, -10],
          rotate: [-2, 5, -4, 2, -6, 3, -2],
          filter: [
            "blur(0px) brightness(1)",
            "blur(1px) brightness(1.1)",
            "blur(2px) brightness(0.9)",
            "blur(0.5px) brightness(1.2)",
            "blur(3px) brightness(0.8)",
            "blur(0px) brightness(1)"
          ]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1]
        }}
        className="filter drop-shadow-[0_0_8px_rgba(255,207,0,0.7)]"
        style={{ 
          imageRendering: 'pixelated',
          mixBlendMode: 'normal'
        }}
      >
        <BaseComponent />
      </motion.div>
    );
  }

  return <BaseComponent />;
};

export default VerifiedBadge;
