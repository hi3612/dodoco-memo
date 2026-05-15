import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="mx-auto max-w-mobile min-h-screen bg-klee-cream dark:bg-transparent flex flex-col shadow-2xl relative">
      <main className="flex-1 overflow-auto relative z-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
