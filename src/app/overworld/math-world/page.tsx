"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { TabNavigation } from "@/components/overworld/TabNavigation";
import MathWorldGraph from "@/components/overworld/MathWorldGraph";
import { useGameState } from "@/context/GameStateContext";

export default function MathWorld() {
  const { activeTab, setActiveTab, playerStats, worlds, setActiveWorld } = useGameState();
  const mathWorld = worlds["math-world"];
  
  // Set active world on mount
  useEffect(() => {
    setActiveWorld("math-world");
  }, [setActiveWorld]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      
      {/* Section containing Header, Hero Panel, and Stats - Constrained Width */}
      <div className="w-full max-w-4xl px-4 pt-4">
      
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-white">
            <Link href="/overworld" className="p-1.5 rounded-full hover:bg-[#1A73E8]/20 transition-all btn-press">
              <ArrowLeftIcon className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-display font-bold tracking-wide">MATH WORLD</h1>
          </div>
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
        
        {/* World Stats */}
        <div className="px-2 py-4 text-white">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <span className="text-[#CCCCCC] font-medium">◆ COMPLETED:</span>
              <span className="font-bold text-sm">{mathWorld.activitiesCompleted}/{mathWorld.totalActivities}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#CCCCCC] font-medium">◆ COINS EARNED:</span>
              <span className="font-bold text-sm">85</span>
            </div>
          </div>
        </div>

      </div>
      
      {/* Main Content - Game Selection */}
      <main className="flex-1 relative flex flex-col items-center justify-center overflow-hidden p-4 w-full">
        <div className="relative w-full max-w-3xl mx-auto">
          <MathWorldGraph />
        </div>
      </main>
      
      {/* Bottom Tab Navigation - constrained to match other elements */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
} 