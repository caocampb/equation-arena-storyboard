"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Eye, Lock, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TabNavigation } from "@/components/overworld/TabNavigation";
import { useGameState } from "@/context/GameStateContext";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { motion, AnimatePresence } from "framer-motion";

interface TierDetailClientProps {
  tier: string;
}

export default function TierDetailClient({ tier }: TierDetailClientProps) {
  const router = useRouter();
  const { hasPremium, togglePremium, playerStats } = useGameState();
  const [showPremium, setShowPremium] = useState(false);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Use the tier from URL params
  const tierNum = parseInt(tier, 10);
  const progress = 175;
  const maxXP = 225;
  const progressPercent = Math.round((progress / maxXP) * 100);

  // Set client-side state safely
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle premium upgrade with animation
  const handlePremiumUpgrade = () => {
    setShowUnlockAnimation(true);
    
    // Toggle premium after a short delay for animation
    setTimeout(() => {
      togglePremium();
      setTimeout(() => {
        setShowUnlockAnimation(false);
        setShowPremium(true);
      }, 1500);
    }, 500);
  };

  // Handle reverting to free version for demo purposes
  const handleRevertToFree = () => {
    // Simple toggle back without animation
    togglePremium();
    setShowPremium(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] text-white flex flex-col items-center">
      {/* Premium Unlock Animation Overlay */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 0.4 }
              }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.3, duration: 0.4 }
                }}
                className="text-6xl mb-6"
              >
                🎉
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  scale: [0.8, 1.1, 1],
                  transition: { delay: 0.5, duration: 0.6, times: [0, 0.6, 1] }
                }}
                className="text-4xl font-bold text-white mb-4 flex items-center"
              >
                <SparklesIcon className="h-8 w-8 mr-3 text-[#FFD700]" />
                PREMIUM UNLOCKED!
                <SparklesIcon className="h-8 w-8 ml-3 text-[#FFD700]" />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.8, duration: 0.3 } 
                }}
                className="text-gray-300 text-xl"
              >
                All premium rewards are now available!
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Panel container */}
      <div className="w-full max-w-4xl mx-auto p-4">
        <HeroPanel 
          username={playerStats.username}
          level={playerStats.level}
          coins={playerStats.coins}
          xpProgress={playerStats.xpProgress}
          achievementCount={playerStats.achievementCount}
          totalAchievements={playerStats.totalAchievements}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4">
        {/* Back Button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.push('/rewards')} 
            className="mr-4 btn-press"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </button>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">
            TIER {tierNum} REWARDS
          </h1>
        </div>
        
        {/* Progress */}
        <div className="flex justify-between mb-2 text-white">
          <div>Progress: {progress}/{maxXP} XP</div>
          <div>{progressPercent}%</div>
        </div>
        
        <div className="w-full bg-gray-700 h-2 rounded-full mb-8">
          <div
            className="bg-[#00C2CB] h-2 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        
        {/* Track toggle */}
        <div className="mb-6 flex p-1 bg-[#0A1122] rounded-full">
          <button
            onClick={() => setShowPremium(false)}
            className={cn(
              "py-2.5 px-8 rounded-full font-semibold text-sm transition-all flex-1 text-center",
              !showPremium 
                ? "bg-[#00C2CB] text-[#0A1122]" 
                : "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
            )}
          >
            FREE TRACK
          </button>
          <button
            onClick={() => setShowPremium(true)}
            className={cn(
              "py-2.5 px-8 rounded-full font-semibold text-sm transition-all flex items-center justify-center flex-1",
              showPremium 
                ? "bg-[#00C2CB] text-[#0A1122]" 
                : "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
            )}
          >
            PREMIUM TRACK
            {!hasPremium && !showPremium && <Lock className="h-3.5 w-3.5 ml-2" />}
          </button>
        </div>
        
        {/* Content Box */}
        <div className="bg-[#132242] border-2 border-[#00C2CB] rounded-lg p-6 mb-6 shadow-[0_0_15px_rgba(0,194,203,0.3)]">
          <h2 className="font-semibold text-white text-lg mb-2">
            TIER {tierNum} - IN PROGRESS ({progress}/{maxXP} XP)
          </h2>
          
          <div className="h-2.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <div 
              className="h-full bg-[#00C2CB]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          
          <div className="flex items-center mb-4">
            <span className="h-3 w-3 mr-1.5 rounded-sm bg-[#FFD700]"></span>
            <span className="text-gray-300">Order of Operations Mastery</span>
          </div>
          
          {/* Reward items */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className={isClient ? cn(showPremium && !hasPremium ? "opacity-40" : "") : ""}>
              <p className="text-sm text-gray-400 mb-1">FREE:</p>
              <div className="bg-[#0A1122] rounded-lg p-5 h-32 flex items-center justify-center border border-[#1D3055] shadow-md">
                <div className="text-center relative overflow-hidden flex flex-col items-center justify-center w-full">
                  {/* Particle effects container */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Animated particles */}
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.8)`,
                          boxShadow: '0 0 5px 2px rgba(0, 200, 255, 0.5)'
                        }}
                        animate={{
                          x: [0, Math.random() * 30 - 15],
                          y: [0, Math.random() * 30 - 15],
                          scale: [0.5, 1, 0.5],
                          opacity: [0.2, 1, 0.2]
                        }}
                        transition={{
                          duration: 2 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Central rotating star */}
                  <motion.div
                    className="mb-2 text-[#00E5FF] flex items-center justify-center"
                    style={{ 
                      filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.8))'
                    }}
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L15.5 8.5L23 9.5L17.5 15L19 23L12 19L5 23L6.5 15L1 9.5L8.5 8.5L12 1Z" />
                    </svg>
                  </motion.div>
                  
                  <p className="text-white font-medium mt-auto relative z-10">Simple Particle Effect</p>
                </div>
              </div>
            </div>
            
            <div className={isClient ? cn(!showPremium && hasPremium ? "opacity-40" : "") : ""}>
              <p className="text-sm text-gray-400 mb-1">PREMIUM:</p>
              <div className="bg-[#0A1122] rounded-lg p-5 h-32 relative border border-[#1D3055] shadow-md">
                <div className="text-center">
                  <span className="text-3xl">🎒</span>
                  <p className="text-white font-medium mt-2">Character Backpack</p>
                </div>
                
                {isClient && !hasPremium && !showPremium && (
                  <div className="absolute inset-0 bg-[#0A1122]/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <button 
                      onClick={() => setShowPremium(true)}
                      className="flex items-center gap-2 text-white border border-white/30 bg-white/10 rounded-full py-2 px-5 text-sm shadow-[0_0_12px_rgba(0,194,203,0.3)] hover:bg-white/20 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Preview Premium</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Earn more XP hint */}
          <div className="text-white">
            <p className="font-semibold mb-2">Complete Order of Operations battle to earn more XP!</p>
            <ul className="text-sm text-gray-300">
              <li className="flex items-center gap-2 mb-2">
                <span className="text-[#00C2CB]">➤</span> 
                Defeat the Order Keeper enemy in Equation Arena
              </li>
              <li className="flex items-center gap-2 mb-2">
                <span className="text-[#00C2CB]">➤</span> 
                Use the distributive property in your equations
                <span className="text-[#00C2CB] ml-1 group relative">
                  <span className="underline underline-offset-2 decoration-dotted cursor-help">+50 XP</span>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0A1122] border border-[#1D3055] text-white p-2 rounded text-xs w-48 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    Bonus XP for using the distributive property in your equation
                  </div>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00C2CB]">➤</span> 
                Only 50 XP needed to unlock this reward!
              </li>
            </ul>
          </div>
        </div>
        
        {/* Upgrade CTA or Revert option */}
        {!hasPremium ? (
          <div className="bg-[#132242] rounded-lg p-4 mb-6 flex items-center justify-between border border-[#1D3055] shadow-md overflow-hidden relative">
            {/* Animated background glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 opacity-75 blur-sm animate-glow-slow"></div>
            
            <div>
              <h3 className="text-white font-semibold">Unlock Premium Rewards</h3>
              <p className="text-sm text-gray-300">Get access to all premium items</p>
            </div>
            
            <motion.button 
              onClick={handlePremiumUpgrade}
              className="relative bg-gradient-to-r from-[#FFD700] to-[#FFC800] text-black font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.5)] group overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              {/* Button shine effect */}
              <span className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[45deg] transform -translate-x-full group-hover:animate-shine"></span>
              
              <span className="relative z-10 flex items-center">
                <span className="mr-1.5">UPGRADE</span>
                <span className="font-mono">$9.99</span>
              </span>
            </motion.button>
          </div>
        ) : (
          <div className="bg-[#132242] rounded-lg p-4 mb-6 flex items-center justify-between border border-[#1D3055] shadow-md">
            <div>
              <h3 className="text-white font-semibold">Premium Active</h3>
              <p className="text-sm text-gray-300">All premium rewards unlocked</p>
            </div>
            
            {/* Demo-only button to revert to free */}
            <div className="flex items-center gap-2">
              <div className="text-xs text-gray-400">Demo:</div>
              <button 
                onClick={handleRevertToFree}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm py-1.5 px-3 rounded transition-colors"
              >
                REVERT TO FREE
              </button>
            </div>
          </div>
        )}
      </main>
      
      {/* Bottom tab navigation */}
      <div className="w-full flex justify-center mt-auto">
        <div className="max-w-4xl w-full">
          <TabNavigation
            activeTab="rewards"
            onTabChange={(tabId) => console.log(tabId)}
          />
        </div>
      </div>
    </div>
  );
} 