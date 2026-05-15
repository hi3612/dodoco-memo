import { create } from 'zustand'
import type { Note } from '@/types'
import * as ops from '@/db/operations'

interface NoteState {
  notes: Note[]
  pinnedNotes: Note[]
  loading: boolean
  refresh: () => Promise<void>
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  pinnedNotes: [],
  loading: false,
  refresh: async () => {
    set({ loading: true })
    const [notes, pinnedNotes] = await Promise.all([
      ops.getAllNotes(),
      ops.getPinnedNotes(),
    ])
    console.log('[首页] 刷新完成, 笔记数:', notes.length, '置顶数:', pinnedNotes.length, '笔记:', notes)
    set({ notes, pinnedNotes, loading: false })
  },
}))
