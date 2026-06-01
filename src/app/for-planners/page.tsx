'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForPlannersPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, company, message }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <Link href="/" className="text-lg font-black tracking-tight">Invitely</Link>
        <Link href="/builder" className="px-6 py-2.5 bg-white text-black text-[11px] tracking-[0.15em] uppercase font-black hover:bg-[#FFD93D] transition-colors duration-300">
          Create Invite
        </Link>
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="w-full max-w-xl">
          {status === 'sent' ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-6">✦</p>
              <h2 className="text-3xl font-black mb-4">Message received.</h2>
              <p className="text-white/40 text-lg mb-8">We'll get back to you within 24 hours.</p>
              <Link href="/" className="text-white/40 text-sm tracking-widest uppercase hover:text-white transition-colors">← Back to Home</Link>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <Link href="/" className="text-white/30 text-xs tracking-widest uppercase hover:text-white/60 transition-colors mb-8 block">← Back</Link>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-4">
                  Work with<br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FFD93D, #FF6B6B)' }}>Invitely</span>
                </h1>
                <p className="text-white/40 text-lg leading-relaxed">
                  Wedding planners, event companies, photographers — let's talk about how Invitely can work for your clients.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-[11px] tracking-widest uppercase mb-2">Name *</label>
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" />
                  </div>
                  <div>
                    <label className="block text-white/30 text-[11px] tracking-widest uppercase mb-2">Email *</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-[11px] tracking-widests uppercase mb-2">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" />
                  </div>
                  <div>
                    <label className="block text-white/30 text-[11px] tracking-widest uppercase mb-2">Company</label>
                    <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Your company"
                      className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-white/30 text-[11px] tracking-widest uppercase mb-2">Message *</label>
                  <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} required
                    placeholder="Tell us about your business and what you're looking for..."
                    className="w-full bg-white/[0.04] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-white/20" />
                </div>
                {status === 'error' && <p className="text-red-400 text-sm">Something went wrong. Email us directly at hello@invitely.in</p>}
                <button type="submit" disabled={status === 'sending'}
                  className="w-full py-4 bg-white text-black text-sm font-black tracking-[0.1em] uppercase hover:bg-[#FFD93D] transition-colors duration-300 disabled:opacity-40">
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                <p className="text-white/20 text-xs text-center">Or email us directly: hello@invitely.in</p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
