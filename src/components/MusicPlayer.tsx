'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  musicUrl?: string        // direct audio URL (mp3, ogg) or YouTube embed URL
  accentColor?: string
  autoSuggestLabel?: string
}

// Default ambient tracks per vibe — royalty-free from pixabay/freesound
const DEFAULT_TRACKS: Record<string, string> = {
  default: 'https://cdn.pixabay.com/audio/2022/10/16/audio_12a5a2a3e4.mp3',
}

export default function MusicPlayer({ musicUrl, accentColor = '#A16207', autoSuggestLabel }: Props) {
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const src = musicUrl || DEFAULT_TRACKS.default

  useEffect(() => {
    // Show after 3s
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.25
    audio.addEventListener('canplaythrough', () => setLoaded(true))
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {
        // Browser blocked — still show as playing attempt
        setPlaying(false)
      })
    }
  }

  if (!visible) return null

  return (
    <div
      className="fixed left-4 bottom-20 z-40 transition-all duration-700"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
    >
      <button
        onClick={toggle}
        title={playing ? 'Pause music' : 'Play ambient music'}
        className="relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          background: playing ? accentColor : 'rgba(0,0,0,0.6)',
          border: `1px solid ${accentColor}${playing ? 'ff' : '60'}`,
          boxShadow: playing ? `0 0 20px ${accentColor}60` : 'none',
        }}
        aria-label={playing ? 'Pause music' : 'Play ambient music'}
      >
        {/* Animated bars when playing */}
        {playing ? (
          <div className="flex items-end gap-0.5 h-4">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="w-0.5 rounded-full"
                style={{
                  background: '#0C0A09',
                  height: '100%',
                  animation: `music-bar-${i} 0.8s ease-in-out infinite`,
                  animationDelay: `${(i - 1) * 0.15}s`,
                }}
              />
            ))}
          </div>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"
            style={{ color: accentColor }}>
            <path d="M9 18V5l12-2v13M9 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-2c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Tooltip */}
      {!playing && (
        <div
          className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] tracking-widest uppercase px-2 py-1 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
          style={{ color: accentColor, background: 'rgba(0,0,0,0.8)', border: `1px solid ${accentColor}30` }}
        >
          {autoSuggestLabel ?? 'Play Music'}
        </div>
      )}

      <style>{`
        @keyframes music-bar-1 { 0%,100%{height:30%} 50%{height:100%} }
        @keyframes music-bar-2 { 0%,100%{height:60%} 50%{height:30%} }
        @keyframes music-bar-3 { 0%,100%{height:80%} 50%{height:50%} }
      `}</style>
    </div>
  )
}
