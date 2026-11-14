import React, { useState, useRef } from 'react'
import { Compass, ChevronLeft, ChevronRight, Crown, Heart, Sparkles } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface OrbitCard {
  id: number
  title: string
  character: string
  color: string
  image: string
  power: string
}

const ORBIT_ITEMS: OrbitCard[] = [
  {
    id: 1,
    title: 'Poder do Gelo Eterno',
    character: 'Elsa (Frozen)',
    color: '#64d2ff',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    power: 'Coragem para transformar o inverno em primavera com muito amor.',
  },
  {
    id: 2,
    title: 'A Maçã da Bondade',
    character: 'Branca de Neve',
    color: '#ff453a',
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=600&auto=format&fit=crop',
    power: 'Coração puro que acolhe e cuida de todos os passarinhos.',
  },
  {
    id: 3,
    title: 'Luzes da Imaginação',
    character: 'Rapunzel',
    color: '#ffd60a',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop',
    power: 'Cores mágicas que iluminam o futuro e pintam os sonhos.',
  },
  {
    id: 4,
    title: 'O Sapatinho de Cristal',
    character: 'Cinderela',
    color: '#70d7ff',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop',
    power: 'Fé nos sonhos e a certeza de que a bondade sempre vence.',
  },
  {
    id: 5,
    title: 'Aventuras Sem Fim',
    character: 'Luccas Neto & Amigos',
    color: '#30d158',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=600&auto=format&fit=crop',
    power: 'Gargalhada gostosa, brincadeiras e alegria sem limites.',
  },
  {
    id: 6,
    title: 'A Princesa Alycia Manuele',
    character: '7 Anos de Luz',
    color: '#ff375f',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop',
    power: 'A princesa da vida real e o amor infinito do papai.',
  },
]

export const OrbitsPrincessCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const totalCards = ORBIT_ITEMS.length
  const angleStep = 0.42 // radianos entre cada cartão

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards)
    celestialAudio.playSoftClick()
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)
    celestialAudio.playSoftClick()
  }

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    startX.current = e.clientX
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    const diff = e.clientX - startX.current
    if (diff > 40) {
      handlePrev()
    } else if (diff < -40) {
      handleNext()
    }
  }

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#090818] to-[#000000] text-white py-24 px-4 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Magic Orbital Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#bf5af2]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#64d2ff] flex items-center justify-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5" />
            Roda dos Sonhos • Efeito ORBITS-CARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            O Carrossel Orbital das Princesas.
          </h2>
          <p className="text-sm text-[#86868b]">
            Cartões distribuídos na órbita circular tridimensional. Gire com as setas ou clique no cartão para trazê-lo ao centro do reino.
          </p>
        </div>

        {/* 3D Circular Arc Stage (ORBITS-CARDS mechanics) */}
        <div
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          className="relative h-[480px] sm:h-[540px] max-w-4xl mx-auto overflow-hidden rounded-[36px] bg-white/[0.02] border border-white/[0.08] backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {ORBIT_ITEMS.map((item, i) => {
              // Cálculo trigonométrico do ângulo relativo ao cartão ativo
              let indexDiff = i - activeIndex
              // Ajuste de volta circular
              if (indexDiff > totalCards / 2) indexDiff -= totalCards
              if (indexDiff < -totalCards / 2) indexDiff += totalCards

              const angle = indexDiff * angleStep
              const circleRadius = 460 // raio calibrado para não cortar

              // Matemática exata do repositório ORBITS-CARDS
              const x = circleRadius * Math.sin(angle)
              const y = circleRadius * (1 - Math.cos(angle)) * 0.55
              const rotation = (angle * 180) / Math.PI

              const isCenter = indexDiff === 0
              const isNearby = Math.abs(indexDiff) <= 2

              if (!isNearby) return null

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setActiveIndex(i)
                    celestialAudio.playChime(600 + i * 80, 0.08)
                  }}
                  className={`absolute w-[240px] sm:w-[290px] rounded-[28px] bg-[#16161e] border overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer ${
                    isCenter
                      ? 'border-[#64d2ff] ring-2 ring-[#64d2ff]/40 shadow-[0_20px_50px_rgba(100,210,255,0.25)]'
                      : 'border-white/15 opacity-60 hover:opacity-90'
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${
                      isCenter ? 1.08 : 0.88 - Math.abs(indexDiff) * 0.08
                    })`,
                    zIndex: isCenter ? 40 : 20 - Math.abs(indexDiff),
                  }}
                >
                  {/* Card Image Banner */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-95 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161e] via-transparent to-black/30" />

                    {/* Character Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/20 text-white shadow"
                        style={{ backgroundColor: `${item.color}50` }}
                      >
                        {item.character}
                      </span>
                    </div>

                    {isCenter && (
                      <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[11px] text-[#ffd60a] font-semibold bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md">
                        <Sparkles className="w-3 h-3" />
                        Em Foco
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
                      {item.power}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Arc Glow */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        </div>

        {/* Orbit Carousel Navigation Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={handlePrev}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all active:scale-95 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {ORBIT_ITEMS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'w-7 bg-[#64d2ff]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all active:scale-95 shadow-md"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
