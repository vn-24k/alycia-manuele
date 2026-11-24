import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
  Heart,
  Feather,
  Stars,
  Bookmark,
} from 'lucide-react'
import { celestialAudio } from '../../audio/celestialSynth'

interface StoryPage {
  age: number
  chapterTitle: string
  title: string
  summary: string
  prose: string
  lesson: string
  badge: string
  image: string
}

const STORY_PAGES: StoryPage[] = [
  {
    age: 0,
    chapterTitle: 'Prólogo Sagrado',
    title: 'A Estrela Mais Radiante do Céu Chega à Terra',
    badge: 'O Nascimento',
    summary: 'O momento divino em que o tempo parou e um pai renasceu para a vida.',
    prose:
      'Dizem os mais sábios que certas almas não chegam por acaso ao mundo: elas descem como estrelas-guia para iluminar a caminhada de quem mais precisa. No dia em que você nasceu, minha filha, o mundo ganhou uma nova cor. Quando peguei seu corpinho miúdo no colo e ouvi seu primeiro suspiro, tudo o que eu conhecia sobre força, honra e propósito ganhou um único nome: Alycia Manuele.',
    lesson: 'Com você no colo, entendi que a vida tinha me dado o seu maior tesouro.',
    image:
      'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 1,
    chapterTitle: 'Capítulo I',
    title: 'Os Primeiros Passos e a Firmeza no Chão',
    badge: '1 Aninho',
    summary: 'Pezinhos curiosos explorando o chão da favela com passos de realeza.',
    prose:
      'Com um aninho, você já queria conquistar o mundo. Suas perninhas firmavam com coragem e, a cada tropeço, você se levantava dando risada, com aquele olhar destemido de quem carrega sangue guerreiro. No chão humilde da favela, onde cada vitória é suada e verdadeira, ver seus pezinhos caminharem em minha direção era como ver o palácio mais nobre do universo se erguer sob nossos pés.',
    lesson: 'A verdadeira realeza não precisa de ouro: ela vive na coragem do coração.',
    image:
      'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 2,
    chapterTitle: 'Capítulo II',
    title: 'A Doçura das Primeiras Palavrinhas Mágicas',
    badge: '2 Aninhos',
    summary: 'A voz que transformava qualquer cansaço em pura paz e cantiga.',
    prose:
      'Aos dois anos, sua vozinha doce começou a pronunciar as palavras que até hoje ecoam no fundo da minha alma. Cada vez que você apontava para mim e soltava aquele "papai!", todo o peso do dia se desfazia num instante. Nós tínhamos um mundinho só nosso: brincávamos de esconde-esconde, inventávamos histórias e você já mostrava aquele sorriso cativante que desarma qualquer tristeza.',
    lesson: 'Ouvir sua voz é o abrigo mais seguro que existe no universo.',
    image:
      'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 3,
    chapterTitle: 'Capítulo III',
    title: 'A Imaginação sem Limites e as Cores da Vida',
    badge: '3 Aninhos',
    summary: 'Pintando o próprio arco-íris e transformando papel em castelos.',
    prose:
      'Com três anos, seus olhinhos brilhavam diante de lápis de cor e papéis em branco. Você não pintava apenas linhas: você criava universos inteiros onde princesas voavam com borboletas e castelos eram feitos de afeto. A gente passava horas rindo das suas invenções e da sua forma tão pura e livre de enxergar a beleza em cada detalhe simples.',
    lesson: 'A sua criatividade sempre foi um lembrete vivo de nunca perder a pureza.',
    image:
      'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 4,
    chapterTitle: 'Capítulo IV',
    title: 'O Abraço que Cura e a Aliança Inquebrável',
    badge: '4 Aninhos',
    summary: 'Dois corações sintonizados na frequência mais sincera do amor.',
    prose:
      'Aos quatro anos, você já era a minha companheirinha inseparável. Aquele abraço apertado no pescoço antes de dormir tinha o poder milagroso de curar qualquer ferida. Foi aí que você começou a me ensinar o que é o amor com a alma: aquele amor que não pede nada em troca, que não se abala com o tempo e que vence qualquer distância física que possa existir.',
    lesson: 'A nossa sintonia é sagrada: nada no céu ou na terra é capaz de enfraquecê-la.',
    image:
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 5,
    chapterTitle: 'Capítulo V',
    title: 'A Pequena Filósofa e as Perguntas sobre as Estrelas',
    badge: '5 Aninhos',
    summary: 'A mente brilhante que desejava decifrar o mistério de cada estrela.',
    prose:
      'Com cinco anos, suas perguntas começaram a deixar o papai sem palavras. Você olhava para o céu da noite e perguntava de onde vinha a lua, por que o vento soprava e como as flores sabiam a hora certa de abrir. Sua inteligência viva e sua sensibilidade já mostravam que você não seria apenas uma princesa comum, mas uma líder bondosa e consciente.',
    lesson: 'A sabedoria habita nos corações que nunca deixam de se encantar com a vida.',
    image:
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 6,
    chapterTitle: 'Capítulo VI',
    title: 'A Princesa Estudiosa e a Mochila dos Sonhos',
    badge: '6 Aninhos',
    summary: 'Letras, números e a dedicação exemplar nos primeiros passos escolares.',
    prose:
      'Aos seis anos, com sua mochilinha nas costas e o uniforme arrumado, você deu início a um dos capítulos mais lindos da sua história: os estudos. Ver sua dedicação com os cadernos, a concentração ouvindo a professora e o orgulho ao aprender a juntar as primeiras letras me encheu o peito de certeza: você nasceu para ser gigante e construir um destino grandioso.',
    lesson: 'O conhecimento é a maior coroa que uma princesa pode carregar na cabeça.',
    image:
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=900&auto=format&fit=crop',
  },
  {
    age: 7,
    chapterTitle: 'Capítulo VII (O Grande Marco)',
    title: 'Sete Anos de Pura Glória, Luz e Soberania',
    badge: 'Hoje & Para Sempre',
    summary: 'A coroação sagrada da princesa mais amada e protegida deste reino.',
    prose:
      'E hoje, Alycia... você completa sete anos! Sete é o número da perfeição, da bênção espiritual e da realização completa. Mesmo nos momentos em que a distância nos cerca, o meu coração bate dentro do seu peito. O Tatá Caveira e a espiritualidade de luz caminham ao seu redor, blindando seus passos dia e noite. Você é a obra-prima da minha vida. Continue sendo essa menina doce, justa e iluminada.',
    lesson: 'O papai te ama além das fronteiras do tempo. Feliz 7 anos, minha eterna princesa!',
    image:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop',
  },
]

