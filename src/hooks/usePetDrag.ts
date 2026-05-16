import { useRef, useCallback } from 'react'
import { usePetStore } from '@/stores/petStore'

const PET_SIZE = 80
const DRAG_THRESHOLD = 5

export interface DragState {
  dragging: boolean
  angle: number
  speed: number
  onDragStart?: () => void
  onDragEnd?: () => void
}

export function usePetDrag(
  petRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
  callbacks?: { onDragStart?: () => void; onDragEnd?: () => void }
) {
  const setPosition = usePetStore(s => s.setPosition)
  const setDragging = usePetStore(s => s.setDragging)
  const offsetRef = useRef({ dx: 0, dy: 0 })
  const startRef = useRef({ x: 0, y: 0 })
  const prevRef = useRef({ x: 0, y: 0 })
  const movedRef = useRef(false)
  const dragAngleRef = useRef(0)
  const dragSpeedRef = useRef(0)
  const callbacksRef = useRef(callbacks)
  callbacksRef.current = callbacks

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
    prevRef.current = { x: e.clientX, y: e.clientY }
    movedRef.current = false
    dragAngleRef.current = 0
    dragSpeedRef.current = 0
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
      callbacksRef.current?.onDragStart?.()
    }

    // Track direction & speed
    const pdx = e.clientX - prevRef.current.x
    const pdy = e.clientY - prevRef.current.y
    dragAngleRef.current = Math.atan2(pdy, pdx) * (180 / Math.PI)
    dragSpeedRef.current = Math.sqrt(pdx * pdx + pdy * pdy)
    prevRef.current = { x: e.clientX, y: e.clientY }

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
      callbacksRef.current?.onDragEnd?.()
    }
  }, [petRef, setDragging])

  const getDragAngle = useCallback(() => dragAngleRef.current, [])
  const getDragSpeed = useCallback(() => dragSpeedRef.current, [])

  return { onPointerDown, onPointerMove, onPointerUp, getDragAngle, getDragSpeed }
}
