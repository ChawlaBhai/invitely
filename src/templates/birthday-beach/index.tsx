'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayBeach({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title
      gsap.fromTo('.beach-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power4.out', delay: 0.4,
      })
      gsap.fromTo('.beach-sub', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.3,
      })

      // Age golden glow
      gsap.to('.age-golden', {
        textShadow: '0 0 60px rgba(245,158,11,0.8), 0 0 100px rgba(245,158,11,0.4)',
        duration: 2.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.beach-persona',
        start: 'top 72%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.3, ease: 'power3.out',
          })
        },
      })

      // Tide mark chapters
      ScrollTrigger.create({
        trigger: '.tide-marks',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.tide-chapter', { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          })
        },
      })

      // Bottle cards float
      gsap.utils.toArray<HTMLElement>('.bottle-card').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : -14, rotate: i % 2 === 0 ? 1 : -1,
          duration: 3 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.3,
        })
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.beach-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Sun parallax in hero
      gsap.to('.hero-sun', {
        yPercent: 30, ease: 'none',
        scrollTrigger: { trigger: '.beach-hero', start: 'top top', end: 'bottom top', scrub: true },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#0A1628] text-[#F5ECD8] overflow-x-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}>

      <style>{`
        @keyframes wave-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .wave-anim { animation: wave-move 8s linear infinite; }
        .wave-anim-slow { animation: wave-move 12s linear infinite; }
        .wave-anim-slower { animation: wave-move 16s linear infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="beach-hero relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Golden hour sky gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0A1628 0%, #1A2A4A 30%, #2D1B0A 60%, #0A1628 100%)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(245,158,11,0.18) 0%, rgba(234,88,12,0.08) 30%, transparent 65%)' }} />

        {/* Sun */}
        <div className="hero-sun absolute pointer-events-none"
          style={{ top: '28%', left: '50%', transform: 'translateX(-50%)' }}>
          <div className="w-32 h-32 rounded-full"
            style={{ background: 'radial-gradient(circle, #FCD34D 0%, #F59E0B 40%, rgba(245,158,11,0) 70%)', opacity: 0.6 }} />
        </div>

        {/* Ocean shimmer */}
        <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.9) 0%, rgba(10,22,40,0.3) 60%, transparent 100%)' }} />

        {/* Wave layers — CSS animated */}
        <div className="absolute bottom-16 left-0 right-0 overflow-hidden h-20 pointer-events-none">
          <div className="wave-anim" style={{ width: '200%', display: 'flex' }}>
            <svg viewBox="0 0 1440 80" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 40 Q180 10 360 40 Q540 70 720 40 Q900 10 1080 40 Q1260 70 1440 40 L1440 80 L0 80Z"
                fill="rgba(245,158,11,0.08)" />
            </svg>
            <svg viewBox="0 0 1440 80" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 40 Q180 10 360 40 Q540 70 720 40 Q900 10 1080 40 Q1260 70 1440 40 L1440 80 L0 80Z"
                fill="rgba(245,158,11,0.08)" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 overflow-hidden h-16 pointer-events-none">
          <div className="wave-anim-slow" style={{ width: '200%', display: 'flex' }}>
            <svg viewBox="0 0 1440 64" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 32 Q180 8 360 32 Q540 56 720 32 Q900 8 1080 32 Q1260 56 1440 32 L1440 64 L0 64Z"
                fill="rgba(245,158,11,0.12)" />
            </svg>
            <svg viewBox="0 0 1440 64" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 32 Q180 8 360 32 Q540 56 720 32 Q900 8 1080 32 Q1260 56 1440 32 L1440 64 L0 64Z"
                fill="rgba(245,158,11,0.12)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="beach-title text-[#F59E0B] tracking-[0.5em] text-xs uppercase"
              style={{ fontFamily: "'Abril Fatface', cursive" }}>
              Golden Hour
            </p>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="beach-title leading-none"
              style={{
                fontFamily: "'Abril Fatface', cursive",
                fontSize: 'clamp(3rem, 11vw, 7.5rem)',
                color: '#F5ECD8',
              }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-4">
              <p className="beach-title text-[#F59E0B] text-3xl"
                style={{ fontFamily: "'Pacifico', cursive" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          {age !== undefined && (
            <div className="overflow-hidden my-6">
              <p className="beach-title age-golden font-bold leading-none"
                style={{
                  fontFamily: "'Abril Fatface', cursive",
                  fontSize: 'clamp(5rem, 20vw, 13rem)',
                  color: '#F59E0B',
                  textShadow: '0 0 40px rgba(245,158,11,0.5)',
                }}>
                {age}
              </p>
            </div>
          )}

          <div className="beach-sub flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-[#F59E0B] opacity-40" />
            <p className="text-[#F5ECD8] opacity-50 text-sm"
              style={{ fontFamily: "'Pacifico', cursive" }}>
              sun-soaked & celebrated
            </p>
            <div className="h-px w-16 bg-[#F59E0B] opacity-40" />
          </div>
        </div>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
          <div className="w-px h-10 bg-gradient-to-b from-[#F59E0B] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="beach-persona relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0A1628, #0F1E38)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)' }} />

        {/* Wave separator top */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden h-12 pointer-events-none">
          <div className="wave-anim-slower" style={{ width: '200%', display: 'flex' }}>
            <svg viewBox="0 0 1440 48" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 24 Q180 4 360 24 Q540 44 720 24 Q900 4 1080 24 Q1260 44 1440 24 L1440 0 L0 0Z"
                fill="rgba(245,158,11,0.06)" />
            </svg>
            <svg viewBox="0 0 1440 48" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 24 Q180 4 360 24 Q540 44 720 24 Q900 4 1080 24 Q1260 44 1440 24 L1440 0 L0 0Z"
                fill="rgba(245,158,11,0.06)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.4em] text-xs uppercase mb-3">
            The Birthday Soul
          </p>
          <h2 className="beach-reveal text-5xl text-[#F5ECD8] mb-12"
            style={{ fontFamily: "'Pacifico', cursive" }}>
            {celebrant.name}
          </h2>
          <div className="persona-figure">
            
          </div>
          {story.message && (
            <p className="beach-reveal mt-8 max-w-md text-center text-lg text-[#F5ECD8] opacity-55 leading-relaxed"
              style={{ fontFamily: "'Pacifico', cursive", fontSize: '1.2rem' }}>
              "{story.message}"
            </p>
          )}
        </div>
      </section>

      {/* ── TIDE MARKS (highlights) ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A1628]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="beach-reveal text-[#F59E0B] tracking-[0.4em] text-xs uppercase mb-3">
                The Journey
              </p>
              <h2 className="beach-reveal text-4xl text-[#F5ECD8]"
                style={{ fontFamily: "'Abril Fatface', cursive" }}>
                Tide Marks
              </h2>
            </div>

            <div className="tide-marks space-y-12">
              {story.highlights.map((highlight, i) => (
                <div key={i} className="tide-chapter">
                  {/* Wave separator */}
                  <div className="overflow-hidden h-6 mb-4 opacity-30">
                    <svg viewBox="0 0 400 24" className="w-full" preserveAspectRatio="none">
                      <path d="M0 12 Q50 2 100 12 Q150 22 200 12 Q250 2 300 12 Q350 22 400 12"
                        stroke="#F59E0B" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[#F59E0B] font-bold flex-shrink-0 opacity-50"
                      style={{ fontFamily: "'Abril Fatface', cursive", fontSize: '1.6rem', lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-[#F5ECD8] opacity-70 leading-relaxed pt-1">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS — message in a bottle ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0F1E38]" />
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center bottom, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="beach-reveal text-[#F59E0B] tracking-[0.4em] text-xs uppercase mb-3">
                Washed Ashore
              </p>
              <h2 className="beach-reveal text-4xl text-[#F5ECD8]"
                style={{ fontFamily: "'Abril Fatface', cursive" }}>
                Messages in a Bottle
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="bottle-card p-6 rounded-sm"
                  style={{
                    background: 'rgba(245,158,11,0.05)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderTop: '2px solid rgba(245,158,11,0.35)',
                  }}>
                  {/* Bottle neck decoration */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-1 rounded-full bg-[#F59E0B] opacity-40" />
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] opacity-30" />
                  </div>
                  <p className="text-[#F5ECD8] opacity-65 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#F59E0B" label="Moments" />
      )}

      {/* ── DATE / EVENT ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0A1628]" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-16 pointer-events-none">
          <div className="wave-anim" style={{ width: '200%', display: 'flex' }}>
            <svg viewBox="0 0 1440 64" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 32 Q180 8 360 32 Q540 56 720 32 Q900 8 1080 32 Q1260 56 1440 32 L1440 64 L0 64Z"
                fill="rgba(245,158,11,0.07)" />
            </svg>
            <svg viewBox="0 0 1440 64" className="w-1/2 flex-shrink-0" preserveAspectRatio="none">
              <path d="M0 32 Q180 8 360 32 Q540 56 720 32 Q900 8 1080 32 Q1260 56 1440 32 L1440 64 L0 64Z"
                fill="rgba(245,158,11,0.07)" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.4em] text-xs uppercase mb-8">
            Where the Party Meets the Shore
          </p>
          <h2 className="beach-reveal text-4xl md:text-5xl text-[#F5ECD8] mb-6"
            style={{ fontFamily: "'Abril Fatface', cursive" }}>
            {event.venue}
          </h2>
          <div className="beach-reveal space-y-2 mb-8">
            <p className="text-[#F5ECD8] opacity-50">{eventDate}</p>
            {event.time && <p className="text-[#F59E0B] text-xl">{event.time}</p>}
            {event.address && <p className="text-[#F5ECD8] opacity-40 text-sm">{event.address}</p>}
            <p className="text-[#F5ECD8] opacity-65">{event.city}</p>
          </div>

          <div className="mt-2 mb-8">
            <CountdownTimer
              targetDate={event.date}
              accentColor="#F59E0B"
              textColor="#FFF8F0"
              label="Counting Down"
            />
          </div>

          {event.mapUrl && (
            <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
              className="beach-reveal inline-block px-8 py-3 border border-[#F59E0B] border-opacity-35 text-[#F59E0B] text-xs tracking-[0.2em] uppercase hover:bg-[#F59E0B] hover:text-[#0A1628] transition-all duration-500">
              View on Map
            </a>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0F1E38]" />
          <div className="relative z-10 max-w-xl mx-auto text-center beach-reveal">
            <span className="text-[#F59E0B] text-5xl opacity-25" style={{ fontFamily: "'Abril Fatface', cursive" }}>"</span>
            <p className="text-xl text-[#F5ECD8] opacity-60 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              {customMessage}
            </p>
            <span className="text-[#F59E0B] text-5xl opacity-25" style={{ fontFamily: "'Abril Fatface', cursive" }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0A1628, #0D1A30)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.1) 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.4em] text-xs uppercase mb-6">
            You Are Invited
          </p>
          <h2 className="beach-reveal text-6xl text-[#F5ECD8] mb-6"
            style={{ fontFamily: "'Pacifico', cursive" }}>
            Catch the Wave
          </h2>
          <p className="beach-reveal text-lg text-[#F5ECD8] opacity-45 mb-10 leading-relaxed">
            Come celebrate {celebrant.name}&apos;s golden hour.
            {age !== undefined && ` ${age} years of sunshine and salt air.`}
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#F5ECD8] hover:text-[#0A1628]"
              style={{ background: '#F59E0B', color: '#0A1628', boxShadow: '0 0 40px rgba(245,158,11,0.3)' }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#F59E0B] opacity-15" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] opacity-25" />
            <div className="h-px w-16 bg-[#F59E0B] opacity-15" />
          </div>
          <p className="text-3xl text-[#F5ECD8] opacity-15" style={{ fontFamily: "'Pacifico', cursive" }}>
            {celebrant.name}
          </p>
        </div>
      </section>
    </div>
  )
}
