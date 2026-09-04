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
    id: "compreender-texto",
    label: "Compreender melhor o texto",
    guidance:
      "Interpretar bem o texto bíblico e entender o contexto original é a base para não distorcer a passagem e pregar com autoridade fiel.",
    matchingTrackId: 1,
    trackName: "Trilha 1: Compreender o texto",
  },
  {
    id: "montar-estrutura",
    label: "Montar a estrutura do sermão",
    guidance:
      "Transformar ideias soltas em introdução, pontos lógicos, subdivisões e conclusão traz segurança e evita que você se perca nas anotações.",
    matchingTrackId: 3,
    trackName: "Trilha 3: Organizar o sermão",
  },
  {
    id: "falar-clareza-seguranca",
    label: "Falar com mais clareza e segurança",
    guidance:
      "O nervosismo e a timidez diminuem consideravelmente quando você domina a mensagem, aprende técnicas simples de oratória e postura.",
    matchingTrackId: 5,
    trackName: "Trilha 5: Comunicar melhor",
  },
  {
    id: "manter-atencao-ouvintes",
    label: "Manter a atenção dos ouvintes",
    guidance:
      "Boas ilustrações, aplicações práticas e saber conectar a verdade bíblica ao cotidiano das pessoas mantêm a igreja atenta do início ao fim.",
    matchingTrackId: 2,
    trackName: "Trilha 2: Encontrar a mensagem & Aplicação",
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

    if (onBlockerSelected) {
      onBlockerSelected(option);
    }
  };

  const selectedOption = BLOCKER_OPTIONS.find((b) => b.id === (selectedBlockerId || selectedId));

  const handleScrollToBridge = (e: React.MouseEvent) => {
    e.preventDefault();
    const bridge = document.getElementById("ponte-curso");
    if (bridge) {
      bridge.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="bloqueio-section" className="py-12 sm:py-16 px-4 sm:px-6 bg-[#F7F1E7]/70">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17324D]/10 text-[#17324D] text-xs font-semibold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#356F9F]" />
          <span>Reflexão Prática</span>
        </div>

        <h2 className="font-serif-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#17324D] tracking-tight">
          Em qual parte você mais precisa avançar agora?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-[#68727D] max-w-lg mx-auto">
          Identifique o ponto em que você sente maior travamento ao preparar ou ministrar a sua
          mensagem.
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
                className={`p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
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
                  Orientação para esta necessidade
                </p>
                <p className="mt-1 text-sm sm:text-base text-[#22303C]/90 leading-relaxed">
                  {selectedOption.guidance}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#DED7CC]/60">
                  <span className="text-xs text-[#68727D]">
                    Abordado com profundidade em:{" "}
                    <strong className="text-[#17324D]">{selectedOption.trackName}</strong>
                  </span>
                  <a
                    href="#ponte-curso"
                    onClick={handleScrollToBridge}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#356F9F] hover:text-[#17324D] transition-colors"
                  >
                    <span>Ver como o curso aborda isso</span>
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
