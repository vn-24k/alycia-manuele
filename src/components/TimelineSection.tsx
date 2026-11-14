import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Heart, Sparkles, ChevronRight } from 'lucide-react'

interface Milestone {
  year: number
  ageLabel: string
  title: string
  subtitle: string
  description: string
  highlights: string[]
  quote: string
}

const TIMELINE_DATA: Milestone[] = [
  {
    year: 2019,
    ageLabel: 'Nascimento (0 Anos)',
    title: 'O Primeiro Respiro no Mundo',
    subtitle: 'O dia em que a vida ganhou um novo sentido absoluto',
    description:
      'Quando seus olhos se abriram pela primeira vez, o universo do papai se reordenou. Um pequeno pacotinho de luz que trouxe uma paz que as palavras nunca foram capazes de descrever.',
    highlights: ['O primeiro toque de mão', 'A primeira canção de ninar', 'O milagre da vida em silêncio'],
    quote: 'Você mal havia chegado, e já era o amor da minha vida inteira.',
  },
  {
    year: 2020,
    ageLabel: '1 Ano',
    title: 'Os Primeiros Passinhos & Gargalhadas',
    subtitle: 'Descobrindo o equilíbrio e a coragem de explorar',
    description:
      'Cair, dar risada e tentar de novo. Seu primeiro aninho foi uma sinfonia de pequenas descobertas: as primeiras frutas, os dedinhos curiosos em tudo e os passos tímidos rumo ao abraço do papai.',
    highlights: ['Primeiras palavras pronunciadas', 'Equilíbrio firme no chão', 'Olhinhos curiosos desbravando a casa'],
    quote: 'Cada passinho vacilante era a coisa mais corajosa que eu já tinha visto.',
  },
  {
    year: 2021,
    ageLabel: '2 Anos',
    title: 'A Fala, as Graças & a Fantasia',
    subtitle: 'Quando a voz ganha asas e o vocabulário encanta a todos',
    description:
      'Sua vozinha doce começou a formular histórias inteiras, perguntas encantadoras e gargalhadas que enchiam a sala de alegria. Cada expressão sua era motivo de comemoração.',
    highlights: ['Contação espontânea de historinhas', 'Dança engraçada e sincera', 'Personalidade doce e firme'],
    quote: 'Sua voz falando "papai" virou a música favorita do meu coração.',
  },
  {
    year: 2022,
    ageLabel: '3 Anos',
    title: 'O Reino das Brincadeiras',
    subtitle: 'Castelos imaginários, bonecas e amizades com o mundo',
    description:
      'A fase mágica em que tudo ganhava vida: uma caixa de papelão era um navio, uma toalha era uma capa mágica e cada cantinho virava palco para aventuras extraordinárias.',
    highlights: ['Imaginação sem barreiras', 'Brincadeiras cheias de afeto', 'Acolhimento com os bichinhos'],
    quote: 'Com você, o mundo real voltava a ser um lugar de pura mágica.',
  },
  {
    year: 2023,
    ageLabel: '4 Anos',
    title: 'A Pequena Artista dos Detalhes',
    subtitle: 'Cores, rabiscos e um coração que nota cada detalhe',
    description:
      'Lápis de cor, tintas e desenhos espalhados pela mesa. Alycia começava a desenhar sentimentos e a expressar uma sensibilidade com as pessoas que emocionava a qualquer um.',
    highlights: ['Desenhos coloridos cheios de afeto', 'Perguntas inteligentes e perspicazes', 'Generosidade com todos ao redor'],
    quote: 'Seus desenhos tinham mais alma do que qualquer obra de museu.',
  },
  {
    year: 2024,
    ageLabel: '5 Anos',
    title: 'Curiosidade Gigante & Descobertas',
    subtitle: '“Papai, por que o céu brilha?”',
    description:
      'Uma mente viva e inquieta por saber como o mundo funciona. Alycia questionando a natureza, os sentimentos, as estrelas e mostrando um brilho nos olhos que hipnotiza.',
    highlights: ['As grandes perguntas sobre a vida', 'Amor profundo pelas histórias antes de dormir', 'Empatia natural com os amigos'],
    quote: 'Você me ensinou mais sobre a vida nesses cinco anos do que todos os livros que li.',
  },
  {
    year: 2025,
    ageLabel: '6 Anos',
    title: 'Coragem, Escola & Amizades',
    subtitle: 'O crescimento que impressiona e enche o peito de orgulho',
    description:
      'Novos aprendizados, primeiras leituras, amizades sinceras na escola e uma garotinha que sabe expressar seus desejos, defender o que é justo e cuidar com carinho de quem ama.',
    highlights: ['Letrinhas que viram palavras', 'Sorriso radiante com a mochila nas costas', 'Lealdade e ternura constantes'],
    quote: 'Ver você crescer com tanta dignidade e doçura é o maior privilégio da minha existência.',
  },
  {
    year: 2026,
    ageLabel: '7 Anos (O Presente)',
    title: 'Sete Anos: A Plenitude da Infância',
    subtitle: 'A garotinha mais inteligente, doce e brilhante do planeta',
    description:
      'Hoje, com 7 anos de idade, Alycia Manuele é a essência do amor. Uma menina cheia de talentos, risadas autênticas, sonhos luminosos e uma doçura que transforma qualquer lugar onde pisa.',
    highlights: ['Celebração dos 7 anos em grande estilo', 'Futuro luminoso e infinito', 'A protegida e maior paixão do papai'],
    quote: 'Para sempre a minha princesinha, não importa quantos anos passem.',
  },
]

