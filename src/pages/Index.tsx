import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Search, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionComplete(true);
    }, 4000); // Allow time for background transition
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout hideNav={true} transitionBackground={true}>
      <div className="min-h-screen w-full flex flex-col">
        <motion.section 
          className="flex-grow flex flex-col items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="text-center">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <VerifiedBadge size="xl" animated={true} />
            </motion.div>
            
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-verified-pink via-verified-purple to-verified-blue mt-6 mb-3"
              style={{ 
                textShadow: '0 0 20px rgba(255, 51, 102, 0.5), 0 0 40px rgba(153, 0, 255, 0.3)',
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              VERIFIED
            </motion.h1>
            
            <motion.p 
              className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-verified-light to-verified-blue mb-10"
              style={{ letterSpacing: '0.05em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
            >
              PROVE YOUR AUTHENTICITY
            </motion.p>

            <AnimatePresence>
              {transitionComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <Button
                    onClick={() => navigate('/verify')}
                    className="gradient-purple text-verified-light rounded-full py-6 px-8 mt-6"
                    size="lg"
                  >
                    <Search size={18} className="mr-2" />
                    Verify Now
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
        
        <Footer />
      </div>
    </Layout>
  );
};

export default Index;