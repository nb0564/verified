import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Shield } from 'lucide-react';

interface VerificationLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const VerificationLogo: React.FC<VerificationLogoProps> = ({ 
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };
  
  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 36,
    xl: 44
  };

  return (
    <motion.div 
      className="flex items-center justify-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.div 
          className="absolute -inset-1 bg-gradient-to-r from-verified-pink via-verified-purple to-verified-blue rounded-full blur-sm"
          animate={{ 
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative flex items-center justify-center bg-verified-dark p-2 rounded-full border border-verified-blue/30">
          <CheckCircle size={iconSizes[size]} className="text-verified-light" />
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationLogo;