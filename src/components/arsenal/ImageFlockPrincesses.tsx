import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, Crown } from 'lucide-react'

// 12 Imagens Reais de Princesas, Frozen, Branca de Neve, Rapunzel, Cinderela e Aventureiros
const PRINCESS_IMAGES = [
  {
    name: 'Elsa (Frozen)',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop',
    color: '#64d2ff',
  },
  {
    name: 'Anna (Frozen)',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=500&auto=format&fit=crop',
    color: '#ff9f0a',
  },
  {
    name: 'Branca de Neve',
    url: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=500&auto=format&fit=crop',
    color: '#ff453a',
  },
  {
    name: 'Rapunzel',
    url: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=500&auto=format&fit=crop',
    color: '#ffd60a',
  },
  {
    name: 'Cinderela',
    url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=500&auto=format&fit=crop',
    color: '#70d7ff',
  },
  {
    name: 'Moana',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop',
    color: '#30d158',
  },
  {
    name: 'Luccas Neto & Aventureiros',
    url: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=500&auto=format&fit=crop',
    color: '#0071e3',
  },
  {
    name: 'Castelo Real',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=500&auto=format&fit=crop',
    color: '#bf5af2',
  },
  {
    name: 'Princesa Alycia',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=500&auto=format&fit=crop',
    color: '#ff375f',
  },
  {
    name: 'Carruagem Dourada',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=500&auto=format&fit=crop',
    color: '#ffd60a',
  },
  {
    name: 'Floresta dos Animais',
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=500&auto=format&fit=crop',
    color: '#34c759',
  },
  {
    name: 'Amor do Papai',
    url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=500&auto=format&fit=crop',
    color: '#ff375f',
  },
]

