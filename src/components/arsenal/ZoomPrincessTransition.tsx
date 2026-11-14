import React, { useState } from 'react'
import { Sparkles, X, Heart, Star, Crown } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface PrincessCard {
  id: string
  title: string
  realm: string
  color: string
  badge: string
  image: string
  tagline: string
  description: string
  virtue: string
}

const PRINCESS_CARDS: PrincessCard[] = [
  {
    id: 'frozen',
    title: 'O Castelo de Gelo',
    realm: 'Reino de Arendelle • Frozen',
    color: '#64d2ff',
    badge: 'Coragem & Determinação',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=900&auto=format&fit=crop',
    tagline: 'Livre Estou para Sonhar e Vencer',
    description:
      'Assim como a Rainha Elsa aprendeu que o amor verdadeiro descongela qualquer coração, Alycia ilumina tudo ao seu redor com uma coragem brilhante e um carinho protetor.',
    virtue: 'Poder de transformar desafios em cristais de sabedoria.',
  },
  {
    id: 'snow-white',
    title: 'A Floresta Encantada',
    realm: 'Reino dos Sonhos • Branca de Neve',
    color: '#ff453a',
    badge: 'Bondade & Pureza',
    image: 'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=900&auto=format&fit=crop',
    tagline: 'A Doçura que Encanta a Natureza',
    description:
      'A pureza sincera de quem ama os passarinhos, os bichinhos da floresta e espalha um sorriso sincero que contagia todas as pessoas da família.',
    virtue: 'Bondade genuína e respeito por cada ser vivo.',
  },
  {
    id: 'rapunzel',
    title: 'As Lanternas Douradas',
    realm: 'Reino da Luz • Rapunzel',
    color: '#ffd60a',
    badge: 'Criatividade & Artes',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop',
    tagline: 'Pintando o Mundo com Cores Vivas',
    description:
      'Uma imaginação fértil que não cabe em quatro paredes. Desenhos, pinturas coloridas e a curiosidade de quem quer descobrir todas as estrelas do céu.',
    virtue: 'Espírito artístico que enxerga poesia em tudo.',
  },
  {
    id: 'cinderella',
    title: 'O Baile Real',
    realm: 'Palácio de Cristal • Cinderela',
    color: '#70d7ff',
    badge: 'Esperança & Nobreza',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=900&auto=format&fit=crop',
    tagline: 'Onde a Esperança Vence Sempre',
    description:
      'A certeza de que a generosidade e a fé no bem são os maiores tesouros de uma princesa da vida real.',
    virtue: 'Dignidade, carinho e perseverança.',
  },
  {
    id: 'aventureiros',
    title: 'Mundo dos Aventureiros',
    realm: 'Mundo da Imaginação • Luccas Neto',
    color: '#ff9f0a',
    badge: 'Gargalhada & Energia',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop',
    tagline: 'Alegria sem Fim e Brincadeiras Mágicas',
    description:
      'A gargalhada mais gostosa da casa, as corridas no parque, a energia inesgotável e a diversão sem limites.',
    virtue: 'Alegria pura que renova a alma de quem está por perto.',
  },
  {
    id: 'alycia-queen',
    title: 'A Princesa Alycia Manuele',
    realm: 'O Maior Tesouro do Papai • 7 Anos',
    color: '#ff375f',
    badge: 'Amor Incondicional',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
    tagline: 'O Marco Inesquecível de uma Vida Inteira',
    description:
      '7 anos iluminando os dias do papai. Mais corajosa que qualquer heroína dos livros e mais amada do que todas as estrelas do universo.',
    virtue: 'A razão de viver e o maior orgulho do seu pai.',
  },
]

export const ZoomPrincessTransition: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<PrincessCard | null>(null)

  const handleOpenZoom = (card: PrincessCard) => {
    setSelectedCard(card)
    celestialAudio.playCelestialHarp([523.25, 659.25, 783.99, 1046.5])
  }

  return (
    <section className="bg-[#000000] text-[#f5f5f7] py-20 px-4 border-b border-white/[0.08] relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2997ff]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#ffd60a] flex items-center justify-center gap-1.5 mb-2">
            <Crown className="w-3.5 h-3.5" />
            Galeria Encantada • Efeito Zoom Transition
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Os Reinos Favoritos de Alycia.
          </h2>
          <p className="text-sm sm:text-base text-[#86868b]">
            Clique em qualquer reino para abrir a transição imersiva em tela cheia com detalhes, virtudes e celebração.
          </p>
        </div>

        {/* 6-Card Grid with Zoom Trigger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCESS_CARDS.map((card) => {
            return (
              <div
                key={card.id}
                onClick={() => handleOpenZoom(card)}
                className="group relative rounded-[28px] overflow-hidden bg-[#16161a] border border-white/[0.08] hover:border-white/[0.24] cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-xl"
              >
                {/* Poster Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-neutral-900">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-md text-white"
                      style={{ backgroundColor: `${card.color}35` }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Expand Hint */}
                  <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-[#ffd60a] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Abrir Reino
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6">
                  <div className="text-xs uppercase font-semibold text-[#86868b] tracking-wider mb-1">
                    {card.realm}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#ffd60a] transition-colors mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#86868b] leading-relaxed line-clamp-2">
                    {card.tagline}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* FULLSCREEN ZOOM MODAL (zoom-transition mechanics) */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-[32px] bg-[#16161a] border border-white/20 overflow-hidden shadow-2xl animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Banner */}
            <div className="relative aspect-[21/10] overflow-hidden bg-black">
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                className="w-full h-full object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-black/40" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/20 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Realm Pill */}
              <div className="absolute bottom-4 left-6">
                <span
                  className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-white/20 text-white"
                  style={{ backgroundColor: `${selectedCard.color}40` }}
                >
                  {selectedCard.realm}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1">
                  {selectedCard.title}
                </h3>
                <p className="text-sm font-medium text-[#ffd60a]">
                  "{selectedCard.tagline}"
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#d2d2d7] leading-relaxed">
                {selectedCard.description}
              </p>

              {/* Highlight Virtue Box */}
              <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${selectedCard.color}25` }}
                >
                  <Star className="w-5 h-5" style={{ color: selectedCard.color }} />
                </div>
                <div className="text-xs text-white/90">
                  <div className="font-semibold text-white">Virtude Celebrada:</div>
                  <div className="text-[#86868b]">{selectedCard.virtue}</div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-[#ff375f] fill-[#ff375f]" />
                  Dedicado a Alycia Manuele
                </span>
                <button
                  onClick={() => setSelectedCard(null)}
                  className="apple-btn-primary px-4 py-1.5 text-xs"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
