"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, RotateCwIcon, ZapIcon, SparklesIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

// Character stats type for display
interface CharacterStat {
  name: string;
  value: number;
  max: number;
  icon: React.ReactNode;
}

// Inventory item type
interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: "skin" | "effect" | "accessory";
  rarity: "common" | "rare" | "epic" | "legendary";
  equipped: boolean;
  locked: boolean;
  image: string;
}

export default function CharacterPage() {
  const { playerStats, hasPremium } = useGameState();
  const [activeTab, setActiveTab] = useState<"skins" | "effects" | "accessories">("skins");
  const [isRotating, setIsRotating] = useState(false);
  const [showingBack, setShowingBack] = useState(false);
  const [showItemDetail, setShowItemDetail] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [equippedItems, setEquippedItems] = useState<{[key: string]: string}>({
    skin: "default_skin",
    effect: "none",
    headAccessory: "none",
    backAccessory: "none",
  });
  
  // Mock character stats
  const characterStats: CharacterStat[] = [
    { 
      name: "Speed", 
      value: 65, 
      max: 100, 
      icon: <ZapIcon className="h-4 w-4 text-yellow-400" /> 
    },
    { 
      name: "Defense", 
      value: 40, 
      max: 100, 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-400">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg> 
    },
    { 
      name: "Special", 
      value: 75, 
      max: 100, 
      icon: <SparklesIcon className="h-4 w-4 text-purple-400" /> 
    }
  ];
  
  // Mock inventory data
  const inventoryItems: InventoryItem[] = [
    {
      id: "default_skin",
      name: "Default Adventurer",
      description: "Your trusty default appearance",
      type: "skin",
      rarity: "common",
      equipped: true,
      locked: false,
      image: "👤"
    },
    {
      id: "math_wizard",
      name: "Math Wizard",
      description: "Master of equations and formulas",
      type: "skin",
      rarity: "rare",
      equipped: false,
      locked: false,
      image: "🧙"
    },
    {
      id: "robot_skin",
      name: "Math Bot 3000",
      description: "A futuristic robot appearance",
      type: "skin",
      rarity: "epic",
      equipped: false,
      locked: !hasPremium,
      image: "🤖"
    },
    {
      id: "sparkle_effect",
      name: "Sparkle Trail",
      description: "Leave a trail of sparkles when you move",
      type: "effect",
      rarity: "rare",
      equipped: false,
      locked: false,
      image: "✨"
    },
    {
      id: "number_effect",
      name: "Number Rain",
      description: "Numbers occasionally rain around you",
      type: "effect",
      rarity: "epic",
      equipped: false,
      locked: !hasPremium,
      image: "🔢"
    },
    {
      id: "wizard_hat",
      name: "Wizard Hat",
      description: "A pointed hat that grants wisdom",
      type: "accessory",
      rarity: "rare",
      equipped: false,
      locked: false,
      image: "🎩"
    },
    {
      id: "backpack",
      name: "Explorer's Backpack",
      description: "Store your math tools for adventure",
      type: "accessory",
      rarity: "rare",
      equipped: false,
      locked: false,
      image: "🎒"
    },
    {
      id: "crown",
      name: "Crown of Equations",
      description: "A royal crown for math masters",
      type: "accessory",
      rarity: "legendary",
      equipped: false,
      locked: !hasPremium,
      image: "👑"
    }
  ];
  
  // Filter items by active tab
  const filteredItems = inventoryItems.filter(item => {
    if (activeTab === "skins") return item.type === "skin";
    if (activeTab === "effects") return item.type === "effect";
    return item.type === "accessory";
  });
  
  // Handle item selection
  const handleItemClick = (itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (item?.locked) return;
    setShowItemDetail(itemId);
  };
  
  // Handle equipping an item
  const handleEquipItem = (itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item || item.locked) return;
    
    let itemSlot = "";
    if (item.type === "skin") itemSlot = "skin";
    else if (item.type === "effect") itemSlot = "effect";
    else itemSlot = item.id.includes("hat") || item.id.includes("crown") ? "headAccessory" : "backAccessory";
    
    setEquippedItems(prev => ({
      ...prev,
      [itemSlot]: itemId
    }));
    
    setShowItemDetail(null);
  };
  
  // Handle unequipping an item
  const handleUnequipItem = (itemId: string) => {
    const item = inventoryItems.find(i => i.id === itemId);
    if (!item) return;
    
    let itemSlot = "";
    if (item.type === "skin") return; // Cannot unequip skins, must switch to another
    else if (item.type === "effect") itemSlot = "effect";
    else itemSlot = item.id.includes("hat") || item.id.includes("crown") ? "headAccessory" : "backAccessory";
    
    setEquippedItems(prev => ({
      ...prev,
      [itemSlot]: "none"
    }));
    
    setShowItemDetail(null);
  };
  
  // Get currently equipped skin
  const getEquippedSkin = () => {
    const skin = inventoryItems.find(item => item.id === equippedItems.skin);
    return skin?.image || "👤";
  };
  
  // Get equipped head accessory
  const getEquippedHeadAccessory = () => {
    const acc = inventoryItems.find(item => item.id === equippedItems.headAccessory);
    return acc?.image || "";
  };
  
  // Get equipped effect
  const getEquippedEffect = () => {
    const effect = inventoryItems.find(item => item.id === equippedItems.effect);
    return effect?.id || "none";
  };
  
  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "text-gray-400";
      case "rare": return "text-[#00C2CB]";
      case "epic": return "text-purple-400";
      case "legendary": return "text-[#FFD700]";
      default: return "text-gray-400";
    }
  };
  
  // Handle character rotation (front/back toggle)
  const handleRotate = () => {
    // Simple toggle between front and back
    setShowingBack(!showingBack);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
      {/* Fortnite-inspired Premium Upgrade Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPremiumModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-[#5433D6] via-[#3066BE] to-[#116699] rounded-xl p-6 max-w-md w-full relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Animated background elements */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full opacity-20"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Top line flash */}
              <motion.div 
                className="absolute top-0 left-0 right-0 h-1 bg-yellow-400"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              
              {/* Animated confetti elements */}
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="absolute w-2 h-2 rounded-sm"
                  style={{
                    background: ['#FF9800', '#FFEB3B', '#4CAF50', '#2196F3', '#9C27B0'][Math.floor(Math.random() * 5)],
                    top: -20,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, window.innerHeight],
                    x: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, Math.random() * 360],
                    opacity: [1, 0.7, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
              
              {/* Modal Content */}
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl"
                  >
                    👑
                  </motion.div>
                </div>
                
                <motion.h2 
                  className="text-3xl font-bold text-white text-center mb-2 uppercase tracking-wider"
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-yellow-300">LEVEL UP</span> YOUR JOURNEY!
                </motion.h2>
                
                <div className="bg-black/30 rounded-lg p-4 mb-6 border border-yellow-500/50">
                  <p className="text-white text-center mb-4">
                    Unlock your full potential with <span className="text-yellow-300 font-bold">PREMIUM</span> and join thousands of math champions!
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center">
                      <div className="bg-yellow-400 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white text-sm">Exclusive character skins and effects</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-400 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white text-sm">Legendary accessories for your character</p>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-yellow-400 rounded-full p-1 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-white text-sm">Double XP boosts and special math powers</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.05, 1],
                        y: [0, -3, 0]
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 text-black font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
                    >
                      EPIC MATH VICTORY AWAITS!
                    </motion.div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 flex-1 rounded-lg transition-all transform hover:scale-105 active:scale-95 uppercase tracking-wide"
                  >
                    UPGRADE NOW
                  </button>
                  <button 
                    onClick={() => setShowPremiumModal(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-3 px-5 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    LATER
                  </button>
                </div>
                
                <div className="text-xs text-center text-white/70 mt-4">
                  *Subscription can be canceled at any time
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={() => setShowPremiumModal(false)}
                className="absolute top-2 right-2 text-white/80 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Link href="/overworld" className="mr-4 btn-press">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">
            CHARACTER
          </h1>
        </div>
        
        {/* Character and Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Character Preview Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Character Preview */}
            <div className="bg-[#132242] rounded-lg p-6 border border-[#1D3055] shadow-md h-80 relative overflow-hidden flex flex-col items-center justify-center">
              {/* Rotate button */}
              <button 
                onClick={handleRotate}
                className="absolute top-3 right-3 bg-[#0A1122] p-2 rounded-full hover:bg-[#1D3055] transition-colors"
              >
                <RotateCwIcon className="h-5 w-5 text-white" />
              </button>
              
              {/* Character display with motion */}
              <motion.div 
                className="text-8xl relative flex items-center justify-center"
                animate={{ 
                  rotateY: showingBack ? 180 : 0,
                  opacity: showingBack ? 0.7 : 1 
                }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeInOut"
                }}
              >
                {getEquippedSkin()}
                
                {/* Head accessory - only visible from front */}
                {equippedItems.headAccessory !== "none" && !showingBack && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl">
                    {getEquippedHeadAccessory()}
                  </div>
                )}
                
                {/* Back accessory - visible from both sides but more prominent in back view */}
                {equippedItems.backAccessory !== "none" && (
                  <div className={`absolute -bottom-2 ${showingBack ? "left-2 -translate-x-1/4" : "right-2 translate-x-1/4"} text-4xl transition-all duration-500`}>
                    {inventoryItems.find(item => item.id === equippedItems.backAccessory)?.image}
                  </div>
                )}
                
                {/* Special effects */}
                {equippedItems.effect !== "none" && (
                  <div className="absolute inset-0 pointer-events-none">
                    <AnimatePresence>
                      {equippedItems.effect === "sparkle_effect" && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              initial={{ 
                                x: 0, 
                                y: 0,
                                opacity: 0 
                              }}
                              animate={{ 
                                x: Math.random() * 120 - 60,
                                y: Math.random() * 120 - 60,
                                opacity: [0, 1, 0],
                                scale: [0.5, 1, 0.5]
                              }}
                              transition={{ 
                                repeat: Infinity,
                                duration: 2 + Math.random(),
                                delay: Math.random() * 2
                              }}
                            >
                              <span className="text-lg">✨</span>
                            </motion.div>
                          ))}
                        </>
                      )}
                      
                      {equippedItems.effect === "number_effect" && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              initial={{ 
                                y: -20,
                                x: Math.random() * 120 - 60,
                                opacity: 0
                              }}
                              animate={{ 
                                y: 120,
                                opacity: [0, 1, 0],
                                rotate: Math.random() * 180 - 90
                              }}
                              transition={{ 
                                repeat: Infinity,
                                duration: 3 + Math.random() * 2,
                                delay: Math.random() * 5
                              }}
                            >
                              <span className="text-lg text-[#00C2CB]">
                                {Math.floor(Math.random() * 9) + 1}
                              </span>
                            </motion.div>
                          ))}
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
              
              <p className="text-white font-medium mt-4">
                {inventoryItems.find(item => item.id === equippedItems.skin)?.name || "Default Character"} 
                {showingBack ? " (Back)" : ""}
              </p>
              
              {/* Custom environment background gradient */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A1122] to-transparent opacity-80" />
            </div>
            
            {/* Character Stats */}
            <div className="bg-[#132242] rounded-lg p-6 border border-[#1D3055] shadow-md">
              <h2 className="text-white font-semibold mb-4">CHARACTER STATS</h2>
              
              <div className="space-y-4">
                {characterStats.map((stat) => (
                  <div key={stat.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {stat.icon}
                        <span className="text-gray-300">{stat.name}</span>
                      </div>
                      <span className="text-white font-medium">{stat.value}/{stat.max}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full",
                          stat.name === "Speed" ? "bg-yellow-400" :
                          stat.name === "Defense" ? "bg-blue-400" : "bg-purple-400"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-[#1D3055]">
                <p className="text-gray-300 text-sm">
                  Equip different skins and accessories to change your stats!
                </p>
              </div>
            </div>
          </div>
          
          {/* Inventory Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Inventory Tabs */}
            <div className="bg-[#132242] rounded-lg p-4 border border-[#1D3055] shadow-md">
              <div className="flex p-1 bg-[#0A1122] rounded-lg mb-4">
                <button
                  onClick={() => setActiveTab("skins")}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    activeTab === "skins" 
                      ? "bg-[#00C2CB] text-[#0A1122]" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  SKINS
                </button>
                <button
                  onClick={() => setActiveTab("effects")}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    activeTab === "effects" 
                      ? "bg-[#00C2CB] text-[#0A1122]" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  EFFECTS
                </button>
                <button
                  onClick={() => setActiveTab("accessories")}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                    activeTab === "accessories" 
                      ? "bg-[#00C2CB] text-[#0A1122]" 
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  ACCESSORIES
                </button>
              </div>
              
              {/* Inventory Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "bg-[#0A1122] rounded-lg p-3 border cursor-pointer relative flex flex-col items-center",
                      item.equipped ? "border-[#00C2CB]" : "border-[#1D3055]",
                      item.locked ? "opacity-60 cursor-not-allowed" : ""
                    )}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <div className="text-4xl mb-2">{item.image}</div>
                    <p className={cn(
                      "text-sm font-medium text-center truncate w-full",
                      getRarityColor(item.rarity)
                    )}>
                      {item.name}
                    </p>
                    
                    {/* Equipped indicator */}
                    {equippedItems[
                      item.type === "skin" ? "skin" : 
                      item.type === "effect" ? "effect" :
                      item.id.includes("hat") || item.id.includes("crown") ? "headAccessory" : "backAccessory"
                    ] === item.id && (
                      <div className="absolute -top-2 -right-2 bg-[#00C2CB] rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#0A1122]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Locked indicator */}
                    {item.locked && (
                      <div className="absolute inset-0 bg-[#0A1122]/60 flex items-center justify-center rounded-lg">
                        <div className="bg-[#0A1122] rounded-full p-1.5 border border-[#1D3055]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Item Details Modal */}
            <AnimatePresence>
              {showItemDetail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-[#132242] rounded-lg p-6 border border-[#1D3055] shadow-md"
                >
                  {(() => {
                    const item = inventoryItems.find(i => i.id === showItemDetail);
                    if (!item) return null;
                    
                    // Get which slot this item belongs to
                    const itemSlot = item.type === "skin" ? "skin" : 
                                    item.type === "effect" ? "effect" :
                                    item.id.includes("hat") || item.id.includes("crown") ? "headAccessory" : "backAccessory";
                    
                    // Check if this item is currently equipped
                    const isEquipped = equippedItems[itemSlot] === item.id;
                    
                    return (
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-32 h-32 bg-[#0A1122] rounded-lg border border-[#1D3055]">
                          <span className="text-6xl">{item.image}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={cn("text-xl font-bold", getRarityColor(item.rarity))}>
                              {item.name}
                            </h3>
                            <div className={cn(
                              "text-xs px-2 py-0.5 rounded-full uppercase font-medium",
                              item.rarity === "common" ? "bg-gray-700 text-gray-300" :
                              item.rarity === "rare" ? "bg-[#00C2CB]/20 text-[#00C2CB]" :
                              item.rarity === "epic" ? "bg-purple-500/20 text-purple-400" :
                              "bg-yellow-500/20 text-yellow-400"
                            )}>
                              {item.rarity}
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4">{item.description}</p>
                          
                          <div className="flex gap-3">
                            {isEquipped ? (
                              // Show unequip button for accessories and effects, not for skins
                              item.type !== "skin" ? (
                                <button
                                  onClick={() => handleUnequipItem(item.id)}
                                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-medium transition-colors"
                                >
                                  REMOVE
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md font-medium cursor-not-allowed"
                                >
                                  EQUIPPED
                                </button>
                              )
                            ) : (
                              <button
                                onClick={() => handleEquipItem(item.id)}
                                className="px-4 py-2 bg-[#00C2CB] text-[#0A1122] hover:bg-[#00D6E0] rounded-md font-medium transition-colors"
                              >
                                EQUIP
                              </button>
                            )}
                            
                            <button
                              onClick={() => setShowItemDetail(null)}
                              className="px-4 py-2 bg-gray-700 text-white rounded-md font-medium hover:bg-gray-600 transition-colors"
                            >
                              CLOSE
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Premium Skins Promo - Only show if not premium */}
            {!hasPremium && (
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-[#3A1C61] to-[#121B40] rounded-lg p-5 border border-[#6A49A8] shadow-md relative overflow-hidden"
              >
                {/* Animated glow */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 opacity-75 blur-sm"
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-4xl mr-4">👑</span>
                    <div>
                      <h3 className="text-white font-bold">UNLOCK PREMIUM ITEMS</h3>
                      <p className="text-gray-300 text-sm">Get access to exclusive skins, effects, and accessories</p>
                    </div>
                  </div>
                  
                  <motion.button 
                    onClick={() => setShowPremiumModal(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative bg-gradient-to-r from-[#FFD700] to-[#FFC800] text-black font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.5)] overflow-hidden"
                  >
                    {/* Button shine effect */}
                    <span className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[45deg] transform -translate-x-full animate-shine"></span>
                    
                    <span className="relative z-10 flex items-center">
                      <span className="mr-1.5">UPGRADE</span>
                      <span className="font-mono">$9.99</span>
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Help Text */}
        <div className="bg-[#0A1122]/80 rounded-lg p-3 text-center text-sm text-gray-400 mb-8">
          Equip different skins, effects, and accessories to customize your character.
          <br />
          Additional items can be unlocked through the Battle Pass and defeating enemies.
        </div>
      </main>
      
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