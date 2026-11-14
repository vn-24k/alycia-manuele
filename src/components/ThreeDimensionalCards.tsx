import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Eye, Heart, Camera, Compass } from 'lucide-react'

interface CubeCardProps {
  frontTitle: string
  frontDesc: string
  backTitle: string
  backDesc: string
  imgSrc: string
}

const CubeCard: React.FC<CubeCardProps> = ({
  frontTitle,
  frontDesc,
  backTitle,
  backDesc,
  imgSrc,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setRotateY((x / rect.width) * 35)
    setRotateX(-(y / rect.height) * 35)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      className="relative w-72 sm:w-80 h-96 cursor-pointer select-none"
      style={{ perspective: 1400 }}
    >
      <div
        className="w-full h-full relative transition-transform duration-500 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`,
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-[#15122b] border border-purple-500/30 p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-neutral-900 mb-4">
            <img
              src={imgSrc}
              alt={frontTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#15122b] via-transparent to-transparent" />
            <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-rose-200 border border-white/10">
              3D Memória
            </span>
          </div>

          <div>
            <h4 className="font-serif-luxury text-xl font-bold text-white tracking-tight">
              {frontTitle}
            </h4>
            <p className="mt-1 text-xs text-neutral-300 leading-snug">
              {frontDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-200 font-mono">
            <span>Clique para Girar</span>
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-[#2a1754] via-[#1a0f3b] to-[#0e0724] border border-rose-400/40 p-6 flex flex-col justify-between shadow-2xl"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex items-center justify-between">
            <Heart className="h-6 w-6 text-rose-300 fill-rose-300/40" />
            <span className="text-[10px] uppercase tracking-wider text-purple-200">
              Verso da Lembrança
            </span>
          </div>

          <div className="my-auto text-center px-2">
            <h4 className="font-serif-luxury text-2xl font-bold text-white">
              {backTitle}
            </h4>
            <p className="mt-3 text-xs text-neutral-200 leading-relaxed font-light">
              {backDesc}
            </p>
          </div>

          <div className="pt-3 border-t border-white/10 text-center text-[11px] text-neutral-400">
            <span>Toque para Voltar</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ThreeDimensionalCards: React.FC = () => {
  return (
    <section id="memorias" className="relative py-28 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-rose-300 font-semibold inline-block mb-3">
          Física 3D Interativa
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Cards Tridimensionais com{' '}
          <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300">
            Paralaxe e Giro.
          </span>
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Passe o mouse ou toque para inclinar os cubos em 3D e revelar os momentos mais preciosos de Alycia.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8">
        <CubeCard
          frontTitle="O Sorriso que Ilumina Tudo"
          frontDesc="Aquele riso sincero capaz de desarmar qualquer cansaço e trazer paz instantânea."
          backTitle="O Abraço do Papai"
          backDesc="Um refúgio infinito onde o amor não tem medidas e a ternura é eterna."
          imgSrc="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800&auto=format&fit=crop"
        />

        <CubeCard
          frontTitle="Pintando o Próprio Mundo"
          frontDesc="Dedinhos coloridos, folhas cheias de vida e uma imaginação que não conhece limites."
          backTitle="A Pequena Artista"
          backDesc="Cada traço reflete a sensibilidade única e o coração nobre de Alycia."
          imgSrc="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=800&auto=format&fit=crop"
        />

        <CubeCard
          frontTitle="Sete Anos Extraordinários"
          frontDesc="Hoje comemoramos o maior presente que a vida já ofereceu ao coração do pai."
          backTitle="Para Sempre a Princesa"
          backDesc="Não importa quantos anos passem, você sempre será a dona do meu amor mais puro."
          imgSrc="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop"
        />
      </div>
    </section>
  )
}
