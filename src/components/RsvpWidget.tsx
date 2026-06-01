'use client'

import { useState } from 'react'

interface Props {
  slug: string
  accentColor?: string
}

export default function RsvpWidget({ slug, accentColor = '#A16207' }: Props) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | 'maybe' | ''>('')
  const [guests, setGuests] = useState('1')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    if (!name.trim() || !attending) { setError('Please fill in your name and attendance.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, name, phone, attending, guests: parseInt(guests), message }),
      })
      if (res.ok) setStep('done')
      else setError('Something went wrong. Please try again.')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* RSVP trigger button — sits above the share bar */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-3 text-xs tracking-widest uppercase font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
          style={{ background: accentColor, color: '#0C0A09', boxShadow: `0 4px 30px ${accentColor}60` }}
        >
          <span>RSVP</span>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-md bg-[#111009] border border-white/10 p-6 sm:p-8">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#FAFAF9] opacity-30 hover:opacity-70 transition-opacity text-xl leading-none"
            >
              ×
            </button>

            {step === 'done' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-3">You're on the list!</h3>
                <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 leading-relaxed">
                  {attending === 'yes'
                    ? "We can't wait to celebrate with you."
                    : attending === 'maybe'
                    ? "We hope you can make it!"
                    : "Thank you for letting us know."}
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-8 py-3 text-xs tracking-widest uppercase font-semibold transition-all"
                  style={{ background: accentColor, color: '#0C0A09' }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2" style={{ color: accentColor }}>
                  RSVP
                </p>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-6">Will you be joining us?</h3>

                <div className="space-y-4">
                  {/* Attendance */}
                  <div>
                    <p className="text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Attendance *</p>
                    <div className="flex gap-2">
                      {[
                        { value: 'yes', label: 'Yes, I\'ll be there!' },
                        { value: 'maybe', label: 'Maybe' },
                        { value: 'no', label: 'Can\'t make it' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setAttending(opt.value as 'yes' | 'no' | 'maybe')}
                          className="flex-1 py-2 text-xs tracking-wider uppercase transition-all duration-200"
                          style={{
                            border: `1px solid ${attending === opt.value ? accentColor : 'rgba(255,255,255,0.1)'}`,
                            color: attending === opt.value ? accentColor : 'rgba(255,255,255,0.4)',
                            background: attending === opt.value ? `${accentColor}15` : 'transparent',
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Your Name *</label>
                    <input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none transition-colors placeholder:opacity-20"
                      style={{ borderColor: name ? `${accentColor}40` : undefined }}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Phone (optional)</label>
                    <input
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none transition-colors placeholder:opacity-20"
                    />
                  </div>

                  {/* Guests */}
                  {attending === 'yes' && (
                    <div>
                      <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Number of Guests</label>
                      <select
                        value={guests}
                        onChange={e => setGuests(e.target.value)}
                        className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none"
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Message (optional)</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Can't wait to celebrate with you!"
                      rows={2}
                      className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none resize-none placeholder:opacity-20"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 text-xs">{error}</p>
                  )}

                  <button
                    onClick={submit}
                    disabled={loading}
                    className="w-full py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 disabled:opacity-50"
                    style={{ background: accentColor, color: '#0C0A09' }}
                  >
                    {loading ? 'Sending...' : 'Send RSVP'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
