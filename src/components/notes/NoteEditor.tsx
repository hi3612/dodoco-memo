import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { NoteToolbar } from './NoteToolbar'

interface NoteEditorProps {
  content: string
  onChange: (html: string, plainText: string) => void
}

export function NoteEditor({ content, onChange }: NoteEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[200px] px-4 py-3',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const plainText = editor.getText()
      onChange(html, plainText)
    },
    immediatelyRender: false,
  })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-card border border-gray-100 dark:border-gray-700 overflow-hidden">
      <NoteToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
