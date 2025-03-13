
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VerifiedBadge from '@/components/VerifiedBadge';
import VerificationCode from '@/components/VerificationCode';
import { Share2, Download, Check, CheckCircle2, Shield, Clock, Camera as CameraIcon, Film } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface MediaData {
  mediaUrl: string;
  mediaType: 'photo' | 'video';
  verificationCode: string;
  timestamp: string;
}

const Preview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  
  useEffect(() => {
    if (!location.state) {
      navigate('/capture');
      return;
    }
    
    setMediaData(location.state as MediaData);
  }, [location.state, navigate]);
  
  if (!mediaData) {
    return null;
  }
  
  const { mediaUrl, mediaType, verificationCode, timestamp } = mediaData;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = mediaUrl;
    link.download = `verified-${mediaType}-${verificationCode}.${mediaType === 'photo' ? 'jpg' : 'webm'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    toast.success(`${mediaType === 'photo' ? 'Photo' : 'Video'} downloaded`);
  };
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        const blob = await fetch(mediaUrl).then(r => r.blob());
        const file = new File(
          [blob], 
          `verified-${mediaType}-${verificationCode}.${mediaType === 'photo' ? 'jpg' : 'webm'}`,
          { type: mediaType === 'photo' ? 'image/jpeg' : 'video/webm' }
        );
        
        await navigator.share({
          title: 'Verified Media',
          text: `Check out my verified ${mediaType} with code: ${verificationCode}`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        toast.error('Unable to share. Try downloading instead.');
      }
    } else {
      toast.error('Sharing not supported on this device');
    }
  };
  
  const formattedDate = new Date(timestamp).toLocaleString();
  
  return (
    <Layout>
      <div className="animate-fade-in pb-24">
        <div className="relative mx-auto max-w-md">
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 -z-10 rounded-3xl opacity-70 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-verified-yellow/80 animate-gradient-xy"></div>
            <div className="absolute inset-0 backdrop-blur-3xl"></div>
          </motion.div>
          
          {/* Media Preview */}
          <div className="relative p-4">
            <div className="relative rounded-xl overflow-hidden shadow-xl bg-black aspect-[4/3] mb-6 border-2 border-white/20">
              {mediaType === 'photo' ? (
                <img 
                  src={mediaUrl} 
                  alt="Captured media" 
                  className="w-full h-full object-contain" 
                />
              ) : (
                <video 
                  src={mediaUrl} 
                  controls 
                  className="w-full h-full object-contain"
                />
              )}
              
              {/* Animated Badge Overlay */}
              <div className="absolute top-4 right-4 z-20">
                <VerifiedBadge size="sm" animated={true} />
              </div>
            </div>
          
            {/* Verification Info with 90s aesthetic */}
            <div className="relative z-10 mx-auto max-w-sm">
              <motion.div 
                className="neo-brutalism p-6 relative"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="mb-6 relative z-10">
                  <VerificationCode code={verificationCode} />
                </div>
                
                <div className="mb-5 text-center">
                  <VerifiedBadge size="md" />
                </div>
                
                <div className="grid gap-3 text-verified-dark mb-6">
                  <InfoCard 
                    icon={mediaType === 'photo' ? <CameraIcon size={20} /> : <Film size={20} />}
                    label="Type"
                    value={mediaType}
                    isFirst
                  />
                  <InfoCard 
                    icon={<Clock size={20} />}
                    label="Captured"
                    value={formattedDate}
                  />
                  <InfoCard 
                    icon={<CheckCircle2 size={20} />}
                    label="Status"
                    value="Verified"
                    isLast
                  />
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button 
                    onClick={handleDownload} 
                    className="nineties-button flex items-center justify-center gap-2 text-white py-3 px-4 rounded-xl font-bold"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download size={18} />
                    <span>{downloaded ? 'Downloaded' : 'Download'}</span>
                  </motion.button>
                  <motion.button 
                    onClick={handleShare} 
                    className="nineties-button-alt flex items-center justify-center gap-2 text-black py-3 px-4 rounded-xl font-bold"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share2 size={18} />
                    <span>Share</span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Stylized info card component
interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isFirst?: boolean;
  isLast?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, label, value, isFirst, isLast }) => {
  return (
    <motion.div 
      className={`
        flex items-center gap-3 p-3 
        ${isFirst ? 'rounded-t-xl' : ''} 
        ${isLast ? 'rounded-b-xl' : ''}
        bg-white/80 backdrop-blur-md border border-white/50
      `}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: isFirst ? 0.4 : isLast ? 0.8 : 0.6 }}
    >
      <div className="p-2 rounded-full bg-verified-green/20 flex-shrink-0">
        <div className="text-verified-green">{icon}</div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs text-verified-dark/60 uppercase tracking-wider font-medium">{label}</span>
        <span className="text-verified-dark font-semibold capitalize">{value}</span>
      </div>
      {label === "Status" && (
        <div className="ml-auto">
          <div className="h-5 w-5 rounded-full bg-verified-green flex items-center justify-center">
            <Check size={14} className="text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Preview;
