
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
            
            <p className="text-verified-dark/90 mb-6">
              Verify the truth behind every capture
            </p>
            
            <p className="text-verified-dark/80 mb-8 text-sm">
              TrueCapture ensures authenticity in an era of digital manipulation. Capture photos and videos that are verifiably real with unique codes that can be validated anytime.
            </p>
            
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
        
        {/* How It Works Section */}
        <section className="py-12 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-verified-dark mb-2">
                How TrueCapture Works
              </h2>
              <p className="text-verified-dark/80 text-sm">
                Our technology ensures the authenticity of your media from capture to sharing
              </p>
            </motion.div>
            
            <motion.div 
              className="grid gap-6"
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <Camera className="h-6 w-6 text-verified-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark">Authentic Capture</h3>
                  <p className="text-verified-dark/70 text-sm">Photos and videos are captured directly through our app, with tamper-proof verification built in.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <Shield className="h-6 w-6 text-verified-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark">Unique Verification</h3>
                  <p className="text-verified-dark/70 text-sm">Each media file receives a unique verification code and timestamp stored in our secure database.</p>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex items-start gap-4 bg-white/80 p-4 rounded-lg shadow-sm">
                <div className="bg-verified-green/10 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-verified-green" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-verified-dark">Instant Validation</h3>
                  <p className="text-verified-dark/70 text-sm">Anyone can verify the authenticity of media by searching the verification code on our platform.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Use Cases Section */}
        <section className="py-12 px-4">
          <div className="max-w-md mx-auto">
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-verified-dark mb-2">
                Trusted Verification For All
              </h2>
              <p className="text-verified-dark/80 text-sm">
                TrueCapture helps maintain trust and authenticity across various industries
              </p>
            </motion.div>
            
            <div className="grid gap-6">
              <UseCase 
                icon={<FileText className="h-6 w-6 text-verified-green" />}
                title="Journalism & News Media"
                description="Verify the authenticity of breaking news images and videos to combat misinformation."
                delay={0.1}
              />
              
              <UseCase 
                icon={<Camera className="h-6 w-6 text-verified-green" />}
                title="Social Media Creators"
                description="Build trust with your audience by verifying your content is authentic and unmodified."
                delay={0.2}
              />
              
              <UseCase 
                icon={<Shield className="h-6 w-6 text-verified-green" />}
                title="Insurance Documentation"
                description="Provide verifiable evidence for insurance claims with authenticated photos and videos."
                delay={0.3}
              />
              
              <UseCase 
                icon={<Scale className="h-6 w-6 text-verified-green" />}
                title="Legal Evidence"
                description="Capture and verify media that can be used as reliable evidence in legal proceedings."
                delay={0.4}
              />
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 px-4 bg-verified-green/10">
          <div className="max-w-md mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-verified-dark mb-4">
                Ready to authenticate your captures?
              </h2>
              <p className="text-verified-dark/80 mb-8">
                Start using TrueCapture today and ensure your media is verifiably authentic in a world full of digital manipulation.
              </p>
              <Button 
                onClick={() => navigate('/capture')} 
                className="bg-verified-green text-white hover:bg-verified-green/90 w-full max-w-xs h-12"
              >
                Start Your First Verified Capture
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
  description: string;
  delay: number;
}

const UseCase: React.FC<UseCaseProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-verified-green/10 p-2 rounded-full">
            {icon}
          </div>
          <h3 className="font-bold text-verified-dark">{title}</h3>
        </div>
        <p className="text-verified-dark/70 text-sm">{description}</p>
      </div>
      <div className="bg-verified-green/5 p-3 flex justify-center">
        <VerifiedBadge size="sm" className="scale-75" />
      </div>
    </motion.div>
  );
};

export default Index;
