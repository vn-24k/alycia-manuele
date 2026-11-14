import React, { useState } from 'react'
import { ChevronRight, Palette, Volume2, Heart, Box, HelpCircle, BookOpen, Sparkles } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface ApplePromoGridProps {
  onScrollTo3D: () => void
  onScrollToLetter: () => void
  onScrollToStreamer: () => void
}

export const ApplePromoGrid: React.FC<ApplePromoGridProps> = ({
  onScrollTo3D,
  onScrollToLetter,
  onScrollToStreamer,
}) => {
  const [isPlayingGiggle, setIsPlayingGiggle] = useState(false)
  const [cubeRotation, setCubeRotation] = useState({ x: 15, y: 25 })

  const handlePlayGiggle = () => {
    setIsPlayingGiggle(true)
    celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5, 1318.51])
    setTimeout(() => setIsPlayingGiggle(false), 1200)
  }

  return (
    <section id="promo-grid" className="bg-[#000000] py-4 px-3 sm:px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* CARD 1 (DARK) — Estúdio de Arte */}
        <div className="apple-promo-card bg-[#161617] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.08] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#f56300] mb-2 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5" />
              Estúdio de Arte
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              Criatividade Infinita.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              Pinturas, desenhos e cores vibrantes que dão vida a universos inteiros saídos da imaginação.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs"
              >
                Saiba mais
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron text-xs sm:text-sm"
              >
                Ver obras <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[480px] aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop"
              alt="Estúdio de Arte e Pintura"
              className="w-full h-full object-cover filter brightness-95"
            />
          </div>
        </div>

        {/* CARD 2 (LIGHT) — Gargalhada Mágica */}
        <div className="apple-promo-card bg-[#f5f5f7] text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.06] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#0071e3] mb-2 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Gargalhada Mágica
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              Alegria Pura.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              O som mais contagiante da casa. Toca o coração de quem estiver por perto e renova as energias.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={handlePlayGiggle}
                className={`apple-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 ${
                  isPlayingGiggle ? 'bg-[#30d158]' : ''
                }`}
              >
                <Volume2 className="w-3 h-3" />
                {isPlayingGiggle ? 'Tocando encanto...' : 'Ouvir alegria'}
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron-dark text-xs sm:text-sm"
              >
                Assistir momentos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[480px] aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200 border border-black/10 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop"
              alt="Gargalhada e alegria de Alycia"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CARD 3 (LIGHT) — Amor aos Animais & Natureza */}
        <div className="apple-promo-card bg-[#fbfbfd] text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.06] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#34c759] mb-2 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              Amor aos Animais & Natureza
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              Sensibilidade & Cuidado.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              Cuidado compassivo com cada bichinho, florzinha e elemento vivo da natureza.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#34c759] hover:bg-[#2db84e]"
              >
                Saiba mais
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron-dark text-xs sm:text-sm"
              >
                Ver fotografias <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[480px] aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200 border border-black/10 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=900&auto=format&fit=crop"
              alt="Carinho com animais e natureza"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CARD 4 (DARK) — O Cubo Tridimensional Interativo (3D Real do Arsenal) */}
        <div
          id="galeria-3d"
          className="apple-promo-card bg-gradient-to-br from-[#121217] to-[#07070a] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.1] relative group overflow-hidden"
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#bf5af2] mb-2 flex items-center gap-1">
              <Box className="w-3.5 h-3.5" />
              Experiência 3D Interativa
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              O Cubo de Alycia.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              Gire e interaja com os 6 ângulos da personalidade de uma garotinha brilhante.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => {
                  setCubeRotation((prev) => ({ x: prev.x + 45, y: prev.y + 90 }))
                  celestialAudio.playChime(700, 0.08)
                }}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#bf5af2] hover:bg-[#a344d6]"
              >
                Girar Cubo
              </button>
              <button
                onClick={onScrollTo3D}
                className="apple-link-chevron text-xs sm:text-sm text-[#bf5af2]"
              >
                Ver todos os ângulos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Perspective Visual */}
          <div
            className="relative z-0 mt-6 mx-auto w-full max-w-[340px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientY - rect.top) / rect.height - 0.5) * -40
              const y = ((e.clientX - rect.left) / rect.width - 0.5) * 40
              setCubeRotation({ x, y })
            }}
          >
            <div
              className="w-36 h-36 sm:w-44 sm:h-44 relative transition-transform duration-200"
              style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(600px) rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`,
              }}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2997ff]/40 to-[#bf5af2]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'translateZ(70px)' }}
              >
                <Sparkles className="w-6 h-6 text-[#2997ff] mb-1" />
                <div className="text-xs font-bold text-white">Criativa</div>
                <div className="text-[10px] text-white/70">7 Anos</div>
              </div>
              {/* Back Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff375f]/40 to-[#ffd60a]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(180deg) translateZ(70px)' }}
              >
                <Heart className="w-6 h-6 text-[#ff375f] mb-1" />
                <div className="text-xs font-bold text-white">Amorosa</div>
                <div className="text-[10px] text-white/70">100% Afeto</div>
              </div>
              {/* Left Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#30d158]/40 to-[#2997ff]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(-90deg) translateZ(70px)' }}
              >
                <Box className="w-6 h-6 text-[#30d158] mb-1" />
                <div className="text-xs font-bold text-white">Curiosa</div>
                <div className="text-[10px] text-white/70">Exploradora</div>
              </div>
              {/* Right Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ffd60a]/40 to-[#ff9f0a]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(90deg) translateZ(70px)' }}
              >
                <Volume2 className="w-6 h-6 text-[#ffd60a] mb-1" />
                <div className="text-xs font-bold text-white">Alegre</div>
                <div className="text-[10px] text-white/70">Gargalhada</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5 (DARK) — Mente Curiosa & Astronomia */}
        <div className="apple-promo-card bg-[#111114] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.08] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#64d2ff] mb-2 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Mente Brilhante
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              Curiosidade Cósmica.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              Perguntas fascinantes sobre o universo, constelações, dinossauros e como o mundo gira.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#0071e3]"
              >
                Saiba mais
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron text-xs sm:text-sm text-[#64d2ff]"
              >
                Ver descobertas <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[480px] aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=900&auto=format&fit=crop"
              alt="Curiosidade sobre o céu e o universo"
              className="w-full h-full object-cover filter brightness-90"
            />
          </div>
        </div>

        {/* CARD 6 (LIGHT) — Carta do Papai */}
        <div
          id="carta-card"
          className="apple-promo-card bg-white text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.08] relative group overflow-hidden shadow-sm"
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#ff375f] mb-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Dedicatória Oficial
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              Carta do Papai.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              Uma declaração de amor incondicional, admiração e promessa de proteção para todos os dias da sua vida.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToLetter}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#ff375f] hover:bg-[#e02850]"
              >
                Ler carta na íntegra
              </button>
              <button
                onClick={onScrollToLetter}
                className="apple-link-chevron-dark text-xs sm:text-sm text-[#ff375f]"
              >
                Abrir dedicatória <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[480px] aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop"
              alt="Abraço entre pai e filha"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
