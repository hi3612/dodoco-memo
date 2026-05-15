import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface TopBarProps {
  title?: string
  showBack?: boolean
  action?: React.ReactNode
}

export function TopBar({ title, showBack, action }: TopBarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const displayTitle = title || '嘟嘟可备忘录'

  return (
    <header className="sticky top-0 z-30 bg-klee-cream/80 dark:bg-klee-darkBg/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2 min-w-0">
          {showBack ? (
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
            >
              <ArrowLeft size={22} className="text-klee-brown dark:text-white" />
            </button>
          ) : isHome ? (
            <span className="text-3xl">🍀</span>
          ) : null}
          <h1 className="text-lg font-bold text-klee-brown dark:text-white truncate">
            {displayTitle}
          </h1>
        </div>
        {action && <div className="flex items-center shrink-0">{action}</div>}
      </div>
    </header>
  )
}
