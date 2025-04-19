"use client";

import { cn } from "@/lib/utils";

interface PathNodeProps {
  isCompleted?: boolean;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PathNode({
  isCompleted = false,
  isActive = false,
  size = "md",
}: PathNodeProps) {
  const sizeClass = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={cn(
          "rounded-full flex items-center justify-center transition-all duration-300",
          sizeClass[size],
          isActive 
            ? "bg-[#00C2CB] ring-2 ring-white" 
            : isCompleted 
              ? "bg-[#1A73E8]" 
              : "bg-[#696969]"
        )}
      >
        {isCompleted && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      {/* Pulse effect for active node */}
      {isActive && (
        <div className={cn(
          "absolute rounded-full animate-pulse bg-[#00C2CB] opacity-25",
          sizeClass[size]
        )} />
      )}
    </div>
  );
} 