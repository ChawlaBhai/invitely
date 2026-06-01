'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import Mandala from './Mandala'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingTraditionalIndian({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Diya flicker
      gsap.to('.diya-flame', {
        scaleY: 1.3, scaleX: 0.85, opacity: 0.7,
        duration: 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.1,
      })

      // Hero entrance
      gsap.fromTo('.shaadi-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: 'power4.out', delay: 0.4,
      })
      gsap.fromTo('.shaadi-subtitle', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 1.4,
      })

      // Mandala slow spin (CSS handles it, GSAP adds entrance)
      gsap.fromTo('.mandala-hero', { opacity: 0, scale: 0.6, rotate: -30 }, {
        opacity: 1, scale: 1, rotate: 0, duration: 2, ease: 'power3.out', delay: 0.2,
      })

      // Marigold petals fall
      gsap.utils.toArray<HTMLElement>('.marigold-petal').forEach((el, i) => {
        gsap.fromTo(el, { y: -20, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: 0.5 + i * 0.08, ease: 'bounce.out',
        })
        gsap.to(el, {
          y: 8, rotate: `+=${(i % 2 === 0 ? 15 : -15)}`,
          duration: 2 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.1,
        })
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.shaadi-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.shaadi-man', { x: -100, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.2)',
          })
          gsap.fromTo('.shaadi-woman', { x: 100, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.2)', delay: 0.15,
          })
          gsap.fromTo('.shaadi-heart', { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.9,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.shaadi-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date section
      ScrollTrigger.create({
        trigger: '.shaadi-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.date-char', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'back.out(1.4)',
          })
        },
      })

      // Venue parallax
      gsap.to('.shaadi-venue-bg', {
        yPercent: -25, ease: 'none',
        scrollTrigger: { trigger: '.shaadi-venue', start: 'top bottom', end: 'bottom top', scrub: true },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  const dateStr = `${day} ${month} ${year}`

  return (
    <div ref={containerRef} className="template-shaadi bg-[#1A0505] text-[#FDF0E0] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Deep jewel background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_#1A0505_60%)]" />

        {/* Mandala background */}
        <div className="mandala-hero absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mandala size={600} color="#DC2626" opacity={0.08} animated />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <Mandala size={400} color="#A16207" opacity={0.1} animated />
        </div>

        {/* Marigold garland top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 pt-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="marigold-petal flex-shrink-0"
              style={{
                width: 14, height: 20,
                background: i % 3 === 0 ? '#DC2626' : i % 3 === 1 ? '#F59E0B' : '#EA580C',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: 0.85,
              }}
            />
          ))}
        </div>

        {/* Diyas — bottom corners */}
        {[{ left: '5%' }, { left: '12%' }, { right: '5%' }, { right: '12%' }].map((pos, i) => (
          <div key={i} className="absolute bottom-16 flex flex-col items-center" style={pos as React.CSSProperties}>
            {/* Flame */}
            <div
              className="diya-flame w-3 h-5 rounded-full mb-0.5"
              style={{ background: 'radial-gradient(ellipse at bottom, #FCD34D, #F59E0B, #DC2626)', transformOrigin: 'bottom center' }}
            />
            {/* Diya body */}
            <div className="w-8 h-4 rounded-b-full" style={{ background: '#92400E' }} />
          </div>
        ))}

        {/* Corner ornaments */}
        {['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} w-16 h-16 opacity-30`}>
            <Mandala size={64} color="#A16207" opacity={1} animated={false} />
          </div>
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-2">
            <p className="shaadi-title text-[#F59E0B] tracking-[0.4em] text-xs uppercase font-light">
              शुभ विवाह · Shubh Vivah
            </p>
          </div>

          <div className="overflow-hidden mb-1">
            <h1 className="shaadi-title text-7xl md:text-9xl text-[#FDF0E0] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-1">
            <div className="shaadi-title flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#DC2626] opacity-60" />
              <span className="text-[#F59E0B] text-3xl">❋</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#DC2626] opacity-60" />
            </div>
          </div>

          <div className="overflow-hidden mb-8">
            <h1 className="shaadi-title text-7xl md:text-9xl text-[#FDF0E0] leading-none"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {partner2.name}
            </h1>
          </div>

          <div className="shaadi-subtitle">
            <p className="text-[#F59E0B] text-lg tracking-widest mb-2" style={{ fontFamily: "'Hind', sans-serif" }}>
              विवाह बंधन में बंधने जा रहे हैं
            </p>
            <p className="text-[#FDF0E0] opacity-60 text-base" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              {ceremony.city} · {month} {year}
            </p>
          </div>
        </div>

        {/* Bottom marigold garland */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4 overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="marigold-petal flex-shrink-0"
              style={{
                width: 14, height: 20,
                background: i % 3 === 0 ? '#F59E0B' : i % 3 === 1 ? '#DC2626' : '#EA580C',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                opacity: 0.85,
                transform: 'rotate(180deg)',
              }}
            />
          ))}
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="shaadi-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#200808]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_transparent_70%)]" />

        {/* Decorative border */}
        <div className="absolute inset-4 border border-[#DC2626] border-opacity-20 pointer-events-none" />
        <div className="absolute inset-6 border border-[#A16207] border-opacity-10 pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <p className="shaadi-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-3">वर और वधू</p>
          <h2 className="shaadi-reveal text-4xl text-[#FDF0E0]" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Bride & Groom
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-4 md:gap-12 max-w-2xl mx-auto">
          <div className="shaadi-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#FDF0E0]" style={{ fontFamily: "'Great Vibes', cursive" }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="shaadi-heart flex flex-col items-center pb-20">
            <svg viewBox="0 0 60 55" className="w-14 h-14 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]">
              <path d="M30 50 C30 50 5 35 5 18 C5 10 12 4 20 4 C25 4 29 7 30 10 C31 7 35 4 40 4 C48 4 55 10 55 18 C55 35 30 50 30 50Z" fill="#DC2626" />
            </svg>
            <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-2">Weds</p>
          </div>

          <div className="shaadi-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#FDF0E0]" style={{ fontFamily: "'Great Vibes', cursive" }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1A0505]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#DC2626] to-transparent opacity-20 -translate-x-1/2" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="shaadi-reveal text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[#DC2626] opacity-40" />
                  <span className="text-[#F59E0B] text-xl">❋</span>
                  <div className="h-px w-12 bg-[#DC2626] opacity-40" />
                </div>
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-3">उनकी कहानी</p>
                <h3 className="text-2xl text-[#FDF0E0] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>How It Began</h3>
                <p className="text-lg text-[#FDF0E0] opacity-65 leading-relaxed" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}

            {story.proposalStory && (
              <div className="shaadi-reveal text-center">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-px w-12 bg-[#A16207] opacity-40" />
                  <span className="text-[#DC2626] text-xl">❋</span>
                  <div className="h-px w-12 bg-[#A16207] opacity-40" />
                </div>
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-3">रिश्ता</p>
                <h3 className="text-2xl text-[#FDF0E0] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Proposal</h3>
                <p className="text-lg text-[#FDF0E0] opacity-65 leading-relaxed" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                  {story.proposalStory}
                </p>
              </div>
            )}

            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="shaadi-reveal text-center">
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-6">Together They Love</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm text-[#FDF0E0] opacity-70"
                      style={{ border: '1px solid rgba(220,38,38,0.3)', fontFamily: "'Cormorant Infant', serif" }}>
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
        <PhotoGallery photos={data.photos} accentColor="#DC2626" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="shaadi-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#200808]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D0A0A_0%,_transparent_60%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20">
          <Mandala size={500} color="#DC2626" opacity={0.3} animated />
        </div>

        <div className="relative z-10 text-center">
          <p className="shaadi-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-10">शुभ मुहूर्त · Auspicious Date</p>

          <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
            {dateStr.split('').map((char, i) => (
              <span
                key={i}
                className="date-char inline-block"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: char === ' ' ? '2rem' : '5rem',
                  color: /[0-9]/.test(char) ? '#FDF0E0' : '#F59E0B',
                  lineHeight: 1,
                  minWidth: char === ' ' ? '1rem' : 'auto',
                }}
              >
                {char === ' ' ? ' ' : char}
              </span>
            ))}
          </div>

          {ceremony.time && (
            <p className="shaadi-reveal mt-8 text-xl text-[#FDF0E0] opacity-50" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#DC2626"
              textColor="#FDF0E0"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="shaadi-venue relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="shaadi-venue-bg absolute inset-0 bg-[#1A0505]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#1A0505_0%,_transparent_30%,_transparent_70%,_#1A0505_100%)]" />

        {/* Decorative frame */}
        <div className="absolute inset-8 pointer-events-none">
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-[#DC2626] opacity-40" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-[#DC2626] opacity-40" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-[#DC2626] opacity-40" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#DC2626] opacity-40" />
        </div>

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="shaadi-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-6">विवाह स्थल</p>
          <h2 className="shaadi-reveal text-4xl md:text-5xl text-[#FDF0E0] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="shaadi-reveal text-lg text-[#FDF0E0] opacity-50 mb-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              {ceremony.address}
            </p>
          )}
          <p className="shaadi-reveal text-xl text-[#F59E0B]" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#DC2626] border-opacity-20">
              <p className="text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-4">स्वागत समारोह · Reception</p>
              <h3 className="text-2xl text-[#FDF0E0] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{reception.venue}</h3>
              <p className="text-[#FDF0E0] opacity-50" style={{ fontFamily: "'Cormorant Infant', serif" }}>{reception.city}</p>
              {reception.time && <p className="text-[#F59E0B] mt-2" style={{ fontFamily: "'Cormorant Infant', serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#200808]" />
          <div className="relative z-10 max-w-xl mx-auto text-center shaadi-reveal">
            <span className="text-[#DC2626] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#FDF0E0] opacity-75 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Cormorant Infant', serif" }}>
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
          <Mandala size={400} color="#A16207" opacity={0.06} animated />
        </div>

        {/* Top marigold strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626] opacity-60" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="shaadi-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-6">आप सादर आमंत्रित हैं</p>
          <h2 className="shaadi-reveal text-6xl text-[#FDF0E0] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            You Are Invited
          </h2>
          <p className="shaadi-reveal text-lg text-[#FDF0E0] opacity-60 mb-10 leading-relaxed"
            style={{ fontFamily: "'Cormorant Infant', serif" }}>
            Your presence will make this celebration complete.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a
              href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#DC2626', color: '#FDF0E0' }}
            >
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#F59E0B] opacity-60" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 text-[#FDF0E0] opacity-30 text-xs tracking-widest uppercase">
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#DC2626] opacity-30" />
            <span className="text-[#F59E0B] text-xl">❋</span>
            <div className="h-px w-16 bg-[#DC2626] opacity-30" />
          </div>
          <p className="text-3xl text-[#FDF0E0] opacity-25" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="text-[#FDF0E0] opacity-15 text-xs tracking-widest uppercase mt-2">
            {ceremony.city} · {year}
          </p>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#DC2626] via-[#F59E0B] to-[#DC2626] opacity-60" />
      </section>
    </div>
  )
}
