import React, { useState, useEffect, useRef } from 'react'
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
  RotateCcw,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface EnchantedMusicBoxProps {
  onScrollToLetter: () => void
}

export const EnchantedMusicBox: React.FC<EnchantedMusicBoxProps> = ({ onScrollToLetter }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlayingMusic, setIsPlayingMusic] = useState(false)
  const [isPlayingMelody, setIsPlayingMelody] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrackName, setCurrentTrackName] = useState<string>('MC Marks & MC Lele JP — Filho')

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration || 0)
    const handleEnded = () => {
      setIsPlayingMusic(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)

    // Listener para quando a voz do papai começar a tocar na carta (diminui volume para 15% ou pausa)
    const onFatherLetterPlay = () => {
      if (audio && !audio.paused) {
        audio.volume = 0.15 // ducking suave para destacar a voz de Vinicius
      }
    }

    // Listener para quando a voz do papai terminar na carta (restaura volume)
    const onFatherLetterEnd = () => {
      if (audio) {
        audio.volume = 0.9
      }
    }

    const onMelodyStarted = (e: Event) => {
      const custom = e as CustomEvent<{ track?: string }>
      if (audio && !audio.paused) {
        audio.pause()
        setIsPlayingMusic(false)
      }
      setIsPlayingMelody(true)
      setCurrentTrackName(custom.detail?.track || 'Parabéns Pra Você (Caixinha de Cristal)')
    }

    const onMelodyEnded = () => {
      setIsPlayingMelody(false)
      setCurrentTrackName('MC Marks & MC Lele JP — Filho')
    }

    window.addEventListener('play-father-letter', onFatherLetterPlay)
    window.addEventListener('father-letter-ended', onFatherLetterEnd)
    window.addEventListener('celestial-melody-started', onMelodyStarted)
    window.addEventListener('celestial-melody-ended', onMelodyEnded)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      window.removeEventListener('play-father-letter', onFatherLetterPlay)
      window.removeEventListener('father-letter-ended', onFatherLetterEnd)
      window.removeEventListener('celestial-melody-started', onMelodyStarted)
      window.removeEventListener('celestial-melody-ended', onMelodyEnded)
    }
  }, [])

  const togglePlayMusic = () => {
    celestialAudio.playSoftClick()
    const audio = audioRef.current
    if (!audio) return

    if (isPlayingMusic) {
      audio.pause()
      setIsPlayingMusic(false)
    } else {
      celestialAudio.stopMelody()
      setIsPlayingMelody(false)
      audio.volume = 0.9
      audio
        .play()
        .then(() => {
          setIsPlayingMusic(true)
          setCurrentTrackName('MC Marks & MC Lele JP — Filho')
        })
        .catch(() => {
          setIsPlayingMusic(false)
        })
    }
  }

  const playBirthdaySong = () => {
    const audio = audioRef.current
    if (audio && !audio.paused) {
      audio.pause()
      setIsPlayingMusic(false)
    }

    celestialAudio.enableAudio()
    celestialAudio.playHappyBirthdayMelody()
    setIsPlayingMelody(true)
    setCurrentTrackName('Parabéns Pra Você (Caixinha de Cristal)')
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const targetTime = Number(e.target.value)
    audio.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  const handleOpenLetter = () => {
    const audio = audioRef.current
    if (audio && !audio.paused) {
      audio.pause()
      setIsPlayingMusic(false)
    }

    celestialAudio.stopAll()
    setIsPlayingMelody(false)
    setCurrentTrackName('Voz do Papai (Carta Sagrada)')
    setIsOpen(false)
    onScrollToLetter()

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('play-father-letter'))
    }, 450)
  }

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec <= 0) return '0:00'
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Elemento de áudio nativo para a música do MC Marks */}
      <audio ref={audioRef} src="/audio/mc_marks_filho.mp3" preload="metadata" />

      {/* PAINEL EXPANSÍVEL ESTILO DYNAMIC ISLAND / APPLE MUSIC */}
      {isOpen && (
        <div className="mb-3 w-[310px] sm:w-[350px] rounded-3xl bg-[#120f18]/95 border border-[#ffd60a]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85),0_0_25px_rgba(255,214,10,0.2)] backdrop-blur-2xl p-4 text-[#f5f5f7] animate-fadeIn transition-all">
          {/* Topo do Card */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ffd60a] to-[#ff375f] flex items-center justify-center shadow-[0_0_12px_rgba(255,214,10,0.5)]">
                <Music className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="text-[12px] font-bold text-white flex items-center gap-1">
                  Trilha Sonora da Princesa
                  <Crown className="w-3 h-3 text-[#ffd60a]" />
                </span>
                <p className="text-[10px] text-[#ffd60a] font-medium">Amor de Pai & Filha</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-[#a1a1a6] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              title="Recolher"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Card da Música em Reprodução (Vinil Girando) */}
          <div className="my-3 p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] flex items-center justify-center flex-shrink-0 shadow-md ${
                isPlayingMusic ? 'animate-spin' : ''
              }`}
              style={{ animationDuration: '5s' }}
            >
              <Disc3 className="w-6 h-6 text-black" />
            </div>
            <div className="overflow-hidden flex-1">
              <span className="text-[9px] uppercase tracking-wider text-[#ffd60a] font-bold block">
                {isPlayingMusic ? 'Tocando Trilha Oficial' : isPlayingMelody ? 'Parabéns Mágico' : 'Trilha Selecionada'}
              </span>
              <p className="text-[12px] font-bold text-white truncate">{currentTrackName}</p>
              <p className="text-[10px] text-white/50 truncate">Dedicatória do Papai Vinícius</p>
            </div>
          </div>

          {/* Barra de Progresso do Áudio */}
          {isPlayingMusic && (
            <div className="mb-3 px-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-[#ffd60a]"
              />
              <div className="flex justify-between text-[10px] text-white/60 font-mono mt-1">
                <span>{formatSeconds(currentTime)}</span>
                <span>{formatSeconds(duration)}</span>
              </div>
            </div>
          )}

          {/* Botões de Ação Musical */}
          <div className="space-y-2">
            {/* 1. Botão Principal: MC Marks - Filho */}
            <button
              onClick={togglePlayMusic}
              type="button"
              className={`w-full py-2.5 px-3.5 rounded-xl text-[12px] font-bold flex items-center justify-between transition-all cursor-pointer shadow-md ${
                isPlayingMusic
                  ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] text-black shadow-[0_0_15px_rgba(255,214,10,0.4)]'
                  : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.1]'
              }`}
            >
              <span className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#ffd60a]" />
                {isPlayingMusic ? 'Pausar: MC Marks — Filho' : 'Tocar: MC Marks — Filho'}
              </span>
              {isPlayingMusic ? (
                <Pause className="w-4 h-4 text-black fill-black" />
              ) : (
                <Play className="w-4 h-4 text-[#ffd60a] fill-[#ffd60a]" />
              )}
            </button>

            {/* 2. Parabéns Pra Você na Caixinha de Cristal */}
            <button
              onClick={playBirthdaySong}
              type="button"
              className="w-full py-2 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-white text-[11px] font-semibold flex items-center justify-between transition-all border border-white/[0.06] cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Crown className="w-3.5 h-3.5 text-[#ff375f]" />
                Parabéns de Cristal (7 Anos)
              </span>
              <Play className="w-3 h-3 text-[#ffd60a]" />
            </button>

            {/* 3. Atalho Direto para a Voz do Papai (Carta Editorial) */}
            <button
              onClick={handleOpenLetter}
              type="button"
              className="w-full py-2 px-3.5 rounded-xl bg-gradient-to-r from-[#ff375f]/20 to-[#ffd60a]/20 hover:from-[#ff375f]/30 hover:to-[#ffd60a]/30 border border-[#ff375f]/30 text-white text-[11px] font-semibold flex items-center justify-between transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Feather className="w-3.5 h-3.5 text-[#ff375f]" />
                Ouvir Áudio do Papai (Carta)
              </span>
              <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]" />
            </button>
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
        title="Abrir Caixinha de Música com MC Marks"
        className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#1c1826] via-[#120f18] to-[#1c1826] border border-[#ffd60a]/40 shadow-[0_8px_30px_rgba(0,0,0,0.85),0_0_20px_rgba(255,214,10,0.25)] hover:border-[#ffd60a] text-white text-[13px] font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
      >
        <span className="relative flex items-center justify-center">
          <Music
            className={`w-4 h-4 text-[#ffd60a] ${
              isPlayingMusic || isPlayingMelody ? 'animate-bounce text-[#ff375f]' : 'group-hover:rotate-12'
            } transition-transform`}
          />
          {(isPlayingMusic || isPlayingMelody) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#30d158] animate-ping" />
          )}
        </span>
        <span className="font-semibold text-xs sm:text-[13px] text-amber-200">
          {isPlayingMusic ? 'Tocando: Filho (MC Marks)' : 'Música: MC Marks'}
        </span>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#a1a1a6]" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#a1a1a6]" />
        )}
      </button>
    </div>
  )
}
