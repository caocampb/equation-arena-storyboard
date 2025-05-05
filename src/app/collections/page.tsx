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
    <div className="min-h-screen bg-gradient-to-b from-[#0A1930] to-[#15295A] flex flex-col items-center">
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
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/overworld" className="mr-4 btn-press">
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">
            COLLECTIONS
          </h1>
        </div>
        
        {/* Category Tabs - Stardew Valley style */}
        <div className="relative mb-6">
          {/* Wood panel background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3A2618] to-[#573B2A] rounded-lg border-2 border-[#6A4C39] shadow-lg"></div>
          
          {/* Category buttons */}
          <div className="relative flex">
            {(['properties', 'equations', 'victories', 'achievements'] as const).map((category) => (
              <motion.button
                key={category}
                className={cn(
                  "flex-1 py-3 relative overflow-hidden",
                  activeCategory === category ? "z-10" : "hover:bg-white/5"
                )}
                onClick={() => setActiveCategory(category)}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selected tab indicator */}
                {activeCategory === category && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-[#34A65F] to-[#2A7F4A] border-2 border-[#62C386] rounded-t-lg"
                    layoutId="activeTab"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                {/* Tab content */}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xl mb-1">{getCategoryIcon(category)}</span>
                  <span className={cn(
                    "text-xs font-medium",
                    activeCategory === category ? "text-white" : "text-gray-300"
                  )}>
                    {getCategoryTitle(category).toUpperCase()}
                  </span>
                  
                  {/* Progress indicator */}
                  <div className="w-12 h-1.5 bg-[#0A1122]/50 rounded-full mt-1.5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#FFD700]" 
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
        <div className="bg-[#132242] rounded-lg p-6 border border-[#1D3055] shadow-md mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
                    "bg-[#0A1122] rounded-lg border overflow-hidden cursor-pointer relative group",
                    item.discovered 
                      ? item.completed 
                        ? "border-[#34A65F]" 
                        : "border-[#FFD700]"
                      : "border-gray-700"
                  )}
                  onClick={() => setSelectedItem(item)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Collection item content */}
                  <div className="p-4 flex flex-col items-center">
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
                        <div className="absolute -bottom-1 -right-1 bg-[#FFD700] rounded-full p-0.5">
                          <StarIcon className="h-3.5 w-3.5 text-[#0A1122]" />
                        </div>
                      ) : (
                        <div className="absolute -bottom-1 -right-1 bg-gray-700 rounded-full p-0.5">
                          <HelpCircleIcon className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    {/* Title */}
                    <h3 className={cn(
                      "text-sm font-medium text-center",
                      !item.discovered && "blur-sm"
                    )}>
                      {item.discovered ? item.name : "???"}
                    </h3>
                    
                    {/* Progress bar (only for discovered but not completed) */}
                    {item.discovered && !item.completed && (
                      <div className="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-[#FFD700]" 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Hover effect - show "View Details" */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">View Details</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Collection category description */}
        <div className="bg-[#132242]/70 rounded-lg p-5 border border-[#1D3055]/70 mb-6">
          <div className="flex items-center mb-3">
            <div className="text-2xl mr-3">{getCategoryIcon(activeCategory)}</div>
            <h2 className="text-white font-semibold">{getCategoryTitle(activeCategory)}</h2>
            <div className="ml-auto flex items-center">
              <span className="text-[#34A65F] mr-1.5">
                <BadgeCheckIcon className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-300">
                {filteredItems.filter(i => i.completed).length}/{filteredItems.length} Completed
              </span>
            </div>
          </div>
          
          <p className="text-gray-300 text-sm">
            {activeCategory === 'properties' && "Collect different mathematical properties by using them in battles. Each property unlocks special rewards and abilities."}
            {activeCategory === 'equations' && "Discover and master different types of equations to add them to your collection. Each mastered equation type provides unique rewards."}
            {activeCategory === 'victories' && "Record of your victories against various math enemies. Each victory unlocks special rewards and progresses the story."}
            {activeCategory === 'achievements' && "Special accomplishments earned by completing challenges across different game activities."}
          </p>
        </div>
      </main>
      
      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gradient-to-b from-[#0A1930] to-[#15295A] rounded-lg max-w-md w-full border-2 border-[#1D3055] p-0 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header with wooden sign look */}
              <div className="bg-gradient-to-r from-[#3A2618] to-[#573B2A] border-b-2 border-[#6A4C39] p-5 flex items-center">
                <div className="text-4xl mr-4">{selectedItem.discovered ? selectedItem.icon : "❓"}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedItem.discovered ? selectedItem.name : "Undiscovered Item"}
                  </h3>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {getCategoryTitle(selectedItem.category)}
                  </p>
                </div>
                {selectedItem.completed && (
                  <div className="ml-auto flex items-center bg-[#34A65F]/20 rounded-full px-2 py-1">
                    <CheckCircleIcon className="h-4 w-4 text-[#34A65F] mr-1" />
                    <span className="text-xs text-[#34A65F] font-medium">COMPLETED</span>
                  </div>
                )}
              </div>
              
              {/* Body */}
              <div className="p-5">
                {/* Description */}
                <div className="mb-5">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Description:</h4>
                  <p className="text-white">
                    {selectedItem.discovered ? selectedItem.description : "This item hasn't been discovered yet. Continue playing to unlock it!"}
                  </p>
                </div>
                
                {/* Progress if not completed */}
                {selectedItem.discovered && !selectedItem.completed && (
                  <div className="mb-5">
                    <div className="flex justify-between mb-1">
                      <h4 className="text-sm font-medium text-gray-300">Progress:</h4>
                      <span className="text-sm text-[#FFD700]">{selectedItem.progress}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
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
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Reward:</h4>
                  <div className={cn(
                    "bg-[#0A1122] border rounded-lg p-4 flex items-center",
                    selectedItem.completed ? "border-[#34A65F]" : "border-[#1D3055]"
                  )}>
                    {selectedItem.discovered ? (
                      <>
                        <div className="text-2xl mr-3">🎁</div>
                        <p className="text-white font-medium">{selectedItem.reward}</p>
                        {selectedItem.completed && (
                          <div className="ml-auto bg-[#34A65F] text-white text-xs px-2 py-0.5 rounded">
                            CLAIMED
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400 italic">Discover this item to reveal its reward</p>
                    )}
                  </div>
                </div>
                
                {/* Hint for undiscovered items */}
                {!selectedItem.discovered && (
                  <div className="bg-[#1D3055]/50 rounded-lg p-3">
                    <p className="text-sm text-gray-300 italic">
                      <span className="text-[#FFD700] mr-1">💡</span> 
                      Hint: Keep exploring {getCategoryTitle(selectedItem.category).toLowerCase()} to discover this item!
                    </p>
                  </div>
                )}
                
                {/* Close button */}
                <div className="mt-6 flex justify-center">
                  <motion.button
                    className="bg-[#132242] hover:bg-[#1D3055] text-white py-2 px-6 rounded-lg transition-colors"
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
      <div className="fixed bottom-0 left-0 right-0 flex justify-center p-1 bg-[#0A1122]/60 backdrop-blur-sm border-t border-[#1D3055]/50 z-10">
        <div className="flex items-center gap-1.5 text-white/60 text-xs font-medium">
          <kbd className="px-1.5 py-0.5 bg-[#132242]/80 rounded border border-[#1D3055]/70 text-[#00C2CB] text-xs">ESC</kbd>
          <span>Press to access menu</span>
        </div>
      </div>
    </div>
  );
} 