"use client";

import { useState } from "react"; // Use state for player position
import { LockIcon, User2Icon, MapPinIcon } from "lucide-react";
import Link from "next/link";
import { useGameState } from "@/context/GameStateContext";

// Player Icon Component (Modified position slightly)
const PlayerIcon = ({ position, nodes }: { position: string, nodes: Record<string, {x: number, y: number}> }) => {
    const coords = nodes[position];
    if (!coords) return null;

    // Place icon beside the node
    const xOffset = position === 'start-node' ? 35 : -60; // Offset right for start, left for others
    const yOffset = 0; 

    return (
        <g transform={`translate(${coords.x + xOffset}, ${coords.y + yOffset})`}>
             {/* Simple icon for now, pulsing can be added */}
             <User2Icon className="w-8 h-8 text-[#FFD700]" /> 
             {/* Line can be added if needed */}
        </g>
    );
};

// Node ID type for this graph
type MathWorldNodeId = 'start-node' | 'future-top' | 'equation-arena' | 'future-bottom';

export default function MathWorldGraph() {
  const { worlds } = useGameState();
  const mathWorld = worlds["math-world"] || { completionPercentage: 0, isUnlocked: true }; 
  // Start player at the new start node
  const [currentPosition, setCurrentPosition] = useState<MathWorldNodeId>('start-node');
  const [selectedNode, setSelectedNode] = useState<MathWorldNodeId | null>(null);
  
  // Determine unlock status
  const isFutureContentUnlocked = mathWorld.completionPercentage >= 80;

  // Handle clicks to update player position marker
  const handleNodeClick = (nodeId: MathWorldNodeId) => {
    const isTargetUnlocked = (nodeId === 'equation-arena') || 
                             (nodeId === 'start-node') || 
                             (nodeId.includes('future') && isFutureContentUnlocked);

    if (isTargetUnlocked) {
      setSelectedNode(nodeId);
      setTimeout(() => setSelectedNode(null), 300);
      setCurrentPosition(nodeId); 
    }
  };

  // Define SVG coordinates
  const width = 450; // Keep wider viewbox
  const height = 500;
  const centerX = width / 2 + 50; // Keep main stack slightly right
  const nodeSpacing = 160;
  const topY = height / 2 - nodeSpacing; // 90
  const middleY = height / 2; // 250
  const bottomY = height / 2 + nodeSpacing; // 410

  const startX = centerX - 150; // Position start node clearly to the left
  const startY = middleY; // Align vertically with Equation Arena for now

  const nodeCoords: Record<MathWorldNodeId, {x: number, y: number}> = {
      'start-node': { x: startX, y: startY },
      'future-top': { x: centerX, y: topY },
      'equation-arena': { x: centerX, y: middleY },
      'future-bottom': { x: centerX, y: bottomY }
  };

  // Calculate control points for curved paths
  // Start -> Arena (Golden Path)
  const cp_start_arena_x = startX + (centerX - startX) * 0.5;
  const cp_start_arena_y = startY - 30; // Control point above line for curve
  // Arena -> Top
  const cp_arena_top_x = centerX - 40;
  const cp_arena_top_y = middleY - (middleY - topY) * 0.5;
  // Arena -> Bottom
  const cp_arena_bottom_x = centerX + 40;
  const cp_arena_bottom_y = middleY + (bottomY - middleY) * 0.5;
  // Start -> Top
  const cp_start_top_x = startX + (centerX - startX) * 0.3; // Control point closer to start
  const cp_start_top_y = startY + (topY - startY) * 0.7; // Control point closer to top vertically
  // Start -> Bottom
  const cp_start_bottom_x = startX + (centerX - startX) * 0.3; // Control point closer to start
  const cp_start_bottom_y = startY + (bottomY - startY) * 0.7; // Control point closer to bottom vertically

  // Determine Golden Path status
  const isPathToArenaGolden = currentPosition === 'start-node';

  return (
    <div className="w-full h-[500px] flex items-center justify-center relative">
      {/* SVG Container */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Background pattern can be added here if needed */}
         {/* <rect width="100%" height="100%" fill="url(#pattern-dots)" /> */}
         
        {/* Connection Paths */}
        {/* Start Node to Equation Arena (Golden Path when player is at start) */}
        <path 
          d={`M ${startX} ${startY} Q ${cp_start_arena_x} ${cp_start_arena_y}, ${centerX} ${middleY}`}
          stroke={isPathToArenaGolden ? "#FFD700" : "#9CA3AF"} 
          strokeWidth={isPathToArenaGolden ? 6 : 2}
          strokeDasharray={isPathToArenaGolden ? "none" : "6 2"}
          className={`fill-none ${isPathToArenaGolden ? "animate-pulse-subtle" : ""}`}
          filter={isPathToArenaGolden ? "url(#glow)" : "none"} 
        />
        {/* Equation Arena to Future Top (Inactive) */}
         <path 
          d={`M ${centerX} ${middleY} Q ${cp_arena_top_x} ${cp_arena_top_y}, ${centerX} ${topY}`}
          stroke={"#9CA3AF"} 
          strokeWidth={2}
          strokeDasharray={"6 2"}
          className={"fill-none"}
        />
        {/* Equation Arena to Future Bottom (Inactive) */}
        <path 
          d={`M ${centerX} ${middleY} Q ${cp_arena_bottom_x} ${cp_arena_bottom_y}, ${centerX} ${bottomY}`}
          stroke={"#9CA3AF"} 
          strokeWidth={2}
          strokeDasharray={"6 2"}
          className={"fill-none"}
        />
        {/* ADDED: Start Node to Future Top (Inactive) */}
        <path 
          d={`M ${startX} ${startY} Q ${cp_start_top_x} ${cp_start_top_y}, ${centerX} ${topY}`}
          stroke={"#9CA3AF"} 
          strokeWidth={2}
          strokeDasharray={"6 2"}
          className={"fill-none"}
        />
        {/* ADDED: Start Node to Future Bottom (Inactive) */}
        <path 
          d={`M ${startX} ${startY} Q ${cp_start_bottom_x} ${cp_start_bottom_y}, ${centerX} ${bottomY}`}
          stroke={"#9CA3AF"} 
          strokeWidth={2}
          strokeDasharray={"6 2"}
          className={"fill-none"}
        />

        {/* Nodes */}
        {[ 'start-node', 'future-top', 'equation-arena', 'future-bottom' ].map((nodeId) => {
          const { x, y } = nodeCoords[nodeId as MathWorldNodeId];
          const isLocked = nodeId.includes('future') && !isFutureContentUnlocked;
          const isActive = currentPosition === nodeId;
          const isArena = nodeId === 'equation-arena';
          const isStart = nodeId === 'start-node';
          const nodeScale = selectedNode === nodeId ? 'scale-110' : 'scale-100';
          const isClickable = (nodeId === 'equation-arena') || (nodeId === 'start-node') || (nodeId.includes('future') && isFutureContentUnlocked);

          if (isStart) {
            // Render Start Node (Circle + MapPin)
            return (
              <g 
                key={nodeId}
                transform={`translate(${x}, ${y})`}
                className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} transition-transform duration-150 ${nodeScale}`}
                onClick={() => handleNodeClick(nodeId as MathWorldNodeId)}
              >
                <circle 
                  r="25" 
                  fill={isActive ? "#00C2CB" : "#4B5563"} 
                  stroke={isActive ? "#00C2CB" : "#374151"}
                  strokeWidth="3"
                  className={isActive ? "shadow-glow" : ""}
                  filter={isActive ? "url(#glow-teal)" : "none"}
                />
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <div className="h-full flex items-center justify-center">
                    <MapPinIcon className="w-4 h-4 text-white" /> 
                  </div>
                </foreignObject>
              </g>
            );
          } else {
             // Render World Nodes (Hexagons)
             return (
                <g 
                  key={nodeId}
                  transform={`translate(${x}, ${y})`}
                  className={`${isClickable ? 'cursor-pointer' : 'cursor-default'} transition-transform duration-150 ${nodeScale}`}
                  onClick={() => handleNodeClick(nodeId as MathWorldNodeId)}
                >
                  <path 
                    d="M0,-45 L39,-22.5 L39,22.5 L0,45 L-39,22.5 L-39,-22.5 Z" 
                    fill={isLocked ? "#696969" : "#1A73E8"} 
                    stroke={isActive ? "#00C2CB" : (isLocked ? "#555555" : "#1A73E8")}
                    strokeWidth={isActive ? 6 : 2}
                    className={isActive ? "shadow-glow" : ""}
                    filter={isActive ? "url(#glow-teal)" : "none"} 
                  />
                  <foreignObject x="-35" y="-35" width="70" height="70">
                    <div className="h-full flex flex-col items-center justify-center text-center p-1">
                      {isLocked ? (
                        <>
                          <LockIcon className="text-white mb-1 w-6 h-6 opacity-80" />
                          <div className="text-white text-xs font-display font-bold leading-tight">Future Content</div>
                          <div className="text-white text-[10px]">[LOCKED]</div>
                        </>
                      ) : (
                        <>
                          {isArena && <div className="text-3xl" style={{marginTop: '-4px'}}>🔥</div>}
                          <div className="text-white text-sm font-display font-bold tracking-wide leading-tight mt-1">
                            {isArena ? 'Equation Arena' : 'Future Content'}
                          </div>
                        </>
                      )}
                    </div>
                  </foreignObject>
                  {/* Link only on Arena node */}
                  {isArena && (
                    <foreignObject x="-45" y="-45" width="90" height="90">
                      <div className="h-full w-full">
                        <Link 
                          href="/storyboard" 
                          className="block h-full w-full opacity-0 rounded-full focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A1930] focus:ring-[#00C2CB]"
                          aria-label="Navigate to Equation Arena"
                        />
                      </div>
                    </foreignObject>
                  )}
                </g>
             );
          }
        })}

        {/* Player Icon */}
        <PlayerIcon position={currentPosition} nodes={nodeCoords} />

        {/* Filters */}
        <defs>
           <filter id="glow-teal">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feFlood floodColor="#00C2CB" floodOpacity="0.7" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
           {/* Added glow filter for golden path */}
           <filter id="glow">
             <feGaussianBlur stdDeviation="2.5" result="blur" />
             <feFlood floodColor="#FFD700" floodOpacity="0.5" result="color" />
             <feComposite in="color" in2="blur" operator="in" result="glow" />
             <feMerge>
               <feMergeNode in="glow" />
               <feMergeNode in="SourceGraphic" />
             </feMerge>
           </filter>
        </defs>
      </svg>
    </div>
  );
} 