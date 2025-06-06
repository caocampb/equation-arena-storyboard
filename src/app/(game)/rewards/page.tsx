"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, LockIcon, EyeIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

export default function RewardsPage() {
  const { playerStats, hasPremium, togglePremium } = useGameState();
  const [activeTrack, setActiveTrack] = useState<"free" | "premium">("free");
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showClaimPopup, setShowClaimPopup] = useState(false);

  // Debug claim popup state changes
  useEffect(() => {
    console.log("Claim popup state changed:", showClaimPopup);
  }, [showClaimPopup]);

  // Use useEffect to set client-side state
  useEffect(() => {
    setIsClient(true);
    // We'll only show the tutorial initially, not after every popup close
    setShowTutorial(true);
    setShowParticles(true);

    const timer = setTimeout(() => {
      // No longer using isLoaded
    }, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this only runs once on mount
  
  // Separate useEffect for handling the claim popup timer
  useEffect(() => {
    // Only set up timer if popup is showing
    if (showClaimPopup) {
      const claimPopupTimer = setTimeout(() => {
        setShowClaimPopup(false);
      }, 3500); // Auto-close after 3.5 seconds
      
      return () => clearTimeout(claimPopupTimer);
    }
  }, [showClaimPopup]); // This effect only manages the claim popup
  
  // Mock data for battle pass tiers
  const tiers = [
    { id: 1, xpRequired: 75, completed: true },
    { id: 2, xpRequired: 150, completed: true },
    { id: 3, xpRequired: 225, completed: false, currentXp: 175 },
    { id: 4, xpRequired: 300, completed: false },
    { id: 5, xpRequired: 400, completed: false },
    { id: 6, xpRequired: 500, completed: false },
    { id: 7, xpRequired: 600, completed: false },
    { id: 8, xpRequired: 700, completed: false },
    { id: 9, xpRequired: 800, completed: false },
    { id: 10, xpRequired: 1000, completed: false },
  ];
  
  // Current tier progress (hardcoded for mockup)
  const currentTier = 3;
  const currentXp = 50; // Demo state, set to 50 to test disabled state
  const targetXp = 100; // Demo state
  const progressPercentage = (currentXp / targetXp) * 100;
  // Comment out unused derived value
  // const isEligible = currentXp >= targetXp; // Derived state for eligibility
  
  // Handle premium upgrade with animation
  const handlePremiumUpgrade = () => {
    setShowUnlockAnimation(true);
    
    // Toggle premium after a short delay for animation
    setTimeout(() => {
      togglePremium();
      setTimeout(() => {
        setShowUnlockAnimation(false);
        setActiveTrack("premium");
      }, 4500); // Increased from 1500ms to 4500ms (4.5 seconds)
    }, 500);
  };

  // Handle reverting to free version for demo purposes
  const handleRevertToFree = () => {
    // Simple toggle back without animation
    togglePremium();
    setActiveTrack("free");
  };

  return (
    <div className="min-h-screen shop-background flex flex-col items-start" style={{ background: "linear-gradient(to bottom, #9b8b76, #7d6c5c)" }}>
      {/* Shared container for consistent alignment */}
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Animation Overlays - keep these at the component level */}
        <AnimatePresence>
          {showUnlockAnimation && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }
                }}
                exit={{ scale: 0.5, opacity: 0, y: 50, transition: { duration: 0.3 } }}
                className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-2xl p-6 sm:p-8 border-4 border-[#3d2813] shadow-2xl w-full max-w-md relative overflow-hidden text-center"
              >
                {/* Wood grain pattern overlay */}
                <div className="absolute inset-0 bg-wood-pattern opacity-40 pointer-events-none"></div>
                
                {/* Corner nails */}
                <div className="nail nail-top-left absolute top-3 left-3 w-3 h-3"></div>
                <div className="nail nail-top-right absolute top-3 right-3 w-3 h-3"></div>
                <div className="nail nail-bottom-left absolute bottom-3 left-3 w-3 h-3"></div>
                <div className="nail nail-bottom-right absolute bottom-3 right-3 w-3 h-3"></div>
                
                {/* Golden border effects */}
                <div className="absolute inset-0 border-[3px] border-[#FFD700]/40 rounded-xl opacity-70 pointer-events-none"></div>
                
                {/* Subtle animated particles */}
                <div className="absolute inset-0 opacity-30 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bg-[#FFD700]/70 rounded-full"
                      style={{
                        width: Math.random() * 6 + 2,
                        height: Math.random() * 6 + 2,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: 1.2,
                        opacity: [0, 0.8, 0],
                        x: Math.random() * 30 - 15,
                        y: Math.random() * 30 - 15,
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity },
                        opacity: { 
                          duration: Math.random() * 3 + 2,
                          times: [0, 0.5, 1],
                          repeat: Infinity,
                          ease: "linear"
                        },
                        x: { duration: Math.random() * 3 + 2, repeat: Infinity },
                        y: { duration: Math.random() * 3 + 2, repeat: Infinity },
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Premium Crown Icon */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: { delay: 0.3, duration: 0.6, type: "spring" }
                    }}
                    className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -8, 0],
                        rotateZ: [-5, 5, -5]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      👑
                    </motion.div>
                  </motion.div>
                  
                  {/* Premium text */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0.8, 1.1, 1],
                      transition: { delay: 0.5, duration: 0.6, times: [0, 0.6, 1] }
                    }}
                  >
                    <h2 className="text-4xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      PREMIUM UNLOCKED!
                    </h2>
                    
                    <div className="w-4/5 h-1 mx-auto bg-[#FFD700]/50 rounded-full mb-6"></div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        transition: { delay: 0.8, duration: 0.3 } 
                      }}
                      className="text-[#f8e4bc] text-xl mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                    >
                      All premium rewards are now available!
                    </motion.p>
                  </motion.div>
                  
                  {/* Sparkling stars effect at bottom */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }}
                    className="mt-3 flex items-center justify-center gap-6"
                  >
                    <motion.div
                      animate={{ 
                        scale: [0.8, 1.2, 0.8],
                        rotate: [-10, 10, -10],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="text-[#FFD700] text-2xl"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [10, -10, 10],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                      className="text-[#FFD700] text-3xl"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [0.9, 1.1, 0.9],
                        rotate: [-5, 5, -5],
                        opacity: [0.7, 1, 0.7]
                      }}
                      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="text-[#FFD700] text-2xl"
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                </motion.div>
                
                {/* Progress bar for auto-close indication */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#FFD700] to-[#d4a256] rounded-bl-2xl rounded-br-2xl"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%", transition: { duration: 4.4, ease: "linear" } }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showTutorial && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg border-2 border-[#3d2813] max-w-md p-8 w-11/12 relative overflow-hidden"
              >
                {/* Wood grain pattern */}
                <div className="absolute inset-0 bg-wood-pattern opacity-50"></div>
                
                {/* Corner nails */}
                <div className="nail nail-top-left absolute top-2 left-2 w-3 h-3"></div>
                <div className="nail nail-top-right absolute top-2 right-2 w-3 h-3"></div>
                <div className="nail nail-bottom-left absolute bottom-2 left-2 w-3 h-3"></div>
                <div className="nail nail-bottom-right absolute bottom-2 right-2 w-3 h-3"></div>
                
                <div className="text-center mb-8 relative z-10">
                  <h2 className="text-2xl font-bold text-[#f8e4bc] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Battle Pass</h2>
                  <p className="text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Step {tutorialStep} of 3</p>
                </div>
                
                <div className="min-h-[200px] flex flex-col items-center justify-center p-4 relative z-10">
                  {tutorialStep === 1 && (
                    <>
                      <div className="text-5xl mb-4">⚡</div>
                      <h3 className="text-xl font-semibold text-[#f8e4bc] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Earn XP in Battles</h3>
                      <p className="text-[#f8e4bc]/80 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Defeat enemies and use math properties to earn XP and unlock rewards</p>
                    </>
                  )}
                  
                  {tutorialStep === 2 && (
                    <>
                      <div className="text-5xl mb-4">🎁</div>
                      <h3 className="text-xl font-semibold text-[#f8e4bc] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Unlock Rewards</h3>
                      <p className="text-[#f8e4bc]/80 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Complete tiers to unlock character accessories, effects, and more!</p>
                    </>
                  )}
                  
                  {tutorialStep === 3 && (
                    <>
                      <div className="text-5xl mb-4">✨</div>
                      <h3 className="text-xl font-semibold text-[#f8e4bc] mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Preview Premium</h3>
                      <p className="text-[#f8e4bc]/80 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Check out premium rewards before deciding to upgrade</p>
                    </>
                  )}
                </div>
                
                <div className="flex justify-between mt-8 relative z-10">
                  {tutorialStep > 1 ? (
                    <button 
                      onClick={() => setTutorialStep(s => s-1)} 
                      className="px-4 py-2 text-[#f8e4bc] hover:text-white transition-colors"
                    >
                      Previous
                    </button>
                  ) : (
                    <div className="w-20"></div>
                  )}
                  
                  <div className="flex gap-1.5">
                    {[1,2,3].map(step => (
                      <div 
                        key={step} 
                        className={`w-2.5 h-2.5 rounded-full ${step === tutorialStep ? 'bg-[#FFD700]' : 'bg-[#3d2813]'}`}
                      ></div>
                    ))}
                  </div>
                  
                  {tutorialStep < 3 ? (
                    <button 
                      onClick={() => setTutorialStep(s => s+1)} 
                      className="px-4 py-2 bg-[#FFD700] rounded text-[#3d2813] font-medium hover:bg-[#ffeb80] transition-colors shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                    >
                      Next
                    </button>
                  ) : (
                    <button 
                      onClick={() => setShowTutorial(false)} 
                      className="px-4 py-2 bg-[#FFD700] rounded text-[#3d2813] font-medium hover:bg-[#ffeb80] transition-colors shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                    >
                      Get Started
                    </button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* NEW CLAIM POPUP ANIMATION */}
        <AnimatePresence>
          {showClaimPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[60] flex items-center justify-center p-4"
              onClick={() => setShowClaimPopup(false)} // Optional: click overlay to close
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 }
                }}
                exit={{ scale: 0.5, opacity: 0, y: 50, transition: { duration: 0.3 } }}
                className="bg-gradient-to-br from-violet-600 via-indigo-700 to-blue-700 rounded-2xl p-6 sm:p-8 border-2 border-violet-400/50 shadow-[0_0_30px_rgba(124,58,237,0.5)] w-full max-w-md relative overflow-hidden text-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside popup
              >
                {/* Animated cosmic background with stars */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-purple-500/10 to-transparent"></div>
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, Math.random() * 0.5 + 1, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                      }}
                    />
                  ))}
                </div>
                
                {/* Colorful particles bursting outward */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: ['#FF5E9F', '#4CC4FF', '#FFDE59', '#7C3AED', '#36EFAD'][Math.floor(Math.random() * 5)],
                        left: '50%',
                        top: '40%',
                        boxShadow: '0 0 8px currentColor',
                      }}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        scale: [0, 1, 0.8],
                        x: (Math.random() - 0.5) * 250, 
                        y: (Math.random() - 0.5) * 250,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2 + Math.random(),
                        ease: "easeOut",
                        delay: 0.6 + Math.random() * 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                  ))}
                </div>

                {/* Light rays emanating from center */}
                <motion.div 
                  className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-yellow-300/20 via-transparent to-transparent"
                  animate={{ 
                    opacity: [0, 0.7, 0.3, 0.7, 0],
                    scale: [0.8, 1.2, 1]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Claimed Item Icon (Star) with enhanced animation */}
                <motion.div
                  className="mx-auto mb-4 relative z-10"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    transition: { type: "spring", stiffness: 180, damping: 10, delay: 0.2 }
                  }}
                >
                  <motion.div 
                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 opacity-40 blur-md"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.5, 0.2]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <motion.svg 
                      width="100" 
                      height="100" 
                      viewBox="0 0 24 24" 
                      fill="#FFE24D" 
                      className="drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        scale: { 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut"
                        }
                      }}
                    >
                      <path d="M12 1L15.5 8.5L23 9.5L17.5 15L19 23L12 19L5 23L6.5 15L1 9.5L8.5 8.5L12 1Z" />
                    </motion.svg>
                  </motion.div>
                  
                  {/* Orbiting mini stars */}
                  {[...Array(5)].map((_, i) => {
                    const angleOffset = (i * 72) + 180; // Distribute around the circle
                    const delayOffset = i * 0.5;
                    
                    return (
                      <motion.div 
                        key={i}
                        className="absolute w-3 h-3 text-yellow-300"
                        initial={{ rotate: angleOffset }} 
                        animate={{ 
                          rotate: [angleOffset, angleOffset + 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: delayOffset
                        }}
                        style={{
                          top: '50%',
                          left: '50%',
                          transformOrigin: 'center',
                        }}
                      >
                        <motion.div 
                          className="absolute -ml-1.5 -mt-1.5"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.4, 1, 0.4]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2
                          }}
                        >
                          ⭐
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Text with enhanced reveal */}
                <div className="relative z-10 overflow-hidden mt-2">
                  <motion.h2 
                    className="text-3xl font-bold text-white mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  >
                    REWARD UNLOCKED!
                  </motion.h2>
                  
                  {/* Animated iridescent underline */}
                  <motion.div 
                    className="h-0.5 w-32 mx-auto bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-500 rounded-full mb-4"
                    initial={{ width: 0 }}
                    animate={{ width: 128 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                  
                  <motion.p 
                    className="text-xl text-purple-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] mb-4 font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    Simple Particle Effect
                  </motion.p>
                </div>

                {/* Central sparkle icon with animated sparkles */}
                <motion.div
                  className="relative z-10 mx-auto w-20 h-20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <motion.div
                    className="text-yellow-300 absolute"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <SparklesIcon className="w-16 h-16 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
                  </motion.div>
                  
                  {/* Animated sparkle bursts */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-8 h-8 text-white"
                      style={{
                        transformOrigin: 'center',
                        rotate: i * 90,
                      }}
                    >
                      <motion.div
                        className="absolute top-2 left-2 w-4 h-4"
                        animate={{
                          x: [0, 20],
                          opacity: [0, 1, 0],
                          scale: [0.2, 1.5, 0.2],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeOut"
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0L12.9672 9.0328L21.9999 10L12.9672 10.9672L12 20L11.0328 10.9672L0 10L11.0328 9.0328L12 0Z" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Enhanced progress bar for auto-close indication */}
                <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-indigo-900/30">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-br-2xl rounded-bl-2xl relative overflow-hidden"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.4, delay: 0.1, ease: "linear" }}
                  >
                    {/* Animated shine effect */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 skew-x-30"
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{ 
                        repeat: 2, 
                        duration: 1.7,
                        ease: "easeInOut",
                        delay: 0.2
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hero Panel container */}
        <div className="w-full">
          <HeroPanel 
            username={playerStats.username}
            level={playerStats.level}
            coins={playerStats.coins}
            xpProgress={playerStats.xpProgress}
            achievementCount={playerStats.achievementCount}
            totalAchievements={playerStats.totalAchievements}
          />
        </div>
        
        {/* Main content area - Wrapped in a large wooden panel */}
        <div className="main-wood-panel w-full mt-4 px-5 pb-20 relative">
          {/* Large panel nails - only at the corners of the main panel */}
          <div className="nail nail-top-left absolute top-4 left-4 w-4 h-4"></div>
          <div className="nail nail-top-right absolute top-4 right-4 w-4 h-4"></div>
          <div className="nail nail-bottom-left absolute bottom-4 left-4 w-4 h-4"></div>
          <div className="nail nail-bottom-right absolute bottom-4 right-4 w-4 h-4"></div>
          
          {/* Header - Ensure no horizontal line/border */}
          <div className="flex items-center mb-8 pt-5">
            <Link href="/overworld" className="mr-4 btn-press relative group">
              <div className="absolute inset-0 bg-[#5a3921] rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <ArrowLeftIcon className="h-6 w-6 text-[#f8e4bc]" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-[#f8e4bc] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              BATTLE PASS
            </h1>
          </div>
          
          {/* Progress stats */}
          <div className="flex gap-6 mb-6 text-[#f8e4bc] text-sm">
            <div className="flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> 
              <span>Current Tier: {currentTier}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#FFD700]">◆</span> 
              <span>XP to Next Tier: {currentXp}/{targetXp}</span>
            </div>
          </div>
          
          {/* Tier progression bar */}
          <div className="bg-[#5a3921]/60 rounded-lg p-6 mb-6 border border-[#3d2813] shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[#ffd700]/5 pulse-subtle"></div>
            
            <div className="flex items-center justify-between mb-2 relative z-10">
              {tiers.map((tier) => (
                <div key={tier.id} className="flex flex-col items-center">
                  <div className="group relative">
                    <Link href={`/rewards/${tier.id}`}>
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all hover:scale-110 relative z-10",
                        tier.completed 
                          ? "border-[#34A65F] text-[#34A65F] bg-[#34A65F]/10 shadow-[0_0_8px_rgba(52,166,95,0.4)]" 
                          : tier.id === currentTier
                          ? "border-[#FFD700] text-[#f8e4bc] bg-[#FFD700]/20 shadow-[0_0_8px_rgba(255,215,0,0.4)]" 
                          : "border-[#f8e4bc]/50 text-[#f8e4bc]/50 hover:border-[#f8e4bc]/80 hover:text-[#f8e4bc]/80"
                      )}>
                        {tier.completed ? (
                          <CheckIcon className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-medium">{tier.id}</span>
                        )}
                      </div>
                    </Link>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#3d2813] text-[#f8e4bc] text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-md">
                      View Tier Details
                    </div>
                  </div>
                  {/* Progress indicator for current tier */}
                  {tier.id === currentTier && (
                    <div className="w-10 h-1.5 bg-[#3d2813]/70 mt-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FFD700] shadow-[0_0_5px_rgba(255,215,0,0.5)]" 
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Track toggle */}
          <div className="mb-6 flex p-1 bg-[#3d2813] rounded-full">
            <button
              onClick={() => setActiveTrack("free")}
              className={cn(
                "py-2.5 px-8 rounded-full font-semibold text-sm transition-all",
                activeTrack === "free" 
                  ? "bg-[#FFD700] text-[#3d2813]" 
                  : "bg-transparent text-[#f8e4bc]/80 hover:text-[#f8e4bc] hover:bg-[#5a3921]/60"
              )}
            >
              FREE TRACK
            </button>
            <button
              onClick={() => setActiveTrack("premium")}
              className={cn(
                "py-2.5 px-8 rounded-full font-semibold text-sm transition-all flex items-center gap-2",
                activeTrack === "premium" 
                  ? "bg-[#FFD700] text-[#3d2813]" 
                  : "bg-transparent text-[#f8e4bc]/80 hover:text-[#f8e4bc] hover:bg-[#5a3921]/60"
              )}
            >
              PREMIUM TRACK
              {!hasPremium && <LockIcon className="h-3.5 w-3.5" />}
            </button>
          </div>
          
          {/* Next reward box (highlight) */}
          <div className="bg-[#5a3921]/60 border-2 border-[#FFD700] rounded-lg p-6 mb-6 shadow-[0_0_15px_rgba(255,215,0,0.3)] relative overflow-hidden">
            {/* Wood grain pattern */}
            <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
            
            <div className="relative z-10">
              <h2 className="font-semibold text-[#f8e4bc] text-lg mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                TIER 3 - IN PROGRESS ({currentXp}/{targetXp} XP)
              </h2>
              
              {/* Progress bar */}
              <div className="h-2.5 bg-[#3d2813]/70 rounded-full mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#FFD700] shadow-[0_0_5px_rgba(255,215,0,0.5)]"
                />
              </div>
              
              {/* Educational context */}
              <p className="text-sm text-[#f8e4bc]/80 mb-4 flex items-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                <span className="h-3 w-3 mr-1.5 rounded-sm bg-[#FFD700] shadow-[0_0_5px_rgba(255,215,0,0.5)]"></span>
                <span>Order of Operations Mastery</span>
              </p>
              
              {/* Reward items */}
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className={isClient ? cn(activeTrack === "premium" && !hasPremium ? "opacity-40" : "") : ""}>
                  <p className="text-sm text-[#f8e4bc]/70 mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">FREE:</p>
                  <div className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg p-5 h-32 flex items-center justify-center border-2 border-[#3d2813] shadow-md relative overflow-hidden">
                    {/* Wood grain pattern */}
                    <div className="absolute inset-0 bg-wood-pattern opacity-50 pointer-events-none"></div>
                    
                    <div className="text-center relative overflow-hidden flex flex-col items-center justify-center w-full z-10">
                      {/* Particle effects container */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Only render particles client-side */}
                        {showParticles && Array.from({ length: 8 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full pointer-events-none"
                            style={{
                              background: `rgba(255, ${Math.random() * 100 + 155}, ${Math.random() * 50}, 0.8)`,
                              boxShadow: '0 0 5px 2px rgba(255, 200, 0, 0.5)'
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
                        className="mb-2 text-[#FFD700] flex items-center justify-center"
                        style={{ 
                          filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8))'
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
                      
                      <p className="text-[#f8e4bc] font-medium mt-auto relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Simple Particle Effect</p>
                      
                      {/* Simple Test Button - More reliable than the motion.button */}
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Simple button clicked!");
                          setShowClaimPopup(true);
                        }}
                        className={cn(
                          "w-auto mx-auto mt-3 py-1.5 px-4 rounded-lg text-xs font-semibold transition-all",
                          "border border-[#3d2813] shadow-sm cursor-pointer",
                          "relative z-30 bg-gradient-to-b from-[#c17d3f] to-[#a66834] text-[#f8e4bc] hover:from-[#d48b47] hover:to-[#b7743a]",
                        )}
                        style={{ position: 'relative', zIndex: 9999 }}
                      >
                        CLAIM (TEST)
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className={isClient ? cn(activeTrack === "free" && hasPremium ? "opacity-40" : "") : ""}>
                  <p className="text-sm text-[#f8e4bc]/70 mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">PREMIUM:</p>
                  <div className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg p-5 h-32 relative border-2 border-[#3d2813] shadow-md overflow-hidden">
                    {/* Wood grain pattern */}
                    <div className="absolute inset-0 bg-wood-pattern opacity-50"></div>
                    
                    {/* Conditional rendering based on premium status and active track */}
                    {isClient && (hasPremium || activeTrack === "premium") ? (
                      /* If premium OR viewing premium track - show the actual premium content */
                      <div className="text-center relative z-10">
                        <span className="text-3xl">🎒</span>
                        <p className="text-[#f8e4bc] font-medium mt-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Character Backpack</p>
                      </div>
                    ) : (
                      /* Premium content hidden for free track users - show premium preview overlay instead */
                      <div 
                        className="absolute inset-0 bg-[#3d2813]/90 flex flex-col items-center justify-center z-20 cursor-pointer group"
                        onClick={() => setActiveTrack("premium")}
                      >
                        {/* Animated golden border */}
                        <div className="absolute inset-0 border-2 border-[#FFD700]/60 rounded-md animate-pulse-gold z-10"></div>
                        
                        {/* Premium golden glow */}
                        <div className="absolute inset-0 opacity-60" style={{ 
                          background: 'radial-gradient(circle, rgba(255,215,0,0.25) 0%, rgba(255,215,0,0.05) 50%, transparent 70%)' 
                        }}></div>
                        
                        {/* Background blur */}
                        <div className="absolute inset-0 backdrop-blur-md"></div>
                        
                        {/* Icon container */}
                        <div className="relative z-20 mb-1 flex items-center justify-center gap-2">
                          <EyeIcon className="h-5 w-5 text-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" />
                          <LockIcon className="h-4 w-4 text-[#FFD700] drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" />
                        </div>
                        
                        {/* Premium Label */}
                        <div className="flex flex-col items-center justify-center relative z-20">
                          <p className="text-[#FFD700] font-bold drop-shadow-[0_0_4px_rgba(255,215,0,0.8)] group-hover:scale-105 transition-transform">
                            Preview Premium
                          </p>
                          <p className="text-[#f8e4bc] text-xs mt-1">Character Backpack</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Earn more XP hint */}
              <div className="text-[#f8e4bc]">
                <p className="font-semibold mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Complete Order of Operations battle to earn more XP!</p>
                <ul className="text-sm text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  <li className="flex items-center gap-2 mb-2">
                    <span className="text-[#FFD700]">➤</span> 
                    Defeat the Order Keeper enemy in Equation Arena
                  </li>
                  <li className="flex items-center gap-2 mb-2">
                    <span className="text-[#FFD700]">➤</span> 
                    Use the distributive property in your equations
                    <span className="text-[#FFD700] ml-1 group relative">
                      <span className="underline underline-offset-2 decoration-dotted cursor-help">+50 XP</span>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#3d2813] border border-[#5a3921] text-[#f8e4bc] p-2 rounded text-xs w-48 opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
                        Bonus XP for using the distributive property in your equation
                      </div>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#FFD700]">➤</span> 
                    Only 50 XP needed to unlock this reward!
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Upgrade CTA or Revert option */}
          {!hasPremium ? (
            <div className="bg-[#5a3921]/60 rounded-lg p-4 mb-6 flex items-center justify-between border border-[#3d2813] shadow-md overflow-hidden relative">
              {/* Animated background glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/30 to-[#FFD700]/0 opacity-75 blur-sm animate-glow-slow"></div>
              
              <div className="relative z-10">
                <h3 className="text-[#f8e4bc] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Unlock Premium Rewards</h3>
                <p className="text-sm text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Get access to all premium items</p>
              </div>
              
              <motion.button 
                onClick={handlePremiumUpgrade}
                className="relative bg-gradient-to-r from-[#FFD700] to-[#FFC800] text-[#3d2813] font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.5)] group overflow-hidden z-10"
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
            <div className="bg-[#5a3921]/60 rounded-lg p-4 mb-6 flex items-center justify-between border border-[#3d2813] shadow-md relative overflow-hidden">
              {/* Wood grain pattern */}
              <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
              
              <div className="relative z-10">
                <h3 className="text-[#f8e4bc] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Premium Active</h3>
                <p className="text-sm text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">All premium rewards unlocked</p>
              </div>
              
              {/* Demo-only button to revert to free */}
              <div className="flex items-center gap-2 relative z-10">
                <div className="text-xs text-[#f8e4bc]/60 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Demo:</div>
                <button 
                  onClick={handleRevertToFree}
                  className="bg-[#3d2813] hover:bg-[#503018] text-[#f8e4bc] text-sm py-1.5 px-3 rounded transition-colors shadow-md"
                >
                  REVERT TO FREE
                </button>
              </div>
            </div>
          )}
          
          {/* Coming Soon Teaser */}
          <div className="bg-[#5a3921]/40 border border-[#3d2813] rounded-lg p-3 flex items-center justify-center mb-6">
            <p className="text-sm text-[#f8e4bc]/80 flex items-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              <span className="mr-2">👀</span>
              <span>Coming Soon • Algebra World accessories & effects!</span>
            </p>
          </div>
          
          {/* Move navigation buttons here as additional resources section */}
          <div className="border-t border-[#3d2813] pt-5 mt-2 mb-20">
            <h3 className="text-[#f8e4bc] text-sm font-medium mb-3 text-center drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Additional Resources</h3>
            <div className="flex justify-center gap-4">
              <Link 
                href="/rewards/skills" 
                className="py-2 px-4 rounded-lg bg-[#5a3921]/60 hover:bg-[#67492f] border border-[#3d2813] text-[#f8e4bc] font-medium transition-colors flex items-center gap-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                View Math Skills
              </Link>
              <Link 
                href="/rewards/victory-demo" 
                className="py-2 px-4 rounded-lg bg-[#5a3921]/60 hover:bg-[#67492f] border border-[#3d2813] text-[#f8e4bc] font-medium transition-colors flex items-center gap-2 shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                Victory Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* ESC Menu Hint */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#3d2813]/60 backdrop-blur-sm border-t border-[#67492f]/50 z-10">
        <div className="flex items-center gap-1.5 text-[#f0e6d2]/60 text-xs font-medium">
          <kbd className="px-1.5 py-0.5 bg-[#5a3921]/80 rounded border border-[#67492f]/70 text-[#f8e4bc] text-xs">ESC</kbd>
          <span>Press to access menu</span>
        </div>
      </div>
      
      {/* Styles for wood panel and nails */}
      <style jsx>{`
        .shop-background {
          background: linear-gradient(to bottom, #9b8b76, #7d6c5c);
          position: relative;
        }
        
        .shop-background::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E");
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        
        .main-wood-panel {
          background: linear-gradient(to bottom, rgba(139, 94, 60, 0.95), rgba(109, 71, 44, 0.95));
          border: 4px solid #3d2813;
          box-shadow: 0 0 0 1px #67492f, 0 10px 30px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.3);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          margin-bottom: 20px;
          z-index: 1;
        }
        
        .main-wood-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 12px,
              rgba(0,0,0,0.02) 12px,
              rgba(0,0,0,0.02) 24px
            ),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zM4 40H0v-4h4v4zm8 0H8v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }
        
        .bg-wood-pattern {
          position: relative;
        }
        
        .bg-wood-pattern::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.03) 10px,
              rgba(0,0,0,0.03) 20px
            );
          opacity: 0.4;
          pointer-events: none;
        }
        
        /* Nail styling */
        .nail {
          position: absolute;
          background: #2a1a0a;
          border-radius: 50%;
          border: 1px solid #ffd37a;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.2);
          z-index: 10;
        }
        
        .nail::after {
          content: "";
          position: absolute;
          top: 30%;
          left: 20%;
          width: 35%;
          height: 20%;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          transform: rotate(30deg);
        }
        
        .pulse-subtle {
          animation: pulse-bg 4s infinite ease-in-out;
        }
        
        @keyframes pulse-bg {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(45deg);
          }
          to {
            transform: translateX(300%) skewX(45deg);
          }
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out;
        }
        
        @keyframes glow-slow {
          0%, 100% {
            opacity: 0.5;
            transform: translateX(-30%) skewX(30deg);
          }
          50% {
            opacity: 0.8;
            transform: translateX(30%) skewX(30deg);
          }
        }
        
        .animate-glow-slow {
          animation: glow-slow 4s infinite ease-in-out;
        }
        
        @keyframes pulse-gold {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.4);
            border-color: rgba(255, 215, 0, 0.6);
          }
          50% {
            box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.7);
            border-color: rgba(255, 215, 0, 0.9);
          }
        }
        
        .animate-pulse-gold {
          animation: pulse-gold 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
} 