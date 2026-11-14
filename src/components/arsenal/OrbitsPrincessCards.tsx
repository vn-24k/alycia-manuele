import React, { useState } from 'react'
import { Sparkles, Compass, ChevronLeft, ChevronRight, Crown, Heart } from 'lucide-react'
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
    power: 'Coragem para transformar o inverno em primavera.',
  },
  {
    id: 2,
    title: 'A Maçã da Bondade',
    character: 'Branca de Neve',
    color: '#ff453a',
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=600&auto=format&fit=crop',
    power: 'Coração puro que acolhe todos os amigos.',
  },
  {
    id: 3,
    title: 'Luzes da Imaginação',
    character: 'Rapunzel',
    color: '#ffd60a',
    image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop',
    power: 'Cores mágicas que iluminam o futuro.',
  },
  {
    id: 4,
    title: 'O Sapato de Cristal',
    character: 'Cinderela',
    color: '#70d7ff',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop',
    power: 'Fé nos sonhos que nunca deixam de brilhar.',
  },
  {
    id: 5,
    title: 'Aventuras Sem Limites',
    character: 'Luccas Neto & Aventureiros',
    color: '#30d158',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=600&auto=format&fit=crop',
    power: 'Gargalhada e alegria que enchem a casa.',
  },
  {
    id: 6,
    title: 'A Coroa de Alycia',
    character: 'Alycia Manuele • 7 Anos',
    color: '#ff375f',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=600&auto=format&fit=crop',
    power: 'A princesa da vida real do papai.',
  },
]

export const OrbitsPrincessCards: React.FC = () => {
  const [rotationOffset, setRotationOffset] = useState(0)

  const circleRadius = 550
  const angleStep = 0.45 // radians per card

  const rotateLeft = () => {
    setRotationOffset((prev) => prev - angleStep)
    celestialAudio.playSoftClick()
  }

  const rotateRight = () => {
    setRotationOffset((prev) => prev + angleStep)
    celestialAudio.playSoftClick()
  }

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#090714] to-[#000000] text-white py-24 px-4 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Magic Orbital Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#bf5af2]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#64d2ff] flex items-center justify-center gap-1.5 mb-2">
            <Compass className="w-3.5 h-3.5" />
            Roda dos Sonhos • Efeito ORBITS-CARDS
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            O Carrossel Orbital das Princesas.
          </h2>
          <p className="text-sm text-[#86868b]">
            Cartões dispostos em arco orbital trigonométrico em 3D. Gire a roda para navegar pelas personagens favoritas de Alycia.
          </p>
        </div>

        {/* The 3D Orbital Arc Stage (ORBITS-CARDS mechanics) */}
        <div className="relative h-[480px] sm:h-[540px] max-w-4xl mx-auto overflow-hidden rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {ORBIT_ITEMS.map((item, i) => {
              // Exact angle calculation from ORBITS-CARDS
              const angle = 1.5 - i * angleStep + rotationOffset
              const x = circleRadius * Math.sin(angle)
              const y = circleRadius * (1 - Math.cos(angle))
              const rotation = (angle * 180) / Math.PI

              // Highlight card closest to apex (angle ~ 0)
              const distFromCenter = Math.abs(angle)
              const isCenter = distFromCenter < 0.25

              return (
                <div
                  key={item.id}
                  className="absolute w-[240px] sm:w-[280px] rounded-[26px] bg-[#16161a] border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 cursor-pointer select-none group"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y - 200}px) rotate(${rotation}deg) scale(${isCenter ? 1.08 : 0.85})`,
                    zIndex: isCenter ? 30 : 10,
                    opacity: Math.cos(angle) > 0 ? 1 : 0.2,
                  }}
                  onClick={() => {
                    setRotationOffset(i * angleStep - 1.5)
                    celestialAudio.playChime(600 + i * 100, 0.08)
                  }}
                >
                  {/* Card Image */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-black/30" />

                    {/* Character Tag */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/20 text-white shadow"
                        style={{ backgroundColor: `${item.color}50` }}
                      >
                        {item.character}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white mb-1 group-hover:text-[#64d2ff] transition-colors">
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

          {/* Orbital Arc Overlay Glow */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
        </div>

        {/* Orbit Controls */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button
            onClick={rotateLeft}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all active:scale-95 shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
            Girar Órbita para a Esquerda
          </button>

          <button
            onClick={rotateRight}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-medium text-white transition-all active:scale-95 shadow-md"
          >
            Girar Órbita para a Direita
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
