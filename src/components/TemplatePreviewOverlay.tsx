'use client'

import { useEffect } from 'react'

interface Props {
  templateId: string
  templateName: string
  onClose: () => void
  onSelect: () => void
}

export default function TemplatePreviewOverlay({ templateId, templateName, onClose, onSelect }: Props) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative z-10 flex flex-col h-full max-w-5xl mx-auto w-full my-4 mx-4 sm:mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0C0A09] border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-[#FAFAF9] opacity-40 hover:opacity-100 transition-opacity text-xl leading-none p-1"
              aria-label="Close preview"
            >
              ←
            </button>
            <p className="text-[#FAFAF9] opacity-60 text-xs tracking-widest uppercase">
              Preview: <span className="text-[#A16207]">{templateName}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-[#FAFAF9] opacity-30 text-xs hidden sm:block">
              This is a demo with sample data
            </p>
            <button
              onClick={onSelect}
              className="px-6 py-2 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors"
            >
              Use This Template
            </button>
          </div>
        </div>

        {/* iframe */}
        <div className="flex-1 overflow-hidden bg-[#0C0A09]">
          <iframe
            src={`/preview/${templateId}`}
            className="w-full h-full border-0"
            title={`Preview of ${templateName}`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}
