import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Sparkles, Crown, Star, Compass, Music, Heart } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

export interface PrincessCharacter {
  id: string
  name: string
  url: string
  color: string
  category: 'Princesas' | 'Frozen' | 'Desenhos' | 'Aventureiros' | 'Celebração'
  tag: string
  emoji: string
}

// 32 Personagens Reais Autênticos com arquivos WebP locais otimizados
export const PRINCESS_CHARACTERS: PrincessCharacter[] = [
  // 1. Frozen
  {
    id: 'elsa',
    name: 'Elsa (Frozen)',
    url: '/characters/elsa.webp',
    color: '#64d2ff',
    category: 'Frozen',
    tag: 'Rainha do Gelo',
    emoji: '❄️',
  },
  {
    id: 'anna',
    name: 'Anna (Frozen)',
    url: '/characters/anna.webp',
    color: '#ff9f0a',
    category: 'Frozen',
    tag: 'Princesa de Arendelle',
    emoji: '🌻',
  },
  {
    id: 'olaf',
    name: 'Olaf (Frozen)',
    url: '/characters/olaf.webp',
    color: '#b9ecff',
    category: 'Frozen',
    tag: 'Abraços Quentinhos',
    emoji: '⛄',
  },

  // 2. Princesas Clássicas & Modernas
  {
    id: 'branca_de_neve',
    name: 'Branca de Neve',
    url: '/characters/branca_de_neve.webp',
    color: '#ff453a',
    category: 'Princesas',
    tag: 'A Mais Bela de Todas',
    emoji: '🍎',
  },
  {
    id: 'cinderela',
    name: 'Cinderela',
    url: '/characters/cinderela.webp',
    color: '#70d7ff',
    category: 'Princesas',
    tag: 'Sapatinho de Cristal',
    emoji: '👠',
  },
  {
    id: 'rapunzel',
    name: 'Rapunzel (Enrolados)',
    url: '/characters/rapunzel.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'Luzes Flutuantes',
    emoji: '☀️',
  },
  {
    id: 'ariel',
    name: 'Ariel (A Pequena Sereia)',
    url: '/characters/ariel.webp',
    color: '#ff375f',
    category: 'Princesas',
    tag: 'Coração do Mar',
    emoji: '🧜‍♀️',
  },
  {
    id: 'bela',
    name: 'Bela (A Bela e a Fera)',
    url: '/characters/bela.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'A Rosa Encantada',
    emoji: '🌹',
  },
  {
    id: 'jasmine',
    name: 'Jasmine (Aladdin)',
    url: '/characters/jasmine.webp',
    color: '#30d158',
    category: 'Princesas',
    tag: 'Um Mundo Ideal',
    emoji: '🕌',
  },
  {
    id: 'moana',
    name: 'Moana',
    url: '/characters/moana.webp',
    color: '#ff9f0a',
    category: 'Princesas',
    tag: 'Navegadora dos Oceanos',
    emoji: '🌊',
  },
  {
    id: 'tiana',
    name: 'Tiana (A Princesa e o Sapo)',
    url: '/characters/tiana.webp',
    color: '#34c759',
    category: 'Princesas',
    tag: 'Estrela dos Desejos',
    emoji: '🐸',
  },
  {
    id: 'aurora',
    name: 'Aurora (Bela Adormecida)',
    url: '/characters/aurora.webp',
    color: '#ff6482',
    category: 'Princesas',
    tag: 'Rosa Encantada',
    emoji: '👑',
  },
  {
    id: 'merida',
    name: 'Merida (Valente)',
    url: '/characters/merida.webp',
    color: '#ff9f0a',
    category: 'Princesas',
    tag: 'Espírito Livre',
    emoji: '🏹',
  },
  {
    id: 'mulan',
    name: 'Mulan',
    url: '/characters/mulan.webp',
    color: '#ff453a',
    category: 'Princesas',
    tag: 'Guerreira Graciosa',
    emoji: '🌸',
  },
  {
    id: 'pocahontas',
    name: 'Pocahontas',
    url: '/characters/pocahontas.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'Cores do Vento',
    emoji: '🍃',
  },
  {
    id: 'sininho',
    name: 'Sininho (Tinker Bell)',
    url: '/characters/sininho.webp',
    color: '#30d158',
    category: 'Princesas',
    tag: 'Pó de Pirlimpimpim',
    emoji: '🧚‍♀️',
  },
  {
    id: 'peach',
    name: 'Princesa Peach',
    url: '/characters/peach.webp',
    color: '#ff6482',
    category: 'Princesas',
    tag: 'Reino dos Cogumelos',
    emoji: '🏰',
  },

  // 3. Encanto
  {
    id: 'mirabel',
    name: 'Mirabel (Encanto)',
    url: '/characters/mirabel.webp',
    color: '#30d158',
    category: 'Desenhos',
    tag: 'Milagre da Família',
    emoji: '🦋',
  },
  {
    id: 'isabela',
    name: 'Isabela (Encanto)',
    url: '/characters/isabela.webp',
    color: '#bf5af2',
    category: 'Desenhos',
    tag: 'Flores Mágicas',
    emoji: '🌺',
  },

  // 4. Desenhos & Séries Infantis
  {
    id: 'minnie',
    name: 'Minnie Mouse',
    url: '/characters/minnie.webp',
    color: '#ff375f',
    category: 'Desenhos',
    tag: 'Laço Vermelho com Bolinhas',
    emoji: '🎀',
  },
  {
    id: 'stitch',
    name: 'Stitch (Lilo & Stitch)',
    url: '/characters/stitch.webp',
    color: '#0071e3',
    category: 'Desenhos',
    tag: 'Ohana Quer Dizer Família',
    emoji: '🛸',
  },
  {
    id: 'barbie',
    name: 'Barbie',
    url: '/characters/barbie.webp',
    color: '#ff6482',
    category: 'Desenhos',
    tag: 'Você Pode Ser Tudo',
    emoji: '💖',
  },
  {
    id: 'hello_kitty',
    name: 'Hello Kitty',
    url: '/characters/hello_kitty.webp',
    color: '#ff375f',
    category: 'Desenhos',
    tag: 'Doçura e Amizade',
    emoji: '🐱',
  },
  {
    id: 'peppa',
    name: 'Peppa Pig',
    url: '/characters/peppa.webp',
    color: '#ff453a',
    category: 'Desenhos',
    tag: 'Poças de Lama Mágicas',
    emoji: '🐷',
  },
  {
    id: 'skye',
    name: 'Skye (Patrulha Canina)',
    url: '/characters/skye.webp',
    color: '#ff6482',
    category: 'Desenhos',
    tag: 'Vamos Voar!',
    emoji: '🐶',
  },
  {
    id: 'wednesday',
    name: 'Wandinha (Wednesday)',
    url: '/characters/wednesday.webp',
    color: '#8e8e93',
    category: 'Desenhos',
    tag: 'Dança das Sombras',
    emoji: '🕷️',
  },
  {
    id: 'ladybug',
    name: 'Ladybug (Miraculous)',
    url: '/characters/ladybug.webp',
    color: '#ff453a',
    category: 'Desenhos',
    tag: 'Miraculous Joia Mágica',
    emoji: '🐞',
  },
  {
    id: 'catnoir',
    name: 'Cat Noir (Miraculous)',
    url: '/characters/catnoir.webp',
    color: '#30d158',
    category: 'Desenhos',
    tag: 'Garra e Coragem',
    emoji: '🐾',
  },
  {
    id: 'unicornio',
    name: 'Unicórnio Mágico',
    url: '/characters/unicornio.webp',
    color: '#bf5af2',
    category: 'Desenhos',
    tag: 'Sonho do Arco-Íris',
    emoji: '🦄',
  },

  // 5. Aventureiros & Aniversariante
  {
    id: 'luccas_neto',
    name: 'Luccas Neto (Aventureiro Azul)',
    url: '/characters/luccas_neto.webp',
    color: '#0071e3',
    category: 'Aventureiros',
    tag: 'Mundo de Aventuras',
    emoji: '🔵',
  },
  {
    id: 'gi_neto',
    name: 'Gi Neto (Aventureira Vermelha)',
    url: '/characters/gi_neto.webp',
    color: '#ff453a',
    category: 'Aventureiros',
    tag: 'Coragem e Alegria',
    emoji: '🔴',
  },
  {
    id: 'alycia',
    name: 'Princesa Alycia (7 Anos)',
    url: '/characters/alycia.webp',
    color: '#ffd60a',
    category: 'Celebração',
    tag: 'A Estrela Mais Brilhante',
    emoji: '👑',
  },
]

