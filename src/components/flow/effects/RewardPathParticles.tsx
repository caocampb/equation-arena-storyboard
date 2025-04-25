"use client";

import { useRef, useEffect } from "react";

// Particle interface
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  progress: number;
  opacity: number;
}

interface RewardPathParticlesProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  height: number;
  color?: string;
}

export function RewardPathParticles({
  startX,
  startY,
  endX,
  endY,
  width,
  height,
  color = "#FFD700"
}: RewardPathParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | undefined>(undefined);
  
  // Calculate path length for particle movement
  const pathLength = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  
  // Create particles on component mount
  useEffect(() => {
    // Initialize particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const count = Math.max(3, Math.floor(pathLength / 40)); // Particle density based on path length
      
      for (let i = 0; i < count; i++) {
        particles.push({
          id: i,
          x: 0,
          y: 0,
          size: 2 + Math.random() * 2,
          speed: 0.3 + Math.random() * 0.3,
          progress: Math.random(), // Start at random positions along the path
          opacity: 0.6 + Math.random() * 0.4
        });
      }
      
      particlesRef.current = particles;
    };
    
    createParticles();
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [pathLength]);
  
  // Animation loop for particles
  useEffect(() => {
    if (!canvasRef.current) return () => {};
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        // Update particle position along the path
        particle.progress += particle.speed / 100;
        if (particle.progress > 1) {
          particle.progress = 0;
        }
        
        // Calculate position on the line
        particle.x = startX + (endX - startX) * particle.progress;
        particle.y = startY + (endY - startY) * particle.progress;
        
        // Draw particle
        ctx.beginPath();
        
        // Create a gradient for each particle for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        );
        gradient.addColorStop(0, `${color}`);
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [startX, startY, endX, endY, color]);
  
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 w-full h-full"
    />
  );
} 