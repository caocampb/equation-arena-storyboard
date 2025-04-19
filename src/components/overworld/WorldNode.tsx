"use client";

import Link from "next/link";
import { LockIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorldNodeProps {
  title: string;
  href: string;
  isActive?: boolean;
  isLocked?: boolean;
  isCompleted?: boolean;
  completionPercentage?: number;
}

export function WorldNode({
  title,
  href,
  isActive = false,
  isLocked = false,
  isCompleted = false,
  completionPercentage = 0,
}: WorldNodeProps) {
  // Hexagonal node for worlds
  return (
    <div className="relative group">
      {/* Hexagonal shape using clip-path */}
      <div
        className={cn(
          "w-32 h-32 flex items-center justify-center transition-all duration-300",
          "clip-path-hex text-center p-4 shadow-lg",
          isActive 
            ? "bg-[#1A73E8] text-white ring-4 ring-[#00C2CB] scale-110" 
            : isLocked 
              ? "bg-[#696969] text-gray-300"
              : "bg-[#1A73E8] text-white",
          "hover:scale-105 transition-transform"
        )}
      >
        <div className="flex flex-col items-center gap-1">
          {isLocked ? (
            <>
              <LockIcon className="w-8 h-8 mb-1 opacity-70" />
              <div className="font-bold text-sm">{title}</div>
              <div className="text-xs">[LOCKED]</div>
            </>
          ) : (
            <>
              <div className="font-bold text-lg">{title}</div>
              {isCompleted && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  ✓
                </div>
              )}
              {completionPercentage > 0 && !isCompleted && (
                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: `${completionPercentage}%` }} 
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Only create Link if the world is not locked */}
      {!isLocked ? (
        <Link 
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Navigate to ${title}`}
        />
      ) : null}
      
      {/* Pulse animation for active node */}
      {isActive && (
        <div className="absolute inset-0 clip-path-hex animate-pulse bg-[#00C2CB] opacity-20 -z-10" />
      )}
    </div>
  );
} 