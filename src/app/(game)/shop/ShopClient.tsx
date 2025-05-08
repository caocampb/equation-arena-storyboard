"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, XIcon, BookOpenIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { ShopItemCard } from "@/components/shop/ShopItemCard";
import { CategoryTabs } from "@/components/shop/CategoryTabs";
import { useGameState } from "@/context/GameStateContext";
import { getMockShopData } from "@/lib/mock-shop";
import { ShopItem, getRarityColorClass } from "@/types/shop";
import { cn } from "@/lib/utils";

export default function ShopClient() {
  const { playerStats, buyItem } = useGameState();
  const [activeCategory, setActiveCategory] = useState<"featured" | "daily">("featured");
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<boolean | null>(null);
  const [showChallenges, setShowChallenges] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpiringSoon, setIsExpiringSoon] = useState<boolean>(false);
  
  // Get the shop data
  const shopData = getMockShopData();
  
  // Timer effect to update every second
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiration = new Date(shopData.nextRotation);
      const difference = expiration.getTime() - now.getTime();
      
      // If already expired
      if (difference <= 0) {
        setTimeLeft("Refreshing...");
        return;
      }
      
      // Check if less than 1 hour remaining
      setIsExpiringSoon(difference < 1000 * 60 * 60);
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      // Format with leading zeros
      const formatTime = (value: number) => value.toString().padStart(2, '0');
      
      setTimeLeft(`${hours}h ${formatTime(minutes)}m ${formatTime(seconds)}s`);
    };
    
    // Update immediately
    updateTimer();
    
    // Then update every second
    const interval = setInterval(updateTimer, 1000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [shopData.nextRotation]);
  
  // Get items based on active category
  const displayedItems = activeCategory === "featured" 
    ? shopData.featuredItems 
    : shopData.dailyItems;
  
  // Handle item selection for purchase modal
  const handleSelectItem = (item: ShopItem) => {
    setSelectedItem(item);
    setPurchaseSuccess(null);
    setShowChallenges(false);
  };
  
  // Handle item purchase
  const handlePurchase = () => {
    if (!selectedItem) return;
    
    const success = buyItem(selectedItem.id, selectedItem.price);
    setPurchaseSuccess(success);
    
    // Close modal after delay if successful
    if (success) {
      setTimeout(() => {
        setSelectedItem(null);
        setPurchaseSuccess(null);
        setShowChallenges(false);
      }, 2000);
    }
  };
  
  // Handle educational challenge launch
  const handlePlayChallenges = () => {
    if (!selectedItem?.eduUnlock) return;
    setShowChallenges(true);
  };
  
  return (
    <div className="min-h-screen shop-background flex flex-col items-start" style={{ background: "linear-gradient(to bottom, #9b8b76, #7d6c5c)" }}>
      {/* Shared container for consistent alignment */}
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Hero Panel Container */}
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
              SHOP
            </h1>
          </div>
          
          {/* Shop Rotation Timer - Enhanced with better visual distinction */}
          <div className="bg-[#5a3921]/80 rounded-lg p-4 border border-[#3d2813] mb-8 shadow-inner relative overflow-hidden">
            {/* Background pulsing glow to emphasize urgency */}
            <div className="absolute inset-0 bg-[#ffd700]/5 pulse-subtle"></div>
            
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className={`text-xl ${isExpiringSoon ? 'text-red-300 animate-pulse' : 'text-amber-300'} drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]`}>⏳</span>
                <h2 className="text-[#f8e4bc] font-medium text-base md:text-lg drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Daily Items Reset</h2>
              </div>
              
              {/* Simple fixed-width timer */}
              <div className="flex items-center">
                <div className={`
                  min-w-[130px] text-center
                  px-4 py-1.5 rounded-md 
                  ${isExpiringSoon 
                    ? 'bg-[#5c2f2f]/70 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2),inset_0_0_6px_rgba(0,0,0,0.2)] animate-subtle-pulse' 
                    : 'bg-[#3d2813]/70 border border-amber-500/30 shadow-[0_0_8px_rgba(0,0,0,0.3),inset_0_0_6px_rgba(0,0,0,0.2)]'
                  }
                `}>
                  <span className={`
                    font-bold text-lg font-mono tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]
                    ${isExpiringSoon ? 'text-red-300' : 'text-amber-300'}
                  `}>
                    {timeLeft}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Make sure we don't render duplicate headers in the CategoryTabs component */}
          <div className="mb-8 drop-shadow-md">
            <CategoryTabs 
              activeCategory={activeCategory} 
              setActiveCategory={(cat) => setActiveCategory(cat as "featured" | "daily")}
            />
          </div>
          
          {/* Shop Items Grid - Enhanced shadow for better depth and increased gap */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 drop-shadow-lg">
            {displayedItems.map((item) => (
              <ShopItemCard
                key={item.id}
                item={item}
                onClick={handleSelectItem}
              />
            ))}
          </div>
          
          {/* Empty state messaging if no items */}
          {displayedItems.length === 0 && (
            <div className="bg-[#3d2813]/30 rounded-lg p-8 text-center border border-[#3d2813] shadow-inner">
              <p className="text-[#f8e4bc] font-medium">No items available in this category right now. Check back later!</p>
            </div>
          )}
          
          {/* Shop info panel - Enhanced with icon */}
          <div className="mt-8 bg-[#5a3921]/60 rounded-lg p-4 border border-[#3d2813] shadow-inner">
            <div className="flex items-start">
              <div className="mr-3 text-amber-300 text-xl mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">ℹ️</div>
              <p className="text-[#f8e4bc] text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] leading-relaxed">
                {activeCategory === "featured" 
                  ? "Featured items are available for a limited time and include rare, exclusive items!" 
                  : "Daily items refresh every 24 hours. Check back daily for new items!"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Item purchase modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#3d2813]/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => {
                if (!showChallenges) {
                  setSelectedItem(null);
                }
              }}
            >
              <div className="wood-panel-outer">
                {!showChallenges ? (
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="wood-panel bg-[#5a3921] border-2 border-[#3d2813] rounded-lg max-w-md w-full max-h-[90vh] flex flex-col relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Corner nails */}
                    <div className="nail nail-top-left"></div>
                    <div className="nail nail-top-right"></div>
                    <div className="nail nail-bottom-left"></div>
                    <div className="nail nail-bottom-right"></div>
                    
                    {/* Purchase result message - kept simple */}
                    {purchaseSuccess !== null && (
                      <div className={cn(
                        "p-3 text-center",
                        purchaseSuccess 
                          ? "bg-green-500/20 border-b border-green-500/30" 
                          : "bg-red-500/20 border-b border-red-500/30"
                      )}>
                        <p className="text-sm text-[#f8e4bc]">
                          {purchaseSuccess 
                            ? "Purchase successful! Item added to your inventory." 
                            : playerStats.coins < selectedItem.price 
                              ? `Not enough coins! You need ${selectedItem.price} coins, but have ${playerStats.coins}.`
                              : "You already own this item."}
                        </p>
                      </div>
                    )}
                    
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto p-5">
                      {/* Item details */}
                      <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{selectedItem.emoji}</div>
                        <h2 className={cn(
                          "text-xl font-bold mb-2",
                          getRarityColorClass(selectedItem.rarity)
                        )}>
                          {selectedItem.name}
                        </h2>
                        <div className="flex justify-center items-center gap-1 mb-3">
                          <div className={cn(
                            "px-2 py-0.5 rounded text-xs uppercase font-bold",
                            selectedItem.rarity === "legendary" ? "bg-[#FFA500]/20 text-[#FFA500]" :
                            selectedItem.rarity === "epic" ? "bg-[#AA00FF]/20 text-[#AA00FF]" :
                            selectedItem.rarity === "rare" ? "bg-[#0088FF]/20 text-[#0088FF]" :
                            selectedItem.rarity === "uncommon" ? "bg-[#00AA00]/20 text-[#00AA00]" :
                            "bg-gray-500/20 text-gray-400"
                          )}>
                            {selectedItem.rarity}
                          </div>
                          
                          <div className="bg-[#3d2813]/50 px-2 py-0.5 rounded text-xs uppercase text-[#f8e4bc]">
                            {selectedItem.type}
                          </div>
                        </div>
                        <p className="text-[#f8e4bc] text-sm">
                          {selectedItem.description}
                        </p>
                      </div>
                      
                      {/* Educational unlock - simplified */}
                      {selectedItem.eduUnlock && (
                        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-md p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🎓</span>
                            <h3 className="text-emerald-400 font-medium">Educational Unlock</h3>
                          </div>
                          <p className="text-[#f8e4bc] text-sm mb-3">
                            {selectedItem.eduUnlock.description}
                          </p>
                          <button 
                            className="w-full bg-emerald-600 text-white py-2 rounded font-bold text-sm transition-all duration-200 hover:bg-emerald-500 hover:shadow-[0_0_10px_rgba(72,187,120,0.5),inset_0_0_6px_rgba(72,187,120,0.3)] hover:transform hover:-translate-y-0.5"
                            onClick={handlePlayChallenges}
                          >
                            PLAY CHALLENGES
                          </button>
                        </div>
                      )}
                      
                      {/* Or separator - simplified */}
                      {selectedItem.eduUnlock && (
                        <div className="flex items-center my-4">
                          <div className="flex-1 h-px bg-[#67492f]"></div>
                          <p className="px-3 text-sm text-[#f8e4bc]/50">OR</p>
                          <div className="flex-1 h-px bg-[#67492f]"></div>
                        </div>
                      )}
                      
                      {/* Purchase button - simplified */}
                      <div className="flex items-center justify-between bg-[#3d2813] p-3 rounded-md mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">💰</span>
                          <span className="text-[#f8e4bc] font-bold">{selectedItem.price} Coins</span>
                        </div>
                        
                        <button
                          className={cn(
                            "font-bold py-2 px-4 rounded transition-all duration-200",
                            purchaseSuccess 
                              ? "bg-green-600 text-white hover:bg-green-500 hover:shadow-md" 
                              : "bg-[#5a3921] border border-[#ffd700]/30 text-[#f8e4bc] hover:bg-[#67492f] hover:border-[#FFD700]/30 hover:shadow-[0_0_10px_rgba(255,215,0,0.4),inset_0_0_6px_rgba(255,215,0,0.2)] hover:transform hover:-translate-y-0.5"
                          )}
                          onClick={handlePurchase}
                          disabled={purchaseSuccess === true}
                        >
                          {purchaseSuccess ? "PURCHASED" : "PURCHASE"}
                        </button>
                      </div>
                    </div>
                    
                    {/* Close button - fixed at bottom */}
                    <div className="p-3 border-t border-[#3d2813]">
                      <button
                        className="bg-[#5a3921] border border-[#ffd700]/30 text-[#f8e4bc] py-2 px-4 rounded font-bold text-sm w-full transition-all duration-200 hover:bg-[#67492f] hover:border-[#FFD700]/30 hover:shadow-[0_0_10px_rgba(255,215,0,0.4),inset_0_0_6px_rgba(255,215,0,0.2)] hover:transform hover:-translate-y-0.5"
                        onClick={() => setSelectedItem(null)}
                      >
                        CLOSE
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="wood-panel bg-[#5a3921] border-2 border-[#3d2813] rounded-lg max-w-md w-full max-h-[90vh] flex flex-col relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Corner nails */}
                    <div className="nail nail-top-left"></div>
                    <div className="nail nail-top-right"></div>
                    <div className="nail nail-bottom-left"></div>
                    <div className="nail nail-bottom-right"></div>
                    
                    {/* Challenge header */}
                    <div className="bg-emerald-900/30 p-4 border-b border-emerald-700/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎓</span>
                          <h3 className="text-emerald-400 font-bold">Educational Challenges</h3>
                        </div>
                        <button 
                          onClick={() => setShowChallenges(false)}
                          className="text-[#f8e4bc]/60 hover:text-[#f8e4bc] transition-colors"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Challenge content area - placeholder for now */}
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center">
                      <div className="text-center">
                        <BookOpenIcon className="h-16 w-16 text-emerald-500/40 mx-auto mb-6" />
                        <h3 className="text-xl font-bold text-[#f8e4bc] mb-3">Challenges Coming Soon</h3>
                        <p className="text-[#f8e4bc]/80 text-sm mb-6 max-w-xs mx-auto">
                          Complete educational challenges to earn this item for free! New challenges are being prepared.
                        </p>
                        
                        {/* Progress indicator */}
                        <div className="bg-[#3d2813] rounded-full h-3 w-64 mx-auto mb-2 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full"
                            style={{ width: '30%' }}
                          ></div>
                        </div>
                        <p className="text-xs text-[#f8e4bc]/60">Development progress: 30%</p>
                      </div>
                    </div>
                    
                    {/* Back button */}
                    <div className="p-3 border-t border-[#3d2813]">
                      <button
                        className="bg-[#5a3921] border border-[#ffd700]/30 text-[#f8e4bc] py-2 px-4 rounded font-bold text-sm w-full transition-all duration-200 hover:bg-[#67492f] hover:border-[#FFD700]/30 hover:shadow-[0_0_10px_rgba(255,215,0,0.4),inset_0_0_6px_rgba(255,215,0,0.2)] hover:transform hover:-translate-y-0.5"
                        onClick={() => setShowChallenges(false)}
                      >
                        BACK TO ITEM
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* ESC Menu Hint */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#3d2813]/60 backdrop-blur-sm border-t border-[#67492f]/50 z-10">
          <div className="flex items-center gap-1.5 text-[#f0e6d2]/60 text-xs font-medium">
            <kbd className="px-1.5 py-0.5 bg-[#5a3921]/80 rounded border border-[#67492f]/70 text-[#f8e4bc] text-xs">ESC</kbd>
            <span>Press to access menu</span>
          </div>
        </div>
        
        {/* Styles for main wood panel and shop background */}
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
          
          /* Larger nail styling for main panel */
          .main-wood-panel .nail {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #2a1a0a;
            border-radius: 50%;
            border: 1px solid #ffd37a;
            box-shadow: inset 0 0 0 1px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.2);
            z-index: 10;
          }
          
          .main-wood-panel .nail::after {
            content: "";
            position: absolute;
            top: 3px;
            left: 2px;
            width: 4px;
            height: 2px;
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
          
          @keyframes subtle-pulse {
            0%, 100% {
              opacity: 1;
              box-shadow: 0 0 8px rgba(239,68,68,0.2), inset 0 0 6px rgba(0,0,0,0.2);
            }
            50% {
              opacity: 0.95;
              box-shadow: 0 0 12px rgba(239,68,68,0.4), inset 0 0 6px rgba(0,0,0,0.2);
            }
          }
          
          .animate-subtle-pulse {
            animation: subtle-pulse 2s infinite ease-in-out;
          }
        `}</style>
      </div>
    </div>
  );
} 