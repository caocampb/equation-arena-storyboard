"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockIcon, User2Icon, TrophyIcon, SwordIcon, GemIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleBackground } from "./effects/ParticleBackground";

// Node ID type for type safety
type NodeId = 'overworld' | 'equation-arena' | 'vampire-survivors' | 'battle-pass' | 'math-world';

// Define node details
interface NodeDetails {
  id: NodeId;
  label: string;
  emoji: string;
  x: number;
  y: number;
  route?: string;
  isHexagon?: boolean;
  isUnlocked?: boolean;
  isSpecial?: boolean;
  description?: string;
}

// Add a new edge type for reward usage
type EdgeType = 'navigation' | 'reward' | 'reward-usage';

// Edge type definition
interface Edge {
  source: NodeId;
  target: NodeId;
  type: EdgeType;
  label?: string;
}

// First adjust the SVG viewport width to accommodate the wider curve
const width = 900; // Increased from 700
const height = 500;

// Then update the generatePath function to use consistent values for maximum curve
function generatePath(source: {x: number, y: number}, target: {x: number, y: number}, type: EdgeType): string {
  if (type === 'reward-usage') {
    // Fixed large value to ensure it's always far to the right
    // Using a fixed offset from the center gives a more consistent look
    const centerX = width / 2;
    const offsetX = 350; // Distance from center to control point
    
    const controlPoint1X = centerX + offsetX;
    const controlPoint1Y = source.y;
    const controlPoint2X = centerX + offsetX;
    const controlPoint2Y = target.y;
    
    return `M${source.x},${source.y} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${target.x},${target.y}`;
  }
  
  return `M${source.x},${source.y} L${target.x},${target.y}`;
}

/**
 * Interactive SVG visualization of the player journey across all game modes
 */
