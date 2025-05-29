import { create } from 'zustand'

interface EscMenuState {
  isOpen: boolean
  lastClosedAt: number
  open: () => void
  close: () => void
  canOpen: () => boolean
}

const REOPEN_COOLDOWN_MS = 300 // 300ms cooldown, similar to Discord

export const useEscMenuStore = create<EscMenuState>((set, get) => ({
  isOpen: false,
  lastClosedAt: 0,
  open: () => {
    const state = get()
    // Check if enough time has passed since last close
    if (Date.now() - state.lastClosedAt > REOPEN_COOLDOWN_MS) {
      set({ isOpen: true })
    }
  },
  close: () => set({ isOpen: false, lastClosedAt: Date.now() }),
  canOpen: () => {
    const state = get()
    return Date.now() - state.lastClosedAt > REOPEN_COOLDOWN_MS
  }
})) 