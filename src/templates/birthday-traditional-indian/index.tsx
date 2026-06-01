'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import Mandala from '@/templates/wedding-traditional-indian/Mandala'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayTraditionalIndian({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diya flicker
      gsap.to('.diya-flame', {
        scaleY: 1.35, scaleX: 0.8, opacity: 0.65,
        duration: 0.35, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.08,
      })

      // Hero entrance
      gsap.fromTo('.jashn-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: 'power4.out', delay: 0.4,
      })
      gsap.fromTo('.jashn-subtitle', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 1.4,
      })

      // Mandala entrance
      gsap.fromTo('.mandala-hero', { opacity: 0, scale: 0.6, rotate: -30 }, {
        opacity: 1, scale: 1, rotate: 0, duration: 2, ease: 'power3.out', delay: 0.2,
      })

      // Marigold petals
      gsap.utils.toArray<HTMLElement>('.marigold-petal').forEach((el, i) => {
        gsap.fromTo(el, { y: -20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5 + i * 0.07, ease: 'bounce.out',
        })
        gsap.to(el, {
          y: 8, rotate: `+=${i % 2 === 0 ? 12 : -12}`,
          duration: 2 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.1,
        })
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.jashn-persona',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.3, ease: 'back.out(1.2)',
          })
          gsap.fromTo('.persona-label', { x: 40, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4,
          })
        },
      })

      // Life chapters
      ScrollTrigger.create({
        trigger: '.jashn-chapters',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.jashn-chapter', { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out',
          })
        },
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.jashn-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Date section
      ScrollTrigger.create({
        trigger: '.jashn-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.date-char', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.4)',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#1A0505] text-[#FDF0E0] overflow-x-hidden"
      style={{ fontFamily: "'Hind', sans-serif" }}>

      <style>{`
        @keyframes diya-flicker {
          0%, 100% { opacity: 0.9; transform: scaleY(1) scaleX(1); }
          25% { opacity: 0.6; transform: scaleY(1.3) scaleX(0.8); }
          50% { opacity: 1; transform: scaleY(0.9) scaleX(1.1); }
          75% { opacity: 0.7; transform: scaleY(1.2) scaleX(0.85); }
        }
        .diya-css-flicker { animation: diya-flicker 0.6s ease-in-out infinite; }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_#1A0505_60%)]" />

        {/* Mandala background */}
        <div className="mandala-hero absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mandala size={600} color="#DC2626" opacity={0.08} animated />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mandala size={380} color="#F59E0B" opacity={0.1} animated />
        </div>

        {/* Marigold garland top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 pt-4 overflow-hidden">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="marigold-petal flex-shrink-0"
              style={{
                width: 13, height: 19,
                background: i % 3 === 0 ? '#DC2626' : i % 3 === 1 ? '#F59E0B' : '#EA580C',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: 0.85,
              }} />
          ))}
        </div>

        {/* Diyas — corners */}
        {[{ left: '4%' }, { left: '11%' }, { right: '4%' }, { right: '11%' }].map((pos, i) => (
          <div key={i} className="absolute bottom-16 flex flex-col items-center" style={pos as React.CSSProperties}>
            <div className="diya-flame diya-css-flicker w-3 h-5 rounded-full mb-0.5"
              style={{ background: 'radial-gradient(ellipse at bottom, #FCD34D, #F59E0B, #DC2626)', transformOrigin: 'bottom center' }} />
            <div className="w-8 h-4 rounded-b-full" style={{ background: '#92400E' }} />
          </div>
        ))}

        {/* Corner mandala ornaments */}
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-14 h-14 opacity-25`}>
            <Mandala size={56} color="#F59E0B" opacity={1} animated={false} />
          </div>
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-2">
            <p className="jashn-title text-[#F59E0B] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              जन्मदिन मुबारक · Jashn
            </p>
          </div>

          <div className="overflow-hidden mb-1">
            <h1 className="jashn-title leading-none"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: 'clamp(3.5rem, 13vw, 9rem)',
                color: '#FDF0E0',
              }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-3">
              <p className="jashn-title text-[#F59E0B] text-xl tracking-widest"
                style={{ fontFamily: "'Hind', sans-serif" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          {age !== undefined && (
            <div className="overflow-hidden my-4">
              <p className="jashn-title font-bold leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(4rem, 18vw, 11rem)',
                  color: '#F59E0B',
                  opacity: 0.9,
                  textShadow: '0 0 60px rgba(245,158,11,0.4)',
                }}>
                {age}
              </p>
            </div>
          )}

          <div className="jashn-subtitle">
            <p className="text-[#F59E0B] text-lg tracking-widest mb-2" style={{ fontFamily: "'Hind', sans-serif" }}>
              साल पूरे हुए — जश्न मनाने का वक्त है
            </p>
            <p className="text-[#FDF0E0] opacity-50 text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>
              {event.city}
            </p>
          </div>
        </div>

        {/* Bottom marigold garland */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4 overflow-hidden">
          {Array.from({ length: 26 }).map((_, i) => (
            <div key={i} className="marigold-petal flex-shrink-0"
              style={{
                width: 13, height: 19,
                background: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#DC2626' : '#EA580C',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: 0.85,
                transform: 'rotate(180deg)',
              }} />
          ))}
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="jashn-persona relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#200808]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_transparent_70%)]" />

        {/* Decorative border */}
        <div className="absolute inset-4 border border-[#DC2626] border-opacity-20 pointer-events-none" />
        <div className="absolute inset-6 border border-[#F59E0B] border-opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-10 max-w-3xl mx-auto">
          <div className="persona-figure flex-shrink-0">
            
          </div>
          <div className="persona-label flex-1 text-center md:text-left">
            <p className="text-[#F59E0B] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              आज की मुख्य मेहमान
            </p>
            <h2 className="text-5xl text-[#FDF0E0] mb-4"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {celebrant.name}
            </h2>
            {story.message && (
              <p className="text-lg text-[#FDF0E0] opacity-60 leading-relaxed italic"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                "{story.message}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── LIFE CHAPTERS ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1A0505]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#DC2626] to-transparent opacity-15 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#DC2626] opacity-40" />
                <span className="text-[#F59E0B] text-xl">❋</span>
                <div className="h-px w-12 bg-[#DC2626] opacity-40" />
              </div>
              <p className="jashn-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                ज़िंदगी के अध्याय
              </p>
              <h2 className="jashn-reveal text-4xl text-[#FDF0E0]"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Life Chapters
              </h2>
            </div>

            <div className="jashn-chapters space-y-10">
              {story.highlights.map((highlight, i) => (
                <div key={i} className="jashn-chapter">
                  {/* Decorative divider */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#DC2626] opacity-25" />
                    <div className="w-6 h-6 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="#F59E0B" opacity="0.6">
                        <path d="M12 2 L13.8 8.2 L20 8.2 L14.9 11.8 L16.7 18 L12 14.4 L7.3 18 L9.1 11.8 L4 8.2 L10.2 8.2Z" />
                      </svg>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#DC2626] opacity-25" />
                  </div>
                  <div className="text-center">
                    <span className="text-[#F59E0B] text-xs tracking-widest uppercase"
                      style={{ fontFamily: "'Playfair Display', serif" }}>
                      Chapter {i + 1}
                    </span>
                    <p className="mt-2 text-lg text-[#FDF0E0] opacity-70 leading-relaxed">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#200808]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15">
            <Mandala size={400} color="#F59E0B" opacity={0.3} animated />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-14">
              <p className="jashn-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                कुछ खास बातें
              </p>
              <h2 className="jashn-reveal text-4xl text-[#FDF0E0]"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Did You Know?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="jashn-reveal p-6"
                  style={{
                    background: 'rgba(220,38,38,0.05)',
                    border: '1px solid rgba(220,38,38,0.2)',
                    borderTop: '2px solid rgba(245,158,11,0.4)',
                  }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[#F59E0B] text-lg flex-shrink-0">❋</span>
                    <p className="text-[#FDF0E0] opacity-70 leading-relaxed">{fact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#DC2626" label="Moments" />
      )}

      {/* ── DATE ── */}
      <section className="jashn-date relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1A0505]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-15">
          <Mandala size={500} color="#DC2626" opacity={0.3} animated />
        </div>

        <div className="relative z-10 text-center">
          <p className="jashn-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-10"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            शुभ तिथि · Auspicious Date
          </p>

          <div className="flex flex-wrap items-center justify-center gap-1 mb-8">
            {eventDate.split('').map((char, i) => (
              <span key={i} className="date-char inline-block"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: char === ' ' || char === ',' ? '1rem' : '2.2rem',
                  color: /[0-9]/.test(char) ? '#FDF0E0' : '#F59E0B',
                  lineHeight: 1.2,
                  minWidth: char === ' ' ? '0.5rem' : 'auto',
                }}>
                {char}
              </span>
            ))}
          </div>

          {event.time && (
            <p className="jashn-reveal text-xl text-[#FDF0E0] opacity-50 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {event.time}
            </p>
          )}

          <div className="mt-2 mb-8">
            <CountdownTimer
              targetDate={event.date}
              accentColor="#DC2626"
              textColor="#FDF0E0"
              label="Counting Down"
            />
          </div>

          <div className="jashn-reveal">
            <h2 className="text-3xl md:text-4xl text-[#FDF0E0] mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {event.venue}
            </h2>
            {event.address && (
              <p className="text-[#FDF0E0] opacity-45 mb-1">{event.address}</p>
            )}
            <p className="text-[#F59E0B] text-lg">{event.city}</p>
          </div>

          {event.mapUrl && (
            <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
              className="jashn-reveal inline-block mt-8 px-8 py-3 border border-[#DC2626] border-opacity-40 text-[#F59E0B] text-xs tracking-[0.2em] uppercase hover:bg-[#DC2626] hover:text-[#FDF0E0] transition-all duration-500">
              View on Map
            </a>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#200808]" />
          <div className="relative z-10 max-w-xl mx-auto text-center jashn-reveal">
            <span className="text-[#DC2626] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#FDF0E0] opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              {customMessage}
            </p>
            <span className="text-[#DC2626] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1A0505]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mandala size={400} color="#F59E0B" opacity={0.06} animated />
        </div>

        {/* Top strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626] opacity-60" />

        {/* Diyas flanking RSVP */}
        {[{ left: '8%' }, { right: '8%' }].map((pos, i) => (
          <div key={i} className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={pos as React.CSSProperties}>
            <div className="diya-flame diya-css-flicker w-3 h-5 rounded-full mb-0.5"
              style={{ background: 'radial-gradient(ellipse at bottom, #FCD34D, #F59E0B, #DC2626)', transformOrigin: 'bottom center' }} />
            <div className="w-8 h-4 rounded-b-full" style={{ background: '#92400E' }} />
          </div>
        ))}

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="jashn-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            आप सादर आमंत्रित हैं
          </p>
          <h2 className="jashn-reveal text-6xl text-[#FDF0E0] mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}>
            You Are Invited
          </h2>
          <p className="jashn-reveal text-lg text-[#FDF0E0] opacity-55 mb-10 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Come celebrate {celebrant.name} — dholak bajao, mithai khao, jashn manao.
            {age !== undefined && ` ${age} saal ki khushiyan!`}
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#FDF0E0] hover:text-[#1A0505]"
              style={{ background: '#DC2626', color: '#FDF0E0' }}>
              RSVP
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#DC2626] opacity-25" />
            <span className="text-[#F59E0B] text-xl">❋</span>
            <div className="h-px w-16 bg-[#DC2626] opacity-25" />
          </div>
          <p className="text-3xl text-[#FDF0E0] opacity-20" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {celebrant.name}
          </p>
          <p className="text-[#FDF0E0] opacity-10 text-xs tracking-widest uppercase mt-2">
            {event.city}
          </p>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626] opacity-60" />
      </section>
    </div>
  )
}
