import React, { useState } from 'react'
import { AppleGlobalNav } from './components/apple/AppleGlobalNav'
import { AppleRibbon } from './components/apple/AppleRibbon'
import { AppleHeroDark } from './components/apple/AppleHeroDark'
import { SweatyPortalIntro } from './components/arsenal/SweatyPortalIntro'
import { ZoomPrincessTransition } from './components/arsenal/ZoomPrincessTransition'
import { StickyPrincessCards } from './components/arsenal/StickyPrincessCards'
import { ImageFlockPrincesses } from './components/arsenal/ImageFlockPrincesses'
import { KineticLetterPlayground } from './components/arsenal/KineticLetterPlayground'
import { CodropsPaperShimmer } from './components/arsenal/CodropsPaperShimmer'
import { AppleEditorialLetter } from './components/apple/AppleEditorialLetter'
import { PhotoUploadModal } from './components/PhotoUploadModal'
import { MemoryCardData } from './components/MemoryVault3D'
import FluidSimulationCursor from './components/cursors/FluidSimulationCursor'
import { SmoothCursor } from './components/21st/smooth-cursor'
import { CursorType } from './components/cursors/CursorSwitcher'

const DEFAULT_HERO_IMAGE =
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1200&auto=format&fit=crop'

const DEFAULT_MEMORY_CARDS: MemoryCardData[] = [
  {
    id: 'card-1',
    title: 'O Primeiro Sorriso Espontâneo',
    date: 'Capítulo Inesquecível',
    location: 'No Aconchego de Casa',
    image:
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
    caption:
      'Aquele momento em que o mundo parou e uma gargalhada pura iluminou cada canto da nossa história.',
    tag: 'Afeto Eterno',
  },
  {
    id: 'card-2',
    title: 'Pintando o Próprio Arco-Íris',
    date: 'Tarde de Criatividade',
    location: 'Estúdio de Pintura',
    image:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
    caption:
      'Dedinhos cheios de tinta e um coração livre para inventar as cores mais mágicas da imaginação.',
    tag: 'Artes & Sonhos',
  },
  {
    id: 'card-3',
    title: 'Aventuras na Natureza',
    date: 'Dia de Parque & Sol',
    location: 'Sob a Luz da Tarde',
    image:
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop',
    caption:
      'Correndo na grama com o vento no rosto e aquela sensação de que o mundo inteiro é um parquinho.',
    tag: 'Liberdade',
  },
  {
    id: 'card-4',
    title: 'O Abraço Que Cura Tudo',
    date: 'Antes de Dormir',
    location: 'Refúgio de Amor',
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop',
    caption:
      'Não existe lugar mais seguro ou acolhedor do que o abraço apertado entre pai e filha.',
    tag: 'Amor Infinito',
  },
  {
    id: 'card-5',
    title: 'Sete Anos de Pura Magia',
    date: 'O Grande Marco',
    location: 'Hoje & Para Sempre',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
    caption:
      'Celebrando a existência da garotinha mais iluminada, alegre e extraordinária do universo.',
    tag: '7 Anos',
  },
]

export default function App() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Cursor selector - Fluido Mágico é o principal por padrão
  const [currentCursor, setCurrentCursor] = useState<CursorType>(() => {
    const saved = localStorage.getItem('alycia_active_cursor') as CursorType
    if (saved === 'fluido' || saved === 'suave' || saved === 'padrao') {
      return saved
    }
    return 'fluido'
  })

  // Hero image state
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('alycia_hero_image') || DEFAULT_HERO_IMAGE
  })

  // Memory cards state
  const [memoryCards, setMemoryCards] = useState<MemoryCardData[]>(() => {
    const saved = localStorage.getItem('alycia_memory_cards')
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
    localStorage.setItem('alycia_active_cursor', cursor)
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

  const scrollToGalleries = () => {
    const el = document.getElementById('galeria-reinos')
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] overflow-x-hidden font-sf antialiased selection:bg-[#0071e3]/30 selection:text-white pb-16">
      {/* 
        1. INTRO EXPANSIVA CIRCULAR DO SWEATY-SHOP-LOADING
        Portal místico que explode com coroas, flocos de neve e estrelas para revelar o reino
      */}
      <SweatyPortalIntro />

      {/* 
        CURSORES INTERATIVOS
        - Fluido Mágico (Principal - Simulação fluida de cores e fumaça)
        - Aura Estelar (Anel magnético de luz dourada)
        - Padrão do Sistema (Nativo do navegador)
      */}
      {currentCursor === 'fluido' && <FluidSimulationCursor />}
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

        {/* 1. Hero Principal Monumental de Aniversário */}
        <AppleHeroDark
          heroImage={heroImage}
          onExploreClick={scrollToGalleries}
          onMemoriesClick={scrollToLetter}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* 
          2. ZOOM TRANSITION (Código real do repositório zoom-transition)
          Galeria de 6 Reinos Encantados (Frozen/Elsa, Branca de Neve, Rapunzel, Cinderela, Luccas Neto, Alycia)
          com expansão em tela cheia e revelação cinematográfica
        */}
        <div id="galeria-reinos">
          <ZoomPrincessTransition />
        </div>

        {/* 
          3. STIKY CARDS (Código real do repositório stiky-cards)
          Livro de Histórias com cartas que voam de lados alternados e empilham em 3D
        */}
        <StickyPrincessCards />

        {/* 
          4. IMAGE FLOCK (Código real do repositório Image-Flock)
          Revoada interativa de princesas que flutuam na tela e reagem ao cursor
        */}
        <ImageFlockPrincesses />

        {/* 
          5. KINETIC LETTER PLAYGROUND (Inspirado no CodePen yyapzOP por donotfold)
          Playground interativo de tipografia cinética com pesos variáveis, ondas e piano mágico para Alycia brincar
        */}
        <KineticLetterPlayground />

        {/* 
          6. CODROPS PAPER (Código real do repositório codrops-paper)
          Manto de seda e ondas de papel iridescente com física matemática
        */}
        <CodropsPaperShimmer />

        {/* 7. Clímax Emocional: Carta do Papai para Alycia */}
        <AppleEditorialLetter />
      </main>

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
