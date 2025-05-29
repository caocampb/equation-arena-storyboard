'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { HomeIcon, GiftIcon, UserIcon, PlayIcon, LayersIcon, ChevronRightIcon } from "lucide-react"
import { ShoppingBagIcon } from "@/components/ui/icons"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEscMenuStore } from "@/context/useEscMenuStore"
import { cn } from "@/lib/utils"
import { WoodPanel } from "@/components/ui/wood-panel"

const getTabFromPath = (path: string | null): string => {
  if (!path) return 'play';
  if (path.includes('/rewards')) return 'rewards';
  if (path.includes('/character')) return 'character';
  if (path.includes('/collections')) return 'collections';
  if (path.includes('/shop')) return 'shop';
  if (path.includes('/overworld') || path === '/') return 'play';
  // Add other potential base paths if needed, otherwise default
  return 'play'; // Default if no match
}

export const EscMenu = () => {
  const { isOpen, close } = useEscMenuStore()
  const router = useRouter()
  const pathname = usePathname()
  // Initialize state simply, useEffect will correct it.
  const [activeTab, setActiveTab] = useState<string>('play');
  
  // Define handleNavigation with useCallback before using it in useEffect
  const handleNavigation = useCallback((destination: string) => {
    if (destination === "resume") {
      close(); // Just close the menu, activeTab remains as it was
      return;
    }
    
    // Update activeTab immediately for visual feedback
    setActiveTab(destination);
    
    const targetPath = destination === "play" ? "/overworld" : `/${destination}`;
    
    // Only navigate if the destination is different from the current actual path
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
    // Always close the menu after action
    close();
  }, [close, pathname, router, setActiveTab]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return; // Only process when menu is open
      
      // Convert to lowercase to make case-insensitive
      const key = e.key.toLowerCase();
      
      switch(key) {
        case 'p': 
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('play');
          break;
        case 'r':
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('rewards');
          break;
        case 'c':
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('character');
          break;
        case 'l': // (Co)llections - using L since C is taken
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('collections');
          break;
        case 's': // Shop - new shortcut
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('shop');
          break;
        case 'escape': // ESC also works as Resume
          e.preventDefault();
          e.stopPropagation();
          handleNavigation('resume');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, handleNavigation]);
  
  // Effect to synchronize activeTab with the current pathname
  useEffect(() => {
    // Only update if the path is available and corresponds to a different tab
    const tabFromPath = getTabFromPath(pathname);
    if (pathname !== null && activeTab !== tabFromPath) {
      setActiveTab(tabFromPath);
    }
    // We need this effect to run when pathname changes.
  }, [pathname, setActiveTab, activeTab]);

  return (
    <Dialog open={isOpen} onOpenChange={(open: boolean) => {
      if (!open) close()
    }}>
      <DialogContent 
        onOpenAutoFocus={(e: React.FocusEvent) => e.preventDefault()} 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-md p-0 overflow-visible border-0 outline-0 shadow-none bg-transparent">
        {/* Maintain the DialogTitle for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Game Menu</DialogTitle>
        </DialogHeader>
        
        {/* Use the WoodPanel with a custom title that uses system fonts */}
        <WoodPanel 
          panelTitle={
            <span style={{ 
              fontFamily: "'Courier New', monospace", 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              Game Menu
            </span>
          }
          nailPositions={{
            topLeft: [24, 24],
            topRight: [24, 24],
            bottomLeft: [24, 24],
            bottomRight: [24, 24]
          }}
          className="mx-auto"
          innerClassName="p-0"
        >
          {/* Vertical menu navigation */}
          <div className="w-full px-4 pb-4 pt-2">
            <div className="stardew-button-container">
              {[
                { id: "play", label: "PLAY", shortcut: "P", icon: <HomeIcon className="h-5 w-5" /> },
                { id: "rewards", label: "REWARDS", shortcut: "R", icon: <GiftIcon className="h-5 w-5" /> },
                { id: "character", label: "CHARACTER", shortcut: "C", icon: <UserIcon className="h-5 w-5" /> },
                { id: "collections", label: "COLLECTIONS", shortcut: "L", icon: <LayersIcon className="h-5 w-5" /> },
                { id: "shop", label: "SHOP", shortcut: "S", icon: <ShoppingBagIcon className="h-5 w-5" /> },
                { id: "resume", label: "RESUME", shortcut: "ESC", icon: <PlayIcon className="h-5 w-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={cn(
                    "stardew-menu-tab menu-button-animation w-full flex items-center transition-colors relative",
                    activeTab === tab.id ? "stardew-menu-tab-active" : "",
                    tab.id === "resume" ? "resume-button" : ""
                  )}
                  onClick={() => handleNavigation(tab.id)}
                  data-sound="click"
                >
                  {/* Arrow indicator for active item */}
                  {activeTab === tab.id && (
                    <div className="arrow-indicator">
                      <ChevronRightIcon className="h-4 w-4" />
                    </div>
                  )}
                  
                  <div className="flex items-center flex-1">
                    <div className="stardew-icon-container">
                      {tab.icon}
                    </div>
                    <span className="text-sm font-medium ml-3">{tab.label}</span>
                  </div>
                  
                  {/* Keyboard shortcut - with proper spacing */}
                  <kbd className="menu-shortcut ml-4">{tab.shortcut}</kbd>
                </button>
              ))}
            </div>
            
            {/* Version indicator */}
            <div className="version-indicator">v0.1</div>
          </div>
        </WoodPanel>

        {/* Component styles */}
        <style jsx>{`
          /* Button animation on open */
          .menu-button-animation {
            animation: buttonAppear 0.3s ease-out backwards;
          }
          
          /* Staggered animation for buttons */
          .stardew-button-container button:nth-child(1) { animation-delay: 0.05s; }
          .stardew-button-container button:nth-child(2) { animation-delay: 0.1s; }
          .stardew-button-container button:nth-child(3) { animation-delay: 0.15s; }
          .stardew-button-container button:nth-child(4) { animation-delay: 0.2s; }
          .stardew-button-container button:nth-child(5) { animation-delay: 0.25s; }
          
          /* Button container - now vertical with enhanced styling */
          .stardew-button-container {
            display: flex;
            flex-direction: column;
            position: relative;
            background: rgba(0,0,0,0.15);
            border-radius: 6px;
            padding: 4px;
            border: 2px solid #3d2813;
            gap: 4px;
            z-index: 1;
            box-shadow: inset 0 0 8px rgba(0,0,0,0.2);
          }
          
          /* Version indicator */
          .version-indicator {
            font-size: 10px;
            color: rgba(255,255,255,0.3);
            text-align: right;
            padding: 4px 6px 0 0;
            font-family: monospace;
          }
          
          /* Keyboard shortcut styling */
          .menu-shortcut {
            font-family: monospace;
            font-size: 11px;
            background: rgba(0,0,0,0.2);
            padding: 2px 4px;
            border-radius: 3px;
            color: rgba(255,255,255,0.7);
            border: 1px solid rgba(0,0,0,0.1);
            margin-left: 16px; /* Increased from 10px to 16px */
            min-width: 20px;
            text-align: center;
            display: inline-block;
          }
          
          /* Arrow indicator for active item */
          .arrow-indicator {
            position: absolute;
            left: -6px;
            top: 50%;
            transform: translateY(-50%);
            color: #ecc06f;
            animation: arrowPulse 1.5s infinite ease-in-out;
          }
          
          @keyframes arrowPulse {
            0%, 100% { opacity: 0.7; transform: translateY(-50%) translateX(-2px); }
            50% { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
          
          /* Tab styling with improved hover and active states */
          .stardew-menu-tab {
            background: #4d331e;
            color: #e0d2c0;
            border: 2px solid #382515;
            border-radius: 5px;
            transition: all 0.2s ease;
            padding: 10px 12px; /* Reset to default padding */
            text-align: left;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          /* Button hover effect with subtle wood grain movement */
          .stardew-menu-tab:hover {
            background: #5e4028;
            transform: translateX(2px);
            box-shadow: -3px 0 5px rgba(0,0,0,0.2);
          }
          
          .stardew-menu-tab:hover::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: 
              repeating-linear-gradient(
                -45deg,
                transparent,
                transparent 8px,
                rgba(255,255,255,0.02) 8px,
                rgba(255,255,255,0.02) 16px
              );
            pointer-events: none;
            animation: subtleShift 2s infinite linear;
          }
          
          @keyframes subtleShift {
            from { background-position: 0 0; }
            to { background-position: 16px 16px; }
          }
          
          /* Selected tab with enhanced styling */
          .stardew-menu-tab-active {
            background: linear-gradient(to right, #704c2a, #805a35);
            border-color: #ecc06f;
            color: #f8e4bc;
            box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
            border-left-width: 4px;
            padding-left: 10px; /* Compensate for thicker border */
          }
          
          /* Brighter background for active state */
          .stardew-menu-tab-active::before {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at center,
              rgba(255,255,255,0.1) 0%,
              transparent 70%
            );
            pointer-events: none;
          }
          
          /* Resume button breathing animation */
          .resume-button {
            animation: breathe 3s infinite ease-in-out;
          }
          
          @keyframes breathe {
            0%, 100% { transform: scale(1.00); }
            50% { transform: scale(1.01); }
          }
          
          /* Icon container with subtle shine effect */
          .stardew-icon-container {
            background: rgba(0,0,0,0.2);
            padding: 6px;
            border-radius: 5px;
            border: 1px solid rgba(0,0,0,0.1);
            display: inline-flex;
            position: relative;
            overflow: hidden;
          }
          
          .stardew-menu-tab-active .stardew-icon-container {
            background: rgba(255,220,150,0.1);
            border-color: rgba(255,220,150,0.3);
          }
          
          /* Shine effect on active icon */
          .stardew-menu-tab-active .stardew-icon-container::after {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            width: 40px;
            height: 40px;
            background: linear-gradient(225deg, rgba(255,255,255,0.3), transparent);
            transform: rotate(35deg);
            animation: shine 3s infinite ease-in-out;
          }
          
          @keyframes shine {
            0%, 100% { transform: translateX(-20px) rotate(35deg); opacity: 0; }
            50% { transform: translateX(20px) rotate(35deg); opacity: 0.3; }
          }
          
          /* Remove default blue focus ring and add custom focus style */
          .stardew-menu-tab:focus,
          .stardew-menu-tab:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px #ecc06f, -3px 0 5px rgba(0,0,0,0.2);
          }
          
          /* Active focus state */
          .stardew-menu-tab-active:focus,
          .stardew-menu-tab-active:focus-visible {
            box-shadow: 0 0 0 2px #ecc06f, inset 0 0 5px rgba(0,0,0,0.2);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
} 