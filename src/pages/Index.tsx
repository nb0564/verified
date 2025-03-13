
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Camera, Search, CheckCircle, Shield, FileText, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Layout hideNav={false}>
      <div className="min-h-screen">
        {/* Hero Section with improved aesthetics */}
        <section className="pt-8 pb-5 px-4">
          <motion.div 
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <VerifiedBadge size="lg" animated />
            </div>
            
            {/* Enhanced TruCapture Logo/Header */}
            <div className="mb-4">
              <h1 className="relative text-4xl font-black text-verified-dark inline-block gta-header">
                <span className="relative z-10">TrueCapture</span>
                <div className="absolute -bottom-1 left-0 right-0 h-3 bg-verified-yellow opacity-70 transform -rotate-1"></div>
              </h1>
            </div>
            
            {/* Simplified tagline */}
            <div className="relative mb-3 inline-block">
              <p className="text-verified-dark/80 text-lg font-medium px-2 relative z-10 nineties-text-shadow" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
                Authenticity in the digital age
              </p>
            </div>
            
            {/* App-appropriate feature tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-verified-green text-verified-yellow px-3 py-1 rounded-full text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
              >
                #TamperProof
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-verified-dark text-verified-yellow px-3 py-1 rounded-full text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
              >
                #VerifiableMedia
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-verified-green text-verified-yellow px-3 py-1 rounded-full text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]"
              >
                #TrustChain
              </motion.span>
            </div>
            
            {/* Enlarged primary action buttons */}
            <div className="mb-8">
              <div className="grid grid-cols-1 gap-3 max-w-xs mx-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => navigate('/capture')} 
                    className="nineties-gradient text-white hover:opacity-90 flex items-center justify-center gap-2 h-14 shadow-lg w-full text-lg"
                  >
                    <Camera size={24} />
                    <span className="font-bold">Start Capturing</span>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={() => navigate('/verify')} 
                    className="gradient-yellow text-verified-dark hover:opacity-90 flex items-center justify-center gap-2 h-14 shadow-lg w-full text-lg"
                  >
                    <Search size={24} />
                    <span className="font-bold">Verify Media</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
        
        {/* How It Works Section - spicier and more stylized */}
        <section className="py-5 px-4">
          <div className="max-w-md mx-auto relative">
            {/* Background elements */}
            <div className="absolute -top-3 -bottom-3 -left-3 -right-3 bg-white/20 backdrop-blur-sm rounded-2xl -z-10"></div>
            <div className="absolute -top-3 -bottom-3 -left-3 -right-3 border-2 border-dashed border-verified-green/30 rounded-2xl -z-10"></div>
            
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-verified-green text-verified-yellow px-4 py-1 rounded-sm text-xs font-bold mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>
                HOW IT WORKS
              </div>
              <h2 className="text-xl font-bold text-verified-dark gta-header" style={{ textShadow: '2px 2px 0 rgba(0,0,0,0.6)' }}>
                THREE-STEP PROCESS
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-3 gap-3"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 bg-verified-yellow p-3 rounded-lg text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
                <div className="bg-verified-green p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]">
                  <Camera className="h-5 w-5 text-verified-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-dark text-xs uppercase" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>Capture</h3>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 bg-verified-dark p-3 rounded-lg text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
                <div className="bg-verified-green p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]">
                  <Shield className="h-5 w-5 text-verified-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-yellow text-xs uppercase" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>Secure</h3>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 bg-verified-yellow p-3 rounded-lg text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]">
                <div className="bg-verified-green p-2 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]">
                  <CheckCircle className="h-5 w-5 text-verified-yellow" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-dark text-xs uppercase" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>Verify</h3>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Use Cases Section - more stylized but still compact */}
        <section className="py-5 px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-block bg-verified-dark text-verified-yellow px-4 py-1 rounded-sm text-xs font-bold mb-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.6)]" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.8)' }}>
                PERFECT FOR
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-3 mb-5">
              <UseCase 
                icon={<FileText className="h-5 w-5 text-verified-yellow" />}
                title="Journalism"
                description="Verify sources"
                delay={0.1}
                bgColor="bg-verified-green"
                textColor="text-verified-yellow"
              />
              
              <UseCase 
                icon={<Camera className="h-5 w-5 text-verified-dark" />}
                title="Creators"
                description="Protect your work"
                delay={0.2}
                bgColor="bg-verified-yellow"
                textColor="text-verified-dark"
              />
              
              <UseCase 
                icon={<Shield className="h-5 w-5 text-verified-yellow" />}
                title="Insurance"
                description="Prevent fraud"
                delay={0.3}
                bgColor="bg-verified-green"
                textColor="text-verified-yellow"
              />
              
              <UseCase 
                icon={<Scale className="h-5 w-5 text-verified-dark" />}
                title="Legal"
                description="Evidence chain"
                delay={0.4}
                bgColor="bg-verified-yellow"
                textColor="text-verified-dark"
              />
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    </Layout>
  );
};

interface UseCaseProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  bgColor: string;
  textColor: string;
}

const UseCase: React.FC<UseCaseProps> = ({ icon, title, description, delay, bgColor, textColor }) => {
  return (
    <motion.div 
      className={`${bgColor} rounded-lg overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="p-3 text-center">
        <div className="bg-black/20 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
          {icon}
        </div>
        <h3 className={`font-bold ${textColor} text-sm uppercase`} style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.3)' }}>{title}</h3>
        <p className={`text-xs ${textColor}/80 mt-1`}>{description}</p>
      </div>
    </motion.div>
  );
};

export default Index;