interface FlockItem {
  char: PrincessCharacter
  x: number
  y: number
  vx: number
  vy: number
  baseSize: number
  currentScale: number
  targetScale: number
  phase: number
}

export const ImageFlockPrincesses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [activeCharacter, setActiveCharacter] = useState<PrincessCharacter>(PRINCESS_CHARACTERS[0])
  const [imagesReady, setImagesReady] = useState(false)

  // Map of loaded HTMLImageElement
  const imageMapRef = useRef<Map<string, HTMLImageElement>>(new Map())
  const flockItemsRef = useRef<FlockItem[]>([])

  // Filtered characters list
  const filteredCharacters = useMemo(() => {
    if (selectedCategory === 'Todos') return PRINCESS_CHARACTERS
    return PRINCESS_CHARACTERS.filter((c) => c.category === selectedCategory)
  }, [selectedCategory])

  // Preload all 32 images once on mount
  useEffect(() => {
    let loadedCount = 0
    const total = PRINCESS_CHARACTERS.length

    PRINCESS_CHARACTERS.forEach((c) => {
      const img = new Image()
      img.src = c.url
      img.onload = () => {
        imageMapRef.current.set(c.id, img)
        loadedCount++
        if (loadedCount >= total) {
          setImagesReady(true)
        }
      }
      img.onerror = () => {
        loadedCount++
        if (loadedCount >= total) {
          setImagesReady(true)
        }
      }
    })
  }, [])

  // Canvas engine with real visible character cards and responsive flock physics
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let viewW = container.clientWidth
    let viewH = container.clientHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const handleResize = () => {
      if (!container || !canvas) return
      viewW = container.clientWidth
      viewH = container.clientHeight
      canvas.width = viewW * dpr
      canvas.height = viewH * dpr
      canvas.style.width = `${viewW}px`
      canvas.style.height = `${viewH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Build flock items distributed evenly across the canvas
    const cols = viewW < 640 ? 4 : viewW < 1024 ? 6 : 8
    const rows = Math.ceil(filteredCharacters.length / cols)
    const cellW = viewW / cols
    const cellH = viewH / rows
    const cardBaseSize = Math.max(56, Math.min(cellW * 0.72, cellH * 0.72, 88))

    flockItemsRef.current = filteredCharacters.map((char, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const posX = col * cellW + cellW / 2 + (Math.random() - 0.5) * 16
      const posY = row * cellH + cellH / 2 + (Math.random() - 0.5) * 16
      return {
        char,
        x: posX,
        y: posY,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.35,
        baseSize: cardBaseSize,
        currentScale: 1.0,
        targetScale: 1.0,
        phase: Math.random() * Math.PI * 2,
      }
    })

    // Pointer coordinates with smooth following
    const pointer = { x: viewW / 2, y: viewH / 2, active: false }
    const focal = { x: viewW / 2, y: viewH / 2 }

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      pointer.x = clientX - rect.left
      pointer.y = clientY - rect.top
      pointer.active = true
    }

    const onMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    container.addEventListener('mousemove', onMouseMove, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('mouseleave', onPointerLeave)

    let animId: number
    let time = 0
    let lastAudioTime = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, viewW, viewH)

      // Smooth Lerp focal point toward cursor or center
      const targetX = pointer.active ? pointer.x : viewW / 2
      const targetY = pointer.active ? pointer.y : viewH / 2
      focal.x += (targetX - focal.x) * 0.1
      focal.y += (targetY - focal.y) * 0.1

      let closestItem: FlockItem | null = null
      let minDistance = Infinity

      const cursorRadius = Math.min(viewW, viewH) * 0.42

      // Draw each flock item
      flockItemsRef.current.forEach((item) => {
        // Floating gentle sinusoidal wave motion
        const floatY = Math.sin(time * 1.5 + item.phase) * 6
        const floatX = Math.cos(time * 1.2 + item.phase) * 5

        item.x += item.vx + floatX * 0.08
        item.y += item.vy + floatY * 0.08

        // Soft screen bounce boundaries
        const pad = item.baseSize * 0.7
        if (item.x < pad) {
          item.x = pad
          item.vx = Math.abs(item.vx)
        }
        if (item.x > viewW - pad) {
          item.x = viewW - pad
          item.vx = -Math.abs(item.vx)
        }
        if (item.y < pad) {
          item.y = pad
          item.vy = Math.abs(item.vy)
        }
        if (item.y > viewH - pad) {
          item.y = viewH - pad
          item.vy = -Math.abs(item.vy)
        }

        // Distance from focal point
        const dx = item.x - focal.x
        const dy = item.y - focal.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < minDistance) {
          minDistance = dist
          closestItem = item
        }

        // Proximity scaling: items near cursor expand smoothly, others remain visibly floating
        if (pointer.active && dist < cursorRadius) {
          const proximity = 1 - dist / cursorRadius
          // Non-linear cubic ease for magnification
          const ease = Math.pow(proximity, 2)
          item.targetScale = 1.0 + ease * 1.8 // expands up to 2.8x
        } else {
          // Subtle resting breathing wave
          item.targetScale = 0.95 + Math.sin(time + item.phase) * 0.08
        }

        // Smooth scale interpolation (Lerp)
        item.currentScale += (item.targetScale - item.currentScale) * 0.12

        const size = item.baseSize * item.currentScale
        const drawX = item.x - size / 2
        const drawY = item.y - size / 2 + floatY

        const img = imageMapRef.current.get(item.char.id)
        const isFocused = closestItem === item && pointer.active && dist < 120

        ctx.save()

        // Magical Glow Aura
        const glowAlpha = isFocused ? 0.9 : Math.max(0.2, (item.currentScale - 1.0) * 0.8)
        ctx.shadowColor = item.char.color
        ctx.shadowBlur = isFocused ? 28 : 12 * item.currentScale

        // Rounded circular card clipping
        ctx.beginPath()
        ctx.arc(item.x, item.y + floatY, size / 2, 0, Math.PI * 2)
        ctx.fillStyle = '#0f111a'
        ctx.fill()
        ctx.clip()

        // Draw character artwork
        if (img && img.complete) {
          ctx.drawImage(img, drawX, drawY, size, size)
        } else {
          // Fallback colored circle with emoji
          ctx.fillStyle = item.char.color
          ctx.fill()
        }

        ctx.restore()

        // Outer Golden or Themed Halo Ring
        ctx.save()
        ctx.beginPath()
        ctx.arc(item.x, item.y + floatY, size / 2, 0, Math.PI * 2)
        ctx.strokeStyle = isFocused ? '#ffd60a' : item.char.color
        ctx.lineWidth = isFocused ? 3.5 : 1.8
        ctx.stroke()
        ctx.restore()

        // If zoomed in close, draw character mini-badge
        if (isFocused || item.currentScale > 1.7) {
          ctx.save()
          ctx.font = 'bold 11px system-ui, sans-serif'
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.shadowColor = 'rgba(0,0,0,0.85)'
          ctx.shadowBlur = 6
          ctx.fillText(item.char.name, item.x, drawY + size + 14)
          ctx.restore()
        }
      })

      // Audio trigger and badge update on focal character change
      if (closestItem && pointer.active && minDistance < 130) {
        const char = (closestItem as FlockItem).char
        setActiveCharacter(char)
        const now = performance.now()
        if (now - lastAudioTime > 550) {
          celestialAudio.playChime(659.25, 0.1, 1.1)
          lastAudioTime = now
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [filteredCharacters, imagesReady])

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#070611] to-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[400px] bg-sky-500/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3 shadow-md shadow-amber-500/10">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Revoada Encantada • 32 Personagens Reais</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Onde a Imaginação Voa Livre
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Todas as personagens, heróis e desenhos favoritos da Alycia flutuando juntos no céu encantado.
            Passe o mouse ou deslize o dedinho para ver cada um se aproximar e brilhar!
          </p>

          {/* Focal Character Badge */}
          <div className="mt-5 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-zinc-900/90 border border-white/20 backdrop-blur-xl shadow-xl transition-all duration-200">
            <span className="text-2xl">{activeCharacter.emoji}</span>
            <div className="text-left">
              <span className="block text-xs font-bold text-white tracking-wide">
                {activeCharacter.name}
              </span>
              <span
                className="block text-[11px] font-medium"
                style={{ color: activeCharacter.color }}
              >
                {activeCharacter.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {(['Todos', 'Princesas', 'Frozen', 'Desenhos', 'Aventureiros'] as const).map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat)
                  celestialAudio.playChime(587.33, 0.12)
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-black shadow-lg shadow-pink-500/20 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat === 'Todos' && '✨ Todos (32)'}
                {cat === 'Princesas' && '👑 Princesas'}
                {cat === 'Frozen' && '❄️ Frozen'}
                {cat === 'Desenhos' && '🎨 Desenhos Favoritos'}
                {cat === 'Aventureiros' && '🎈 Aventureiros'}
              </button>
            )
          })}
        </div>

        {/* 
          ENCHANTED FLOCK CANVAS
          All 32 characters are ALWAYS visibly floating, rotating, and scaling up on pointer proximity
        */}
        <div
          ref={containerRef}
          className="relative w-full h-[480px] sm:h-[580px] rounded-[32px] overflow-hidden bg-[#070814]/95 border border-white/15 backdrop-blur-2xl shadow-2xl cursor-crosshair select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {/* Floating Instructions */}
          <div className="absolute bottom-4 left-6 pointer-events-none text-xs text-zinc-300 flex items-center gap-2 bg-black/75 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Mova o mouse ou deslize o dedo para aproximar os personagens</span>
          </div>

          <div className="absolute top-4 right-6 pointer-events-none text-xs text-amber-300 font-mono flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{filteredCharacters.length} personagens voando</span>
          </div>
        </div>

        {/* 
          INTERACTIVE CHARACTER GALLERY
          Clicking any character focuses them immediately with sound chime
        */}
        <div className="mt-8">
          <div className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            Galeria Interativa dos 32 Personagens • Toque para focar
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {filteredCharacters.map((item) => {
              const isFocal = activeCharacter.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveCharacter(item)
                    celestialAudio.playChime(783.99, 0.16)
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isFocal
                      ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-lg shadow-amber-400/25 scale-105'
                      : 'bg-white/[0.04] hover:bg-white/10 text-zinc-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-5 h-5 rounded-full object-cover border border-white/30"
                    loading="lazy"
                  />
                  <span>{item.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
