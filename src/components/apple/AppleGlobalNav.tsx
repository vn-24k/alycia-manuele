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
      name: 'Padrão Apple',
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
          {/* Official Apple Logo SVG */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-white hover:opacity-70 transition-opacity p-1 flex items-center justify-center"
            aria-label="Apple Brasil - Alycia Manuele"
            title="Início"
          >
            <svg height="44" viewBox="0 0 14 44" width="14" xmlns="http://www.w3.org/2000/svg" className="fill-current w-[14px] h-[44px]">
              <path d="m13.0729 17.6825a3.61 3.61 0 0 0 -1.7248 3.0365 3.5132 3.5132 0 0 0 2.1379 3.2223 8.394 8.394 0 0 1 -1.0948 2.2618c-.6816.9812-1.3943 1.9623-2.4787 1.9623s-1.3633-.63-2.613-.63c-1.2187 0-1.6525.6507-2.644.6507s-1.6834-.9089-2.4787-2.0243a9.7842 9.7842 0 0 1 -1.6628-5.2776c0-3.0984 2.014-4.7405 3.9969-4.7405 1.0535 0 1.9314.6919 2.5924.6919.63 0 1.6112-.7333 2.8092-.7333a3.7579 3.7579 0 0 1 3.1604 1.5802zm-3.7284-2.8918a3.5615 3.5615 0 0 0 .8469-2.22 1.5353 1.5353 0 0 0 -.031-.32 3.5686 3.5686 0 0 0 -2.3445 1.2084 3.4629 3.4629 0 0 0 -.8779 2.1585 1.419 1.419 0 0 0 .031.2892 1.19 1.19 0 0 0 .2169.0207 3.0935 3.0935 0 0 0 2.1586-1.1368z" />
            </svg>
          </button>

          {/* Navigation Links (Apple Style) */}
          <nav className="hidden md:flex items-center gap-7">
            <button
              onClick={() => handleNavClick('alycia-pro')}
              className="hover:text-white transition-colors"
            >
              Alycia Pro
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
            {/* Apple Styled Cursor Switcher Button */}
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

            {/* Heart / Affection Badge */}
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

      {/* Quick Search Drawer (Apple Style) */}
      {isSearchOpen && (
        <div className="fixed top-[44px] left-0 right-0 z-40 bg-[#161617]/95 backdrop-blur-2xl border-b border-white/[0.1] px-4 py-4 animate-fadeIn">
          <div className="max-w-[640px] mx-auto flex items-center gap-3">
            <Search className="w-4 h-4 text-[#86868b]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar em Alycia Manuele (história, 7 anos, superpoderes, carta)..."
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
