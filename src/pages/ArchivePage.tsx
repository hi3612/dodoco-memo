import { useEffect, useState, useCallback } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { NoteCard } from '@/components/notes/NoteCard'
import { SelectionBar } from '@/components/notes/SelectionBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { KleeAvatar } from '@/components/ui/KleeAvatar'
import { showToast } from '@/components/ui/Toast'
import { useNoteStore } from '@/stores/noteStore'
import { useTagStore } from '@/stores/tagStore'
import { getArchivedNotes, batchUnarchiveNotes, batchTrashNotes } from '@/db/operations'
import type { Note } from '@/types'

export function ArchivePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [showBatchDelete, setShowBatchDelete] = useState(false)
  const refreshNotes = useNoteStore(s => s.refresh)
  const refreshTags = useTagStore(s => s.refresh)

  useEffect(() => {
    getArchivedNotes().then(n => {
      setNotes(n)
      setLoading(false)
    })
  }, [])

  const enterSelectMode = useCallback((id: number) => {
    setSelectMode(true)
    setSelectedIds(new Set([id]))
  }, [])

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const cancelSelect = () => {
    setSelectMode(false)
    setSelectedIds(new Set())
  }

  const handleRestore = async () => {
    await batchUnarchiveNotes(Array.from(selectedIds))
    cancelSelect()
    refreshNotes()
    refreshTags()
    const updated = await getArchivedNotes()
    setNotes(updated)
    showToast(`已恢复 ${selectedIds.size} 条笔记`)
  }

  const handleBatchDelete = async () => {
    await batchTrashNotes(Array.from(selectedIds))
    cancelSelect()
    setShowBatchDelete(false)
    refreshNotes()
    refreshTags()
    const updated = await getArchivedNotes()
    setNotes(updated)
    showToast(`已删除 ${selectedIds.size} 条笔记`)
  }

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
          <div className="columns-2 gap-3 px-4">
            {notes.map(note => (
              <div key={note.id} className="break-inside-avoid mb-3">
                <NoteCard
                  note={note}
                  selectMode={selectMode}
                  selected={note.id != null && selectedIds.has(note.id)}
                  onToggleSelect={toggleSelect}
                  onEnterSelectMode={enterSelectMode}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectMode && selectedIds.size > 0 && (
        <SelectionBar
          count={selectedIds.size}
          onRestore={handleRestore}
          onDelete={() => setShowBatchDelete(true)}
          onCancel={cancelSelect}
          secondLabel="恢复"
          deleteLabel="删除"
        />
      )}

      <ConfirmDialog
        open={showBatchDelete}
        onClose={() => setShowBatchDelete(false)}
        onConfirm={handleBatchDelete}
        title="批量删除"
        message={`确定删除选中的 ${selectedIds.size} 条笔记吗？它们会被移至回收站。`}
        confirmText="删除"
      />
    </div>
  )
}
