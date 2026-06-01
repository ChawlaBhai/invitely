'use client'

interface Props {
  size?: number
  color?: string
  opacity?: number
  className?: string
  animated?: boolean
}

export default function Mandala({ size = 300, color = '#A16207', opacity = 0.15, className = '', animated = true }: Props) {
  const c = size / 2
  const rings = [0.45, 0.35, 0.25, 0.15]

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`${className} ${animated ? 'animate-spin-slow' : ''}`}
      style={{ animationDuration: '60s' }}
      aria-hidden="true"
    >
      {/* Outer ring petals */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const r = c * 0.45
        const x = c + r * Math.cos((angle * Math.PI) / 180)
        const y = c + r * Math.sin((angle * Math.PI) / 180)
        return (
          <ellipse
            key={`outer-${i}`}
            cx={x} cy={y}
            rx={c * 0.06} ry={c * 0.12}
            fill={color}
            opacity={opacity}
            transform={`rotate(${angle}, ${x}, ${y})`}
          />
        )
      })}

      {/* Mid ring */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12
        const r = c * 0.32
        const x = c + r * Math.cos((angle * Math.PI) / 180)
        const y = c + r * Math.sin((angle * Math.PI) / 180)
        return (
          <ellipse
            key={`mid-${i}`}
            cx={x} cy={y}
            rx={c * 0.05} ry={c * 0.1}
            fill={color}
            opacity={opacity * 1.2}
            transform={`rotate(${angle + 15}, ${x}, ${y})`}
          />
        )
      })}

      {/* Inner ring */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 360) / 8
        const r = c * 0.18
        const x = c + r * Math.cos((angle * Math.PI) / 180)
        const y = c + r * Math.sin((angle * Math.PI) / 180)
        return (
          <ellipse
            key={`inner-${i}`}
            cx={x} cy={y}
            rx={c * 0.04} ry={c * 0.08}
            fill={color}
            opacity={opacity * 1.5}
            transform={`rotate(${angle}, ${x}, ${y})`}
          />
        )
      })}

      {/* Concentric circles */}
      {rings.map((r, i) => (
        <circle
          key={`ring-${i}`}
          cx={c} cy={c}
          r={c * r}
          fill="none"
          stroke={color}
          strokeWidth="0.5"
          opacity={opacity * 0.8}
          strokeDasharray={`${c * r * 0.15} ${c * r * 0.05}`}
        />
      ))}

      {/* Center */}
      <circle cx={c} cy={c} r={c * 0.06} fill={color} opacity={opacity * 2} />
      <circle cx={c} cy={c} r={c * 0.03} fill={color} opacity={opacity * 3} />
    </svg>
  )
}
