"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShopItem, getRarityColorClass, getRarityBorderClass } from "@/types/shop";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

// Define a local coins icon to avoid import issues
function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="8" cy="8" r="6" />
      <circle cx="16" cy="16" r="6" />
      <path d="M8.3 6.3 16 14" />
    </svg>
  );
}

interface ShopItemCardProps {
  item: ShopItem;
  onClick: (item: ShopItem) => void;
}

export function ShopItemCard({ item, onClick }: ShopItemCardProps) {
  const { isItemOwned } = useGameState();
  const [isHovered, setIsHovered] = useState(false);
  const [isPriceHovered, setIsPriceHovered] = useState(false);
  const [isChallengeHovered, setChallengeHovered] = useState(false);
  
  const isOwned = isItemOwned(item.id);
  const rarityColorClass = getRarityColorClass(item.rarity);
  const rarityBorderClass = getRarityBorderClass(item.rarity);
  
  return (
    <div className="shop-card-outer">
      {/* Main content panel */}
      <motion.div
        className={`shop-card ${isOwned ? 'opacity-75' : ''} relative overflow-hidden`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: isOwned ? 1.02 : 1.05,
          y: -5
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => !isOwned && onClick(item)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Corner nails - now in the shop-card directly */}
        <div className="nail nail-top-left"></div>
        <div className="nail nail-top-right"></div>
        <div className="nail nail-bottom-left"></div>
        <div className="nail nail-bottom-right"></div>
        
        {/* Inner content with special border based on rarity */}
        <div className={`shop-card-inner h-full flex flex-col ${rarityBorderClass} border-2 rounded-lg overflow-hidden`}>
          {/* Featured badge - enhanced with better shadow and renamed to avoid duplication */}
          {item.isFeatured && (
            <div className="absolute top-3.5 right-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[8px] font-bold py-0.5 px-1.5 rounded-full z-20 shadow-[0_0_6px_rgba(0,0,0,0.4)] animate-spotlight border border-yellow-300/30 flex items-center">
              <span className="text-[8px] mr-0.5">★</span>
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">SPECIAL</span>
            </div>
          )}
          
          {/* New badge - enhanced with pulse animation */}
          {item.isNew && (
            <div className="absolute top-3.5 left-3.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white text-[8px] font-bold py-0.5 px-1.5 rounded-full z-20 shadow-[0_0_6px_rgba(0,0,0,0.4)] animate-pulse-glow border border-blue-300/30 flex items-center">
              <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">NEW</span>
            </div>
          )}
          
          {/* Owned badge */}
          {isOwned && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <div className="bg-gray-800/80 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg">
                OWNED
              </div>
            </div>
          )}
          
          {/* Main content - improved typography for item name */}
          <div className="p-4 pt-5 pb-1 flex-grow flex flex-col items-center justify-center">
            <div className="text-5xl mb-3 drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]">{item.emoji}</div>
            <h3 className={`text-center font-bold ${rarityColorClass} text-sm mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] tracking-wide`}>
              {item.name}
            </h3>
            
            {/* Description - only show on hover - improved contrast */}
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                height: isHovered ? 'auto' : 0
              }}
              className="text-xs text-[#ffd700] text-center mt-1 overflow-hidden drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
            >
              {item.description}
            </motion.div>
          </div>
          
          {/* Purchase options section for educational unlocks */}
          {item.eduUnlock && !isOwned ? (
            <div className="shop-card-footer p-2 flex flex-col">
              {/* Buy option */}
              <div className="flex justify-center items-center mb-2">
                <div 
                  className={cn(
                    "relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all duration-150",
                    isPriceHovered 
                      ? "bg-[#111111] border border-[#ffd700]/60 shadow-[0_0_10px_rgba(255,215,0,0.5),inset_0_0_6px_rgba(255,215,0,0.3)]" 
                      : "bg-[#1A1A1A] border border-[#ffd700]/20"
                  )}
                  onMouseEnter={() => setIsPriceHovered(true)}
                  onMouseLeave={() => setIsPriceHovered(false)}
                >
                  {isPriceHovered && (
                    <div className="absolute inset-0 bg-[#ffd700]/10 animate-sparkle"></div>
                  )}
                  <CoinsIcon className={cn(
                    "h-4 w-4 text-[#FFD700] z-10 transition-all duration-150 drop-shadow-[0_0_2px_rgba(255,215,0,0.6)]",
                    isPriceHovered && "scale-125 filter brightness-125"
                  )} />
                  <span className={cn(
                    "font-bold text-white z-10 transition-all duration-150 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
                    isPriceHovered && "text-[#ffd700]"
                  )}>
                    {item.price}
                  </span>
                </div>
              </div>
              
              {/* OR divider */}
              <div className="flex items-center justify-center mb-2">
                <div className="h-px bg-gray-600 flex-1 mr-2"></div>
                <div className="text-xs font-bold text-gray-400">OR</div>
                <div className="h-px bg-gray-600 flex-1 ml-2"></div>
              </div>
              
              {/* Challenge option - enhanced styling */}
              <div 
                className="relative overflow-hidden bg-emerald-700 rounded-md py-2 px-2 flex items-center justify-center gap-1.5 mx-auto shadow-md w-full hover:bg-emerald-600 hover:shadow-[0_0_8px_rgba(72,187,120,0.5),inset_0_0_4px_rgba(72,187,120,0.3)] border border-emerald-600 hover:border-emerald-400 transition-all duration-150"
                onMouseEnter={() => setChallengeHovered(true)}
                onMouseLeave={() => setChallengeHovered(false)}
              >
                {isChallengeHovered && (
                  <div className="absolute inset-0 bg-emerald-400/10 animate-sparkle-green"></div>
                )}
                <span className="text-base z-10">🎓</span>
                <span className="text-xs font-bold text-white z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">COMPLETE CHALLENGES</span>
              </div>
            </div>
          ) : (
            /* Standard price footer */
            <div className={`shop-card-footer p-2 flex justify-center items-center overflow-hidden`}>
              {isOwned ? (
                <span className="text-gray-400 text-xs">OWNED</span>
              ) : (
                <motion.div 
                  className={cn(
                    "relative overflow-hidden rounded-md px-4 py-2 flex items-center justify-center transition-all duration-200",
                    isPriceHovered 
                      ? "bg-gradient-to-b from-[#3a3000] to-[#1A1A1A] border-2 border-[#ffd700]/70 shadow-[0_0_12px_rgba(255,215,0,0.6),inset_0_0_8px_rgba(255,215,0,0.4)]" 
                      : "bg-gradient-to-b from-[#252525] to-[#1A1A1A] border-2 border-[#ffd700]/30 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                  )}
                  onMouseEnter={() => setIsPriceHovered(true)}
                  onMouseLeave={() => setIsPriceHovered(false)}
                  style={{ maxWidth: '90%' }}
                  whileHover={{ 
                    y: -3,
                    x: isPriceHovered ? [-1, 1, -1, 1, 0] : 0,
                    transition: { 
                      y: { duration: 0.2 },
                      x: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
                    }
                  }}
                >
                  {isPriceHovered && (
                    <div className="absolute inset-0 bg-[#ffd700]/10 animate-gold-shimmer"></div>
                  )}
                  {/* Price display */}
                  <div className="flex items-center gap-2 z-10">
                    <div className={cn(
                      "transition-all duration-150",
                      isPriceHovered ? "rotate-12 scale-110" : ""
                    )}>
                      <CoinsIcon className={cn(
                        "h-5 w-5 text-[#FFD700] drop-shadow-[0_0_3px_rgba(255,215,0,0.8)]",
                        isPriceHovered && "filter brightness-125"
                      )} />
                    </div>
                    <span className={cn(
                      "font-bold text-base transition-all duration-150 tracking-wide", 
                      isPriceHovered 
                        ? "text-[#ffd700] drop-shadow-[0_0_5px_rgba(255,215,0,0.6)]" 
                        : "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                    )}>
                      {item.price}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Add custom CSS for the animations */}
      <style jsx global>{`
        /* Shop card styling to match main panel */
        .shop-card-outer {
          position: relative;
          transform-style: preserve-3d;
          filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
        }
        
        .shop-card {
          background: linear-gradient(to bottom, #7a5033, #5d3d27);
          border: 3px solid #3d2813;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease;
          /* Add hardware acceleration hint */
          will-change: transform;
        }
        
        /* Simplified hover effect with fewer box-shadows */
        .shop-card:hover {
          box-shadow: 0 6px 16px rgba(0,0,0,0.6);
          border-color: #4a3011;
        }
        
        /* Using border-color instead of box-shadow for rarity indications */
        .shop-card-inner.border-amber-500 {
          border-color: rgba(245, 158, 11, 0.5);
        }
        
        .shop-card-inner.border-blue-500 {
          border-color: rgba(59, 130, 246, 0.5);
        }
        
        .shop-card-inner {
          background: rgba(0,0,0,0.15);
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }
        
        .shop-card-footer {
          background: rgba(0,0,0,0.25);
          border-top: 1px solid rgba(61, 40, 19, 0.8);
          box-shadow: inset 0 3px 6px -3px rgba(0,0,0,0.3);
        }
        
        .shop-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              0deg, /* Horizontal grain instead of 90deg vertical */
              transparent,
              transparent 10px,
              rgba(0,0,0,0.03) 10px,
              rgba(0,0,0,0.03) 20px
            ),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zM4 40H0v-4h4v4zm8 0H8v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }
        
        /* Simplified hover effect with transform instead of gradient animation */
        .shop-card:hover::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          opacity: 0;
          /* Animate only opacity, not background-position */
          animation: fade-in-out 2s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        /* Simplified animations for better performance */
        .animate-gold-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .animate-gold-shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 215, 0, 0.2),
            transparent
          );
          transform: skewX(-25deg);
          animation: slide-right 3s infinite ease-in-out;
        }
        
        @keyframes slide-right {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        
        .animate-sparkle {
          /* Use opacity animation instead of gradient movement */
          position: relative;
        }
        
        .animate-sparkle::after {
          content: "";
          position: absolute;
          inset: 0;
          background-color: rgba(255, 215, 0, 0.1);
          opacity: 0;
          animation: pulse-opacity 3s infinite ease-in-out;
        }
        
        .animate-sparkle-green::after {
          background-color: rgba(72, 187, 120, 0.1);
        }
        
        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        
        .animate-pulse-slow {
          animation: pulse 3s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        .animate-pulse-glow {
          animation: pulseGlow 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
} 