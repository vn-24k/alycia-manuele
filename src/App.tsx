import React, { useState } from 'react'
import { AppleGlobalNav } from './components/apple/AppleGlobalNav'
import { AppleRibbon } from './components/apple/AppleRibbon'
import { AppleHeroDark } from './components/apple/AppleHeroDark'
import { SweatyPortalIntro } from './components/arsenal/SweatyPortalIntro'
import { AppleEditorialLetter } from './components/apple/AppleEditorialLetter'
import { AppleFooter } from './components/apple/AppleFooter'
import { MagicBirthdayCake } from './components/magic/MagicBirthdayCake'
import { RoyalPhotoAlbum } from './components/magic/RoyalPhotoAlbum'
import { RoyalGuestbook } from './components/magic/RoyalGuestbook'
import { EnchantedMusicBox } from './components/music/EnchantedMusicBox'
import { PhotoUploadModal } from './components/PhotoUploadModal'
import { MemoryCardData } from './components/MemoryVault3D'
import SpringWaveCursor from './components/cursors/SpringWaveCursor'
import FairySparkleCursor from './components/cursors/FairySparkleCursor'
import FloatingCursorControl from './components/cursors/FloatingCursorControl'
import { SmoothCursor } from './components/21st/smooth-cursor'
import { CursorType } from './components/cursors/CursorSwitcher'

const DEFAULT_HERO_IMAGE = '/photos/alycia_foto_recente_1.webp'

const DEFAULT_MEMORY_CARDS: MemoryCardData[] = [
  {
    id: 'card-1',
    title: 'O Sorriso Mais Encantado do Mundo',
    date: 'Capítulo Inesquecível',
    location: 'No Aconchego do Coração',
    image: '/photos/alycia_foto_recente_2.webp',
    caption:
      'Aquele momento em que o mundo parou e uma gargalhada pura iluminou cada canto da nossa história.',
    tag: 'Afeto Eterno',
  },
  {
    id: 'card-2',
    title: 'A Princesa Estudiosa & Nobre',
    date: 'Dedicação & Conhecimento',
    location: 'Cadernos & Descobertas',
    image: '/photos/alycia_foto_3.webp',
    caption:
      'O brilho nos olhos de quem descobre o mundo a cada página, construindo um futuro brilhante e cheio de orgulho para o papai.',
    tag: 'Estudos & Futuro',
  },
  {
    id: 'card-3',
    title: 'Rockstar do Papai & A Guitarra',
    date: 'Música, Atitude & Alegria',
    location: 'O Quarto dos Sonhos',
    image: '/photos/alycia_foto_4.webp',
    caption:
      'Com a guitarra em mãos e aquela atitude autêntica que faz o coração do pai transbordar de admiração por cada acorde de alegria.',
    tag: 'Rock & Magia',
  },
  {
    id: 'card-4',
    title: 'O Abraço Que Cura Tudo',
    date: 'Aliança Que Vence Distâncias',
    location: 'Refúgio de Amor',
    image: '/photos/alycia_foto_recente_1.webp',
    caption:
      'Não existe lugar mais seguro ou acolhedor do que o abraço apertado entre pai e filha. Nosso elo é eterno.',
    tag: 'Amor Infinito',
  },
  {
    id: 'card-5',
    title: 'Sete Anos de Pura Magia',
    date: 'O Grande Marco Sagrado',
    location: 'Hoje & Para Sempre',
    image: '/photos/alycia_foto_recente_2.webp',
    caption:
      'Celebrando a existência da garotinha mais iluminada, alegre e extraordinária do universo. Feliz aniversário, Alycia!',
    tag: '7 Anos',
  },
]

