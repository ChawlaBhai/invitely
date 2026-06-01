'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingRetroBollywood({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Film projector flicker on load
      gsap.fromTo('.retro-hero', { opacity: 0 }, {
        opacity: 1, duration: 0.1, repeat: 3, yoyo: true, ease: 'none', delay: 0.2,
        onComplete: () => gsap.set('.retro-hero', { opacity: 1 }),
      })

      // Title stamp-in
      gsap.fromTo('.retro-title', { scale: 1.4, opacity: 0, filter: 'blur(4px)' }, {
        scale: 1, opacity: 1, filter: 'blur(0px)',
        duration: 1.2, stagger: 0.15, ease: 'expo.out', delay: 0.5,
      })

      // Film grain animation
      gsap.to('.film-grain', {
        backgroundPosition: '100% 100%',
        duration: 0.08, ease: 'none', repeat: -1, yoyo: true,
      })

      // Spotlight sweep
      gsap.to('.spotlight', {
        x: 60, opacity: 0.06,
        duration: 4, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.retro-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.retro-man', { x: -100, opacity: 0, skewX: -5 }, {
            x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.retro-woman', { x: 100, opacity: 0, skewX: 5 }, {
            x: 0, opacity: 1, skewX: 0, duration: 1.2, ease: 'power3.out', delay: 0.15,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.retro-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date dramatic entrance
      ScrollTrigger.create({
        trigger: '.retro-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.retro-date-el', { y: 50, opacity: 0, scale: 0.8 }, {
            y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'back.out(1.4)',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="overflow-x-hidden" style={{ background: '#1A0A00', color: '#FFF5E0' }}>

      {/* ── HERO ── */}
      <section className="retro-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Deep warm background */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D1200 0%, #1A0A00 70%)' }} />

        {/* Film grain overlay */}
        <div className="film-grain absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '150px' }} />

        {/* Spotlight */}
        <div className="spotlight absolute top-0 left-1/3 w-96 h-full pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(255,200,50,0.08) 0%, transparent 60%)', transform: 'skewX(-15deg)' }} />

        {/* Film strip borders */}
        <div className="absolute top-0 left-0 right-0 h-8 flex gap-1 overflow-hidden opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-6 h-full border border-[#C8860A] opacity-60" />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 flex gap-1 overflow-hidden opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-6 h-full border border-[#C8860A] opacity-60" />
          ))}
        </div>

        {/* Corner stars */}
        {['top-10 left-10', 'top-10 right-10', 'bottom-10 left-10', 'bottom-10 right-10'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-[#C8860A] text-2xl opacity-30`}>✦</div>
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Presenting */}
          <div className="overflow-hidden mb-4">
            <p className="retro-title tracking-[0.6em] text-xs uppercase"
              style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', opacity: 0.8 }}>
              Presenting
            </p>
          </div>

          {/* Main title — film poster style */}
          <div className="overflow-hidden mb-1">
            <h1 className="retro-title leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(4rem, 13vw, 10rem)', color: '#FFF5E0', fontWeight: 700, textShadow: '0 0 60px rgba(200,134,10,0.4)' }}>
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-1">
            <div className="retro-title flex items-center justify-center gap-4">
              <div className="h-0.5 w-20 opacity-50" style={{ background: 'linear-gradient(to right, transparent, #C8860A)' }} />
              <p className="text-[#C8860A] text-lg tracking-[0.3em] uppercase" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                aur
              </p>
              <div className="h-0.5 w-20 opacity-50" style={{ background: 'linear-gradient(to left, transparent, #C8860A)' }} />
            </div>
          </div>

          <div className="overflow-hidden mb-6">
            <h1 className="retro-title leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(4rem, 13vw, 10rem)', color: '#FFF5E0', fontWeight: 700, textShadow: '0 0 60px rgba(200,134,10,0.4)' }}>
              {partner2.name}
            </h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden mb-4">
            <p className="retro-title text-2xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#C8860A' }}>
              ki shaadi mein aapka swagat hai
            </p>
          </div>

          <div className="overflow-hidden">
            <p className="retro-title opacity-40 text-sm tracking-widest uppercase"
              style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0' }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#C8860A] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="retro-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#200D00' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D1200 0%, transparent 70%)' }} />

        {/* Decorative frame */}
        <div className="absolute inset-6 border border-[#C8860A] border-opacity-15 pointer-events-none" />
        <div className="absolute inset-8 border border-[#C8860A] border-opacity-08 pointer-events-none" />

        <div className="relative z-10 text-center mb-12">
          <p className="retro-reveal tracking-[0.4em] text-xs uppercase mb-3"
            style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic', opacity: 0.8 }}>
            Starring
          </p>
          <h2 className="retro-reveal text-4xl" style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>
            The Couple
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="retro-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#FFF5E0' }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-xs tracking-widest uppercase mt-1 opacity-50" style={{ color: '#C8860A', fontStyle: 'italic' }}>{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <div className="text-center">
              <p className="text-[#C8860A] text-2xl opacity-60" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>aur</p>
            </div>
          </div>

          <div className="retro-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Great Vibes', cursive", color: '#FFF5E0' }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-xs tracking-widest uppercase mt-1 opacity-50" style={{ color: '#C8860A', fontStyle: 'italic' }}>{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#1A0A00' }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C8860A] to-transparent opacity-15" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="retro-reveal text-center">
                <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-60" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Scene I</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>Pehli Mulaqat</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="retro-reveal text-center">
                <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-60" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Scene II</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>Ek Yaad</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="retro-reveal text-center">
                <p className="text-xs tracking-[0.4em] uppercase mb-3 opacity-60" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Climax</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>Woh Lamha</h3>
                <p className="text-lg opacity-65 leading-relaxed" style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="retro-reveal text-center">
                <p className="text-xs tracking-[0.4em] uppercase mb-6 opacity-60" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>Unki Duniya</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm opacity-60"
                      style={{ border: '1px solid rgba(200,134,10,0.3)', fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
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
        <PhotoGallery photos={data.photos} accentColor="#C8860A" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="retro-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#200D00' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D1200 0%, transparent 60%)' }} />

        <div className="relative z-10 text-center">
          <p className="retro-reveal tracking-[0.4em] text-xs uppercase mb-10 opacity-60"
            style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Shubh Muhurat
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Din' },
              { value: '✦', label: '' },
              { value: month.toUpperCase(), label: 'Maah' },
              { value: '✦', label: '' },
              { value: String(year), label: 'Saal' },
            ].map(({ value, label }, i) => (
              <div key={i} className="retro-date-el text-center">
                <p className="leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: value === '✦' ? '2.5rem' : 'clamp(3rem, 10vw, 7rem)',
                    color: value === '✦' ? '#C8860A' : '#FFF5E0',
                    fontWeight: value === '✦' ? 400 : 700,
                    lineHeight: 1,
                    textShadow: value !== '✦' ? '0 0 40px rgba(200,134,10,0.3)' : 'none',
                  }}>
                  {value}
                </p>
                {label && <p className="text-xs tracking-widest uppercase mt-2 opacity-50" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif" }}>{label}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="retro-reveal mt-8 text-xl opacity-40"
              style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
              {ceremony.time}
            </p>
          )}
          <div className="mt-8">
            <CountdownTimer targetDate={ceremony.date} accentColor="#C8860A" textColor="#FFF5E0" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#1A0A00' }} />
        <div className="absolute inset-8 border border-[#C8860A] border-opacity-10 pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="retro-reveal tracking-[0.4em] text-xs uppercase mb-6 opacity-60"
            style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Shooting Location
          </p>
          <h2 className="retro-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="retro-reveal text-lg opacity-40 mb-2" style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
              {ceremony.address}
            </p>
          )}
          <p className="retro-reveal text-xl" style={{ fontFamily: "'Cormorant Infant', serif", color: '#C8860A' }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#C8860A] border-opacity-15">
              <p className="tracking-[0.4em] text-xs uppercase mb-4 opacity-60" style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>After Party</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#FFF5E0', fontWeight: 700 }}>{reception.venue}</h3>
              <p className="opacity-40" style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>{reception.city}</p>
              {reception.time && <p className="mt-2" style={{ fontFamily: "'Cormorant Infant', serif", color: '#C8860A' }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#200D00' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center retro-reveal">
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#C8860A' }}>"</span>
            <p className="text-2xl opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
              {customMessage}
            </p>
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#C8860A' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#1A0A00' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, #2D1200 0%, transparent 60%)' }} />
        <div className="absolute inset-6 border border-[#C8860A] border-opacity-15 pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="retro-reveal tracking-[0.4em] text-xs uppercase mb-6 opacity-60"
            style={{ color: '#C8860A', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            Aapko Nimantran Hai
          </p>
          <h2 className="retro-reveal text-6xl mb-4" style={{ fontFamily: "'Great Vibes', cursive", color: '#FFF5E0' }}>
            Zaroor Aayein
          </h2>
          <p className="retro-reveal text-lg opacity-50 mb-10 leading-relaxed"
            style={{ fontFamily: "'Cormorant Infant', serif", color: '#FFF5E0' }}>
            Aapki upasthiti is jashn ko poora karti hai.
            {data.rsvpDeadline && ` Kripaya ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} tak jawab dein.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#C8860A', color: '#1A0A00', boxShadow: '0 0 30px rgba(200,134,10,0.3)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl opacity-50" style={{ fontFamily: "'Cormorant Infant', serif", color: '#C8860A' }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 opacity-25 text-xs tracking-widest uppercase" style={{ color: '#FFF5E0' }}>
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 opacity-20" style={{ background: '#C8860A' }} />
            <span className="text-[#C8860A] opacity-40 text-lg">✦</span>
            <div className="h-px w-16 opacity-20" style={{ background: '#C8860A' }} />
          </div>
          <p className="text-3xl opacity-20" style={{ fontFamily: "'Great Vibes', cursive", color: '#FFF5E0' }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="opacity-10 text-xs tracking-widest uppercase mt-2" style={{ color: '#FFF5E0' }}>
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
