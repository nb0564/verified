
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
              <VerifiedBadge size="lg" />
            </div>
            
            {/* Enhanced TruCapture Logo/Header */}
            <div className="mb-4">
              <h1 className="relative text-4xl font-black text-verified-dark inline-block">
                <span className="relative z-10">TrueCapture</span>
                <div className="absolute -bottom-1 left-0 right-0 h-3 bg-verified-yellow opacity-50 transform -rotate-1"></div>
              </h1>
            </div>
            
            {/* Simplified tagline */}
            <div className="relative mb-3 inline-block">
              <p className="text-verified-dark/80 text-lg font-medium px-2 relative z-10">
                Authenticity in the digital age
              </p>
            </div>
            
            {/* App-appropriate feature tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              <span className="bg-verified-green/20 text-verified-green px-3 py-1 rounded-full text-sm font-medium">
                #TamperProof
              </span>
              <span className="bg-verified-green/20 text-verified-green px-3 py-1 rounded-full text-sm font-medium">
                #VerifiableMedia
              </span>
              <span className="bg-verified-green/20 text-verified-green px-3 py-1 rounded-full text-sm font-medium">
                #TrustChain
              </span>
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
        
        {/* How It Works Section - smaller and more stylized */}
        <section className="py-5 px-4">
          <div className="max-w-md mx-auto relative">
            {/* Background elements */}
            <div className="absolute -top-3 -bottom-3 -left-3 -right-3 bg-white/30 backdrop-blur-sm rounded-2xl -z-10"></div>
            <div className="absolute -top-3 -bottom-3 -left-3 -right-3 border-2 border-dashed border-verified-green/10 rounded-2xl -z-10"></div>
            
            <motion.div 
              className="text-center mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-verified-green text-white px-3 py-0.5 rounded-full text-xs font-bold mb-1">
                How It Works
              </div>
              <h2 className="text-xl font-bold text-verified-dark">
                Simple Three-Step Process
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-3 gap-2"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 glass-morphism p-3 rounded-lg text-center">
                <div className="gradient-green p-2 rounded-full shadow-sm">
                  <Camera className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-dark text-xs">Capture</h3>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 glass-morphism p-3 rounded-lg text-center">
                <div className="gradient-green p-2 rounded-full shadow-sm">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-dark text-xs">Secure</h3>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 glass-morphism p-3 rounded-lg text-center">
                <div className="gradient-green p-2 rounded-full shadow-sm">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-verified-dark text-xs">Verify</h3>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Use Cases Section - even more compact */}
        <section className="py-5 px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-lg font-bold text-verified-dark mb-1">
                Perfect For
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-2 mb-5">
              <UseCase 
                icon={<FileText className="h-4 w-4 text-verified-green" />}
                title="Journalism"
                delay={0.1}
              />
              
              <UseCase 
                icon={<Camera className="h-4 w-4 text-verified-green" />}
                title="Creators"
                delay={0.2}
              />
              
              <UseCase 
                icon={<Shield className="h-4 w-4 text-verified-green" />}
                title="Insurance"
                delay={0.3}
              />
              
              <UseCase 
                icon={<Scale className="h-4 w-4 text-verified-green" />}
                title="Legal"
                delay={0.4}
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
  delay: number;
}

const UseCase: React.FC<UseCaseProps> = ({ icon, title, delay }) => {
  return (
    <motion.div 
      className="glass-morphism rounded-xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="p-2 text-center">
        <div className="bg-verified-green/10 p-1.5 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
          {icon}
        </div>
        <h3 className="font-bold text-verified-dark text-xs">{title}</h3>
      </div>
    </motion.div>
  );
};

export default Index;
