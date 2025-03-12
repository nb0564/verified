
/**
 * Generates a random verification code
 * Format: XXX-XXX (e.g., ABC-123)
 */
export const generateVerificationCode = (): string => {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed similar looking characters
  let result = '';
  
  // Generate first part (3 characters)
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  result += '-';
  
  // Generate second part (3 characters)
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  return result;
};

/**
 * Simulates verification of media
 * In a real app, this would call a backend API
 */
export const verifyMedia = async (code: string): Promise<boolean> => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // For demo purposes, consider all codes valid
      resolve(true);
    }, 1500);
  });
};

/**
 * Gets mock media details for a verification code
 */
export const getMediaDetails = async (code: string) => {
  // Simulate API call with delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        timestamp: new Date().toISOString(),
        device: 'iPhone 13',
        location: 'Oakland, CA',
        verified: true,
        captureType: Math.random() > 0.5 ? 'photo' : 'video',
      });
    }, 1000);
  });
};
