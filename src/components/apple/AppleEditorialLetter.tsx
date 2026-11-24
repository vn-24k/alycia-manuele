import React, { useState, useRef, useEffect } from 'react'
import { Heart, Feather, Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Crown } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface LetterBlock {
  id: string
  start: number
  end: number
  title: string
  text: string
  tag: string
}

const LETTER_BLOCKS: LetterBlock[] = [
  {
    id: 'bloco-1',
    start: 0,
    end: 14.5,
    title: 'O Grande Marco de Sete Anos',
    tag: 'Abertura de Coração',
    text: 'Oi Alycia, meu amor. É o papai. Filha, tô gravando esse áudio aqui pra você porque hoje... hoje é o seu dia. Cê tá completando sete anos! Passa tão rápido. Mas ver você crescendo assim, mesmo de longe... mexe demais com o coração do papai.',
  },
  {
    id: 'bloco-2',
    start: 14.5,
    end: 39.5,
    title: 'O Que é o Amor Verdadeiro',
    tag: 'Memória Eterna',
    text: 'Eu tava aqui lembrando de tudo o que a gente já viveu... das nossas risadas, das nossas brincadeiras... da nossa sintonia, sabe? A gente sempre foi tão grudado, tão apegado um no outro... E eu sinto uma saudade enorme de estar com você, de ver seu sorriso de perto. Mas ó, filha... escuta o que o papai vai te falar: foi com você que eu realmente descobri o que é o amor. Foi você que me ensinou, de verdade, o que é amar alguém com a alma... e o que é ser amado por inteiro.',
  },
  {
    id: 'bloco-3',
    start: 39.5,
    end: 66.0,
    title: 'Aliança Inquebrável & Proteção Espiritual',
    tag: 'Cuidado & Força',
    text: 'Eu sei que a gente não tá pertinho agora, né... faz um tempinho que a gente não se vê, não conversa... mas ó, a distância nunca mudou e nunca vai mudar em nada o que eu sinto por você. Nada. Você mora aqui dentro do meu peito todos os dias. E eu também queria te dizer que... o Tatá Caveira tá aqui com o papai, caminhando comigo, me dando força... mas ele também tá cuidando de você, viu? Ele tá olhando por você, protegendo os seus passos, guardando a minha filhinha em cada momento... onde quer que você esteja.',
  },
  {
    id: 'bloco-4',
    start: 66.0,
    end: 86.0,
    title: 'Sua Inteligência e Seu Futuro Gigante',
    tag: 'Dedicação & Escola',
    text: 'E eu fico aqui imaginando você indo pra escola, toda linda com sua mochila... descobrindo as letras, os números, aprendendo tantas coisas novas e brincando com seus coleguinhas. O papai sabe o quanto você é inteligente e dedicada. Continua prestando atenção na professora, cuidando dos seus cadernos e aprendendo com essa sua curiosidade linda, porque você tem um futuro gigante pela frente.',
  },
  {
    id: 'bloco-5',
    start: 86.0,
    end: 107.0,
    title: 'A Minha Princesa Para Sempre',
    tag: 'Bênção & Parabéns',
    text: 'Nunca esquece da princesa linda, inteligente, maravilhosa que você é. O papai tem um orgulho infinito de você... e de ser o seu pai. Aproveita muito o seu dia hoje, tá bom? Brinca bastante... e guarda essa minha voz com você no coração. O papai te ama mais do que tudo nesse mundo! Um beijo bem apertado no seu coração... e feliz aniversário de sete anos pra você, minha princesa!',
  },
]

