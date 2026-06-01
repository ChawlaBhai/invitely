'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import PhotoGallery from '@/components/PhotoGallery'
gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

function StarField({ count = 180 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2, a: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.003 + 0.001, phase: Math.random() * Math.PI * 2,
    }))
    let frame = 0, raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const tw = s.a * (0.5 + 0.5 * Math.sin(frame * s.speed + s.phase))
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${tw})`; ctx.fill()
      })
      frame++; raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [count])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

export default function WeddingCosmos({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data
  const date = new Date(ceremony.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-IN', { month: 'long' })
  const year = date.getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nebula pulse
      gsap.to('.cos-nebula', { scale: 1.15, opacity: 0.07, duration: 5, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to('.cos-nebula2', { scale: 1.2, opacity: 0.05, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 })
      // Names — blur in from space
      gsap.fromTo('.cos-name', { y: '100%' }, { y: '0%', duration: 1.4, stagger: 0.14, ease: 'expo.out', delay: 0.4 })
      gsap.fromTo('.cos-fade', { opacity: 0, filter: 'blur(8px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.1, delay: 1.1 })
      // Constellation lines draw
      gsap.fromTo('.cos-line', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 2.5, stagger: 0.2, ease: 'power2.inOut', delay: 1 })
      // Parallax hero
      gsap.to('.cos-hero-bg', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: '.cos-hero', start: 'top top', end: 'bottom top', scrub: true } })
      // Photo parallax
      gsap.to('.cos-photo-inner', { yPercent: -15, ease: 'none', scrollTrigger: { trigger: '.cos-photo', start: 'top bottom', end: 'bottom top', scrub: true } })
      // Story
      gsap.utils.toArray<HTMLElement>('.cos-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0, filter: 'blur(4px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 86%' } })
      })
      // Date
      ScrollTrigger.create({ trigger: '.cos-date', start: 'top 70%', onEnter: () => {
        gsap.fromTo('.cos-date-el', { scale: 0.5, opacity: 0, filter: 'blur(10px)' }, { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'expo.out' })
      }})
      // Orbit animation
      gsap.to('.cos-orbit-dot', { rotation: 360, transformOrigin: '50% 50%', duration: 10, ease: 'none', repeat: -1 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} style={{ background: '#03030F', color: '#E8E0FF' }} className="overflow-x-hidden">

      {/* HERO */}
      <section className="cos-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="cos-hero-bg absolute inset-0 scale-110" style={{ background: 'radial-gradient(ellipse at 50% 40%, #0D0A2A 0%, #03030F 70%)' }} />
        <StarField count={200} />
        {/* Nebula glows */}
        <div className="cos-nebula absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, #7C3AED 0%, transparent 70%)', opacity: 0.05, filter: 'blur(40px)' }} />
        <div className="cos-nebula2 absolute bottom-1/3 right-1/4 w-[400px] h-[300px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, #2563EB 0%, transparent 70%)', opacity: 0.04, filter: 'blur(30px)' }} />
        {/* Constellation SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          {[[15,20,35,15],[35,15,55,25],[55,25,70,15],[70,15,82,28],[55,25,50,42],[50,42,35,52],[50,42,65,55]].map(([x1,y1,x2,y2],i) => (
            <line key={i} className="cos-line" x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(167,139,250,0.25)" strokeWidth="0.12" strokeDasharray="300" strokeDashoffset="300" />
          ))}
          {[[15,20],[35,15],[55,25],[70,15],[82,28],[50,42],[35,52],[65,55]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="0.5" fill="#A78BFA" opacity="0.7" />
          ))}
        </svg>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="cos-fade mb-6">
            <p className="tracking-[0.5em] text-[11px] uppercase" style={{ color: '#A78BFA', opacity: 0.7 }}>Written in the Stars</p>
          </div>
          <div className="overflow-hidden mb-1">
            <h1 className="cos-name font-black leading-none tracking-tight" style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', color: '#E8E0FF', textShadow: '0 0 60px rgba(124,58,237,0.4)' }}>{partner1.name}</h1>
          </div>
          <div className="overflow-hidden mb-1">
            <div className="cos-name flex items-center justify-center gap-5 py-3">
              <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to right, transparent, #7C3AED)', opacity: 0.5 }} />
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#A78BFA" opacity="0.7"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
              <div className="h-px flex-1 max-w-[100px]" style={{ background: 'linear-gradient(to left, transparent, #7C3AED)', opacity: 0.5 }} />
            </div>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="cos-name font-black leading-none tracking-tight" style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', color: '#E8E0FF', textShadow: '0 0 60px rgba(124,58,237,0.4)' }}>{partner2.name}</h1>
          </div>
          <div className="cos-fade space-y-2">
            <p className="tracking-[0.3em] text-sm uppercase" style={{ color: '#A78BFA' }}>Are Getting Married</p>
            <p className="text-sm tracking-widest" style={{ color: '#E8E0FF', opacity: 0.3 }}>{day} {month} {year} · {ceremony.city}</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-20">
          <div className="w-px h-12 bg-gradient-to-b from-[#7C3AED] to-transparent" />
        </div>
      </section>

      {/* PHOTO */}
      {data.photos && data.photos.length > 0 && (
        <section className="cos-photo relative h-[65vh] overflow-hidden">
          <div className="cos-photo-inner absolute inset-0 scale-110">
            <img src={data.photos[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #03030F 0%, transparent 15%, transparent 85%, #03030F 100%)' }} />
            <div className="absolute inset-0 bg-[#7C3AED]/10" />
          </div>
        </section>
      )}

      {/* STORY */}
      {(story.howTheyMet || story.favoriteMemory || story.proposalStory) && (
        <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#03030F' }}>
          <StarField count={60} />
          <div className="relative z-10 max-w-2xl mx-auto space-y-24">
            {[
              { l: 'The First Spark', t: story.howTheyMet },
              { l: 'A Moment in Time', t: story.favoriteMemory },
              { l: 'The Question', t: story.proposalStory },
            ].filter(x => x.t).map(({ l, t }) => (
              <div key={l} className="cos-reveal text-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mx-auto mb-4" fill="#A78BFA" opacity="0.5"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                <p className="tracking-[0.4em] text-[11px] uppercase mb-4" style={{ color: '#A78BFA', opacity: 0.6 }}>{l}</p>
                <p className="text-xl leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#E8E0FF', opacity: 0.55 }}>{t}</p>
              </div>
            ))}
            {story.sharedPassions && story.sharedPassions.length > 0 && (
              <div className="cos-reveal flex flex-wrap justify-center gap-3">
                {story.sharedPassions.map((p, i) => (
                  <span key={i} className="px-4 py-2 text-sm tracking-wider" style={{ border: '1px solid rgba(124,58,237,0.3)', color: '#E8E0FF', opacity: 0.4 }}>{p}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {data.photos && data.photos.length > 1 && <PhotoGallery photos={data.photos.slice(1)} accentColor="#7C3AED" label="Moments" />}

      {/* DATE */}
      <section className="cos-date relative py-28 px-6 overflow-hidden" style={{ background: '#06041A' }}>
        <StarField count={100} />
        <div className="relative z-10 text-center">
          <p className="cos-reveal tracking-[0.5em] text-[11px] uppercase mb-14" style={{ color: '#A78BFA', opacity: 0.6 }}>The Date is Set</p>
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap mb-10">
            {[{ v: String(day).padStart(2, '0'), l: 'Day' }, { v: '✦', l: '' }, { v: month.toUpperCase(), l: 'Month' }, { v: '✦', l: '' }, { v: String(year), l: 'Year' }].map(({ v, l }, i) => (
              <div key={i} className="cos-date-el text-center">
                <p className="leading-none font-black" style={{ fontSize: v === '✦' ? '2rem' : 'clamp(2.5rem, 9vw, 6rem)', color: v === '✦' ? '#7C3AED' : '#E8E0FF', opacity: v === '✦' ? 0.5 : 1, letterSpacing: '-0.02em', textShadow: v !== '✦' ? '0 0 40px rgba(124,58,237,0.4)' : 'none' }}>{v}</p>
                {l && <p className="text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: '#A78BFA', opacity: 0.5 }}>{l}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && <p className="cos-reveal tracking-[0.3em] text-sm uppercase mb-8" style={{ color: '#E8E0FF', opacity: 0.25 }}>{ceremony.time}</p>}
          <div className="cos-reveal"><CountdownTimer targetDate={ceremony.date} accentColor="#7C3AED" textColor="#E8E0FF" label="Counting Down" /></div>
        </div>
      </section>

      {/* VENUE */}
      <section className="relative py-28 px-6 min-h-[45vh] flex items-center" style={{ background: '#03030F' }}>
        <StarField count={50} />
        <div className="relative z-10 text-center w-full max-w-2xl mx-auto">
          <p className="cos-reveal tracking-[0.5em] text-[11px] uppercase mb-8" style={{ color: '#A78BFA', opacity: 0.6 }}>Where Stars Align</p>
          <h2 className="cos-reveal text-4xl md:text-6xl font-black tracking-tight mb-4" style={{ color: '#E8E0FF' }}>{ceremony.venue}</h2>
          {ceremony.address && <p className="cos-reveal text-sm mb-2 tracking-wider" style={{ color: '#E8E0FF', opacity: 0.3 }}>{ceremony.address}</p>}
          <p className="cos-reveal tracking-[0.3em] text-sm uppercase" style={{ color: '#A78BFA' }}>{ceremony.city}</p>
          {reception && (
            <div className="mt-14 pt-14" style={{ borderTop: '1px solid rgba(124,58,237,0.15)' }}>
              <p className="tracking-[0.4em] text-[11px] uppercase mb-4" style={{ color: '#A78BFA', opacity: 0.5 }}>Reception</p>
              <h3 className="text-2xl font-black mb-2" style={{ color: '#E8E0FF' }}>{reception.venue}</h3>
              <p className="text-sm" style={{ color: '#E8E0FF', opacity: 0.3 }}>{reception.city}</p>
              {reception.time && <p className="text-sm mt-2 tracking-wider" style={{ color: '#A78BFA', opacity: 0.6 }}>{reception.time}</p>}
            </div>
          )}
        </div>
      </section>

      {customMessage && (
        <section className="relative py-20 px-6" style={{ background: '#06041A' }}>
          <StarField count={40} />
          <div className="relative z-10 max-w-xl mx-auto text-center cos-reveal">
            <p className="text-xl leading-relaxed italic" style={{ fontFamily: 'Georgia, serif', color: '#E8E0FF', opacity: 0.5 }}>"{customMessage}"</p>
          </div>
        </section>
      )}

      {/* RSVP */}
      <section className="relative py-28 px-6 overflow-hidden" style={{ background: '#03030F' }}>
        <StarField count={80} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.06) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <p className="cos-reveal tracking-[0.5em] text-[11px] uppercase mb-6" style={{ color: '#A78BFA', opacity: 0.6 }}>You Are Invited</p>
          <h2 className="cos-reveal text-5xl font-black tracking-tight mb-4" style={{ color: '#E8E0FF' }}>Join Us</h2>
          <p className="cos-reveal text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: '#E8E0FF', opacity: 0.4 }}>
            The universe brought them together. Come witness the beginning.
            {data.rsvpDeadline && ` Kindly respond by ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}.`}
          </p>
          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`} className="cos-reveal inline-block px-12 py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:bg-[#7C3AED] hover:text-white"
              style={{ border: '1px solid rgba(124,58,237,0.5)', color: '#A78BFA', boxShadow: '0 0 30px rgba(124,58,237,0.2)' }}>RSVP</a>
          )}
          {hashtag && <p className="mt-10 text-sm tracking-widest" style={{ color: '#A78BFA', opacity: 0.35 }}>#{hashtag}</p>}
        </div>
        <div className="relative z-10 mt-16 text-center">
          <p className="text-3xl font-black" style={{ color: '#E8E0FF', opacity: 0.06 }}>{partner1.name} & {partner2.name}</p>
          <p className="text-xs tracking-widest uppercase mt-2" style={{ color: '#E8E0FF', opacity: 0.06 }}>{ceremony.city} · {year}</p>
        </div>
      </section>
    </div>
  )
}
