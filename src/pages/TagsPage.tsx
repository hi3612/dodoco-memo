import { useEffect, useState } from 'react'
import { TopBar } from '@/components/layout/TopBar'
import { TagChip } from '@/components/tags/TagChip'
import { NoteGrid } from '@/components/notes/NoteGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { useTagStore } from '@/stores/tagStore'
import { getNotesByTag } from '@/db/operations'
import type { Note } from '@/types'

export function TagsPage() {
  const { tags, loading, refresh } = useTagStore()
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (selectedTag) {
      getNotesByTag(selectedTag).then(setFilteredNotes)
    }
  }, [selectedTag])

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar title="标签" />

      <div className="px-4 pb-6">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="text-2xl animate-spin">🍀</span>
          </div>
        ) : tags.length === 0 ? (
          <EmptyState icon="🏷️" title="还没有标签" description="在编辑笔记时添加标签，就能在这里看到啦" />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-4">
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
            </div>

            {selectedTag && (
              <div>
                <p className="text-xs text-gray-400 px-1 mb-3">
                  标签「{selectedTag}」下的笔记 ({filteredNotes.length})
                </p>
                {filteredNotes.length > 0 ? (
                  <NoteGrid notes={filteredNotes} />
                ) : (
                  <EmptyState icon="🍀" title="没有相关笔记" />
                )}
              </div>
            )}

            {!selectedTag && (
              <div
                className="p-4 rounded-card bg-white dark:bg-gray-800 text-center"
              >
                <p className="text-sm text-gray-400">点击上方标签查看对应笔记</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
