'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { TEMPLATES } from '@/lib/templates'

gsap.registerPlugin(ScrollTrigger)

function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0 })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])
  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
      <div ref={ring} className="fixed top-0 left-0 w-8 h-8 border border-white/60 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block" />
    </>
  )
}

const WEDDING = TEMPLATES.filter(t => t.category === 'wedding').slice(0, 10)
const BIRTHDAY = TEMPLATES.filter(t => t.category === 'birthday').slice(0, 5)

export default function GalleryPage() {
  const ref = useRef<HTMLDivElement>(null)
  const [cat, setCat] = useState<'wedding' | 'birthday'>('wedding')

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hw', { y: '110%' }, { y: '0%', duration: 1, stagger: 0.07, ease: 'expo.out', delay: 0.1 })
      gsap.fromTo('.hs', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 })
      gsap.fromTo('.hc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 1.1 })
      gsap.to('.orb1', { y: -50, x: 30, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.orb2', { y: 40, x: -40, duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.5 })
      gsap.to('.orb3', { y: -30, x: 50, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 3 })
      gsap.to('.mq', { x: '-50%', duration: 18, ease: 'none', repeat: -1 })
      gsap.utils.toArray<HTMLElement>('.tc').forEach((el, i) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [cat])

  const list = cat === 'wedding' ? WEDDING : BIRTHDAY

  return (
    <div ref={ref} className="min-h-screen bg-[#080808] text-white overflow-x-hidden cursor-none">
      <Cursor />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#080808]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <span className="text-lg font-black tracking-tight">Invitely</span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#templates" className="text-white/40 text-[11px] tracking-[0.15em] uppercase hover:text-white transition-colors">Templates</a>
          
          <a href="/for-planners" className="text-white/40 text-[11px] tracking-[0.15em] uppercase hover:text-white transition-colors">For Planners</a>
        </div>
        <Link href="/builder" className="px-6 py-2.5 bg-white text-black text-[11px] tracking-[0.15em] uppercase font-black hover:bg-[#FFD93D] transition-colors duration-300">
          Create Invite
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(140,60,220,0.25),transparent)]" />
        <div className="orb1 absolute top-1/4 left-1/5 w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,107,107,0.12) 0%, transparent 70%)' }} />
        <div className="orb2 absolute bottom-1/4 right-1/5 w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(77,150,255,0.1) 0%, transparent 70%)' }} />
        <div className="orb3 absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,217,61,0.08) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div className="hs inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-[11px] tracking-[0.15em] uppercase text-white/50 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6BCB77] animate-pulse" />
            23 Handcrafted Invite Experiences
          </div>

          <div className="overflow-hidden mb-1"><h1 className="hw text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.95] tracking-tight">Invitations</h1></div>
          <div className="overflow-hidden mb-1">
            <h1 className="hw text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.95] tracking-tight text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 50%, #CC5DE8 100%)' }}>
              That Feel Like
            </h1>
          </div>
          <div className="overflow-hidden mb-10"><h1 className="hw text-[clamp(3rem,9vw,7.5rem)] font-black leading-[0.95] tracking-tight">Celebrations</h1></div>

          <p className="hs text-white/40 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Scrollytelling invites where every scroll reveals a new moment. Not a card — an experience.
          </p>

          <div className="hc flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/builder" className="group px-10 py-4 bg-white text-black text-sm font-black tracking-[0.1em] uppercase hover:bg-[#FFD93D] transition-all duration-300 flex items-center gap-3">
              Start Creating <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a href="#templates" className="px-10 py-4 border border-white/15 text-white text-sm tracking-[0.1em] uppercase hover:border-white/50 transition-all duration-300">
              See Templates
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="py-5 border-y border-white/[0.06] overflow-hidden bg-white/[0.015]">
        <div className="mq flex gap-10 whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-10 items-center">
              {['Wedding Invites', '✦', 'Birthday Invites', '✦', 'Scrollytelling', '✦', 'WhatsApp Ready', '✦', 'RSVP Tracking', '✦', 'India\'s Best', '✦'].map((item, j) => (
                <span key={j} className={`text-[11px] tracking-[0.15em] uppercase ${item === '✦' ? 'text-[#FFD93D]' : 'text-white/25'}`}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* TEMPLATES */}
      <section id="templates" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-white/25 text-[11px] tracking-[0.4em] uppercase mb-3">The Collection</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none">
                Every invite,<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FFD93D, #FF6B6B)' }}>a world.</span>
              </h2>
            </div>
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10">
              {(['wedding', 'birthday'] as const).map(c => (
                <button key={c} onClick={() => setCat(c)}
                  className={`px-6 py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 ${cat === c ? 'bg-white text-black' : 'text-white/35 hover:text-white'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((t, i) => (
              <Link key={t.id} href={`/preview/${t.id}`}
                className="tc group relative overflow-hidden aspect-[4/5] block">
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{ background: `radial-gradient(ellipse at 30% 30%, ${t.accentColor}25 0%, #080808 65%)` }} />
                <div className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: `linear-gradient(${t.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${t.accentColor} 1px, transparent 1px)`, backgroundSize: '28px 28px' }} />
                <div className="absolute top-5 left-5 text-[90px] font-black leading-none opacity-[0.04] select-none">{String(i + 1).padStart(2, '0')}</div>
                <div className="absolute inset-0 flex flex-col justify-end p-7">
                  <span className="text-[10px] tracking-[0.35em] uppercase px-3 py-1 border w-fit mb-4"
                    style={{ borderColor: `${t.accentColor}50`, color: t.accentColor }}>
                    {t.vibe.replace(/-/g, ' ')}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight mb-2 leading-tight">{t.name}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{t.description}</p>
                  <div className="mt-5 flex items-center gap-3 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400">
                    <span className="text-[11px] tracking-[0.15em] uppercase font-bold" style={{ color: t.accentColor }}>Preview</span>
                    <div className="h-px w-12" style={{ background: t.accentColor }} />
                  </div>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${t.accentColor}15 0%, transparent 60%)` }} />
                <div className="absolute inset-0 border border-white/[0.06] group-hover:border-white/15 transition-colors duration-500" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/builder" className="inline-flex items-center gap-3 px-10 py-4 border border-white/15 text-white text-sm tracking-[0.1em] uppercase hover:bg-white hover:text-black transition-all duration-300">
              Start Creating Your Invite <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-white/25 text-[11px] tracking-[0.4em] uppercase mb-4">Simple as Love</p>
            <h2 className="text-5xl font-black tracking-tight">Three steps.<br /><span className="text-white/30">One unforgettable invite.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: '01', t: 'Pick Your World', d: 'Choose from 23 handcrafted templates. Each one is a complete visual experience — not a theme, a world.' },
              { n: '02', t: 'Tell Your Story', d: 'Add names, dates, your journey. Upload photos. Every detail becomes part of the scrollytelling experience.' },
              { n: '03', t: 'Share the Magic', d: 'Get a link. Share on WhatsApp. Watch people fall in love with your invite before they even arrive.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="relative">
                <div className="text-[110px] font-black leading-none opacity-[0.035] absolute -top-6 -left-3 select-none">{n}</div>
                <div className="relative">
                  <p className="text-white/25 text-[11px] tracking-[0.4em] uppercase mb-4">{n}</p>
                  <h3 className="text-xl font-bold mb-3">{t}</h3>
                  <p className="text-white/35 leading-relaxed text-sm">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(255,217,61,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-none mb-8">
            The celebration<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #FFD93D 0%, #FF6B6B 100%)' }}>starts here.</span>
          </h2>
          <p className="text-white/35 text-xl mb-12 leading-relaxed">Create your invite in 2 minutes. No credit card required.</p>
          <Link href="/builder" className="inline-flex items-center gap-4 px-14 py-5 bg-white text-black text-sm font-black tracking-[0.1em] uppercase hover:bg-[#FFD93D] transition-all duration-300">
            Create Your Invite <span className="text-lg">✦</span>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] py-10 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-lg">Invitely</span>
          <div className="flex gap-8">
            {[['For Planners', '/for-planners'], ['Terms', '/terms'], ['Privacy', '/privacy']].map(([l, h]) => (
              <Link key={h} href={h} className="text-white/20 text-[11px] tracking-[0.15em] uppercase hover:text-white/50 transition-colors">{l}</Link>
            ))}
          </div>
          <p className="text-white/15 text-xs">Made with love · India</p>
        </div>
      </footer>
    </div>
  )
}
