"use client";

import { ReactNode } from 'react';
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningObjectiveProps {
  icon: LucideIcon;
  text: string;
  className?: string;
}

export function LearningObjective({ 
  icon: Icon,
  text,
  className = '' 
}: LearningObjectiveProps) {
  // Extract the key concept text - remove "Learning: " prefix
  const displayText = text.startsWith("Learning: ") 
    ? text.split("Learning: ")[1] 
    : text;
    
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: 0.2
      }}
      whileHover={{ scale: 1.03 }}
      title={text} // Full text shown on hover
    >
      <Badge 
        variant="outline" 
        className={`bg-blue-100 border-blue-200 text-blue-800 px-2.5 py-1 rounded-md text-xs flex items-center cursor-default ${className}`}
      >
        <motion.div
          animate={{ 
            rotateZ: [0, 10, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: 1, 
            repeatDelay: 7,
            ease: "easeInOut" 
          }}
          className="flex-shrink-0"
        >
          <Icon className="h-3 w-3 mr-1.5" />
        </motion.div>
        <span className="font-medium">{displayText}</span>
      </Badge>
    </motion.div>
  );
} 