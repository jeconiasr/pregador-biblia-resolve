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

export interface ModuleData {
  number: number;
  title: string;
  description: string;
  highlights: string[];
}

export const COURSE_MODULES: ModuleData[] = [
  {
    number: 1,
    title: "Interpretação e Contexto",
    description: "Método analítico, versões bíblicas e consulta responsável a ferramentas sem perder a fidelidade ao texto.",
    highlights: ["Método analítico de estudo", "Contexto histórico e literário", "Uso seguro de comentários bíblicos"],
  },
  {
    number: 2,
    title: "Definição da Ideia Central e Tema",
    description: "Como extrair a mensagem essencial da passagem bíblica e transformá-la em tema e título precisos.",
    highlights: ["A origem espiritual do sermão", "Identificação das necessidades do ouvinte", "Determinação do tema e propósito"],
  },
  {
    number: 3,
    title: "Estruturação e Divisão em Tópicos",
    description: "A arquitetura completa do esboço: pontos principais, subdivisões lógicas e argumentação coesa.",
    highlights: ["Estrutura básica do sermão", "Pontos principais e subdivisões", "Fundamentação e uso de ilustrações"],
  },
  {
    number: 4,
    title: "Introdução e Conclusão Envolventes",
    description: "Como captar a atenção desde as primeiras palavras e finalizar com convite, apelo e convocação clara.",
    highlights: ["Abertura que desperta interesse", "Fechamento memorável", "Oração e resposta pessoal"],
  },
  {
    number: 5,
    title: "Aplicação Prática para a Vida Diária",
    description: "Conexão direta entre a verdade milenar das Escrituras e os dilemas reais vividos pela igreja hoje.",
    highlights: ["Do texto à vida cotidiana", "Exemplos aplicáveis e relevantes", "Formatos temático, textual e expositivo"],
  },
  {
    number: 6,
    title: "Comunicação Clara e Segura",
    description: "Oratória bíblica, postura no púlpito, técnicas de memorização e estratégias contra o nervosismo.",
    highlights: ["Técnicas de memorização do esboço", "Postura física e gestos naturais", "Eliminando a timidez e o medo"],
  },
];

interface CourseTracksProps {
  highlightedTrackId?: number | null;
}

export const CourseTracks: React.FC<CourseTracksProps> = ({ highlightedTrackId }) => {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  return (
    <section id="conteudo-curso" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#FFFDF8]">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#356F9F]/10 border border-[#356F9F]/20 text-[#356F9F] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Conteúdo Programático</span>
          </div>
          <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
            40 videoaulas práticas organizadas em 6 etapas
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-2xl mx-auto">
            Uma trilha passo a passo para levar você desde o estudo inicial do texto até a transmissão
            segura no púlpito.
          </p>
        </div>

        {/* 6 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {COURSE_MODULES.map((mod) => (
            <div
              key={mod.number}
              className="rounded-2xl p-5 sm:p-6 border border-[#DED7CC] bg-[#FFFDF8] hover:border-[#356F9F]/40 shadow-xs flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#17324D] text-[#E8BE58] font-bold text-sm flex items-center justify-center font-display-accent">
                    {mod.number}
                  </span>
                  <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#17324D] leading-snug">
                    {mod.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#68727D] leading-relaxed mb-4">
                  {mod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DED7CC]/60 text-xs text-[#22303C]/80 space-y-1.5">
                {mod.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#2F7665] font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Accordion: All 40 lessons faithfully listed */}
        <div className="mt-8 max-w-3xl mx-auto">
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
