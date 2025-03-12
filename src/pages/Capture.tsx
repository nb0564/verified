
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import Camera from '@/components/Camera';
import { generateVerificationCode } from '@/utils/verification';
import { Loader2 } from 'lucide-react';

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
        <div className="h-screen flex flex-col items-center justify-center p-6">
          <Loader2 className="h-12 w-12 text-verified-green animate-spin mb-4" />
          <h2 className="text-2xl font-bold text-verified-dark mb-2">Processing your media</h2>
          <p className="text-verified-dark/70 text-center max-w-md">
            We're verifying and securing your capture. This will just take a moment...
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="h-screen">
        <Camera onCapture={handleCapture} onClose={() => navigate('/')} />
      </div>
    </Layout>
  );
};

export default Capture;
