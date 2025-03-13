
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
      {/* Phone Frame - refined with more realistic styling */}
      <div className="relative w-full max-w-[375px] h-[812px] rounded-[45px] overflow-hidden border-[12px] border-black shadow-2xl bg-black">
        {/* Phone Top Notch */}
        <div className="absolute top-0 left-0 right-0 h-6 bg-black z-40">
          <div className="w-36 h-6 mx-auto rounded-b-2xl bg-black"></div>
        </div>

        {/* Phone Content */}
        <div className="relative w-full h-full overflow-hidden bg-verified-yellow">
          {/* iOS-style status bar - improved with better spacing */}
          <div className="h-14 bg-white/10 backdrop-blur-sm fixed top-0 left-0 right-0 z-30 border-b border-black/5">
            <div className="h-full flex items-center justify-between px-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-verified-green flex items-center justify-center text-white font-bold shadow-sm">
                  TC
                </div>
                <span className="font-bold text-verified-dark tracking-tight">TrueCapture</span>
              </div>
              <Link 
                to="/capture"
                className="bg-verified-green text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-verified-green/90 transition-all duration-150 shadow-sm"
              >
                Capture
              </Link>
            </div>
          </div>
          
          <main className="flex-1 relative z-10 pt-14 pb-20 overflow-y-auto h-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {children}
            </motion.div>
          </main>
          
          {/* Navigation - always visible now */}
          <nav className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-6">
            <div className="neo-blur rounded-2xl">
              <div className="flex justify-around items-center py-2 px-1">
                <NavItem to="/" icon={<Home />} label="Home" isActive={location.pathname === '/'} />
                <NavItem to="/capture" icon={<Camera />} label="Capture" isActive={location.pathname === '/capture'} />
                <NavItem to="/verify" icon={<Search />} label="Verify" isActive={location.pathname === '/verify'} />
              </div>
            </div>
          </nav>
          
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
        "flex flex-col items-center justify-center px-6 py-2 rounded-xl transition-all relative",
        isActive 
          ? "text-verified-green" 
          : "text-verified-dark/50 hover:text-verified-dark/80"
      )}
    >
      <div className={cn(
        "mb-1 p-1.5 rounded-full",
        isActive ? "bg-white shadow-sm" : ""
      )}>
        {icon}
      </div>
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <motion.div 
          layoutId="activeTab"
          className="absolute -bottom-1 w-10 h-0.5 bg-verified-green"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
};

export default Layout;
