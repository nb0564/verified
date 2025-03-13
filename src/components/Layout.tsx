
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Search, Home } from 'lucide-react';
import GrainOverlay from './GrainOverlay';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[375px] h-[812px] rounded-[60px] overflow-hidden border-8 border-black shadow-2xl bg-black">
        {/* Phone Top Notch */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-black z-40">
          <div className="w-40 h-6 mx-auto rounded-b-3xl bg-black"></div>
        </div>

        {/* Phone Content */}
        <div className="relative w-full h-full overflow-hidden bg-verified-yellow">
          {/* iOS-style status bar */}
          <div className="h-12 bg-white/10 backdrop-blur-md fixed top-0 left-0 right-0 z-30">
            <div className="h-full flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-verified-green flex items-center justify-center text-white font-bold">
                  TC
                </div>
                <span className="font-semibold text-verified-dark">TrueCapture</span>
              </div>
              <Link 
                to="/capture"
                className="bg-verified-green text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-verified-green/90 active:scale-95 transition-all duration-150"
              >
                Capture
              </Link>
            </div>
          </div>
          
          <main className="flex-1 relative z-10 pt-12 pb-20 overflow-y-auto h-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </main>
          
          {!hideNav && (
            <nav className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-8">
              <div className="glass-morphism rounded-2xl">
                <div className="flex justify-around items-center p-2">
                  <NavItem to="/" icon={<Home />} label="Home" isActive={location.pathname === '/'} />
                  <NavItem to="/capture" icon={<Camera />} label="Capture" isActive={location.pathname === '/capture'} />
                  <NavItem to="/verify" icon={<Search />} label="Verify" isActive={location.pathname === '/verify'} />
                </div>
              </div>
            </nav>
          )}
          
          <GrainOverlay />
        </div>
      </div>
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
        "flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-colors",
        isActive 
          ? "text-verified-green" 
          : "text-verified-dark/60 hover:text-verified-dark"
      )}
    >
      <div className={cn(
        "mb-1 p-2 rounded-full",
        isActive ? "bg-white/80" : ""
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-1 w-12 h-1 rounded-full bg-verified-green"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default Layout;
