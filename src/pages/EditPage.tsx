import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Trash2, Archive, Pin, MoreHorizontal, Check } from 'lucide-react'
import { getNoteById, createNote, updateNote, archiveNote, unarchiveNote, trashNote } from '@/db/operations'
import { useNoteStore } from '@/stores/noteStore'
import { useTagStore } from '@/stores/tagStore'
import { TopBar } from '@/components/layout/TopBar'
import { NoteEditor } from '@/components/notes/NoteEditor'
import { ColorPicker } from '@/components/notes/ColorPicker'
import { TagChip } from '@/components/tags/TagChip'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { showToast } from '@/components/ui/Toast'
import type { Note } from '@/types'

export function EditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const refresh = useNoteStore(s => s.refresh)
  const refreshTags = useTagStore(s => s.refresh)

  const [note, setNote] = useState<Partial<Note>>({
    title: '',
    content: '',
    plainText: '',
    color: 'default',
    isPinned: false,
    isArchived: false,
    tags: [],
  })
  const [showMenu, setShowMenu] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (id) {
      getNoteById(Number(id)).then(n => {
        if (n) setNote(n)
      })
    } else {
      setNote({
        title: '',
        content: '',
        plainText: '',
        color: 'default',
        isPinned: false,
        isArchived: false,
        tags: [],
      })
    }
  }, [id])

  const noteRef = useRef(note)
  noteRef.current = note
  const idRef = useRef(id)
  idRef.current = id

  // 纯保存：只写数据库，不跳转
  const doSave = useCallback(async (): Promise<number | undefined> => {
    const current = noteRef.current
    const currentId = idRef.current
    console.log('[保存] 开始保存, id:', currentId, '标题:', current.title, '正文:', current.plainText?.slice(0, 20))
    try {
      if (currentId) {
        await updateNote(Number(currentId), current)
        console.log('[保存] 更新成功, id:', currentId)
        refresh()
        refreshTags()
        return Number(currentId)
      } else {
        const now = Date.now()
        const newId = await createNote({
          title: current.title || '',
          content: current.content || '',
          plainText: current.plainText || '',
          color: current.color || 'default',
          isPinned: current.isPinned || false,
          isArchived: false,
          isTrashed: false,
          tags: current.tags || [],
          createdAt: now,
          updatedAt: now,
        })
        refresh()
        refreshTags()
        console.log('[保存] 创建成功, newId:', newId)
        return newId
      }
    } catch (err) {
      console.error('[保存] 失败:', err)
      showToast('保存失败，请重试')
    }
  }, [refresh, refreshTags])

  // 自动保存：保存后静默更新 URL
  const save = useCallback(async () => {
    const current = noteRef.current
    if (!current.title?.trim() && !current.plainText?.trim() && !current.content?.replace(/<[^>]+>/g, '').trim()) return
    const resultId = await doSave()
    const currentId = idRef.current
    if (!currentId && resultId) {
      // 新笔记自动保存后，静默更新 URL，不触发重新加载
      window.history.replaceState(null, '', `/edit/${resultId}`)
    }
  }, [doSave])

  // 自动保存定时器
  useEffect(() => {
    const t = setTimeout(() => save(), 1500)
    return () => clearTimeout(t)
  }, [save])

  const handleDone = async () => {
    const current = noteRef.current
    console.log('[完成] 点击完成按钮, 标题:', current.title, '正文:', current.plainText?.slice(0, 20))
    if (!current.title?.trim() && !current.plainText?.trim() && !current.content?.replace(/<[^>]+>/g, '').trim()) {
      console.log('[完成] 内容为空，直接返回首页')
      navigate('/', { replace: true })
      return
    }
    const resultId = await doSave()
    console.log('[完成] doSave 返回:', resultId)
    if (resultId !== undefined) {
      showToast('已保存')
    }
    navigate('/', { replace: true })
  }

  const handleDelete = async () => {
    if (id) {
      await trashNote(Number(id))
      refresh()
      refreshTags()
      showToast('已移至回收站')
      navigate('/', { replace: true })
    }
  }

  const handleArchive = async () => {
    if (id) {
      const n = await getNoteById(Number(id))
      if (n) {
        if (n.isArchived) {
          await unarchiveNote(Number(id))
          showToast('已取消归档')
        } else {
          await archiveNote(Number(id))
          showToast('已归档')
        }
        refresh()
        navigate('/', { replace: true })
      }
    }
  }

  const togglePin = () => {
    setNote(prev => ({ ...prev, isPinned: !prev.isPinned }))
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !note.tags?.includes(tag)) {
      setNote(prev => ({ ...prev, tags: [...(prev.tags || []), tag] }))
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    setNote(prev => ({ ...prev, tags: (prev.tags || []).filter(t => t !== tag) }))
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar
        showBack
        title={id ? '编辑笔记' : '新建笔记'}
        action={
          <div className="flex items-center gap-1">
            <button onClick={handleDone} className="px-3 py-1.5 rounded-lg bg-klee-red text-white text-sm font-medium">
              <Check size={16} className="inline mr-1" />完成
            </button>
            <button onClick={togglePin} className={`p-2 rounded-full ${note.isPinned ? 'text-klee-red' : 'text-gray-400'}`} title="置顶">
              <Pin size={18} fill={note.isPinned ? 'currentColor' : 'none'} />
            </button>
            {id && (
              <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-full text-gray-400">
                <MoreHorizontal size={20} />
              </button>
            )}
          </div>
        }
      />

      {showMenu && (
        <div className="absolute right-4 top-14 z-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 w-36">
          <button onClick={() => { setShowMenu(false); handleArchive() }} className="w-full px-4 py-2.5 text-left text-sm text-klee-brown dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <Archive size={16} /> {note.isArchived ? '取消归档' : '归档'}
          </button>
          <button onClick={() => { setShowMenu(false); setShowDelete(true) }} className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
            <Trash2 size={16} /> 删除
          </button>
        </div>
      )}

      <div className="px-4 pb-6 space-y-4">
        <input
          type="text"
          value={note.title || ''}
          onChange={(e) => setNote(prev => ({ ...prev, title: e.target.value }))}
          placeholder="标题…"
          className="w-full text-xl font-bold text-klee-brown dark:text-white bg-transparent placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none px-1"
        />

        <NoteEditor
          content={note.content || ''}
          onChange={(html, plainText) => setNote(prev => ({ ...prev, content: html, plainText }))}
        />

        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">笔记颜色</p>
          <ColorPicker
            selected={note.color || 'default'}
            onSelect={(color) => setNote(prev => ({ ...prev, color }))}
          />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-2 font-medium">标签</p>
          <div className="flex gap-1.5 flex-wrap mb-2">
            {(note.tags || []).map(tag => (
              <TagChip key={tag} tag={tag} onRemove={() => removeTag(tag)} />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') addTag() }}
              placeholder="添加标签…"
              className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-klee-brown dark:text-white placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:border-klee-red"
            />
            <button onClick={addTag} className="px-4 py-2 rounded-xl bg-klee-red/10 text-klee-red text-sm font-medium">
              添加
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="删除笔记"
        message="笔记将会被移至回收站，30天后自动清理。确定要删除吗？"
        confirmText="删除"
      />
    </div>
  )
}
