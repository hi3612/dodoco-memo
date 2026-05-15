import { Trash2, X, Archive, Undo2 } from 'lucide-react'

interface SelectionBarProps {
  count: number
  onDelete: () => void
  onCancel: () => void
  onArchive?: () => void
  onRestore?: () => void
  deleteLabel?: string
  secondLabel?: string
}

export function SelectionBar({ count, onDelete, onCancel, onArchive, onRestore, deleteLabel = '删除', secondLabel = '归档' }: SelectionBarProps) {
  return (
    <div className="fixed bottom-14 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="mx-4 w-full max-w-mobile bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <button onClick={onCancel} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X size={20} className="text-gray-500" />
          </button>
          <span className="text-sm font-medium text-klee-brown dark:text-white">
            已选 {count} 项
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onRestore && (
            <button onClick={onRestore} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-klee-red/10 text-klee-red text-sm font-medium">
              <Undo2 size={16} /> {secondLabel}
            </button>
          )}
          {onArchive && (
            <button onClick={onArchive} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-600 text-sm text-gray-600 dark:text-gray-300">
              <Archive size={16} /> {secondLabel}
            </button>
          )}
          <button onClick={onDelete} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500 text-white text-sm font-medium">
            <Trash2 size={16} /> {deleteLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
