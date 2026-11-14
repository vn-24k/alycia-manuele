import React, { useEffect, useRef, useState, useMemo } from 'react'
import { Sparkles, Crown, Heart, Compass, Star } from 'lucide-react'
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

// 32 Personagens Reais: Princesas, Frozen, Desenhos, Heróis Infantis e a Aniversariante
export const PRINCESS_IMAGES: PrincessCharacter[] = [
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

  // 4. Desenhos & Ícones Infantis Favoritos
  {
    id: 'minnie',
    name: 'Minnie Mouse',
    url: '/characters/minnie.webp',
    color: '#ff375f',
    category: 'Desenhos',
    tag: 'Laço Vermelho com Poá',
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

  // 5. Aventureiros & Celebração de 7 Anos
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

export const ImageFlockPrincesses: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [activeCharacter, setActiveCharacter] = useState<PrincessCharacter>(PRINCESS_IMAGES[0])

  // Filtered characters list
  const filteredCharacters = useMemo(() => {
    if (selectedCategory === 'Todos') return PRINCESS_IMAGES
    return PRINCESS_IMAGES.filter((c) => c.category === selectedCategory)
  }, [selectedCategory])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Carregar imagens locais dos 32 personagens
    const loadedImgs: { img: HTMLImageElement; data: PrincessCharacter }[] = []
    filteredCharacters.forEach((item) => {
      const img = new Image()
      img.src = item.url
      img.onload = () => {
        loadedImgs.push({ img, data: item })
      }
    })

    // Configurações do motor da Revoada (Image-Flock)
    const config = {
      gridSizeDesktop: 0.11,
      gridSizeMobile: 0.17,
      gridSpacing: 0.07,
      cursorReach: 0.44,
      maxImageScale: 3.2,
      driftSpeed: 32,
      followSpeed: 6.5,
    }

    let viewW = container.clientWidth
    let viewH = container.clientHeight
    let imageBaseSize = viewW * config.gridSizeDesktop
    let spacing = viewH * config.gridSpacing
    let gridStep = imageBaseSize + spacing
    let gridColumns = Math.ceil(viewW / gridStep) + 3
    let gridRows = Math.ceil(viewH / gridStep) + 3
    let cursorReach = Math.min(viewW, viewH) * config.cursorReach

    const resizeCanvas = () => {
      if (!container || !canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      viewW = container.clientWidth
      viewH = container.clientHeight
      canvas.width = viewW * dpr
      canvas.height = viewH * dpr
      canvas.style.width = `${viewW}px`
      canvas.style.height = `${viewH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      imageBaseSize = viewW < 768 ? viewH * config.gridSizeMobile : viewH * config.gridSizeDesktop
      spacing = viewH * config.gridSpacing
      gridStep = imageBaseSize + spacing
      gridColumns = Math.ceil(viewW / gridStep) + 3
      gridRows = Math.ceil(viewH / gridStep) + 3
      cursorReach = Math.min(viewW, viewH) * config.cursorReach
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Coordenadas com aproximação suave (Lerp)
    const mousePos = { x: viewW / 2, y: viewH / 2 }
    const focalPoint = { x: mousePos.x, y: mousePos.y }

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      }

      mousePos.x = clientX - rect.left
      mousePos.y = clientY - rect.top
    }

    container.addEventListener('mousemove', onPointerMove, { passive: true })
    container.addEventListener('touchmove', onPointerMove, { passive: true })

    function wrapAround(val: number, min: number, max: number) {
      const range = max - min
      return ((((val - min) % range) + range) % range) + min
    }

    function cursorInfluence(dist: number, maxDist: number) {
      if (dist >= maxDist) return 0
      const norm = dist / maxDist
      const falloff = 1 - norm * norm
      return falloff * falloff
    }

    let animId: number
    let startTime = performance.now()
    let lastTime = startTime
    let lastAudioTrigger = 0

    const render = (currentTime: number) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1)
      const elapsed = (currentTime - startTime) / 1000
      lastTime = currentTime

      focalPoint.x += (mousePos.x - focalPoint.x) * dt * config.followSpeed
      focalPoint.y += (mousePos.y - focalPoint.y) * dt * config.followSpeed

      ctx.clearRect(0, 0, viewW, viewH)

      if (loadedImgs.length > 0) {
        const driftX = elapsed * config.driftSpeed
        const driftY = -elapsed * (config.driftSpeed * 0.72)

        const wrapMinX = -gridStep
        const wrapMaxX = viewW + gridStep
        const wrapMinY = -gridStep
        const wrapMaxY = viewH + gridStep

        let closestChar: PrincessCharacter | null = null
        let minProximity = Infinity

        for (let row = -1; row < gridRows; row++) {
          for (let col = -1; col < gridColumns; col++) {
            const cellX = wrapAround(col * gridStep + driftX, wrapMinX, wrapMaxX)
            const cellY = wrapAround(row * gridStep + driftY, wrapMinY, wrapMaxY)

            const pairIdx = Math.abs((col * 13 + row * 19) % loadedImgs.length)
            const pair = loadedImgs[pairIdx]
            if (!pair || !pair.img) continue

            const cellCenterX = cellX + imageBaseSize / 2
            const cellCenterY = cellY + imageBaseSize / 2
            const dx = cellCenterX - focalPoint.x
            const dy = cellCenterY - focalPoint.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist > cursorReach) continue

            const influence = cursorInfluence(dist, cursorReach)
            const scale = influence * config.maxImageScale
            if (scale < 0.08) continue

            if (dist < minProximity) {
              minProximity = dist
              closestChar = pair.data
            }

            const imgW = imageBaseSize * scale
            const imgH = imageBaseSize * scale
            const drawX = cellX + (imageBaseSize - imgW) / 2
            const drawY = cellY + (imageBaseSize - imgH) / 2

            // Desenho do card com bordas arredondadas e sombra colorida
            ctx.save()
            ctx.shadowColor = pair.data.color
            ctx.shadowBlur = 18 * influence
            ctx.beginPath()
            ctx.roundRect(drawX, drawY, imgW, imgH, 20 * influence)
            ctx.clip()

            ctx.drawImage(pair.img, drawX, drawY, imgW, imgH)
            ctx.restore()

            // Moldura brilhante do personagem
            ctx.save()
            ctx.strokeStyle = pair.data.color
            ctx.lineWidth = 2.5 * influence
            ctx.beginPath()
            ctx.roundRect(drawX, drawY, imgW, imgH, 20 * influence)
            ctx.stroke()
            ctx.restore()
          }
        }

        if (closestChar && minProximity < 140) {
          setActiveCharacter(closestChar)
          if (currentTime - lastAudioTrigger > 600) {
            celestialAudio.playChime(659.25, 0.08, 0.9)
            lastAudioTrigger = currentTime
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
      container.removeEventListener('mousemove', onPointerMove)
      container.removeEventListener('touchmove', onPointerMove)
    }
  }, [filteredCharacters])

  return (
    <section className="bg-gradient-to-b from-[#000000] via-[#080712] to-[#000000] text-white py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] relative overflow-hidden">
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
            Passe o cursor ou deslize os dedinhos pela tela para atrair as princesas, heróis e desenhos
            mais amados pela Alycia em um céu de pura magia.
          </p>

          {/* Dynamic Active Character Pill Badge */}
          <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-900/90 border border-white/20 backdrop-blur-xl shadow-xl transition-all duration-200">
            <span className="text-xl">{activeCharacter.emoji}</span>
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

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {(['Todos', 'Princesas', 'Frozen', 'Desenhos', 'Aventureiros'] as const).map((cat) => {
            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat)
                  celestialAudio.playChime(523.25, 0.12)
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

        {/* Real Canvas Flock Engine (from Image-Flock) */}
        <div
          ref={containerRef}
          className="relative w-full h-[460px] sm:h-[540px] rounded-[32px] overflow-hidden bg-[#0a0817]/90 border border-white/15 backdrop-blur-2xl shadow-2xl cursor-crosshair select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

          {/* Interactive Hint Overlay */}
          <div className="absolute bottom-4 left-6 pointer-events-none text-xs text-zinc-300 flex items-center gap-2 bg-black/70 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Deslize o mouse ou o dedinho para expandir as imagens</span>
          </div>

          <div className="absolute top-4 right-6 pointer-events-none text-xs text-amber-300/80 font-mono flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/10">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{filteredCharacters.length} personagens no céu</span>
          </div>
        </div>

        {/* Horizontal Mini-Pills Gallery of Characters */}
        <div className="mt-8">
          <div className="text-center text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Toque em um personagem para focar
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isFocal
                      ? 'bg-white/20 border-white/50 text-white shadow-md scale-105'
                      : 'bg-white/[0.04] hover:bg-white/10 text-zinc-300 border-white/10 hover:border-white/25'
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-4 h-4 rounded-full object-cover"
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
