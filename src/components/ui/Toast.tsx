import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

interface ToastData {
  message: string
  duration?: number
}

function Toast({ message, onDone }: ToastData & { onDone: () => void }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
    const t = setTimeout(() => {
      setShow(false)
      setTimeout(onDone, 300)
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
      show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`}>
      <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-2.5 rounded-full text-sm shadow-lg whitespace-nowrap">
        {message}
      </div>
    </div>
  )
}

export function showToast(message: string) {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const root = createRoot(div)
  root.render(<Toast message={message} onDone={() => {
    root.unmount()
    div.remove()
  }} />)
}
