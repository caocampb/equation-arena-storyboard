"use client";

import { memo } from "react";
import Link from "next/link";
import { LockIcon } from "lucide-react";
import { useGameState } from "@/context/GameStateContext";

// Node props interface
interface WorldNodeProps {
  title: string;
  isActive: boolean;
  isLocked: boolean;
  href: string;
  icon?: string;
}

// Simple World Node component
const WorldNode = memo(({ title, isActive, isLocked, href, icon }: WorldNodeProps) => {
  return (
    <div className="relative group">
      {/* Hexagonal node using clip-path */}
      <div
        className={`
          w-32 h-32 flex items-center justify-center 
          clip-path-hex text-center p-4 shadow-lg transition-all
          ${isActive 
            ? "bg-[#1A73E8] text-white ring-4 ring-[#00C2CB] scale-105" 
            : isLocked 
              ? "bg-[#696969] text-gray-300"
              : "bg-[#1A73E8] text-white"}
          ${!isLocked && "hover:scale-105"}
        `}
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
              {icon && <div className="text-2xl mb-1">{icon}</div>}
              <div className="font-bold text-lg">{title}</div>
            </>
          )}
        </div>
      </div>
      
      {/* Link wrapper */}
      {!isLocked && (
        <Link 
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Navigate to ${title}`}
        />
      )}
      
      {/* Active glow effect */}
      {isActive && (
        <div className="absolute inset-0 clip-path-hex bg-[#00C2CB] opacity-20 animate-pulse -z-10" />
      )}
    </div>
  );
});

WorldNode.displayName = "WorldNode";

// Path connection component
interface PathConnectionProps {
  isActive: boolean;
  isVertical?: boolean;
  length?: number;
}

const PathConnection = memo(({ isActive, isVertical = true, length = 80 }: PathConnectionProps) => {
  return (
    <div 
      className="relative"
      style={{
        width: isVertical ? '2px' : `${length}px`,
        height: isVertical ? `${length}px` : '2px',
      }}
    >
      {/* Static background path */}
      <div className="absolute inset-0 bg-gray-400" />
      
      {/* Animated overlay for active paths */}
      {isActive && (
        <div 
          className={`
            absolute inset-0 bg-[#00C2CB]
            ${isVertical ? "animate-flow-down" : "animate-flow-right"}
          `}
        />
      )}
      
      {/* Dots for texture */}
      <div className={`
        absolute inset-0 flex 
        ${isVertical ? "flex-col" : ""}
        items-center justify-around
      `}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full ${isActive ? "bg-white" : "bg-gray-500"}`}
          />
        ))}
      </div>
    </div>
  );
});

PathConnection.displayName = "PathConnection";

// Main Math World Graph component
const BasicMathWorldGraph = () => {
  const { worlds } = useGameState();
  const mathWorld = worlds["math-world"];
  
  // Determine if future content should be unlocked based on progress
  const isFutureContentUnlocked = mathWorld.completionPercentage >= 80;
  
  return (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Top node (Future Content) */}
        <WorldNode
          title="Future Content"
          isActive={false}
          isLocked={!isFutureContentUnlocked}
          href="#"
        />
        
        {/* Path from top to middle */}
        <div className="my-2">
          <PathConnection isActive={false} isVertical={true} />
        </div>
        
        {/* Middle node (Equation Arena) */}
        <WorldNode
          title="Equation Arena"
          isActive={true}
          isLocked={false}
          href="/storyboard"
          icon="🔥"
        />
        
        {/* Path from middle to bottom */}
        <div className="my-2">
          <PathConnection isActive={false} isVertical={true} />
        </div>
        
        {/* Bottom node (Future Content) */}
        <WorldNode
          title="Future Content"
          isActive={false}
          isLocked={!isFutureContentUnlocked}
          href="#"
        />
      </div>
    </div>
  );
};

export default memo(BasicMathWorldGraph); 