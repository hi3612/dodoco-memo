import { X } from 'lucide-react'

interface TagChipProps {
  tag: string
  count?: number
  active?: boolean
  onRemove?: () => void
  onClick?: () => void
}

export function TagChip({ tag, count, active, onRemove, onClick }: TagChipProps) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
        active
          ? 'bg-klee-red text-white'
          : 'bg-white dark:bg-gray-800 text-klee-brown dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-klee-red/30'
      }`}
    >
      {tag}
      {count !== undefined && (
        <span className={active ? 'text-white/70' : 'text-gray-400'}>{count}</span>
      )}
      {onRemove && (
        <button onClick={(e) => { e.stopPropagation(); onRemove() }} className="ml-0.5 hover:text-klee-red">
          <X size={12} />
        </button>
      )}
    </span>
  )
}
