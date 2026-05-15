import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pin, Trash2, CheckCircle, Circle } from 'lucide-react'
import type { Note } from '@/types'
import { NOTE_COLORS } from '@/types'
import { trashNote } from '@/db/operations'
import { useNoteStore } from '@/stores/noteStore'
import { useTagStore } from '@/stores/tagStore'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { showToast } from '@/components/ui/Toast'

interface NoteCardProps {
  note: Note
  selectMode?: boolean
  selected?: boolean
  onToggleSelect?: (id: number) => void
  onEnterSelectMode?: (id: number) => void
}

export function NoteCard({ note, selectMode, selected, onToggleSelect, onEnterSelectMode }: NoteCardProps) {
  const navigate = useNavigate()
  const refresh = useNoteStore(s => s.refresh)
  const refreshTags = useTagStore(s => s.refresh)
  const [showDelete, setShowDelete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const color = NOTE_COLORS[note.color as keyof typeof NOTE_COLORS] || NOTE_COLORS.default
  const preview = note.plainText || note.title || '空白的笔记…'
  const displayTitle = note.title || preview.slice(0, 20)
  const time = new Date(note.updatedAt)
  const timeStr = time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

  const startPress = useCallback(() => {
    timerRef.current = setTimeout(() => {
      if (selectMode) return
      if (note.id != null && onEnterSelectMode) {
        onEnterSelectMode(note.id)
      }
    }, 600)
  }, [selectMode, note.id, onEnterSelectMode])

  const cancelPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleClick = () => {
    if (selectMode && note.id != null && onToggleSelect) {
      onToggleSelect(note.id)
      return
    }
    navigate(`/edit/${note.id}`)
  }

  const handleDelete = async () => {
    if (note.id != null) {
      await trashNote(note.id)
      refresh()
      refreshTags()
      showToast('已移至回收站')
    }
    setShowDelete(false)
  }

  return (
    <>
      <div
        onClick={handleClick}
        onTouchStart={startPress}
        onTouchEnd={cancelPress}
        onTouchMove={cancelPress}
        onContextMenu={(e) => {
          if (selectMode) return
          e.preventDefault()
          if (note.id != null && onEnterSelectMode) onEnterSelectMode(note.id)
        }}
        className={`${color.bg} rounded-card p-4 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-transform relative select-none ${
          selected ? 'ring-2 ring-klee-red' : ''
        }`}
      >
        {/* 选择模式下的勾选框 */}
        {selectMode && (
          <div className="absolute top-3 left-3 z-10">
            {selected ? (
              <CheckCircle size={22} className="text-klee-red" fill="white" />
            ) : (
              <Circle size={22} className="text-gray-300 dark:text-gray-500" />
            )}
          </div>
        )}

        {note.isPinned && !selectMode && (
          <Pin size={14} className="absolute top-3 right-3 text-klee-red rotate-45" fill="currentColor" />
        )}

        <h3 className={`font-bold text-sm text-klee-brown dark:text-gray-900 mb-1.5 line-clamp-2 ${selectMode ? 'pr-0' : 'pr-5'}`}>
          {displayTitle}
        </h3>

        <p className="text-xs text-gray-500 dark:text-gray-600 line-clamp-3 leading-relaxed">
          {preview}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5 dark:border-black/10">
          <div className="flex gap-1 flex-wrap">
            {note.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-black/10 text-gray-500 dark:text-gray-600">
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="text-[10px] text-gray-400">+{note.tags.length - 3}</span>
            )}
          </div>
          <span className="text-[10px] text-gray-400 shrink-0">{timeStr}</span>
        </div>

        {/* 普通模式下的长按删除按钮 */}
        {!selectMode && (
          <button
            onClick={(e) => { e.stopPropagation(); setShowDelete(true) }}
            className="absolute top-2 right-2 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ opacity: 0 }}
            onTouchEnd={() => {}}
          >
            <Trash2 size={14} />
          </button>
        )}
      </div>

      <ConfirmDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="删除笔记"
        message="笔记将会被移至回收站，30天后自动清理。确定吗？"
        confirmText="删除"
      />
    </>
  )
}
