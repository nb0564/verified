
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
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
      {/* 90s style checkmark with pure green accent */}
      <div className="nineties-glow rounded-full p-2 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] mb-1 border-2 border-verified-green" style={{ imageRendering: 'pixelated' }}>
        <CheckCircle2 
          className="text-verified-yellow drop-shadow-[0_0_3px_rgba(255,207,0,0.7)]" 
          size={size === 'lg' ? 32 : size === 'md' ? 24 : 20} 
          strokeWidth={3}
        />
      </div>
      
      {/* 90s blocky text style with enhanced shadowing */}
      <div className="relative">
        <div className="text-verified-yellow text-xl font-black tracking-widest uppercase mb-1 retro-text nineties-text-shadow" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.8), 5px 5px 0 rgba(0,165,80,0.6)' }}>
          VERIFIED
        </div>
      </div>
      
      {/* Pixelated line with enhanced 90s styling in pure green */}
      <div className="w-16 h-1 bg-verified-green mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]" style={{ imageRendering: 'pixelated' }}></div>
      
      {size === 'lg' && (
        <div className="text-verified-yellow text-xs font-bold tracking-wider uppercase bg-verified-green/80 px-2 py-0.5 rounded-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] mt-1">
          CERTIFIED AUTHENTIC
        </div>
      )}
    </div>
  );

  if (animated) {
    return (
      <div className="relative">
        {/* Acid trip pixel shimmer effect container */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ 
            backgroundImage: `radial-gradient(circle at 50% 50%, #8B5CF6 5%, #D946EF 25%, #F97316 50%, #0EA5E9 75%)`,
            mixBlendMode: 'overlay',
            filter: 'url(#noise)',
            backgroundSize: '200% 200%',
            opacity: 0,
            imageRendering: 'pixelated'
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 100%', '100% 0%', '0% 0%'],
            opacity: [0, 0.3, 0.1, 0.5, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />

        {/* Main badge with pixel shimmer effect */}
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ 
            opacity: [0.6, 1, 0.4, 0.9, 0.3, 0.8, 0.5, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="relative z-10"
          style={{ imageRendering: 'pixelated' }}
        >
          <BaseComponent />
        </motion.div>

        {/* Pixelated overlay for acid trip effect */}
        <svg style={{ display: 'none' }}>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feDisplacementMap in="SourceGraphic" scale="10" />
          </filter>
        </svg>

        {/* Random pixel shimmer overlays */}
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ 
              backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 90%, rgba(255,255,255,0.8) 100%)',
              mixBlendMode: 'screen',
              filter: 'url(#pixelate)',
              opacity: 0,
            }}
            animate={{ 
              opacity: [0, 0.2, 0, 0.6, 0, 0.3, 0],
              scale: [0.9, 1.1, 0.95, 1.05, 0.9],
              x: [0, 5, -5, 3, -3, 0],
              y: [0, -3, 3, -5, 5, 0],
            }}
            transition={{ 
              duration: 3 + index * 1.5, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: index * 0.8,
            }}
          />
        ))}

        {/* Additional filter for pixelation */}
        <svg style={{ display: 'none' }}>
          <filter id="pixelate">
            <feFlood x="4" y="4" height="2" width="2"/>
            <feComposite width="10" height="10"/>
            <feTile result="a"/>
            <feComposite in="SourceGraphic" in2="a" operator="in"/>
            <feMorphology operator="dilate" radius="1"/>
          </filter>
        </svg>
      </div>
    );
  }

  return <BaseComponent />;
};

export default VerifiedBadge;
