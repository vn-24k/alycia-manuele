import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Heart, Compass, Star, Calendar } from 'lucide-react'

export const ApplePinnedChapter: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Apple-grade transforms tied to scroll scrub
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [1, 1.25, 1.5, 2.2])
  const opacityStage1 = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const opacityStage2 = useTransform(scrollYProgress, [0.22, 0.35, 0.55], [0, 1, 0])
  const opacityStage3 = useTransform(scrollYProgress, [0.52, 0.68, 0.88], [0, 1, 0])
  const opacityStage4 = useTransform(scrollYProgress, [0.85, 1], [0, 1])

  return (
    <div
      id="scrolly-chapter"
      ref={containerRef}
      className="relative h-[400vh] bg-[#070514] text-white"
    >
      {/* Pinned Viewport Container (Sticky 100vh) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-6">
        {/* Background Radial Light Burst */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-purple-600/15 via-rose-500/15 to-amber-300/15 blur-[160px]" />
        </div>

        {/* Dynamic Central Scaling Core */}
        <motion.div
          style={{ scale }}
          className="pointer-events-none absolute flex items-center justify-center w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-purple-500/20 bg-gradient-to-tr from-purple-900/10 to-rose-500/10 backdrop-blur-3xl"
        >
          <div className="w-48 h-48 rounded-full border border-rose-300/20 animate-spin" style={{ animationDuration: '30s' }} />
        </motion.div>

        {/* Stage 1: The Monumental Apple Statement */}
        <motion.div
          style={{ opacity: opacityStage1 }}
          className="absolute text-center max-w-4xl px-4 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-purple-300 font-semibold mb-4 inline-block">
            Inovação do Afeto • Padrão Apple
          </span>
          <h2 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-none">
            Sete Anos em{' '}
            <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300">
              Movimento.
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-xl text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Role a tela para desdobrar a cinematografia de cada capítulo da vida de Alycia.
          </p>
        </motion.div>

        {/* Stage 2: 2019 - O Milagre da Vida */}
        <motion.div
          style={{ opacity: opacityStage2 }}
          className="absolute text-center max-w-3xl px-4 flex flex-col items-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/20 border border-amber-300/30 text-amber-200 mb-6 shadow-xl">
            <Heart className="h-7 w-7 fill-amber-200/40" />
          </div>
          <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
            Capítulo I • O Começo de Tudo
          </span>
          <h3 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mt-2">
            2019: O Primeiro Respiro
          </h3>
          <p className="mt-4 text-sm sm:text-lg text-neutral-300 max-w-lg leading-relaxed font-light">
            Quando seus olhos se abriram pela primeira vez, o universo do papai se reordenou. Um pacotinho de luz que trouxe sentido para todo o sempre.
          </p>
        </motion.div>

        {/* Stage 3: A Curiosidade & Gargalhadas */}
        <motion.div
          style={{ opacity: opacityStage3 }}
          className="absolute text-center max-w-3xl px-4 flex flex-col items-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 border border-rose-300/30 text-rose-200 mb-6 shadow-xl">
            <Sparkles className="h-7 w-7 text-rose-300" />
          </div>
          <span className="text-xs font-mono text-rose-300 uppercase tracking-widest">
            Capítulo II • Descobertas
          </span>
          <h3 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white mt-2">
            A Voz, a Arte & os Passos Firmes
          </h3>
          <p className="mt-4 text-sm sm:text-lg text-neutral-300 max-w-lg leading-relaxed font-light">
            Cores espalhadas na mesa, historinhas inventadas antes de dormir e aquela gargalhada doce que derrete qualquer dia difícil.
          </p>
        </motion.div>

        {/* Stage 4: 7 Anos O Grande Ápice */}
        <motion.div
          style={{ opacity: opacityStage4 }}
          className="absolute text-center max-w-3xl px-4 flex flex-col items-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 border border-purple-300/30 text-purple-200 mb-6 shadow-xl">
            <Star className="h-7 w-7 text-amber-300 fill-amber-300" />
          </div>
          <span className="text-xs font-mono text-purple-300 uppercase tracking-widest">
            Capítulo III • O Presente
          </span>
          <h3 className="font-serif-luxury text-5xl sm:text-7xl font-bold text-white mt-2">
            Sete Anos de Pura Magia
          </h3>
          <p className="mt-4 text-sm sm:text-lg text-neutral-300 max-w-lg leading-relaxed font-light">
            Alycia Manuele: o maior amor do mundo reunido em uma garotinha extraordinária.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
