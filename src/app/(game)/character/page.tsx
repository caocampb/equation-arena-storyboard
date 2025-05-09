"use client";

import { useState } from "react";
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
  const [showingBack, setShowingBack] = useState(false);
  const [showItemDetail, setShowItemDetail] = useState<string | null>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
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
    <div className="min-h-screen shop-background flex flex-col items-start" style={{ background: "linear-gradient(to bottom, #9b8b76, #7d6c5c)" }}>
      {/* Shared container for consistent alignment */}
      <div className="w-full max-w-4xl mx-auto px-4">
        {/* Fortnite-inspired Premium Upgrade Modal */}
        <AnimatePresence>
          {showPremiumModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                if (!purchaseSuccess) {
                  setShowPremiumModal(false);
                }
              }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-xl p-6 max-w-md w-full relative overflow-hidden border-2 border-[#3d2813]"
                onClick={e => e.stopPropagation()}
              >
                {/* Wood grain pattern overlay */}
                <div className="absolute inset-0 bg-wood-pattern opacity-40 pointer-events-none"></div>
                
                {/* Corner nails */}
                <div className="nail nail-top-left absolute top-3 left-3 w-3 h-3"></div>
                <div className="nail nail-top-right absolute top-3 right-3 w-3 h-3"></div>
                <div className="nail nail-bottom-left absolute bottom-3 left-3 w-3 h-3"></div>
                <div className="nail nail-bottom-right absolute bottom-3 right-3 w-3 h-3"></div>
                
                {/* Golden border effects */}
                <div className="absolute inset-0 border-[3px] border-[#FFD700]/40 rounded-xl opacity-70 pointer-events-none"></div>
                
                {/* Content container */}
                <div className="relative z-10 flex flex-col items-center">
                  {!purchaseSuccess ? (
                    <>
                      {/* Premium Crown Icon */}
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.5 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: 1,
                          transition: { delay: 0.3, duration: 0.6, type: "spring" }
                        }}
                        className="text-7xl mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                      >
                        <motion.div
                          animate={{ 
                            y: [0, -8, 0],
                            rotateZ: [-5, 5, -5]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          👑
                        </motion.div>
                      </motion.div>
                      
                      {/* Premium text */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: [0.8, 1.1, 1],
                          transition: { delay: 0.5, duration: 0.6, times: [0, 0.6, 1] }
                        }}
                        className="w-full text-center"
                      >
                        <h2 className="text-3xl font-bold text-[#FFD700] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          PREMIUM UPGRADE
                        </h2>
                        
                        <div className="w-4/5 h-1 mx-auto bg-[#FFD700]/50 rounded-full mb-6"></div>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            transition: { delay: 0.8, duration: 0.3 } 
                          }}
                          className="text-[#f8e4bc] text-xl mb-5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]"
                        >
                          Unlock all premium character items!
                        </motion.p>
                      </motion.div>
                      
                      {/* Features List */}
                      <ul className="text-[#f8e4bc]/90 text-base mb-8 space-y-3 w-full max-w-xs mx-auto">
                        <li className="flex items-center gap-3">
                          <span className="text-[#FFD700] text-lg">✓</span>
                          <span>Exclusive character skins</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-[#FFD700] text-lg">✓</span>
                          <span>Premium effects and animations</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-[#FFD700] text-lg">✓</span>
                          <span>Legendary accessories</span>
                        </li>
                      </ul>
                      
                      {/* Purchase confirmation section */}
                      <div className="w-full bg-[#3d2813]/80 rounded-lg p-4 mb-6 border border-[#FFD700]/40">
                        <p className="text-[#f8e4bc] text-center text-lg font-medium">
                          Price: <span className="font-bold text-[#FFD700] text-xl ml-1">$9.99</span>
                        </p>
                      </div>
                      
                      {/* Action buttons */}
                      <div className="flex gap-4 w-full mt-2">
                        <motion.button 
                          className="flex-1 bg-[#34A65F] hover:bg-[#2C8F4F] text-white font-bold py-3 rounded-lg shadow-md text-lg"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            // Show purchase success animation
                            setPurchaseSuccess(true);
                            
                            // Auto close after animation
                            setTimeout(() => {
                              setPurchaseSuccess(false);
                              setShowPremiumModal(false);
                              // Here you would trigger actual purchase processing
                            }, 5000);
                          }}
                        >
                          CONFIRM PURCHASE
                        </motion.button>
                        <motion.button 
                          className="px-6 bg-[#3d2813] hover:bg-[#503018] text-[#f8e4bc] font-bold py-3 rounded-lg shadow-md text-lg"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowPremiumModal(false)}
                        >
                          CANCEL
                        </motion.button>
                      </div>
                    </>
                  ) : (
                    /* Fortnite-Style Purchase Success Animation with Stardew Theme */
                    <motion.div className="w-full py-4 flex flex-col items-center">
                      {/* Success message with item reveal animation */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: [0.8, 1.2, 1],
                          transition: { duration: 0.7, times: [0, 0.6, 1] }
                        }}
                        className="text-center mb-4"
                      >
                        <h2 className="text-3xl font-bold text-[#FFD700] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          PREMIUM UNLOCKED!
                        </h2>
                        
                        {/* Rainbow shimmer effect line */}
                        <div className="relative h-2 w-full mx-auto mb-4 overflow-hidden rounded-full">
                          <div className="absolute inset-0 bg-gradient-to-r from-[#FF1493] via-[#FFD700] to-[#00BFFF]"></div>
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-[#00BFFF] via-[#FFD700] to-[#FF1493]"
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        </div>
                      </motion.div>
                      
                      {/* Celebratory confetti overlay */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-6"
                            style={{
                              background: `${['#FF1493', '#FFD700', '#00BFFF', '#7FFF00', '#9370DB'][Math.floor(Math.random() * 5)]}`,
                              top: -20,
                              left: `${Math.random() * 100}%`,
                              transformOrigin: "center bottom",
                            }}
                            initial={{ y: -20, opacity: 0, rotateZ: 0 }}
                            animate={{
                              y: ["0%", `${400 + Math.random() * 200}px`],
                              opacity: [0, 1, 0.7, 0],
                              rotateZ: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1)
                            }}
                            transition={{
                              duration: 2.5 + Math.random() * 2.5,
                              ease: [0.33, 1, 0.68, 1],
                              delay: Math.random() * 2,
                              repeat: Infinity,
                              repeatDelay: Math.random() * 2
                            }}
                          />
                        ))}
                      </div>
                      
                      {/* Item cards that flip in sequence */}
                      <div className="grid grid-cols-3 gap-4 w-full mb-6">
                        {[
                          { icon: "🤖", name: "Math Bot", delay: 0.2, color: "#FF1493" },
                          { icon: "🔢", name: "Number Rain", delay: 0.7, color: "#00BFFF" },
                          { icon: "👑", name: "Crown", delay: 1.2, color: "#FFD700" }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ 
                              rotateY: 0, 
                              opacity: 1,
                              transition: {
                                delay: item.delay,
                                duration: 0.5
                              }
                            }}
                            className="relative bg-gradient-to-br from-[#3d2813]/90 to-[#2a1a0a]/90 p-4 rounded-lg border-2 flex flex-col items-center"
                            style={{ borderColor: `${item.color}50` }}
                          >
                            <motion.div 
                              className="absolute inset-0 opacity-20 rounded-lg z-0" 
                              style={{ background: item.color }}
                              animate={{ opacity: [0.1, 0.3, 0.1] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            />
                            
                            <motion.div 
                              className="text-5xl mb-2 z-10"
                              animate={{ 
                                scale: [1, 1.15, 1],
                                rotate: [-5, 5, -5, 5, 0],
                              }}
                              transition={{ 
                                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
                              }}
                            >
                              {item.icon}
                            </motion.div>
                            
                            <div className="text-[#f8e4bc] text-sm text-center font-bold relative z-10">
                              {item.name}
                            </div>
                            
                            {/* Shine effect across item */}
                            <motion.div 
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 z-20"
                              animate={{ 
                                opacity: [0, 0.3, 0],
                                x: ["-100%", "100%"]
                              }}
                              transition={{ 
                                duration: 1.5, 
                                repeat: Infinity,
                                repeatDelay: 3 + index,
                                ease: "easeInOut"
                              }}
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Stardew-styled magical effect */}
                      <div className="relative flex items-center justify-center w-32 h-32 mb-6">
                        {/* Colorful animated orbit rings */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute rounded-full border-2 opacity-70`}
                            style={{ 
                              width: `${80 + i * 30}px`, 
                              height: `${80 + i * 30}px`,
                              borderColor: i === 0 ? "#FFD700" : i === 1 ? "#00BFFF" : "#FF1493"
                            }}
                            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                            transition={{ 
                              duration: 8 + i * 4, 
                              repeat: Infinity, 
                              ease: "linear" 
                            }}
                          />
                        ))}
                        
                        {/* Central glowing orb */}
                        <motion.div
                          className="absolute w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full z-10 opacity-80"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              "0 0 10px 5px rgba(255, 215, 0, 0.5)",
                              "0 0 20px 10px rgba(255, 215, 0, 0.7)",
                              "0 0 10px 5px rgba(255, 215, 0, 0.5)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                        
                        {/* Floating coins and sparkles */}
                        <div className="absolute inset-0">
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-6 h-6 text-xl"
                              initial={{ 
                                x: 0, 
                                y: 0,
                                opacity: 0 
                              }}
                              animate={{ 
                                x: (Math.random() - 0.5) * 120,
                                y: (Math.random() - 0.5) * 120,
                                opacity: [0, 1, 0],
                                scale: [0.7, 1, 0.7],
                                rotate: Math.random() * 360
                              }}
                              transition={{ 
                                repeat: Infinity,
                                duration: 2 + Math.random() * 2,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                              }}
                              style={{
                                left: '50%',
                                top: '50%',
                              }}
                            >
                              {i % 3 === 0 ? "💰" : i % 3 === 1 ? "✨" : "⭐"}
                            </motion.div>
                          ))}
                        </div>
                        
                        <span className="text-6xl relative z-20 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]">✨</span>
                      </div>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 1.5, duration: 0.5 }
                        }}
                        className="text-[#f8e4bc] text-2xl font-bold text-center mb-2"
                      >
                        All premium items are now yours!
                      </motion.p>
                      
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ 
                          opacity: [0, 1, 0.8, 1],
                          transition: { delay: 1.8, duration: 1.5, repeat: Infinity }
                        }}
                        className="text-[#FFD700] text-base font-medium text-center mb-6"
                      >
                        Find your new items in the inventory
                      </motion.p>
                      
                      {/* Progress bar for auto-close indication */}
                      <div className="w-full bg-[#3d2813]/40 h-2 rounded-full overflow-hidden mt-2 relative">
                        {/* Rainbow gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500] via-[#FFD700] to-[#00BFFF] opacity-60"></div>
                        
                        <motion.div 
                          className="h-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] relative"
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 5, ease: "linear" }}
                        >
                          {/* Animated shine effect */}
                          <motion.div 
                            className="absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white opacity-60"
                            animate={{ x: ["0%", "100%"] }}
                            transition={{ duration: 1.5, repeat: 3, repeatType: "loop" }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
        
        {/* Main content area - Wrapped in a large wooden panel */}
        <div className="main-wood-panel w-full mt-4 px-5 pb-20 relative">
          {/* Large panel nails - only at the corners of the main panel */}
          <div className="nail nail-top-left absolute top-4 left-4 w-4 h-4"></div>
          <div className="nail nail-top-right absolute top-4 right-4 w-4 h-4"></div>
          <div className="nail nail-bottom-left absolute bottom-4 left-4 w-4 h-4"></div>
          <div className="nail nail-bottom-right absolute bottom-4 right-4 w-4 h-4"></div>
          
          {/* Header with back button */}
          <div className="flex items-center mb-8 pt-5">
            <Link href="/overworld" className="mr-4 btn-press relative group">
              <div className="absolute inset-0 bg-[#5a3921] rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <ArrowLeftIcon className="h-6 w-6 text-[#f8e4bc]" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-[#f8e4bc] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              CHARACTER
            </h1>
          </div>
          
          {/* Character and Inventory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Character Preview Column */}
            <div className="md:col-span-1 space-y-6">
              {/* Character Preview */}
              <div className="bg-[#5a3921]/60 rounded-lg p-6 border border-[#3d2813] shadow-inner h-80 relative overflow-hidden flex flex-col items-center justify-center">
                {/* Wood grain pattern */}
                <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                
                {/* Rotate button */}
                <button 
                  onClick={handleRotate}
                  className="absolute top-3 right-3 bg-[#3d2813] p-2 rounded-full hover:bg-[#67492f] transition-colors z-10 shadow-md"
                >
                  <RotateCwIcon className="h-5 w-5 text-[#f8e4bc]" />
                </button>
                
                {/* Character display with motion */}
                <motion.div 
                  className="text-8xl relative flex items-center justify-center z-10"
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
                                <span className="text-lg text-[#FFD700]">
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
                
                <p className="text-[#f8e4bc] font-medium mt-4 relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                  {inventoryItems.find(item => item.id === equippedItems.skin)?.name || "Default Character"} 
                  {showingBack ? " (Back)" : ""}
                </p>
                
                {/* Custom environment background gradient */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#3d2813]/30 to-transparent opacity-80" />
              </div>
              
              {/* Character Stats */}
              <div className="bg-[#5a3921]/60 rounded-lg p-6 border border-[#3d2813] shadow-inner relative overflow-hidden">
                {/* Wood grain pattern */}
                <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                
                <h2 className="text-[#f8e4bc] font-semibold mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] relative z-10">CHARACTER STATS</h2>
                
                <div className="space-y-4 relative z-10">
                  {characterStats.map((stat) => (
                    <div key={stat.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            stat.name === "Speed" ? "text-[#FFD700]" :
                            stat.name === "Defense" ? "text-[#A6CDE7]" : 
                            "text-[#E4A0F7]"
                          )}>
                            {stat.icon}
                          </span>
                          <span className="text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{stat.name}</span>
                        </div>
                        <span className="text-[#f8e4bc] font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{stat.value}/{stat.max}</span>
                      </div>
                      <div className="h-2 bg-[#3d2813]/70 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(stat.value / stat.max) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            stat.name === "Speed" ? "bg-[#FFD700]" :
                            stat.name === "Defense" ? "bg-[#A6CDE7]" : "bg-[#E4A0F7]"
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-[#3d2813] relative z-10">
                  <p className="text-[#f8e4bc]/80 text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
                    Equip different skins and accessories to change your stats!
                  </p>
                </div>
              </div>
            </div>
            
            {/* Inventory Column */}
            <div className="md:col-span-2 space-y-6">
              {/* Inventory Tabs */}
              <div className="bg-[#5a3921]/60 rounded-lg p-4 border border-[#3d2813] shadow-inner relative overflow-hidden">
                {/* Wood grain pattern */}
                <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                
                <div className="flex p-1 bg-[#3d2813] rounded-lg mb-4 relative z-10">
                  <button
                    onClick={() => setActiveTab("skins")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      activeTab === "skins" 
                        ? "bg-[#FFD700] text-[#3d2813]" 
                        : "text-[#f8e4bc]/80 hover:text-[#f8e4bc] hover:bg-[#67492f]/60"
                    )}
                  >
                    SKINS
                  </button>
                  <button
                    onClick={() => setActiveTab("effects")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      activeTab === "effects" 
                        ? "bg-[#FFD700] text-[#3d2813]" 
                        : "text-[#f8e4bc]/80 hover:text-[#f8e4bc] hover:bg-[#67492f]/60"
                    )}
                  >
                    EFFECTS
                  </button>
                  <button
                    onClick={() => setActiveTab("accessories")}
                    className={cn(
                      "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                      activeTab === "accessories" 
                        ? "bg-[#FFD700] text-[#3d2813]" 
                        : "text-[#f8e4bc]/80 hover:text-[#f8e4bc] hover:bg-[#67492f]/60"
                    )}
                  >
                    ACCESSORIES
                  </button>
                </div>
                
                {/* Inventory Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 relative z-10">
                  {filteredItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg p-3 border-2 cursor-pointer relative flex flex-col items-center shadow-md overflow-hidden",
                        item.equipped ? "border-[#FFD700]" : "border-[#3d2813]",
                        item.locked ? "opacity-60 cursor-not-allowed" : ""
                      )}
                      onClick={() => handleItemClick(item.id)}
                    >
                      {/* Wood grain pattern */}
                      <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                      
                      <div className="text-4xl mb-2 relative z-10">{item.image}</div>
                      <p className={cn(
                        "text-sm font-medium text-center truncate w-full relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]",
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
                        <div className="absolute -top-2 -right-2 bg-[#FFD700] rounded-full p-1 z-20 shadow-[0_0_5px_rgba(255,215,0,0.5)]">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#3d2813]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      
                      {/* Locked indicator */}
                      {item.locked && (
                        <div className="absolute inset-0 bg-[#3d2813]/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-20">
                          <div className="bg-[#FFD700]/20 rounded-full p-1.5 border border-[#FFD700]/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#FFD700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    className="bg-[#5a3921]/60 rounded-lg p-6 border border-[#3d2813] shadow-inner relative overflow-hidden"
                  >
                    {/* Wood grain pattern */}
                    <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                    
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
                        <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                          <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-32 h-32 bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg border-2 border-[#3d2813] shadow-md overflow-hidden relative">
                            <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                            <span className="text-6xl relative z-10">{item.image}</span>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className={cn("text-xl font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]", getRarityColor(item.rarity))}>
                                {item.name}
                              </h3>
                              <div className={cn(
                                "text-xs px-2 py-0.5 rounded-full uppercase font-medium",
                                item.rarity === "common" ? "bg-[#67492f] text-[#f8e4bc]/80" :
                                item.rarity === "rare" ? "bg-[#34A65F]/20 text-[#34A65F]" :
                                item.rarity === "epic" ? "bg-[#9B59B6]/20 text-[#9B59B6]" :
                                "bg-[#FFD700]/20 text-[#FFD700]"
                              )}>
                                {item.rarity}
                              </div>
                            </div>
                            
                            <p className="text-[#f8e4bc]/80 mb-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">{item.description}</p>
                            
                            <div className="flex gap-3">
                              {isEquipped ? (
                                // Show unequip button for accessories and effects, not for skins
                                item.type !== "skin" ? (
                                  <button
                                    onClick={() => handleUnequipItem(item.id)}
                                    className="px-4 py-2 bg-[#3d2813] hover:bg-[#503018] text-[#f8e4bc] rounded-md font-medium transition-colors shadow-md"
                                  >
                                    REMOVE
                                  </button>
                                ) : (
                                  <button
                                    disabled
                                    className="px-4 py-2 bg-[#3d2813] text-[#f8e4bc]/50 rounded-md font-medium cursor-not-allowed shadow-md"
                                  >
                                    EQUIPPED
                                  </button>
                                )
                              ) : (
                                <button
                                  onClick={() => handleEquipItem(item.id)}
                                  className="px-4 py-2 bg-[#FFD700] hover:bg-[#FFC800] text-[#3d2813] rounded-md font-medium transition-colors shadow-md"
                                >
                                  EQUIP
                                </button>
                              )}
                              
                              <button
                                onClick={() => setShowItemDetail(null)}
                                className="px-4 py-2 bg-[#3d2813] hover:bg-[#503018] text-[#f8e4bc] rounded-md font-medium transition-colors shadow-md"
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
                  className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg p-5 border-2 border-[#FFD700] shadow-md relative overflow-hidden"
                >
                  {/* Wood grain pattern */}
                  <div className="absolute inset-0 bg-wood-pattern opacity-30"></div>
                  
                  {/* Animated glow */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/0 via-[#FFD700]/30 to-[#FFD700]/0 opacity-75 blur-sm"
                    animate={{ x: ["100%", "-100%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  />
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center">
                      <span className="text-4xl mr-4">👑</span>
                      <div>
                        <h3 className="text-[#f8e4bc] font-bold drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">UNLOCK PREMIUM ITEMS</h3>
                        <p className="text-[#f8e4bc]/80 text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Get access to exclusive skins, effects, and accessories</p>
                      </div>
                    </div>
                    
                    <motion.button 
                      onClick={() => setShowPremiumModal(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative bg-gradient-to-r from-[#FFD700] to-[#FFC800] text-[#3d2813] font-bold py-2 px-4 rounded-lg shadow-[0_0_15px_rgba(255,215,0,0.5)] overflow-hidden shrink-0 self-center sm:self-auto"
                    >
                      {/* Button shine effect */}
                      <span className="absolute inset-0 w-1/4 h-full bg-white/30 skew-x-[45deg] transform -translate-x-full group-hover:animate-shine"></span>
                      
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
          <div className="bg-[#3d2813]/60 rounded-lg p-3 text-center text-sm text-[#f8e4bc]/80 mb-8 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
            Equip different skins, effects, and accessories to customize your character.
            <br />
            Additional items can be unlocked through the Battle Pass and defeating enemies.
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
        
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(45deg);
          }
          to {
            transform: translateX(300%) skewX(45deg);
          }
        }
        
        .animate-shine {
          animation: shine 2s ease-in-out;
        }
      `}</style>
    </div>
  );
} 