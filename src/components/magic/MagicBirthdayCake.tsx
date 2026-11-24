import React, { useState, useEffect } from 'react'
import { Sparkles, Flame, Wind, RotateCcw, Crown, Heart, Gift, Volume2 } from 'lucide-react'
import confetti from 'canvas-confetti'
import { celestialAudio } from '../../audio/celestialSynth'

interface CandleState {
  id: number
  wish: string
  meaning: string
  isLit: boolean
}

const INITIAL_CANDLES: CandleState[] = [
  { id: 1, wish: 'Amor Infinito', meaning: 'O amor incondicional que nunca acaba', isLit: true },
  { id: 2, wish: 'Saúde & Alegria', meaning: 'Gargalhadas puras e dias cheios de sol', isLit: true },
  { id: 3, wish: 'Inteligência Brilhante', meaning: 'Sua curiosidade linda para aprender o mundo', isLit: true },
  { id: 4, wish: 'Proteção Divina', meaning: 'Guardada a cada passo com luz e axé', isLit: true },
  { id: 5, wish: 'Sonhos Dourados', meaning: 'A imaginação livre para voar onde quiser', isLit: true },
  { id: 6, wish: 'Abraços de Aconchego', meaning: 'O refúgio seguro no coração do papai', isLit: true },
  { id: 7, wish: 'Sete Anos de Realeza', meaning: 'A celebração do grande marco da sua vida', isLit: true },
]

