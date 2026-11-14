import React from 'react'
import { Heart, ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-14 px-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-serif-luxury text-xl font-bold text-white tracking-wide">
              Alycia Manuele
            </span>
            <span className="h-1 w-1 rounded-full bg-amber-300" />
            <span className="text-xs uppercase tracking-wider text-rose-300 font-medium">
              Edição 7 Anos
            </span>
          </div>
          <p className="mt-1 text-xs text-neutral-400">
            Dedicado com todo o amor e carinho eterno pelo seu pai.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-neutral-300 hover:text-white hover:border-white/20 transition-all backdrop-blur-md"
          >
            <span>Voltar ao Início</span>
            <ArrowUp className="h-3.5 w-3.5 text-amber-300" />
          </button>
        </div>
      </div>

      <div className="mt-8 text-center text-[11px] text-neutral-400">
        © {new Date().getFullYear()} Alycia Manuele. Todos os direitos reservados com amor incondicional.
      </div>
    </footer>
  )
}
