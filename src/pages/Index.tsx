
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VerifiedBadge from '@/components/VerifiedBadge';
import { Camera, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <motion.div 
          className="p-6 pt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <VerifiedBadge size="lg" />
          </div>
          
          <h1 className="text-4xl font-bold text-verified-dark mb-3">
            Verified Vintage Capture
          </h1>
          
          <p className="text-verified-dark/80 mb-8 max-w-md mx-auto">
            Capture authentic photos and videos with a unique verification code that proves they're real.
          </p>
          
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <button 
              onClick={() => navigate('/capture')} 
              className="btn-primary flex items-center justify-center gap-2"
            >
              <Camera size={20} />
              <span>Capture Media</span>
            </button>
            
            <button 
              onClick={() => navigate('/verify')} 
              className="btn-secondary flex items-center justify-center gap-2"
            >
              <Search size={20} />
              <span>Verify Media</span>
            </button>
          </div>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="mt-12 p-6 pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-verified-dark mb-6 text-center">
            How It Works
          </h2>
          
          <div className="grid gap-4 max-w-md mx-auto">
            <FeatureCard 
              icon={<Camera className="h-6 w-6" />}
              title="Capture"
              description="Take photos or record videos directly through the app."
              delay={0.1}
            />
            
            <FeatureCard 
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>}
              title="Verify"
              description="Each capture gets a unique verification code proving it's authentic."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<Search className="h-6 w-6" />}
              title="Validate"
              description="Anyone can validate the authenticity of your media using the code."
              delay={0.3}
            />
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="flex items-start p-4 bg-white/70 backdrop-blur-sm rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="rounded-full p-2 bg-verified-green/10 text-verified-green mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-verified-dark mb-1">{title}</h3>
        <p className="text-verified-dark/70 text-sm">{description}</p>
      </div>
      <ChevronRight className="ml-auto text-verified-green shrink-0" />
    </motion.div>
  );
};

export default Index;
