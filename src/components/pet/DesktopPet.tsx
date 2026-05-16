import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { usePetStore } from '@/stores/petStore'
import { KleeAvatar } from '@/components/ui/KleeAvatar'
import { SpeechBubble } from './SpeechBubble'
import { usePetDrag } from '@/hooks/usePetDrag'
import { usePetAnimation } from '@/hooks/usePetAnimation'
import { KLEE_QUOTES } from '@/data/kleeQuotes'

const PET_SIZE = 80

function getRandomQuote(): string {
  return KLEE_QUOTES[Math.floor(Math.random() * KLEE_QUOTES.length)]
}

function TrailParticle({ tx, ty }: { tx: number; ty: number }) {
  const angle = Math.random() * 360
  const dist = 20 + Math.random() * 30
  const rx = Math.cos(angle * Math.PI / 180) * dist
  const ry = Math.sin(angle * Math.PI / 180) * dist - 10
  const size = 3 + Math.random() * 4
  return (
    <div
      className="absolute rounded-full pointer-events-none bg-klee-gold"
      style={{
        width: size,
        height: size,
        left: tx,
        top: ty,
        '--tx': `${rx}px`,
        '--ty': `${ry}px`,
        animation: 'trailFade 0.6s ease-out forwards',
      } as React.CSSProperties}
    />
  )
}

export function DesktopPet() {
  const {
    visible, x, y, dragging, speaking,
    setPosition, showSpeech, hideSpeech,
  } = usePetStore()

  const petRef = useRef<HTMLDivElement>(null)
  const [sparkle, setSparkle] = useState(false)
  const [appear, setAppear] = useState(false)
  const [bouncing, setBouncing] = useState(false)
  const [trails, setTrails] = useState<{ id: number; tx: number; ty: number }[]>([])
  const speakingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const trailTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const trailIdRef = useRef(0)
  const dragAngleRef = useRef(0)

  // Sync speaking ref
  useEffect(() => {
    const unsub = usePetStore.subscribe((s) => {
      speakingRef.current = s.speaking
    })
    return unsub
  }, [])

  // Trail particles during drag
  useEffect(() => {
    if (dragging) {
      trailTimerRef.current = setInterval(() => {
        setTrails(prev => {
          const next = [...prev, { id: trailIdRef.current++, tx: PET_SIZE / 2, ty: PET_SIZE / 2 }]
          return next.slice(-12)
        })
      }, 80)
    } else {
      if (trailTimerRef.current) {
        clearInterval(trailTimerRef.current)
        trailTimerRef.current = null
      }
      // Clean up trails after drag ends
      const cleanup = setTimeout(() => setTrails([]), 600)
      return () => clearTimeout(cleanup)
    }
    return () => {
      if (trailTimerRef.current) clearInterval(trailTimerRef.current)
    }
  }, [dragging])

  // Initialize default position
  useEffect(() => {
    const state = usePetStore.getState()
    if (state.x < 0 || state.y < 0) {
      setPosition(
        window.innerWidth - PET_SIZE - 16,
        window.innerHeight - PET_SIZE - 80
      )
    }
    setAppear(true)
  }, [setPosition])

  // Re-clamp on resize
  useEffect(() => {
    const handleResize = () => {
      const state = usePetStore.getState()
      if (state.x < 0 && state.y < 0) return
      const vw = window.innerWidth
      const vh = window.innerHeight
      setPosition(
        Math.max(0, Math.min(state.x, vw - PET_SIZE)),
        Math.max(0, Math.min(state.y, vh - PET_SIZE))
      )
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setPosition])

  usePetAnimation()

  const onDragStart = useCallback(() => {
    dragAngleRef.current = 0
  }, [])

  const onDragEnd = useCallback(() => {
    setBouncing(true)
    setTimeout(() => setBouncing(false), 400)
  }, [])

  const drag = usePetDrag(petRef, visible, { onDragStart, onDragEnd })

  // Track drag angle during move
  const origMove = drag.onPointerMove
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    origMove(e)
    dragAngleRef.current = drag.getDragAngle()
  }, [origMove, drag])

  const handleClick = useCallback(() => {
    if (speakingRef.current) {
      hideSpeech()
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      showSpeech(getRandomQuote())
      timerRef.current = setTimeout(() => {
        timerRef.current = null
        hideSpeech()
      }, 4000)
    }
  }, [showSpeech, hideSpeech])

  const handleDoubleClick = useCallback(() => {
    setSparkle(true)
    setTimeout(() => setSparkle(false), 800)
  }, [])

  // Compute visual state
  const visualStyle = useMemo(() => {
    const style: React.CSSProperties = {
      width: PET_SIZE,
      height: PET_SIZE,
      borderRadius: '50%',
      transition: 'none',
    }

    if (bouncing) {
      style.animation = 'petBounce 0.4s ease-out'
      style.transformOrigin = 'center'
    } else if (dragging) {
      style.transform = `scale(1.15) rotate(${dragAngleRef.current}deg)`
    } else if (speaking) {
      style.animation = 'petPulse 0.8s ease-in-out infinite'
    } else if (appear) {
      style.animation = 'petBob 3s ease-in-out infinite'
    }

    return style
  }, [dragging, speaking, bouncing, appear])

  // Drop shadow style
  const shadowStyle = useMemo(() => {
    if (dragging) {
      return 'drop-shadow(0 0 16px rgba(255,180,100,0.6)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
    }
    if (speaking) {
      return 'drop-shadow(0 0 10px rgba(255,180,100,0.4)) drop-shadow(0 2px 8px rgba(0,0,0,0.15))'
    }
    return 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))'
  }, [dragging, speaking])

  if (!visible) return null

  return createPortal(
    <div
      ref={petRef}
      role="button"
      tabIndex={0}
      aria-label="可莉桌宠"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onPointerDown={drag.onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={drag.onPointerUp}
      className="
        fixed z-[9999]
        touch-none select-none
        cursor-grab active:cursor-grabbing
        flex items-center justify-center
      "
      style={{
        left: x >= 0 ? `${x}px` : undefined,
        top: y >= 0 ? `${y}px` : undefined,
        width: PET_SIZE,
        height: PET_SIZE,
        transition: dragging
          ? 'none'
          : 'left 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        opacity: appear ? 1 : 0,
      }}
    >
      {/* Trail particles */}
      {trails.map(t => (
        <TrailParticle key={t.id} tx={t.tx} ty={t.ty} />
      ))}

      <SpeechBubble />

      {/* Sparkle burst */}
      {sparkle && (
        <div className="absolute inset-0 pointer-events-none animate-[sparkleBurst_0.8s_ease-out_forwards]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-klee-gold"
              style={{
                left: '50%',
                top: '50%',
                '--angle': `${i * 45}deg`,
                '--distance': '36px',
                opacity: 0,
                animation: `sparkleParticle 0.6s ease-out ${i * 0.04}s forwards`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}

      {/* Avatar wrapper with visual state */}
      <div
        className="rounded-full overflow-hidden"
        style={{ ...visualStyle, filter: shadowStyle }}
      >
        <KleeAvatar size={PET_SIZE} className="w-full h-full pointer-events-none" />
      </div>
    </div>,
    document.body
  )
}
