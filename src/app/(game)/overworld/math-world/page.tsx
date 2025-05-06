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
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      
      {/* Section containing Header, Hero Panel, and Stats - Constrained Width */}
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Header with Back Navigation */}
        <div className="flex items-center mb-4">
          <Link href="/overworld" className="mr-4 btn-press">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-2xl font-display font-bold text-white">
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
        
        {/* World Progress Stats */}
        <div className="mt-4 bg-[#132242] rounded-lg p-4 text-white">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">World Progress</h2>
            <span className="text-sm text-[#00C2CB]">
              {mathWorld.completionPercentage}% Complete
            </span>
          </div>
          
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#00C2CB]" 
              style={{ width: `${mathWorld.completionPercentage}%` }}
            />
          </div>
          
          <div className="mt-2 text-sm text-gray-300">
            {mathWorld.activitiesCompleted} of {mathWorld.totalActivities} Activities Completed
          </div>
        </div>
      </div>
      
      {/* Math World Graph */}
      <main className="flex-1 w-full max-w-4xl mx-auto">
        <div className="p-4">
          <MathWorldGraph />
        </div>
      </main>
      
      {/* Bottom Tab Navigation */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          {/* TabNavigation removed - Now using ESC menu (press ESC key) */}
        </div>
      </div>
      
      {/* ESC Menu Hint */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#0A1122]/60 backdrop-blur-sm border-t border-[#1D3055]/50 z-10">
        <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
          <kbd className="px-1.5 py-0.5 bg-[#132242]/80 rounded border border-[#1D3055]/70 text-[#00C2CB] text-xs">ESC</kbd>
          <span>Press to access menu</span>
        </div>
      </div>
    </div>
  );
} 