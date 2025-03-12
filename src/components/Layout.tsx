
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Search, Home } from 'lucide-react';
import GrainOverlay from './GrainOverlay';
import AnimatedBackground from './AnimatedBackground';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* iOS-style status bar */}
      <div className="h-12 bg-white/10 backdrop-blur-md fixed top-0 left-0 right-0 z-30">
        <div className="max-w-md mx-auto h-full flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-verified-green flex items-center justify-center text-white font-bold">
              TC
            </div>
            <span className="font-medium text-verified-dark">TrueCapture</span>
          </div>
          <Link 
            to="/capture"
            className="bg-verified-green text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-verified-green/90 transition-colors"
          >
            Start Capturing
          </Link>
        </div>
      </div>
      
      <main className="flex-1 relative z-10 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-20 p-4 pb-6">
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20">
              <div className="flex justify-around items-center p-2">
                <NavItem to="/" icon={<Home />} label="Home" isActive={location.pathname === '/'} />
                <NavItem to="/capture" icon={<Camera />} label="Capture" isActive={location.pathname === '/capture'} />
                <NavItem to="/verify" icon={<Search />} label="Verify" isActive={location.pathname === '/verify'} />
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <GrainOverlay />
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-all duration-300 relative",
        isActive 
          ? "text-verified-green" 
          : "text-verified-dark/60 hover:text-verified-dark"
      )}
    >
      <motion.span 
        className="mb-1"
        animate={{ scale: isActive ? 1.1 : 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
      </motion.span>
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-1 w-12 h-1 rounded-full bg-verified-green"
          transition={{ type: "spring", stiffness: 300 }}
        />
      )}
    </Link>
  );
};

export default Layout;
