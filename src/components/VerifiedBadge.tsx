
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
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
        >
          <BaseComponent />
          
          {/* SVG filter for pixel shimmering */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id="pixel-shimmer" x="-50%" y="-50%" width="200%" height="200%">
                <feTurbulence 
                  type="fractalNoise" 
                  baseFrequency="0.05" 
                  numOctaves="3" 
                  seed={Math.random() * 100}
                  result="noise" 
                />
                <feDisplacementMap 
                  in="SourceGraphic" 
                  in2="noise" 
                  scale="2" 
                  xChannelSelector="R" 
                  yChannelSelector="G"
                />
              </filter>

              <filter id="pixel-noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" result="noise" />
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0 0
                          0 0 0 0.15 0" />
                <feComposite operator="in" in2="SourceGraphic" result="noisy-image" />
                <feComposite in="SourceGraphic" in2="noisy-image" operator="arithmetic" k1="0.5" k2="0.5" k3="0" k4="0" />
              </filter>
            </defs>
          </svg>
        </motion.div>

        {/* Pixel shimmer overlays - contained within the badge */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div 
              key={i}
              className="absolute"
              style={{
                width: `${3 + Math.random() * 5}px`,
                height: `${3 + Math.random() * 5}px`,
                background: i % 2 === 0 ? '#FFCF00' : '#00A550',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0,
                mixBlendMode: 'color-dodge',
                filter: 'blur(0.5px)',
                imageRendering: 'pixelated'
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0.5, 1.2, 0.8],
              }}
              transition={{
                duration: 1 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Individual pixel shimmering effect - targeted on specific parts */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ mixBlendMode: 'color-dodge' }}
        >
          {['#FFCF00', '#00A550', '#FFFFFF'].map((color, index) => (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              style={{
                backgroundImage: `radial-gradient(
                  circle at ${50 + (Math.random() * 20 - 10)}% ${50 + (Math.random() * 20 - 10)}%, 
                  ${color} 1%, 
                  transparent 15%
                )`,
                opacity: 0,
                filter: 'url(#pixel-noise)',
                imageRendering: 'pixelated'
              }}
              animate={{
                opacity: [0, 0.4, 0],
                x: [0, Math.random() * 4 - 2, 0],
                y: [0, Math.random() * 4 - 2, 0],
              }}
              transition={{
                duration: 1.5 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.5,
              }}
            />
          ))}
        </div>
        
        {/* Pixelated overlay - text specific shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 70%, transparent 70%, rgba(255,207,0,0.3) 100%)',
            mixBlendMode: 'overlay',
            filter: 'url(#pixel-noise)',
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.3, 0.1, 0.4, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      </div>
    );
  }

  return <BaseComponent />;
};

export default VerifiedBadge;
