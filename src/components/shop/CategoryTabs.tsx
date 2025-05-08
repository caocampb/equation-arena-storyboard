"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  showIcons?: boolean;
  hideLabels?: boolean;
}

export function CategoryTabs({ 
  activeCategory, 
  setActiveCategory, 
  showIcons = true, 
  hideLabels = false 
}: CategoryTabsProps) {
  const categories = [
    { id: "featured", label: "FEATURED", icon: "✨" },
    { id: "daily", label: "DAILY ITEMS", icon: "🔄" }
  ];
  
  return (
    <div className="bg-[#3d2813]/40 rounded-lg p-2 border border-[#3d2813] shadow-inner">
      <div className="flex gap-2 relative">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "relative z-10 flex-1 py-2 px-3 rounded-md text-center transition-all duration-200",
              activeCategory === category.id 
                ? "text-white" 
                : "text-[#f0e6d2]/70 hover:text-white hover:bg-[#3d2813]/40"
            )}
            whileHover={{ 
              scale: activeCategory === category.id ? 1 : 1.02,
              y: activeCategory === category.id ? 0 : -1
            }}
            whileTap={{ scale: 0.98 }}
          >
            {activeCategory === category.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-gradient-to-b from-[#724929] to-[#5a3921] border border-[#ffd700]/40 shadow-[0_0_10px_rgba(255,215,0,0.3),inset_0_0_5px_rgba(255,215,0,0.15)] rounded-md -z-10"
                initial={false}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
              />
            )}
            <div className="flex items-center justify-center gap-1.5">
              {showIcons && (
                <span className={cn(
                  "text-xs transition-all duration-200",
                  activeCategory === category.id 
                    ? "text-amber-300 drop-shadow-[0_0_3px_rgba(251,191,36,0.6)]" 
                    : "text-amber-300/60"
                )}>
                  {category.icon}
                </span>
              )}
              {!hideLabels && (
                <span className={cn(
                  "text-sm font-bold relative z-10 tracking-wide",
                  activeCategory === category.id 
                    ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]" 
                    : "text-gray-300 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                )}>
                  {category.label}
                </span>
              )}
              {activeCategory === category.id && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-0 w-8 h-0.5 bg-[#ffd700] rounded-full mt-0.5 shadow-[0_0_4px_rgba(255,215,0,0.6)]"
                  style={{ left: "calc(50% - 16px)" }}
                />
              )}
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Hide the custom styles since these might be causing issues */}
      <style jsx>{`
        div {
          position: relative;
        }
      `}</style>
    </div>
  );
} 