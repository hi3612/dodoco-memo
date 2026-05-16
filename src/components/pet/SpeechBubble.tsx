import { usePetStore } from '@/stores/petStore'

export function SpeechBubble() {
  const speaking = usePetStore(s => s.speaking)
  const quote = usePetStore(s => s.currentQuote)

  if (!speaking || !quote) return null

  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none">
      <div className="
        bg-white dark:bg-gray-800
        text-klee-brown dark:text-white
        text-xs font-medium
        px-3 py-2
        rounded-2xl rounded-bl-sm
        shadow-lg
        whitespace-nowrap
        max-w-[180px]
        animate-[popIn_0.3s_ease-out]
        border border-gray-100 dark:border-gray-700
      ">
        {quote}
      </div>
      <div className="
        absolute -bottom-1.5 left-1/2 -translate-x-1/2
        w-3 h-3 rotate-45
        bg-white dark:bg-gray-800
        border-r border-b border-gray-100 dark:border-gray-700
      " />
    </div>
  )
}
