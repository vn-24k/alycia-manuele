import React, { useState } from 'react'
import { MousePointer, Sparkles, Droplets, Zap, Check } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

export type CursorType = 'ondas' | 'suave' | 'padrao'

interface CursorSwitcherProps {
  currentCursor: CursorType
  onSelectCursor: (cursor: CursorType) => void
}

export const CursorSwitcher: React.FC<CursorSwitcherProps> = ({
  currentCursor,
  onSelectCursor,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const CURSOR_OPTIONS: { id: CursorType; name: string; desc: string; icon: React.ElementType }[] = [
    {
      id: 'ondas',
      name: 'Ondas de Luz',
      desc: 'Fitas elásticas de aurora com física de molas (Principal)',
      icon: Droplets,
    },
    {
      id: 'suave',
      name: 'Aura Estelar',
      desc: 'Anel de luz e pó dourado com física magnética',
      icon: Sparkles,
    },
    {
      id: 'padrao',
      name: 'Cursor Padrão',
      desc: 'Seta clássica nativa do navegador',
      icon: MousePointer,
    },
  ]

  const handleSelect = (id: CursorType) => {
    celestialAudio.playChime(783.99, 0.1)
    onSelectCursor(id)
    setIsOpen(false)
  }

  const currentOption = CURSOR_OPTIONS.find((c) => c.id === currentCursor) || CURSOR_OPTIONS[0]
  const CurrentIcon = currentOption.icon

  return (
    <div className="relative">
      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-950/40 hover:bg-purple-900/60 px-3 py-1.5 text-xs text-purple-200 transition-all backdrop-blur-md shadow-sm active:scale-95"
        title="Escolher Estilo do Cursor"
      >
        <CurrentIcon className="h-3.5 w-3.5 text-amber-300" />
        <span className="hidden sm:inline text-[11px] font-medium">
          Cursor: {currentOption.name}
        </span>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-10 z-50 w-64 rounded-2xl border border-white/20 bg-[#120f2b]/95 p-2 backdrop-blur-2xl shadow-2xl animate-fadeIn">
            <div className="px-3 py-2 border-b border-white/10 mb-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block">
                Escolha o Cursor da Página
              </span>
            </div>

            <div className="space-y-1">
              {CURSOR_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const isSelected = opt.id === currentCursor
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? 'bg-purple-500/25 border border-purple-400/40 text-white'
                        : 'hover:bg-white/5 text-neutral-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                          isSelected
                            ? 'bg-purple-500/30 text-amber-200'
                            : 'bg-white/5 text-neutral-400'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold">{opt.name}</div>
                        <div className="text-[10px] text-neutral-400 line-clamp-1">
                          {opt.desc}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="h-3.5 w-3.5 text-amber-300 ml-2 flex-shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
