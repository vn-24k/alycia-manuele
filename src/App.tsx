import React, { useState } from 'react'
import { AppleGlobalNav } from './components/apple/AppleGlobalNav'
import { AppleRibbon } from './components/apple/AppleRibbon'
import { AppleHeroDark } from './components/apple/AppleHeroDark'
// Componentes preparados para as próximas etapas:
// import { AppleHeroLight } from './components/apple/AppleHeroLight'
// import { AppleHeroViolet } from './components/apple/AppleHeroViolet'
// import { ApplePromoGrid } from './components/apple/ApplePromoGrid'
// import { AppleStreamerCarousel } from './components/apple/AppleStreamerCarousel'
// import { AppleEditorialLetter } from './components/apple/AppleEditorialLetter'
import { PhotoUploadModal } from './components/PhotoUploadModal'
import { MemoryCardData } from './components/MemoryVault3D'
import ElasticSleekCursor from './components/cursors/ElasticSleekCursor'
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

  // Seletor de Cursores Interativos (Memória no LocalStorage)
  const [currentCursor, setCurrentCursor] = useState<CursorType>(() => {
    return (localStorage.getItem('alycia_active_cursor') as CursorType) || 'fluido'
  })

  // Imagem Principal do Hero
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('alycia_hero_image') || DEFAULT_HERO_IMAGE
  })

  // Cartões de Memórias
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

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] overflow-x-hidden font-sf antialiased selection:bg-[#0071e3]/30 selection:text-white pb-16">
      {/* 
        CURSORES INTERATIVOS EM TEMPO REAL
        1. Fluido WebGL (Simulação física de fumaça colorida Navier-Stokes)
        2. Elástico Sleek (Mira com física de estiramento e rotação angular)
        3. Suave 21st (Anel magnético suave)
        4. Padrão do Sistema
      */}
      {currentCursor === 'fluido' && <FluidSimulationCursor />}
      {currentCursor === 'elastico' && <ElasticSleekCursor />}
      {currentCursor === 'suave' && (
        <SmoothCursor color="#2997ff" glowColor="rgba(41, 151, 255, 0.45)" />
      )}

      {/* Navegação Global 44px Frosted Glass (Marca Alycia Manuele) */}
      <AppleGlobalNav
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        currentCursor={currentCursor}
        onSelectCursor={handleSelectCursor}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Trilha Principal */}
      <main className="relative pt-[44px]">
        {/* Faixa de Destaque */}
        <AppleRibbon />

        {/* 
          ETAPA 1: HERO PRINCIPAL TITÂNIO (Foco Atual)
          Aqui construímos a manchete de impacto, o subtítulo, a foto oficial e as métricas.
        */}
        <AppleHeroDark
          heroImage={heroImage}
          onExploreClick={() => {}}
          onMemoriesClick={() => {}}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* 
          AS DEMAIS SEÇÕES ESTÃO PRONTAS E SERÃO LIBERADAS UMA A UMA:
          - Etapa 2: Linha do Tempo Starlight (Os marcos do 1º ao 7º ano)
          - Etapa 3: Superpoderes & Virtudes (Os 4 dons especiais)
          - Etapa 4: Grade Promo 2x3 (6 cartões com o Cubo 3D interativo e som)
          - Etapa 5: Stream de Memórias (Carrossel estilo Apple TV+)
          - Etapa 6: Carta do Papai (Dedicatória e encerramento oficial)
        */}
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
