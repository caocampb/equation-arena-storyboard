'use client'
import { useEffect } from 'react'
import { useEscMenuStore } from '@/context/useEscMenuStore'

export const EscKeyListener = () => {
  const { isOpen, open, close } = useEscMenuStore()
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // TODO: Add logic to prevent opening if other modals are open
      if (e.key === 'Escape') {
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, open, close])
  return null
} 