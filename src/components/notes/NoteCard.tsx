import { useNavigate } from 'react-router-dom'
import { Pin } from 'lucide-react'
import type { Note } from '@/types'
import { NOTE_COLORS } from '@/types'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const navigate = useNavigate()

  const color = NOTE_COLORS[note.color as keyof typeof NOTE_COLORS] || NOTE_COLORS.default

  const preview = note.plainText || note.title || '空白的笔记…'
  const displayTitle = note.title || preview.slice(0, 20)

  const time = new Date(note.updatedAt)
  const timeStr = time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })

  return (
    <div
      onClick={() => navigate(`/edit/${note.id}`)}
      className={`${color.bg} rounded-card p-4 shadow-sm border border-black/5 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-transform relative`}
    >
      {note.isPinned && (
        <Pin size={14} className="absolute top-3 right-3 text-klee-red rotate-45" fill="currentColor" />
      )}

      <h3 className="font-bold text-sm text-klee-brown dark:text-gray-900 mb-1.5 pr-5 line-clamp-2">
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
    </div>
  )
}
