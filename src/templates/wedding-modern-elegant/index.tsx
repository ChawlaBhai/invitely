'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  data: WeddingData
}

export default function WeddingModernElegant({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const personasRef = useRef<HTMLDivElement>(null)

  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const formattedDate = weddingDate.toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo('.hero-title-line', {
        y: 80, opacity: 0, clipPath: 'inset(0 0 100% 0)',
      }, {
        y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)',
        duration: 1.4, stagger: 0.2, ease: 'power4.out', delay: 0.3,
      })

      gsap.fromTo('.hero-subtitle', {
        opacity: 0, letterSpacing: '0.5em',
      }, {
        opacity: 1, letterSpacing: '0.15em',
        duration: 2, ease: 'power2.out', delay: 1.2,
      })

      // Gold line draw
      gsap.fromTo('.gold-divider', {
        scaleX: 0, transformOrigin: 'center',
      }, {
        scaleX: 1, duration: 1.5, ease: 'power3.inOut', delay: 1.8,
      })

      // Persona float-in
      ScrollTrigger.create({
        trigger: '.personas-section',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.persona-man', {
            x: -120, opacity: 0, rotate: -8,
          }, {
            x: 0, opacity: 1, rotate: 0,
            duration: 1.4, ease: 'back.out(1.4)',
          })
          gsap.fromTo('.persona-woman', {
            x: 120, opacity: 0, rotate: 8,
          }, {
            x: 0, opacity: 1, rotate: 0,
            duration: 1.4, ease: 'back.out(1.4)', delay: 0.15,
          })
          gsap.fromTo('.persona-heart', {
            scale: 0, opacity: 0,
          }, {
            scale: 1, opacity: 1,
            duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.9,
          })
        },
      })

      // Story sections — each line reveals on scroll
      gsap.utils.toArray<HTMLElement>('.story-reveal').forEach((el) => {
        gsap.fromTo(el, {
          y: 50, opacity: 0,
        }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        })
      })

      // Date section — cinematic zoom
      ScrollTrigger.create({
        trigger: '.date-section',
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo('.date-number', {
            scale: 0.4, opacity: 0,
          }, {
            scale: 1, opacity: 1,
            duration: 1.6, ease: 'expo.out', stagger: 0.08,
          })
          gsap.fromTo('.date-label', {
            y: 20, opacity: 0,
          }, {
            y: 0, opacity: 1,
            duration: 1, ease: 'power2.out', delay: 0.6,
          })
        },
      })

      // Venue parallax
      gsap.to('.venue-bg', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.venue-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Floating petals
      gsap.utils.toArray<HTMLElement>('.petal').forEach((petal, i) => {
        gsap.to(petal, {
          y: -40, x: (i % 2 === 0 ? 15 : -15), rotate: 360,
          duration: 3 + i * 0.5, ease: 'sine.inOut',
          repeat: -1, yoyo: true, delay: i * 0.3,
        })
      })

      // Final CTA pulse
      gsap.to('.rsvp-btn', {
        boxShadow: '0 0 40px rgba(161, 98, 7, 0.6)',
        duration: 1.5, ease: 'sine.inOut', repeat: -1, yoyo: true,
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase()
  const year = weddingDate.getFullYear()

  return (
    <div ref={containerRef} className="template-noir-gold bg-[#0C0A09] text-[#FAFAF9] overflow-x-hidden">

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_#0C0A09_70%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A16207] opacity-[0.04] rounded-full blur-[120px] pointer-events-none" />

        {/* Decorative corner lines */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#A16207] opacity-40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#A16207] opacity-40" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#A16207] opacity-40" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#A16207] opacity-40" />

        {/* Floating petals */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="petal absolute w-2 h-3 rounded-full opacity-20"
            style={{
              background: '#A16207',
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 20}%`,
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="hero-subtitle text-[#A16207] tracking-[0.3em] text-xs uppercase mb-8 font-light">
            Together Forever Begins
          </p>

          <div className="overflow-hidden mb-2">
            <h1 className="hero-title-line font-['Great_Vibes'] text-7xl md:text-9xl text-[#FAFAF9] leading-none">
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-2">
            <div className="hero-title-line flex items-center justify-center gap-6">
              <div className="gold-divider h-px w-24 bg-gradient-to-r from-transparent to-[#A16207]" />
              <span className="text-[#A16207] text-2xl">✦</span>
              <div className="gold-divider h-px w-24 bg-gradient-to-l from-transparent to-[#A16207]" />
            </div>
          </div>

          <div className="overflow-hidden mb-8">
            <h1 className="hero-title-line font-['Great_Vibes'] text-7xl md:text-9xl text-[#FAFAF9] leading-none">
              {partner2.name}
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="hero-title-line font-['Playfair_Display'] text-lg md:text-xl text-[#A16207] tracking-widest uppercase">
              Are Getting Married
            </p>
          </div>

          <div className="mt-12 overflow-hidden">
            <p className="hero-title-line font-['Cormorant_Infant'] text-xl text-[#FAFAF9] opacity-60">
              {formattedDate}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#A16207]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#A16207] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="personas-section relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#1C1917_0%,_transparent_60%)]" />

        <div className="relative z-10 text-center mb-16">
          <p className="story-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Their Story</p>
          <h2 className="story-reveal font-['Playfair_Display'] text-4xl md:text-5xl text-[#FAFAF9]">
            Two Worlds, One Love
          </h2>
        </div>

        <div ref={personasRef} className="relative z-10 flex items-end justify-center gap-0 md:gap-8 w-full max-w-2xl mx-auto">
          <div className="persona-man flex flex-col items-center">
            
            <p className="mt-4 font-['Great_Vibes'] text-3xl text-[#FAFAF9]">{partner1.name}</p>
            {partner1.nickname && (
              <p className="text-[#A16207] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>
            )}
          </div>

          <div className="persona-heart flex flex-col items-center pb-20 z-10">
            <div className="w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 60 55" className="w-full h-full drop-shadow-[0_0_20px_rgba(161,98,7,0.8)]">
                <path
                  d="M30 50 C30 50 5 35 5 18 C5 10 12 4 20 4 C25 4 29 7 30 10 C31 7 35 4 40 4 C48 4 55 10 55 18 C55 35 30 50 30 50Z"
                  fill="#A16207"
                />
              </svg>
            </div>
          </div>

          <div className="persona-woman flex flex-col items-center">
            
            <p className="mt-4 font-['Great_Vibes'] text-3xl text-[#FAFAF9]">{partner2.name}</p>
            {partner2.nickname && (
              <p className="text-[#A16207] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>
            )}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#0C0A09]" />
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A16207] to-transparent opacity-30" style={{ left: '10%' }} />

          <div className="relative z-10 max-w-2xl mx-auto space-y-24">
            {story.howTheyMet && (
              <div className="story-reveal pl-8 border-l border-[#A16207] border-opacity-30">
                <p className="text-[#A16207] text-xs tracking-[0.3em] uppercase mb-4">Chapter I</p>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-4">How It Began</h3>
                <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-70 leading-relaxed">
                  {story.howTheyMet}
                </p>
              </div>
            )}

            {story.favoriteMemory && (
              <div className="story-reveal pl-8 border-l border-[#A16207] border-opacity-30">
                <p className="text-[#A16207] text-xs tracking-[0.3em] uppercase mb-4">Chapter II</p>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-4">A Memory We Keep</h3>
                <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-70 leading-relaxed">
                  {story.favoriteMemory}
                </p>
              </div>
            )}

            {story.proposalStory && (
              <div className="story-reveal pl-8 border-l border-[#A16207] border-opacity-30">
                <p className="text-[#A16207] text-xs tracking-[0.3em] uppercase mb-4">Chapter III</p>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-4">The Question</h3>
                <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-70 leading-relaxed">
                  {story.proposalStory}
                </p>
              </div>
            )}

            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="story-reveal">
                <p className="text-[#A16207] text-xs tracking-[0.3em] uppercase mb-6 text-center">What They Share</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((passion, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 border border-[#A16207] border-opacity-40 text-[#FAFAF9] text-sm font-['Cormorant_Infant'] tracking-wider"
                    >
                      {passion}
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
        <PhotoGallery photos={data.photos} accentColor="#A16207" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="date-section relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#111009]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1C1917_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center">
          <p className="story-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-12">Save the Date</p>

          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
            <div className="date-number text-center">
              <span className="font-['Playfair_Display'] text-8xl md:text-[10rem] text-[#FAFAF9] leading-none font-bold">
                {String(day).padStart(2, '0')}
              </span>
              <p className="text-[#A16207] text-xs tracking-widest uppercase mt-2">Day</p>
            </div>

            <div className="date-number flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-[#A16207] opacity-40" />
              <span className="font-['Playfair_Display'] text-2xl text-[#A16207]">✦</span>
              <div className="w-px h-16 bg-[#A16207] opacity-40" />
            </div>

            <div className="date-number text-center">
              <span className="font-['Playfair_Display'] text-8xl md:text-[10rem] text-[#FAFAF9] leading-none font-bold">
                {month}
              </span>
              <p className="text-[#A16207] text-xs tracking-widest uppercase mt-2">Month</p>
            </div>

            <div className="date-number flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-[#A16207] opacity-40" />
              <span className="font-['Playfair_Display'] text-2xl text-[#A16207]">✦</span>
              <div className="w-px h-16 bg-[#A16207] opacity-40" />
            </div>

            <div className="date-number text-center">
              <span className="font-['Playfair_Display'] text-8xl md:text-[10rem] text-[#FAFAF9] leading-none font-bold">
                {year}
              </span>
              <p className="text-[#A16207] text-xs tracking-widest uppercase mt-2">Year</p>
            </div>
          </div>

          {ceremony.time && (
            <p className="date-label font-['Cormorant_Infant'] text-2xl text-[#FAFAF9] opacity-60">
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#A16207"
              textColor="#FAFAF9"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="venue-section relative py-32 px-6 overflow-hidden min-h-[60vh] flex items-center">
        <div className="venue-bg absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_#0C0A09_0%,_transparent_30%,_transparent_70%,_#0C0A09_100%)]" />

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(#A16207 1px, transparent 1px), linear-gradient(90deg, #A16207 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="story-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-6">The Celebration</p>
          <h2 className="story-reveal font-['Playfair_Display'] text-4xl md:text-5xl text-[#FAFAF9] mb-4">
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="story-reveal font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50 mb-2">
              {ceremony.address}
            </p>
          )}
          <p className="story-reveal font-['Cormorant_Infant'] text-xl text-[#A16207]">
            {ceremony.city}
          </p>

          {ceremony.mapUrl && (
            <a
              href={ceremony.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="story-reveal inline-block mt-8 px-8 py-3 border border-[#A16207] border-opacity-50 text-[#A16207] text-xs tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500"
            >
              View on Map
            </a>
          )}

          {reception && (
            <div className="mt-16 pt-16 border-t border-[#A16207] border-opacity-20">
              <p className="text-[#A16207] tracking-[0.3em] text-xs uppercase mb-4">Reception</p>
              <h3 className="font-['Playfair_Display'] text-2xl text-[#FAFAF9] mb-2">{reception.venue}</h3>
              <p className="font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-50">{reception.city}</p>
              {reception.time && (
                <p className="font-['Cormorant_Infant'] text-lg text-[#A16207] mt-2">{reception.time}</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#111009]" />
          <div className="relative z-10 max-w-xl mx-auto text-center">
            <div className="story-reveal">
              <span className="text-[#A16207] text-4xl opacity-30 font-serif">"</span>
              <p className="font-['Cormorant_Infant'] text-2xl md:text-3xl text-[#FAFAF9] opacity-80 leading-relaxed italic mt-2">
                {customMessage}
              </p>
              <span className="text-[#A16207] text-4xl opacity-30 font-serif">"</span>
            </div>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#A16207] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="story-reveal text-[#A16207] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="story-reveal font-['Great_Vibes'] text-6xl text-[#FAFAF9] mb-4">
            Join Us
          </h2>
          <p className="story-reveal font-['Cormorant_Infant'] text-lg text-[#FAFAF9] opacity-60 mb-12 leading-relaxed">
            We would be honoured to have you celebrate this moment with us.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a
              href={`tel:${data.rsvpContact}`}
              className="rsvp-btn inline-block px-12 py-4 bg-[#A16207] text-[#0C0A09] text-sm tracking-[0.2em] uppercase font-semibold hover:bg-[#FAFAF9] transition-all duration-500"
            >
              RSVP Now
            </a>
          )}

          {hashtag && (
            <p className="mt-12 font-['Cormorant_Infant'] text-xl text-[#A16207] opacity-60">
              #{hashtag}
            </p>
          )}

          {data.dressCode && (
            <p className="mt-4 text-[#FAFAF9] opacity-40 text-xs tracking-widest uppercase">
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#A16207] opacity-30" />
            <span className="text-[#A16207] opacity-40 text-lg">✦</span>
            <div className="h-px w-16 bg-[#A16207] opacity-30" />
          </div>
          <p className="font-['Great_Vibes'] text-3xl text-[#FAFAF9] opacity-30">
            {partner1.name} & {partner2.name}
          </p>
          <p className="text-[#FAFAF9] opacity-20 text-xs tracking-widest uppercase mt-2">
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
