import React from 'react'
import { ChevronRight, Calendar, Star } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface AppleHeroLightProps {
  onScrollToMemories: () => void
  onScrollToCards: () => void
}

export const AppleHeroLight: React.FC<AppleHeroLightProps> = ({
  onScrollToMemories,
  onScrollToCards,
}) => {
  return (
    <section
      id="sete-anos"
      className="relative min-h-[92vh] flex flex-col items-center justify-between bg-[#f5f5f7] text-[#1d1d1f] pt-20 pb-16 px-4 overflow-hidden border-b border-black/[0.08]"
    >
      {/* Top Headline Hierarchy (Clean Placeholders) */}
      <div className="relative z-10 text-center max-w-[960px] mx-auto flex flex-col items-center">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#6e6e73] mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#0071e3]" />
          [Linha do Tempo • De 2017 a 2024]
        </span>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.035em] text-[#1d1d1f] leading-[1.05] mb-4">
          [Título da Trajetória] <br />
          [Sub-manchete dos 7 Anos]
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#6e6e73] max-w-[660px] mx-auto tracking-[-0.015em] mb-7">
          [Texto explicativo sobre o crescimento, momentos inesquecíveis e a evolução de Alycia]
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-sm md:text-[15px]">
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onScrollToCards()
            }}
            className="apple-btn-primary px-5 py-2.5 shadow-md hover:shadow-lg"
          >
            [Explorar marcos]
          </button>
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onScrollToMemories()
            }}
            className="apple-link-chevron-dark group text-base md:text-[17px]"
          >
            [Ver galeria]
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Triple Milestone Displays (Clean Placeholders) */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Milestone 1 */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
          <div>
            <div className="text-xs uppercase font-semibold text-[#86868b] tracking-wider mb-2">
              [Fase 01 • Primeiros Anos]
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              [Título da Fase 1]
            </h3>
            <p className="text-sm text-[#6e6e73] leading-relaxed">
              [Descrição detalhada dos primeiros momentos, risadas e descobertas iniciais]
            </p>
          </div>
          <div className="mt-6 rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800&auto=format&fit=crop"
              alt="Primeiros anos"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Milestone 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-black/[0.04] flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
          <div>
            <div className="text-xs uppercase font-semibold text-[#86868b] tracking-wider mb-2">
              [Fase 02 • Crescimento & Infância]
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              [Título da Fase 2]
            </h3>
            <p className="text-sm text-[#6e6e73] leading-relaxed">
              [Descrição dos aprendizados, brincadeiras, criatividade e desenvolvimento de Alycia]
            </p>
          </div>
          <div className="mt-6 rounded-xl overflow-hidden aspect-[4/3] bg-neutral-100">
            <img
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop"
              alt="Crescimento e imaginação"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Milestone 3 (Highlight - 7 Anos) */}
        <div className="bg-gradient-to-br from-[#1d1d1f] to-[#000000] text-white rounded-[24px] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.18)] flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-300">
          <div>
            <div className="text-xs uppercase font-semibold text-[#2997ff] tracking-wider mb-2 flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#2997ff]" />
              [Marco Atual • 7 Anos]
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-white mb-2">
              [Título do Marco dos 7 Anos]
            </h3>
            <p className="text-sm text-[#a1a1a6] leading-relaxed">
              [Celebração especial de como ela é hoje: alegre, inteligente e amada por toda a família]
            </p>
          </div>
          <div className="mt-6 rounded-xl overflow-hidden aspect-[4/3] bg-neutral-900 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop"
              alt="Alycia comemorando 7 anos"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
