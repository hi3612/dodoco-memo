import { create } from 'zustand'
import { getAllTags } from '@/db/operations'

interface TagState {
  tags: { tag: string; count: number }[]
  loading: boolean
  refresh: () => Promise<void>
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  loading: false,
  refresh: async () => {
    set({ loading: true })
    const tags = await getAllTags()
    set({ tags, loading: false })
  },
}))
