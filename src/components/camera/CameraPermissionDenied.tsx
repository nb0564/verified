
import React from 'react';
import { X } from 'lucide-react';

interface CameraPermissionDeniedProps {
  onClose: () => void;
}

const CameraPermissionDenied: React.FC<CameraPermissionDeniedProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="text-verified-dark mb-4">
        <X size={48} className="mx-auto mb-2" />
        <h2 className="text-xl font-bold mb-2">Camera Access Denied</h2>
        <p>Please grant camera access to capture verified media.</p>
      </div>
      <button 
        onClick={onClose} 
        className="btn-primary mt-4"
      >
        Close
      </button>
    </div>
  );
};

export default CameraPermissionDenied;
