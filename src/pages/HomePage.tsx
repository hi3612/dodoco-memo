import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useNoteStore } from '@/stores/noteStore'
import { TopBar } from '@/components/layout/TopBar'
import { NoteGrid } from '@/components/notes/NoteGrid'
import { EmptyState } from '@/components/ui/EmptyState'

export function HomePage() {
  const { notes, pinnedNotes, loading, refresh } = useNoteStore()
  const navigate = useNavigate()

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar
        action={
          <button
            onClick={() => navigate('/edit')}
            className="p-2 -mr-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-klee-red"
          >
            <Plus size={24} />
          </button>
        }
      />

      <div className="pb-6">
        {loading && notes.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <span className="text-4xl animate-bounce">🍀</span>
          </div>
        ) : notes.length === 0 && pinnedNotes.length === 0 ? (
          <EmptyState
            icon="🍀"
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
                <NoteGrid notes={pinnedNotes} />
              </section>
            )}

            <section>
              {pinnedNotes.length > 0 && (
                <div className="px-4 py-2">
                  <h2 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">全部笔记</h2>
                </div>
              )}
              <NoteGrid notes={notes} />
            </section>
          </>
        )}
      </div>
    </div>
  )
}
