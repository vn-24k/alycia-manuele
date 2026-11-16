import React from 'react'
import { ChevronRight, Sparkles, Heart, Play, Crown, Star } from 'lucide-react'
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
      {/* Background Titanium & Golden Starlight Atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#ffd60a]/10 via-[#bf5af2]/10 to-transparent blur-[140px] pointer-events-none -z-0" />

      {/* Top Text Content (100% Real & Autoral) */}
      <div className="relative z-10 text-center max-w-[980px] mx-auto pt-6 flex flex-col items-center">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#ffd60a] mb-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] shadow-lg shadow-black/50">
          <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
          Alycia Manuele • Sete Anos de Pura Magia
        </span>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-[-0.035em] text-[#f5f5f7] leading-[1.05] mb-4">
          Alycia Manuele. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-[#ffd60a] to-[#ff9f0a] bg-clip-text text-transparent">
            Sete Anos Que Iluminam o Mundo.
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#a1a1a6] max-w-[700px] mx-auto tracking-[-0.015em] mb-7 leading-relaxed">
          A celebração oficial da princesa mais doce, inteligente e extraordinária do coração do papai. O amor que ensinou a amar com a alma.
        </p>

        {/* Action Buttons Monumentais */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-sm md:text-[15px]">
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onMemoriesClick()
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] text-black font-semibold shadow-xl shadow-[#ffd60a]/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
          >
            <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
            Ouvir a Voz do Papai
          </button>
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onExploreClick()
            }}
            className="apple-link-chevron group text-base md:text-[17px] text-[#ffd60a] hover:text-white"
          >
            Explorar os Reinos Encantados
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Hero Product Frame */}
      <div className="relative z-10 w-full max-w-[1020px] mx-auto mt-10 mb-4 flex justify-center">
        <div
          className="relative group rounded-[36px] p-2 bg-gradient-to-b from-[#ffd60a]/30 via-white/5 to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-700 hover:scale-[1.01]"
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
              <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
                <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]" />
                <span className="font-medium tracking-tight">Sete Anos • Amor Que Ultrapassa Qualquer Distância</span>
              </div>
              <button
                onClick={onOpenPhotoModal}
                className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 transition-colors text-[11px] text-white"
              >
                Trocar Foto Principal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker de Métricas de Afeto Reais */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 max-w-[840px] mx-auto pt-6 text-center border-t border-white/[0.08] w-full">
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ffd60a]">7 Anos</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">O Grande Marco</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white">100%</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Luz & Dedicação</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#ff375f]">Infinito</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Amor de Pai</div>
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#30d158]">Para Sempre</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Cuidado & Proteção</div>
        </div>
      </div>
    </section>
  )
}
