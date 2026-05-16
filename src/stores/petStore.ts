import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PetState {
  visible: boolean
  x: number
  y: number
  dragging: boolean
  speaking: boolean
  currentQuote: string

  setVisible: (v: boolean) => void
  setPosition: (x: number, y: number) => void
  setDragging: (d: boolean) => void
  showSpeech: (quote: string) => void
  hideSpeech: () => void
}

export const usePetStore = create<PetState>()(
  persist(
    (set) => ({
      visible: true,
      x: -1,
      y: -1,
      dragging: false,
      speaking: false,
      currentQuote: '',

      setVisible: (v) => set({ visible: v }),
      setPosition: (x, y) => set({ x, y }),
      setDragging: (d) => set({ dragging: d }),
      showSpeech: (q) => set({ speaking: true, currentQuote: q }),
      hideSpeech: () => set({ speaking: false, currentQuote: '' }),
    }),
    {
      name: 'dodoco-pet',
      partialize: (state) => ({ visible: state.visible, x: state.x, y: state.y }),
    }
  )
)
