
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-8 px-4 bg-verified-dark text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-8 h-8 bg-verified-green rounded-full flex items-center justify-center text-white font-bold shadow-sm">
            TC
          </div>
          <span className="text-lg font-bold tracking-tight">TrueCapture</span>
        </div>
        
        <p className="text-center text-white/70 text-sm mb-6 px-4">
          Ensuring digital media authenticity through verified capture technology.
        </p>
        
        <div className="grid grid-cols-3 gap-5 mb-6 text-sm">
          <div>
            <h4 className="font-bold mb-2 text-verified-yellow text-xs tracking-wide">Product</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><a href="/capture" className="hover:text-verified-yellow transition-colors text-xs">Capture</a></li>
              <li><a href="/verify" className="hover:text-verified-yellow transition-colors text-xs">Verify</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 text-verified-yellow text-xs tracking-wide">Company</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><a href="#" className="hover:text-verified-yellow transition-colors text-xs">About</a></li>
              <li><a href="#" className="hover:text-verified-yellow transition-colors text-xs">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 text-verified-yellow text-xs tracking-wide">Legal</h4>
            <ul className="space-y-1.5 text-white/80">
              <li><a href="#" className="hover:text-verified-yellow transition-colors text-xs">Privacy</a></li>
              <li><a href="#" className="hover:text-verified-yellow transition-colors text-xs">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-white/50">
          <div>© 2025 TrueCapture</div>
          <div className="flex gap-3">
            <a href="#" className="text-white/60 hover:text-verified-yellow transition-colors p-1">
              <Twitter size={14} />
            </a>
            <a href="#" className="text-white/60 hover:text-verified-yellow transition-colors p-1">
              <Github size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
