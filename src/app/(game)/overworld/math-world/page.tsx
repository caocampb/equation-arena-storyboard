"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { ArrowLeftIcon } from "lucide-react";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import MathWorldGraph from "@/components/overworld/MathWorldGraph";
import { useGameState } from "@/context/GameStateContext";

export default function MathWorld() {
  const router = useRouter();
  const { activeTab, setActiveTab, playerStats, worlds, setActiveWorld } = useGameState();
  const mathWorld = worlds["math-world"];
  
  // Set active world and tab on mount
  useEffect(() => {
    setActiveWorld("math-world");
    setActiveTab("play");
  }, [setActiveWorld, setActiveTab]);
  
  // Handle tab navigation
  useEffect(() => {
    if (activeTab === "rewards") {
      router.push("/rewards");
    }
  }, [activeTab, router]);
  
  return (
    <div className="min-h-screen shop-background flex flex-col items-start" style={{ background: "linear-gradient(to bottom, #9b8b76, #7d6c5c)" }}>
      {/* Shared container for consistent alignment */}
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Hero Panel Container */}
        <div className="w-full">
          {/* Header with Back Navigation */}
          <div className="flex items-center mb-4">
            <Link href="/overworld" className="mr-4 btn-press relative group">
              <div className="absolute inset-0 bg-[#5a3921] rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <ArrowLeftIcon className="h-6 w-6 text-[#f8e4bc]" />
            </Link>
            <h1 className="text-2xl font-display font-bold text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              Math World
            </h1>
          </div>
          
          {/* Hero Panel */}
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
          
          {/* World Progress Stats */}
          <div className="mt-4 bg-[#5a3921]/60 rounded-lg p-4 text-[#f8e4bc] border border-[#3d2813] shadow-inner relative overflow-hidden">
            {/* Wood grain pattern */}
            <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
            
            <div className="flex items-center justify-between mb-2 relative z-10">
              <h2 className="font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">World Progress</h2>
              <span className="text-sm text-[#FFD700] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                {mathWorld.completionPercentage}% Complete
              </span>
            </div>
            
            <div className="h-2 bg-[#3d2813]/70 rounded-full overflow-hidden relative z-10">
              <div 
                className="h-full bg-[#FFD700]" 
                style={{ width: `${mathWorld.completionPercentage}%` }}
              />
            </div>
            
            <div className="mt-2 text-sm text-[#f8e4bc]/80 relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              {mathWorld.activitiesCompleted} of {mathWorld.totalActivities} Activities Completed
            </div>
          </div>
          
          {/* Math World Graph */}
          <div className="p-4">
            <MathWorldGraph />
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
      `}</style>
    </div>
  );
} 