export function PlayerJourneyGraph() {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  
  // The graph's viewport dimensions
  const centerX = width / 2;
  
  // Player state represents the currently focused node
  const [focusedNode, setFocusedNode] = useState<NodeId | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeId | null>(null);
  const [tooltip, setTooltip] = useState<{ id: NodeId; x: number; y: number } | null>(null);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });
  const [isClient, setIsClient] = useState(false);
  
  // Use effect to mark client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Define node positions and details
  const nodes: NodeDetails[] = [
    {
      id: 'overworld',
      label: 'Overworld',
      emoji: '🏠',
      x: centerX,
      y: 80,
      route: '/overworld',
      isUnlocked: true
    },
    {
      id: 'math-world',
      label: 'Math World',
      emoji: '🧮',
      x: centerX,
      y: 180, 
      route: '/overworld/math-world',
      isUnlocked: true
    },
    {
      id: 'equation-arena',
      label: 'Equation Arena',
      emoji: '📐',
      x: centerX - 150,
      y: 290,
      route: '/storyboard',
      isHexagon: true,
      isUnlocked: true
    },
    {
      id: 'vampire-survivors',
      label: 'Math Attack',
      emoji: '⚔️',
      x: centerX + 150,
      y: 290,
      isHexagon: true,
      isUnlocked: false
    },
    {
      id: 'battle-pass',
      label: 'Battle Pass',
      emoji: '🏆',
      x: centerX,
      y: 420,
      route: '/rewards',
      isSpecial: true,
      isUnlocked: true,
      description: 'Unlock cosmetics and special items'
    }
  ];
  
  // Define connection edges between nodes
  const edges: Edge[] = [
    // Navigation connections
    { source: 'overworld', target: 'math-world', type: 'navigation' },
    { source: 'math-world', target: 'equation-arena', type: 'navigation' },
    { source: 'math-world', target: 'vampire-survivors', type: 'navigation' },
    
    // Reward connections
    { source: 'equation-arena', target: 'battle-pass', type: 'reward', label: 'Math XP' },
    { source: 'vampire-survivors', target: 'battle-pass', type: 'reward', label: 'Combat XP' },
    
    // Reward usage connection
    { source: 'battle-pass', target: 'overworld', type: 'reward-usage', label: 'Customizations' }
  ];
  
  // Filter out any direct connections between Math World and Battle Pass
  const filteredEdges = edges.filter(edge => 
    !((edge.source === 'math-world' && edge.target === 'battle-pass') || 
      (edge.source === 'battle-pass' && edge.target === 'math-world'))
  );
  
  // Handle node clicks for focusing and navigation
  const handleNodeClick = (node: NodeDetails) => {
    if (!node.isUnlocked) return;
    
    // Visual feedback
    setSelectedNode(node.id);
    setTimeout(() => setSelectedNode(null), 300);
    
    // Set focus
    setFocusedNode(node.id);
    
    // Add click effect
    setClickEffect({
      x: node.x,
      y: node.y,
      active: true
    });
    
    setTimeout(() => {
      setClickEffect(prev => ({ ...prev, active: false }));
    }, 1000);
    
    // Navigate if route is specified
    if (node.route) {
      // Fix for navigation issue - ensure we're using the correct route based on node id
      let targetRoute = node.route;
      
      // Safety check - make sure math-world always goes to math-world page
      if (node.id === 'math-world') {
        targetRoute = '/overworld/math-world';
      } else if (node.id === 'overworld') {
        targetRoute = '/overworld';
      } else if (node.id === 'battle-pass') {
        targetRoute = '/rewards';
      }
      
      setTimeout(() => {
        console.log(`Navigating to: ${targetRoute} for node: ${node.id}`);
        router.push(targetRoute);
      }, 400);
    }
  };
  
  // Handle showing tooltip on hover
  const handleNodeHover = (node: NodeDetails | null) => {
    if (!node) {
      setTooltip(null);
      return;
    }
    
    setTooltip({
      id: node.id,
      x: node.x,
      y: node.y
    });
  };
  
  // Handle edge hover for tooltips - take no parameter but preserve type safety
  const handleEdgeHover = () => {
    // Clear any node tooltips
    setTooltip(null);
  };
  
  return (
    <div className="relative w-full h-[580px] bg-[#0A1929] rounded-lg shadow-xl overflow-hidden">
      {/* WebGL Particle Background */}
      <ParticleBackground />
      
      {/* Blue dot background pattern */}
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(#1A73E8 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        opacity: 0.3
      }}></div>
      
      {/* SVG Graph */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full" 
        viewBox={`0 0 ${width} ${height}`} 
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Connection Lines First */}
        {filteredEdges.map((edge, index) => {
          const source = nodes.find(n => n.id === edge.source)!;
          const target = nodes.find(n => n.id === edge.target)!;
          
          // Determine line style based on edge type
          const isReward = edge.type === 'reward';
          const isRewardUsage = edge.type === 'reward-usage';
          const strokeColor = isReward 
            ? "#FFD700" 
            : isRewardUsage 
              ? "#AC7CFF" // Purple for reward usage
              : "#00C2CB";
          const strokeWidth = (isReward || isRewardUsage) ? "5" : "2";
          const isDashed = isReward || isRewardUsage;
          const isActive = source.isUnlocked && target.isUnlocked;
          
          return (
            <g key={`edge-${index}`} 
               onMouseEnter={() => handleEdgeHover()} 
               onMouseLeave={() => handleEdgeHover()}>
              <path
                d={generatePath(source, target, edge.type)}
                stroke={isActive ? strokeColor : "#9CA3AF"} 
                strokeWidth={strokeWidth} 
                strokeDasharray={isDashed ? "10 5" : "none"}
                className={isReward ? "animate-pulse-subtle" : ""}
                filter={isReward ? "url(#glow-gold)" : isRewardUsage ? "url(#glow-purple)" : ""}
                opacity={isReward && isActive ? "0.8" : "1"}
                fill="none"
              />
              
              {/* Edge label with positioning adjustment for curved paths */}
              {edge.label && (
                <g>
                  {edge.type === 'reward-usage' ? (
                    // For curved reward-usage path, position label to the right
                    <g transform={`translate(${centerX + 320}, ${Math.min(source.y, target.y) + 180})`}>
                      <rect 
                        x="-50" y="-12" 
                        width="100" height="24" 
                        rx="12" 
                        fill="#0A1930" 
                        stroke="#AC7CFF"
                        strokeWidth="1"
                      />
                      <text 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill="#AC7CFF" 
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {edge.label}
                      </text>
                    </g>
                  ) : (
                    // For straight paths, center the label
                    <g transform={`translate(${(source.x + target.x)/2}, ${(source.y + target.y)/2})`}>
                      <rect 
                        x="-40" y="-12" 
                        width="80" height="24" 
                        rx="12" 
                        fill="#0A1930" 
                        stroke={isReward ? "#FFD700" : "#00C2CB"}
                        strokeWidth="1"
                      />
                      <text 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        fill={isReward ? "#FFD700" : "#00C2CB"} 
                        fontSize="12"
                        fontWeight="bold"
                      >
                        {edge.label}
                      </text>
                    </g>
                  )}
                </g>
              )}
              
              {/* Animated SVG particles for reward paths */}
              {(isReward || isRewardUsage) && isActive && isClient && (
                <>
                  {/* More particles and bigger sizes */}
                  {[...Array(8)].map((_, i) => (
                    <circle
                      key={`particle-${index}-${i}`}
                      r={3 + Math.random() * 3} 
                      fill={isRewardUsage ? "#AC7CFF" : "#FFD700"}
                      filter={isRewardUsage ? "url(#glow-purple)" : "url(#glow-gold)"}
                      opacity={0.7 + Math.random() * 0.3}
                    >
                      <animateMotion
                        dur={`${2 + Math.random() * 2}s`}
                        repeatCount="indefinite"
                        path={generatePath(source, target, edge.type)}
                        begin={`${i * 0.3}s`}
                      />
                    </circle>
                  ))}
                  
                  {/* Add a pulsing highlight particle for extra visibility */}
                  <circle 
                    r="4" 
                    fill={isRewardUsage ? "#F2E6FF" : "#FFF5D4"} 
                    opacity="0.8" 
                    filter={isRewardUsage ? "url(#glow-purple)" : "url(#glow-gold)"}
                  >
                    <animateMotion
                      dur="3s"
                      repeatCount="indefinite"
                      path={generatePath(source, target, edge.type)}
                    />
                    <animate
                      attributeName="r"
                      values="4;6;4"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}
            </g>
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <g 
            key={node.id}
            transform={`translate(${node.x}, ${node.y})`}
            className={`cursor-pointer transition-transform duration-150 ${selectedNode === node.id ? 'scale-110' : 'scale-100'}`}
            onClick={() => handleNodeClick(node)}
            onMouseEnter={() => handleNodeHover(node)}
            onMouseLeave={() => handleNodeHover(null)}
          >
            {/* Render different node types */}
            {node.isHexagon ? (
              // Hexagon for game nodes
              <path 
                d="M0,-45 L39,-22.5 L39,22.5 L0,45 L-39,22.5 L-39,-22.5 Z" 
                fill={!node.isUnlocked ? "#696969" : "#1A73E8"}
                stroke={!node.isUnlocked ? "#555555" : "#00C2CB"}
                strokeWidth="2"
                filter={node.isUnlocked ? "url(#glow-teal)" : ""}
              />
            ) : node.isSpecial ? (
              // Special card for Battle Pass
              <rect 
                x="-60" y="-35" 
                width="120" height="70" 
                rx="10" 
                fill="#4169E1"
                stroke="#FFD700" 
                strokeWidth="3"
                filter="url(#glow-gold)"
              />
            ) : (
              // Circle for hub node
              <circle 
                r="30" 
                fill="#4169E1" 
                stroke="#FFD700" 
                strokeWidth="2" 
                filter="url(#glow)"
              />
            )}
            
            {/* Node content */}
            <foreignObject 
              x={node.isSpecial ? "-50" : "-35"} 
              y={node.isSpecial ? "-30" : "-30"} 
              width={node.isSpecial ? "100" : "70"} 
              height="60"
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                {!node.isUnlocked ? (
                  <>
                    <LockIcon className="text-white mb-1 w-5 h-5" />
                    <div className="text-white text-xs font-display font-bold leading-tight">{node.label}</div>
                    <div className="text-white text-[10px]">[LOCKED]</div>
                  </>
                ) : (
                  <>
                    <div className="text-white text-xs font-display font-bold leading-tight">{node.label}</div>
                    <div className="text-xl">{node.emoji}</div>
                    {node.isSpecial && (
                      <div className="flex mt-1 gap-1">
                        <GemIcon className="w-4 h-4 text-cyan-300" />
                        <TrophyIcon className="w-4 h-4 text-amber-300" />
                        <SwordIcon className="w-4 h-4 text-purple-300" />
                      </div>
                    )}
                  </>
                )}
              </div>
            </foreignObject>
          </g>
        ))}
        
        {/* Click Effect */}
        <AnimatePresence>
          {clickEffect.active && (
            <motion.circle
              cx={clickEffect.x}
              cy={clickEffect.y}
              r="0"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="3"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 50, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
        
        {/* Focused player icon */}
        {focusedNode && (
          <PlayerMarker 
            node={nodes.find(n => n.id === focusedNode)!} 
          />
        )}
        
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
          <filter id="glow-teal">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#00C2CB" floodOpacity="0.5" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-gold">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#FFD700" floodOpacity="0.7" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-purple">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feFlood floodColor="#AC7CFF" floodOpacity="0.7" result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      
      {/* Tooltip layer */}
      <AnimatePresence>
        {tooltip && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute z-10 bg-slate-900/90 border border-slate-700 rounded-lg p-3 shadow-xl text-white"
            style={{ 
              left: `${(tooltip.x / width) * 100}%`, 
              top: `${(tooltip.y / height) * 100 + 15}%`,
              transform: 'translate(-50%, 0)'
            }}
          >
            {(() => {
              const node = nodes.find(n => n.id === tooltip.id);
              if (!node) return null;
              
              return (
                <div className="max-w-xs">
                  <h4 className="text-sm font-bold flex items-center gap-2">
                    <span>{node.emoji}</span> {node.label}
                  </h4>
                  {node.description && (
                    <p className="text-xs text-slate-300 mt-1">{node.description}</p>
                  )}
                  {node.route && node.isUnlocked && (
                    <div className="mt-2 text-xs text-cyan-300">Click to navigate</div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Gameplay instructions */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-white text-xs">
        <div className="flex justify-center items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#00C2CB]"></div>
            <span>Navigation Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#FFD700] animate-pulse"></div>
            <span>Reward Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-[#AC7CFF] animate-pulse"></div>
            <span>Reward Usage</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Player marker showing current focus
function PlayerMarker({ node }: { node: NodeDetails }) {
  // Position marker below the node
  const yOffset = node.isHexagon ? 58 : 40;
  
  return (
    <motion.g 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" }}
      transform={`translate(${node.x}, ${node.y + yOffset})`}
    >
      <circle r="14" fill="#FFD700" className="animate-pulse-subtle"/>
      <foreignObject x="-10" y="-10" width="20" height="20">
        <div className="h-full flex items-center justify-center">
          <User2Icon className="w-5 h-5 text-white" />
        </div>
      </foreignObject>
    </motion.g>
  );
} 