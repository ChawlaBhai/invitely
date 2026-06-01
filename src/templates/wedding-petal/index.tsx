'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'
gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

export default function WeddingPetal({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data
  const date = new Date(ceremony.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-IN', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Petals fall
      gsap.utils.toArray<HTMLElement>('.petal-fall').forEach((el, i) => {
        gsap.fromTo(el, { y: -60, opacity: 0, rotate: Math.random() * 30 - 15 }, {
          y: 0, opacity: 1, rotate: 0, duration: 1.2, delay: i * 0.15, ease: 'power3.out',
        })
        gsap.to(el, { y: -12, x: i % 2 === 0 ? 8 : -8, duration: 3 + i * 0.4, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: i * 0.2 })
      })
      // Names reveal
      gsap.fromTo('.pt-name', { y: '100%' }, { y: '0%', duration: 1.3, stagger: 0.12, ease: 'expo.out', delay: 0.3 })
      gsap.fromTo('.pt-fade', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 1 })
      // Horizontal rule
      gsap.fromTo('.pt-rule', { scaleX: 0, transformOrigin: 'center' }, { scaleX: 1, duration: 1.8, ease: 'expo.inOut', delay: 1.2 })
      // Parallax hero bg
      gsap.to('.pt-hero-bg', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.pt-hero', start: 'top top', end: 'bottom top', scrub: true } })
      // Photo parallax
      gsap.to('.pt-photo-inner', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.pt-photo', start: 'top bottom', end: 'bottom top', scrub: true } })
      // Story reveals
      gsap.utils.toArray<HTMLElement>('.pt-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 87%' } })
      })
      // Date
      ScrollTrigger.create({ trigger: '.pt-date', start: 'top 72%', onEnter: () => {
        gsap.fromTo('.pt-date-el', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'expo.out' })
      }})
    }, ref)
    return () => ctx.revert()
  }, [])

  const PETAL_COLORS = ['#E8B4B8', '#F2C4CE', '#D4A5A5', '#F7D6D0', '#E8C4B8', '#F0D4C4']

  return (
    <div ref={ref} style={{ background: '#FDFAF6', color: '#2C1810' }} className="overflow-x-hidden">

      {/* HERO */}
      <section className="pt-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="pt-hero-bg absolute inset-0 scale-110" style={{ background: 'radial-gradient(ellipse at 50% 30%, #F5E6D8 0%, #FDFAF6 65%)' }} />
        {/* Falling petals */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="petal-fall absolute pointer-events-none"
            style={{ left: `${6 + i * 6.5}%`, top: `${8 + (i % 4) * 18}%`, width: 10 + (i % 3) * 6, height: 14 + (i % 3) * 8,
              background: PETAL_COLORS[i % PETAL_COLORS.length], borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', opacity: 0.6, transform: `rotate(${i * 25}deg)` }} />
        ))}
        {/* Thin border */}
        <div className="absolute inset-8 border border-[#D4A5A5]/20 pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="pt-fade mb-6">
            <p className="tracking-[0.5em] text-[11px] uppercase" style={{ color: '#C4847A', opacity: 0.7 }}>A Wedding Celebration</p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="pt-name font-black leading-none tracking-tight" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', color: '#2C1810' }}>{partner1.name}</h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="pt-name flex items-center justify-center gap-5 py-3">
              <div className="pt-rule h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, #C4847A)' }} />
              <span style={{ color: '#C4847A', fontSize: '1.2rem' }}>✦</span>
              <div className="pt-rule h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, #C4847A)' }} />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="pt-name font-black leading-none tracking-tight" style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)', color: '#2C1810' }}>{partner2.name}</h1>
          </div>
          <div className="pt-fade space-y-2">
            <p className="tracking-[0.3em] text-sm uppercase" style={{ color: '#C4847A' }}>Are Getting Married</p>
            <p className="text-sm tracking-widest" style={{ color: '#2C1810', opacity: 0.4 }}>{day} {month} {year} · {ceremony.city}</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <div className="w-px h-12 bg-gradient-to-b from-[#C4847A] to-transparent" />
        </div>
      </section>

      {/* PHOTO */}
      {data.photos && data.photos.length > 0 && (
        <section className="pt-photo relative h-[65vh] overflow-hidden">
          <div className="pt-photo-inner absolute inset-0 scale-110">
            <img src={data.photos[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #FDFAF6 0%, transparent 15%, transparent 85%, #FDFAF6 100%)' }} />
          </div>
        </section>
      )}

      {/* STORY */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#FDFAF6' }}>
          <div className="max-w-xl mx-auto space-y-20">
            {[
              { l: 'How It Began', t: story.howTheyMet },
              { l: 'A Memory We Keep', t: story.favoriteMemory },
              { l: 'The Question', t: story.proposalStory },
            ].filter(x => x.t).map(({ l, t }) => (
              <div key={l} className="pt-reveal">
                <p className="tracking-[0.4em] text-[11px] uppercase mb-4" style={{ color: '#C4847A', opacity: 0.7 }}>{l}</p>
                <p className="text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#2C1810', opacity: 0.65 }}>{t}</p>
              </div>
            ))}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="pt-reveal flex flex-wrap gap-3">
                {story.sharedPassions.map((p, i) => (
                  <span key={i} className="px-4 py-2 text-sm tracking-wider" style={{ border: '1px solid #D4A5A5', color: '#2C1810', opacity: 0.5 }}>{p}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {data.photos && data.photos.length > 1 && <PhotoGallery photos={data.photos.slice(1)} accentColor="#C4847A" label="Moments" />}

      {/* DATE */}
      <section className="pt-date relative py-28 px-6 overflow-hidden" style={{ background: '#F9F0E8' }}>
        <div className="relative z-10 text-center">
          <p className="pt-reveal tracking-[0.5em] text-[11px] uppercase mb-14" style={{ color: '#C4847A', opacity: 0.6 }}>The Day</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap mb-10">
            {[{ v: String(day).padStart(2, '0'), l: 'Day' }, { v: '·', l: '' }, { v: month.toUpperCase(), l: 'Month' }, { v: '·', l: '' }, { v: String(year), l: 'Year' }].map(({ v, l }, i) => (
              <div key={i} className="pt-date-el text-center">
                <p className="leading-none font-black" style={{ fontSize: v === '·' ? '2.5rem' : 'clamp(2.5rem, 9vw, 6rem)', color: v === '·' ? '#C4847A' : '#2C1810', opacity: v === '·' ? 0.3 : 1, letterSpacing: '-0.02em' }}>{v}</p>
                {l && <p className="text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: '#C4847A', opacity: 0.5 }}>{l}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && <p className="pt-reveal tracking-[0.3em] text-sm uppercase mb-8" style={{ color: '#2C1810', opacity: 0.3 }}>{ceremony.time}</p>}
          <div className="pt-reveal"><CountdownTimer targetDate={ceremony.date} accentColor="#C4847A" textColor="#2C1810" label="Counting Down" /></div>
        </div>
      </section>

      {/* VENUE */}
      <section className="relative py-28 px-6 min-h-[45vh] flex items-center" style={{ background: '#FDFAF6' }}>
        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="pt-reveal tracking-[0.5em] text-[11px] uppercase mb-8" style={{ color: '#C4847A', opacity: 0.6 }}>The Celebration</p>
          <h2 className="pt-reveal text-4xl md:text-5xl font-black tracking-tight mb-4" style={{ color: '#2C1810' }}>{ceremony.venue}</h2>
          {ceremony.address && <p className="pt-reveal text-sm mb-2 tracking-wider" style={{ color: '#2C1810', opacity: 0.35 }}>{ceremony.address}</p>}
          <p className="pt-reveal tracking-[0.3em] text-sm uppercase" style={{ color: '#C4847A' }}>{ceremony.city}</p>
          {reception && (
            <div className="mt-14 pt-14" style={{ borderTop: '1px solid rgba(196,132,122,0.15)' }}>
              <p className="tracking-[0.4em] text-[11px] uppercase mb-4" style={{ color: '#C4847A', opacity: 0.5 }}>Reception</p>
              <h3 className="text-2xl font-black mb-2" style={{ color: '#2C1810' }}>{reception.venue}</h3>
              <p className="text-sm" style={{ color: '#2C1810', opacity: 0.35 }}>{reception.city}</p>
              {reception.time && <p className="text-sm mt-2 tracking-wider" style={{ color: '#C4847A', opacity: 0.6 }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {customMessage && (
        <section className="relative py-20 px-6" style={{ background: '#F9F0E8' }}>
          <div className="max-w-xl mx-auto text-center pt-reveal">
            <p className="text-xl leading-relaxed italic" style={{ fontFamily: 'Georgia, serif', color: '#2C1810', opacity: 0.55 }}>"{customMessage}"</p>
          </div>
        </section>
      )}

      {/* RSVP */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#FDFAF6' }}>
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="pt-reveal tracking-[0.5em] text-[11px] uppercase mb-6" style={{ color: '#C4847A', opacity: 0.6 }}>You Are Invited</p>
          <h2 className="pt-reveal text-5xl font-black tracking-tight mb-4" style={{ color: '#2C1810' }}>Join Us</h2>
          <p className="pt-reveal text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#2C1810', opacity: 0.5 }}>
            We would be honoured to have you celebrate this moment with us.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>
          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`} className="pt-reveal inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500"
              style={{ border: '1px solid #C4847A', color: '#C4847A' }}>RSVP</a>
          )}
          {hashtag && <p className="mt-10 text-sm tracking-widest" style={{ color: '#C4847A', opacity: 0.4 }}>#{hashtag}</p>}
        </div>
        <div className="relative z-10 mt-16 text-center">
          <p className="text-3xl font-black" style={{ color: '#2C1810', opacity: 0.08 }}>{partner1.name} & {partner2.name}</p>
          <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#2C1810', opacity: 0.08 }}>{ceremony.city} · {year}</p>
        </div>
      </section>
    </div>
  )
}
