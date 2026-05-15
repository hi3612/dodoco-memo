import { useEffect, useState, useCallback } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { TagChip } from '@/components/tags/TagChip'
import { NoteCard } from '@/components/notes/NoteCard'
import { SelectionBar } from '@/components/notes/SelectionBar'
import { EmptyState } from '@/components/ui/EmptyState'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { KleeAvatar } from '@/components/ui/KleeAvatar'
import { showToast } from '@/components/ui/Toast'
import { useTagStore } from '@/stores/tagStore'
import { useNoteStore } from '@/stores/noteStore'
import { getNotesByTag, batchTrashNotes, batchArchiveNotes } from '@/db/operations'
import type { Note } from '@/types'

export function TagsPage() {
  const { tags, loading, refresh: refreshTags } = useTagStore()
  const refreshNotes = useNoteStore(s => s.refresh)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [selectMode, setSelectMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [showBatchDelete, setShowBatchDelete] = useState(false)

  useEffect(() => {
    refreshTags()
  }, [refreshTags])

  useEffect(() => {
    if (selectedTag) {
      getNotesByTag(selectedTag).then(setFilteredNotes)
    }
  }, [selectedTag])

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

  const handleBatchDelete = async () => {
    await batchTrashNotes(Array.from(selectedIds))
    refreshNotes()
    refreshTags()
    setFilteredNotes(prev => prev.filter(n => !selectedIds.has(n.id!)))
    showToast(`已删除 ${selectedIds.size} 条笔记`)
    cancelSelect()
    setShowBatchDelete(false)
  }

  const handleBatchArchive = async () => {
    await batchArchiveNotes(Array.from(selectedIds))
    refreshNotes()
    refreshTags()
    setFilteredNotes(prev => prev.filter(n => !selectedIds.has(n.id!)))
    showToast(`已归档 ${selectedIds.size} 条笔记`)
    cancelSelect()
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar
        title={selectMode ? `已选 ${selectedIds.size} 项` : '标签'}
      />

      <div className="px-4 pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="animate-spin"><KleeAvatar size={32} /></span>
          </div>
        ) : tags.length === 0 ? (
          <EmptyState icon={<KleeAvatar size={72} />} title="还没有标签" description="在编辑笔记时添加标签，就能在这里看到啦" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectMode ? (
                <button onClick={cancelSelect} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-500">
                  取消选择
                </button>
              ) : (
                <>
                  <TagChip
                    tag="全部"
                    count={tags.reduce((s, t) => s + t.count, 0)}
                    active={selectedTag === null}
                    onClick={() => setSelectedTag(null)}
                  />
                  {tags.map(({ tag, count }) => (
                    <TagChip
                      key={tag}
                      tag={tag}
                      count={count}
                      active={selectedTag === tag}
                      onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    />
                  ))}
                </>
              )}
            </div>

            {selectedTag ? (
              filteredNotes.length > 0 ? (
                <div className="columns-2 gap-3 pt-0.5">
                  {filteredNotes.map(note => (
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
              ) : (
                <EmptyState icon={<KleeAvatar size={72} />} title="没有相关笔记" />
              )
            ) : (
              <div className="p-4 rounded-card bg-white dark:bg-gray-800 text-center">
                <p className="text-sm text-gray-400">点击上方标签查看对应笔记</p>
              </div>
            )}
          </>
        )}
      </div>

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
