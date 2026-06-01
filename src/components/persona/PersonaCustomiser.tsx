'use client'

import { useState } from 'react'
import { PersonaAppearance, SkinTone, HairStyle, OutfitStyle } from '@/types/invitation'
import ManPersona from './ManPersona'
import WomanPersona from './WomanPersona'

const SKIN_TONES: { id: SkinTone; label: string; swatch: string }[] = [
  { id: 'fair',   label: 'Fair',   swatch: '#FDDBB4' },
  { id: 'light',  label: 'Light',  swatch: '#F5C89A' },
  { id: 'medium', label: 'Medium', swatch: '#D4956A' },
  { id: 'tan',    label: 'Tan',    swatch: '#C07840' },
  { id: 'deep',   label: 'Deep',   swatch: '#7A4520' },
]

const HAIR_STYLES_WOMAN: { id: HairStyle; label: string }[] = [
  { id: 'long',   label: 'Long' },
  { id: 'bun',    label: 'Bun' },
  { id: 'braid',  label: 'Braid' },
  { id: 'curly',  label: 'Curly' },
  { id: 'medium', label: 'Medium' },
  { id: 'short',  label: 'Short' },
]

const HAIR_STYLES_MAN: { id: HairStyle; label: string }[] = [
  { id: 'short',  label: 'Short' },
  { id: 'medium', label: 'Medium' },
  { id: 'curly',  label: 'Curly' },
]

const OUTFIT_STYLES: { id: OutfitStyle; label: string }[] = [
  { id: 'traditional',  label: 'Traditional' },
  { id: 'indo-western', label: 'Indo-Western' },
  { id: 'modern',       label: 'Modern' },
  { id: 'casual',       label: 'Casual' },
]

const HAIR_COLORS = [
  { label: 'Jet Black',    value: '#1A0A00' },
  { label: 'Dark Brown',   value: '#2C1810' },
  { label: 'Brown',        value: '#5C3317' },
  { label: 'Auburn',       value: '#7B3F00' },
  { label: 'Dark Grey',    value: '#3D3D3D' },
]

const OUTFIT_COLORS = [
  { label: 'Noir',         value: '#1C1917' },
  { label: 'Crimson',      value: '#8B1A1A' },
  { label: 'Royal Blue',   value: '#1E3A8A' },
  { label: 'Forest',       value: '#14532D' },
  { label: 'Burgundy',     value: '#6B1A2A' },
  { label: 'Ivory',        value: '#F5F0E8' },
  { label: 'Teal',         value: '#0F4C5C' },
  { label: 'Plum',         value: '#4A1942' },
]

const ACCENT_COLORS = [
  { label: 'Gold',         value: '#A16207' },
  { label: 'Silver',       value: '#9CA3AF' },
  { label: 'Rose Gold',    value: '#C2847A' },
  { label: 'Copper',       value: '#B87333' },
]

const DEFAULT_WOMAN: PersonaAppearance = {
  skinTone: 'medium',
  hairColor: '#2C1810',
  hairStyle: 'long',
  outfitColor: '#8B1A1A',
  outfitStyle: 'traditional',
  accentColor: '#A16207',
}

const DEFAULT_MAN: PersonaAppearance = {
  skinTone: 'tan',
  hairColor: '#1A0A00',
  hairStyle: 'short',
  outfitColor: '#1C1917',
  outfitStyle: 'indo-western',
  accentColor: '#A16207',
}

interface Props {
  gender: 'man' | 'woman'
  initial?: PersonaAppearance
  onChange: (appearance: PersonaAppearance) => void
  accentColor?: string
}

function ColorSwatch({ color, selected, onClick, label }: {
  color: string; selected: boolean; onClick: () => void; label: string
}) {
  return (
    <button
      onClick={onClick}
      title={label}
      className="relative w-7 h-7 rounded-full transition-all duration-200 hover:scale-110"
      style={{
        background: color,
        boxShadow: selected ? `0 0 0 2px #0C0A09, 0 0 0 4px ${color}` : 'none',
        border: color === '#F5F0E8' ? '1px solid rgba(255,255,255,0.2)' : 'none',
      }}
      aria-label={label}
      aria-pressed={selected}
    />
  )
}

