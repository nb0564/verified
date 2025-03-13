
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
        <section className="pt-8 pb-12 px-4">
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
            
            {/* Enhanced tagline styling - removed sparkles */}
            <div className="relative mb-3 inline-block">
              <p className="text-verified-dark/80 text-lg font-medium px-2 relative z-10">
                Authenticity in the digital age
              </p>
            </div>
            
            {/* App-appropriate feature tags replacing long paragraph */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
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
            
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button 
                onClick={() => navigate('/capture')} 
                className="gradient-green text-white hover:bg-verified-green/90 flex items-center justify-center gap-2 h-12 shadow-md"
              >
                <Camera size={20} />
                <span>Start Capturing</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/verify')} 
                className="gradient-yellow text-verified-dark hover:bg-verified-yellow/90 flex items-center justify-center gap-2 h-12 shadow-md"
              >
                <Search size={20} />
                <span>Verify Media</span>
              </Button>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-center mt-8 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-verified-dark/70 text-xs italic">
              Trusted by content creators and journalists worldwide
            </p>
          </motion.div>
        </section>
        
        {/* How It Works Section - enhanced with more interesting borders and aesthetics */}
        <section className="py-10 px-4">
          <div className="max-w-md mx-auto relative">
            {/* Ornamental elements to make the section more interesting */}
            <div className="absolute -top-5 -bottom-5 -left-5 -right-5 bg-white/50 backdrop-blur-sm rounded-2xl -z-10"></div>
            <div className="absolute -top-5 -bottom-5 -left-5 -right-5 border-2 border-dashed border-verified-green/20 rounded-2xl -z-10"></div>
            
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-verified-green text-white px-4 py-1 rounded-full text-sm font-bold mb-2">
                How It Works
              </div>
              <h2 className="text-2xl font-bold text-verified-dark">
                Simple Three-Step Process
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid gap-4"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-start gap-4 glass-morphism p-4 rounded-lg">
                <div className="gradient-green p-3 rounded-full shadow-sm">
                  <Camera className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark text-sm">Capture</h3>
                  <p className="text-verified-dark/70 text-xs">Take photos and videos directly through the app</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 glass-morphism p-4 rounded-lg">
                <div className="gradient-green p-3 rounded-full shadow-sm">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark text-sm">Secure</h3>
                  <p className="text-verified-dark/70 text-xs">Each file receives a unique verification code</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 glass-morphism p-4 rounded-lg">
                <div className="gradient-green p-3 rounded-full shadow-sm">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark text-sm">Verify</h3>
                  <p className="text-verified-dark/70 text-xs">Validate authenticity with a simple search</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Use Cases Section - more compact and app-like */}
        <section className="py-10 px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-verified-dark mb-2">
                Perfect For
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-3">
              <UseCase 
                icon={<FileText className="h-5 w-5 text-verified-green" />}
                title="Journalism"
                delay={0.1}
              />
              
              <UseCase 
                icon={<Camera className="h-5 w-5 text-verified-green" />}
                title="Creators"
                delay={0.2}
              />
              
              <UseCase 
                icon={<Shield className="h-5 w-5 text-verified-green" />}
                title="Insurance"
                delay={0.3}
              />
              
              <UseCase 
                icon={<Scale className="h-5 w-5 text-verified-green" />}
                title="Legal"
                delay={0.4}
              />
            </div>
          </div>
        </section>
        
        {/* Compact CTA Section */}
        <section className="py-8 px-4 bg-verified-green/10">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold text-verified-dark mb-4">
                Ready to start?
              </h2>
              <Button 
                onClick={() => navigate('/capture')} 
                className="gradient-green text-white hover:bg-verified-green/90 w-full max-w-xs h-12 shadow-md"
              >
                Capture Verified Media
              </Button>
            </motion.div>
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="p-3 text-center">
        <div className="bg-verified-green/10 p-2 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-2">
          {icon}
        </div>
        <h3 className="font-bold text-verified-dark text-sm">{title}</h3>
      </div>
    </motion.div>
  );
};

export default Index;
