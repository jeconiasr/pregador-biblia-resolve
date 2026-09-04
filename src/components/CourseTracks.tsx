import React, { useState } from "react";
import {
  BookOpen,
  Search,
  LayoutGrid,
  FileCheck2,
  Mic,
  ChevronDown,
  ChevronUp,
  Layers,
  Sparkles,
} from "lucide-react";

export const ALL_40_LESSONS = [
  "Introdução à Interpretação Bíblica",
  "Versões da Bíblia",
  "Método Analítico: como estudar a passagem bíblica",
  "Entendendo a Bíblia para Pregar",
  "Escolhendo o Texto para Pregar",
  "O Contexto Bíblico",
  "Usando Comentários Bíblicos",
  "Teologias, Introduções, Chaves e Dicionários",
  "Começando com Deus",
  "A Origem do Sermão",
  "Identificando as Necessidades dos Ouvintes",
  "Determinando o Propósito do Sermão",
  "A Estrutura Básica do Sermão",
  "Exemplo de esboço em Isaías 6",
  "Determinando o Tema do Sermão",
  "Determinando o Título do Sermão",
  "Os Pontos Principais do Sermão",
  "As Subdivisões do Sermão",
  "A Ilustração do Sermão",
  "Comentários nas Subdivisões",
  "Fundamentando o Sermão",
  "A Aplicação do Sermão",
  "A Aplicação Prática da Mensagem",
  "A Introdução do Sermão",
  "A Conclusão do Sermão",
  "Os Três Tipos de Sermões",
  "O Sermão Temático",
  "O Sermão Temático passo a passo",
  "O Sermão Textual",
  "O Sermão Textual passo a passo",
  "O Sermão Expositivo",
  "O Sermão Expositivo passo a passo",
  "A Memorização do Sermão",
  "Pregando para jovens",
  "Checklist do Pregador",
  "O Pregador de Sucesso",
  "A Oratória Eficaz",
  "Postura e Gestos do Pregador",
  "A Atenção dos Ouvintes",
  "Eliminando a Timidez e o Nervosismo",
];

export interface TrackData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  topics: string[];
}

export const COURSE_TRACKS: TrackData[] = [
  {
    id: 1,
    title: "Trilha 1: Compreender o texto",
    subtitle: "Interpretação e Fundamentos Bíblicos",
    description: "Interpretação, versões bíblicas, método analítico de estudo, contexto e consulta responsável.",
    icon: BookOpen,
    topics: [
      "Introdução à Interpretação Bíblica",
      "Versões e traduções da Bíblia",
      "Método analítico de estudo do texto",
      "Contexto histórico, literário e teológico",
      "Uso equilibrado de comentários e dicionários",
    ],
  },
  {
    id: 2,
    title: "Trilha 2: Encontrar a mensagem",
    subtitle: "Do Texto à Ideia Central",
    description: "Escolha da passagem, identificação das necessidades dos ouvintes, propósito, tema e título.",
    icon: Search,
    topics: [
      "Critérios para escolha do texto",
      "A origem espiritual e bíblica do sermão",
      "Identificação do ouvinte e sua realidade",
      "Determinação do propósito do sermão",
      "Definição precisa de tema e título",
    ],
  },
  {
    id: 3,
    title: "Trilha 3: Organizar o sermão",
    subtitle: "A Arquitetura da Mensagem",
    description: "Estrutura completa, pontos principais, subdivisões lógicas, fundamentação, aplicação e introdução/conclusão.",
    icon: LayoutGrid,
    topics: [
      "Estrutura básica e esboço prático (Isaías 6)",
      "Pontos principais e subdivisões coerentes",
      "Fundamentação bíblica e teológica",
      "Uso de ilustrações esclarecedoras",
      "Introdução que desperta e conclusão que convoca",
    ],
  },
  {
    id: 4,
    title: "Trilha 4: Dominar os formatos",
    subtitle: "Modelos Homiléticos",
    description: "Estudo detalhado e passo a passo dos três modelos essenciais: sermão temático, textual e expositivo.",
    icon: Layers,
    topics: [
      "Distinção clara entre os três formatos",
      "O Sermão Temático passo a passo",
      "O Sermão Textual passo a passo",
      "O Sermão Expositivo passo a passo",
      "Escolha do formato ideal para cada ocasião",
    ],
  },
  {
    id: 5,
    title: "Trilha 5: Comunicar melhor",
    subtitle: "Oratória, Postura e Segurança",
    description: "Memorização, checklist do pregador, oratória eficaz, postura física, atenção da congregação e controle do nervosismo.",
    icon: Mic,
    topics: [
      "Técnicas de memorização e domínio do esboço",
      "Checklist prático antes de subir ao púlpito",
      "Oratória, dicção, postura e gestos naturais",
      "Como reter a atenção dos ouvintes",
      "Estratégias práticas contra a timidez e o nervosismo",
    ],
  },
];

