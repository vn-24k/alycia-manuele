import React, { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { StarfieldCanvas } from './components/StarfieldCanvas'
import { SpecsSection } from './components/SpecsSection'
import { TimelineSection } from './components/TimelineSection'
import { BentoGridSection } from './components/BentoGridSection'
import { MemoryVault3D, MemoryCardData } from './components/MemoryVault3D'
import { LetterSection } from './components/LetterSection'
import { PhotoUploadModal } from './components/PhotoUploadModal'
import { Footer } from './components/Footer'

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
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem('alycia_hero_image') || DEFAULT_HERO_IMAGE
  })
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

  return (
    <div className="relative min-h-screen bg-[#07070a] text-neutral-100 overflow-x-hidden selection:bg-rose-500/20 selection:text-rose-200">
      {/* Real Starfield Canvas from Arsenal */}
      <StarfieldCanvas />

      {/* Global Apple Navbar */}
      <Navbar onOpenPhotoModal={() => setIsPhotoModalOpen(true)} />

      {/* Main Experience Flows */}
      <main className="relative z-10">
        <HeroSection
          heroImage={heroImage}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        <SpecsSection />

        <TimelineSection />

        <BentoGridSection />

        <MemoryVault3D
          cards={memoryCards}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        <LetterSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Photo Customizer Modal */}
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
