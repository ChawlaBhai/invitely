'use client'

// Marigold garland SVG component
export function MarigoldGarland({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 400 80" className={className} style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      {/* String */}
      <path d="M0 20 Q100 35 200 20 Q300 5 400 20" stroke="#8B6914" strokeWidth="1" fill="none" opacity="0.6" />
      {/* Marigold flowers */}
      {[20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((x, i) => {
        const y = i % 2 === 0 ? 22 : 18
        const color = i % 3 === 0 ? '#E8A020' : i % 3 === 1 ? '#F4C430' : '#D4780A'
        return (
          <g key={i} transform={`translate(${x}, ${y})`}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
              <ellipse key={j} cx={Math.cos(angle * Math.PI / 180) * 7} cy={Math.sin(angle * Math.PI / 180) * 7}
                rx="4" ry="2.5" fill={color} opacity="0.85"
                transform={`rotate(${angle}, ${Math.cos(angle * Math.PI / 180) * 7}, ${Math.sin(angle * Math.PI / 180) * 7})`} />
            ))}
            <circle cx="0" cy="0" r="4" fill="#F4C430" />
            <circle cx="0" cy="0" r="2" fill="#E8A020" />
          </g>
        )
      })}
      {/* Leaves */}
      {[40, 120, 200, 280, 360].map((x, i) => (
        <g key={i} transform={`translate(${x}, 30)`}>
          <ellipse cx="0" cy="0" rx="8" ry="3" fill="#2D6A2D" opacity="0.7" transform="rotate(-20)" />
          <ellipse cx="0" cy="0" rx="8" ry="3" fill="#2D6A2D" opacity="0.7" transform="rotate(20)" />
        </g>
      ))}
    </svg>
  )
}

// Lotus flower SVG
export function Lotus({ size = 60, color = '#E8A020', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 80" width={size} height={size * 0.8} className={className}>
      {/* Outer petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <ellipse key={i} cx={50 + Math.cos((angle - 90) * Math.PI / 180) * 22}
          cy={40 + Math.sin((angle - 90) * Math.PI / 180) * 18}
          rx="10" ry="16" fill={color} opacity="0.6"
          transform={`rotate(${angle}, ${50 + Math.cos((angle - 90) * Math.PI / 180) * 22}, ${40 + Math.sin((angle - 90) * Math.PI / 180) * 18})`} />
      ))}
      {/* Inner petals */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={i} cx={50 + Math.cos((angle - 90) * Math.PI / 180) * 14}
          cy={40 + Math.sin((angle - 90) * Math.PI / 180) * 12}
          rx="8" ry="13" fill={color} opacity="0.85"
          transform={`rotate(${angle}, ${50 + Math.cos((angle - 90) * Math.PI / 180) * 14}, ${40 + Math.sin((angle - 90) * Math.PI / 180) * 12})`} />
      ))}
      {/* Center */}
      <circle cx="50" cy="40" r="10" fill="#F4C430" />
      <circle cx="50" cy="40" r="6" fill="#E8A020" />
      {/* Water */}
      <ellipse cx="50" cy="68" rx="30" ry="6" fill="#1A4A6A" opacity="0.3" />
      <path d="M20 68 Q50 62 80 68" stroke="#1A4A6A" strokeWidth="1" fill="none" opacity="0.4" />
    </svg>
  )
}

// Paisley border
export function PaisleyBorder({ className = '', color = '#C9A84C' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 600 40" className={className} preserveAspectRatio="none">
      {/* Main border line */}
      <line x1="0" y1="20" x2="600" y2="20" stroke={color} strokeWidth="0.5" opacity="0.4" />
      {/* Paisley motifs */}
      {[50, 150, 250, 350, 450, 550].map((x, i) => (
        <g key={i} transform={`translate(${x}, 20)`}>
          <path d="M0 -8 C4 -12 10 -10 8 -4 C6 2 0 4 -2 0 C-4 -4 -2 -8 0 -8Z" fill={color} opacity="0.5" />
          <circle cx="0" cy="-4" r="2" fill={color} opacity="0.6" />
        </g>
      ))}
      {/* Diamond accents */}
      {[100, 200, 300, 400, 500].map((x, i) => (
        <polygon key={i} points={`${x},16 ${x + 4},20 ${x},24 ${x - 4},20`} fill={color} opacity="0.35" />
      ))}
    </svg>
  )
}

