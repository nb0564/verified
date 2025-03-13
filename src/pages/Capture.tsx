
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Camera from '@/components/Camera';
import { generateVerificationCode } from '@/utils/verification';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const Capture: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCapture = (blob: Blob, type: 'photo' | 'video') => {
    setIsProcessing(true);
    
    // Create a verification code
    const code = generateVerificationCode();
    
    // Convert blob to URL
    const url = URL.createObjectURL(blob);
    
    // Simulate processing delay
    setTimeout(() => {
      // Navigate to preview page with media data
      navigate('/preview', { 
        state: { 
          mediaUrl: url, 
          mediaType: type,
          verificationCode: code,
          timestamp: new Date().toISOString()
        } 
      });
      setIsProcessing(false);
    }, 2000);
  };

  if (isProcessing) {
    return (
      <Layout hideNav>
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-black/80 backdrop-blur-md p-8 rounded-3xl"
          >
            <div className="mb-6">
              <Loader2 className="h-12 w-12 text-white animate-spin mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Processing</h2>
            <p className="text-white/80 text-center">
              Verifying and securing your capture...
            </p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="fixed inset-0">
        <Camera onCapture={handleCapture} onClose={() => navigate('/')} />
      </div>
    </Layout>
  );
};

export default Capture;
