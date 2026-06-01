'use client'

import { useEffect, useRef } from 'react'

interface Props {
  count?: number
  className?: string
}

export default function StarField({ count = 200, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate stars
    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }))

    // Shooting stars
    const shooters: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []

    let frame = 0
    let raf: number

    function spawnShooter() {
      shooters.push({
        x: Math.random() * (canvas?.width ?? 800) * 0.7,
        y: Math.random() * (canvas?.height ?? 600) * 0.4,
        vx: 4 + Math.random() * 3,
        vy: 2 + Math.random() * 2,
        life: 0,
        maxLife: 40 + Math.random() * 30,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(s => {
        const twinkle = s.alpha * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`
        ctx.fill()
      })

      // Draw shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        const progress = s.life / s.maxLife
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7
        const tailLen = 60 * (1 - progress * 0.5)

        const grad = ctx.createLinearGradient(
          s.x - s.vx * tailLen / s.vx, s.y - s.vy * tailLen / s.vx,
          s.x, s.y
        )
        grad.addColorStop(0, `rgba(167, 139, 250, 0)`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.9})`)

        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * (tailLen / 5), s.y - s.vy * (tailLen / 5))
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        s.x += s.vx
        s.y += s.vy
        s.life++
        if (s.life >= s.maxLife) shooters.splice(i, 1)
      }

      // Spawn shooter occasionally
      if (frame % 180 === 0) spawnShooter()

      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
