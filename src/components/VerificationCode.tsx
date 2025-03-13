
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
      <div className="relative px-6 py-5 bg-verified-dark border-[3px] border-verified-yellow rounded-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,0.6)]" style={{ boxShadow: '6px 6px 0px 2px rgba(0,0,0,0.6), 8px 8px 0px 0px rgba(0,165,80,0.4)' }}>
        <div className="flex items-center gap-3">
          <span className="text-verified-yellow font-mono font-bold tracking-wider text-2xl gta-header" style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.8), 5px 5px 0 rgba(0,165,80,0.5)' }}>{code}</span>
          <button 
            onClick={copyToClipboard}
            className={cn(
              "transition-colors duration-200 rounded-sm p-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]",
              copied ? "bg-verified-green text-verified-yellow" : "bg-verified-yellow text-verified-dark hover:brightness-110"
            )}
            aria-label="Copy verification code"
            style={{ borderRight: '2px solid rgba(0,0,0,0.4)', borderBottom: '2px solid rgba(0,0,0,0.4)' }}
          >
            {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
          </button>
        </div>
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-verified-green text-verified-yellow text-xs px-3 py-1 rounded-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)] font-bold uppercase tracking-widest" style={{ fontFamily: "'Staatliches', sans-serif", textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>
          Verification Code
        </div>
      </div>
    </motion.div>
  );
};

export default VerificationCode;
