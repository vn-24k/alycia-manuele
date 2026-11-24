import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Crown,
  Maximize2,
  X,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

export interface PhotoMemory {
  id: string
  url: string
  title: string
  tag: string
  subtitle: string
  description: string
  highlight: string
}

const DEFAULT_ALBUM_PHOTOS: PhotoMemory[] = [
  {
    id: 'foto-1',
    url: '/photos/alycia_nova_1_guitarra.webp',
    title: 'A Pequena Rockstar & A Guitarra',
    tag: 'Fase Mais Nova • Música & Atitude',
    subtitle: 'Alegria Pura no Quarto dos Sonhos',
    description:
      'Desde pequenininha com a guitarra nas mãos e aquela atitude autêntica de quem nasceu para encantar o mundo. A sua gargalhada viva enche a casa de luz.',
    highlight: 'A primeira grande paixão pela música e a liberdade de ser feliz.',
  },
  {
    id: 'foto-2',
    url: '/photos/alycia_nova_2_princesa_radiante.webp',
    title: 'A Princesa dos Meus Olhos',
    tag: 'Sete Anos • Olhar Radiante',
    subtitle: 'Sari Rosa & A Flor no Cabelo',
    description:
      'Com um sorriso largo e sincero que ilumina qualquer escuridão. O marco sagrado dos seus 7 anos, onde cada detalhe reflete a nobreza e pureza da sua alma.',
    highlight: 'A flor mais linda e preciosa do jardim da vida do papai.',
  },
  {
    id: 'foto-3',
    url: '/photos/alycia_nova_3_princesa_ternura.webp',
    title: 'Ternura e Delicadeza Real',
    tag: 'Sete Anos • Doçura de Princesa',
    subtitle: 'Sorriso Tímido e Pulseiras de Cristal',
    description:
      'Aquele olhar tímido e carinhoso que derrete o coração do pai. A sua delicadeza e afeto são o maior orgulho que um homem pode carregar.',
    highlight: 'A pureza que desarma qualquer tristeza do mundo.',
  },
  {
    id: 'foto-4',
    url: '/photos/alycia_nova_4_princesa_flor.webp',
    title: 'A Flor Mais Nobre do Reino',
    tag: 'Sete Anos • Perfil Angelical',
    subtitle: 'Graça, Elegância e Serenidade',
    description:
      'Ajustando a flor rosa no cabelo com a dignidade e a serenidade de uma rainha. O papai sempre será a sua fortaleza e o seu porto seguro.',
    highlight: 'Sua essência é feita de bênção, harmonia e sabedoria.',
  },
  {
    id: 'foto-5',
    url: '/photos/alycia_nova_5_princesa_sonhadora.webp',
    title: 'Doce Sonho de Menina',
    tag: 'Sete Anos • Olhar Sonhador',
    subtitle: 'Mãozinha no Queixo & Puro Amor',
    description:
      'Apoiando o queixo na mãozinha, olhando com serenidade para o horizonte. Que todos os seus sonhos se realizem e que sua vida seja repleta de vitórias.',
    highlight: 'Nunca deixe de sonhar alto; você nasceu para governar o seu próprio destino.',
  },
]

interface RoyalPhotoAlbumProps {
  onOpenPhotoModal?: () => void
}

