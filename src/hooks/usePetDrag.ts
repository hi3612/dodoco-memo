import { useRef, useCallback } from 'react'
import { usePetStore } from '@/stores/petStore'

const PET_SIZE = 80
const DRAG_THRESHOLD = 5

export function usePetDrag(petRef: React.RefObject<HTMLDivElement | null>, enabled: boolean) {
  const setPosition = usePetStore(s => s.setPosition)
  const setDragging = usePetStore(s => s.setDragging)
  const offsetRef = useRef({ dx: 0, dy: 0 })
  const startRef = useRef({ x: 0, y: 0 })
  const movedRef = useRef(false)

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
    startRef.current = { x: e.clientX, y: e.clientY }
    movedRef.current = false
    e.preventDefault()
    e.stopPropagation()
  }, [enabled, petRef])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = petRef.current
    if (!el) return

    const dx = e.clientX - startRef.current.x
    const dy = e.clientY - startRef.current.y
    if (!movedRef.current && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return

    if (!movedRef.current) {
      movedRef.current = true
      setDragging(true)
    }

    const newX = e.clientX - offsetRef.current.dx
    const newY = e.clientY - offsetRef.current.dy

    const vw = window.innerWidth
    const vh = window.innerHeight
    setPosition(
      Math.max(0, Math.min(newX, vw - PET_SIZE)),
      Math.max(0, Math.min(newY, vh - PET_SIZE))
    )
  }, [petRef, setPosition, setDragging])

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = petRef.current
    if (el) el.releasePointerCapture(e.pointerId)
    if (movedRef.current) {
      setDragging(false)
    }
  }, [petRef, setDragging])

  return { onPointerDown, onPointerMove, onPointerUp }
}
