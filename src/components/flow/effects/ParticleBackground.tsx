"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";

// Generate random points in a 3D space
function generatePoints(count: number) {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    // Position points in a sphere
    const radius = 5 + Math.random() * 10;
    const phi = Math.random() * Math.PI * 2;
    const theta = Math.random() * Math.PI;
    
    points[i] = radius * Math.sin(theta) * Math.cos(phi);
    points[i + 1] = radius * Math.sin(theta) * Math.sin(phi);
    points[i + 2] = radius * Math.cos(theta);
    
    // Add some color variation
    colors[i] = 0.5 + Math.random() * 0.5; // R (blue-ish)
    colors[i + 1] = 0.7 + Math.random() * 0.3; // G (cyan-ish)
    colors[i + 2] = 0.9 + Math.random() * 0.1; // B (stronger blue)
  }
  
  return { positions: points, colors };
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  
  // Generate particles
  const count = 800;
  const { positions, colors } = generatePoints(count);
  
  // Animate particles
  useFrame((state) => {
    if (!pointsRef.current) return;

    // Rotate the entire field slowly
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.025) * 0.1;
    
    // Access the geometry to update particle positions for a flowing effect
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length; i += 3) {
      // Add subtle movement to each particle
      positions[i + 1] += Math.sin(state.clock.getElapsedTime() * 0.2 + positions[i] * 0.01) * 0.01;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={pointsRef} limit={count}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
    </Points>
  );
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40" ref={containerRef}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
} 