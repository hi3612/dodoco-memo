import { Outlet } from 'react-router-dom'
import { BottomNav } from './BottomNav'

export function AppShell() {
  return (
    <div className="mx-auto max-w-mobile min-h-screen bg-klee-cream dark:bg-klee-darkBg flex flex-col shadow-2xl">
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
