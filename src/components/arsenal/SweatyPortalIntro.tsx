import React, { useEffect, useState } from 'react'
import { Sparkles, Crown, Heart, Star, ChevronRight } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface SweatyPortalIntroProps {
  onComplete?: () => void
}

export const SweatyPortalIntro: React.FC<SweatyPortalIntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsRevealed(true)
            celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5, 1318.51])
            setTimeout(() => {
              setIsDismissed(true)
              onComplete?.()
            }, 1200)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 25)

    return () => clearInterval(timer)
  }, [onComplete])

  if (isDismissed) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07070a] text-white overflow-hidden transition-all duration-1000 ${
        isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        clipPath: isRevealed
          ? 'circle(150% at 50% 50%)'
          : 'circle(100% at 50% 50%)',
      }}
    >
      {/* Background Starlight & Auroral Glow */}
      <div className="absolute inset-0 bg-radial from-[#bf5af2]/20 via-[#2997ff]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Floating Fairy-tale Items (sweaty-shop-loading physics) */}
      <div
        className={`absolute top-1/4 left-1/4 transition-all duration-1000 ease-out ${
          isRevealed ? '-translate-x-[40vw] -translate-y-[40vh] rotate-[-45deg] scale-50 opacity-0' : 'translate-x-0 translate-y-0 rotate-[-12deg]'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ffd60a]/20 border border-[#ffd60a]/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#ffd60a]/20">
          <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-[#ffd60a]" />
        </div>
      </div>

      <div
        className={`absolute top-1/4 right-1/4 transition-all duration-1000 ease-out ${
          isRevealed ? 'translate-x-[40vw] -translate-y-[40vh] rotate-[45deg] scale-50 opacity-0' : 'translate-x-0 translate-y-0 rotate-[15deg]'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#64d2ff]/20 border border-[#64d2ff]/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#64d2ff]/20">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#64d2ff]" />
        </div>
      </div>

      <div
        className={`absolute bottom-1/4 left-1/4 transition-all duration-1000 ease-out ${
          isRevealed ? '-translate-x-[40vw] translate-y-[40vh] rotate-[30deg] scale-50 opacity-0' : 'translate-x-0 translate-y-0 rotate-[10deg]'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#ff375f]/20 border border-[#ff375f]/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#ff375f]/20">
          <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff375f] fill-[#ff375f]/50" />
        </div>
      </div>

      <div
        className={`absolute bottom-1/4 right-1/4 transition-all duration-1000 ease-out ${
          isRevealed ? 'translate-x-[40vw] translate-y-[40vh] rotate-[-30deg] scale-50 opacity-0' : 'translate-x-0 translate-y-0 rotate-[-15deg]'
        }`}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#30d158]/20 border border-[#30d158]/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#30d158]/20">
          <Star className="w-8 h-8 sm:w-10 sm:h-10 text-[#30d158] fill-[#30d158]/50" />
        </div>
      </div>

      {/* Center Portal Text and Counter */}
      <div className="relative z-10 text-center px-4 max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-[#ffd60a] uppercase mb-4 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          O Reino Encantado de Alycia
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">
          7 Anos de Magia
        </h1>

        <p className="text-sm text-[#86868b] mb-8">
          Preparando o reino das princesas, flocos de neve e grandes aventuras...
        </p>

        {/* Loading Bar & Counter */}
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#ffd60a] via-[#ff375f] to-[#2997ff] transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-[#86868b]">
          <span>Carregando encanto...</span>
          <span className="font-mono text-[#ffd60a] font-semibold">{progress}%</span>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setIsRevealed(true)
            setTimeout(() => {
              setIsDismissed(true)
              onComplete?.()
            }, 600)
          }}
          className="mt-8 text-xs text-[#86868b] hover:text-white transition-colors inline-flex items-center gap-1 group"
        >
          Entrar direto no reino
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}