export const RoyalPhotoAlbum: React.FC<RoyalPhotoAlbumProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const currentPhoto = DEFAULT_ALBUM_PHOTOS[currentIndex]

  const handleNext = () => {
    celestialAudio.playSoftClick()
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % DEFAULT_ALBUM_PHOTOS.length)
  }

  const handlePrev = () => {
    celestialAudio.playSoftClick()
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + DEFAULT_ALBUM_PHOTOS.length) % DEFAULT_ALBUM_PHOTOS.length)
  }

  const handleSelect = (idx: number) => {
    if (idx === currentIndex) return
    celestialAudio.playSoftClick()
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section id="album-real" className="relative bg-[#000000] text-white py-16 px-4 border-b border-white/[0.08] overflow-hidden">
      {/* Luz ambiente suave dourada */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#ffd60a]/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-[840px] mx-auto">
        {/* Cabeçalho Editorial */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-semibold text-[#ffd60a] uppercase tracking-wider shadow-lg mb-3">
            <Crown className="w-3.5 h-3.5 text-[#ffd60a]" />
            <span>Álbum Sagrado • Momentos Reais</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            O Álbum Encantado de Alycia
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1a6] max-w-[560px] mx-auto">
            Deslize com o dedo ou use as setas para contemplar os momentos mais preciosos que guardamos no coração. Toque na foto para ampliar em tela cheia.
          </p>
        </div>

        {/* MOLDURA DA FOTO COM SETAS DIRETAMENTE SOBRE ELA */}
        <div className="relative w-full max-w-[540px] mx-auto">
          {/* Card Central com Ambient Glow */}
          <div className="relative rounded-[32px] p-2 bg-gradient-to-b from-[#ffd60a]/35 via-white/10 to-transparent shadow-[0_25px_70px_-15px_rgba(255,214,10,0.2)]">
            
            {/* Imagem com Proporção Perfeita 4:5 e Navegação Direta */}
            <div className="relative rounded-[26px] overflow-hidden aspect-[4/5] bg-[#0c0c10] border border-white/15 select-none touch-pan-y group">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentPhoto.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_e, { offset, velocity }) => {
                    const swipe = offset.x
                    if (swipe < -40 || velocity.x < -300) {
                      handleNext()
                    } else if (swipe > 40 || velocity.x > 300) {
                      handlePrev()
                    }
                  }}
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full h-full cursor-pointer relative"
                  title="Toque para ver em tela cheia"
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover object-[center_top] filter brightness-[0.98] contrast-[1.03] pointer-events-none transition-transform duration-700 group-hover:scale-[1.02]"
                  />

                  {/* Vinheta suave de gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Informações da foto integradas na base da imagem */}
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none text-left">
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#ffd60a] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 mb-2">
                      {currentPhoto.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      {currentPhoto.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-2 mt-1">
                      {currentPhoto.subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botão de Expandir em Tela Cheia (Topo Esquerdo) */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                title="Ampliar Foto"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* SETA ESQUERDA (SOBRE A FOTO) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/65 hover:bg-black/90 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-xl transition-all cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* SETA DIREITA (SOBRE A FOTO) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/65 hover:bg-black/90 active:scale-95 text-white flex items-center justify-center backdrop-blur-md border border-white/25 shadow-xl transition-all cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Contador de fotos no topo */}
              <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-white/90">
                {currentIndex + 1} de {DEFAULT_ALBUM_PHOTOS.length}
              </div>
            </div>
          </div>

          {/* DEDICATÓRIA DA FOTO ATIVA (LOGO ABAIXO DA FOTO, COMPACTA) */}
          <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
            <p className="text-xs sm:text-sm text-[#d2d2d7] leading-relaxed">
              "{currentPhoto.description}"
            </p>
            <div className="mt-2 text-[11px] font-semibold text-[#ffd60a] flex items-center justify-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#ff375f] text-[#ff375f]" />
              <span>{currentPhoto.highlight}</span>
            </div>
          </div>

          {/* MINIATURAS CLICÁVEIS (ACESSO RÁPIDO A CADA FOTO) */}
          <div className="mt-4 flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap">
            {DEFAULT_ALBUM_PHOTOS.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[4/5] w-14 sm:w-16 border-2 transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'border-[#ffd60a] ring-2 ring-[#ffd60a]/50 scale-105 shadow-lg'
                    : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/30'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-[center_top]"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-white text-center py-0.5">
                  #{idx + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL LIGHTBOX EM TELA CHEIA (ZOOM IMERSIVO) */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          >
            {/* Botão Fechar */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer"
              title="Fechar"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Container da Foto Ampliada */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center select-none"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 max-h-[80vh]">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-2xl"
                />

                {/* Seta Esquerda Lightbox */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/30 backdrop-blur-md transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Seta Direita Lightbox */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/30 backdrop-blur-md transition-all cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Legenda no Lightbox */}
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-[#ffd60a] uppercase tracking-wider block">
                  {currentPhoto.title}
                </span>
                <p className="text-xs text-white/70 mt-0.5 max-w-md">
                  {currentPhoto.subtitle} • Foto {currentIndex + 1} de {DEFAULT_ALBUM_PHOTOS.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
