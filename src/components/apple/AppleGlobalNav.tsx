import React, { useState } from 'react'
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Droplets,
  MousePointer,
  Check,
  ChevronDown,
  Crown,
  Feather,
  Play,
  Menu,
  X,
  BookOpen,
  Image as ImageIcon,
  Wand2,
} from 'lucide-react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Nomes poéticos e encantados (ZERO menções a WebGL, 21st ou engenharia de software)
  const CURSOR_OPTIONS: { id: CursorType; name: string; tag: string; icon: React.ElementType }[] = [
    {
      id: 'padrao',
      name: 'Cursor Padrão',
      tag: 'Seta Clássica (Oficial)',
      icon: MousePointer,
    },
    {
      id: 'varinha',
      name: 'Varinha de Condão',
      tag: 'Pó de Estrelas Cintilante',
      icon: Wand2,
    },
    {
      id: 'suave',
      name: 'Aura Estelar',
      tag: 'Anel de Luz Dourado',
      icon: Sparkles,
    },
    {
      id: 'ondas',
      name: 'Ondas de Luz',
      tag: 'Fitas de Aurora',
      icon: Droplets,
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
        <nav className="hidden md:flex items-center gap-4 lg:gap-5">
          <button
            onClick={() => handleNavClick('alycia-pro')}
            className="text-white hover:text-[#ffd60a] transition-colors font-medium"
          >
            Início
          </button>
          <button
            onClick={() => handleNavClick('bolo-magico')}
            className="text-[#ffd60a] hover:text-white transition-colors font-semibold flex items-center gap-1 bg-[#ffd60a]/15 px-2.5 py-0.5 rounded-full border border-[#ffd60a]/30 shadow-sm"
          >
            <Crown className="w-3 h-3 text-[#ffd60a]" />
            Bolo 7 Anos
          </button>
          <button
            onClick={() => handleNavClick('livro-historias')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium"
          >
            Histórias
          </button>
          <button
            onClick={() => handleNavClick('manto-3d')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium flex items-center gap-1"
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
            onClick={() => handleNavClick('livro-recados')}
            className="text-[#d2d2d7] hover:text-[#ffd60a] transition-colors font-medium flex items-center gap-1"
          >
            <Heart className="w-3 h-3 text-[#ff375f]" />
            Desejos
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

          {/* Botão de Menu Mobile (Hambúrguer Apple Glass) */}
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }}
            className="md:hidden text-[#d2d2d7] hover:text-white p-1.5 rounded-full hover:bg-white/[0.08] transition-colors"
            title={isMobileMenuOpen ? 'Fechar Menu' : 'Abrir Menu de Navegação'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#ffd60a]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* GAVETA / DROPDOWN DE NAVEGAÇÃO MOBILE */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[48px] left-0 right-0 bg-[#0a0a0d]/98 border-b border-white/[0.12] backdrop-blur-3xl shadow-2xl px-5 py-4 animate-fadeIn transition-all z-50">
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => {
                handleNavClick('alycia-pro')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-white text-[14px] font-medium transition-colors flex items-center justify-between"
            >
              <span>Início da Celebração</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd60a]" />
            </button>

            <button
              onClick={() => {
                handleNavClick('bolo-magico')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-[#ffd60a]/10 border border-[#ffd60a]/25 text-[#ffd60a] text-[14px] font-semibold transition-colors flex items-center justify-between shadow-sm"
            >
              <span className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#ffd60a]" />
                Bolo Mágico dos 7 Anos
              </span>
              <span className="text-[11px] font-mono bg-[#ffd60a]/20 px-2 py-0.5 rounded-full text-[#ffd60a]">
                7 Velinhas
              </span>
            </button>

            <button
              onClick={() => {
                handleNavClick('livro-historias')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#f5f5f7] text-[14px] font-medium transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#bf5af2]" />
              <span>O Livro de Histórias (0 a 7 Anos)</span>
            </button>

            <button
              onClick={() => {
                handleNavClick('manto-3d')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#d2d2d7] text-[14px] font-medium transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#ffd60a]" />
              <span>Manto Celestial 3D</span>
            </button>

            <button
              onClick={() => {
                handleNavClick('galeria-reinos')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#d2d2d7] text-[14px] font-medium transition-colors"
            >
              Galeria dos Reinos Encantados
            </button>

            <button
              onClick={() => {
                handleNavClick('playground-magico')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#d2d2d7] text-[14px] font-medium transition-colors"
            >
              Playground Cinético das Letras
            </button>

            <button
              onClick={() => {
                handleNavClick('carta-pai')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ff375f]/15 to-[#ffd60a]/15 border border-[#ff375f]/30 text-[#ff375f] text-[14px] font-semibold transition-colors flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-[#ff375f]" />
                Carta do Papai (Voz Oficial)
              </span>
              <Heart className="w-3.5 h-3.5 fill-[#ff375f]" />
            </button>

            <button
              onClick={() => {
                handleNavClick('livro-recados')
                setIsMobileMenuOpen(false)
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#ffd60a] text-[14px] font-medium transition-colors flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-[#ff375f]" />
              <span>Livro de Desejos & Recados</span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false)
                onOpenPhotoModal()
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.06] text-[#a1a1a6] text-[13px] font-normal transition-colors flex items-center gap-2 border-t border-white/[0.08] mt-1 pt-2"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Personalizar Fotos da Princesa</span>
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
