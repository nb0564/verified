import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
}

const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  size = 'md',
  animated = false
}) => {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };
  
  const glowVariants = {
    initial: { 
      opacity: 0.2,
      scale: 1,
    },
    animate: {
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.2, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const pulseVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const textVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.3,
        duration: 0.5
      }
    }
  };
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow effect */}
      <motion.div
        className={`absolute rounded-full blur-xl bg-gradient-to-r from-verified-pink via-verified-purple to-verified-blue ${sizeClasses[size]}`}
        variants={glowVariants}
        initial="initial"
        animate={animated ? "animate" : "initial"}
      />
      
      {/* Badge */}
      <motion.div 
        ref={badgeRef}
        className={`relative z-10 flex items-center justify-center ${sizeClasses[size]}`}
        variants={pulseVariants}
        initial="initial"
        animate={animated ? "animate" : "initial"}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-verified-pink via-verified-purple to-verified-blue p-0.5">
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-verified-dark opacity-90" />
          </div>
        </div>
        
        <motion.div className="relative z-20 flex flex-col items-center justify-center">
          <CheckCircle className="text-verified-light opacity-90" size={size === 'sm' ? 24 : size === 'md' ? 36 : size === 'lg' ? 48 : 60} strokeWidth={2.5} />
          <motion.span 
            className="mt-1 font-bold tracking-wide text-verified-light"
            style={{ fontSize: size === 'sm' ? '8px' : size === 'md' ? '12px' : size === 'lg' ? '16px' : '20px' }}
            variants={textVariants}
            initial="initial"
            animate={animated ? "animate" : "initial"}
          >
            VERIFIED
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifiedBadge;