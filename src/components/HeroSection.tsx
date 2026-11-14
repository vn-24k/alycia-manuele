import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ChevronDown, Heart, Star, Compass } from 'lucide-react'
import { celestialAudio } from '../audio/celestialSynth'

interface HeroSectionProps {
  heroImage: string
  onOpenPhotoModal: () => void
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, onOpenPhotoModal }) => {
  const handleExplore = () => {
    celestialAudio.playStarBurst()
    const element = document.getElementById('specs')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* Ambient Aurora Light Cones */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-rose-500/15 via-purple-600/10 to-transparent blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 -left-32 w-80 h-80 bg-amber-400/10 blur-[100px] rounded-full" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-rose-300/20 bg-gradient-to-r from-rose-500/10 via-purple-500/10 to-amber-400/10 px-4 py-1.5 text-xs text-rose-200 backdrop-blur-md shadow-inner"
      >
        <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-medium tracking-wide">Uma celebração à vida mais brilhante</span>
        <span className="h-1 w-1 rounded-full bg-rose-400" />
        <span className="text-amber-200/90 font-semibold">Sete Anos</span>
      </motion.div>

      {/* Main Apple Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold tracking-tight leading-[1.02] text-white">
          Alycia{' '}
          <span className="aurora-text-gradient italic font-normal">Manuele</span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl md:text-3xl font-light text-neutral-300 max-w-2xl mx-auto leading-relaxed">
          Sete anos de luz, riso solto e o amor mais puro que este mundo já conheceu.
        </p>

        <p className="mt-3 text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-200/80 font-medium">
          Edição Definitiva • O Presente Mais Precioso
        </p>
      </motion.div>

      {/* Centerpiece Dimensional Visual (Apple Style Showcase) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
        className="relative mt-12 mb-10 w-full max-w-md sm:max-w-lg aspect-square flex items-center justify-center"
      >
        {/* Luminous Glow Halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-500/15 to-amber-300/20 blur-3xl" />

        {/* Outer Orbit Ring */}
        <div className="absolute inset-2 sm:inset-4 rounded-full border border-white/10 border-dashed animate-spin" style={{ animationDuration: '45s' }}>
          <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-300 shadow-lg shadow-amber-300/80" />
          <div className="absolute -bottom-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose-300 shadow-lg shadow-rose-300/80" />
        </div>

        {/* Photo Container Frame */}
        <div className="relative group w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-b from-white/20 via-white/5 to-white/10 backdrop-blur-xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 relative">
            <img
              src={heroImage}
              alt="Alycia Manuele"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Quick customize button */}
            <button
              onClick={onOpenPhotoModal}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full bg-black/70 border border-white/30 px-3 py-1 text-[11px] text-white backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Heart className="h-3 w-3 text-rose-300" />
              <span>Trocar Foto</span>
            </button>
          </div>
        </div>

        {/* Floating Stat Pills (Apple Style Dimension) */}
        <div className="absolute -left-2 sm:left-4 top-1/4 rounded-2xl glass-apple-card px-4 py-2.5 border border-white/15 shadow-xl animate-float-gentle">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-medium text-neutral-300">Coração Valente</span>
          </div>
          <p className="text-xs font-semibold text-white mt-0.5">100% de Bondade</p>
        </div>

        <div
          className="absolute -right-2 sm:right-4 bottom-1/4 rounded-2xl glass-apple-card px-4 py-2.5 border border-white/15 shadow-xl animate-float-gentle"
          style={{ animationDelay: '1.5s' }}
        >
          <div className="flex items-center gap-2">
            <Star className="h-3 w-3 text-amber-300 fill-amber-300" />
            <span className="text-[11px] font-medium text-neutral-300">7 Anos</span>
          </div>
          <p className="text-xs font-semibold text-white mt-0.5">2.556 Dias de Luz</p>
        </div>
      </motion.div>

      {/* Call to Actions (Apple Pill Buttons) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45 }}
        className="flex flex-col sm:flex-row items-center gap-4 z-10"
      >
        <button
          onClick={handleExplore}
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold text-neutral-900 bg-gradient-to-r from-amber-200 via-rose-200 to-amber-100 hover:brightness-105 transition-all shadow-lg shadow-rose-500/20 active:scale-95"
        >
          <span>Conhecer a História</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>

        <a
          href="#vault"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-sm font-medium text-neutral-200 backdrop-blur-md transition-all active:scale-95"
        >
          <Compass className="h-4 w-4 text-rose-300" />
          <span>Ver Galeria 3D</span>
        </a>
      </motion.div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="mt-16 flex flex-col items-center gap-1.5 text-[11px] text-neutral-400 uppercase tracking-widest cursor-pointer"
        onClick={handleExplore}
      >
        <span>Deslize para Navegar</span>
        <ChevronDown className="h-3.5 w-3.5 text-amber-200/80" />
      </motion.div>
    </section>
  )
}
