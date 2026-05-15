export function StarryBg() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 hidden dark:block">
      {/* 星云层1 — 紫蓝色大范围光晕 */}
      <div
        className="absolute w-[180vw] h-[120vh] -top-20 -left-[40vw]"
        style={{
          background: `
            radial-gradient(ellipse 50% 40% at 30% 45%, rgba(100,60,200,0.35) 0%, transparent 60%),
            radial-gradient(ellipse 45% 35% at 55% 35%, rgba(40,80,180,0.30) 0%, transparent 55%),
            radial-gradient(ellipse 40% 45% at 40% 60%, rgba(80,30,140,0.25) 0%, transparent 60%)
          `,
          filter: 'blur(40px)',
          animation: 'nebulaBreath 20s ease-in-out infinite',
        }}
      />

      {/* 星云层2 — 粉紫金色暖光 */}
      <div
        className="absolute w-[160vw] h-[100vh] -top-10 -left-[30vw]"
        style={{
          background: `
            radial-gradient(ellipse 35% 30% at 60% 30%, rgba(200,80,150,0.25) 0%, transparent 50%),
            radial-gradient(ellipse 30% 35% at 25% 55%, rgba(180,120,60,0.20) 0%, transparent 50%),
            radial-gradient(ellipse 40% 25% at 70% 60%, rgba(150,60,180,0.22) 0%, transparent 55%)
          `,
          filter: 'blur(50px)',
          animation: 'nebulaBreath 25s ease-in-out 5s infinite alternate',
        }}
      />

      {/* 星云层3 — 青蓝冷光 */}
      <div
        className="absolute w-[170vw] h-[110vh] -top-5 -left-[25vw]"
        style={{
          background: `
            radial-gradient(ellipse 40% 35% at 45% 40%, rgba(30,120,180,0.30) 0%, transparent 50%),
            radial-gradient(ellipse 35% 30% at 20% 50%, rgba(20,160,160,0.20) 0%, transparent 50%),
            radial-gradient(ellipse 30% 25% at 65% 45%, rgba(40,100,200,0.25) 0%, transparent 55%)
          `,
          filter: 'blur(45px)',
          animation: 'nebulaBreath 30s ease-in-out 10s infinite',
        }}
      />

      {/* 星团 — 密集亮星区域 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'starCluster 8s ease-in-out infinite',
          boxShadow: `
            28vw 35vh 0 0 rgba(180,200,255,0.7),
            30vw 36vh 0 0 rgba(200,220,255,0.5),
            26vw 37vh 0 0 rgba(160,180,240,0.6),
            32vw 34vh 0 0 rgba(220,200,255,0.5),
            29vw 33vh 0 0 rgba(180,200,240,0.4),
            31vw 38vh 0 0 rgba(200,180,255,0.5),
            60vw 25vh 0 0 rgba(255,200,220,0.6),
            62vw 24vh 0 0 rgba(255,180,200,0.5),
            58vw 26vh 0 0 rgba(240,200,220,0.5),
            61vw 27vh 0 0 rgba(255,190,210,0.4),
            45vw 55vh 0 0 rgba(180,220,255,0.6),
            47vw 54vh 0 0 rgba(160,200,240,0.5),
            44vw 56vh 0 0 rgba(200,240,255,0.5),
            46vw 57vh 0 0 rgba(180,210,250,0.4),
            75vw 65vh 0 0 rgba(220,180,255,0.6),
            77vw 64vh 0 0 rgba(200,160,240,0.5),
            74vw 66vh 0 0 rgba(240,200,255,0.5),
            15vw 70vh 0 0 rgba(200,220,255,0.6),
            17vw 69vh 0 0 rgba(180,200,240,0.5),
            14vw 71vh 0 0 rgba(220,240,255,0.5)
          `,
          width: '1px',
          height: '1px',
          borderRadius: '50%',
        }}
      />

      {/* 明亮大星 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'brightStar 5s ease-in-out infinite',
          boxShadow: `
            10vw 12vh 0 1px rgba(220,230,255,0.9),
            35vw 20vh 0 1px rgba(255,220,200,0.8),
            52vw 8vh 0 1px rgba(200,220,255,0.9),
            72vw 28vh 0 1px rgba(255,200,240,0.8),
            88vw 15vh 0 1px rgba(180,210,255,0.9),
            18vw 45vh 0 1px rgba(255,220,180,0.8),
            42vw 48vh 0 1px rgba(200,180,255,0.9),
            68vw 52vh 0 1px rgba(180,230,255,0.8),
            82vw 42vh 0 1px rgba(255,200,220,0.9),
            5vw 78vh 0 1px rgba(200,220,255,0.8),
            38vw 72vh 0 1px rgba(220,180,255,0.9),
            55vw 82vh 0 1px rgba(180,220,255,0.8),
            92vw 68vh 0 1px rgba(255,200,200,0.9),
            25vw 85vh 0 1px rgba(200,220,255,0.8)
          `,
          width: '2px',
          height: '2px',
          borderRadius: '50%',
        }}
      />

      {/* 中亮星 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'brightStar 7s ease-in-out 1s infinite alternate',
          boxShadow: `
            15vw 22vh 0 0 rgba(200,210,255,0.6),
            42vw 14vh 0 0 rgba(255,200,230,0.5),
            65vw 30vh 0 0 rgba(180,210,250,0.6),
            80vw 18vh 0 0 rgba(220,190,255,0.5),
            8vw 38vh 0 0 rgba(190,220,255,0.6),
            48vw 42vh 0 0 rgba(255,190,220,0.5),
            75vw 55vh 0 0 rgba(190,220,255,0.6),
            90vw 38vh 0 0 rgba(200,190,255,0.5),
            22vw 62vh 0 0 rgba(190,220,255,0.6),
            58vw 68vh 0 0 rgba(255,200,220,0.5),
            85vw 72vh 0 0 rgba(190,220,255,0.6),
            12vw 88vh 0 0 rgba(220,190,255,0.5),
            45vw 90vh 0 0 rgba(190,220,255,0.6)
          `,
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
        }}
      />

      {/* 小星密集场 */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'brightStar 6s ease-in-out 2s infinite',
          boxShadow: `
            5vw 8vh 0 0 rgba(200,210,255,0.4),
            20vw 15vh 0 0 rgba(220,190,255,0.35),
            38vw 5vh 0 0 rgba(190,220,255,0.4),
            50vw 18vh 0 0 rgba(255,200,230,0.35),
            68vw 10vh 0 0 rgba(190,220,255,0.4),
            85vw 22vh 0 0 rgba(200,190,255,0.35),
            12vw 32vh 0 0 rgba(190,220,255,0.4),
            28vw 42vh 0 0 rgba(255,190,220,0.35),
            44vw 35vh 0 0 rgba(190,220,255,0.4),
            58vw 40vh 0 0 rgba(200,210,255,0.35),
            72vw 32vh 0 0 rgba(190,220,255,0.4),
            8vw 55vh 0 0 rgba(220,190,255,0.35),
            25vw 58vh 0 0 rgba(190,220,255,0.4),
            40vw 62vh 0 0 rgba(255,200,220,0.35),
            55vw 55vh 0 0 rgba(190,220,255,0.4),
            70vw 60vh 0 0 rgba(200,190,255,0.35),
            88vw 55vh 0 0 rgba(190,220,255,0.4),
            15vw 75vh 0 0 rgba(220,190,255,0.35),
            32vw 82vh 0 0 rgba(190,220,255,0.4),
            50vw 78vh 0 0 rgba(255,200,230,0.35),
            65vw 85vh 0 0 rgba(190,220,255,0.4),
            80vw 80vh 0 0 rgba(200,190,255,0.35),
            95vw 75vh 0 0 rgba(190,220,255,0.4),
            18vw 48vh 0 0 rgba(220,200,255,0.35),
            52vw 28vh 0 0 rgba(200,220,255,0.35),
            78vw 48vh 0 0 rgba(200,190,255,0.35)
          `,
          width: '1px',
          height: '1px',
          borderRadius: '50%',
        }}
      />

      {/* 十字闪烁亮星 */}
      <div
        className="absolute"
        style={{
          left: '30vw',
          top: '25vh',
          width: '3px',
          height: '3px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: `
            0 0 8px 3px rgba(180,200,255,0.9),
            0 0 15px 6px rgba(140,160,255,0.5),
            0 0 30px 10px rgba(100,120,220,0.3),
            6px 0 0 1px rgba(180,200,255,0.4),
            -6px 0 0 1px rgba(180,200,255,0.4),
            0 6px 0 1px rgba(180,200,255,0.4),
            0 -6px 0 1px rgba(180,200,255,0.4)
          `,
          animation: 'sparkle 4s ease-in-out infinite',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '65vw',
          top: '30vh',
          width: '2px',
          height: '2px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: `
            0 0 6px 2px rgba(255,200,220,0.9),
            0 0 12px 4px rgba(255,160,200,0.5),
            4px 0 0 1px rgba(255,200,220,0.4),
            -4px 0 0 1px rgba(255,200,220,0.4),
            0 4px 0 1px rgba(255,200,220,0.4),
            0 -4px 0 1px rgba(255,200,220,0.4)
          `,
          animation: 'sparkle 5s ease-in-out 1.5s infinite',
        }}
      />
      <div
        className="absolute"
        style={{
          left: '50vw',
          top: '55vh',
          width: '2.5px',
          height: '2.5px',
          background: 'white',
          borderRadius: '50%',
          boxShadow: `
            0 0 7px 3px rgba(200,220,255,0.9),
            0 0 14px 5px rgba(160,180,255,0.5),
            5px 0 0 1px rgba(200,220,255,0.4),
            -5px 0 0 1px rgba(200,220,255,0.4),
            0 5px 0 1px rgba(200,220,255,0.4),
            0 -5px 0 1px rgba(200,220,255,0.4)
          `,
          animation: 'sparkle 6s ease-in-out 3s infinite',
        }}
      />

      {/* 慢速流星 */}
      <div
        className="absolute left-[8%]"
        style={{
          top: '10%',
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 5px 2px rgba(180,200,255,0.8)',
          animation: 'meteorFall 20s linear infinite',
        }}
      />
      <div
        className="absolute left-[35%]"
        style={{
          top: '6%',
          width: '1px',
          height: '1px',
          borderRadius: '50%',
          background: '#ffe0f0',
          boxShadow: '0 0 4px 1px rgba(255,180,220,0.7)',
          animation: 'meteorFall 25s linear 5s infinite',
        }}
      />
      <div
        className="absolute left-[55%]"
        style={{
          top: '14%',
          width: '1.5px',
          height: '1.5px',
          borderRadius: '50%',
          background: '#e0e0ff',
          boxShadow: '0 0 5px 2px rgba(200,200,255,0.8)',
          animation: 'meteorFall 22s linear 10s infinite',
        }}
      />
      <div
        className="absolute left-[75%]"
        style={{
          top: '4%',
          width: '1px',
          height: '1px',
          borderRadius: '50%',
          background: '#ddeeff',
          boxShadow: '0 0 4px 1px rgba(180,220,255,0.7)',
          animation: 'meteorFall 28s linear 15s infinite',
        }}
      />
    </div>
  )
}
