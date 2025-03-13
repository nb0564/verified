
import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface VerificationCodeProps {
  code: string;
  className?: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ code, className = '' }) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success('Verification code copied');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      className={cn('flex items-center justify-center', className)}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative px-6 py-5 rounded-xl shadow-neon backdrop-blur-md gradient-code">
        <div className="flex items-center gap-3">
          <span className="text-white font-mono font-bold tracking-wider text-2xl">{code}</span>
          <button 
            onClick={copyToClipboard}
            className={cn(
              "transition-colors duration-200 rounded-full p-1.5 bg-white/20",
              copied ? "text-verified-green" : "text-white hover:bg-white/30"
            )}
            aria-label="Copy verification code"
          >
            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-verified-green text-white text-xs px-3 py-1 rounded-full shadow-sm font-bold tracking-wide">
          Verification Code
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationCode;
