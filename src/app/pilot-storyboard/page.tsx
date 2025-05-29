"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tent, Flame, Trophy, Users, Sparkles, Coins, 
  Heart, Star, Zap, LogIn, Mail, Home,
  ChevronRight, BarChart3
} from "lucide-react";
import { ConnectorManager } from "@/components/FlowConnector";
import Link from "next/link";
import React from "react";

// Animation variants for smooth, professional transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      mass: 1
    }
  }
};

// Camp navigation component
function CampNavigation({ currentLocation, showReturnToCamp = true }: { 
  currentLocation: string; 
  showReturnToCamp?: boolean;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <Tent className="h-3 w-3" />
          Summer Camp
        </span>
        <span>→</span>
        <span className="text-slate-900 font-medium">{currentLocation}</span>
      </div>
      {showReturnToCamp && (
        <Button variant="ghost" size="sm" className="text-xs text-slate-600 hover:text-emerald-600">
          <Home className="h-3 w-3 mr-1" />
          Return to Camp
        </Button>
      )}
    </div>
  );
}

// Camper avatar component
function CamperAvatar({ level, size = "md", isOnline = false, character }: { 
  level: number; 
  size?: "sm" | "md" | "lg";
  isOnline?: boolean;
  character?: string;
}) {
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm", 
    lg: "h-12 w-12 text-base"
  };
  
  const colors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", 
    "bg-yellow-500", "bg-red-500", "bg-indigo-500"
  ];

  const characterFaces = [
    "🦊", "🐻", "🦉", "🐺", "🦝", "🐸", "🦄", "🐯"
  ];
  
  const characterFace = character || characterFaces[level % characterFaces.length];
  
  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} ${colors[level % colors.length]} rounded-full flex flex-col items-center justify-center text-white font-bold border-2 border-white shadow-md relative overflow-hidden`}>
        <div className="text-xs leading-none">{characterFace}</div>
        <div className="text-xs leading-none font-bold">L{level}</div>
      </div>
      {isOnline && (
        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      )}
    </div>
  );
}

// Ghost player component
function GhostPlayer({ name, level, x, y }: { name: string; level: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute opacity-60"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 10, 0, -10, 0],
        y: [0, -5, 0, 5, 0]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <div className="text-center">
        <div className="flex justify-center mb-1">
          <CamperAvatar level={level} size="sm" isOnline={true} />
        </div>
        <div className="text-xs text-slate-600 font-medium">{name}</div>
      </div>
    </motion.div>
  );
}

export default function PilotStoryboardPage() {
  const [selectedEmote, setSelectedEmote] = useState<string | null>(null);
  const [emoteJustSent, setEmoteJustSent] = useState(false);

  const handleEmoteSend = (emote: string) => {
    setSelectedEmote(emote);
    setEmoteJustSent(true);
    // Reset the "just sent" state after animation
    setTimeout(() => setEmoteJustSent(false), 2000);
  };

  return (
    <div className="min-h-screen p-8 pb-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #fffdf7 0%, #faf8f1 100%)' }}>
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Clean grid pattern */}
        <div className="absolute inset-0 opacity-[0.18]" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Math-themed subtle graphics */}
        <div className="absolute top-32 left-16 text-emerald-300/50 text-3xl font-bold">π</div>
        <div className="absolute top-20 right-32 text-sky-300/50 text-2xl font-bold">√</div>
        <div className="absolute top-2/3 left-20 text-amber-300/50 text-3xl font-bold">∑</div>
        <div className="absolute bottom-40 right-20 text-purple-300/50 text-2xl font-bold">∞</div>
        <div className="absolute top-1/2 right-1/4 text-teal-300/50 text-2xl font-bold">÷</div>
        <div className="absolute bottom-60 left-1/3 text-indigo-300/50 text-3xl font-bold">×</div>
        
        {/* Camp-themed subtle graphics */}
        <div className="absolute top-40 left-1/3 text-orange-300/45 text-2xl">⛺</div>
        <div className="absolute bottom-32 right-1/3 text-red-300/45 text-2xl">🔥</div>
        <div className="absolute top-60 right-16 text-emerald-300/45 text-xl">🌲</div>
        <div className="absolute bottom-20 left-1/4 text-yellow-300/45 text-xl">⭐</div>
        <div className="absolute top-1/3 left-32 text-blue-300/45 text-xl">🏕️</div>
        <div className="absolute bottom-56 right-40 text-purple-300/45 text-xl">🏆</div>
        
        {/* Geometric accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-20 bg-gradient-to-b from-emerald-300/35 to-transparent"></div>
        <div className="absolute top-0 right-1/3 w-px h-16 bg-gradient-to-b from-sky-300/35 to-transparent"></div>
        <div className="absolute bottom-0 left-1/3 w-px h-24 bg-gradient-to-t from-amber-300/35 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-18 bg-gradient-to-t from-purple-300/35 to-transparent"></div>
      </div>

      {/* Header */}
      <header className="mb-12">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Tent className="h-10 w-10 text-emerald-600" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-orange-600 bg-clip-text text-transparent">
              Playcademy Camp
            </h1>
            <Flame className="h-10 w-10 text-orange-500" />
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A pilot program showcasing our camp-themed learning platform 
            where math mastery unlocks adventure
          </p>
        </motion.div>
      </header>

      {/* Design Vision Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-4xl mx-auto mt-12 mb-12"
      >
        <div className="bg-gradient-to-br from-amber-50 via-emerald-50/50 to-orange-50 rounded-3xl p-8 shadow-xl border border-emerald-100/60 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-orange-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/20 to-emerald-200/20 rounded-full blur-2xl"></div>
          
          <div className="relative">
            {/* Main Loop Header */}
            <div className="text-center mb-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.02, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-100 to-orange-100 px-6 py-3 rounded-2xl border-2 border-emerald-200 shadow-sm mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </motion.div>
                <span className="text-lg font-bold text-slate-900">CORE LEARNING LOOP</span>
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-6 w-6 text-sky-600" />
                </motion.div>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                Where Learning Becomes Currency
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                This is our <span className="font-bold text-emerald-700">main loop</span> — the engine that drives engagement, 
                validates learning, and creates the adventure students crave.
              </p>
            </div>
            
            {/* Enhanced Visual Flow */}
            <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 lg:p-8 border border-slate-200 overflow-hidden">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-4 max-w-4xl mx-auto">
                {[
                  { 
                    icon: "🎯", 
                    label: "Math Games", 
                    desc: "Interactive & fun",
                    color: "from-emerald-100 to-green-200",
                    textColor: "text-emerald-700",
                    borderColor: "border-emerald-200"
                  },
                  { 
                    icon: "🪙", 
                    label: "Earn Credits", 
                    desc: "Build currency",
                    color: "from-emerald-100 to-green-200",
                    textColor: "text-emerald-700",
                    borderColor: "border-emerald-200"
                  },
                  { 
                    icon: "🎮", 
                    label: "Play Games", 
                    desc: "Free access",
                    color: "from-orange-100 to-red-200",
                    textColor: "text-orange-700",
                    borderColor: "border-orange-200"
                  },
                  { 
                    icon: "✨", 
                    label: "Buy Powerups", 
                    desc: "Skins & abilities",
                    color: "from-orange-100 to-red-200",
                    textColor: "text-orange-700",
                    borderColor: "border-orange-200"
                  }
                ].map((step, i) => (
                  <React.Fragment key={i}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.2 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`flex flex-col items-center justify-center text-center p-4 bg-gradient-to-br ${step.color} rounded-2xl border-2 ${step.borderColor} shadow-md hover:shadow-lg transition-all w-32 h-32 flex-shrink-0`}
                    >
                      <div className="text-2xl mb-2">{step.icon}</div>
                      <div className={`font-bold text-sm ${step.textColor} mb-1 leading-none`}>{step.label}</div>
                      <div className="text-xs text-slate-600 font-medium leading-none">{step.desc}</div>
                    </motion.div>
                    
                    {i < 3 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: (i * 0.2) + 0.1 }}
                        className="flex flex-col items-center justify-center flex-shrink-0"
                      >
                        <motion.div
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          className="text-lg text-emerald-500 font-bold"
                        >
                          →
                        </motion.div>
                      </motion.div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Flow Connectors */}
        <ConnectorManager 
          connections={[
            { 
              fromId: "frame-1", 
              toId: "frame-2", 
              label: "Enter tent", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top"
            },
            { 
              fromId: "frame-2", 
              toId: "frame-3", 
              label: "Math mastery → Credits", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              isLearningMoment: true,
              labelPosition: "top"
            },
            { 
              fromId: "frame-3", 
              toId: "frame-4", 
              label: "Credits → Powerups", 
              type: "vertical",
              fromAnchor: "bottom",
              toAnchor: "top",
              labelPosition: "right"
            },
            { 
              fromId: "frame-4", 
              toId: "frame-5", 
              label: "Achievements → Camp status", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top"
            },
            { 
              fromId: "frame-5", 
              toId: "frame-6", 
              label: "Social fun", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top"
            },
            { 
              fromId: "frame-6", 
              toId: "frame-7", 
              label: "Parent update", 
              type: "vertical",
              fromAnchor: "bottom",
              toAnchor: "top",
              labelPosition: "right"
            },
            { 
              fromId: "frame-7", 
              toId: "frame-8", 
              label: "Secure login", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top"
            }
          ]}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Row 1: Camp Overworld → Math Tent → Rewards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Frame 1: Camp Overworld */}
            <motion.div variants={cardVariants} className="flex">
              <Card 
                id="frame-1" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Tent className="h-6 w-6" />
                      Camp Overworld
                    </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 1</Badge>
                  </div>
                  <CardDescription className="text-emerald-100">
                    Explore the cozy camp with other learners
                  </CardDescription>
                </div>
                
                  <CardContent className="p-6 flex-1">
                  {/* HUD Display */}
                  <div className="bg-slate-900 rounded-t-xl p-3 flex justify-between items-center text-white">
                    <div className="flex items-center gap-2">
                        <CamperAvatar level={4} size="md" />
                      <div>
                        <span className="text-sm font-medium">Camper_Sparkle</span>
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-emerald-400">Level 4 Mathematician</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Camp Map */}
                  <div className="bg-gradient-to-b from-emerald-100 to-emerald-50 rounded-b-xl p-6 relative h-64">
                    {/* Campfire Center */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-4xl"
                      >
                        🔥
                      </motion.div>
                    </div>
                    
                    {/* Tents */}
                    <div className="absolute top-4 left-4">
                      <div className="text-center cursor-pointer hover:scale-110 transition-transform">
                        <div className="text-3xl">⛺</div>
                        <div className="text-xs font-medium mt-1">Math Tent</div>
                      </div>
                    </div>
                    
                    {/* Player's Enhanced Tent */}
                    <div className="absolute top-4 right-4">
                      <div className="text-center cursor-pointer hover:scale-110 transition-transform relative">
                        <div className="text-3xl relative">
                          🏕️
                          {/* Achievement Badge */}
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-xs">4</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium mt-1 text-emerald-700">Your Tent</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                      <div className="text-center cursor-pointer hover:scale-110 transition-transform">
                        <div className="text-3xl">🎪</div>
                        <div className="text-xs font-medium mt-1">Game Arena</div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 right-4">
                      <div className="text-center cursor-pointer hover:scale-110 transition-transform">
                        <div className="text-3xl">🏆</div>
                        <div className="text-xs font-medium mt-1">Leaderboard</div>
                        <div className="text-xs text-emerald-600">#2 Today</div>
                      </div>
                    </div>
                    
                    {/* Ghost Players */}
                      <GhostPlayer name="StarFox_17" level={4} x={20} y={60} />
                      <GhostPlayer name="MathNinja" level={6} x={70} y={30} />
                      <GhostPlayer name="CampChamp" level={3} x={60} y={70} />
                  </div>
                  
                  {/* Tutorial Popup */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">🦉</span>
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Counselor Ember says:</p>
                        <p className="text-sm text-yellow-800">
                          &ldquo;Nice Level 4 badge on your tent! Other campers can see you&rsquo;re a Fraction Master. Keep it up!&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Social Recognition */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-2xl">🥷</span>
                      <div>
                        <p className="text-sm font-medium text-emerald-900">MathNinja whispers:</p>
                        <p className="text-sm text-emerald-800">
                          &ldquo;Wow, Level 4 already? That accuracy badge is impressive! 🎯&rdquo;
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
                
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                  <div className="text-sm text-slate-600 text-center w-full">
                    <span className="font-medium">World Feel:</span> Cozy, safe, explorable
                  </div>
                </CardFooter>
                </motion.div>
              </Card>
            </motion.div>

            {/* Frame 2: Math Tent */}
            <motion.div variants={cardVariants} className="flex">
              <Card 
                id="frame-2" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-emerald-700 to-green-800 p-6 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <BarChart3 className="h-6 w-6" />
                        Math Tent
                      </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 2</Badge>
                    </div>
                    <CardDescription className="text-green-100">
                      Solve problems to earn precious credits
                    </CardDescription>
                  </div>
                  
                  <CardContent className="p-6 flex-1">
                    <CampNavigation currentLocation="Math Tent" />
                    <div className="bg-amber-50 rounded-xl p-6">
                      {/* Mathinist Game Preview */}
                      <div className="bg-white rounded-lg border-2 border-slate-200 p-4 mb-4">
                        <div className="text-center mb-3">
                          <h3 className="text-lg font-semibold text-slate-800">Mathinist</h3>
                          <p className="text-sm text-slate-600">Strategy game where math IS the gameplay</p>
                        </div>
                        
                        {/* Key Insight - More Prominent */}
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">💡</span>
                            <span className="font-bold text-emerald-900">The Magic:</span>
                          </div>
                          <p className="text-sm text-emerald-800 font-medium">
                            Students think strategy, not schoolwork. Same math (3/4 + 1/2), but feels like resource management!
                          </p>
                        </div>
                        
                        {/* Learning Standards Alignment */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">📚</span>
                            <span className="font-bold text-blue-900">Learning Standards:</span>
                          </div>
                          <div className="text-sm text-blue-800 space-y-1">
                            <div className="flex items-start gap-2">
                              <span className="text-blue-600 font-medium">•</span>
                              <span><strong>5.NF.A.1:</strong> Adding fractions with unlike denominators</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-blue-600 font-medium">•</span>
                              <span><strong>5.NF.A.2:</strong> Problem solving with fractions</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-blue-600 font-medium">•</span>
                              <span><strong>MP.1:</strong> Make sense of problems and persevere</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Compact Game Interface */}
                        <div className="bg-gradient-to-br from-emerald-900 to-green-950 rounded-lg p-4 text-white relative">
                          <div className="text-center mb-3">
                            <p className="text-yellow-300 font-medium">🏰 Castle Defense: Dragon Incoming!</p>
                            <p className="text-sm text-slate-300">Tower needs <span className="text-white font-bold">5/4 stone</span> to survive</p>
                          </div>
                          
                          <div className="text-center mb-3">
                            <div className="text-center mb-3">
                              <p className="text-blue-300 text-sm font-medium">🎯 Calculate stone needed!</p>
                            </div>
                            
                            <div className="flex items-center justify-center gap-2 mb-3">
                              <div className="bg-slate-700 border-2 border-emerald-400 rounded px-3 py-2 text-center">
                                <div className="text-emerald-400 font-bold">3/4</div>
                                <div className="text-xs">Quarry A</div>
                              </div>
                              <span className="text-green-400 text-sm">+</span>
                              <div className="bg-slate-700 border-2 border-emerald-400 rounded px-3 py-2 text-center">
                                <div className="text-emerald-400 font-bold">1/2</div>
                                <div className="text-xs">Quarry B</div>
                              </div>
                              <span className="text-green-400 text-sm">=</span>
                              <div className="bg-green-600 rounded px-3 py-2 text-center">
                                <div className="text-white font-bold">5/4</div>
                                <div className="text-xs">Perfect!</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold text-sm mb-2">
                              🔨 Forge Upgrade!
                            </button>
                            <p className="text-xs text-green-300">✨ Earn credits!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                    <div className="text-sm text-slate-600 text-center w-full">
                      <span className="font-medium">Learning Loop:</span> Problems → Credits → Powerups
                    </div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>

            {/* Frame 3: Return with Rewards */}
            <motion.div variants={cardVariants} className="flex">
              <Card 
                id="frame-3" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg w-full"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Coins className="h-6 w-6" />
                      Rewards Earned!
                    </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 3</Badge>
                  </div>
                    <CardDescription className="text-orange-100">
                    Credits fly into your camp inventory
                  </CardDescription>
                </div>
                
                  <CardContent className="p-6 flex-1">
                    <CampNavigation currentLocation="Rewards Earned!" />
                    <div className="bg-slate-50 rounded-xl p-6 relative overflow-hidden">
                      {/* Confetti Background Effect */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[
                          { left: "15%", top: "20%" },
                          { left: "85%", top: "15%" },
                          { left: "25%", top: "70%" },
                          { left: "75%", top: "80%" },
                          { left: "10%", top: "50%" },
                          { left: "90%", top: "45%" },
                          { left: "45%", top: "25%" },
                          { left: "55%", top: "75%" }
                        ].map((position, i) => (
                          <motion.div
                            key={i}
                            className="absolute text-2xl"
                            style={{
                              left: position.left,
                              top: position.top
                            }}
                            animate={{
                              y: [0, -20, 0],
                              rotate: [0, 360],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          >
                            ✨
                          </motion.div>
                        ))}
                      </div>

                    {/* Success Modal */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg border-2 border-green-200 p-6 mb-4 text-center relative z-10"
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 1 }}
                        className="text-5xl mb-3"
                      >
                        ✨
                      </motion.div>
                      
                        <h3 className="text-xl font-semibold text-green-800 mb-2">
                        Great Job!
                      </h3>
                      <p className="text-slate-600 mb-4">
                        You solved 3 problems correctly!
                      </p>
                      
                        {/* Enhanced Token Animation */}
                      <div className="flex justify-center items-center gap-2 mb-4">
                        <span className="text-lg font-medium">You earned:</span>
                        <motion.div
                          initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.4, 1] }}
                            transition={{ delay: 0.5, type: "tween", duration: 0.8 }}
                            className="flex items-center gap-1 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-300"
                          >
                            <motion.span
                              className="text-3xl"
                              animate={{ 
                                rotateY: [0, 360],
                                scale: [1, 1.2, 1]
                              }}
                              transition={{ 
                                duration: 1,
                                repeat: Infinity,
                                repeatDelay: 2
                              }}
                            >
                              🪙
                            </motion.span>
                          <span className="text-xl font-bold text-yellow-700">+3</span>
                        </motion.div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="bg-blue-50 rounded p-2">
                          <span className="text-blue-700">XP: +50</span>
                        </div>
                        <div className="bg-purple-50 rounded p-2">
                          <span className="text-purple-700">Streak: 5 🔥</span>
                        </div>
                      </div>
                    </motion.div>
                    
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-lg py-3 relative overflow-hidden group">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20"
                            animate={{
                              x: [-100, 100],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          />
                          <div className="flex items-center justify-center gap-2 relative z-10">
                            <Tent className="h-5 w-5" />
                            <span className="font-semibold">Return to Camp</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                    </Button>
                      </motion.div>
                  </div>
                </CardContent>
                
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                  <div className="text-sm text-slate-600 text-center w-full">
                    <span className="font-medium">Feedback:</span> Immediate, visual, satisfying
                  </div>
                </CardFooter>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Row 2: Arcade → Progress → Community */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Frame 4: Arcade Tent */}
            <motion.div variants={cardVariants}>
              <Card 
                id="frame-4" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-orange-600 to-red-700 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Zap className="h-6 w-6" />
                      Game Arena
                    </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 4</Badge>
                  </div>
                    <CardDescription className="text-orange-100">
                    Free-to-play games with powerup shop
                  </CardDescription>
                </div>
                
                  <CardContent className="p-6 flex-1">
                    <CampNavigation currentLocation="Game Arena" />
                    <div className="space-y-6">
                      
                      {/* Powerup Economy */}
                      <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl p-4 border border-slate-100 shadow-sm text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="flex items-center gap-1.5 bg-yellow-100 px-3 py-1.5 rounded-xl shadow-sm border border-yellow-200 flex-shrink-0">
                            <Coins className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-bold text-yellow-700">Credits</span>
                          </div>
                          <span className="text-lg text-slate-400 font-light flex-shrink-0">=</span>
                          <div className="flex items-center gap-1.5 bg-purple-100 px-3 py-1.5 rounded-xl shadow-sm border border-purple-200 flex-shrink-0 min-w-0">
                            <Zap className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <span className="text-sm font-bold text-purple-700 truncate">Powerups</span>
                          </div>
                        </div>
                        <p className="text-slate-600 font-medium text-xs">Unlock abilities, skins & boosts</p>
                      </div>

                      {/* Game Selection */}
                      <div className="space-y-5">
                        <h3 className="text-xl font-bold text-slate-900 text-center">Choose Your Adventure</h3>
                        
                        {/* Featured Game */}
                        <motion.div
                          whileHover={{ 
                            y: -2,
                            transition: { duration: 0.2 }
                          }}
                          className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden"
                        >
                          {/* Subtle background accent */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/50 to-blue-100/50 rounded-full blur-xl"></div>
                          
                          <div className="relative">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-xl shadow-sm">
                                  🎮
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-slate-900">Vibe Code Survivors</h4>
                                  <p className="text-sm text-slate-600">Epic survival adventure</p>
                                </div>
                              </div>
                              
                              <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-200">
                                FREE
                              </div>
                            </div>
                            
                            <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-sm">
                              🚀 Play Now
                            </button>
                          </div>
                        </motion.div>

                        {/* Coming Soon */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border-2 border-dashed border-slate-300 text-center shadow-sm">
                          <div className="flex items-center justify-center gap-3 mb-2">
                            <span className="text-3xl">🏰</span>
                            <span className="font-bold text-slate-600 text-lg">Tower Defense</span>
                          </div>
                          <p className="text-sm text-slate-500 font-medium">Coming Soon!</p>
                        </div>
                      </div>
                      
                      {/* Powerup Shop */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
                        <div className="flex items-center justify-center gap-3 mb-6">
                          <span className="text-slate-600 font-semibold">Your credits:</span>
                          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-3 rounded-2xl border border-yellow-200 shadow-sm">
                            <Coins className="h-6 w-6 text-yellow-600" />
                            <span className="text-2xl font-bold text-yellow-700">12</span>
                          </div>
                        </div>
                        
                        <h4 className="text-lg font-bold text-slate-900 mb-4 text-center">Powerup Shop</h4>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                            <div className="text-center mb-2">
                              <span className="text-2xl">⚡</span>
                              <h5 className="font-bold text-blue-900">Speed Boost</h5>
                            </div>
                            <div className="flex items-center justify-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                              <Coins className="h-4 w-4 text-yellow-600" />
                              <span className="font-bold text-yellow-700">2</span>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                            <div className="text-center mb-2">
                              <span className="text-2xl">🛡️</span>
                              <h5 className="font-bold text-purple-900">Shield</h5>
                            </div>
                            <div className="flex items-center justify-center gap-1 bg-yellow-100 px-3 py-1 rounded-full">
                              <Coins className="h-4 w-4 text-yellow-600" />
                              <span className="font-bold text-yellow-700">3</span>
                            </div>
                          </div>
                        </div>
                        
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-base px-6 py-4 relative overflow-hidden group shadow-lg rounded-2xl">
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20"
                              animate={{
                                x: [-100, 100],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            <div className="flex items-center justify-center gap-2 relative z-10">
                              <span className="font-bold text-lg">Play & Shop</span>
                              <Zap className="h-5 w-5" />
                            </div>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                    <div className="text-sm text-slate-600 text-center w-full">
                      <span className="font-medium">Model:</span> Free games + Credit powerups
                    </div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>

            {/* Frame 5: Progress Visualization */}
            <motion.div variants={cardVariants}>
              <Card 
                id="frame-5" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white relative overflow-hidden">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 text-6xl">🏕️</div>
                      <div className="absolute bottom-0 left-0 text-4xl">⭐</div>
                    </div>
                    <div className="flex justify-between items-start mb-2 relative">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Tent className="h-6 w-6" />
                        Your Camp Profile
                      </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 5</Badge>
                    </div>
                    <CardDescription className="text-emerald-100">
                      Your mathematical journey and achievements
                    </CardDescription>
                  </div>
                  
                  <CardContent className="p-6 flex-1">
                    <CampNavigation currentLocation="Your Tent" />
                    <div className="space-y-6">
                      
                      {/* Camp Tent Interior - Your Mathematical Journey */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 relative overflow-hidden">
                        {/* Tent interior feeling */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 left-2 text-2xl">🏕️</div>
                          <div className="absolute top-2 right-2 text-xl">🎒</div>
                          <div className="absolute bottom-2 left-2 text-xl">📚</div>
                        </div>
                        
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              {/* Camp Badge Display */}
                              <motion.div
                                animate={{ 
                                  boxShadow: [
                                    "0 0 20px rgba(16, 185, 129, 0.3)",
                                    "0 0 30px rgba(16, 185, 129, 0.5)",
                                    "0 0 20px rgba(16, 185, 129, 0.3)"
                                  ]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center relative border-4 border-amber-200"
                              >
                                <span className="text-2xl font-bold text-white">4</span>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                                  <Star className="h-3 w-3 text-yellow-900" />
                                </div>
                              </motion.div>
                              
                              <div>
                                <h3 className="text-xl font-bold text-amber-900">Level 4 Camper Badge</h3>
                                <p className="text-amber-700 text-sm">Fraction Master Certification</p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-amber-600 text-sm">Next Badge</div>
                              <div className="text-2xl font-bold text-amber-800">5</div>
                            </div>
                          </div>
                          
                          {/* Camp Progress Tracker */}
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-amber-700">Progress to Next Badge</span>
                              <span className="text-amber-900 font-medium">750 / 1000 XP</span>
                            </div>
                            <div className="h-3 bg-amber-200 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: "75%" }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full relative"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Achievement Showcase */}
                      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-bold text-slate-900">Merit Badge Collection</h4>
                          <motion.div 
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-yellow-500"
                          >
                            ✨
                          </motion.div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { 
                              emoji: "🎯", 
                              name: "Ace Shot", 
                              desc: "10 in a row",
                              rarity: "rare",
                              isNew: true
                            },
                            { 
                              emoji: "⚡", 
                              name: "Lightning", 
                              desc: "Under 30s avg",
                              rarity: "epic"
                            }
                          ].map((achievement, i) => (
                            <motion.div 
                              key={i}
                              whileHover={{ scale: 1.05, y: -2 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className={`relative p-3 rounded-xl text-center border-2 transition-all ${
                                achievement.rarity === "legendary" ? "border-yellow-300 bg-gradient-to-b from-yellow-50 to-orange-50" :
                                achievement.rarity === "epic" ? "border-purple-300 bg-gradient-to-b from-purple-50 to-pink-50" :
                                "border-blue-300 bg-gradient-to-b from-blue-50 to-cyan-50"
                              }`}
                            >
                              {achievement.isNew && (
                                <motion.div
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold z-10"
                                >
                                  NEW!
                                </motion.div>
                              )}
                              <div className="text-2xl mb-1.5">{achievement.emoji}</div>
                              <div className="text-xs font-bold text-slate-900 leading-tight px-1">{achievement.name}</div>
                              <div className="text-xs text-slate-600 mt-0.5 leading-tight">{achievement.desc}</div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200">
                        <div className="grid grid-cols-4 gap-3 text-center">
                          <div className="bg-white rounded-xl p-2 shadow-sm">
                            <div className="text-xl font-bold text-blue-600">12</div>
                            <div className="text-xs text-slate-600">Solved</div>
                          </div>
                          <div className="bg-white rounded-xl p-2 shadow-sm">
                            <div className="text-xl font-bold text-yellow-600">4</div>
                            <div className="text-xs text-slate-600">Coins</div>
                          </div>
                          <div className="bg-white rounded-xl p-2 shadow-sm">
                            <div className="text-xl font-bold text-emerald-600">89%</div>
                            <div className="text-xs text-slate-600">Score</div>
                          </div>
                          <div className="bg-white rounded-xl p-2 shadow-sm">
                            <div className="text-xl font-bold text-purple-600 flex items-center justify-center gap-1">
                              5<span className="text-sm">🔥</span>
                            </div>
                            <div className="text-xs text-slate-600">Streak</div>
                          </div>
                        </div>
                      </div>

                      {/* Counselor Message */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl p-4 border border-emerald-200"
                      >
                        <div className="flex items-start gap-3">
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-2xl"
                          >
                            🦉
                          </motion.div>
                          <div className="flex-1">
                            <p className="font-bold text-emerald-900 mb-1">Counselor Ember:</p>
                            <p className="text-emerald-800 text-sm">
                              &ldquo;I love how you&rsquo;ve decorated your tent with those merit badges! That accuracy badge really stands out! 🌟&rdquo;
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                    <div className="text-sm text-slate-600 text-center w-full">
                      <span className="font-medium">Growth Mindset:</span> Every problem solved makes you stronger
                    </div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>

            {/* Frame 6: Social Interaction */}
            <motion.div variants={cardVariants}>
              <Card 
                id="frame-6" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Users className="h-6 w-6" />
                        Camp Community
                      </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 6</Badge>
                    </div>
                    <CardDescription className="text-red-100">
                      Safe social features with emotes only
                    </CardDescription>
                  </div>
                  
                  <CardContent className="p-6 flex-1">
                    <div className="space-y-6">
                      {/* Leaderboard */}
                      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          Daily Leaderboard
                          <Badge className="bg-yellow-100 text-yellow-700 text-xs ml-auto">Live</Badge>
                        </h4>
                        <div className="space-y-3">
                          {[
                            { 
                              rank: 1, 
                              name: "MathNinja", 
                              level: 6, 
                              xp: 890, 
                              streak: 12,
                              isMVP: true,
                              character: "🥷"
                            },
                            { 
                              rank: 2, 
                              name: "Camper_Sparkle", 
                              level: 4, 
                              xp: 750, 
                              isYou: true,
                              streak: 5,
                              character: "✨"
                            },
                            { 
                              rank: 3, 
                              name: "StarFox_17", 
                              level: 4, 
                              xp: 720,
                              streak: 3,
                              character: "🦊"
                            },
                          ].map((player) => (
                            <div 
                              key={player.rank}
                              className={`p-4 rounded-xl transition-all ${
                                player.isYou 
                                  ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-sm" 
                                  : "bg-amber-50 border border-slate-100 hover:bg-amber-100"
                              }`}
                            >
                              <div className="grid grid-cols-[auto_auto_1fr_auto] gap-3 items-center">
                                {/* Rank & MVP */}
                                <div className="flex items-center gap-2">
                                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm ${
                                    player.rank === 1 ? "bg-yellow-100 text-yellow-700" : 
                                    player.rank === 2 ? "bg-slate-100 text-slate-600" : 
                                    "bg-amber-100 text-amber-700"
                                  }`}>
                                    {player.rank}
                                  </span>
                                  {player.isMVP && (
                                    <span className="text-yellow-500 text-sm">👑</span>
                                  )}
                                </div>
                                
                                {/* Avatar */}
                                <CamperAvatar level={player.level} size="sm" isOnline={true} character={player.character} />
                                
                                {/* Name & Streak Info */}
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm text-slate-900 truncate">
                                      {player.name}
                                    </span>
                                    {player.isYou && (
                                      <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">You</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-orange-500 text-sm">🔥</span>
                                    <span className="text-xs text-slate-600 font-medium whitespace-nowrap">{player.streak} day streak</span>
                                  </div>
                                </div>
                                
                                {/* XP */}
                                <div className="text-right">
                                  <span className="text-sm font-bold text-slate-700 whitespace-nowrap">{player.xp} XP</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Emote System */}
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 border border-pink-100 shadow-sm">
                        <h4 className="font-bold text-slate-900 mb-4">Send an Emote!</h4>
                        <div className="flex justify-center gap-3 mb-4">
                          {["👋", "🎉", "👍", "❤️", "❓"].map((emote) => (
                            <motion.button
                              key={emote}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEmoteSend(emote)}
                              className={`w-12 h-12 rounded-xl transition-all flex items-center justify-center text-2xl ${
                                selectedEmote === emote 
                                  ? "bg-white shadow-md border-2 border-pink-300" 
                                  : "bg-white/80 hover:bg-white border border-pink-200 shadow-sm"
                              }`}
                            >
                              {emote}
                            </motion.button>
                          ))}
                        </div>
                        
                        {/* Clean feedback */}
                        <AnimatePresence>
                          {emoteJustSent && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-center"
                            >
                              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-medium inline-block">
                                Sent {selectedEmote} to MathNinja! ✨
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                    <div className="text-sm text-slate-600 text-center w-full">
                      <span className="font-medium">Safety:</span> No chat, emotes only, no real names
                    </div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Row 3: Parent Update → Secure Entry */}
          <div className="flex flex-col md:flex-row gap-8 justify-center max-w-4xl mx-auto">
            {/* Frame 7: Parent Summary */}
            <motion.div variants={cardVariants} className="flex-1 max-w-md">
              <Card 
                id="frame-7" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                <div className="bg-gradient-to-r from-orange-600 to-red-700 p-6 text-white">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Mail className="h-6 w-6" />
                      Parent Update
                    </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 7</Badge>
                  </div>
                  <CardDescription className="text-orange-100">
                    Weekly progress summary via email
                  </CardDescription>
                </div>
                
                  <CardContent className="p-6 flex-1">
                  <div className="bg-white rounded-xl p-6 shadow-inner">
                    {/* Email Preview */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 border-b border-emerald-100">
                          <p className="text-xs text-slate-500 mb-1">To: parent@email.com</p>
                          <p className="text-sm font-semibold text-slate-800">🌟 Camper_Sparkle had an amazing week!</p>
                      </div>
                      
                        <div className="p-6 space-y-5">
                          <div>
                            <p className="font-semibold text-slate-900 mb-2">Hi there! 👋</p>
                        <p className="text-sm text-slate-600">
                              Your child is absolutely thriving at Playcademy Camp!
                            </p>
                          </div>
                          
                          {/* Hero Achievement */}
                          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">🏆</span>
                              <div>
                                <p className="font-bold text-emerald-900">This Week&rsquo;s Superstar Moment!</p>
                                <p className="text-sm text-emerald-800">10 math problems correct in a row</p>
                          </div>
                          </div>
                          </div>
                          
                          {/* Quick Stats */}
                          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-4 border border-emerald-100">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center bg-white rounded-xl p-3">
                                <div className="text-xl font-bold text-emerald-700">89%</div>
                                <div className="text-xs text-slate-600">Accuracy</div>
                              </div>
                              <div className="text-center bg-white rounded-xl p-3">
                                <div className="text-xl font-bold text-blue-700">Level 4</div>
                                <div className="text-xs text-slate-600">Mathematician</div>
                              </div>
                              <div className="text-center bg-white rounded-xl p-3">
                                <div className="text-xl font-bold text-purple-700">48</div>
                                <div className="text-xs text-slate-600">Problems</div>
                              </div>
                              <div className="text-center bg-white rounded-xl p-3">
                                <div className="text-xl font-bold text-orange-700">6</div>
                                <div className="text-xs text-slate-600">Sessions</div>
                              </div>
                          </div>
                        </div>
                        
                          {/* Simple Connection */}
                          <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                            <p className="text-sm font-bold text-pink-900 mb-2">💭 Tonight, ask them:</p>
                            <p className="text-sm text-pink-800 bg-white rounded-lg p-2 border border-pink-200">
                              &ldquo;Tell me about that awesome 10-problem streak!&rdquo;
                          </p>
                        </div>
                        
                          <p className="text-sm text-slate-600 text-center">
                            Keep up the wonderful work! 🌟<br/>
                            <span className="text-xs text-slate-500">- The Playcademy Team</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                  <div className="text-sm text-slate-600 text-center w-full">
                    <span className="font-medium">Your Space:</span> Where your mathematical journey lives
                  </div>
                </CardFooter>
                </motion.div>
              </Card>
            </motion.div>

            {/* Frame 8: Alpha Anywhere Login */}
            <motion.div variants={cardVariants} className="flex-1 max-w-md">
              <Card 
                id="frame-8" 
                className="h-full border border-slate-200 hover:border-emerald-400 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg"
              >
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  transition={{ duration: 0.2 }}
                  className="h-full flex flex-col"
                >
                  <div className="bg-gradient-to-r from-emerald-700 to-teal-800 p-6 text-white">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <LogIn className="h-6 w-6" />
                        Secure Entry
                      </CardTitle>
                      <Badge className="bg-white/20 text-white border-white/30">Step 8</Badge>
                    </div>
                    <CardDescription className="text-emerald-100">
                      Parent-approved login via Alpha Anywhere
                    </CardDescription>
                  </div>
                  
                  <CardContent className="p-6 flex-1">
                    <div className="bg-amber-50 rounded-xl p-6 mb-4">
                      <div className="flex items-center justify-center mb-4">
                        <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🔐</div>
                            <div className="text-sm font-medium text-slate-700">Alpha Anywhere</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Username" 
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-400 focus:outline-none"
                        />
                        <input 
                          type="password" 
                          placeholder="Password" 
                          className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-400 focus:outline-none"
                        />
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800">
                          Enter Camp
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-600">
                      <p className="mb-2">✅ Parent-approved accounts only</p>
                      <p className="mb-2">✅ Secure OAuth integration</p>
                      <p>✅ No personal data collected</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-emerald-50 p-4 mt-auto">
                    <div className="text-sm text-slate-600 text-center w-full">
                      <span className="font-medium">Trust & Safety:</span> Designed for homeschool families
                    </div>
                  </CardFooter>
                </motion.div>
              </Card>
            </motion.div>
          </div>

          {/* Design Principles Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Design Principles for Summer Success
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Every decision in Playcademy&rsquo;s pilot is guided by these core principles that balance 
                educational value, child safety, and genuine engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Safety First",
                  description: "No chat, preset emotes only, anonymous usernames, parent-approved accounts",
                  gradient: "from-rose-50 to-pink-50",
                  iconBg: "from-rose-100 to-rose-200",
                  iconColor: "text-rose-600",
                  border: "border-rose-200 hover:border-rose-300",
                  accent: "from-rose-400 to-rose-500"
                },
                {
                  icon: Sparkles,
                  title: "Learning as Currency",
                  description: "Math problems directly unlock fun, making education the gateway to play",
                  gradient: "from-yellow-50 to-amber-50",
                  iconBg: "from-yellow-100 to-yellow-200",
                  iconColor: "text-yellow-600",
                  border: "border-yellow-200 hover:border-yellow-300",
                  accent: "from-yellow-400 to-yellow-500"
                },
                {
                  icon: Trophy,
                  title: "Visible Progress",
                  description: "XP bars, levels, badges, and leaderboards show growth at every step",
                  gradient: "from-emerald-50 to-teal-50",
                  iconBg: "from-emerald-100 to-emerald-200",
                  iconColor: "text-emerald-600",
                  border: "border-emerald-200 hover:border-emerald-300",
                  accent: "from-emerald-400 to-emerald-500"
                },
                {
                  icon: Star,
                  title: "Intrinsic Motivation",
                  description: "Balanced rewards that encourage return visits without manipulation",
                  gradient: "from-purple-50 to-indigo-50",
                  iconBg: "from-purple-100 to-purple-200",
                  iconColor: "text-purple-600",
                  border: "border-purple-200 hover:border-purple-300",
                  accent: "from-purple-400 to-purple-500"
                }
              ].map((principle, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className={`bg-gradient-to-br ${principle.gradient} rounded-2xl p-6 border ${principle.border} transition-all duration-300 shadow-sm hover:shadow-lg relative overflow-hidden h-full flex flex-col`}>
                    {/* Subtle background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-xl"></div>
                    
                    <div className="relative">
                      <motion.div 
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.3 }
                        }}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${principle.iconBg} mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                      >
                        <principle.icon className={`h-7 w-7 ${principle.iconColor}`} />
                      </motion.div>
                      
                      <h3 className="text-lg font-bold mb-3 text-slate-900 group-hover:text-slate-800 transition-colors">
                        {principle.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors flex-1 pb-3">
                        {principle.description}
                      </p>
                      
                      {/* Bottom accent */}
                      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${principle.accent} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center">
          <motion.div
          initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
              <p className="text-lg font-semibold text-slate-700">
                Crafted with care for the Alpha Anywhere Summer Pilot
              </p>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
              <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                June 2025
              </span>
              <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent flex-1"></div>
              </div>
            
            <div className="flex items-center justify-center gap-3 text-slate-600">
              <p className="text-base font-medium">
                Building the future where learning is the most rewarding game of all
              </p>
              </div>
              </div>
          
          <div className="mt-6 text-xs text-slate-400">
            Made with 💚 for curious minds everywhere
            </div>
          </motion.div>
      </footer>
    </div>
  );
} 