import { create } from 'zustand'

interface EscMenuState {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useEscMenuStore = create<EscMenuState>(set => ({
  isOpen: false,
  open:  () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
})) 