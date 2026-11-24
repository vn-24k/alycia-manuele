import React, { useState } from 'react'
import { MousePointer, Sparkles, Droplets, Wand2, Check } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

export type CursorType = 'padrao' | 'varinha' | 'ondas' | 'suave'

interface CursorSwitcherProps {
  currentCursor: CursorType
  onSelectCursor: (cursor: CursorType) => void
}

export const CURSOR_OPTIONS: { id: CursorType; name: string; desc: string; icon: React.ElementType; badge?: string }[] = [
  {
    id: 'padrao',
    name: 'Cursor Padrão (Sem Efeito)',
    desc: 'Seta clássica e limpa do sistema, zero distração',
    icon: MousePointer,
    badge: 'Padrão Oficial'
  },
  {
    id: 'varinha',
    name: 'Varinha de Condão (Pó de Fada)',
    desc: 'Chuva de estrelas cintilantes e purpurina ao mover e clicar',
    icon: Wand2,
    badge: 'Mágico'
  },
  {
    id: 'ondas',
    name: 'Ondas de Luz da Aurora',
    desc: 'Fitas elásticas com física suave de molas',
    icon: Droplets,
  },
  {
    id: 'suave',
    name: 'Aura Estelar Magnética',
    desc: 'Anel dourado de luz e brilho celestial',
    icon: Sparkles,
  },
]

export const CursorSwitcher: React.FC<CursorSwitcherProps> = ({
  currentCursor,
  onSelectCursor,
}) => {
  const [isOpen, setIsOpen] = useState(false)

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
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.14] text-xs text-[#f5f5f7] transition-all backdrop-blur-md shadow-xs"
        title="Escolher efeito do cursor"
      >
        <CurrentIcon className="w-3.5 h-3.5 text-[#ffd60a]" />
        <span className="font-medium text-[11px]">{currentOption.name.split(' (')[0]}</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-10 z-50 w-72 rounded-2xl bg-[#141418]/98 border border-white/[0.15] p-2 shadow-2xl backdrop-blur-2xl">
            <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-wider text-[#ffd60a] border-b border-white/[0.08] mb-1 flex items-center justify-between">
              <span>Efeitos de Toque e Mouse</span>
              <Wand2 className="w-3 h-3 text-[#ffd60a]" />
            </div>

            <div className="space-y-1">
              {CURSOR_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const isSelected = opt.id === currentCursor
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-start justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#ffd60a] text-black shadow-md'
                        : 'text-[#d2d2d7] hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-black/10 text-black' : 'bg-white/5 text-[#ffd60a]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold flex items-center gap-1.5">
                          <span>{opt.name}</span>
                          {opt.badge && (
                            <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                              isSelected ? 'bg-black/20 text-black' : 'bg-[#ffd60a]/20 text-[#ffd60a]'
                            }`}>
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] mt-0.5 leading-snug ${isSelected ? 'text-black/80' : 'text-[#86868b]'}`}>
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-black shrink-0 mt-1" />}
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
