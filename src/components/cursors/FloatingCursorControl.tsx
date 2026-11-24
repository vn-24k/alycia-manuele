import React, { useState } from 'react'
import { Wand2, MousePointer, Sparkles, Droplets, Check, X, Crown } from 'lucide-react'
import { CursorType, CURSOR_OPTIONS } from './CursorSwitcher'
import { celestialAudio } from '../../audio/celestialSynth'

interface FloatingCursorControlProps {
  currentCursor: CursorType
  onSelectCursor: (cursor: CursorType) => void
}

export const FloatingCursorControl: React.FC<FloatingCursorControlProps> = ({
  currentCursor,
  onSelectCursor,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (id: CursorType) => {
    celestialAudio.playChime(880, 0.12)
    onSelectCursor(id)
    setIsOpen(false)
  }

  const currentOption = CURSOR_OPTIONS.find((c) => c.id === currentCursor) || CURSOR_OPTIONS[0]
  const CurrentIcon = currentOption.icon

  return (
    <div className="fixed bottom-5 right-5 z-[80] select-none">
      {/* Botão Flutuante Principal Apple Glass */}
      <button
        onClick={() => {
          celestialAudio.playSoftClick()
          setIsOpen(!isOpen)
        }}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border transition-all duration-300 shadow-2xl backdrop-blur-2xl group ${
          isOpen
            ? 'bg-[#ffd60a] text-black border-[#ffd60a] scale-105 shadow-[0_0_25px_rgba(255,214,10,0.4)]'
            : currentCursor === 'padrao'
            ? 'bg-[#16161c]/85 hover:bg-[#202028] border-white/15 text-[#d2d2d7] hover:text-white shadow-black/80'
            : 'bg-[#ffd60a]/20 hover:bg-[#ffd60a]/30 border-[#ffd60a]/50 text-[#ffd60a] shadow-[0_0_15px_rgba(255,214,10,0.25)]'
        }`}
        title="Personalizar Efeito do Cursor"
      >
        <span className="relative flex items-center justify-center">
          <CurrentIcon className="w-4 h-4 transition-transform group-hover:rotate-12" />
          {currentCursor !== 'padrao' && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ffd60a] animate-ping" />
          )}
        </span>
        <span className="text-xs font-bold tracking-tight">
          {isOpen ? 'Fechar Opções' : currentCursor === 'padrao' ? 'Cursor & Efeitos' : currentOption.name.split(' (')[0]}
        </span>
        <Wand2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-14 right-0 z-50 w-80 rounded-3xl bg-[#141418]/98 border border-white/15 p-3.5 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Cabeçalho */}
            <div className="px-2 pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-black text-white">
                  <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
                  <span>Escolha o Estilo do Cursor</span>
                </div>
                <p className="text-[10px] text-[#86868b] mt-0.5">
                  Deixe no padrão limpo ou ative um toque de magia
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-[#86868b] hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Lista de Opções */}
            <div className="space-y-1.5">
              {CURSOR_OPTIONS.map((opt) => {
                const Icon = opt.icon
                const isSelected = opt.id === currentCursor
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className={`w-full flex items-start justify-between p-3 rounded-2xl text-left transition-all ${
                      isSelected
                        ? 'bg-[#ffd60a] text-black shadow-lg shadow-[#ffd60a]/20 scale-[1.01]'
                        : 'text-[#d2d2d7] hover:bg-white/[0.08] hover:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-xl mt-0.5 ${isSelected ? 'bg-black/15 text-black' : 'bg-white/5 text-[#ffd60a]'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[12px] font-bold flex items-center gap-1.5">
                          <span>{opt.name}</span>
                          {opt.badge && (
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                              isSelected ? 'bg-black text-white' : 'bg-[#ffd60a]/20 text-[#ffd60a] border border-[#ffd60a]/30'
                            }`}>
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className={`text-[10px] mt-0.5 leading-snug ${isSelected ? 'text-black/80 font-medium' : 'text-[#86868b]'}`}>
                          {opt.desc}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-black shrink-0 mt-1.5" />}
                  </button>
                )
              })}
            </div>

            {/* Rodapé informativo */}
            <div className="mt-3 pt-2.5 border-t border-white/10 px-2 text-center">
              <p className="text-[9px] text-[#86868b]">
                ✨ Dica: Você pode mudar ou desligar a qualquer momento.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default FloatingCursorControl
