"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowDown, Info, LightbulbIcon, Target, BookOpen, Eye, Brain } from 'lucide-react';
import { Button } from './ui/button';

export function StoryboardGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to the Equation Arena Storyboard",
      description: "This interactive storyboard demonstrates the complete player journey through a math battle sequence.",
      image: "👋",
      tip: "Follow the numbered sequence to understand the gameplay flow",
      designNote: "Entry point designed to establish clear expectations and learning context."
    },
    {
      title: "Core Gameplay Loop",
      description: "Players solve equations to cast spells at enemies, with pattern recognition for bonus rewards.",
      image: "🧮",
      tip: "Notice how equation-solving drives the battle mechanics",
      designNote: "The core loop balances mathematical challenge with game feedback every 8-10 seconds."
    },
    {
      title: "Educational Design",
      description: "Each frame highlights key emotional states and learning moments that reinforce math skills.",
      image: "🎓", 
      tip: "Note how feedback is immediate and visually rewarding",
      designNote: "Specific math concepts are reinforced through gameplay rather than explicit instruction."
    },
    {
      title: "Sound & Animation Notes",
      description: "Blue text indicates sound effects and animations that enhance the experience.",
      image: "🔊",
      tip: "Sound and visual cues reinforce correct answers",
      designNote: "Audio feedback uses rising tones for correct answers to create positive associations."
    },
    {
      title: "Accessibility Considerations",
      description: "The design accommodates various learning styles and abilities.",
      image: "👁️",
      tip: "Multiple feedback channels (visual, audio, haptic) support different learners",
      designNote: "Color choices maintain 4.5:1 contrast ratio minimum for text readability."
    }
  ];

  return (
    <>
      <Button 
        variant="outline" 
        className="kid-button text-sm"
        onClick={() => setIsOpen(true)}
      >
        <Info className="mr-2 h-4 w-4" />
        How to use this storyboard
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white rounded-2xl w-full max-w-xl p-6 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Math symbols background */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                {['+', '-', '×', '÷', '=', '?'].map((symbol, i) => (
                  <div 
                    key={i}
                    className="absolute text-3xl font-bold"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`
                    }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
              
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="pt-2">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                  <div className="text-3xl">{steps[step].image}</div>
                </div>
                
                <h2 className="text-xl font-bold text-center mb-2">{steps[step].title}</h2>
                <p className="text-center text-gray-600 mb-4">{steps[step].description}</p>
                
                {/* Educational objective */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex">
                  <BookOpen className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">Learning Objective</p>
                    <p className="text-sm text-blue-700">Students develop computational fluency while building mathematical confidence through game-based challenges.</p>
                  </div>
                </div>
                
                {/* Tip box */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 flex">
                  <LightbulbIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Design Tip</p>
                    <p className="text-sm text-amber-700">{steps[step].tip}</p>
                  </div>
                </div>
                
                {/* Designer note */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-6 flex">
                  <Brain className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-purple-800 font-medium">Designer Note</p>
                    <p className="text-sm text-purple-700">{steps[step].designNote}</p>
                  </div>
                </div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {steps.map((_, i) => (
                    <button 
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${i === step ? 'bg-primary' : 'bg-gray-300'}`}
                      onClick={() => setStep(i)}
                    />
                  ))}
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="ghost"
                    disabled={step === 0}
                    onClick={() => setStep(s => s - 1)}
                    className="text-gray-500"
                  >
                    Previous
                  </Button>
                  
                  {step < steps.length - 1 ? (
                    <Button 
                      onClick={() => setStep(s => s + 1)}
                      className="kid-button"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setIsOpen(false)}
                      className="kid-button bg-green-600 hover:bg-green-700"
                    >
                      Start Exploring
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 