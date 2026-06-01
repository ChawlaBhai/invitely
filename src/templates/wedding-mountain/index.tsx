'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingMountain({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mist drift
      gsap.to('.mist-layer', {
        x: 40, opacity: 0.12,
        duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 1.5,
      })

      // Hero title
      gsap.fromTo('.mountain-title', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: 'power4.out', delay: 0.4,
      })

      // Mountain layers parallax on scroll
      gsap.to('.mountain-far', {
        yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: '.mountain-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.mountain-mid', {
        yPercent: -25, ease: 'none',
        scrollTrigger: { trigger: '.mountain-hero', start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to('.mountain-near', {
        yPercent: -40, ease: 'none',
        scrollTrigger: { trigger: '.mountain-hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Pine trees sway
      gsap.utils.toArray<HTMLElement>('.pine').forEach((el, i) => {
        gsap.to(el, {
          rotate: i % 2 === 0 ? 2 : -2, transformOrigin: 'bottom center',
          duration: 3 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.2,
        })
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.mountain-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.mountain-man', { x: -80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.mountain-woman', { x: 80, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.mountain-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date altitude reveal
      ScrollTrigger.create({
        trigger: '.mountain-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.altitude-num', { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'back.out(1.4)',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-mountain bg-[#1C1F1A] text-[#E8E4DC] overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="mountain-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Sky gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#2C3E50_0%,_#4A5568_40%,_#718096_70%,_#A0AEC0_100%)]" />

        {/* Mist layers */}
        <div className="mist-layer absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
        <div className="mist-layer absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,_rgba(255,255,255,0.06)_0%,_transparent_50%)]" />

        {/* Mountain SVG layers */}
        <svg className="mountain-far absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
          <path d="M0 400 L0 280 L120 180 L240 220 L360 140 L480 200 L600 120 L720 180 L840 100 L960 160 L1080 80 L1200 150 L1320 100 L1440 160 L1440 400Z"
            fill="#2D3748" opacity="0.7" />
        </svg>
        <svg className="mountain-mid absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 350" preserveAspectRatio="xMidYMax slice">
          <path d="M0 350 L0 260 L180 160 L300 210 L420 130 L540 190 L660 100 L780 170 L900 90 L1020 150 L1140 70 L1260 140 L1380 80 L1440 130 L1440 350Z"
            fill="#374151" opacity="0.85" />
          {/* Snow caps */}
          <path d="M660 100 L640 130 L680 130Z" fill="white" opacity="0.6" />
          <path d="M900 90 L880 120 L920 120Z" fill="white" opacity="0.5" />
          <path d="M1140 70 L1120 100 L1160 100Z" fill="white" opacity="0.6" />
        </svg>
        <svg className="mountain-near absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
          <path d="M0 300 L0 220 L200 140 L350 180 L500 110 L650 160 L800 80 L950 140 L1100 60 L1250 130 L1440 90 L1440 300Z"
            fill="#1C1F1A" />
          {/* Snow caps near */}
          <path d="M800 80 L775 115 L825 115Z" fill="white" opacity="0.7" />
          <path d="M1100 60 L1075 95 L1125 95Z" fill="white" opacity="0.65" />
        </svg>

        {/* Pine trees foreground */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end px-4 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <svg key={i} className="pine flex-shrink-0" viewBox="0 0 30 60"
              style={{ width: 20 + (i % 3) * 8, height: 40 + (i % 3) * 16, opacity: 0.7 + (i % 3) * 0.1 }}>
              <polygon points="15,0 0,40 30,40" fill="#1A2E1A" />
              <polygon points="15,15 2,50 28,50" fill="#1A2E1A" />
              <rect x="12" y="50" width="6" height="10" fill="#2D1B0E" />
            </svg>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="overflow-hidden mb-3">
            <p className="mountain-title text-[#A0AEC0] tracking-[0.4em] text-xs uppercase">
              Love at Altitude
            </p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="mountain-title leading-none text-[#E8E4DC]"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 300, letterSpacing: '0.05em' }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="mountain-title flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#718096] opacity-60" />
              <span className="text-[#A0AEC0] text-lg">⛰</span>
              <div className="h-px w-16 bg-[#718096] opacity-60" />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="mountain-title leading-none text-[#E8E4DC]"
              style={{ fontFamily: "'Josefin Sans', sans-serif", fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 300, letterSpacing: '0.05em' }}>
              {partner2.name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="mountain-title text-[#A0AEC0] tracking-[0.2em] uppercase text-sm"
              style={{ fontFamily: "'Dancing Script', cursive", fontSize: '1.5rem', letterSpacing: '0.05em' }}>
              Are Getting Married
            </p>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="mountain-title text-[#E8E4DC] opacity-40 text-base"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#A0AEC0] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="mountain-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1F1A]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D3748_0%,_transparent_60%)]" />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        <div className="relative z-10 text-center mb-12">
          <p className="mountain-reveal text-[#718096] tracking-[0.3em] text-xs uppercase mb-3">The Climbers</p>
          <h2 className="mountain-reveal text-4xl text-[#E8E4DC]"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, letterSpacing: '0.1em' }}>
            Two Peaks, One Summit
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="mountain-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#E8E4DC]" style={{ fontFamily: "'Dancing Script', cursive" }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#718096] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <svg viewBox="0 0 40 40" className="w-10 h-10" fill="none">
              <path d="M20 5 L5 35 L35 35Z" fill="#4A5568" stroke="#718096" strokeWidth="1" />
              <path d="M20 5 L16 18 L24 18Z" fill="white" opacity="0.4" />
            </svg>
          </div>

          <div className="mountain-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl text-[#E8E4DC]" style={{ fontFamily: "'Dancing Script', cursive" }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#718096] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#252820]" />
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#4A5568] to-transparent opacity-40" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="mountain-reveal pl-10">
                <p className="text-[#718096] text-xs tracking-[0.3em] uppercase mb-3">Base Camp</p>
                <h3 className="text-2xl text-[#E8E4DC] mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300 }}>How It Began</h3>
                <p className="text-lg text-[#E8E4DC] opacity-60 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="mountain-reveal pl-10">
                <p className="text-[#718096] text-xs tracking-[0.3em] uppercase mb-3">The Ascent</p>
                <h3 className="text-2xl text-[#E8E4DC] mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300 }}>A Memory We Keep</h3>
                <p className="text-lg text-[#E8E4DC] opacity-60 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="mountain-reveal pl-10">
                <p className="text-[#718096] text-xs tracking-[0.3em] uppercase mb-3">The Summit</p>
                <h3 className="text-2xl text-[#E8E4DC] mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300 }}>The Question</h3>
                <p className="text-lg text-[#E8E4DC] opacity-60 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="mountain-reveal pl-10">
                <p className="text-[#718096] text-xs tracking-[0.3em] uppercase mb-6">Their Trail</p>
                <div className="flex flex-wrap gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm text-[#E8E4DC] opacity-60"
                      style={{ border: '1px solid rgba(113,128,150,0.3)', fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
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
        <PhotoGallery photos={data.photos} accentColor="#718096" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="mountain-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#1C1F1A]" />
        {/* Mountain silhouette bg */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-10" viewBox="0 0 1440 200" preserveAspectRatio="xMidYMax slice">
          <path d="M0 200 L0 120 L200 60 L400 100 L600 40 L800 80 L1000 20 L1200 70 L1440 30 L1440 200Z" fill="#718096" />
        </svg>

        <div className="relative z-10 text-center">
          <p className="mountain-reveal text-[#718096] tracking-[0.3em] text-xs uppercase mb-10">Mark the Date</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: '/', label: '' },
              { value: month.slice(0, 3).toUpperCase(), label: 'Month' },
              { value: '/', label: '' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="altitude-num text-center">
                <p className="leading-none"
                  style={{
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: value === '/' ? '3rem' : 'clamp(3rem, 10vw, 7rem)',
                    color: value === '/' ? '#4A5568' : '#E8E4DC',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                  }}>
                  {value}
                </p>
                {label && <p className="text-[#718096] text-xs tracking-widest uppercase mt-2">{label}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="mountain-reveal mt-8 text-xl text-[#E8E4DC] opacity-40"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#718096"
              textColor="#E8E4DC"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 bg-[#252820]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#2D3748_0%,_transparent_60%)]" />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="mountain-reveal text-[#718096] tracking-[0.3em] text-xs uppercase mb-6">Where We Gather</p>
          <h2 className="mountain-reveal text-4xl md:text-5xl text-[#E8E4DC] mb-4"
            style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300, letterSpacing: '0.08em' }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="mountain-reveal text-lg text-[#E8E4DC] opacity-40 mb-2"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {ceremony.address}
            </p>
          )}
          <p className="mountain-reveal text-xl text-[#718096]" style={{ fontFamily: "'Lato', sans-serif" }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#4A5568] border-opacity-20">
              <p className="text-[#718096] tracking-[0.3em] text-xs uppercase mb-4">Reception</p>
              <h3 className="text-2xl text-[#E8E4DC] mb-2" style={{ fontFamily: "'Josefin Sans', sans-serif", fontWeight: 300 }}>{reception.venue}</h3>
              <p className="text-[#E8E4DC] opacity-40" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>{reception.city}</p>
              {reception.time && <p className="text-[#718096] mt-2" style={{ fontFamily: "'Lato', sans-serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#1C1F1A]" />
          <div className="relative z-10 max-w-xl mx-auto text-center mountain-reveal">
            <span className="text-[#4A5568] text-5xl opacity-40" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl text-[#E8E4DC] opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              {customMessage}
            </p>
            <span className="text-[#4A5568] text-5xl opacity-40" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#252820]" />
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-5" viewBox="0 0 1440 300" preserveAspectRatio="xMidYMax slice">
          <path d="M0 300 L0 180 L240 100 L480 160 L720 60 L960 130 L1200 50 L1440 110 L1440 300Z" fill="#718096" />
        </svg>

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="mountain-reveal text-[#718096] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="mountain-reveal text-6xl text-[#E8E4DC] mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Join Us
          </h2>
          <p className="mountain-reveal text-lg text-[#E8E4DC] opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
            Come celebrate where the air is clear and love is higher.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#E8E4DC] hover:text-[#1C1F1A]"
              style={{ background: '#4A5568', color: '#E8E4DC' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#718096] opacity-60" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 text-[#E8E4DC] opacity-25 text-xs tracking-widest uppercase">
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#4A5568] opacity-30" />
            <span className="text-[#718096] text-lg">⛰</span>
            <div className="h-px w-16 bg-[#4A5568] opacity-30" />
          </div>
          <p className="text-3xl text-[#E8E4DC] opacity-20" style={{ fontFamily: "'Dancing Script', cursive" }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="text-[#E8E4DC] opacity-10 text-xs tracking-widest uppercase mt-2">
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
