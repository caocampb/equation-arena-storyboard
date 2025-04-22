"use client";

import { useState, useEffect, useCallback } from "react";
import { LockIcon, User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameState } from "@/context/GameStateContext";

// Node ID type for type safety
type NodeId = 'science-world' | 'language-world' | 'left-connector' | 'right-connector' | 'math-world';

// Main component with stable HTML/CSS implementation
export default function OverworldGraph() {
  const { worlds } = useGameState();
  const router = useRouter();
  const [playerPosition, setPlayerPosition] = useState<NodeId>('math-world');
  const [visitedNodes, setVisitedNodes] = useState<NodeId[]>(['math-world']);
  const [focusedWorld, setFocusedWorld] = useState<NodeId>('math-world');
  
  // Handle node clicks for player movement - moved before useEffect and wrapped with useCallback
  const handleNodeClick = useCallback((nodeId: NodeId) => {
    const isWorld = nodeId.includes('world');
    const isConnector = nodeId.includes('connector');
    
    // Check if clicked node is accessible
    const isUnlocked = isConnector || worlds[nodeId]?.isUnlocked || nodeId === 'math-world';
    
    if (isUnlocked) {
      // Update player position
      setPlayerPosition(nodeId);
      setFocusedWorld(nodeId);
      
      // Add to visited nodes if not already there
      if (!visitedNodes.includes(nodeId)) {
        setVisitedNodes([...visitedNodes, nodeId]);
      }
      
      // Navigate to world page if it's a world node
      if (isWorld) {
        router.push(`/overworld/${nodeId}`);
      }
    }
  }, [worlds, visitedNodes, router]);
  
  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "ArrowUp":
          if (focusedWorld === "math-world") {
            if (worlds["language-world"].isUnlocked) {
              setFocusedWorld("language-world");
            } else if (worlds["science-world"].isUnlocked) {
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
            if (worlds["language-world"].isUnlocked) {
              setFocusedWorld("language-world");
            } else {
              setFocusedWorld("math-world");
            }
          } else if (focusedWorld === "math-world") {
            if (worlds["language-world"].isUnlocked) {
              setFocusedWorld("language-world");
            }
          }
          break;
        case "ArrowRight":
          if (focusedWorld === "language-world") {
            if (worlds["science-world"].isUnlocked) {
              setFocusedWorld("science-world");
            } else {
              setFocusedWorld("math-world");
            }
          } else if (focusedWorld === "math-world") {
            if (worlds["science-world"].isUnlocked) {
              setFocusedWorld("science-world");
            }
          }
          break;
        case "Enter":
        case " ":
          // Navigate to the focused world if it's unlocked
          if (worlds[focusedWorld]?.isUnlocked || focusedWorld === "math-world") {
            handleNodeClick(focusedWorld);
          }
          break;
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedWorld, worlds, router, handleNodeClick]);
  
  // Check if connection is active
  const isConnectionActive = (node1: NodeId, node2: NodeId) => {
    return visitedNodes.includes(node1) && visitedNodes.includes(node2);
  };
  
  // Determine which nodes and paths are active/unlocked
  // const mathWorldActive = true; // Math world is always active
  const languageWorldActive = worlds["language-world"]?.isUnlocked ?? false;
  const scienceWorldActive = worlds["science-world"]?.isUnlocked ?? false;
  
  // Science-Language connection active if both are visited
  const scienceLanguageActive = isConnectionActive('science-world', 'language-world');
  
  // Left connector connections
  const leftConnectorActive = visitedNodes.includes('left-connector');
  const scienceLeftConnectorActive = isConnectionActive('science-world', 'left-connector');
  const mathLeftConnectorActive = isConnectionActive('math-world', 'left-connector');
  
  // Right connector connections
  const rightConnectorActive = visitedNodes.includes('right-connector');
  const languageRightConnectorActive = isConnectionActive('language-world', 'right-connector');
  const mathRightConnectorActive = isConnectionActive('math-world', 'right-connector');

  return (
    <div className="relative w-full h-[580px] bg-[#0A1929] overflow-hidden">
      {/* Static Background with dot pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: 'radial-gradient(#1A73E8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }}
      />
      
      {/* Centered layout with fixed positions */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[600px] h-[500px]">
          {/* Connection paths */}
          {/* Science to Language */}
          <div className="absolute top-[150px] left-[200px] w-[400px] h-[2px] bg-gray-400">
            {scienceLanguageActive && (
              <div className="absolute inset-0 bg-[#00C2CB]"></div>
            )}
          </div>
          
          {/* Science to Left Connector */}
          <div className="absolute top-[190px] left-[220px] w-[100px] h-[2px] bg-gray-400 origin-left rotate-[45deg]">
            {scienceLeftConnectorActive && (
              <div className="absolute inset-0 bg-[#00C2CB]"></div>
            )}
          </div>
          
          {/* Language to Right Connector */}
          <div className="absolute top-[190px] left-[480px] w-[100px] h-[2px] bg-gray-400 origin-left rotate-[135deg]">
            {languageRightConnectorActive && (
              <div className="absolute inset-0 bg-[#00C2CB]"></div>
            )}
          </div>
          
          {/* Left Connector to Math */}
          <div className="absolute top-[300px] left-[260px] w-[140px] h-[2px] bg-gray-400 origin-left rotate-[45deg]">
            {mathLeftConnectorActive && (
              <div className="absolute inset-0 bg-[#00C2CB]"></div>
            )}
          </div>
          
          {/* Right Connector to Math */}
          <div className="absolute top-[300px] left-[440px] w-[140px] h-[2px] bg-gray-400 origin-left rotate-[135deg]">
            {mathRightConnectorActive && (
              <div className="absolute inset-0 bg-[#00C2CB]"></div>
            )}
          </div>
          
          {/* Left Connector Node */}
          <div 
            className="absolute top-[300px] left-[230px] w-[40px] h-[40px] rounded-full cursor-pointer"
            onClick={() => handleNodeClick('left-connector')}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-600">
              {leftConnectorActive && (
                <div className="absolute inset-0 rounded-full bg-[#6B7280]"></div>
              )}
              <div className="w-5 h-5 rounded-full bg-white"></div>
              
              {/* Player avatar */}
              {playerPosition === 'left-connector' && (
                <div className="absolute top-[40px] w-[24px] h-[24px] rounded-full bg-[#FBBF24] flex items-center justify-center">
                  <User2Icon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
          
          {/* Right Connector Node */}
          <div 
            className="absolute top-[300px] left-[370px] w-[40px] h-[40px] rounded-full cursor-pointer"
            onClick={() => handleNodeClick('right-connector')}
          >
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gray-600">
              {rightConnectorActive && (
                <div className="absolute inset-0 rounded-full bg-[#6B7280]"></div>
              )}
              <div className="w-5 h-5 rounded-full bg-white"></div>
              
              {/* Player avatar */}
              {playerPosition === 'right-connector' && (
                <div className="absolute top-[40px] w-[24px] h-[24px] rounded-full bg-[#FBBF24] flex items-center justify-center">
                  <User2Icon className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
          
          {/* Science World - Top Left */}
          <div 
            className="absolute top-[150px] left-[200px] cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setFocusedWorld("science-world")}
            onClick={() => handleNodeClick("science-world")}
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
                    {worlds["science-world"].completionPercentage > 0 && (
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${worlds["science-world"].completionPercentage}%` }} 
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Player avatar */}
            {playerPosition === 'science-world' && (
              <div className="absolute top-[100px] left-[50px] w-[24px] h-[24px] rounded-full bg-[#FBBF24] flex items-center justify-center">
                <User2Icon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          {/* Language World - Top Right */}
          <div 
            className="absolute top-[150px] left-[400px] cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setFocusedWorld("language-world")}
            onClick={() => handleNodeClick("language-world")}
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
                    {worlds["language-world"].completionPercentage > 0 && (
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                        <div 
                          className="h-full bg-yellow-400 rounded-full" 
                          style={{ width: `${worlds["language-world"].completionPercentage}%` }} 
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {/* Player avatar */}
            {playerPosition === 'language-world' && (
              <div className="absolute top-[100px] left-[50px] w-[24px] h-[24px] rounded-full bg-[#FBBF24] flex items-center justify-center">
                <User2Icon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          {/* Math World - Bottom Center */}
          <div 
            className="absolute top-[450px] left-[300px] cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            onMouseEnter={() => setFocusedWorld("math-world")}
            onClick={() => handleNodeClick("math-world")}
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
                {worlds["math-world"].completionPercentage > 0 && (
                  <div className="w-16 h-1.5 bg-gray-200 rounded-full mt-1">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${worlds["math-world"].completionPercentage}%` }} 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Glow effect for active node */}
            <div 
              className="absolute inset-0 -z-10 bg-[#00C2CB] opacity-20"
              style={{
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            />
            
            {/* Player avatar */}
            {playerPosition === 'math-world' && (
              <div className="absolute top-[100px] left-[50px] w-[24px] h-[24px] rounded-full bg-[#FBBF24] flex items-center justify-center">
                <User2Icon className="w-4 h-4 text-white" />
              </div>
            )}
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