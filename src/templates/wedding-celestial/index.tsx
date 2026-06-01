'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import StarField from './StarField'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

// Constellation lines connecting star positions
const CONSTELLATION = [
  { x1: 20, y1: 30, x2: 35, y2: 20 },
  { x1: 35, y1: 20, x2: 55, y2: 28 },
  { x1: 55, y1: 28, x2: 70, y2: 18 },
  { x1: 70, y1: 18, x2: 80, y2: 32 },
  { x1: 55, y1: 28, x2: 50, y2: 45 },
  { x1: 50, y1: 45, x2: 35, y2: 55 },
  { x1: 50, y1: 45, x2: 65, y2: 58 },
]

const CONSTELLATION_STARS = [
  { x: 20, y: 30 }, { x: 35, y: 20 }, { x: 55, y: 28 },
  { x: 70, y: 18 }, { x: 80, y: 32 }, { x: 50, y: 45 },
  { x: 35, y: 55 }, { x: 65, y: 58 },
]

export default function WeddingCelestial({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title reveal
      gsap.fromTo('.celestial-title', { y: 80, opacity: 0, filter: 'blur(10px)' }, {
        y: 0, opacity: 1, filter: 'blur(0px)',
        duration: 1.6, stagger: 0.2, ease: 'power4.out', delay: 0.5,
      })

      // Constellation draw
      gsap.fromTo('.constellation-line', { strokeDashoffset: 200 }, {
        strokeDashoffset: 0, duration: 2, stagger: 0.15, ease: 'power2.inOut', delay: 1,
      })
      gsap.fromTo('.constellation-star', { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(2)', delay: 1.2,
      })

      // Nebula pulse
      gsap.to('.nebula', {
        scale: 1.15, opacity: 0.06,
        duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.celestial-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.celestial-man', { y: 60, opacity: 0, filter: 'blur(8px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.celestial-woman', { y: 60, opacity: 0, filter: 'blur(8px)' }, {
            y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2,
          })
          gsap.fromTo('.orbit-ring', { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.5, ease: 'elastic.out(1, 0.6)', delay: 0.8,
          })
        },
      })

      // Orbit animation
      gsap.to('.orbit-dot', {
        rotation: 360, transformOrigin: '50% 50%',
        duration: 8, ease: 'none', repeat: -1,
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.celestial-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0, filter: 'blur(4px)' }, {
          y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date counter
      ScrollTrigger.create({
        trigger: '.celestial-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.date-glow', { scale: 0.5, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out', stagger: 0.1,
          })
        },
      })

      // Floating stars in sections
      gsap.utils.toArray<HTMLElement>('.float-star').forEach((el, i) => {
        gsap.to(el, {
          y: -20, x: i % 2 === 0 ? 10 : -10,
          duration: 3 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.2,
        })
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-celestial bg-[#050510] text-[#E8E0FF] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <StarField count={250} />

        {/* Nebula glow */}
        <div className="nebula absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, #4C1D95 30%, transparent 70%)', opacity: 0.04 }} />
        <div className="absolute top-2/3 left-1/3 w-[400px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)', opacity: 0.04 }} />

        {/* Constellation SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {CONSTELLATION.map((line, i) => (
            <line
              key={i}
              className="constellation-line"
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="rgba(167,139,250,0.3)" strokeWidth="0.15"
              strokeDasharray="200" strokeDashoffset="200"
            />
          ))}
          {CONSTELLATION_STARS.map((star, i) => (
            <circle
              key={i}
              className="constellation-star"
              cx={star.x} cy={star.y} r="0.6"
              fill="#A78BFA" opacity="0.8"
            />
          ))}
        </svg>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="celestial-title text-[#A78BFA] tracking-[0.5em] text-xs uppercase">
              Written in the Stars
            </p>
          </div>

          <div className="overflow-hidden mb-1">
            <h1 className="celestial-title leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#E8E0FF' }}>
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-1">
            <div className="celestial-title flex items-center justify-center gap-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#7C3AED] opacity-60" />
              <svg viewBox="0 0 24 24" className="w-6 h-6 float-star" fill="#A78BFA" opacity="0.8">
                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
              </svg>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#7C3AED] opacity-60" />
            </div>
          </div>

          <div className="overflow-hidden mb-8">
            <h1 className="celestial-title leading-none"
              style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#E8E0FF' }}>
              {partner2.name}
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="celestial-title text-[#A78BFA] tracking-widest uppercase text-sm"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              Are Getting Married
            </p>
          </div>

          <div className="overflow-hidden mt-6">
            <p className="celestial-title text-[#E8E0FF] opacity-40 text-base"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A78BFA]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#7C3AED] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="celestial-personas relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#080818]" />
        <StarField count={80} />

        {/* Orbit rings around personas */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orbit-ring w-80 h-80 rounded-full border border-[#7C3AED] border-opacity-15 relative">
            <div className="orbit-dot absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#A78BFA] opacity-60" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="orbit-ring w-56 h-56 rounded-full border border-[#A78BFA] border-opacity-10" />
        </div>

        <div className="relative z-10 text-center mb-12">
          <p className="celestial-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-3">Two Souls, One Universe</p>
          <h2 className="celestial-reveal text-4xl text-[#E8E0FF]" style={{ fontFamily: "'Cinzel', serif" }}>
            The Couple
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="celestial-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#E8E0FF]" style={{ fontFamily: "'Great Vibes', cursive" }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#A78BFA] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <svg viewBox="0 0 24 24" className="w-10 h-10 float-star" fill="#A78BFA">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
          </div>

          <div className="celestial-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#E8E0FF]" style={{ fontFamily: "'Great Vibes', cursive" }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#A78BFA] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#050510]" />
          <StarField count={60} />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="celestial-reveal text-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-4 float-star" fill="#A78BFA" opacity="0.6">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                <p className="text-[#A78BFA] text-xs tracking-[0.3em] uppercase mb-3">The First Spark</p>
                <h3 className="text-2xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>How It Began</h3>
                <p className="text-lg text-[#E8E0FF] opacity-60 leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}

            {story.favoriteMemory && (
              <div className="celestial-reveal text-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-4 float-star" fill="#7C3AED" opacity="0.7">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                <p className="text-[#A78BFA] text-xs tracking-[0.3em] uppercase mb-3">A Moment in Time</p>
                <h3 className="text-2xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>A Memory We Keep</h3>
                <p className="text-lg text-[#E8E0FF] opacity-60 leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}

            {story.proposalStory && (
              <div className="celestial-reveal text-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 mx-auto mb-4 float-star" fill="#A78BFA" opacity="0.6">
                  <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                </svg>
                <p className="text-[#A78BFA] text-xs tracking-[0.3em] uppercase mb-3">The Moment</p>
                <h3 className="text-2xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>The Question</h3>
                <p className="text-lg text-[#E8E0FF] opacity-60 leading-relaxed" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
                  {story.proposalStory}
                </p>
              </div>
            )}

            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="celestial-reveal text-center">
                <p className="text-[#A78BFA] text-xs tracking-[0.3em] uppercase mb-6">Their Universe</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm text-[#E8E0FF] opacity-60"
                      style={{ border: '1px solid rgba(124,58,237,0.3)', fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
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
        <PhotoGallery photos={data.photos} accentColor="#7C3AED" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="celestial-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#080818]" />
        <StarField count={120} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4C1D9520_0%,_transparent_60%)]" />

        <div className="relative z-10 text-center">
          <p className="celestial-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-12">The Date is Set</p>

          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: month.slice(0, 3).toUpperCase(), label: 'Month' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="date-glow text-center">
                  <p className="leading-none font-bold"
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 'clamp(3.5rem, 12vw, 8rem)',
                      color: '#E8E0FF',
                      textShadow: '0 0 60px rgba(124,58,237,0.5)',
                    }}>
                    {value}
                  </p>
                  <p className="text-[#A78BFA] text-xs tracking-widest uppercase mt-2">{label}</p>
                </div>
                {i < 2 && (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 float-star flex-shrink-0" fill="#7C3AED" opacity="0.5">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {ceremony.time && (
            <p className="celestial-reveal mt-8 text-xl text-[#E8E0FF] opacity-40"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#7C3AED"
              textColor="#E8E0FF"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-[#050510]" />
        <StarField count={100} />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="celestial-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-6">Where Stars Align</p>
          <h2 className="celestial-reveal text-4xl md:text-5xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="celestial-reveal text-lg text-[#E8E0FF] opacity-40 mb-2" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              {ceremony.address}
            </p>
          )}
          <p className="celestial-reveal text-xl text-[#A78BFA]" style={{ fontFamily: "'Raleway', sans-serif" }}>
            {ceremony.city}
          </p>

          {ceremony.mapUrl && (
            <a href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer"
              className="celestial-reveal inline-block mt-8 px-8 py-3 border border-[#7C3AED] border-opacity-40 text-[#A78BFA] text-xs tracking-[0.2em] uppercase hover:bg-[#7C3AED] hover:text-white transition-all duration-500">
              View on Map
            </a>
          )}

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#7C3AED] border-opacity-15">
              <p className="text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-4">Reception</p>
              <h3 className="text-2xl text-[#E8E0FF] mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{reception.venue}</h3>
              <p className="text-[#E8E0FF] opacity-40" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>{reception.city}</p>
              {reception.time && <p className="text-[#A78BFA] mt-2" style={{ fontFamily: "'Raleway', sans-serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#080818]" />
          <StarField count={50} />
          <div className="relative z-10 max-w-xl mx-auto text-center celestial-reveal">
            <span className="text-[#7C3AED] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#E8E0FF] opacity-70 leading-relaxed italic mt-2"
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
        <StarField count={150} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#4C1D9515_0%,_transparent_60%)]" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="celestial-reveal text-[#A78BFA] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="celestial-reveal text-6xl text-[#E8E0FF] mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>
            Join Us
          </h2>
          <p className="celestial-reveal text-lg text-[#E8E0FF] opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
            The universe brought them together. Come witness the beginning.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#E8E0FF] hover:text-[#050510]"
              style={{ background: '#7C3AED', color: '#E8E0FF', boxShadow: '0 0 40px rgba(124,58,237,0.4)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#A78BFA] opacity-50" style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 text-[#E8E0FF] opacity-25 text-xs tracking-widest uppercase">
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#7C3AED] opacity-20" />
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#A78BFA" opacity="0.4">
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
            </svg>
            <div className="h-px w-16 bg-[#7C3AED] opacity-20" />
          </div>
          <p className="text-3xl text-[#E8E0FF] opacity-20" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="text-[#E8E0FF] opacity-10 text-xs tracking-widest uppercase mt-2">
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
