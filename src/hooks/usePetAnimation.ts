import { useEffect, useRef } from 'react'
import { usePetStore } from '@/stores/petStore'

const PET_SIZE = 80

export function usePetAnimation() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const scheduleMove = () => {
      const delay = 10000 + Math.random() * 20000
      timerRef.current = setTimeout(() => {
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
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])
}
