
import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

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
    <div className={cn('flex items-center justify-center', className)}>
      <div className="relative px-6 py-3 bg-white/90 rounded-lg shadow-sm backdrop-blur-md border border-white/40">
        <div className="flex items-center gap-3">
          <span className="text-verified-dark font-mono font-bold tracking-wider">{code}</span>
          <button 
            onClick={copyToClipboard}
            className={cn(
              "transition-colors duration-200 rounded-full p-1",
              copied ? "text-verified-green bg-verified-green/10" : "text-verified-dark/60 hover:text-verified-dark"
            )}
            aria-label="Copy verification code"
          >
            {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
          </button>
        </div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-verified-green text-white text-xs px-2 py-0.5 rounded-md shadow-sm">
          Verification Code
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
