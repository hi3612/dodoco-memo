import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-klee-brown dark:text-white mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center">{description}</p>
      )}
    </div>
  )
}
