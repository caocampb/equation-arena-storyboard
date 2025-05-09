"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrophyIcon, GiftIcon } from "lucide-react";

// Custom coin icon
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

interface HeroPanelProps {
  username: string;
  level: number;
  coins: number;
  xpProgress: number; // 0-100
  achievementCount?: number;
  totalAchievements?: number;
  avatarSrc?: string;
  battlePassTier?: number;
  battlePassXp?: number;
  battlePassTargetXp?: number;
  hasNewRewards?: boolean;
  defaultExpanded?: boolean;
  characterHref?: string;
}

export function HeroPanel({
  username,
  level,
  coins,
  xpProgress,
  achievementCount = 0,
  totalAchievements = 0,
  avatarSrc,
  battlePassTier = 3,
  battlePassXp = 175,
  battlePassTargetXp = 225,
  hasNewRewards = true,
  defaultExpanded = false,
  characterHref = "/character",
}: HeroPanelProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  
  // Calculate battle pass progress percentage
  const battlePassProgress = Math.round((battlePassXp / battlePassTargetXp) * 100);
  
  // Toggle expanded state
  const toggleExpanded = () => setIsExpanded(prev => !prev);
  
  return (
    <>
      {/* Collapsed State */}
      {!isExpanded && (
        <div className="wood-panel-outer">
          <div 
            className="stardew-hero-badge relative"
            onClick={toggleExpanded}
            role="button"
            aria-expanded="false"
            aria-label="Expand player information"
          >
            {/* Corner nails */}
            <div className="nail nail-top-left"></div>
            <div className="nail nail-top-right"></div>
            <div className="nail nail-bottom-left"></div>
            <div className="nail nail-bottom-right"></div>
            
            {/* Inner content container */}
            <div className="stardew-inner-container">
              <div className="flex items-center gap-4 relative z-10">
                {/* Avatar */}
                <Link 
                  href={characterHref} 
                  aria-label="View character" 
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="stardew-avatar-mini flex-shrink-0 cursor-pointer relative group">
                    {/* Glow border overlay that appears on hover */}
                    <div className="absolute -inset-0.5 rounded-lg bg-yellow-400/0 group-hover:bg-yellow-400/80 opacity-0 group-hover:opacity-100 blur-sm transition-all z-0"></div>
                    <Avatar className="h-11 w-11 relative z-10">
                      <AvatarImage src={avatarSrc} alt={username} />
                      <AvatarFallback className="avatar-fallback text-sm">
                        {username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </Link>
                
                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="stardew-username-small truncate max-w-[140px]">{username}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="stardew-level-badge text-xs py-0.5">
                      Lvl {level}
                    </div>
                    <Link href="/shop" aria-label="Visit shop" onClick={(e) => e.stopPropagation()}>
                      <div className="stardew-coin-indicator group relative">
                        <CoinsIcon className="h-3 w-3 mr-1 text-yellow-300" />
                        <span className="text-xs">{coins}</span>
                        <div className="fixed-tooltip text-[10px] -bottom-5">Shop</div>
                      </div>
                    </Link>
                  </div>
                </div>
                
                {/* Expansion indicator */}
                <div className="stardew-arrow text-amber-200 flex-shrink-0">▼</div>
              </div>
              
              {/* Mini XP bar for collapsed view */}
              <div className="mt-2 px-1">
                <div className="stardew-mini-progress-container h-1.5 overflow-hidden">
                  <div 
                    className="stardew-mini-progress-bar h-full" 
                    style={{ width: `${xpProgress}%` }}
                    title={`XP: ${xpProgress}/100`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Expanded State */}
      {isExpanded && (
        <div className="wood-panel-outer">
          <div className="stardew-hero-panel relative">
            {/* Corner nails */}
            <div className="nail nail-top-left"></div>
            <div className="nail nail-top-right"></div>
            <div className="nail nail-bottom-left"></div>
            <div className="nail nail-bottom-right"></div>
            
            {/* Inner content wrapper - matched to collapsed state */}
            <div className="stardew-inner-wrapper">
              {/* Header with collapse button - inner container */}
              <div className="stardew-inner-header"
                role="button"
                aria-expanded="true"
                aria-label="Collapse player information"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link href={characterHref} aria-label="View character">
                      <div className="stardew-avatar flex-shrink-0 cursor-pointer relative group">
                        {/* Glow border overlay that appears on hover */}
                        <div className="absolute -inset-0.5 rounded-lg bg-yellow-400/0 group-hover:bg-yellow-400/80 opacity-0 group-hover:opacity-100 blur-sm transition-all z-0"></div>
                        <Avatar className="h-12 w-12 relative z-10">
                          <AvatarImage src={avatarSrc} alt={username} />
                          <AvatarFallback className="avatar-fallback text-lg">
                            {username.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </Link>
                    
                    <div className="ml-3" onClick={toggleExpanded}>
                      <h3 className="stardew-username font-medium">{username}</h3>
                      <div className="stardew-level-badge inline-block">
                        Level {level}
                      </div>
                    </div>
                  </div>
                  
                  {/* Collapse indicator */}
                  <div className="stardew-arrow text-amber-200" onClick={toggleExpanded}>▲</div>
                </div>
              </div>
              
              {/* Expanded Content - inner container */}
              <div className="stardew-inner-content animate-slideDown">
                {/* Detailed XP Progress */}
                <div className="mb-3">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span>Experience</span>
                    <div className="flex items-center">
                      <span className="text-amber-200">{xpProgress}/100</span>
                    </div>
                  </div>
                  <div className="stardew-progress-container w-full overflow-hidden">
                    <div 
                      className="stardew-progress-bar h-full" 
                      style={{ width: `${xpProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Stats row */}
                <div className="flex items-center gap-3 justify-between">
                  {/* Achievements - updated to Link */}
                  {achievementCount > 0 && (
                    <Link 
                      href="/collections" 
                      className="stardew-stat-badge group relative"
                    >
                      <TrophyIcon className="h-4 w-4 mr-1.5" />
                      <span className="font-medium">
                        {achievementCount}/{totalAchievements}
                      </span>
                      
                      {/* Achievement tooltip */}
                      <div className="fixed-tooltip">
                        View Collections
                      </div>
                    </Link>
                  )}
                  
                  {/* Battle Pass Badge */}
                  <Link 
                    href="/rewards" 
                    className="stardew-pass-badge group relative"
                  >
                    <div className="relative">
                      <GiftIcon className="h-4 w-4 mr-1.5" />
                      {hasNewRewards && (
                        <span className="absolute -top-1 right-0 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium">Tier {battlePassTier}</span>
                        <span className="mx-1 opacity-70">•</span>
                        <span className="text-xs">{battlePassXp}/{battlePassTargetXp}</span>
                      </div>
                      <div className="stardew-mini-progress-container mt-0.5 overflow-hidden">
                        <div
                          className="stardew-mini-progress-bar h-full"
                          style={{ width: `${battlePassProgress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Tooltip - Updated z-index */}
                    <div className="fixed-tooltip">
                      View Battle Pass
                    </div>
                  </Link>
                  
                  {/* Coins Badge */}
                  <Link 
                    href="/shop" 
                    className="stardew-coin-badge group relative"
                  >
                    <CoinsIcon className="h-4 w-4 mr-1.5 text-yellow-300" />
                    <span className="font-bold">{coins}</span>
                    
                    {/* Shop tooltip */}
                    <div className="fixed-tooltip">
                      Shop
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stardew Valley-inspired CSS */}
      <style jsx global>{`
        /* Collapsed badge styling */
        .stardew-hero-badge {
          background: linear-gradient(to bottom, #8b5e3c, #6d472c);
          border: 4px solid #3d2813;
          box-shadow: 0 0 0 1px #67492f, 0 6px 15px rgba(0,0,0,0.5);
          border-radius: 12px;
          color: #f2e9db;
          position: relative;
          overflow: hidden;
          padding: 7px;
          max-width: max-content;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        /* Expanded state panel */
        .stardew-hero-panel {
          background: linear-gradient(to bottom, #8b5e3c, #6d472c);
          border: 4px solid #3d2813;
          box-shadow: 0 0 0 1px #67492f, 0 6px 15px rgba(0,0,0,0.5);
          border-radius: 12px;
          color: #f2e9db;
          position: relative;
          overflow: hidden;
          padding: 7px;
          width: 100%;
          max-width: 380px;
        }
        
        /* Inner content container */
        .stardew-inner-container, .stardew-inner-wrapper {
          background: rgba(0,0,0,0.15);
          border-radius: 8px;
          border: 1px solid #3d2813;
          position: relative;
        }
        
        .stardew-inner-container {
          padding: 10px 14px;
        }
        
        .stardew-inner-wrapper {
          overflow: hidden; /* Ensures inner children respect border radius */
        }
        
        /* Inner containers for expanded state */
        .stardew-inner-header {
          padding: 10px 12px;
          cursor: pointer;
          border-bottom: 2px solid #3d2813;
          background: rgba(0,0,0,0.15);
          transition: background 0.2s;
          position: relative;
        }
        
        .stardew-inner-header:hover {
          background: rgba(0,0,0,0.25);
        }
        
        .stardew-inner-content {
          background: rgba(0,0,0,0.05);
          padding: 10px 12px;
          position: relative;
        }
        
        .stardew-hero-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 0 1px #67492f, 0 6px 15px rgba(0,0,0,0.5);
        }
        
        .stardew-hero-badge::before, 
        .stardew-hero-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 12px,
              rgba(0,0,0,0.035) 12px,
              rgba(0,0,0,0.035) 24px
            ),
            url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h-4v-4h4v4zm0-8h-4v-4h4v4zm0-8h-4v-4h4v4zM4 40H0v-4h4v4zm8 0H8v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4z' fill='%23000000' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.7;
        }
        
        /* Corner nail decorations */
        .nail {
          position: absolute;
          width: 8px;
          height: 8px;
          background: #2a1a0a;
          border-radius: 50%;
          border: 1px solid #ffd37a;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,0.5);
          z-index: 10;
          pointer-events: none;
        }
        
        .nail::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 1px;
          width: 3px;
          height: 2px;
          background: rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: rotate(30deg);
        }
        
        /* Fixed nail positioning to ensure they're visible in ESC menu */
        .nail-top-left { top: 8px; left: 8px; }
        .nail-top-right { top: 8px; right: 8px; }
        .nail-bottom-left { bottom: 8px; left: 8px; }
        .nail-bottom-right { bottom: 8px; right: 8px; }
        
        /* Avatar styling */
        .stardew-avatar, .stardew-avatar-mini {
          position: relative;
          background: rgba(0,0,0,0.2);
          border-radius: 8px;
          padding: 3px;
          border: 2px solid #3d2813;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
        }
        
        .stardew-avatar-mini {
          border-width: 1px;
          padding: 2px;
        }
        
        .avatar-fallback {
          background: #5a3921;
          color: #f2e9db;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 600;
        }
        
        /* Username styling - using system fonts for consistency */
        .stardew-username {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #f8e4bc;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
        }
        
        .stardew-username-small {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 15px;
          font-weight: 600;
          color: #f8e4bc;
          text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
        }
        
        /* Level badge */
        .stardew-level-badge {
          background: #5a3921;
          color: #f2e9db;
          padding: 1px 6px;
          border-radius: 3px;
          font-size: 11px;
          border: 1px solid #3d2813;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        }
        
        /* Progress bar */
        .stardew-progress-container {
          background: rgba(0,0,0,0.3);
          height: 6px;
          border-radius: 3px;
          border: 1px solid #3d2813;
        }
        
        .stardew-progress-bar {
          background: linear-gradient(to right, #ffd700, #ffc000);
          border-radius: 3px;
        }
        
        /* Mini progress bar (for battle pass) */
        .stardew-mini-progress-container {
          background: rgba(0,0,0,0.3);
          height: 4px;
          width: 100%;
          border-radius: 2px;
          border: 1px solid #3d2813;
          position: relative;
        }
        
        .stardew-mini-progress-bar {
          background: linear-gradient(to right, #ffd700, #ffc000);
          border-radius: 2px;
          box-shadow: 0 0 4px rgba(255, 215, 0, 0.3);
        }
        
        /* Coin indicator for collapsed view - added hover effect */
        .stardew-coin-indicator {
          display: flex;
          align-items: center;
          gap: 2px;
          color: #f2e9db;
          padding: 1px 4px;
          border-radius: 3px;
          transition: all 0.2s;
          background: #5a3921;
          border: 1px solid #3d2813;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        }
        
        .stardew-coin-indicator:hover {
          background: rgba(255, 215, 0, 0.15);
          transform: translateY(-1px);
        }
        
        /* Arrow indicator */
        .stardew-arrow {
          font-size: 12px;
          animation: slight-bounce 2s infinite ease-in-out;
        }
        
        @keyframes slight-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        
        /* Stat badges */
        .stardew-stat-badge, .stardew-pass-badge, .stardew-coin-badge {
          background: #5a3921;
          display: flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 5px;
          font-size: 12px;
          border: 1px solid #3d2813;
          box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          color: #f2e9db;
          transition: all 0.2s;
        }
        
        /* Unified hover effects for all badges */
        .stardew-pass-badge:hover,
        .stardew-stat-badge:hover,
        .stardew-coin-badge:hover {
          background: #704c2a;
          transform: translateY(-1px);
          box-shadow: 0 2px 5px rgba(0,0,0,0.2), inset 0 0 5px rgba(0,0,0,0.2);
        }
        
        /* Animation for expanding content */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        
        /* Battle Pass tooltip fix */
        .stardew-pass-badge, .stardew-stat-badge, .stardew-coin-badge {
          position: relative;
          isolation: isolate; /* Create stacking context */
        }
        
        .fixed-tooltip {
          position: absolute;
          bottom: -7px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #5a3921;
          color: #f2e9db;
          text-align: center;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 11px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          border: 1px solid #3d2813;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          z-index: 100; /* Ensure high z-index */
        }
        
        .stardew-pass-badge:hover .fixed-tooltip,
        .stardew-stat-badge:hover .fixed-tooltip,
        .stardew-coin-badge:hover .fixed-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(2px);
        }
      `}</style>
    </>
  );
} 