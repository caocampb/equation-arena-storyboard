"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Custom hourglass icon for more rustic feel
function HourglassIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 22h14" />
      <path d="M5 2h14" />
      <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
      <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
    </svg>
  );
}

interface TimerBadgeProps {
  expiresAt: string;
  label?: string;
}

export function TimerBadge({ expiresAt, label }: TimerBadgeProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpiringSoon, setIsExpiringSoon] = useState<boolean>(false);
  
  useEffect(() => {
    // Function to calculate time left
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiration = new Date(expiresAt);
      const difference = expiration.getTime() - now.getTime();
      
      // If already expired
      if (difference <= 0) {
        return "Expired";
      }
      
      // Check if less than 1 hour remaining
      setIsExpiringSoon(difference < 1000 * 60 * 60);
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Format the time left - always include hours, minutes and seconds
      return `${hours}h ${minutes}m ${seconds}s`;
    };
    
    // Set initial time left
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [expiresAt]);
  
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#4a3016] to-[#3d2813] text-white text-xs font-bold py-2 px-3.5 rounded-md border shadow-md flex items-center gap-2",
        isExpiringSoon 
          ? "border-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.2),inset_0_0_6px_rgba(239,68,68,0.1)]" 
          : "border-[#ffd700]/40 shadow-[0_0_8px_rgba(255,215,0,0.15),inset_0_0_6px_rgba(255,215,0,0.05)]"
      )}
      whileHover={{ 
        y: -1,
        boxShadow: isExpiringSoon 
          ? "0 0 12px rgba(239,68,68,0.3)" 
          : "0 0 12px rgba(255,215,0,0.25)"
      }}
      animate={isExpiringSoon ? {
        scale: [1, 1.02, 1],
        transition: { 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut" 
        }
      } : {}}
    >
      {/* Background pulse for urgency when time is running out */}
      {isExpiringSoon && (
        <motion.div 
          className="absolute inset-0 bg-red-500/5"
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        />
      )}
      
      <motion.div 
        animate={{ 
          rotateY: [0, 180, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: isExpiringSoon ? 2 : 5,
          ease: "easeInOut" 
        }}
      >
        <HourglassIcon 
          className={cn(
            "h-4 w-4 drop-shadow-[0_0_3px_rgba(255,215,0,0.6)]",
            isExpiringSoon ? "text-red-400" : "text-amber-300"
          )} 
        />
      </motion.div>
      
      {label && (
        <>
          <span className={cn(
            "uppercase tracking-wider text-xs font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]",
            isExpiringSoon ? "text-red-300" : "text-amber-300"
          )}>
            {label}
          </span>
          <span className="text-amber-600/60 px-0.5">•</span>
        </>
      )}
      
      <motion.span 
        className={cn(
          "font-medium text-sm tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]",
          isExpiringSoon ? "text-red-50" : "text-white"
        )}
        animate={isExpiringSoon ? { 
          color: ["#ffffff", "#fecaca", "#ffffff"],
        } : {}}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          ease: "easeInOut" 
        }}
      >
        {timeLeft}
      </motion.span>
    </motion.div>
  );
} 