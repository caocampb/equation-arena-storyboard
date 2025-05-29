"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Timer, Coins, Play, CheckCircle, 
  Home, Brain
} from "lucide-react";
import Link from "next/link";

// Design tokens for consistency
const tokens = {
  colors: {
    math: "rgb(59, 130, 246)", // blue-500
    tokens: "rgb(245, 158, 11)", // amber-500
    games: "rgb(139, 92, 246)", // violet-500
    rewards: "rgb(16, 185, 129)", // emerald-500
    text: {
      primary: "rgb(15, 23, 42)", // slate-900
      secondary: "rgb(71, 85, 105)", // slate-600
      tertiary: "rgb(148, 163, 184)", // slate-400
    },
    background: {
      primary: "rgb(255, 255, 255)",
      secondary: "rgb(248, 250, 252)", // slate-50
      hover: "rgb(241, 245, 249)", // slate-100
    }
  },
  animation: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6
  },
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem"
  }
};

// Core flow step component - the building block of our system
function FlowStep({ 
  icon: Icon, 
  label, 
  color, 
  isActive = false,
  onClick,
  children
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  return (
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: tokens.animation.normal }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl p-6 cursor-pointer
        transition-all duration-300
        ${isActive ? 'ring-2 ring-offset-2' : ''}
      `}
      style={{
        backgroundColor: isActive ? color + '10' : tokens.colors.background.secondary,
        borderColor: isActive ? color : 'transparent',
        borderWidth: '2px',
        borderStyle: 'solid',
        ...({ '--ring-color': color } as React.CSSProperties)
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ 
            backgroundColor: color + '20',
            color: color 
          }}
        >
          <Icon className="w-6 h-6" />
    </div>
        <h3 className="text-lg font-semibold" style={{ color: tokens.colors.text.primary }}>
          {label}
        </h3>
      </div>
      {children}
    </motion.div>
  );
}

// Token counter - clear visual feedback
function TokenCounter({ count, size = "md" }: { count: number; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { container: "px-3 py-1", text: "text-sm", icon: "w-4 h-4" },
    md: { container: "px-4 py-2", text: "text-base", icon: "w-5 h-5" },
    lg: { container: "px-6 py-3", text: "text-xl", icon: "w-6 h-6" }
  };
  
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`
        inline-flex items-center gap-2 rounded-full font-semibold
        ${sizes[size].container} ${sizes[size].text}
      `}
      style={{ 
        backgroundColor: tokens.colors.tokens + '20',
        color: tokens.colors.tokens
      }}
    >
      <Coins className={sizes[size].icon} />
      <span>{count}</span>
    </motion.div>
  );
}

// Timer display - clear time remaining
function TimeDisplay({ minutes }: { minutes: number }) {
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium"
      style={{ 
        backgroundColor: tokens.colors.games + '20',
        color: tokens.colors.games
      }}
    >
      <Timer className="w-5 h-5" />
      <span>{minutes} min</span>
    </div>
  );
}

// Progress bar - visual feedback for completion
function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1" style={{ color: tokens.colors.text.secondary }}>
        <span>{value} / {max}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div 
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: tokens.colors.background.hover }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: tokens.animation.slow, ease: "easeOut" }}
          style={{ backgroundColor: color }}
        />
        </div>
      </div>
  );
}

// Main page component
export default function PilotStoryboardPage() {
  const [activeStep, setActiveStep] = useState<string>("math");
  const [userTokens, setUserTokens] = useState(12);
  const [problemsSolved, setProblemsSolved] = useState(0);

  // Simulate solving a problem
  const solveProblem = () => {
    setProblemsSolved(prev => prev + 1);
    setUserTokens(prev => prev + 1);
  };

  // Simulate spending tokens
  const spendTokens = (amount: number) => {
    if (userTokens >= amount) {
      setUserTokens(prev => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: tokens.colors.background.secondary }}>
      {/* Header - minimal and functional */}
      <header className="max-w-6xl mx-auto mb-12">
        <Link href="/">
          <Button 
            variant="ghost" 
            className="mb-6 -ml-2"
            style={{ color: tokens.colors.text.secondary }}
          >
            <Home className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        
        <div className="text-center">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: tokens.colors.text.primary }}
          >
            Playcademy
            </h1>
          <p 
            className="text-lg max-w-xl mx-auto"
            style={{ color: tokens.colors.text.secondary }}
          >
            Learn math, earn tokens, play games, unlock rewards
              </p>
            </div>
      </header>

      {/* Core Flow Visualization */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {[
            { key: "math", icon: Brain, label: "Math", color: tokens.colors.math },
            { key: "tokens", icon: Coins, label: "Tokens", color: tokens.colors.tokens },
            { key: "games", icon: Play, label: "Games", color: tokens.colors.games },
            { key: "rewards", icon: CheckCircle, label: "Rewards", color: tokens.colors.rewards }
          ].map((step, index) => (
            <React.Fragment key={step.key}>
              <motion.button
                onClick={() => setActiveStep(step.key)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-medium
                  transition-all duration-300
                `}
                            style={{
                  backgroundColor: activeStep === step.key ? step.color : tokens.colors.background.primary,
                  color: activeStep === step.key ? 'white' : step.color,
                  border: `2px solid ${step.color}`
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <step.icon className="w-5 h-5" />
                <span>{step.label}</span>
              </motion.button>
              {index < 3 && (
                <ArrowRight 
                  className="w-5 h-5 hidden md:block" 
                  style={{ color: tokens.colors.text.tertiary }}
                />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
                        
      {/* Token Balance - always visible */}
      <div className="max-w-6xl mx-auto mb-8">
        <div 
          className="flex items-center justify-center gap-4 p-4 rounded-2xl"
          style={{ backgroundColor: tokens.colors.background.primary }}
        >
          <span style={{ color: tokens.colors.text.secondary }}>Your balance:</span>
          <TokenCounter count={userTokens} size="lg" />
                  </div>
                </div>
                
      {/* Active Step Content */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {activeStep === "math" && (
                      <motion.div
              key="math"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: tokens.animation.normal }}
            >
              <FlowStep
                icon={Brain}
                label="Math Practice"
                color={tokens.colors.math}
                isActive
              >
                <div className="space-y-4">
                  <p style={{ color: tokens.colors.text.secondary }}>
                    Solve problems to earn tokens. Each correct answer = 1 token.
                  </p>
                  
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: tokens.colors.background.secondary }}
                  >
                    <p className="text-lg font-medium mb-2" style={{ color: tokens.colors.text.primary }}>
                      What is 3/4 + 1/2?
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {["5/4", "3/2", "7/8", "1"].map((answer) => (
                        <Button
                          key={answer}
                          variant="outline"
                          className="w-full"
                          onClick={() => answer === "5/4" && solveProblem()}
                        >
                          {answer}
                        </Button>
                        ))}
                      </div>
                      </div>
                      
                  <ProgressBar 
                    value={problemsSolved} 
                    max={10} 
                    color={tokens.colors.math}
                  />
                          </div>
              </FlowStep>
                      </motion.div>
                              )}

          {activeStep === "tokens" && (
                <motion.div
              key="tokens"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: tokens.animation.normal }}
            >
              <FlowStep
                icon={Coins}
                label="Token Economy"
                color={tokens.colors.tokens}
                isActive
              >
                <div className="space-y-4">
                  <p style={{ color: tokens.colors.text.secondary }}>
                    Your tokens are the currency for fun. Earn them through learning.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: tokens.colors.background.secondary }}
                    >
                      <p className="text-sm" style={{ color: tokens.colors.text.secondary }}>
                        Earned Today
                      </p>
                      <p className="text-2xl font-bold" style={{ color: tokens.colors.tokens }}>
                        +{problemsSolved}
                        </p>
                    </div>
                    <div 
                      className="p-4 rounded-xl text-center"
                      style={{ backgroundColor: tokens.colors.background.secondary }}
                    >
                      <p className="text-sm" style={{ color: tokens.colors.text.secondary }}>
                        Exchange Rate
                      </p>
                      <p className="text-lg font-medium" style={{ color: tokens.colors.text.primary }}>
                        3 tokens = 5 min
                      </p>
                    </div>
                  </div>
                </div>
              </FlowStep>
                        </motion.div>
                              )}

          {activeStep === "games" && (
                      <motion.div
              key="games"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: tokens.animation.normal }}
            >
              <FlowStep
                icon={Play}
                label="Game Time"
                color={tokens.colors.games}
                isActive
              >
                <div className="space-y-4">
                  <p style={{ color: tokens.colors.text.secondary }}>
                    Exchange tokens for game time. Play what you love.
                  </p>
                  
                  <div 
                    className="p-6 rounded-xl border-2"
                    style={{ 
                      backgroundColor: tokens.colors.background.primary,
                      borderColor: tokens.colors.games + '30'
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                          <div>
                        <h4 className="text-lg font-semibold" style={{ color: tokens.colors.text.primary }}>
                          Vibe Code Survivors
                        </h4>
                        <p style={{ color: tokens.colors.text.secondary }}>
                          Action survival game
                            </p>
                          </div>
                      <TimeDisplay minutes={5} />
                          </div>
                          
                    <Button
                      className="w-full"
                      onClick={() => {
                        if (spendTokens(3)) {
                          // Start game
                        }
                      }}
                      disabled={userTokens < 3}
                      style={{
                        backgroundColor: tokens.colors.games,
                        color: 'white'
                      }}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Now (3 tokens)
                        </Button>
                      </div>
                    </div>
              </FlowStep>
                </motion.div>
          )}

          {activeStep === "rewards" && (
          <motion.div
              key="rewards"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: tokens.animation.normal }}
          >
              <FlowStep
                icon={CheckCircle}
                label="Your Progress"
                color={tokens.colors.rewards}
                isActive
              >
                <div className="space-y-4">
                  <p style={{ color: tokens.colors.text.secondary }}>
                    Track your learning journey and celebrate achievements.
              </p>

                  <div className="grid grid-cols-3 gap-4">
              {[
                      { label: "Problems Solved", value: problemsSolved, icon: Brain },
                      { label: "Tokens Earned", value: problemsSolved, icon: Coins },
                      { label: "Minutes Played", value: 0, icon: Timer }
                    ].map((stat) => (
                      <div 
                        key={stat.label}
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: tokens.colors.background.secondary }}
                      >
                        <stat.icon 
                          className="w-6 h-6 mx-auto mb-2" 
                          style={{ color: tokens.colors.rewards }}
                        />
                        <p className="text-2xl font-bold" style={{ color: tokens.colors.text.primary }}>
                          {stat.value}
                        </p>
                        <p className="text-sm" style={{ color: tokens.colors.text.secondary }}>
                          {stat.label}
                        </p>
                  </div>
              ))}
            </div>
      </div>
              </FlowStep>
          </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 