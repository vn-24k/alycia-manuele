import React, { useState } from 'react'
import { Heart, Volume2, VolumeX, Sparkles, Droplets, MousePointer, Check, ChevronDown, Crown, Feather, Play } from 'lucide-react'
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

  // Nomes poéticos e encantados (ZERO menções a WebGL, 21st ou engenharia de software)
  const CURSOR_OPTIONS: { id: CursorType; name: string; tag: string; icon: React.ElementType }[] = [
    {
      id: 'ondas',
      name: 'Ondas Mágicas',
      tag: 'Fitas de Luz (Principal)',
      icon: Droplets,
    },
    {
      id: 'suave',
      name: 'Aura Estelar',
      tag: 'Anel de Luz Dourado',
      icon: Sparkles,
    },
    {
      id: 'padrao',
      name: 'Cursor Padrão',
      tag: 'Seta Clássica do Sistema',
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
    <header className="fixed top-0 left-0 right-0 z-50 h-[48px] bg-[#0a0a0d]/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="max-w-[1040px] mx-auto h-full px-4 flex items-center justify-between text-[12px] font-normal tracking-[-0.01em] text-[#d2d2d7]">
        {/* Monograma Real */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-white hover:opacity-80 transition-opacity flex items-center gap-2 group py-1"
          title="Início da Celebração"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffd60a] shadow-[0_0_10px_rgba(255,214,10,0.8)] group-hover:scale-125 transition-transform" />
          <span className="font-bold text-[14px] tracking-tight text-white flex items-center gap-1.5">
            Alycia Manuele
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
          </span>
        </button>

        {/* Links de Navegação Real */}
        <nav className="hidden md:flex items-center gap-5">
          <button
            onClick={() => handleNavClick('alycia-pro')}
            className="text-white hover:text-[#ffd60a] transition-colors font-medium"
          >
            Início
          </button>
          <button
            onClick={() => handleNavClick('manto-3d')}
            className="text-[#ffd60a] hover:text-white transition-colors font-semibold flex items-center gap-1 bg-[#ffd60a]/10 px-2.5 py-0.5 rounded-full border border-[#ffd60a]/25 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#ffd60a]" />
            Manto 3D
          </button>
          <button
            onClick={() => handleNavClick('galeria-reinos')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium"
          >
            Reinos
          </button>
          <button
            onClick={() => handleNavClick('livro-historias')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium"
          >
            Histórias
          </button>
          <button
            onClick={() => handleNavClick('playground-magico')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium"
          >
            Playground
          </button>
          <button
            onClick={() => handleNavClick('carta-pai')}
            className="text-[#ff375f] hover:text-white transition-colors font-semibold flex items-center gap-1"
          >
            <Feather className="w-3.5 h-3.5" />
            Carta do Papai
          </button>
          <button
            onClick={onOpenPhotoModal}
            className="text-[#a1a1a6] hover:text-white transition-colors font-normal text-[11px] bg-white/[0.06] px-2.5 py-1 rounded-full border border-white/[0.08]"
          >
            Fotos
          </button>
        </nav>

        {/* Controles & Efeitos Encantados */}
        <div className="flex items-center gap-3">
          {/* Seletor de Efeitos Encantados */}
          <div className="relative">
            <button
              onClick={() => setIsCursorMenuOpen(!isCursorMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-[11px] text-[#f5f5f7] transition-all"
              title="Efeito do Cursor"
            >
              <CurrentIcon className="w-3 h-3 text-[#ffd60a]" />
              <span className="hidden sm:inline">{currentOption.name}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {/* Menu Popover */}
            {isCursorMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsCursorMenuOpen(false)}
                />
                <div className="absolute right-0 top-10 z-50 w-56 rounded-2xl bg-[#141418]/98 border border-white/[0.15] p-2 shadow-2xl backdrop-blur-2xl">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-[#ffd60a] tracking-wider border-b border-white/[0.08] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Efeitos de Magia
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
                            ? 'bg-[#ffd60a] text-black font-semibold'
                            : 'text-[#d2d2d7] hover:bg-white/[0.08] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#ffd60a]'}`} />
                          <div>
                            <div className="text-[12px]">{opt.name}</div>
                            <div className={`text-[10px] ${isSelected ? 'text-black/75' : 'text-[#86868b]'}`}>
                              {opt.tag}
                            </div>
                          </div>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-black" />}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Botão de Som Mágico */}
          <button
            onClick={onToggleMute}
            className="text-[#d2d2d7] hover:text-white p-1.5 rounded-full hover:bg-white/[0.08] transition-colors"
            title={isMuted ? 'Ativar Som da Celebração' : 'Silenciar'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-[#ff453a]" /> : <Volume2 className="w-4 h-4 text-[#ffd60a]" />}
          </button>

          {/* Botão Direto para a Carta do Pai */}
          <button
            onClick={() => handleNavClick('carta-pai')}
            className="px-3 py-1 rounded-full bg-[#ff375f]/20 hover:bg-[#ff375f]/30 border border-[#ff375f]/40 text-[11px] text-[#ff375f] font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#ff375f]/15"
            title="Ir para a Carta do Papai"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Papai</span>
          </button>
        </div>
      </div>
    </header>
  )
}
