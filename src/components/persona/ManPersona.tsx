'use client'

import { PersonaAppearance } from '@/types/invitation'

const SKIN_TONES: Record<string, { base: string; shadow: string; highlight: string }> = {
  fair:   { base: '#FDDBB4', shadow: '#F0C090', highlight: '#FEF0D9' },
  light:  { base: '#F5C89A', shadow: '#E0A870', highlight: '#FCDDB8' },
  medium: { base: '#D4956A', shadow: '#B87040', highlight: '#E8B080' },
  tan:    { base: '#C07840', shadow: '#9A5820', highlight: '#D49060' },
  deep:   { base: '#7A4520', shadow: '#5A2800', highlight: '#9A6040' },
}

interface Props {
  appearance: PersonaAppearance
  animated?: boolean
  className?: string
}

export default function ManPersona({ appearance, animated = true, className = '' }: Props) {
  const skin = SKIN_TONES[appearance.skinTone] || SKIN_TONES.medium
  const hair = appearance.hairColor || '#1A0A00'
  const outfit = appearance.outfitColor || '#1C1917'
  const accent = appearance.accentColor || '#A16207'

  const isTraditional = appearance.outfitStyle === 'traditional' || appearance.outfitStyle === 'indo-western'

  return (
    <svg
      viewBox="0 0 200 380"
      className={`${className} ${animated ? 'persona-animated' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Illustrated man persona"
    >
      <defs>
        <radialGradient id="m-face-grad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={skin.highlight} />
          <stop offset="100%" stopColor={skin.base} />
        </radialGradient>
        <radialGradient id="m-body-grad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={outfit} stopOpacity="0.85" />
          <stop offset="100%" stopColor={outfit} />
        </radialGradient>
        <filter id="m-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Neck */}
      <rect x="88" y="118" width="24" height="30" rx="8" fill={skin.base} />

      {/* Body */}
      {isTraditional ? (
        <g>
          {/* Sherwani / kurta */}
          <path
            d="M50 148 Q42 210 40 285 Q65 302 100 304 Q135 302 160 285 Q158 210 150 148 Q130 138 100 136 Q70 138 50 148Z"
            fill={`url(#m-body-grad)`}
          />
          {/* Collar */}
          <path
            d="M88 136 L92 155 L100 158 L108 155 L112 136"
            fill={outfit}
            stroke={accent}
            strokeWidth="1"
          />
          {/* Button line */}
          {[160, 175, 190, 205, 220].map((y, i) => (
            <circle key={i} cx={100} cy={y} r="2" fill={accent} opacity="0.7" />
          ))}
          {/* Embroidery on chest */}
          <path d="M78 155 Q88 150 100 152 Q112 150 122 155" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" />
          {/* Churidar / pants bottom */}
          <path d="M70 285 Q72 310 80 320 Q88 322 90 310 Q92 295 100 290 Q108 295 110 310 Q112 322 120 320 Q128 310 130 285Z" fill={outfit} />
        </g>
      ) : (
        <g>
          {/* Suit / shirt */}
          <path
            d="M52 148 Q44 210 42 285 Q65 300 100 302 Q135 300 158 285 Q156 210 148 148 Q128 138 100 136 Q72 138 52 148Z"
            fill={`url(#m-body-grad)`}
          />
          {/* Lapels */}
          <path d="M88 136 L80 165 L100 158 L120 165 L112 136 L100 148Z" fill={outfit} stroke="#333" strokeWidth="0.5" />
          {/* Tie */}
          <path d="M97 148 L95 185 L100 192 L105 185 L103 148Z" fill={accent} opacity="0.8" />
          {/* Shirt collar */}
          <path d="M90 136 L94 150 L100 148 L106 150 L110 136" fill="white" opacity="0.9" />
          {/* Trouser line */}
          <path d="M100 240 L100 302" stroke="#111" strokeWidth="1" opacity="0.3" />
        </g>
      )}

      {/* Shoulders — broader than woman */}
      <ellipse cx="52" cy="148" rx="16" ry="10" fill={outfit} />
      <ellipse cx="148" cy="148" rx="16" ry="10" fill={outfit} />

      {/* Arms */}
      <path d="M52 148 Q38 185 36 220 Q44 224 50 220 Q54 188 66 158Z" fill={skin.base} />
      <path d="M148 148 Q162 185 164 220 Q156 224 150 220 Q146 188 134 158Z" fill={skin.base} />

      {/* Sleeves over arms */}
      <path d="M52 148 Q40 182 38 215 Q44 218 50 215 Q54 185 66 158Z" fill={outfit} opacity="0.9" />
      <path d="M148 148 Q160 182 162 215 Q156 218 150 215 Q146 185 134 158Z" fill={outfit} opacity="0.9" />

      {/* Hands */}
      <ellipse cx="44" cy="222" rx="9" ry="7" fill={skin.base} />
      <ellipse cx="156" cy="222" rx="9" ry="7" fill={skin.base} />

      {/* Face — slightly wider/squarer than woman */}
      <ellipse cx="100" cy="93" rx="34" ry="34" fill="url(#m-face-grad)" />
      <path d="M66 100 Q66 118 100 122 Q134 118 134 100Z" fill={skin.base} />

      {/* Ears */}
      <ellipse cx="66" cy="95" rx="6" ry="8" fill={skin.base} />
      <ellipse cx="134" cy="95" rx="6" ry="8" fill={skin.base} />

      {/* Eyes */}
      <ellipse cx="87" cy="90" rx="7" ry="5" fill="#1A0A00" />
      <ellipse cx="113" cy="90" rx="7" ry="5" fill="#1A0A00" />
      <ellipse cx="85" cy="89" rx="2.5" ry="2" fill="white" opacity="0.9" />
      <ellipse cx="111" cy="89" rx="2.5" ry="2" fill="white" opacity="0.9" />
      <circle cx="84" cy="88" r="1.2" fill="white" />
      <circle cx="110" cy="88" r="1.2" fill="white" />

      {/* Eyebrows — thicker/straighter */}
      <path d="M79 82 Q87 79 95 82" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M105 82 Q113 79 121 82" stroke={hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />

      {/* Nose — more defined */}
      <path d="M97 93 Q100 103 103 93" stroke={skin.shadow} strokeWidth="1.2" fill="none" opacity="0.5" />
      <path d="M94 104 Q100 108 106 104" stroke={skin.shadow} strokeWidth="1" fill="none" opacity="0.4" />

      {/* Lips — thinner */}
      <path d="M91 112 Q100 116 109 112" stroke="#A06060" strokeWidth="1.5" fill="none" />
      <path d="M91 112 Q100 109 109 112" fill="#B07070" opacity="0.5" />

      {/* Subtle stubble */}
      {[88, 92, 96, 100, 104, 108, 112].map((x, i) => (
        <circle key={i} cx={x} cy={118 + (i % 2) * 2} r="0.8" fill={hair} opacity="0.25" />
      ))}

      {/* Hair */}
      {appearance.hairStyle === 'short' && (
        <path
          d="M66 80 Q100 62 134 80 Q130 62 100 58 Q70 62 66 80Z"
          fill={hair}
        />
      )}
      {appearance.hairStyle === 'medium' && (
        <>
          <path d="M66 80 Q100 62 134 80 Q130 62 100 58 Q70 62 66 80Z" fill={hair} />
          <path d="M66 80 Q62 95 65 108" stroke={hair} strokeWidth="4" fill="none" opacity="0.7" />
          <path d="M134 80 Q138 95 135 108" stroke={hair} strokeWidth="4" fill="none" opacity="0.7" />
        </>
      )}
      {appearance.hairStyle === 'curly' && (
        <>
          <path d="M66 80 Q100 62 134 80 Q130 62 100 58 Q70 62 66 80Z" fill={hair} />
          <circle cx="75" cy="74" r="7" fill={hair} />
          <circle cx="90" cy="68" r="7" fill={hair} />
          <circle cx="110" cy="68" r="7" fill={hair} />
          <circle cx="125" cy="74" r="7" fill={hair} />
        </>
      )}

      {/* Turban for traditional */}
      {isTraditional && (
        <g>
          <ellipse cx="100" cy="68" rx="36" ry="18" fill={accent} opacity="0.9" />
          <path d="M64 68 Q100 52 136 68 Q130 55 100 50 Q70 55 64 68Z" fill={accent} />
          {/* Turban folds */}
          <path d="M68 65 Q100 58 132 65" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
          <path d="M70 70 Q100 63 130 70" stroke="white" strokeWidth="0.8" fill="none" opacity="0.3" />
          {/* Turban brooch */}
          <circle cx="100" cy="58" r="5" fill={accent} filter="url(#m-glow)" />
          <circle cx="100" cy="58" r="3" fill="white" opacity="0.8" />
        </g>
      )}

      {/* Pocket square for suit */}
      {!isTraditional && (
        <path d="M118 158 L122 158 L122 165 L120 163 L118 165Z" fill="white" opacity="0.8" />
      )}

      {/* Feet */}
      <ellipse cx="83" cy="302" rx="13" ry="7" fill={skin.base} opacity="0.5" />
      <ellipse cx="117" cy="302" rx="13" ry="7" fill={skin.base} opacity="0.5" />
    </svg>
  )
}
