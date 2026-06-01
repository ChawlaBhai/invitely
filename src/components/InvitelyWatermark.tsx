'use client'

import Link from 'next/link'

interface Props {
  tier?: 'classic' | 'premium' | 'luxury'
}

export default function InvitelyWatermark({ tier = 'classic' }: Props) {
  if (tier !== 'classic') return null // premium+ invites have no watermark

  return (
    <div className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <Link
        href="https://invitely.in"
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-widest uppercase transition-all duration-300 hover:opacity-80"
        style={{
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(8px)',
          color: 'rgba(255,255,255,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span style={{ color: '#A16207', opacity: 0.8 }}>✦</span>
        Made with Invitely
      </Link>
    </div>
  )
}
