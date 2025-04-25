"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useCallback } from "react";

// Define the types for our game state
interface WorldProgress {
  id: string;
  title: string;
  isUnlocked: boolean;
  completionPercentage: number;
  activitiesCompleted: number;
  totalActivities: number;
}

interface GameState {
  playerStats: {
    username: string;
    level: number;
    coins: number;
    xpProgress: number;
    achievementCount: number;
    totalAchievements: number;
  };
  worlds: Record<string, WorldProgress>;
  activeWorld: string | null;
  activeTab: string;
  hasPremium: boolean;
  setActiveTab: (tab: string) => void;
  unlockWorld: (worldId: string) => void;
  updateWorldProgress: (worldId: string, newCompletion: number) => void;
  setActiveWorld: (worldId: string | null) => void;
  togglePremium: () => void;
}

// Create the context
const GameStateContext = createContext<GameState | undefined>(undefined);

// Initial state
const initialState: GameState = {
  playerStats: {
    username: "MathWizard",
    level: 5,
    coins: 250,
    xpProgress: 60,
    achievementCount: 3,
    totalAchievements: 10,
  },
  worlds: {
    "math-world": {
      id: "math-world",
      title: "Math World",
      isUnlocked: true,
      completionPercentage: 33,
      activitiesCompleted: 1,
      totalActivities: 3,
    },
    "science-world": {
      id: "science-world",
      title: "Science World",
      isUnlocked: false,
      completionPercentage: 0,
      activitiesCompleted: 0,
      totalActivities: 3,
    },
    "language-world": {
      id: "language-world",
      title: "Language World",
      isUnlocked: false,
      completionPercentage: 0,
      activitiesCompleted: 0,
      totalActivities: 3,
    },
  },
  activeWorld: null,
  activeTab: "play",
  hasPremium: false,
  setActiveTab: () => {},
  unlockWorld: () => {},
  updateWorldProgress: () => {},
  setActiveWorld: () => {},
  togglePremium: () => {},
};

// Create the provider component
export function GameStateProvider({ children }: { children: ReactNode }) {
  // Start with the same state on both server and client
  const [state, setState] = useState<GameState>(initialState);

  // Load from localStorage only on the client after initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem("gameState");
      if (storedState) {
        try {
          setState(JSON.parse(storedState));
        } catch (error) {
          console.error("Error parsing gameState from localStorage:", error);
          localStorage.removeItem("gameState");
        }
      }
    }
  }, []);
  
  // Save to localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("gameState", JSON.stringify(state));
      } catch (error) {
        console.error("Error saving gameState to localStorage:", error);
      }
    }
  }, [state]);

  // State update functions wrapped in useCallback for stability
  const setActiveTab = useCallback((tab: string) => {
    setState((prev: GameState) => ({ ...prev, activeTab: tab }));
  }, []);

  const unlockWorld = useCallback((worldId: string) => {
    setState((prev: GameState) => ({
      ...prev,
      worlds: {
        ...prev.worlds,
        [worldId]: {
          ...prev.worlds[worldId],
          isUnlocked: true,
        },
      },
    }));
  }, []);

  const updateWorldProgress = useCallback((worldId: string, newCompletion: number) => {
    setState((prev: GameState) => {
      const world = prev.worlds[worldId];
      if (!world) return prev;

      const activitiesCompleted = Math.round((newCompletion / 100) * world.totalActivities);
      
      return {
        ...prev,
        worlds: {
          ...prev.worlds,
          [worldId]: {
            ...world,
            completionPercentage: newCompletion,
            activitiesCompleted,
          },
        },
      };
    });
  }, []);

  const setActiveWorld = useCallback((worldId: string | null) => {
    setState((prev: GameState) => ({ ...prev, activeWorld: worldId }));
  }, []);

  // Add toggle premium function
  const togglePremium = useCallback(() => {
    setState((prev: GameState) => ({ 
      ...prev, 
      hasPremium: !prev.hasPremium 
    }));
  }, []);

  // Provide the state and stable updater functions
  const value = {
    ...state,
    setActiveTab,
    unlockWorld,
    updateWorldProgress,
    setActiveWorld,
    togglePremium,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
}

// Custom hook to use the game state
export function useGameState() {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
} 