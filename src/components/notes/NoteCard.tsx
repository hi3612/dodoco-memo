import { useState, useRef, useCallback, useEffect } from 'react'
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
  const [showCardActions, setShowCardActions] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressRef = useRef(false)

  const color = NOTE_COLORS[note.color as keyof typeof NOTE_COLORS] || NOTE_COLORS.default
  const preview = note.plainText || note.title || '空白的笔记…'
  const displayTitle = note.title || preview.slice(0, 20)
  const time = new Date(note.updatedAt)
  const timeStr = time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

  // 点击空白处关闭蒙层
  useEffect(() => {
    if (!showCardActions) return
    const close = () => { setShowCardActions(false); longPressRef.current = false }
    // 延迟绑定，避免长按的 touchend 马上触发关闭
    const t = setTimeout(() => document.addEventListener('click', close), 100)
    return () => {
      clearTimeout(t)
      document.removeEventListener('click', close)
    }
  }, [showCardActions])

  const startPress = useCallback(() => {
    longPressRef.current = false
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      longPressRef.current = true
      if (selectMode) return
      if (note.id != null && onEnterSelectMode) {
        onEnterSelectMode(note.id)
      } else {
        setShowCardActions(true)
      }
    }, 600)
  }, [selectMode, note.id, onEnterSelectMode])

  const cancelPress = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    // 长按后蒙层已显示 → 点卡片关闭蒙层
    if (showCardActions) {
      setShowCardActions(false)
      longPressRef.current = false
      e.stopPropagation()
      return
    }
    if (longPressRef.current) {
      longPressRef.current = false
      e.stopPropagation()
      return
    }
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
    setShowCardActions(false)
    longPressRef.current = false
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
          if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null }
          longPressRef.current = true
          if (note.id != null && onEnterSelectMode) {
            onEnterSelectMode(note.id)
          } else {
            setShowCardActions(true)
          }
        }}
        className={`${color.bg} rounded-card p-4 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-transform relative select-none ${
          selected ? 'ring-2 ring-klee-red' : ''
        }`}
      >
        {selectMode && (
          <div className="absolute top-3 left-3 z-10">
            {selected ? (
              <CheckCircle size={22} className="text-klee-red" fill="white" />
            ) : (
              <Circle size={22} className="text-gray-300 dark:text-gray-500" />
            )}
          </div>
        )}

        {note.isPinned && !selectMode && !showCardActions && (
          <Pin size={14} className="absolute top-3 right-3 text-klee-red rotate-45" fill="currentColor" />
        )}

        <h3 className="font-bold text-sm text-klee-brown dark:text-gray-900 mb-1.5 line-clamp-2 pr-5">
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

        {showCardActions && (
          <div className="absolute inset-0 bg-black/10 dark:bg-white/5 rounded-card flex items-center justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); setShowDelete(true) }}
              className="flex items-center gap-1.5 px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium shadow-lg"
            >
              <Trash2 size={16} /> 删除笔记
            </button>
          </div>
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
