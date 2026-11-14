import React, { useState } from 'react'
import { X, Upload, Check, RefreshCw, Image as ImageIcon } from 'lucide-react'
import { MemoryCardData } from './MemoryVault3D'

interface PhotoUploadModalProps {
  isOpen: boolean
  onClose: () => void
  heroImage: string
  onUpdateHeroImage: (url: string) => void
  memoryCards: MemoryCardData[]
  onUpdateMemoryCard: (id: string, url: string) => void
  onResetPhotos: () => void
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  heroImage,
  onUpdateHeroImage,
  memoryCards,
  onUpdateMemoryCard,
  onResetPhotos,
}) => {
  if (!isOpen) return null

  const handleHeroFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateHeroImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCardFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateMemoryCard(id, event.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[88vh] flex flex-col rounded-3xl glass-apple-card border border-white/20 bg-[#0f0f16] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Personalizar Fotos de Alycia
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Suba as fotos reais direto do seu dispositivo para ver o site com os momentos dela.
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Hero Main Photo */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={heroImage}
                alt="Foto Principal"
                className="h-16 w-16 rounded-full object-cover border border-white/20"
              />
              <div>
                <h4 className="font-semibold text-sm text-white">Foto Principal de Destaque</h4>
                <p className="text-xs text-neutral-400">Exibida no centro com o anel de luz solar.</p>
              </div>
            </div>

            <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-300/30 px-3.5 py-1.5 text-xs font-medium text-rose-200 transition-all">
              <Upload className="h-3.5 w-3.5" />
              <span>Subir Foto</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleHeroFileUpload} />
            </label>
          </div>

          {/* Cards Photos */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Fotos dos Cartões de Memória 3D
            </h4>

            {memoryCards.map((card) => (
              <div
                key={card.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-3.5 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-12 w-12 rounded-xl object-cover border border-white/20"
                  />
                  <div>
                    <h5 className="font-medium text-xs text-white truncate max-w-[200px] sm:max-w-xs">
                      {card.title}
                    </h5>
                    <span className="text-[10px] text-amber-200/80">{card.date}</span>
                  </div>
                </div>

                <label className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs text-neutral-200 transition-all">
                  <Upload className="h-3 w-3" />
                  <span>Trocar</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleCardFileUpload(card.id, e)}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 px-6 border-t border-white/10 flex items-center justify-between bg-black/30">
          <button
            onClick={onResetPhotos}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-rose-300 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Restaurar Fotos Padrão</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-neutral-900 bg-gradient-to-r from-amber-200 to-rose-200 hover:brightness-105 transition-all shadow-md"
          >
            <Check className="h-3.5 w-3.5" />
            <span>Salvar & Visualizar</span>
          </button>
        </div>
      </div>
    </div>
  )
}
