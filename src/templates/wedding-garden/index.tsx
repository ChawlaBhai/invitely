'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'

gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

const PETAL_COLORS = ['#FBCFE8', '#FDE68A', '#BBF7D0', '#DDD6FE', '#FED7AA', '#FECACA']

export default function WeddingGarden({ data }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data

  const weddingDate = new Date(ceremony.date)
  const day = weddingDate.getDate()
  const month = weddingDate.toLocaleDateString('en-IN', { month: 'long' })
  const year = weddingDate.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Falling petals
      gsap.utils.toArray<HTMLElement>('.falling-petal').forEach((el, i) => {
        gsap.fromTo(el,
          { y: -30, x: 0, rotate: 0, opacity: 0 },
          {
            y: '110vh', x: `${(i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 15)}px`,
            rotate: 360 * (i % 2 === 0 ? 1 : -1),
            opacity: 0,
            duration: 6 + i * 0.5,
            ease: 'none',
            repeat: -1,
            delay: i * 0.4,
            repeatDelay: 0,
          }
        )
        gsap.set(el, { opacity: 0.6 + (i % 3) * 0.1 })
      })

      // Hero title
      gsap.fromTo('.garden-title', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.4, stagger: 0.18, ease: 'power4.out', delay: 0.4,
      })

      // Flower bloom
      gsap.fromTo('.flower-bloom', { scale: 0, opacity: 0, rotate: -30 }, {
        scale: 1, opacity: 1, rotate: 0,
        duration: 1.2, stagger: 0.1, ease: 'back.out(1.4)', delay: 0.8,
      })

      // Vine grow
      gsap.fromTo('.vine-path', { strokeDashoffset: 500 }, {
        strokeDashoffset: 0, duration: 3, ease: 'power2.inOut', delay: 0.5,
      })

      // Personas
      ScrollTrigger.create({
        trigger: '.garden-personas',
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo('.garden-man', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out',
          })
          gsap.fromTo('.garden-woman', { y: 50, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.15,
          })
        },
      })

      // Story reveals
      gsap.utils.toArray<HTMLElement>('.garden-reveal').forEach(el => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })

      // Date bloom
      ScrollTrigger.create({
        trigger: '.garden-date',
        start: 'top 65%',
        onEnter: () => {
          gsap.fromTo('.garden-date-el', { scale: 0.7, opacity: 0 }, {
            scale: 1, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'back.out(1.4)',
          })
        },
      })

      // Leaf sway
      gsap.utils.toArray<HTMLElement>('.leaf').forEach((el, i) => {
        gsap.to(el, {
          rotate: i % 2 === 0 ? 8 : -8, transformOrigin: 'bottom center',
          duration: 2.5 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.2,
        })
      })

    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="template-garden overflow-x-hidden" style={{ background: '#F0FDF4', color: '#14532D' }}>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Soft garden background */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 30%, #FDF2F8 60%, #FFF7ED 100%)' }} />

        {/* Falling petals */}
        {PETAL_COLORS.map((color, i) => (
          Array.from({ length: 3 }).map((_, j) => (
            <div
              key={`${i}-${j}`}
              className="falling-petal absolute pointer-events-none"
              style={{
                width: 8 + (j * 4),
                height: 12 + (j * 4),
                background: color,
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                left: `${(i * 17 + j * 7) % 90}%`,
                top: `${(j * 30) % 100}%`,
                opacity: 0,
              }}
            />
          ))
        ))}

        {/* Vine SVG left */}
        <svg className="absolute left-0 top-0 h-full w-32 pointer-events-none" viewBox="0 0 120 800" preserveAspectRatio="xMinYMin meet">
          <path className="vine-path" d="M20 0 C20 100 60 150 30 250 C0 350 60 400 20 500 C-20 600 50 700 20 800"
            stroke="#16A34A" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="500" strokeDashoffset="500" />
          {[100, 200, 320, 450, 580].map((y, i) => (
            <g key={i} className="leaf" transform={`translate(${i % 2 === 0 ? 30 : 10}, ${y})`}>
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#16A34A" opacity="0.4" transform={`rotate(${i % 2 === 0 ? -30 : 30})`} />
            </g>
          ))}
        </svg>

        {/* Vine SVG right */}
        <svg className="absolute right-0 top-0 h-full w-32 pointer-events-none" viewBox="0 0 120 800" preserveAspectRatio="xMaxYMin meet">
          <path className="vine-path" d="M100 0 C100 100 60 150 90 250 C120 350 60 400 100 500 C140 600 70 700 100 800"
            stroke="#16A34A" strokeWidth="2" fill="none" opacity="0.3" strokeDasharray="500" strokeDashoffset="500" />
          {[80, 210, 340, 470, 600].map((y, i) => (
            <g key={i} className="leaf" transform={`translate(${i % 2 === 0 ? 70 : 90}, ${y})`}>
              <ellipse cx="0" cy="0" rx="12" ry="7" fill="#16A34A" opacity="0.4" transform={`rotate(${i % 2 === 0 ? 30 : -30})`} />
            </g>
          ))}
        </svg>

        {/* Flower clusters */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-3">
          {PETAL_COLORS.slice(0, 5).map((color, i) => (
            <svg key={i} className="flower-bloom w-8 h-8" viewBox="0 0 40 40">
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={20 + 10 * Math.cos(angle * Math.PI / 180)} cy={20 + 10 * Math.sin(angle * Math.PI / 180)}
                  rx="6" ry="4" fill={color} opacity="0.8"
                  transform={`rotate(${angle}, ${20 + 10 * Math.cos(angle * Math.PI / 180)}, ${20 + 10 * Math.sin(angle * Math.PI / 180)})`} />
              ))}
              <circle cx="20" cy="20" r="5" fill="#FCD34D" />
            </svg>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <div className="overflow-hidden mb-3">
            <p className="garden-title text-[#16A34A] tracking-[0.4em] text-xs uppercase opacity-70">
              In Full Bloom
            </p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="garden-title leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: '#14532D', fontWeight: 400 }}>
              {partner1.name}
            </h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="garden-title flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#16A34A] opacity-40" />
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                {[0, 72, 144, 216, 288].map((angle, j) => (
                  <ellipse key={j} cx={20 + 10 * Math.cos(angle * Math.PI / 180)} cy={20 + 10 * Math.sin(angle * Math.PI / 180)}
                    rx="6" ry="4" fill="#FBCFE8" opacity="0.9"
                    transform={`rotate(${angle}, ${20 + 10 * Math.cos(angle * Math.PI / 180)}, ${20 + 10 * Math.sin(angle * Math.PI / 180)})`} />
                ))}
                <circle cx="20" cy="20" r="5" fill="#FCD34D" />
              </svg>
              <div className="h-px w-16 bg-[#16A34A] opacity-40" />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="garden-title leading-none"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3.5rem, 11vw, 8rem)', color: '#14532D', fontWeight: 400 }}>
              {partner2.name}
            </h1>
          </div>
          <div className="overflow-hidden">
            <p className="garden-title text-2xl text-[#16A34A]"
              style={{ fontFamily: "'Pinyon Script', cursive" }}>
              Are Getting Married
            </p>
          </div>
          <div className="overflow-hidden mt-4">
            <p className="garden-title opacity-50 text-base"
              style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
              {day} {month} {year} · {ceremony.city}
            </p>
          </div>
        </div>

        {/* Bottom flower border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around items-end pb-2 pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => (
            <svg key={i} className="w-6 h-8 flex-shrink-0" viewBox="0 0 30 40">
              <rect x="13" y="20" width="4" height="20" fill="#16A34A" opacity="0.5" />
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j}
                  cx={15 + 8 * Math.cos(angle * Math.PI / 180)}
                  cy={15 + 8 * Math.sin(angle * Math.PI / 180)}
                  rx="5" ry="3"
                  fill={PETAL_COLORS[i % PETAL_COLORS.length]}
                  opacity="0.8"
                  transform={`rotate(${angle}, ${15 + 8 * Math.cos(angle * Math.PI / 180)}, ${15 + 8 * Math.sin(angle * Math.PI / 180)})`}
                />
              ))}
              <circle cx="15" cy="15" r="4" fill="#FCD34D" />
            </svg>
          ))}
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 z-10">
          <div className="w-px h-12 bg-gradient-to-b from-[#16A34A] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── PERSONAS ── */}
      <section className="garden-personas relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #DCFCE7, #F0FDF4)' }} />

        <div className="relative z-10 text-center mb-12">
          <p className="garden-reveal text-[#16A34A] tracking-[0.3em] text-xs uppercase mb-3">The Couple</p>
          <h2 className="garden-reveal text-4xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D', fontWeight: 400 }}>
            Two Flowers, One Garden
          </h2>
        </div>

        <div className="relative z-10 flex items-end justify-center gap-6 md:gap-16 max-w-2xl mx-auto">
          <div className="garden-man flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Pinyon Script', cursive", color: '#14532D' }}>{partner1.name}</p>
            {partner1.nickname && <p className="text-[#16A34A] text-xs tracking-widest uppercase mt-1">{partner1.nickname}</p>}
          </div>

          <div className="flex flex-col items-center pb-20">
            <svg className="w-12 h-12" viewBox="0 0 40 40">
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={20 + 10 * Math.cos(angle * Math.PI / 180)} cy={20 + 10 * Math.sin(angle * Math.PI / 180)}
                  rx="7" ry="4" fill="#FBCFE8" opacity="0.9"
                  transform={`rotate(${angle}, ${20 + 10 * Math.cos(angle * Math.PI / 180)}, ${20 + 10 * Math.sin(angle * Math.PI / 180)})`} />
              ))}
              <circle cx="20" cy="20" r="6" fill="#FCD34D" />
            </svg>
          </div>

          <div className="garden-woman flex flex-col items-center">
            
            <p className="mt-4 text-3xl" style={{ fontFamily: "'Pinyon Script', cursive", color: '#14532D' }}>{partner2.name}</p>
            {partner2.nickname && <p className="text-[#16A34A] text-xs tracking-widest uppercase mt-1">{partner2.nickname}</p>}
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FFF7ED' }} />

          <div className="relative z-10 max-w-2xl mx-auto space-y-20">
            {story.howTheyMet && (
              <div className="garden-reveal text-center">
                <p className="text-[#16A34A] text-xs tracking-[0.3em] uppercase mb-3">First Bloom</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D' }}>How It Began</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
                  {story.howTheyMet}
                </p>
              </div>
            )}
            {story.favoriteMemory && (
              <div className="garden-reveal text-center">
                <p className="text-[#16A34A] text-xs tracking-[0.3em] uppercase mb-3">In Season</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D' }}>A Memory We Keep</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
                  {story.favoriteMemory}
                </p>
              </div>
            )}
            {story.proposalStory && (
              <div className="garden-reveal text-center">
                <p className="text-[#16A34A] text-xs tracking-[0.3em] uppercase mb-3">Full Bloom</p>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D' }}>The Question</h3>
                <p className="text-lg opacity-70 leading-relaxed" style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
                  {story.proposalStory}
                </p>
              </div>
            )}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="garden-reveal text-center">
                <p className="text-[#16A34A] text-xs tracking-[0.3em] uppercase mb-6">Their Garden</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {story.sharedPassions.map((p, i) => (
                    <span key={i} className="px-4 py-2 text-sm opacity-70"
                      style={{ border: '1px solid rgba(22,163,74,0.3)', fontFamily: "'Lora', serif", color: '#14532D' }}>
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
        <PhotoGallery photos={data.photos} accentColor="#16A34A" label="Our Story in Frames" />
      )}

      {/* ── DATE ── */}
      <section className="garden-date relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #DCFCE7, #FDF2F8)' }} />

        <div className="relative z-10 text-center">
          <p className="garden-reveal text-[#16A34A] tracking-[0.3em] text-xs uppercase mb-10">The Day</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {[
              { value: String(day).padStart(2, '0'), label: 'Day' },
              { value: month.toUpperCase(), label: 'Month' },
              { value: String(year), label: 'Year' },
            ].map(({ value, label }, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div className="garden-date-el text-center">
                  <p className="leading-none font-bold"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(3rem, 10vw, 7rem)', color: '#14532D' }}>
                    {value}
                  </p>
                  <p className="text-[#16A34A] text-xs tracking-widest uppercase mt-2">{label}</p>
                </div>
                {i < 2 && (
                  <svg className="garden-date-el w-5 h-5 flex-shrink-0" viewBox="0 0 40 40">
                    {[0, 72, 144, 216, 288].map((angle, j) => (
                      <ellipse key={j} cx={20 + 8 * Math.cos(angle * Math.PI / 180)} cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                        rx="5" ry="3" fill="#FBCFE8" opacity="0.9"
                        transform={`rotate(${angle}, ${20 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`} />
                    ))}
                    <circle cx="20" cy="20" r="4" fill="#FCD34D" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          {ceremony.time && (
            <p className="garden-reveal mt-8 text-xl opacity-50"
              style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
              {ceremony.time}
            </p>
          )}

          <div className="mt-8">
            <CountdownTimer
              targetDate={ceremony.date}
              accentColor="#16A34A"
              textColor="#14532D"
              label="Counting Down"
            />
          </div>
        </div>
      </section>

      {/* ── VENUE ── */}
      <section className="relative py-28 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0" style={{ background: '#F0FDF4' }} />

        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="garden-reveal text-[#16A34A] tracking-[0.3em] text-xs uppercase mb-6">Where We Gather</p>
          <h2 className="garden-reveal text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D', fontWeight: 400 }}>
            {ceremony.venue}
          </h2>
          {ceremony.address && (
            <p className="garden-reveal text-lg opacity-50 mb-2" style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
              {ceremony.address}
            </p>
          )}
          <p className="garden-reveal text-xl text-[#16A34A]" style={{ fontFamily: "'Lora', serif" }}>
            {ceremony.city}
          </p>

          {reception && (
            <div className="mt-14 pt-14 border-t border-[#16A34A] border-opacity-20">
              <p className="text-[#16A34A] tracking-[0.3em] text-xs uppercase mb-4">Reception</p>
              <h3 className="text-2xl mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#14532D' }}>{reception.venue}</h3>
              <p className="opacity-50" style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>{reception.city}</p>
              {reception.time && <p className="text-[#16A34A] mt-2" style={{ fontFamily: "'Lora', serif" }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {/* ── CUSTOM MESSAGE ── */}
      {customMessage && (
        <section className="relative py-20 px-6 overflow-hidden">
          <div className="absolute inset-0" style={{ background: '#FDF2F8' }} />
          <div className="relative z-10 max-w-xl mx-auto text-center garden-reveal">
            <span className="text-[#FBCFE8] text-5xl opacity-60" style={{ fontFamily: 'serif' }}>"</span>
            <p className="text-2xl opacity-70 leading-relaxed italic mt-2"
              style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
              {customMessage}
            </p>
            <span className="text-[#FBCFE8] text-5xl opacity-60" style={{ fontFamily: 'serif' }}>"</span>
          </div>
        </section>
      )}

      {/* ── RSVP ── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #DCFCE7, #FDF2F8)' }} />

        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="garden-reveal text-[#16A34A] tracking-[0.3em] text-xs uppercase mb-6">You Are Invited</p>
          <h2 className="garden-reveal text-6xl mb-4" style={{ fontFamily: "'Pinyon Script', cursive", color: '#14532D' }}>
            Join Us
          </h2>
          <p className="garden-reveal text-lg opacity-60 mb-10 leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: '#14532D' }}>
            Come celebrate where flowers bloom and love grows.
            {data.rsvpDeadline && ` Please respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>

          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`}
              className="inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-500"
              style={{ background: '#16A34A', color: '#F0FDF4', boxShadow: '0 0 30px rgba(22,163,74,0.2)' }}>
              RSVP
            </a>
          )}

          {hashtag && (
            <p className="mt-10 text-xl text-[#16A34A] opacity-50" style={{ fontFamily: "'Lora', serif" }}>
              #{hashtag}
            </p>
          )}
          {data.dressCode && (
            <p className="mt-3 opacity-30 text-xs tracking-widest uppercase" style={{ color: '#14532D' }}>
              Dress Code: {data.dressCode}
            </p>
          )}
        </div>

        <div className="relative z-10 mt-20 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#16A34A] opacity-20" />
            <svg className="w-5 h-5" viewBox="0 0 40 40">
              {[0, 72, 144, 216, 288].map((angle, j) => (
                <ellipse key={j} cx={20 + 8 * Math.cos(angle * Math.PI / 180)} cy={20 + 8 * Math.sin(angle * Math.PI / 180)}
                  rx="5" ry="3" fill="#FBCFE8" opacity="0.7"
                  transform={`rotate(${angle}, ${20 + 8 * Math.cos(angle * Math.PI / 180)}, ${20 + 8 * Math.sin(angle * Math.PI / 180)})`} />
              ))}
              <circle cx="20" cy="20" r="4" fill="#FCD34D" />
            </svg>
            <div className="h-px w-16 bg-[#16A34A] opacity-20" />
          </div>
          <p className="text-3xl opacity-20" style={{ fontFamily: "'Pinyon Script', cursive", color: '#14532D' }}>
            {partner1.name} & {partner2.name}
          </p>
          <p className="opacity-15 text-xs tracking-widest uppercase mt-2" style={{ color: '#14532D' }}>
            {ceremony.city} · {year}
          </p>
        </div>
      </section>
    </div>
  )
}
