export interface Note {
  id?: number
  title: string
  content: string
  plainText: string
  color: string
  isPinned: boolean
  isArchived: boolean
  isTrashed: boolean
  tags: string[]
  createdAt: number
  updatedAt: number
}

export type NoteColor = 'default' | 'pyro' | 'hydro' | 'anemo' | 'electro' | 'dendro' | 'cryo' | 'geo'

export const NOTE_COLORS: Record<NoteColor, { label: string; bg: string; element: string }> = {
  default:  { label: '默认',  bg: 'bg-note-default',  element: '✨' },
  pyro:     { label: '火元素', bg: 'bg-note-pyro',     element: '🔥' },
  hydro:    { label: '水元素', bg: 'bg-note-hydro',    element: '💧' },
  anemo:    { label: '风元素', bg: 'bg-note-anemo',    element: '🍃' },
  electro:  { label: '雷元素', bg: 'bg-note-electro',  element: '⚡' },
  dendro:   { label: '草元素', bg: 'bg-note-dendro',   element: '🌿' },
  cryo:     { label: '冰元素', bg: 'bg-note-cryo',     element: '❄️' },
  geo:      { label: '岩元素', bg: 'bg-note-geo',      element: '🪨' },
}

export type ViewMode = 'grid' | 'list'
export type ThemeMode = 'light' | 'dark'
