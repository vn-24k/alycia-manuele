import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Sparkles, Crown, Star, ChevronLeft, ChevronRight, Wand2, Heart, Music, Shuffle } from 'lucide-react'
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

// 32 Personagens Reais Autênticos com Luccas Neto substituído por versão Pixar 3D de alta qualidade
export const PRINCESS_CHARACTERS: PrincessCharacter[] = [
  // 1. Frozen
  {
    id: 'elsa',
    name: 'Elsa (Frozen)',
    url: '/characters/elsa.webp',
    color: '#64d2ff',
    category: 'Frozen',
    tag: 'Rainha do Gelo & Poder do Amor',
    emoji: '❄️',
  },
  {
    id: 'anna',
    name: 'Anna (Frozen)',
    url: '/characters/anna.webp',
    color: '#ff9f0a',
    category: 'Frozen',
    tag: 'Princesa de Arendelle & Coragem',
    emoji: '🌻',
  },
  {
    id: 'olaf',
    name: 'Olaf (Frozen)',
    url: '/characters/olaf.webp',
    color: '#b9ecff',
    category: 'Frozen',
    tag: 'Abraços Quentinhos & Alegria',
    emoji: '⛄',
  },

  // 2. Princesas Clássicas & Modernas
  {
    id: 'branca_de_neve',
    name: 'Branca de Neve',
    url: '/characters/branca_de_neve.webp',
    color: '#ff453a',
    category: 'Princesas',
    tag: 'A Mais Bela de Todas & Bondade',
    emoji: '🍎',
  },
  {
    id: 'cinderela',
    name: 'Cinderela',
    url: '/characters/cinderela.webp',
    color: '#70d7ff',
    category: 'Princesas',
    tag: 'Sapatinho de Cristal & Esperança',
    emoji: '👠',
  },
  {
    id: 'rapunzel',
    name: 'Rapunzel (Enrolados)',
    url: '/characters/rapunzel.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'Luzes Flutuantes & Criatividade',
    emoji: '☀️',
  },
  {
    id: 'ariel',
    name: 'Ariel (A Pequena Sereia)',
    url: '/characters/ariel.webp',
    color: '#ff375f',
    category: 'Princesas',
    tag: 'Coração do Mar & Curiosidade',
    emoji: '🧜‍♀️',
  },
  {
    id: 'bela',
    name: 'Bela (A Bela e a Fera)',
    url: '/characters/bela.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'A Rosa Encantada & Sabedoria',
    emoji: '🌹',
  },
  {
    id: 'jasmine',
    name: 'Jasmine (Aladdin)',
    url: '/characters/jasmine.webp',
    color: '#30d158',
    category: 'Princesas',
    tag: 'Um Mundo Ideal & Liberdade',
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
    tag: 'Estrela dos Desejos & Determinação',
    emoji: '🐸',
  },
  {
    id: 'aurora',
    name: 'Aurora (Bela Adormecida)',
    url: '/characters/aurora.webp',
    color: '#ff6482',
    category: 'Princesas',
    tag: 'Rosa Encantada & Doçura',
    emoji: '👑',
  },
  {
    id: 'merida',
    name: 'Merida (Valente)',
    url: '/characters/merida.webp',
    color: '#ff9f0a',
    category: 'Princesas',
    tag: 'Espírito Livre & Valentia',
    emoji: '🏹',
  },
  {
    id: 'mulan',
    name: 'Mulan',
    url: '/characters/mulan.webp',
    color: '#ff453a',
    category: 'Princesas',
    tag: 'Guerreira Graciosa & Honra',
    emoji: '🌸',
  },
  {
    id: 'pocahontas',
    name: 'Pocahontas',
    url: '/characters/pocahontas.webp',
    color: '#ffd60a',
    category: 'Princesas',
    tag: 'Cores do Vento & Harmonia',
    emoji: '🍃',
  },
  {
    id: 'sininho',
    name: 'Sininho (Tinker Bell)',
    url: '/characters/sininho.webp',
    color: '#30d158',
    category: 'Princesas',
    tag: 'Pó de Pirlimpimpim & Magia',
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
    tag: 'Milagre da Família & Empatia',
    emoji: '🦋',
  },
  {
    id: 'isabela',
    name: 'Isabela (Encanto)',
    url: '/characters/isabela.webp',
    color: '#bf5af2',
    category: 'Desenhos',
    tag: 'Flores Mágicas & Beleza',
    emoji: '🌺',
  },

  // 4. Desenhos & Séries Infantis
  {
    id: 'minnie',
    name: 'Minnie Mouse',
    url: '/characters/minnie.webp',
    color: '#ff375f',
    category: 'Desenhos',
    tag: 'Laço Vermelho & Carinho',
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
    tag: 'Doçura e Amizade Pura',
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
    tag: 'Vamos Voar Pelos Céus!',
    emoji: '🐶',
  },
  {
    id: 'wednesday',
    name: 'Wandinha (Wednesday)',
    url: '/characters/wednesday.webp',
    color: '#8e8e93',
    category: 'Desenhos',
    tag: 'Dança das Sombras & Mistério',
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
    tag: 'Garra e Coragem Noturna',
    emoji: '🐾',
  },
  {
    id: 'unicornio',
    name: 'Unicórnio Mágico',
    url: '/characters/unicornio.webp',
    color: '#bf5af2',
    category: 'Desenhos',
    tag: 'Sonho do Arco-Íris & Luz',
    emoji: '🦄',
  },

  // 5. Aventureiros & Aniversariante (Substituído com modelo 3D Pixar de alta resolução)
  {
    id: 'luccas_neto',
    name: 'Aventureiro Azul 3D',
    url: '/characters/luccas_neto.webp',
    color: '#0071e3',
    category: 'Aventureiros',
    tag: 'Mundo de Imaginação & Coragem',
    emoji: '🌟',
  },
  {
    id: 'gi_neto',
    name: 'Aventureira Vermelha',
    url: '/characters/gi_neto.webp',
    color: '#ff453a',
    category: 'Aventureiros',
    tag: 'Alegria e Superação',
    emoji: '🔴',
  },
  {
    id: 'alycia',
    name: 'Princesa Alycia (7 Anos)',
    url: '/characters/alycia.webp',
    color: '#ffd60a',
    category: 'Celebração',
    tag: 'A Estrela Mais Brilhante do Reino',
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

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  alpha: number
  emoji?: string
}

export const ImageFlockPrincesses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [activeCharacter, setActiveCharacter] = useState<PrincessCharacter>(PRINCESS_CHARACTERS[0])
  const [imagesReady, setImagesReady] = useState(false)
  const [isAnimatingSwitch, setIsAnimatingSwitch] = useState(false)
  const [switchBurstParticles, setSwitchBurstParticles] = useState<Particle[]>([])

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

  // Trigger jaw-dropping magical switch animation with starlight particle burst
  const triggerMagicSwitch = (char: PrincessCharacter) => {
    setActiveCharacter(char)
    setIsAnimatingSwitch(true)

    // Acorde celestial arpejado
    celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5, 1318.51])

    // Gerar 30 partículas estelares de explosão
    const emojis = ['✨', '⭐', '💖', '👑', '🌟', '💎', '🌸']
    const newParticles: Particle[] = Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
      const speed = 3 + Math.random() * 5
      return {
        id: Math.random() + Date.now(),
        x: 0,
        y: 0,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: char.color,
        size: 14 + Math.random() * 12,
        alpha: 1,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }
    })

    setSwitchBurstParticles(newParticles)

    setTimeout(() => {
      setIsAnimatingSwitch(false)
      setSwitchBurstParticles([])
    }, 900)
  }

  const handleNextCharacter = () => {
    const currentIndex = filteredCharacters.findIndex((c) => c.id === activeCharacter.id)
    const nextIndex = (currentIndex + 1) % filteredCharacters.length
    triggerMagicSwitch(filteredCharacters[nextIndex])
  }

  const handlePrevCharacter = () => {
    const currentIndex = filteredCharacters.findIndex((c) => c.id === activeCharacter.id)
    const prevIndex = (currentIndex - 1 + filteredCharacters.length) % filteredCharacters.length
    triggerMagicSwitch(filteredCharacters[prevIndex])
  }

  const handleRandomCharacter = () => {
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length)
    triggerMagicSwitch(filteredCharacters[randomIndex])
  }

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
    const cardBaseSize = Math.max(64, Math.min(cellW * 0.75, cellH * 0.75, 96))

    flockItemsRef.current = filteredCharacters.map((char, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const posX = col * cellW + cellW / 2 + (Math.random() - 0.5) * 16
      const posY = row * cellH + cellH / 2 + (Math.random() - 0.5) * 16
      return {
        char,
        x: posX,
        y: posY,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.3,
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

    // Clique no canvas para focar e acionar animação
    const onCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      let hitItem: FlockItem | null = null
      let minDist = Infinity

      flockItemsRef.current.forEach((item) => {
        const dx = item.x - clickX
        const dy = item.y - clickY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const hitRadius = (item.baseSize * item.currentScale) / 2
        if (dist < hitRadius && dist < minDist) {
          minDist = dist
          hitItem = item
        }
      })

      if (hitItem) {
        triggerMagicSwitch((hitItem as FlockItem).char)
      }
    }

    container.addEventListener('mousemove', onMouseMove, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })
    container.addEventListener('mouseleave', onPointerLeave)
    container.addEventListener('click', onCanvasClick)

    let animId: number
    let time = 0

    const render = () => {
      time += 0.02
      ctx.clearRect(0, 0, viewW, viewH)

      // Smooth Lerp focal point toward cursor or center
      const targetX = pointer.active ? pointer.x : viewW / 2
      const targetY = pointer.active ? pointer.y : viewH / 2
      focal.x += (targetX - focal.x) * 0.1
      focal.y += (targetY - focal.y) * 0.1

      const cursorRadius = Math.min(viewW, viewH) * 0.42

      // Draw each flock item - PREENCHENDO O QUADRADO INTEIRO COM A FOTO
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

        // Proximity scaling
        if (pointer.active && dist < cursorRadius) {
          const proximity = 1 - dist / cursorRadius
          const ease = Math.pow(proximity, 2)
          item.targetScale = 1.0 + ease * 1.85
        } else {
          item.targetScale = 0.96 + Math.sin(time + item.phase) * 0.06
        }

        item.currentScale += (item.targetScale - item.currentScale) * 0.12

        const size = item.baseSize * item.currentScale
        const drawX = item.x - size / 2
        const drawY = item.y - size / 2 + floatY
        const cornerRadius = Math.max(10, size * 0.2) // Squircle suave
        const isFocal = activeCharacter.id === item.char.id

        const img = imageMapRef.current.get(item.char.id)

        ctx.save()

        // 1. Sombra e Glow Dourado/Temático
        ctx.shadowColor = isFocal ? '#ffd60a' : item.char.color
        ctx.shadowBlur = isFocal ? 30 : 12 * item.currentScale

        // 2. QUADRADO INTEIRO COM BORDAS ARREDONDADAS
        ctx.beginPath()
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(drawX, drawY, size, size, cornerRadius)
        } else {
          ctx.rect(drawX, drawY, size, size)
        }
        ctx.fillStyle = '#0a0b12'
        ctx.fill()
        ctx.clip()

        // 3. FOTO PREENCHENDO O QUADRADO INTEIRO (OBJECT-COVER REAL)
        if (img && img.complete) {
          ctx.drawImage(img, drawX, drawY, size, size)
        } else {
          ctx.fillStyle = item.char.color
          ctx.fill()
        }

        ctx.restore()

        // 4. Borda Chanfrada de Luz ao Redor do Quadrado Inteiro
        ctx.save()
        ctx.beginPath()
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(drawX, drawY, size, size, cornerRadius)
        } else {
          ctx.rect(drawX, drawY, size, size)
        }
        ctx.strokeStyle = isFocal ? '#ffd60a' : item.char.color
        ctx.lineWidth = isFocal ? 3.5 : 2
        ctx.stroke()
        ctx.restore()
      })

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('mouseleave', onPointerLeave)
      container.removeEventListener('click', onCanvasClick)
    }
  }, [filteredCharacters, imagesReady, activeCharacter])

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#080811] to-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-sky-500/10 blur-[160px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#ffd60a] text-xs font-semibold tracking-wider uppercase mb-3 shadow-lg shadow-black/40">
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
            <span>Revoada Encantada • 32 Personagens Reais</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffd60a]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3">
            Onde a Imaginação Voa Livre
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Cada personagem flutua em seu quadrado mágico preenchido de luz.
            Toque em qualquer um para ver uma explosão mágica e colocá-lo no palco real!
          </p>
        </div>

        {/* 
          PALCO MÁGICO DE DESTAQUE REAL COM ANIMAÇÃO INCRÍVEL DE TROCA
          Foto preenchendo o quadrado inteiro com partículas e transição de estúdio
        */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative p-1 rounded-[36px] bg-gradient-to-b from-white/20 via-[#ffd60a]/30 to-white/5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
            <div className="relative rounded-[32px] bg-[#121217] p-6 border border-white/10 backdrop-blur-2xl flex flex-col items-center text-center overflow-hidden">
              {/* Efeito de Explosão de Partículas na Troca */}
              {isAnimatingSwitch && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                  {switchBurstParticles.map((p, idx) => (
                    <span
                      key={p.id || idx}
                      className="absolute text-lg animate-ping opacity-90"
                      style={{
                        transform: `translate(${p.vx * 24}px, ${p.vy * 24}px)`,
                        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                    >
                      {p.emoji || '✨'}
                    </span>
                  ))}
                  <div className="absolute inset-0 bg-radial from-[#ffd60a]/30 via-transparent to-transparent animate-pulse" />
                </div>
              )}

              {/* QUADRADO INTEIRO PREENCHIDO COM A FOTO DO PERSONAGEM */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 group">
                <img
                  src={activeCharacter.url}
                  alt={activeCharacter.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isAnimatingSwitch ? 'scale-110 rotate-2 brightness-125' : 'scale-100 rotate-0 brightness-100'
                  }`}
                />
                {/* Vinheta e Brilho Angular */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Badge de Categoria no Canto */}
                <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white">
                  {activeCharacter.emoji} {activeCharacter.category}
                </span>

                {/* Indicador de Foto Inteira 100% */}
                <span className="absolute bottom-3 right-3 text-[10px] font-mono text-[#ffd60a] bg-black/75 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                  1:1 HD
                </span>
              </div>

              {/* Informações Nobres do Personagem */}
              <div className="mt-5 w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                  {activeCharacter.name}
                </h3>
                <p
                  className="text-xs sm:text-sm font-semibold tracking-wide mt-1"
                  style={{ color: activeCharacter.color }}
                >
                  {activeCharacter.tag}
                </p>
              </div>

              {/* Controles Interativos de Troca (Anterior / Sorteio / Próximo) */}
              <div className="mt-5 flex items-center gap-3 w-full justify-center">
                <button
                  type="button"
                  onClick={handlePrevCharacter}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                  title="Personagem Anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleRandomCharacter}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] text-black font-bold text-xs flex items-center gap-2 shadow-lg shadow-[#ffd60a]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Trocar para um Personagem Surpresa"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Trocar Mágico</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextCharacter}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
                  title="Próximo Personagem"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
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
                    ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff375f] text-black shadow-lg shadow-[#ffd60a]/20 scale-105 font-bold'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                {cat === 'Todos' && '✨ Todos (32)'}
                {cat === 'Princesas' && '👑 Princesas'}
                {cat === 'Frozen' && '❄️ Frozen'}
                {cat === 'Desenhos' && '🎨 Desenhos Favoritos'}
                {cat === 'Aventureiros' && '🎈 Aventureiros 3D'}
              </button>
            )
          })}
        </div>

        {/* 
          ENCHANTED FLOCK CANVAS (TODOS OS QUADRADOS PREENCHIDOS COM A FOTO)
        */}
        <div
          ref={containerRef}
          className="relative w-full h-[480px] sm:h-[580px] rounded-[32px] overflow-hidden bg-[#070814]/95 border border-white/15 backdrop-blur-2xl shadow-2xl cursor-pointer select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {/* Floating Instructions */}
          <div className="absolute bottom-4 left-6 pointer-events-none text-xs text-zinc-200 flex items-center gap-2 bg-black/80 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffd60a] animate-ping" />
            <span>Toque em qualquer quadrado para fazer a mágica acontecer!</span>
          </div>

          <div className="absolute top-4 right-6 pointer-events-none text-xs text-[#ffd60a] font-mono flex items-center gap-1.5 bg-black/75 px-3 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 text-[#ffd60a] fill-[#ffd60a]" />
            <span>{filteredCharacters.length} fotos quadradas voando</span>
          </div>
        </div>

        {/* 
          INTERACTIVE CHARACTER GALLERY - QUADRADOS INTEIROS 100% LIMPOS
        */}
        <div className="mt-12">
          <div className="text-center text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#ffd60a]" />
            <span>Toque para Escolher</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ffd60a]" />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {filteredCharacters.map((item) => {
              const isFocal = activeCharacter.id === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => triggerMagicSwitch(item)}
                  className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer p-0 shadow-lg ${
                    isFocal
                      ? 'border-[#ffd60a] shadow-[#ffd60a]/30 scale-105 z-10 ring-4 ring-[#ffd60a]/20'
                      : 'border-white/10 hover:border-white/40 hover:scale-105'
                  }`}
                  title={item.name}
                >
                  {/* FOTO PREENCHENDO O QUADRADO INTEIRO 100% LIMPA */}
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Halo Luminoso quando Selecionado */}
                  {isFocal && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ffd60a] shadow-[0_0_10px_#ffd60a] border border-black" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
