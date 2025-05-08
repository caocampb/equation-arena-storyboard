"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CheckIcon, XIcon, CrownIcon } from "lucide-react";
import { motion } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

// Skill tracking data
type SkillState = "not-started" | "in-progress" | "mastered";

interface Skill {
  id: string;
  name: string;
  state: SkillState;
  enemy: string;
  progress: number; // 0-100
  properties?: string[];
}

export default function SkillsPage() {
  const { playerStats } = useGameState();
  const [isClient, setIsClient] = useState(false);
  
  // Sample skill data - would come from backend in production
  const skills: Skill[] = [
    { 
      id: "order-operations", 
      name: "Order of Operations", 
      state: "mastered", 
      enemy: "Order Keeper Enemy",
      progress: 100,
      properties: ["Distributive Property"]
    },
    { 
      id: "benchmark-fractions", 
      name: "Benchmark Fractions", 
      state: "in-progress", 
      enemy: "Fraction Fiend Enemy",
      progress: 45 
    },
    { 
      id: "decimal-place", 
      name: "Decimal Place Value", 
      state: "not-started", 
      enemy: "Decimal Demon Enemy",
      progress: 0 
    },
  ];

  // Set client-side state safely
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to get appropriate icon for skill state
  const getStateIcon = (state: SkillState) => {
    switch (state) {
      case "mastered":
        return <CheckIcon className="h-5 w-5 text-[#00C2CB]" />;
      case "in-progress":
        return <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />;
      case "not-started":
        return <XIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  // Helper to get text label for state
  const getStateLabel = (state: SkillState) => {
    switch (state) {
      case "mastered":
        return "MASTERED";
      case "in-progress":
        return "IN PROGRESS";
      case "not-started":
        return "NOT STARTED";
    }
  };

  // Helper to get color class for state
  const getStateColor = (state: SkillState) => {
    switch (state) {
      case "mastered":
        return "bg-[#00C2CB]";
      case "in-progress":
        return "bg-yellow-400";
      case "not-started":
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-start">
      {/* Shared container for consistent alignment */}
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Hero Panel container */}
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
        
        {/* Main content area */}
        <div className="flex-1 w-full mt-4">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Link href="/rewards" className="mr-4 btn-press">
              <ArrowLeftIcon className="h-6 w-6 text-white" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-white tracking-wide">
              MATH SKILLS
            </h1>
          </div>
          
          {/* Skill Progress Section */}
          <div className="bg-[#132242] rounded-lg p-6 mb-6 border border-[#1D3055] shadow-md">
            <h2 className="font-semibold text-white text-lg mb-4">SKILL PROGRESS</h2>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStateIcon(skill.state)}
                    <h3 className="text-white font-medium">{skill.name}</h3>
                    <div className={cn(
                      "text-xs px-2 py-0.5 rounded-full ml-auto",
                      skill.state === "mastered" ? "bg-[#00C2CB]/20 text-[#00C2CB]" : 
                      skill.state === "in-progress" ? "bg-yellow-400/20 text-yellow-400" : 
                      "bg-gray-700 text-gray-400"
                    )}>
                      {getStateLabel(skill.state)}
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isClient ? `${skill.progress}%` : "0%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={cn("h-full", getStateColor(skill.state))}
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="text-sm text-gray-300 space-y-1 pl-1">
                    {skill.state !== "not-started" && (
                      <div className="flex items-start">
                        <span className={cn(
                          "inline-block w-4 text-xs mr-2",
                          skill.state === "mastered" ? "text-[#00C2CB]" : "text-yellow-400"
                        )}>
                          {skill.state === "mastered" ? "✓" : "⟳"}
                        </span>
                        <span>
                          {skill.state === "mastered" ? "Defeated" : "Attempted"} {skill.enemy}
                        </span>
                      </div>
                    )}
                    
                    {skill.state === "mastered" && skill.properties?.map((property, index) => (
                      <div key={index} className="flex items-start">
                        <span className="inline-block w-4 text-xs mr-2 text-[#00C2CB]">✓</span>
                        <span>Used {property}</span>
                      </div>
                    ))}
                    
                    {skill.state === "in-progress" && (
                      <div className="flex items-start">
                        <span className="inline-block w-4 text-xs mr-2 text-gray-500">✗</span>
                        <span>Not yet defeated</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* XP Bonuses Section */}
          <div className="bg-[#132242] rounded-lg p-6 mb-6 border border-[#1D3055] shadow-md">
            <h2 className="font-semibold text-white text-lg mb-4">PROPERTY BONUSES</h2>
            
            <p className="text-gray-300 mb-4">Using math properties gives XP bonuses:</p>
            
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="text-[#00C2CB] text-lg">•</span>
                <span>Distributive property:</span>
                <span className="text-[#00C2CB] font-semibold">+50 XP</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00C2CB] text-lg">•</span>
                <span>Commutative property:</span>
                <span className="text-[#00C2CB] font-semibold">+25 XP</span>
              </li>
            </ul>
          </div>
          
          {/* Special Reward Banner */}
          <div className="bg-gradient-to-r from-[#3A1C61] to-[#121B40] rounded-lg p-5 border border-[#6A49A8] shadow-md flex items-center justify-between">
            <div className="flex items-center">
              <CrownIcon className="h-8 w-8 text-[#FFD700] mr-3" />
              <div>
                <h3 className="text-white font-bold">MASTERING ALL SKILLS UNLOCKS SPECIAL REWARD</h3>
                <p className="text-gray-300 text-sm">Complete all three skill challenges to discover the reward</p>
              </div>
            </div>
            <div className="text-lg font-bold text-[#FFD700]">1/3</div>
          </div>
        </div>
      </div>
      
      {/* Bottom tab navigation */}
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