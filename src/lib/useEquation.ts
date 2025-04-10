"use client";

import { useState } from 'react';

type OperationType = '+' | '-' | '*' | '/';
type DifficultyLevel = 1 | 2 | 3;

interface Equation {
  operand1: number;
  operand2: number;
  operation: OperationType;
  answer: number;
  display: string;
}

export function useEquation(initialDifficulty: DifficultyLevel = 1) {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialDifficulty);
  
  /**
   * Generates a math equation based on current difficulty
   */
  const generateEquation = (): Equation => {
    // Available operations based on difficulty
    const operations: OperationType[] = ['+'];
    if (difficulty >= 2) operations.push('-');
    if (difficulty >= 3) operations.push('*');
    
    // Select random operation
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    // Number range based on difficulty
    const maxNumber = difficulty === 1 ? 10 : difficulty === 2 ? 20 : 30;
    
    let operand1: number;
    let operand2: number;
    let answer: number;
    
    // Generate appropriate equation
    switch (operation) {
      case '+':
        operand1 = Math.floor(Math.random() * maxNumber);
        operand2 = Math.floor(Math.random() * maxNumber);
        answer = operand1 + operand2;
        break;
      case '-':
        // Ensure positive result
        operand1 = Math.floor(Math.random() * maxNumber);
        operand2 = Math.floor(Math.random() * (operand1 + 1)); 
        answer = operand1 - operand2;
        break;
      case '*':
        // Keep multiplication manageable
        operand1 = Math.floor(Math.random() * 10) + 1;
        operand2 = Math.floor(Math.random() * 10) + 1;
        answer = operand1 * operand2;
        break;
      default:
        operand1 = Math.floor(Math.random() * maxNumber);
        operand2 = Math.floor(Math.random() * maxNumber);
        answer = operand1 + operand2;
    }
    
    return {
      operand1,
      operand2,
      operation,
      answer,
      display: `${operand1} ${operation} ${operand2} = ?`
    };
  };
  
  /**
   * Checks if answer matches a special pattern
   */
  const checkForPattern = (answer: number) => {
    if (answer === 10) {
      return { hasPattern: true, patternName: 'POWER 10!' };
    } 
    if (answer === 25) {
      return { hasPattern: true, patternName: 'POWER 25!' };
    } 
    if (answer % 11 === 0 && answer > 0) {
      return { hasPattern: true, patternName: 'DOUBLES!' };
    }
    
    return { hasPattern: false, patternName: null };
  };
  
  /**
   * Validate user's answer against the equation
   */
  const validateAnswer = (equation: Equation, userAnswer: number): boolean => {
    return equation.answer === userAnswer;
  };
  
  return {
    generateEquation,
    checkForPattern,
    validateAnswer,
    difficulty,
    setDifficulty,
  };
} 