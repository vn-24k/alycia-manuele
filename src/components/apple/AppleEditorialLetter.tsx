import React from 'react'
import { Heart, Sparkles, Feather } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

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
            Carta do Papai • 7 Anos
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Uma promessa para toda a vida.
          </h2>
          <div className="w-16 h-1 bg-[#ff375f]/40 mx-auto rounded-full" />
        </div>

        {/* The Letter Body (Apple Executive Memo Style) */}
        <div className="bg-[#141418] rounded-[32px] p-8 sm:p-14 border border-white/[0.09] shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl space-y-6 text-base sm:text-lg text-[#d2d2d7] leading-relaxed">
          <p className="font-medium text-white text-xl sm:text-2xl tracking-tight">
            Minha querida Alycia Manuele,
          </p>

          <p>
            Há exatamente 7 anos, minha vida ganhou um significado infinitamente maior. No momento em que você chegou ao mundo, todas as prioridades se reorganizaram e meu coração encontrou sua morada mais bonita.
          </p>

          <p>
            Ver você crescer dia após dia, descobrindo o significado das palavras, desenhando seus próprios mundos e rindo com aquela gargalhada que cura qualquer cansaço, é o maior presente que a vida poderia me conceder.
          </p>

          <p>
            Você carrega uma inteligência luminosa, uma curiosidade doce e uma sensibilidade rara. Nunca deixe ninguém diminuir a sua imaginação ou a sua coragem. Seja sempre essa garotinha autêntica, generosa e cheia de vida.
          </p>

          <p>
            Quero que saiba que, aconteça o que acontecer e para onde quer que seus passos a levem, eu estarei sempre aqui: para segurar a sua mão, aplaudir as suas conquistas, acolher os seus momentos difíceis e lembrar você do quão extraordinária você é.
          </p>

          <div className="pt-8 border-t border-white/[0.1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#86868b]">
                Com amor infinito e incondicional,
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
                Seu Pai
                <Heart className="w-5 h-5 text-[#ff375f] fill-[#ff375f]" />
              </div>
            </div>

            <div className="text-xs text-[#86868b] sm:text-right">
              <div>Capítulo Oficial • 7 Anos</div>
              <div>Para Sempre no Coração</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
