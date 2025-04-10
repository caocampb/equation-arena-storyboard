"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Progress } from "@/components/ui/progress";
import { useEquation } from '@/lib/useEquation';
import { Badge } from './ui/badge';
import { Award } from 'lucide-react';

interface EquationDisplayProps {
  difficulty?: 1 | 2 | 3;
  showAnswer?: boolean;
  isCorrect?: boolean;
  isPatternBonus?: boolean;
  customEquation?: string;
  progressValue?: number;
}

interface Pattern {
  hasPattern: boolean;
  patternName: string | null;
}

// Import the Equation type from useEquation to ensure type consistency
type OperationType = '+' | '-' | '*' | '/';

interface Equation {
  operand1: number;
  operand2: number;
  operation: OperationType;
  answer: number;
  display: string;
}

// Default initial equation to prevent hydration mismatch
const DEFAULT_EQUATION: Equation = {
  operand1: 5,
  operand2: 3,
  operation: '+',
  answer: 8,
  display: '5 + 3 = ?'
};

export function EquationDisplay({
  difficulty = 1,
  showAnswer = false,
  isCorrect = false,
  isPatternBonus = false,
  customEquation,
  progressValue = 80
}: EquationDisplayProps) {
  const { generateEquation, checkForPattern } = useEquation(difficulty);
  const [equation, setEquation] = useState<Equation>(DEFAULT_EQUATION);
  const [pattern, setPattern] = useState<Pattern>({ hasPattern: false, patternName: null });
  const [isClient, setIsClient] = useState(false);
  
  // Only update equation on client-side to prevent hydration errors
  useEffect(() => {
    setIsClient(true);
    
    if (!customEquation) {
      const newEquation = generateEquation();
      setEquation(newEquation);
      setPattern(checkForPattern(newEquation.answer));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, customEquation]);
  
  // Use custom equation if provided, otherwise use generated one
  const displayText = customEquation || equation.display;
  
  // Modify display text to show answer when needed
  const finalDisplayText = showAnswer ? 
    displayText.replace('?', equation.answer.toString()) + (isCorrect ? ' ✓' : '') : 
    displayText;

  // Pattern bonus display
  if (isPatternBonus) {
    return (
      <motion.div 
        animate={{ 
          backgroundColor: ["#ffffff", "#fef9c3", "#ffffff"],
          transition: { duration: 2, repeat: Infinity }
        }}
        className="pattern-bonus"
      >
        <Badge className="bg-amber-500 mb-2">
          <Award className="h-3 w-3 mr-1" />
          PATTERN BONUS!
        </Badge>
        <p className="font-bold text-amber-700">🎯 {pattern.patternName || 'POWER 10!'} 🎯</p>
        <p className="text-sm text-amber-600">+50% POWER</p>
        <div className="mt-2">
          <p className="equation-text">{finalDisplayText}</p>
        </div>
      </motion.div>
    );
  }
  
  // Regular equation display
  return (
    <motion.div 
      initial={!customEquation ? { opacity: 0, y: -20 } : {}}
      animate={!customEquation ? { opacity: 1, y: 0 } : {}}
      className={`border rounded-lg p-3 text-center mb-4 ${
        isCorrect 
          ? 'bg-green-50 border-green-200' 
          : showAnswer && !isCorrect 
            ? 'bg-red-50 border-red-200' 
            : 'bg-yellow-50 border-slate-200'
      }`}
    >
      <p className={`equation-text ${isCorrect ? 'text-green-700' : ''}`}>{finalDisplayText}</p>
      
      {isCorrect && (
        <motion.p 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-sm text-green-600 font-medium mt-2"
        >
          CORRECT! +15 DAMAGE
        </motion.p>
      )}
      
      {!isPatternBonus && !showAnswer && (
        <Progress value={progressValue} className="game-progress mt-2" />
      )}
    </motion.div>
  );
} 