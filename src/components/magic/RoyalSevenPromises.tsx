import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Heart,
  GraduationCap,
  Sparkles,
  Flame,
  Crown,
  Stars,
  Award,
  Lock,
  Unlock,
  CheckCircle2,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface PromiseItem {
  id: number
  year: number
  badge: string
  title: string
  promise: string
  symbol: string
  icon: React.ElementType
  accentColor: string
  borderColor: string
  glowColor: string
}

const PROMISES: PromiseItem[] = [
  {
    id: 1,
    year: 1,
    badge: '1º Promessa • O Escudo Sagrado',
    title: 'Você Nunca Estará Sozinha',
    promise:
      'Onde quer que você esteja, o amor do papai e a espiritualidade de luz caminham ao seu lado para guardar, proteger e blindar cada um dos seus passos.',
    symbol: 'Proteção Eterna',
    icon: Shield,
    accentColor: '#ffd60a',
    borderColor: 'rgba(255, 214, 10, 0.4)',
    glowColor: 'rgba(255, 214, 10, 0.25)',
  },
  {
    id: 2,
    year: 2,
    badge: '2º Promessa • O Refúgio de Amor',
    title: 'Meu Abraço É Seu Porto Seguro',
    promise:
      'Não importa o tamanho do dia ou qualquer desafio: no abraço do papai você sempre encontrará paz, silêncio, acolhimento e a maior ternura do mundo.',
    symbol: 'Amor Incondicional',
    icon: Heart,
    accentColor: '#ff375f',
    borderColor: 'rgba(255, 55, 95, 0.4)',
    glowColor: 'rgba(255, 55, 95, 0.25)',
  },
  {
    id: 3,
    year: 3,
    badge: '3º Promessa • Asas para Voar',
    title: 'Seus Estudos e Sonhos Serão Apoiados',
    promise:
      'Eu sempre investirei na sua mente brilhante, nos seus estudos e em cada sonho grandioso que você quiser conquistar. O conhecimento é a sua maior coroa.',
    symbol: 'Sabedoria & Futuro',
    icon: GraduationCap,
    accentColor: '#30d158',
    borderColor: 'rgba(48, 209, 88, 0.4)',
    glowColor: 'rgba(48, 209, 88, 0.25)',
  },
  {
    id: 4,
    year: 4,
    badge: '4º Promessa • Liberdade & Voz',
    title: 'Você É Livre Para Ser Quem Quiser',
    promise:
      'Eu sempre ouvirei a sua voz com respeito, carinho e admiração. A sua autenticidade, sua opinião e sua pureza são sagradas para mim.',
    symbol: 'Autenticidade Real',
    icon: Sparkles,
    accentColor: '#bf5af2',
    borderColor: 'rgba(191, 90, 242, 0.4)',
    glowColor: 'rgba(191, 90, 242, 0.25)',
  },
  {
    id: 5,
    year: 5,
    badge: '5º Promessa • A Alegria Inabalável',
    title: 'O Seu Sorriso Sempre Será Minha Prioridade',
    promise:
      'A sua gargalhada é a música que ilumina a minha alma. Tudo o que estiver ao meu alcance para ver seus olhinhos brilhando de felicidade, eu farei.',
    symbol: 'Felicidade Pura',
    icon: Stars,
    accentColor: '#ff9f0a',
    borderColor: 'rgba(255, 159, 10, 0.4)',
    glowColor: 'rgba(255, 159, 10, 0.25)',
  },
  {
    id: 6,
    year: 6,
    badge: '6º Promessa • Sangue Guerreiro',
    title: 'A Honra e a Força do Chão da Favela',
    promise:
      'Você carrega no sangue a coragem autêntica de quem vence com honestidade, cabeça erguida e coração bondoso. Nunca se curve diante das tempestades.',
    symbol: 'Coragem & Dignidade',
    icon: Flame,
    accentColor: '#64d2ff',
    borderColor: 'rgba(100, 210, 255, 0.4)',
    glowColor: 'rgba(100, 210, 255, 0.25)',
  },
  {
    id: 7,
    year: 7,
    badge: '7º Promessa • O Grande Selo',
    title: 'Meu Amor Por Você Ultrapassa o Infinito',
    promise:
      'Sete anos de perfeição. Eu te amei no seu primeiro suspiro, te amo com toda a minha força hoje e te amarei por toda a eternidade. Feliz aniversário, minha rainha!',
    symbol: 'Aliança Sagrada',
    icon: Crown,
    accentColor: '#ffd60a',
    borderColor: 'rgba(255, 214, 10, 0.6)',
    glowColor: 'rgba(255, 214, 10, 0.35)',
  },
]

