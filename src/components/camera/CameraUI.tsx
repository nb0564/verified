
import React from 'react';
import { motion } from 'framer-motion';
import { Camera as CameraIcon, Video, X, Aperture, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CameraUIProps {
  mode: 'photo' | 'video';
  isRecording: boolean;
  countdown: number | null;
  onModeChange: (mode: 'photo' | 'video') => void;
  onCapture: () => void;
  onToggleCamera: () => void;
  onClose: () => void;
}

export const CameraStatusBar = ({ mode }: { mode: 'photo' | 'video' }) => (
  <div className="absolute top-0 left-0 right-0 z-30 h-12 flex items-center justify-between px-4 bg-black/80">
    <div className="text-white text-sm font-medium">TrueCapture</div>
    <div className="text-white text-sm">
      {mode === 'photo' ? 'Photo Mode' : 'Video Mode'}
    </div>
  </div>
);

export const CountdownOverlay = ({ countdown }: { countdown: number | null }) => {
  if (countdown === null) return null;
  
  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="w-24 h-24 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <div className="text-6xl font-bold text-white">
          {countdown}
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ModeSelector = ({ mode, onModeChange }: { 
  mode: 'photo' | 'video', 
  onModeChange: (mode: 'photo' | 'video') => void 
}) => (
  <div className="flex justify-center gap-6 mb-6">
    <button 
      onClick={() => onModeChange('photo')}
      className={cn(
        "flex items-center px-4 py-2 rounded-full",
        mode === 'photo' 
          ? "bg-white/20 text-white" 
          : "bg-black/40 text-white/70"
      )}
    >
      <CameraIcon size={18} className="mr-2" />
      <span>Photo</span>
    </button>
    
    <button 
      onClick={() => onModeChange('video')}
      className={cn(
        "flex items-center px-4 py-2 rounded-full",
        mode === 'video' 
          ? "bg-white/20 text-white" 
          : "bg-black/40 text-white/70"
      )}
    >
      <Video size={18} className="mr-2" />
      <span>Video</span>
    </button>
  </div>
);

export const CaptureButton = ({ 
  mode, 
  isRecording, 
  disabled, 
  onCapture 
}: { 
  mode: 'photo' | 'video',
  isRecording: boolean,
  disabled: boolean,
  onCapture: () => void
}) => (
  <motion.button 
    onClick={onCapture}
    whileTap={{ scale: 0.95 }}
    disabled={disabled}
    className={cn(
      "flex items-center justify-center rounded-full border-4",
      isRecording 
        ? "bg-red-500 border-white w-20 h-20" 
        : "bg-transparent backdrop-blur-lg border-white w-20 h-20"
    )}
  >
    {isRecording ? (
      <motion.div 
        className="w-10 h-10 rounded-sm bg-red-600"
        animate={{ scale: [1, 0.8, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    ) : (
      <div className="rounded-full bg-white w-14 h-14 flex items-center justify-center">
        {mode === 'photo' ? (
          <Aperture size={24} className="text-black" />
        ) : (
          <Video size={24} className="text-black" />
        )}
      </div>
    )}
  </motion.button>
);

export const ControlButton = ({ 
  icon, 
  onClick 
}: { 
  icon: React.ReactNode, 
  onClick: () => void 
}) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center text-white"
  >
    {icon}
  </motion.button>
);

export const RecordingIndicator = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 flex items-center bg-black/40 rounded-full px-4 py-2 text-white"
  >
    <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
    <span>Recording... Tap to stop</span>
  </motion.div>
);

const CameraUI: React.FC<CameraUIProps> = ({
  mode,
  isRecording,
  countdown,
  onModeChange,
  onCapture,
  onToggleCamera,
  onClose
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-12 bg-gradient-to-t from-black to-transparent">
      <div className="flex flex-col items-center">
        <ModeSelector mode={mode} onModeChange={onModeChange} />
        
        <div className="flex items-center gap-8">
          <ControlButton 
            icon={<RotateCcw size={24} />} 
            onClick={onToggleCamera} 
          />
          
          <CaptureButton 
            mode={mode}
            isRecording={isRecording}
            disabled={countdown !== null}
            onCapture={onCapture}
          />
          
          <ControlButton 
            icon={<X size={24} />} 
            onClick={onClose} 
          />
        </div>
        
        {isRecording && <RecordingIndicator />}
      </div>
    </div>
  );
};

export default CameraUI;
