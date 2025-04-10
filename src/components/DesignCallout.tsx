"use client";

import { motion } from 'framer-motion';
import { Target, Zap, Heart, EyeIcon, BrainCircuit } from 'lucide-react';

interface DesignCalloutProps {
  focus: string;
  className?: string;
}

export function DesignCallout({ focus, className = '' }: DesignCalloutProps) {
  // Map focus areas to appropriate icons and colors
  const getIconAndColor = () => {
    switch(focus.toLowerCase()) {
      case 'clarity':
        return { icon: <EyeIcon className="h-3 w-3" />, color: 'bg-blue-500' };
      case 'engagement':
        return { icon: <Zap className="h-3 w-3" />, color: 'bg-amber-500' };
      case 'feedback':
        return { icon: <BrainCircuit className="h-3 w-3" />, color: 'bg-green-500' };
      case 'emotion':
        return { icon: <Heart className="h-3 w-3" />, color: 'bg-pink-500' };
      default:
        return { icon: <Target className="h-3 w-3" />, color: 'bg-purple-500' };
    }
  };
  
  const { icon, color } = getIconAndColor();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${color} ${className}`}
    >
      {icon}
      <span>OPTIMIZE FOR: {focus.toUpperCase()}</span>
    </motion.div>
  );
} 