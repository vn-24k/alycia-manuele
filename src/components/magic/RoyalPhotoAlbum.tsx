import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Camera,
  Crown,
  Stars,
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
    url: '/photos/alycia_foto_recente_1.webp',
    title: 'Papai Vinícius & Princesa Alycia',
    tag: 'Elo Sagrado • 7 Anos',
    subtitle: 'Amor Que Ultrapassa Qualquer Distância',
    description:
      'Não existe distância física, tempo ou obstáculo capaz de enfraquecer o que sentimos. Meu coração bate dentro do seu peito a cada segundo da sua vida.',
    highlight: 'A aliança eterna entre pai e filha.',
  },
  {
    id: 'foto-2',
    url: '/photos/alycia_foto_recente_2.webp',
    title: 'O Sorriso Mais Encantado do Mundo',
    tag: 'Alegria Pura & Doçura',
    subtitle: 'A Luz Que Ilumina a Vida do Papai',
    description:
      'Uma gargalhada pura que desarma qualquer tristeza e faz o mundo inteiro parecer em paz. O seu sorriso é o maior troféu da minha caminhada.',
    highlight: 'O sorriso que transforma qualquer dia comum em dia sagrado.',
  },
  {
    id: 'foto-3',
    url: '/photos/alycia_foto_3.webp',
    title: 'A Princesa Estudiosa',
    tag: 'Dedicação & Conhecimento',
    subtitle: 'Cadernos, Livros & Futuro Brilhante',
    description:
      'O brilho nos olhos da garotinha compenetrada em aprender e desbravar as letras e números. Ver você se dedicando aos estudos enche o meu peito de orgulho.',
    highlight: 'A sabedoria é a coroa mais nobre que uma princesa pode carregar.',
  },
  {
    id: 'foto-4',
    url: '/photos/alycia_foto_4.webp',
    title: 'Rockstar do Papai & A Guitarra',
    tag: 'Música & Atitude Autêntica',
    subtitle: 'No Quarto dos Sonhos com a Guitarra',
    description:
      'Com a guitarra em mãos e aquela atitude autêntica de quem nasceu para brilhar. A sua música favorita é a sinfonia do nosso amor.',
    highlight: 'A coragem de se expressar com arte e liberdade.',
  },
]

interface RoyalPhotoAlbumProps {
  onOpenPhotoModal?: () => void
}

export const RoyalPhotoAlbum: React.FC<RoyalPhotoAlbumProps> = ({ onOpenPhotoModal }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

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
            Deslize com o dedo ou use as setas para contemplar os momentos mais preciosos que guardamos no coração.
          </p>
        </div>

        {/* MOLDURA DA FOTO COM SETAS DIRETAMENTE SOBRE ELA */}
        <div className="relative w-full max-w-[540px] mx-auto">
          {/* Card Central com Ambient Glow */}
          <div className="relative rounded-[32px] p-2 bg-gradient-to-b from-[#ffd60a]/35 via-white/10 to-transparent shadow-[0_25px_70px_-15px_rgba(255,214,10,0.2)]">
            
            {/* Imagem com Proporção Perfeita 4:5 e Navegação Direta */}
            <div className="relative rounded-[26px] overflow-hidden aspect-[4/5] bg-[#0c0c10] border border-white/15 select-none touch-pan-y">
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
                  className="w-full h-full cursor-grab active:cursor-grabbing relative"
                >
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover object-[center_top] filter brightness-[0.98] contrast-[1.03] pointer-events-none"
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

            {onOpenPhotoModal && (
              <button
                type="button"
                onClick={onOpenPhotoModal}
                className="rounded-xl border border-dashed border-white/25 hover:border-[#ffd60a] aspect-[4/5] w-14 sm:w-16 flex flex-col items-center justify-center text-white/60 hover:text-[#ffd60a] transition-all bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                title="Personalizar Fotos"
              >
                <Camera className="w-4 h-4 mb-0.5" />
                <span className="text-[9px] font-medium">+ Fotos</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
