import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getMediaDetails, verifyMedia } from '@/utils/verification';
import { Search, Loader2, CheckCircle, AlertCircle, Calendar, Smartphone, MapPin, Sparkles, Shield, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import VerificationCode from '@/components/VerificationCode';
import VerificationLogo from '@/components/VerificationLogo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Verify: React.FC = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in a real app, this would call an API
    setIsLoggedIn(true);
    setIsLoginDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBackToCodeInput = () => {
    setVerificationResult(null);
    setCode('');
    setFormattedCode('');
  };

  return (
    <Layout useSolidBackground={true}>
      <div className="min-h-screen w-full flex flex-col p-6 relative">
        {/* Top Bar with Login */}
        <div className="absolute top-6 right-6 z-10">
          {isLoggedIn ? (
            <Button variant="ghost" className="text-verified-light flex items-center gap-2 bg-verified-purple/20 hover:bg-verified-purple/30">
              <User size={16} />
              <span>Profile</span>
            </Button>
          ) : (
            <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-verified-light flex items-center gap-2 bg-verified-purple/20 hover:bg-verified-purple/30">
                  <User size={16} />
                  <span>Login</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-verified-dark border border-verified-purple/20 text-verified-light">
                <DialogHeader>
                  <DialogTitle className="text-verified-light text-center font-bold text-xl">Login to VERIFIED</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-verified-light/80">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={loginForm.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="bg-black/50 border-verified-purple/30 text-verified-light"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-verified-light/80">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={loginForm.password}
                      onChange={handleInputChange}
                      className="bg-black/50 border-verified-purple/30 text-verified-light"
                      required
                    />
                  </div>
                  <DialogFooter className="mt-6">
                    <Button type="submit" className="w-full gradient-purple">
                      Login
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="flex-grow flex items-center justify-center">
          <AnimatePresence mode="wait">
            {verificationResult ? (
              <motion.div 
                key="result"
                className="w-full max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="holographic-card border-verified-pink/20 overflow-hidden shadow-xl">
                  <div className="bg-gradient-to-br from-verified-pink/20 via-verified-purple/20 to-verified-blue/20 p-8">
                    <div className="flex flex-col items-center justify-center">
                      <motion.div 
                        className="p-5 bg-black/50 backdrop-blur-md rounded-full shadow-xl mb-5 relative border border-verified-pink/30"
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(255,255,255,0.2)", "0 0 30px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.2)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <CheckCircle className="h-14 w-14 text-verified-light" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-verified-pink via-verified-purple to-verified-blue opacity-30 blur-sm rounded-full animate-pulse"></div>
                      </motion.div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={20} className="text-verified-pink" />
                        <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-verified-pink to-verified-blue">
                          Verified!
                        </h2>
                        <Sparkles size={20} className="text-verified-blue" />
                      </div>
                      
                      <div className="text-base text-verified-light max-w-xs text-center mb-8 font-semibold" style={{ textShadow: '0 0 8px rgba(255,255,255,0.8)' }}>
                        This media has been authenticated via our secure verification system
                      </div>
                      
                      <VerificationCode code={formattedCode} className="mb-8" />
                    
                      <div className="grid gap-4 w-full mt-4">
                        <VerificationDetailCard
                          icon={<Calendar className="shrink-0 text-verified-pink" size={20} />}
                          label="Timestamp"
                          value={new Date(verificationResult.timestamp).toLocaleString()}
                          delay={0.1}
                        />
                        
                        <VerificationDetailCard
                          icon={<Smartphone className="shrink-0 text-verified-purple" size={20} />}
                          label="Device"
                          value={verificationResult.device}
                          delay={0.2}
                        />
                        
                        <VerificationDetailCard
                          icon={<MapPin className="shrink-0 text-verified-blue" size={20} />}
                          label="Location"
                          value={verificationResult.location}
                          delay={0.3}
                        />
                        
                        <VerificationDetailCard
                          icon={
                            <div className="shrink-0 gradient-purple text-white p-1.5 rounded-md">
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

                      <Button 
                        onClick={handleBackToCodeInput} 
                        className="mt-8 gradient-purple text-verified-light px-6 py-5"
                      >
                        Verify Another Code
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                key="codeInput"
                className="max-w-md w-full mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-8 flex flex-col items-center">
                  <VerificationLogo size="lg" />
                  <p className="text-verified-light/70 text-lg mt-3">
                    Authenticate your media with your unique code
                  </p>
                </div>
                
                <Card className="neo-glow border-verified-green/20 backdrop-blur-lg overflow-hidden">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <motion.div 
                        className="bg-gradient-to-br from-verified-pink via-verified-purple to-verified-blue p-0.5"
                        animate={{ 
                          boxShadow: ["0 0 0px rgba(255, 255, 255, 0.3)", "0 0 20px rgba(255, 255, 255, 0.5)", "0 0 0px rgba(255, 255, 255, 0.3)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className="bg-verified-dark/90 p-8 relative">
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-verified-pink px-3 py-1 rounded-full text-white text-xs font-bold z-10 shadow-lg mt-3">
                            ENTER CODE
                          </div>
                          
                          <div className="text-center mb-3 mt-4">
                            <Shield size={24} className="inline-block text-verified-light/90 mb-2" />
                          </div>
                          
                          <input
                            type="text"
                            value={formattedCode}
                            onChange={handleCodeChange}
                            placeholder="ABC-123"
                            maxLength={7}
                            className="w-full px-4 py-4 text-center tracking-widest text-2xl uppercase font-mono bg-black/50 rounded-xl border-2 border-verified-purple/30 focus:border-verified-purple focus:ring-2 focus:ring-verified-purple/20 text-verified-light placeholder-verified-light/40 shadow-inner"
                          />
                          
                          <div className="mt-2 text-center text-xs text-verified-light/50">
                            Format: XXX-XXX (Letters & Numbers)
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="px-6 pb-6">
                        <button 
                          type="submit" 
                          className="w-full flex items-center justify-center gap-2 text-white rounded-xl py-4 px-6 font-bold gradient-purple shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70"
                          disabled={isVerifying}
                        >
                          {isVerifying ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : (
                            <Search className="h-5 w-5" />
                          )}
                          <span>{isVerifying ? 'Verifying...' : 'Verify'}</span>
                        </button>
                        
                        {error && (
                          <motion.div 
                            className="p-3 mt-4 bg-red-100/20 backdrop-blur-sm text-red-500 rounded-lg flex items-center border border-red-500/30"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            <AlertCircle className="shrink-0 mr-2" size={20} />
                            <span>{error}</span>
                          </motion.div>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
      className="flex items-center p-4 bg-black/40 rounded-xl border border-verified-purple/10 hover:border-verified-purple/30 transition-colors shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className="mr-3">{icon}</div>
      <div>
        <div className="text-xs text-verified-light/70 uppercase tracking-wider font-medium">{label}</div>
        <div className="text-verified-light font-medium capitalize">{value}</div>
      </div>
    </motion.div>
  );
};

export default Verify;