'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function GalleryNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-5 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
      <span className="font-['Great_Vibes'] text-2xl text-[#FAFAF9]">Invitely</span>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-6">
        <a href="#templates" className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">Templates</a>
        <a href="#how" className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">How It Works</a>
        <a href="/for-planners" className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">For Planners</a>
        
        <a href="/my-invites" className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">My Invites</a>
        <a href="/builder" className="px-5 py-2 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors duration-300">
          Create Invite
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px bg-[#FAFAF9] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-px bg-[#FAFAF9] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-[#FAFAF9] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0C0A09]/98 backdrop-blur-xl border-b border-white/5 py-6 px-6 flex flex-col gap-5">
          <a href="#templates" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-60">Templates</a>
          <a href="#how" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-60">How It Works</a>
          <a href="/for-planners" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-60">For Planners</a>
          
          <a href="/my-invites" onClick={() => setOpen(false)} className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-60">My Invites</a>
          <a href="/builder" className="px-6 py-3 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold text-center">
            Create Invite
          </a>
        </div>
      )}
    </nav>
  )
}
