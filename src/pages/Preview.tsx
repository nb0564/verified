
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import VerifiedBadge from '@/components/VerifiedBadge';
import VerificationCode from '@/components/VerificationCode';
import { Share2, Download, Check } from 'lucide-react';
import { toast } from 'sonner';

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
        <div className="p-4 relative">
          {/* Media Preview */}
          <div className="relative rounded-xl overflow-hidden shadow-lg bg-black aspect-[4/3] mb-6">
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
            
            {/* Badge Overlay */}
            <div className="absolute top-4 right-4">
              <VerifiedBadge size="sm" />
            </div>
          </div>
          
          {/* Verification Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <VerifiedBadge size="lg" />
            </div>
            
            <div className="mb-6">
              <VerificationCode code={verificationCode} />
            </div>
            
            <div className="grid gap-3 text-verified-dark mb-6">
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                <span className="font-medium">Type</span>
                <span className="capitalize">{mediaType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                <span className="font-medium">Captured</span>
                <span>{formattedDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/80 rounded-lg">
                <span className="font-medium">Status</span>
                <span className="flex items-center text-verified-green">
                  <Check size={16} className="mr-1" /> Verified
                </span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={handleDownload} 
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                <span>{downloaded ? 'Downloaded' : 'Download'}</span>
              </button>
              <button 
                onClick={handleShare} 
                className="btn-secondary flex-1 flex items-center justify-center gap-2"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Preview;