interface CourseTracksProps {
  highlightedTrackId?: number | null;
}

export const CourseTracks: React.FC<CourseTracksProps> = ({ highlightedTrackId }) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <section id="conteudo-curso" className="py-14 sm:py-20 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#356F9F]/10 border border-[#356F9F]/20 text-[#356F9F] text-xs font-semibold uppercase tracking-wider mb-3">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Estrutura Pedagógica</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            Do texto bíblico à apresentação da mensagem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            As 40 aulas do curso são distribuídas em 5 trilhas complementares para que você não
            fique perdido em teoria sem aplicação.
          </p>
        </div>

        {/* 5 Tracks Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSE_TRACKS.map((track) => {
            const Icon = track.icon;
            const isHighlighted = highlightedTrackId === track.id;

            return (
              <div
                key={track.id}
                className={`rounded-2xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                  isHighlighted
                    ? "bg-[#F7F1E7] border-[#2F7665] ring-2 ring-[#2F7665]/20 shadow-md scale-[1.02]"
                    : "bg-[#FFFDF8] border-[#DED7CC] hover:border-[#356F9F]/40 shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#17324D] text-[#FFFDF8] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-[#E8BE58]" />
                    </div>
                    {isHighlighted && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2F7665] text-[#FFFDF8]">
                        Trilha Recomendada
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif-editorial text-lg font-bold text-[#17324D] mb-1">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#356F9F] font-semibold mb-3">{track.subtitle}</p>
                  <p className="text-xs sm:text-sm text-[#68727D] leading-relaxed mb-4">
                    {track.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DED7CC]/60 text-xs text-[#22303C]/80 space-y-1.5">
                  {track.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-[#2F7665] font-bold">•</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Quick Stats / Summary Card to complete grid balance */}
          <div className="rounded-2xl p-6 border border-[#DED7CC] bg-[#F7F1E7]/60 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#2F7665]/10 text-[#2F7665] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-[#2F7665]" />
              </div>
              <h3 className="font-serif-editorial text-lg font-bold text-[#17324D] mb-2">
                Formação Progressiva
              </h3>
              <p className="text-xs sm:text-sm text-[#68727D] leading-relaxed">
                Você pode assistir no seu ritmo, voltar às aulas quantas vezes quiser e usar cada
                etapa como roteiro de consulta durante a elaboração dos seus próprios sermões.
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#DED7CC]/60 text-xs text-[#17324D] font-semibold">
              ✓ 40 aulas em vídeo gravadas
              <br />
              ✓ Acesso vitalício para revisar
              <br />
              ✓ Estudo prático e ministerial
            </div>
          </div>
        </div>

        {/* Accordion: All 40 lessons faithfully listed */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="border border-[#DED7CC] rounded-2xl overflow-hidden bg-[#F7F1E7]/40 shadow-xs">
            <button
              type="button"
              id="accordion-trigger-40"
              aria-expanded={accordionOpen}
              aria-controls="accordion-content-40"
              onClick={() => setAccordionOpen(!accordionOpen)}
              className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left bg-[#FFFDF8] hover:bg-[#F7F1E7]/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#17324D]/10 text-[#17324D] flex items-center justify-center text-xs font-bold font-display-accent">
                  40
                </span>
                <span className="font-serif-editorial text-base sm:text-lg font-bold text-[#17324D]">
                  Ver o índice com todas as 40 aulas do curso
                </span>
              </div>
              {accordionOpen ? (
                <ChevronUp className="w-5 h-5 text-[#68727D] shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-[#68727D] shrink-0" />
              )}
            </button>

            {accordionOpen && (
              <div
                id="accordion-content-40"
                role="region"
                aria-labelledby="accordion-trigger-40"
                className="px-6 py-5 border-t border-[#DED7CC] bg-[#FFFDF8]"
              >
                <p className="text-xs text-[#68727D] mb-4">
                  Relação completa das 40 videoaulas incluídas na formação:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {ALL_40_LESSONS.map((lesson, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#22303C]">
                      <span className="shrink-0 w-5 text-right font-semibold text-[#68727D]">
                        {idx + 1}.
                      </span>
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
