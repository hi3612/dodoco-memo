import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ThemeMode, ViewMode } from '@/types'

interface UIState {
  theme: ThemeMode
  viewMode: ViewMode
  toggleTheme: () => void
  setViewMode: (mode: ViewMode) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      viewMode: 'grid',
      toggleTheme: () =>
        set((s) => {
          const next = s.theme === 'light' ? 'dark' : 'light'
          document.documentElement.classList.toggle('dark', next === 'dark')
          return { theme: next }
        }),
      setViewMode: (viewMode) => set({ viewMode }),
    }),
    { name: 'dodoco-ui' }
  )
)
