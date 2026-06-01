'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

const FEATHER_PATHS = [
  'M10 80 C10 60 20 20 30 5 C35 15 30 40 25 55 C35 45 45 30 50 15 C52 30 45 50 35 65 C45 58 55 45 58 30 C58 48 50 65 40 75 C48 72 55 62 55 50 C53 65 45 78 35 85 Z',
  'M5 70 C8 50 18 15 25 2 C30 12 26 38 20 52 C30 42 40 28 44 12 C46 27 40 47 30 62 C40 55 50 42 50 28 C50 46 42 62 32 72 C40 69 47 59 47 47 C45 62 37 75 27 82 Z',
]

export default function WeddingBohemian({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero title — organic stagger
      gsap.fromTo('.boho-title', { y: 60, opacity: 0, rotate: -2 }, {
        y: 0, opacity: 1, rotate: 0,
        duration: 1.4, stagger: 0.2, ease: 'power4.out', delay: 0.3,
      })

      // Feathers drift
      gsap.utils.toArray<HTMLElement>('.feather').forEach((el, i) => {
        gsap.to(el, {
          y: -25, x: i % 2 === 0 ? 12 : -12, rotate: i % 2 === 0 ? 8 : -8,
          duration: 4 + i * 0.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.4,
        })
      })

      // Scattered elements entrance
      gsap.utils.toArray<HTMLElement>('.boho-scatter').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.8, rotate: (i % 2 === 0 ? 3 : -3) }, {
          opacity: 1, scale: 1, rotate: 0,
          duration: 1, ease: 'back.out(1.2)', delay: 0.6 + i * 0.1,
        })
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.boho-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.boho-man', { x: -80, opacity: 0, rotate: -5 }, {
            x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.2)',
          })
          gsap.fromTo('.boho-woman', { x: 80, opacity: 0, rotate: 5 }, {
            x: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.2)', delay: 0.15,
          })
        },
      })

      // Story reveals — slight rotation for organic feel
      gsap.utils.toArray<HTMLElement>('.boho-reveal').forEach((el, i) => {
        gsap.fromTo(el, { y: 40, opacity: 0, rotate: i % 2 === 0 ? 1 : -1 }, {
          y: 0, opacity: 1, rotate: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date reveal
      ScrollTrigger.create({
        trigger: '.boho-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.boho-date-el', { scale: 0.7, opacity: 0, rotate: -3 }, {
            scale: 1, opacity: 1, rotate: 0, duration: 0.9, stagger: 0.08, ease: 'back.out(1.4)',
          })
        },
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-boho overflow-x-hidden" style={{ background: '#FDF6EC', color: '#2D1B0E' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        {/* Warm earthy background */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #FEF3C7 30%, #FDE8D0 60%, #FDF6EC 100%)' }} />

        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />

        {/* Floating feathers */}
        {[
          { top: '15%', left: '8%', rotate: '-20deg', scale: 0.8 },
          { top: '20%', right: '10%', rotate: '15deg', scale: 0.7 },
          { top: '65%', left: '5%', rotate: '30deg', scale: 0.6 },
          { top: '70%', right: '8%', rotate: '-25deg', scale: 0.75 },
        ].map((pos, i) => (
          <svg key={i} className="feather absolute pointer-events-none" viewBox="0 0 60 90"
            style={{ width: 40, height: 60, top: pos.top, left: (pos as any).left, right: (pos as any).right, transform: `rotate(${pos.rotate}) scale(${pos.scale})`, opacity: 0.25 }}>
            <path d={FEATHER_PATHS[i % 2]} fill="#D97706" />
          </svg>
        ))}

        {/* Scattered wildflower dots */}
        {[...Array(12)].map((_, i) => (
          <div key={i} className="boho-scatter absolute rounded-full pointer-events-none"
            style={{
              width: 6 + (i % 3) * 4,
              height: 6 + (i % 3) * 4,
              background: i % 3 === 0 ? '#D97706' : i % 3 === 1 ? '#DC2626' : '#16A34A',
              left: `${8 + i * 7}%`,
              top: `${10 + (i % 4) * 20}%`,
              opacity: 0.2,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="overflow-hidden mb-3">
            <p className="boho-title tracking-[0.3em] text-xs uppercase opacity-60"
              style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              Wild & Free
            </p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="boho-title leading-none"
              style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: '#2D1B0E' }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="boho-title flex items-center justify-center gap-4">
              <div className="h-px w-16 opacity-30" style={{ background: '#D97706' }} />
              <svg viewBox="0 0 40 40" className="w-6 h-6">
                {[0, 72, 144, 216, 288].map((angle, j) => (
                  <ellipse key={j} cx={20 + 8 * Math.cos(angle * Math.PI / 180)} cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                    rx="5" ry="3" fill="#D97706" opacity="0.7"
                    transform={`rotate(${angle}, ${20 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`} />
                ))}
                <circle cx="20" cy="20" r="4" fill="#FCD34D" />
              </svg>
              <div className="h-px w-16 opacity-30" style={{ background: '#D97706' }} />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="boho-title leading-none"
              style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: '#2D1B0E' }}>
              {partner2.name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="boho-title text-2xl" style={{ fontFamily: "'Satisfy', cursive", color: '#D97706' }}>
              Are Getting Married
            </p>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="boho-title opacity-50 text-base" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        {/* Bottom wildflower border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end pb-2 pointer-events-none">
          {Array.from({ length: 14 }).map((_, i) => (
            <svg key={i} className="flex-shrink-0" viewBox="0 0 30 50" style={{ width: 20, height: 35, opacity: 0.3 }}>
              <rect x="13" y="25" width="4" height="25" fill="#16A34A" />
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j}
                  cx={15 + 8 * Math.cos(angle * Math.PI / 180)}
                  cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                  rx="5" ry="3"
                  fill={i % 3 === 0 ? '#D97706' : i % 3 === 1 ? '#DC2626' : '#FBCFE8'}
                  opacity="0.8"
                  transform={`rotate(${angle}, ${15 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`}
                />
              ))}
              <circle cx="15" cy="20" r="4" fill="#FCD34D" />
            </svg>
          ))}
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#D97706] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="boho-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#FFF7ED' }} />

        <div className="relative z-10 text-center mb-12">
          <p className="boho-reveal tracking-[0.3em] text-xs uppercase mb-3 opacity-60"
            style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
            The Couple
          </p>
          <h2 className="boho-reveal text-4xl" style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>
            Two Souls, One Wild Life
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="boho-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Satisfy', cursive", color: '#2D1B0E' }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-xs tracking-widest uppercase mt-1 opacity-50" style={{ color: '#D97706' }}>{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <svg viewBox="0 0 60 55" className="w-12 h-12 drop-shadow-[0_0_15px_rgba(217,119,6,0.4)]">
              <path d="M30 50 C30 50 5 35 5 18 C5 10 12 4 20 4 C25 4 29 7 30 10 C31 7 35 4 40 4 C48 4 55 10 55 18 C55 35 30 50 30 50Z" fill="#D97706" />
            </svg>
          </div>

          <div className="boho-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Satisfy', cursive", color: '#2D1B0E' }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-xs tracking-widest uppercase mt-1 opacity-50" style={{ color: '#D97706' }}>{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FDF6EC' }} />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="boho-reveal text-center">
                <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-50" style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif" }}>How It Started</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>The Beginning</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="boho-reveal text-center">
                <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-50" style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif" }}>A Moment</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>A Memory We Keep</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="boho-reveal text-center">
                <p className="text-xs tracking-[0.3em] uppercase mb-3 opacity-50" style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif" }}>The Question</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>The Proposal</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="boho-reveal text-center">
                <p className="text-xs tracking-[0.3em] uppercase mb-6 opacity-50" style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif" }}>Their World</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm opacity-70"
                      style={{ border: '1px solid rgba(217,119,6,0.3)', fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E', borderRadius: '2px' }}>
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
        <PhotoGallery photos={data.photos} accentColor="#D97706" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="boho-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FFF7ED, #FDE8D0)' }} />

        <div className="relative z-10 text-center">
          <p className="boho-reveal text-xs tracking-[0.3em] uppercase mb-10 opacity-50"
            style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
            The Day
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: month.toUpperCase(), label: 'Month' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="boho-date-el text-center">
                  <p className="leading-none font-bold"
                    style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#2D1B0E' }}>
                    {value}
                  </p>
                  <p className="text-xs tracking-widest uppercase mt-2 opacity-50" style={{ color: '#D97706' }}>{label}</p>
                </div>
                {i < 2 && (
                  <svg className="boho-date-el w-5 h-5 flex-shrink-0" viewBox="0 0 40 40">
                    {[0, 72, 144, 216, 288].map((angle, j) => (
                      <ellipse key={j} cx={20 + 8 * Math.cos(angle * Math.PI / 180)} cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                        rx="5" ry="3" fill="#D97706" opacity="0.5"
                        transform={`rotate(${angle}, ${20 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`} />
                    ))}
                    <circle cx="20" cy="20" r="4" fill="#FCD34D" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="boho-reveal mt-8 text-xl opacity-50"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
              {ceremony.time}
            </p>
          )}
          <div className="mt-8">
            <CountdownTimer targetDate={ceremony.date} accentColor="#D97706" textColor="#2D1B0E" label="Counting Down" />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#FDF6EC' }} />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="boho-reveal text-xs tracking-[0.3em] uppercase mb-6 opacity-50"
            style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
            Where We Gather
          </p>
          <h2 className="boho-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="boho-reveal text-lg opacity-50 mb-2"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
              {ceremony.address}
            </p>
          )}
          <p className="boho-reveal text-xl" style={{ fontFamily: "'Nunito', sans-serif", color: '#D97706' }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#D97706] border-opacity-20">
              <p className="text-xs tracking-[0.3em] uppercase mb-4 opacity-50" style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif" }}>Reception</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Abril Fatface', serif", color: '#2D1B0E' }}>{reception.venue}</h3>
              <p className="opacity-50" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>{reception.city}</p>
              {reception.time && <p className="mt-2" style={{ fontFamily: "'Nunito', sans-serif", color: '#D97706' }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FFF7ED' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center boho-reveal">
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#D97706' }}>"</span>
            <p className="text-2xl opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
              {customMessage}
            </p>
            <span className="text-5xl opacity-20" style={{ fontFamily: 'serif', color: '#D97706' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #FDF6EC, #FDE8D0)' }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="boho-reveal text-xs tracking-[0.3em] uppercase mb-6 opacity-50"
            style={{ color: '#D97706', fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
            You Are Invited
          </p>
          <h2 className="boho-reveal text-6xl mb-4" style={{ fontFamily: "'Satisfy', cursive", color: '#2D1B0E' }}>
            Join Us
          </h2>
          <p className="boho-reveal text-lg opacity-60 mb-10 leading-relaxed"
            style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#2D1B0E' }}>
            Come as you are. Leave as you wish.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#D97706', color: '#FDF6EC', boxShadow: '0 0 30px rgba(217,119,6,0.2)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl opacity-50" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, color: '#D97706' }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 opacity-30 text-xs tracking-widest uppercase" style={{ color: '#2D1B0E' }}>
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 opacity-20" style={{ background: '#D97706' }} />
            <svg viewBox="0 0 40 40" className="w-5 h-5">
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={20 + 8 * Math.cos(angle * Math.PI / 180)} cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                  rx="5" ry="3" fill="#D97706" opacity="0.4"
                  transform={`rotate(${angle}, ${20 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`} />
              ))}
              <circle cx="20" cy="20" r="4" fill="#FCD34D" opacity="0.6" />
            </svg>
            <div className="h-px w-16 opacity-20" style={{ background: '#D97706' }} />
          </div>
          <p className="text-3xl opacity-20" style={{ fontFamily: "'Satisfy', cursive", color: '#2D1B0E' }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="opacity-15 text-xs tracking-widest uppercase mt-2" style={{ color: '#2D1B0E' }}>
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