export const AppleEditorialLetter: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(106.88)
  const [isMuted, setIsMuted] = useState(false)
  const [activeBlockId, setActiveBlockId] = useState<string>('bloco-1')

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      const cur = audio.currentTime
      setCurrentTime(cur)

      // Find corresponding block
      const current = LETTER_BLOCKS.find((b) => cur >= b.start && cur < b.end)
      if (current) {
        setActiveBlockId(current.id)
      }
    }

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }

    const onEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setActiveBlockId('bloco-1')
    }

    const onPlayStarted = () => {
      setIsPlaying(true)
      celestialAudio.stopAll() // Garante silêncio absoluto para a voz do papai
    }

    const onPauseOccurred = () => {
      setIsPlaying(false)
    }

    const handleRemotePlay = () => {
      celestialAudio.stopAll()
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch((err) => {
          console.warn('Playback error:', err)
        })
      }
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlayStarted)
    audio.addEventListener('pause', onPauseOccurred)
    window.addEventListener('play-father-letter', handleRemotePlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlayStarted)
      audio.removeEventListener('pause', onPauseOccurred)
      window.removeEventListener('play-father-letter', handleRemotePlay)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      celestialAudio.playSoftClick()
      celestialAudio.stopAll()
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Audio playback error:', err)
      })
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const jumpToBlock = (block: LetterBlock) => {
    if (audioRef.current) {
      audioRef.current.currentTime = block.start
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <section
      id="carta-pai"
      className="bg-[#08080b] text-[#f5f5f7] py-20 sm:py-28 px-4 overflow-hidden border-b border-white/[0.08] relative"
    >
      {/* Elemento de Áudio Oculto */}
      <audio
        ref={audioRef}
        src="/audio/audio_pai_alycia.mp3"
        preload="metadata"
      />

      {/* Halo de Luz Nobre (Ouro & Rosé) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-r from-[#ffd60a]/10 via-[#ff375f]/10 to-[#bf5af2]/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[860px] mx-auto relative z-10">
        {/* Cabeçalho Editorial */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] mb-4 shadow-lg shadow-black/40">
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
            Carta Oficial do Papai • 7 Anos
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3">
            Para a Minha Princesa Alycia
          </h2>
          <p className="text-[#a1a1a6] text-sm sm:text-base max-w-[540px] mx-auto">
            Palavras de amor eterno, verdade e proteção seladas no coração da minha filhinha.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#ffd60a] to-transparent mx-auto rounded-full mt-5" />
        </div>

        {/* PLAYER DE ÁUDIO CINEMATOGRÁFICO DE ELITE */}
        <div className="mb-10 p-5 sm:p-7 rounded-[28px] bg-gradient-to-b from-[#1c1c22]/90 to-[#121217]/95 border border-white/[0.14] shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            {/* Botão Play Monumental */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <button
                onClick={togglePlay}
                className="relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] p-0.5 shadow-xl shadow-[#ffd60a]/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center flex-shrink-0"
                title={isPlaying ? 'Pausar Mensagem' : 'Ouvir a Voz do Papai'}
              >
                <div className="w-full h-full rounded-full bg-[#0a0a0d] flex items-center justify-center group-hover:bg-transparent transition-colors">
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white group-hover:text-black fill-current transition-colors" />
                  ) : (
                    <Play className="w-6 h-6 text-white group-hover:text-black fill-current ml-0.5 transition-colors" />
                  )}
                </div>
                {/* Ondas pulsantes de áudio quando tocando */}
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full border-2 border-[#ffd60a] animate-ping opacity-75 pointer-events-none" />
                )}
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#ffd60a] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Voz do Papai
                  </span>
                  <span className="text-[11px] text-[#86868b] bg-white/[0.08] px-2 py-0.5 rounded-full">
                    Gravação Oficial
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                  Mensagem de Aniversário • 7 Anos
                </div>
                <div className="text-xs text-[#a1a1a6] mt-0.5 hidden sm:block">
                  {isPlaying ? 'Reproduzindo com o coração...' : 'Clique para ouvir a voz real do papai'}
                </div>
              </div>
            </div>

            {/* Visualizador de Ondas Sonoras */}
            <div className="flex items-center gap-1.5 h-8">
              {[40, 75, 100, 60, 90, 50, 85, 95, 45, 80, 65, 90, 70].map((h, i) => (
                <span
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#ffd60a] to-[#ff375f] rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * Math.sin((currentTime * 4) + i)) % 100)}%` : '20%',
                    opacity: isPlaying ? 0.9 : 0.35,
                  }}
                />
              ))}
            </div>

            {/* Controles de Apoio */}
            <div className="flex items-center gap-2 text-[#a1a1a6]">
              <button
                onClick={handleRestart}
                className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] hover:text-white transition-all text-xs flex items-center gap-1"
                title="Voltar ao Início"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reiniciar</span>
              </button>
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] hover:text-white transition-all"
                title={isMuted ? 'Desmutar' : 'Mutar'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#ff453a]" /> : <Volume2 className="w-4 h-4 text-[#ffd60a]" />}
              </button>
            </div>
          </div>

          {/* Barra de Progresso Interativa */}
          <div className="mt-5 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#a1a1a6] w-10 text-right">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 group">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-white/[0.12] rounded-lg appearance-none cursor-pointer accent-[#ffd60a]"
                />
                <div
                  className="absolute left-0 top-0 h-2 bg-gradient-to-r from-[#ffd60a] to-[#ff375f] rounded-lg pointer-events-none"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono text-[#a1a1a6] w-10">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* CORPO DA CARTA COM OS 5 BLOCOS REAIS */}
        <div className="bg-[#121217]/95 rounded-[36px] p-6 sm:p-12 md:p-14 border border-white/[0.12] shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl space-y-7 text-base sm:text-lg leading-relaxed">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#ffd60a] font-semibold">
                Dedicação Eterna
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Minha querida Alycia Manuele,
              </h3>
            </div>
            <Feather className="w-5 h-5 text-[#ffd60a]" />
          </div>

          {/* Renderização dos 5 Blocos com Destaque Dinâmico */}
          {LETTER_BLOCKS.map((block, index) => {
            const isActive = isPlaying && activeBlockId === block.id

            return (
              <div
                key={block.id}
                onClick={() => jumpToBlock(block)}
                className={`p-5 sm:p-6 rounded-2xl transition-all duration-500 cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-[#ffd60a]/15 via-[#ff375f]/10 to-transparent border-[#ffd60a]/50 shadow-lg shadow-[#ffd60a]/10 scale-[1.01]'
                    : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#ffd60a]/20 text-[#ffd60a] text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#ffd60a]">
                      {block.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#86868b] font-mono">
                    {formatTime(block.start)}
                  </span>
                </div>

                <p className={`text-base sm:text-[17px] leading-relaxed transition-colors ${
                  isActive ? 'text-white font-medium' : 'text-[#d2d2d7]'
                }`}>
                  "{block.text}"
                </p>
              </div>
            )
          })}

          {/* Assinatura Real do Papai */}
          <div className="pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#86868b]">
                Com amor eterno e incondicional da minha alma,
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-center gap-2.5">
                Seu Pai
                <Heart className="w-6 h-6 text-[#ff375f] fill-[#ff375f] animate-pulse" />
              </div>
              <div className="text-xs text-[#a1a1a6] mt-1">
                Ao lado de Tatá Caveira, guardando cada um dos seus passos.
              </div>
            </div>

            <div className="text-xs text-[#86868b] sm:text-right bg-white/[0.04] p-3 rounded-2xl border border-white/[0.08]">
              <div className="font-semibold text-white">Celebração de Sete Anos</div>
              <div className="text-[#ffd60a]">Hoje, Amanhã & Para Todo o Sempre</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
