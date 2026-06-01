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

export default function WomanPersona({ appearance, animated = true, className = '' }: Props) {
  const skin = SKIN_TONES[appearance.skinTone] || SKIN_TONES.medium
  const hair = appearance.hairColor || '#2C1810'
  const outfit = appearance.outfitColor || '#8B1A1A'
  const accent = appearance.accentColor || '#A16207'

  const isTraditional = appearance.outfitStyle === 'traditional' || appearance.outfitStyle === 'indo-western'

  return (
    <svg
      viewBox="0 0 200 380"
      className={`${className} ${animated ? 'persona-animated' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Illustrated woman persona`}
    >
      <defs>
        <radialGradient id="w-face-grad" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={skin.highlight} />
          <stop offset="100%" stopColor={skin.base} />
        </radialGradient>
        <radialGradient id="w-body-grad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={outfit} stopOpacity="0.9" />
          <stop offset="100%" stopColor={outfit} />
        </radialGradient>
        <filter id="w-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Hair back layer */}
      {appearance.hairStyle === 'long' || appearance.hairStyle === 'braid' ? (
        <ellipse cx="100" cy="160" rx="28" ry="90" fill={hair} opacity="0.9" />
      ) : null}
      {appearance.hairStyle === 'bun' ? (
        <circle cx="100" cy="52" r="18" fill={hair} />
      ) : null}

      {/* Neck */}
      <rect x="90" y="118" width="20" height="28" rx="8" fill={skin.base} />

      {/* Body / Outfit */}
      {isTraditional ? (
        <g>
          {/* Saree / lehenga silhouette */}
          <path
            d="M55 145 Q45 200 40 280 Q60 300 100 305 Q140 300 160 280 Q155 200 145 145 Q130 138 100 136 Q70 138 55 145Z"
            fill={`url(#w-body-grad)`}
          />
          {/* Dupatta drape */}
          <path
            d="M60 148 Q50 170 45 200 Q55 195 65 185 Q70 165 75 150Z"
            fill={accent}
            opacity="0.7"
          />
          <path
            d="M140 148 Q150 170 155 200 Q145 195 135 185 Q130 165 125 150Z"
            fill={accent}
            opacity="0.7"
          />
          {/* Blouse */}
          <path
            d="M68 145 Q68 168 100 170 Q132 168 132 145 Q116 136 100 135 Q84 136 68 145Z"
            fill={outfit}
            filter="brightness(1.2)"
          />
          {/* Embroidery dots */}
          {[75, 85, 95, 105, 115, 125].map((x, i) => (
            <circle key={i} cx={x} cy={152} r="1.5" fill={accent} opacity="0.8" />
          ))}
          {/* Waist ornament */}
          <path
            d="M78 175 Q100 172 122 175"
            stroke={accent}
            strokeWidth="2"
            fill="none"
            opacity="0.9"
          />
        </g>
      ) : (
        <g>
          {/* Modern dress */}
          <path
            d="M62 145 Q52 200 48 280 Q65 298 100 300 Q135 298 152 280 Q148 200 138 145 Q120 136 100 135 Q80 136 62 145Z"
            fill={`url(#w-body-grad)`}
          />
          {/* Neckline */}
          <path
            d="M80 145 Q100 155 120 145"
            stroke={skin.shadow}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </g>
      )}

      {/* Arms */}
      <path d="M68 148 Q52 175 50 210 Q56 212 62 210 Q65 178 78 155Z" fill={skin.base} />
      <path d="M132 148 Q148 175 150 210 Q144 212 138 210 Q135 178 122 155Z" fill={skin.base} />

      {/* Hands */}
      <ellipse cx="56" cy="215" rx="8" ry="6" fill={skin.base} />
      <ellipse cx="144" cy="215" rx="8" ry="6" fill={skin.base} />

      {/* Bangles */}
      {isTraditional && (
        <>
          <circle cx="56" cy="210" r="7" fill="none" stroke={accent} strokeWidth="2" />
          <circle cx="56" cy="218" r="7" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="144" cy="210" r="7" fill="none" stroke={accent} strokeWidth="2" />
          <circle cx="144" cy="218" r="7" fill="none" stroke={accent} strokeWidth="1.5" />
        </>
      )}

      {/* Face */}
      <ellipse cx="100" cy="95" rx="32" ry="36" fill="url(#w-face-grad)" />

      {/* Jaw softening */}
      <ellipse cx="100" cy="118" rx="22" ry="12" fill={skin.base} />

      {/* Eyes */}
      <ellipse cx="87" cy="90" rx="7" ry="5" fill="#1A0A00" />
      <ellipse cx="113" cy="90" rx="7" ry="5" fill="#1A0A00" />
      {/* Eye whites */}
      <ellipse cx="85" cy="89" rx="3" ry="2.5" fill="white" opacity="0.9" />
      <ellipse cx="111" cy="89" rx="3" ry="2.5" fill="white" opacity="0.9" />
      {/* Eye shine */}
      <circle cx="84" cy="88" r="1.2" fill="white" />
      <circle cx="110" cy="88" r="1.2" fill="white" />
      {/* Eyelashes */}
      <path d="M80 86 Q87 82 94 86" stroke="#1A0A00" strokeWidth="1.5" fill="none" />
      <path d="M106 86 Q113 82 120 86" stroke="#1A0A00" strokeWidth="1.5" fill="none" />
      {/* Eyebrows */}
      <path d="M80 82 Q87 78 94 82" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M106 82 Q113 78 120 82" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M98 95 Q100 102 102 95" stroke={skin.shadow} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="96" cy="103" r="1.5" fill={skin.shadow} opacity="0.3" />
      <circle cx="104" cy="103" r="1.5" fill={skin.shadow} opacity="0.3" />

      {/* Lips */}
      <path d="M90 110 Q100 116 110 110" stroke="#C06060" strokeWidth="1.5" fill="none" />
      <path d="M90 110 Q100 107 110 110" fill="#D07070" opacity="0.8" />
      <path d="M90 110 Q100 116 110 110 Q100 118 90 110Z" fill="#B05050" opacity="0.7" />

      {/* Cheek blush */}
      <ellipse cx="80" cy="100" rx="10" ry="6" fill="#FFB0B0" opacity="0.2" />
      <ellipse cx="120" cy="100" rx="10" ry="6" fill="#FFB0B0" opacity="0.2" />

      {/* Bindi */}
      {isTraditional && (
        <circle cx="100" cy="78" r="3" fill={accent} filter="url(#w-glow)" />
      )}

      {/* Earrings */}
      {isTraditional ? (
        <>
          <circle cx="68" cy="100" r="4" fill={accent} opacity="0.9" />
          <path d="M68 104 L65 114 L68 116 L71 114 Z" fill={accent} opacity="0.8" />
          <circle cx="132" cy="100" r="4" fill={accent} opacity="0.9" />
          <path d="M132 104 L129 114 L132 116 L135 114 Z" fill={accent} opacity="0.8" />
        </>
      ) : (
        <>
          <circle cx="68" cy="100" r="3" fill={accent} opacity="0.7" />
          <circle cx="132" cy="100" r="3" fill={accent} opacity="0.7" />
        </>
      )}

      {/* Necklace */}
      {isTraditional && (
        <path
          d="M80 130 Q100 140 120 130"
          stroke={accent}
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
      )}

      {/* Hair front */}
      {appearance.hairStyle === 'long' && (
        <>
          <path d="M68 75 Q65 95 68 115" stroke={hair} strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M132 75 Q135 95 132 115" stroke={hair} strokeWidth="3" fill="none" opacity="0.6" />
          <path
            d="M68 72 Q100 60 132 72 Q128 58 100 55 Q72 58 68 72Z"
            fill={hair}
          />
        </>
      )}
      {appearance.hairStyle === 'bun' && (
        <>
          <path
            d="M68 72 Q100 60 132 72 Q128 58 100 55 Q72 58 68 72Z"
            fill={hair}
          />
          <circle cx="100" cy="58" r="16" fill={hair} />
          <circle cx="100" cy="52" r="5" fill={accent} opacity="0.6" />
        </>
      )}
      {appearance.hairStyle === 'braid' && (
        <>
          <path
            d="M68 72 Q100 60 132 72 Q128 58 100 55 Q72 58 68 72Z"
            fill={hair}
          />
          <path d="M100 120 Q95 160 98 200 Q100 210 102 200 Q105 160 100 120Z" fill={hair} opacity="0.8" />
        </>
      )}
      {(appearance.hairStyle === 'short' || appearance.hairStyle === 'medium') && (
        <path
          d="M68 72 Q100 60 132 72 Q128 58 100 55 Q72 58 68 72Z"
          fill={hair}
        />
      )}
      {appearance.hairStyle === 'curly' && (
        <>
          <path
            d="M68 72 Q100 60 132 72 Q128 58 100 55 Q72 58 68 72Z"
            fill={hair}
          />
          <circle cx="72" cy="80" r="8" fill={hair} />
          <circle cx="128" cy="80" r="8" fill={hair} />
          <circle cx="80" cy="68" r="7" fill={hair} />
          <circle cx="120" cy="68" r="7" fill={hair} />
        </>
      )}

      {/* Feet / bottom of outfit */}
      <ellipse cx="85" cy="302" rx="12" ry="6" fill={skin.base} opacity="0.6" />
      <ellipse cx="115" cy="302" rx="12" ry="6" fill={skin.base} opacity="0.6" />
    </svg>
  )
}
