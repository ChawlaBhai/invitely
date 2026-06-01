'use client'

import { useState } from 'react'

export interface FontPair {
  id: string
  label: string
  display: string
  script: string
  body: string
  preview: string
}

const FONT_PAIRS: FontPair[] = [
  { id: 'classic', label: 'Classic Luxury', display: 'Playfair Display', script: 'Great Vibes', body: 'Cormorant Infant', preview: 'Aa' },
  { id: 'cinzel', label: 'Celestial', display: 'Cinzel', script: 'Great Vibes', body: 'Raleway', preview: 'Aa' },
  { id: 'josefin', label: 'Modern Clean', display: 'Josefin Sans', script: 'Dancing Script', body: 'Lato', preview: 'Aa' },
  { id: 'abril', label: 'Bold & Warm', display: 'Abril Fatface', script: 'Pacifico', body: 'Nunito', preview: 'Aa' },
  { id: 'cormorant', label: 'Refined Serif', display: 'Cormorant Garamond', script: 'Pinyon Script', body: 'Lora', preview: 'Aa' },
  { id: 'im-fell', label: 'Heritage', display: 'IM Fell English', script: 'Pinyon Script', body: 'Crimson Text', preview: 'Aa' },
]

interface Props {
  value?: { display?: string; script?: string; body?: string }
  onChange: (fonts: { display: string; script: string; body: string }) => void
  accentColor?: string
}

export default function FontPicker({ value, onChange, accentColor = '#A16207' }: Props) {
  const currentId = FONT_PAIRS.find(p =>
    p.display === value?.display || p.script === value?.script
  )?.id ?? 'classic'

  return (
    <div>
      <label className="block text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase mb-3">Typography</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {FONT_PAIRS.map(pair => (
          <button
            key={pair.id}
            onClick={() => onChange({ display: pair.display, script: pair.script, body: pair.body })}
            className="p-3 border text-left transition-all duration-200"
            style={{
              borderColor: currentId === pair.id ? accentColor : 'rgba(255,255,255,0.1)',
              background: currentId === pair.id ? `${accentColor}10` : '#111009',
            }}
          >
            <p className="text-2xl mb-1" style={{ fontFamily: `'${pair.script}', cursive`, color: '#FAFAF9' }}>
              {pair.preview}
            </p>
            <p className="text-[10px] tracking-widest uppercase" style={{ color: currentId === pair.id ? accentColor : 'rgba(255,255,255,0.4)' }}>
              {pair.label}
            </p>
            <p className="text-[9px] opacity-30 mt-0.5" style={{ color: '#FAFAF9' }}>
              {pair.display}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
