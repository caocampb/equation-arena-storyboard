"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function VictoryOverlayClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(true);
  const [isCountingComplete, setIsCountingComplete] = useState(false);
  
  // Get XP values from URL params (default to hardcoded values if not provided)
  const baseXP = parseInt(searchParams.get("baseXP") || "100", 10);
  const distributiveXP = parseInt(searchParams.get("distributiveXP") || "50", 10);
  const commutativeXP = parseInt(searchParams.get("commutativeXP") || "25", 10);
  
  // Calculate total XP
  const totalXP = baseXP + distributiveXP + commutativeXP;
  
  // Mock current tier progress data
  const currentTier = 3;
  const targetXP = 225;
  const currentXP = 175;
  const newXP = currentXP + totalXP;
  const progressPercentage = Math.min(100, Math.round((newXP / targetXP) * 100));
  const tierCompleted = newXP >= targetXP;
  
  // Animation control for counting effect
  const [displayedXP, setDisplayedXP] = useState(0);
  
  // Animated counting effect
  useEffect(() => {
    const duration = 1500; // ms
    const interval = 30; // ms
    const steps = duration / interval;
    const increment = totalXP / steps;
    let current = 0;
    
    // Define the counter function first
    const updateCounter = () => {
      current += increment;
      if (current >= totalXP) {
        setDisplayedXP(totalXP);
        setIsCountingComplete(true);
        clearInterval(timer);
      } else {
        setDisplayedXP(Math.floor(current));
      }
    };
    
    // Then create the timer
    const timer = setInterval(updateCounter, interval);
    
    return () => clearInterval(timer);
  }, [totalXP]);
  
  // Handle continue button
  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push("/overworld");
    }, 300);
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-[#0A1930] to-[#15295A] rounded-lg border border-[#1D3055] w-full max-w-md p-6 shadow-xl relative overflow-hidden"
      >
        {/* Confetti effect when completed */}
        {tierCompleted && isCountingComplete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-[#00C2CB]"
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0 
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`, 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.02,
                  ease: "easeOut" 
                }}
              />
            ))}
          </motion.div>
        )}
      
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-display font-bold text-center text-white mb-6"
        >
          VICTORY!
        </motion.h1>
        
        {/* XP Earned breakdown */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#132242] rounded-lg p-4 mb-6 border border-[#1D3055] shadow-md"
        >
          <h2 className="text-white font-semibold mb-3">XP EARNED</h2>
          
          <div className="flex justify-between text-white mb-2">
            <span>◆ Base Victory:</span>
            <span>{baseXP} XP</span>
          </div>
          <div className="flex justify-between text-white mb-2">
            <span>◆ Distributive Property Bonus:</span>
            <span className="text-[#00C2CB]">+{distributiveXP} XP</span>
          </div>
          <div className="flex justify-between text-white mb-2">
            <span>◆ Commutative Property Bonus:</span>
            <span className="text-[#00C2CB]">+{commutativeXP} XP</span>
          </div>
          
          <div className="border-t border-gray-600 mt-3 pt-3">
            <motion.div 
              className="flex justify-between text-white font-bold text-lg"
              animate={{ 
                scale: isCountingComplete ? [1, 1.05, 1] : 1,
                color: isCountingComplete ? ["#FFFFFF", "#00C2CB", "#FFFFFF"] : "#FFFFFF"
              }}
              transition={{ 
                duration: 0.5, 
                delay: 1.6,
              }}
            >
              <span>TOTAL:</span>
              <span>{Math.floor(displayedXP)} XP</span>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Tier progress */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-[#132242] rounded-lg p-4 mb-8 border border-[#1D3055] shadow-md"
        >
          <h2 className="text-white font-semibold mb-2">TIER {currentTier} PROGRESS</h2>
          
          <div className="flex justify-between text-white text-sm mb-2">
            <span>{tierCompleted ? "COMPLETED!" : `${newXP}/${targetXP} XP`}</span>
            <span>{progressPercentage}%</span>
          </div>
          
          <div className="h-2.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: `${Math.round((currentXP / targetXP) * 100)}%` }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              className="h-full bg-[#00C2CB]"
            />
          </div>
          
          {tierCompleted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="text-center text-white bg-[#00C2CB]/20 p-3 rounded-lg border border-[#00C2CB]/30"
            >
              <span className="text-xl">🎉</span>
              <p className="font-semibold mt-1">TIER {currentTier} REWARDS UNLOCKED!</p>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3 }}
                className="text-sm text-[#00C2CB] mt-1"
              >
                Check it out in the Rewards tab
              </motion.p>
            </motion.div>
          ) : (
            <div className="text-center text-white">
              <p className="font-semibold">ONLY {targetXP - newXP} XP NEEDED FOR NEXT REWARD!</p>
              <p className="text-sm text-gray-300 mt-1">
                Free: Simple Particle Effect<br />
                Premium: Character Backpack
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Continue button */}
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={handleContinue}
          className="w-full py-3 rounded-lg bg-[#00C2CB] font-semibold text-[#0A1122] transition-all hover:bg-[#00E1EC] hover:shadow-md"
        >
          CONTINUE
        </motion.button>
      </motion.div>
    </div>
  );
} 