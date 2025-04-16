"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Overworld() {
  const [activeTab, setActiveTab] = useState<string>("Math");
  
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      {/* Header */}
      <header className="p-4 bg-white shadow-sm">
        <h1 className="text-3xl font-bold">Incept Layer 2 - Overworld</h1>
        
        {/* Subject Tabs */}
        <div className="flex gap-2 mt-4">
          {["Math", "Science", "History", "Language"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-2 border rounded-md ${
                activeTab === tab 
                  ? "bg-gray-200 border-gray-300" 
                  : "bg-white border-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 relative p-4 flex flex-col items-center justify-center">
        {/* Path with Nodes */}
        <div className="relative w-[700px] h-[200px]">
          {/* Connecting Lines */}
          <div className="absolute top-[50%] left-[15%] w-[20%] h-[2px] bg-blue-700"></div>
          <div className="absolute top-[50%] left-[38%] w-[20%] h-[2px] bg-blue-700"></div>
          <div className="absolute top-[50%] left-[61%] w-[20%] h-[2px] bg-blue-700"></div>
          
          {/* Nodes */}
          <div className="absolute top-[calc(50%-25px)] left-[10%] w-[50px] h-[50px] rounded-full bg-blue-600"></div>
          <div className="absolute top-[calc(50%-25px)] left-[33%] w-[50px] h-[50px] rounded-full bg-blue-600"></div>
          <div className="absolute top-[calc(50%-25px)] left-[56%] w-[50px] h-[50px] rounded-full bg-blue-600"></div>
          
          {/* Last Node with Character */}
          <div className="absolute top-[calc(50%-25px)] left-[79%] w-[50px] h-[50px] rounded-full bg-blue-600 flex items-center justify-center">
            <div className="w-[40px] h-[40px] bg-contain bg-center bg-no-repeat" 
                 style={{ backgroundImage: "url('/character.png')" }}>
              {/* Fallback if image is missing */}
              <div className="w-full h-full flex items-center justify-center text-white text-xs">
                🧙
              </div>
            </div>
          </div>
        </div>
        
        {/* Play Button */}
        <div className="mt-16">
          <Link href="/storyboard">
            <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-2 rounded-md">
              Press Enter to play: Equation Arena
            </Button>
          </Link>
        </div>
      </main>
      
      {/* Optional: Cursor */}
      <div className="absolute bottom-8 left-[50%] transform -translate-x-1/2">
        <span>🖱️</span>
      </div>
    </div>
  );
} 