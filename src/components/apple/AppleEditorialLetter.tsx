import React from 'react'
import { Heart, Feather } from 'lucide-react'

export const AppleEditorialLetter: React.FC = () => {
  return (
    <section
      id="carta-pai"
      className="bg-[#0b0b0e] text-[#f5f5f7] py-24 px-4 overflow-hidden border-b border-white/[0.08] relative"
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#ff375f]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto relative z-10">
        {/* Apple Editorial Tag */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#ff375f] flex items-center justify-center gap-1.5 mb-3">
            <Feather className="w-3.5 h-3.5" />
            [Carta do Papai • 7 Anos]
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            [Título Principal da Carta]
          </h2>
          <div className="w-16 h-1 bg-[#ff375f]/40 mx-auto rounded-full" />
        </div>

        {/* The Letter Body (Clean Placeholders) */}
        <div className="bg-[#141418] rounded-[32px] p-8 sm:p-14 border border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-6 text-base sm:text-lg text-[#d2d2d7] leading-relaxed">
          <p className="font-medium text-white text-xl sm:text-2xl tracking-tight">
            Minha querida Alycia Manuele,
          </p>

          <p>
            [Parágrafo 01: Suas palavras sobre o nascimento dela e a transformação que ela trouxe para a sua vida...]
          </p>

          <p>
            [Parágrafo 02: Como é acompanhar o dia a dia, os primeiros passos e o sorriso que ilumina a casa...]
          </p>

          <p>
            [Parágrafo 03: As características que você mais admira nela aos 7 anos de idade...]
          </p>

          <p>
            [Parágrafo 04: Sua promessa de apoio, proteção incondicional e amor para o futuro dela...]
          </p>

          <div className="pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#86868b]">
                [Com amor eterno,]
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
                Seu Pai
                <Heart className="w-5 h-5 text-[#ff375f] fill-[#ff375f]" />
              </div>
            </div>

            <div className="text-xs text-[#86868b] sm:text-right">
              <div>[Capítulo Especial • 7 Anos]</div>
              <div>[Para Sempre no Coração]</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
