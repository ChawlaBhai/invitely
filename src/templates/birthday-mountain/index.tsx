'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayMountain({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mist drift
      gsap.to('.mist-layer', {
        x: 50, opacity: 0.1,
        duration: 9, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 2,
      })

      // Hero title
      gsap.fromTo('.summit-title', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: 'power4.out', delay: 0.4,
      })

      // Mountain parallax layers
      gsap.to('.mountain-far', {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: '.summit-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.mountain-mid', {
        yPercent: -22, ease: 'none',
        scrollTrigger: { trigger: '.summit-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.mountain-near', {
        yPercent: -35, ease: 'none',
        scrollTrigger: { trigger: '.summit-hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.summit-persona',
        start: 'top 72%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
          })
        },
      })

      // Trail markers draw in
      ScrollTrigger.create({
        trigger: '.trail-path',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.trail-line', { strokeDashoffset: 600 }, {
            strokeDashoffset: 0, duration: 2, ease: 'power2.inOut',
          })
          gsap.fromTo('.trail-marker', { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(2)', delay: 0.5,
          })
        },
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.summit-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Fun fact cards
      gsap.utils.toArray<HTMLElement>('.peak-card').forEach(el => {
        gsap.fromTo(el, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Altitude number
      ScrollTrigger.create({
        trigger: '.altitude-display',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.altitude-display', { scale: 0.7, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.6, ease: 'expo.out',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#1C1F1A] text-[#E8E4D8] overflow-x-hidden"
      style={{ fontFamily: "'Lato', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="summit-hero relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0D1117 0%, #1C1F1A 50%, #252820 100%)' }} />

        {/* Stars */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 100}%`,
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
              }} />
          ))}
        </div>

        {/* Mountain layers */}
        <div className="mountain-far absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="w-full">
            <path d="M0 400 L180 180 L360 280 L540 120 L720 200 L900 100 L1080 220 L1260 160 L1440 240 L1440 400Z"
              fill="#2A2E28" />
          </svg>
        </div>
        <div className="mountain-mid absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 350" preserveAspectRatio="xMidYMax slice" className="w-full">
            <path d="M0 350 L120 220 L280 300 L440 160 L600 250 L760 130 L920 210 L1100 170 L1280 230 L1440 180 L1440 350Z"
              fill="#323630" />
          </svg>
        </div>
        <div className="mountain-near absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice" className="w-full">
            <path d="M0 300 L100 240 L220 280 L360 200 L500 260 L640 180 L780 240 L920 190 L1060 250 L1200 200 L1340 260 L1440 220 L1440 300Z"
              fill="#1C1F1A" />
          </svg>
        </div>

        {/* Mist layers */}
        <div className="mist-layer absolute bottom-32 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(232,228,216,0.06), transparent)', opacity: 0.08 }} />
        <div className="mist-layer absolute bottom-48 left-0 right-0 h-16 pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(232,228,216,0.04), transparent)', opacity: 0.06 }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="summit-title text-[#8A9E8A] tracking-[0.5em] text-xs uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              Summit
            </p>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="summit-title leading-none"
              style={{
                fontFamily: "'Josefin Sans', sans-serif",
                fontSize: 'clamp(3rem, 11vw, 7.5rem)',
                color: '#E8E4D8',
                letterSpacing: '0.05em',
                fontWeight: 700,
              }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-4">
              <p className="summit-title text-[#8A9E8A] text-3xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          {age !== undefined && (
            <div className="overflow-hidden mt-6">
              <p className="summit-title text-[#E8E4D8] opacity-40 tracking-[0.3em] uppercase text-sm"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Altitude: {age} Years
              </p>
            </div>
          )}
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <div className="w-px h-12 bg-gradient-to-b from-[#8A9E8A] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="summit-persona relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#252820]" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(138,158,138,0.06) 0%, transparent 70%)' }} />

        <div className="relative z-10 flex flex-col items-center">
          <p className="summit-reveal text-[#8A9E8A] tracking-[0.4em] text-xs uppercase mb-3"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            The Summiteer
          </p>
          <h2 className="summit-reveal text-4xl text-[#E8E4D8] mb-12"
            style={{ fontFamily: "'Dancing Script', cursive", fontSize: '3rem' }}>
            {celebrant.name}
          </h2>

          {age !== undefined && (
            <div className="altitude-display mb-10 text-center">
              <p className="text-[#8A9E8A] text-xs tracking-[0.4em] uppercase mb-1"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Altitude Reached
              </p>
              <p className="font-bold leading-none"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  fontSize: 'clamp(4rem, 16vw, 10rem)',
                  color: '#E8E4D8',
                  opacity: 0.15,
                }}>
                {age}
              </p>
            </div>
          )}

          <div className="persona-figure">
            
          </div>

          {story.message && (
            <p className="summit-reveal mt-8 max-w-md text-center text-lg text-[#E8E4D8] opacity-55 leading-relaxed italic"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem' }}>
              "{story.message}"
            </p>
          )}
        </div>
      </section>

      {/* ── TRAIL MARKERS (highlights) ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1C1F1A]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="summit-reveal text-[#8A9E8A] tracking-[0.4em] text-xs uppercase mb-3"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                The Ascent
              </p>
              <h2 className="summit-reveal text-4xl text-[#E8E4D8]"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}>
                Trail Markers
              </h2>
            </div>

            {/* Trail path with SVG line */}
            <div className="trail-path relative">
              {/* Vertical trail line */}
              <svg className="absolute left-5 top-0 bottom-0 h-full pointer-events-none" width="10"
                style={{ height: `${story.highlights.length * 120}px` }}>
                <line
                  className="trail-line"
                  x1="5" y1="0" x2="5" y2="100%"
                  stroke="rgba(138,158,138,0.3)" strokeWidth="2"
                  strokeDasharray="600" strokeDashoffset="600"
                  strokeLinecap="round"
                />
              </svg>

              <div className="space-y-10 pl-16">
                {story.highlights.map((highlight, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    {/* Trail marker dot */}
                    <div className="trail-marker absolute -left-11 top-1 w-4 h-4 rounded-full border-2 border-[#8A9E8A] flex items-center justify-center"
                      style={{ background: '#1C1F1A' }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8A9E8A]" />
                    </div>
                    <div>
                      <span className="text-[#8A9E8A] text-xs tracking-widest uppercase"
                        style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                        Stop {i + 1}
                      </span>
                      <p className="mt-1 text-lg text-[#E8E4D8] opacity-70 leading-relaxed">{highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#252820]" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="summit-reveal text-[#8A9E8A] tracking-[0.4em] text-xs uppercase mb-3"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                Field Notes
              </p>
              <h2 className="summit-reveal text-4xl text-[#E8E4D8]"
                style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}>
                Things to Know
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="peak-card p-6"
                  style={{ background: 'rgba(138,158,138,0.05)', border: '1px solid rgba(138,158,138,0.15)' }}>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                        <path d="M12 2L14 8H20L15 12L17 18L12 14L7 18L9 12L4 8H10Z"
                          fill="rgba(138,158,138,0.4)" />
                      </svg>
                    </div>
                    <p className="text-[#E8E4D8] opacity-65 leading-relaxed">{fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#4A5568" label="Moments" />
      )}

      {/* ── DATE / EVENT ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1F1A]" />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice" className="w-full opacity-20">
            <path d="M0 200 L200 120 L400 160 L600 80 L800 140 L1000 60 L1200 130 L1440 90 L1440 200Z"
              fill="#4A5568" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="summit-reveal text-[#8A9E8A] tracking-[0.4em] text-xs uppercase mb-8"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            Base Camp
          </p>
          <h2 className="summit-reveal text-4xl md:text-5xl text-[#E8E4D8] mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 700 }}>
            {event.venue}
          </h2>
          <div className="summit-reveal space-y-2 mb-8">
            <p className="text-[#E8E4D8] opacity-50">{eventDate}</p>
            {event.time && <p className="text-[#8A9E8A] text-xl">{event.time}</p>}

            <div className="mt-6">
              <CountdownTimer
                targetDate={event.date}
                accentColor="#4A5568"
                textColor="#E8E4DC"
                label="Counting Down"
              />
            </div>

            {event.address && <p className="text-[#E8E4D8] opacity-40 text-sm">{event.address}</p>}
            <p className="text-[#E8E4D8] opacity-60">{event.city}</p>
          </div>
          {event.mapUrl && (
            <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
              className="summit-reveal inline-block px-8 py-3 border border-[#8A9E8A] border-opacity-30 text-[#8A9E8A] text-xs tracking-[0.2em] uppercase hover:bg-[#8A9E8A] hover:text-[#1C1F1A] transition-all duration-500"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
              View on Map
            </a>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#252820]" />
          <div className="relative z-10 max-w-xl mx-auto text-center summit-reveal">
            <div className="h-px w-16 bg-[#8A9E8A] opacity-30 mx-auto mb-8" />
            <p className="text-xl text-[#E8E4D8] opacity-60 leading-relaxed italic"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem' }}>
              "{customMessage}"
            </p>
            <div className="h-px w-16 bg-[#8A9E8A] opacity-30 mx-auto mt-8" />
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1F1A]" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(138,158,138,0.08) 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="summit-reveal text-[#8A9E8A] tracking-[0.4em] text-xs uppercase mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
            You Are Invited
          </p>
          <h2 className="summit-reveal text-6xl text-[#E8E4D8] mb-6"
            style={{ fontFamily: "'Dancing Script', cursive" }}>
            Join the Summit
          </h2>
          <p className="summit-reveal text-lg text-[#E8E4D8] opacity-45 mb-10 leading-relaxed">
            Every peak is better with good company. Come celebrate {celebrant.name}.
            {age !== undefined && ` ${age} years of climbing higher.`}
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#E8E4D8] hover:text-[#1C1F1A]"
              style={{
                background: 'transparent',
                color: '#8A9E8A',
                border: '1px solid rgba(138,158,138,0.4)',
                fontFamily: "'Josefin Sans', sans-serif",
              }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#8A9E8A] opacity-15" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A9E8A] opacity-25" />
            <div className="h-px w-16 bg-[#8A9E8A] opacity-15" />
          </div>
          <p className="text-3xl text-[#E8E4D8] opacity-15" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {celebrant.name}
          </p>
        </div>
      </section>
    </div>
  )
}
