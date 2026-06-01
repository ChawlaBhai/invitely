'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  photos: string[]
  accentColor?: string
  label?: string
}

export default function PhotoGallery({ photos, accentColor = '#A16207', label = 'Moments' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.photo-item').forEach((el, i) => {
        gsap.fromTo(el, { scale: 0.85, opacity: 0, y: 30 }, {
          scale: 1, opacity: 1, y: 0,
          duration: 0.9, ease: 'power3.out', delay: i * 0.08,
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [photos])

  if (!photos || photos.length === 0) return null

  // Distribute photos into 2 columns (masonry feel)
  const col1 = photos.filter((_, i) => i % 2 === 0)
  const col2 = photos.filter((_, i) => i % 2 === 1)

  return (
    <section ref={ref} className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2" style={{ color: accentColor, opacity: 0.8 }}>
            {label}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 opacity-30" style={{ background: accentColor }} />
            <span style={{ color: accentColor, opacity: 0.5 }}>✦</span>
            <div className="h-px w-12 opacity-30" style={{ background: accentColor }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {col1.map((src, i) => (
              <div
                key={i}
                className="photo-item relative overflow-hidden"
                style={{
                  aspectRatio: i % 3 === 0 ? '4/5' : i % 3 === 1 ? '1/1' : '4/3',
                  border: `1px solid ${accentColor}20`,
                }}
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle overlay */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${accentColor}30, transparent)` }}
                />
              </div>
            ))}
          </div>

          {/* Column 2 — offset for masonry feel */}
          <div className="flex flex-col gap-3 mt-6">
            {col2.map((src, i) => (
              <div
                key={i}
                className="photo-item relative overflow-hidden"
                style={{
                  aspectRatio: i % 3 === 0 ? '1/1' : i % 3 === 1 ? '4/5' : '4/3',
                  border: `1px solid ${accentColor}20`,
                }}
              >
                <img
                  src={src}
                  alt={`Photo ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${accentColor}30, transparent)` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
