
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Video, X, Aperture } from 'lucide-react';
import { toast } from 'sonner';

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

  useEffect(() => {
    const initCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode: 'environment',
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
  }, [isActive]);

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
        // Fallback
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
    
    // Start recording with a 3 second countdown
    startCountdown(() => {
      mediaRecorderRef.current?.start();
      setIsRecording(true);
      
      // For demo, limit recording to 10 seconds
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
      {/* Camera Preview */}
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="h-full w-full object-cover"
      />
      
      {/* Countdown Overlay */}
      {countdown !== null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-6xl font-bold text-white animate-pulse">
            {countdown}
          </div>
        </div>
      )}
      
      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center">
        <div className="flex gap-8 items-center mb-6">
          {/* Mode Selector */}
          <button 
            onClick={() => setMode('photo')}
            className={`p-3 rounded-full ${mode === 'photo' ? 'bg-verified-green text-white' : 'bg-white/20 text-white'}`}
          >
            <Camera size={24} />
          </button>
          
          {/* Capture Button */}
          <button 
            onClick={mode === 'photo' ? takePhoto : isRecording ? stopVideoRecording : startVideoRecording}
            className={`flex items-center justify-center p-2 rounded-full
              ${isRecording 
                ? 'bg-red-500 w-16 h-16' 
                : 'bg-white w-20 h-20'
              }`}
            disabled={countdown !== null}
          >
            <div className={`${isRecording ? 'w-8 h-8 rounded-sm bg-white' : 'rounded-full border-4 border-verified-dark w-full h-full flex items-center justify-center'}`}>
              {!isRecording && mode === 'photo' && <Aperture size={30} className="text-verified-dark" />}
            </div>
          </button>
          
          {/* Mode Selector */}
          <button 
            onClick={() => setMode('video')}
            className={`p-3 rounded-full ${mode === 'video' ? 'bg-verified-green text-white' : 'bg-white/20 text-white'}`}
          >
            <Video size={24} />
          </button>
        </div>
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="flex items-center bg-white/20 rounded-full px-4 py-1 text-white">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
            <span>Recording...</span>
          </div>
        )}
      </div>
      
      {/* Close Button */}
      <button 
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white"
      >
        <X size={24} />
      </button>
    </div>
  );
};

export default CameraComponent;
