import React, { useEffect, useRef } from 'react'

interface Star {
  dirX: number
  dirY: number
  dist: number
  speed: number
  size: number
  color: [number, number, number]
  alpha: number
  pulseSpeed: number
}

const PALETTE: [number, number, number][] = [
  [244, 168, 183], // Rose
  [250, 232, 178], // Champagne Gold
  [184, 166, 232], // Lavender
  [147, 197, 253], // Starlight Sky
  [255, 255, 255], // Pure Light
]

export const StarfieldCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    let centerX = width / 2
    let centerY = height / 2

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      centerX = width / 2
      centerY = height / 2
    }
    window.addEventListener('resize', handleResize)

    // Create 350 ethereal stars
    const starCount = Math.min(320, Math.floor((width * height) / 3800))
    const stars: Star[] = []

    for (let i = 0; i < starCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = Math.random() * Math.max(width, height) * 0.75
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      stars.push({
        dirX: Math.cos(angle),
        dirY: Math.sin(angle),
        dist,
        speed: 0.25 + Math.random() * 0.65,
        size: 0.8 + Math.random() * 2.2,
        color,
        alpha: 0.2 + Math.random() * 0.7,
        pulseSpeed: 0.015 + Math.random() * 0.03,
      })
    }

    let scrollSpeed = 0
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = Math.abs(currentScrollY - lastScrollY)
      scrollSpeed = Math.min(delta * 0.08, 3.5)
      lastScrollY = currentScrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Friction on scroll speed
      scrollSpeed *= 0.94

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.dist += (star.speed + scrollSpeed) * 0.8

        if (star.dist > maxRadius) {
          star.dist = 10 + Math.random() * 40
        }

        const x = centerX + star.dirX * star.dist
        const y = centerY + star.dirY * star.dist

        // Pulsing alpha
        star.alpha += Math.sin(Date.now() * star.pulseSpeed) * 0.006
        const clampedAlpha = Math.max(0.15, Math.min(0.9, star.alpha))

        // Distance scale
        const scale = 0.5 + (star.dist / maxRadius) * 1.5
        const renderSize = star.size * scale

        // Streak length during scroll
        const streakLen = Math.max(1, scrollSpeed * 4.5 * (star.dist / maxRadius))

        ctx.save()
        ctx.strokeStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${clampedAlpha})`
        ctx.fillStyle = `rgba(${star.color[0]}, ${star.color[1]}, ${star.color[2]}, ${clampedAlpha})`
        ctx.lineWidth = renderSize

        if (streakLen > 2) {
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + star.dirX * streakLen, y + star.dirY * streakLen)
          ctx.stroke()
        } else {
          ctx.beginPath()
          ctx.arc(x, y, renderSize, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-65"
      style={{ willChange: 'transform' }}
    />
  )
}
