import { useUIStore } from '@/stores/uiStore'

export function KleeAvatar({ size = 72, className = '' }: { size?: number; className?: string }) {
  const theme = useUIStore(s => s.theme)

  return (
    <img
      src={import.meta.env.BASE_URL + 'klee-avatar.webp'}
      alt="可莉"
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        borderRadius: '50%',
        boxShadow: theme === 'dark'
          ? '0 0 20px rgba(255,180,100,0.3)'
          : '0 2px 12px rgba(0,0,0,0.1)',
      }}
    />
  )
}
