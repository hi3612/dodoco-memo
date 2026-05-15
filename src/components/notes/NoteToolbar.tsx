import type { Editor } from '@tiptap/react'
import { Bold, Italic, List, ListOrdered, CheckSquare, Link as LinkIcon } from 'lucide-react'

interface NoteToolbarProps {
  editor: Editor | null
}

const tools = [
  { key: 'bold', icon: Bold, label: '加粗', action: (e: Editor) => e.chain().focus().toggleBold().run(), isActive: (e: Editor) => e.isActive('bold') },
  { key: 'italic', icon: Italic, label: '斜体', action: (e: Editor) => e.chain().focus().toggleItalic().run(), isActive: (e: Editor) => e.isActive('italic') },
  { key: 'bulletList', icon: List, label: '无序列表', action: (e: Editor) => e.chain().focus().toggleBulletList().run(), isActive: (e: Editor) => e.isActive('bulletList') },
  { key: 'orderedList', icon: ListOrdered, label: '有序列表', action: (e: Editor) => e.chain().focus().toggleOrderedList().run(), isActive: (e: Editor) => e.isActive('orderedList') },
  { key: 'taskList', icon: CheckSquare, label: '待办清单', action: (e: Editor) => e.chain().focus().toggleTaskList().run(), isActive: (e: Editor) => e.isActive('taskList') },
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
      {tools.map(({ key, icon: Icon, label, action, isActive }) => (
        <button
          key={key}
          title={label}
          onMouseDown={(e) => e.preventDefault()}
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
      <span className="w-px h-5 bg-gray-200 dark:bg-gray-600 mx-1" />
      <button
        key="link"
        title="插入链接"
        onMouseDown={(e) => e.preventDefault()}
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
