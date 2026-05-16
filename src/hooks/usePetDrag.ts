import { useRef, useCallback } from 'react'
import { usePetStore } from '@/stores/petStore'

const PET_SIZE = 80

export function usePetDrag(petRef: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  const setPosition = usePetStore(s => s.setPosition)
  const setDragging = usePetStore(s => s.setDragging)
  const offsetRef = useRef({ dx: 0, dy: 0 })

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!enabled) return
    const el = petRef.current
    if (!el) return

    el.setPointerCapture(e.pointerId)
    const rect = el.getBoundingClientRect()
    offsetRef.current = {
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
    }
    setDragging(true)
    e.preventDefault()
    e.stopPropagation()
  }, [enabled, petRef, setDragging])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = petRef.current
    if (!el) return

    if (!usePetStore.getState().dragging) return

    const newX = e.clientX - offsetRef.current.dx
    const newY = e.clientY - offsetRef.current.dy

    const vw = window.innerWidth
    const vh = window.innerHeight
    setPosition(
      Math.max(0, Math.min(newX, vw - PET_SIZE)),
      Math.max(0, Math.min(newY, vh - PET_SIZE))
    )
  }, [petRef, setPosition])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = petRef.current
    if (el) el.releasePointerCapture(e.pointerId)
    setDragging(false)
  }, [petRef, setDragging])

  return { onPointerDown, onPointerMove, onPointerUp }
}
