export function StarryBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
      {/* 银河光带 — 彩色渐变流淌（增强亮度）*/}
      <div
        className="absolute w-[200vw] h-[120vh] -top-10 -left-1/2"
        style={{
          background: `
            radial-gradient(ellipse 80% 30% at 30% 45%, rgba(130,160,240,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 25% at 50% 40%, rgba(200,140,220,0.20) 0%, transparent 50%),
            radial-gradient(ellipse 70% 20% at 60% 50%, rgba(180,180,240,0.20) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 40% 55%, rgba(240,200,180,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 90% 35% at 50% 48%, rgba(140,180,220,0.12) 0%, transparent 60%)
          `,
          animation: 'galaxyFlow 80s linear infinite',
        }}
      />

      {/* 第二层银河 — 反向缓慢流动 */}
      <div
        className="absolute w-[200vw] h-[120vh] -top-10 -left-full"
        style={{
          background: `
            radial-gradient(ellipse 60% 20% at 55% 42%, rgba(180,160,255,0.18) 0%, transparent 50%),
            radial-gradient(ellipse 50% 15% at 35% 48%, rgba(255,180,200,0.15) 0%, transparent 50%),
            radial-gradient(ellipse 40% 25% at 45% 55%, rgba(160,200,240,0.12) 0%, transparent 50%)
          `,
          animation: 'galaxyFlow 120s linear infinite reverse',
        }}
      />

      {/* 多彩亮星层 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'starTwinkle 4s ease-in-out infinite',
          boxShadow: `
            12vw 10vh 0 1px rgba(180,200,255,0.9),
            28vw 22vh 0 1px rgba(255,220,180,0.8),
            45vw 8vh 0 1px rgba(200,220,255,0.7),
            62vw 30vh 0 1px rgba(255,180,220,0.8),
            78vw 15vh 0 1px rgba(180,200,255,0.9),
            8vw 45vh 0 1px rgba(255,200,180,0.7),
            35vw 55vh 0 1px rgba(200,180,255,0.8),
            55vw 60vh 0 1px rgba(180,220,255,0.7),
            72vw 70vh 0 1px rgba(255,200,200,0.8),
            88vw 50vh 0 1px rgba(180,200,255,0.7),
            18vw 72vh 0 1px rgba(200,220,255,0.6),
            42vw 85vh 0 1px rgba(255,200,220,0.7),
            65vw 82vh 0 1px rgba(180,200,255,0.6),
            92vw 35vh 0 1px rgba(255,180,200,0.8),
            5vw 28vh 0 1px rgba(200,220,255,0.7)
          `,
          width: '2px',
          height: '2px',
          borderRadius: '50%',
        }}
      />

      {/* 中等星点层 — 不同闪烁节奏 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'starTwinkle 7s ease-in-out 0.5s infinite alternate',
          boxShadow: `
            6vw 18vh 0 0 rgba(200,200,255,0.6),
            22vw 8vh 0 0 rgba(255,200,220,0.5),
            38vw 28vh 0 0 rgba(180,200,240,0.5),
            52vw 12vh 0 0 rgba(220,180,255,0.6),
            68vw 35vh 0 0 rgba(200,220,255,0.5),
            85vw 22vh 0 0 rgba(255,200,180,0.5),
            14vw 52vh 0 0 rgba(180,200,255,0.5),
            30vw 68vh 0 0 rgba(255,180,220,0.6),
            48vw 48vh 0 0 rgba(200,220,255,0.5),
            60vw 75vh 0 0 rgba(220,180,240,0.5),
            80vw 58vh 0 0 rgba(200,200,255,0.6),
            95vw 65vh 0 0 rgba(255,200,200,0.5),
            25vw 80vh 0 0 rgba(200,220,255,0.5),
            55vw 88vh 0 0 rgba(255,180,220,0.5),
            75vw 90vh 0 0 rgba(180,200,255,0.5),
            10vw 90vh 0 0 rgba(220,200,255,0.5),
            40vw 35vh 0 0 rgba(200,220,255,0.6),
            90vw 12vh 0 0 rgba(255,200,220,0.6)
          `,
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
        }}
      />

      {/* 小星点密集层 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'starTwinkle 5s ease-in-out 1s infinite',
          boxShadow: `
            3vw 5vh 0 0 rgba(200,200,255,0.4),
            15vw 12vh 0 0 rgba(255,200,220,0.4),
            27vw 3vh 0 0 rgba(200,220,255,0.35),
            40vw 18vh 0 0 rgba(220,180,240,0.4),
            52vw 6vh 0 0 rgba(200,220,255,0.35),
            65vw 22vh 0 0 rgba(255,200,200,0.4),
            77vw 10vh 0 0 rgba(200,200,255,0.4),
            90vw 28vh 0 0 rgba(220,200,255,0.35),
            8vw 38vh 0 0 rgba(200,220,255,0.4),
            20vw 42vh 0 0 rgba(255,180,220,0.35),
            33vw 32vh 0 0 rgba(200,220,255,0.4),
            46vw 40vh 0 0 rgba(220,200,255,0.35),
            58vw 35vh 0 0 rgba(200,220,255,0.4),
            70vw 45vh 0 0 rgba(255,200,220,0.35),
            83vw 38vh 0 0 rgba(200,220,255,0.4),
            95vw 42vh 0 0 rgba(220,180,240,0.35),
            5vw 58vh 0 0 rgba(200,220,255,0.4),
            18vw 62vh 0 0 rgba(255,200,200,0.35),
            30vw 55vh 0 0 rgba(200,220,255,0.4),
            42vw 68vh 0 0 rgba(220,180,240,0.35),
            55vw 52vh 0 0 rgba(200,220,255,0.4),
            68vw 65vh 0 0 rgba(255,200,220,0.35),
            80vw 72vh 0 0 rgba(200,220,255,0.4),
            92vw 58vh 0 0 rgba(220,200,255,0.35),
            12vw 78vh 0 0 rgba(200,220,255,0.4),
            25vw 85vh 0 0 rgba(255,180,220,0.35),
            38vw 75vh 0 0 rgba(200,220,255,0.4),
            50vw 90vh 0 0 rgba(220,200,255,0.35),
            62vw 85vh 0 0 rgba(200,220,255,0.4),
            75vw 92vh 0 0 rgba(255,200,200,0.35),
            88vw 80vh 0 0 rgba(200,220,255,0.4)
          `,
          width: '1px',
          height: '1px',
          borderRadius: '50%',
        }}
      />

      {/* 彩色流星 — 从页面上方生成，缓速下坠 */}
      <div
        className="absolute left-[5%]"
        style={{
          top: '8%',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 6px 2px rgba(180,200,255,0.8), 0 0 12px 4px rgba(140,160,255,0.4)',
          animation: 'meteorFall 16s linear infinite',
        }}
      />
      <div
        className="absolute left-[25%]"
        style={{
          top: '5%',
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
          background: '#ffe0f0',
          boxShadow: '0 0 5px 2px rgba(255,180,220,0.7), 0 0 10px 3px rgba(255,150,200,0.3)',
          animation: 'meteorFall 20s linear 3s infinite',
        }}
      />
      <div
        className="absolute left-[50%]"
        style={{
          top: '12%',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: '#e0e0ff',
          boxShadow: '0 0 6px 2px rgba(200,200,255,0.8), 0 0 12px 4px rgba(160,160,255,0.4)',
          animation: 'meteorFall 18s linear 7s infinite',
        }}
      />
      <div
        className="absolute left-[70%]"
        style={{
          top: '3%',
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
          background: '#ffeedd',
          boxShadow: '0 0 5px 2px rgba(255,200,160,0.7), 0 0 10px 3px rgba(255,180,140,0.3)',
          animation: 'meteorFall 22s linear 1s infinite',
        }}
      />
      <div
        className="absolute left-[40%]"
        style={{
          top: '10%',
          width: '1px',
          height: '1px',
          borderRadius: '50%',
          background: '#eeddff',
          boxShadow: '0 0 4px 1px rgba(220,180,255,0.7), 0 0 8px 2px rgba(200,150,240,0.3)',
          animation: 'meteorFall 25s linear 12s infinite',
        }}
      />
      <div
        className="absolute left-[85%]"
        style={{
          top: '6%',
          width: '2px',
          height: '2px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 6px 2px rgba(180,220,255,0.8), 0 0 12px 4px rgba(140,180,255,0.4)',
          animation: 'meteorFall 19s linear 5s infinite',
        }}
      />
      <div
        className="absolute left-[15%]"
        style={{
          top: '15%',
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
          background: '#ffe8f0',
          boxShadow: '0 0 5px 2px rgba(255,200,220,0.7), 0 0 10px 3px rgba(255,160,200,0.3)',
          animation: 'meteorFall 23s linear 9s infinite',
        }}
      />
    </div>
  )
}
