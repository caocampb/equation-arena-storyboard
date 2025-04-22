"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { HomeIcon, GiftIcon, LayersIcon, UsersIcon, LockIcon } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isLocked?: boolean;
  hasNotification?: boolean;
  path?: string; // Add path for navigation
};

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  rewardsNotification?: boolean;
}

export function TabNavigation({ 
  activeTab, 
  onTabChange,
  rewardsNotification = true // Default to true for mockup
}: TabNavigationProps) {
  // Use client-side state to ensure hydration matches
  const [isHydrated, setIsHydrated] = useState(false);
  const router = useRouter();
  
  // Only show the active indicator after client-side hydration is complete
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const tabs: Tab[] = [
    {
      id: "play",
      label: "PLAY",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/overworld", // Route to the overworld page
    },
    {
      id: "rewards",
      label: "REWARDS",
      icon: <GiftIcon className="h-5 w-5" />,
      isLocked: false,
      hasNotification: rewardsNotification,
      path: "/rewards", // Fix: Navigate to main rewards page
    },
    {
      id: "collection",
      label: "COLLECTION",
      icon: <LayersIcon className="h-5 w-5" />,
      isLocked: true,
      path: "/collection",
    },
    {
      id: "friends",
      label: "FRIENDS",
      icon: <UsersIcon className="h-5 w-5" />,
      isLocked: true,
      path: "/friends",
    },
  ];

  // Handle tab navigation
  const handleTabClick = (tab: Tab) => {
    if (tab.isLocked) return;
    
    onTabChange(tab.id);
    
    // Navigate to the corresponding page if path is defined
    if (tab.path) {
      router.push(tab.path);
    }
  };

  // Derive the visible state based on hydration
  const showActiveIndicator = isHydrated;
  
  // Determine text color class conditionally
  const getTextColorClass = (tab: Tab, isActive: boolean) => {
    if (tab.isLocked) return "text-gray-500";
    if (isActive && isHydrated) return "text-[#00C2CB]";
    return "text-gray-300 hover:text-white";
  };

  return (
    <div className="flex w-full justify-around border-t border-gray-800 bg-[#0A1930] text-white">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            disabled={tab.isLocked}
            className={cn(
              "flex flex-1 flex-col items-center py-3 relative transition-all duration-300 btn-press",
              getTextColorClass(tab, isActive)
            )}
          >
            <div className="relative">
              {tab.icon}
              {tab.isLocked && (
                <div className="absolute -top-1 -right-1 bg-[#0A1930] rounded-full p-0.5">
                  <LockIcon className="h-3 w-3 text-gray-500" />
                </div>
              )}
              {/* Notification indicator */}
              {tab.hasNotification && !tab.isLocked && (
                <div className="absolute -top-1 -right-1 bg-[#00C2CB] rounded-full w-2.5 h-2.5 animate-pulse" />
              )}
            </div>
            <span className="mt-1 text-xs font-display font-medium tracking-wide">
              {tab.label}
            </span>
            
            {/* Active indicator - only shown after client-side hydration */}
            {showActiveIndicator && isActive && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00C2CB]" />
            )}
          </button>
        );
      })}
    </div>
  );
} 