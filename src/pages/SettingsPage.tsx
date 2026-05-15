import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sun, Moon, Grid3X3, List, Archive, Trash2, Download, Upload, Trash } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { CloverIcon } from '@/components/ui/CloverIcon'
import { showToast } from '@/components/ui/Toast'
import { useUIStore } from '@/stores/uiStore'
import { useNoteStore } from '@/stores/noteStore'
import { exportAllNotes, importNotes, emptyTrash } from '@/db/operations'

export function SettingsPage() {
  const navigate = useNavigate()
  const { theme, viewMode, toggleTheme, setViewMode } = useUIStore()
  const refresh = useNoteStore(s => s.refresh)
  const [showClearTrash, setShowClearTrash] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    const json = await exportAllNotes()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `嘟嘟可备忘录_备份_${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('导出成功')
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    await importNotes(text)
    refresh()
    showToast('导入成功')
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleClearTrash = async () => {
    await emptyTrash()
    refresh()
    showToast('回收站已清空')
    setShowClearTrash(false)
  }

  return (
    <div className="min-h-[calc(100vh-56px)]">
      <TopBar title="设置" />

      <div className="px-4 pb-6 space-y-1">
        {/* Theme */}
        <div className="bg-white dark:bg-gray-800 rounded-card overflow-hidden">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              {theme === 'light' ? <Sun size={20} className="text-klee-gold" /> : <Moon size={20} className="text-gray-500" />}
              <span className="text-sm font-medium text-klee-brown dark:text-white">深色模式</span>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-klee-red' : 'bg-gray-300'}`}>
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform mt-0.5 ${theme === 'dark' ? 'translate-x-[18px]' : 'translate-x-[2px]'}`} />
            </div>
          </button>
        </div>

        {/* View Mode */}
        <div className="bg-white dark:bg-gray-800 rounded-card overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${
                viewMode === 'grid' ? 'text-klee-red bg-klee-red/5' : 'text-gray-500'
              }`}
            >
              <Grid3X3 size={18} /> 网格
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-medium transition-colors ${
                viewMode === 'list' ? 'text-klee-red bg-klee-red/5' : 'text-gray-500'
              }`}
            >
              <List size={18} /> 列表
            </button>
          </div>
        </div>

        {/* Archive & Trash */}
        <div className="bg-white dark:bg-gray-800 rounded-card overflow-hidden">
          <button
            onClick={() => navigate('/archive')}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <Archive size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-klee-brown dark:text-white">归档笔记</span>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700" />
          <button
            onClick={() => navigate('/trash')}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-gray-500" />
              <span className="text-sm font-medium text-klee-brown dark:text-white">回收站</span>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </button>
        </div>

        {/* Import / Export */}
        <div className="bg-white dark:bg-gray-800 rounded-card overflow-hidden">
          <button
            onClick={handleExport}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <Download size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-klee-brown dark:text-white">导出全部笔记</span>
          </button>
          <div className="border-t border-gray-100 dark:border-gray-700" />
          <label className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
            <Upload size={20} className="text-gray-500" />
            <span className="text-sm font-medium text-klee-brown dark:text-white">导入笔记</span>
            <input ref={fileRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <div className="border-t border-gray-100 dark:border-gray-700" />
          <button
            onClick={() => setShowClearTrash(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-700 text-red-500"
          >
            <Trash size={20} />
            <span className="text-sm font-medium">清空回收站</span>
          </button>
        </div>

        {/* App Info */}
        <div className="pt-6 text-center">
          <CloverIcon size={36} className="mx-auto" />
          <p className="text-xs text-gray-400 mt-1">嘟嘟可备忘录 v1.0</p>
          <p className="text-xs text-gray-300 dark:text-gray-600 mt-0.5">和可莉一起记录每一天 ✨</p>
        </div>
      </div>

      <ConfirmDialog
        open={showClearTrash}
        onClose={() => setShowClearTrash(false)}
        onConfirm={handleClearTrash}
        title="清空回收站"
        message="回收站中的所有笔记将被永久删除，无法恢复。确定要清空吗？"
        confirmText="永久删除"
      />
    </div>
  )
}
