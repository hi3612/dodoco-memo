import Dexie, { type Table } from 'dexie'
import type { Note } from '@/types'

export class DodocoMemoDB extends Dexie {
  notes!: Table<Note, number>

  constructor() {
    super('DodocoMemoDB')
    this.version(1).stores({
      notes: '++id, isPinned, isArchived, isTrashed, updatedAt, *tags',
    })
  }
}

export const db = new DodocoMemoDB()
