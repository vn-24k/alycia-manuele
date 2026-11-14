import React, { useState, useEffect } from 'react'
import { Sparkles, Volume2, VolumeX, ImagePlus, Heart } from 'lucide-react'
import { celestialAudio } from '../audio/celestialSynth'

interface NavbarProps {
  onOpenPhotoModal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPhotoModal }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleToggleAudio = () => {
    const active = celestialAudio.toggleMute()
    setIsMuted(!active)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-apple py-3.5 border-b border-white/10 shadow-2xl shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        {/* Brand / Name */}
        <a href="#hero" className="group flex items-center gap-2.5 text-neutral-100">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500/20 via-purple-500/20 to-amber-300/30 border border-white/20 transition-transform duration-300 group-hover:scale-105">
            <Heart className="h-4 w-4 text-rose-300 fill-rose-300/40" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber-300 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm md:text-base font-semibold tracking-wide text-white group-hover:text-rose-200 transition-colors">
              Alycia Manuele
            </span>
            <span className="text-[10px] tracking-wider text-neutral-400 uppercase font-light">
              Edição Especial 7 Anos
            </span>
          </div>
        </a>

        {/* Navigation items (Apple style) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium text-neutral-300">
          <a href="#hero" className="hover:text-rose-200 transition-colors">
            Início
          </a>
          <a href="#specs" className="hover:text-rose-200 transition-colors">
            Especificações
          </a>
          <a href="#timeline" className="hover:text-rose-200 transition-colors">
            Linha do Tempo
          </a>
          <a href="#powers" className="hover:text-rose-200 transition-colors">
            Superpoderes
          </a>
          <a href="#vault" className="hover:text-rose-200 transition-colors">
            Galeria 3D
          </a>
          <a href="#letter" className="hover:text-rose-200 transition-colors">
            Carta ao Futuro
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Sound toggle pill */}
          <button
            onClick={handleToggleAudio}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 hover:border-amber-300/30 hover:bg-white/10 hover:text-white transition-all backdrop-blur-md"
            title={isMuted ? 'Ativar Música Ambiente' : 'Desativar Som'}
          >
            {isMuted ? (
              <VolumeX className="h-3.5 w-3.5 text-neutral-400" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-amber-300 animate-pulse" />
            )}
            <span className="hidden sm:inline text-[11px] font-medium">
              {isMuted ? 'Ativar Som' : 'Som Ligado'}
            </span>
          </button>

          {/* Photo manager button */}
          <button
            onClick={onOpenPhotoModal}
            className="flex items-center gap-2 rounded-full border border-rose-400/30 bg-gradient-to-r from-rose-500/20 to-purple-500/20 px-3.5 py-1.5 text-xs font-medium text-rose-100 hover:border-rose-400/60 hover:from-rose-500/30 hover:to-purple-500/30 transition-all shadow-sm"
          >
            <ImagePlus className="h-3.5 w-3.5 text-rose-300" />
            <span className="hidden sm:inline text-[11px]">Personalizar Fotos</span>
          </button>
        </div>
      </div>
    </header>
  )
}
