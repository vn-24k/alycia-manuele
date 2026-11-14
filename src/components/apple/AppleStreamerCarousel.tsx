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
      title: '[Episódio 01 • Título do Momento]',
      category: '[Temporada 01 • O Começo]',
      duration: '[Duração]',
      image:
        'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
      description:
        '[Descrição e lembrança especial sobre o primeiro episódio da história de Alycia]',
    },
    {
      id: 'ep-2',
      title: '[Episódio 02 • Título do Momento]',
      category: '[Temporada 02 • Descobertas]',
      duration: '[Duração]',
      image:
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
      description:
        '[Descrição e lembrança especial sobre o segundo episódio marcante]',
    },
    {
      id: 'ep-3',
      title: '[Episódio 03 • Título do Momento]',
      category: '[Temporada 03 • Alegria & Brincadeiras]',
      duration: '[Duração]',
      image:
        'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop',
      description:
        '[Descrição e lembrança especial sobre o terceiro episódio marcante]',
    },
    {
      id: 'ep-4',
      title: '[Episódio 04 • Título do Momento]',
      category: '[Temporada 04 • Amor da Família]',
      duration: '[Duração]',
      image:
        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop',
      description:
        '[Descrição e lembrança especial sobre o quarto episódio marcante]',
    },
    {
      id: 'ep-5',
      title: '[Episódio 05 • Sete Anos]',
      category: '[Temporada Especial • Celebração]',
      duration: '[Duração]',
      image:
        'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
      description:
        '[Descrição e comemoração do marco dos 7 anos de Alycia Manuele]',
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
        {/* Apple TV+ Style Header (Clean Placeholders) */}
        <div className="flex items-end justify-between mb-8 px-2">
          <div>
            <div className="text-xs uppercase font-semibold text-[#86868b] tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
              [Stream de Memórias • Episódios Inéditos]
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7]">
              [Momentos que Marcam a Vida]
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-[#86868b]">[7 Anos de História]</span>
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
