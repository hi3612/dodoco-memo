import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useNoteStore } from '@/stores/noteStore'
import { useTagStore } from '@/stores/tagStore'
import { TopBar } from '@/components/layout/TopBar'
import { NoteCard } from '@/components/notes/NoteCard'
import { SelectionBar } from '@/components/notes/SelectionBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { KleeAvatar } from '@/components/ui/KleeAvatar'
import { batchTrashNotes, batchArchiveNotes } from '@/db/operations'
import { showToast } from '@/components/ui/Toast'
export function HomePage() {
  const { notes, pinnedNotes, loading, refresh } = useNoteStore()
  const refreshTags = useTagStore(s => s.refresh)
  const navigate = useNavigate()
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [showBatchDelete, setShowBatchDelete] = useState(false)

  useEffect(() => {
    refresh()
  }, [refresh])

  const enterSelectMode = useCallback((id: number) => {
    setSelectMode(true)
    setSelectedIds(new Set([id]))
  }, [])

  const toggleSelect = useCallback((id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        return next
      } else {
        next.add(id)
        return next
      }
    })
  }, [])

  const cancelSelect = () => {
    setSelectMode(false)
    setSelectedIds(new Set())
  }

  const handleBatchDelete = async () => {
    const ids = Array.from(selectedIds)
    await batchTrashNotes(ids)
    refresh()
    refreshTags()
    showToast(`已删除 ${ids.length} 条笔记`)
    cancelSelect()
    setShowBatchDelete(false)
  }

  const handleBatchArchive = async () => {
    const ids = Array.from(selectedIds)
    await batchArchiveNotes(ids)
    refresh()
    refreshTags()
    showToast(`已归档 ${ids.length} 条笔记`)
    cancelSelect()
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar
        title={selectMode ? `已选 ${selectedIds.size} 项` : undefined}
        action={
          <div className="flex items-center gap-1">
            {selectMode ? (
              <button onClick={cancelSelect} className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-500">
                取消
              </button>
            ) : (
              <button
                onClick={() => navigate('/edit')}
                className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-klee-red"
              >
                <Plus size={24} />
              </button>
            )}
          </div>
        }
      />

      <div className="pb-6">
        {loading && notes.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="animate-bounce"><KleeAvatar size={48} /></span>
          </div>
        ) : notes.length === 0 && pinnedNotes.length === 0 ? (
          <EmptyState
            icon={<KleeAvatar size={72} />}
            title="还没有笔记哦"
            description="点击右上角 + 号，和可莉一起记录吧！"
          />
        ) : (
          <>
            {pinnedNotes.length > 0 && (
              <section className="mb-4">
                <div className="flex items-center gap-1.5 px-4 py-2">
                  <span className="text-xs">📌</span>
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">置顶</h2>
                </div>
                <div className="columns-2 gap-3 px-4">
                  {pinnedNotes.map(note => (
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
              </section>
            )}

            <section>
              {pinnedNotes.length > 0 && (
                <div className="px-4 py-2">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">全部笔记</h2>
                </div>
              )}
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
            </section>
          </>
        )}
      </div>

      {/* 批量操作栏 */}
      {selectMode && selectedIds.size > 0 && (
        <SelectionBar
          count={selectedIds.size}
          onDelete={() => setShowBatchDelete(true)}
          onArchive={handleBatchArchive}
          onCancel={cancelSelect}
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