// Diya (oil lamp) component
export function Diya({ className = '', animated = true }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 40 50" className={className}>
      {/* Flame */}
      <ellipse cx="20" cy="12" rx="4" ry="7" fill="#FCD34D" opacity="0.9"
        style={animated ? { animation: 'diya-flicker 0.5s ease-in-out infinite alternate' } : {}} />
      <ellipse cx="20" cy="14" rx="2.5" ry="5" fill="#F97316" opacity="0.8"
        style={animated ? { animation: 'diya-flicker 0.4s ease-in-out infinite alternate', animationDelay: '0.1s' } : {}} />
      <ellipse cx="20" cy="16" rx="1.5" ry="3" fill="#EF4444" opacity="0.7" />
      {/* Glow */}
      <ellipse cx="20" cy="14" rx="8" ry="8" fill="#FCD34D" opacity="0.1"
        style={animated ? { animation: 'diya-glow 1s ease-in-out infinite alternate' } : {}} />
      {/* Wick */}
      <line x1="20" y1="20" x2="20" y2="24" stroke="#92400E" strokeWidth="1" />
      {/* Oil */}
      <ellipse cx="20" cy="26" rx="10" ry="4" fill="#D97706" opacity="0.6" />
      {/* Diya body */}
      <path d="M10 26 Q8 38 20 40 Q32 38 30 26Z" fill="#92400E" />
      <path d="M10 26 Q8 38 20 40 Q32 38 30 26Z" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />
      {/* Decorative dots */}
      <circle cx="15" cy="34" r="1" fill="#C9A84C" opacity="0.5" />
      <circle cx="20" cy="36" r="1" fill="#C9A84C" opacity="0.5" />
      <circle cx="25" cy="34" r="1" fill="#C9A84C" opacity="0.5" />
      <style>{`
        @keyframes diya-flicker { 0% { transform: scaleX(1) scaleY(1); } 100% { transform: scaleX(0.85) scaleY(1.1); } }
        @keyframes diya-glow { 0% { opacity: 0.08; } 100% { opacity: 0.18; } }
      `}</style>
    </svg>
  )
}

// Mandala ornament
export function MandalaOrnament({ size = 120, color = '#C9A84C', className = '' }: { size?: number; color?: string; className?: string }) {
  const rings = [0.45, 0.35, 0.25, 0.15]
  const c = size / 2
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      {/* Outer petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const r = c * 0.45
        const x = c + r * Math.cos(angle * Math.PI / 180)
        const y = c + r * Math.sin(angle * Math.PI / 180)
        return <ellipse key={i} cx={x} cy={y} rx={c * 0.06} ry={c * 0.12} fill={color} opacity="0.5"
          transform={`rotate(${angle}, ${x}, ${y})`} />
      })}
      {/* Mid ring petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12
        const r = c * 0.32
        const x = c + r * Math.cos(angle * Math.PI / 180)
        const y = c + r * Math.sin(angle * Math.PI / 180)
        return <ellipse key={i} cx={x} cy={y} rx={c * 0.05} ry={c * 0.09} fill={color} opacity="0.6"
          transform={`rotate(${angle + 15}, ${x}, ${y})`} />
      })}
      {/* Inner petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8
        const r = c * 0.18
        const x = c + r * Math.cos(angle * Math.PI / 180)
        const y = c + r * Math.sin(angle * Math.PI / 180)
        return <ellipse key={i} cx={x} cy={y} rx={c * 0.04} ry={c * 0.08} fill={color} opacity="0.7"
          transform={`rotate(${angle}, ${x}, ${y})`} />
      })}
      {/* Concentric circles */}
      {rings.map((r, i) => (
        <circle key={i} cx={c} cy={c} r={c * r} fill="none" stroke={color} strokeWidth="0.5" opacity="0.4"
          strokeDasharray={`${c * r * 0.15} ${c * r * 0.05}`} />
      ))}
      <circle cx={c} cy={c} r={c * 0.06} fill={color} opacity="0.8" />
      <circle cx={c} cy={c} r={c * 0.03} fill={color} opacity="1" />
    </svg>
  )
}

// Ganesha silhouette (simplified SVG)
export function GaneshaSilhouette({ size = 80, color = '#C9A84C', className = '' }: { size?: number; color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 80 100" width={size} height={size * 1.25} className={className}>
      {/* Body */}
      <ellipse cx="40" cy="65" rx="22" ry="28" fill={color} opacity="0.7" />
      {/* Head */}
      <circle cx="40" cy="38" r="18" fill={color} opacity="0.8" />
      {/* Trunk */}
      <path d="M40 50 Q28 58 30 70 Q32 78 38 76" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Ears */}
      <ellipse cx="22" cy="36" rx="10" ry="14" fill={color} opacity="0.6" />
      <ellipse cx="58" cy="36" rx="10" ry="14" fill={color} opacity="0.6" />
      {/* Crown */}
      <path d="M26 24 L30 14 L35 22 L40 10 L45 22 L50 14 L54 24" stroke={color} strokeWidth="2" fill="none" opacity="0.9" />
      {/* Eyes */}
      <circle cx="34" cy="34" r="3" fill="white" opacity="0.9" />
      <circle cx="46" cy="34" r="3" fill="white" opacity="0.9" />
      <circle cx="35" cy="34" r="1.5" fill="#2C1810" />
      <circle cx="47" cy="34" r="1.5" fill="#2C1810" />
      {/* Tusk */}
      <path d="M44 48 Q52 52 50 60" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.8" />
      {/* Arms */}
      <path d="M18 60 Q10 50 14 42" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M62 60 Q70 50 66 42" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Lotus base */}
      <ellipse cx="40" cy="96" rx="20" ry="6" fill={color} opacity="0.4" />
    </svg>
  )
}
