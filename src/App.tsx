import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { StarryBg } from '@/components/ui/StarryBg'
import { DesktopPet } from '@/components/pet/DesktopPet'
import { HomePage } from '@/pages/HomePage'
import { EditPage } from '@/pages/EditPage'
import { SearchPage } from '@/pages/SearchPage'
import { TagsPage } from '@/pages/TagsPage'
import { ArchivePage } from '@/pages/ArchivePage'
import { TrashPage } from '@/pages/TrashPage'
import { SettingsPage } from '@/pages/SettingsPage'

export default function App() {
  useEffect(() => {
    const isDark = localStorage.getItem('dodoco-ui')
    if (isDark) {
      try {
        const parsed = JSON.parse(isDark)
        if (parsed.state?.theme === 'dark') {
          document.documentElement.classList.add('dark')
        }
      } catch { /* ignore */ }
    }
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <StarryBg />
      <DesktopPet />
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id?" element={<EditPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tags" element={<TagsPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/trash" element={<TrashPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
