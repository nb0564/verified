import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import SolidBackground from './SolidBackground';
import GrainOverlay from './GrainOverlay';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  useSolidBackground?: boolean;
  transitionBackground?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  hideNav = false, 
  useSolidBackground = false,
  transitionBackground = false
}) => {
  const [transitionProgress, setTransitionProgress] = useState(0);
  
  useEffect(() => {
    if (!transitionBackground) return;
    
    const duration = 3000; // 3 seconds for transition
    const interval = 16; // roughly 60fps
    const steps = duration / interval;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep += 1;
      setTransitionProgress(Math.min(currentStep / steps, 1));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [transitionBackground]);
  
  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      {transitionBackground ? (
        <>
          <AnimatedBackground opacity={1 - transitionProgress} />
          <SolidBackground opacity={transitionProgress} />
        </>
      ) : (
        useSolidBackground ? <SolidBackground /> : <AnimatedBackground />
      )}
      <GrainOverlay />
      <main className="min-h-screen w-full">
        {children}
      </main>
    </div>
  );
};

export default Layout;