export default function PersonaCustomiser({ gender, initial, onChange, accentColor = '#A16207' }: Props) {
  const [appearance, setAppearance] = useState<PersonaAppearance>(
    initial ?? (gender === 'woman' ? DEFAULT_WOMAN : DEFAULT_MAN)
  )

  function update(patch: Partial<PersonaAppearance>) {
    const next = { ...appearance, ...patch }
    setAppearance(next)
    onChange(next)
  }

  const hairStyles = gender === 'woman' ? HAIR_STYLES_WOMAN : HAIR_STYLES_MAN

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start">

      {/* Live preview */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div
          className="relative w-48 h-64 flex items-end justify-center rounded-sm overflow-hidden"
          style={{ background: `radial-gradient(ellipse at center, ${accentColor}10 0%, #111009 70%)` }}
        >
          <div className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `linear-gradient(${accentColor} 1px, transparent 1px), linear-gradient(90deg, ${accentColor} 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          />
          {gender === 'woman'
            ? <WomanPersona appearance={appearance} className="w-36 relative z-10" animated={false} />
            : <ManPersona appearance={appearance} className="w-36 relative z-10" animated={false} />
          }
        </div>
        <p className="mt-3 text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase">Live Preview</p>
      </div>

      {/* Controls */}
      <div className="flex-1 space-y-6 min-w-0">

        {/* Skin tone */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Skin Tone</p>
          <div className="flex gap-3 flex-wrap">
            {SKIN_TONES.map(s => (
              <button
                key={s.id}
                onClick={() => update({ skinTone: s.id })}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div
                  className="w-8 h-8 rounded-full transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: s.swatch,
                    boxShadow: appearance.skinTone === s.id
                      ? `0 0 0 2px #0C0A09, 0 0 0 4px ${accentColor}`
                      : 'none',
                  }}
                />
                <span className="text-[9px] tracking-wider uppercase text-[#FAFAF9] opacity-30 group-hover:opacity-60">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Hair style */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Hair Style</p>
          <div className="flex gap-2 flex-wrap">
            {hairStyles.map(h => (
              <button
                key={h.id}
                onClick={() => update({ hairStyle: h.id })}
                className="px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-200"
                style={{
                  border: `1px solid ${appearance.hairStyle === h.id ? accentColor : 'rgba(255,255,255,0.1)'}`,
                  color: appearance.hairStyle === h.id ? accentColor : 'rgba(255,255,255,0.4)',
                  background: appearance.hairStyle === h.id ? `${accentColor}15` : 'transparent',
                }}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hair color */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Hair Color</p>
          <div className="flex gap-3 flex-wrap">
            {HAIR_COLORS.map(c => (
              <ColorSwatch
                key={c.value}
                color={c.value}
                selected={appearance.hairColor === c.value}
                onClick={() => update({ hairColor: c.value })}
                label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Outfit style */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Outfit Style</p>
          <div className="flex gap-2 flex-wrap">
            {OUTFIT_STYLES.map(o => (
              <button
                key={o.id}
                onClick={() => update({ outfitStyle: o.id })}
                className="px-3 py-1.5 text-xs tracking-wider uppercase transition-all duration-200"
                style={{
                  border: `1px solid ${appearance.outfitStyle === o.id ? accentColor : 'rgba(255,255,255,0.1)'}`,
                  color: appearance.outfitStyle === o.id ? accentColor : 'rgba(255,255,255,0.4)',
                  background: appearance.outfitStyle === o.id ? `${accentColor}15` : 'transparent',
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        {/* Outfit color */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Outfit Color</p>
          <div className="flex gap-3 flex-wrap">
            {OUTFIT_COLORS.map(c => (
              <ColorSwatch
                key={c.value}
                color={c.value}
                selected={appearance.outfitColor === c.value}
                onClick={() => update({ outfitColor: c.value })}
                label={c.label}
              />
            ))}
          </div>
        </div>

        {/* Accent / jewelry */}
        <div>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Jewellery & Accents</p>
          <div className="flex gap-3 flex-wrap">
            {ACCENT_COLORS.map(c => (
              <ColorSwatch
                key={c.value}
                color={c.value}
                selected={appearance.accentColor === c.value}
                onClick={() => update({ accentColor: c.value })}
                label={c.label}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
