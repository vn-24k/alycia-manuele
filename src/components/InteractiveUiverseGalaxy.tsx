import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Check, Send, Award, Compass, Star } from 'lucide-react'
import {
  UivCtaButton,
  UivLoveHeartButton,
  UivGlowPillButton,
  UivMinimalistButton,
  UivSocialShareButton,
  UivCelestialSwitch,
  UivNebulaSwitch,
  UivStarlightSwitch,
  UivHeartCard,
  UivVirtueAlertCard,
  UivLessonCard,
  UivSecretGlowCard,
  UivCapsuleCard,
  UivBrutalistInput,
  UivMessageInput,
  UivPromiseCheckbox1,
  UivPromiseCheckbox2,
  UivPromiseCheckbox3,
  UivPulseLoader,
  UivAffectionTooltip,
  UivGoldenForm,
  UivVirtueRadio,
} from './uiverse'
import { celestialAudio } from '../audio/celestialSynth'

export const InteractiveUiverseGalaxy: React.FC = () => {
  const [loveCount, setLoveCount] = useState(7)
  const [switchesState, setSwitchesState] = useState({
    starlight: true,
    nebula: true,
    celestial: true,
  })

  const handleLoveClick = () => {
    celestialAudio.playStarBurst()
    setLoveCount((prev) => prev + 1)
  }

  return (
    <section id="interatividade" className="relative py-28 px-6 max-w-6xl mx-auto z-20">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold inline-block mb-3">
          Microinterações de Vanguarda
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          Cápsula Interativa &{' '}
          <span className="italic font-normal bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300">
            Promessas do Pai.
          </span>
        </h2>
        <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
          Componentes táteis do acervo com física viva, botões de toque refinado e interruptores de luz.
        </p>
      </div>

      {/* Grid of Interactive Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module 1: Love Heart Button & Counter */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between items-center text-center">
          <div>
            <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest block mb-2">
              Botão de Amor Infinito
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Enviar Amor para Alycia
            </h4>
            <p className="text-xs text-neutral-400 mb-6">
              Toque no coração interativo para registrar seu carinho em tempo real.
            </p>
          </div>

          <div className="my-4" onClick={handleLoveClick}>
            <UivLoveHeartButton />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-1.5 text-xs text-rose-300">
            <Heart className="h-3.5 w-3.5 fill-rose-300/60" />
            <span>{loveCount} Abraços Registrados</span>
          </div>
        </div>

        {/* Module 2: The 3 Starlight Switches */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block mb-2">
              Controles Ambientais
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Interruptores de Luz & Paz
            </h4>
            <p className="text-xs text-neutral-400 mb-6">
              Ative e sinta a textura dos interruptores celestiais táteis.
            </p>
          </div>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs text-neutral-200">Luz das Estrelas</span>
              <UivStarlightSwitch />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs text-neutral-200">Brisa da Aurora</span>
              <UivNebulaSwitch />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <span className="text-xs text-neutral-200">Proteção Celestial</span>
              <UivCelestialSwitch />
            </div>
          </div>
        </div>

        {/* Module 3: Virtue Alert Card */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-rose-300 uppercase tracking-widest block mb-2">
              Certificação Paterna
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Dons Inegáveis
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Reconhecimento oficial das maiores qualidades de Alycia Manuele.
            </p>
          </div>

          <div className="my-2">
            <UivVirtueAlertCard />
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <span>Autenticado pelo Pai</span>
            <span className="text-amber-200 font-semibold">100% Genuína</span>
          </div>
        </div>

        {/* Module 4: The 3 Promise Checkboxes */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-cyan-300 uppercase tracking-widest block mb-2">
              Compromisso Eterno
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Promessas de Pai
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Três juramentos gravados no coração para toda a vida.
            </p>
          </div>

          <div className="space-y-3.5 my-2">
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <UivPromiseCheckbox1 />
              <span className="text-xs text-neutral-200">Apoiar e incentivar cada sonho</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <UivPromiseCheckbox2 />
              <span className="text-xs text-neutral-200">Ser porto seguro em qualquer hora</span>
            </div>

            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
              <UivPromiseCheckbox3 />
              <span className="text-xs text-neutral-200">Amar com todas as forças para sempre</span>
            </div>
          </div>
        </div>

        {/* Module 5: Secret Glow Card & Lesson */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-purple-300 uppercase tracking-widest block mb-2">
              Mensagem Secreta
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              O Segredo do Amor
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Passe o mouse para revelar a iluminação oculta do cartão.
            </p>
          </div>

          <div className="my-auto flex justify-center py-2">
            <UivSecretGlowCard />
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-center text-xs text-purple-200">
            <span>Brilho Reativo aos Coordenadas</span>
          </div>
        </div>

        {/* Module 6: Capsule Card & Shimmer CTA */}
        <div className="glass-apple-card rounded-3xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-amber-300 uppercase tracking-widest block mb-2">
              Cápsula dos 7 Anos
            </span>
            <h4 className="font-serif-luxury text-2xl font-bold text-white mb-2">
              Toque & Reação
            </h4>
            <p className="text-xs text-neutral-400 mb-4">
              Interação física com o botão luminoso de alta densidade.
            </p>
          </div>

          <div className="my-auto flex justify-center py-2">
            <UivCapsuleCard />
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex justify-center">
            <UivGlowPillButton />
          </div>
        </div>
      </div>
    </section>
  )
}
