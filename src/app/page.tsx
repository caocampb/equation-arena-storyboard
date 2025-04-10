"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { ArrowRight, Check, Award, Zap, Info, Calculator, Brain, Target, BarChart, BookOpen, Focus, Eye, HandMetal, MoveHorizontal, Sparkles, X, ArrowDown } from "lucide-react";
import { EquationDisplay } from "@/components/EquationDisplay";
import { StoryboardGuide } from "@/components/StoryboardGuide";
import { ConnectorManager } from "@/components/FlowConnector";
import { DesignCallout } from "@/components/DesignCallout";
import { LearningObjective } from "@/components/LearningObjective";

function useStaggeredAnimation(itemCount: number, staggerDelay = 0.1) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.5,
        when: "beforeChildren"
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  return { containerVariants, itemVariants };
}

export default function Home() {
  const { containerVariants, itemVariants } = useStaggeredAnimation(7);

  return (
    <div className="min-h-screen math-bg p-8 pb-20">
      <Toaster />
      <header className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold text-center text-primary">Equation Arena Storyboard</h1>
        </motion.div>
        <p className="text-center text-gray-500 mb-4">Interactive gameplay sequence demonstration</p>
        
        <div className="max-w-2xl mx-auto p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-6">
          <h2 className="text-sm font-medium text-indigo-800 flex items-center mb-2">
            <Eye className="h-4 w-4 mr-1" /> Design Vision
          </h2>
          <p className="text-sm text-indigo-700">
            An engaging math battle experience that develops computational fluency and pattern recognition through immediate feedback and visual rewards.
          </p>
        </div>
        
        <div className="flex justify-center">
          <StoryboardGuide />
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto">
        {/* Math symbols floating in background */}
        {[
          { symbol: '+', top: '20%', left: '15%', rotate: '5deg', duration: 3 },
          { symbol: '-', top: '50%', left: '80%', rotate: '-8deg', duration: 4 },
          { symbol: '×', top: '65%', left: '75%', rotate: '-2deg', duration: 3.5 },
          { symbol: '÷', top: '70%', left: '30%', rotate: '-10deg', duration: 4.5 },
          { symbol: '=', top: '45%', left: '20%', rotate: '-13deg', duration: 3.2 }
        ].map((item, i) => (
          <motion.div 
            key={i}
            className="absolute text-4xl text-primary/10 font-bold pointer-events-none"
            style={{
              top: item.top,
              left: item.left,
              transform: `rotate(${item.rotate})`
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.symbol}
          </motion.div>
        ))}

        {/* Game Flow Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-6 py-2 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-white flex items-center justify-center">
              <MoveHorizontal className="h-5 w-5 mr-2" />
              Game Flow Sequence
              <span className="text-xs ml-2 bg-white/20 rounded px-2 py-0.5">Total Duration: ~90 seconds</span>
            </h2>
          </div>
        </motion.div>

        {/* Flow connector overlay */}
        <ConnectorManager 
          connections={[
            { 
              fromId: "card-1", 
              toId: "card-2", 
              label: "Equation appears", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left"
            },
            { 
              fromId: "card-2", 
              toId: "card-3", 
              label: "Player solves", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              isLearningMoment: true
            },
            { 
              fromId: "card-3", 
              toId: "card-4", 
              label: "Submit answer", 
              type: "diagonal",
              fromAnchor: "bottom",
              toAnchor: "top",
              labelOffset: { x: 0, y: -10 }
            },
            { 
              fromId: "card-4", 
              toId: "card-5", 
              label: "Pattern detected", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              isLearningMoment: true
            },
            { 
              fromId: "card-5", 
              toId: "card-6", 
              label: "Enemy responds", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left" 
            },
            { 
              fromId: "card-6", 
              toId: "card-7", 
              label: "Battle ends", 
              type: "vertical",
              fromAnchor: "bottom",
              toAnchor: "top",
              isLearningMoment: true
            }
          ]}
        />

        <motion.div 
          className="flex flex-col items-center w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* First row: Cards 1-3 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            {/* First row cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {/* Frame 1: Battle Start */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-1" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={BookOpen} text="Learning: Orientation & Expectation Setting" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        1
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Battle Start</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Initial game state
                        <span className="timing-label">0:00-0:05</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 1:30</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <div className="border-2 border-slate-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">🐉</div>
                          <div>Enemy</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🔥</span> FIRE
                        </Button>
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🧊</span> ICE
                        </Button>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg p-3 text-center mb-4">
                        <p className="text-slate-400">Waiting for equation...</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className="number-button">
                            {num}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        <Button disabled className="kid-button w-full opacity-50">CAST SPELL</Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Player sees battle screen</p>
                      <p>• Enemy appears with full health</p>
                      <p>• Player waits for first equation</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Anticipation</span></div>
                    <DesignCallout focus="Clarity" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Frame 2: Equation Appears */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-2" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Focus} text="Learning: Problem Identification" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        2
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Equation Appears</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        First challenge
                        <span className="timing-label">0:05-0:15</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 1:25</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <div className="border-2 border-slate-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">🐉</div>
                          <div>Enemy</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🔥</span> FIRE
                        </Button>
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🧊</span> ICE
                        </Button>
                      </div>
                      
                      <EquationDisplay 
                        difficulty={1}
                        progressValue={80}
                        customEquation="5 + 6 = ?"
                      />
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className="number-button">
                            {num}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        <Button disabled className="kid-button w-full opacity-50">CAST SPELL</Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Equation appears with animation <span className="text-xs text-blue-500">(slide in from top)</span></p>
                      <p>• Timer begins counting down <span className="text-xs text-blue-500">(tick-tock sound)</span></p>
                      <p>• Numbers become interactive</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Focus and light pressure</span></div>
                    <DesignCallout focus="Engagement" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Frame 3: Player Input */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-3" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={HandMetal} text="Learning: Solution Construction" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        3
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Player Input</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Building the equation
                        <span className="timing-label">0:15-0:25</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 1:20</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <div className="border-2 border-slate-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">🐉</div>
                          <div>Enemy</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🔥</span> FIRE
                        </Button>
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🧊</span> ICE
                        </Button>
                      </div>
                      
                      <EquationDisplay 
                        customEquation="5 + 3 = 8_"
                        progressValue={50}
                      />
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button 
                            key={num} 
                            variant={num === 8 ? "default" : "outline"} 
                            size="sm"
                            className={num === 8 ? "number-button bg-blue-500 text-white" : "number-button"}
                          >
                            {num}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        <Button className="kid-button w-full">CAST SPELL</Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Player selects numbers and operations <span className="text-xs text-blue-500">(tap sound)</span></p>
                      <p>• Input appears in equation box</p>
                      <p>• Cast button becomes available <span className="text-xs text-blue-500">(glow effect)</span></p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Engagement, decision-making</span></div>
                    <DesignCallout focus="Engagement" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Second row: Cards 4-6 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            {/* Second row cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {/* Frame 4: Correct Answer */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-4" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Brain} text="Learning: Reinforcement & Validation" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Correct Answer</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Success feedback
                        <span className="timing-label">0:25-0:35</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 1:15</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <motion.div 
                          initial={{ x: 0 }}
                          animate={{ x: [0, -5, 5, -3, 3, 0] }}
                          transition={{ duration: 0.5 }}
                          className="border-2 border-red-200 rounded-lg p-3 text-center"
                        >
                          <div className="text-2xl">🐉</div>
                          <div>Enemy</div>
                          <Badge className="mt-1 bg-red-500">-15 HP</Badge>
                        </motion.div>
                      </div>
                      
                      <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1 border-blue-200">
                          <span className="mr-2">🔥</span> FIRE
                        </Button>
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🧊</span> ICE
                        </Button>
                      </div>
                      
                      <EquationDisplay 
                        customEquation="5 + 3 = 8"
                        showAnswer={true}
                        isCorrect={true}
                      />
                      
                      <div className="grid grid-cols-3 gap-2 mb-4 opacity-50">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" disabled className="number-button">
                            {num}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="flex justify-center">
                        <Button disabled className="kid-button w-full bg-green-100 text-green-700 border-green-200">SPELL CAST!</Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Success animation plays <span className="text-xs text-blue-500">(sparkle effect)</span></p>
                      <p>• Enemy takes damage <span className="text-xs text-blue-500">(impact sound)</span></p>
                      <p>• Visual/audio reward feedback</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Satisfaction, achievement</span></div>
                    <DesignCallout focus="Feedback" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Frame 5: Pattern Bonus */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-5" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={BarChart} text="Learning: Pattern Recognition" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        5
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Pattern Bonus</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Number pattern identified
                        <span className="timing-label">0:35-0:45</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <EquationDisplay 
                        customEquation="5 + 5 = 10"
                        isPatternBonus={true}
                        showAnswer={true}
                        isCorrect={true}
                      />
                      
                      <div className="flex justify-center">
                        <Button className="kid-button w-full bg-amber-500 hover:bg-amber-600 border-amber-400">
                          <Zap className="mr-2 h-4 w-4" />
                          CAST SUPER SPELL
                        </Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Special pattern recognized (sum = 10) <span className="text-xs text-blue-500">(special chime)</span></p>
                      <p>• Enhanced visual/audio feedback <span className="text-xs text-blue-500">(gold particles)</span></p>
                      <p>• Boosted spell power</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Excitement, surprise</span></div>
                    <DesignCallout focus="Emotion" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Frame 6: Enemy Turn */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-6" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={MoveHorizontal} text="Learning: Turn-Taking & Patience" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        6
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Enemy Turn</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Opponent response
                        <span className="timing-label">0:45-0:60</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 90/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 1:05</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="border-2 border-slate-200 rounded-lg p-3 text-center"
                        >
                          <div className="text-2xl">🐉</div>
                          <div>Enemy</div>
                          <Badge className="mt-1 bg-purple-500">Attacking!</Badge>
                        </motion.div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg p-3 text-center mb-4 bg-slate-50">
                        <p className="font-medium">Enemy casting spell...</p>
                        <Progress value={60} className="game-progress mt-2" />
                      </div>
                      
                      <div className="text-center py-2">
                        <Badge className="bg-red-100 text-red-800 mt-1 px-3 py-1">-10 HP</Badge>
                      </div>
                      
                      <div className="flex justify-center mt-4">
                        <Button disabled className="kid-button w-full opacity-50">Waiting for next turn...</Button>
                      </div>
                    </div>
                    
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Enemy attacks player <span className="text-xs text-blue-500">(swoosh sound)</span></p>
                      <p>• Player health decreases <span className="text-xs text-blue-500">(health bar flash)</span></p>
                      <p>• Brief waiting period</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Brief tension, anticipation</span></div>
                    <DesignCallout focus="Feedback" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Third row: Card 7 */}
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="md:col-start-2">
                {/* Frame 7: Battle Results - Milestone Card */}
                <motion.div 
                  variants={itemVariants} 
                  className="flex"
                  whileInView={{ 
                    scale: [1, 1.03, 1.02],
                    transition: { duration: 1, ease: "easeOut" }
                  }}
                >
                  <Card id="card-7" className="game-card milestone-card border-amber-300 overflow-hidden w-full relative shadow-lg">
                    <div className="game-card-header bg-gradient-to-r from-amber-600 to-amber-500">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex-grow max-w-[85%]">
                          <LearningObjective icon={Sparkles} text="Learning: Achievement & Reflection" />
                        </div>
                        <div className="w-8 h-8 bg-amber-500 text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                          7
                        </div>
                      </div>
                      <CardTitle className="text-white mt-1">Battle Results</CardTitle>
                      <CardDescription className="text-amber-100 mt-1">
                        <span className="flex items-center">
                          Victory summary
                          <span className="timing-label bg-amber-700 text-amber-100">0:60-0:90</span>
                        </span>
                      </CardDescription>
                    </div>
                    <CardContent className="game-card-content">
                      <div className="bg-white rounded-lg p-4 mb-4 shadow-inner relative overflow-hidden">
                        {/* Math confetti in background */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none">
                          {[
                            { symbol: '+', top: '55%', left: '75%', color: '#4ade80', rotate: '45deg', duration: 2.5 },
                            { symbol: '-', top: '75%', left: '8%', color: '#a78bfa', rotate: '20deg', duration: 3.2 },
                            { symbol: '×', top: '15%', left: '77%', color: '#f97316', rotate: '90deg', duration: 2.8 },
                            { symbol: '=', top: '40%', left: '5%', color: '#4ade80', rotate: '0deg', duration: 3.5 },
                            { symbol: '10', top: '55%', left: '48%', color: '#a78bfa', rotate: '10deg', duration: 3.0 }
                          ].map((item, i) => (
                            <motion.div 
                              key={i}
                              className="absolute text-xl font-bold"
                              style={{
                                top: item.top,
                                left: item.left,
                                color: item.color,
                                transform: `rotate(${item.rotate})`
                              }}
                              animate={{
                                y: [0, 50], 
                                opacity: [1, 0],
                                rotate: parseInt(item.rotate) + 360
                              }}
                              transition={{
                                duration: item.duration,
                                repeat: Infinity,
                                repeatType: 'loop'
                              }}
                            >
                              {item.symbol}
                            </motion.div>
                          ))}
                        </div>

                        <div className="text-center mb-4 relative z-10">
                          <motion.div
                            animate={{ 
                              y: [0, -10, 0],
                              filter: ["drop-shadow(0 0 0 rgba(234, 179, 8, 0))", "drop-shadow(0 0 6px rgba(234, 179, 8, 0.3))", "drop-shadow(0 0 0 rgba(234, 179, 8, 0))"],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block"
                          >
                            <Badge className="text-lg py-2 px-6 bg-amber-500 shadow-md">
                              <Award className="h-5 w-5 mr-2" />
                              VICTORY!
                            </Badge>
                          </motion.div>
                        </div>
                        
                        <div className="text-center py-2 space-y-2 equation-text">
                          <p><span className="font-medium">Equations Solved:</span> 8</p>
                          <p><span className="font-medium">Pattern Bonuses:</span> 2</p>
                          <p><span className="font-medium">Time Taken:</span> 1:20</p>
                          <p><span className="font-medium">Best Spell:</span> 5 + 5 = 10</p>
                        </div>
                        
                        <Separator className="content-separator" />
                        
                        <div className="text-center py-2">
                          <p className="mb-2 font-medium">How was your experience?</p>
                          <div className="flex justify-center gap-4">
                            <Button variant="outline" size="sm" className="kid-button">😀</Button>
                            <Button variant="outline" size="sm" className="kid-button">😐</Button>
                            <Button variant="outline" size="sm" className="kid-button">☹️</Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-6">
                          <Button 
                            className="kid-button bg-amber-500 hover:bg-amber-600"
                            onClick={() => {
                              const successMessage = document.createElement('div');
                              successMessage.innerHTML = `
                                <div class="flex items-center gap-2">
                                  <div class="text-2xl">🎉</div>
                                  <div>
                                    <div class="font-medium">Thanks for playing!</div>
                                    <div class="text-sm">You've completed this battle</div>
                                  </div>
                                </div>
                              `;
                              document.body.appendChild(successMessage);
                              setTimeout(() => document.body.removeChild(successMessage), 3000);
                            }}
                          >
                            CONTINUE
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="kid-button">EXIT</Button>
                        </div>
                      </div>
                      
                      <Separator className="content-separator" />
                      
                      <div className="gameplay-note">
                        <p>• Battle results summary <span className="text-xs text-blue-500">(victory fanfare)</span></p>
                        <p>• Player achievements displayed</p>
                        <p>• Options to continue or exit</p>
                      </div>
                    </CardContent>
                    <CardFooter className="game-card-footer bg-amber-50 py-3">
                      <div className="emotional-state text-sm text-amber-900 py-1">Emotional state: <span className="font-medium">Accomplishment, closure</span></div>
                      <DesignCallout focus="Emotion" className="ml-2" />
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Level progression connector */}
          <div className="flex justify-center w-full my-6">
            <div className="flex flex-col items-center">
              <div className="text-purple-700 font-medium mb-1">Level Progression</div>
              <motion.div
                animate={{ 
                  y: [0, 5, 0],
                  filter: ["drop-shadow(0 0 0 rgba(147, 51, 234, 0))", "drop-shadow(0 0 3px rgba(147, 51, 234, 0.3))", "drop-shadow(0 0 0 rgba(147, 51, 234, 0))"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ArrowDown className="h-8 w-8 text-purple-500" />
              </motion.div>
            </div>
          </div>

          {/* Level 3 Preview: Multiplication Challenge */}
          <div className="flex justify-center w-full mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="md:col-start-2">
                <motion.div 
                  variants={itemVariants} 
                  className="flex"
                  whileInView={{ 
                    scale: [1, 1.03, 1.02],
                    transition: { duration: 1, ease: "easeOut" }
                  }}
                >
                  <Card id="card-8" className="game-card milestone-card border-purple-300 overflow-hidden w-full relative shadow-lg">
                    <div className="game-card-header bg-gradient-to-r from-purple-800 to-purple-600">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex-grow max-w-[85%]">
                          <LearningObjective icon={Calculator} text="Learning: Advanced Operation Integration" />
                        </div>
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0 shadow-sm">
                          8
                        </div>
                      </div>
                      <CardTitle className="text-white mt-1">Multiplication Challenge</CardTitle>
                      <CardDescription className="text-purple-200 mt-1">
                        <span className="flex items-center">
                          Next level preview
                          <span className="timing-label bg-purple-700 text-purple-100">Level 3</span>
                        </span>
                      </CardDescription>
                    </div>
                    <CardContent className="game-card-content">
                      <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                        <div className="flex justify-between mb-4">
                          <div>
                            <span className="text-red-500">❤️</span> 
                            <span className="font-medium">Health: 95/100</span>
                          </div>
                          <div>
                            <span className="font-medium">⏱️ Time: 1:10</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mb-4">
                          <div className="border-2 border-slate-200 rounded-lg p-3 text-center">
                            <div className="text-2xl">🐉</div>
                            <div>Elite Enemy</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                          <Button variant="outline" className="kid-button flex-1 border-blue-200">
                            <span className="mr-2">🔥</span> FIRE
                          </Button>
                          <Button variant="outline" className="kid-button flex-1">
                            <span className="mr-2">🧊</span> ICE
                          </Button>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center mb-4">
                          <div className="text-xl font-medium text-amber-600">2 × 5 = 10 ✓</div>
                          <div className="text-xs text-amber-500 font-medium mt-1">PATTERN BONUS! +50% POWER</div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">1</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">2</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">3</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">4</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">5</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">6</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">7</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">8</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">9</div>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center w-10 flex-shrink-0">+</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center w-10 flex-shrink-0">-</div>
                          <div className="number-button bg-purple-500 text-white rounded-lg p-2 text-center w-10 flex-shrink-0">×</div>
                          <div className="flex-grow"></div>
                          <Button variant="outline" className="flex-shrink-0">UNDO</Button>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button className="kid-button w-full bg-purple-500 hover:bg-purple-600 border-purple-400">
                            <Zap className="mr-2 h-4 w-4" />
                            CAST SUPER SPELL
                          </Button>
                        </div>
                      </div>
                      
                      <Separator className="content-separator" />
                      
                      <div className="gameplay-note">
                        <p>• Multiplication operations unlock in level 3</p>
                        <p>• Creating pattern numbers (10, 25) offers power bonuses</p>
                        <p>• Enemy difficulty increases with advanced operations</p>
                      </div>
                    </CardContent>
                    <CardFooter className="game-card-footer bg-purple-50 py-3">
                      <div className="emotional-state text-sm text-purple-900 py-1">Emotional state: <span className="font-medium">Challenge, accomplishment</span></div>
                      <DesignCallout focus="Mastery" className="ml-2" />
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Educational context footer */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 mb-16 educational-principles"
        >
          <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-transparent rounded-bl-full opacity-70"></div>
          
          <div className="section-header">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="section-icon"
            >
              <Brain className="h-6 w-6 text-indigo-600" />
            </motion.div>
            <div>
              <h2 className="section-title">Educational Design Principles</h2>
              <p className="text-sm text-slate-500 mt-1">Core game mechanics supporting math learning objectives</p>
            </div>
          </div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 }
                }
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="principle-card"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                initial={{ opacity: 1 }}
                className="absolute right-4 top-4 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 cursor-pointer z-20"
                title="Click to see implementation examples"
              >
                <Target className="h-5 w-5" />
              </motion.div>
              <h3 className="principle-title">Immediate Feedback</h3>
              <p className="principle-description">Students receive instant visual and audio feedback on their equation solutions, reinforcing correct answers and gently guiding through mistakes.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Success animations appear within 100ms of solution submission
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 }
                }
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="principle-card"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                initial={{ opacity: 1 }}
                className="absolute right-4 top-4 h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-500 cursor-pointer z-20"
                title="Click to see implementation examples"
              >
                <Target className="h-5 w-5" />
              </motion.div>
              <h3 className="principle-title">Pattern Recognition</h3>
              <p className="principle-description">Special rewards for recognizing mathematical patterns (like equations that equal 10) build deeper numerical understanding and fluency.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Automatic pattern detection with enhanced reward animations
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 }
                }
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="principle-card"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                initial={{ opacity: 1 }}
                className="absolute right-4 top-4 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 cursor-pointer z-20"
                title="Click to see implementation examples"
              >
                <Target className="h-5 w-5" />
              </motion.div>
              <h3 className="principle-title">Engaging Context</h3>
              <p className="principle-description">Math equations are presented in a motivating battle context that transforms abstract concepts into meaningful gameplay actions.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Every correct solution creates a visible impact on gameplay
              </div>
            </motion.div>
            
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 260, damping: 20 }
                }
              }}
              whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
              className="principle-card"
            >
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                initial={{ opacity: 1 }}
                className="absolute right-4 top-4 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 cursor-pointer z-20"
                title="Click to see implementation examples"
              >
                <Target className="h-5 w-5" />
              </motion.div>
              <h3 className="principle-title">Progressive Difficulty</h3>
              <p className="principle-description">Equation complexity increases gradually through levels, supporting student growth from basic operations to more complex mathematical concepts.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Adaptive difficulty based on player performance
              </div>
            </motion.div>
          </motion.div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <Eye className="h-5 w-5 mr-2 text-gray-700" />
              <h3 className="font-medium text-gray-900">Accessibility Considerations</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Features ensuring the game is accessible to all students</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="info-card">
                <div className="info-card-title">Color-blind friendly</div>
                <div className="info-card-content">Visual feedback uses patterns and shapes in addition to colors</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Adjustable timing</div>
                <div className="info-card-content">Equation timer can be extended for students who need more time</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Audio feedback</div>
                <div className="info-card-content">All visual feedback is paired with distinct audio cues</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center mb-3">
              <HandMetal className="h-5 w-5 mr-2 text-gray-700" />
              <h3 className="font-medium text-gray-900">Key Micro-interactions</h3>
            </div>
            <p className="text-sm text-slate-500 mb-4">Small interaction details that enhance the learning experience</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="info-card">
                <div className="info-card-title">Number Selection</div>
                <div className="info-card-content">Slight scale animation (1.05×) with 100ms duration and subtle "click" sound</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Equation Completion</div>
                <div className="info-card-content">Green pulse animation with 300ms duration and rising "success" tone</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Pattern Discovery</div>
                <div className="info-card-content">Golden particles emanate from equation with sparkle sound effect</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="my-12 bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-lg p-6 border-2 border-purple-100 shadow-md">
          <div className="section-header">
            <div className="section-icon text-purple-500">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <h2 className="section-title text-purple-900">Variation States</h2>
              <p className="text-sm text-slate-500 mt-1">Alternative game states based on player actions</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Incorrect Answer State</h3>
              <div className="bg-white rounded-lg p-3 border border-red-200 mb-3">
                <div className="text-center text-red-600 text-lg font-medium">5 + 3 = 7 ✗</div>
                <div className="text-xs text-center mt-1 text-red-500">Try again!</div>
              </div>
              <p className="principle-description">Error state shows gentle correction with opportunity to retry. No health penalty on first attempt.</p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Timeout State</h3>
              <div className="bg-white rounded-lg p-3 border border-amber-200 mb-3">
                <div className="text-center text-amber-600 text-lg font-medium">5 + 3 = ?</div>
                <div className="text-xs text-center mt-1 text-amber-500">Time's up! Answer: 8</div>
              </div>
              <p className="principle-description">When time expires, answer is revealed and player's turn ends without damage to enemy.</p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Difficulty Progression</h3>
              <div className="flex flex-col gap-2 mb-3">
                <div className="bg-white rounded-lg p-2 border border-blue-100 text-xs">
                  <span className="text-blue-800 font-medium">Level 1:</span> <span>5 + 3 = ?</span>
                  <span className="ml-2 text-slate-400">Addition only</span>
                </div>
                <div className="bg-white rounded-lg p-2 border border-indigo-100 text-xs">
                  <span className="text-indigo-800 font-medium">Level 2:</span> <span>12 - 5 = ?</span>
                  <span className="ml-2 text-slate-400">Addition & subtraction</span>
                </div>
                <div className="bg-white rounded-lg p-2 border border-purple-100 text-xs">
                  <span className="text-purple-800 font-medium">Level 3:</span> <span>4 × 3 = ?</span>
                  <span className="ml-2 text-slate-400">All operations</span>
                </div>
              </div>
              <p className="principle-description">Equation complexity increases gradually, building upon mastered concepts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
