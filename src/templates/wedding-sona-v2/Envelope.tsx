'use client'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

interface Props {
  onOpen: () => void
  accentColor?: string
  names: [string, string]
}

export default function EnvelopeOpening({ onOpen, accentColor = '#C9A84C', names }: Props) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'done'>('idle')

  const handleClick = () => {
    if (phase !== 'idle') return
    setPhase('opening')

    const tl = gsap.timeline({
      onComplete: () => {
        setPhase('done')
        setTimeout(onOpen, 400)
      }
    })

    // Flap opens
    tl.to('.env-flap', { rotateX: -180, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'top center' })
    // Card slides out
    tl.to('.env-card', { y: -160, opacity: 1, duration: 1, ease: 'expo.out' }, '-=0.4')
    // Envelope fades
    tl.to('.env-wrapper', { scale: 0.85, opacity: 0, duration: 0.6, ease: 'power2.in' }, '-=0.2')
  }

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #1A0A02 0%, #0A0500 100%)' }}>

      {/* Ambient particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none animate-pulse"
          style={{
            width: 3 + (i % 3) * 2, height: 3 + (i % 3) * 2,
            background: accentColor, opacity: 0.15 + (i % 4) * 0.05,
            left: `${5 + i * 4.5}%`, top: `${10 + (i % 5) * 16}%`,
            animationDelay: `${i * 0.3}s`, animationDuration: `${2 + i * 0.2}s`,
          }} />
      ))}

      <div className="text-center mb-10 z-10">
        <p className="text-xs tracking-[0.5em] uppercase mb-2" style={{ color: accentColor, opacity: 0.6 }}>
          आप सादर आमंत्रित हैं
        </p>
        <p className="text-white/30 text-sm tracking-widest">You have received an invitation</p>
      </div>

      {/* Envelope */}
      <div className="env-wrapper relative z-10 cursor-pointer" onClick={handleClick}
        style={{ perspective: '1000px' }}>

        {/* Envelope body */}
        <div className="relative" style={{ width: 320, height: 220 }}>

          {/* Back */}
          <div className="absolute inset-0 rounded-sm"
            style={{ background: 'linear-gradient(135deg, #2A1A08 0%, #1A0E04 100%)', border: `1px solid ${accentColor}30` }} />

          {/* Side triangles */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="none">
            <path d="M0 220 L160 120 L320 220Z" fill="#1E1005" opacity="0.8" />
            <path d="M0 0 L160 100 L0 220Z" fill="#221205" opacity="0.6" />
            <path d="M320 0 L160 100 L320 220Z" fill="#221205" opacity="0.6" />
            {/* Gold border lines */}
            <path d="M0 220 L160 120 L320 220" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.4" />
            <path d="M0 0 L160 100 L0 220" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M320 0 L160 100 L320 220" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.3" />
            {/* Decorative border */}
            <rect x="8" y="8" width="304" height="204" rx="2" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.25" />
          </svg>

          {/* Flap */}
          <div className="env-flap absolute top-0 left-0 right-0 overflow-hidden"
            style={{ height: 120, transformOrigin: 'top center', transformStyle: 'preserve-3d' }}>
            <svg viewBox="0 0 320 120" className="w-full h-full">
              <path d="M0 0 L160 110 L320 0Z" fill="#2A1A08" />
              <path d="M0 0 L160 110 L320 0" stroke={accentColor} strokeWidth="0.5" fill="none" opacity="0.4" />
              {/* Wax seal */}
              <circle cx="160" cy="60" r="22" fill="#8B1A1A" opacity="0.9" />
              <circle cx="160" cy="60" r="18" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.6" />
              <text x="160" y="65" textAnchor="middle" fill={accentColor} fontSize="14" fontFamily="serif" opacity="0.9">✦</text>
            </svg>
          </div>

          {/* Card inside */}
          <div className="env-card absolute left-4 right-4 opacity-0 rounded-sm flex flex-col items-center justify-center py-6"
            style={{ bottom: 10, height: 160, background: 'linear-gradient(135deg, #FDF8F0 0%, #F5EDD8 100%)', border: `1px solid ${accentColor}40` }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: accentColor, fontFamily: 'serif' }}>
              शुभ विवाह
            </p>
            <p className="text-lg font-black tracking-tight" style={{ color: '#2C1810', fontFamily: 'serif' }}>
              {names[0]} & {names[1]}
            </p>
          </div>
        </div>

        {/* Click hint */}
        {phase === 'idle' && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border"
              style={{ borderColor: `${accentColor}40`, background: `${accentColor}10` }}>
              <span className="text-xs tracking-widest uppercase" style={{ color: accentColor }}>
                Click to Open
              </span>
              <span style={{ color: accentColor }}>✦</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
