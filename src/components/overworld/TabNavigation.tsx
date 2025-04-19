"use client";

import { cn } from "@/lib/utils";
import { HomeIcon, GiftIcon, LayersIcon, UsersIcon, LockIcon } from "lucide-react";

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  isLocked?: boolean;
};

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs: Tab[] = [
    {
      id: "play",
      label: "PLAY",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      id: "rewards",
      label: "REWARDS",
      icon: <GiftIcon className="h-5 w-5" />,
      isLocked: true,
    },
    {
      id: "collection",
      label: "COLLECTION",
      icon: <LayersIcon className="h-5 w-5" />,
      isLocked: true,
    },
    {
      id: "friends",
      label: "FRIENDS",
      icon: <UsersIcon className="h-5 w-5" />,
      isLocked: true,
    },
  ];

  return (
    <div className="flex w-full justify-around border-t border-gray-800 bg-[#0A1930] text-white">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.isLocked && onTabChange(tab.id)}
          disabled={tab.isLocked}
          className={cn(
            "flex flex-1 flex-col items-center py-3 relative transition-all duration-300 btn-press",
            activeTab === tab.id
              ? "text-[#00C2CB]"
              : tab.isLocked
              ? "text-gray-500"
              : "text-gray-300 hover:text-white"
          )}
        >
          <div className="relative">
            {tab.icon}
            {tab.isLocked && (
              <div className="absolute -top-1 -right-1 bg-[#0A1930] rounded-full p-0.5">
                <LockIcon className="h-3 w-3 text-gray-500" />
              </div>
            )}
          </div>
          <span className="mt-1 text-xs font-display font-medium tracking-wide">
            {tab.label}
          </span>
          
          {/* Active indicator */}
          {activeTab === tab.id && (
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#00C2CB]" />
          )}
        </button>
      ))}
    </div>
  );
} 