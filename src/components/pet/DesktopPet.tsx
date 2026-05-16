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

export function DesktopPet() {
  const {
    visible, x, y, dragging, speaking,
    setPosition, showSpeech, hideSpeech,
  } = usePetStore()

  const petRef = useRef<HTMLDivElement>(null)
  const [sparkle, setSparkle] = useState(false)
  const [appear, setAppear] = useState(false)

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

  const dragHandlers = usePetDrag(petRef, visible)

  // Click → toggle speech
  const handleClick = useCallback(() => {
    if (dragging) return
    if (speaking) {
      hideSpeech()
    } else {
      showSpeech(getRandomQuote())
      setTimeout(() => {
        const s = usePetStore.getState()
        if (s.speaking) s.hideSpeech()
      }, 4000)
    }
  }, [dragging, speaking, showSpeech, hideSpeech])

  // Double-click → sparkle
  const handleDoubleClick = useCallback(() => {
    if (dragging) return
    setSparkle(true)
    setTimeout(() => setSparkle(false), 800)
  }, [dragging])

  const transitionStyle = useMemo(() => {
    if (dragging) return 'none'
    return 'left 1.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  }, [dragging])

  if (!visible) return null

  return createPortal(
    <div
      ref={petRef}
      role="button"
      tabIndex={0}
      aria-label="可莉桌宠"
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      {...dragHandlers}
      className="
        fixed z-[9999]
        touch-none select-none
        cursor-grab active:cursor-grabbing
      "
      style={{
        left: x >= 0 ? `${x}px` : undefined,
        top: y >= 0 ? `${y}px` : undefined,
        width: PET_SIZE,
        height: PET_SIZE,
        transition: transitionStyle,
        animation: dragging
          ? 'none'
          : appear
            ? 'petBob 3s ease-in-out infinite'
            : 'none',
        opacity: appear ? 1 : 0,
      }}
    >
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

      <KleeAvatar size={PET_SIZE} className="w-full h-full" />
    </div>,
    document.body
  )
}
