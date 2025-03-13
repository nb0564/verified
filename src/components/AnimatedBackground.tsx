
import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const gridSize = 40;
    const dotSize = 2;
    let time = 0;
    
    // Create a pixelated texture
    const createPixelTexture = () => {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = 4;
      tempCanvas.height = 4;
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return null;
      
      tempCtx.fillStyle = '#00A550';
      tempCtx.fillRect(0, 0, 2, 2);
      tempCtx.fillRect(2, 2, 2, 2);
      tempCtx.fillStyle = '#FFCF00';
      tempCtx.fillRect(2, 0, 2, 2);
      tempCtx.fillRect(0, 2, 2, 2);
      
      return tempCanvas;
    };
    
    const pixelTexture = createPixelTexture();
    
    const draw = () => {
      time += 0.01;
      ctx.fillStyle = '#1E2D2F';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.strokeStyle = '#00A550';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.2;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Draw pixelated dots with pulsating effect
      ctx.globalAlpha = 0.5 + Math.sin(time) * 0.2;
      for (let x = gridSize/2; x < canvas.width; x += gridSize) {
        for (let y = gridSize/2; y < canvas.height; y += gridSize) {
          const wobbleX = Math.sin(time + x * 0.01) * 5;
          const wobbleY = Math.cos(time + y * 0.01) * 5;
          
          ctx.fillStyle = Math.random() > 0.95 ? '#FFCF00' : '#00A550';
          ctx.fillRect(
            x + wobbleX - dotSize/2, 
            y + wobbleY - dotSize/2, 
            dotSize, 
            dotSize
          );
        }
      }
      
      // Draw random 90s geometric shapes that move slowly
      ctx.globalAlpha = 0.2;
      const numShapes = 10;
      for (let i = 0; i < numShapes; i++) {
        const size = 50 + Math.sin(time + i) * 20;
        const x = (Math.sin(time * 0.2 + i * 1.5) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.3 + i * 1.5) * 0.5 + 0.5) * canvas.height;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 0.1 + i);
        
        if (i % 3 === 0) {
          // Rectangle
          ctx.fillStyle = '#00A550';
          ctx.fillRect(-size/2, -size/2, size, size);
        } else if (i % 3 === 1) {
          // Triangle
          ctx.fillStyle = '#FFCF00';
          ctx.beginPath();
          ctx.moveTo(0, -size/2);
          ctx.lineTo(size/2, size/2);
          ctx.lineTo(-size/2, size/2);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle
          ctx.fillStyle = '#0EA5E9';
          ctx.beginPath();
          ctx.arc(0, 0, size/2, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
      
      // Pixelated texture overlay
      if (pixelTexture) {
        ctx.globalAlpha = 0.05;
        const pattern = ctx.createPattern(pixelTexture, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
      
      requestAnimationFrame(draw);
    };
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    draw();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      ></canvas>
    </div>
  );
};

export default AnimatedBackground;
