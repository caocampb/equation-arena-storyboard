"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import SimpleOverworldGraph from "@/components/overworld/SimpleOverworldGraph";
import { useGameState } from "@/context/GameStateContext";

export default function Overworld() {
  const router = useRouter();
  const { activeTab, setActiveTab, playerStats } = useGameState();
  
  // Set active tab on component mount
  useEffect(() => {
    setActiveTab("play");
  }, [setActiveTab]);
  
  // Handle tab navigation
  useEffect(() => {
    if (activeTab === "rewards") {
      router.push("/rewards");
    }
  }, [activeTab, router]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      {/* Hero Panel Container - Added max-width and centering */}
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
      
      {/* Main Content Area - Worlds Map */}
      <main className="flex-1 relative p-4 flex flex-col items-center justify-center overflow-hidden w-full">
        <div className="relative w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center tracking-wide">
            Select Your World
          </h2>
          
          {/* World Nodes with stable HTML/CSS implementation */}
          <div className="mb-8">
            <SimpleOverworldGraph />
          </div>
          
          {/* Play Button removed - User navigates through Math World */}
        </div>
      </main>
      
      {/* Bottom Tab Navigation removed - Now using ESC menu */}
      {/* Press ESC key to access menu */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#0A1122]/60 backdrop-blur-sm border-t border-[#1D3055]/50 z-10">
        <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
          <kbd className="px-1.5 py-0.5 bg-[#132242]/80 rounded border border-[#1D3055]/70 text-[#00C2CB] text-xs">ESC</kbd>
          <span>Press to access menu</span>
        </div>
      </div>
    </div>
  );
} 