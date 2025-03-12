
import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationCodeProps {
  code: string;
  className?: string;
}

const VerificationCode: React.FC<VerificationCodeProps> = ({ code, className = '' }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast.success('Verification code copied to clipboard');
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative px-6 py-3 bg-white/80 rounded-lg shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="text-verified-dark font-mono font-bold tracking-wider">{code}</span>
          <button 
            onClick={copyToClipboard}
            className="text-verified-green hover:text-verified-dark transition-colors duration-200"
            aria-label="Copy verification code"
          >
            <Copy size={18} />
          </button>
        </div>
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-verified-green text-white text-xs px-2 py-0.5 rounded-md">
          Verification Code
        </div>
      </div>
    </div>
  );
};

export default VerificationCode;
