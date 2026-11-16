import React from 'react'
import { ChevronRight, Crown, Sparkles } from 'lucide-react'

export const AppleRibbon: React.FC = () => {
  const handleScrollToLetter = () => {
    const el = document.getElementById('carta-pai')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#16161a] text-[#f5f5f7] border-b border-white/[0.08] py-2.5 px-4 text-center text-xs md:text-[13px] tracking-[-0.01em]">
      <div className="max-w-[1024px] mx-auto flex items-center justify-center flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 text-[#ffd60a] font-semibold">
          <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
          Celebração Oficial:
        </span>
        <span className="font-medium text-[#f5f5f7]">
          Alycia Manuele • 7 Anos de Amor e Luz
        </span>
        <button
          onClick={handleScrollToLetter}
          className="text-[#ffd60a] hover:underline inline-flex items-center gap-0.5 ml-1 font-medium group"
        >
          Ouvir mensagem especial do papai
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#ffd60a]" />
        </button>
      </div>
    </div>
  )
}
