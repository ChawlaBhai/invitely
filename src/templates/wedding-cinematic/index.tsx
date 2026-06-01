'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingCinematic({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data
  const date = new Date(ceremony.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-IN', { month: 'long' }).toUpperCase()
  const year = date.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Film flicker on load
      gsap.fromTo('.cin-hero', { opacity: 0 }, {
        opacity: 1, duration: 0.1, repeat: 2, yoyo: true, ease: 'none', delay: 0.1,
        onComplete: () => gsap.set('.cin-hero', { opacity: 1 }),
      })

      // Title — massive clip reveal
      gsap.fromTo('.cin-title-line', { y: '105%' }, {
        y: '0%', duration: 1.2, stagger: 0.12, ease: 'expo.out', delay: 0.4,
      })
      gsap.fromTo('.cin-fade', { opacity: 0 }, { opacity: 1, duration: 1.5, delay: 1.2 })

      // Horizontal scan line
      gsap.fromTo('.cin-scan', { scaleX: 0, transformOrigin: 'left' }, {
        scaleX: 1, duration: 2.5, ease: 'expo.inOut', delay: 0.8,
      })

      // Parallax layers
      gsap.to('.cin-bg-layer', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: '.cin-hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Photo full-bleed parallax
      gsap.to('.cin-photo-bg', {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: '.cin-photo', start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // Story — each block slides from alternating sides
      gsap.utils.toArray<HTMLElement>('.cin-story-block').forEach((el, i) => {
        gsap.fromTo(el, { x: i % 2 === 0 ? -60 : 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // Date — each character drops in
      ScrollTrigger.create({
        trigger: '.cin-date',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.cin-date-char', { y: 80, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.04, ease: 'expo.out',
          })
        },
      })

      // Venue — zoom in from far
      gsap.fromTo('.cin-venue-text', { scale: 0.7, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out',
        scrollTrigger: { trigger: '.cin-venue', start: 'top 75%' },
      })

    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="overflow-x-hidden" style={{ background: '#050505', color: '#EFEFEF' }}>

      {/* ── HERO ── */}
      <section className="cin-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Parallax bg */}
        <div className="cin-bg-layer absolute inset-0 scale-125"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, #1A0A00 0%, #050505 65%)' }} />

        {/* Film grain */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '256px' }} />

        {/* Film strip top */}
        <div className="absolute top-0 left-0 right-0 h-6 flex overflow-hidden opacity-15">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-5 h-full border-r border-white/30" />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 flex overflow-hidden opacity-15">
          {Array.from({ length: 50 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-5 h-full border-r border-white/30" />
          ))}
        </div>

        {/* Scan line */}
        <div className="cin-scan absolute top-1/2 left-0 right-0 h-px bg-white/10" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Presenting */}
          <div className="cin-fade mb-6">
            <p className="text-white/30 tracking-[0.6em] text-[11px] uppercase">A Film About Love</p>
          </div>

          {/* Names — massive */}
          <div className="overflow-hidden mb-0">
            <h1 className="cin-title-line font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)', color: '#EFEFEF' }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-0">
            <div className="cin-title-line flex items-center justify-center gap-4 py-2">
              <div className="h-px flex-1 max-w-[100px] bg-white/15" />
              <span className="text-white/30 text-sm tracking-[0.4em] uppercase">and</span>
              <div className="h-px flex-1 max-w-[100px] bg-white/15" />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="cin-title-line font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)', color: '#EFEFEF' }}>
              {partner2.name}
            </h1>
          </div>

          <div className="cin-fade space-y-2">
            <p className="text-white/40 tracking-[0.4em] text-sm uppercase">Are Getting Married</p>
            <p className="text-white/20 tracking-widest text-sm">{day} {month} {year} · {ceremony.city}</p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <div className="w-px h-14 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ── FULL BLEED PHOTO ── */}
      {data.photos && data.photos.length > 0 && (
        <section className="cin-photo relative h-screen overflow-hidden">
          <div className="cin-photo-bg absolute inset-0 scale-110">
            <img src={data.photos[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #050505 0%, transparent 15%, transparent 85%, #050505 100%)' }} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/50 tracking-[0.6em] text-xs uppercase">Their Story</p>
          </div>
        </section>
      )}

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#050505]" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-24">
            {[
              { n: 'I', t: 'How It Began', s: story.howTheyMet },
              { n: 'II', t: 'A Memory We Keep', s: story.favoriteMemory },
              { n: 'III', t: 'The Question', s: story.proposalStory },
            ].filter(x => x.s).map(({ n, t, s }) => (
              <div key={n} className="cin-story-block">
                <div className="flex items-start gap-8">
                  <span className="text-[80px] font-black leading-none text-white/[0.04] flex-shrink-0 select-none -mt-4">{n}</span>
                  <div>
                    <p className="text-white/25 tracking-[0.4em] text-[11px] uppercase mb-3">{t}</p>
                    <p className="text-white/55 text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>{s}</p>
                  </div>
                </div>
              </div>
            ))}

            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="cin-story-block flex flex-wrap gap-3">
                {story.sharedPassions.map((p, i) => (
                  <span key={i} className="px-5 py-2 border border-white/10 text-white/30 text-sm tracking-wider">{p}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── PHOTO GALLERY ── */}
      {data.photos && data.photos.length > 1 && (
        <PhotoGallery photos={data.photos.slice(1)} accentColor="#EFEFEF" label="Frames" />
      )}

      {/* ── DATE ── */}
      <section className="cin-date relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 text-center">
          <p className="text-white/20 tracking-[0.5em] text-[11px] uppercase mb-16">The Date</p>
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mb-12">
            {`${String(day).padStart(2, '0')} · ${month} · ${year}`.split('').map((char, i) => (
              <span key={i} className="cin-date-char font-black leading-none"
                style={{
                  fontSize: char === '·' ? '2rem' : 'clamp(2.5rem, 8vw, 6rem)',
                  color: char === '·' ? 'rgba(255,255,255,0.15)' : '#EFEFEF',
                  letterSpacing: '-0.02em',
                }}>
                {char}
              </span>
            ))}
          </div>
          {ceremony.time && <p className="text-white/25 tracking-[0.3em] text-sm uppercase mb-8">{ceremony.time}</p>}
          <CountdownTimer targetDate={ceremony.date} accentColor="#EFEFEF" textColor="#EFEFEF" label="Counting Down" />
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="cin-venue relative py-32 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #0F0A05 0%, transparent 70%)' }} />
        <div className="relative z-10 text-center w-full max-w-3xl mx-auto">
          <p className="text-white/20 tracking-[0.5em] text-[11px] uppercase mb-8">The Venue</p>
          <h2 className="cin-venue-text text-5xl md:text-7xl font-black tracking-tight mb-4">{ceremony.venue}</h2>
          {ceremony.address && <p className="text-white/25 text-sm mb-2 tracking-wider">{ceremony.address}</p>}
          <p className="text-white/40 tracking-[0.3em] text-sm uppercase">{ceremony.city}</p>
          {reception && (
            <div className="mt-16 pt-16 border-t border-white/[0.06]">
              <p className="text-white/20 tracking-[0.4em] text-[11px] uppercase mb-4">Reception</p>
              <h3 className="text-3xl font-black mb-2">{reception.venue}</h3>
              <p className="text-white/25 text-sm">{reception.city}</p>
              {reception.time && <p className="text-white/30 text-sm mt-2 tracking-wider">{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── MESSAGE ── */}
      {customMessage && (
        <section className="relative py-24 px-6">
          <div className="absolute inset-0 bg-[#050505]" />
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <p className="text-2xl text-white/40 leading-relaxed italic" style={{ fontFamily: 'Georgia, serif' }}>"{customMessage}"</p>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.06]" />
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="text-white/20 tracking-[0.5em] text-[11px] uppercase mb-6">You Are Invited</p>
          <h2 className="text-6xl font-black tracking-tight mb-4">Join Us</h2>
          <p className="text-white/35 text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            We would be honoured to have you celebrate this moment with us.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>
          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-14 py-4 border border-white/20 text-white text-sm tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all duration-500">
              RSVP
            </a>
          )}
          {hashtag && <p className="mt-10 text-white/20 text-sm tracking-widest">#{hashtag}</p>}
          {data.dressCode && <p className="mt-3 text-white/15 text-xs tracking-widest uppercase">{data.dressCode}</p>}
        </div>
        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-white/[0.06]" />
            <div className="h-px w-16 bg-white/[0.06]" />
          </div>
          <p className="text-4xl font-black text-white/[0.06] tracking-tight">{partner1.name} & {partner2.name}</p>
          <p className="text-white/[0.06] text-xs tracking-widest uppercase mt-2">{ceremony.city} · {year}</p>
        </div>
      </section>
    </div>
  )
}
