"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TrophyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom coin icon
function CoinsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <circle cx="16" cy="16" r="6" />
      <path d="M8.3 6.3 16 14" />
    </svg>
  );
}

interface HeroPanelProps {
  username: string;
  level: number;
  coins: number;
  xpProgress: number; // 0-100
  achievementCount?: number;
  totalAchievements?: number;
  avatarSrc?: string;
}

export function HeroPanel({
  username,
  level,
  coins,
  xpProgress,
  achievementCount = 0,
  totalAchievements = 0,
  avatarSrc,
}: HeroPanelProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg shadow-lg text-white border border-[#00C2CB]/50">
      {/* Avatar */}
      <Avatar className="h-16 w-16 border-2 border-[#00C2CB] shadow-glow">
        <AvatarImage src={avatarSrc} alt={username} />
        <AvatarFallback className="bg-[#1A73E8] text-white text-xl">
          {username.substring(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      
      {/* User info */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-bold text-lg tracking-wide mb-1">{username}</h3>
            <div className="text-sm text-[#CCCCCC]">
              <span className="bg-[#1A73E8] text-white px-1.5 rounded text-xs font-medium">
                LEVEL {level}
              </span>
              <Progress
                value={xpProgress}
                className={cn(
                  "w-20 h-2 bg-slate-700 rounded-full mt-1.5",
                  "[&>div]:bg-gradient-to-r [&>div]:from-[#FFD700] [&>div]:to-[#FFC000] [&>div]:rounded-full"
                )}
              />
            </div>
          </div>
          
          {/* Achievements & Coins */}
          <div className="flex items-center gap-4">
            {achievementCount > 0 && (
              <div className="flex items-center gap-1.5">
                <TrophyIcon className="h-4 w-4 text-[#FFD700]" />
                <span className="font-medium">
                  {achievementCount}/{totalAchievements}
                </span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 bg-[#1A73E8]/20 rounded-full px-3 py-1">
              <CoinsIcon className="h-4 w-4 text-[#FFD700]" />
              <span className="font-bold">{coins}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 