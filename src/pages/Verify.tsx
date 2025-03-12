
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { getMediaDetails, verifyMedia } from '@/utils/verification';
import { Search, Loader2, CheckCircle, AlertCircle, Calendar, Smartphone, MapPin } from 'lucide-react';

const Verify: React.FC = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter a verification code');
      return;
    }
    
    setIsVerifying(true);
    setError(null);
    
    try {
      const isValid = await verifyMedia(code);
      
      if (isValid) {
        const details = await getMediaDetails(code);
        setVerificationResult(details);
      } else {
        setError('Invalid verification code');
        setVerificationResult(null);
      }
    } catch (err) {
      setError('Failed to verify. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 max-w-md mx-auto animate-fade-in pb-24">
        <h1 className="text-3xl font-bold text-verified-dark mb-2 text-center">
          Verify Media
        </h1>
        <p className="text-verified-dark/70 mb-8 text-center">
          Enter the verification code to check if media is authentic
        </p>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="XXX-XXX"
              className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-verified-green/30 focus:border-verified-green focus:ring-2 focus:ring-verified-green/20 text-verified-dark placeholder-verified-dark/40 text-center tracking-widest text-xl uppercase"
              maxLength={7}
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary w-full flex items-center justify-center gap-2"
            disabled={isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span>{isVerifying ? 'Verifying...' : 'Verify Code'}</span>
          </button>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
              <AlertCircle className="shrink-0 mr-2" size={20} />
              <span>{error}</span>
            </div>
          )}
        </form>
        
        {verificationResult && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-scale-in">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-verified-green/10 rounded-full">
                <CheckCircle className="h-16 w-16 text-verified-green" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-center mb-6 text-verified-dark">
              Media is Verified!
            </h2>
            
            <div className="grid gap-3">
              <div className="flex items-center p-3 bg-white/80 rounded-lg">
                <Calendar className="shrink-0 mr-3 text-verified-green" size={20} />
                <div>
                  <div className="text-sm text-verified-dark/70">Timestamp</div>
                  <div className="text-verified-dark">
                    {new Date(verificationResult.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white/80 rounded-lg">
                <Smartphone className="shrink-0 mr-3 text-verified-green" size={20} />
                <div>
                  <div className="text-sm text-verified-dark/70">Device</div>
                  <div className="text-verified-dark">{verificationResult.device}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white/80 rounded-lg">
                <MapPin className="shrink-0 mr-3 text-verified-green" size={20} />
                <div>
                  <div className="text-sm text-verified-dark/70">Location</div>
                  <div className="text-verified-dark">{verificationResult.location}</div>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-white/80 rounded-lg">
                <div className="shrink-0 mr-3 bg-verified-green text-white p-1 rounded">
                  {verificationResult.captureType === 'photo' ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="currentColor"/>
                      <path d="M20 4H16.83L15.59 2.65C15.22 2.24 14.68 2 14.12 2H9.88C9.32 2 8.78 2.24 8.4 2.65L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 10.5V7C17 6.45 16.55 6 16 6H4C3.45 6 3 6.45 3 7V17C3 17.55 3.45 18 4 18H16C16.55 18 17 17.55 17 17V13.5L21 17.5V6.5L17 10.5Z" fill="currentColor"/>
                    </svg>
                  )}
                </div>
                <div>
                  <div className="text-sm text-verified-dark/70">Type</div>
                  <div className="text-verified-dark capitalize">{verificationResult.captureType}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Verify;
