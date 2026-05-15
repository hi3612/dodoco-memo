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
import { getTrashedNotes, batchRestoreNotes, batchDeleteForever } from '@/db/operations'
import type { Note } from '@/types'

export function TrashPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [showBatchDelete, setShowBatchDelete] = useState(false)
  const refreshNotes = useNoteStore(s => s.refresh)
  const refreshTags = useTagStore(s => s.refresh)

  useEffect(() => {
    getTrashedNotes().then(n => {
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
    await batchRestoreNotes(Array.from(selectedIds))
    refreshNotes()
    refreshTags()
    setNotes(prev => prev.filter(n => !selectedIds.has(n.id!)))
    showToast(`已恢复 ${selectedIds.size} 条笔记`)
    cancelSelect()
  }

  const handleBatchDelete = async () => {
    await batchDeleteForever(Array.from(selectedIds))
    refreshNotes()
    refreshTags()
    setNotes(prev => prev.filter(n => !selectedIds.has(n.id!)))
    showToast(`已永久删除 ${selectedIds.size} 条笔记`)
    cancelSelect()
    setShowBatchDelete(false)
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar showBack title="回收站" />

      <div className="pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="animate-spin"><KleeAvatar size={32} /></span>
          </div>
        ) : notes.length === 0 ? (
          <EmptyState icon={<KleeAvatar size={72} />} title="回收站为空" description="删除的笔记会在这里保留30天" />
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
          deleteLabel="永久删除"
        />
      )}

      <ConfirmDialog
        open={showBatchDelete}
        onClose={() => setShowBatchDelete(false)}
        onConfirm={handleBatchDelete}
        title="永久删除"
        message={`确定永久删除选中的 ${selectedIds.size} 条笔记吗？此操作无法撤销！`}
        confirmText="永久删除"
      />
    </div>
  )
}
