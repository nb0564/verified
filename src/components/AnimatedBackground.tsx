import React, { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  opacity?: number;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ opacity = 1 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const setDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setDimensions();
    
    // Initialize variables
    const gridSize = 40;
    let time = 0;
    
    // Create a gradient texture
    const createGradientTexture = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 400;
      tempCanvas.height = 400;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return null;
      
      // Create a radial gradient
      const gradient = tempCtx.createRadialGradient(
        200, 200, 0,
        200, 200, 280
      );
      
      gradient.addColorStop(0, 'rgba(255, 51, 102, 0.15)');
      gradient.addColorStop(0.4, 'rgba(153, 0, 255, 0.1)');
      gradient.addColorStop(0.7, 'rgba(0, 204, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(0, 0, 400, 400);
      
      return tempCanvas;
    };
    
    const gradientTexture = createGradientTexture();
    
    // Create grid pattern
    const createGridPattern = () => {
      const patternCanvas = document.createElement('canvas');
      patternCanvas.width = gridSize;
      patternCanvas.height = gridSize;
      const patternCtx = patternCanvas.getContext('2d');
      if (!patternCtx) return null;
      
      patternCtx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      patternCtx.lineWidth = 1;
      
      // Draw horizontal line
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(gridSize, 0);
      patternCtx.stroke();
      
      // Draw vertical line
      patternCtx.beginPath();
      patternCtx.moveTo(0, 0);
      patternCtx.lineTo(0, gridSize);
      patternCtx.stroke();
      
      return patternCanvas;
    };
    
    const gridPattern = createGridPattern();
    
    // Animation frame function
    const draw = () => {
      time += 0.01;
      
      // Create a dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#121212');
      gradient.addColorStop(0.5, '#141418');
      gradient.addColorStop(1, '#121215');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      if (gridPattern) {
        const pattern = ctx.createPattern(gridPattern, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      // Draw floating gradient orbs
      for (let i = 0; i < 6; i++) {
        const size = 180 + Math.sin(time * 0.3 + i * 0.5) * 40;
        const x = (Math.sin(time * 0.2 + i * 0.8) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.15 + i * 1.3) * 0.5 + 0.5) * canvas.height;
        
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.translate(x, y);
        
        // Gradient for each orb
        const orbGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
        
        if (i % 3 === 0) {
          // Pink
          orbGradient.addColorStop(0, 'rgba(255, 51, 102, 0.8)');
          orbGradient.addColorStop(0.5, 'rgba(255, 51, 102, 0.3)');
          orbGradient.addColorStop(1, 'rgba(255, 51, 102, 0)');
        } else if (i % 3 === 1) {
          // Purple
          orbGradient.addColorStop(0, 'rgba(153, 0, 255, 0.8)');
          orbGradient.addColorStop(0.5, 'rgba(153, 0, 255, 0.3)');
          orbGradient.addColorStop(1, 'rgba(153, 0, 255, 0)');
        } else {
          // Blue
          orbGradient.addColorStop(0, 'rgba(0, 204, 255, 0.8)');
          orbGradient.addColorStop(0.5, 'rgba(0, 204, 255, 0.3)');
          orbGradient.addColorStop(1, 'rgba(0, 204, 255, 0)');
        }
        
        ctx.fillStyle = orbGradient;
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
      
      // Draw subtle particles
      ctx.globalAlpha = 0.5;
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.99) {
            const wobbleX = Math.sin(time + x * 0.01) * 20;
            const wobbleY = Math.cos(time + y * 0.01) * 20;
            
            // Random color between brand colors
            const randomColor = Math.random();
            let color;
            if (randomColor < 0.33) {
              color = 'rgba(255, 51, 102, 0.8)'; // Pink
            } else if (randomColor < 0.66) {
              color = 'rgba(153, 0, 255, 0.8)'; // Purple
            } else {
              color = 'rgba(0, 204, 255, 0.8)'; // Blue
            }
            
            // Draw a soft glow
            const glow = ctx.createRadialGradient(
              x + wobbleX, y + wobbleY, 0,
              x + wobbleX, y + wobbleY, 15
            );
            glow.addColorStop(0, color);
            glow.addColorStop(1, 'transparent');
            
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(x + wobbleX, y + wobbleY, 15, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw the particle
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.9;
            ctx.beginPath();
            ctx.arc(x + wobbleX, y + wobbleY, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      // Draw horizontal lines that move
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      
      const lineSpacing = 100;
      const lineOffset = (time * 20) % lineSpacing;
      
      for (let y = lineOffset; y < canvas.height; y += lineSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Apply gradient texture overlay
      if (gradientTexture) {
        ctx.globalAlpha = 0.4;
        ctx.globalCompositeOperation = 'screen';
        
        // Create a pattern from the gradient texture
        const pattern = ctx.createPattern(gradientTexture, 'repeat');
        if (pattern) {
          // Apply transformation to the pattern to make it move
          const matrix = new DOMMatrix();
          matrix.translateSelf(
            Math.sin(time * 0.2) * 100, 
            Math.cos(time * 0.2) * 100
          );
          pattern.setTransform(matrix);
          
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        ctx.globalCompositeOperation = 'source-over';
      }
      
      // Vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 1.5
      );
      
      vignette.addColorStop(0, 'rgba(0,0,0,0)');
      vignette.addColorStop(1, 'rgba(0,0,0,0.8)');
      
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(draw);
    };
    
    // Handle resize
    window.addEventListener('resize', setDimensions);
    
    // Start animation
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setDimensions);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ 
          imageRendering: 'pixelated',
          filter: 'contrast(1.05) brightness(1.05)',
          opacity: opacity
        }}
      ></canvas>
    </div>
  );
};

export default AnimatedBackground;