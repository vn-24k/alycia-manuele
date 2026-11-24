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
        {/* CARD 1 (DARK) — A PRINCESA ESTUDIOSA */}
        <div className="apple-promo-card bg-[#161617] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.08] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#ffd60a] mb-2 flex items-center gap-1">
              <Palette className="w-3.5 h-3.5" />
              Dedicação & Futuro • Estudos
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              A Princesa Estudiosa.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              O brilho nos olhos da garotinha que ama aprender. Cadernos, livros e uma inteligência admirável que enche o coração do papai de orgulho.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#ffd60a] text-black hover:bg-[#ff9f0a]"
              >
                Ver Momentos
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron text-xs sm:text-sm text-[#ffd60a]"
              >
                Explorar Conquistas <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
            <img
              src="/photos/alycia_foto_3.webp"
              alt="Alycia Estudando"
              className="w-full h-full object-cover object-top filter brightness-[0.98]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARD 2 (LIGHT) — O SORRISO ENCANTADO */}
        <div className="apple-promo-card bg-[#f5f5f7] text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.06] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#0071e3] mb-2 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              Alegria Pura • O Som da Felicidade
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              O Sorriso Mais Doce.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              Uma gargalhada pura que tem o poder divino de transformar qualquer cansaço em serenidade e afeto genuíno.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={handlePlayGiggle}
                className={`apple-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 ${
                  isPlayingGiggle ? 'bg-[#30d158]' : ''
                }`}
              >
                <Volume2 className="w-3 h-3" />
                {isPlayingGiggle ? 'Tocando Harpa Celeste...' : 'Ouvir Sons Mágicos'}
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron-dark text-xs sm:text-sm"
              >
                Ver Lembranças <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 border border-black/10 group-hover:scale-105 transition-transform duration-700 shadow-xl">
            <img
              src="/photos/alycia_foto_recente_2.webp"
              alt="Sorriso de Alycia"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARD 3 (LIGHT) — A GUITARRA ENCANTADA */}
        <div className="apple-promo-card bg-[#fbfbfd] text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.06] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#ff375f] mb-2 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              Música & Atitude • O Quarto dos Sonhos
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              A Rockstar do Papai.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              Segurando a guitarra com postura de artista e aquela faísca nos olhos de quem nasceu para brilhar em qualquer palco da vida.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#ff375f] hover:bg-[#e02850]"
              >
                Ver o Talento
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron-dark text-xs sm:text-sm"
              >
                Explorar Galeria <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-200 border border-black/10 group-hover:scale-105 transition-transform duration-700 shadow-xl">
            <img
              src="/photos/alycia_foto_4.webp"
              alt="Alycia com a Guitarra"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARD 4 (DARK) — 3D INTERATIVO */}
        <div
          id="galeria-3d"
          className="apple-promo-card bg-gradient-to-br from-[#121217] to-[#07070a] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.1] relative group overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#bf5af2] mb-2 flex items-center gap-1">
              <Box className="w-3.5 h-3.5" />
              Mundo Interativo • Frequência Sagrada
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              O Cubo da Princesa.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              Gire em 3D e contemple as facetas sagradas de Alycia Manuele que iluminam a vida do papai.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => {
                  setCubeRotation((prev) => ({ x: prev.x + 45, y: prev.y + 90 }))
                  celestialAudio.playChime(700, 0.08)
                }}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#bf5af2] hover:bg-[#a344d6]"
              >
                Girar Cubo Mágico
              </button>
              <button
                onClick={onScrollTo3D}
                className="apple-link-chevron text-xs sm:text-sm text-[#bf5af2]"
              >
                Explorar Ângulos <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Cube */}
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
                <div className="text-xs font-bold text-white">7 Aninhos</div>
                <div className="text-[10px] text-white/70">O Grande Marco</div>
              </div>
              {/* Back Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ff375f]/40 to-[#ffd60a]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(180deg) translateZ(70px)' }}
              >
                <Heart className="w-6 h-6 text-[#ff375f] mb-1" />
                <div className="text-xs font-bold text-white">Amor Infinito</div>
                <div className="text-[10px] text-white/70">Coração de Pai</div>
              </div>
              {/* Left Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#30d158]/40 to-[#2997ff]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(-90deg) translateZ(70px)' }}
              >
                <Box className="w-6 h-6 text-[#30d158] mb-1" />
                <div className="text-xs font-bold text-white">Sabedoria</div>
                <div className="text-[10px] text-white/70">Estudiosa & Nobre</div>
              </div>
              {/* Right Face */}
              <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#ffd60a]/40 to-[#ff9f0a]/40 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center shadow-xl"
                style={{ transform: 'rotateY(90deg) translateZ(70px)' }}
              >
                <Volume2 className="w-6 h-6 text-[#ffd60a] mb-1" />
                <div className="text-xs font-bold text-white">Alegria Pura</div>
                <div className="text-[10px] text-white/70">Luz da Vida</div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 5 (DARK) — PAPAI & ALYCIA: ELO SAGRADO */}
        <div className="apple-promo-card bg-[#111114] text-[#f5f5f7] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-white/[0.08] relative group overflow-hidden">
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#64d2ff] mb-2 flex items-center gap-1">
              <Heart className="w-3.5 h-3.5" />
              Aliança Sagrada • Pai & Filha
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#f5f5f7]">
              Papai & Alycia: Elo Eterno.
            </h3>
            <p className="text-sm sm:text-base text-[#86868b] max-w-[420px] mb-4">
              Um laço inquebrável que ultrapassa qualquer distância física. A certeza de que onde quer que você esteja, o papai estará zelando por você.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToStreamer}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#0071e3]"
              >
                Ver Nossa História
              </button>
              <button
                onClick={onScrollToStreamer}
                className="apple-link-chevron text-xs sm:text-sm text-[#64d2ff]"
              >
                Explorar Memórias <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
            <img
              src="/photos/alycia_foto_recente_1.webp"
              alt="Papai Vinícius e Alycia Manuele"
              className="w-full h-full object-cover object-top filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>

        {/* CARD 6 (LIGHT) — CARTA DO PAPAI */}
        <div
          id="carta-card"
          className="apple-promo-card bg-white text-[#1d1d1f] min-h-[540px] p-8 sm:p-12 flex flex-col justify-between border border-black/[0.08] relative group overflow-hidden shadow-xl"
        >
          <div className="relative z-10 text-center flex flex-col items-center">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#ff375f] mb-2 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Dedicatória Sagrada • Escrita com a Alma
            </span>
            <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-2 text-[#1d1d1f]">
              Carta do Papai Vinícius.
            </h3>
            <p className="text-sm sm:text-base text-[#6e6e73] max-w-[420px] mb-4">
              Palavras sinceras de proteção, blindagem espiritual e amor incondicional para guardar para sempre no coração.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={onScrollToLetter}
                className="apple-btn-primary px-4 py-1.5 text-xs bg-[#ff375f] hover:bg-[#e02850]"
              >
                Ler Carta Completa
              </button>
              <button
                onClick={onScrollToLetter}
                className="apple-link-chevron-dark text-xs sm:text-sm text-[#ff375f]"
              >
                Abrir Dedicatória <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="relative z-0 mt-6 mx-auto w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-black/10 group-hover:scale-105 transition-transform duration-700 shadow-xl">
            <img
              src="/photos/alycia_foto_recente_2.webp"
              alt="Carta do Papai para Alycia"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
