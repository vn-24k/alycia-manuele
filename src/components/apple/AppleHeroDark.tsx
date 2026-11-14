import React from 'react'
import { ChevronRight, Sparkles, Heart } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface AppleHeroDarkProps {
  heroImage: string
  onExploreClick: () => void
  onMemoriesClick: () => void
  onOpenPhotoModal: () => void
}

export const AppleHeroDark: React.FC<AppleHeroDarkProps> = ({
  heroImage,
  onExploreClick,
  onMemoriesClick,
  onOpenPhotoModal,
}) => {
  return (
    <section
      id="alycia-pro"
      className="relative min-h-[92vh] flex flex-col items-center justify-between bg-[#000000] text-[#f5f5f7] pt-16 pb-12 px-4 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Background Titanium Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2997ff]/10 via-[#bf5af2]/5 to-transparent blur-[120px] pointer-events-none -z-0" />

      {/* Top Text Content (Clean Placeholders) */}
      <div className="relative z-10 text-center max-w-[980px] mx-auto pt-6 flex flex-col items-center">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#a1a1a6] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
          [Alycia Manuele • 7 Anos de Luz]
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-[-0.035em] text-[#f5f5f7] leading-[1.05] mb-4">
          Alycia Manuele. <br className="hidden sm:inline" />
          [Frase de Destaque]
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#86868b] max-w-[680px] mx-auto tracking-[-0.015em] mb-7">
          [Subtítulo principal: uma mensagem marcante de apresentação sobre quem é Alycia aos 7 anos]
        </p>

        {/* Apple Action Buttons */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-sm md:text-[15px]">
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onExploreClick()
            }}
            className="apple-btn-primary px-5 py-2.5 shadow-lg shadow-[#0071e3]/20 hover:shadow-[#0071e3]/40"
          >
            [Botão Primário]
          </button>
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onMemoriesClick()
            }}
            className="apple-link-chevron group text-base md:text-[17px]"
          >
            [Link de Memórias]
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hero Product Frame */}
      <div className="relative z-10 w-full max-w-[1020px] mx-auto mt-10 mb-4 flex justify-center">
        <div
          className="relative group rounded-[36px] p-2 bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-700 hover:scale-[1.01]"
        >
          {/* Bezel & Glass Reflection */}
          <div className="relative rounded-[30px] overflow-hidden bg-[#161617] border border-white/10 aspect-[16/10] sm:aspect-[21/11] max-w-[880px] max-h-[500px] flex items-center justify-center">
            <img
              src={heroImage}
              alt="Alycia Manuele"
              className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-transparent to-black/30 pointer-events-none" />

            {/* Bottom In-Frame Badge */}
            <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-xs text-white/90">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]" />
                <span className="font-medium tracking-tight">[7 Anos • 2.556 dias de amor]</span>
              </div>
              <button
                onClick={onOpenPhotoModal}
                className="hidden sm:inline-flex items-center gap-1 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 transition-colors text-[11px]"
              >
                Trocar Foto Principal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Specs Ticker (Placeholders) */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 max-w-[800px] mx-auto pt-6 text-center border-t border-white/[0.06] w-full">
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7]">7 Anos</div>
          <div className="text-xs text-[#86868b] mt-0.5">[Métrica 1]</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#2997ff]">100%</div>
          <div className="text-xs text-[#86868b] mt-0.5">[Métrica 2]</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7]">Infinito</div>
          <div className="text-xs text-[#86868b] mt-0.5">[Métrica 3]</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#30d158]">Sempre</div>
          <div className="text-xs text-[#86868b] mt-0.5">[Métrica 4]</div>
        </div>
      </div>
    </section>
  )
}
