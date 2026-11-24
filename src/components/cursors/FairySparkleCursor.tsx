import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  decay: number
  spin: number
  angle: number
}

const GOLD_PALETTE = ['#ffd60a', '#ff9f0a', '#ff375f', '#bf5af2', '#ffffff', '#ffeaa7']

export const FairySparkleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 })
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    const createSparkle = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 2 + 0.5
        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed + 0.8, // leve gravidade
          size: Math.random() * 3.5 + 1.5,
          color: GOLD_PALETTE[Math.floor(Math.random() * GOLD_PALETTE.length)],
          alpha: 1,
          decay: Math.random() * 0.02 + 0.015,
          spin: (Math.random() - 0.5) * 0.1,
          angle: Math.random() * Math.PI * 2,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      const dist = Math.hypot(
        e.clientX - mouseRef.current.lastX,
        e.clientY - mouseRef.current.lastY
      )
      if (dist > 8) {
        createSparkle(e.clientX, e.clientY, 3)
        mouseRef.current.lastX = e.clientX
        mouseRef.current.lastY = e.clientY
      }
    }

    const handleClick = (e: MouseEvent) => {
      createSparkle(e.clientX, e.clientY, 16)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        createSparkle(touch.clientX, touch.clientY, 3)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('click', handleClick, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        p.angle += p.spin

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        // Desenhar estrelinha de 4 pontas
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 8

        const r = p.size
        ctx.beginPath()
        ctx.moveTo(0, -r * 1.5)
        ctx.quadraticCurveTo(0, 0, r * 1.5, 0)
        ctx.quadraticCurveTo(0, 0, 0, r * 1.5)
        ctx.quadraticCurveTo(0, 0, -r * 1.5, 0)
        ctx.quadraticCurveTo(0, 0, 0, -r * 1.5)
        ctx.fill()

        ctx.restore()
      }

      animationFrameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchmove', handleTouchMove)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
export default FairySparkleCursor
