
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { getMediaDetails, verifyMedia } from '@/utils/verification';
import { Search, Loader2, CheckCircle, AlertCircle, Calendar, Smartphone, MapPin, Sparkles, Shield, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Verify: React.FC = () => {
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Format the code as user types (XXX-XXX format)
  useEffect(() => {
    let formatted = code.replace(/-/g, ''); // Remove any existing hyphens
    formatted = formatted.slice(0, 6); // Limit to 6 characters
    
    if (formatted.length > 3) {
      formatted = formatted.slice(0, 3) + '-' + formatted.slice(3);
    }
    
    setFormattedCode(formatted.toUpperCase());
  }, [code]);
  
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z0-9-]/g, '');
    setCode(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formattedCode.trim() || formattedCode.length < 6) {
      setError('Please enter a complete verification code');
      return;
    }
    
    setIsVerifying(true);
    setError(null);
    
    try {
      const isValid = await verifyMedia(formattedCode);
      
      if (isValid) {
        const details = await getMediaDetails(formattedCode);
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
        <motion.div 
          className="glass-morphism px-6 py-3 rounded-2xl mb-6 mx-auto inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-verified-green flex items-center gap-2">
            <Shield size={18} className="text-verified-green" />
            <span className="font-semibold tracking-wide">Verification Portal</span>
            <Shield size={18} className="text-verified-green" />
          </div>
        </motion.div>
        
        <h1 className="text-4xl font-bold text-verified-dark mb-2 text-center nineties-text-shadow">
          Verify Media
        </h1>
        <p className="text-verified-dark/70 mb-8 text-center max-w-xs mx-auto">
          Enter the unique verification code to authenticate your media
        </p>
        
        <Card className="neo-glow border-verified-green/20 backdrop-blur-lg mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative mx-auto max-w-xs">
                <motion.div 
                  className="bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 p-0.5 rounded-2xl"
                  animate={{ 
                    boxShadow: ["0 0 0px rgba(255, 255, 255, 0.3)", "0 0 20px rgba(255, 255, 255, 0.5)", "0 0 0px rgba(255, 255, 255, 0.3)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="bg-white/90 rounded-2xl p-8 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-verified-green px-3 py-1 rounded-full text-white text-xs font-bold z-10">
                      Unique Code
                    </div>
                    
                    <div className="text-center mb-3">
                      <Lock size={24} className="inline-block text-verified-green mb-2" />
                    </div>
                    
                    <input
                      type="text"
                      value={formattedCode}
                      onChange={handleCodeChange}
                      placeholder="ABC-123"
                      maxLength={7}
                      className="w-full px-4 py-4 text-center tracking-widest text-2xl uppercase font-mono bg-gradient-to-r from-gray-100 to-white rounded-xl border-2 border-verified-green/30 focus:border-verified-green focus:ring-2 focus:ring-verified-green/20 text-verified-dark placeholder-verified-dark/40 shadow-inner"
                    />
                    
                    <div className="mt-2 text-center text-xs text-verified-dark/50">
                      Format: XXX-XXX (Letters & Numbers)
                    </div>
                  </div>
                </motion.div>
              </div>
              
              <button 
                type="submit" 
                className="gradient-button w-full flex items-center justify-center gap-2 text-white rounded-xl py-4 px-6 font-bold shadow-md"
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
                <motion.div 
                  className="p-3 bg-red-100/80 backdrop-blur-sm text-red-700 rounded-lg flex items-center border border-red-200"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="shrink-0 mr-2" size={20} />
                  <span>{error}</span>
                </motion.div>
              )}
            </form>
          </CardContent>
        </Card>
        
        {verificationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="holographic-card border-verified-green/20 overflow-hidden">
              <div className="bg-gradient-to-br from-verified-green/20 via-verified-yellow/20 to-verified-green/20 p-6">
                <div className="flex flex-col items-center justify-center">
                  <motion.div 
                    className="p-5 bg-white rounded-full shadow-xl mb-3 relative"
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.2)"]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <CheckCircle className="h-12 w-12 text-verified-green" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-verified-yellow via-verified-green to-verified-yellow opacity-30 blur-sm rounded-full animate-pulse"></div>
                  </motion.div>
                  
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles size={18} className="text-verified-green" />
                    <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-verified-green to-blue-500">
                      Verified!
                    </h2>
                    <Sparkles size={18} className="text-verified-green" />
                  </div>
                  
                  <div className="text-sm text-verified-dark/80 max-w-xs text-center mb-2 font-medium">
                    This media has been authenticated via our secure blockchain verification system
                  </div>
                  
                  <div className="text-xs text-verified-green font-mono border border-verified-green/30 bg-verified-green/10 rounded-full px-3 py-1">
                    {formattedCode}
                  </div>
                </div>
              </div>
              
              <CardContent className="bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-md pt-4">
                <div className="grid gap-3 mt-2">
                  <VerificationDetailCard
                    icon={<Calendar className="shrink-0 text-verified-green" size={20} />}
                    label="Timestamp"
                    value={new Date(verificationResult.timestamp).toLocaleString()}
                    delay={0.1}
                  />
                  
                  <VerificationDetailCard
                    icon={<Smartphone className="shrink-0 text-verified-green" size={20} />}
                    label="Device"
                    value={verificationResult.device}
                    delay={0.2}
                  />
                  
                  <VerificationDetailCard
                    icon={<MapPin className="shrink-0 text-verified-green" size={20} />}
                    label="Location"
                    value={verificationResult.location}
                    delay={0.3}
                  />
                  
                  <VerificationDetailCard
                    icon={
                      <div className="shrink-0 gradient-green text-white p-1.5 rounded-md">
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
                    }
                    label="Type"
                    value={verificationResult.captureType}
                    delay={0.4}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

interface VerificationDetailCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  delay: number;
}

const VerificationDetailCard: React.FC<VerificationDetailCardProps> = ({ icon, label, value, delay }) => {
  return (
    <motion.div 
      className="flex items-center p-4 bg-white/90 rounded-xl border border-verified-green/10 hover:border-verified-green/30 transition-colors shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="mr-3">{icon}</div>
      <div>
        <div className="text-xs text-verified-dark/70 uppercase tracking-wider font-medium">{label}</div>
        <div className="text-verified-dark font-medium capitalize">{value}</div>
      </div>
    </motion.div>
  );
};

export default Verify;
