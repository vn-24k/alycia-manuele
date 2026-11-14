import React, { useEffect, useRef } from 'react'
import { Sparkles, Heart } from 'lucide-react'

export const CodropsPaperShimmer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1)
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1)
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
    }

    resize()
    window.addEventListener('resize', resize)

    // Codrops paper warp wave math ported to Canvas 2D
    const render = () => {
      time += 0.015
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      ctx.clearRect(0, 0, width, height)

      // Gradient background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height)
      bgGrad.addColorStop(0, '#090714')
      bgGrad.addColorStop(0.5, '#120d24')
      bgGrad.addColorStop(1, '#07070a')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Draw undulating paper silk waves
      const waveCount = 5
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath()
        const yBase = height * 0.4 + w * 28
        ctx.moveTo(0, yBase)

        for (let x = 0; x <= width; x += 15) {
          const u = x / width
          // Codrops paper warp equation
          const wave1 = Math.sin(u * 4.5 + time + w * 0.8) * 35
          const wave2 = Math.cos(u * 2.2 - time * 0.6 + w * 0.5) * 20
          const wave3 = Math.sin((u + time * 0.1) * 8.0) * 12
          const y = yBase + wave1 + wave2 + wave3
          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        // Ethereal Princess Colors (Frozen blue, Champagne gold, Rose, Violet)
        const waveGrad = ctx.createLinearGradient(0, yBase - 40, width, height)
        if (w === 0) {
          waveGrad.addColorStop(0, 'rgba(100, 210, 255, 0.12)')
          waveGrad.addColorStop(1, 'rgba(191, 90, 242, 0.03)')
        } else if (w === 1) {
          waveGrad.addColorStop(0, 'rgba(255, 214, 10, 0.10)')
          waveGrad.addColorStop(1, 'rgba(255, 55, 95, 0.02)')
        } else if (w === 2) {
          waveGrad.addColorStop(0, 'rgba(255, 55, 95, 0.09)')
          waveGrad.addColorStop(1, 'rgba(100, 210, 255, 0.02)')
        } else {
          waveGrad.addColorStop(0, 'rgba(191, 90, 242, 0.08)')
          waveGrad.addColorStop(1, 'transparent')
        }

        ctx.fillStyle = waveGrad
        ctx.fill()

        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - w * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-[500px] sm:min-h-[580px] text-white py-20 px-4 overflow-hidden border-b border-white/[0.08] flex items-center justify-center">
      {/* Background Codrops Paper Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Floating Sparkles & Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#ffd60a] mb-5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5" />
          Ondas de Seda Encantada • Efeito Codrops-Paper
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Um Manto de Luz para a Pequena Rainha.
        </h2>

        <p className="text-sm sm:text-base text-[#d2d2d7] leading-relaxed max-w-xl mx-auto mb-8">
          Assim como a seda ondulante do vestido das princesas no salão real, cada dia ao seu lado é uma dança suave de ternura, risadas e descobertas preciosas.
        </p>

        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2997ff]/20 via-[#ffd60a]/20 to-[#ff375f]/20 border border-white/20 backdrop-blur-lg shadow-xl text-xs sm:text-sm text-white font-medium">
          <Heart className="w-4 h-4 text-[#ff375f] fill-[#ff375f]" />
          <span>7 Anos Iluminando os Nossos Dias</span>
        </div>
      </div>
    </section>
  )
}
