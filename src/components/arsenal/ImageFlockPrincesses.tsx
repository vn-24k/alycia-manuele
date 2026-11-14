import React, { useEffect, useRef, useState } from 'react'
import { Sparkles, Heart } from 'lucide-react'

interface FlockItem {
  id: number
  title: string
  character: string
  color: string
  image: string
  x: number
  y: number
  vx: number
  vy: number
  baseScale: number
  scale: number
  rotation: number
}

const PRINCESS_FLOCK_DATA = [
  {
    title: 'Rainha do Gelo',
    character: 'Elsa (Frozen)',
    color: '#64d2ff',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Coração Caloroso',
    character: 'Anna (Frozen)',
    color: '#ff9f0a',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Pureza da Floresta',
    character: 'Branca de Neve',
    color: '#ff453a',
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Luzes Flutuantes',
    character: 'Rapunzel',
    color: '#ffd60a',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Sapatinho Encantado',
    character: 'Cinderela',
    color: '#70d7ff',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Voz do Oceano',
    character: 'Moana',
    color: '#30d158',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Clube da Alegria',
    character: 'Luccas Neto & Aventureiros',
    color: '#0071e3',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'Castelo dos Sonhos',
    character: 'Reino Mágico',
    color: '#bf5af2',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=400&auto=format&fit=crop',
  },
  {
    title: 'A Princesa Alycia',
    character: '7 Anos de Luz',
    color: '#ff375f',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=400&auto=format&fit=crop',
  },
]

export const ImageFlockPrincesses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [flock, setFlock] = useState<FlockItem[]>([])

  useEffect(() => {
    // Generate initial flock positions
    const items: FlockItem[] = PRINCESS_FLOCK_DATA.map((item, i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      return {
        id: i,
        ...item,
        x: 20 + col * 30 + (Math.random() * 8 - 4),
        y: 20 + row * 28 + (Math.random() * 8 - 4),
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        baseScale: 1,
        scale: 1,
        rotation: (Math.random() - 0.5) * 16,
      }
    })
    setFlock(items)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[600px] sm:min-h-[700px] bg-gradient-to-b from-[#000000] via-[#080811] to-[#000000] text-white py-16 px-4 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Background Magic Sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(191,90,242,0.1),transparent_70%)] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 max-w-[800px] mx-auto text-center mb-12">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] flex items-center justify-center gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Revoada Encantada das Princesas • Efeito Image-Flock
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          Onde a Imaginação Voa Livre.
        </h2>
        <p className="text-sm sm:text-base text-[#86868b] max-w-lg mx-auto">
          Passe o cursor sobre a revoada de princesas e aventureiros. As imagens flutuam e reagem ao seu toque com física orgânica.
        </p>
      </div>

      {/* Interactive Flock Grid */}
      <div className="relative z-10 max-w-5xl mx-auto h-[440px] sm:h-[480px] rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm overflow-hidden p-4">
        {flock.map((item) => {
          // Dynamic proximity to cursor
          const itemNormX = item.x / 100
          const itemNormY = item.y / 100
          const dx = mousePos.x - itemNormX
          const dy = mousePos.y - itemNormY
          const dist = Math.sqrt(dx * dx + dy * dy)
          const proximity = Math.max(0, 1 - dist / 0.4)

          const currentScale = 1 + proximity * 0.35
          const offsetX = -dx * proximity * 40
          const offsetY = -dy * proximity * 40

          return (
            <div
              key={item.id}
              className="absolute transition-transform duration-300 ease-out select-none cursor-pointer group"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px) scale(${currentScale}) rotate(${item.rotation + proximity * 8}deg)`,
                zIndex: proximity > 0 ? 30 : 10,
              }}
            >
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border p-1 shadow-xl transition-all duration-300 group-hover:scale-110"
                style={{
                  borderColor: `${item.color}60`,
                  backgroundColor: 'rgba(18, 18, 24, 0.85)',
                  boxShadow: proximity > 0 ? `0 15px 35px ${item.color}40` : '0 8px 20px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-xl filter brightness-95 group-hover:brightness-105"
                />
              </div>

              {/* Character Pill */}
              <div
                className="mt-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-center shadow-md transition-opacity duration-200"
                style={{ opacity: proximity > 0.1 ? 1 : 0.85 }}
              >
                <div className="text-[10px] font-bold text-white truncate max-w-[110px]">
                  {item.character}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
