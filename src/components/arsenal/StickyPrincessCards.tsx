import React, { useState } from 'react'
import { Sparkles, ChevronLeft, ChevronRight, BookOpen, Heart } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface StoryCard {
  year: string
  title: string
  theme: string
  color: string
  image: string
  quote: string
  story: string
}

const STORY_CARDS: StoryCard[] = [
  {
    year: 'Ano 01',
    title: 'O Primeiro Sorriso no Berço',
    theme: 'Chegada da Luz',
    color: '#ffd60a',
    image: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=700&auto=format&fit=crop',
    quote: 'O dia em que o mundo ganhou novas cores.',
    story: 'No instante em que Alycia nasceu, tudo mudou. O olhar pequenino descobriu o aconchego dos braços do papai e selou uma aliança de amor eterno.',
  },
  {
    year: 'Ano 02 ao 03',
    title: 'Passos no Castelo e Risadas de Elsa',
    theme: 'Descobertas & Aventuras',
    color: '#64d2ff',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=700&auto=format&fit=crop',
    quote: 'A alegria de aprender a andar e cantar livremente.',
    story: 'Os primeiros passos firmes pela sala, cantando músicas de princesas e enchendo todos os cômodos de vida com sua gargalhada contagiante.',
  },
  {
    year: 'Ano 04 ao 05',
    title: 'Pintando com a Imaginação de Rapunzel',
    theme: 'Artes & Criatividade',
    color: '#bf5af2',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=700&auto=format&fit=crop',
    quote: 'Mãos cheias de tinta e ideias que tocam o céu.',
    story: 'Papéis coloridos, borboletas desenhadas e castelos mágicos. A imaginação fértil de quem não conhece limites para criar mundos cheios de encanto.',
  },
  {
    year: 'Ano 06',
    title: 'Aventureira do Riso e Amizades Puras',
    theme: 'Mundo Luccas Neto & Escola',
    color: '#30d158',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=700&auto=format&fit=crop',
    quote: 'Brincadeiras, correrias e generosidade com todos.',
    story: 'A fase de fazer amigos com facilidade, cuidar dos coleguinhas e demonstrar uma empatia doce com cada pessoa e animalzinho ao redor.',
  },
  {
    year: 'Ano 07',
    title: 'A Princesa Soberana do Nosso Coração',
    theme: 'O Grande Marco dos 7 Anos',
    color: '#ff375f',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=700&auto=format&fit=crop',
    quote: 'Brilhante, inteligente e o maior orgulho do papai.',
    story: 'Hoje comemoramos 7 anos da garotinha mais fascinante e amorosa do universo. Uma verdadeira rainha de bondade, coragem e luz perpétua.',
  },
]

export const StickyPrincessCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % STORY_CARDS.length)
    celestialAudio.playSoftClick()
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + STORY_CARDS.length) % STORY_CARDS.length)
    celestialAudio.playSoftClick()
  }

  return (
    <section id="livro-historias" className="bg-[#000000] text-white py-24 px-4 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ffd60a]/10 blur-[140px] pointer-events-none" />

      <div className="max-w-[1024px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] flex items-center justify-center gap-1.5 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Livro Encantado de Memórias • Efeito Stiky-Cards
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Os 7 Capítulos da Nossa Princesa.
          </h2>
          <p className="text-sm text-[#86868b]">
            Cartões sobrepostos que empilham com rotações e profundidade tridimensional, contando a evolução ano a ano.
          </p>
        </div>

        {/* Stacking Cards Deck (stiky-cards mechanics) */}
        <div className="relative h-[480px] sm:h-[520px] max-w-lg mx-auto flex items-center justify-center">
          {STORY_CARDS.map((card, i) => {
            const isCurrent = i === activeIndex
            const isPast = i < activeIndex
            const diff = i - activeIndex

            // stiky-cards enter direction & rotation
            const dir = i % 2 === 1 ? 1 : -1
            let xOffset = 0
            let yOffset = 0
            let scale = 1
            let rotate = 0
            let opacity = 1
            let zIndex = STORY_CARDS.length - Math.abs(diff)

            if (isCurrent) {
              xOffset = 0
              yOffset = 0
              scale = 1
              rotate = 0
              opacity = 1
              zIndex = 40
            } else if (isPast) {
              // Stacked underneath with slight offset
              xOffset = -diff * 8 * dir
              yOffset = diff * 12
              scale = 1 - Math.abs(diff) * 0.06
              rotate = diff * 4 * dir
              opacity = 0.4
              zIndex = 10 + i
            } else {
              // Waiting in deck
              xOffset = diff * 12 * dir
              yOffset = -diff * 10
              scale = 1 - Math.abs(diff) * 0.05
              rotate = diff * 6 * dir
              opacity = 0.8
              zIndex = 30 - diff
            }

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="absolute w-[300px] sm:w-[380px] rounded-[30px] bg-[#16161a] border border-white/20 overflow-hidden shadow-2xl transition-all duration-500 ease-out cursor-pointer select-none"
                style={{
                  transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale}) rotate(${rotate}deg)`,
                  opacity,
                  zIndex,
                }}
              >
                {/* Card Image Banner */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-black/30" />

                  {/* Year Tag */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-white shadow"
                      style={{ backgroundColor: `${card.color}45` }}
                    >
                      {card.year}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="text-[11px] uppercase font-semibold text-[#86868b] tracking-wider mb-1">
                    {card.theme}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#ffd60a] font-medium mb-3 italic">
                    "{card.quote}"
                  </p>
                  <p className="text-xs text-[#86868b] leading-relaxed line-clamp-3">
                    {card.story}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95"
            title="Capítulo Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {STORY_CARDS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeIndex
                    ? 'w-8 bg-[#ffd60a]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all active:scale-95"
            title="Próximo Capítulo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
