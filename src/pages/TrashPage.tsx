import { useEffect, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { NoteGrid } from '@/components/notes/NoteGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { getTrashedNotes } from '@/db/operations'
import type { Note } from '@/types'

export function TrashPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTrashedNotes().then(n => {
      setNotes(n)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar showBack title="回收站" />
      <div className="pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-2xl animate-spin">🍀</span>
          </div>
        ) : notes.length === 0 ? (
          <EmptyState icon="🗑️" title="回收站为空" description="删除的笔记会在这里保留30天" />
        ) : (
          <>
            <p className="px-4 mb-3 text-xs text-gray-400">删除的笔记将在30天后自动清理</p>
            <NoteGrid notes={notes} />
          </>
        )}
      </div>
    </div>
  )
}
