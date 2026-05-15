import { useNavigate, useLocation } from 'react-router-dom'
import { House, Search, Tags, Settings } from 'lucide-react'

const tabs = [
  { path: '/', label: '首页', icon: House },
  { path: '/search', label: '搜索', icon: Search },
  { path: '/tags', label: '标签', icon: Tags },
  { path: '/settings', label: '设置', icon: Settings },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="sticky bottom-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-around h-14">
        {tabs.map(({ path, label, icon: Icon }) => {
          const active = isActive(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors ${
                active ? 'text-klee-red' : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
