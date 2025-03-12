import React, { useState, useRef, useEffect } from 'react';
import { Camera as CameraIcon, Video, X, Aperture, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CameraProps {
  onCapture: (blob: Blob, type: 'photo' | 'video') => void;
  onClose?: () => void;
}

const CameraComponent: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  useEffect(() => {
    const initCamera = async () => {
      try {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        const constraints = {
          video: {
            facingMode: facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraPermission(true);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setCameraPermission(false);
        toast.error('Failed to access camera. Please check permissions.');
      }
    };

    if (isActive) {
      initCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isActive, facingMode]);

  const takePhoto = () => {
    if (!videoRef.current || !streamRef.current) return;
    
    startCountdown(() => {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video!.videoWidth;
      canvas.height = video!.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video!, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          toast.success('Photo captured!');
          onCapture(blob, 'photo');
        }
      }, 'image/jpeg', 0.95);
    });
  };

  const startVideoRecording = () => {
    if (!videoRef.current || !streamRef.current) return;
    
    chunksRef.current = [];
    const options = { mimeType: 'video/webm; codecs=vp9' };
    
    try {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current, options);
    } catch (e) {
      try {
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      } catch (e) {
        toast.error('Video recording not supported on this browser');
        return;
      }
    }
    
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      onCapture(blob, 'video');
      setIsRecording(false);
      toast.success('Video captured!');
    };
    
    startCountdown(() => {
      mediaRecorderRef.current?.start();
      setIsRecording(true);
      
      setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopVideoRecording();
        }
      }, 10000);
    });
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const startCountdown = (callback: () => void) => {
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          callback();
          return null;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsActive(false);
    onClose?.();
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  if (cameraPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="text-verified-dark mb-4">
          <X size={48} className="mx-auto mb-2" />
          <h2 className="text-xl font-bold mb-2">Camera Access Denied</h2>
          <p>Please grant camera access to capture verified media.</p>
        </div>
        <button 
          onClick={handleClose} 
          className="btn-primary mt-4"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute top-0 left-0 right-0 z-30 h-12 flex items-center justify-between px-4 bg-black/30 backdrop-blur-sm">
        <div className="text-white text-sm font-medium">TrueCapture</div>
        <div className="text-white text-sm">
          {mode === 'photo' ? 'Photo Mode' : 'Video Mode'}
        </div>
      </div>
      
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="h-full w-full object-cover"
      />
      
      {countdown !== null && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <div className="text-6xl font-bold text-white">
              {countdown}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-12 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex flex-col items-center">
          <div className="flex justify-center gap-6 mb-6">
            <button 
              onClick={() => setMode('photo')}
              className={cn(
                "ios-btn px-4 py-2",
                mode === 'photo' ? "bg-white/30 text-white" : "bg-white/10 text-white/60"
              )}
            >
              <CameraIcon size={20} className="mr-2" />
              <span>Photo</span>
            </button>
            
            <button 
              onClick={() => setMode('video')}
              className={cn(
                "ios-btn px-4 py-2",
                mode === 'video' ? "bg-white/30 text-white" : "bg-white/10 text-white/60"
              )}
            >
              <Video size={20} className="mr-2" />
              <span>Video</span>
            </button>
          </div>
          
          <div className="flex items-center gap-8">
            <motion.button
              onClick={toggleCamera}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
            >
              <RotateCcw size={24} />
            </motion.button>
            
            <motion.button 
              onClick={mode === 'photo' ? takePhoto : isRecording ? stopVideoRecording : startVideoRecording}
              whileTap={{ scale: 0.95 }}
              disabled={countdown !== null}
              className={cn(
                "flex items-center justify-center rounded-full border-4",
                isRecording 
                  ? "bg-red-500 border-white w-20 h-20" 
                  : "bg-white/10 backdrop-blur-lg border-white/80 w-24 h-24"
              )}
            >
              {isRecording ? (
                <motion.div 
                  className="w-12 h-12 rounded-sm bg-red-600"
                  animate={{ scale: [1, 0.8, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              ) : (
                <div className="rounded-full bg-white w-16 h-16 flex items-center justify-center">
                  {mode === 'photo' ? (
                    <Aperture size={30} className="text-verified-dark" />
                  ) : (
                    <Video size={30} className="text-verified-dark" />
                  )}
                </div>
              )}
            </motion.button>
            
            <motion.button 
              onClick={handleClose}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
            >
              <X size={24} />
            </motion.button>
          </div>
          
          {isRecording && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-white"
            >
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span>Recording... Tap to stop</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