export const TimelineSection: React.FC = () => {
  const [selectedYearIndex, setSelectedYearIndex] = useState(TIMELINE_DATA.length - 1)
  const currentMilestone = TIMELINE_DATA[selectedYearIndex]

  return (
    <section id="timeline" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold inline-block mb-3">
          Jornada em Movimento
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          De 0 a 7 Anos:{' '}
          <span className="aurora-text-gradient italic font-normal">A História de Cada Ano.</span>
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Navegue pelos capítulos que moldaram a garotinha extraordinária que você é hoje.
        </p>
      </div>

      {/* Year Selector Tabs (Apple Minimal Scrubber) */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
        {TIMELINE_DATA.map((item, idx) => {
          const isActive = idx === selectedYearIndex
          return (
            <button
              key={item.year}
              onClick={() => setSelectedYearIndex(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-rose-500/30 to-amber-300/30 border border-rose-300/50 text-white shadow-lg shadow-rose-500/20 scale-105'
                  : 'bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.year}</span>
              <span className="ml-1.5 opacity-60 font-light">({idx}a)</span>
            </button>
          )
        })}
      </div>

      {/* Dynamic Main Milestone Showcase Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMilestone.year}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass-apple-card rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden"
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-rose-500/10 blur-3xl rounded-full" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 bg-amber-300/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1 text-xs text-rose-300 mb-4">
                <Calendar className="h-3.5 w-3.5 text-amber-300" />
                <span>{currentMilestone.ageLabel}</span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span>{currentMilestone.year}</span>
              </div>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                {currentMilestone.title}
              </h3>

              <p className="mt-2 text-sm sm:text-base font-medium text-amber-200/90 italic">
                {currentMilestone.subtitle}
              </p>

              <p className="mt-6 text-sm sm:text-base text-neutral-300 leading-relaxed">
                {currentMilestone.description}
              </p>

              {/* Highlights Pill List */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {currentMilestone.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs text-neutral-200"
                  >
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Quote Capsule */}
            <div className="w-full lg:w-80 flex-shrink-0 rounded-2xl bg-black/40 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-between">
              <Heart className="h-6 w-6 text-rose-400 fill-rose-400/20 mb-4" />
              <p className="font-serif-luxury text-lg italic text-neutral-200 leading-snug">
                “{currentMilestone.quote}”
              </p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span>Memória do Pai</span>
                <span className="text-amber-200 font-semibold">{currentMilestone.year}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
