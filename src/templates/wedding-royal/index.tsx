'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

function RoyalCrest({ color = '#B45309', size = 80 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      {/* Crown */}
      <path d="M20 55 L20 40 L35 50 L50 30 L65 50 L80 40 L80 55Z" fill={color} opacity="0.9" />
      <circle cx="20" cy="38" r="4" fill={color} />
      <circle cx="50" cy="28" r="4" fill={color} />
      <circle cx="80" cy="38" r="4" fill={color} />
      {/* Base */}
      <rect x="15" y="55" width="70" height="8" rx="2" fill={color} opacity="0.8" />
      {/* Shield */}
      <path d="M35 68 L35 82 L50 90 L65 82 L65 68Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <path d="M42 74 L50 78 L58 74" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      {/* Laurel left */}
      <path d="M10 70 C5 65 8 58 15 60 C10 65 12 72 18 72" fill={color} opacity="0.4" />
      <path d="M10 78 C4 73 6 65 14 67 C9 72 10 80 17 80" fill={color} opacity="0.35" />
      {/* Laurel right */}
      <path d="M90 70 C95 65 92 58 85 60 C90 65 88 72 82 72" fill={color} opacity="0.4" />
      <path d="M90 78 C96 73 94 65 86 67 C91 72 90 80 83 80" fill={color} opacity="0.35" />
    </svg>
  )
}

function OrnateCorner({ flip = false, size = 80, color = '#B45309' }: { flip?: boolean; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: flip ? 'scale(-1,-1)' : 'none' }} aria-hidden="true">
      <path d="M5 5 L5 30 M5 5 L30 5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M5 5 C5 5 20 8 25 20 C30 32 20 40 30 50" stroke={color} strokeWidth="1" fill="none" opacity="0.4" />
      <circle cx="5" cy="5" r="3" fill={color} opacity="0.7" />
      <circle cx="30" cy="5" r="2" fill={color} opacity="0.4" />
      <circle cx="5" cy="30" r="2" fill={color} opacity="0.4" />
      <path d="M15 15 C20 12 28 15 25 22 C22 29 15 25 15 15Z" fill={color} opacity="0.2" />
    </svg>
  )
}

