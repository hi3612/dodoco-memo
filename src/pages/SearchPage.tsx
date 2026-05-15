import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { SearchBar } from '@/components/search/SearchBar'
import { NoteGrid } from '@/components/notes/NoteGrid'
import { EmptyState } from '@/components/ui/EmptyState'
import { CloverIcon } from '@/components/ui/CloverIcon'
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const debouncedQuery = useDebounce(query, 300)
  const { results, loading, search } = useSearch()

  useEffect(() => {
    search(debouncedQuery)
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery })
    } else {
      setSearchParams({})
    }
  }, [debouncedQuery, search, setSearchParams])

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar title="搜索" />
      <div className="px-4 pb-6">
        <SearchBar value={query} onChange={setQuery} />

        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <span className="animate-spin"><CloverIcon size={32} /></span>
            </div>
          ) : query.trim() ? (
            results.length > 0 ? (
              <>
                <p className="text-xs text-gray-400 px-1 mb-3">找到 {results.length} 条笔记</p>
                <NoteGrid notes={results} />
              </>
            ) : (
              <EmptyState icon={<CloverIcon size={72} />} title="没有找到相关笔记" description="试试换个关键词吧" />
            )
          ) : (
            <EmptyState icon={<CloverIcon size={72} />} title="输入关键词搜索" description="搜索笔记的标题和内容" />
          )}
        </div>
      </div>
    </div>
  )
}
