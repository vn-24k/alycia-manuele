import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Maximize2, Heart, ImagePlus, ChevronLeft, ChevronRight } from 'lucide-react'
import { celestialAudio } from '../audio/celestialSynth'

export interface MemoryCardData {
  id: string
  title: string
  date: string
  location: string
  image: string
  caption: string
  tag: string
}

interface MemoryVault3DProps {
  cards: MemoryCardData[]
  onOpenPhotoModal: () => void
}

export const MemoryVault3D: React.FC<MemoryVault3DProps> = ({ cards, onOpenPhotoModal }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryCardData | null>(null)

  const handleNext = () => {
    celestialAudio.playChime(659.25, 0.08)
    setActiveIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    celestialAudio.playChime(523.25, 0.08)
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <section id="vault" className="relative py-28 px-6 max-w-6xl mx-auto overflow-hidden">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold inline-block mb-3">
          Cápsula de Memórias
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          The Memory Vault:{' '}
          <span className="aurora-text-gradient italic font-normal">Momentos Inesquecíveis.</span>
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Pilha tridimensional de lembranças preciosas. Deslize entre os cartões ou clique para expandir.
        </p>
      </div>

      {/* 3D Stack Carousel Container */}
      <div className="relative min-h-[480px] sm:min-h-[540px] flex items-center justify-center">
        {/* Controls */}
        <button
          onClick={handlePrev}
          aria-label="Memória anterior"
          className="absolute left-2 sm:left-8 z-30 flex h-12 w-12 items-center justify-center rounded-full glass-apple border border-white/20 text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <ChevronLeft className="h-6 w-6 text-amber-200" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Próxima memória"
          className="absolute right-2 sm:right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full glass-apple border border-white/20 text-white hover:scale-110 active:scale-95 transition-all shadow-xl"
        >
          <ChevronRight className="h-6 w-6 text-amber-200" />
        </button>

        {/* Floating Stack of Cards (3D Overlap inspired by Roulette Template) */}
        <div className="relative w-full max-w-sm sm:max-w-md h-[430px] flex items-center justify-center">
          {cards.map((card, idx) => {
            const offset = (idx - activeIndex + cards.length) % cards.length
            // Only render front 4 cards for performance
            if (offset > 3 && offset < cards.length - 1) return null

            const isFront = offset === 0
            const rotateZ = offset === 0 ? 0 : offset === 1 ? 5 : offset === 2 ? -6 : 10
            const translateX = offset === 0 ? 0 : offset === 1 ? 35 : offset === 2 ? -35 : 0
            const translateY = offset * 12
            const scale = 1 - offset * 0.07
            const zIndex = 20 - offset
            const opacity = 1 - offset * 0.22

            return (
              <motion.div
                key={card.id}
                animate={{
                  scale,
                  rotateZ,
                  x: translateX,
                  y: translateY,
                  opacity,
                  zIndex,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 cursor-pointer select-none"
                onClick={() => {
                  if (isFront) {
                    setSelectedPhoto(card)
                    celestialAudio.playStarBurst()
                  } else {
                    setActiveIndex(idx)
                  }
                }}
              >
                <div className="w-full h-full rounded-3xl glass-apple-card border border-white/20 p-4 shadow-2xl flex flex-col justify-between overflow-hidden bg-[#111118]/80 backdrop-blur-2xl transition-all duration-300 hover:border-rose-400/50">
                  {/* Photo Frame */}
                  <div className="relative w-full h-[270px] rounded-2xl overflow-hidden bg-neutral-900 group">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-medium tracking-wide text-rose-200 border border-white/10">
                      {card.tag}
                    </span>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] text-white border border-white/10">
                      <Maximize2 className="h-3 w-3 text-amber-300" />
                      <span>Expandir</span>
                    </div>
                  </div>

                  {/* Card Meta & Caption */}
                  <div className="pt-3 pb-1 px-1">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>{card.date}</span>
                      <span className="text-amber-200">{card.location}</span>
                    </div>

                    <h4 className="mt-1 font-serif-luxury text-xl font-bold text-white tracking-tight truncate">
                      {card.title}
                    </h4>

                    <p className="mt-1 text-xs text-neutral-300 leading-snug line-clamp-2">
                      {card.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Button to Open Photo Manager */}
      <div className="mt-10 text-center">
        <button
          onClick={onOpenPhotoModal}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-2.5 text-xs font-medium text-neutral-200 backdrop-blur-md transition-all shadow-md active:scale-95"
        >
          <ImagePlus className="h-4 w-4 text-rose-300" />
          <span>Subir Minhas Próprias Fotos de Alycia</span>
        </button>
      </div>

      {/* Expanded Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl glass-apple-card border border-white/20 p-6 sm:p-8 bg-[#12121a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[60vh] rounded-2xl overflow-hidden mb-6">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain mx-auto"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
              <span>{selectedPhoto.date}</span>
              <span className="text-amber-300">{selectedPhoto.location}</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mb-2">
              {selectedPhoto.title}
            </h3>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {selectedPhoto.caption}
            </p>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
