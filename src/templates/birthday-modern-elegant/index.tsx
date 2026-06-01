'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BirthdayData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: BirthdayData }

export default function BirthdayModernElegant({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { celebrant, age, story, event, rsvpContact, customMessage } = data

  const eventDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-path reveal on hero titles
      gsap.fromTo('.edit-title', { clipPath: 'inset(0 100% 0 0)', opacity: 1 }, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4, stagger: 0.2, ease: 'power4.inOut', delay: 0.3,
      })
      gsap.fromTo('.edit-sub', { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2,
      })

      // Gold rule lines draw
      gsap.fromTo('.gold-rule', { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.inOut', delay: 0.8,
        transformOrigin: 'left center',
      })

      // Persona entrance
      ScrollTrigger.create({
        trigger: '.edit-persona',
        start: 'top 72%',
        onEnter: () => {
          gsap.fromTo('.persona-figure', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.persona-label', { x: 40, opacity: 0 }, {
            x: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4,
          })
        },
      })

      // Editorial sections stagger
      ScrollTrigger.create({
        trigger: '.edit-sections',
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo('.edit-section', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power3.out',
          })
        },
      })

      // Sidebar callouts
      gsap.utils.toArray<HTMLElement>('.sidebar-callout').forEach(el => {
        gsap.fromTo(el, { x: 60, opacity: 0 }, {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>('.edit-reveal').forEach(el => {
        gsap.fromTo(el, { y: 35, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 83%' },
        })
      })

      // Age pull-quote
      ScrollTrigger.create({
        trigger: '.age-pullquote',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.age-pullquote', { scale: 0.8, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 1.4, ease: 'expo.out',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="bg-[#0C0A09] text-[#F5F0E8] overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Infant', serif" }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end px-8 md:px-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        {/* Vertical gold accent line */}
        <div className="absolute top-0 left-16 md:left-24 w-px h-full bg-gradient-to-b from-transparent via-[#A16207] to-transparent opacity-20" />

        {/* Issue label */}
        <div className="absolute top-10 left-8 md:left-16 flex items-center gap-4">
          <div className="gold-rule h-px w-16 bg-[#A16207] opacity-60" style={{ transformOrigin: 'left center' }} />
          <span className="text-[#A16207] text-xs tracking-[0.4em] uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Edit
          </span>
        </div>

        <div className="absolute top-10 right-8 md:right-16">
          <p className="text-[#F5F0E8] opacity-20 text-xs tracking-widest uppercase" style={{ fontFamily: "'Cormorant Infant', serif" }}>
            {event.city}
          </p>
        </div>

        <div className="relative z-10 max-w-4xl">
          <p className="edit-sub text-[#A16207] text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            A Special Edition
          </p>

          <div className="overflow-hidden mb-2">
            <h1 className="edit-title leading-none"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                color: '#F5F0E8',
                letterSpacing: '-0.02em',
              }}>
              {celebrant.name}
            </h1>
          </div>

          {celebrant.nickname && (
            <div className="overflow-hidden mb-4">
              <p className="edit-title text-[#A16207] text-3xl italic"
                style={{ fontFamily: "'Great Vibes', cursive" }}>
                "{celebrant.nickname}"
              </p>
            </div>
          )}

          <div className="overflow-hidden mt-6">
            <div className="edit-title flex items-center gap-6">
              <div className="gold-rule h-px w-24 bg-[#A16207] opacity-50" style={{ transformOrigin: 'left center' }} />
              <p className="text-[#F5F0E8] opacity-40 text-sm tracking-widest uppercase"
                style={{ fontFamily: "'Cormorant Infant', serif" }}>
                {age !== undefined ? `${age} Years` : 'A Celebration'}
              </p>
            </div>
          </div>
        </div>

        {/* Age as editorial pull-quote — bottom right */}
        {age !== undefined && (
          <div className="age-pullquote absolute bottom-20 right-8 md:right-16 text-right">
            <p className="leading-none font-bold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(4rem, 15vw, 10rem)',
                color: '#A16207',
                opacity: 0.12,
              }}>
              {age}
            </p>
          </div>
        )}
      </section>

      {/* ── PERSONA ── */}
      <section className="edit-persona relative py-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#100E0D]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#A16207] opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#A16207] opacity-20" />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-12 max-w-4xl mx-auto">
          <div className="persona-figure flex-shrink-0">
            
          </div>
          <div className="persona-label flex-1 text-center md:text-left">
            <p className="text-[#A16207] text-xs tracking-[0.4em] uppercase mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              The Subject
            </p>
            <h2 className="text-5xl md:text-6xl text-[#F5F0E8] mb-4"
              style={{ fontFamily: "'Great Vibes', cursive" }}>
              {celebrant.name}
            </h2>
            {story.message && (
              <p className="text-xl text-[#F5F0E8] opacity-60 leading-relaxed italic max-w-md">
                "{story.message}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL SECTIONS (highlights) ── */}
      {story.highlights && story.highlights.length > 0 && (
        <section className="relative py-24 px-8 md:px-16 overflow-hidden">
          <div className="absolute inset-0 bg-[#0C0A09]" />
          <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#A16207] to-transparent opacity-15" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="edit-reveal text-[#A16207] text-xs tracking-[0.4em] uppercase mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                The Story
              </p>
              <h2 className="edit-reveal text-4xl text-[#F5F0E8]"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Life in Chapters
              </h2>
            </div>

            <div className="edit-sections space-y-14">
              {story.highlights.map((highlight, i) => (
                <div key={i} className="edit-section flex gap-8 items-start">
                  <div className="flex-shrink-0 text-right w-12">
                    <span className="text-[#A16207] opacity-40 font-bold"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', lineHeight: 1 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="gold-rule h-px w-full bg-[#A16207] opacity-20 mb-4" style={{ transformOrigin: 'left center' }} />
                    <p className="text-lg text-[#F5F0E8] opacity-70 leading-relaxed">{highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FUN FACTS as sidebar callouts ── */}
      {story.funFacts && story.funFacts.length > 0 && (
        <section className="relative py-24 px-8 md:px-16 overflow-hidden">
          <div className="absolute inset-0 bg-[#100E0D]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-[#A16207] opacity-20" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="edit-reveal text-[#A16207] text-xs tracking-[0.4em] uppercase mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                The Details
              </p>
              <h2 className="edit-reveal text-4xl text-[#F5F0E8]"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Things You Should Know
              </h2>
            </div>

            <div className="space-y-6">
              {story.funFacts.map((fact, i) => (
                <div key={i} className="sidebar-callout flex gap-6 items-start p-6"
                  style={{ borderLeft: '2px solid rgba(161,98,7,0.4)', background: 'rgba(161,98,7,0.04)' }}>
                  <span className="text-[#A16207] font-bold text-sm flex-shrink-0 mt-0.5"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[#F5F0E8] opacity-70 leading-relaxed">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PHOTOS ── */}
      {data.photos && data.photos.length > 0 && (
        <PhotoGallery photos={data.photos} accentColor="#A16207" label="Moments" />
      )}

      {/* ── DATE / EVENT ── */}
      <section className="relative py-24 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#A16207] opacity-20" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="edit-reveal text-[#A16207] text-xs tracking-[0.4em] uppercase mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                The Event
              </p>
              <h2 className="edit-reveal text-4xl md:text-5xl text-[#F5F0E8] mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                {event.venue}
              </h2>
              <div className="gold-rule h-px w-24 bg-[#A16207] opacity-40 mb-6" style={{ transformOrigin: 'left center' }} />
              <p className="edit-reveal text-[#F5F0E8] opacity-50 mb-2">{eventDate}</p>
              {event.time && <p className="edit-reveal text-[#A16207] text-xl mb-2">{event.time}</p>}

              <div className="mt-6">
                <CountdownTimer
                  targetDate={event.date}
                  accentColor="#A16207"
                  textColor="#FAFAF9"
                  label="Counting Down"
                />
              </div>

              {event.address && <p className="edit-reveal text-[#F5F0E8] opacity-40 text-sm">{event.address}</p>}
              <p className="edit-reveal text-[#F5F0E8] opacity-60 mt-1">{event.city}</p>
              {event.mapUrl && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="edit-reveal inline-block mt-6 px-6 py-2 border border-[#A16207] border-opacity-40 text-[#A16207] text-xs tracking-[0.2em] uppercase hover:bg-[#A16207] hover:text-[#0C0A09] transition-all duration-500">
                  View on Map
                </a>
              )}
            </div>

            {age !== undefined && (
              <div className="flex-shrink-0 text-center md:text-right">
                <p className="text-[#A16207] text-xs tracking-[0.3em] uppercase mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  Celebrating
                </p>
                <p className="font-bold leading-none"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(4rem, 12vw, 7rem)',
                    color: '#F5F0E8',
                    opacity: 0.9,
                  }}>
                  {age}
                </p>
                <p className="text-[#A16207] text-sm tracking-widest uppercase mt-1">Years</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-8 md:px-16 overflow-hidden">
          <div className="absolute inset-0 bg-[#100E0D]" />
          <div className="relative z-10 max-w-2xl mx-auto edit-reveal">
            <div className="gold-rule h-px w-16 bg-[#A16207] opacity-40 mb-8" style={{ transformOrigin: 'left center' }} />
            <p className="text-2xl text-[#F5F0E8] opacity-65 leading-relaxed italic">{customMessage}</p>
            <div className="gold-rule h-px w-16 bg-[#A16207] opacity-40 mt-8" style={{ transformOrigin: 'left center' }} />
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-[#0C0A09]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-[#A16207] opacity-20" />

        <div className="relative z-10 max-w-lg mx-auto text-center">
          <p className="edit-reveal text-[#A16207] text-xs tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            You Are Invited
          </p>
          <h2 className="edit-reveal text-6xl text-[#F5F0E8] mb-6"
            style={{ fontFamily: "'Great Vibes', cursive" }}>
            Join the Celebration
          </h2>
          <p className="edit-reveal text-lg text-[#F5F0E8] opacity-50 mb-10 leading-relaxed">
            Come celebrate {celebrant.name} — an extraordinary person deserving an extraordinary evening.
          </p>

          {rsvpContact && (
            <a href={`tel:${rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500 hover:bg-[#F5F0E8] hover:text-[#0C0A09]"
              style={{ background: '#A16207', color: '#F5F0E8' }}>
              RSVP
            </a>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-[#A16207] opacity-20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#A16207] opacity-40" />
            <div className="h-px w-16 bg-[#A16207] opacity-20" />
          </div>
          <p className="text-3xl text-[#F5F0E8] opacity-15" style={{ fontFamily: "'Great Vibes', cursive" }}>
            {celebrant.name}
          </p>
        </div>
      </section>
    </div>
  )
}
