
import React from 'react';
import CameraUI from './camera/CameraUI';
import CameraPermissionDenied from './camera/CameraPermissionDenied';
import { useCameraControls } from './camera/useCameraControls';
import { CountdownOverlay, CameraStatusBar } from './camera/CameraUI';
import { motion } from 'framer-motion';

interface CameraProps {
  onCapture: (blob: Blob, type: 'photo' | 'video') => void;
  onClose?: () => void;
}

const CameraComponent: React.FC<CameraProps> = ({ onCapture, onClose }) => {
  const {
    videoRef,
    mode,
    isRecording,
    countdown,
    cameraPermission,
    setMode,
    handleCaptureClick,
    toggleCamera,
    handleClose
  } = useCameraControls({ onCapture, onClose });

  if (cameraPermission === false) {
    return <CameraPermissionDenied onClose={handleClose} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <CameraStatusBar mode={mode} />
      
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted 
        className="h-full w-full object-cover"
      />
      
      <CountdownOverlay countdown={countdown} />
      
      <CameraUI 
        mode={mode}
        isRecording={isRecording}
        countdown={countdown}
        onModeChange={setMode}
        onCapture={handleCaptureClick}
        onToggleCamera={toggleCamera}
        onClose={handleClose}
      />
    </div>
  );
};

export default CameraComponent;
