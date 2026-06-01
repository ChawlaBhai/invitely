'use client'

import { useState } from 'react'

interface Props {
  slug: string
  accentColor?: string
  onUnlock: () => void
}

export default function InvitePasswordGate({ slug, accentColor = '#A16207', onUnlock }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!password.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/invite-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, password }),
      })
      const json = await res.json()
      if (json.valid) {
        onUnlock()
      } else {
        setError('Incorrect password. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0C0A09] flex flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />

      <div className="relative z-10 max-w-sm w-full">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 opacity-30" style={{ background: accentColor }} />
          <span className="text-2xl opacity-60" style={{ color: accentColor }}>✦</span>
          <div className="h-px w-12 opacity-30" style={{ background: accentColor }} />
        </div>

        <p className="tracking-[0.4em] text-xs uppercase mb-4 opacity-70" style={{ color: accentColor }}>
          Private Invitation
        </p>
        <h1 className="font-['Playfair_Display'] text-3xl text-[#FAFAF9] mb-3">
          This invite is password protected
        </h1>
        <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mb-10">
          Enter the password shared by the host to view this invitation.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            autoFocus
            className="w-full bg-[#111009] border border-white/10 text-[#FAFAF9] px-5 py-4 text-sm focus:outline-none transition-colors placeholder:opacity-30 text-center tracking-widest"
            style={{ borderColor: error ? '#DC2626' : undefined }}
          />
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="w-full py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 disabled:opacity-40"
            style={{ background: accentColor, color: '#0C0A09' }}
          >
            {loading ? 'Checking...' : 'View Invitation'}
          </button>
        </form>

        <div className="mt-12">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-15">Invitely</p>
        </div>
      </div>
    </div>
  )
}
