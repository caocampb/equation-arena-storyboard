"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrophyIcon } from "lucide-react";

interface XPBreakdown {
  type: string;
  amount: number;
}

interface VictoryXPOverlayProps {
  show: boolean;
  onClose: () => void;
  currentTier: number;
  currentXP: number;
  targetXP: number;
  xpBreakdown: XPBreakdown[];
  freeReward?: string;
  premiumReward?: string;
}

export default function VictoryXPOverlay({
  show,
  onClose,
  currentTier,
  currentXP,
  targetXP,
  xpBreakdown,
  freeReward = "Simple Particle Effect",
  premiumReward = "Character Backpack"
}: VictoryXPOverlayProps) {
  const [isClient, setIsClient] = useState(false);

  // Set client-side state safely
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Calculate totals
  const totalXP = xpBreakdown.reduce((sum, item) => sum + item.amount, 0);
  const progressPercentage = Math.min(100, Math.round((currentXP / targetXP) * 100));
  const xpNeeded = Math.max(0, targetXP - currentXP);
  
  return (
    <AnimatePresence>
      {show && isClient && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => onClose()}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-gradient-to-b from-[#0A1930] to-[#15295A] rounded-lg border border-[#1D3055] max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-display font-bold text-white mb-1">VICTORY!</h2>
            </div>
            
            {/* XP Earned Box */}
            <div className="bg-[#132242] rounded-lg p-4 mb-6 border border-[#1D3055]">
              <h3 className="text-white font-semibold text-center mb-4">XP EARNED</h3>
              
              <div className="space-y-2 mb-4">
                {xpBreakdown.map((item, index) => (
                  <div key={index} className="flex justify-between text-gray-300">
                    <span>◆ {item.type}:</span>
                    <span className={item.type === "Base Victory" ? "text-white" : "text-[#00C2CB]"}>
                      {item.type !== "Base Victory" && "+"}{item.amount} XP
                    </span>
                  </div>
                ))}
                
                <div className="border-t border-gray-700 my-2"></div>
                
                <div className="flex justify-between font-semibold text-white">
                  <span>TOTAL:</span>
                  <span>{totalXP} XP</span>
                </div>
              </div>
            </div>
            
            {/* Tier Progress */}
            <div className="bg-[#132242] border-2 border-[#00C2CB] rounded-lg p-4 mb-6 shadow-[0_0_15px_rgba(0,194,203,0.3)]">
              <h3 className="text-white font-semibold mb-2">
                TIER {currentTier} PROGRESS: {currentXP}/{targetXP} XP
              </h3>
              
              <div className="h-2.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#00C2CB]"
                />
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <TrophyIcon className="h-6 w-6 text-[#FFD700]" />
                <p className="text-white font-semibold">
                  ONLY {xpNeeded} XP NEEDED FOR NEXT REWARD!
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <p>Free: {freeReward}</p>
                </div>
                <div>
                  <p>Premium: {premiumReward}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                onClick={onClose}
                className="bg-[#00C2CB] text-[#0A1122] font-bold py-2 px-6 rounded-lg hover:bg-[#00D6E0] transition-colors"
              >
                CONTINUE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 