'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayBohemian({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero organic entrance
      gsap.fromTo('.boho-title', { y: 70, opacity: 0, rotate: -2 }, {
        y: 0, opacity: 1, rotate: 0,
        duration: 1.6, stagger: 0.18, ease: 'power4.out', delay: 0.3,
      })
      gsap.fromTo('.boho-sub', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 1.2,
      })

      // Feather / petal float
      gsap.utils.toArray<HTMLElement>('.boho-float').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -18 : -12,
          rotate: i % 2 === 0 ? 8 : -8,
          duration: 3 + i * 0.5,
          ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.25,
        })
      })

      // Persona entrance with slight rotation
      ScrollTrigger.create({
        trigger: '.boho-persona',
        start: 'top 72%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 60, opacity: 0, rotate: -3 }, {
            y: 0, opacity: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.4)',
          })
        },
      })

      // Chapter cards — organic stagger with slight rotation
      ScrollTrigger.create({
        trigger: '.boho-chapters',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.boho-chapter', {
            y: 50, opacity: 0, rotate: (i) => i % 2 === 0 ? -2 : 2,
          }, {
            y: 0, opacity: 1, rotate: 0,
            duration: 0.9, stagger: 0.15, ease: 'power3.out',
          })
        },
      })

      // Tags bounce in
      ScrollTrigger.create({
        trigger: '.boho-tags',
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo('.boho-tag', { scale: 0, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(2)',
          })
        },
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.boho-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#FDF6EC] text-[#2D1B0E] overflow-x-hidden"
      style={{ fontFamily: "'Nunito', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Warm texture overlay */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(217,119,6,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(180,83,9,0.06) 0%, transparent 60%)' }} />

        {/* Scattered decorative circles */}
        <div className="boho-float absolute top-16 left-8 w-20 h-20 rounded-full border-2 border-[#D97706] opacity-15" />
        <div className="boho-float absolute top-32 right-12 w-12 h-12 rounded-full border border-[#D97706] opacity-20" />
        <div className="boho-float absolute bottom-24 left-16 w-16 h-16 rounded-full border-2 border-[#92400E] opacity-10" />
        <div className="boho-float absolute bottom-40 right-8 w-24 h-24 rounded-full border border-[#D97706] opacity-12" />

        {/* Sun motif */}
        <div className="boho-float absolute top-20 right-1/4 opacity-10">
          <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
            <circle cx="40" cy="40" r="16" fill="#D97706" />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180
              return (
                <line key={i}
                  x1={40 + 20 * Math.cos(angle)} y1={40 + 20 * Math.sin(angle)}
                  x2={40 + 32 * Math.cos(angle)} y2={40 + 32 * Math.sin(angle)}
                  stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              )
            })}
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-2">
            <p className="boho-title text-[#D97706] tracking-[0.4em] text-xs uppercase"
              style={{ fontFamily: "'Abril Fatface', cursive" }}>
              Free Spirit
            </p>
          </div>

          <div className="overflow-hidden mb-3">
            <h1 className="boho-title leading-none"
              style={{
                fontFamily: "'Abril Fatface', cursive",
                fontSize: 'clamp(3rem, 12vw, 8rem)',
                color: '#2D1B0E',
              }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-4">
              <p className="boho-title text-[#D97706] text-3xl"
                style={{ fontFamily: "'Satisfy', cursive" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          {age !== undefined && (
            <div className="overflow-hidden my-6">
              <p className="boho-title font-bold leading-none"
                style={{
                  fontFamily: "'Abril Fatface', cursive",
                  fontSize: 'clamp(4rem, 18vw, 12rem)',
                  color: '#D97706',
                  opacity: 0.85,
                }}>
                {age}
              </p>
            </div>
          )}

          <div className="boho-sub flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-[#D97706] opacity-40" />
            <p className="text-[#2D1B0E] opacity-50 text-sm tracking-wide"
              style={{ fontFamily: "'Satisfy', cursive", fontSize: '1.2rem' }}>
              wild & wonderful
            </p>
            <div className="h-px w-16 bg-[#D97706] opacity-40" />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-[#D97706] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONA ── */}
      <section className="boho-persona relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#F5ECD8' }} />

        {/* Offset decorative element */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 rounded-full"
          style={{ background: '#D97706', opacity: 0.08 }} />

        <div className="relative z-10 flex flex-col items-center">
          <p className="boho-reveal text-[#D97706] tracking-[0.3em] text-xs uppercase mb-3"
            style={{ fontFamily: "'Abril Fatface', cursive" }}>
            The Birthday Soul
          </p>
          <h2 className="boho-reveal text-5xl text-[#2D1B0E] mb-10"
            style={{ fontFamily: "'Satisfy', cursive" }}>
            {celebrant.name}
          </h2>

          {/* Slightly offset persona container */}
          <div className="persona-figure" style={{ transform: 'rotate(-1deg)' }}>
            
          </div>

          {story.message && (
            <div className="boho-reveal mt-8 max-w-md text-center p-6 rounded-sm"
              style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', transform: 'rotate(0.5deg)' }}>
              <p className="text-xl text-[#2D1B0E] opacity-70 leading-relaxed"
                style={{ fontFamily: "'Satisfy', cursive", fontSize: '1.4rem' }}>
                "{story.message}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── LIFE CHAPTERS ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-[#FDF6EC]" />

          {/* Offset vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D97706] to-transparent opacity-20" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-16" style={{ transform: 'rotate(-0.5deg)' }}>
              <p className="boho-reveal text-[#D97706] tracking-[0.3em] text-xs uppercase mb-3">
                The Journey
              </p>
              <h2 className="boho-reveal text-4xl text-[#2D1B0E]"
                style={{ fontFamily: "'Abril Fatface', cursive" }}>
                Life Chapters
              </h2>
            </div>

            <div className="boho-chapters space-y-8">
              {story.highlights.map((highlight, i) => (
                <div key={i} className="boho-chapter p-6 rounded-sm"
                  style={{
                    background: i % 2 === 0 ? 'rgba(217,119,6,0.05)' : 'rgba(180,83,9,0.04)',
                    border: '1px solid rgba(217,119,6,0.15)',
                    transform: `rotate(${i % 2 === 0 ? '-0.5deg' : '0.5deg'})`,
                    marginLeft: i % 3 === 1 ? '1.5rem' : '0',
                  }}>
                  <div className="flex items-start gap-4">
                    <span className="text-[#D97706] font-bold flex-shrink-0"
                      style={{ fontFamily: "'Abril Fatface', cursive", fontSize: '1.8rem', lineHeight: 1 }}>
                      {i + 1}
                    </span>
                    <p className="text-[#2D1B0E] opacity-75 leading-relaxed pt-1">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS as tags ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#F0E4CC' }} />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="boho-reveal text-[#D97706] tracking-[0.3em] text-xs uppercase mb-3">
                Did You Know?
              </p>
              <h2 className="boho-reveal text-4xl text-[#2D1B0E]"
                style={{ fontFamily: "'Abril Fatface', cursive" }}>
                Fun Facts
              </h2>
            </div>

            <div className="boho-tags flex flex-wrap justify-center gap-4">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="boho-tag px-5 py-3 rounded-full text-sm text-[#2D1B0E] opacity-80"
                  style={{
                    background: i % 3 === 0 ? 'rgba(217,119,6,0.15)' : i % 3 === 1 ? 'rgba(180,83,9,0.12)' : 'rgba(146,64,14,0.1)',
                    border: '1px solid rgba(217,119,6,0.3)',
                    transform: `rotate(${(i % 5 - 2) * 1.5}deg)`,
                  }}>
                  {fact}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#D97706" label="Moments" />
      )}

      {/* ── DATE / EVENT ── */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#FDF6EC]" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="boho-reveal text-[#D97706] tracking-[0.3em] text-xs uppercase mb-6">
            Come Gather
          </p>
          <h2 className="boho-reveal text-5xl text-[#2D1B0E] mb-8"
            style={{ fontFamily: "'Satisfy', cursive" }}>
            {event.venue}
          </h2>

          <div className="boho-reveal p-8 rounded-sm inline-block"
            style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', transform: 'rotate(-0.5deg)' }}>
            <p className="text-[#2D1B0E] opacity-60 mb-2">{eventDate}</p>
            {event.time && <p className="text-[#D97706] text-xl mb-2">{event.time}</p>}
            {event.address && <p className="text-[#2D1B0E] opacity-50 text-sm mb-1">{event.address}</p>}
            <p className="text-[#2D1B0E] opacity-70">{event.city}</p>
          </div>

          <div className="mt-8">
            <CountdownTimer
              targetDate={event.date}
              accentColor="#D97706"
              textColor="#2D1B0E"
              label="Counting Down"
            />
          </div>

          {event.mapUrl && (
            <div className="mt-8">
              <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                className="boho-reveal inline-block px-8 py-3 rounded-full text-sm text-[#2D1B0E] tracking-wide hover:bg-[#D97706] hover:text-white transition-all duration-500"
                style={{ border: '2px solid rgba(217,119,6,0.5)' }}>
                Find Us Here
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#F5ECD8' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center boho-reveal"
            style={{ transform: 'rotate(0.5deg)' }}>
            <p className="text-[#D97706] text-5xl opacity-30" style={{ fontFamily: "'Abril Fatface', cursive" }}>"</p>
            <p className="text-xl text-[#2D1B0E] opacity-70 leading-relaxed"
              style={{ fontFamily: "'Satisfy', cursive", fontSize: '1.5rem' }}>
              {customMessage}
            </p>
            <p className="text-[#D97706] text-5xl opacity-30" style={{ fontFamily: "'Abril Fatface', cursive" }}>"</p>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[#2D1B0E]" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, rgba(217,119,6,0.12) 0%, transparent 70%)' }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="boho-reveal text-[#D97706] tracking-[0.3em] text-xs uppercase mb-6">
            You Are Invited
          </p>
          <h2 className="boho-reveal text-6xl text-[#FDF6EC] mb-6"
            style={{ fontFamily: "'Satisfy', cursive" }}>
            Join the Circle
          </h2>
          <p className="boho-reveal text-lg text-[#FDF6EC] opacity-50 mb-10 leading-relaxed">
            Come as you are. Bring your spirit. Celebrate {celebrant.name}.
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 rounded-full text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#FDF6EC] hover:text-[#2D1B0E]"
              style={{ background: '#D97706', color: '#FDF6EC' }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#D97706] opacity-20" />
            <div className="w-2 h-2 rounded-full bg-[#D97706] opacity-30" />
            <div className="h-px w-16 bg-[#D97706] opacity-20" />
          </div>
          <p className="text-3xl text-[#FDF6EC] opacity-20" style={{ fontFamily: "'Satisfy', cursive" }}>
            {celebrant.name}
          </p>
        </div>
      </section>
    </div>
  )
}
