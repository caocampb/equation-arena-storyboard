"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, HelpCircleIcon, StarIcon, BadgeCheckIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroPanel } from "@/components/overworld/HeroPanel";
import { useGameState } from "@/context/GameStateContext";
import { cn } from "@/lib/utils";

// Define the types for our collections data
interface CollectionItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  discovered: boolean;
  completed: boolean;
  progress: number; // 0-100
  reward: string;
  category: 'properties' | 'equations' | 'victories' | 'achievements';
}

export default function CollectionsPage() {
  const { playerStats } = useGameState();
  const [activeCategory, setActiveCategory] = useState<'properties' | 'equations' | 'victories' | 'achievements'>('properties');
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate loading state for Framer animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock collection data
  const collectionItems: CollectionItem[] = [
    // Math Properties category
    {
      id: "commutative",
      name: "Commutative Property",
      description: "The order of numbers doesn't affect the result: a + b = b + a and a × b = b × a",
      icon: "🔄",
      discovered: true,
      completed: true,
      progress: 100,
      reward: "Number Swirl Effect",
      category: "properties"
    },
    {
      id: "associative",
      name: "Associative Property",
      description: "How you group numbers doesn't affect the result: (a + b) + c = a + (b + c)",
      icon: "🔗",
      discovered: true,
      completed: false,
      progress: 65,
      reward: "Bracket Accessory",
      category: "properties"
    },
    {
      id: "distributive",
      name: "Distributive Property",
      description: "a × (b + c) = a × b + a × c",
      icon: "📦",
      discovered: true,
      completed: false,
      progress: 30,
      reward: "Split Shell Effect",
      category: "properties"
    },
    {
      id: "identity",
      name: "Identity Property",
      description: "Any number plus 0 equals the original number, and any number times 1 equals the original number",
      icon: "👤",
      discovered: false,
      completed: false,
      progress: 0,
      reward: "Mirror Image Accessory",
      category: "properties"
    },
    
    // Equations category
    {
      id: "linear",
      name: "Linear Equations",
      description: "Equations that form a straight line when graphed",
      icon: "📈",
      discovered: true,
      completed: true,
      progress: 100,
      reward: "Straight Path Effect",
      category: "equations"
    },
    {
      id: "quadratic",
      name: "Quadratic Equations",
      description: "Equations containing a squared term, forming a parabola when graphed",
      icon: "⛰️",
      discovered: true,
      completed: false,
      progress: 45,
      reward: "Parabola Hat",
      category: "equations"
    },
    {
      id: "exponential",
      name: "Exponential Equations",
      description: "Equations where the variable is in the exponent",
      icon: "🚀",
      discovered: false,
      completed: false,
      progress: 0,
      reward: "Growth Aura Effect",
      category: "equations"
    },
    
    // Victories category
    {
      id: "tutorial",
      name: "Tutorial Victory",
      description: "Completed the tutorial battle successfully",
      icon: "🎓",
      discovered: true,
      completed: true,
      progress: 100,
      reward: "Graduate Cap",
      category: "victories"
    },
    {
      id: "order_keeper",
      name: "Order Keeper",
      description: "Defeated the Order Keeper enemy in Math World",
      icon: "📋",
      discovered: true,
      completed: true,
      progress: 100,
      reward: "Ordered List Effect",
      category: "victories"
    },
    {
      id: "fraction_fiend",
      name: "Fraction Fiend",
      description: "Defeated the Fraction Fiend enemy in Math World",
      icon: "🍕",
      discovered: true,
      completed: false,
      progress: 20,
      reward: "Pizza Slice Accessory",
      category: "victories"
    },
    
    // Achievements category
    {
      id: "first_steps",
      name: "First Steps",
      description: "Complete your first battle in any world",
      icon: "👣",
      discovered: true,
      completed: true,
      progress: 100,
      reward: "Footprint Trail Effect",
      category: "achievements"
    },
    {
      id: "collector",
      name: "Collector",
      description: "Discover 10 different collection items",
      icon: "🧩",
      discovered: true,
      completed: false,
      progress: 70,
      reward: "Puzzle Piece Accessory",
      category: "achievements"
    },
    {
      id: "math_wizard",
      name: "Math Wizard",
      description: "Use 5 different math properties in a single battle",
      icon: "🧙‍♂️",
      discovered: false,
      completed: false,
      progress: 0,
      reward: "Wizard Robe Skin",
      category: "achievements"
    }
  ];
  
  const filteredItems = collectionItems.filter(item => item.category === activeCategory);
  
  const getTotalProgress = (category: string) => {
    const items = collectionItems.filter(item => item.category === category);
    if (items.length === 0) return 0;
    
    const totalProgress = items.reduce((sum, item) => sum + item.progress, 0);
    return Math.round(totalProgress / items.length);
  };
  
  const getCategoryTitle = (category: string) => {
    switch(category) {
      case 'properties': return 'Math Properties';
      case 'equations': return 'Equation Types';
      case 'victories': return 'Battle Victories';
      case 'achievements': return 'Achievements';
      default: return '';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'properties': return '🧮';
      case 'equations': return '📐';
      case 'victories': return '🏆';
      case 'achievements': return '🎖️';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen shop-background flex flex-col items-start" style={{ background: "linear-gradient(to bottom, #9b8b76, #7d6c5c)" }}>
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
        
        {/* Main content area - Wrapped in a large wooden panel */}
        <div className="main-wood-panel w-full mt-4 px-5 pb-20 relative">
          {/* Large panel nails - only at the corners of the main panel */}
          <div className="nail nail-top-left absolute top-4 left-4 w-4 h-4"></div>
          <div className="nail nail-top-right absolute top-4 right-4 w-4 h-4"></div>
          <div className="nail nail-bottom-left absolute bottom-4 left-4 w-4 h-4"></div>
          <div className="nail nail-bottom-right absolute bottom-4 right-4 w-4 h-4"></div>
          
          {/* Header - Ensure no horizontal line/border */}
          <div className="flex items-center mb-8 pt-5">
            <Link href="/overworld" className="mr-4 btn-press relative group">
              <div className="absolute inset-0 bg-[#5a3921] rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <ArrowLeftIcon className="h-6 w-6 text-[#f8e4bc]" />
            </Link>
            <h1 className="text-3xl font-display font-bold text-[#f8e4bc] tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
              COLLECTIONS
            </h1>
          </div>
          
          {/* Category Tabs - Stardew Valley style */}
          <div className="bg-[#5a3921]/80 rounded-lg border border-[#3d2813] mb-8 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 bg-[#ffd700]/5 pulse-subtle"></div>
            
            <div className="relative flex border-b border-[#3d2813]">
              {(['properties', 'equations', 'victories', 'achievements'] as const).map((category) => (
                <motion.button
                  key={category}
                  className={cn(
                    "flex-1 py-3 relative overflow-hidden",
                    activeCategory === category ? "z-10" : "hover:bg-[#3d2813]/30"
                  )}
                  onClick={() => setActiveCategory(category)}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Selected tab indicator with stronger highlight */}
                  {activeCategory === category && (
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-[#724929] to-[#67492f] border-2 border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.6),inset_0_0_10px_rgba(255,215,0,0.3)] rounded-t-md overflow-hidden"
                      layoutId="activeTab"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    >
                      {/* White line to mask the bottom border and create tab effect */}
                      <div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-[#67492f]"></div>
                    </motion.div>
                  )}
                  
                  {/* Tab content */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className={cn(
                      "text-xl mb-1",
                      activeCategory === category ? "text-amber-300 drop-shadow-[0_0_3px_rgba(251,191,36,0.6)]" : "text-amber-300/60"
                    )}>
                      {getCategoryIcon(category)}
                    </span>
                    <span className={cn(
                      "text-xs font-bold tracking-wide",
                      activeCategory === category ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]" : "text-[#f0e6d2]/70 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                    )}>
                      {getCategoryTitle(category).toUpperCase()}
                    </span>
                    
                    {/* Item count below category name - Show completed/total */}
                    <span className={cn(
                      "text-[9px] mt-0.5",
                      activeCategory === category ? "text-[#ffd700]" : "text-[#f0e6d2]/50"
                    )}>
                      {collectionItems.filter(i => i.category === category && i.completed).length}/{collectionItems.filter(i => i.category === category).length} COMPLETED
                    </span>
                    
                    {/* Progress indicator */}
                    <div className="w-16 h-1.5 bg-[#3d2813]/70 rounded-full mt-1 overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#FFD700] shadow-[0_0_5px_rgba(255,215,0,0.5)]" 
                        initial={{ width: 0 }}
                        animate={{ width: `${getTotalProgress(category)}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Collection Items Grid */}
          <div className="bg-[#5a3921]/60 rounded-lg p-6 border border-[#3d2813] shadow-inner mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <AnimatePresence mode="wait">
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ 
                      opacity: isLoaded ? 1 : 0, 
                      scale: isLoaded ? 1 : 0.8,
                      y: isLoaded ? 0 : 20 
                    }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ 
                      duration: 0.4,
                      delay: isLoaded ? index * 0.1 : 0
                    }}
                    className={cn(
                      "bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg border-2 overflow-hidden cursor-pointer relative group",
                      item.discovered 
                        ? item.completed 
                          ? "border-[#34A65F] hover:border-[#4afa8a]" 
                          : "border-[#FFD700] hover:border-[#ffeb80]"
                        : "border-[#3d2813] hover:border-[#67492f]"
                    )}
                    onClick={() => setSelectedItem(item)}
                    whileHover={{ 
                      scale: 1.04,
                      y: -5,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.6), 0 0 15px rgba(255,215,0,0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Wood grain pattern */}
                    <div className="absolute inset-0 bg-wood-pattern opacity-50"></div>
                    
                    {/* Collection item content */}
                    <div className="p-4 flex flex-col items-center relative z-10">
                      {/* Icon with status indicator */}
                      <div className="relative mb-2">
                        <div className={cn(
                          "text-3xl",
                          !item.discovered && "blur-sm text-gray-500"
                        )}>
                          {item.icon}
                        </div>
                        
                        {/* Status indicator */}
                        {item.completed ? (
                          <div className="absolute -bottom-1 -right-1 bg-[#34A65F] rounded-full p-0.5">
                            <CheckCircleIcon className="h-3.5 w-3.5 text-white" />
                          </div>
                        ) : item.discovered ? (
                          <div className="absolute -bottom-1 -right-1 bg-[#FFD700] rounded-full p-0.5 shadow-[0_0_5px_rgba(255,215,0,0.5)]">
                            <StarIcon className="h-3.5 w-3.5 text-[#3d2813]" />
                          </div>
                        ) : (
                          <div className="absolute -bottom-1 -right-1 bg-[#3d2813] rounded-full p-0.5">
                            <HelpCircleIcon className="h-3.5 w-3.5 text-[#f8e4bc]/60" />
                          </div>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 className={cn(
                        "text-sm font-bold text-center text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]",
                        !item.discovered && "blur-sm"
                      )}>
                        {item.discovered ? item.name : "???"}
                      </h3>
                      
                      {/* Progress bar (only for discovered but not completed) */}
                      {item.discovered && !item.completed && (
                        <div className="w-full h-1.5 bg-[#3d2813]/70 rounded-full mt-2 overflow-hidden">
                          <motion.div 
                            className="h-full bg-[#FFD700]" 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                          />
                        </div>
                      )}
                    </div>
                    
                    {/* Hover effect - enhanced golden glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ffd700]/30 to-[#ffd700]/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#ffd700]/50 to-transparent"></div>
                      {/* Sparkle effects on hover */}
                      <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 animate-ping-slow"></div>
                      <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 animate-ping-slow" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 rounded-full bg-white/80 opacity-0 group-hover:opacity-100 animate-ping-slow" style={{ animationDelay: '0.3s' }}></div>
                    </div>
                    
                    {/* Pulsing border on hover */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-lg",
                      item.completed ? "animate-pulse-green" : "animate-pulse-gold"
                    )}></div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Collection category description */}
          <div className="bg-[#5a3921]/60 rounded-lg p-5 border border-[#3d2813] shadow-inner mb-6">
            <div className="flex items-center mb-3">
              <div className="text-2xl mr-3 text-amber-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{getCategoryIcon(activeCategory)}</div>
              <h2 className="text-[#f8e4bc] font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{getCategoryTitle(activeCategory)}</h2>
              <div className="ml-auto flex items-center">
                <span className="text-[#34A65F] mr-1.5">
                  <BadgeCheckIcon className="h-4 w-4 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                </span>
                <span className="text-sm text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  {filteredItems.filter(i => i.completed).length}/{filteredItems.length} Completed
                </span>
              </div>
            </div>
            
            <p className="text-sm text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
              {activeCategory === 'properties' && "Collect different mathematical properties by using them in battles. Each property unlocks special rewards and abilities."}
              {activeCategory === 'equations' && "Discover and master different types of equations to add them to your collection. Each mastered equation type provides unique rewards."}
              {activeCategory === 'victories' && "Record of your victories against various math enemies. Each victory unlocks special rewards and progresses the story."}
              {activeCategory === 'achievements' && "Special accomplishments earned by completing challenges across different game activities."}
            </p>
          </div>
        </div>
        
        {/* Detail Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#3d2813]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gradient-to-b from-[#7a5033] to-[#5d3d27] rounded-lg max-w-md w-full border-2 border-[#3d2813] p-0 overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                {/* Corner nails */}
                <div className="nail nail-top-left absolute top-2 left-2 w-3 h-3"></div>
                <div className="nail nail-top-right absolute top-2 right-2 w-3 h-3"></div>
                <div className="nail nail-bottom-left absolute bottom-2 left-2 w-3 h-3"></div>
                <div className="nail nail-bottom-right absolute bottom-2 right-2 w-3 h-3"></div>
                
                {/* Header with wooden sign look */}
                <div className="bg-gradient-to-r from-[#5a3921] to-[#67492f] border-b-2 border-[#3d2813] p-5 flex items-center relative">
                  <div className="text-4xl mr-4">{selectedItem.discovered ? selectedItem.icon : "❓"}</div>
                  <div>
                    <h3 className="text-lg font-bold text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {selectedItem.discovered ? selectedItem.name : "Undiscovered Item"}
                    </h3>
                    <p className="text-xs text-[#f8e4bc]/70 mt-0.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {getCategoryTitle(selectedItem.category)}
                    </p>
                  </div>
                  {selectedItem.completed && (
                    <div className="ml-auto flex items-center bg-[#34A65F]/20 rounded-full px-2 py-1 border border-[#34A65F]/30">
                      <CheckCircleIcon className="h-4 w-4 text-[#34A65F] mr-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
                      <span className="text-xs text-[#34A65F] font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">COMPLETED</span>
                    </div>
                  )}
                </div>
                
                {/* Body */}
                <div className="p-5">
                  {/* Description */}
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-[#f8e4bc]/80 mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Description:</h4>
                    <p className="text-[#f8e4bc] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                      {selectedItem.discovered ? selectedItem.description : "This item hasn't been discovered yet. Continue playing to unlock it!"}
                    </p>
                  </div>
                  
                  {/* Progress if not completed */}
                  {selectedItem.discovered && !selectedItem.completed && (
                    <div className="mb-5">
                      <div className="flex justify-between mb-1">
                        <h4 className="text-sm font-medium text-[#f8e4bc]/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Progress:</h4>
                        <span className="text-sm text-[#FFD700] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{selectedItem.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-[#3d2813]/80 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#FFD700]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedItem.progress}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Reward */}
                  <div className="mb-5">
                    <h4 className="text-sm font-medium text-[#f8e4bc]/80 mb-2 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Reward:</h4>
                    <div className={cn(
                      "bg-[#3d2813]/60 border-2 rounded-lg p-4 flex items-center",
                      selectedItem.completed ? "border-[#34A65F]" : "border-[#3d2813]"
                    )}>
                      {selectedItem.discovered ? (
                        <>
                          <div className="text-2xl mr-3">🎁</div>
                          <p className="text-[#f8e4bc] font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">{selectedItem.reward}</p>
                          {selectedItem.completed && (
                            <div className="ml-auto bg-[#34A65F] text-[#f8e4bc] text-xs px-2 py-0.5 rounded border border-[#67e98e]/20">
                              CLAIMED
                            </div>
                          )}
                        </>
                      ) : (
                        <p className="text-[#f8e4bc]/60 italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">Discover this item to reveal its reward</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Hint for undiscovered items */}
                  {!selectedItem.discovered && (
                    <div className="bg-[#3d2813]/70 rounded-lg p-3 border border-[#3d2813]">
                      <p className="text-sm text-[#f8e4bc]/80 italic drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                        <span className="text-[#FFD700] mr-1">💡</span> 
                        Hint: Keep exploring {getCategoryTitle(selectedItem.category).toLowerCase()} to discover this item!
                      </p>
                    </div>
                  )}
                  
                  {/* Close button */}
                  <div className="mt-6 flex justify-center">
                    <motion.button
                      className="bg-[#5a3921] border border-[#ffd700]/30 text-[#f8e4bc] py-2 px-6 rounded-lg transition-all duration-200 hover:bg-[#67492f] hover:border-[#FFD700]/30 hover:shadow-[0_0_10px_rgba(255,215,0,0.4),inset_0_0_6px_rgba(255,215,0,0.2)] hover:transform hover:-translate-y-0.5"
                      onClick={() => setSelectedItem(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
          
          .pulse-subtle {
            animation: pulse-bg 4s infinite ease-in-out;
          }
          
          @keyframes pulse-bg {
            0%, 100% {
              opacity: 0.2;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes ping-slow {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(2);
              opacity: 0.5;
            }
            100% {
              transform: scale(3);
              opacity: 0;
            }
          }
          
          .animate-ping-slow {
            animation: ping-slow 2s infinite ease-out;
          }
          
          .animate-pulse-gold {
            box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.9);
            animation: pulse-gold 2s infinite ease-in-out;
          }
          
          .animate-pulse-green {
            box-shadow: 0 0 0 2px rgba(52, 166, 95, 0.9);
            animation: pulse-green 2s infinite ease-in-out;
          }
          
          @keyframes pulse-gold {
            0%, 100% {
              box-shadow: 0 0 0 2px rgba(255, 215, 0, 0.4);
            }
            50% {
              box-shadow: 0 0 0 4px rgba(255, 215, 0, 0.9);
            }
          }
          
          @keyframes pulse-green {
            0%, 100% {
              box-shadow: 0 0 0 2px rgba(52, 166, 95, 0.4);
            }
            50% {
              box-shadow: 0 0 0 4px rgba(52, 166, 95, 0.9);
            }
          }
        `}</style>
      </div>
    </div>
  );
} 