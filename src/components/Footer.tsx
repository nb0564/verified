
import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-10 px-4 bg-verified-dark text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-8 bg-verified-green rounded-full flex items-center justify-center text-white font-bold">
            TC
          </div>
          <span className="text-lg font-bold">TrueCapture</span>
        </div>
        
        <p className="text-center text-white/70 text-sm mb-8">
          Ensuring digital media authenticity through verified capture technology.
        </p>
        
        <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
          <div>
            <h4 className="font-bold mb-3 text-verified-yellow">Product</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="/capture" className="hover:text-verified-yellow transition-colors">Capture</a></li>
              <li><a href="/verify" className="hover:text-verified-yellow transition-colors">Verify</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-verified-yellow">Company</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-verified-yellow transition-colors">About</a></li>
              <li><a href="#" className="hover:text-verified-yellow transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-verified-yellow">Legal</h4>
            <ul className="space-y-2 text-white/80">
              <li><a href="#" className="hover:text-verified-yellow transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-verified-yellow transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-white/50">
          <div>© 2025 TrueCapture. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-verified-yellow transition-colors">
              <Twitter size={16} />
            </a>
            <a href="#" className="text-white/60 hover:text-verified-yellow transition-colors">
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
