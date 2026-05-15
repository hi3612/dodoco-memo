import { useEffect, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { NoteGrid } from '@/components/notes/NoteGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { KleeAvatar } from '@/components/ui/KleeAvatar'
import { getArchivedNotes } from '@/db/operations'
import type { Note } from '@/types'

export function ArchivePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getArchivedNotes().then(n => {
      setNotes(n)
      setLoading(false)
    })
  }, [])

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar showBack title="归档" />
      <div className="pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="animate-spin"><KleeAvatar size={32} /></span>
          </div>
        ) : notes.length === 0 ? (
          <EmptyState icon={<KleeAvatar size={72} />} title="归档为空" description="归档的笔记会出现在这里" />
        ) : (
          <NoteGrid notes={notes} />
        )}
      </div>
    </div>
  )
}
