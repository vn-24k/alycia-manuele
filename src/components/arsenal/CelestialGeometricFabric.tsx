import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Sparkles, Crown, Heart, Flower2, Waves, Play, Pause, Volume2, VolumeX, RotateCcw, Zap } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface Vector3 {
  x: number
  y: number
  z: number
}

interface GeometricNode {
  curr: Vector3
  prev: Vector3
  base: Vector3
  target: Vector3
  proj: { x: number; y: number; scale: number; alpha: number; z: number }
  pinned: boolean
  phase: number
  color: string
  size: number
  isSpecial?: boolean
}

interface SpringLink {
  p1: number
  p2: number
  length: number
  color: string
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  strength: number
}

export type TopologyMode = 'coroa' | 'manto' | 'rosa' | 'coracao'

export function CelestialGeometricFabric() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [activeMode, setActiveMode] = useState<TopologyMode>('coroa')
  const [isPlaying, setIsPlaying] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [shockwaveCount, setShockwaveCount] = useState(0)
  const [fps, setFps] = useState(120)

  const pointerRef = useRef({
    x: -2000,
    y: -2000,
    isDown: false,
    downX: 0,
    downY: 0,
    targetAngleX: 0.18,
    targetAngleY: -0.05,
    angleX: 0.18,
    angleY: -0.05,
    radius: 220,
    shockwaves: [] as Shockwave[],
  })

  const nodesRef = useRef<GeometricNode[]>([])
  const linksRef = useRef<SpringLink[]>([])
  const dimensionsRef = useRef({ width: 0, height: 0 })
  const animationFrameRef = useRef<number | null>(null)

  // Color palette: Royal Gold, Champagne, Rose Gold, Celestial Violet
  const COLORS = {
    gold: '#ffd60a',
    champagne: '#fff8e7',
    rose: '#ff375f',
    violet: '#bf5af2',
    blue: '#64d2ff',
  }

  // 1. Build initial node points and target positions for each topology
  const buildTopologyTargets = useCallback((mode: TopologyMode, width: number, height: number) => {
    const nodes = nodesRef.current
    if (nodes.length === 0) return

    const cx = 0
    const cy = 0
    const total = nodes.length

    if (mode === 'coroa') {
      // 3D Royal Crown: Cylindrical base with 7 majestic arches and diamond peaks
      const radius = Math.min(width, height) * 0.32
      const crownHeight = 160
      const peaks = 7

      nodes.forEach((node, idx) => {
        const u = (idx % 24) / 24
        const ring = Math.floor(idx / 24)
        const totalRings = Math.ceil(total / 24)
        const v = ring / Math.max(1, totalRings - 1)

        const theta = u * Math.PI * 2
        // Scalloped peak modulation
        const archWave = Math.sin(u * Math.PI * 2 * peaks) * 45 * v
        const crownR = radius * (1 + 0.15 * v)

        const x = cx + Math.cos(theta) * crownR
        const z = Math.sin(theta) * crownR
        const y = cy + (v - 0.5) * crownHeight - archWave

        node.target = { x, y, z }
        node.color = idx % peaks === 0 ? COLORS.rose : v > 0.8 ? COLORS.gold : COLORS.champagne
        node.size = idx % peaks === 0 ? 3.8 : 2.2 + Math.random() * 1.2
      })
    } else if (mode === 'manto') {
      // 3D Manto das Estrelas: Undulating cosmic tapestry / topological fabric
      const cols = 28
      const rows = Math.ceil(total / cols)
      const spacing = Math.min(width, height) * 0.038

      const startX = -(cols * spacing) / 2
      const startY = -(rows * spacing) / 2

      nodes.forEach((node, idx) => {
        const i = idx % cols
        const j = Math.floor(idx / cols)
        const bx = startX + i * spacing
        const by = startY + j * spacing
        const bz = Math.sin((i / cols) * Math.PI * 3) * 60 + Math.cos((j / rows) * Math.PI * 2) * 45

        node.target = { x: bx, y: by, z: bz }
        node.color = (i + j) % 5 === 0 ? COLORS.gold : (i + j) % 3 === 0 ? COLORS.blue : COLORS.champagne
        node.size = 2.0 + Math.random() * 1.5
      })
    } else if (mode === 'rosa') {
      // 3D Rosa Encantada: Parametric sacred lotus / rose with golden ratio spiral petals
      const phi = (1 + Math.sqrt(5)) / 2
      const maxR = Math.min(width, height) * 0.36

      nodes.forEach((node, idx) => {
        const rFrac = Math.sqrt(idx / total)
        const theta = idx * phi * Math.PI * 2
        const r = rFrac * maxR

        // Petal cup curvature
        const z = -Math.cos(rFrac * Math.PI) * 110 + Math.sin(theta * 5) * 20
        const x = cx + Math.cos(theta) * r
        const y = cy + Math.sin(theta) * r

        node.target = { x, y, z }
        node.color = rFrac < 0.25 ? COLORS.gold : rFrac < 0.7 ? COLORS.rose : COLORS.violet
        node.size = 2.4 + (1 - rFrac) * 2.0
      })
    } else if (mode === 'coracao') {
      // 3D Coração Eterno: Parametric 3D Heart Manifold
      const scale = Math.min(width, height) * 0.019

      nodes.forEach((node, idx) => {
        const t = (idx / total) * Math.PI * 2 * 3
        const layer = (idx % 7) / 7 - 0.5
        const hScale = scale * (1 - Math.abs(layer) * 0.4)

        // 3D Heart parametric equations
        const hx = 16 * Math.pow(Math.sin(t), 3) * hScale
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * hScale
        const hz = layer * 180 + Math.sin(t * 3) * 25

        node.target = { x: hx, y: hy, z: hz }
        node.color = Math.abs(layer) < 0.15 ? COLORS.rose : COLORS.gold
        node.size = 2.6 + Math.random() * 1.4
      })
    }
  }, [COLORS])

  // Initialize nodes and links
  const initGeometry = useCallback(() => {
    const { width, height } = dimensionsRef.current
    if (width === 0 || height === 0) return

    const totalNodes = 360
    const nodes: GeometricNode[] = []
    const links: SpringLink[] = []

    for (let i = 0; i < totalNodes; i++) {
      const p: Vector3 = {
        x: (Math.random() - 0.5) * width * 0.6,
        y: (Math.random() - 0.5) * height * 0.6,
        z: (Math.random() - 0.5) * 200,
      }

      nodes.push({
        curr: { ...p },
        prev: { ...p },
        base: { ...p },
        target: { ...p },
        proj: { x: 0, y: 0, scale: 1, alpha: 1, z: 0 },
        pinned: false,
        phase: Math.random() * Math.PI * 2,
        color: COLORS.gold,
        size: 2.5,
      })
    }

    // Connect structural geometric nearest-neighbor springs
    for (let i = 0; i < totalNodes; i++) {
      // Ring neighbor
      if (i < totalNodes - 1) {
        links.push({
          p1: i,
          p2: i + 1,
          length: 32,
          color: 'rgba(255, 214, 10, 0.22)',
        })
      }
      // Cross lattice neighbor
      if (i + 24 < totalNodes) {
        links.push({
          p1: i,
          p2: i + 24,
          length: 40,
          color: 'rgba(255, 248, 231, 0.14)',
        })
      }
      // Diagonal bracing for elasticity
      if (i % 6 === 0 && i + 25 < totalNodes) {
        links.push({
          p1: i,
          p2: i + 25,
          length: 50,
          color: 'rgba(255, 55, 95, 0.15)',
        })
      }
    }

    nodesRef.current = nodes
    linksRef.current = links

    buildTopologyTargets(activeMode, width, height)
  }, [activeMode, buildTopologyTargets, COLORS])

  // Change active topology
  const handleSwitchTopology = (mode: TopologyMode) => {
    setActiveMode(mode)
    const { width, height } = dimensionsRef.current
    buildTopologyTargets(mode, width, height)

    if (soundEnabled) {
      if (mode === 'coroa') celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5])
      else if (mode === 'rosa') celestialAudio.playCelestialHarp([587.33, 739.99, 880.0, 1174.66])
      else if (mode === 'coracao') celestialAudio.playCelestialHarp([440.0, 554.37, 659.25, 880.0])
      else celestialAudio.playCelestialHarp([392.0, 493.88, 587.33, 783.99])
    }
  }

  // Trigger radial celestial shockwave
  const triggerShockwave = (x?: number, y?: number) => {
    const { width, height } = dimensionsRef.current
    const swX = x !== undefined ? x : width / 2
    const swY = y !== undefined ? y : height / 2

    pointerRef.current.shockwaves.push({
      x: swX,
      y: swY,
      radius: 0,
      maxRadius: Math.max(width, height) * 0.85,
      strength: 75,
    })

    setShockwaveCount((prev) => prev + 1)

    if (soundEnabled) {
      celestialAudio.playStarBurst()
    }
  }

  // Canvas setup and resize observer
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const handleResize = () => {
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      dimensionsRef.current = { width: rect.width, height: rect.height }

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      initGeometry()
    }

    handleResize()
    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
    }
  }, [initGeometry])

  // Main 3D Animation & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let lastTime = performance.now()
    let frameCounter = 0
    let fpsTimer = performance.now()

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.033)
      lastTime = time

      // FPS tracking
      frameCounter++
      if (time - fpsTimer >= 1000) {
        setFps(frameCounter)
        frameCounter = 0
        fpsTimer = time
      }

      const { width, height } = dimensionsRef.current
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(render)
        return
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.save()
      ctx.scale(dpr, dpr)

      // Smooth clear with trail effect
      ctx.fillStyle = 'rgba(7, 7, 10, 0.38)'
      ctx.fillRect(0, 0, width, height)

      const pointer = pointerRef.current

      // Smooth camera interpolation
      pointer.angleX += (pointer.targetAngleX - pointer.angleX) * 0.08
      pointer.angleY += (pointer.targetAngleY - pointer.angleY) * 0.08

      // Continuous subtle idle rotation when pointer is idle
      if (!pointer.isDown) {
        pointer.targetAngleY += 0.002
      }

      const cosY = Math.cos(pointer.angleY)
      const sinY = Math.sin(pointer.angleY)
      const cosX = Math.cos(pointer.angleX)
      const sinX = Math.sin(pointer.angleX)

      const fov = 750
      const cx = width / 2
      const cy = height / 2

      const nodes = nodesRef.current
      const links = linksRef.current

      // 1. Update shockwaves
      for (let s = pointer.shockwaves.length - 1; s >= 0; s--) {
        const sw = pointer.shockwaves[s]
        sw.radius += 520 * dt
        sw.strength *= Math.pow(0.05, dt)

        if (sw.radius > sw.maxRadius || sw.strength < 0.5) {
          pointer.shockwaves.splice(s, 1)
        }
      }

      // 2. Physics & Node Target Interpolation
      if (isPlaying) {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i]

          // Smooth morphing towards target topology
          n.base.x += (n.target.x - n.base.x) * 0.06
          n.base.y += (n.target.y - n.base.y) * 0.06
          n.base.z += (n.target.z - n.base.z) * 0.06

          // Gentle harmonic float oscillation
          const floatOffset = Math.sin(time * 0.002 + n.phase) * 6

          // Verlet velocity
          const vx = (n.curr.x - n.prev.x) * 0.94
          const vy = (n.curr.y - n.prev.y) * 0.94
          const vz = (n.curr.z - n.prev.z) * 0.94

          n.prev.x = n.curr.x
          n.prev.y = n.curr.y
          n.prev.z = n.curr.z

          n.curr.x += vx + (n.base.x - n.curr.x) * 0.08
          n.curr.y += vy + (n.base.y + floatOffset - n.curr.y) * 0.08
          n.curr.z += vz + (n.base.z - n.curr.z) * 0.08

          // Pointer proximity repulsion / gravitational tug
          if (pointer.x > 0 && pointer.y > 0) {
            const dx = n.proj.x - pointer.x
            const dy = n.proj.y - pointer.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < pointer.radius && dist > 1) {
              const force = (1 - dist / pointer.radius) * (pointer.isDown ? -25 : 18)
              n.curr.x += (dx / dist) * force
              n.curr.y += (dy / dist) * force
              n.curr.z += Math.sin(dist * 0.05) * force * 1.5
            }
          }

          // Shockwave perturbation in 3D
          for (let s = 0; s < pointer.shockwaves.length; s++) {
            const sw = pointer.shockwaves[s]
            const dx = n.proj.x - sw.x
            const dy = n.proj.y - sw.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const diff = Math.abs(dist - sw.radius)

            if (diff < 50) {
              const waveFactor = (1 - diff / 50) * sw.strength
              n.curr.z += Math.sin(diff * 0.1) * waveFactor * 0.8
              n.curr.x += (dx / Math.max(1, dist)) * waveFactor * 0.3
              n.curr.y += (dy / Math.max(1, dist)) * waveFactor * 0.3
            }
          }
        }

        // Structural spring relaxation (2 iterations for stability)
        for (let iter = 0; iter < 2; iter++) {
          for (let k = 0; k < links.length; k++) {
            const link = links[k]
            const p1 = nodes[link.p1]
            const p2 = nodes[link.p2]

            const dx = p2.curr.x - p1.curr.x
            const dy = p2.curr.y - p1.curr.y
            const dz = p2.curr.z - p1.curr.z
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            if (dist > 0.001) {
              const diff = (dist - link.length) / dist
              const offsetX = dx * 0.5 * diff * 0.12
              const offsetY = dy * 0.5 * diff * 0.12
              const offsetZ = dz * 0.5 * diff * 0.12

              p1.curr.x += offsetX
              p1.curr.y += offsetY
              p1.curr.z += offsetZ

              p2.curr.x -= offsetX
              p2.curr.y -= offsetY
              p2.curr.z -= offsetZ
            }
          }
        }
      }

      // 3. 3D Perspective Projection
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Rotate around Y axis
        const x1 = n.curr.x * cosY + n.curr.z * sinY
        const z1 = -n.curr.x * sinY + n.curr.z * cosY

        // Rotate around X axis
        const y2 = n.curr.y * cosX - z1 * sinX
        const z2 = n.curr.y * sinX + z1 * cosX

        const zCam = z2 + 650
        const scale = fov / Math.max(zCam, 80)
        const alpha = Math.min(Math.max((zCam - 200) / 700, 0.25), 1)

        n.proj = {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          scale,
          alpha,
          z: z2,
        }
      }

      // 4. Render Structural Springs
      ctx.lineWidth = 1.1
      for (let k = 0; k < links.length; k++) {
        const link = links[k]
        const p1 = nodes[link.p1]
        const p2 = nodes[link.p2]

        // Depth sorting alpha
        const avgAlpha = (p1.proj.alpha + p2.proj.alpha) * 0.5
        ctx.strokeStyle = link.color.replace('0.22', `${0.25 * avgAlpha}`).replace('0.14', `${0.18 * avgAlpha}`)
        ctx.beginPath()
        ctx.moveTo(p1.proj.x, p1.proj.y)
        ctx.lineTo(p2.proj.x, p2.proj.y)
        ctx.stroke()
      }

      // 5. Render Glowing Geometric Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        const radius = Math.max(1, n.size * n.proj.scale)
        const alpha = n.proj.alpha

        // Outer starlight glow
        const glowRad = radius * 3.5
        const grad = ctx.createRadialGradient(
          n.proj.x,
          n.proj.y,
          0,
          n.proj.x,
          n.proj.y,
          glowRad
        )
        grad.addColorStop(0, n.color)
        grad.addColorStop(0.4, n.color.replace(')', ', 0.35)').replace('rgb', 'rgba'))
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.proj.x, n.proj.y, glowRad, 0, Math.PI * 2)
        ctx.fill()

        // Crisp central gem / star core
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(n.proj.x, n.proj.y, radius * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      // 6. Render Shockwave Rings on Canvas
      for (let s = 0; s < pointer.shockwaves.length; s++) {
        const sw = pointer.shockwaves[s]
        const swAlpha = (sw.strength / 75) * 0.75

        ctx.strokeStyle = `rgba(255, 214, 10, ${swAlpha})`
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.stroke()

        ctx.strokeStyle = `rgba(255, 55, 95, ${swAlpha * 0.5})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius * 0.88, 0, Math.PI * 2)
        ctx.stroke()
      }

      ctx.restore()
      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, soundEnabled])

  // Pointer event handlers for tactile 3D control
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    pointerRef.current.isDown = true
    pointerRef.current.downX = e.clientX
    pointerRef.current.downY = e.clientY
    pointerRef.current.x = x
    pointerRef.current.y = y

    triggerShockwave(x, y)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    pointerRef.current.x = x
    pointerRef.current.y = y

    if (pointerRef.current.isDown) {
      const dx = e.clientX - pointerRef.current.downX
      const dy = e.clientY - pointerRef.current.downY
      pointerRef.current.downX = e.clientX
      pointerRef.current.downY = e.clientY

      pointerRef.current.targetAngleY += dx * 0.005
      pointerRef.current.targetAngleX = Math.max(-0.6, Math.min(0.6, pointerRef.current.targetAngleX + dy * 0.005))
    }
  }

  const handlePointerUp = () => {
    pointerRef.current.isDown = false
  }

  const handlePointerLeave = () => {
    pointerRef.current.isDown = false
    pointerRef.current.x = -2000
    pointerRef.current.y = -2000
  }

  return (
    <section
      id="manto-3d"
      className="relative min-h-[820px] lg:min-h-[880px] w-full bg-[#07070a] text-white py-16 px-4 overflow-hidden border-b border-white/[0.08] flex flex-col items-center justify-between"
    >
      {/* Background Radial Light (Gold & Rose Gold) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[480px] bg-gradient-to-b from-[#ffd60a]/15 via-[#ff375f]/10 to-transparent blur-[160px] pointer-events-none -z-0" />

      {/* Top Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto pt-4 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] mb-4 shadow-lg shadow-black/40 backdrop-blur-md">
          <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
          Interação Geométrica 3D • Sete Anos de Pura Magia
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3 leading-tight">
          O Manto Celestial das Estrelas
        </h2>

        <p className="text-base sm:text-lg text-[#a1a1a6] max-w-xl mx-auto leading-relaxed">
          Arraste com o dedo ou mouse para girar no espaço 3D. Toque na malha para disparar ondas sonoras de carinho e transformar a geometria sagrada.
        </p>

        {/* Topologies Morphing Bar */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center mt-6">
          <button
            onClick={() => handleSwitchTopology('coroa')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'coroa'
                ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] text-black shadow-lg shadow-[#ffd60a]/30 scale-105'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-[#d2d2d7] border border-white/[0.1]'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            Coroa Real de 7 Anos
          </button>

          <button
            onClick={() => handleSwitchTopology('manto')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'manto'
                ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] text-black shadow-lg shadow-[#ffd60a]/30 scale-105'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-[#d2d2d7] border border-white/[0.1]'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            Manto das Estrelas
          </button>

          <button
            onClick={() => handleSwitchTopology('rosa')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'rosa'
                ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] text-black shadow-lg shadow-[#ffd60a]/30 scale-105'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-[#d2d2d7] border border-white/[0.1]'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            Rosa Encantada
          </button>

          <button
            onClick={() => handleSwitchTopology('coracao')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeMode === 'coracao'
                ? 'bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] text-black shadow-lg shadow-[#ffd60a]/30 scale-105'
                : 'bg-white/[0.08] hover:bg-white/[0.15] text-[#d2d2d7] border border-white/[0.1]'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            Coração Eterno
          </button>
        </div>
      </div>

      {/* 3D Geometric Interactive Canvas Box */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        className="relative z-10 w-full max-w-[1080px] h-[460px] sm:h-[540px] my-6 rounded-3xl overflow-hidden border border-white/[0.12] bg-[#0c0c11]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing select-none group touch-none"
      >
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

        {/* Hint Overlay (fades out on interaction) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2 text-[11px] text-[#a1a1a6] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <Sparkles className="w-3 h-3 text-[#ffd60a]" />
          <span>Arraste para girar em 3D • Clique para criar ondas</span>
        </div>

        {/* Live Physics Telemetry Badge */}
        <div className="absolute top-4 right-4 z-20 pointer-events-none flex items-center gap-3 text-[11px] text-[#a1a1a6] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 font-mono">
          <span className="flex items-center gap-1 text-[#30d158]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30d158] animate-ping" />
            {fps} FPS
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-[#ffd60a]">360 Nós Estelares</span>
        </div>

        {/* Bottom Floating Control Pod */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/75 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 shadow-2xl">
          <button
            onClick={(e) => {
              e.stopPropagation()
              triggerShockwave()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffd60a]/20 hover:bg-[#ffd60a]/30 text-[#ffd60a] border border-[#ffd60a]/40 text-xs font-medium transition-all active:scale-95"
            title="Lançar Onda Mágica"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Onda Mágica</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsPlaying(!isPlaying)
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            title={isPlaying ? 'Pausar Física' : 'Retomar Física'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              setSoundEnabled(!soundEnabled)
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            title={soundEnabled ? 'Som Ativado' : 'Som Desativado'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#ffd60a]" /> : <VolumeX className="w-3.5 h-3.5 text-neutral-400" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              pointerRef.current.targetAngleX = 0.18
              pointerRef.current.targetAngleY = -0.05
              celestialAudio.playSoftClick()
            }}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            title="Centralizar Câmera 3D"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ticker de Virtudes da Geometria Sagrada */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-[840px] mx-auto text-center border-t border-white/[0.08] w-full pt-6">
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#ffd60a]">Coroa Real</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Nobreza & Bondade</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-white">Manto Estelar</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Proteção Perpétua</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#ff375f]">Rosa de Ouro</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Criatividade & Doçura</div>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#bf5af2]">Coração Infinito</div>
          <div className="text-xs text-[#a1a1a6] mt-0.5">Amor Eterno de Pai</div>
        </div>
      </div>
    </section>
  )
}
