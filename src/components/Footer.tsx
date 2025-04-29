import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="w-full py-4 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      transition={{ delay: 1 }}
    >
      <div className="text-sm text-verified-light/50 font-medium">
        © {new Date().getFullYear()} Verified • Prove Your Authenticity
      </div>
    </motion.footer>
  );
};

export default Footer;