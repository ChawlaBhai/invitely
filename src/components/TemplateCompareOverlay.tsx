'use client'

import { useEffect } from 'react'
import { TemplateConfig } from '@/types/invitation'
import Link from 'next/link'

interface Props {
  templates: [TemplateConfig, TemplateConfig]
  onClose: () => void
}

export default function TemplateCompareOverlay({ templates, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0C0A09]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 flex-shrink-0 bg-[#0C0A09]">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="text-[#FAFAF9] opacity-40 hover:opacity-100 transition-opacity text-xl">←</button>
          <p className="text-[#FAFAF9] opacity-50 text-xs tracking-widest uppercase">Comparing</p>
        </div>
        <div className="flex items-center gap-6">
          {templates.map(t => (
            <div key={t.id} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: t.accentColor }} />
              <span className="text-[#FAFAF9] text-sm font-['Playfair_Display']">{t.name}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {templates.map(t => (
            <Link key={t.id} href={`/builder?template=${t.id}`}
              className="px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all"
              style={{ background: t.accentColor, color: '#0C0A09' }}>
              Use {t.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Split iframes */}
      <div className="flex-1 flex overflow-hidden">
        {templates.map((t, i) => (
          <div key={t.id} className="flex-1 flex flex-col overflow-hidden" style={{ borderRight: i === 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between flex-shrink-0"
              style={{ background: `${t.accentColor}10` }}>
              <p className="text-xs tracking-widest uppercase" style={{ color: t.accentColor }}>{t.name}</p>
              <p className="text-[#FAFAF9] opacity-30 text-xs">{t.vibe.replace(/-/g, ' ')}</p>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`/preview/${t.id}`}
                className="w-full h-full border-0"
                title={`Preview of ${t.name}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
