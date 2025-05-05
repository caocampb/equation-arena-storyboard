"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import VictoryXPOverlay from "@/components/overworld/VictoryXPOverlay";

export default function VictoryDemoPage() {
  const { playerStats } = useGameState();
  const [showVictory, setShowVictory] = useState(false);
  
  // Mock data for victory overlay
  const currentTier = 3;
  const currentXP = 175;
  const targetXP = 225;
  
  // Generate some random XP for variety in demo
  const baseXP = Math.floor(Math.random() * 25) + 100; // 100-125 XP
  const distributiveBonus = Math.floor(Math.random() * 10) + 45; // 45-55 XP
  const commutativeBonus = Math.floor(Math.random() * 5) + 23; // 23-28 XP
  
  const xpBreakdown = [
    { type: "Base Victory", amount: baseXP },
    { type: "Distributive Property Bonus", amount: distributiveBonus },
    { type: "Commutative Property Bonus", amount: commutativeBonus }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      {/* Victory XP Overlay */}
      <VictoryXPOverlay 
        show={showVictory}
        onClose={() => setShowVictory(false)}
        currentTier={currentTier}
        currentXP={currentXP}
        targetXP={targetXP}
        xpBreakdown={xpBreakdown}
      />
      
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
          <Link href="/rewards" className="mr-4 btn-press">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">
            VICTORY DEMO
          </h1>
        </div>
        
        <div className="bg-[#132242] rounded-lg p-6 mb-6 border border-[#1D3055] shadow-md">
          <h2 className="text-xl text-white font-semibold mb-4">Battle Victory Simulation</h2>
          
          <p className="text-gray-300 mb-6">
            This demo page simulates winning a battle in Equation Arena and shows the XP reward overlay.
            Click the button below to see what happens when a player wins a battle.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-[#0A1122] rounded-lg p-4 border border-[#1D3055]">
              <h3 className="text-white font-semibold mb-3">XP Breakdown</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex justify-between">
                  <span>Base Victory:</span>
                  <span>{baseXP} XP</span>
                </li>
                <li className="flex justify-between">
                  <span>Distributive Property:</span>
                  <span className="text-[#00C2CB]">+{distributiveBonus} XP</span>
                </li>
                <li className="flex justify-between">
                  <span>Commutative Property:</span>
                  <span className="text-[#00C2CB]">+{commutativeBonus} XP</span>
                </li>
                <li className="flex justify-between font-semibold border-t border-gray-700 pt-2 mt-2">
                  <span>Total XP:</span>
                  <span className="text-white">{baseXP + distributiveBonus + commutativeBonus} XP</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#0A1122] rounded-lg p-4 border border-[#1D3055] flex flex-col">
              <h3 className="text-white font-semibold mb-3">Current Progress</h3>
              <p className="text-gray-300 mb-2">Tier {currentTier}: {currentXP}/{targetXP} XP</p>
              <div className="h-2.5 bg-gray-700 rounded-full mb-4 overflow-hidden">
                <div 
                  className="h-full bg-[#00C2CB]" 
                  style={{ width: `${Math.round((currentXP / targetXP) * 100)}%` }}
                />
              </div>
              
              <p className="text-gray-300 mb-4">
                Need {targetXP - currentXP} more XP to unlock:
                <br />• Free: Simple Particle Effect
                <br />• Premium: Character Backpack
              </p>
              
              <button 
                onClick={() => setShowVictory(true)}
                className="mt-auto bg-[#FFD700] text-[#0A1122] font-bold py-3 px-6 rounded-lg hover:bg-[#FFDF33] transition-colors"
              >
                SHOW VICTORY OVERLAY
              </button>
            </div>
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