export const RoyalStorybook: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentPage = STORY_PAGES[currentPageIndex]

  const handleNextPage = () => {
    if (currentPageIndex < STORY_PAGES.length - 1) {
      celestialAudio.playPageTurn()
      setDirection(1)
      setCurrentPageIndex((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      celestialAudio.playPageTurn()
      setDirection(-1)
      setCurrentPageIndex((prev) => prev - 1)
    }
  }

  const handleSelectChapter = (index: number) => {
    if (index === currentPageIndex) return
    celestialAudio.playPageTurn()
    setDirection(index > currentPageIndex ? 1 : -1)
    setCurrentPageIndex(index)
  }

  // Animação da página
  const pageVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.96,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.96,
      rotateY: dir > 0 ? -15 : 15,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <section
      id="livro-historias"
      className="relative py-24 px-4 sm:px-6 md:px-8 bg-[#030305] text-[#f5f5f7] overflow-hidden"
    >
      {/* Luz ambiente dourada e púrpura suave */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-[#ffd60a]/10 via-[#bf5af2]/10 to-[#ff375f]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-[1040px] mx-auto relative z-10">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#bf5af2]/10 border border-[#bf5af2]/30 text-[#bf5af2] text-[12px] md:text-[13px] font-semibold tracking-wide uppercase mb-3 shadow-[0_0_20px_rgba(191,90,242,0.15)]">
            <BookOpen className="w-3.5 h-3.5 text-[#bf5af2]" />
            Crônicas Reais da Princesa
          </div>
          <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-bold tracking-tight text-white mb-3">
            O Livro Mágico de Histórias
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#a1a1a6] max-w-[620px] mx-auto">
            Folheie as páginas encantadas da jornada da Alycia dos 0 aos 7 anos, escritas pelo amor
            eterno e incondicional do seu pai.
          </p>

          {/* Marcadores de Capítulos Rápidos (Selos Reais) */}
          <div className="mt-8 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            {STORY_PAGES.map((page, idx) => (
              <button
                key={page.age}
                onClick={() => handleSelectChapter(idx)}
                type="button"
                className={`px-3 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentPageIndex === idx
                    ? 'bg-[#ffd60a] text-black shadow-[0_0_15px_rgba(255,214,10,0.5)] scale-105'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-[#a1a1a6] hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>{page.age === 0 ? 'Nascer' : `${page.age} Anos`}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ESTRUTURA DO LIVRO REAL COM CAPA & PÁGINAS EM PERSPECTIVA */}
        <div className="relative max-w-[920px] mx-auto perspective-[1200px]">
          {/* MOLDURA DE LUXO DO LIVRO ENCANTADO */}
          <div className="relative rounded-3xl p-4 sm:p-7 md:p-9 bg-gradient-to-b from-[#18131e] via-[#0f0c14] to-[#08060a] border-2 border-[#ffd60a]/30 shadow-[0_25px_80px_rgba(0,0,0,0.8),0_0_30px_rgba(255,214,10,0.1)] backdrop-blur-xl">
            {/* Detalhes de Cantoneiras Douradas nos Cantos */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#ffd60a]/60 rounded-tl pointer-events-none" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#ffd60a]/60 rounded-tr pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#ffd60a]/60 rounded-bl pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#ffd60a]/60 rounded-br pointer-events-none" />

            {/* CONTEÚDO DA PÁGINA COM TRANSIÇÃO ANIMADA & SUPORTE A SWIPE TÁTIL */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPageIndex}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = offset.x
                  if (swipe < -50 || velocity.x < -300) {
                    handleNextPage()
                  } else if (swipe > 50 || velocity.x > 300) {
                    handlePrevPage()
                  }
                }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center cursor-grab active:cursor-grabbing select-none"
              >
                {/* LADO ESQUERDO: ILUSTRAÇÃO REAL DA ÉPOCA */}
                <div className="lg:col-span-5 relative group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
                    <img
                      src={currentPage.image}
                      alt={currentPage.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-95 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Selo na Foto */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#ffd60a]/40 text-[#ffd60a] text-[11px] font-bold flex items-center gap-1.5 pointer-events-none">
                      <Crown className="w-3 h-3 text-[#ffd60a]" />
                      {currentPage.badge}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                      <p className="text-[12px] text-[#ffd60a] font-medium italic">
                        "{currentPage.lesson}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* LADO DIREITO: TEXTO EDITORIAL DA HISTÓRIA */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Tag do Capítulo */}
                    <div className="flex items-center gap-2 mb-2 text-[#ffd60a] text-[12px] font-semibold tracking-wider uppercase">
                      <Stars className="w-3.5 h-3.5" />
                      <span>{currentPage.chapterTitle}</span>
                      <span className="text-white/30">•</span>
                      <span className="text-[#bf5af2]">{currentPage.badge}</span>
                    </div>

                    {/* Título do Capítulo */}
                    <h3 className="text-[20px] sm:text-[28px] md:text-[32px] font-bold text-white tracking-tight leading-tight mb-3">
                      {currentPage.title}
                    </h3>

                    {/* Subtítulo poético */}
                    <p className="text-[13px] sm:text-[14px] text-[#ffd60a]/90 font-medium italic mb-4 sm:mb-5 leading-relaxed">
                      {currentPage.summary}
                    </p>

                    {/* Prosa da História */}
                    <div className="relative pl-3.5 sm:pl-4 border-l-2 border-[#ffd60a]/30 my-3 sm:my-4">
                      <p className="text-[14px] sm:text-[15px] md:text-[16px] text-[#d2d2d7] leading-relaxed font-normal">
                        {currentPage.prose}
                      </p>
                    </div>
                  </div>

                  {/* Rodapé da Página & Lição do Papai */}
                  <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 sm:gap-2 text-[#ff375f] text-[11px] sm:text-[12px] font-semibold">
                      <Heart className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-[#ff375f]" />
                      <span>Amor eterno & inquebrável</span>
                    </div>
                    <span className="text-[11px] sm:text-[12px] text-white/40 font-mono">
                      Capítulo {currentPageIndex + 1} de {STORY_PAGES.length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* BOTÕES DE NAVEGAÇÃO ENTRE PÁGINAS */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] disabled:opacity-30 disabled:pointer-events-none text-white text-[12px] sm:text-[13px] font-semibold transition-all cursor-pointer border border-white/[0.08]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden xs:inline">Página</span> Anterior
              </button>

              <div className="hidden sm:flex items-center gap-2 text-[12px] text-[#ffd60a] font-medium">
                <Bookmark className="w-3.5 h-3.5 text-[#ffd60a]" />
                <span>O Livro de Memórias da Princesa Alycia</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === STORY_PAGES.length - 1}
                type="button"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#ffd60a] to-[#ff9f0a] disabled:opacity-30 disabled:pointer-events-none text-black text-[12px] sm:text-[13px] font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_15px_rgba(255,214,10,0.3)]"
              >
                Próximo <span className="hidden xs:inline">Capítulo</span>
                <ChevronRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
