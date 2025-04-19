"use client";

import { cn } from "@/lib/utils";

interface NavigationPathProps {
  isActive?: boolean;
  isCompleted?: boolean;
  direction?: "horizontal" | "vertical" | "diagonal-up" | "diagonal-down";
  length?: "short" | "medium" | "long";
}

export function NavigationPath({
  isActive = false,
  isCompleted = false,
  direction = "horizontal",
  length = "medium",
}: NavigationPathProps) {
  // Length mapping
  const lengthClass = {
    short: direction.includes("diagonal") ? "w-20" : direction === "horizontal" ? "w-16" : "h-16",
    medium: direction.includes("diagonal") ? "w-32" : direction === "horizontal" ? "w-28" : "h-28",
    long: direction.includes("diagonal") ? "w-48" : direction === "horizontal" ? "w-40" : "h-40",
  };
  
  // Set path styles based on direction
  const pathStyles = {
    horizontal: "h-2",
    vertical: "w-2",
    "diagonal-up": "h-2 rotate-[-45deg] origin-left",
    "diagonal-down": "h-2 rotate-[45deg] origin-left",
  };
  
  // Set flow animation based on direction
  const flowAnimation = isActive ? 
    direction === "horizontal" || direction.includes("diagonal") 
      ? "animate-flow-right" 
      : "animate-flow-down"
    : "";
  
  return (
    <div 
      className={cn(
        "relative flex items-center justify-center",
        lengthClass[length],
        direction === "vertical" && "flex-col"
      )}
    >
      {/* Static path background */}
      <div 
        className={cn(
          "absolute bg-gradient-to-r",
          pathStyles[direction],
          lengthClass[length],
          isCompleted 
            ? "from-[#1A73E8] to-[#1A73E8]" 
            : "from-gray-400 to-gray-400"
        )}
      />
      
      {/* Animated flow particles for active paths */}
      {isActive && (
        <div 
          className={cn(
            "absolute bg-gradient-to-r from-[#00C2CB] to-transparent",
            pathStyles[direction],
            lengthClass[length],
            flowAnimation
          )}
        />
      )}
      
      {/* Dots along the path for visual texture */}
      <div className="absolute w-full h-full flex items-center justify-around">
        {Array.from({ length: direction === "horizontal" || direction.includes("diagonal") ? 5 : 3 }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "rounded-full",
              isCompleted ? "bg-white" : "bg-gray-500",
              direction === "horizontal" || direction.includes("diagonal") ? "w-1 h-1" : "w-1 h-1"
            )}
          />
        ))}
      </div>
    </div>
  );
} 