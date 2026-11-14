import React, { useState } from 'react'
import { Search, Heart, Volume2, VolumeX, Sparkles, Droplets, Zap, MousePointer, Check, ChevronDown } from 'lucide-react'
import { CursorType } from '../cursors/CursorSwitcher'
import { celestialAudio } from '../../audio/celestialSynth'

interface AppleGlobalNavProps {
  onOpenPhotoModal: () => void
  currentCursor: CursorType
  onSelectCursor: (cursor: CursorType) => void
  isMuted: boolean
  onToggleMute: () => void
}

export const AppleGlobalNav: React.FC<AppleGlobalNavProps> = ({
  onOpenPhotoModal,
  currentCursor,
  onSelectCursor,
  isMuted,
  onToggleMute,
}) => {
  const [isCursorMenuOpen, setIsCursorMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const CURSOR_OPTIONS: { id: CursorType; name: string; tag: string; icon: React.ElementType }[] = [
    {
      id: 'fluido',
      name: 'Fluido WebGL',
      tag: 'Fumaça & Cores',
      icon: Droplets,
    },
    {
      id: 'elastico',
      name: 'Elástico Sleek',
      tag: 'Mira & Rotação',
      icon: Zap,
    },
    {
      id: 'suave',
      name: 'Suave 21st',
      tag: 'Anel Magnético',
      icon: Sparkles,
    },
    {
      id: 'padrao',
      name: 'Padrão',
      tag: 'Cursor do Sistema',
      icon: MousePointer,
    },
  ]

  const handleCursorSelect = (id: CursorType) => {
    celestialAudio.playChime(880, 0.08)
    onSelectCursor(id)
    setIsCursorMenuOpen(false)
  }

  const currentOption = CURSOR_OPTIONS.find((c) => c.id === currentCursor) || CURSOR_OPTIONS[0]
  const CurrentIcon = currentOption.icon

  const handleNavClick = (sectionId: string) => {
    celestialAudio.playSoftClick()
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-[44px] apple-nav-blur border-b border-white/[0.08] transition-all">
        <div className="max-w-[1024px] mx-auto h-full px-4 flex items-center justify-between text-[12px] font-normal tracking-[-0.01em] text-[#d2d2d7]">
          {/* Brand Logo / Monogram (No Apple Logo) */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:opacity-80 transition-opacity flex items-center gap-2 group py-1"
            title="Início"
          >
            <span className="w-2 h-2 rounded-full bg-[#2997ff] shadow-[0_0_8px_rgba(41,151,255,0.8)] group-hover:scale-125 transition-transform" />
            <span className="font-semibold text-[13px] tracking-tight text-white">Alycia Manuele</span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('alycia-pro')}
              className="hover:text-white transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => handleNavClick('sete-anos')}
              className="hover:text-white transition-colors"
            >
              Sete Anos
            </button>
            <button
              onClick={() => handleNavClick('superpoderes')}
              className="hover:text-white transition-colors"
            >
              Superpoderes
            </button>
            <button
              onClick={() => handleNavClick('promo-grid')}
              className="hover:text-white transition-colors"
            >
              Destaques
            </button>
            <button
              onClick={() => handleNavClick('galeria-3d')}
              className="hover:text-white transition-colors"
            >
              Cubo 3D
            </button>
            <button
              onClick={() => handleNavClick('streamer-memorias')}
              className="hover:text-white transition-colors"
            >
              Memórias
            </button>
            <button
              onClick={() => handleNavClick('carta-pai')}
              className="hover:text-white transition-colors"
            >
              Carta do Pai
            </button>
            <button
              onClick={onOpenPhotoModal}
              className="text-[#2997ff] hover:text-[#52a9ff] transition-colors font-medium flex items-center gap-1"
            >
              Fotos
            </button>
          </nav>

          {/* Interactive Tools & Cursor Switcher */}
          <div className="flex items-center gap-3">
            {/* Styled Cursor Switcher Button */}
            <div className="relative">
              <button
                onClick={() => setIsCursorMenuOpen(!isCursorMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[11px] text-[#f5f5f7] transition-all"
                title="Trocar Cursor"
              >
                <CurrentIcon className="w-3 h-3 text-[#2997ff]" />
                <span className="hidden sm:inline">{currentOption.name}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Popover */}
              {isCursorMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCursorMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-9 z-50 w-56 rounded-2xl bg-[#1d1d1f]/95 border border-white/[0.15] p-1.5 shadow-2xl backdrop-blur-2xl">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-[#86868b] tracking-wider border-b border-white/[0.08] mb-1">
                      Cursores Disponíveis
                    </div>
                    {CURSOR_OPTIONS.map((opt) => {
                      const Icon = opt.icon
                      const isSelected = opt.id === currentCursor
                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleCursorSelect(opt.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                            isSelected
                              ? 'bg-[#0071e3] text-white'
                              : 'text-[#d2d2d7] hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            <div>
                              <div className="font-medium text-[12px]">{opt.name}</div>
                              <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#86868b]'}`}>
                                {opt.tag}
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="text-[#d2d2d7] hover:text-white p-1 transition-colors"
              title={isMuted ? 'Ativar Som Procedural' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#2997ff]" />}
            </button>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-[#d2d2d7] hover:text-white p-1 transition-colors"
              title="Buscar"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Heart Icon */}
            <button
              onClick={() => handleNavClick('carta-pai')}
              className="text-[#d2d2d7] hover:text-[#ff3b30] p-1 transition-colors relative"
              title="Amor do Pai: 100%"
            >
              <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]/40" />
            </button>
          </div>
        </div>
      </header>

      {/* Quick Search Drawer */}
      {isSearchOpen && (
        <div className="fixed top-[44px] left-0 right-0 z-40 bg-[#161617]/95 backdrop-blur-2xl border-b border-white/[0.1] px-4 py-4 animate-fadeIn">
          <div className="max-w-[640px] mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#86868b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em Alycia Manuele..."
              className="w-full bg-transparent text-sm text-white placeholder-[#86868b] outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="text-xs text-[#2997ff] hover:underline"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  )
}
