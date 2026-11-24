import React, { useState, useEffect } from 'react'
import {
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Heart,
  ChevronDown,
  ChevronUp,
  Disc3,
  Feather,
  Crown,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface EnchantedMusicBoxProps {
  onScrollToLetter: () => void
}

export const EnchantedMusicBox: React.FC<EnchantedMusicBoxProps> = ({ onScrollToLetter }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false)
  const [isPlayingMelody, setIsPlayingMelody] = useState(false)
  const [currentTrackName, setCurrentTrackName] = useState<string>('Melodia Celestial das Estrelas')

  useEffect(() => {
    const onMelodyStarted = (e: Event) => {
      const custom = e as CustomEvent<{ track?: string }>
      setIsPlayingMelody(true)
      setIsPlayingAmbient(false)
      setCurrentTrackName(custom.detail?.track || 'Parabéns Pra Você (Caixinha de Cristal)')
    }

    const onMelodyEnded = () => {
      setIsPlayingMelody(false)
      setCurrentTrackName('Pronto para Tocar')
    }

    const onAudioStopped = () => {
      setIsPlayingAmbient(false)
      setIsPlayingMelody(false)
      setCurrentTrackName('Pausado')
    }

    window.addEventListener('celestial-melody-started', onMelodyStarted)
    window.addEventListener('celestial-melody-ended', onMelodyEnded)
    window.addEventListener('celestial-audio-stopped', onAudioStopped)

    return () => {
      window.removeEventListener('celestial-melody-started', onMelodyStarted)
      window.removeEventListener('celestial-melody-ended', onMelodyEnded)
      window.removeEventListener('celestial-audio-stopped', onAudioStopped)
    }
  }, [])

  const toggleAmbient = () => {
    celestialAudio.playSoftClick()
    if (isPlayingAmbient) {
      celestialAudio.stopAmbientArpeggio()
      setIsPlayingAmbient(false)
      setCurrentTrackName('Pausado')
    } else {
      celestialAudio.enableAudio()
      celestialAudio.stopMelody()
      setIsPlayingMelody(false)
      celestialAudio.startAmbientArpeggio()
      setIsPlayingAmbient(true)
      setCurrentTrackName('Harpa & Sinos Celestiais')
    }
  }

  const playBirthdaySong = () => {
    celestialAudio.enableAudio()
    celestialAudio.stopAmbientArpeggio()
    setIsPlayingAmbient(false)
    celestialAudio.playHappyBirthdayMelody()
    setIsPlayingMelody(true)
    setCurrentTrackName('Parabéns Pra Você (Caixinha de Cristal)')
  }

  const stopAllAudio = () => {
    celestialAudio.stopAll()
    setIsPlayingAmbient(false)
    setIsPlayingMelody(false)
    setCurrentTrackName('Pausado')
  }

  const handleOpenLetter = () => {
    celestialAudio.stopAll()
    setIsPlayingAmbient(false)
    setIsPlayingMelody(false)
    setCurrentTrackName('Voz do Papai (Carta Sagrada)')
    setIsOpen(false)
    onScrollToLetter()

    // Dispara a reprodução sincronizada da voz do papai logo após a rolagem suave
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('play-father-letter'))
    }, 450)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* PAINEL EXPANSÍVEL ESTILO APPLE MUSIC / DYNAMIC ISLAND */}
      {isOpen && (
        <div className="mb-3 w-[310px] sm:w-[340px] rounded-3xl bg-[#120f18]/95 border border-[#ffd60a]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_25px_rgba(255,214,10,0.15)] backdrop-blur-2xl p-4 text-[#f5f5f7] animate-fadeIn transition-all">
          {/* Topo do Card */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#ffd60a] to-[#ff375f] flex items-center justify-center shadow-[0_0_10px_rgba(255,214,10,0.5)]">
                <Music className="w-3.5 h-3.5 text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-white flex items-center gap-1">
                  Caixinha de Música
                  <Crown className="w-3 h-3 text-[#ffd60a]" />
                </span>
                <p className="text-[10px] text-[#ffd60a] font-medium">Reino de Alycia</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#a1a1a6] hover:text-white hover:bg-white/[0.08] transition-colors"
              title="Recolher"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Faixa em Reprodução */}
          <div className="my-3 p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl bg-gradient-to-tr from-[#bf5af2] to-[#ffd60a] flex items-center justify-center flex-shrink-0 ${
                isPlayingAmbient || isPlayingMelody ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '6s' }}
            >
              <Disc3 className="w-5 h-5 text-black" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] uppercase tracking-wider text-[#a1a1a6] font-semibold block">
                {isPlayingAmbient || isPlayingMelody ? 'Em Sintonia Mágica' : 'Pronto para Tocar'}
              </span>
              <p className="text-[12px] font-semibold text-white truncate">{currentTrackName}</p>
            </div>
          </div>

          {/* Botões de Ação Musical */}
          <div className="space-y-2">
            {/* 1. Trilha Celestial de Harpa */}
            <button
              onClick={toggleAmbient}
              type="button"
              className={`w-full py-2.5 px-3.5 rounded-xl text-[12px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                isPlayingAmbient
                  ? 'bg-[#ffd60a] text-black shadow-[0_0_15px_rgba(255,214,10,0.4)]'
                  : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.08]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#ffd60a]" />
                {isPlayingAmbient ? 'Pausar Harpa Celestial' : 'Tocar Harpa Celestial'}
              </span>
              {isPlayingAmbient ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* 2. Parabéns Pra Você na Caixinha de Cristal */}
            <button
              onClick={playBirthdaySong}
              type="button"
              className="w-full py-2.5 px-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-[12px] font-semibold flex items-center justify-between transition-all border border-white/[0.08] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-[#ff375f]" />
                Parabéns de Cristal (7 Anos)
              </span>
              <Play className="w-3.5 h-3.5 text-[#ffd60a]" />
            </button>

            {/* 3. Atalho Direto para a Voz do Papai (Carta Editorial) */}
            <button
              onClick={handleOpenLetter}
              type="button"
              className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#ff375f]/20 to-[#ffd60a]/20 hover:from-[#ff375f]/30 hover:to-[#ffd60a]/30 border border-[#ff375f]/30 text-white text-[12px] font-semibold flex items-center justify-between transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Feather className="w-3.5 h-3.5 text-[#ff375f]" />
                Ouvir Áudio do Papai (Carta)
              </span>
              <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]" />
            </button>

            {(isPlayingAmbient || isPlayingMelody) && (
              <button
                onClick={stopAllAudio}
                type="button"
                className="w-full py-1.5 text-[11px] text-[#a1a1a6] hover:text-white transition-colors"
              >
                Silenciar Caixinha
              </button>
            )}
          </div>
        </div>
      )}

      {/* BOTÃO PRINCIPAL FLUTUANTE (PILL MÁGICO) */}
      <button
        onClick={() => {
          celestialAudio.playSoftClick()
          setIsOpen(!isOpen)
        }}
        type="button"
        title="Abrir Caixinha de Música Encantada"
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1c1826] via-[#120f18] to-[#1c1826] border border-[#ffd60a]/40 shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,214,10,0.25)] hover:border-[#ffd60a] text-white text-[13px] font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
      >
        <span className="relative flex items-center justify-center">
          <Music
            className={`w-4 h-4 text-[#ffd60a] ${
              isPlayingAmbient || isPlayingMelody ? 'animate-bounce' : 'group-hover:rotate-12'
            } transition-transform`}
          />
          {(isPlayingAmbient || isPlayingMelody) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ff375f] animate-ping" />
          )}
        </span>
        <span className="hidden sm:inline font-medium">Caixinha Encantada</span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#a1a1a6]" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#a1a1a6]" />
        )}
      </button>
    </div>
  )
}