export default function WeddingRoyal({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Crest entrance
      gsap.fromTo('.royal-crest', { scale: 0, opacity: 0, rotate: -10 }, {
        scale: 1, opacity: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.4)', delay: 0.3,
      })

      // Title reveal
      gsap.fromTo('.royal-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: 'power4.out', delay: 0.8,
      })

      // Border draw
      gsap.fromTo('.royal-border', { strokeDashoffset: 1000 }, {
        strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', delay: 0.5,
      })

      // Gold shimmer
      gsap.to('.gold-shimmer', {
        backgroundPosition: '200% center',
        duration: 3, ease: 'none', repeat: -1,
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.royal-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.royal-man', { x: -80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.royal-woman', { x: 80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.royal-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date
      ScrollTrigger.create({
        trigger: '.royal-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.royal-date-el', { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out',
          })
        },
      })

      // Candle flicker
      gsap.to('.candle-flame', {
        scaleY: 1.2, scaleX: 0.85, opacity: 0.8,
        duration: 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.15,
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-royal overflow-x-hidden" style={{ background: '#1A0A0A', color: '#F5E6C8' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D0F0F 0%, #1A0A0A 70%)' }} />

        {/* Velvet texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #B45309 0px, #B45309 1px, transparent 1px, transparent 8px)' }} />

        {/* Ornate border SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect className="royal-border" x="2" y="2" width="96" height="96" fill="none"
            stroke="#B45309" strokeWidth="0.3" opacity="0.4" strokeDasharray="1000" strokeDashoffset="1000" />
          <rect className="royal-border" x="3.5" y="3.5" width="93" height="93" fill="none"
            stroke="#B45309" strokeWidth="0.15" opacity="0.25" strokeDasharray="1000" strokeDashoffset="1000" />
        </svg>

        {/* Corner ornaments */}
        <div className="absolute top-4 left-4"><OrnateCorner color="#B45309" size={60} /></div>
        <div className="absolute top-4 right-4"><OrnateCorner flip color="#B45309" size={60} /></div>
        <div className="absolute bottom-4 left-4" style={{ transform: 'scale(1,-1)' }}><OrnateCorner color="#B45309" size={60} /></div>
        <div className="absolute bottom-4 right-4" style={{ transform: 'scale(-1,1)' }}><OrnateCorner color="#B45309" size={60} /></div>

        {/* Candles */}
        {[{ left: '8%' }, { left: '15%' }, { right: '8%' }, { right: '15%' }].map((pos, i) => (
          <div key={i} className="absolute bottom-16 flex flex-col items-center" style={pos as React.CSSProperties}>
            <div className="candle-flame w-2.5 h-5 rounded-full mb-0.5"
              style={{ background: 'radial-gradient(ellipse at bottom, #FEF3C7, #FCD34D, #F59E0B)', transformOrigin: 'bottom center' }} />
            <div className="w-3 rounded-sm" style={{ height: 40 + i * 8, background: 'linear-gradient(to right, #F5E6C8, #E8D5A3, #F5E6C8)' }} />
          </div>
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="royal-crest flex justify-center mb-6">
            <RoyalCrest color="#B45309" size={80} />
          </div>

          <div className="overflow-hidden mb-2">
            <p className="royal-title text-[#B45309] tracking-[0.5em] text-xs uppercase opacity-80">
              By the Grace of God & Family
            </p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="royal-title leading-none"
              style={{ fontFamily: "'IM Fell English', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#F5E6C8' }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="royal-title flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#B45309] opacity-60" />
              <span className="text-[#B45309] text-2xl">✦</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#B45309] opacity-60" />
            </div>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 className="royal-title leading-none"
              style={{ fontFamily: "'IM Fell English', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#F5E6C8' }}>
              {partner2.name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="royal-title text-2xl text-[#B45309]"
              style={{ fontFamily: "'Pinyon Script', cursive" }}>
              Request the honour of your presence
            </p>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="royal-title opacity-40 text-base"
              style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#B45309] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="royal-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#200C0C' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D0F0F 0%, transparent 70%)' }} />
        <div className="absolute inset-6 border border-[#B45309] border-opacity-15 pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <p className="royal-reveal text-[#B45309] tracking-[0.3em] text-xs uppercase mb-3">The Betrothed</p>
          <h2 className="royal-reveal text-4xl" style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>
            Two Families, One Legacy
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="royal-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Pinyon Script', cursive", color: '#F5E6C8' }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#B45309] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <RoyalCrest color="#B45309" size={48} />
          </div>

          <div className="royal-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Pinyon Script', cursive", color: '#F5E6C8' }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#B45309] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#1A0A0A' }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#B45309] to-transparent opacity-20" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="royal-reveal text-center">
                <p className="text-[#B45309] text-xs tracking-[0.3em] uppercase mb-3">Prologue</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>How It Began</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="royal-reveal text-center">
                <p className="text-[#B45309] text-xs tracking-[0.3em] uppercase mb-3">Act II</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>A Memory We Keep</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="royal-reveal text-center">
                <p className="text-[#B45309] text-xs tracking-[0.3em] uppercase mb-3">The Declaration</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>The Question</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="royal-reveal text-center">
                <p className="text-[#B45309] text-xs tracking-[0.3em] uppercase mb-6">Their Realm</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm opacity-60"
                      style={{ border: '1px solid rgba(180,83,9,0.3)', fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#B45309" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="royal-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#200C0C' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D0F0F 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center">
          <p className="royal-reveal text-[#B45309] tracking-[0.3em] text-xs uppercase mb-10">The Auspicious Date</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: '✦', label: '' },
              { value: month.toUpperCase(), label: 'Month' },
              { value: '✦', label: '' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="royal-date-el text-center">
                <p className="leading-none"
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontSize: value === '✦' ? '2.5rem' : 'clamp(3rem, 10vw, 7rem)',
                    color: value === '✦' ? '#B45309' : '#F5E6C8',
                    lineHeight: 1,
                  }}>
                  {value}
                </p>
                {label && <p className="text-[#B45309] text-xs tracking-widest uppercase mt-2 opacity-60">{label}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="royal-reveal mt-8 text-xl opacity-40"
              style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#B45309"
              textColor="#F5E6C8"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#1A0A0A' }} />
        <div className="absolute inset-8 border border-[#B45309] border-opacity-10 pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="royal-reveal text-[#B45309] tracking-[0.3em] text-xs uppercase mb-6">The Grand Venue</p>
          <h2 className="royal-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="royal-reveal text-lg opacity-40 mb-2" style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
              {ceremony.address}
            </p>
          )}
          <p className="royal-reveal text-xl text-[#B45309]" style={{ fontFamily: "'Crimson Text', serif" }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#B45309] border-opacity-15">
              <p className="text-[#B45309] tracking-[0.3em] text-xs uppercase mb-4">The Reception</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'IM Fell English', serif", color: '#F5E6C8' }}>{reception.venue}</h3>
              <p className="opacity-40" style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>{reception.city}</p>
              {reception.time && <p className="text-[#B45309] mt-2" style={{ fontFamily: "'Crimson Text', serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#200C0C' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center royal-reveal">
            <span className="text-[#B45309] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
              {customMessage}
            </p>
            <span className="text-[#B45309] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#1A0A0A' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D0F0F 0%, transparent 60%)' }} />
        <div className="absolute inset-6 border border-[#B45309] border-opacity-15 pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <div className="royal-reveal flex justify-center mb-6">
            <RoyalCrest color="#B45309" size={60} />
          </div>
          <p className="royal-reveal text-[#B45309] tracking-[0.3em] text-xs uppercase mb-6">You Are Cordially Invited</p>
          <h2 className="royal-reveal text-6xl mb-4" style={{ fontFamily: "'Pinyon Script', cursive", color: '#F5E6C8' }}>
            Join Us
          </h2>
          <p className="royal-reveal text-lg opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Crimson Text', serif", color: '#F5E6C8' }}>
            We request the honour of your presence at this grand celebration.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#B45309', color: '#F5E6C8', boxShadow: '0 0 30px rgba(180,83,9,0.3)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#B45309] opacity-50" style={{ fontFamily: "'Crimson Text', serif" }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 opacity-25 text-xs tracking-widest uppercase" style={{ color: '#F5E6C8' }}>
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#B45309] opacity-30" />
            <span className="text-[#B45309] text-lg">✦</span>
            <div className="h-px w-16 bg-[#B45309] opacity-30" />
          </div>
          <p className="text-3xl opacity-20" style={{ fontFamily: "'Pinyon Script', cursive", color: '#F5E6C8' }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="opacity-10 text-xs tracking-widest uppercase mt-2" style={{ color: '#F5E6C8' }}>
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
