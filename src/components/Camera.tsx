
import React from 'react';
import { useCameraControls } from './camera/useCameraControls';
import CameraPermissionDenied from './camera/CameraPermissionDenied';
import { RotateCw, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraProps {
  onCapture: (blob: Blob, type: 'photo' | 'video') => void;
  onClose?: () => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const {
    videoRef,
    mode,
    isRecording,
    countdown,
    cameraPermission,
    facingMode,
    setMode,
    handleCaptureClick,
    toggleCamera,
    handleClose
  } = useCameraControls({ onCapture, onClose });

  if (cameraPermission === false) {
    return <CameraPermissionDenied onClose={handleClose} />;
  }

  return (
    <div className="absolute inset-0 bg-black flex flex-col">
      {/* Camera Viewfinder */}
      <div className="relative flex-1 overflow-hidden">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 h-full w-full object-cover"
        />
        
        {/* iOS-style status bar */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-black/60 backdrop-blur-md z-10 flex items-center justify-between px-4">
          <button 
            onClick={handleClose}
            className="text-white flex items-center"
          >
            <X size={20} className="mr-1" />
            <span>Close</span>
          </button>
          <div className="text-white text-sm font-medium">
            {mode === 'photo' ? 'Photo Mode' : 'Video Mode'}
          </div>
        </div>
        
        {/* Countdown Overlay */}
        {countdown !== null && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
            <div className="w-24 h-24 rounded-full bg-black/70 backdrop-blur-lg flex items-center justify-center">
              <div className="text-6xl font-bold text-white">
                {countdown}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* iOS-style Camera Controls */}
      <div className="bg-black pt-4 pb-8 px-4">
        {/* Camera Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-black/70 backdrop-blur-md rounded-full p-1 border border-white/20">
            <div className="flex relative">
              <button 
                onClick={() => setMode('photo')}
                className={cn(
                  "relative z-10 px-10 py-2 rounded-full text-sm font-medium transition-colors",
                  mode === 'photo' 
                    ? "text-black" 
                    : "text-white"
                )}
              >
                Photo
              </button>
              
              <button 
                onClick={() => setMode('video')}
                className={cn(
                  "relative z-10 px-10 py-2 rounded-full text-sm font-medium transition-colors",
                  mode === 'video' 
                    ? "text-black" 
                    : "text-white"
                )}
              >
                Video
              </button>
              
              {/* Sliding Background */}
              <div 
                className={cn(
                  "absolute top-0 h-full w-1/2 rounded-full bg-white transition-transform duration-300",
                  mode === 'video' ? "translate-x-full" : ""
                )}
              />
            </div>
          </div>
        </div>
        
        {/* Capture Controls */}
        <div className="flex items-center justify-center gap-14">
          {/* Flip Camera Button */}
          <button 
            onClick={toggleCamera}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
          >
            <RotateCw size={24} />
          </button>
          
          {/* Capture Button */}
          <button 
            onClick={handleCaptureClick}
            disabled={countdown !== null}
            className={cn(
              "flex items-center justify-center rounded-full border-4",
              isRecording 
                ? "bg-red-500 border-white w-24 h-24" 
                : "bg-transparent border-white w-24 h-24"
            )}
          >
            {isRecording ? (
              <div className="w-12 h-12 rounded-sm bg-red-600" />
            ) : (
              <div className="rounded-full bg-white w-16 h-16" />
            )}
          </button>
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white"
          >
            <div className="w-6 h-6 rounded bg-white"></div>
          </button>
        </div>
        
        {/* Recording Indicator */}
        {isRecording && (
          <div className="mt-6 flex items-center justify-center">
            <div className="flex items-center bg-black/70 backdrop-blur-md rounded-full px-4 py-2 text-white">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
              <span className="text-sm">Recording... Tap to stop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Camera;
