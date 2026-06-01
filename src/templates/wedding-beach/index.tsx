'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingBeach({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Wave animation
      gsap.to('.wave-1', { x: -60, duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.wave-2', { x: 50, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5 })
      gsap.to('.wave-3', { x: -40, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })

      // Sun glow pulse
      gsap.to('.sun-glow', {
        scale: 1.2, opacity: 0.15,
        duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Hero title
      gsap.fromTo('.beach-title', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: 'power4.out', delay: 0.4,
      })

      // Seagulls float
      gsap.utils.toArray<HTMLElement>('.seagull').forEach((el, i) => {
        gsap.to(el, {
          y: -15, x: 20 * (i % 2 === 0 ? 1 : -1),
          duration: 2.5 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.3,
        })
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.beach-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.beach-man', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.beach-woman', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.beach-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date reveal
      ScrollTrigger.create({
        trigger: '.beach-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.beach-date-num', { scale: 0.6, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1, stagger: 0.1, ease: 'back.out(1.4)',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-beach overflow-x-hidden" style={{ background: '#0A1628', color: '#FFF8F0' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Sky gradient — golden hour */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #0A1628 0%, #1E3A5F 25%, #C2410C 55%, #F59E0B 75%, #FCD34D 85%, #0891B2 90%, #0A1628 100%)' }} />

        {/* Sun */}
        <div className="sun-glow absolute w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FCD34D 0%, #F59E0B 40%, transparent 70%)', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.12 }} />
        <div className="absolute w-20 h-20 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FEF3C7 0%, #FCD34D 60%, #F59E0B 100%)', top: '44%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.9 }} />

        {/* Ocean */}
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, #0891B2 0%, #0369A1 50%, #0A1628 100%)' }} />

        {/* Waves */}
        <svg className="wave-1 absolute bottom-32 left-0 right-0 w-[120%] -ml-[10%]" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 40 C240 10 480 70 720 40 C960 10 1200 70 1440 40 L1440 80 L0 80Z"
            fill="#0891B2" opacity="0.6" />
        </svg>
        <svg className="wave-2 absolute bottom-20 left-0 right-0 w-[120%] -ml-[10%]" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 50 C360 20 720 80 1080 50 C1260 35 1380 60 1440 50 L1440 80 L0 80Z"
            fill="#0369A1" opacity="0.7" />
        </svg>
        <svg className="wave-3 absolute bottom-8 left-0 right-0 w-[120%] -ml-[10%]" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0 30 C180 10 360 50 540 30 C720 10 900 50 1080 30 C1260 10 1380 40 1440 30 L1440 60 L0 60Z"
            fill="rgba(255,255,255,0.15)" />
        </svg>

        {/* Seagulls */}
        {[{ top: '20%', left: '15%' }, { top: '25%', left: '25%' }, { top: '18%', right: '20%' }, { top: '28%', right: '30%' }].map((pos, i) => (
          <svg key={i} className="seagull absolute w-6 h-3 pointer-events-none" style={pos as React.CSSProperties} viewBox="0 0 40 20">
            <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          </svg>
        ))}

        {/* Horizon reflection */}
        <div className="absolute bottom-32 left-0 right-0 h-px bg-[#FCD34D] opacity-30" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="overflow-hidden mb-3">
            <p className="beach-title text-[#FCD34D] tracking-[0.4em] text-xs uppercase opacity-80">
              Where the Ocean Meets Forever
            </p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="beach-title leading-none text-[#FFF8F0]"
              style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)' }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="beach-title flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#F59E0B] opacity-60" />
              <span className="text-[#FCD34D] text-2xl">🌊</span>
              <div className="h-px w-16 bg-[#F59E0B] opacity-60" />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="beach-title leading-none text-[#FFF8F0]"
              style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)' }}>
              {partner2.name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="beach-title text-[#FCD34D] text-2xl"
              style={{ fontFamily: "'Pacifico', cursive" }}>
              Are Getting Married
            </p>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="beach-title text-[#FFF8F0] opacity-50 text-base"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#F59E0B] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="beach-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A1628, #0C2340)' }} />
        {/* Sand texture at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, #D97706 0%, transparent 100%)', opacity: 0.08 }} />

        <div className="relative z-10 text-center mb-12">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-3">The Couple</p>
          <h2 className="beach-reveal text-4xl text-[#FFF8F0]" style={{ fontFamily: "'Abril Fatface', serif" }}>
            Two Tides, One Shore
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="beach-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#FFF8F0]" style={{ fontFamily: "'Pacifico', cursive" }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <svg viewBox="0 0 60 55" className="w-12 h-12 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]">
              <path d="M30 50 C30 50 5 35 5 18 C5 10 12 4 20 4 C25 4 29 7 30 10 C31 7 35 4 40 4 C48 4 55 10 55 18 C55 35 30 50 30 50Z"
                fill="#F59E0B" />
            </svg>
          </div>

          <div className="beach-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#FFF8F0]" style={{ fontFamily: "'Pacifico', cursive" }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0C2340' }} />
          {/* Wave divider top */}
          <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
            <path d="M0 20 C360 0 720 40 1080 20 C1260 10 1380 30 1440 20 L1440 0 L0 0Z" fill="#0A1628" />
          </svg>

          <div className="relative z-10 max-w-2xl mx-auto space-y-20 pt-8">
            {story.howTheyMet && (
              <div className="beach-reveal text-center">
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-3">First Wave</p>
                <h3 className="text-2xl text-[#FFF8F0] mb-4" style={{ fontFamily: "'Abril Fatface', serif" }}>How It Began</h3>
                <p className="text-lg text-[#FFF8F0] opacity-60 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="beach-reveal text-center">
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-3">High Tide</p>
                <h3 className="text-2xl text-[#FFF8F0] mb-4" style={{ fontFamily: "'Abril Fatface', serif" }}>A Memory We Keep</h3>
                <p className="text-lg text-[#FFF8F0] opacity-60 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="beach-reveal text-center">
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-3">Golden Hour</p>
                <h3 className="text-2xl text-[#FFF8F0] mb-4" style={{ fontFamily: "'Abril Fatface', serif" }}>The Question</h3>
                <p className="text-lg text-[#FFF8F0] opacity-60 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="beach-reveal text-center">
                <p className="text-[#F59E0B] text-xs tracking-[0.3em] uppercase mb-6">Their Horizon</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm text-[#FFF8F0] opacity-60"
                      style={{ border: '1px solid rgba(245,158,11,0.3)', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
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
        <PhotoGallery photos={data.photos} accentColor="#F59E0B" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="beach-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0C2340, #0A1628)' }} />
        {/* Sunset glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #F59E0B 0%, transparent 70%)', opacity: 0.04 }} />

        <div className="relative z-10 text-center">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-10">Mark Your Calendar</p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day', color: '#FFF8F0' },
              { value: '·', label: '', color: '#F59E0B' },
              { value: month.toUpperCase(), label: 'Month', color: '#FCD34D' },
              { value: '·', label: '', color: '#F59E0B' },
              { value: String(year), label: 'Year', color: '#FFF8F0' },
            ].map(({ value, label, color }, i) => (
              <div key={i} className="beach-date-num text-center">
                <p className="leading-none"
                  style={{
                    fontFamily: "'Abril Fatface', serif",
                    fontSize: value === '·' ? '3rem' : 'clamp(3rem, 10vw, 7rem)',
                    color,
                    lineHeight: 1,
                  }}>
                  {value}
                </p>
                {label && <p className="text-[#F59E0B] text-xs tracking-widest uppercase mt-2 opacity-60">{label}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="beach-reveal mt-8 text-xl text-[#FFF8F0] opacity-40"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#F59E0B"
              textColor="#FFF8F0"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#0A1628' }} />
        {/* Wave top */}
        <svg className="absolute top-0 left-0 right-0 w-full" viewBox="0 0 1440 40" preserveAspectRatio="none">
          <path d="M0 20 C360 40 720 0 1080 20 C1260 30 1380 10 1440 20 L1440 0 L0 0Z" fill="#0C2340" />
        </svg>

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-6">Where We Celebrate</p>
          <h2 className="beach-reveal text-4xl md:text-5xl text-[#FFF8F0] mb-4" style={{ fontFamily: "'Abril Fatface', serif" }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="beach-reveal text-lg text-[#FFF8F0] opacity-40 mb-2"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              {ceremony.address}
            </p>
          )}
          <p className="beach-reveal text-xl text-[#F59E0B]" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#F59E0B] border-opacity-15">
              <p className="text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-4">Reception</p>
              <h3 className="text-2xl text-[#FFF8F0] mb-2" style={{ fontFamily: "'Abril Fatface', serif" }}>{reception.venue}</h3>
              <p className="text-[#FFF8F0] opacity-40" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>{reception.city}</p>
              {reception.time && <p className="text-[#F59E0B] mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#0C2340' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center beach-reveal">
            <span className="text-[#F59E0B] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#FFF8F0] opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              {customMessage}
            </p>
            <span className="text-[#F59E0B] text-5xl opacity-30" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #0A1628, #0C2340)' }} />
        {/* Bottom wave */}
        <svg className="absolute bottom-0 left-0 right-0 w-[120%] -ml-[10%]" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0 40 C240 10 480 70 720 40 C960 10 1200 70 1440 40 L1440 80 L0 80Z"
            fill="#0891B2" opacity="0.15" />
        </svg>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="beach-reveal text-[#F59E0B] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="beach-reveal text-6xl text-[#FFF8F0] mb-4" style={{ fontFamily: "'Pacifico', cursive" }}>
            Join Us
          </h2>
          <p className="beach-reveal text-lg text-[#FFF8F0] opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
            Come celebrate where the waves never stop and the love never ends.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#FFF8F0] hover:text-[#0A1628]"
              style={{ background: '#0891B2', color: '#FFF8F0', boxShadow: '0 0 30px rgba(8,145,178,0.3)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#F59E0B] opacity-50" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 text-[#FFF8F0] opacity-25 text-xs tracking-widest uppercase">
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#0891B2] opacity-30" />
            <span className="text-[#F59E0B] text-lg">🌊</span>
            <div className="h-px w-16 bg-[#0891B2] opacity-30" />
          </div>
          <p className="text-3xl text-[#FFF8F0] opacity-20" style={{ fontFamily: "'Pacifico', cursive" }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="text-[#FFF8F0] opacity-10 text-xs tracking-widest uppercase mt-2">
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
