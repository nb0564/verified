
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Search, Home } from 'lucide-react';
import GrainOverlay from './GrainOverlay';
import AnimatedBackground from './AnimatedBackground';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      <main className="flex-1 relative z-10">
        {children}
      </main>
      
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 z-20 p-4 mb-2">
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-lg p-2 px-3">
            <div className="flex justify-around items-center">
              <NavItem to="/" icon={<Home />} label="Home" isActive={location.pathname === '/'} />
              <NavItem to="/capture" icon={<Camera />} label="Capture" isActive={location.pathname === '/capture'} />
              <NavItem to="/verify" icon={<Search />} label="Verify" isActive={location.pathname === '/verify'} />
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
        "flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-300",
        isActive 
          ? "text-verified-green scale-110" 
          : "text-verified-dark/70 hover:text-verified-dark"
      )}
    >
      <span className="mb-1">{icon}</span>
      <span className="text-xs font-medium">{label}</span>
      {isActive && (
        <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-verified-green" />
      )}
    </Link>
  );
};

export default Layout;
