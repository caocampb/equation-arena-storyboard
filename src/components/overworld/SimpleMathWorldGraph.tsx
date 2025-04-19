"use client";

import { memo } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Position,
  ConnectionLineType,
  BackgroundVariant,
  NodeProps,
} from "reactflow";
import { LockIcon } from "lucide-react";
import Link from "next/link";
import { useGameState } from "@/context/GameStateContext";
import "reactflow/dist/style.css";

// Node data type
interface HexagonNodeData {
  title: string;
  isActive: boolean;
  isLocked: boolean;
  href: string;
  icon?: string;
}

// Simplified node component - pure render based on props
const HexagonNode = memo(({ data }: NodeProps<HexagonNodeData>) => {
  const { title, isActive, isLocked, href, icon } = data;
  
  return (
    <div className="w-36 h-36 flex items-center justify-center">
      <div className={`
        w-32 h-32 flex items-center justify-center transition-all duration-300
        clip-path-hex text-center p-4 shadow-lg
        ${isActive 
          ? "bg-[#1A73E8] text-white ring-4 ring-[#00C2CB]" 
          : isLocked 
            ? "bg-[#696969] text-gray-300"
            : "bg-[#1A73E8] text-white"}
      `}>
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
      
      {!isLocked && (
        <Link 
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`Navigate to ${title}`}
        />
      )}
    </div>
  );
});

HexagonNode.displayName = "HexagonNode";

const SimpleMathWorldGraph = () => {
  const { worlds } = useGameState();
  const mathWorld = worlds["math-world"];
  
  // Determine if future content is unlocked based on progress
  const isFutureContentUnlocked = mathWorld.completionPercentage >= 80;
  
  // Colors based on progress
  const activeColor = "#00C2CB";
  const completedColor = mathWorld.completionPercentage >= 50 ? "#1A73E8" : "#9CA3AF";
  
  // Define nodes - recreated on each render based on current props
  const nodes: Node<HexagonNodeData>[] = [
    {
      id: 'future-content-1',
      position: { x: 250, y: 50 },
      data: { 
        title: 'Future Content', 
        isActive: false, 
        isLocked: !isFutureContentUnlocked,
        href: '#',
      },
      type: 'hexagon',
      targetPosition: Position.Bottom,
    },
    {
      id: 'equation-arena',
      position: { x: 250, y: 200 },
      data: { 
        title: 'Equation Arena', 
        isActive: true, 
        isLocked: false,
        href: '/storyboard',
        icon: '🔥',
      },
      type: 'hexagon',
      sourcePosition: Position.Top,
      targetPosition: Position.Bottom,
    },
    {
      id: 'future-content-2',
      position: { x: 250, y: 350 },
      data: { 
        title: 'Future Content', 
        isActive: false, 
        isLocked: !isFutureContentUnlocked,
        href: '#',
      },
      type: 'hexagon',
      sourcePosition: Position.Top,
    },
  ];

  // Define edges - recreated on each render based on current props
  const edges: Edge[] = [
    {
      id: 'top-to-middle',
      source: 'future-content-1',
      target: 'equation-arena',
      style: { stroke: activeColor, strokeWidth: 4 },
      animated: true,
      type: 'smoothstep',
    },
    {
      id: 'middle-to-bottom',
      source: 'equation-arena',
      target: 'future-content-2',
      style: { stroke: completedColor, strokeWidth: 4 },
      animated: false,
      type: 'smoothstep',
    },
  ];
  
  // Define node types outside the render function
  const nodeTypes = { hexagon: HexagonNode };

  return (
    <div className="w-full h-[400px]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        connectionLineType={ConnectionLineType.SmoothStep}
        minZoom={0.5}
        maxZoom={1.5}
      >
        <Background color="#1A73E8" variant={BackgroundVariant.Dots} gap={24} size={1} />
      </ReactFlow>
    </div>
  );
};

export default memo(SimpleMathWorldGraph); 