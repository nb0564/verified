
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { getMediaDetails, verifyMedia } from '@/utils/verification';
import { Search, Loader2, CheckCircle, AlertCircle, Calendar, Smartphone, MapPin, Sparkles, Shield, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <div className="p-6 max-w-md mx-auto pb-24">
        <div className="flex justify-center mb-6">
          <div className="glass-morphism px-5 py-2 rounded-full">
            <div className="text-verified-green flex items-center gap-2">
              <Shield size={18} className="text-verified-green" />
              <span className="font-semibold tracking-wide">Verification Portal</span>
              <Shield size={18} className="text-verified-green" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-verified-dark mb-2 text-center">
          Verify Media
        </h1>
        <p className="text-verified-dark/70 mb-8 text-center">
          Enter the unique verification code to authenticate your media
        </p>
        
        <Card className="neo-blur border-verified-green/20 backdrop-blur-lg mb-6">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mx-auto max-w-xs">
                <div className="bg-white/90 rounded-xl p-6 shadow-md border border-verified-green/10">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-verified-green px-3 py-1 rounded-full text-white text-xs font-bold">
                    Unique Code
                  </div>
                  
                  <div className="text-center mb-2">
                    <Lock size={20} className="inline-block text-verified-green mb-2" />
                  </div>
                  
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="V3R-1FY"
                    className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-verified-green/30 focus:border-verified-green focus:ring-2 focus:ring-verified-green/20 text-verified-dark placeholder-verified-dark/40 text-center tracking-widest text-xl uppercase font-mono"
                    maxLength={7}
                  />
                  
                  <div className="mt-2 text-center text-xs text-verified-dark/50">
                    Format: XXX-XXX
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                className="gradient-green w-full flex items-center justify-center gap-2 text-white rounded-lg py-3 px-6 font-bold shadow-md"
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
                <div className="p-3 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-lg flex items-center border border-red-200">
                  <AlertCircle className="shrink-0 mr-2" size={20} />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
        
        {verificationResult && (
          <Card className="glass-morphism border-verified-green/20 overflow-hidden">
            <div className="bg-verified-green/10 p-4">
              <div className="flex flex-col items-center justify-center">
                <div className="p-4 bg-white rounded-full shadow-inner mb-2">
                  <CheckCircle className="h-12 w-12 text-verified-green" />
                </div>
                
                <div className="flex items-center gap-1 mb-1">
                  <Sparkles size={16} className="text-verified-green opacity-70" />
                  <h2 className="text-xl font-bold text-center text-verified-dark">
                    Media is Verified!
                  </h2>
                  <Sparkles size={16} className="text-verified-green opacity-70" />
                </div>
                
                <div className="text-xs text-verified-dark/60 max-w-xs text-center">
                  This media has been authenticated via our secure blockchain verification system
                </div>
              </div>
            </div>
            
            <CardContent className="bg-white/90 backdrop-blur-md pt-4">
              <div className="grid gap-3 mt-2">
                <div className="flex items-center p-3 bg-white/90 rounded-lg border border-verified-green/10">
                  <Calendar className="shrink-0 mr-3 text-verified-green" size={20} />
                  <div>
                    <div className="text-xs text-verified-dark/70 uppercase tracking-wider font-medium">Timestamp</div>
                    <div className="text-verified-dark font-medium">
                      {new Date(verificationResult.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white/90 rounded-lg border border-verified-green/10">
                  <Smartphone className="shrink-0 mr-3 text-verified-green" size={20} />
                  <div>
                    <div className="text-xs text-verified-dark/70 uppercase tracking-wider font-medium">Device</div>
                    <div className="text-verified-dark font-medium">{verificationResult.device}</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white/90 rounded-lg border border-verified-green/10">
                  <MapPin className="shrink-0 mr-3 text-verified-green" size={20} />
                  <div>
                    <div className="text-xs text-verified-dark/70 uppercase tracking-wider font-medium">Location</div>
                    <div className="text-verified-dark font-medium">{verificationResult.location}</div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-white/90 rounded-lg border border-verified-green/10">
                  <div className="shrink-0 mr-3 gradient-green text-white p-1.5 rounded-md">
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
                    <div className="text-xs text-verified-dark/70 uppercase tracking-wider font-medium">Type</div>
                    <div className="text-verified-dark font-medium capitalize">{verificationResult.captureType}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Verify;
