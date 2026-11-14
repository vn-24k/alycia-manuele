import React, { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, Send } from 'lucide-react'
import { celestialAudio } from '../audio/celestialSynth'

export const LetterSection: React.FC = () => {
  const [hugSent, setHugSent] = useState(false)

  const handleSendHug = () => {
    celestialAudio.playStarBurst()
    setHugSent(true)

    // Trigger celestial starlight confetti
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.8 },
      colors: ['#f4a8b7', '#fae8b2', '#b8a6e8', '#e6c88b', '#ffffff'],
      shapes: ['star', 'circle'],
      scalar: 1.2,
    })

    setTimeout(() => setHugSent(false), 4000)
  }

  return (
    <section id="letter" className="relative py-32 px-6 max-w-4xl mx-auto">
      {/* Background Soft Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/10 blur-[140px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="glass-apple-card rounded-3xl p-8 sm:p-14 border border-rose-300/20 relative shadow-2xl overflow-hidden"
      >
        {/* Seal Badge */}
        <div className="flex justify-center mb-10">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-amber-300/30 via-rose-500/20 to-purple-500/30 border border-amber-300/40 shadow-lg shadow-amber-300/20">
            <Heart className="h-7 w-7 text-rose-300 fill-rose-300/40" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.35em] text-amber-300 font-semibold block mb-2">
            Palavras Eternas
          </span>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Para Minha Filha,{' '}
            <span className="aurora-text-gradient italic font-normal">Alycia Manuele.</span>
          </h2>
          <p className="mt-2 text-xs text-neutral-400 font-mono">
            Uma carta para ser lida hoje, amanhã e por toda a sua vida.
          </p>
        </div>

        {/* The Letter Body */}
        <div className="space-y-6 text-neutral-200 font-serif-luxury text-lg sm:text-xl leading-relaxed text-left sm:text-justify max-w-2xl mx-auto">
          <p>
            Minha querida Alycia,
          </p>

          <p>
            Quando você chegou ao mundo há 7 anos, tudo ganhou uma cor que eu nunca tinha visto antes. Você me ensinou o que é o amor verdadeiro — aquele que não pede nada em troca, que protege, que vibra a cada conquista e que sorri só de ouvir a sua respiração tranquila à noite.
          </p>

          <p>
            Ver você crescer é a maior honra e a maior aventura da minha existência. Sua inteligência viva, seus olhinhos atentos descobrindo o universo, a sua bondade com as pessoas e esse seu coração corajoso e doce me enchem de um orgulho que mal cabe no peito.
          </p>

          <p>
            Nunca se esqueça de quem você é. Nunca deixe ninguém apagar esse brilho nos seus olhos. O mundo é gigante e você pode ser exatamente o que sonhar: artista, cientista, exploradora, princesa das suas próprias histórias. Mas, acima de tudo, continue sendo essa garotinha extraordinária e cheia de luz.
          </p>

          <p>
            Não importa a distância, o tempo ou quantos anos passem: você sempre terá no seu pai um porto seguro, um abraço apertado e alguém que aplaude e acredita em você com todas as forças da alma.
          </p>

          <p className="pt-4 font-semibold text-amber-200 text-right">
            Com todo o meu amor para todo o sempre,<br />
            <span className="text-xl sm:text-2xl font-serif-luxury italic text-white">Do seu Papai.</span>
          </p>
        </div>

        {/* Interactive Starlight Hug Button */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
              Conexão Imediata
            </h4>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Toque para enviar uma chuva de estrelas e abraços virtuais.
            </p>
          </div>

          <button
            onClick={handleSendHug}
            disabled={hugSent}
            className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-xs font-semibold text-neutral-900 bg-gradient-to-r from-rose-200 via-amber-200 to-rose-100 hover:brightness-105 active:scale-95 transition-all shadow-lg shadow-rose-500/20"
          >
            <Sparkles className="h-4 w-4 text-amber-700 group-hover:rotate-12 transition-transform" />
            <span>{hugSent ? 'Abraço Enviado com Sucesso!' : 'Enviar um Abraço para as Estrelas'}</span>
          </button>
        </div>
      </motion.div>
    </section>
  )
}
