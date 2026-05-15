import type { Editor } from '@tiptap/react'
import { Bold, Italic, List, ListOrdered, CheckSquare, Link as LinkIcon } from 'lucide-react'

interface NoteToolbarProps {
  editor: Editor | null
}

const tools = [
  { key: 'bold', icon: Bold, action: (e: Editor) => e.chain().focus().toggleBold().run(), isActive: (e: Editor) => e.isActive('bold') },
  { key: 'italic', icon: Italic, action: (e: Editor) => e.chain().focus().toggleItalic().run(), isActive: (e: Editor) => e.isActive('italic') },
  { key: 'bulletList', icon: List, action: (e: Editor) => e.chain().focus().toggleBulletList().run(), isActive: (e: Editor) => e.isActive('bulletList') },
  { key: 'orderedList', icon: ListOrdered, action: (e: Editor) => e.chain().focus().toggleOrderedList().run(), isActive: (e: Editor) => e.isActive('orderedList') },
  { key: 'taskList', icon: CheckSquare, action: (e: Editor) => e.chain().focus().toggleTaskList().run(), isActive: (e: Editor) => e.isActive('taskList') },
]

export function NoteToolbar({ editor }: NoteToolbarProps) {
  if (!editor) return null

  const addLink = () => {
    const url = window.prompt('输入链接地址：')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="flex items-center gap-1 px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 overflow-x-auto">
      {tools.map(({ key, icon: Icon, action, isActive }) => (
        <button
          key={key}
          onClick={() => action(editor)}
          className={`p-2 rounded-lg transition-colors ${
            isActive(editor)
              ? 'bg-klee-red/10 text-klee-red'
              : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Icon size={18} />
        </button>
      ))}
      <button
        onClick={addLink}
        className={`p-2 rounded-lg transition-colors ${
          editor.isActive('link')
            ? 'bg-klee-red/10 text-klee-red'
            : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <LinkIcon size={18} />
      </button>
    </div>
  )
}
