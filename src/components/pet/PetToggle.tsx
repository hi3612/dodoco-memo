import { usePetStore } from '@/stores/petStore'

export function PetToggle() {
  const visible = usePetStore(s => s.visible)
  const setVisible = usePetStore(s => s.setVisible)

  return (
    <button
      onClick={() => setVisible(!visible)}
      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">🎒</span>
        <span className="text-sm font-medium text-klee-brown dark:text-white">桌宠可莉</span>
      </div>
      <div className={`w-10 h-6 rounded-full transition-colors ${visible ? 'bg-klee-red' : 'bg-gray-300'}`}>
        <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5 ${visible ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
      </div>
    </button>
  )
}
