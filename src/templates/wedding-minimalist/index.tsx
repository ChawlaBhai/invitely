'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingMinimalist({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow, deliberate reveals — nothing rushed
      gsap.fromTo('.min-title', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 2, stagger: 0.3, ease: 'power2.out', delay: 0.5,
      })

      // Line draw
      gsap.fromTo('.min-line', { scaleX: 0, transformOrigin: 'left' }, {
        scaleX: 1, duration: 1.5, ease: 'power3.inOut', delay: 1.5,
      })

      // Personas — very slow, graceful
      ScrollTrigger.create({
        trigger: '.min-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.min-man', { opacity: 0, x: -40 }, {
            opacity: 1, x: 0, duration: 1.8, ease: 'power2.out',
          })
          gsap.fromTo('.min-woman', { opacity: 0, x: 40 }, {
            opacity: 1, x: 0, duration: 1.8, ease: 'power2.out', delay: 0.2,
          })
        },
      })

      // Story — each word feels considered
      gsap.utils.toArray<HTMLElement>('.min-reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // Date — numbers appear one by one
      ScrollTrigger.create({
        trigger: '.min-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.min-date-el', { opacity: 0 }, {
            opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power2.out',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="overflow-x-hidden" style={{ background: '#FAFAF8', color: '#1A1A1A' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#FAFAF8' }} />

        {/* Single thin horizontal line — the only decoration */}
        <div className="min-line absolute top-1/2 left-0 right-0 h-px" style={{ background: '#1A1A1A', opacity: 0.08 }} />

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="overflow-hidden mb-2">
            <p className="min-title tracking-[0.6em] text-[10px] uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.4 }}>
              A Wedding
            </p>
          </div>

          <div className="overflow-hidden mb-1">
            <h1 className="min-title leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(4rem, 12vw, 9rem)', color: '#1A1A1A', fontWeight: 300, letterSpacing: '-0.02em' }}>
              {partner1.name}
            </h1>
          </div>

          <div className="overflow-hidden mb-1">
            <p className="min-title tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
              &amp;
            </p>
          </div>

          <div className="overflow-hidden mb-10">
            <h1 className="min-title leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(4rem, 12vw, 9rem)', color: '#1A1A1A', fontWeight: 300, letterSpacing: '-0.02em' }}>
              {partner2.name}
            </h1>
          </div>

          <div className="overflow-hidden">
            <p className="min-title tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.35 }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 z-10">
          <div className="w-px h-16 bg-[#1A1A1A] animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="min-personas relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#F5F5F3' }} />

        <div className="relative z-10 flex items-end justify-center gap-8 md:gap-24 max-w-2xl mx-auto">
          <div className="min-man flex flex-col items-center">
            
            <p className="mt-6 tracking-[0.2em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.5 }}>
              {partner1.name}
            </p>
          </div>

          <div className="pb-20 flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-[#1A1A1A] opacity-15" />
            <p className="tracking-[0.3em] text-[10px] uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
              &amp;
            </p>
            <div className="w-px h-12 bg-[#1A1A1A] opacity-15" />
          </div>

          <div className="min-woman flex flex-col items-center">
            
            <p className="mt-6 tracking-[0.2em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.5 }}>
              {partner2.name}
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-32 px-8 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FAFAF8' }} />

          <div className="relative z-10 max-w-xl mx-auto space-y-24">
            {story.howTheyMet && (
              <div className="min-reveal">
                <p className="tracking-[0.4em] text-[10px] uppercase mb-6"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
                  I
                </p>
                <p className="text-xl leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.7 }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="min-reveal">
                <p className="tracking-[0.4em] text-[10px] uppercase mb-6"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
                  II
                </p>
                <p className="text-xl leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.7 }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="min-reveal">
                <p className="tracking-[0.4em] text-[10px] uppercase mb-6"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
                  III
                </p>
                <p className="text-xl leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.7 }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="min-reveal">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="tracking-[0.2em] text-xs uppercase"
                      style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.35 }}>
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
        <PhotoGallery photos={data.photos} accentColor="#1A1A1A" label="Moments" />
      )}

      {/* ── DATE ── */}
      <section className="min-date relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#F5F5F3' }} />

        <div className="relative z-10 text-center max-w-xl mx-auto">
          <p className="min-reveal tracking-[0.4em] text-[10px] uppercase mb-16"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
            The Date
          </p>

          <div className="flex items-baseline justify-center gap-6 md:gap-12">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: '/', label: '' },
              { value: month.slice(0, 3).toUpperCase(), label: 'Month' },
              { value: '/', label: '' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="min-date-el text-center">
                <p className="leading-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: value === '/' ? '3rem' : 'clamp(2.5rem, 8vw, 5rem)',
                    color: '#1A1A1A',
                    fontWeight: 300,
                    opacity: value === '/' ? 0.15 : 0.8,
                    letterSpacing: '-0.02em',
                  }}>
                  {value}
                </p>
                {label && (
                  <p className="tracking-[0.3em] text-[9px] uppercase mt-2"
                    style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.25 }}>
                    {label}
                  </p>
                )}
              </div>
            ))}
          </div>

          {ceremony.time && (
            <p className="min-reveal mt-10 tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-10">
            <CountdownTimer targetDate={ceremony.date} accentColor="#1A1A1A" textColor="#1A1A1A" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-32 px-8 overflow-hidden min-h-[40vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#FAFAF8' }} />

        <div className="relative z-10 text-center w-full max-w-xl mx-auto">
          <p className="min-reveal tracking-[0.4em] text-[10px] uppercase mb-8"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
            Where
          </p>
          <h2 className="min-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="min-reveal text-sm mb-2 tracking-wider"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.35 }}>
              {ceremony.address}
            </p>
          )}
          <p className="min-reveal tracking-[0.3em] text-xs uppercase"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.4 }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-16 pt-16 border-t border-[#1A1A1A] border-opacity-10">
              <p className="tracking-[0.4em] text-[10px] uppercase mb-4"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
                Reception
              </p>
              <h3 className="text-2xl mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A' }}>
                {reception.venue}
              </h3>
              <p className="tracking-wider text-sm"
                style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.35 }}>
                {reception.city}
              </p>
              {reception.time && (
                <p className="tracking-[0.3em] text-xs uppercase mt-2"
                  style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
                  {reception.time}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-24 px-8 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#F5F5F3' }} />
          <div className="relative z-10 max-w-lg mx-auto text-center min-reveal">
            <p className="text-2xl leading-relaxed italic"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.6 }}>
              {customMessage}
            </p>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-32 px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#FAFAF8' }} />

        <div className="relative z-10 text-center max-w-sm mx-auto">
          <p className="min-reveal tracking-[0.4em] text-[10px] uppercase mb-8"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.3 }}>
            You Are Invited
          </p>
          <h2 className="min-reveal text-5xl mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', letterSpacing: '-0.02em' }}>
            Join Us
          </h2>
          <p className="min-reveal text-sm leading-relaxed mb-12 tracking-wider"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.4 }}>
            We would be honoured by your presence.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-10 py-3 text-xs tracking-[0.3em] uppercase transition-all duration-500 hover:bg-[#1A1A1A] hover:text-[#FAFAF8]"
              style={{ border: '1px solid rgba(26,26,26,0.2)', color: '#1A1A1A', fontFamily: "'Raleway', sans-serif", fontWeight: 300 }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 tracking-[0.3em] text-xs uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.25 }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 tracking-[0.3em] text-[10px] uppercase"
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.2 }}>
              {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-24 text-center">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="h-px w-12 bg-[#1A1A1A] opacity-10" />
            <div className="h-px w-12 bg-[#1A1A1A] opacity-10" />
          </div>
          <p className="text-2xl"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.15 }}>
            {partner1.name} &amp; {partner2.name}
          </p>
          <p className="tracking-[0.3em] text-[10px] uppercase mt-2"
            style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, color: '#1A1A1A', opacity: 0.1 }}>
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
