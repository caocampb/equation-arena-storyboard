'use client'

import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { HomeIcon, GiftIcon, UserIcon, PlayIcon, LayersIcon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useEscMenuStore } from "@/context/useEscMenuStore"

export const EscMenu = () => {
  const { isOpen, close } = useEscMenuStore()
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("play")
  
  // Update active tab when pathname changes
  useEffect(() => {
    if (pathname) {
      if (pathname.includes('/rewards')) {
        setActiveTab('rewards');
      } else if (pathname.includes('/character')) {
        setActiveTab('character');
      } else if (pathname.includes('/collections')) {
        setActiveTab('collections');
      } else if (pathname.includes('/overworld') || pathname === '/') {
        setActiveTab('play');
      }
    }
  }, [pathname]);
  
  const handleNavigation = (destination: string) => {
    close();
    setActiveTab(destination);
    
    if (destination === "resume") return;
    router.push(destination === "play" ? "/overworld" : `/${destination}`);
  }

  // For debugging
  console.log("Current pathname:", pathname);
  console.log("Active tab:", activeTab);

  return (
    <Dialog open={isOpen} onOpenChange={open => {
      if (!open) close()
    }}>
      <DialogContent className="sm:max-w-md bg-[#0A1930] text-white border-gray-800 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <DialogTitle className="text-center text-white">Game Menu</DialogTitle>
        </DialogHeader>

        {/* Simple custom tab navigation */}
        <div className="w-full">
          {/* Tab headers */}
          <div className="flex w-full border-b border-gray-800">
            {[
              { id: "play", label: "PLAY", icon: <HomeIcon className="h-5 w-5" /> },
              { id: "rewards", label: "REWARDS", icon: <GiftIcon className="h-5 w-5" /> },
              { id: "character", label: "CHARACTER", icon: <UserIcon className="h-5 w-5" /> },
              { id: "collections", label: "COLLECTIONS", icon: <LayersIcon className="h-5 w-5" /> },
              { id: "resume", label: "RESUME", icon: <PlayIcon className="h-5 w-5" /> }
            ].map(tab => (
              <button
                key={tab.id}
                className={`flex-1 flex flex-col items-center py-3 px-2 transition-colors 
                  focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 
                  focus:shadow-none focus-visible:shadow-none active:outline-none active:border-0
                  ${
                  activeTab === tab.id
                    ? "text-[#00C2CB] border-t-2 border-t-[#00C2CB]" 
                    : "text-gray-300 hover:bg-[#0D1F41] hover:text-white"
                }`}
                onClick={() => handleNavigation(tab.id)}
                style={{
                  outline: 'none',
                  boxShadow: 'none',
                  borderColor: activeTab === tab.id ? '#00C2CB' : 'transparent'
                }}
              >
                {tab.icon}
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 