'use client'

import { useEffect, useState } from 'react'

interface Props {
  targetDate: string   // ISO date string
  accentColor?: string
  textColor?: string
  label?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculate(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownTimer({ targetDate, accentColor = '#A16207', textColor = '#FAFAF9', label }: Props) {
  const [time, setTime] = useState<TimeLeft>(calculate(targetDate))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTime(calculate(targetDate))
    const interval = setInterval(() => setTime(calculate(targetDate)), 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const isPast = new Date(targetDate).getTime() <= Date.now()

  if (!mounted) return null

  if (isPast) {
    return (
      <div className="text-center py-6">
        <p className="text-xs tracking-widest uppercase" style={{ color: accentColor }}>
          {label ?? 'The celebration has begun'}
        </p>
      </div>
    )
  }

  const units = [
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Mins' },
    { value: time.seconds, label: 'Secs' },
  ]

  return (
    <div className="text-center py-8">
      {label && (
        <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: accentColor, opacity: 0.8 }}>
          {label}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {units.map(({ value, label: unitLabel }, i) => (
          <div key={unitLabel} className="flex items-center gap-4 md:gap-8">
            <div className="text-center min-w-[3rem]">
              <p
                className="leading-none font-bold tabular-nums"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                  color: textColor,
                  transition: 'all 0.3s ease',
                }}
              >
                {String(value).padStart(2, '0')}
              </p>
              <p className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: accentColor, opacity: 0.7 }}>
                {unitLabel}
              </p>
            </div>
            {i < units.length - 1 && (
              <span
                className="text-2xl font-light pb-4"
                style={{ color: accentColor, opacity: 0.4 }}
              >
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
