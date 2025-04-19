"use client";

import { useState, useEffect } from "react";
import { LockIcon } from "lucide-react";
import { useGameState } from "@/context/GameStateContext";
import { useRouter } from "next/navigation";

// Main component with minimal dependencies
export default function BasicOverworldGraph() {
  const gameState = useGameState();
  const router = useRouter();
  const [focusedWorld, setFocusedWorld] = useState<string>("math-world");
  
  // Determine active/unlocked state of worlds
  // const mathWorldActive = true; // Math world is always active
  const languageWorldActive = gameState.worlds["language-world"]?.isUnlocked ?? false;
  const scienceWorldActive = gameState.worlds["science-world"]?.isUnlocked ?? false;
  
  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          if (focusedWorld === "math-world") {
            if (gameState.worlds["language-world"]?.isUnlocked) {
              setFocusedWorld("language-world");
            } else if (gameState.worlds["science-world"]?.isUnlocked) {
              setFocusedWorld("science-world");
            }
          }
          break;
        case "ArrowDown":
          if (focusedWorld === "language-world" || focusedWorld === "science-world") {
            setFocusedWorld("math-world");
          }
          break;
        case "ArrowLeft":
          if (focusedWorld === "science-world") {
            if (gameState.worlds["language-world"]?.isUnlocked) {
              setFocusedWorld("language-world");
            } else {
              setFocusedWorld("math-world");
            }
          } else if (focusedWorld === "math-world") {
            if (gameState.worlds["language-world"]?.isUnlocked) {
              setFocusedWorld("language-world");
            }
          }
          break;
        case "ArrowRight":
          if (focusedWorld === "language-world") {
            if (gameState.worlds["science-world"]?.isUnlocked) {
              setFocusedWorld("science-world");
            } else {
              setFocusedWorld("math-world");
            }
          } else if (focusedWorld === "math-world") {
            if (gameState.worlds["science-world"]?.isUnlocked) {
              setFocusedWorld("science-world");
            }
          }
          break;
        case "Enter":
        case " ":
          // Navigate to the focused world if it's unlocked
          if (gameState.worlds[focusedWorld]?.isUnlocked) {
            router.push(`/overworld/${focusedWorld}`);
          }
          break;
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedWorld, gameState, router]);
  
  // Handle navigation
  const handleWorldClick = (worldId: string) => {
    setFocusedWorld(worldId);
    
    if (worldId === "math-world" || gameState.worlds[worldId]?.isUnlocked) {
      router.push(`/overworld/${worldId}`);
    }
  };
  
  return (
    <div className="relative w-full h-[400px] bg-[#0A1929] overflow-hidden">
      {/* Static Background */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(#1A73E8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />
      
      {/* Hard-coded layout with absolute positioning */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[500px] h-[300px]">
          {/* Lines - completely static */}
          {/* Math to Language */}
          <div className="absolute top-[150px] left-[150px] w-[100px] h-[2px] bg-gray-400 origin-left rotate-[-45deg]">
            {languageWorldActive && <div className="absolute inset-0 bg-[#00C2CB]"></div>}
          </div>
          
          {/* Math to Science */}
          <div className="absolute top-[150px] left-[250px] w-[100px] h-[2px] bg-gray-400 origin-left rotate-[45deg]">
            {scienceWorldActive && <div className="absolute inset-0 bg-[#00C2CB]"></div>}
          </div>
          
          {/* Connection dots */}
          <div className="absolute top-[113px] left-[185px] w-[4px] h-[4px] rounded-full bg-gray-400">
            {languageWorldActive && <div className="absolute inset-0 rounded-full bg-[#00C2CB]"></div>}
          </div>
          
          <div className="absolute top-[113px] left-[315px] w-[4px] h-[4px] rounded-full bg-gray-400">
            {scienceWorldActive && <div className="absolute inset-0 rounded-full bg-[#00C2CB]"></div>}
          </div>
          
          {/* Language World - Top Left */}
          <div 
            className="absolute top-[20px] left-[100px] cursor-pointer"
            onMouseEnter={() => setFocusedWorld("language-world")}
            onClick={() => handleWorldClick("language-world")}
          >
            <div 
              className={`
                w-[100px] h-[100px] flex items-center justify-center
                ${!languageWorldActive ? 'bg-gray-600' : 'bg-[#1A73E8]'}
                ${focusedWorld === "language-world" && languageWorldActive ? 'outline outline-4 outline-yellow-400' : ''}
              `}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <div className="text-center">
                {!languageWorldActive ? (
                  <>
                    <div className="flex justify-center">
                      <LockIcon className="text-white mb-1 w-6 h-6" />
                    </div>
                    <div className="text-white text-sm font-bold">Language World</div>
                    <div className="text-white text-xs">[LOCKED]</div>
                  </>
                ) : (
                  <>
                    <div className="text-white text-sm font-bold">Language World</div>
                    <div className="text-2xl mt-1">📚</div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Science World - Top Right */}
          <div 
            className="absolute top-[20px] left-[300px] cursor-pointer"
            onMouseEnter={() => setFocusedWorld("science-world")}
            onClick={() => handleWorldClick("science-world")}
          >
            <div 
              className={`
                w-[100px] h-[100px] flex items-center justify-center
                ${!scienceWorldActive ? 'bg-gray-600' : 'bg-[#1A73E8]'}
                ${focusedWorld === "science-world" && scienceWorldActive ? 'outline outline-4 outline-yellow-400' : ''}
              `}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <div className="text-center">
                {!scienceWorldActive ? (
                  <>
                    <div className="flex justify-center">
                      <LockIcon className="text-white mb-1 w-6 h-6" />
                    </div>
                    <div className="text-white text-sm font-bold">Science World</div>
                    <div className="text-white text-xs">[LOCKED]</div>
                  </>
                ) : (
                  <>
                    <div className="text-white text-sm font-bold">Science World</div>
                    <div className="text-2xl mt-1">🔬</div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Math World - Bottom Center */}
          <div 
            className="absolute top-[200px] left-[200px] cursor-pointer"
            onMouseEnter={() => setFocusedWorld("math-world")}
            onClick={() => handleWorldClick("math-world")}
          >
            <div 
              className={`
                w-[100px] h-[100px] flex items-center justify-center
                bg-[#1A73E8]
                ${focusedWorld === "math-world" ? 'outline outline-4 outline-[#00C2CB]' : ''}
              `}
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              <div className="text-center">
                <div className="text-white text-sm font-bold">Math World</div>
                <div className="text-2xl mt-1">🧮</div>
                {/* Progress bar */}
                <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                  <div 
                    className="h-full bg-yellow-400 rounded-full" 
                    style={{ width: '33%' }} 
                  />
                </div>
              </div>
            </div>
            
            {/* Glow effect for active node */}
            <div 
              className="absolute inset-0 -z-10 bg-[#00C2CB] opacity-20"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Gameplay instructions */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-white text-sm">
        Click on connected nodes to move your player
      </div>
    </div>
  );
} 