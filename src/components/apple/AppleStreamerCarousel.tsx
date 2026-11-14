import React, { useState } from 'react'
import { Play, Sparkles, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface StreamerItem {
  id: string
  title: string
  category: string
  duration: string
  image: string
  description: string
}

export const AppleStreamerCarousel: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null)

  const MEMORY_EPISODES: StreamerItem[] = [
    {
      id: 'ep-1',
      title: 'O Primeiro Sorriso Espontâneo',
      category: 'Temporada 01 • O Começo',
      duration: 'Inesquecível',
      image:
        'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
      description:
        'Aquele momento em que o mundo parou e uma gargalhada pura iluminou cada canto da nossa história.',
    },
    {
      id: 'ep-2',
      title: 'Pintando o Próprio Arco-Íris',
      category: 'Temporada 02 • Artes & Imaginação',
      duration: 'Pura Magia',
      image:
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
      description:
        'Dedinhos cheios de tinta e um coração livre para inventar as cores mais vibrantes do universo.',
    },
    {
      id: 'ep-3',
      title: 'Aventuras no Parque e Balanço nas Nuvens',
      category: 'Temporada 03 • Descobertas',
      duration: 'Vento no Rosto',
      image:
        'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop',
      description:
        'Correndo na grama com a sensação mágica de que o mundo inteiro é um lugar de encanto e brincadeira.',
    },
    {
      id: 'ep-4',
      title: 'O Abraço que Cura Tudo',
      category: 'Temporada 04 • Amor Infinito',
      duration: 'Aconchego',
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop',
      description:
        'Não existe lugar mais seguro ou acolhedor no mundo do que o abraço apertado entre pai e filha.',
    },
    {
      id: 'ep-5',
      title: 'Sete Anos: A Grande Celebração',
      category: 'Temporada Especial • O Presente',
      duration: 'Hoje & Sempre',
      image:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
      description:
        'Comemorando a existência da garotinha mais iluminada, alegre e extraordinária do universo.',
    },
  ]

  const handlePlayEpisode = (id: string) => {
    setActiveItem(id)
    celestialAudio.playCelestialHarp([440, 554.37, 659.25, 880])
  }

  return (
    <section
      id="streamer-memorias"
      className="bg-[#000000] text-[#f5f5f7] py-16 px-4 overflow-hidden border-b border-white/[0.08]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Apple TV+ Style Header */}
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <div className="text-xs uppercase font-semibold text-[#86868b] tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
              Stream de Memórias • Episódios Inéditos
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7]">
              Momentos que marcam a vida.
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-[#86868b]">7 Anos de História</span>
          </div>
        </div>

        {/* Horizontal Filmstrip Carousel */}
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory px-2">
          {MEMORY_EPISODES.map((ep) => {
            const isActive = activeItem === ep.id
            return (
              <div
                key={ep.id}
                onClick={() => handlePlayEpisode(ep.id)}
                className={`snap-center shrink-0 w-[280px] sm:w-[360px] md:w-[420px] rounded-[24px] bg-[#161617] border overflow-hidden cursor-pointer transition-all duration-500 group ${
                  isActive
                    ? 'border-[#2997ff] ring-2 ring-[#2997ff]/40 scale-[1.02]'
                    : 'border-white/[0.08] hover:border-white/[0.2] hover:scale-[1.01]'
                }`}
              >
                {/* Poster Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={ep.image}
                    alt={ep.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 fill-black ml-0.5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                        {ep.category}
                      </div>
                      <div className="text-xs font-medium text-white flex items-center gap-1">
                        <Heart className="w-3 h-3 text-[#ff375f] fill-[#ff375f]" />
                        {ep.duration}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mb-2 group-hover:text-[#2997ff] transition-colors">
                    {ep.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed line-clamp-2">
                    {ep.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
