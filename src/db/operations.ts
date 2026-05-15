import { db } from './database'
import type { Note } from '@/types'

export async function getAllNotes(): Promise<Note[]> {
  const all = await db.notes.toArray()
  return all
    .filter(n => !n.isTrashed && !n.isArchived)
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getPinnedNotes(): Promise<Note[]> {
  const all = await db.notes.toArray()
  return all
    .filter(n => n.isPinned && !n.isTrashed && !n.isArchived)
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getArchivedNotes(): Promise<Note[]> {
  const all = await db.notes.toArray()
  return all
    .filter(n => n.isArchived && !n.isTrashed)
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getTrashedNotes(): Promise<Note[]> {
  const all = await db.notes.toArray()
  return all
    .filter(n => n.isTrashed)
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getNoteById(id: number): Promise<Note | undefined> {
  return db.notes.get(id)
}

export async function createNote(note: Omit<Note, 'id'>): Promise<number> {
  return db.notes.add(note)
}

export async function updateNote(id: number, updates: Partial<Note>): Promise<number> {
  return db.notes.update(id, { ...updates, updatedAt: Date.now() })
}

export async function trashNote(id: number): Promise<number> {
  return db.notes.update(id, { isTrashed: true, updatedAt: Date.now() })
}

export async function restoreNote(id: number): Promise<number> {
  return db.notes.update(id, { isTrashed: false, updatedAt: Date.now() })
}

export async function deleteNoteForever(id: number): Promise<void> {
  return db.notes.delete(id)
}

export async function batchTrashNotes(ids: number[]): Promise<void> {
  const now = Date.now()
  await db.notes.bulkUpdate(ids.map(id => ({ key: id, changes: { isTrashed: true, updatedAt: now } })))
}

export async function batchArchiveNotes(ids: number[]): Promise<void> {
  const now = Date.now()
  await db.notes.bulkUpdate(ids.map(id => ({ key: id, changes: { isArchived: true, updatedAt: now } })))
}

export async function archiveNote(id: number): Promise<number> {
  return db.notes.update(id, { isArchived: true, updatedAt: Date.now() })
}

export async function unarchiveNote(id: number): Promise<number> {
  return db.notes.update(id, { isArchived: false, updatedAt: Date.now() })
}

export async function searchNotes(query: string): Promise<Note[]> {
  const q = query.toLowerCase()
  const all = await db.notes.toArray()
  return all
    .filter(n => !n.isTrashed && (n.title.toLowerCase().includes(q) || n.plainText.toLowerCase().includes(q)))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getNotesByTag(tag: string): Promise<Note[]> {
  const all = await db.notes.toArray()
  return all
    .filter(n => !n.isTrashed && !n.isArchived && n.tags.includes(tag))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await db.notes.toArray()
  const map = new Map<string, number>()
  for (const n of all) {
    if (n.isTrashed) continue
    for (const t of n.tags) {
      map.set(t, (map.get(t) || 0) + 1)
    }
  }
  return Array.from(map.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export async function exportAllNotes(): Promise<string> {
  const notes = await db.notes.toArray()
  return JSON.stringify(notes, null, 2)
}

export async function importNotes(json: string): Promise<void> {
  const notes: Note[] = JSON.parse(json)
  await db.notes.bulkPut(notes)
}

export async function emptyTrash(): Promise<void> {
  const all = await db.notes.toArray()
  const trashed = all.filter(n => n.isTrashed)
  await db.notes.bulkDelete(trashed.map(n => n.id!))
}

export async function cleanOldTrash(days = 30): Promise<void> {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
  const all = await db.notes.toArray()
  const old = all.filter(n => n.isTrashed && n.updatedAt < cutoff)
  await db.notes.bulkDelete(old.map(n => n.id!))
}
