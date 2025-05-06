import React from 'react'

// This layout wraps all game-related pages and adds the ESC menu functionality
export default function GameLayout({ children }: { children: React.ReactNode }) {
  // Add a console log for debugging
  console.log("Game layout rendered")
  
  return (
    <>
      {children}
    </>
  )
} 