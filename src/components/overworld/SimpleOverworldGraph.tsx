"use client";

import { useState } from "react";
import { LockIcon, User2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGameState } from "@/context/GameStateContext";

// Node ID type for type safety - Added 'hub' node
type NodeId = 'science-world' | 'language-world' | 'left-connector' | 'right-connector' | 'math-world' | 'hub';

/**
 * A simplified overworld graph component using point-and-click interaction.
 */
export default function SimpleOverworldGraph() {
  const { worlds } = useGameState();
  const pathname = usePathname();

  // Player state represents the node the player icon is currently at - Start at hub
  const [playerPosition, setPlayerPosition] = useState<NodeId>('hub');
  // Keep track of visited nodes for path styling - Include hub in visited
  const [visitedNodes, setVisitedNodes] = useState<NodeId[]>(['hub']);
  // State for visual selection feedback on click
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  
  // Handle node clicks for moving the player position marker
  const handleNodeClick = (nodeId: NodeId) => {
    // Check if the node is unlocked
    const isUnlocked = nodeId.includes('connector') || nodeId === 'hub' || worlds[nodeId]?.isUnlocked || nodeId === 'math-world';
    
    if (isUnlocked) {
      // Provide immediate visual feedback
      setSelectedNode(nodeId);
      setTimeout(() => setSelectedNode(null), 300); // Reset after animation duration
      
      // Update player position marker after a short delay
      setTimeout(() => {
        setPlayerPosition(nodeId);
      // Add to visited nodes if not already there
      if (!visitedNodes.includes(nodeId)) {
        setVisitedNodes([...visitedNodes, nodeId]);
      }
      }, 150);
      // Navigation is handled by the Link component on Math World
    }
  };
  
  // Check if connection is active (based on visited nodes)
  const isConnectionActive = (node1: NodeId, node2: NodeId) => {
    // A connection is active if BOTH nodes have been visited
    return visitedNodes.includes(node1) && visitedNodes.includes(node2);
  };
  
  // Determine which worlds are unlocked (using original logic)
  const scienceWorldActive = worlds['science-world']?.isUnlocked ?? false;
  const languageWorldActive = worlds['language-world']?.isUnlocked ?? false;
  
  // Connection states (using original isConnectionActive logic)
  const scienceLanguageActive = isConnectionActive('science-world', 'language-world');
  const scienceLeftActive = isConnectionActive('science-world', 'left-connector');
  const languageRightActive = isConnectionActive('language-world', 'right-connector');
  const leftMathActive = isConnectionActive('left-connector', 'math-world');
  const rightMathActive = isConnectionActive('right-connector', 'math-world');
  
  // Hub connection states
  const hubLeftActive = isConnectionActive('hub', 'left-connector');
  const hubRightActive = isConnectionActive('hub', 'right-connector');

  // Golden path highlighting (updated for hub)
  const isGoldenPath = (node1: NodeId, node2: NodeId) => {
    return (
      // Paths from hub to connectors are golden
      (node1 === 'hub' && (node2 === 'left-connector' || node2 === 'right-connector')) ||
      // Classic golden paths to math world
      (node1 === 'left-connector' && node2 === 'math-world') || 
      (node1 === 'right-connector' && node2 === 'math-world')
    );
  };

  // Define coordinates for a perfectly aligned graph
  const width = 600;
  const height = 500;
  const centerX = width / 2;
  
  // Hub node coordinates - positioned center, between connectors and Math World
  const hubX = centerX;
  const hubY = 230;
  
  // World node coordinates
  const scienceX = width / 4;  // Left quarter
  const languageX = (width * 3) / 4;  // Right quarter
  const worldsY = 80;  // Top distance
  const mathX = centerX;  // Center
  const mathY = 380;  // Bottom
  
  // Connector coordinates - Reverted to values closer to the visual spec
  const connectorY = 220;  // Middle height between top and bottom
  const leftConnectorX = centerX - 80;  // Left of center (300 - 80 = 220)
  const rightConnectorX = centerX + 80;  // Right of center (300 + 80 = 380)

  return (
    <div className="relative w-full h-[580px] bg-[#5a3921]/40 rounded-lg border border-[#3d2813] shadow-inner overflow-hidden">
      {/* Wooden dot background pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(#67492f 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.3
      }}></div>
      
      {/* SVG Graph Using Precise Coordinates */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {/* Connection Lines */}
        {/* Science to Language (horizontal) */}
        <line 
          x1={scienceX} y1={worldsY} 
          x2={languageX} y2={worldsY} 
          stroke={scienceLanguageActive ? "#34A65F" : "#67492f"} 
          strokeWidth="2" 
        />
        
        {/* Science to Left Connector */}
        <line 
          x1={scienceX} y1={worldsY} 
          x2={leftConnectorX} y2={connectorY} 
          stroke={scienceLeftActive ? "#34A65F" : "#67492f"} 
          strokeWidth="2" 
        />
        
        {/* Language to Right Connector */}
        <line 
          x1={languageX} y1={worldsY} 
          x2={rightConnectorX} y2={connectorY} 
          stroke={languageRightActive ? "#34A65F" : "#67492f"} 
          strokeWidth="2" 
        />
        
        {/* Hub to Left Connector - Golden Path */}
        <line 
          x1={hubX} y1={hubY} 
          x2={leftConnectorX} y2={connectorY} 
          stroke={isGoldenPath('hub', 'left-connector') ? "#FFD700" : (hubLeftActive ? "#34A65F" : "#67492f")} 
          strokeWidth={isGoldenPath('hub', 'left-connector') ? "4" : "2"}
          strokeDasharray={isGoldenPath('hub', 'left-connector') && !hubLeftActive ? "6 2" : "none"}
          className={isGoldenPath('hub', 'left-connector') ? "animate-pulse-subtle" : ""}
          filter="url(#glow)"
        />
        
        {/* Hub to Right Connector - Golden Path */}
        <line 
          x1={hubX} y1={hubY} 
          x2={rightConnectorX} y2={connectorY} 
          stroke={isGoldenPath('hub', 'right-connector') ? "#FFD700" : (hubRightActive ? "#34A65F" : "#67492f")} 
          strokeWidth={isGoldenPath('hub', 'right-connector') ? "4" : "2"}
          strokeDasharray={isGoldenPath('hub', 'right-connector') && !hubRightActive ? "6 2" : "none"}
          className={isGoldenPath('hub', 'right-connector') ? "animate-pulse-subtle" : ""}
          filter="url(#glow)"
        />
        
        {/* Left Connector to Math - Golden Path */}
        <line 
          x1={leftConnectorX} y1={connectorY} 
          x2={mathX} y2={mathY} 
          stroke={isGoldenPath('left-connector', 'math-world') ? "#FFD700" : (leftMathActive ? "#34A65F" : "#67492f")} 
          strokeWidth={isGoldenPath('left-connector', 'math-world') ? "6" : "2"}
          strokeDasharray={isGoldenPath('left-connector', 'math-world') && !leftMathActive ? "6 2" : "none"}
          className={isGoldenPath('left-connector', 'math-world') ? "animate-pulse-subtle" : ""}
          filter="url(#glow)"
        />
        
        {/* Right Connector to Math - Golden Path */}
        <line 
          x1={rightConnectorX} y1={connectorY} 
          x2={mathX} y2={mathY} 
          stroke={isGoldenPath('right-connector', 'math-world') ? "#FFD700" : (rightMathActive ? "#34A65F" : "#67492f")} 
          strokeWidth={isGoldenPath('right-connector', 'math-world') ? "6" : "2"}
          strokeDasharray={isGoldenPath('right-connector', 'math-world') && !rightMathActive ? "6 2" : "none"}
          className={isGoldenPath('right-connector', 'math-world') ? "animate-pulse-subtle" : ""}
          filter="url(#glow)"
        />
        
        {/* Hub Node */}
        <g 
          transform={`translate(${hubX}, ${hubY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'hub' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('hub')}
        >
          <circle r="20" fill="#7a5033" stroke="#FFD700" strokeWidth="2" filter="url(#glow)"/>
          <foreignObject x="-15" y="-15" width="30" height="30">
            <div className="h-full flex items-center justify-center">
              <div className="text-white text-xl">🏠</div>
            </div>
          </foreignObject>
        </g>
        
        {/* Connector Nodes - Use handleNodeClick */}
        <g 
          transform={`translate(${leftConnectorX}, ${connectorY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'left-connector' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('left-connector')}
        >
          <circle r="12" fill="#5a3921" />
          <circle r="6" fill="#f8e4bc" />
        </g>
        
        <g 
          transform={`translate(${rightConnectorX}, ${connectorY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'right-connector' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('right-connector')}
        >
          <circle r="12" fill="#5a3921" />
          <circle r="6" fill="#f8e4bc" />
        </g>
        
        {/* World Nodes - Use handleNodeClick */}
        {/* Science World */}
        <g 
          transform={`translate(${scienceX}, ${worldsY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'science-world' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('science-world')}
        >
          <path 
            d="M0,-45 L39,-22.5 L39,22.5 L0,45 L-39,22.5 L-39,-22.5 Z" 
            fill={!scienceWorldActive ? "#67492f" : "#7a5033"}
            stroke={!scienceWorldActive ? "#5a3921" : "#FFD700"}
            strokeWidth="2"
          />
          <foreignObject x="-35" y="-30" width="70" height="60">
            <div className="h-full flex flex-col items-center justify-center text-center">
              {!scienceWorldActive ? (
                <>
                  <LockIcon className="text-[#f8e4bc] mb-1 w-5 h-5" />
                  <div className="text-[#f8e4bc] text-xs font-display font-bold leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Science World</div>
                  <div className="text-[#f8e4bc]/70 text-[10px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">[LOCKED]</div>
                </>
              ) : (
                <>
                  <div className="text-[#f8e4bc] text-xs font-display font-bold leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Science World</div>
                  <div className="text-xl">🔬</div>
                </>
              )}
            </div>
          </foreignObject>
        </g>
        
        {/* Language World */}
        <g 
          transform={`translate(${languageX}, ${worldsY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'language-world' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('language-world')}
        >
          <path 
            d="M0,-45 L39,-22.5 L39,22.5 L0,45 L-39,22.5 L-39,-22.5 Z" 
            fill={!languageWorldActive ? "#67492f" : "#7a5033"}
            stroke={!languageWorldActive ? "#5a3921" : "#FFD700"}
            strokeWidth="2"
          />
          <foreignObject x="-35" y="-30" width="70" height="60">
            <div className="h-full flex flex-col items-center justify-center text-center">
              {!languageWorldActive ? (
                <>
                  <LockIcon className="text-[#f8e4bc] mb-1 w-5 h-5" />
                  <div className="text-[#f8e4bc] text-xs font-display font-bold leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Language World</div>
                  <div className="text-[#f8e4bc]/70 text-[10px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">[LOCKED]</div>
                </>
              ) : (
                <>
                  <div className="text-[#f8e4bc] text-xs font-display font-bold leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Language World</div>
                  <div className="text-xl">📚</div>
                </>
              )}
            </div>
          </foreignObject>
        </g>
        
        {/* Math World */}
        <g 
          transform={`translate(${mathX}, ${mathY})`}
          className={`cursor-pointer transition-transform duration-150 ${selectedNode === 'math-world' ? 'scale-110' : 'scale-100'}`}
          onClick={() => handleNodeClick('math-world')}
        >
          <path 
            d="M0,-45 L39,-22.5 L39,22.5 L0,45 L-39,22.5 L-39,-22.5 Z" 
            fill="#7a5033"
            stroke="#FFD700"
            strokeWidth="6"
            className="shadow-glow"
            filter="url(#glow-gold)"
          />
          <foreignObject x="-35" y="-35" width="70" height="70">
            <div className="h-full flex flex-col items-center justify-center text-center">
              {/* Spec Requirement (v0): Display icon-only reward preview here */}
              {/* <div className="absolute top-1 right-1 text-yellow-400">💰</div> */}
              <div className="text-[#f8e4bc] text-sm font-display font-bold tracking-wide leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">Math World</div>
              <div className="text-2xl mt-0.5">🧮</div>
              <div className="w-16 h-2 bg-[#3d2813]/70 rounded-full mt-1.5">
                <div 
                  className="h-full bg-[#FFD700] rounded-full" 
                  style={{ width: `${worlds['math-world']?.completionPercentage}%` }} 
                />
              </div>
            </div>
          </foreignObject>
          
          {/* Add Link back over the Math World node with focus styling */}
          {worlds['math-world']?.isUnlocked && !pathname.includes('/math-world') && (
            <foreignObject x="-45" y="-45" width="90" height="90">
              <div className="h-full w-full">
                <Link 
                  href="/overworld/math-world" 
                  className="block h-full w-full opacity-0 rounded-full focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#7a5033] focus:ring-[#FFD700]"
                >
                  <span className="sr-only">Navigate to Math World</span>
                </Link>
                </div>
              </foreignObject>
          )}
        </g>

        {/* Player Icon - Positioned based on playerPosition state - include hub */}
        <PlayerIcon position={playerPosition} nodes={{ 
            'science-world': { x: scienceX, y: worldsY },
            'language-world': { x: languageX, y: worldsY },
            'left-connector': { x: leftConnectorX, y: connectorY },
            'right-connector': { x: rightConnectorX, y: connectorY },
            'math-world': { x: mathX, y: mathY },
            'hub': { x: hubX, y: hubY }
        }} />

        {/* Add SVG filters for glow effects */}
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-gold">
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
      
      {/* Gameplay instructions - updated for clarity */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[#f8e4bc]/80 text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
        Start at the home node and click on connected nodes to explore
      </div>
    </div>
  );
} 

// Separate PlayerIcon component for clarity
const PlayerIcon = ({ position, nodes }: { position: NodeId, nodes: Record<NodeId, {x: number, y: number}> }) => {
    const coords = nodes[position];
    if (!coords) return null;

    // Determine offset based on node type to place icon below
    let yOffset;
    if (position === 'hub') {
        yOffset = 30; // Smaller offset for hub node
    } else if (position.includes('connector')) {
        yOffset = 24; // Existing offset for connector nodes
    } else {
        yOffset = 58; // Existing offset for world nodes
    }

    return (
        <g transform={`translate(${coords.x}, ${coords.y + yOffset})`}>
            <circle r="14" fill="#FFD700" className="animate-pulse-subtle"/>
            <foreignObject x="-10" y="-10" width="20" height="20">
                <div className="h-full flex items-center justify-center">
                    <User2Icon className="w-5 h-5 text-white" />
                </div>
            </foreignObject>
        </g>
    );
}; 