export const RoyalSevenPromises: React.FC = () => {
  const [openedIds, setOpenedIds] = useState<number[]>([1]) // primeira já aberta para demonstrar
  const [celebrationTriggered, setCelebrationTriggered] = useState(false)

  const handleTogglePromise = (id: number) => {
    if (openedIds.includes(id)) {
      setOpenedIds((prev) => prev.filter((item) => item !== id))
      celestialAudio.playSoftClick()
      return
    }

    const nextOpened = [...openedIds, id]
    setOpenedIds(nextOpened)

    // Acorde de harpa celestial crescente por número da promessa
    const notes = [440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5]
    const freq = notes[(id - 1) % notes.length]
    celestialAudio.playChime(freq, 0.18)

    // Se abriu todas as 7 promessas
    if (nextOpened.length === PROMISES.length && !celebrationTriggered) {
      setCelebrationTriggered(true)
      setTimeout(() => {
        celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98])
      }, 400)
    }
  }

  const handleOpenAll = () => {
    setOpenedIds(PROMISES.map((p) => p.id))
    setCelebrationTriggered(true)
    celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5, 1318.51])
  }

  const progressPercent = Math.round((openedIds.length / PROMISES.length) * 100)

  return (
    <section
      id="promessas-reais"
      className="relative bg-[#07070a] text-white py-20 px-4 border-b border-white/[0.08] overflow-hidden"
    >
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#ffd60a]/10 via-[#ff375f]/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative max-w-[880px] mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ffd60a]/10 border border-[#ffd60a]/30 text-[11px] font-bold text-[#ffd60a] uppercase tracking-wider mb-3 shadow-lg">
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
            <span>Aliança Sagrada • Sete Anos de Vida</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            As 7 Promessas do Papai Vinícius
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1a6] max-w-[600px] mx-auto leading-relaxed">
            Uma promessa eterna para cada ano que você iluminou este mundo. Toque em cada medalhão para revelar a bênção gravada no coração do papai.
          </p>

          {/* Barra de Progresso Interativa */}
          <div className="mt-6 max-w-xs mx-auto flex items-center justify-between gap-3 bg-white/[0.04] p-2 rounded-full border border-white/10">
            <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#ffd60a] via-[#ff9f0a] to-[#ff375f]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-[#ffd60a] whitespace-nowrap">
              {openedIds.length} de {PROMISES.length}
            </span>
            {openedIds.length < PROMISES.length && (
              <button
                onClick={handleOpenAll}
                className="text-[10px] text-white/60 hover:text-white underline cursor-pointer"
              >
                Revelar todas
              </button>
            )}
          </div>
        </div>

        {/* Celebracão Completa ao Abrir as 7 Promessas */}
        <AnimatePresence>
          {celebrationTriggered && openedIds.length === PROMISES.length && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#ffd60a]/20 via-[#ff375f]/20 to-[#bf5af2]/20 border-2 border-[#ffd60a]/50 text-center shadow-[0_0_50px_rgba(255,214,10,0.3)] backdrop-blur-xl"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#ffd60a] text-black mb-2 shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Aliança Eterna Selada no Coração de Alycia
              </h3>
              <p className="text-xs sm:text-sm text-[#ffd60a] font-medium max-w-md mx-auto mt-1">
                Todas as 7 bênçãos estão gravadas para todo o sempre. O papai te ama infinitamente!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid das 7 Promessas Interativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROMISES.map((item) => {
            const isOpened = openedIds.includes(item.id)
            const Icon = item.icon

            return (
              <motion.div
                key={item.id}
                layout
                onClick={() => handleTogglePromise(item.id)}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                className={`relative rounded-3xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer select-none overflow-hidden ${
                  isOpened
                    ? 'bg-[#121118] border-white/25 shadow-2xl'
                    : 'bg-[#0d0d12]/80 hover:bg-[#15151c] border-white/10 hover:border-white/20'
                }`}
                style={{
                  boxShadow: isOpened ? `0 15px 40px -10px ${item.glowColor}` : 'none',
                  borderColor: isOpened ? item.borderColor : undefined,
                }}
              >
                {/* Luz de fundo do card ativo */}
                {isOpened && (
                  <div
                    className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-40"
                    style={{ backgroundColor: item.accentColor }}
                  />
                )}

                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center border shadow-inner transition-colors"
                      style={{
                        backgroundColor: isOpened ? `${item.accentColor}25` : 'rgba(255,255,255,0.05)',
                        borderColor: isOpened ? item.accentColor : 'rgba(255,255,255,0.1)',
                        color: isOpened ? item.accentColor : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/50 block">
                        {item.badge}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center border transition-all text-xs"
                    style={{
                      backgroundColor: isOpened ? `${item.accentColor}30` : 'rgba(255,255,255,0.05)',
                      borderColor: isOpened ? item.accentColor : 'rgba(255,255,255,0.15)',
                      color: isOpened ? item.accentColor : 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {isOpened ? (
                      <Unlock className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                {/* Conteúdo Revelado com Animação */}
                <AnimatePresence>
                  {isOpened ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[#d2d2d7] leading-relaxed pt-2 border-t border-white/10">
                        "{item.promise}"
                      </p>

                      <div className="mt-3 flex items-center justify-between text-[11px] pt-1">
                        <span
                          className="font-semibold flex items-center gap-1"
                          style={{ color: item.accentColor }}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {item.symbol}
                        </span>
                        <span className="text-white/40 italic">Para sempre no peito</span>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="pt-2 text-[11px] text-[#ffd60a]/70 flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-3 h-3 text-[#ffd60a]" />
                      <span>Toque para revelar a promessa do papai</span>
                    </div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Assinatura Final do Papai */}
        <div className="mt-10 text-center pt-6 border-t border-white/[0.08]">
          <p className="text-xs sm:text-sm text-[#ffd60a] font-semibold italic">
            "Promessas escritas na terra e seladas nos céus pelo seu papai, Vinícius."
          </p>
        </div>
      </div>
    </section>
  )
}
