'use client'

import { useState } from 'react'

export default function EmailCaptureBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function subscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'gallery-banner' }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="border border-[#A16207] border-opacity-20 bg-[#A16207] bg-opacity-5 px-6 py-4 text-center">
        <p className="text-[#A16207] text-sm font-['Cormorant_Infant']">
          ✦ You're on the list. We'll let you know when new templates drop.
        </p>
      </div>
    )
  }

  return (
    <div className="border border-white/5 bg-[#111009] px-6 py-5">
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="font-['Playfair_Display'] text-[#FAFAF9] text-sm mb-0.5">New templates dropping soon</p>
          <p className="text-[#FAFAF9] opacity-40 text-xs font-['Cormorant_Infant']">Get notified when we add new designs</p>
        </div>
        <form onSubmit={subscribe} className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 sm:w-48 bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-3 py-2 text-xs focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all disabled:opacity-40"
            style={{ background: '#A16207', color: '#0C0A09' }}
          >
            {status === 'loading' ? '...' : 'Notify Me'}
          </button>
        </form>
        {status === 'error' && <p className="text-red-400 text-xs">Something went wrong.</p>}
      </div>
    </div>
  )
}
