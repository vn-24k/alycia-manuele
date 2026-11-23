import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Sparkles,
  Heart,
  Crown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Palette,
  Wand2,
  Music,
  Activity,
  Waves,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

// Pentatonic scale frequencies for celestial harp notes
const PENTATONIC_FREQUENCIES = [
  523.25, // C5
  587.33, // D5
  659.25, // E5
  783.99, // G5
  880.00, // A5
  1046.50, // C6
  1174.66, // D6
  1318.51, // E6
]

interface SparkleParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  char: string
  opacity: number
}

const PRESET_PHRASES = [
  { label: '👑 Alycia 7 Anos', text: 'ALYCIA 7 ANOS' },
  { label: '❄️ Frozen & Elsa', text: 'FROZEN ELSA' },
  { label: '🍎 Branca de Neve', text: 'BRANCA DE NEVE' },
  { label: '☀️ Rapunzel', text: 'RAPUNZEL' },
  { label: '👠 Cinderela', text: 'CINDERELA' },
  { label: '🎈 Aventureiros', text: 'AVENTUREIROS' },
  { label: '💖 Papai Te Ama', text: 'PAPAI TE AMA' },
]

type PlayMode = 'onda' | 'coracao' | 'magnetico' | 'piano'
type ColorTheme = 'gelo' | 'ouro' | 'rosa' | 'arcoiris'

