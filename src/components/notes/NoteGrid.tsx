import type { Note } from '@/types'
import { NoteCard } from './NoteCard'

interface NoteGridProps {
  notes: Note[]
}

export function NoteGrid({ notes }: NoteGridProps) {
  if (notes.length === 0) return null

  return (
    <div className="columns-2 gap-3 px-4">
      {notes.map(note => (
        <div key={note.id} className="break-inside-avoid mb-3">
          <NoteCard note={note} />
        </div>
      ))}
    </div>
  )
}
