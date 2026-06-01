'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayMidnight({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, customMessage } = data

  const eventDate = new Date(event.date)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = eventDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero — dramatic reveal
      gsap.fromTo('.midnight-title', { y: 80, opacity: 0, filter: 'blur(12px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: 1.6, stagger: 0.2, ease: 'power4.out', delay: 0.4,
      })

      // Particle float
      gsap.utils.toArray<HTMLElement>('.midnight-particle').forEach((el, i) => {
        gsap.to(el, {
          y: -30, x: i % 2 === 0 ? 15 : -15, opacity: 0,
          duration: 3 + i * 0.4, ease: 'power1.out', repeat: -1, delay: i * 0.3,
          onRepeat: () => gsap.set(el, { y: 0, opacity: 0.6 }),
        })
      })

      // Age number dramatic entrance
      ScrollTrigger.create({
        trigger: '.midnight-age',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.midnight-age-num', { scale: 0.3, opacity: 0, filter: 'blur(20px)' }, {
            scale: 1, opacity: 1, filter: 'blur(0px)',
            duration: 2, ease: 'expo.out',
          })
        },
      })

      // Persona
      ScrollTrigger.create({
        trigger: '.midnight-persona',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.midnight-persona', { y: 60, opacity: 0, filter: 'blur(8px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out',
          })
        },
      })

      // Reveals
      gsap.utils.toArray<HTMLElement>('.midnight-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Glow pulse
      gsap.to('.midnight-glow', {
        scale: 1.3, opacity: 0.08,
        duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="overflow-x-hidden" style={{ background: '#050508', color: '#F0E6FF' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #0D0A1A 0%, #050508 70%)' }} />

        {/* Glow */}
        <div className="midnight-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', opacity: 0.05 }} />

        {/* Floating particles */}
        {[...Array(16)].map((_, i) => (
          <div key={i} className="midnight-particle absolute rounded-full pointer-events-none"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              background: i % 3 === 0 ? '#A78BFA' : i % 3 === 1 ? '#F0E6FF' : '#7C3AED',
              left: `${5 + i * 6}%`,
              top: `${10 + (i % 5) * 18}%`,
              opacity: 0.6,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="midnight-title tracking-[0.5em] text-xs uppercase"
              style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.8 }}>
              A Life Worth Celebrating
            </p>
          </div>
          <div className="overflow-hidden mb-2">
            <h1 className="midnight-title leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3.5rem, 12vw, 9rem)', color: '#F0E6FF' }}>
              {celebrant.name}
            </h1>
          </div>
          {age && (
            <div className="overflow-hidden mb-6">
              <p className="midnight-title"
                style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#A78BFA' }}>
                Turns {age}
              </p>
            </div>
          )}
          <div className="overflow-hidden">
            <p className="midnight-title opacity-40 text-base"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
              {day} {month} {year} · {event.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#7C3AED] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── AGE ── */}
      {age && (
        <section className="midnight-age relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0614' }} />
          <div className="midnight-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', opacity: 0.05 }} />

          <div className="relative z-10 text-center">
            <p className="midnight-reveal tracking-[0.3em] text-xs uppercase mb-6"
              style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
              Years of Being Extraordinary
            </p>
            <p className="midnight-age-num leading-none font-bold"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: 'clamp(8rem, 30vw, 20rem)',
                color: '#F0E6FF',
                opacity: 0.08,
                lineHeight: 0.85,
                textShadow: '0 0 80px rgba(124,58,237,0.5)',
              }}>
              {age}
            </p>
            <p className="midnight-reveal -mt-8 relative z-10"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(2rem, 6vw, 4rem)', color: '#A78BFA' }}>
              {story.message ?? `${age} years of being exactly, magnificently ${celebrant.name}.`}
            </p>
          </div>
        </section>
      )}

      {/* ── PERSONA ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050508' }} />

        <div className="midnight-persona relative z-10 flex flex-col items-center">
          
          <p className="mt-6 text-4xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#F0E6FF' }}>{celebrant.name}</p>
          {celebrant.nickname && (
            <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#A78BFA', opacity: 0.7 }}>{celebrant.nickname}</p>
          )}
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0614' }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#7C3AED] to-transparent opacity-20" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="midnight-reveal text-center tracking-[0.3em] text-xs uppercase mb-12"
              style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
              The Story So Far
            </p>
            <div className="space-y-10">
              {story.highlights.map((h, i) => (
                <div key={i} className="midnight-reveal flex items-start gap-6">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: '#7C3AED', color: '#F0E6FF', opacity: 0.8 }}>
                    {i + 1}
                  </div>
                  <p className="text-lg opacity-65 leading-relaxed pt-1"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
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
          <div className="absolute inset-0" style={{ background: '#050508' }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <p className="midnight-reveal text-center tracking-[0.3em] text-xs uppercase mb-10"
              style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
              Things You Should Know
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.funFacts.map((f, i) => (
                <div key={i} className="midnight-reveal p-5 border"
                  style={{ borderColor: 'rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)' }}>
                  <p className="text-base opacity-60 leading-relaxed"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
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
        <PhotoGallery photos={data.photos} accentColor="#7C3AED" label="Moments" />
      )}

      {/* ── DATE ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#0A0614' }} />
        <div className="midnight-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', opacity: 0.05 }} />

        <div className="relative z-10 text-center">
          <p className="midnight-reveal tracking-[0.3em] text-xs uppercase mb-10"
            style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
            The Night
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: month.toUpperCase(), label: 'Month' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="midnight-reveal text-center">
                  <p className="leading-none font-bold"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(3rem, 10vw, 7rem)',
                      color: '#F0E6FF',
                      textShadow: '0 0 40px rgba(124,58,237,0.4)',
                    }}>
                    {value}
                  </p>
                  <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#A78BFA', opacity: 0.6 }}>{label}</p>
                </div>
                {i < 2 && <span className="text-2xl" style={{ color: '#7C3AED', opacity: 0.4 }}>✦</span>}
              </div>
            ))}
          </div>
          {event.time && (
            <p className="midnight-reveal mt-8 text-xl opacity-40"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
              {event.time}
            </p>
          )}
          <div className="mt-8">
            <CountdownTimer targetDate={event.date} accentColor="#7C3AED" textColor="#F0E6FF" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#050508' }} />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="midnight-reveal tracking-[0.3em] text-xs uppercase mb-6"
            style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
            Where We Celebrate
          </p>
          <h2 className="midnight-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Cinzel', serif", color: '#F0E6FF' }}>
            {event.venue}
          </h2>
          {event.address && (
            <p className="midnight-reveal text-lg opacity-40 mb-2"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
              {event.address}
            </p>
          )}
          <p className="midnight-reveal text-xl" style={{ fontFamily: "'Raleway', sans-serif", color: '#A78BFA' }}>
            {event.city}
          </p>
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0A0614' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center midnight-reveal">
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#7C3AED' }}>"</span>
            <p className="text-2xl opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
              {customMessage}
            </p>
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#7C3AED' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#050508' }} />
        <div className="midnight-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', opacity: 0.05 }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="midnight-reveal tracking-[0.3em] text-xs uppercase mb-6"
            style={{ color: '#A78BFA', fontFamily: "'Raleway', sans-serif", fontWeight: 300, opacity: 0.7 }}>
            You Are Invited
          </p>
          <h2 className="midnight-reveal text-6xl mb-4" style={{ fontFamily: "'Great Vibes', cursive", color: '#F0E6FF' }}>
            Join the Night
          </h2>
          <p className="midnight-reveal text-lg opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#F0E6FF' }}>
            Come celebrate a life that keeps getting more extraordinary.
            {data.rsvpContact && ` Please respond to confirm your spot.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#7C3AED', color: '#F0E6FF', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 opacity-20" style={{ background: '#7C3AED' }} />
            <span style={{ color: '#A78BFA', opacity: 0.4 }}>✦</span>
            <div className="h-px w-16 opacity-20" style={{ background: '#7C3AED' }} />
          </div>
          <p className="text-3xl opacity-20" style={{ fontFamily: "'Great Vibes', cursive", color: '#F0E6FF' }}>
            {celebrant.name}
          </p>
          <p className="opacity-10 text-xs tracking-widest uppercase mt-2" style={{ color: '#F0E6FF' }}>
            {event.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
