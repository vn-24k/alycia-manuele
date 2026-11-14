import React from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  TrendingUp,
  Zap,
  ArrowUpRight,
  Sparkles,
  Users,
  Star,
  CheckCircle2,
  Heart,
  Landmark,
} from 'lucide-react'
import { UivCtaButton, UivGlowPillButton, UivAffectionTooltip } from './uiverse'

interface RouletteTemplateBloomProps {
  onExploreClick: () => void
  onCelebrateClick: () => void
}

export const RouletteTemplateBloom: React.FC<RouletteTemplateBloomProps> = ({
  onExploreClick,
  onCelebrateClick,
}) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 max-w-6xl mx-auto z-20">
      {/* 
        MASTER CONTAINER (1:1 FIDELITY WITH ROULETTE TEMPLATE 3b5029bb-4864-488e-b71a-1e7288e50fa0.jpg)
        Large rounded white card floating on the deep purple twilight canvas
      */}
      <div className="relative rounded-[36px] sm:rounded-[52px] bg-white text-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.45)] border border-white/60 p-6 sm:p-12 md:p-16 overflow-hidden">
        {/* Subtle Ambient Purple Glow inside the card */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 bg-purple-200/50 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 bg-violet-100/60 rounded-full blur-3xl" />

        {/* 1. Header / Navbar inside Card (matching template) */}
        <div className="flex items-center justify-between pb-10 border-b border-slate-100">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3b2d71] to-[#6d4bc2] text-white shadow-md">
              {/* Blooming flower icon from template */}
              <Sparkles className="h-5 w-5 text-amber-200" />
            </div>
            <span className="font-serif-luxury text-2xl font-bold tracking-tight text-[#161233]">
              Alycia
            </span>
          </div>

          {/* Navigation links (from template: Solutions, Features, Resources, Company, Pricing) */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600">
            <a href="#historia" className="hover:text-[#4b3599] transition-colors">
              História
            </a>
            <a href="#virtudes" className="hover:text-[#4b3599] transition-colors">
              Virtudes
            </a>
            <a href="#estatisticas" className="hover:text-[#4b3599] transition-colors">
              Estatísticas
            </a>
            <a href="#scrolly-chapter" className="hover:text-[#4b3599] transition-colors">
              Capítulos
            </a>
            <a href="#memorias" className="hover:text-[#4b3599] transition-colors">
              Memórias
            </a>
          </div>

          {/* Action button (from template: Launch App -> Celebrar 7 Anos) */}
          <button
            onClick={onCelebrateClick}
            className="rounded-full bg-[#161233] hover:bg-[#2b2259] text-white text-xs font-semibold px-5 py-2.5 transition-all shadow-md active:scale-95 flex items-center gap-2"
          >
            <Heart className="h-3.5 w-3.5 text-rose-300 fill-rose-300" />
            <span>Celebrar 7 Anos</span>
          </button>
        </div>

        {/* 2. Hero Section (1:1 with template left & right composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center py-12 md:py-16">
          {/* Left Column: Typography & Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tag pill: Stable Growth. Smart Future. -> Sete Anos de Luz. Amor Infinito. */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-xs text-slate-700 font-medium">
              <span className="h-2 w-2 rounded-full bg-[#5b3eb8] animate-pulse" />
              <span>Sete Anos Extraordinários. Amor Sem Fim.</span>
            </div>

            {/* Monumental high-contrast serif title: Where Money Grows -> Onde o Amor Floresce */}
            <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-[#161233] leading-[1.04] tracking-tight">
              Onde o <br />
              <span className="italic font-normal text-[#5839b5]">Amor</span> <br />
              Floresce
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Uma experiência cinematográfica em celebração aos 7 anos de uma garotinha extraordinária, criada para iluminar o mundo com seu sorriso, sua inteligência viva e seu coração puro.
            </p>

            {/* CTA Button: Get Started ↗ */}
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#161233] hover:bg-[#2e2261] text-white text-xs sm:text-sm font-semibold px-7 py-3.5 transition-all shadow-xl active:scale-95"
              >
                <span>Explorar a Jornada</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <div className="text-xs text-slate-500 font-medium">
                Padrão Flagship de Design
              </div>
            </div>
          </div>

          {/* Right Column: The 3D Lavender Blooming Flower & Floating Discs Scene */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              {/* Ambient radial flower illumination */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/40 via-violet-200/30 to-rose-200/40 rounded-full blur-2xl" />

              {/* 3D Giant Metallic Coin / Disc (from template) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotateZ: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-4 right-4 w-44 h-44 sm:w-52 sm:h-52 rounded-full border-8 border-purple-200/70 bg-gradient-to-br from-[#7a58d6] via-[#482c9e] to-[#25135c] shadow-2xl flex items-center justify-center text-white"
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-purple-300/30 bg-purple-900/40 backdrop-blur-md flex flex-col items-center justify-center p-3 text-center">
                  <Heart className="h-8 w-8 text-rose-300 fill-rose-300 animate-pulse" />
                  <span className="font-serif-luxury text-xl font-bold mt-1">7 Anos</span>
                  <span className="text-[10px] uppercase tracking-wider text-purple-200">Alycia</span>
                </div>
              </motion.div>

              {/* Secondary Floating Metallic Disc */}
              <motion.div
                animate={{ y: [0, 8, 0], rotateZ: [0, -3, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-8 left-4 w-32 h-32 rounded-full border-4 border-violet-200/60 bg-gradient-to-tr from-[#3b2382] via-[#613cc9] to-[#8d69f0] shadow-xl flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <Star className="h-6 w-6 text-amber-300 fill-amber-300 mx-auto" />
                  <span className="text-xs font-semibold block mt-1">Luz Pura</span>
                </div>
              </motion.div>

              {/* Blooming 3D Lotus Centerpiece (Rendered Flower from Template) */}
              <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-purple-100 to-violet-300">
                  <img
                    src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop"
                    alt="Flor de Lótus Lilás em Floração"
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b103d]/50 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 backdrop-blur-md px-3 py-0.5 text-[10px] font-bold text-[#1f1647] whitespace-nowrap shadow-md">
                    Alycia Manuele
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. "Why Bloom?" Section -> "Por que Alycia?" (1:1 with template cards) */}
        <div id="virtudes" className="py-12 border-t border-slate-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left title & desc */}
            <div className="lg:col-span-4 space-y-3">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#161233]">
                Por que Alycia?
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Poderosas virtudes e dons naturais que fazem da vida ao seu redor uma constante lição de alegria e encanto.
              </p>
            </div>

            {/* Right 3 Elevated Cards (matching template icons and layout) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Secure & Reliable -> Segura & Corajosa */}
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-purple-300">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5235aa] text-white shadow-md mb-4">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#161233]">
                    Segura & Corajosa
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Coração nobre que protege os amigos, enfrenta desafios com determinação e aprende tudo com alegria.
                  </p>
                </div>
              </div>

              {/* Card 2: Smart Performance -> Inteligência Viva */}
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-purple-300">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#39247c] text-white shadow-md mb-4">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#161233]">
                    Inteligência Viva
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Curiosidade rápida que faz as perguntas mais brilhantes sobre a vida, a natureza e as artes.
                  </p>
                </div>
              </div>

              {/* Card 3: Instant Transactions -> Alegria Instantânea */}
              <div className="rounded-2xl bg-slate-50/80 border border-slate-200/70 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:border-purple-300">
                <div>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5b3eb8] text-white shadow-md mb-4">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-[#161233]">
                    Alegria Instantânea
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                    Um riso doce capaz de transformar qualquer momento cinzento em pura luz e esperança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Dark Metrics Banner (1:1 with template 1M+ Happy Users, $2.4B+, 99.9%) */}
        <div id="estatisticas" className="my-8 rounded-2xl sm:rounded-3xl bg-[#140f33] text-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left shadow-xl border border-purple-900/40">
          {/* Stat 1: 1M+ Happy Users -> 7 Anos */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-400/20 text-purple-300 flex-shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white">
                7 Anos
              </div>
              <div className="text-xs text-purple-200/80 uppercase tracking-wider mt-0.5">
                2.556 Dias Iluminados
              </div>
            </div>
          </div>

          {/* Stat 2: $2.4B+ Assets Managed -> 120+ bpm Risos */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/20 border border-violet-400/20 text-violet-300 flex-shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-amber-200">
                120+ bpm
              </div>
              <div className="text-xs text-purple-200/80 uppercase tracking-wider mt-0.5">
                Gargalhadas por Minuto
              </div>
            </div>
          </div>

          {/* Stat 3: 99.9% Uptime & Security -> 100% Amor Incondicional */}
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 border border-rose-400/20 text-rose-300 flex-shrink-0">
              <Star className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif-luxury text-3xl sm:text-4xl font-bold text-rose-300">
                100%
              </div>
              <div className="text-xs text-purple-200/80 uppercase tracking-wider mt-0.5">
                Amor Incondicional do Pai
              </div>
            </div>
          </div>
        </div>

        {/* 5. Classical Architectural Sanctuary (1:1 with template bottom temple) */}
        <div className="pt-10 text-center">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#161233] mb-2">
            Amada por quem tem a sorte de conhecê-la
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-8">
            Um refúgio de dignidade, ternura e virtudes construído para atravessar o tempo.
          </p>

          <div className="relative max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-[#161138]">
            <img
              src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop"
              alt="Monumento Clássico Rodeado de Flores Lilases"
              className="w-full h-64 sm:h-80 object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#161138] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-purple-300" />
                <span className="font-medium">O Templo das Memórias</span>
              </div>
              <span className="text-amber-200 font-serif-luxury text-sm font-semibold">
                Alycia Manuele
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
