'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  url: string
  title: string
}

export default function ShareBar({ url, title }: Props) {
  const [copied, setCopied] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fade in after 2s so it doesn't distract from the hero
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  async function copyLink() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const whatsappText = encodeURIComponent(`${title}\n\nOpen your invitation: ${url}`)
  const whatsappUrl = `https://wa.me/?text=${whatsappText}`

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-700"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
      }}
    >
      {/* Gradient fade above bar */}
      <div className="h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="bg-[#0C0A09]/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center gap-3">

          {/* WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm"
            style={{ background: '#25D366', color: 'white', minHeight: 44 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">Share on WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          {/* Copy link */}
          <button
            onClick={copyLink}
            className="flex items-center justify-center gap-2 px-4 py-3 border text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm flex-shrink-0"
            style={{
              borderColor: copied ? '#16A34A' : 'rgba(255,255,255,0.15)',
              color: copied ? '#16A34A' : 'rgba(255,255,255,0.6)',
              minHeight: 44,
            }}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">Copied!</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                <span className="hidden sm:inline">Copy Link</span>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 flex-shrink-0" />

          {/* Instagram Stories */}
          {url.includes('/i/') && (
            <a
              href={`/api/story/${url.split('/i/').pop()}`}
              download="invite-story.png"
              className="flex items-center justify-center gap-2 px-4 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex-shrink-0 hidden sm:flex"
              style={{ color: 'rgba(255,255,255,0.5)', minHeight: 44 }}
              title="Download for Instagram Stories"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Story</span>
            </a>
          )}

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 flex-shrink-0" />

          {/* Create your own */}
          <Link
            href={`/builder?ref=${url.split('/i/').pop() ?? ''}`}
            className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex-shrink-0"
            style={{ color: '#A16207', minHeight: 44 }}
          >
            <span className="text-base leading-none">✦</span>
            <span className="hidden sm:inline">Create Yours</span>
            <span className="sm:hidden">Make One</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
