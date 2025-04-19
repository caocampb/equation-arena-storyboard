"use client";

import { HeroPanel } from "@/components/overworld/HeroPanel";
import { TabNavigation } from "@/components/overworld/TabNavigation";
import SimpleOverworldGraph from "@/components/overworld/SimpleOverworldGraph";
import { useGameState } from "@/context/GameStateContext";

export default function Overworld() {
  const { activeTab, setActiveTab, playerStats } = useGameState();
  
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