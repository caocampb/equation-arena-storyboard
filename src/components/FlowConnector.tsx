"use client";

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Connection {
  fromId: string;
  toId: string;
  label: string;
  type: 'horizontal' | 'vertical' | 'diagonal';
  fromAnchor?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  toAnchor?: 'left' | 'right' | 'top' | 'bottom' | 'center';
  labelOffset?: { x: number; y: number };
  isLearningMoment?: boolean;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
}

interface ConnectorManagerProps {
  connections: Connection[];
  className?: string;
}

export function ConnectorManager({ connections, className = '' }: ConnectorManagerProps) {
  const [paths, setPaths] = useState<Array<{
    path: string;
    label: string;
    labelX: number;
    labelY: number;
    labelRotation: number;
    arrowPoints: string;
    isLearningMoment: boolean;
  }>>([]);

  // Add state for pulse position
  const [pulsePositions, setPulsePositions] = useState<Array<{ x: number, y: number }>>([]);

  // Function to calculate the actual point coordinates based on element and anchor
  const getAnchorPoint = useCallback((element: HTMLElement, anchor: string): { x: number; y: number } => {
    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    switch (anchor) {
      case 'left':
        return { x: rect.left + scrollX, y: rect.top + rect.height / 2 + scrollY };
      case 'right':
        return { x: rect.right + scrollX, y: rect.top + rect.height / 2 + scrollY };
      case 'top':
        return { x: rect.left + rect.width / 2 + scrollX, y: rect.top + scrollY };
      case 'bottom':
        return { x: rect.left + rect.width / 2 + scrollX, y: rect.bottom + scrollY };
      case 'center':
        return { x: rect.left + rect.width / 2 + scrollX, y: rect.top + rect.height / 2 + scrollY };
      default:
        return { x: rect.left + rect.width / 2 + scrollX, y: rect.top + rect.height / 2 + scrollY };
    }
  }, []);

  // Function to calculate arrow points based on path type and direction
  const getArrowPoints = useCallback((fromPoint: { x: number; y: number }, toPoint: { x: number; y: number }): string => {
    const arrowSize = 6;
    let dx = toPoint.x - fromPoint.x;
    let dy = toPoint.y - fromPoint.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize
    dx = dx / length * arrowSize;
    dy = dy / length * arrowSize;
    
    // Perpendicular vector
    const pdx = -dy;
    const pdy = dx;
    
    // Arrow points
    const point1X = toPoint.x - 2 * dx + pdx;
    const point1Y = toPoint.y - 2 * dy + pdy;
    const point2X = toPoint.x - 2 * dx - pdx;
    const point2Y = toPoint.y - 2 * dy - pdy;
    
    return `${toPoint.x},${toPoint.y} ${point1X},${point1Y} ${point2X},${point2Y}`;
  }, []);

  const updatePaths = useCallback(() => {
    // Get the container to adjust coordinates relative to it
    const container = document.querySelector('.relative.max-w-6xl');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    const newPaths = connections.map(conn => {
      const fromEl = document.getElementById(conn.fromId);
      const toEl = document.getElementById(conn.toId);
      
      if (!fromEl || !toEl) return null;
      
      // Calculate anchor points based on layout
      const fromAnchor = conn.fromAnchor || (conn.type === 'horizontal' ? 'right' : 'bottom');
      const toAnchor = conn.toAnchor || (conn.type === 'horizontal' ? 'left' : 'top');
      
      const fromPoint = getAnchorPoint(fromEl, fromAnchor);
      const toPoint = getAnchorPoint(toEl, toAnchor);
      
      // Adjust points relative to container
      const adjustedFromX = fromPoint.x - containerRect.left - scrollX;
      const adjustedFromY = fromPoint.y - containerRect.top - scrollY;
      const adjustedToX = toPoint.x - containerRect.left - scrollX;
      const adjustedToY = toPoint.y - containerRect.top - scrollY;
      
      // Generate path based on connection type
      let path = '';
      let labelX = 0;
      let labelY = 0;
      let labelRotation = 0;
      
      if (conn.type === 'horizontal') {
        path = `M${adjustedFromX},${adjustedFromY} L${adjustedToX},${adjustedToY}`;
        labelX = (adjustedFromX + adjustedToX) / 2;
        
        // Position label based on labelPosition
        if (conn.labelPosition === 'bottom') {
          labelY = adjustedFromY + 20;
        } else if (conn.labelPosition === 'left') {
          labelX = adjustedFromX + 25;
          labelY = adjustedFromY;
        } else if (conn.labelPosition === 'right') {
          labelX = adjustedToX - 25;
          labelY = adjustedToY;
        } else { // default is 'top'
          labelY = adjustedFromY - 15;
        }
      } else if (conn.type === 'vertical') {
        // For vertical paths, use a smooth curve
        const controlPointY = (adjustedFromY + adjustedToY) / 2;
        
        // Create a curved vertical path with control points
        path = `M${adjustedFromX},${adjustedFromY} C${adjustedFromX},${controlPointY} ${adjustedToX},${controlPointY} ${adjustedToX},${adjustedToY}`;
        
        labelX = (adjustedFromX + adjustedToX) / 2;
        
        // Position label based on labelPosition
        if (conn.labelPosition === 'bottom') {
          labelY = adjustedToY - 20;
        } else if (conn.labelPosition === 'left') {
          labelX = adjustedFromX - 20;
          labelY = (adjustedFromY + adjustedToY) / 2;
        } else if (conn.labelPosition === 'right') {
          labelX = adjustedFromX + 20;
          labelY = (adjustedFromY + adjustedToY) / 2;
        } else { // default is 'top'
          labelY = (adjustedFromY + adjustedToY) / 2 - 20;
        }
      } else if (conn.type === 'diagonal') {
        // For diagonal paths, use a curved path for better aesthetics
        const midX = (adjustedFromX + adjustedToX) / 2;
        const midY = (adjustedFromY + adjustedToY) / 2;
        
        // Create a bezier curve path
        path = `M${adjustedFromX},${adjustedFromY} Q${midX},${adjustedFromY} ${midX},${midY} Q${midX},${adjustedToY} ${adjustedToX},${adjustedToY}`;
        
        labelX = midX;
        labelY = midY;
        
        // Position label based on labelPosition
        if (conn.labelPosition === 'bottom') {
          labelY = midY + 20;
        } else if (conn.labelPosition === 'left') {
          labelX = midX - 20;
        } else if (conn.labelPosition === 'right') {
          labelX = midX + 20;
        } else { // default is 'top'
          labelY = midY - 20;
        }
        
        labelRotation = Math.atan2(adjustedToY - adjustedFromY, adjustedToX - adjustedFromX) * 180 / Math.PI;
        
        // Adjust label rotation to be readable
        if (labelRotation > 90) labelRotation -= 180;
        if (labelRotation < -90) labelRotation += 180;
      }
      
      // Apply label offset if provided
      if (conn.labelOffset) {
        labelX += conn.labelOffset.x;
        labelY += conn.labelOffset.y;
      }
      
      // Get arrow points
      const arrowPoints = getArrowPoints(
        { x: adjustedFromX, y: adjustedFromY },
        { x: adjustedToX, y: adjustedToY }
      );
      
      return {
        path,
        label: conn.label,
        labelX,
        labelY,
        labelRotation,
        arrowPoints,
        isLearningMoment: conn.isLearningMoment || false
      };
    }).filter(Boolean) as Array<{
      path: string;
      label: string;
      labelX: number;
      labelY: number;
      labelRotation: number;
      arrowPoints: string;
      isLearningMoment: boolean;
    }>;
    
    setPaths(newPaths);
    
    // After setting paths, calculate pulse positions
    const newPulsePositions = newPaths.map(path => {
      // Extract basic starting point from path
      const pathStr = path.path;
      const match = pathStr.match(/M([\d.]+),([\d.]+)/);
      if (match) {
        return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
      }
      return { x: 0, y: 0 };
    });
    
    setPulsePositions(newPulsePositions);
  }, [connections, getAnchorPoint, getArrowPoints]);

  useEffect(() => {
    // Initial update delayed slightly to ensure DOM is ready
    const initialTimer = setTimeout(updatePaths, 100);
    
    // Update on resize and scroll
    window.addEventListener('resize', updatePaths);
    window.addEventListener('scroll', updatePaths);
    
    // Update again after animations have likely completed
    const finalTimer = setTimeout(updatePaths, 1000);
    
    return () => {
      window.removeEventListener('resize', updatePaths);
      window.removeEventListener('scroll', updatePaths);
      clearTimeout(initialTimer);
      clearTimeout(finalTimer);
    };
  }, [updatePaths]);

  return (
    <svg className={`absolute top-0 left-0 w-full h-full pointer-events-none z-50 ${className}`}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4f46e5" />
        </marker>
        
        {/* Add glow filter for learning moments */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {paths.map((item, i) => (
        <g key={i}>
          {/* Animated Connection line */}
          <motion.path
            d={item.path}
            stroke={item.isLearningMoment ? "#6366f1" : "#818cf8"}
            strokeWidth={item.isLearningMoment ? "2" : "1.5"}
            strokeDasharray={item.isLearningMoment ? "none" : "4 2"}
            filter={item.isLearningMoment ? "url(#glow)" : "none"}
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 1 
            }}
            transition={{ 
              pathLength: { delay: i * 0.3, duration: 1.5, ease: "easeInOut" },
              opacity: { delay: i * 0.3, duration: 0.4 }
            }}
          />
          
          {/* Animated Arrow */}
          <motion.polygon
            points={item.arrowPoints}
            fill={item.isLearningMoment ? "#6366f1" : "#818cf8"}
            filter={item.isLearningMoment ? "url(#glow)" : "none"}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.3 + 0.8,
              duration: 0.3
            }}
          />
          
          {/* Animated Label background */}
          <motion.rect
            x={item.labelX - 50}
            y={item.labelY - 10}
            width="100"
            height="22"
            rx="11"
            fill={item.isLearningMoment ? "#e0e7ff" : "#eef2ff"}
            stroke={item.isLearningMoment ? "#a5b4fc" : "#c7d2fe"}
            strokeWidth={item.isLearningMoment ? "1.5" : "1"}
            filter={item.isLearningMoment ? "url(#glow)" : "none"}
            transform={item.labelRotation ? `rotate(${item.labelRotation}, ${item.labelX}, ${item.labelY})` : undefined}
            style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.1))" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.3 + 1,
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ 
              scale: 1.05, 
              fill: item.isLearningMoment ? "#c7d2fe" : "#e0e7ff",
              transition: { duration: 0.2 } 
            }}
          />
          
          {/* Animated Label text */}
          <motion.text
            x={item.labelX}
            y={item.labelY + 5}
            textAnchor="middle"
            fill="#4f46e5"
            fontWeight={item.isLearningMoment ? "bold" : "normal"}
            fontSize="12"
            fontFamily="system-ui, sans-serif"
            style={{ textShadow: "0px 1px 1px rgba(255, 255, 255, 0.7)" }}
            transform={item.labelRotation ? `rotate(${item.labelRotation}, ${item.labelX}, ${item.labelY})` : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: i * 0.3 + 1.1,
              duration: 0.3
            }}
          >
            {item.label}
          </motion.text>
          
          {/* Pulse effect along the path - enhanced for learning moments */}
          {pulsePositions[i] && (
            <motion.circle
              r={item.isLearningMoment ? "4" : "3"}
              fill={item.isLearningMoment ? "#6366f1" : "#818cf8"}
              filter={item.isLearningMoment ? "url(#glow)" : "none"}
              initial={{ x: pulsePositions[i].x, y: pulsePositions[i].y, opacity: 0 }}
              animate={{
                opacity: [0, 0.8, 0],
                x: item.path.endsWith(pulsePositions[i].y.toString()) 
                  ? [pulsePositions[i].x, pulsePositions[i].x] 
                  : [pulsePositions[i].x, parseFloat(item.arrowPoints.split(',')[0])],
                y: item.path.endsWith(pulsePositions[i].y.toString())
                  ? [pulsePositions[i].y, parseFloat(item.arrowPoints.split(',')[1])]
                  : [pulsePositions[i].y, parseFloat(item.arrowPoints.split(',')[1])]
              }}
              transition={{
                duration: item.isLearningMoment ? 1.5 : 2,
                repeat: Infinity,
                repeatDelay: item.isLearningMoment ? 2 : 3,
                delay: i * 0.3 + 1.5,
                ease: "linear"
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
} 