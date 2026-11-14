import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, BatteryCharging, Eye, Volume2, Wifi, ShieldCheck, Sparkles } from 'lucide-react'

interface SpecItem {
  icon: React.ElementType
  category: string
  title: string
  value: string
  detail: string
  badge: string
}

const SPECS: SpecItem[] = [
  {
    icon: Cpu,
    category: 'Arquitetura Interna',
    title: 'Coração Puro Bionic 7.0',
    value: 'Bondade Infinita',
    detail: 'Capacidade de transformar qualquer momento cinzento em pura luz com um simples sorriso.',
    badge: 'Proprietário',
  },
  {
    icon: BatteryCharging,
    category: 'Autonomia',
    title: 'Energia Solar Contínua',
    value: '14+ Horas / Dia',
    detail: 'Reserva inesgotável para brincar, correr e criar. Recarga ultrarrápida com historinha antes de dormir.',
    badge: 'Sustentável',
  },
  {
    icon: Eye,
    category: 'Sistema de Visão',
    title: 'Olhar Retina Encantado',
    value: 'Visão de Maravilhas',
    detail: 'Enxerga poesia e detalhes especiais onde ninguém mais repara: nos pequenos insetos, nas cores do céu e nas artes.',
    badge: 'Alta Fidelidade',
  },
  {
    icon: Volume2,
    category: 'Acústica & Voz',
    title: 'Gargalhada de Cristal',
    value: '120 dB de Cura',
    detail: 'Frequência de riso cientificamente comprovada capaz de iluminar a alma do papai instantaneamente.',
    badge: 'Harmônica',
  },
  {
    icon: Wifi,
    category: 'Conectividade',
    title: 'Vínculo Sem Fio Ultrarrápido',
    value: 'Latência Zero',
    detail: 'Ligação direta de coração para coração. Mesmo a quilômetros de distância, o pensamento e o amor estão sempre conectados.',
    badge: 'Para Sempre',
  },
  {
    icon: ShieldCheck,
    category: 'Estrutura & Coragem',
    title: 'Resiliência e Doçura',
    value: '100% Autêntica',
    detail: 'Aprende com facilidade, enfrenta desafios com curiosidade viva e mantém sempre o coração leve.',
    badge: 'Inquebrável',
  },
]

export const SpecsSection: React.FC = () => {
  return (
    <section id="specs" className="relative py-28 px-6 max-w-6xl mx-auto">
      {/* Section Header (Apple Keynote Style) */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <span className="text-xs uppercase tracking-[0.3em] text-rose-300 font-semibold inline-block mb-3">
          Ficha Técnica Exclusiva
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Especificações de uma{' '}
          <span className="aurora-text-gradient italic font-normal">Garota Extraordinária.</span>
        </h2>
        <p className="mt-5 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Cada detalhe de Alycia Manuele foi projetado com generosidade, inteligência viva e uma capacidade singular de encantar o mundo.
        </p>
      </div>

      {/* Grid of Technical Precision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SPECS.map((spec, index) => {
          const Icon = spec.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-apple-card group relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500/15 via-purple-500/10 to-amber-300/10 border border-white/10 text-amber-200 group-hover:scale-110 group-hover:border-rose-300/30 transition-all duration-300">
                    <Icon className="h-6 w-6 text-rose-200 group-hover:text-amber-200" />
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[10px] uppercase font-medium tracking-wider text-neutral-300">
                    {spec.badge}
                  </span>
                </div>

                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                  {spec.category}
                </span>

                <h3 className="mt-1 font-display text-lg font-semibold text-white group-hover:text-rose-100 transition-colors">
                  {spec.title}
                </h3>

                <div className="mt-3 text-2xl font-bold font-serif-luxury text-amber-200">
                  {spec.value}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors">
                  {spec.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Certificado Paterno</span>
                <span className="text-rose-300/80">Edição 7.0</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Apple Summary Metric Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 rounded-3xl glass-apple-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 text-center border border-white/10"
      >
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-serif-luxury text-white">2.556</div>
          <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Dias de Vida</div>
        </div>
        <div className="hidden md:block h-10 w-px bg-white/10" />
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-serif-luxury text-amber-200">61.344+</div>
          <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Horas de Amor Contínuo</div>
        </div>
        <div className="hidden md:block h-10 w-px bg-white/10" />
        <div>
          <div className="text-3xl sm:text-4xl font-bold font-serif-luxury text-rose-300">Infinito</div>
          <div className="text-xs uppercase tracking-wider text-neutral-400 mt-1">Orgulho no Coração do Pai</div>
        </div>
      </motion.div>
    </section>
  )
}
