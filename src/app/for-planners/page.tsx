'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

function ContactForm() {
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

  if (status === 'sent') {
    return (
      <div className="text-center py-12 border border-[#A16207] border-opacity-20 bg-[#A16207] bg-opacity-5">
        <p className="text-[#A16207] text-3xl mb-3">✦</p>
        <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-3">Message Received</h3>
        <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50">
          We'll get back to you within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Name *</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Meera Kapoor" required
            className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20" />
        </div>
        <div>
          <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="meera@weddingco.in" required
            className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210"
            className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20" />
        </div>
        <div>
          <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Company</label>
          <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Wedding Co."
            className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors placeholder:opacity-20" />
        </div>
      </div>
      <div>
        <label className="block text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase mb-2">Message *</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} required
          placeholder="Tell us about your business and what you're looking for..."
          className="w-full bg-[#0C0A09] border border-white/10 text-[#FAFAF9] px-4 py-3 text-sm focus:outline-none focus:border-[#A16207] transition-colors resize-none placeholder:opacity-20" />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email us directly.</p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 disabled:opacity-50"
        style={{ background: '#A16207', color: '#0C0A09' }}>
        {status === 'sending' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

const STATS = [
  { value: '23', label: 'Unique Templates' },
  { value: '2min', label: 'To Create an Invite' },
  { value: '∞', label: 'Shares via WhatsApp' },
  { value: '100%', label: 'Mobile Optimised' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '₹999',
    per: 'per invite',
    color: '#64748B',
    features: [
      '1 invite link',
      'All 13 templates',
      'Illustrated personas',
      'WhatsApp shareable',
      'Valid for 90 days',
    ],
    cta: 'Create Now',
    href: '/builder',
    highlight: false,
  },
  {
    name: 'Premium',
    price: '₹2,499',
    per: 'per invite',
    color: '#A16207',
    features: [
      'Everything in Starter',
      'Custom domain slug',
      'Photo gallery section',
      'RSVP tracking dashboard',
      'Valid for 1 year',
      'Priority support',
    ],
    cta: 'Get Premium',
    href: '/builder',
    highlight: true,
  },
  {
    name: 'Planner',
    price: '₹14,999',
    per: 'per month',
    color: '#7C3AED',
    features: [
      'Unlimited invites',
      'White-label option',
      'Client dashboard',
      'Bulk creation tools',
      'Dedicated account manager',
      'Custom template requests',
    ],
    cta: 'Talk to Us',
    href: 'mailto:hello@invitely.in',
    highlight: false,
  },
]

const TESTIMONIALS = [
  {
    quote: 'Our clients were blown away. They shared the link before we even finished the meeting. Three referrals in one week.',
    name: 'Meera Kapoor',
    role: 'Wedding Planner, Mumbai',
    avatar: 'MK',
  },
  {
    quote: 'We used to spend ₹15,000 on printed cards. Now we send an Invitely link and the response rate is 3x higher.',
    name: 'Rahul & Ananya',
    role: 'Couple, Bangalore',
    avatar: 'RA',
  },
  {
    quote: 'The Traditional Indian template made my mother cry. That\'s when I knew this was something special.',
    name: 'Priya Sharma',
    role: 'Bride, Delhi',
    avatar: 'PS',
  },
]

const TEMPLATES_PREVIEW = [
  { name: 'Noir & Gold', vibe: 'Modern Elegant', color: '#A16207', id: 'wedding-modern-elegant' },
  { name: 'Shaadi Rang', vibe: 'Traditional Indian', color: '#DC2626', id: 'wedding-traditional-indian' },
  { name: 'Written in Stars', vibe: 'Celestial', color: '#7C3AED', id: 'wedding-celestial' },
  { name: 'Above the Clouds', vibe: 'Mountain', color: '#4A5568', id: 'wedding-mountain' },
  { name: 'Salt & Sundown', vibe: 'Beach', color: '#0891B2', id: 'wedding-beach' },
  { name: 'The Grand Affair', vibe: 'Royal', color: '#B45309', id: 'wedding-royal' },
  { name: 'Wild & Free', vibe: 'Bohemian', color: '#D97706', id: 'wedding-bohemian' },
  { name: 'Filmi Shaadi', vibe: 'Retro Bollywood', color: '#C8860A', id: 'wedding-retro-bollywood' },
  { name: 'The Quiet Luxury', vibe: 'Minimalist', color: '#1A1A1A', id: 'wedding-minimalist' },
  { name: 'Another Trip Around the Sun', vibe: 'Birthday Celestial', color: '#7C3AED', id: 'birthday-celestial' },
  { name: 'Midnight', vibe: 'Birthday Dramatic', color: '#4C1D95', id: 'birthday-midnight' },
  { name: 'Neon Nights', vibe: 'Birthday Electric', color: '#FF006E', id: 'birthday-neon-nights' },
  { name: 'Jashn', vibe: 'Birthday Traditional', color: '#DC2626', id: 'birthday-traditional-indian' },
  { name: 'Golden Hour', vibe: 'Birthday Beach', color: '#F59E0B', id: 'birthday-beach' },
]

export default function ForPlanners() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.b2b-hero-line', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.2,
      })

      gsap.utils.toArray<HTMLElement>('.b2b-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.stat-num').forEach(el => {
        gsap.fromTo(el, { scale: 0.5, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      gsap.utils.toArray<HTMLElement>('.plan-card').forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })
    }, containerRef)

    const interval = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length)
    }, 4000)

    return () => { ctx.revert(); clearInterval(interval) }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0C0A09]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="font-['Great_Vibes'] text-2xl text-[#FAFAF9]">Invitely</Link>
        <div className="flex items-center gap-6">
          <Link href="/#templates" className="text-xs tracking-widest uppercase text-[#FAFAF9] opacity-50 hover:opacity-100 transition-opacity">Templates</Link>
          <Link href="/for-planners" className="text-xs tracking-widest uppercase text-[#A16207]">For Planners</Link>
          <Link href="/builder" className="px-5 py-2 bg-[#A16207] text-[#0C0A09] text-xs tracking-widest uppercase font-semibold hover:bg-[#FAFAF9] transition-colors duration-300">
            Create Invite
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1C1917_0%,_#0C0A09_60%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#A16207] opacity-[0.04] rounded-full blur-[150px]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="b2b-hero-line text-[#A16207] tracking-[0.4em] text-xs uppercase">For Wedding Planners & Event Companies</p>
          </div>
          <div className="overflow-hidden mb-2">
            <h1 className="b2b-hero-line font-['Playfair_Display'] text-5xl md:text-7xl text-[#FAFAF9] leading-tight">
              The Invite That Sells
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="b2b-hero-line font-['Great_Vibes'] text-6xl md:text-8xl text-[#A16207] leading-none">
              Your Services
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="b2b-hero-line font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 max-w-2xl mx-auto leading-relaxed">
              When your clients share an Invitely link, every guest sees your work before the wedding even happens. It's not just an invitation — it's your portfolio in motion.
            </p>
          </div>

          <div className="b2b-hero-line mt-12 flex items-center justify-center gap-4 flex-wrap">
            <Link href="/builder" className="px-10 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Try It Free
            </Link>
            <a href="#pricing" className="px-10 py-4 border border-[#A16207] border-opacity-40 text-[#A16207] text-sm tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
              See Pricing
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-[#A16207] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="stat-num font-['Playfair_Display'] text-5xl md:text-6xl text-[#A16207] mb-2">{value}</p>
              <p className="font-['Cormorant_Infant'] text-sm text-[#FAFAF9] opacity-50 tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY INVITELY ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 b2b-reveal">
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">The Business Case</p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#FAFAF9]">Why Planners Choose Invitely</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📱',
                title: 'WhatsApp-First',
                desc: 'India runs on WhatsApp. Every invite is a link that opens instantly, loads fast, and looks stunning on any phone.',
              },
              {
                icon: '✦',
                title: 'Cross-Sell Built In',
                desc: 'Add your branding to every invite. Every guest who opens it sees your work. Every share is a referral.',
              },
              {
                icon: '🎨',
                title: '13 Distinct Worlds',
                desc: 'From palatial royal to barefoot beach — a template for every couple, every budget, every vibe.',
              },
              {
                icon: '👤',
                title: 'Illustrated Personas',
                desc: 'Customisable illustrated characters that look like the actual couple. Nothing like this exists anywhere else.',
              },
              {
                icon: '⚡',
                title: '2-Minute Creation',
                desc: 'Fill in the details, pick the look, generate the link. Done before the client finishes their chai.',
              },
              {
                icon: '📊',
                title: 'RSVP Tracking',
                desc: 'Know who opened, who responded, who needs a follow-up. All in one dashboard.',
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="b2b-reveal p-6 border border-white/5 hover:border-[#A16207] hover:border-opacity-30 transition-all duration-500">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#FAFAF9] mb-3">{title}</h3>
                <p className="font-['Cormorant_Infant'] text-base text-[#FAFAF9] opacity-50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATE SHOWCASE ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 b2b-reveal">
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">The Collection</p>
            <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">A Template for Every Couple</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TEMPLATES_PREVIEW.map(t => (
              <Link key={t.id} href={`/preview/${t.id}`} className="b2b-reveal group relative overflow-hidden border border-white/5 hover:border-opacity-50 transition-all duration-500"
                style={{ '--t-color': t.color } as React.CSSProperties}>
                <div className="h-40 flex items-center justify-center relative"
                  style={{ background: `radial-gradient(ellipse at center, ${t.color}20 0%, #0C0A09 70%)` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/30 flex items-center justify-center">
                    <span className="text-xs tracking-widest uppercase border px-4 py-2"
                      style={{ borderColor: t.color, color: t.color }}>Preview</span>
                  </div>
                  <p className="text-3xl text-[#FAFAF9]" style={{ fontFamily: "'Great Vibes', cursive" }}>{t.name}</p>
                </div>
                <div className="p-3 border-t border-white/5">
                  <p className="text-[#FAFAF9] text-xs tracking-widest uppercase opacity-40">{t.vibe}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8 b2b-reveal">
            <Link href="/#templates" className="text-[#A16207] text-xs tracking-widest uppercase hover:opacity-70 transition-opacity">
              View all 13 templates →
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#A16207] opacity-[0.03] rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="b2b-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-12">What People Say</p>

          <div className="relative min-h-[200px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-700"
                style={{ opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <p className="font-['Cormorant_Infant'] text-2xl text-[#FAFAF9] opacity-80 leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#A16207] flex items-center justify-center text-[#0C0A09] text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <p className="text-[#FAFAF9] text-sm font-semibold">{t.name}</p>
                    <p className="text-[#FAFAF9] opacity-40 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === activeTestimonial ? '#A16207' : 'rgba(255,255,255,0.2)' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-16 b2b-reveal">
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Simple Pricing</p>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#FAFAF9]">Pick Your Plan</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className="plan-card relative border transition-all duration-500 hover:scale-[1.02]"
                style={{
                  borderColor: plan.highlight ? plan.color : 'rgba(255,255,255,0.08)',
                  background: plan.highlight ? `${plan.color}08` : '#0C0A09',
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] tracking-widest uppercase font-bold"
                    style={{ background: plan.color, color: '#0C0A09' }}>
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  <p className="text-xs tracking-widest uppercase mb-4" style={{ color: plan.color }}>{plan.name}</p>
                  <div className="mb-6">
                    <span className="font-['Playfair_Display'] text-5xl text-[#FAFAF9]">{plan.price}</span>
                    <span className="text-[#FAFAF9] opacity-40 text-sm ml-2">{plan.per}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <span style={{ color: plan.color }} className="mt-0.5 flex-shrink-0">✓</span>
                        <span className="font-['Cormorant_Infant'] text-base text-[#FAFAF9] opacity-60">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.href}
                    className="block w-full text-center py-3 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300"
                    style={{
                      background: plan.highlight ? plan.color : 'transparent',
                      color: plan.highlight ? '#0C0A09' : plan.color,
                      border: plan.highlight ? 'none' : `1px solid ${plan.color}40`,
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[#FAFAF9] opacity-30 text-xs mt-8 b2b-reveal">
            All prices in INR · GST applicable · Custom enterprise pricing available
          </p>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section id="contact" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-center mb-12 b2b-reveal">
            <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Get in Touch</p>
            <h2 className="font-['Playfair_Display'] text-4xl text-[#FAFAF9]">Talk to Us</h2>
            <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mt-3">
              For bulk pricing, white-label, or custom templates — we'd love to hear from you.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#A16207] opacity-[0.05] rounded-full blur-[120px]" />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="b2b-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-6">Ready to Start?</p>
          <h2 className="b2b-reveal font-['Great_Vibes'] text-7xl text-[#FAFAF9] mb-4">Let's Build Something Beautiful</h2>
          <p className="b2b-reveal font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-50 mb-12 leading-relaxed">
            Create your first invite in 2 minutes. No credit card required.
          </p>
          <div className="b2b-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500">
              Create Your First Invite
            </Link>
            <a href="mailto:hello@invitely.in" className="px-10 py-4 border border-white/10 text-[#FAFAF9] opacity-60 hover:opacity-100 text-sm tracking-widest uppercase transition-all">
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-30">Invitely</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Home</Link>
            <Link href="/#templates" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Templates</Link>
            <Link href="/builder" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Builder</Link>
            <a href="mailto:hello@invitely.in" className="text-[#FAFAF9] opacity-30 text-xs tracking-widest uppercase hover:opacity-60 transition-opacity">Contact</a>
          </div>
          <p className="text-[#FAFAF9] opacity-20 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