export const ImageFlockPrincesses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activePrincess, setActivePrincess] = useState<string>('Passe o cursor sobre a revoada')

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Carregar imagens prévias
    const loadedImgs: HTMLImageElement[] = []
    PRINCESS_IMAGES.forEach((item) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = item.url
      img.onload = () => {
        loadedImgs.push(img)
      }
    })

    // Configurações exatas do Image-Flock
    const config = {
      gridSizeDesktop: 0.12,
      gridSizeMobile: 0.18,
      gridSpacing: 0.08,
      cursorReach: 0.42,
      maxImageScale: 3.2,
      driftSpeed: 35,
      followSpeed: 6,
    }

    let viewW = container.clientWidth
    let viewH = container.clientHeight
    let imageBaseSize = viewW * config.gridSizeDesktop
    let spacing = viewH * config.gridSpacing
    let gridStep = imageBaseSize + spacing
    let gridColumns = Math.ceil(viewW / gridStep) + 3
    let gridRows = Math.ceil(viewH / gridStep) + 3
    let cursorReach = Math.min(viewW, viewH) * config.cursorReach

    const resizeCanvas = () => {
      if (!container || !canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      viewW = container.clientWidth
      viewH = container.clientHeight
      canvas.width = viewW * dpr
      canvas.height = viewH * dpr
      canvas.style.width = `${viewW}px`
      canvas.style.height = `${viewH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      imageBaseSize = viewW < 768 ? viewH * config.gridSizeMobile : viewH * config.gridSizeDesktop
      spacing = viewH * config.gridSpacing
      gridStep = imageBaseSize + spacing
      gridColumns = Math.ceil(viewW / gridStep) + 3
      gridRows = Math.ceil(viewH / gridStep) + 3
      cursorReach = Math.min(viewW, viewH) * config.cursorReach
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Posição do cursor com suavização (Lerp)
    const mousePos = { x: viewW / 2, y: viewH / 2 }
    const focalPoint = { x: mousePos.x, y: mousePos.y }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      }

      mousePos.x = clientX - rect.left
      mousePos.y = clientY - rect.top
    }

    container.addEventListener('mousemove', onPointerMove, { passive: true })
    container.addEventListener('touchmove', onPointerMove, { passive: true })

    function wrapAround(val: number, min: number, max: number) {
      const range = max - min
      return ((((val - min) % range) + range) % range) + min
    }

    function cursorInfluence(dist: number, maxDist: number) {
      if (dist >= maxDist) return 0
      const norm = dist / maxDist
      const falloff = 1 - norm * norm
      return falloff * falloff
    }

    let animId: number
    let startTime = performance.now()
    let lastTime = startTime

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
      const elapsed = (currentTime - startTime) / 1000
      lastTime = currentTime

      // Lerp focal point
      focalPoint.x += (mousePos.x - focalPoint.x) * dt * config.followSpeed
      focalPoint.y += (mousePos.y - focalPoint.y) * dt * config.followSpeed

      ctx.clearRect(0, 0, viewW, viewH)

      if (loadedImgs.length > 0) {
        const driftX = elapsed * config.driftSpeed
        const driftY = -elapsed * (config.driftSpeed * 0.7)

        const wrapMinX = -gridStep
        const wrapMaxX = viewW + gridStep
        const wrapMinY = -gridStep
        const wrapMaxY = viewH + gridStep

        let closestName = ''
        let minProximity = Infinity

        for (let row = -1; row < gridRows; row++) {
          for (let col = -1; col < gridColumns; col++) {
            const cellX = wrapAround(col * gridStep + driftX, wrapMinX, wrapMaxX)
            const cellY = wrapAround(row * gridStep + driftY, wrapMinY, wrapMaxY)

            const imgIdx = Math.abs((col * 11 + row * 7) % loadedImgs.length)
            const img = loadedImgs[imgIdx]
            if (!img) continue

            const cellCenterX = cellX + imageBaseSize / 2
            const cellCenterY = cellY + imageBaseSize / 2
            const dx = cellCenterX - focalPoint.x
            const dy = cellCenterY - focalPoint.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist > cursorReach) continue

            const influence = cursorInfluence(dist, cursorReach)
            const scale = influence * config.maxImageScale
            if (scale < 0.08) continue

            if (dist < minProximity) {
              minProximity = dist
              closestName = PRINCESS_IMAGES[imgIdx % PRINCESS_IMAGES.length]?.name || ''
            }

            const imgW = imageBaseSize * scale
            const imgH = imageBaseSize * scale
            const drawX = cellX + (imageBaseSize - imgW) / 2
            const drawY = cellY + (imageBaseSize - imgH) / 2

            // Desenhar com borda arredondada e sombra
            ctx.save()
            ctx.shadowColor = 'rgba(255, 214, 10, 0.4)'
            ctx.shadowBlur = 15 * influence
            ctx.beginPath()
            ctx.roundRect(drawX, drawY, imgW, imgH, 16 * influence)
            ctx.clip()

            ctx.drawImage(img, drawX, drawY, imgW, imgH)
            ctx.restore()

            // Moldura luminosa da princesa
            ctx.save()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * influence})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.roundRect(drawX, drawY, imgW, imgH, 16 * influence)
            ctx.stroke()
            ctx.restore()
          }
        }

        if (closestName && minProximity < 120) {
          setActivePrincess(closestName)
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
      container.removeEventListener('mousemove', onPointerMove)
      container.removeEventListener('touchmove', onPointerMove)
    }
  }, [])

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#090814] to-[#000000] text-white py-20 px-4 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#64d2ff]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] flex items-center justify-center gap-1.5 mb-2">
            <Crown className="w-3.5 h-3.5" />
            Revoada das Princesas • Efeito Image-Flock
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Onde a Imaginação Voa Livre.
          </h2>
          <p className="text-sm text-[#86868b]">
            Passe o cursor sobre a tela para invocar as princesas e aventureiros. As imagens voam suavemente e se expandem ao seu toque.
          </p>

          {/* Dynamic Princess Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-medium text-[#ffd60a]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Personagem em foco: <strong>{activePrincess}</strong></span>
          </div>
        </div>

        {/* Real Canvas Flock Engine (from Image-Flock) */}
        <div
          ref={containerRef}
          className="relative w-full h-[450px] sm:h-[520px] rounded-[32px] overflow-hidden bg-[#120f24]/80 border border-white/15 backdrop-blur-xl shadow-2xl cursor-crosshair select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {/* Hint Overlay */}
          <div className="absolute bottom-4 left-6 pointer-events-none text-xs text-[#86868b] flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#30d158] animate-ping" />
            <span>Mova o mouse ou deslize o dedo para atrair a revoada</span>
          </div>
        </div>

        {/* Horizontal Mini-Pills of Characters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
          {PRINCESS_IMAGES.slice(0, 7).map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/[0.04] text-[#d2d2d7]"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