export function KineticLetterPlayground() {
  const [inputText, setInputText] = useState('ALYCIA 7 ANOS')
  const [playMode, setPlayMode] = useState<PlayMode>('onda')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('ouro')
  const [isPlaying, setIsPlaying] = useState(true)
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [activeCharIndex, setActiveCharIndex] = useState<number | null>(null)

  // Mouse / Pointer coordinates relative to playground container
  const containerRef = useRef<HTMLDivElement>(null)
  const textRowRef = useRef<HTMLDivElement>(null)
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number } | null>(null)
  const [time, setTime] = useState(0)
  const particlesRef = useRef<SparkleParticle[]>([])
  const [particles, setParticles] = useState<SparkleParticle[]>([])
  const animFrameRef = useRef<number | null>(null)

  // Color configurations per theme
  const getThemeColors = useCallback(
    (charIdx: number, totalChars: number) => {
      switch (colorTheme) {
        case 'gelo':
          return {
            gradient: 'from-[#64d2ff] via-[#b9ecff] to-[#ffffff]',
            glow: 'rgba(100, 210, 255, 0.65)',
            border: 'rgba(100, 210, 255, 0.4)',
            accent: '#64d2ff',
          }
        case 'rosa':
          return {
            gradient: 'from-[#ff6482] via-[#ff9ebb] to-[#ffd1dc]',
            glow: 'rgba(255, 100, 130, 0.65)',
            border: 'rgba(255, 100, 130, 0.4)',
            accent: '#ff6482',
          }
        case 'arcoiris': {
          const hue = Math.round((charIdx / Math.max(1, totalChars)) * 360 + (time * 40) % 360)
          return {
            gradient: '',
            customColor: `hsl(${hue}, 95%, 70%)`,
            glow: `hsla(${hue}, 95%, 65%, 0.75)`,
            border: `hsla(${hue}, 95%, 65%, 0.5)`,
            accent: `hsl(${hue}, 95%, 70%)`,
          }
        }
        case 'ouro':
        default:
          return {
            gradient: 'from-[#ffd60a] via-[#ffeaa7] to-[#ffffff]',
            glow: 'rgba(255, 214, 10, 0.65)',
            border: 'rgba(255, 214, 10, 0.4)',
            accent: '#ffd60a',
          }
      }
    },
    [colorTheme, time]
  )

  // Continuous animation loop for kinetic variable font calculations
  useEffect(() => {
    let lastStamp = performance.now()

    const loop = (now: number) => {
      const delta = (now - lastStamp) / 1000
      lastStamp = now

      if (isPlaying) {
        setTime((prev) => prev + delta * speedMultiplier * 3.5)
      }

      // Update sparkle particles physics
      if (particlesRef.current.length > 0) {
        particlesRef.current = particlesRef.current
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.18, // subtle gravity
            opacity: p.opacity - 0.022,
          }))
          .filter((p) => p.opacity > 0)
        setParticles([...particlesRef.current])
      }

      animFrameRef.current = requestAnimationFrame(loop)
    }

    animFrameRef.current = requestAnimationFrame(loop)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
    }
  }, [isPlaying, speedMultiplier])

  // Spawn magical sparkle explosion at target coordinates
  const triggerSparkles = (x: number, y: number, color: string) => {
    const emojis = ['✨', '⭐', '💖', '👑', '❄️', '🌸', '💎']
    const newItems: SparkleParticle[] = []
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 5
      newItems.push({
        id: Date.now() + Math.random(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        size: 14 + Math.random() * 16,
        color,
        char: emojis[Math.floor(Math.random() * emojis.length)],
        opacity: 1,
      })
    }
    particlesRef.current = [...particlesRef.current, ...newItems]
    setParticles([...particlesRef.current])
  }

  // Handle pointer interactions (mouse & touch)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!textRowRef.current) return
    const rect = textRowRef.current.getBoundingClientRect()
    setPointerPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handlePointerLeave = () => {
    setPointerPos(null)
    setActiveCharIndex(null)
  }

  // Play musical chime and trigger sparkles when interacting with a letter
  const handleCharInteract = (
    index: number,
    char: string,
    e: React.MouseEvent<HTMLSpanElement> | React.PointerEvent<HTMLSpanElement>
  ) => {
    if (char === ' ') return
    setActiveCharIndex(index)

    // Musical note
    if (audioEnabled) {
      const freq = PENTATONIC_FREQUENCIES[index % PENTATONIC_FREQUENCIES.length]
      celestialAudio.playChime(freq, 0.16, 1.4)
    }

    // Coordinates for sparkles
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (containerRect) {
      const sparkX = rect.left + rect.width / 2 - containerRect.left
      const sparkY = rect.top + rect.height / 2 - containerRect.top
      const colors = getThemeColors(index, inputText.length)
      triggerSparkles(sparkX, sparkY, colors.accent)
    }
  }

  // Letters array
  const chars = inputText.split('')

  // Calculate dynamic weight and transform for each character
  const getCharStyle = (index: number) => {
    const total = chars.length
    let weight = 400
    let translateY = 0
    let scale = 1.0

    if (playMode === 'onda') {
      // Wave inspired by donotfold: smooth sinusoidal phase wave
      const phase = time - index * 0.42
      const sineVal = Math.sin(phase) // -1 to 1
      const normalized = (sineVal + 1) / 2 // 0 to 1
      weight = Math.round(150 + normalized * 750) // 150 to 900
      translateY = -normalized * 14
      scale = 0.95 + normalized * 0.16
    } else if (playMode === 'coracao') {
      // Heartbeat pulse inspired by donotfold heartbeat demo
      const pulse = Math.pow(Math.max(0, Math.sin(time * 2.0)), 3) // sharp pulse
      const waveOffset = Math.sin(time * 2.0 - index * 0.18)
      weight = Math.round(200 + pulse * 600 + waveOffset * 100)
      weight = Math.max(100, Math.min(900, weight))
      translateY = -pulse * 12
      scale = 0.96 + pulse * 0.18
    } else if (playMode === 'magnetico') {
      // Magnetic cursor proximity
      if (pointerPos && textRowRef.current) {
        const charElems = textRowRef.current.children
        if (charElems[index]) {
          const charRect = (charElems[index] as HTMLElement).getBoundingClientRect()
          const rowRect = textRowRef.current.getBoundingClientRect()
          const charCenterX = charRect.left + charRect.width / 2 - rowRect.left
          const dist = Math.abs(pointerPos.x - charCenterX)
          const maxDist = 200
          if (dist < maxDist) {
            const proximity = 1 - dist / maxDist
            weight = Math.round(200 + proximity * 700)
            translateY = -proximity * 22
            scale = 1.0 + proximity * 0.28
          } else {
            weight = 200
          }
        }
      } else {
        // Subtle resting idle breathing
        weight = Math.round(300 + Math.sin(time + index * 0.3) * 150)
      }
    } else if (playMode === 'piano') {
      // Piano mode: active letter jumps up high and turns ultra-bold
      if (activeCharIndex === index) {
        weight = 900
        translateY = -26
        scale = 1.32
      } else {
        const subtleWave = Math.sin(time + index * 0.25)
        weight = Math.round(300 + subtleWave * 120)
        translateY = subtleWave * 4
        scale = 1.0
      }
    }

    // Safety bounds
    weight = Math.max(100, Math.min(900, weight))

    return {
      weight,
      translateY,
      scale,
    }
  }

  return (
    <section
      id="playground-magico"
      ref={containerRef}
      className="relative w-full py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#000000] via-[#05060b] to-[#000000] border-t border-white/10 overflow-hidden"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-gradient-to-r from-blue-600/15 via-amber-400/15 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Sparkles Canvas Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}px`,
              top: `${p.y}px`,
              transform: 'translate(-50%, -50%)',
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              pointerEvents: 'none',
              filter: `drop-shadow(0 0 6px ${p.color})`,
              transition: 'opacity 0.05s linear',
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wider uppercase mb-4 shadow-lg shadow-amber-500/10">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Playground Mágico de Tipografia Cinética • 7 Anos de Alycia</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Brincadeira das{' '}
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-sky-400 bg-clip-text text-transparent">
              Letras Encantadas
            </span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Passe o mouse, deslize os dedinhos ou toque nas letras para ver a dança cinética de
            pesos tipográficos, ondas elásticas e acordes celestiais feitos para você brincar!
          </p>
        </div>

        {/* Quick Phrase Selection Pills for Alycia */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-8">
          {PRESET_PHRASES.map((preset) => {
            const isSelected = inputText === preset.text
            return (
              <button
                key={preset.text}
                type="button"
                onClick={() => {
                  setInputText(preset.text)
                  if (audioEnabled) {
                    celestialAudio.playChime(659.25, 0.14)
                  }
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-400/25 scale-105 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20'
                }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>

        {/* 
          MAIN INTERACTIVE KINETIC STAGE
          Large letters with variable font weight oscillation
        */}
        <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-xl overflow-hidden min-h-[280px] sm:min-h-[340px] flex flex-col items-center justify-center">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Interactive Letter Row */}
          <div
            ref={textRowRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className="relative flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 gap-y-2 select-none py-6 cursor-pointer touch-none"
            style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
          >
            {chars.map((char, idx) => {
              const { weight, translateY, scale } = getCharStyle(idx)
              const theme = getThemeColors(idx, chars.length)
              const isSpace = char === ' '

              if (isSpace) {
                return (
                  <span
                    key={`space-${idx}`}
                    className="inline-block w-4 sm:w-8 pointer-events-none"
                  >
                    &nbsp;
                  </span>
                )
              }

              return (
                <span
                  key={`char-${idx}-${char}`}
                  onPointerDown={(e) => handleCharInteract(idx, char, e)}
                  onMouseEnter={(e) => handleCharInteract(idx, char, e)}
                  className="inline-block transition-transform duration-75 text-center relative group"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    fontWeight: weight,
                    fontVariationSettings: `'wght' ${weight}`,
                  }}
                >
                  <span
                    className={`block text-4xl sm:text-6xl md:text-8xl tracking-tight transition-all duration-100 ${
                      theme.gradient ? `bg-gradient-to-b ${theme.gradient} bg-clip-text text-transparent` : ''
                    }`}
                    style={{
                      color: theme.customColor || undefined,
                      textShadow: `0 0 20px ${theme.glow}, 0 0 45px ${theme.glow}`,
                      filter: `drop-shadow(0 4px 12px ${theme.glow})`,
                    }}
                  >
                    {char}
                  </span>

                  {/* Tiny floating note / weight indicator on hover */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-80 transition-opacity text-[10px] font-mono text-amber-300 pointer-events-none whitespace-nowrap">
                    {weight}w
                  </span>
                </span>
              )
            })}
          </div>

          {/* Direct Custom Input Bar */}
          <div className="w-full max-w-md mt-6 relative">
            <div className="flex items-center gap-2 bg-black/60 border border-white/15 focus-within:border-amber-400/80 rounded-2xl px-4 py-2 transition-all shadow-inner">
              <Wand2 className="w-4 h-4 text-amber-400 shrink-0" />
              <input
                type="text"
                value={inputText}
                maxLength={24}
                onChange={(e) => setInputText(e.target.value.toUpperCase())}
                placeholder="Escreva algo mágico..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold tracking-wider text-white placeholder-zinc-500 focus:outline-none uppercase"
              />
              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInputText('')}
                  className="text-zinc-500 hover:text-zinc-300 text-xs px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Limpar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 
          PLAYGROUND CONTROLS
          Kid-friendly buttons for modes, speed, colors, sound
        */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mode Selector */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Modo de Brincar</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPlayMode('onda')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'onda'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <Waves className="w-3.5 h-3.5" />
                <span>Onda Contínua</span>
              </button>

              <button
                type="button"
                onClick={() => setPlayMode('coracao')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'coracao'
                    ? 'bg-pink-400/20 text-pink-300 border border-pink-400/50 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Coração Pulsante</span>
              </button>

              <button
                type="button"
                onClick={() => setPlayMode('magnetico')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'magnetico'
                    ? 'bg-sky-400/20 text-sky-300 border border-sky-400/50 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Toque Magnético</span>
              </button>

              <button
                type="button"
                onClick={() => setPlayMode('piano')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  playMode === 'piano'
                    ? 'bg-purple-400/20 text-purple-300 border border-purple-400/50 shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Piano Mágico</span>
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Palette className="w-4 h-4 text-pink-400" />
              <span>Cores Encantadas</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setColorTheme('ouro')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  colorTheme === 'ouro'
                    ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400" />
                <span>Ouro Real</span>
              </button>

              <button
                type="button"
                onClick={() => setColorTheme('gelo')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  colorTheme === 'gelo'
                    ? 'bg-sky-400/20 text-sky-300 border border-sky-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400" />
                <span>Frozen & Gelo</span>
              </button>

              <button
                type="button"
                onClick={() => setColorTheme('rosa')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  colorTheme === 'rosa'
                    ? 'bg-pink-400/20 text-pink-300 border border-pink-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shadow-sm shadow-pink-400" />
                <span>Princesa Rosé</span>
              </button>

              <button
                type="button"
                onClick={() => setColorTheme('arcoiris')}
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  colorTheme === 'arcoiris'
                    ? 'bg-purple-400/20 text-purple-300 border border-purple-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 shadow-sm" />
                <span>Arco-Íris Vivo</span>
              </button>
            </div>
          </div>

          {/* Controls: Play/Pause, Speed, Audio, Sparkle Blast */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              <Wand2 className="w-4 h-4 text-sky-400" />
              <span>Controles & Efeitos</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {/* Play / Pause */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 min-w-[90px] px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-white flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-400" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dançar</span>
                  </>
                )}
              </button>

              {/* Audio Toggle */}
              <button
                type="button"
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`flex-1 min-w-[90px] px-3 py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer ${
                  audioEnabled
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                    : 'bg-white/5 text-zinc-500 border-white/5'
                }`}
              >
                {audioEnabled ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Som Ligado</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Som Mudo</span>
                  </>
                )}
              </button>

              {/* Sparkle Blast Button */}
              <button
                type="button"
                onClick={() => {
                  if (containerRef.current) {
                    const rect = containerRef.current.getBoundingClientRect()
                    const centerX = rect.width / 2
                    const centerY = rect.height / 2
                    const colors = getThemeColors(0, 1)
                    triggerSparkles(centerX, centerY, colors.accent)
                    if (audioEnabled) {
                      celestialAudio.playChime(1046.5, 0.22, 1.8)
                    }
                  }
                }}
                className="w-full px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-pink-400 to-sky-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explodir Estrelinhas Mágicas!</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
