import React from 'react'

export const AppleFooter: React.FC = () => {
  return (
    <footer className="bg-[#161617] text-[#86868b] text-[11px] sm:text-xs leading-normal py-10 px-4 border-t border-white/[0.08]">
      <div className="max-w-[1024px] mx-auto space-y-6">
        {/* Footnotes Section (Apple 1, 2, 3 Footnotes) */}
        <div className="space-y-2 border-b border-white/[0.08] pb-6 text-[#6e6e73]">
          <p>
            1. Os dados de felicidade, curiosidade e alegria apresentados nesta página foram medidos ao longo de 2.556 dias de observação diária e apaixonada de um pai coruja.
          </p>
          <p>
            2. A fofura, o sorriso e a inteligência de Alycia Manuele foram certificados como infinitamente superiores a qualquer padrão prévio registrado.
          </p>
          <p>
            3. Todo o carinho, proteção e dedicação expressos neste tributo são válidos por tempo indeterminado e perpétuo, sem limite de validade.
          </p>
        </div>

        {/* 5-Column Apple Directory Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 pt-2">
          {/* Column 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-tight">
              Descobrir & Celebrar
            </h4>
            <ul className="space-y-2 text-[#a1a1a6]">
              <li><a href="#alycia-pro" className="hover:text-white transition-colors">Início Oficial</a></li>
              <li><a href="#bolo-magico" className="hover:text-[#ffd60a] transition-colors font-medium">Bolo dos 7 Anos</a></li>
              <li><a href="#album-real" className="hover:text-white transition-colors">Álbum de Fotos</a></li>
              <li><a href="#promessas-reais" className="hover:text-[#ffd60a] transition-colors">As 7 Promessas</a></li>
              <li><a href="#carta-pai" className="hover:text-[#ff375f] transition-colors font-semibold">Carta do Papai</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-tight">
              Momentos Marcantes
            </h4>
            <ul className="space-y-2 text-[#a1a1a6]">
              <li><span className="hover:text-white transition-colors cursor-pointer">O Nascimento</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Primeiros Passos</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Primeiras Palavras</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Estúdio de Arte</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Aventuras no Parque</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Sete Anos de Amor</span></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-tight">
              Virtudes
            </h4>
            <ul className="space-y-2 text-[#a1a1a6]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Curiosidade Quântica</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Gargalhada Mágica</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Coração Nobre</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Espírito Corajoso</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Carinho pelos Animais</span></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-tight">
              Valores da Família
            </h4>
            <ul className="space-y-2 text-[#a1a1a6]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Amor Incondicional</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Proteção Sempre</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Liberdade para Sonhar</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Apoio aos Estudos</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">União Eterna</span></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-[#f5f5f7] tracking-tight">
              Sobre a Homenagem
            </h4>
            <ul className="space-y-2 text-[#a1a1a6]">
              <li><a href="#carta-pai" className="hover:text-white transition-colors">Carta do Papai</a></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Dedicatória Oficial</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Álbum de Memórias</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Termos de Amor Eterno</span></li>
            </ul>
          </div>
        </div>

        {/* Support note */}
        <div className="pt-4 text-[#86868b] border-t border-white/[0.08]">
          Para falar com o papai, basta dar um abraço bem apertado ou chamar com todo carinho.
        </div>

        {/* Legal & Copyright Row */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[#6e6e73]">
          <div>
            Copyright © 2026 Alycia Manuele. Todos os direitos de amor e proteção reservados. Obra autoral e proprietária dedicada à minha amada filha por Vinicius Caetano.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[#a1a1a6]">
            <span className="hover:text-white transition-colors cursor-pointer">Privacidade do Coração</span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Termos de Amor Eterno</span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">Declaração de Felicidade</span>
            <span className="text-white/20">|</span>
            <span className="text-white font-medium hover:underline cursor-pointer">Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
