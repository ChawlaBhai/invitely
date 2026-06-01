'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 0.5,
  delay: `${Math.random() * 4}s`,
  duration: `${Math.random() * 3 + 2}s`,
}))

export default function BirthdayCelestial({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero blur-in
      gsap.fromTo('.cel-title', { y: 80, opacity: 0, filter: 'blur(12px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: 1.8, stagger: 0.2, ease: 'power4.out', delay: 0.4,
      })

      // Age glow pulse
      gsap.to('.age-glow', {
        textShadow: '0 0 80px rgba(124,58,237,0.9), 0 0 120px rgba(124,58,237,0.5)',
        duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Nebula breathe
      gsap.to('.nebula-orb', {
        scale: 1.2, opacity: 0.07,
        duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.5,
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.cel-persona',
        start: 'top 72%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 60, opacity: 0, filter: 'blur(8px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out',
          })
          gsap.fromTo('.orbit-ring', { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.8, ease: 'elastic.out(1, 0.5)', delay: 0.6,
          })
        },
      })

      // Orbit dot spin
      gsap.to('.orbit-dot', {
        rotation: 360, transformOrigin: '50% 50%',
        duration: 10, ease: 'none', repeat: -1,
      })
      gsap.to('.orbit-dot-2', {
        rotation: -360, transformOrigin: '50% 50%',
        duration: 14, ease: 'none', repeat: -1,
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.cel-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0, filter: 'blur(4px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Orbit stops stagger
      ScrollTrigger.create({
        trigger: '.orbit-stops',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.orbit-stop', { x: -40, opacity: 0 }, {
            x: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          })
        },
      })

      // Fun fact cards float
      gsap.utils.toArray<HTMLElement>('.fact-card').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : -8, x: i % 3 === 0 ? 6 : -6,
          duration: 3 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.3,
        })
      })

      // Date section
      ScrollTrigger.create({
        trigger: '.cel-date',
        start: 'top 68%',
        onEnter: () => {
          gsap.fromTo('.date-piece', { scale: 0.5, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.4, stagger: 0.12, ease: 'expo.out',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#050510] text-[#E8E0FF] overflow-x-hidden"
      style={{ fontFamily: "'Raleway', sans-serif" }}>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        .star-particle { animation: twinkle var(--dur) var(--delay) ease-in-out infinite; }
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 60s linear infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map(s => (
            <div
              key={s.id}
              className="star-particle absolute rounded-full bg-white"
              style={{
                top: s.top, left: s.left,
                width: s.size, height: s.size,
                '--dur': s.duration, '--delay': s.delay,
              } as React.CSSProperties}
            />
          ))}
        </div>

        {/* Nebula orbs */}
        <div className="nebula-orb absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, #4C1D95 30%, transparent 70%)', opacity: 0.05 }} />
        <div className="nebula-orb absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)', opacity: 0.04 }} />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="cel-title text-[#A78BFA] tracking-[0.5em] text-xs uppercase">
              Another Trip Around the Sun
            </p>
          </div>

          <div className="overflow-hidden mb-2">
            <h1 className="cel-title leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem, 11vw, 7.5rem)', color: '#E8E0FF' }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-4">
              <p className="cel-title text-[#A78BFA] text-2xl italic"
                style={{ fontFamily: "'Great Vibes', cursive" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          {age !== undefined && (
            <div className="overflow-hidden my-8">
              <p className="cel-title age-glow font-bold leading-none"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: 'clamp(5rem, 20vw, 14rem)',
                  color: '#E8E0FF',
                  textShadow: '0 0 60px rgba(124,58,237,0.6)',
                }}>
                {age}
              </p>
            </div>
          )}

          <div className="overflow-hidden">
            <p className="cel-title text-[#A78BFA] tracking-widest uppercase text-sm"
              style={{ fontWeight: 300 }}>
              Years of Stardust & Wonder
            </p>
          </div>

          <div className="overflow-hidden mt-4">
            <p className="cel-title text-[#E8E0FF] opacity-35 text-sm"
              style={{ fontWeight: 300 }}>
              {event.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A78BFA]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#7C3AED] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="cel-persona relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#080818]" />
        <div className="absolute inset-0 pointer-events-none">
          {STARS.slice(0, 40).map(s => (
            <div key={s.id} className="star-particle absolute rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.size * 0.7, height: s.size * 0.7, '--dur': s.duration, '--delay': s.delay } as React.CSSProperties} />
          ))}
        </div>

        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orbit-ring w-72 h-72 rounded-full border border-[#7C3AED] border-opacity-20 relative">
            <div className="orbit-dot absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#A78BFA] opacity-70" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orbit-ring w-96 h-96 rounded-full border border-[#A78BFA] border-opacity-10 relative">
            <div className="orbit-dot-2 absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#7C3AED] opacity-50" />
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <p className="cel-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-3">The Star of the Night</p>
          <h2 className="cel-reveal text-4xl text-[#E8E0FF] mb-12" style={{ fontFamily: "'Cinzel', serif" }}>
            {celebrant.name}
          </h2>
          <div className="persona-figure">
            
          </div>
          {story.message && (
            <p className="cel-reveal mt-8 max-w-md text-center text-lg text-[#E8E0FF] opacity-60 leading-relaxed italic"
              style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.6rem' }}>
              "{story.message}"
            </p>
          )}
        </div>
      </section>

      {/* ── LIFE STORY / ORBIT STOPS ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#050510]" />
          <div className="absolute inset-0 pointer-events-none">
            {STARS.slice(0, 30).map(s => (
              <div key={s.id} className="star-particle absolute rounded-full bg-white"
                style={{ top: s.top, left: s.left, width: s.size * 0.6, height: s.size * 0.6, '--dur': s.duration, '--delay': s.delay } as React.CSSProperties} />
            ))}
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <p className="cel-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-3">The Journey So Far</p>
              <h2 className="cel-reveal text-4xl text-[#E8E0FF]" style={{ fontFamily: "'Cinzel', serif" }}>
                Orbit Stops
              </h2>
            </div>

            <div className="orbit-stops space-y-10">
              {story.highlights.map((highlight, i) => (
                <div key={i} className="orbit-stop flex items-start gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border border-[#7C3AED] border-opacity-50 flex items-center justify-center"
                      style={{ background: 'rgba(124,58,237,0.1)' }}>
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#A78BFA">
                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                      </svg>
                    </div>
                    {i < story.highlights!.length - 1 && (
                      <div className="w-px flex-1 mt-2 bg-gradient-to-b from-[#7C3AED] to-transparent opacity-30 min-h-[2rem]" />
                    )}
                  </div>
                  <div className="pb-4">
                    <span className="text-[#A78BFA] text-xs tracking-widest uppercase">Chapter {i + 1}</span>
                    <p className="mt-1 text-lg text-[#E8E0FF] opacity-75 leading-relaxed" style={{ fontWeight: 300 }}>
                      {highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#080818]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="cel-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-3">Cosmic Curiosities</p>
              <h2 className="cel-reveal text-4xl text-[#E8E0FF]" style={{ fontFamily: "'Cinzel', serif" }}>
                Fun Facts
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="fact-card p-6 rounded-sm"
                  style={{ background: 'rgba(124,58,237,0.06)', border: '1px solid rgba(124,58,237,0.2)' }}>
                  <div className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0 mt-1" fill="#A78BFA" opacity="0.6">
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                    <p className="text-[#E8E0FF] opacity-70 leading-relaxed" style={{ fontWeight: 300 }}>{fact}</p>
                  </div>
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

      {/* ── DATE / EVENT ── */}
      <section className="cel-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4C1D9518_0%,_transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none">
          {STARS.slice(0, 60).map(s => (
            <div key={s.id} className="star-particle absolute rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.size * 0.8, height: s.size * 0.8, '--dur': s.duration, '--delay': s.delay } as React.CSSProperties} />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p className="cel-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-12">Mark Your Calendar</p>

          <div className="date-piece mb-6">
            <p className="text-[#E8E0FF] opacity-50 text-lg mb-2" style={{ fontWeight: 300 }}>{eventDate}</p>
            {event.time && (
              <p className="text-[#A78BFA] text-xl">{event.time}</p>
            )}
          </div>

          <div className="mt-8 mb-6">
            <CountdownTimer
              targetDate={event.date}
              accentColor="#7C3AED"
              textColor="#E8E0FF"
              label="Counting Down"
            />
          </div>

          <div className="date-piece">
            <h2 className="text-4xl md:text-5xl text-[#E8E0FF] mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              {event.venue}
            </h2>
            {event.address && (
              <p className="text-[#E8E0FF] opacity-40 mb-1" style={{ fontWeight: 300 }}>{event.address}</p>
            )}
            <p className="text-[#A78BFA] text-lg">{event.city}</p>
          </div>

          {event.mapUrl && (
            <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
              className="date-piece inline-block mt-8 px-8 py-3 border border-[#7C3AED] border-opacity-40 text-[#A78BFA] text-xs tracking-[0.2em] uppercase hover:bg-[#7C3AED] hover:text-white transition-all duration-500">
              View on Map
            </a>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#080818]" />
          <div className="relative z-10 max-w-xl mx-auto text-center cel-reveal">
            <span className="text-[#7C3AED] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#E8E0FF] opacity-65 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              {customMessage}
            </p>
            <span className="text-[#7C3AED] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#050510]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4C1D9512_0%,_transparent_60%)]" />
        <div className="absolute inset-0 pointer-events-none">
          {STARS.map(s => (
            <div key={s.id} className="star-particle absolute rounded-full bg-white"
              style={{ top: s.top, left: s.left, width: s.size, height: s.size, '--dur': s.duration, '--delay': s.delay } as React.CSSProperties} />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="cel-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="cel-reveal text-6xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Join the Celebration
          </h2>
          <p className="cel-reveal text-lg text-[#E8E0FF] opacity-50 mb-10 leading-relaxed" style={{ fontWeight: 300 }}>
            Come celebrate {celebrant.name}&apos;s journey around the sun.
            {age !== undefined && ` ${age} years of light, laughter, and love.`}
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#E8E0FF] hover:text-[#050510]"
              style={{ background: '#7C3AED', color: '#E8E0FF', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#7C3AED] opacity-20" />
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#A78BFA" opacity="0.4">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="h-px w-16 bg-[#7C3AED] opacity-20" />
          </div>
          <p className="text-3xl text-[#E8E0FF] opacity-20" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {celebrant.name}
          </p>
        </div>
      </section>
    </div>
  )
}
