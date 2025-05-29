'use client'
import { useEffect } from 'react'
import { useEscMenuStore } from '@/context/useEscMenuStore'

export const EscKeyListener = () => {
  const { isOpen, open } = useEscMenuStore()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // TODO: Add logic to prevent opening if other modals are open
      if (e.key === 'Escape') {
        // Only open the menu if it's currently closed
        // Let the EscMenu component handle closing when it's open
        if (!isOpen) {
          open();
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, open])
  return null
} 