export const MagicBirthdayCake: React.FC = () => {
  const [candles, setCandles] = useState<CandleState[]>(INITIAL_CANDLES)
  const [allExtinguished, setAllExtinguished] = useState(false)
  const [activeWish, setActiveWish] = useState<string | null>(null)
  const [isBlowingAll, setIsBlowingAll] = useState(false)

  const litCount = candles.filter((c) => c.isLit).length

  // Trigger celebration when all candles are blown
  useEffect(() => {
    if (litCount === 0 && !allExtinguished) {
      setAllExtinguished(true)
      triggerRoyalConfetti()
      celestialAudio.playHappyBirthdayMelody()
    }
  }, [litCount, allExtinguished])

  const triggerRoyalConfetti = () => {
    // Sequência mágica de confetes
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    }

    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#ffd60a', '#ff9f0a', '#ff375f'],
    })
    fire(0.2, {
      spread: 60,
      colors: ['#ffffff', '#ffd60a', '#bf5af2'],
    })
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: ['#ffd60a', '#ff375f', '#bf5af2', '#30d158'],
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: ['#ffd60a', '#ff9f0a'],
    })
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
      colors: ['#ff375f', '#ffd60a'],
    })
  }

  const handleBlowCandle = (id: number) => {
    const target = candles.find((c) => c.id === id)
    if (!target || !target.isLit) return

    celestialAudio.enableAudio()
    celestialAudio.playBlowCandle()
    setActiveWish(target.wish)

    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: false } : c))
    )

    // Pequeno confete localizado
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.65 },
      colors: ['#ffd60a', '#ff9f0a', '#ffffff'],
      zIndex: 9999,
    })
  }

  const handleBlowAll = () => {
    if (isBlowingAll || litCount === 0) return
    setIsBlowingAll(true)
    celestialAudio.enableAudio() // Desbloqueio síncrono imediato para WebKit iOS / Safari

    // Apaga em cascata harmônica com intervalo de 200ms
    const litCandles = candles.filter((c) => c.isLit)
    litCandles.forEach((candle, index) => {
      setTimeout(() => {
        celestialAudio.playBlowCandle()
        setCandles((prev) =>
          prev.map((c) => (c.id === candle.id ? { ...c, isLit: false } : c))
        )
        if (index === litCandles.length - 1) {
          setIsBlowingAll(false)
        }
      }, index * 200)
    })
  }

  const handleRelight = () => {
    celestialAudio.enableAudio()
    celestialAudio.stopMelody()
    celestialAudio.playStarBurst()
    setCandles(INITIAL_CANDLES)
    setAllExtinguished(false)
    setActiveWish(null)
  }

  return (
    <section
      id="bolo-magico"
      className="relative py-20 px-4 md:px-8 bg-gradient-to-b from-[#000000] via-[#090812] to-[#000000] overflow-hidden border-t border-b border-white/[0.06]"
    >
      {/* Luz mística de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffd60a]/10 via-[#ff375f]/10 to-[#bf5af2]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-[1040px] mx-auto relative z-10">
        {/* Cabeçalho Apple Editorial */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd60a]/10 border border-[#ffd60a]/30 text-[#ffd60a] text-[12px] md:text-[13px] font-semibold tracking-wide uppercase mb-4 shadow-[0_0_20px_rgba(255,214,10,0.15)]">
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
            Rito Sagrado dos 7 Anos
          </div>
          <h2 className="text-[34px] sm:text-[44px] md:text-[56px] font-bold tracking-tight text-white mb-4 leading-[1.08]">
            O Bolo Mágico das <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] bg-clip-text text-transparent">
              Sete Velinhas da Princesa
            </span>
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#a1a1a6] max-w-[620px] mx-auto leading-relaxed">
            Toque em cada velinha para fazer um pedido sagrado ou sopre todas de uma vez para
            despertar a chuva de estrelas e a canção celestial de aniversário da Alycia.
          </p>

          {/* Contador de Velas */}
          <div className="mt-5 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
            <span className="text-[13px] text-[#d2d2d7]">Velinhas acesas:</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const candle = candles.find((c) => c.id === num)
                const isLit = candle?.isLit
                return (
                  <span
                    key={num}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isLit
                        ? 'bg-[#ffd60a] shadow-[0_0_8px_rgba(255,214,10,0.9)] scale-110'
                        : 'bg-white/20 scale-90'
                    }`}
                  />
                )
              })}
            </div>
            <span className="text-[12px] font-semibold text-[#ffd60a]">
              {litCount} de 7
            </span>
          </div>
        </div>

        {/* CENÁRIO DO BOLO REAL 3D */}
        <div className="relative max-w-[560px] mx-auto pt-10 pb-6 flex flex-col items-center">
          {/* BANDEJA REAL DE OURO & CHAMPANHE */}
          <div className="relative w-full flex flex-col items-center">
            
            {/* VELINHAS NO TOPO */}
            <div className="flex items-end justify-center gap-1.5 sm:gap-3 md:gap-4 mb-2 z-20">
              {candles.map((candle) => {
                return (
                  <button
                    key={candle.id}
                    onClick={() => handleBlowCandle(candle.id)}
                    type="button"
                    title={`Vela ${candle.id}: ${candle.wish} (Clique para soprar)`}
                    className="group relative flex flex-col items-center cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95"
                  >
                    {/* Tooltip com o desejo */}
                    <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-[#1d1d1f]/95 border border-[#ffd60a]/40 text-[#ffd60a] text-[11px] font-semibold py-1 px-2.5 rounded-full shadow-lg backdrop-blur-md z-30 transform -translate-y-1 group-hover:translate-y-0">
                      {candle.id}º Pedido: {candle.wish}
                    </div>

                    {/* Chama da vela */}
                    <div className="h-9 sm:h-10 flex items-end justify-center mb-1">
                      {candle.isLit ? (
                        <div className="relative flex flex-col items-center animate-pulse">
                          {/* Halo de luz */}
                          <div className="absolute -inset-2 bg-gradient-to-t from-[#ff9f0a]/60 to-[#ffd60a]/30 rounded-full blur-[6px] animate-ping opacity-40" />
                          {/* Núcleo da chama */}
                          <div className="w-3 sm:w-3.5 h-5 sm:h-6 bg-gradient-to-t from-[#ff375f] via-[#ff9f0a] to-[#ffd60a] rounded-[50%_50%_35%_35%] shadow-[0_0_14px_#ffd60a] transition-all transform group-hover:scale-125" />
                          <div className="w-1 sm:w-1.5 h-2.5 sm:h-3 bg-white/90 rounded-full -mt-3.5 sm:-mt-4 blur-[0.5px]" />
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center">
                          {/* Fumaça estelar residual */}
                          <span className="text-[10px] text-white/40 animate-bounce">
                            ~
                          </span>
                          <div className="w-0.5 h-2 bg-neutral-600 rounded-t" />
                        </div>
                      )}
                    </div>

                    {/* Pavio */}
                    <div className="w-[1.5px] h-2 bg-[#2c2c2e] -mb-0.5" />

                    {/* Corpo da Vela */}
                    <div
                      className={`w-3.5 sm:w-5 h-14 sm:h-20 rounded-t-sm shadow-md transition-all flex flex-col justify-between items-center py-1 sm:py-1.5 ${
                        candle.isLit
                          ? 'bg-gradient-to-b from-[#ffd60a] via-[#ff9f0a] to-[#e58300] border-t border-[#ffe57f] shadow-[0_4px_12px_rgba(255,159,10,0.3)]'
                          : 'bg-gradient-to-b from-[#3a3a3c] to-[#2c2c2e] opacity-60'
                      }`}
                    >
                      <span className="text-[8px] sm:text-[10px] font-black text-[#000000]/70 select-none">
                        {candle.id}
                      </span>
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-white/40" />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ANDAR SUPERIOR DO BOLO (Andar 3) */}
            <div className="w-[min(240px,65vw)] sm:w-[280px] h-[50px] sm:h-[60px] bg-gradient-to-b from-[#fff2f5] via-[#ffdbe3] to-[#f4b8c7] rounded-t-2xl relative shadow-[0_10px_25px_rgba(0,0,0,0.4)] border-t-2 border-white/60 flex items-center justify-center">
              {/* Gotas de Glacê */}
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-2 overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3.5 sm:w-4 h-3.5 sm:h-4 bg-[#ffdbe3] rounded-full -mb-2 shadow-sm"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 text-[#8a2444] text-[10px] sm:text-[12px] font-bold">
                <Crown className="w-3 h-3 text-[#ff375f]" />
                Princesa Alycia • 7 Anos
              </div>
            </div>

            {/* ANDAR DO MEIO DO BOLO (Andar 2) */}
            <div className="w-[min(300px,78vw)] sm:w-[380px] h-[65px] sm:h-[75px] bg-gradient-to-b from-[#fce4ec] via-[#f8bbd0] to-[#f06292] rounded-t-2xl relative shadow-[0_12px_30px_rgba(0,0,0,0.4)] border-t-2 border-white/60 flex items-center justify-center">
              {/* Fitas de Pérolas de Açúcar */}
              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden px-2">
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gradient-to-tr from-[#ffd60a] to-white shadow-[0_0_6px_rgba(255,214,10,0.8)] flex-shrink-0"
                  />
                ))}
              </div>
              <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-2 sm:px-3 overflow-hidden">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 sm:w-5 h-3.5 sm:h-4 bg-[#f8bbd0] rounded-full -mb-2 shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* ANDAR BASE DO BOLO (Andar 1) */}
            <div className="w-[min(350px,90vw)] sm:w-[480px] h-[80px] sm:h-[95px] bg-gradient-to-b from-[#f3e5f5] via-[#e1bee7] to-[#ba68c8] rounded-t-3xl relative shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-t-2 border-white/70 flex items-center justify-center">
              <div className="text-center px-3 sm:px-4">
                <span className="text-[11px] sm:text-[14px] font-black tracking-wider sm:tracking-widest text-[#4a148c] uppercase drop-shadow-sm block">
                  ★ O Maior Amor do Papai ★
                </span>
                <p className="text-[9px] sm:text-[11px] text-[#4a148c]/80 font-medium mt-0.5">
                  Sete Anos Transformando Nossa Vida em Magia
                </p>
              </div>
            </div>

            {/* PRATO REAL DE OURO & CRISTAL */}
            <div className="w-[min(370px,95vw)] sm:w-[530px] h-[18px] sm:h-[22px] bg-gradient-to-r from-[#cf9a22] via-[#ffd60a] to-[#b3821a] rounded-full shadow-[0_15px_40px_rgba(255,214,10,0.35)] border-t border-white/80" />
            <div className="w-[min(320px,82vw)] sm:w-[460px] h-[8px] bg-[#664b0f] rounded-b-full shadow-inner" />
          </div>

          {/* PAINEL DE CONTROLE MÁGICO / BOTÕES DE AÇÃO */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md mx-auto">
            {litCount > 0 ? (
              <button
                onClick={handleBlowAll}
                disabled={isBlowingAll}
                type="button"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ffd60a] via-[#ff9f0a] to-[#ff375f] text-black font-bold text-[14px] md:text-[15px] shadow-[0_0_30px_rgba(255,214,10,0.45)] hover:shadow-[0_0_45px_rgba(255,214,10,0.7)] transition-all hover:scale-105 active:scale-95 disabled:opacity-60 cursor-pointer w-full sm:w-auto"
              >
                <Wind className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
                <span>{isBlowingAll ? 'Soprando com Amor...' : 'Soprar Todas as Velinhas!'}</span>
                <Sparkles className="w-4 h-4 text-black" />
              </button>
            ) : (
              <button
                onClick={handleRelight}
                type="button"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#bf5af2] via-[#af52de] to-[#5856d6] text-white font-bold text-[14px] md:text-[15px] shadow-[0_0_30px_rgba(191,90,242,0.45)] hover:shadow-[0_0_45px_rgba(191,90,242,0.7)] transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <RotateCcw className="w-4 h-4 text-white group-hover:-rotate-90 transition-transform" />
                <span>Reacender as Velinhas com Magia</span>
                <Sparkles className="w-4 h-4 text-[#ffd60a]" />
              </button>
            )}

            <button
              onClick={() => {
                celestialAudio.enableAudio()
                triggerRoyalConfetti()
                celestialAudio.playHappyBirthdayMelody()
              }}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-semibold text-[13px] md:text-[14px] transition-all hover:scale-105 cursor-pointer backdrop-blur-md w-full sm:w-auto"
            >
              <Gift className="w-4 h-4 text-[#ffd60a]" />
              <span>Chuva de Confetes & Parabéns</span>
            </button>
          </div>

          {/* MENSAGEM DO MOMENTO APÓS TODAS AS VELAS APAGADAS */}
          {allExtinguished && (
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-[#ffd60a]/40 text-center max-w-[520px] backdrop-blur-xl animate-fadeIn shadow-[0_10px_40px_rgba(255,214,10,0.15)]">
              <div className="w-12 h-12 rounded-full bg-[#ffd60a]/20 border border-[#ffd60a]/40 flex items-center justify-center mx-auto mb-3">
                <Crown className="w-6 h-6 text-[#ffd60a]" />
              </div>
              <h3 className="text-[20px] sm:text-[22px] font-bold text-white mb-2">
                Viva a Princesa Alycia Manuele! 🎉
              </h3>
              <p className="text-[14px] text-[#d2d2d7] leading-relaxed mb-4">
                Todos os 7 pedidos sagrados foram enviados ao céu. O papai deseja que cada um
                dos seus sorrisos seja eterno e que a sua vida seja sempre repleta de luz, bênçãos e
                muita alegria!
              </p>
              <div className="inline-flex items-center gap-2 text-[#ffd60a] text-[13px] font-semibold">
                <Heart className="w-4 h-4 fill-[#ff375f] text-[#ff375f]" />
                O papai te ama mais do que tudo nesse mundo!
              </div>
            </div>
          )}

          {/* EXIBIÇÃO DO DESEJO ATIVO QUANDO CLICADA UMA VELA */}
          {activeWish && !allExtinguished && (
            <div className="mt-6 text-center animate-fadeIn">
              <span className="text-[13px] text-[#a1a1a6]">Bênção ativada: </span>
              <span className="text-[14px] font-bold text-[#ffd60a]">
                "{activeWish}"
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
