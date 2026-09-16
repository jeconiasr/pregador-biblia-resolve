import React, { useState, useEffect } from "react";
import { HelpCircle, ArrowDown, Check, Sparkles } from "lucide-react";
import { loadStoredBlocker, saveStoredBlocker } from "../lib/storage";
import { trackEvent } from "../lib/analytics";

export interface BlockerOption {
  id: string;
  label: string;
  guidance: string;
  matchingTrackId: number; // 1 to 5
  trackName: string;
}

export const BLOCKER_OPTIONS: BlockerOption[] = [
  {
    id: "escolher-desenvolver-texto",
    label: "Não sei escolher e desenvolver o texto",
    guidance:
      "O treinamento ensina métodos práticos de interpretação e delimitação bíblica para você extrair a mensagem fielmente e sem insegurança.",
    matchingTrackId: 1,
    trackName: "Módulo 1: Fundamentos e Interpretação Bíblica",
  },
  {
    id: "organizar-ideias",
    label: "Tenho ideias, mas não consigo organizá-las",
    guidance:
      "Você aprenderá como estruturar o sermão com introdução cativante, pontos principais bem encadeados e transições naturais.",
    matchingTrackId: 3,
    trackName: "Módulo 3: Construção e Organização do Esboço",
  },
  {
    id: "inseguranca-explicar",
    label: "Sinto insegurança para explicar a passagem",
    guidance:
      "Com técnicas de fundamentação e domínio do texto sagrado, você ganha confiança sólida no púlpito diante da congregação.",
    matchingTrackId: 2,
    trackName: "Módulo 2: Mensagem e Teologia Prática",
  },
  {
    id: "concluir-aplicar",
    label: "Não sei como concluir e aplicar a mensagem",
    guidance:
      "O curso mostra passo a passo como criar conclusões memoráveis e aplicações práticas que tocam a vida diária dos ouvintes.",
    matchingTrackId: 4,
    trackName: "Módulo 4: Aplicação Prática e Conclusão Eficaz",
  },
];

interface BlockerSelectorProps {
  onBlockerSelected?: (blocker: BlockerOption) => void;
  selectedBlockerId?: string | null;
}

export const BlockerSelector: React.FC<BlockerSelectorProps> = ({
  onBlockerSelected,
  selectedBlockerId,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadStoredBlocker();
    if (stored) {
      setSelectedId(stored);
      const found = BLOCKER_OPTIONS.find((b) => b.id === stored);
      if (found && onBlockerSelected) {
        onBlockerSelected(found);
      }
    }
  }, [onBlockerSelected]);

  const handleSelect = (option: BlockerOption) => {
    setSelectedId(option.id);
    saveStoredBlocker(option.id);
    trackEvent("blocker_selected", { blocker_id: option.id, label: option.label });
    trackEvent("diagnosis_selected", { option_id: option.id, option_label: option.label });

    if (onBlockerSelected) {
      onBlockerSelected(option);
    }
  };

  const selectedOption = BLOCKER_OPTIONS.find((b) => b.id === (selectedBlockerId || selectedId));

  const handleScrollToContent = (e: React.MouseEvent) => {
    e.preventDefault();
    const content = document.getElementById("conteudo-curso");
    if (content) {
      content.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="bloqueio-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F7F1E7]/70">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#356F9F]" />
          <span>Diagnóstico Rápido</span>
        </div>

        <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
          Qual destas dificuldades mais atrapalha você na hora de preparar uma mensagem?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-lg mx-auto">
          Clique na opção mais comum no seu momento atual para ver como destravar:
        </p>

        {/* 4 Interactive Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
          {BLOCKER_OPTIONS.map((option) => {
            const isSelected = selectedOption?.id === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 min-h-[56px] ${
                  isSelected
                    ? "bg-[#FFFDF8] border-[#2F7665] shadow-sm ring-2 ring-[#2F7665]/20"
                    : "bg-[#FFFDF8]/80 hover:bg-[#FFFDF8] border-[#DED7CC] hover:border-[#356F9F]/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center border text-[11px] font-bold ${
                      isSelected
                        ? "bg-[#2F7665] border-[#2F7665] text-[#FFFDF8]"
                        : "border-[#DED7CC] text-[#68727D]"
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5" /> : null}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#17324D]">
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback / Guidance box when selected */}
        {selectedOption && (
          <div className="mt-6 p-5 rounded-xl bg-[#FFFDF8] border border-[#2F7665]/30 text-left shadow-xs transition-all animate-fadeIn">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#2F7665] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#24594D] uppercase tracking-wide">
                  Como o curso resolve isso
                </p>
                <p className="mt-1 text-sm sm:text-base text-[#22303C]/90 leading-relaxed">
                  {selectedOption.guidance}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#DED7CC]/60">
                  <span className="text-xs text-[#68727D]">
                    Conteúdo detalhado em:{" "}
                    <strong className="text-[#17324D]">{selectedOption.trackName}</strong>
                  </span>
                  <a
                    href="#conteudo-curso"
                    onClick={handleScrollToContent}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#356F9F] hover:text-[#17324D] transition-colors"
                  >
                    <span>Ver o conteúdo do treinamento</span>
                    <ArrowDown className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
