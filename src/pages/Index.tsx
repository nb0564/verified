
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
        {/* Hero Section */}
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
            
            <h1 className="text-3xl font-bold text-verified-dark mb-3">
              TrueCapture
            </h1>
            
            <p className="text-verified-dark/80 mb-2 text-lg">
              Authenticity in the digital age
            </p>
            
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
                className="bg-verified-green text-white hover:bg-verified-green/90 flex items-center justify-center gap-2 h-12"
              >
                <Camera size={20} />
                <span>Start Capturing</span>
              </Button>
              
              <Button 
                onClick={() => navigate('/verify')} 
                className="bg-verified-yellow text-verified-dark hover:bg-verified-yellow/90 flex items-center justify-center gap-2 h-12"
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
        
        {/* How It Works Section - more app-focused content */}
        <section className="py-10 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-verified-dark mb-2">
                How It Works
              </h2>
            </motion.div>
            
            <motion.div 
              className="grid gap-4"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <Camera className="h-5 w-5 text-verified-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark text-sm">Capture</h3>
                  <p className="text-verified-dark/70 text-xs">Take photos and videos directly through the app</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-verified-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark text-sm">Secure</h3>
                  <p className="text-verified-dark/70 text-xs">Each file receives a unique verification code</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-3 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-verified-green" />
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
                className="bg-verified-green text-white hover:bg-verified-green/90 w-full max-w-xs h-12"
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
      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm"
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
