import React from 'react'
import { EscMenu } from '@/components/esc-menu/EscMenu'
import { EscKeyListener } from '@/components/esc-menu/KeyListener'

// This layout wraps all game-related pages and adds the ESC menu functionality
export default function GameLayout({ children }: { children: React.ReactNode }) {
  // Add a console log for debugging
  console.log("Game layout rendered")
  
  return (
    <>
      {children}
      {/* ESC menu components - rendered at the root level */}
      <EscMenu />
      <EscKeyListener />
    </>
  )
} 