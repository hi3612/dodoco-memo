export function CloverIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ display: 'inline-block' }}
    >
      <defs>
        <radialGradient id="cloverGrad" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#F06050" />
          <stop offset="100%" stopColor="#C0392B" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="26" fill="url(#cloverGrad)" />
      <circle cx="68" cy="32" r="26" fill="url(#cloverGrad)" />
      <circle cx="32" cy="68" r="26" fill="url(#cloverGrad)" />
      <circle cx="68" cy="68" r="26" fill="url(#cloverGrad)" />
      <circle cx="50" cy="50" r="12" fill="#A93226" />
      <rect x="46" y="72" width="8" height="24" rx="4" fill="#A93226" />
    </svg>
  )
}

export const RED_CLOVER_SVG_URI = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
  + '<defs><radialGradient id="g" cx="40%" cy="40%"><stop offset="0%" stop-color="#F06050"/><stop offset="100%" stop-color="#C0392B"/></radialGradient></defs>'
  + '<circle cx="32" cy="32" r="26" fill="url(#g)"/>'
  + '<circle cx="68" cy="32" r="26" fill="url(#g)"/>'
  + '<circle cx="32" cy="68" r="26" fill="url(#g)"/>'
  + '<circle cx="68" cy="68" r="26" fill="url(#g)"/>'
  + '<circle cx="50" cy="50" r="12" fill="#A93226"/>'
  + '<rect x="46" y="72" width="8" height="24" rx="4" fill="#A93226"/>'
  + '</svg>'
)
