import { useEffect, useRef } from 'react'
import { usePetStore } from '@/stores/petStore'
import { KLEE_QUOTES } from '@/data/kleeQuotes'

const PET_SIZE = 80
const MOVE_INTERVAL = 15000
const SPEECH_INTERVAL = 10000
const SPEECH_DURATION = 3000

function randomQuote(): string {
  return KLEE_QUOTES[Math.floor(Math.random() * KLEE_QUOTES.length)]
}

export function usePetAnimation() {
  const moveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const speechTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Autonomous movement every 15-35s
  useEffect(() => {
    const scheduleMove = () => {
      const delay = MOVE_INTERVAL + Math.random() * 20000
      moveTimerRef.current = setTimeout(() => {
        const state = usePetStore.getState()
        if (!state.dragging && state.visible) {
          const margin = 80
          const newX = margin + Math.random() * (window.innerWidth - margin * 2 - PET_SIZE)
          const newY = margin + Math.random() * (window.innerHeight - margin * 2 - PET_SIZE)
          state.setPosition(newX, newY)
        }
        scheduleMove()
      }, delay)
    }

    scheduleMove()

    return () => {
      if (moveTimerRef.current) clearTimeout(moveTimerRef.current)
    }
  }, [])

  // Auto speech every 10s
  useEffect(() => {
    const scheduleSpeech = () => {
      speechTimerRef.current = setTimeout(() => {
        const state = usePetStore.getState()
        if (!state.dragging && !state.speaking && state.visible) {
          state.showSpeech(randomQuote())
          setTimeout(() => {
            const s = usePetStore.getState()
            if (s.speaking) s.hideSpeech()
          }, SPEECH_DURATION)
        }
        scheduleSpeech()
      }, SPEECH_INTERVAL)
    }

    scheduleSpeech()

    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current)
    }
  }, [])
}
