'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayNeonNights({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, customMessage } = data

  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = eventDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch effect on title
      const glitch = () => {
        gsap.to('.neon-title-main', {
          x: () => (Math.random() - 0.5) * 8,
          skewX: () => (Math.random() - 0.5) * 4,
          duration: 0.05,
          ease: 'none',
          onComplete: () => gsap.set('.neon-title-main', { x: 0, skewX: 0 }),
        })
      }
      const glitchInterval = setInterval(() => {
        if (Math.random() > 0.7) glitch()
      }, 2000)

      // Hero entrance
      gsap.fromTo('.neon-title', { opacity: 0, y: 40, filter: 'blur(8px)' }, {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.3,
      })

      // Neon flicker
      gsap.to('.neon-glow', {
        opacity: 0.6, duration: 0.08, ease: 'none', repeat: 2, yoyo: true, delay: 1.5,
        onComplete: () => gsap.set('.neon-glow', { opacity: 1 }),
      })

      // Scanlines drift
      gsap.to('.scanlines', {
        backgroundPositionY: '100%',
        duration: 8, ease: 'none', repeat: -1,
      })

      // Persona
      ScrollTrigger.create({
        trigger: '.neon-persona',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.neon-persona', { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, {
            opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          })
        },
      })

      // Reveals
      gsap.utils.toArray<HTMLElement>('.neon-reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Age counter
      ScrollTrigger.create({
        trigger: '.neon-age',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.neon-age-num', { scale: 0.5, opacity: 0, filter: 'blur(20px)' }, {
            scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'expo.out',
          })
        },
      })

      return () => clearInterval(glitchInterval)
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="overflow-x-hidden" style={{ background: '#050505', color: '#F0F0F0' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050505' }} />

        {/* Scanlines */}
        <div className="scanlines absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)', backgroundSize: '100% 4px' }} />

        {/* Neon glow blobs */}
        <div className="neon-glow absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #FF006E 0%, transparent 70%)', opacity: 0.08, filter: 'blur(40px)' }} />
        <div className="neon-glow absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #00F5FF 0%, transparent 70%)', opacity: 0.06, filter: 'blur(40px)' }} />

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,0,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="neon-title tracking-[0.5em] text-xs uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.8 }}>
              It's Time to Party
            </p>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="neon-title-main neon-title leading-none"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 'clamp(4rem, 13vw, 10rem)',
                fontWeight: 700,
                color: '#F0F0F0',
                textShadow: '0 0 30px rgba(255,0,110,0.5), 0 0 60px rgba(255,0,110,0.3)',
                letterSpacing: '-0.02em',
              }}>
              {celebrant.name}
            </h1>
          </div>

          {age && (
            <div className="overflow-hidden mb-6">
              <p className="neon-title"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontWeight: 300,
                  color: '#00F5FF',
                  textShadow: '0 0 20px rgba(0,245,255,0.6)',
                  letterSpacing: '0.1em',
                }}>
                Turns {age}
              </p>
            </div>
          )}

          <div className="overflow-hidden">
            <p className="neon-title tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.4 }}>
              {day} {month} {year} · {event.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#FF006E] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── AGE ── */}
      {age && (
        <section className="neon-age relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,0,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative z-10 text-center">
            <p className="neon-reveal tracking-[0.4em] text-xs uppercase mb-6"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.7 }}>
              Years of Being Legendary
            </p>
            <p className="neon-age-num leading-none font-bold"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 'clamp(8rem, 30vw, 20rem)',
                color: '#F0F0F0',
                opacity: 0.06,
                lineHeight: 0.85,
                textShadow: '0 0 80px rgba(255,0,110,0.8)',
                letterSpacing: '-0.05em',
              }}>
              {age}
            </p>
            {story.message && (
              <p className="neon-reveal -mt-8 relative z-10 text-xl"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#00F5FF', textShadow: '0 0 20px rgba(0,245,255,0.5)' }}>
                {story.message}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── PERSONA ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050505' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #FF006E 0%, transparent 70%)', opacity: 0.05, filter: 'blur(30px)' }} />

        <div className="neon-persona relative z-10 flex flex-col items-center" style={{ filter: 'drop-shadow(0 0 20px rgba(255,0,110,0.4))' }}>
          
          <p className="mt-6 text-2xl tracking-widest uppercase"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700, color: '#F0F0F0', textShadow: '0 0 20px rgba(255,0,110,0.5)' }}>
            {celebrant.name}
          </p>
          {celebrant.nickname && (
            <p className="tracking-[0.3em] text-xs uppercase mt-1"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#00F5FF', opacity: 0.7 }}>
              {celebrant.nickname}
            </p>
          )}
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="neon-reveal text-center tracking-[0.4em] text-xs uppercase mb-12"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.7 }}>
              The Highlights Reel
            </p>
            <div className="space-y-6">
              {story.highlights.map((h, i) => (
                <div key={i} className="neon-reveal flex items-start gap-4">
                  <span className="flex-shrink-0 text-xs font-bold mt-1"
                    style={{ color: i % 2 === 0 ? '#FF006E' : '#00F5FF', fontFamily: "'Josefin Sans', sans-serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-lg leading-relaxed"
                    style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.7 }}>
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#050505' }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="neon-reveal text-center tracking-[0.4em] text-xs uppercase mb-10"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#00F5FF', opacity: 0.7 }}>
              Fun Facts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.funFacts.map((f, i) => (
                <div key={i} className="neon-reveal p-4 border"
                  style={{ borderColor: i % 2 === 0 ? 'rgba(255,0,110,0.2)' : 'rgba(0,245,255,0.2)', background: i % 2 === 0 ? 'rgba(255,0,110,0.03)' : 'rgba(0,245,255,0.03)' }}>
                  <p className="text-base leading-relaxed"
                    style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.65 }}>
                    {f}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#FF006E" label="Moments" />
      )}

      {/* ── DATE ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,0,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="relative z-10 text-center">
          <p className="neon-reveal tracking-[0.4em] text-xs uppercase mb-10"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.7 }}>
            The Night
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day', color: '#F0F0F0' },
              { value: '/', label: '', color: '#FF006E' },
              { value: month.toUpperCase(), label: 'Month', color: '#00F5FF' },
              { value: '/', label: '', color: '#FF006E' },
              { value: String(year), label: 'Year', color: '#F0F0F0' },
            ].map(({ value, label, color }, i) => (
              <div key={i} className="neon-reveal text-center">
                <p className="leading-none font-bold"
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: value === '/' ? '3rem' : 'clamp(3rem, 10vw, 6rem)',
                    color,
                    lineHeight: 1,
                    textShadow: value !== '/' ? `0 0 30px ${color}60` : 'none',
                    letterSpacing: '-0.02em',
                  }}>
                  {value}
                </p>
                {label && <p className="tracking-[0.3em] text-[10px] uppercase mt-2" style={{ color: '#F0F0F0', opacity: 0.3, fontFamily: "'Josefin Sans', sans-serif" }}>{label}</p>}
              </div>
            ))}
          </div>
          {event.time && (
            <p className="neon-reveal mt-8 tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.35 }}>
              {event.time}
            </p>
          )}
          <div className="mt-8">
            <CountdownTimer targetDate={event.date} accentColor="#FF006E" textColor="#F0F0F0" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-24 px-6 overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#050505' }} />

        <div className="relative z-10 text-center w-full max-w-xl mx-auto">
          <p className="neon-reveal tracking-[0.4em] text-xs uppercase mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#00F5FF', opacity: 0.7 }}>
            The Venue
          </p>
          <h2 className="neon-reveal text-4xl md:text-5xl mb-4 font-bold"
            style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#F0F0F0', textShadow: '0 0 30px rgba(0,245,255,0.3)', letterSpacing: '-0.02em' }}>
            {event.venue}
          </h2>
          {event.address && (
            <p className="neon-reveal text-sm mb-2 tracking-wider"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.35 }}>
              {event.address}
            </p>
          )}
          <p className="neon-reveal tracking-[0.3em] text-xs uppercase"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.7 }}>
            {event.city}
          </p>
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0A0A' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center neon-reveal">
            <p className="text-2xl leading-relaxed"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.65 }}>
              {customMessage}
            </p>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050505' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #FF006E 0%, transparent 70%)', opacity: 0.04, filter: 'blur(40px)' }} />

        <div className="relative z-10 text-center max-w-sm mx-auto">
          <p className="neon-reveal tracking-[0.4em] text-xs uppercase mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#FF006E', opacity: 0.7 }}>
            You're Invited
          </p>
          <h2 className="neon-reveal text-5xl font-bold mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#F0F0F0', textShadow: '0 0 30px rgba(255,0,110,0.5)', letterSpacing: '-0.02em' }}>
            Show Up
          </h2>
          <p className="neon-reveal text-sm leading-relaxed mb-12 tracking-wider"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.4 }}>
            Come celebrate. Dress to impress. Leave your excuses at home.
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-10 py-3 text-xs tracking-[0.3em] uppercase font-bold transition-all duration-300"
              style={{ background: '#FF006E', color: '#050505', boxShadow: '0 0 30px rgba(255,0,110,0.5)', fontFamily: "'Josefin Sans', sans-serif" }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#FF006E] opacity-20" />
            <div className="h-px w-12 bg-[#00F5FF] opacity-20" />
          </div>
          <p className="text-xl font-bold tracking-widest uppercase"
            style={{ fontFamily: "'Josefin Sans', sans-serif", color: '#F0F0F0', opacity: 0.15 }}>
            {celebrant.name}
          </p>
          <p className="tracking-[0.3em] text-[10px] uppercase mt-1"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, color: '#F0F0F0', opacity: 0.1 }}>
            {event.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
