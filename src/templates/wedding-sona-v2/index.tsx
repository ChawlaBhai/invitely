"use client"
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WeddingData } from '@/types/invitation'
import CountdownTimer from '@/components/CountdownTimer'
import EnvelopeOpening from './Envelope'
import { MarigoldGarland, Lotus, PaisleyBorder, Diya, MandalaOrnament, GaneshaSilhouette } from './Illustrations'
gsap.registerPlugin(ScrollTrigger)

interface Props { data: WeddingData }

const GOLD = '#C9A84C'
const MAROON = '#8B1A1A'
const CREAM = '#FDF8F0'
const DARK = '#0D0B08'

function PhotoCaption({ src, caption }: { src: string; caption: string }) {
  return (
    <div className="group relative overflow-hidden">
      <img src={src} alt={caption} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(13,11,8,0.9), transparent)' }}>
        <p className="text-xs tracking-wider italic" style={{ color: GOLD, opacity: 0.8 }}>{caption}</p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: GOLD + '15' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-base" style={{ color: CREAM, fontFamily: 'Georgia, serif' }}>{q}</span>
        <span className="text-xl transition-transform duration-300" style={{ color: GOLD, transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed" style={{ color: CREAM, opacity: 0.5, fontFamily: 'Georgia, serif' }}>{a}</p>}
    </div>
  )
}

export default function WeddingSonaV2({ data }: Props) {
  const [opened, setOpened] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { partner1, partner2, story, ceremony, reception, hashtag, customMessage } = data
  const date = new Date(ceremony.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-IN', { month: 'long' })
  const year = date.getFullYear()
  const photos = data.photos || []

  const CHAPTER_CAPTIONS = [
    ['The day we met', 'That first conversation', 'Something felt different'],
    ['Our favourite corner', 'A rainy afternoon', 'Laughing about nothing'],
    ['The weekend away', 'Right after yes', 'Celebrating together'],
  ]

  useEffect(() => {
    if (!opened) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.sv-ganesh', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.4, ease: 'back.out(1.4)', delay: 0.2 })
      gsap.fromTo('.sv-garland', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out', delay: 0.4 })
      gsap.fromTo('.sv-name', { y: '105%' }, { y: '0%', duration: 1.3, stagger: 0.12, ease: 'expo.out', delay: 0.6 })
      gsap.fromTo('.sv-fade', { opacity: 0 }, { opacity: 1, duration: 1.2, stagger: 0.08, delay: 1.2 })
      gsap.fromTo('.sv-diya', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'back.out(2)', delay: 0.8 })
      gsap.to('.sv-mandala', { rotation: 360, duration: 80, ease: 'none', repeat: -1 })
      gsap.to('.sv-hero-bg', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.sv-hero', start: 'top top', end: 'bottom top', scrub: true } })
      gsap.utils.toArray<HTMLElement>('.sv-reveal').forEach(el => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
      })
      gsap.utils.toArray<HTMLElement>('.sv-card').forEach((el, i) => {
        gsap.fromTo(el, { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
      gsap.utils.toArray<HTMLElement>('.sv-photo-item').forEach((el, i) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: i * 0.1, scrollTrigger: { trigger: el, start: 'top 90%' } })
      })
      ScrollTrigger.create({ trigger: '.sv-date', start: 'top 72%', onEnter: () => {
        gsap.fromTo('.sv-date-el', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: 'expo.out' })
      }})
    }, ref)
    return () => ctx.revert()
  }, [opened])

  if (!opened) return <EnvelopeOpening onOpen={() => setOpened(true)} names={[partner1.name, partner2.name]} />

  const initials = `${partner1.name[0]}${partner2.name[0]}`

  return (
    <div ref={ref} style={{ background: DARK, color: CREAM }} className="overflow-x-hidden">

      {/* STICKY NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-xl" style={{ background: DARK + 'CC', borderBottom: `1px solid ${GOLD}15` }}>
        <span className="text-lg font-black tracking-tight" style={{ color: GOLD }}>{initials}</span>
        <div className="hidden md:flex items-center gap-8">
          {[['Story', '#story'], ['Events', '#events'], ['Venue', '#venue'], ['Details', '#details'], ['RSVP', '#rsvp']].map(([l, h]) => (
            <a key={h} href={h} className="text-xs tracking-[0.15em] uppercase transition-colors" style={{ color: CREAM, opacity: 0.4 }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')} onMouseLeave={e => (e.currentTarget.style.opacity = '0.4')}>{l}</a>
          ))}
        </div>
        <a href="#rsvp" className="px-5 py-2 text-xs tracking-widest uppercase font-bold transition-all duration-300" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>RSVP</a>
      </nav>

      {/* HERO */}
      <section className="sv-hero relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="sv-hero-bg absolute inset-0 scale-110" style={{ background: `radial-gradient(ellipse at 50% 40%, #2A1005 0%, ${DARK} 70%)` }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />
        <div className="absolute inset-5 pointer-events-none" style={{ border: `1px solid ${GOLD}18` }} />
        <div className="absolute inset-9 pointer-events-none" style={{ border: `1px solid ${GOLD}08` }} />
        <div className="sv-garland absolute top-0 left-0 right-0"><MarigoldGarland className="w-full" /></div>
        <div className="sv-diya absolute bottom-20 left-6"><Diya className="w-10 h-12" /></div>
        <div className="sv-diya absolute bottom-20 right-6"><Diya className="w-10 h-12" /></div>
        <div className="sv-diya absolute bottom-20 left-20"><Diya className="w-8 h-10" /></div>
        <div className="sv-diya absolute bottom-20 right-20"><Diya className="w-8 h-10" /></div>
        <div className="sv-ganesh absolute top-20 left-1/2 -translate-x-1/2"><GaneshaSilhouette size={65} color={GOLD} className="opacity-55" /></div>
        <div className="sv-mandala absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"><MandalaOrnament size={480} color={GOLD} className="opacity-[0.035]" /></div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto mt-12">
          <div className="sv-fade mb-3"><p className="text-sm tracking-[0.4em]" style={{ color: GOLD, opacity: 0.65, fontFamily: 'Georgia, serif' }}>ॐ गणेशाय नमः</p></div>
          <div className="sv-fade mb-5"><p className="text-xs tracking-[0.5em] uppercase" style={{ color: GOLD, opacity: 0.45 }}>you are cordially invited to celebrate the story of</p></div>
          <div className="overflow-hidden mb-1"><h1 className="sv-name font-black leading-none" style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', color: CREAM, letterSpacing: '-0.02em', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{partner1.name}</h1></div>
          <div className="overflow-hidden mb-1">
            <div className="sv-name flex items-center justify-center gap-4 py-2">
              <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to right, transparent, ${GOLD})`, opacity: 0.45 }} />
              <Lotus size={30} color={GOLD} className="opacity-65" />
              <div className="h-px flex-1 max-w-[80px]" style={{ background: `linear-gradient(to left, transparent, ${GOLD})`, opacity: 0.45 }} />
            </div>
          </div>
          <div className="overflow-hidden mb-8"><h1 className="sv-name font-black leading-none" style={{ fontSize: 'clamp(3.5rem, 13vw, 9rem)', color: CREAM, letterSpacing: '-0.02em', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{partner2.name}</h1></div>
          <div className="sv-fade space-y-2">
            <p className="tracking-[0.3em] text-sm uppercase" style={{ color: GOLD }}>शुभ विवाह · Shubh Vivah</p>
            <p className="text-sm tracking-widest" style={{ color: CREAM, opacity: 0.3 }}>{day} {month} {year} · {ceremony.city}</p>
          </div>
        </div>
        <div className="sv-garland absolute bottom-0 left-0 right-0"><MarigoldGarland className="w-full" flip /></div>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 opacity-20 z-10"><div className="w-px h-10 bg-gradient-to-b from-[#C9A84C] to-transparent" /></div>
      </section>

      {/* FAMILY BLESSINGS */}
      <section className="relative py-16 px-6 overflow-hidden" style={{ background: '#120800' }}>
        <PaisleyBorder className="absolute top-0 left-0 right-0 w-full" color={GOLD} />
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="sv-reveal mb-6"><MandalaOrnament size={50} color={GOLD} className="mx-auto opacity-40 mb-3" /><p className="text-xs tracking-[0.5em] uppercase" style={{ color: GOLD, opacity: 0.55 }}>With the Blessings of</p></div>
          <div className="sv-reveal grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ label: "Bride's Family", name: `${partner2.name}'s Parents`, sub: "cordially invite you" }, { label: "Groom's Family", name: `${partner1.name}'s Parents`, sub: "to the wedding of their children" }].map(({ label, name, sub }) => (
              <div key={label} className="p-6" style={{ border: `1px solid ${GOLD}18`, background: `${GOLD}04` }}>
                <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: GOLD, opacity: 0.5 }}>{label}</p>
                <p className="text-lg font-bold mb-1" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{name}</p>
                <p className="text-sm" style={{ color: CREAM, opacity: 0.35 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
        <PaisleyBorder className="absolute bottom-0 left-0 right-0 w-full" color={GOLD} />
      </section>

      {/* STORY */}
      <section id="story" className="relative py-24 px-6 overflow-hidden" style={{ background: DARK }}>
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="sv-reveal text-center mb-16">
            <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, opacity: 0.5 }}>our story</p>
            <h2 className="text-4xl font-black tracking-tight" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>How It All Began</h2>
          </div>
          {[
            { roman: 'I', hi: 'पहली मुलाकात', en: 'chapter one: how we met', text: story.howTheyMet },
            { roman: 'II', hi: 'एक याद', en: 'chapter two: falling in love', text: story.favoriteMemory },
            { roman: 'III', hi: 'वो लम्हा', en: 'chapter three: the question', text: story.proposalStory },
          ].filter(c => c.text).map(({ roman, hi, en, text }, ci) => {
            const chapterPhotos = photos.slice(1 + ci * 3, 1 + ci * 3 + 3)
            const captions = CHAPTER_CAPTIONS[ci] || ['A moment', 'Together', 'Always']
            return (
              <div key={roman} className="sv-reveal mb-20">
                <div className="flex items-start gap-6 mb-6">
                  <span className="text-[70px] font-black leading-none flex-shrink-0" style={{ color: GOLD, opacity: 0.07 }}>{roman}</span>
                  <div className="pt-2">
                    <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: GOLD, opacity: 0.55 }}>{en}</p>
                    <p className="text-sm" style={{ color: GOLD, opacity: 0.35, fontFamily: 'Georgia, serif' }}>{hi}</p>
                  </div>
                </div>
                <p className="text-xl leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif', color: CREAM, opacity: 0.6 }}>{text}</p>
                {chapterPhotos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {chapterPhotos.map((src, pi) => (
                      <div key={pi} className="sv-photo-item group relative overflow-hidden">
                        <img src={src} alt={captions[pi]} className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-0 left-0 right-0 p-2" style={{ background: 'linear-gradient(to top, rgba(13,11,8,0.9), transparent)' }}>
                          <p className="text-xs italic" style={{ color: GOLD, opacity: 0.75 }}>{captions[pi]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {ci < 2 && <div className="mt-12 flex items-center justify-center gap-4"><div className="h-px w-20" style={{ background: GOLD, opacity: 0.12 }} /><Lotus size={20} color={GOLD} className="opacity-30" /><div className="h-px w-20" style={{ background: GOLD, opacity: 0.12 }} /></div>}
              </div>
            )
          })}
          {story.sharedPassions && story.sharedPassions.length > 0 && (
            <div className="sv-reveal text-center mt-8">
              <p className="text-xs tracking-[0.4em] uppercase mb-5" style={{ color: GOLD, opacity: 0.45 }}>What They Share</p>
              <div className="flex flex-wrap justify-center gap-3">
                {story.sharedPassions.map((p, i) => <span key={i} className="px-4 py-2 text-sm tracking-wider" style={{ border: `1px solid ${GOLD}20`, color: CREAM, opacity: 0.45 }}>{p}</span>)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DATE */}
      <section id="venue" className="sv-date relative py-24 px-6 overflow-hidden" style={{ background: '#120800' }}>
        <PaisleyBorder className="absolute top-0 left-0 right-0 w-full" color={GOLD} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, #1A0A02 0%, transparent 70%)` }} />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <div className="sv-reveal mb-10"><MandalaOrnament size={55} color={GOLD} className="mx-auto opacity-35 mb-4" /><p className="text-xs tracking-[0.5em] uppercase" style={{ color: GOLD, opacity: 0.5 }}>शुभ मुहूर्त · so please join us</p></div>
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap mb-8">
            {[{ v: String(day).padStart(2,'0'), l: 'Din' }, { v: '✦', l: '' }, { v: month.toUpperCase(), l: 'Maah' }, { v: '✦', l: '' }, { v: String(year), l: 'Saal' }].map(({ v, l }, i) => (
              <div key={i} className="sv-date-el text-center">
                <p className="leading-none font-black" style={{ fontSize: v === '✦' ? '2rem' : 'clamp(2.5rem,9vw,6rem)', color: v === '✦' ? GOLD : CREAM, opacity: v === '✦' ? 0.35 : 1, letterSpacing: '-0.02em', fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{v}</p>
                {l && <p className="text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: GOLD, opacity: 0.4 }}>{l}</p>}
              </div>
            ))}
          </div>
          {ceremony.time && <p className="sv-reveal tracking-[0.3em] text-sm uppercase mb-6" style={{ color: CREAM, opacity: 0.25 }}>{ceremony.time}</p>}
          <div className="sv-reveal mb-10"><CountdownTimer targetDate={ceremony.date} accentColor={GOLD} textColor={CREAM} label="Counting Down" /></div>
          <div className="sv-reveal p-6" style={{ border: `1px solid ${GOLD}18`, background: `${GOLD}04` }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: GOLD, opacity: 0.5 }}>विवाह स्थल · The Venue</p>
            <h3 className="text-2xl font-black mb-2" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{ceremony.venue}</h3>
            {ceremony.address && <p className="text-sm mb-1" style={{ color: CREAM, opacity: 0.35 }}>{ceremony.address}</p>}
            <p className="text-sm tracking-wider" style={{ color: GOLD, opacity: 0.6 }}>{ceremony.city}</p>
            {ceremony.mapUrl && <a href={ceremony.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-xs tracking-widest uppercase" style={{ color: GOLD, opacity: 0.6 }}>View on Map →</a>}
          </div>
        </div>
        <PaisleyBorder className="absolute bottom-0 left-0 right-0 w-full" color={GOLD} />
      </section>

      {/* EVENTS */}
      <section id="events" className="relative py-24 px-6 overflow-hidden" style={{ background: DARK }}>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="sv-reveal text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, opacity: 0.5 }}>and now some additional details</p>
            <h2 className="text-4xl font-black tracking-tight" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>The Celebrations</h2>
            <p className="mt-3 text-sm" style={{ color: CREAM, opacity: 0.35, fontFamily: 'Georgia, serif' }}>Five days of love, music, and togetherness</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Mehendi', hi: 'मेहंदी', icon: '🌿', color: '#2D6A2D', desc: 'Henna & music evening', sub: 'Evening, Day Before', detail: 'Intricate henna patterns, folk music, and the fragrance of fresh flowers.' },
              { name: 'Haldi', hi: 'हल्दी', icon: '🌼', color: '#D97706', desc: 'Turmeric ceremony', sub: 'Morning, Wedding Day', detail: 'A joyful ritual of turmeric paste, blessings, and laughter with family.' },
              { name: 'Sangeet', hi: 'संगीत', icon: '🎵', color: MAROON, desc: 'Music & dance night', sub: 'Evening, Day Before', detail: 'Performances, dancing, and celebrating the families coming together.' },
              { name: 'Vivah', hi: 'विवाह', icon: '🔥', color: GOLD, desc: 'The wedding ceremony', sub: ceremony.time || 'Auspicious time', detail: 'Sacred vows, sacred fire, and the beginning of forever.' },
              { name: 'Reception', hi: 'स्वागत', icon: '✨', color: '#7C3AED', desc: 'Grand celebration', sub: reception?.time || 'Evening', detail: 'Dinner, dancing, and celebrating with all our beloved people.' },
            ].map(({ name, hi, icon, color, desc, sub, detail }) => (
              <div key={name} className="sv-card p-6 relative overflow-hidden group cursor-default" style={{ border: `1px solid ${GOLD}15`, background: `${GOLD}03` }}>
                <div className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500" style={{ background: color, opacity: 0.5 }} />
                <div className="text-3xl mb-4">{icon}</div>
                <p className="text-xs tracking-[0.3em] uppercase mb-1" style={{ color, opacity: 0.75 }}>{name}</p>
                <p className="text-sm mb-3" style={{ color: GOLD, opacity: 0.35, fontFamily: 'Georgia, serif' }}>{hi}</p>
                <p className="text-sm font-semibold mb-1" style={{ color: CREAM, opacity: 0.7 }}>{desc}</p>
                <p className="text-xs tracking-wider mb-3" style={{ color: GOLD, opacity: 0.4 }}>{sub}</p>
                <p className="text-xs leading-relaxed" style={{ color: CREAM, opacity: 0.35, fontFamily: 'Georgia, serif' }}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS GRID */}
      <section id="details" className="relative py-24 px-6 overflow-hidden" style={{ background: '#120800' }}>
        <PaisleyBorder className="absolute top-0 left-0 right-0 w-full" color={GOLD} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="sv-reveal text-center mb-14">
            <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, opacity: 0.5 }}>everything you need to know</p>
            <h2 className="text-4xl font-black tracking-tight" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>The Details</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Dress Code', icon: '👗', content: data.dressCode || 'Indian formal / traditional attire. Bright colours welcome. Comfortable footwear recommended.' },
              { title: 'Dinner Menu', icon: '🍽️', content: 'A curated menu of traditional and contemporary Indian cuisine. Vegetarian and non-vegetarian options available. Please mention dietary restrictions in your RSVP.' },
              { title: 'Music', icon: '🎶', content: 'Live classical music during the ceremony. Bollywood and contemporary hits for the reception. Dance floor open all evening.' },
              { title: 'Travel & Stay', icon: '✈️', content: `The venue is located in ${ceremony.city}. We recommend arriving a day early. Hotel recommendations available on request.` },
              { title: 'Wedding Party', icon: '💐', content: 'Our closest friends and family who have been part of this journey. They will be happy to help you with anything on the day.' },
              { title: 'Registry', icon: '🎁', content: 'Your presence is the greatest gift. If you wish to give, contributions to our new home fund are warmly appreciated.' },
            ].map(({ title, icon, content }) => (
              <div key={title} className="sv-card p-6" style={{ border: `1px solid ${GOLD}15`, background: `${GOLD}03` }}>
                <div className="text-2xl mb-3">{icon}</div>
                <p className="text-sm font-bold mb-3 tracking-wider uppercase" style={{ color: GOLD, opacity: 0.7 }}>{title}</p>
                <p className="text-sm leading-relaxed" style={{ color: CREAM, opacity: 0.45, fontFamily: 'Georgia, serif' }}>{content}</p>
              </div>
            ))}
          </div>
        </div>
        <PaisleyBorder className="absolute bottom-0 left-0 right-0 w-full" color={GOLD} />
      </section>

      {/* FAQ */}
      <section className="relative py-24 px-6 overflow-hidden" style={{ background: DARK }}>
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="sv-reveal text-center mb-12">
            <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: GOLD, opacity: 0.5 }}>questions & answers</p>
            <h2 className="text-4xl font-black tracking-tight" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>FAQ</h2>
          </div>
          <div className="sv-reveal">
            {[
              { q: 'What should I wear?', a: data.dressCode ? `${data.dressCode}. Bright colours are welcome and encouraged.` : 'Indian formal or traditional attire. Bright colours are welcome. Comfortable footwear is recommended as there will be dancing.' },
              { q: 'When should I arrive?', a: 'Please arrive 15-20 minutes before the ceremony begins. This gives you time to find your seat and settle in.' },
              { q: 'Is parking available?', a: 'Yes, parking is available at the venue. Please follow the signs on arrival. Valet service will also be available.' },
              { q: 'Can I bring a plus one?', a: 'Please mention your plus one in your RSVP. We have a carefully curated guest list and would love to know who is joining you.' },
              { q: 'Are children welcome?', a: 'Children are warmly welcome. We will have a dedicated area for little ones with activities and supervision.' },
              { q: 'Any dietary restrictions?', a: 'Please mention any dietary restrictions or allergies in your RSVP form. We will do our best to accommodate everyone.' },
              { q: 'What if I have more questions?', a: data.rsvpContact ? `Please reach out to us at ${data.rsvpContact}. We are happy to help with anything.` : 'Please reach out to us directly. We are happy to help with anything.' },
            ].map(({ q, a }) => <FAQItem key={q} q={q} a={a} />)}
          </div>
        </div>
      </section>

      {/* CLOSING PHOTO + QUOTE */}
      {photos.length > 0 && (
        <section className="relative h-screen overflow-hidden">
          <img src={photos[photos.length - 1]} alt="Closing" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(13,11,8,0.85) 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-12 text-center">
            <p className="text-2xl md:text-3xl leading-relaxed mb-4" style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: CREAM, opacity: 0.85, fontStyle: 'italic' }}>
              {customMessage || `"You are my favourite person to do anything with, for the rest of my life."`}
            </p>
            <p className="text-sm tracking-widest" style={{ color: GOLD, opacity: 0.5 }}>— {partner1.name} & {partner2.name}</p>
          </div>
        </section>
      )}

      {/* RSVP */}
      <section id="rsvp" className="relative py-24 px-6 overflow-hidden" style={{ background: '#120800' }}>
        <PaisleyBorder className="absolute top-0 left-0 right-0 w-full" color={GOLD} />
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, #1A0A02 0%, transparent 70%)` }} />
        <div className="relative z-10 text-center max-w-lg mx-auto">
          <div className="sv-reveal mb-8"><GaneshaSilhouette size={55} color={GOLD} className="mx-auto opacity-35 mb-4" /><p className="text-xs tracking-[0.5em] uppercase" style={{ color: GOLD, opacity: 0.5 }}>आप सादर आमंत्रित हैं</p></div>
          <h2 className="sv-reveal text-5xl font-black tracking-tight mb-4" style={{ color: CREAM, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>Zaroor Aayein</h2>
          <p className="sv-reveal text-lg mb-12 leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: CREAM, opacity: 0.4 }}>
            Aapki upasthiti is jashn ko poora karti hai.
            {data.rsvpDeadline && ` Kripaya ${new Date(data.rsvpDeadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} tak jawab dein.`}
          </p>
          {data.rsvpContact && (
            <a href={`tel:${data.rsvpContact}`} className="sv-reveal inline-block px-14 py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500"
              style={{ border: `1px solid ${GOLD}`, color: GOLD }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = GOLD; (e.currentTarget as HTMLElement).style.color = DARK }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = GOLD }}>
              Submit RSVP
            </a>
          )}
          {hashtag && <p className="mt-10 text-sm tracking-widest" style={{ color: GOLD, opacity: 0.3 }}>#{hashtag}</p>}
        </div>
        <div className="relative z-10 mt-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4"><div className="h-px w-16" style={{ background: GOLD, opacity: 0.12 }} /><Lotus size={22} color={GOLD} className="opacity-25" /><div className="h-px w-16" style={{ background: GOLD, opacity: 0.12 }} /></div>
          <p className="text-3xl font-black" style={{ color: CREAM, opacity: 0.06, fontFamily: 'Cormorant Garamond, Georgia, serif' }}>{partner1.name} & {partner2.name}</p>
          <p className="text-xs tracking-widest uppercase mt-2" style={{ color: CREAM, opacity: 0.06 }}>{ceremony.city} · {year}</p>
          <p className="mt-8 text-xs" style={{ color: CREAM, opacity: 0.15 }}>Created on <a href="https://invitely.in" style={{ color: GOLD, opacity: 0.4 }}>Invitely</a></p>
        </div>
        <PaisleyBorder className="absolute bottom-0 left-0 right-0 w-full" color={GOLD} />
      </section>
    </div>
  )
}
