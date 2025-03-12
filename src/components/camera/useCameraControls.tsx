
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';

interface UseCameraControlsProps {
  onCapture: (blob: Blob, type: 'photo' | 'video') => void;
  onClose?: () => void;
}

export const useCameraControls = ({ onCapture, onClose }: UseCameraControlsProps) => {
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

  const handleCaptureClick = () => {
    if (mode === 'photo') {
      takePhoto();
    } else {
      if (isRecording) {
        stopVideoRecording();
      } else {
        startVideoRecording();
      }
    }
  };

  return {
    videoRef,
    mode,
    isRecording,
    countdown,
    cameraPermission,
    setMode,
    handleCaptureClick,
    toggleCamera,
    handleClose
  };
};
