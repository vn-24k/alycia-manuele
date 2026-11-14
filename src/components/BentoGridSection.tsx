import React from 'react'
import { motion } from 'framer-motion'
import { Palette, HeartHandshake, Music, Brain, Sparkles, Wand2 } from 'lucide-react'

export const BentoGridSection: React.FC = () => {
  return (
    <section id="powers" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-rose-300 font-semibold inline-block mb-3">
          Potencial Ilimitado
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Mural de Talentos &{' '}
          <span className="aurora-text-gradient italic font-normal">Superpoderes.</span>
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Tudo o que faz de Alycia Manuele um ser humano incomparável, reunido em alta definição.
        </p>
      </div>

      {/* Apple-Style Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Criatividade & Arte (Large 2 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="md:col-span-2 glass-apple-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-purple-500/10 blur-2xl rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15 border border-rose-300/20 text-rose-300">
                <Palette className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono uppercase text-amber-200/90 tracking-wider bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Expressão Livre
              </span>
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
              Mãos de Artista & Imaginação Pura
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Quando pega lápis, papéis ou tintas, Alycia não apenas desenha: ela cria universos inteiros onde castelos voam, bichinhos conversam e cada detalhe carrega doçura e vida.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <span className="text-lg font-bold text-rose-200">100+</span>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Obras Criadas</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <span className="text-lg font-bold text-amber-200">Infinito</span>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Cores Usadas</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
              <span className="text-lg font-bold text-purple-200">10/10</span>
              <p className="text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5">Originalidade</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Amor aos Animais */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass-apple-card rounded-3xl p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/15 border border-amber-300/20 text-amber-200 mb-6">
              <HeartHandshake className="h-6 w-6" />
            </div>

            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Empatia Natural
            </span>

            <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1 mb-3">
              Coração Protetor
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed">
              O carinho espontâneo com os animais e a natureza. Uma delicadeza rara que sabe acolher, respeitar e proteger cada pequeno ser vivo.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-200/80">
            <span>Sensibilidade</span>
            <span className="font-bold">Máxima</span>
          </div>
        </motion.div>

        {/* Card 3: Música & Dança */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-apple-card rounded-3xl p-8 flex flex-col justify-between group"
        >
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-300/20 text-purple-200 mb-6">
              <Music className="h-6 w-6" />
            </div>

            <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
              Ritmo de Vida
            </span>

            <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1 mb-3">
              Dança & Alegria
            </h3>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Basta tocar uma música para os pezinhos começarem a se mexer. Uma presença alegre que contagia e transforma a sala de estar num espetáculo.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-200/80">
            <span>Energia Positiva</span>
            <span className="font-bold">100% Contagiante</span>
          </div>
        </motion.div>

        {/* Card 4: Mente Brilhante & Curiosidade (2 Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="md:col-span-2 glass-apple-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="pointer-events-none absolute -left-16 -bottom-16 w-64 h-64 bg-gradient-to-tr from-amber-400/15 to-rose-500/10 blur-2xl rounded-full" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 border border-cyan-300/20 text-cyan-200">
                <Brain className="h-6 w-6" />
              </div>
              <span className="text-xs font-mono uppercase text-cyan-200/90 tracking-wider bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                Inteligência Viva
              </span>
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white mb-3">
              Mente Brilhante & Perguntas Profundas
            </h3>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Raciocínio veloz, memória afiada e um senso crítico doce que surpreende qualquer adulto. Alycia não aceita apenas respostas prontas: ela quer entender o porquê de tudo no mundo.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Memória Fotográfica</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Wand2 className="h-4 w-4 text-rose-300" />
              <span>Criatividade Rápida</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-300">
              <Brain className="h-4 w-4 text-cyan-300" />
              <span>Sensatez Admirável</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
