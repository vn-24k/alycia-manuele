import React from 'react'
import { ChevronRight } from 'lucide-react'

export const AppleRibbon: React.FC = () => {
  const handleScrollToStory = () => {
    const el = document.getElementById('sete-anos')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#1d1d1f] text-[#f5f5f7] border-b border-white/[0.08] py-3 px-4 text-center text-xs md:text-[13px] tracking-[-0.01em]">
      <div className="max-w-[1024px] mx-auto flex items-center justify-center flex-wrap gap-1.5">
        <span className="text-[#86868b]">[Edição Especial]:</span>
        <span className="font-medium text-[#f5f5f7]">
          Alycia Manuele • 7 Anos
        </span>
        <button
          onClick={handleScrollToStory}
          className="text-[#2997ff] hover:underline inline-flex items-center gap-0.5 ml-1 font-normal group"
        >
          [Conhecer história]
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