export default function App() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Cursor selector - Padrão do sistema é o default oficial (limpo, natural e sem distrações)
  const [currentCursor, setCurrentCursor] = useState<CursorType>(() => {
    const saved = localStorage.getItem('alycia_active_cursor_v5') as CursorType
    if (saved === 'varinha' || saved === 'ondas' || saved === 'suave' || saved === 'padrao') {
      return saved
    }
    return 'padrao'
  })

  // Hero image state - fotos reais salvas no celular
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('alycia_hero_image_v5') || DEFAULT_HERO_IMAGE
  })

  // Memory cards state - fotos reais salvas no celular
  const [memoryCards, setMemoryCards] = useState<MemoryCardData[]>(() => {
    const saved = localStorage.getItem('alycia_memory_cards_v5')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        return DEFAULT_MEMORY_CARDS
      }
    }
    return DEFAULT_MEMORY_CARDS
  })

  const handleSelectCursor = (cursor: CursorType) => {
    setCurrentCursor(cursor)
    localStorage.setItem('alycia_active_cursor_v4', cursor)
  }

  const updateHeroImage = (url: string) => {
    setHeroImage(url)
    localStorage.setItem('alycia_hero_image', url)
  }

  const updateMemoryCard = (id: string, url: string) => {
    setMemoryCards((prev) => {
      const updated = prev.map((card) => (card.id === id ? { ...card, image: url } : card))
      localStorage.setItem('alycia_memory_cards', JSON.stringify(updated))
      return updated
    })
  }

  const resetPhotos = () => {
    setHeroImage(DEFAULT_HERO_IMAGE)
    setMemoryCards(DEFAULT_MEMORY_CARDS)
    localStorage.removeItem('alycia_hero_image')
    localStorage.removeItem('alycia_memory_cards')
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const scrollToLetter = () => {
    const el = document.getElementById('carta-pai')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToAlbum = () => {
    const el = document.getElementById('album-real')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] overflow-x-hidden font-sf antialiased selection:bg-[#0071e3]/30 selection:text-white pb-16">
      {/* 
        1. INTRO EXPANSIVA CIRCULAR DO SWEATY-SHOP-LOADING
        Portal místico com coroa de luz revelando a celebração
      */}
      <SweatyPortalIntro />

      {/* 
        CURSORES INTERATIVOS OPCIONAIS (Padrão do sistema é o default limpo, zero poluição)
        - Varinha de Condão / FairySparkleCursor (Pó de estrelas cintilantes ao mover e clicar)
        - Ondas Mágicas / SpringWaveCursor (Fitas de aurora com física de molas)
        - Aura Estelar (Anel magnético de luz dourada)
      */}
      {currentCursor === 'varinha' && <FairySparkleCursor />}
      {currentCursor === 'ondas' && <SpringWaveCursor />}
      {currentCursor === 'suave' && (
        <SmoothCursor color="#ffd60a" glowColor="rgba(255, 214, 10, 0.55)" />
      )}

      {/* Navegação Global 44px (Marca Alycia Manuele) */}
      <AppleGlobalNav
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        currentCursor={currentCursor}
        onSelectCursor={handleSelectCursor}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Trilha Principal da Celebração */}
      <main className="relative pt-[44px]">
        {/* Faixa Oficial da Celebração */}
        <AppleRibbon />

        {/* 1. Hero Principal Monumental de Aniversário (Enquadramento 4:5 sem corte) */}
        <AppleHeroDark
          heroImage={heroImage}
          onExploreClick={scrollToAlbum}
          onMemoriesClick={scrollToLetter}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* 
          2. O BOLO MÁGICO DE 7 ANOS COM VELINHAS SOPRÁVEIS
          Alycia pode tocar em cada vela para fazer um pedido sagrado ou soprar todas de uma vez,
          desencadeando chuva de confetes, estrelas e canção celestial dos 7 anos.
        */}
        <MagicBirthdayCake />

        {/* 
          3. ÁLBUM NOBRE DE MEMÓRIAS REAIS DA PRINCESA ALYCIA
          Focado 100% nas fotos reais da Alycia (Pai & Alycia, Sorriso, Estudando, Guitarra).
          Botões de setas integrados diretamente sobre a imagem e suporte a swipe móvel no celular,
          sem saltos de tela e sem exigir fotos fictícias de anos anteriores.
        */}
        <RoyalPhotoAlbum onOpenPhotoModal={() => setIsPhotoModalOpen(true)} />

        {/* 4. Clímax Emocional: Carta do Papai Vinícius para Alycia */}
        <AppleEditorialLetter />

        {/* 5. O Livro dos Desejos & Mural de Recados para Alycia */}
        <RoyalGuestbook />
      </main>

      {/* 12. Apple Official Celebration Directory & Footnotes */}
      <AppleFooter />

      {/* 13. Caixinha de Música Encantada (Music Box Player Flutuante) */}
      <EnchantedMusicBox onScrollToLetter={scrollToLetter} />

      {/* 14. Botão Bonito e Interativo para Selecionar o Cursor */}
      <FloatingCursorControl
        currentCursor={currentCursor}
        onSelectCursor={handleSelectCursor}
      />

      {/* Modal para Troca Rápida de Fotos */}
      <PhotoUploadModal
        isOpen={isPhotoModalOpen}
        onClose={() => setIsPhotoModalOpen(false)}
        heroImage={heroImage}
        onUpdateHeroImage={updateHeroImage}
        memoryCards={memoryCards}
        onUpdateMemoryCard={updateMemoryCard}
        onResetPhotos={resetPhotos}
      />
    </div>
  )
}
