import React from 'react'
import { Sparkles, Heart, Zap, Smile, ChevronRight, ShieldCheck } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface AppleHeroVioletProps {
  onScrollTo3D: () => void
  onScrollToPromo: () => void
}

export const AppleHeroViolet: React.FC<AppleHeroVioletProps> = ({
  onScrollTo3D,
  onScrollToPromo,
}) => {
  const SUPERPOWERS = [
    {
      icon: Smile,
      color: '#ffd60a',
      title: 'Sorriso que Ilumina',
      desc: 'Capaz de transformar qualquer dia cinzento em uma celebração imediata de alegria pura.',
    },
    {
      icon: Zap,
      color: '#bf5af2',
      title: 'Curiosidade Quântica',
      desc: 'Perguntas geniais sobre como as coisas funcionam, estrelas no céu e segredos da natureza.',
    },
    {
      icon: Heart,
      color: '#ff375f',
      title: 'Coração Nobre & Afeto',
      desc: 'Uma generosidade espontânea e o cuidado protetor com amigos, animais e a família.',
    },
    {
      icon: ShieldCheck,
      color: '#30d158',
      title: 'Espírito Valente',
      desc: 'Coragem para experimentar o novo, aprender rápido e encarar cada desafio de cabeça erguida.',
    },
  ]

  return (
    <section
      id="superpoderes"
      className="relative min-h-[90vh] flex flex-col items-center justify-between bg-[#08080c] text-[#f5f5f7] pt-20 pb-16 px-4 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Background Cosmic Violet Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#bf5af2]/15 via-[#5e5ce6]/10 to-transparent blur-[130px] pointer-events-none -z-0" />

      {/* Top Headline Hierarchy */}
      <div className="relative z-10 text-center max-w-[960px] mx-auto flex flex-col items-center">
        <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#bf5af2] mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#bf5af2]" />
          Virtudes & Superpoderes
        </span>

        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-bold tracking-[-0.035em] text-[#f5f5f7] leading-[1.05] mb-4">
          A imaginação não tem limites.
        </h2>

        <p className="text-lg sm:text-xl md:text-2xl font-normal text-[#86868b] max-w-[680px] mx-auto tracking-[-0.015em] mb-7">
          Uma mente curiosa combinada com uma doçura natural. Descubra os dons especiais que fazem de Alycia Manuele uma garota única.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-5 flex-wrap justify-center text-sm md:text-[15px]">
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onScrollToPromo()
            }}
            className="apple-btn-primary px-5 py-2.5 bg-[#bf5af2] hover:bg-[#a344d6] shadow-lg shadow-[#bf5af2]/20"
          >
            Ver destaques
          </button>
          <button
            onClick={() => {
              celestialAudio.playSoftClick()
              onScrollTo3D()
            }}
            className="apple-link-chevron group text-base md:text-[17px] text-[#bf5af2]"
          >
            Interagir no Cubo 3D
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Apple 4-Up Superpower Glass Grid */}
      <div className="relative z-10 w-full max-w-[1080px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SUPERPOWERS.map((power, idx) => {
          const Icon = power.icon
          return (
            <div
              key={idx}
              onMouseEnter={() => celestialAudio.playChime(600 + idx * 120, 0.05)}
              className="rounded-[24px] p-6 bg-[#16161a] border border-white/[0.08] hover:border-white/[0.22] hover:bg-[#1e1e24] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${power.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: power.color }} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white mb-2">
                  {power.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#86868b] leading-relaxed">
                  {power.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#86868b]">
                <span>Superpoder #{idx + 1}</span>
                <span className="text-[#bf5af2] font-medium group-hover:translate-x-1 transition-transform">
                  Ativo &rarr;
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
