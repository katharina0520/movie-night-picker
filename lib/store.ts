import { create } from 'zustand'
import type { Movie } from '@/lib/types'

type ToastState = { id: number; message: string } | null

type AppState = {
  toast: ToastState
  showToast: (message: string, ms?: number) => void
  hideToast: () => void
  deck: Movie[]
  setDeck: (movies: Movie[]) => void
  advanceDeck: () => void
}

let toastTimer: ReturnType<typeof setTimeout> | null = null

export const useAppStore = create<AppState>((set, get) => ({
  toast: null,
  showToast: (message, ms = 2000) => {
    if (toastTimer) clearTimeout(toastTimer)
    set({ toast: { id: Date.now(), message } })
    toastTimer = setTimeout(() => set({ toast: null }), ms)
  },
  hideToast: () => set({ toast: null }),
  deck: [],
  setDeck: (movies) => set({ deck: Array.isArray(movies) ? movies : [] }),
  advanceDeck: () => {
    const { deck } = get()
    set({ deck: deck.slice(1) })
  },
}))
