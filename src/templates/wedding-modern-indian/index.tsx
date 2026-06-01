'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingModernIndian({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data
  const date = new Date(ceremony.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-IN', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero names — massive staggered reveal
      gsap.fromTo('.mi-name', { y: '100%', opacity: 0 }, {
        y: '0%', opacity: 1, duration: 1.4, stagger: 0.15, ease: 'expo.out', delay: 0.3,
      })
      gsap.fromTo('.mi-sub', { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 1.2 })

      // Horizontal rule draw
      gsap.fromTo('.mi-rule', { scaleX: 0, transformOrigin: 'left' }, {
        scaleX: 1, duration: 2, ease: 'expo.inOut', delay: 1,
      })

      // Parallax hero bg
      gsap.to('.mi-hero-bg', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: '.mi-hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Photo parallax
      gsap.to('.mi-photo-inner', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.mi-photo-section', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // Story reveals — each line slides up
      gsap.utils.toArray<HTMLElement>('.mi-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // Chapter numbers
      gsap.utils.toArray<HTMLElement>('.mi-chapter').forEach(el => {
        gsap.fromTo(el, { x: -40, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // Date section — numbers count up feel
      ScrollTrigger.create({
        trigger: '.mi-date',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.mi-date-num', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'expo.out',
          })
        },
      })

      // Venue parallax
      gsap.to('.mi-venue-bg', {
        yPercent: -20, ease: 'none',
        scrollTrigger: { trigger: '.mi-venue', start: 'top bottom', end: 'bottom top', scrub: true },
      })

    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="overflow-x-hidden" style={{ background: '#0D0B08', color: '#F5EDD8' }}>

      {/* ── HERO ── */}
      <section className="mi-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax bg texture */}
        <div className="mi-hero-bg absolute inset-0 scale-110"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #2A1A08 0%, #0D0B08 70%)' }} />

        {/* Gold grain overlay */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        {/* Decorative border lines */}
        <div className="absolute inset-6 border border-[#C9A84C]/15 pointer-events-none" />
        <div className="absolute inset-10 border border-[#C9A84C]/08 pointer-events-none" />

        {/* Corner ornaments */}
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-12 h-12 pointer-events-none`}>
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-40">
              <path d={i === 0 ? 'M0 0 L20 0 M0 0 L0 20' : i === 1 ? 'M48 0 L28 0 M48 0 L48 20' : i === 2 ? 'M0 48 L20 48 M0 48 L0 28' : 'M48 48 L28 48 M48 48 L48 28'} stroke="#C9A84C" strokeWidth="1.5" />
            </svg>
          </div>
        ))}

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <div className="mi-sub overflow-hidden mb-8">
            <p className="text-[#C9A84C] tracking-[0.5em] text-[11px] uppercase opacity-70">
              शुभ विवाह · Shubh Vivah
            </p>
          </div>

          {/* Names */}
          <div className="overflow-hidden mb-2">
            <h1 className="mi-name leading-none font-black"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', letterSpacing: '-0.02em', color: '#F5EDD8' }}>
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-2">
            <div className="mi-name flex items-center justify-center gap-6">
              <div className="mi-rule h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to right, transparent, #C9A84C)' }} />
              <span className="text-[#C9A84C] text-2xl">✦</span>
              <div className="mi-rule h-px flex-1 max-w-[120px]" style={{ background: 'linear-gradient(to left, transparent, #C9A84C)' }} />
            </div>
          </div>

          <div className="overflow-hidden mb-10">
            <h1 className="mi-name leading-none font-black"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', letterSpacing: '-0.02em', color: '#F5EDD8' }}>
              {partner2.name}
            </h1>
          </div>

          <div className="mi-sub space-y-2">
            <p className="text-[#C9A84C] tracking-[0.3em] text-sm uppercase">Are Getting Married</p>
            <p className="text-[#F5EDD8]/40 tracking-widest text-sm">{day} {month} {year} · {ceremony.city}</p>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <div className="w-px h-14 bg-gradient-to-b from-[#C9A84C] to-transparent" />
        </div>
      </section>

      {/* ── PHOTO HERO ── */}
      {data.photos && data.photos.length > 0 && (
        <section className="mi-photo-section relative h-[70vh] overflow-hidden">
          <div className="mi-photo-inner absolute inset-0 scale-110">
            <img src={data.photos[0]} alt="Couple" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0D0B08 0%, transparent 20%, transparent 80%, #0D0B08 100%)' }} />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[#C9A84C] tracking-[0.5em] text-xs uppercase opacity-60">Their Story</p>
          </div>
        </section>
      )}

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0D0B08' }} />
          {/* Vertical gold line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-10"
            style={{ background: 'linear-gradient(to bottom, transparent, #C9A84C 20%, #C9A84C 80%, transparent)' }} />

          <div className="relative z-10 max-w-2xl mx-auto space-y-28">
            {[
              { label: 'Chapter I', title: 'How It Began', text: story.howTheyMet },
              { label: 'Chapter II', title: 'A Memory We Keep', text: story.favoriteMemory },
              { label: 'Chapter III', title: 'The Question', text: story.proposalStory },
            ].filter(s => s.text).map(({ label, title, text }) => (
              <div key={label} className="mi-reveal">
                <div className="mi-chapter flex items-center gap-4 mb-6">
                  <span className="text-[#C9A84C] text-[11px] tracking-[0.4em] uppercase opacity-60">{label}</span>
                  <div className="h-px flex-1 opacity-10" style={{ background: '#C9A84C' }} />
                </div>
                <h3 className="text-3xl font-black mb-5 tracking-tight">{title}</h3>
                <p className="text-[#F5EDD8]/55 text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{text}</p>
              </div>
            ))}

            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="mi-reveal text-center">
                <p className="text-[#C9A84C] text-[11px] tracking-[0.4em] uppercase mb-6 opacity-60">What They Share</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-5 py-2 border border-[#C9A84C]/20 text-[#F5EDD8]/50 text-sm tracking-wider">{p}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── PHOTO GALLERY ── */}
      {data.photos && data.photos.length > 1 && (
        <PhotoGallery photos={data.photos.slice(1)} accentColor="#C9A84C" label="Moments Together" />
      )}

      {/* ── DATE ── */}
      <section className="mi-date relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #1A1005 0%, #0D0B08 70%)' }} />
        <div className="absolute inset-6 border border-[#C9A84C]/08 pointer-events-none" />

        <div className="relative z-10 text-center">
          <p className="mi-reveal text-[#C9A84C] tracking-[0.5em] text-[11px] uppercase mb-16 opacity-60">
            शुभ मुहूर्त · The Auspicious Date
          </p>

          <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap mb-12">
            {[
              { v: String(day).padStart(2, '0'), l: 'Day' },
              { v: '✦', l: '' },
              { v: month.toUpperCase(), l: 'Month' },
              { v: '✦', l: '' },
              { v: String(year), l: 'Year' },
            ].map(({ v, l }, i) => (
              <div key={i} className="mi-date-num text-center">
                <p className="leading-none font-black"
                  style={{
                    fontSize: v === '✦' ? '2rem' : 'clamp(3rem, 10vw, 7rem)',
                    color: v === '✦' ? '#C9A84C' : '#F5EDD8',
                    opacity: v === '✦' ? 0.4 : 1,
                    letterSpacing: '-0.02em',
                  }}>
                  {v}
                </p>
                {l && <p className="text-[#C9A84C]/50 text-[10px] tracking-[0.3em] uppercase mt-2">{l}</p>}
              </div>
            ))}
          </div>

          {ceremony.time && (
            <p className="mi-reveal text-[#F5EDD8]/35 tracking-[0.3em] text-sm uppercase mb-8">{ceremony.time}</p>
          )}

          <div className="mi-reveal">
            <CountdownTimer targetDate={ceremony.date} accentColor="#C9A84C" textColor="#F5EDD8" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="mi-venue relative py-32 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="mi-venue-bg absolute inset-0 scale-110" style={{ background: '#0D0B08' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #1A1005 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="mi-reveal text-[#C9A84C] tracking-[0.5em] text-[11px] uppercase mb-8 opacity-60">The Celebration</p>
          <h2 className="mi-reveal text-4xl md:text-6xl font-black tracking-tight mb-4">{ceremony.venue}</h2>
          {ceremony.address && <p className="mi-reveal text-[#F5EDD8]/35 text-sm mb-2 tracking-wider">{ceremony.address}</p>}
          <p className="mi-reveal text-[#C9A84C] tracking-[0.3em] text-sm uppercase">{ceremony.city}</p>

          {reception && (
            <div className="mt-16 pt-16 border-t border-[#C9A84C]/10">
              <p className="text-[#C9A84C]/50 tracking-[0.4em] text-[11px] uppercase mb-4">Reception</p>
              <h3 className="text-2xl font-black mb-2">{reception.venue}</h3>
              <p className="text-[#F5EDD8]/35 text-sm">{reception.city}</p>
              {reception.time && <p className="text-[#C9A84C]/60 text-sm mt-2 tracking-wider">{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── MESSAGE ── */}
      {customMessage && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0D0B08' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center mi-reveal">
            <span className="text-[#C9A84C]/20 text-6xl" style={{ fontFamily: 'Georgia, serif' }}>"</span>
            <p className="text-xl text-[#F5EDD8]/60 leading-relaxed italic mt-2" style={{ fontFamily: 'Georgia, serif' }}>{customMessage}</p>
            <span className="text-[#C9A84C]/20 text-6xl" style={{ fontFamily: 'Georgia, serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #1A1005 0%, #0D0B08 70%)' }} />
        <div className="absolute inset-6 border border-[#C9A84C]/08 pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="mi-reveal text-[#C9A84C] tracking-[0.5em] text-[11px] uppercase mb-6 opacity-60">आप सादर आमंत्रित हैं</p>
          <h2 className="mi-reveal text-6xl font-black tracking-tight mb-4">Join Us</h2>
          <p className="mi-reveal text-[#F5EDD8]/40 text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            We would be honoured to have you celebrate this moment with us.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="mi-reveal inline-block px-14 py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:bg-[#F5EDD8] hover:text-[#0D0B08]"
              style={{ border: '1px solid #C9A84C', color: '#C9A84C' }}>
              RSVP
            </a>
          )}

          {hashtag && <p className="mt-10 text-[#C9A84C]/40 text-sm tracking-widest">#{hashtag}</p>}
          {data.dressCode && <p className="mt-3 text-[#F5EDD8]/20 text-xs tracking-widest uppercase">Dress Code: {data.dressCode}</p>}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#C9A84C]/15" />
            <span className="text-[#C9A84C]/30 text-lg">✦</span>
            <div className="h-px w-16 bg-[#C9A84C]/15" />
          </div>
          <p className="text-3xl font-black text-[#F5EDD8]/10 tracking-tight">{partner1.name} & {partner2.name}</p>
          <p className="text-[#F5EDD8]/10 text-xs tracking-widest uppercase mt-2">{ceremony.city} · {year}</p>
        </div>
      </section>
    </div>
  )
}
