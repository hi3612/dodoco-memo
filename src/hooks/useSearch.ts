import { useState, useCallback } from 'react'
import type { Note } from '@/types'
import { searchNotes } from '@/db/operations'

export function useSearch() {
  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }
    setLoading(true)
    const notes = await searchNotes(query)
    setResults(notes)
    setLoading(false)
  }, [])

  return { results, loading, search }
}
