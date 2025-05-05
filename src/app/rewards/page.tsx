"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, LockIcon, EyeIcon, CheckIcon, SparklesIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

export default function RewardsPage() {
  const { activeTab, setActiveTab, playerStats, hasPremium, togglePremium } = useGameState();
  const [activeTrack, setActiveTrack] = useState<"free" | "premium">("free");
  const [showTutorial, setShowTutorial] = useState(false); // Change default to false to avoid hydration issues
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  // Use useEffect to set client-side state
  useEffect(() => {
    setIsClient(true);
    // Now we can safely show tutorial once we're on client
    setShowTutorial(true);
    // And safely show particles once we're client-side
    setShowParticles(true);
  }, []);
  
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
  const currentXp = 175;
  const targetXp = 225;
  const progressPercentage = Math.round((currentXp / targetXp) * 100);
  
  // Handle premium upgrade with animation
  const handlePremiumUpgrade = () => {
    setShowUnlockAnimation(true);
    
    // Toggle premium after a short delay for animation
    setTimeout(() => {
      togglePremium();
      setTimeout(() => {
        setShowUnlockAnimation(false);
        setActiveTrack("premium");
      }, 1500);
    }, 500);
  };

  // Handle reverting to free version for demo purposes
  const handleRevertToFree = () => {
    // Simple toggle back without animation
    togglePremium();
    setActiveTrack("free");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
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

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-[#0A1930] to-[#15295A] rounded-lg border border-[#1D3055] max-w-md p-8 w-11/12"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Battle Pass</h2>
                <p className="text-gray-300">Step {tutorialStep} of 3</p>
              </div>
              
              <div className="min-h-[200px] flex flex-col items-center justify-center p-4">
                {tutorialStep === 1 && (
                  <>
                    <div className="text-5xl mb-4">⚡</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Earn XP in Battles</h3>
                    <p className="text-gray-300 text-center">Defeat enemies and use math properties to earn XP and unlock rewards</p>
                  </>
                )}
                
                {tutorialStep === 2 && (
                  <>
                    <div className="text-5xl mb-4">🎁</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Unlock Rewards</h3>
                    <p className="text-gray-300 text-center">Complete tiers to unlock character accessories, effects, and more!</p>
                  </>
                )}
                
                {tutorialStep === 3 && (
                  <>
                    <div className="text-5xl mb-4">✨</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Preview Premium</h3>
                    <p className="text-gray-300 text-center">Check out premium rewards before deciding to upgrade</p>
                  </>
                )}
              </div>
              
              <div className="flex justify-between mt-8">
                {tutorialStep > 1 ? (
                  <button 
                    onClick={() => setTutorialStep(s => s-1)} 
                    className="px-4 py-2 text-white"
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
                      className={`w-2.5 h-2.5 rounded-full ${step === tutorialStep ? 'bg-[#00C2CB]' : 'bg-gray-600'}`}
                    ></div>
                  ))}
                </div>
                
                {tutorialStep < 3 ? (
                  <button 
                    onClick={() => setTutorialStep(s => s+1)} 
                    className="px-4 py-2 bg-[#00C2CB] rounded text-[#0A1122] font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={() => setShowTutorial(false)} 
                    className="px-4 py-2 bg-[#00C2CB] rounded text-[#0A1122] font-medium"
                  >
                    Get Started
                  </button>
                )}
              </div>
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
      
      {/* Main content area */}
      <main className="flex-1 w-full max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/overworld" className="mr-4 btn-press">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">
            BATTLE PASS
          </h1>
        </div>
        
        {/* Progress stats */}
        <div className="flex gap-6 mb-6 text-white text-sm">
          <div className="flex items-center gap-2">
            <span className="text-[#00C2CB]">◆</span> 
            <span>Current Tier: {currentTier}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#00C2CB]">◆</span> 
            <span>XP to Next Tier: {currentXp}/{targetXp}</span>
          </div>
        </div>
        
        {/* Tier progression bar */}
        <div className="bg-[#132242] rounded-lg p-6 mb-6 border border-[#1D3055] shadow-md">
          <div className="flex items-center justify-between mb-2">
            {tiers.map((tier) => (
              <div key={tier.id} className="flex flex-col items-center">
                <div className="group relative">
                  <Link href={`/rewards/${tier.id}`}>
                    <div className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all hover:scale-110",
                      tier.completed 
                        ? "border-[#00C2CB] text-[#00C2CB] bg-[#00C2CB]/10" 
                        : tier.id === currentTier
                        ? "border-[#00C2CB] text-white bg-[#00C2CB]/20 shadow-[0_0_8px_rgba(0,194,203,0.4)]" 
                        : "border-gray-500 text-gray-500 hover:border-gray-300 hover:text-gray-300"
                    )}>
                      {tier.completed ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-medium">{tier.id}</span>
                      )}
                    </div>
                  </Link>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#00C2CB]/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    View Tier Details
                  </div>
                </div>
                {/* Progress indicator for current tier */}
                {tier.id === currentTier && (
                  <div className="w-10 h-1.5 bg-gray-700 mt-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#00C2CB]" 
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Track toggle */}
        <div className="mb-6 flex p-1 bg-[#0A1122] rounded-full">
          <button
            onClick={() => setActiveTrack("free")}
            className={cn(
              "py-2.5 px-8 rounded-full font-semibold text-sm transition-all",
              activeTrack === "free" 
                ? "bg-[#00C2CB] text-[#0A1122]" 
                : "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
            )}
          >
            FREE TRACK
          </button>
          <button
            onClick={() => setActiveTrack("premium")}
            className={cn(
              "py-2.5 px-8 rounded-full font-semibold text-sm transition-all flex items-center gap-2",
              activeTrack === "premium" 
                ? "bg-[#00C2CB] text-[#0A1122]" 
                : "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
            )}
          >
            PREMIUM TRACK
            {!hasPremium && <LockIcon className="h-3.5 w-3.5" />}
          </button>
        </div>
        
        {/* Next reward box (highlight) */}
        <div className="bg-[#132242] border-2 border-[#00C2CB] rounded-lg p-6 mb-6 shadow-[0_0_15px_rgba(0,194,203,0.3)]">
          <h2 className="font-semibold text-white text-lg mb-2">
            TIER 3 - IN PROGRESS ({currentXp}/{targetXp} XP)
          </h2>
          
          {/* Progress bar */}
          <div className="h-2.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#00C2CB]"
            />
          </div>
          
          {/* Educational context */}
          <p className="text-sm text-gray-300 mb-4 flex items-center">
            <span className="h-3 w-3 mr-1.5 rounded-sm bg-[#FFD700]"></span>
            <span>Order of Operations Mastery</span>
          </p>
          
          {/* Reward items */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div className={isClient ? cn(activeTrack === "premium" && !hasPremium ? "opacity-40" : "") : ""}>
              <p className="text-sm text-gray-400 mb-1">FREE:</p>
              <div className="bg-[#0A1122] rounded-lg p-5 h-32 flex items-center justify-center border border-[#1D3055] shadow-md">
                <div className="text-center relative overflow-hidden flex flex-col items-center justify-center w-full">
                  {/* Particle effects container */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Only render particles client-side */}
                    {showParticles && Array.from({ length: 8 }).map((_, i) => (
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
            
            <div className={isClient ? cn(activeTrack === "free" && hasPremium ? "opacity-40" : "") : ""}>
              <p className="text-sm text-gray-400 mb-1">PREMIUM:</p>
              <div className="bg-[#0A1122] rounded-lg p-5 h-32 relative border border-[#1D3055] shadow-md">
                <div className="text-center">
                  <span className="text-3xl">🎒</span>
                  <p className="text-white font-medium mt-2">Character Backpack</p>
                </div>
                
                {isClient && !hasPremium && activeTrack !== "premium" && (
                  <div className="absolute inset-0 bg-[#0A1122]/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <button 
                      onClick={() => setActiveTrack("premium")}
                      className="flex items-center gap-2 text-white border border-white/30 bg-white/10 rounded-full py-2 px-5 text-sm shadow-[0_0_12px_rgba(0,194,203,0.3)] hover:bg-white/20 transition-all"
                    >
                      <EyeIcon className="h-4 w-4" />
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
        
        {/* Coming Soon Teaser */}
        <div className="bg-[#132242]/50 border border-[#1D3055] rounded-lg p-3 flex items-center justify-center mb-6">
          <p className="text-sm text-gray-300 flex items-center">
            <span className="mr-2">👀</span>
            <span>Coming Soon • Algebra World accessories & effects!</span>
          </p>
        </div>
        
        {/* Move navigation buttons here as additional resources section */}
        <div className="border-t border-gray-700 pt-5 mt-2 mb-20">
          <h3 className="text-white text-sm font-medium mb-3 text-center">Additional Resources</h3>
          <div className="flex justify-center gap-4">
            <Link 
              href="/rewards/skills" 
              className="py-2 px-4 rounded-lg bg-[#132242] hover:bg-[#1D3055] border border-[#1D3055] text-white font-medium transition-colors flex items-center gap-2"
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
              className="py-2 px-4 rounded-lg bg-[#132242] hover:bg-[#1D3055] border border-[#1D3055] text-white font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Victory Demo
            </Link>
          </div>
        </div>
      </main>
      
      {/* TabNavigation removed - Now using ESC menu (press ESC key) */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#0A1122]/60 backdrop-blur-sm border-t border-[#1D3055]/50 z-10">
        <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
          <kbd className="px-1.5 py-0.5 bg-[#132242]/80 rounded border border-[#1D3055]/70 text-[#00C2CB] text-xs">ESC</kbd>
          <span>Press to access menu</span>
        </div>
      </div>
    </div>
  );
} 