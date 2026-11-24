import React, { useState, useEffect } from 'react'
import { Heart, Sparkles, Send, Crown, Star, Gift, MessageCircle, Feather } from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface GuestMessage {
  id: string
  author: string
  relation: string
  message: string
  date: string
  badge: string
  color: string
}

const DEFAULT_MESSAGES: GuestMessage[] = [
  {
    id: 'msg-papai',
    author: 'Papai (Vinícius)',
    relation: 'Amor de Alma & Sangue',
    badge: 'Dedicatória Real',
    message: 'Minha princesa Alycia, ver você completar 7 anos é a maior bênção da minha vida. Você é a garota mais inteligente, linda e iluminada do mundo. O papai tá sempre com você, cuidando dos seus passos e te amando além do infinito. Feliz 7 anos, meu amor!',
    date: '24 de Novembro',
    color: '#ffd60a',
  },
  {
    id: 'msg-familia',
    author: 'Família & Anjos da Guarda',
    relation: 'Amor Infinito',
    badge: 'Bênção Sagrada',
    message: 'Que a sua infância seja repleta de gargalhadas puras, brincadeiras inesquecíveis, saúde e muita luz. O mundo é todinho seu para sonhar e conquistar!',
    date: 'Hoje & Sempre',
    color: '#ff375f',
  },
]

export const RoyalGuestbook: React.FC = () => {
  const [messages, setMessages] = useState<GuestMessage[]>(() => {
    const saved = localStorage.getItem('alycia_guestbook_messages_v1')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return DEFAULT_MESSAGES
      }
    }
    return DEFAULT_MESSAGES
  })

  const [authorName, setAuthorName] = useState('')
  const [relationText, setRelationText] = useState('')
  const [messageText, setMessageText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !messageText.trim()) return

    celestialAudio.playChime(987.77, 0.15)
    setIsSubmitting(true)

    const newMsg: GuestMessage = {
      id: `msg-${Date.now()}`,
      author: authorName.trim(),
      relation: relationText.trim() || 'Coração de Amigo',
      message: messageText.trim(),
      badge: 'Mensagem de Aniversário',
      date: 'Hoje',
      color: '#ffd60a',
    }

    const updated = [newMsg, ...messages]
    setMessages(updated)
    localStorage.setItem('alycia_guestbook_messages_v1', JSON.stringify(updated))

    setAuthorName('')
    setRelationText('')
    setMessageText('')
    setIsSubmitting(false)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 3000)
  }

  return (
    <section id="livro-recados" className="py-24 px-4 bg-[#050508] relative overflow-hidden select-none">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#ffd60a]/10 via-[#ff375f]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Cabeçalho Editorial */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd60a]/10 border border-[#ffd60a]/30 text-[#ffd60a] text-xs font-bold tracking-wider uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>Mural de Recados & Bênçãos</span>
          </div>
          <h2 className="font-heading font-black text-3xl md:text-5xl text-white tracking-tight">
            O Livro dos Desejos para Alycia
          </h2>
          <p className="text-sm md:text-base text-[#86868b] max-w-xl mx-auto leading-relaxed">
            Deixe uma mensagem gravada para a princesa Alycia guardar no coração durante todos os anos da sua vida.
          </p>
        </div>

        {/* Formulário de Dedicatória */}
        <div className="bg-[#101014]/90 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
            <Feather className="w-4 h-4 text-[#ffd60a]" />
            <span>Escreva uma Mensagem de Aniversário</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#a1a1a6] uppercase tracking-wider mb-1.5">
                  Seu Nome
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ex: Titia Ana, Primo Leo, Amiga Bia..."
                  required
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#ffd60a] transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#a1a1a6] uppercase tracking-wider mb-1.5">
                  Quem é você para a Alycia?
                </label>
                <input
                  type="text"
                  value={relationText}
                  onChange={(e) => setRelationText(e.target.value)}
                  placeholder="Ex: Tia coruja, Amiguinha da escola..."
                  className="w-full bg-[#181820] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#ffd60a] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#a1a1a6] uppercase tracking-wider mb-1.5">
                Sua Mensagem de Amor & Parabéns
              </label>
              <textarea
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Escreva seus votos mais lindos para a Alycia completar 7 anos..."
                required
                className="w-full bg-[#181820] border border-white/10 rounded-xl p-4 text-xs text-white placeholder-[#555] focus:outline-none focus:border-[#ffd60a] transition-colors resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              {justAdded ? (
                <span className="text-xs text-[#ffd60a] font-bold flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  Mensagem gravada com amor no livro da Alycia!
                </span>
              ) : (
                <span className="text-[11px] text-[#86868b]">
                  Sua mensagem fica guardada para sempre nesta homenagem.
                </span>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !authorName.trim() || !messageText.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#ffd60a] hover:bg-[#ffe043] text-black text-xs font-black transition-all shadow-lg shadow-[#ffd60a]/25 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Gravar Recado</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Mural de Mensagens em Cards Elegantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-3xl border transition-all ${
                msg.id === 'msg-papai'
                  ? 'bg-gradient-to-br from-[#ffd60a]/15 via-[#1a1810] to-[#141418] border-[#ffd60a]/40 shadow-xl shadow-[#ffd60a]/10 md:col-span-2'
                  : 'bg-[#121216]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs ${
                    msg.id === 'msg-papai'
                      ? 'bg-[#ffd60a] text-black shadow-md shadow-[#ffd60a]/30'
                      : 'bg-white/10 text-white'
                  }`}>
                    {msg.id === 'msg-papai' ? <Crown className="w-5 h-5 text-black" /> : <Heart className="w-4 h-4 text-[#ff375f]" />}
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-sm text-white flex items-center gap-1.5">
                      <span>{msg.author}</span>
                      {msg.id === 'msg-papai' && (
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#ffd60a] text-black">
                          Dedicatória do Papai
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-[#a1a1a6]">{msg.relation}</p>
                  </div>
                </div>

                <span className="text-[10px] text-[#86868b] font-mono">{msg.date}</span>
              </div>

              <p className="text-xs text-[#d2d2d7] leading-relaxed whitespace-pre-wrap font-medium pl-11">
                "{msg.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default RoyalGuestbook
