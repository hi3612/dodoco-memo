export function KleeAvatar({ size = 72, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {/* 背景圆 */}
      <circle cx="60" cy="60" r="58" fill="#FFF8F0" stroke="#E8D5C0" strokeWidth="2" />

      {/* 头发 — 浅金色 */}
      <ellipse cx="60" cy="40" rx="44" ry="32" fill="#FADB8C" />
      <ellipse cx="60" cy="42" rx="42" ry="28" fill="#F5CF70" />

      {/* 两侧刘海 */}
      <path d="M18 42 Q14 48 20 52 Q18 44 22 40Z" fill="#F5CF70" />
      <path d="M102 42 Q106 48 100 52 Q102 44 98 40Z" fill="#F5CF70" />
      {/* 刘海 */}
      <path d="M30 35 Q35 46 42 38 Q50 48 58 37 Q66 47 74 38 Q80 46 88 35Z" fill="#FADB8C" />

      {/* 帽子 — 红色贝雷帽 */}
      <ellipse cx="60" cy="34" rx="36" ry="12" fill="#D4443B" />
      <path d="M25 34 Q28 22 45 20 Q58 16 72 20 Q88 22 95 34Z" fill="#D4443B" />
      {/* 帽子边缘 */}
      <path d="M20 34 Q40 32 60 33 Q80 32 100 34 Q102 36 100 38 Q80 36 60 37 Q40 36 20 38Z" fill="#B8332A" />
      {/* 帽子上的四叶草装饰 */}
      <circle cx="42" cy="22" r="4" fill="#7EC87B" />
      <circle cx="48" cy="22" r="4" fill="#7EC87B" />
      <circle cx="42" cy="28" r="4" fill="#7EC87B" />
      <circle cx="48" cy="28" r="4" fill="#7EC87B" />
      <circle cx="45" cy="25" r="2.5" fill="#5CA85A" />

      {/* 脸部 */}
      <ellipse cx="60" cy="55" rx="26" ry="24" fill="#FFF0E5" />

      {/* 眼睛 */}
      <ellipse cx="47" cy="52" rx="6" ry="7" fill="#C0392B" />
      <ellipse cx="73" cy="52" rx="6" ry="7" fill="#C0392B" />
      {/* 瞳孔高光 */}
      <circle cx="49" cy="49" r="2.5" fill="white" />
      <circle cx="75" cy="49" r="2.5" fill="white" />
      {/* 小高光 */}
      <circle cx="45" cy="54" r="1" fill="white" opacity="0.5" />
      <circle cx="71" cy="54" r="1" fill="white" opacity="0.5" />

      {/* 眉毛 */}
      <path d="M40 44 Q44 42 48 43" stroke="#C08A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M80 44 Q76 42 72 43" stroke="#C08A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 嘴巴 — 微笑 */}
      <path d="M54 63 Q60 68 66 63" stroke="#C08A5C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 脸颊红晕 */}
      <circle cx="40" cy="58" r="5" fill="#FFB6B6" opacity="0.5" />
      <circle cx="80" cy="58" r="5" fill="#FFB6B6" opacity="0.5" />

      {/* 身体/领子 */}
      <path d="M38 78 Q44 76 60 76 Q76 76 82 78 L78 90 Q70 88 60 88 Q50 88 42 90Z" fill="#D4443B" />
      {/* 领子褶皱 */}
      <line x1="50" y1="80" x2="48" y2="87" stroke="#C0392B" strokeWidth="1" opacity="0.5" />
      <line x1="70" y1="80" x2="72" y2="87" stroke="#C0392B" strokeWidth="1" opacity="0.5" />

      {/* 耳朵 */}
      <ellipse cx="34" cy="54" rx="5" ry="7" fill="#FFE8D6" />
      <ellipse cx="86" cy="54" rx="5" ry="7" fill="#FFE8D6" />
    </svg>
  )
}
