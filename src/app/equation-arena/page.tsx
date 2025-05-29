"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";
import { Award, Zap, Calculator, Brain, Target, BookOpen, Focus, Eye, HandMetal, MoveHorizontal, Sparkles } from "lucide-react";
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
        <p className="text-center text-gray-500 mb-4">Interactive Grade 5 math battle experience</p>
        
        <div className="max-w-2xl mx-auto p-4 bg-indigo-50 rounded-lg border border-indigo-100 mb-6">
          <h2 className="text-sm font-medium text-indigo-800 flex items-center mb-2">
            <Eye className="h-4 w-4 mr-1" /> Design Vision
          </h2>
          <p className="text-sm text-indigo-700">
            An engaging math battle experience that develops computational fluency, order of operations understanding, and fraction/decimal mastery through immediate feedback and visual rewards.
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
          { symbol: '×', top: '50%', left: '80%', rotate: '-8deg', duration: 4 },
          { symbol: '()', top: '65%', left: '75%', rotate: '-2deg', duration: 3.5 },
          { symbol: '½', top: '70%', left: '30%', rotate: '-10deg', duration: 4.5 },
          { symbol: '0.5', top: '45%', left: '20%', rotate: '-13deg', duration: 3.2 }
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
              <span className="text-xs ml-2 bg-white/20 rounded px-2 py-0.5">Total Duration: ~6-8 minutes</span>
            </h2>
          </div>
        </motion.div>

        {/* Flow connector overlay */}
        <ConnectorManager 
          connections={[
            { 
              fromId: "card-1", 
              toId: "card-tutorial", 
              label: "Game loads", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-tutorial", 
              toId: "card-2", 
              label: "Tutorial complete", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-2", 
              toId: "card-3", 
              label: "Equation building", 
              type: "diagonal",
              fromAnchor: "bottom",
              toAnchor: "top",
              isLearningMoment: true,
              labelPosition: "right",
              labelOffset: { x: 5, y: 0 }
            },
            { 
              fromId: "card-3", 
              toId: "card-error", 
              label: "Incorrect solution", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-error", 
              toId: "card-4", 
              label: "Try again", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-4", 
              toId: "card-shield", 
              label: "Ice spell", 
              type: "diagonal",
              fromAnchor: "bottom",
              toAnchor: "top",
              labelPosition: "right",
              labelOffset: { x: 5, y: 0 }
            },
            { 
              fromId: "card-shield", 
              toId: "card-5", 
              label: "Begin Level 2", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-5", 
              toId: "card-6", 
              label: "Pattern recognition", 
              type: "horizontal",
              fromAnchor: "right",
              toAnchor: "left",
              labelPosition: "top",
              labelOffset: { x: 0, y: -5 }
            },
            { 
              fromId: "card-6", 
              toId: "card-7", 
              label: "Begin Level 3", 
              type: "diagonal",
              fromAnchor: "bottom",
              toAnchor: "top",
              isLearningMoment: true,
              labelPosition: "right",
              labelOffset: { x: 5, y: 0 }
            },
            { 
              fromId: "card-7", 
              toId: "card-8", 
              label: "Game complete", 
              type: "diagonal",
              fromAnchor: "bottom",
              toAnchor: "top",
              labelPosition: "right",
              labelOffset: { x: 5, y: 0 }
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
                <Card id="card-1" className="game-card border-zinc-200 overflow-hidden w-full relative z-10">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={BookOpen} text="Learning: Order of Operations & Expectation Setting" />
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
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
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
          
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className="number-button">
                            {num}
                          </Button>
                        ))}
          </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button">×</Button>
                        <Button variant="outline" size="sm" className="op-button">(</Button>
                        <Button variant="outline" size="sm" className="op-button">)</Button>
        </div>

                      <div className="flex justify-center">
                        <Button disabled className="kid-button w-full opacity-50">CAST SPELL</Button>
                      </div>
            </div>
            
                    <Separator className="content-separator" />
                    
                    <div className="gameplay-note">
                      <p>• Player sees battle screen with Order Keeper enemy</p>
                      <p>• Enemy appears with full health</p>
                      <p>• Player selects spell type and waits for equation</p>
            </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Anticipation</span></div>
                    <DesignCallout focus="Clarity" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>

              {/* NEW: Tutorial Overlay Card */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-tutorial" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={BookOpen} text="Learning: Onboarding & Tutorial" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        T
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Tutorial Overlay</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        First-time player experience
                        <span className="timing-label">0:00-0:30</span>
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
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
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
                
                      <div className="border border-indigo-200 rounded-lg p-3 text-center mb-4 bg-indigo-50">
                        <p className="text-indigo-700">Ready to build your equation!</p>
                </div>
                
                      <div className="grid grid-cols-3 gap-2 mb-2 relative">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button 
                            key={num} 
                            variant="outline" 
                            size="sm" 
                            className={`number-button ${num === 2 || num === 3 ? "bg-blue-50 border-blue-200" : ""}`}
                          >
                      {num}
                    </Button>
                  ))}
                        
                        {/* Helper Arrows */}
                        <div className="absolute -top-6 left-[12%] text-blue-500 font-bold text-lg">↓</div>
                        <div className="absolute -top-6 left-[45%] text-blue-500 font-bold text-lg">↓</div>
                </div>
                
                      <div className="grid grid-cols-5 gap-2 mb-4 relative">
                        <Button variant="outline" size="sm" className="op-button bg-blue-50 border-blue-200">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button">×</Button>
                        <Button variant="outline" size="sm" className="op-button bg-blue-50 border-blue-200">(</Button>
                        <Button variant="outline" size="sm" className="op-button">)</Button>
                        
                        {/* Helper Arrows */}
                        <div className="absolute -top-6 left-[10%] text-blue-500 font-bold text-lg">↓</div>
                        <div className="absolute -top-6 left-[70%] text-blue-500 font-bold text-lg">↓</div>
                      </div>
                      
                      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-3 mb-4">
                        <div className="font-medium text-yellow-800 mb-2 text-center">3-STEP TUTORIAL</div>
                        <ol className="text-sm text-yellow-700 space-y-2 pl-5 list-decimal">
                          <li>Tap numbers and operations to build an equation</li>
                          <li>Use parentheses to control order of operations for bonus power</li>
                          <li>Create equations that demonstrate mathematical properties for power bonuses</li>
                        </ol>
                        <div className="flex justify-center mt-3">
                          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                            Got it!
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" className="text-gray-500">
                          <Zap className="mr-1 h-4 w-4" />
                          UNDO
                        </Button>
                        <Button disabled className="kid-button opacity-50">CAST SPELL</Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                      <p>• 3-step tutorial overlay introduces key concepts</p>
                      <p>• Visual helper highlights (arrows) guide first inputs</p>
                      <p>• Undo button available for error recovery</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Curious learning</span></div>
                    <DesignCallout focus="Guided Onboarding" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>

          {/* Frame 2: Equation Appears */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-2" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Focus} text="Learning: Order of Operations" />
            </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
              2
            </div>
                    </div>
                    <CardTitle className="text-white mt-1">Equation Appears</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Parentheses challenge
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
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
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
                        customEquation="2 × (3 + 7) = ?"
                />
                
                      <div className="grid grid-cols-3 gap-2 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button key={num} variant="outline" size="sm" className="number-button">
                      {num}
                    </Button>
                  ))}
                </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button">×</Button>
                        <Button variant="outline" size="sm" className="op-button">(</Button>
                        <Button variant="outline" size="sm" className="op-button">)</Button>
                </div>
                
                <div className="flex justify-center">
                  <Button disabled className="kid-button w-full opacity-50">CAST SPELL</Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                      <p>• Order of operations equation appears <span className="text-xs text-blue-500">(slide in from top)</span></p>
                      <p>• Player must use parentheses to solve correctly</p>
                      <p>• Numbers and operations become interactive</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Focus and strategic thinking</span></div>
                    <DesignCallout focus="Order of Operations" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>
            </div>
          </div>

          {/* Second row: Cards 3, Error, 4 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
          {/* Frame 3: Player Input */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-3" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={HandMetal} text="Learning: Equation Building with Parentheses" />
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
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
                  </div>
                </div>
                
                <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button fire-spell flex-1">
                    <span className="mr-2">🔥</span> FIRE
                  </Button>
                  <Button variant="outline" className="kid-button flex-1">
                    <span className="mr-2">🧊</span> ICE
                  </Button>
                </div>
                
                      <div className="border border-purple-200 rounded-lg p-3 text-center mb-4 bg-purple-50">
                        <p className="text-purple-800 font-medium">2 × (3 + 7) = 20</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button 
                      key={num} 
                            variant="outline" 
                      size="sm"
                            className={`number-button ${[2, 3, 7].includes(num) ? "bg-purple-100" : ""}`}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button bg-purple-100">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-100">×</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-100">(</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-100">)</Button>
                </div>
                
                <div className="flex justify-center">
                  <Button className="kid-button w-full">CAST SPELL</Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                <p>• Player selects numbers and operations <span className="text-xs text-blue-500">(tap sound)</span></p>
                      <p>• Player uses parentheses to control order of operations</p>
                      <p>• Cast button becomes available when valid equation is complete</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Accomplishment</span></div>
                    <DesignCallout focus="Mathematical Strategy" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>
              
              {/* Error Card */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-error" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={HandMetal} text="Learning: Understanding Mistakes" />
            </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        E
            </div>
                    </div>
                    <CardTitle className="text-white mt-1">Error Feedback</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Incorrect equation handling
                        <span className="timing-label">0:25-0:30</span>
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
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
                        </div>
                </div>
                
                <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1 bg-red-50 border-red-200">
                    <span className="mr-2">🔥</span> FIRE
                  </Button>
                  <Button variant="outline" className="kid-button flex-1">
                    <span className="mr-2">🧊</span> ICE
                  </Button>
                </div>
                
                      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 relative overflow-hidden shadow-md mb-4 animate-shake">
                        <div className="text-center">
                          <div className="bg-white rounded-lg p-3 border-2 border-red-300 mb-3 mx-auto max-w-xs shadow-sm">
                            <p className="text-red-800 font-medium text-center text-lg">2 × (3 + 7) = 16 ✗</p>
                            <div className="flex items-center justify-center my-2">
                              <div className="w-16 h-0 border-t-2 border-red-300"></div>
                              <span className="mx-3 text-red-600 font-medium">should be</span>
                              <div className="w-16 h-0 border-t-2 border-red-300"></div>
                            </div>
                            <p className="text-slate-700 font-medium text-center">2 × (3 + 7) = 2 × 10 = 20</p>
                          </div>
                          
                          <div className="absolute -bottom-1 -right-1 rotate-12 text-3xl">❌</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className={`number-button ${num === 6 ? "bg-red-50 border-red-200" : ""}`}>
                      {num}
                    </Button>
                  ))}
                </div>
                      
                      <div className="grid grid-cols-5 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button">×</Button>
                        <Button variant="outline" size="sm" className="op-button">(</Button>
                        <Button variant="outline" size="sm" className="op-button">)</Button>
                </div>
                
                <div className="flex justify-center">
                        <Button disabled className="kid-button w-full opacity-50">
                          CAST SPELL
                        </Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                      <p>• Incorrect equation shown with gentle red glow</p>
                      <p>• Error explanation highlights order of operations mistake</p>
                      <p>• No health penalty on first attempt</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Momentary confusion</span></div>
                    <DesignCallout focus="Gentle Correction" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>
              
              {/* Frame 4: First Level */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-4" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Brain} text="Learning: Order of Operations" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        4
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">First Level: Order of Operations</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Core gameplay example
                        <span className="timing-label">0:00-0:30</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner relative overflow-hidden">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 2:00</span>
                        </div>
            </div>
            
                      <div className="flex justify-center mb-4">
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
            </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
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
                      
                      <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-5 relative overflow-hidden shadow-md mb-4">
                        <div className="text-center">
                          <div className="text-xl font-medium text-purple-700 mb-1">
                            ✨ DISTRIBUTIVE BONUS! ✨
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border-2 border-purple-300 mb-3 mx-auto max-w-xs shadow-sm">
                            <p className="text-purple-800 font-medium text-center text-lg">2 × (3 + 4) = 14</p>
                            <div className="flex items-center justify-center my-2">
                              <div className="w-16 h-0 border-t-2 border-purple-300"></div>
                              <span className="mx-3 text-purple-600 font-medium">same as</span>
                              <div className="w-16 h-0 border-t-2 border-purple-300"></div>
                            </div>
                            <p className="text-purple-800 font-medium text-center text-lg">2×3 + 2×4 = 14</p>
                          </div>
                          
                          <div className="bg-purple-600 text-white px-4 py-1.5 rounded-full font-medium inline-block shadow-md">
                            +50% SPELL POWER (37 DAMAGE)
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className={num === 2 ? "number-button bg-purple-50" : "number-button"}>
                            {num}
                          </Button>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-50">×</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-50">(</Button>
                        <Button variant="outline" size="sm" className="op-button bg-purple-50">)</Button>
                      </div>
                
                <div className="flex justify-center">
                        <Button className="kid-button w-full bg-purple-500 hover:bg-purple-600 text-white shadow-md">
                          CAST SPELL
                  </Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                      <p>• Distributive property pattern gives a power bonus</p>
                      <p>• Parentheses control order of operations</p>
                      <p>• Players learn multiplication with parentheses</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Interest and challenge</span></div>
                    <DesignCallout focus="Distributive Property" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>
            </div>
            </div>
            
          {/* Third row: Shield, 5, 6 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              {/* Shield Mechanics Card */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-shield" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Brain} text="Learning: Defensive Strategy" />
            </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        S
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Shield Mechanics</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Ice spell defense system
                        <span className="timing-label">0:40-0:50</span>
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
                          <span className="font-medium">⏱️ Time: 0:55</span>
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                        <div className="border-2 border-purple-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">👁️</div>
                          <div>Order Keeper</div>
                          <div className="relative mt-1">
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-xs font-bold text-red-600">
                              ATTACK IN 3s
                            </div>
                            <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 w-9/12"></div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">85/100 HP</div>
                        </div>
                </div>
                
                      {/* Current Shield */}
                      <div className="flex justify-center mb-5">
                        <div className="relative">
                          <div className="absolute inset-0 animate-pulse-slow rounded-full bg-blue-300 opacity-20"></div>
                          <div className="w-20 h-20 rounded-full border-4 border-blue-400 bg-blue-50 flex items-center justify-center relative z-10">
                            <span className="text-2xl font-bold text-blue-600">25</span>
                          </div>
                          <div className="text-center text-sm mt-1 text-blue-700 font-medium">Shield Active</div>
                        </div>
                </div>
                
                      <div className="flex gap-4 mb-4">
                        <Button variant="outline" className="kid-button flex-1">
                          <span className="mr-2">🔥</span> FIRE
                        </Button>
                        <Button variant="outline" className="kid-button flex-1 bg-blue-50 border-blue-200">
                          <span className="mr-2">🧊</span> ICE
                        </Button>
                </div>
                
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 relative overflow-hidden shadow-md mb-4">
                        <div className="text-center">
                          <div className="bg-white rounded-lg p-3 border-2 border-blue-300 mb-3 mx-auto max-w-xs shadow-sm">
                            <p className="text-blue-800 font-medium text-center text-lg">3 × (4 + 6) = 30</p>
                            <div className="flex items-center justify-center my-2">
                              <div className="w-16 h-0 border-t-2 border-blue-300"></div>
                              <span className="mx-3 text-blue-600 font-medium">creates</span>
                              <div className="w-16 h-0 border-t-2 border-blue-300"></div>
                            </div>
                            <p className="text-blue-800 font-medium text-center text-lg">Medium Shield (30)</p>
                          </div>
                          
                          <div className="text-sm bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-3">
                            <p className="text-yellow-700">This will replace your current shield (25 → 30)</p>
                          </div>
                          
                          <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-medium inline-block shadow-md">
                            CAST NEW SHIELD
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-slate-200 rounded-lg p-3">
                        <div className="flex space-x-3 mb-2">
                          <div className="w-1/2 bg-slate-50 rounded-md p-2 text-center">
                            <div className="text-sm font-medium mb-1">ENEMY ATTACK</div>
                            <div className="text-lg text-red-600 font-bold">-15 damage</div>
                          </div>
                          <div className="w-1/2 bg-blue-50 rounded-md p-2 text-center">
                            <div className="text-sm font-medium mb-1">SHIELD ABSORBS</div>
                            <div className="text-lg text-blue-600 font-bold">15 → 10 left</div>
                          </div>
                        </div>
                        <div className="text-xs text-center text-slate-500">Shield absorbs all damage until depleted</div>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                      <p>• Ice spell creates a shield with absorption value</p>
                      <p>• New shields replace existing ones (don&apos;t stack)</p>
                      <p>• Shield blocks all incoming damage until depleted</p>
              </div>
            </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Strategic planning</span></div>
                    <DesignCallout focus="Damage Mitigation" className="ml-2" />
            </CardFooter>
          </Card>
              </motion.div>
              
              {/* Frame 5: Pattern Recognition */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-5" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Brain} text="Learning: Pattern Recognition" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        5
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Pattern Recognition</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Mathematical properties as game mechanics
                        <span className="timing-label">0:30-1:00</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white rounded-md overflow-hidden shadow-sm border border-slate-100">
                        <div className="bg-purple-100 p-2 text-center">
                          <span className="text-sm font-medium text-purple-800">Level 1: Distributive</span>
                        </div>
                        <div className="p-2 text-center">
                          <code className="text-purple-600">2×(3+4) = 2×3+2×4</code>
                          <div className="mt-1 text-xs text-purple-600">+50% Power</div>
                        </div>
            </div>
            
                      <div className="bg-white rounded-md overflow-hidden shadow-sm border border-slate-100">
                        <div className="bg-green-100 p-2 text-center">
                          <span className="text-sm font-medium text-green-800">Level 2: Benchmark</span>
            </div>
                        <div className="p-2 text-center">
                          <code className="text-green-600">1/4+1/4 = 1/2</code>
                          <div className="mt-1 text-xs text-green-600">+50% Power</div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md overflow-hidden shadow-sm border border-slate-100">
                        <div className="bg-cyan-100 p-2 text-center">
                          <span className="text-sm font-medium text-cyan-800">Level 3: Place Value</span>
                        </div>
                        <div className="p-2 text-center">
                          <code className="text-cyan-600">0.1×10 = 1</code>
                          <div className="mt-1 text-xs text-cyan-600">+50% Power</div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md overflow-hidden shadow-sm border border-slate-100">
                        <div className="bg-amber-100 p-2 text-center">
                          <span className="text-sm font-medium text-amber-800">All Levels: Commutative</span>
                        </div>
                        <div className="p-2 text-center">
                          <code className="text-amber-600">4×5 = 5×4</code>
                          <div className="mt-1 text-xs text-amber-600">+25% Power</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 mt-3 shadow-sm border border-slate-100">
                      <p className="font-medium mb-2 text-sm">Pattern Bonus System:</p>
                      <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
                        <li>Student creates equation demonstrating a mathematical property</li>
                        <li>Game recognizes the pattern automatically</li>
                        <li>Visual effect highlights the property with unique animation</li>
                        <li>Text explanation teaches the property name and concept</li>
                        <li>Spell power increases (+50% level-specific, +25% commutative)</li>
                      </ol>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="feature-card">
                        <BookOpen className="h-5 w-5 text-blue-500 mb-1" />
                        <div className="feature-title">Educational Value</div>
                        <div className="feature-description">Students learn mathematical properties through gameplay rewards</div>
                      </div>
                      
                      <div className="feature-card">
                        <Sparkles className="h-5 w-5 text-purple-500 mb-1" />
                        <div className="feature-title">Engagement Hook</div>
                        <div className="feature-description">Pattern discovery creates exciting gameplay moments</div>
                      </div>
                    </div>
                    
                    <Separator className="content-separator mt-4" />
                    
                    <div className="gameplay-note">
                      <p>• Each level introduces a new mathematical property</p>
                      <p>• Properties are rewarded with increased spell power</p>
                      <p>• Visual and audio feedback reinforce learning</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Discovery</span></div>
                    <DesignCallout focus="Pattern Recognition" className="ml-2" />
                  </CardFooter>
                </Card>
                    </motion.div>
              
              {/* Frame 6: Fractions */}
              <motion.div variants={itemVariants} className="flex">
                <Card id="card-6" className="game-card border-zinc-200 overflow-hidden w-full">
                  <div className="game-card-header">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex-grow max-w-[85%]">
                        <LearningObjective icon={Brain} text="Learning: Fractions with Unlike Denominators" />
                      </div>
                      <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                        6
                      </div>
                    </div>
                    <CardTitle className="text-white mt-1">Next Level: Fractions</CardTitle>
                    <CardDescription className="text-slate-300 mt-1">
                      <span className="flex items-center">
                        Benchmark fractions
                        <span className="timing-label">1:00-1:30</span>
                      </span>
                    </CardDescription>
                  </div>
                  <CardContent className="game-card-content">
                    <div className="bg-white rounded-lg p-4 mb-4 shadow-inner relative overflow-hidden">
                      <div className="flex justify-between mb-4">
                        <div>
                          <span className="text-red-500">❤️</span> 
                          <span className="font-medium">Health: 100/100</span>
                        </div>
                        <div>
                          <span className="font-medium">⏱️ Time: 2:00</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        <div className="border-2 border-green-200 rounded-lg p-3 text-center">
                          <div className="text-2xl">🧩</div>
                          <div>Fraction Fiend</div>
                          <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-full"></div>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">100/100 HP</div>
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
                      
                      <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5 relative overflow-hidden shadow-md mb-4">
                        <div className="text-center">
                          <div className="text-xl font-medium text-green-700 mb-1">
                            ✨ BENCHMARK FRACTION BONUS! ✨
                          </div>
                          
                          <div className="bg-white rounded-lg p-3 border-2 border-green-300 mb-3 mx-auto max-w-xs shadow-sm">
                            <p className="text-green-800 font-medium text-center text-lg">1/4 + 1/4 = 1/2</p>
                            <div className="flex items-center justify-center my-2">
                              <div className="w-16 h-0 border-t-2 border-green-300"></div>
                              <span className="mx-3 text-green-600 font-medium">creates</span>
                              <div className="w-16 h-0 border-t-2 border-green-300"></div>
                            </div>
                            <p className="text-green-800 font-medium text-center text-lg">a benchmark fraction</p>
                          </div>
                          
                          <div className="bg-green-600 text-white px-4 py-1.5 rounded-full font-medium inline-block shadow-md">
                            +50% SPELL POWER (37 DAMAGE)
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <Button key={num} variant="outline" size="sm" className={num === 4 ? "number-button bg-green-50" : "number-button"}>
                            {num}
                          </Button>
                  ))}
                </div>

                      <div className="grid grid-cols-4 gap-2 mb-4">
                        <Button variant="outline" size="sm" className="op-button">+</Button>
                        <Button variant="outline" size="sm" className="op-button">-</Button>
                        <Button variant="outline" size="sm" className="fraction-button bg-green-50">1/2</Button>
                        <Button variant="outline" size="sm" className="fraction-button bg-green-50">1/4</Button>
                        <Button variant="outline" size="sm" className="fraction-button bg-green-50">3/4</Button>
                        <Button variant="outline" size="sm" className="fraction-button">2/3</Button>
                        <Button variant="outline" size="sm" className="fraction-button">1/3</Button>
                        <Button variant="outline" size="sm" className="fraction-button">5/6</Button>
                </div>
                
                      <div className="flex justify-center">
                        <Button className="kid-button w-full bg-green-500 hover:bg-green-600 text-white shadow-md">
                          CAST SPELL
                        </Button>
                      </div>
                </div>
                
                <Separator className="content-separator" />
                
                    <div className="gameplay-note">
                      <p>• Benchmark fraction patterns (1/2, 3/4, 1) give power bonuses</p>
                      <p>• Fraction tiles appear for building equations</p>
                      <p>• Player learns equivalent fractions and common denominators</p>
                    </div>
                  </CardContent>
                  <CardFooter className="game-card-footer py-3">
                    <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Focused challenge</span></div>
                    <DesignCallout focus="Fraction Mastery" className="ml-2" />
                  </CardFooter>
                </Card>
              </motion.div>
                  </div>
                </div>
                
          {/* Fourth row: Card 7 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="md:col-start-2">
                {/* Frame 7: Decimals */}
                <motion.div variants={itemVariants} className="flex">
                  <Card id="card-7" className="game-card border-zinc-200 overflow-hidden w-full">
                    <div className="game-card-header">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex-grow max-w-[85%]">
                          <LearningObjective icon={Calculator} text="Learning: Decimal Place Value Understanding" />
                        </div>
                        <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                          7
                        </div>
                      </div>
                      <CardTitle className="text-white mt-1">Final Level: Decimals</CardTitle>
                      <CardDescription className="text-slate-300 mt-1">
                        <span className="flex items-center">
                          Place value understanding
                          <span className="timing-label">1:30-2:00</span>
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
                          <div className="border-2 border-cyan-200 rounded-lg p-3 text-center">
                            <div className="text-2xl">💠</div>
                            <div>Decimal Demon</div>
                            <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 w-3/4"></div>
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">75/100 HP</div>
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mb-4">
                          <Button variant="outline" className="kid-button flex-1 border-cyan-200">
                            <span className="mr-2">🔥</span> FIRE
                  </Button>
                          <Button variant="outline" className="kid-button flex-1">
                            <span className="mr-2">🧊</span> ICE
                          </Button>
                        </div>
                        
                        <div className="bg-cyan-50 border-2 border-cyan-200 rounded-lg p-5 relative overflow-hidden shadow-md mb-4">
                          <div className="text-center">
                            <div className="text-xl font-medium text-cyan-700 mb-1">
                              ✨ PLACE VALUE BONUS! ✨
                            </div>
                            
                            <div className="bg-white rounded-lg p-3 border-2 border-cyan-300 mb-3 mx-auto max-w-xs shadow-sm">
                              <p className="text-cyan-800 font-medium text-center text-lg">0.1 × 10 = 1</p>
                              <div className="flex items-center justify-center my-2">
                                <div className="w-16 h-0 border-t-2 border-cyan-300"></div>
                                <span className="mx-3 text-cyan-600 font-medium">means</span>
                                <div className="w-16 h-0 border-t-2 border-cyan-300"></div>
                              </div>
                              <p className="text-cyan-800 font-medium text-center text-lg">decimal point moves right →</p>
                            </div>
                            
                            <div className="bg-cyan-600 text-white px-4 py-1.5 rounded-full font-medium inline-block shadow-md">
                              +50% SPELL POWER (37 DAMAGE)
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">1</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">0</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">.</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">0.1</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">0.01</div>
                          <div className="number-button bg-cyan-100 rounded-lg p-2 text-center text-cyan-800">10</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">100</div>
                          <div className="number-button bg-slate-100 rounded-lg p-2 text-center">÷</div>
                          <div className="number-button bg-cyan-100 text-cyan-800 rounded-lg p-2 text-center">×</div>
                        </div>
                        
                        <div className="flex justify-center">
                          <Button className="kid-button w-full bg-cyan-500 hover:bg-cyan-600 border-cyan-400">
                            <Zap className="mr-2 h-4 w-4" />
                            CAST SUPER SPELL
                          </Button>
                </div>
              </div>
              
              <Separator className="content-separator" />
              
              <div className="gameplay-note">
                        <p>• Place value understanding creates powerful bonus effects</p>
                        <p>• Decimal operations teach place value relationships</p>
                        <p>• Animations show number shifting to reinforce decimal concepts</p>
              </div>
            </CardContent>
                    <CardFooter className="game-card-footer py-3">
                      <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Mastery and confidence</span></div>
                      <DesignCallout focus="Place Value" className="ml-2" />
            </CardFooter>
          </Card>
                </motion.div>
              </div>
            </div>
        </div>
        
          {/* Fifth row: Card 8 */}
          <div className="flex flex-wrap justify-center gap-10 mb-16 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="md:col-start-2">
                {/* Frame 8: Level Complete */}
                <motion.div variants={itemVariants} className="flex">
                  <Card id="card-8" className="game-card border-zinc-200 overflow-hidden w-full">
                    <div className="game-card-header">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex-grow max-w-[85%]">
                          <LearningObjective icon={Award} text="Learning: Progress Assessment & Reflection" />
                        </div>
                        <div className="w-8 h-8 bg-primary text-white rounded-bl-lg font-bold flex items-center justify-center flex-shrink-0">
                          8
                        </div>
                      </div>
                      <CardTitle className="text-white mt-1">Game Complete</CardTitle>
                      <CardDescription className="text-slate-300 mt-1">
                        <span className="flex items-center">
                          Celebration and reflection
                          <span className="timing-label">2:00-2:30</span>
                        </span>
                      </CardDescription>
                    </div>
                    <CardContent className="game-card-content">
                      <div className="bg-white rounded-lg p-4 mb-4 shadow-inner">
                        <div className="flex justify-center items-center flex-col">
                          <div className="text-2xl font-bold text-primary mb-2">LEVEL COMPLETE!</div>
                          
                          <div className="flex justify-center mb-3">
                            <div className="border-2 border-cyan-200 rounded-lg p-3 text-center">
                              <div className="text-2xl">💠</div>
                              <div>Decimal Demon</div>
                              <div className="mt-1 h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500 w-0"></div>
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">0/100 HP</div>
                            </div>
          </div>
          
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4 w-full max-w-md text-sm">
                            <div className="font-medium">Equations Solved:</div>
                            <div>10</div>
                            
                            <div className="font-medium">Pattern Bonuses:</div>
                            <div>4 (2 distributive, 1 benchmark, 1 place value)</div>
                            
                            <div className="font-medium">Time Taken:</div>
                            <div>7:15</div>
                            
                            <div className="font-medium">Best Spell:</div>
                            <div>0.75 + 0.25 = 1.00 (37 damage)</div>
              </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 w-full">
                            <h4 className="font-medium text-blue-800 mb-1">Math Powers Unlocked!</h4>
                            <ul className="text-sm text-blue-700 pl-5 list-disc">
                              <li><span className="mr-1">🔄</span> Demonstrated understanding of order of operations</li>
                              <li><span className="mr-1">➗</span> Successfully worked with unlike denominators</li>
                              <li><span className="mr-1">💯</span> Applied decimal operations correctly</li>
                              <li><span className="mr-1">⭐</span> Recognized mathematical patterns and properties</li>
                            </ul>
                          </div>
                          
                          <div className="text-center mb-3">
                            <div className="font-medium mb-1">How was your experience?</div>
                            <div className="flex justify-center gap-4">
                              <Button variant="outline" size="sm" className="w-12 h-12 text-2xl">😀</Button>
                              <Button variant="outline" size="sm" className="w-12 h-12 text-2xl">😐</Button>
                              <Button variant="outline" size="sm" className="w-12 h-12 text-2xl">☹️</Button>
              </div>
            </div>
            
                          <div className="flex justify-center gap-4 w-full">
                            <Button className="bg-primary hover:bg-primary/90 flex-1">CONTINUE</Button>
                            <Button variant="outline" className="flex-1">EXIT</Button>
              </div>
              </div>
            </div>
            
                      <Separator className="content-separator" />
                      
                      <div className="gameplay-note">
                        <p>• Player completes all three levels (order of operations, fractions, decimals)</p>
                        <p>• Results summary shows educational achievements</p>
                        <p>• Feedback collected to improve experience</p>
              </div>
                    </CardContent>
                    <CardFooter className="game-card-footer py-3">
                      <div className="emotional-state text-sm text-slate-700 py-1">Emotional state: <span className="font-medium">Pride & accomplishment</span></div>
                      <DesignCallout focus="Learning Validation" className="ml-2" />
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
              <h3 className="principle-title">Mathematical Properties</h3>
              <p className="principle-description">Recognizing mathematical properties (distributive, commutative, benchmark fractions, place value) builds deeper algebraic understanding and prepares for future math success.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Automatic property detection with tailored reward animations by level
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
              <p className="principle-description">Equation complexity increases gradually, building upon mastered concepts while introducing new mathematical properties.</p>
              <div className="principle-implementation">
                <strong>Implementation:</strong> Accessible difficulty scaling with balanced enemy health (75/90/100) and attack timing (9/8/7 seconds)
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
                <div className="info-card-content">Extended enemy attack timing (9/8/7 seconds) gives students adequate processing time</div>
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
                <div className="info-card-content">Slight scale animation (1.05×) with 100ms duration and subtle &quot;click&quot; sound</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Equation Completion</div>
                <div className="info-card-content">Green pulse animation with 300ms duration and rising &quot;success&quot; tone</div>
              </div>
              <div className="info-card">
                <div className="info-card-title">Property Recognition</div>
                <div className="info-card-content">Level-specific animations: purple (distributive), green (fractions), cyan (place value)</div>
            </div>
          </div>
          </div>
        </motion.div>

        <div className="my-12 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 border-2 border-purple-100 shadow-md">
          <div className="section-header">
            <div className="section-icon text-purple-500">
              <Eye className="h-5 w-5" />
              </div>
            <div>
              <h2 className="section-title text-purple-900">Pattern Bonus States</h2>
              <p className="text-sm text-slate-500 mt-1">Mathematical pattern recognition by level</p>
              </div>
              </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Distributive Property</h3>
              <div className="bg-white rounded-lg p-3 border border-purple-200 mb-3">
                <div className="text-center text-purple-600 text-lg font-medium">2 × (3 + 4) = 14 ✓</div>
                <div className="text-xs text-center mt-1 text-purple-500">Same as 2×3 + 2×4 = 14!</div>
            </div>
              <p className="principle-description">Pattern bonus in Level 1 highlights the distributive property with purple visual effects and +50% spell power.</p>
          </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Benchmark Fractions</h3>
              <div className="bg-white rounded-lg p-3 border border-green-200 mb-3">
                <div className="text-center text-green-600 text-lg font-medium">1/4 + 1/4 = 1/2 ✓</div>
                <div className="text-xs text-center mt-1 text-green-500">Benchmark Fraction Bonus!</div>
              </div>
              <p className="principle-description">Level 2 rewards creating benchmark fractions (1/2, 3/4, 1) with green visual effects and +50% spell power.</p>
        </div>

            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Place Value Understanding</h3>
              <div className="bg-white rounded-lg p-3 border border-cyan-200 mb-3">
                <div className="text-center text-cyan-600 text-lg font-medium">0.1 × 10 = 1 ✓</div>
                <div className="text-xs text-center mt-1 text-cyan-500">Place Value Bonus!</div>
            </div>
              <p className="principle-description">Level 3 highlights place value understanding with decimal operations, cyan visuals and +50% power for reinforcement.</p>
          </div>
          
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Commutative Property</h3>
              <div className="bg-white rounded-lg p-3 border border-amber-200 mb-3">
                <div className="text-center text-amber-600 text-lg font-medium">4 × 3 = 12 ✓</div>
                <div className="text-xs text-center mt-1 text-amber-500">Same as 3 × 4 = 12!</div>
              </div>
              <p className="principle-description">Available in all levels, this symmetry bonus gives +25% power when operands can be flipped with the same result.</p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Incorrect Answer State</h3>
              <div className="bg-white rounded-lg p-3 border border-red-200 mb-3">
                <div className="text-center text-red-600 text-lg font-medium">2 × (3 + 4) = 10 ✗</div>
                <div className="text-xs text-center mt-1 text-red-500">Try again!</div>
              </div>
              <p className="principle-description">Error state shows gentle correction with opportunity to retry. No health penalty on first attempt.</p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Timeout State</h3>
              <div className="bg-white rounded-lg p-3 border border-amber-200 mb-3">
                <div className="text-center text-amber-600 text-lg font-medium">2 × (3 + 4) = ?</div>
                <div className="text-xs text-center mt-1 text-amber-500">Time&apos;s up! Answer: 14</div>
              </div>
              <p className="principle-description">When time expires, answer is revealed and player&apos;s turn ends without damage to enemy.</p>
            </div>
            
            <div className="principle-card">
              <h3 className="principle-title text-purple-900">Difficulty Progression</h3>
              <div className="flex flex-col gap-2 mb-3">
                <div className="bg-white rounded-lg p-2 border border-blue-100 text-xs">
                  <span className="text-blue-800 font-medium">Level 1:</span> <span>2 × (3 + 4) = ?</span>
                  <span className="ml-2 text-slate-400">75 HP enemy, attacks every 9 seconds</span>
                </div>
                <div className="bg-white rounded-lg p-2 border border-indigo-100 text-xs">
                  <span className="text-indigo-800 font-medium">Level 2:</span> <span>1/4 + 1/4 = ?</span>
                  <span className="ml-2 text-slate-400">90 HP enemy, attacks every 8 seconds</span>
                </div>
                <div className="bg-white rounded-lg p-2 border border-purple-100 text-xs">
                  <span className="text-purple-800 font-medium">Level 3:</span> <span>0.1 × 10 = ?</span>
                  <span className="ml-2 text-slate-400">100 HP enemy, attacks every 7 seconds</span>
                </div>
              </div>
              <p className="principle-description">Equation complexity increases gradually with balanced timing that ensures students can succeed while still being challenged.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
